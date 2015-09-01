/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };

})(jQuery);

function getNow() { var date = new Date(); var now = date.getTime()/1000; return now; }

function surveyInit(options) {

var rand = (Math.random()*100).toFixed(2);

if(options.inactive!=='Yes' && rand<options.target && $.cookie(options.cookieName)!=='No') {
  
                $('#surveyPopup').fadeIn();

                $('.survey-accept').attr('href',options.url);

                      $('.survey-decline').on('click',function() {
                           var date =  new Date(surveyOptions.endDate)*1000;
  
                          $.cookie('survey','No', { expires: 180, domain: 'elsevier.com' });
                    $('#surveyPopup').fadeOut();
                        });

                        $('.survey-accept').on('click',function(e) {
                          e.preventDefault();
                          $('#surveyPopup').fadeOut();

                          $.cookie('survey','No', { expires: 180, domain: 'elsevier.com'});
                        });
                        $(".lb-close").on('click',function() {
                          $.cookie('survey','No', { expires: 180, domain: 'elsevier.com'});
                          $('#surveyPopup').fadeOut();
                        });

         }   
            

}
//$( document ).ready(function() {
  $(function() { //doc ready

      surveyInit(surveyOptions);



  }); //end doc ready
//});