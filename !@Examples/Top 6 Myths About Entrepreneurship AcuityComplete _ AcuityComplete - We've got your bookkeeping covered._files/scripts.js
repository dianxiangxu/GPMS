var cslide, // declare variable for current slide 
    nslide, // declare variable for next slide
    sindex, // declare variable for current slide num
    matrix = {

    init : function () {
      $('.yes-response, .slide, #response').hide();

      $('.slide.active').fadeIn(300);

      cslide = $('.slide.active');

      $('.slide').on('click','.checker-option',function(e){
        var s = $(this).parent('.slide');
        s.find('.checker-option').not(this).removeClass('selected').addClass('not-selected');
        $(this).removeClass('not-selected').addClass('selected');
        if ($(this).hasClass('no')) {
          s.find('.yes-response').fadeOut(300).find('input').val('');
        } else {
          // if yes
          s.find('.yes-response').fadeIn(300);
        }
      });

      // activate click action on next button
      $('#pricing-form').on('click','.next-btn',function(e){
        e.preventDefault;
        matrix.change('next');
      });

      $('#pricing-form').on('click','.prev-btn',function(e){
        e.preventDefault;
        matrix.change('prev');
      });

      $('.progress-wrap li').eq(cslide.index()).addClass('current');

      // activate submit
      $('#pricing-form').on('click','.submit-btn',function(e){
        e.preventDefault();
        matrix.process();
      });

      $('#pricing-form').on('submit',function(e){
        e.preventDefault();
        matrix.submitform();
      });

      $('.response-form').on('click','#contact-email',function(){
        $(this).addClass('dim');
        $('#contact-phone').removeClass('dim');
        $('input[name=contact-method]').val('email');
      });

      $('.response-form').on('click','#contact-phone',function(){
        $(this).addClass('dim');
        $('#contact-email').removeClass('dim');
        $('input[name=contact-method]').val('phone');
      });

      $('.checker-option').on('click',function(){
        $('.error-msg').hide();
      });

    },

    change : function (direction) {

      $('.error-msg').remove();

      var selected = $(cslide).find('.checker-option.selected'),
          selectors = $(cslide).find('select'),
          inputs = $(cslide).find('input[type=text]'),
          selectorscleared = false,
          inputscleared = false;

      function switchslide () {
        cslide.removeClass('active');
        $('.progress-wrap li.current').removeClass('current').addClass('past');
        $('.progress-wrap li').eq(nslide.index()).addClass('current');
        cslide.fadeOut(300,function(){
          nslide.fadeIn(300);
          nslide.addClass('active');
          cslide = nslide;
        });
      }

      // check direction of button click
      if (direction == 'prev') {
        // move to the previous slide
        nslide = cslide.prev('.slide');
        switchslide();
      } else {

        // otherwise, process validation before proceeding
        if (selected.length < 1) {
          // if neither box is selected, display an error message
          $('<div class="error-msg">Please choose one of the above options before proceeding.</div>').insertBefore('.next-btn');
        } else if ($(selected).hasClass('yes')) {
          
          // validate select boxes
          if (selectors.length > 0) {
            $(selectors).each(function(i,e){
              if ($(e).val() == 'Choose One') {
                selectorscleared = false;
                $(e).parents('.yes-response').append('<div class="error-msg">Please choose an option.</div>');
              } else {
                selectorscleared = true;
              }
            });
          } else {
            selectorscleared = true;
          }

          // validate input boxes
          if (inputs.length > 0) {
            $(inputs).each(function(i,e){
              // check if each box has any non-numeric characters
              if (!$(e).val().match(/^\d+$/)) {
                inputscleared = false;
                $(e).parents('.yes-response').append('<div class="error-msg">Please enter only numbers.</div>');
              } else {
                inputscleared = true;
              }
            });
          } else {
            inputscleared = true;
          }

          if (selectorscleared == true && inputscleared == true) {
            nslide = cslide.next('.slide');
            switchslide();
          }

        } else {
            nslide = cslide.next('.slide');
            switchslide();
        }
      }

    },

    process : function () {
      // if any of the text fields are blank, set their values to 0
      var points = 0;
      $('#pricing-form input').each(function(i,e){
        var pts = parseInt($(e).attr('data-points')),
            val = parseInt($(e).val());
            if (isNaN(val)) {
              val = 0;
            }
        if (val != 0) {
          val = pts * val;
        }
        points += val;
      });

      $('#pricing-form option:selected').each(function(i,e){
        var pts = parseInt($(e).attr('data-points'));
        points += pts;
      });
	    var m=$('#response .pricing-tier').text();
		 
    var n = m.indexOf("P");
	
if (n>=0) {
 if (points < 60) {
        $('#response .pricing-tier').text('$300');
      } else if (points < 120) {
        $('#response .pricing-tier').text('$600');
      } else if (points < 180) {
        $('#response .pricing-tier').text('$900');
      } else if (points < 240) {
        $('#response .pricing-tier').text('$1,200');
      } else {
        $('.blue-bubble, .final-message').hide();
        $('.results-message').html('<span class="content">AcuityComplete costs between $300 and $1200 per month, and is designed especially to meet the needs of startups and small businesses. Based on your answers, it appears that your company may benefit from a more comprehensive financial approach. <a href="http://acuitycfo.com/contact">Contact us</a> to discuss the solution that will take you even farther on <a href="http://acuitycfo.com/services">The Path<a> to success.</span>');
      }

}
$('input[name=pricing_tier]').val($('#response .pricing-tier').text());

      $('#pricing-element-wrap').fadeOut(500, function(){
        $('#response').fadeIn(500);
      });


    },


    submitform : function () {
      $.post('/wp-content/themes/acuitycomplete/pricing-form-email.php', {
          contact_name: $('input[name=contact_name]').val(),
          contact_email: $('input[name=contact_email]').val(),
          contact_phone: $('input[name=contact_phone]').val(),
          bank_accounts: $('input[name=bank-accounts]').val(),
          paypal_accounts: $('input[name=paypal-accounts]').val(),
          credit_card_count: $('input[name=credit-card-count]').val(),
          credit_card_transactions: $('select[name=credit-card-transactions]').val(),
          invoicing_schedule: $('select[name=invoicing-schedule]').val(),
          invoice_count: $('input[name=invoice-count]').val(),
          invoicing_statements: $('select[name=invoicing-statements]').val(),
          billpay_enter_bills: $('select[name=billpay-enter-bills]').val(),
         // billpay_frequency: $('select[name=billpay-frequency]').val(),
		 billpay_frequency: 44,
          payroll_frequency : $('select[name=payroll-frequency]').val(),
          pricing_tier : $('input[name=pricing_tier]').val(),
          contact_method : $('input[name=contact-method]').val(),
		  textarea : $('#textarea1').val(),
		  q1 : $('input[name=q1]').val(),
         ans1 : $('input[name=ans1]').val(),
          q11 : $('input[name=q11]').val(),
        ans11 : $('input[name=ans11]').val(),
          q2 : $('input[name=q2]').val(),
		ans2 : $('input[name=ans2]').val(),
          q21 : $('input[name=q21]').val(),
        ans21 : $('input[name=ans21]').val(),
          q3 : $('input[name=q3]').val(),
        ans3 : $('input[name=ans3]').val(),
          q31 : $('input[name=q31]').val(),
        ans31 : $('input[name=ans31]').val(),
		  q32 : $('input[name=q32]').val(),
        ans32 : $('input[name=ans32]').val(),
		  q4 : $('input[name=q4]').val(),
        ans4 : $('input[name=ans4]').val(),
		  q41 : $('input[name=q41]').val(),
        ans41 : $('input[name=ans41]').val(),
		  q42 : $('input[name=q42]').val(),
        ans42 : $('input[name=ans42]').val(),
		q5 : $('input[name=q5]').val(),
        ans5 : $('input[name=ans5]').val(),
		q6 : $('input[name=q6]').val(),
        ans6 : $('input[name=ans6]').val(),
		q61 : $('input[name=q61]').val(),
        ans61 : $('input[name=ans61]').val(),
		 ans7 : $('input[name=ans7]').val(),
		  ans8 : $('input[name=ans8]').val(),
		  ans9 : $('input[name=ans9]').val(),
		  ans10 : $('input[name=ans10]').val()
		  
     
		  
      }, function(data){
		  //alert(data);
        if (data == 'true') {
          // if success
		  //alert(contact_name);
          $('.response-form').fadeOut();
          $('.results-message').hide().html('<span class="content">Thanks for contacting AcuityComplete! Someone from our team will get in touch with you soon!</span>');
          $('.results-message').fadeIn(500);
        } else {
          // if fail
          $('.results-message').hide().html('<span class="content">Oops! It looks like something went wrong. Please try again!</span>');
          $('.results-message').fadeIn(500);
        }
      });

    }

}

$(document).ready(function(){

  var isMobile;
  if (navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Android/i)) {
    isMobile = true;
  }

    // for nav hovers
  $('header#main-header nav li').on('mouseenter',function(){
    $(this).removeClass('dim');
    $(this).siblings('li').addClass('dim');
  });

    var knob = $("#home-circle-knob"), handle = $("#home-circle-handle"),
        mouseisdown = false,
        rotation,
        bgnum,
        i = 0,
        circle = $('#home-circle-outline'),
        angle = 0,
        cradius = 380;

   function drawCircle(angle) {
      angle %= 360;
      var radians= (angle/180) * Math.PI;
      var x = 500 + Math.cos(radians) * cradius;
      var y = 500 + Math.sin(radians) * cradius;
      var e = circle.attr("d");
      if(i==0) {
          var d = e+ " M "+x + " " + y;
      }
      else {
          var d = e+ " L "+x + " " + y;
      }  
      circle.attr("d", d);
      i++;    
    }

  // on click over the knob, calculate the resulting angle from the center
  var toDegrees = function(radians){
      return radians * 180 / Math.PI;
    };
  var moveknob = function(e){
    var offset = $("#home-circle-knob").offset();
    var fromLeft = e.pageX - offset.left,
        fromTop = e.pageY - offset.top;
    var d = toDegrees(Math.atan2(fromLeft - 190.0, 190.0 - fromTop)) + 270;
    handle.css({
      "-webkit-transform" : "rotate("+d+"deg)",
      "-moz-transform" : "rotate("+d+"deg)",
      "-ms-transform" : "rotate("+d+"deg)",
      "-o-transform" : "rotate("+d+"deg)",
      "transform" : "rotate("+d+"deg)",
    });
    // drawCircle(d);
    if (d > 260 && d < 330 && bgnum != 1) {
      bgnum = 1;
      $('#home-top .inner-circle').css('background-image','url(wp-content/themes/acuitycomplete/library/images/home-circle-frame-1.png)');
      $('#home-top .text-container').not('.one').addClass('hidden');
      $('#home-top .text-container.one').removeClass('hidden');
    } else if (d > 330 && d <= 390 && bgnum !=2) {
      bgnum = 2;
      $('#home-top .inner-circle').css('background-image','url(wp-content/themes/acuitycomplete/library/images/home-circle-frame-2.png)');
      $('#home-top .text-container').not('.two').addClass('hidden');
      $('#home-top .text-container.two').removeClass('hidden');
    } else if (d > 390 && d <= 450 && bgnum !=3) {
      bgnum = 3;
      $('#home-top .inner-circle').css('background-image','url(wp-content/themes/acuitycomplete/library/images/home-circle-frame-3.png)');
      $('#home-top .text-container').not('.three').addClass('hidden');
      $('#home-top .text-container.three').removeClass('hidden');
    } else if (d > 90 && d <= 150 && bgnum !=4) {
      bgnum = 4;
      $('#home-top .inner-circle').css('background-image','url(wp-content/themes/acuitycomplete/library/images/home-circle-frame-4.png)');
      $('#home-top .text-container').not('.four').addClass('hidden');
      $('#home-top .text-container.four').removeClass('hidden');
    } else if (d > 150 && d <= 210 && bgnum !=5) {
      bgnum = 5;
      $('#home-top .inner-circle').css('background-image','url(wp-content/themes/acuitycomplete/library/images/home-circle-frame-5.png)');
      $('#home-top .text-container').not('.five').addClass('hidden');
      $('#home-top .text-container.five').removeClass('hidden');
    } else if (d > 210 && d <= 260 && bgnum !=6) {
      bgnum = 6;
      $('#home-top .inner-circle').css('background-image','url(wp-content/themes/acuitycomplete/library/images/home-circle-frame-6.png)');
      $('#home-top .text-container').not('.six').addClass('hidden');
      $('#home-top .text-container.six').removeClass('hidden');
    }
  };
  knob.on("click", function(e){
    e.preventDefault();
    moveknob(e);
  });
  knob.on("mousemove", function(e){
    // if (mouseisdown){
      moveknob(e);
    // }
  });
  $(document).on("mouseup", function(e){
    mouseisdown = false;
  }).on("mousedown", function(e){
    mouseisdown = true;
  });

  // for touch devices

  if ('ontouchstart' in document.documentElement) {
    $('.graphic-message').text('Touch the areas on the graph to the left to learn more about each piece of the AcuityComplete process.');
    knob.on("touchstart", function(e){
      // e.preventDefault();
      moveknob(e);
      // $('.navbar .navbar-inner').css('background-color', '#000');
    });
    knob.on('touchmove',function(e){
      // e.preventDefault();
      moveknob(e);
    });
  }

  // for FAQ interactions 
  $('.faq-wrap').on('click','h1',function(){
    var parent = $(this).parent('.faq-wrap');
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      parent.removeClass('active');
    } else {
      parent.addClass('active');
      $('.faq-wrap').not(parent).removeClass('active');
      $(this).addClass('selected');
    }
  });

  // stories interaction
  setTimeout(function(){
    if ($('.story-wrap').length > 0) {
      $('.story-wrap').each(function(i,el){
        var innerHeight = $(this).find('.bottom .inner').height(),
            dtop = $(this).offset().top;
        $(this).attr('data-inner-height',innerHeight).attr('data-dtop',dtop);
      });
    }
  },500);
  var sTop, s;
  $('.story-wrap').on('click','.story-btn',function(e){
    e.preventDefault;
    s = $(this).parent('.story-wrap');
    stop = s.attr('data-dtop') - 90;
    bh = s.attr('data-inner-height');
    if (s.hasClass('active')) { 
      $('.story-wrap').removeClass('active');
      $('.story-btn').text('View Full Story');
      $('.story-wrap').find('.bottom').height(0);
    } else {
      $('.story-wrap').removeClass('active');
      s.addClass('active');
      s.find('.story-btn').text('Close');
      s.find('.bottom').height(bh);
      $('.story-wrap').not(s).find('.bottom').height(0);
      $('.story-wrap').not(s).find('.story-btn').text('View Full Story');
      $('html,body').animate({
        scrollTop : stop
      },300);
    }
  });
  $('.story-wrap .bottom .col:nth-child(3n)').addClass('last-col').after('<div class="clearfix"></div>');


  // contact form (Page: Get Started)
  $('.wpcf7').on('click','#contact-email',function(){
    $(this).addClass('dim');
    $('#contact-phone').removeClass('dim');
    $('input#contact-method').val('email');
  });
  $('.wpcf7').on('click','#contact-phone',function(){
    $(this).addClass('dim');
    $('#contact-email').removeClass('dim');
    $('input#contact-method').val('phone');
  });

  // adds backwards compatibilty support for placeholder option for contact form 7
    // Check if browser supports HTML5 input placeholder
    function supports_input_placeholder() {
      var i = document.createElement('input');
      return 'placeholder' in i;
    }

    // Change input text on focus
    if (!supports_input_placeholder()) {
      $(':text').focus(function(){
        var self = $(this);
        if (self.val() == self.attr('placeholder')) self.val('');
      }).blur(function(){
        var self = $(this), value = $.trim(self.val());
        if(val == '') self.val(self.attr('placeholder'));
      });
    } else {
      $(':text').focus(function(){
        $(this).css('color', '#000');
      });
    }

    if ($('#pricing-element-wrap').length > 0) {
      matrix.init();
    }

    // fix for iOS touch of menu 
    var navtouched = false;
    if (isMobile == true) {
      $('.navbar .menu-item-20').on('click','a',function(e){
        if (navtouched == false) {
          e.preventDefault();
          navtouched = true;
          $('ul.sub-menu').addClass('down');
        }
      });
    }

});