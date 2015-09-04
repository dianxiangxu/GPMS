(function($){
/* *************************************************************** */
$(document).ready(function () {
/* *************************************************************** */
    if ( $('select.makeMeFancy').length ) {
        $('select.makeMeFancy').tzSelect({
            render : function(option){
                return $('<li>',{
                 html:   '<span class="'+option.data('icon')+'"><div></div>'+ option.data('html-text')+'</span>'

                });
            },
            class : 'hasDetails'
        });
    }
    $('.select1 .hasDetails li').wrapAll("<div class='dropDownScroll' />");
    $(window).load(function(){
        if ($(".dropDownScroll").length){
        $(".dropDownScroll").mCustomScrollbar();
        }
    });

    $(".show-case-cont").find(".show-case-block").each(function(index){
    if (index % 2 !== 0) {
        var showCaseBanner = $('<div class="show-case-banner big-button-hiw big-button-block"><div class="container"><div class="leftpart">Start your <span>free</span>, no risk,<br>demo migration!</div><div class="rightpart"><a class="button super" id="startMigrationButton" title="Click to start free Demo" href="https://app.cms2cms.com/wizard/?utm_source=ShowCase&utm_medium=banner&utm_campaign=CMS2CMS_website">Start Free Demo</a></div></div></div>');
        if ($(this).find('.show-case-banner').length){
            $(this).find('.show-case-banner').html(showCaseBanner);
        } else {
            $(this).append(showCaseBanner);
        }
    }
    });
    // Calling the default version of the dropdown
    $('select.regularSelect').tzSelect();

    $('.migration_supperted_ways_tabs a').on('click', function(e){
        e.preventDefault();
        $('.migration_supperted_ways_tabs a').closest('li').removeClass('active');
        $(this).closest('li').addClass('active');
        $('.migrations_way').removeClass('active');
        $('.migrations_way.'+$(this).attr('href').substr(1)).addClass('active');
    });

    $('.migrations_way .show_more').on('click', function(e){
        e.preventDefault();
        $(this).closest('.migrations_way').find('.migration_planned_ways').toggle();
    });

    // estimator button
    $('.estimate_button.show_estimate').on('click', function(e) {
        e.preventDefault();

        var migrationEstimator = $(".migration_estimator");
        migrationEstimator.show();

        $('html, body').animate({
            scrollTop: parseInt(migrationEstimator.offset().top) - 100
        }, 750);
    });

    // migration menu animation
    $('.migration_menu_item').on('click', function(e) {
        e.preventDefault();

        var acceptor = $( 'a[name=' + $(this).attr('href').substr(1) + ']' );
        $('html, body').animate({
            scrollTop: parseInt(acceptor.offset().top) - 100
        }, 500);
    });

     $(".present-li").click(function(e){
    e.preventDefault();
        if ($(this).siblings("div").hasClass("present-hide")) {
            $(this).siblings("div").removeClass("present-hide").addClass("present-show");
        } else {
            $(this).siblings("div").removeClass("present-show").addClass("present-hide");
        }

    });
    
    $('#hiw_image_enjoy_result').on('click', function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: parseInt($('.the_counter').offset().top) - 50
        }, 750);
    });


    // On ready
    if ( $('div.the_tour').length && !$('body').hasClass('home') ) {
        animateTourLandscape();
    }

    // Video
    $('area.video , a.video').on('click', function(e){
        e.preventDefault();
        playBridgeVideo();
    });

    $('a.overlayClose', '.videoOverlay').on('click', function(){
        stopBridgeVideo();
    });
    $('.videoOverlay').on('click', function(){
        stopBridgeVideo();
    });


    // Migration Menu
    var migration_page_menu = $('#migration_page_menu');
    var migration_page_menu_position_cache = {
        top: 0,
        left: 0
    };
//    var migration_page_menu_anchors_cache = migration_page_menu.find('li a');
//    migration_page_menu_anchors_cache.on('click', function(e){
//        migration_page_menu_anchors_cache.removeClass('active');
//        $(this).addClass('active');
//    });
    function fixMigrationMenu() {
        var position = migration_page_menu.position();
        if ( migration_page_menu_position_cache.top === 0 ) {
            migration_page_menu_position_cache = position;
        }

        if ( $(window).scrollTop() > migration_page_menu_position_cache.top && !migration_page_menu.hasClass('fixed_menu') ) {
            migration_page_menu.addClass('fixed_menu');
            migration_page_menu.css('top', 0);
            migration_page_menu_position_cache.top = 0;
        } else  if ( $(window).scrollTop() < 350 && migration_page_menu.hasClass('fixed_menu') ) {
                migration_page_menu.removeClass('fixed_menu');
                migration_page_menu.css('top', 0);
                migration_page_menu_position_cache.top = 0;
            }
        }
/*
        // highlight current menu
        var curPosition = 0;
        var curName = '';
        var closestAnchorPosition = 0;
        var closestAnchorName = '';
        migration_page_menu_anchors_cache.each(function(){
            curName = $(this).attr('href').substr(1);
            curPosition = parseInt($('a[name='+curName+']').position().top) - parseInt($(window).scrollTop());
            if ( (closestAnchorPosition <= 0 && closestAnchorPosition < curPosition) || (closestAnchorPosition >= 0 && closestAnchorPosition > curPosition) ) {
                closestAnchorPosition = curPosition;
                closestAnchorName = curName;
            }
        });

        migration_page_menu.find('li a').removeClass('active');
        if ( closestAnchorName ) {
            migration_page_menu.find('a[href=#' + closestAnchorName + ']').addClass('active');
        }
*/


   if ( migration_page_menu.length ) {
       $(window).scroll(fixMigrationMenu);
       fixMigrationMenu();
    }

    // Send event on every link with APP
    $('a, area').on('click', function(e) {
        if ( typeof _gaq == 'object' && _gaq.push ) {
            var DELAY = 2000;
            var href = $(this).attr('href');
            if ( /https?:\/\/app\.cms2cms\.com/i.test(href) ) {
                // give google chance to receive event
//                e.preventDefault();
                var category = 'Action Button';

                var to = href.match(/https?:\/\/app\.cms2cms\.com([^\?]*)/i);
                to = to[1];

                var from = document.location.href;

                var div = $(this).closest('div');
                var divId = div.attr('id');
                var divClass = div.attr('class');
                var value = divId || divClass;

                from = from + "#" + value;

                args = ['_trackEvent', category, to, from];
                _gaq.push(args);

                // pass URL after DELAY milliseconds
//                setTimeout(function(){
//                    document.location.href = href;
//                }, DELAY);

            }
        }
    });

    // migration single switcher
    $('a.to_or_from_link').on('click', function(e){
        e.preventDefault();
        var content = $('#content');
        if ( !content.hasClass('show_migrate_from') ) {
            content.addClass('show_migrate_from');
        }
        else {
            content.removeClass('show_migrate_from');
        }
    });

    // pause home CMS animation on main button hover
    $('#startMigrationButton, #moreMigrationButton').hover(
        function() {
            $(this).addClass('hovered');
        },
        function() {
            $(this).removeClass('hovered');
        }
    );

    // focus on subscribe
//    $('.migration_subscribe #subscribe_name').focus();



    // fix header rorator urls, when we back from app after submit rotator form
        var rotator = $('.header_line');
        var afterBackSourceRotator = rotator.find('select[name="sourceType"]');
        var afterBackTargetRotator = rotator.find('select[name="targetType"]');

        var afterBackSource = afterBackSourceRotator.find(':selected');
        var afterBackTarget = afterBackTargetRotator.find(':selected');

        //get cookie
        var cookieSlugs = getCookie('cms2cms_selected_migration_pair');

        if ( cookieSlugs ) {
            var slugs = cookieSlugs.split('|');
            var sourceSlug = slugs[0];
            var targetSlug = slugs[1];
            if (sourceSlug && targetSlug) {
                $('#startMigrationButton').addClass('stopped');

                $('#moreMigrationButton').attr('href', getLinkToSupportedCmsBySourceAndTarget(sourceSlug, targetSlug) );
                afterBackSourceRotator.find('option').removeAttr('selected');
                afterBackSourceRotator.find('option[data-slug="'+sourceSlug+'"]').attr('selected', 'selected');
                afterBackTargetRotator.find('option[data-slug="'+targetSlug+'"]').attr('selected', 'selected');
            }
        };

        // set cookie
        $('.tzSelect').find('.dropDown').on('click', 'li', function() {
            var afterBackSource = afterBackSourceRotator.find(':selected');
            var afterBackTarget = afterBackTargetRotator.find(':selected');

            var afterBackSourceSlug = afterBackSource.data('slug');
            var afterBackTargetSlug = afterBackTarget.data('slug');

            setCookie('cms2cms_selected_migration_pair', afterBackSourceSlug + '|' + afterBackTargetSlug);
        });

    // Search INPUT DROPDOWN
    $('.select1 .dropDown').prepend('<input id="search-input" type="text" role="search" placeholder="Search Your CMS" autofocus>');
    $('.dropDown').prepend('<div class="search-title">Select Your Current CMS Type</div><div class="button-close"></div>');
    $('.dropDown').find('input').fastLiveFilter($('.select1 .dropDown'));
    // Tooptip Advanced
    $('.qmark').hover(function(e){
        $('span.hint', this).css({
            display: 'block'
        });
        clearTimeout($(this).data('timeout'));
    } , function(e){
        var hint = $('span.hint', this);
        $(this).data('timeout', setTimeout( function () {
            hint.hide();
        }, 250));
    });

    var showPopupOnMouseOutTheWindow = true;
    if (showPopupOnMouseOutTheWindow && typeof(THEMEE_PO_BIG_NAME) != 'undefined' ) {

        // create overlays
        $('body').append('<div id="themee_po_box"><a href="#" class="themee_po_close">&times;</a><div class="themee_po_content"></div></div><div id="themee_po_overlay"></div>');
        var themeePoOverlay = $('#themee_po_overlay');
        var themeePoBox = $('#themee_po_box');

        themeePoBox.find('.themee_po_content').html(
        '<form action="//app.cms2cms.com/quick-wizard/" method="get">' +
            '<input type="hidden" name="utm_source" value="PopUp" />' +
            '<input type="hidden" name="utm_medium" value="Blog" />' +
            '<input type="hidden" name="utm_campaign" value="QuickWizard" />' +
            '<input type="hidden" name="previewTargetType" value="' + THEMEE_PO_BIG_NAME + '" />' +
            '<input type="text" name="sourceUrl" placeholder="Enter Your Site URL..." value="" />' +
            '<input type="image" name="go" src="/qwizard/blank.png" />' +
        '</form>'
        );

        $(document).on('mouseleave', function(e){
            // show the overlay
            // when client out the window on the top
            if ( e.pageY - $(window).scrollTop() <= 1 && !getCookie('themee_po') )
            {
                // fire
                themeePoOverlay.show();

                themeePoBox.css({
                    top  : ($(window).height() - themeePoBox.height()) / 2,
                    left : ($(window).width() - themeePoBox.width()) / 2,
                    backgroundImage: 'url(/qwizard/big-' + THEMEE_PO_BIG_NAME + '.png)'
                }).show();

                var days = 7;
                var date = new Date();
                var cookieDueDate = date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

                cookieDueDate = new Date(cookieDueDate);
                cookieDueDate = cookieDueDate.format('ddd, d mmm yyyy h:MM:ss "GMT"');

                setCookie('themee_po', '1', cookieDueDate, '/');
            }
        });

        //close overlay
        $('body').on('click', '#themee_po_box .themee_po_close', function(e){
            var themeePoOverlay = $('#themee_po_overlay');
            var themeePoBox = $('#themee_po_box');

            themeePoBox.hide();
            themeePoOverlay.hide();
            e.preventDefault();
        });

        $(window).on('resize', function(e){
            if ( themeePoBox.is(':visible') ) {
                themeePoBox.css({
                    top  : ($(window).height() - themeePoBox.height()) / 2,
                    left : ($(window).width() - themeePoBox.width()) / 2
                });
            }
        });
    }

    var tabContainers = $('div.package-tabs > div');
    var tabNavigation = $('div.package-tabs ul.package-nav-tabs a');
    var scrolltoTop = function (){
        var positionTabContainer =  tabContainers.offsetTop;
      $('html, body').animate({
        scrollTop:positionTabContainer-100},0)
    };

        tabContainers.hide().filter(':first').show();
        $(document).on('load', function(){
            if(location.hash.length > 0){
                scrolltoTop(1050, 0);
            }
        });

        tabNavigation.click(function () {
            tabContainers.hide();
            tabContainers.filter(this.hash).show();
            tabNavigation.removeClass('selected');
            $(this).addClass('selected');
            location.hash = this.hash;
            scrolltoTop(1050, 0);
            return false;
        });

        hash = window.location.hash;
        elements = $('a[href="' + hash + '"]');
        if (elements.length !== 0) {
            elements.click();
            scrolltoTop(1050, 0);
        }

    var noCard = $('.no-card');
    if (noCard !== 'undefined') {
        noCard.append('<span class="no-card-text">No credit card required</span>');
    }
    // Upload file button
    $('.write-us').find('#file_upload').parent('span').addClass('addFile');
    var imageUpload = $('#file_upload');
    imageUpload.parent('span').prepend('<div class="photo-attach added-photo">Thanks!</div>');

    imageUpload.change(function(e) {
        if (imageUpload.val() !== '' && imageUpload.val() !== 'undefined') {
            $('.added-photo').show();
        }
        else {
            $('.added-photo').hide();
        }
    });
// Pricing page FAQ animation
        var faqContainer = $('.qa-block');
        var faq = $('.widget-pricing');
        var know = faqContainer.find(faq);
        know.find('.qa-anchor').bind("click", function () {
            var content = $(this).siblings('div.qa-answer');
            know.find('.qa-answer').not(content).animate({height: 'hide', opacity: 'hide'}, 300);
            know.find('.qa-anchor').not($(this)).removeClass('expanded');
            content.slideToggle(500);
            $(this).toggleClass('expanded');
            return false;
        });

    whitePaper.download();
    if (getCookie('white-paper')) {
        $('.whitep-land-form').addClass('whitep-land-form-hidden');
        $('.white-paper-img').find('#newpricing-butt').removeClass('newpricing-butt-hide');
    } else {
        $('.whitep-land-form').removeClass('whitep-land-form-hidden');
        $('.white-paper-img').find('#newpricing-butt').addClass('newpricing-butt-hide');
    }

    var popup_days = 14;
    var popup_date = new Date();
    var popup_cookieDueDate = popup_date.setTime(popup_date.getTime() + (popup_days * 24 * 60 * 60 * 1000));
    popup_cookieDueDate = new Date(popup_cookieDueDate);
    var popup_cookie = getCookie('popup_cookie');
    var curr_url = document.location.href;
    if (popup_cookie) {
        popup_cookie = JSON.parse(popup_cookie);
        if (popup_cookie[curr_url]) { PopUpShow(); }
        else {
            popup_cookie[curr_url] = true;
            setCookie('popup_cookie', JSON.stringify(popup_cookie), popup_cookieDueDate, '/', '.cms2cms.com');
        }
    } else {
        popup_cookie = {};
        popup_cookie[curr_url] = true;
        setCookie('popup_cookie', JSON.stringify(popup_cookie), popup_cookieDueDate, '/', '.cms2cms.com');
    }
    function PopUpHide(){ $('#popup1').fadeOut(); }
    $("body").on('click','.pop-up-close', function(){ PopUpHide(); });

    function PopUpShow(){ $('#popup1').fadeIn();}
    var popup_width = parseInt($("#content").css('width'));
    $('#popup1').css({'width': popup_width, 'left': 0});

    var optionLegend = $('.ecomSelector').find('option');
    $.each(optionLegend, function(){
        if ($(this).val().indexOf('---') != -1) {
            $(this).addClass('option-legend');
        }
    });

/* *************************************************************** */
}); // END READY
/* *************************************************************** */

    // Function list

    function animateTourLandscape( ) {

        setInterval(function() {
            var posFar = $('div.bg_far','div.the_tour');
            if (posFar.css('background-position') == 'undefined' || posFar.css('background-position') == null) {
                posFar = posFar.css("background-position-x"); //die in hell
            } else {
                posFar = posFar.css('background-position').split(" ")[0];
            }
            posFar = parseFloat( posFar );
            $('div.bg_far','div.the_tour').css('background-position', (posFar-1)+'px 100%' );

            var posMiddle = $('div.bg_middle','div.the_tour');
            if (posMiddle.css('background-position') == 'undefined' || posMiddle.css('background-position') == null) {
                posMiddle = posMiddle.css("background-position-x"); //die in hell
            } else {
                posMiddle = posMiddle.css('background-position').split(" ")[0];
            }
            posMiddle = parseFloat( posMiddle );
            $('div.bg_middle','div.the_tour').css('background-position', (posMiddle-2)+'px 100%' );
        }, 40);

        setInterval(function(){
            var posNear = $('div.bg_near','div.the_tour');
            if (posNear.css('background-position') == 'undefined' || posNear.css('background-position') == null) {
                posNear = posNear.css("background-position-x"); //die in hell
            } else {
                posNear = posNear.css('background-position').split(" ")[0];
            }
            posNear = parseFloat( posNear );
            $('div.bg_near','div.the_tour').css('background-position', (posNear-2)+'px 100%' );
        }, 30);

    }

    /* *************************************************************** */


/* *************************************************************** */
})(jQuery);
/* *************************************************************** */

function getLinkToSupportedCmsBySourceAndTarget( sourceSlug, targetSlug ) {
    var hrefUrl = sourceSlug + '-to-' + targetSlug + '-migration';
    if ( targetSlug == sourceSlug ) {
        hrefUrl = sourceSlug + '-update';
    }
    return '/supported-cms/' + hrefUrl;
}

/* JSONP */

(function(global) {

    var evalJSONP = function(callback) {
        return function(data) {
            var validJSON = false;
            if (typeof data == "string") {
                try {validJSON = JSON.parse(data);} catch (e) {
                    /*invalid JSON*/}
            } else {
                validJSON = JSON.parse(JSON.stringify(data));
                window.console && console.warn(
                    'response data was not a JSON string');
            }
            if (validJSON) {
                callback(validJSON);
            } else {
                throw("JSONP call returned invalid or empty JSON");
            }
        }
    };

    var callbackCounter = 0;
    global.JSONPCallbacks = [];
    global.JSONP = function(url, callback) {
        var count = callbackCounter++;
        global.JSONPCallbacks[count] = evalJSONP(callback);
        url = url.replace('=callback', '=JSONPCallbacks[' + count + ']');

        var scriptTag = document.createElement('SCRIPT');
        scriptTag.src = url;
        document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
    };

})(this);


/* Format Date
*  http://blog.stevenlevithan.com/archives/date-time-format
* */

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
    var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var	_ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d:    d,
                dd:   pad(d),
                ddd:  dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m:    m + 1,
                mm:   pad(m + 1),
                mmm:  dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy:   String(y).slice(2),
                yyyy: y,
                h:    H % 12 || 12,
                hh:   pad(H % 12 || 12),
                H:    H,
                HH:   pad(H),
                M:    M,
                MM:   pad(M),
                s:    s,
                ss:   pad(s),
                l:    pad(L, 3),
                L:    pad(L > 99 ? Math.round(L / 10) : L),
                t:    H < 12 ? "a"  : "p",
                tt:   H < 12 ? "am" : "pm",
                T:    H < 12 ? "A"  : "P",
                TT:   H < 12 ? "AM" : "PM",
                Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default":      "ddd mmm dd yyyy HH:MM:ss",
    shortDate:      "m/d/yy",
    mediumDate:     "mmm d, yyyy",
    longDate:       "mmmm d, yyyy",
    fullDate:       "dddd, mmmm d, yyyy",
    shortTime:      "h:MM TT",
    mediumTime:     "h:MM:ss TT",
    longTime:       "h:MM:ss TT Z",
    isoDate:        "yyyy-mm-dd",
    isoTime:        "HH:MM:ss",
    isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

// ShowCase Filter
(function($){
    $(document).ready(function(){

        var ShowCase = {
            init : function(){
                this.resetShowCase();
            },
            resetShowCase : function(){
                var self = this;
                var resetItem = $("#reset-showcase");
                resetItem.bind('click', function(e){
                    self.showCaseOption.item.fadeIn();
                    self.showCaseOption.noResult.hide();
                    self.showCaseOption.source.find("option").prop("selected", false);
                    self.showCaseOption.target.find("option").prop("selected", false);
                    e.preventDefault();
                });
            },
            showCaseOption : {
                source : $("#source-showcase"),
                target : $("#target-showcase"),
                item : $(".show-case-cont").find(".show-case-block"),
                noResult : $(".no-result")
            },
            notFound : function(){
                if(this.showCaseOption.item.filter(":visible").size() > 0 ){
                    this.showCaseOption.noResult.hide();
                } else {
                    this.showCaseOption.noResult.show();
                }
            },
            showCaseFilter : function(){
                var self = this;
                this.showCaseOption.item.each(function(){
                    if($(this).data("showcase")){
                        var dataCase = $(this).data("showcase").split("-to-"),
                            dataCaseResult;
                        var sourceIndex, targetIndex;
                        var sourceValue = self.showCaseOption.source.val().toLowerCase(),
                            targetValue = self.showCaseOption.target.val().toLowerCase();

                        if(sourceValue.indexOf(dataCase[0]) != -1){
                            sourceIndex = dataCase[0];
                        } else {
                            sourceIndex = null;
                        }

                        if(targetValue.indexOf(dataCase[1]) != -1){
                            targetIndex = dataCase[1];
                        } else {
                            targetIndex = null;
                        }

                        if(sourceIndex != null && targetIndex != null){

                            dataCaseResult = sourceIndex + "-to-" + targetIndex;

                            if(dataCaseResult == $(this).data("showcase")){
                                $(this).fadeIn();
                            }

                        } else {
                            if(sourceValue+"-to-"+targetValue == "reset-to-reset"){
                                $(this).fadeIn();
                            } else {
                                $(this).fadeOut();
                            }
                            if(sourceIndex != null && targetIndex == null){
                                if ($(this).data("showcase").indexOf(sourceIndex + '-')!= -1) {
                                    $(this).fadeIn();
                                }
                            }
                            if(sourceIndex == null && targetIndex != null){
                                if ($(this).data("showcase").indexOf('-' + targetIndex)!= -1) {
                                    $(this).fadeIn();
                                }
                            }
                        }
                    }
                });

                this.notFound();
                setTimeout(function(){
                    self.notFound();
                }, 1000);
            }
        };

        $(ShowCase.showCaseOption.source).bind('change',function(){
            ShowCase.showCaseFilter();
        });
        $(ShowCase.showCaseOption.target).bind('change',function(){
            ShowCase.showCaseFilter();
        });
        ShowCase.init();
    });
})(jQuery);

// white paper page script
var whitePaper = {

    dType : '',

    setType : function(type){
        this.dType = type;
    },

    check : function(){
        if(getCookie('white-paper') ){
            return true;
        }
        return false;
    },

    download : function(){
        var self = this;
        jQuery('[data-download]').on('click', function(){
            self.setType( jQuery(this).data('download') );
            self.downloadBook();
        });
    },

    downloadBook : function(){
        if( this.check() ){
            jQuery('#themee_po_overlay').hide();
            jQuery('.whitep-form').hide();
            location.href = '/pdf/' + this.dType + '.pdf';
            return false;
        } else {
            jQuery('#themee_po_overlay').show();
            jQuery('.whitep-form').show();
        }
    },

    success : function(){
//        var date = new Date();
        try {
            setCookie('white-paper');
        } catch (e){
           console.log(e.error());
            new TypeError();
        }
        this.downloadBook();
    }

};
