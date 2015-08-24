/********************************************************
 *
 * Custom Javascript code for AppStrap Bootstrap theme
 * Written by Themelize.me (http://themelize.me)
 *
 *******************************************************/
$(document).ready(function() {
  "use strict";
  
  var defaultColour = 'green';

  //IE placeholders
  // --------------------------------
  $('[placeholder]').focus(function() {
    var input = $(this);
    if (input.val() === input.attr('placeholder')) {
      if (this.originalType) {
        this.type = this.originalType;
        delete this.originalType;
      }
      input.val('');
      input.removeClass('placeholder');
    }
  }).blur(function() {
    var input = $(this);
    if (input.val() === '') {
      input.addClass('placeholder');
      input.val(input.attr('placeholder'));
    }
  }).blur();
  
  //Bootstrap tooltip
  // --------------------------------
  // invoke by adding _tooltip to a tags (this makes it validate)
  if(jQuery().tooltip) {
    $('body').tooltip({
      selector: "a[class*=_tooltip]"
    });
  }
    
  //Bootstrap popover
  // --------------------------------
  // invoke by adding _popover to a tags (this makes it validate)
  if(jQuery().popover) {
    $('body').popover({
      selector: "a[class*=_popover]",
      trigger: "hover"
    });
  }
  
  //show hide elements
  // --------------------------------
  $('.show-hide').each(function() {
    $(this).click(function() {
      var state = 'open'; //assume target is closed & needs opening
      var target = $(this).attr('data-target');
      var targetState = $(this).attr('data-target-state');
      
      //allows trigger link to say target is open & should be closed
      if (typeof targetState !== 'undefined' && targetState !== false) {
        state = targetState;
      }
      
      if (state === 'undefined') {
        state = 'open';
      }
      
      $(target).toggleClass('show-hide-'+ state);
      $(this).toggleClass(state);
    });
  });
  
  //colour switch
  // --------------------------------
  $('.colour-switcher a').click(function() {
    var c = $(this).attr('href').replace('#','');
    var cacheBuster = 3 * Math.floor(Math.random() * 6);
    $('.colour-switcher a').removeClass('active');
    $('.colour-switcher a.'+ c).addClass('active');
    
    if (c !== defaultColour) {
      $('#colour-scheme').attr('href','css/colour-'+ c +'.css?x='+ cacheBuster);
    }
    else {
      $('#colour-scheme').attr('href', '#');
    }
  });
  
  //Plugin: flexslider
  // --------------------------------
  $('.flexslider').each(function() {
    var sliderSettings =  {
      animation: $(this).attr('data-transition'),
      selector: ".slides > .slide",
      controlNav: true,
      smoothHeight: true
    };
    
    var sliderNav = $(this).attr('data-slidernav');
    if (sliderNav !== 'auto') {
      sliderSettings = $.extend({}, sliderSettings, {
        manualControls: sliderNav +' li a',
        controlsContainer: '.flexslider-wrapper'
      });
    }
    
    $(this).flexslider(sliderSettings);
  });

  //Plugin: jQuery Quicksand plugin
  //@based on: http://www.evoluted.net/thinktank/web-development/jquery-quicksand-tutorial-filtering
  // --------------------------------
  $('[data-js=quicksand]').each(function() {
    var quicksandTrigger = $(this).find($(this).data('quicksand-trigger'));
    var quicksandTarget = $($(this).data('quicksand-target'));
    var quicksandTargetData = quicksandTarget.clone();
    var filterId = 'all';
    var filteredData;
    
    quicksandTrigger.click(function(e) {
      filterId = $(this).data('quicksand-fid');
      filteredData = '';
      quicksandTrigger.parents('li').removeClass('active');
      $(this).parents('li').addClass('active');
      
      if (filterId === 'all') {
        filteredData = quicksandTargetData.find('[data-quicksand-id]');
      }
      else {
        filteredData = quicksandTargetData.find('[data-quicksand-tid="'+ filterId +'"]');
      }
      
      quicksandTarget.quicksand(filteredData,
        {
          duration: 600,
          attribute: 'data-quicksand-id',
          adjustWidth: false,
        },
        function() {
          //restripe items
          filteredData.each(function(i) {
            var stripeState = i%2===0 ? 'even' : 'odd';
            $(this).removeClass('even odd').addClass(stripeState);
          });
        }
      ).addClass('quicksand-target');
      e.preventDefault();
    });
  });
  
});