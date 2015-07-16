var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp("^" + q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({
          value: str
        });
      }
    });

    cb(matches);
  };
};

$(document).ready(function() {

/* Fix for forms */
if( $('.elsevier-matrix-form').length ){
    $('.elsevier-matrix-form').wrap('<div class="row"><div class="large-12 columns"></div></div>');
  }

/** news-knovel-template search page**/

  if ($(".news-knovel-template .footer-news-wide").text().length == 0) {
    $(".news-knovel-template .footer-news-wide img").hide()
  }
  if (window.location.href.match(/queries_query_query/)) $(".news-knovel-template .lcont").removeClass("hide");
  if (window.location.href.match(/\/industry-insights(\/|$|\?)/)) {
    $(".news-knovel-template input[name='rootid']").remove();
    $(".news-knovel-template select[name='rootid']").removeClass("hide");
  } else $(".news-knovel-template select[name='rootid']").remove()
  var rootidsel = window.location.href.match(/rootid=([0-9]+)/);
  if (rootidsel) $(".news-knovel-template select[name='rootid']").val(rootidsel[1])

  $(".news-knovel-template select[name*='pubdate']").change(function() {
    $(".news-knovel-template input#filled").val("");
    $(".news-knovel-template select[name*='pubdate']").each(function() {
      if ($(this).val() != "--") $(".news-knovel-template input#filled").val("true");
    })
  })

  var options = "<option value='--'></option>";
  var thisyear = (new Date()).getFullYear();
  for (var i = thisyear; i >= thisyear - 10; i--) options += "<option value='" + i + "'>" + i + "</option>";
  $(".news-knovel-template .news-wide-search-year").html(options);




/**
 @description: Dynamically populates table with amount of Journals taken from FB source. Link to FB is defined in OpenAccessTable obj in vars section.
 This functionality uses Boxed Layout. Values are populated in items with classes: .open-access-normal and .open-access-support
 Also functionality displays popups for elements that uses .oa-popup classes; popup content...

**/
var OpenAccessTable = {
   vars:{ // stores all variables
      optionalValue: "1645", // TEMP - because we don't have dynamic data source yet
      fbResourceUrl: "/administration/oa-dynamic-data/open-access-journals", // assetId = #167440
      highlightClass: "highlight",
      t: null,
      arrowOffsetLeft: 88, //55
      arrowOffsetRight: 240,  //240
      popupOffset: 145 
   },
   sel:{ // stores all selectors
      oaNormal: ".open-access-normal",
      oaSupport: ".open-access-optional",
      highlightEl: ".highlight",
      oaPopup: ".oa-popup",
      oaPopupContent: ".oa-popup-content",
      openAccessWrapper: ".open-access",
      arrowBox: ".arrow-box"
   },
   init: function(){
      // sets journals amount
      if ( (jQuery(OpenAccessTable.sel.oaNormal).length > 0) || (jQuery(OpenAccessTable.sel.oaSupport).length > 0) ){

         OpenAccessTable.setJournals();  
    }

// add popups 
      if (jQuery(OpenAccessTable.sel.oaPopup)){
         OpenAccessTable.makePopups();
      }

   },

   // Dynamic Data
   setJournals: function(){
      var _self = this;
      var oaAmount = 0;
    
      // Full Open Access    
      jQuery.ajax({
         dataType: "json",
         url: _self.vars.fbResourceUrl,
         success: function(jsonData){
            oaAmount = jsonData.contents.length;

            jQuery(_self.sel.oaNormal).prepend(oaAmount);    
         }
      });
   
   },
    
   // Popups
   makePopups: function(){
     var _self = this;
     var counter = 0;
     var popupContentObj = null;
     var popupContentHtml = null;

     jQuery(_self.sel.oaPopup).each(function(){
    
        popupContentObj = jQuery(this).next(_self.sel.oaPopupContent);
        popupContentHtml = popupContentObj.html();
        if (popupContentHtml !== undefined){ // means content was found properly
        
           // attach popup content id to popup anchor
           jQuery(this).data("popupid","oa_c_"+counter);       

           // make popup
           var thisClass = "arrow-box";

           var popPos = jQuery(this).position();
           var halfwidth = parseInt(jQuery(this).width(), 10) / 2;

           popPos["top"] = parseInt(popPos["top"], 10) + 30;
           popPos["left"] = parseInt(popPos["left"], 10) + halfwidth;
           popPos["left"] = popPos["left"] - OpenAccessTable.vars.arrowOffsetLeft;
 
           if (jQuery(this).hasClass("oa-popup-right")){ // means this is popup with arrow on the right 160
             thisClass += " arrow-box-right";
             popPos["left"] = popPos["left"] + OpenAccessTable.vars.arrowOffsetLeft - OpenAccessTable.vars.arrowOffsetRight;
           }

           var popupContent = "<div class='"+thisClass+"' style='display:none; left: "+popPos["left"]+"px ; top: "+popPos["top"]+"px ;' id='oa_c_"+counter+"'>";
           popupContent += popupContentHtml;
           popupContent += "</div>";
        
           popupContentObj.remove();
           jQuery(this).after(popupContent);

           OpenAccessTable.attachPopupHandlers(jQuery(this));  
           OpenAccessTable.popupHover(jQuery("#oa_c_"+counter));  
           
           counter++;
        }
        else{ // means content was not found for this element - remove popup class then
           jQuery(this).removeClass("oa-popup");
        }
     });
   },
   attachPopupHandlers: function(thisLink){
       // add intearaction to popups
    thisLink.hover(
        function(e){ // hover in
			
           // show this popup
           jQuery(this).data("open", true);
           thisId = jQuery(this).data("popupid");
           jQuery("#" + thisId).fadeIn();    
        },
        function(){
          var thisId = jQuery(this).data("popupid");        
          thisId = jQuery(this).data("popupid");
          jQuery("#" + thisId).data("visible", true);
          OpenAccessTable.vars.t = setTimeout(function(){
             jQuery("#" + thisId).fadeOut();	
             jQuery("#" + thisId).data("visbile", false);
          }, 700);
        }
    );
   },
   popupHover: function(thisPopup){
	   thisPopup.hover(
         function(){
            clearTimeout(OpenAccessTable.vars.t);
         },
         function(){
           jQuery(this).fadeOut();		
         }
       );
   }
    
};


  OpenAccessTable.init();

  if ($('#books_authors').length)
    $('#books_authors').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    }, {
      name: 'authors',
      displayKey: 'value',
      source: substringMatcher(authors_suggestions.suggestions)
    });


  $(".book-filters select").change(function() {
    window.location.href = $(this).val();
  });


  $(".exhibition-filters select").change(function() {

    var urlStr = window.location.href.split("?")[0] + "?";

    $(".exhibition-filters select").each(function() {
      if ($(this).find("option:selected").index() !== 0) {
        urlStr += "&" + $(this).attr("name") + "=" + $(this).val();
      }

    });

    window.location.href = urlStr;
  });


});

jQuery(document).ready(function($) {
  $("#books_authors").keyup(function(e) {
    if (e.keyCode == 13) {
      window.location.href = window.location.href.split("?")[0] + "?query=" + $(this).val();
    }
  });


  //Funding agreements table
  $('.agreements-page [desc="table"]').hide().eq(0).show();
    $('#toolkit-dropdown-one').on('change',function() {
        $('.agreements-page [desc="table"]').hide();
        var table = $('option:selected',this).val();
        $('.agreements-page #' + table).show();
    });
});

/* Search filter */
$(document).ready(function() {
  $("#all-types").change(function() {
    if ($(this).prop("checked")) {
      $(".gscopes, .meta_T").prop("checked", false);
      $("#gscope").val("");
      $("#meta_T_not").val("");
    }
  })
  $(".gscopes, .meta_T").change(function() {
    if ($(".gscopes:checked, .meta_T:checked").length) $("#all-types").prop("checked", false)
  })

  function gscopesscope() {
    if ($("#all-types:not(:checked)").length) {
      var gscopes = $(".gscopes:not(:checked)");
      var gscopes_str = "";
      for (var i = 0; i < gscopes.length; i++) {
        gscopes_str += ((i != 0) ? (",") : "") + $(gscopes[i]).val() + "!";
      }
      for (var i = 0; i < gscopes.length - 1; i++) {
        gscopes_str += "+";
      }
      $("#gscope").val(gscopes_str);
    } else $("#gscope").val("");
    if ($("#gscope").val()) $("#gscope").attr("name", "gscopes1");
    else $("#gscope").attr("name", "");
    if ($(".gscopes:checked").length == 0) $("#gscope").val("");
  }
  gscopesscope();
  $(".gscopes").change(function() {
    gscopesscope();
  });

  function productsfilters() {
    if ($("#all-types:not(:checked)").length) {
      var products = $(".meta_T:not(:checked)");
      var products_str = "";
      for (var i = 0; i < products.length; i++) {
        products_str += ((i != 0) ? (" ") : "") + $(products[i]).val();
      }
      $("#meta_T_not").val(products_str);
    } else $("#meta_T_not").val("");
    if ($("#meta_T_not").val()) $("#meta_T_not").attr("name", "meta_T_not");
    else $("#meta_T_not").attr("name", "");
    if ($(".meta_T:checked").length == 0) $("#meta_T_not").val("");
  }
  productsfilters();
  $(".meta_T").change(function() {
    productsfilters();
  });
  $(".searchform").submit(function() {
    if ($("#filter").val() == "JN" || $("#filter").val() == "BK") {
      $("#filter").after("<input type='hidden' name='meta_T' value='" + $("#filter").val() + "' />");
    } else if ($("#filter").val() != "") {
      $("#filter").after("<input type='hidden' name='gscope1' value='" + $("#filter").val() + "' />");
    }
  })
});
/* book desc */
(function($) {
  $.fn.ellipsis = function() {
    return this.each(function() {
      var el = $(this);

      if (el.css("overflow") == "hidden") {
        var text = el.html();
        var multiline = el.hasClass('multiline');
        var t = $(this.cloneNode(true))
          .hide()
          .css('position', 'absolute')
          .css('overflow', 'visible')
          .width(multiline ? el.width() : 'auto')
          .height(multiline ? 'auto' : el.height());

        el.after(t);

        function height() {
          return t.height() > el.height();
        };

        function width() {
          return t.width() > el.width();
        };

        var func = multiline ? height : width;

        while (text.length > 0 && func()) {
          text = text.substr(0, text.length - 1);
          t.html(text + "...");
        }

        el.html(t.html());
        t.remove();
      }
    });
  };



})(jQuery);


$(document).ready(function() {
 $(".add-expander").each(function(){
  $(this).addClass("long hide").after($(".add-expander").clone().removeClass("long hide").addClass("short multiline ellipsis expander-contracted "));
 });

 if ($('.journal-title').length > 0 && $(window).width() <= '480') {
   truncMobText();
 }

  $(window).on('resize', function () {
    truncMobText();
  });






});
$(window).load(function() {
  $(".ellipsis").ellipsis();
  $(".view_full_description").click(function(e) {
    e.preventDefault();
    if ($(".book-description.long:visible").length > 0) {
      $(".book-description.long").hide();
      $(".book-description.short").show();
      $(this).text("View full description");
    } else {
      $(".book-description.long").show();
      $(".book-description.short").hide();
      $(this).text("Hide full description");
    }
  })

$(".add-expander-book").each(function(){
  $(this).addClass("long hide").after($(".add-expander-book").clone().removeClass("long hide").addClass("short multiline ellipsis expander-contracted big"));
 });

$(".view_full_content").click(function(e) {
    e.preventDefault();
    if ($(".book-content.long:visible").length > 0) {
      $(".book-content.long").hide();
      $(".book-content.short").show();
      $(this).text("View full contents");
    } else {
      $(".book-content.long").show();
      $(".book-content.short").hide();
      $(this).text("Hide full contents");
    }
  })
});


function truncMobText() {
  if ($(window).width() <= '480') {
    $('.truncated-title').removeClass('hide');
    $('.normal-title').addClass('hide');
  } else {
    $('.truncated-title').addClass('hide');
    $('.normal-title').removeClass('hide');
  }
}



var App = (function(App, $)
{
  App.init = function() {
    _secondaryNav();
  };

  var _secondaryNav = function() {
    var nav = $('#secondary-nav');
    if (!nav.length) {
      return;
    }
    nav.find('li').each(function() {
      var self = $(this);
      var anchor = self.find('a').first();
      if (anchor.attr('data-id') == anchor.attr('data-globals-id')) {
        self.addClass('menu-item-active');
      }
    });
  };

  return App;
})(App || {}, jQuery);
jQuery(document).ready(function() {
  App.init();
  innovation_popups();

  // show & box
  $('.show-more-btn').on('click', function(e){
    e.preventDefault();
    $(this).siblings('.full-description-text').toggleClass('hide');
    $(this).parent().find('.show-more-btn').toggleClass('hide');
  });

});


function innovation_popups() {

  $('.ci-tooltip-trigger').each(function (e) {
    // Removes target attribute
    var thisTooltip = $(this);
    thisTooltip.find('.ci-tooltip.arrow_r').on('click', function (e) {
      e.stopPropagation();
    });

  $('.div-citooltip-close').on('click', function (e) {
    e.preventDefault();
    $(this).parents('.ci-tooltip').hide();
  });

    /* *************** */
    /* !! IMPORTANT !!
    /* *************** */
    // change in ajax to new_url before live, after funnelback index new asset ID's

    //old_url = "//www.elsevier.com/fb-search/content-innovations/display-ci-lightbox-content";
    new_url = "/_resources/content-innovation/ci-lightbox-content";


    // Applies lightbox on each click
    thisTooltip.click(function (e) {
      if ($(e.target).parents('.ci-tooltip').length || $(e.target).is('.ci-tooltip') || $(e.target).parents('.filter-by').length || $(e.target).is('.filter-by')) return;
      $('.ci-tooltip').hide();
      e.stopPropagation();
      e.preventDefault();
      $('.ci-tooltip-up-arrow').remove();

      //Close all other tooltips
      $('.ci-tooltip').each(function () {
        var tt = thisTooltip;
        if (!$(this).parent('.ci-tooltip-trigger').is(tt)) {
          $(this).hide();
        } 
        else {
        }
      });

      thisTooltip.find('.ci-tooltip').show().css('display', 'block');
      var linkXPosition = (e.offsetX == undefined || 1 == 1) ? (e.pageX - $(this).offset().left + $(this).position().left)  : (e.offsetX + 15);
      var linkYPosition = (e.offsetY == undefined || 1 == 1) ? (e.pageY - $(this).offset().top + $(this).position().top)  : (e.offsetY + 38);
      thisTooltip.before('<span class=\'tooltip-up-arrow\'></span>');
      thisTooltip.prev().css({
        left: linkXPosition,
        top: linkYPosition
      }).css('visibility', 'visible');
      var rright = - 70;
      if (linkXPosition > 150)
      rright = - 100;
      rright = rright + 150;
      var ttop = 29;
      if ($(this).position().top > 55)
      ttop = 29 + 18;
      thisTooltip.find('.ci-tooltip').css({
        top: linkYPosition - ttop,
        right: - 150 + rright
      });
      //Hide the read more and example article links if their urls are blank, i.e. there is no content
      thisTooltip.find('.div-tooltip-clickable').each(function () {
        var thisLink = $(this);
      });
      var $tooltipHeader = $('.ci-tooltip-header');
      var url = thisTooltip.attr('data-tooltip-content') !== '' ? thisTooltip.attr('data-tooltip-content')  : undefined;
      var urlid = thisTooltip.attr('data-tooltip-id') !== '' ? thisTooltip.attr('data-tooltip-id')  : undefined;
      var $inner = thisTooltip.find('.ci-tooltip-inner');
      if ($inner.length) {
        $inner.html('');
      } else {
        $tooltipHeader.after('<span class=\'ci-tooltip-inner\'></span>')
      }
      thisTooltip.find('.div-tooltip-clickable').click(function () {
        window.location.href = $(this).data('url');
      })
      thisTooltip.find('.ci-tooltip-inner').html('<span class=\'loader-image\'><img src=\'/s/resources/elsevier-content-innovation/ajax-loader.gif\'/></span>');
      
      if (urlid !== undefined) {

        // Show lightbox with content
        $.ajax({
          type: 'POST',
          url: new_url + '?id=' + urlid,
          jsonpCallback: 'retdata',
          crossDomain: true,
          dataType: 'jsonp',
          success: function (data) {
            data = data.arr[0].content;
            thisTooltip.find('.ci-tooltip-inner').html((data));
            thisTooltip.find('.loader-image').remove();
            thisTooltip.find('.div-tooltip-clickable').each(function () {
              var thisLink = $(this);
              if (thisLink.data('url') == '' || thisLink.data('url') == '#')
              thisLink.hide();
               else
              thisLink.show();
            });
          },
          error: function (data, data2, data3) {
          }
        });
      }
    });
  });



}
