_satellite.pushAsyncScript(function(event, target, $variables){
  /************************* BEGIN: MARKETO Integration ************************/
                               (function() {
                                 var didInit = false;
                                 function initMunchkin() {
                                   if(didInit === false) {
                                     didInit = true;
                                     Munchkin.init('713-LGB-166');
                                   }
                                 }
                                 var s_mar = document.createElement('script');
                                 s_mar.type = 'text/javascript';
                                 s_mar.async = true;
                                 s_mar.src = '//munchkin.marketo.net/munchkin-beta.js';
                                 s_mar.onreadystatechange = function() {
                                   if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                     initMunchkin();
                                   }
                                 };
                                 s_mar.onload = initMunchkin;
                                 document.getElementsByTagName('head')[0].appendChild(s_mar);
                               })();
                               /************************* END: MARKETO Integration ************************/


});
