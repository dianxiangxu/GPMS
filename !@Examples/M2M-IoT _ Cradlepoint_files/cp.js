/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


jQuery(document).ready(function () {

	// Code for maintaining tabs history for bootstrap tab systemLanguage
	if (location.hash.substr(0,2) == "#!") {
		jQuery("a[href='#" + location.hash.substr(2) + "']").tab("show");
	}
 
	jQuery("a[data-toggle='tab']").on("shown.bs.tab", function (e) {
		var hash = jQuery(e.target).attr("href");
		if (hash.substr(0,1) == "#") {
			location.replace("#!" + hash.substr(1));
		}
	});
	
		
	// Gallery effects on 300-level page
	
	jQuery(".product-thumbnails a").click(function(e) {
			e.preventDefault();
			var image = jQuery(this).attr("data-src");
			
			jQuery(".main_image")
			.fadeOut(400, function() {
				jQuery(".main_image > img").attr('src',image);
			})
			.fadeIn(400);
	});
	
	//zoom effects on 300-level page
	if(jQuery('.productimage').length > 0) {
	jQuery('.productimage').click(function(){
		jQuery('.productimage').colorbox({
			href:jQuery(this).attr('src'),
		});
	});
	}
	
	
    jQuery("table.views-view-grid > tbody").find("td").each(function (index) {
        var content = jQuery(this).html();
        content = jQuery.trim(content);
        if (content.length == 0) {
            jQuery(this).remove();
        }
    });

    function toggleCpContainer(ww) {
        if (ww <= 767) {
            jQuery(".quick-accordion").prop('disabled', false);
            jQuery(".quick-accordion").show();
            jQuery(".quicktabs-wrapper").hide();
            jQuery(".quicktabs-wrapper").prop("disabled", true);
        } else {
            jQuery(".quick-accordion").hide();
            jQuery(".quick-accordion").prop('disabled', true);
            jQuery(".quicktabs-wrapper").prop("disabled", false);
            jQuery(".quicktabs-wrapper").show();
        }
    }
    jQuery(window).resize(function () {
        var wi = jQuery(window).width();
        toggleCpContainer(wi);
        togglebkImg(wi);        
        jQuery(".viyard_iframe").width(wi);
        jQuery(".viyard_iframe").height(400);
    });
    jQuery(document).ready(function () {
        jQuery(".quick-accordion").hide();
        var wi = jQuery(window).width();
        togglebkImg(wi);
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            jQuery(".quick-accordion").prop('disabled', false);
            jQuery(".quick-accordion").show();
            jQuery(".quicktabs-wrapper").hide();
            jQuery(".quicktabs-wrapper").prop("disabled", true);
        }     
    });

    function togglebkImg(ww) {
        /* For IPhone4,4S & 5 Portrait */
        if (ww <= 375) {

            //mobile graphic highlight visible
            jQuery(".cp-visible-desktop").hide();
            jQuery(".cp-visible-devices").show();
            jQuery(".cp-visible-ldevices").hide();
        }
        else if (ww > 375 && ww < 767) {
            //landscape graphic highlight visible
            jQuery(".cp-visible-desktop").hide();
            jQuery(".cp-visible-devices").hide();
            jQuery(".cp-visible-ldevices").show();
        }
        else {
            //landscape graphic highlight visible
            jQuery(".cp-visible-desktop").show();
            jQuery(".cp-visible-devices").hide();
            jQuery(".cp-visible-ldevices").hide();
        }
    }

    //product services 300 level page width adjustment according to products
    var plen = jQuery(".product-family-block > div.view-content").children().length;
    
    jQuery(".product-family-block > div.view-content").children().each(function (index) {
        var ww = jQuery(window).width();
        switch (plen) {
            case 1:
                if (ww <= 414) {
                    jQuery(this).css('width', '100%');

                } else {
                    jQuery(this).css('width', '99%');
                }
                break;

            case 2:
                if (ww <= 414) {
                    jQuery(this).css('width', '100%');

                } else {
                    jQuery(this).css('width', '49%');
                }
                break;

            case 3:                
                if (ww <= 414) {
                    jQuery(this).css('width', '100%');

                } else {
                    jQuery(this).css('width', '32%');
                }

            break;
            
            case 4:
                if (ww <= 414) {
                    jQuery(this).css('width', '100%');

                } else {
                    jQuery(this).css('width', '24%');
                }

            break;
        }

    });
    //only visible in mobile 
    jQuery("#block-menu-menu-mobile-product-level-300-le").addClass('visible-xs level300-left-bar');
    
});


(function ($, Drupal, window, document, undefined) {
	//Configure colorbox call back to resize with custom dimensions 
	  $.colorbox.settings.onLoad = function() {
	    colorboxResize();
	  }
	   
	  //Customize colorbox dimensions
	  var colorboxResize = function(resize) {
	    var width = "90%";
	    var height = "auto";
	    
	    if($(window).width() > 960) { width = "860" }
	    if($(window).height() > 700) { height = "auto" } 
	   
	    $.colorbox.settings.height = height;
	    $.colorbox.settings.width = width;
	    
	    //if window is resized while lightbox open
	    if(resize) {
	      $.colorbox.resize({
	        'height': height,
	        'width': width
	      });
	    } 
	  }
	  
	  //In case of window being resized
	  $(window).resize(function() {
	    colorboxResize(true);
	  });
	})(jQuery, Drupal, this, this.document);