
/*====================================================*/
/* FILE /plugins/social-linkz/js/js_front.js*/
/*====================================================*/
function openEmailSocialLinkz(md5) { 
        jQuery('#mask'+md5).fadeIn(1000);   
        jQuery('#mask'+md5).fadeTo("slow",0.8); 
        var winH = jQuery(window).height();
        var winW = jQuery(window).width();
        jQuery('#dialog'+md5).css('top',  winH/2-jQuery('#dialog'+md5).height()/2);
        jQuery('#dialog'+md5).css('left', winW/2-jQuery('#dialog'+md5).width()/2);
        jQuery('#dialog'+md5).fadeIn(2000);
}

function closeEmailSocialLinkz(md5) { 
        jQuery('#mask'+md5).hide();   
        jQuery('#dialog'+md5).hide();
}




/*====================================================*/
/* FILE /sedlex/inline_scripts/ee0220a8b130a017c257484fa681fa24.js*/
/*====================================================*/
				function sendEmailSocialLinkz(md5, id) { 
					jQuery("#wait_mail"+md5).show();
					jQuery("#emailSocialLinkz"+md5).attr('disabled', 'disabled');
					
					listemail = jQuery("#emailSocialLinkz"+md5).val();
					nom = jQuery("#nameSocialLinkz"+md5).val();
					
					var arguments = {
						action: 'emailSocialLinkz', 
						id_article: id,
						name: nom, 
						list_emails: listemail
					} 
					var ajaxurl2 = "http://myview.rahulnivi.net/wp-admin/admin-ajax.php" ; 
					//POST the data and append the results to the results div
					jQuery.post(ajaxurl2, arguments, function(response) {
						jQuery("#innerdialog"+md5).html(response);
					});    
				}
		
			
