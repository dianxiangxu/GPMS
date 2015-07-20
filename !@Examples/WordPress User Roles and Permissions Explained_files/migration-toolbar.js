jQuery(document).ready(function () {

    var toolbarMode = getCookie('toolbar_mode');
    var step1 = getCookie('toolbar-step1');
    var step2 = getCookie('toolbar-step2');
    var step3 = getCookie('toolbar-step3');
    var migrationPageSource = jQuery('.migration-source-value').val();
    var migrationPageTarget = jQuery('.migration-target-value').val();
    date = new Date();
    date.setTime(date.getTime() + 15552000000); //6 month

    //DEMO-FULL Cookies from app //////
    var migrationWizard = getCookie('migration_started');

    if (typeof migrationWizard != 'undefined' && migrationWizard != null && migrationWizard === 'full') {
        jQuery("#footer-toolbar-form").hide();
        jQuery("div.footer-toolbar-full-wrapper").show();
    }
    else {
        jQuery("#footer-toolbar-form").show();
        jQuery("div.footer-toolbar-full-wrapper").hide();
    }
    if (typeof migrationWizard != 'undefined' && migrationWizard != null && migrationWizard === 'demo') {

        jQuery("#footer-toolbar-form").hide();
        jQuery("div.footer-toolbar-demo-wrapper").show();
    }
    else {
        jQuery("#footer-toolbar-form").show();
        jQuery("div.footer-toolbar-demo-wrapper").hide();
    }

    if (step1 == 1) {
    jQuery('.step-toolbar.step1').addClass('step-done');
    }
    if (step2 == 1) {
    jQuery('.step-toolbar.step2').addClass('step-done');
    }
    if (step3 == 1) {
    jQuery('.step-toolbar.step3').addClass('step-done');
    }  

    if (typeof toolbarMode === 'undefined' || toolbarMode === '2' || toolbarMode === null) {
        jQuery(".footer-toolbar-wrapper").delay(4000).slideToggle("slow");
    } else {
        jQuery(".footer-toolbar-small").delay(4000).slideToggle("slow");
    }
    
    // if this is pair page, read data from hidden fields
    if (typeof migrationPageSource !== 'undefined' && typeof migrationPageTarget !== 'undefined') {
        jQuery('.step-toolbar.step1').addClass('step-done');
        jQuery('.step-toolbar.step2').addClass('step-done');
        jQuery('.step1 .dark-blue-button span').html('<div class="current-cms-div"><span class="from-span">From: </span><span class="current-cms-span">' + migrationPageSource + '</span></div><div class="current-cms-div"><span class="from-span">To: </span><span class="current-cms-span">' + migrationPageTarget + "</span></div>");
        jQuery('#footer-source-cart').val(migrationPageSource);
        jQuery('#footer-target-cart').val(migrationPageTarget);
        setCookie('f_source_cart', migrationPageSource, date, '/');
        setCookie('f_target_cart', migrationPageTarget, date, '/');
        setCookie('toolbar-step1', 1, date, '/');
        setCookie('toolbar-step2', 1, date, '/');
    } else if ( getCookie('f_target_cart') !== 'undefined' && getCookie('f_source_cart') !== 'undefined' && getCookie('f_target_cart') !== null && getCookie('f_source_cart') !== null) {
        jQuery('.step1 .dark-blue-button span').html('<div class="current-cms-div"><span class="from-span">From: </span><span class="current-cms-span">' + getCookie('f_source_cart') + '</span></div><div class="current-cms-div"><span class="from-span">To: </span><span class="current-cms-span">' + getCookie('f_target_cart') + "</span></div>");
    } else {
        jQuery('.step1 .dark-blue-button span').html('Setup your source and target platform');
    }

        
    jQuery(".toolbar-close.full").click(function() {
        setCookie('toolbar_mode', '1', date, '/');
        jQuery(".footer-toolbar-wrapper").slideToggle("slow");
        jQuery(".footer-toolbar-small").slideToggle("slow");

    });

    jQuery(".toolbar-close.small, .footer-toolbar-small span").click(function(e) {
        setCookie('toolbar_mode', '2', date, '/');
        jQuery(".footer-toolbar-wrapper").slideToggle("slow");
        jQuery(".footer-toolbar-small").slideToggle("slow");

    });

    jQuery('.step1 .dark-blue-button').click(function(e) {
        
        var migrationPageSource = jQuery('.migration-source-value').val();
        var migrationPageTarget = jQuery('.migration-target-value').val();
        
        //Get the screen height and width
        var toolmaskHeight = jQuery(document).height();
        var toolmaskWidth = jQuery(document).width();
    
        //Set heigth and width to mask to fill up the whole screen
        jQuery('.toolbar-mask').css({'width':toolmaskWidth,'height':toolmaskHeight});
        
        //transition effect     
        jQuery('.toolbar-mask').fadeIn(300);    
        jQuery('.toolbar-mask').fadeTo("fast",0.5); 
    
        //Get the window height and width
        //var winH = jQuery(window).height();
        //var winW = jQuery(window).width();
              
        //Set the popup window to center
        //jQuery('.select-window').css('top',  winH/2-jQuery('.select-window').height()/2);
        //jQuery('.select-window').css('left', winW/2-jQuery('.select-window').width()/2);
    
        //transition effect
        jQuery('.select-window').fadeIn(400); 
        
        if (typeof migrationPageSource !== 'undefined') {
            var sCMS = jQuery('.migration-source-value').val();
            
            var existsSource = false;
            jQuery('#footer-source-cart option').each(function(){
                if (this.value == sCMS) {
                    existsSource = true;
                }
            });
            
            if (!existsSource) {
            
            jQuery('#footer-source-cart').append(jQuery('<option>', {
                value: sCMS,
                text: sCMS
            }));
            jQuery('#footer-source-cart').delay(300).val(sCMS);
            
            }
        } 
        
        if (typeof migrationPageTarget !== 'undefined') {
            var sCMS = jQuery('.migration-target-value').val();
            
            var existsTarget = false;
            jQuery('#footer-target-cart option').each(function(){
                if (this.value == sCMS) {
                    existsTarget = true;
                }
            });
            
            if (!existsTarget) {
            
            jQuery('#footer-target-cart').append(jQuery('<option>', {
                value: sCMS,
                text: sCMS
            }));
            jQuery('#footer-target-cart').delay(300).val(sCMS);
            
            }
        } 
        
        if ( getCookie('f_target_cart') !== 'undefined' && getCookie('f_source_cart') !== 'undefined' && getCookie('f_target_cart') !== null && getCookie('f_source_cart') !== null) {
        jQuery('#footer-source-cart').delay(300).val(getCookie('f_source_cart'));
        jQuery('#footer-target-cart').delay(300).val(getCookie('f_target_cart'));
        }
        
            
    });
    
    jQuery('.toolbar-mask').click(function () {
        jQuery(this).hide();
        jQuery('.select-window').hide();
    });
    
    jQuery('.select-window .button.action').click(function () {
        var sourceCMS = jQuery('#footer-source-cart').val();
        var targetCMS = jQuery('#footer-target-cart').val();
        jQuery('.migration-source-value').val(sourceCMS);
        jQuery('.migration-target-value').val(targetCMS);
        jQuery('.select-window').hide();
        jQuery('.toolbar-mask').hide();
        setCookie('toolbar-step1', 1, date, '/');
        jQuery('.step-toolbar.step1').addClass('step-done');
        jQuery('.step1 .dark-blue-button span').html('<div class="current-cms-div"><span class="from-span">From: </span><span class="current-cms-span">' + sourceCMS + '</span></div><div class="current-cms-div"><span class="from-span">To: </span><span class="current-cms-span">' + targetCMS + "</span></div>");
        setCookie('f_source_cart', sourceCMS, date, '/');
        setCookie('f_target_cart', targetCMS, date, '/');
    });
    
    
});
    
    function resetStep() {
    var date = new Date();
    date.setTime(date.getTime() + 15552000000);
    setCookie('toolbar-step2', 0, date, '/');
    setCookie('toolbar-step3', 0, date, '/');
    jQuery('.step-toolbar.step2,.step-toolbar.step3').removeClass('step-done');
    }

    function setCMSlink() {
        //var migrationPageSource = jQuery('.migration-source-value').val();
        //var migrationPageTarget = jQuery('.migration-target-value').val();
        
    //  if (typeof migrationPageSource === 'undefined' && typeof migrationPageTarget === 'undefined') {
        var slink = jQuery('#footer-source-cart').val();
        var tlink = jQuery('#footer-target-cart').val();
        if (slink === tlink) {
        window.location.href = '/supported-cms/' + slink + '-update#migration_what';
        } else {
        window.location.href = '/supported-cms/' + slink + '-to-' + tlink + '-migration#migration_what';
        }
        
        
        //} else {
        //var slink = jQuery('.migration-source-value').val();
        //var tlink = jQuery('.migration-target-value').val();
        //window.location.href = '/supported-cms/' + slink + '-to-' + tlink + '-migration#migration_what';
    //}
    }
    
    function otherPrices() {

    if (jQuery(".sourceCMS").val() == "wix" || jQuery(".sourceCMS").val() == "html") {
            jQuery(".inp-pages").val("10");
            jQuery(".inp-users").prop('disabled', true).css({"opacity":"0.3"});
            jQuery(".inp-comments").prop('disabled', true).css({"opacity":"0.3"});
        
        } else {

            jQuery(".inp-pages").val("250");
            jQuery(".inp-users").prop('disabled', false).css({"opacity":"1"});
            jQuery(".inp-comments").prop('disabled', false).css({"opacity":"1"});
            
        }

    if (jQuery(".sourceCMS").val() == "bb-press" || jQuery(".sourceCMS").val() == "joomla-kunena" || jQuery(".sourceCMS").val() == "phpbb" || jQuery(".sourceCMS").val() == "vbulletin" || jQuery(".sourceCMS").val() == "ipboard" || jQuery(".sourceCMS").val() == "mybb" || jQuery(".sourceCMS").val() == "simple-machines-forum")
    {
        jQuery(".pages-block span").html("Threads");
        jQuery(".comments-block span").html("Posts");
    } else {
        jQuery(".pages-block span").html("Pages");
        jQuery(".comments-block span").html("Comments");
    }

        jQuery(".get-estimates").show("slow");
        jQuery(".start-free-demo").hide("slow");
        PagesPrice();
        
        var pointContainer = jQuery('.pricing_page');


    var source = pointContainer.find('select.sourceCMS').find(':selected'),
        sourceOptions = source.data('options'),
        target = pointContainer.find('select.targetCMS').find(':selected'),
        targetOptions = target.data('options');

    var arrayIntersect = function(a ,b) {
        var c  = {},
            el = '';
        for ( el in a ) {
            if ( typeof (b[el]) != undefined ) {
                c[el] = a[el];
            }
        }
        return c;
    }

    var availableOptions = arrayIntersect(sourceOptions, targetOptions);
    jQuery("#options_estimator").find("input").attr("disabled","disabled");
    jQuery.each(availableOptions, function(index, value) {
        jQuery("#options_estimator").find("input[name="+index+"]").prop("disabled", false);
    });  
    jQuery("#options_estimator").find("input").each(function(){
        if(jQuery(this).prop("disabled") === true){
            jQuery(this).prop("checked",false);
        }
    });
}


