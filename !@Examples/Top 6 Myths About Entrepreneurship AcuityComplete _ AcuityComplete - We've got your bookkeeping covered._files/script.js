/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function($) {
	
jQuery(document).ready(function( $ ) {	
    $('div.tt').hover(function(){$(this).find('.desc').show();},function(){$(this).find('.desc').hide();});
//$('.tt').click(function(e){    e.preventDefault();    console.log('clicked');   $(this).find('.desc').toggle(); });
   

$('#cta1').avgrund({
	width: 800, // max is 640px
	height: 800, // max is 350px
	showClose: false, // switch to 'true' for enabling close button
	showCloseText: '', // type your text for close button
	closeByEscape: true, // enables closing popup by 'Esc'..
	closeByDocument: true, // ..and by clicking document itself
	holderClass: '', // lets you name custom class for popin holder..
	overlayClass: '', // ..and overlay block
	enableStackAnimation: false, // another animation type
	onBlurContainer: '', // enables blur filter for specified block
	openOnEvent: true, // set to 'false' to init on load
	setEvent: 'click', // use your event like 'mouseover', 'touchmove', etc.
	onLoad: function(){}, // set custom call before popin is inited..
	onUnload: function () {  }, // ..and after it was closed
	template:  jQuery('#checkout1').html() 
});

$('#cta2').avgrund({
	width: 800, // max is 640px
	height: 800, // max is 350px
	showClose: false, // switch to 'true' for enabling close button
	showCloseText: '', // type your text for close button
	closeByEscape: true, // enables closing popup by 'Esc'..
	closeByDocument: true, // ..and by clicking document itself
	holderClass: '', // lets you name custom class for popin holder..
	overlayClass: '', // ..and overlay block
	enableStackAnimation: false, // another animation type
	onBlurContainer: '', // enables blur filter for specified block
	openOnEvent: true, // set to 'false' to init on load
	setEvent: 'click', // use your event like 'mouseover', 'touchmove', etc.
	onLoad: function(){}, // set custom call before popin is inited..
	onUnload: function () {  }, // ..and after it was closed
	template:   jQuery('#checkout2').html()
});




$('#optin').avgrund({width: 800, // max is 640px
	height: 800, // max is 350px,
        template:   jQuery('#mailchimp').html()});




});	
})( jQuery );

function getParameterByName(name)
		{
		  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		  var regexS = "[\\?&]" + name + "=([^&#]*)";
		  var regex = new RegExp(regexS);
		  var results = regex.exec(window.location.href);
		  if(results == null)
		    return "";
		  else
		    return decodeURIComponent(results[1].replace(/\+/g, " "));
		}
		
            (function ($) /* Wraps this `$ = jQuery` routine. */
                {
                    $.fn.swapWith = function (to) /* Utility extension for jQuery. */
                        {
                            return this.each (function ()
                                {
                                    var $to = $ (to).clone (true), $from = $ (this).clone (true);
                                    $(to).replaceWith ($from), $ (this).replaceWith ($to);
                                });
                        };
                    /**/
                    $(document).ready (function () /* Handles email-to-username on keyup. */
                        {	
								
	/* Generate random number to append to username, 
                        hopefully making it unique (yes, this isn't perfect!) */
                        var randomNum = Math.ceil(Math.random()*999);
                        if($('input#s2member-pro-authnet-checkout-email').length) {
							var email = 'input#s2member-pro-authnet-checkout-email';
							var login = 'input#s2member-pro-authnet-checkout-username';
							
						} else {
							var email = 'input#s2member-pro-authnet-registration-email';
							var login = 'input#s2member-pro-authnet-registration-username';
							$('#s2member-pro-authnet-registration-form-username-div').hide();
						}
						

                        /* Fill hidden username field with first part of email address
                            and append randomNum to hopefully make it unique. */
                         $ (email).keyup (function ()
                            {
                              var email_val = $(this).val();
                                $(login).each(function(){
                                       $(this).val ($.trim (email_val.split (/@/)[0].replace (/[^\w]/gi, '')) + randomNum.toString());
                                });
                                var pass = ''; 
                                 pass = $.password(12,true);
                                
                                     $('input[type="password"]').each(function(){
                                                 $(this).val(pass);
                                     });
                                     
                            });								
                        
                        });
                        
                        $.extend({
  password: function (length, special) {
    var iteration = 0;
    var password = "";
    var randomNumber;
    if(special == undefined){
        var special = false;
    }
    while(iteration < length){
        randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
        if(!special){
            if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
            if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
            if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
            if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
        }
        iteration++;
        password += String.fromCharCode(randomNumber);
    }
    return password;
  }
});
                        
                }) (jQuery);

