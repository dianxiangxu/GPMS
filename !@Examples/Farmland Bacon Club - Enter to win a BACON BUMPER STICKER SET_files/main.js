var redirectTarget = '_self';
var redirectURL = null;
var checkSurveyID = null;

$(document).ready(function() {

    $('#menu').sidr({
		side: 'right'
	});

    $('.surveyAnswerField').on('focus', function(e) {
    	if ($(this).val()=="Enter Answer") $(this).val("");
    });

    $('.surveyAnswerField').on('blur', function(e) {
    	if ($(this).val().length==0) $(this).val("Enter Answer");
    });

    Overlay.on("close", function(){
    	console.log("event close");
    	Griddle.redraw();
    	sizeText();
    });
    if ($("html").hasClass("lt-ie9")) {
    	$("#logo").css({visibility:"visible"});
    } else {
    	//$("#logo").css({visibility:"visible",opacity:0});
	   TweenMax.fromTo("#logo", 0.7, {top:-50, scaleX:0.8, scaleY:0.8, autoAlpha:0}, {autoAlpha:1, top:-5, scaleX:1, scaleY:1, delay:0.5, ease:Back.easeOut});
	}
    TweenMax.to("#tagline", 0.5, {autoAlpha:1, delay:0.2});
    TweenMax.to("#buttonBar", 0.5, {autoAlpha:1, delay:1});
    TweenMax.to("#footer", 0.5, {autoAlpha:1, delay:2});

    $('#sweepstakes_form').validate({
        submitHandler: function(form) {
            var postData = $(form).serializeArray();
            var formURL = $(form).attr("action");
            $.ajax( {
                url: formURL,
                type: "POST",
                data: postData,
                dataType: "json",
                success: function(data, textStatus, jqXHR) {
                    if (data.status === 1) {
                        $('#sweepstakes_form_errors_container').hide();
                        $('#sweepstakes_form_container').html(data.successMessage);
                    } else {
                        $('#sweepstakes_form_container').hide();
                        $('#sweepstakes_form_errors_container').html('<h1>Oops!</h1>' + data.errorMessage).show();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $('#sweepstakes_form_container').html('<h1>Error</h1><p>Form post had errors!</p>');
                }
            });
        },
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids(),
                message;
            if (errors) {
                message = (errors === 1) ? 'You missed 1 field. It has been highlighted.' : 'You missed ' + errors + ' fields. They have been highlighted.';
                $('#sweepstakes_form_errors_container').html(message).show();
            } else {
                $('#sweepstakes_form_errors_container').hide();
            }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            $(element.form).find("label[for=" + element.id + "]").addClass(errorClass);
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).addClass(validClass).removeClass(errorClass);
            $(element.form).find("label[for=" + element.id + "]").removeClass(errorClass);
        },
        errorElement: 'em'
    });
    $.validator.messages.required = '';

});

function sizeText(){
	$(".item .title h1").fitText(1.25);
	$(".item .title h1.line_2_minus_1").fitText(1.4);
	$(".item .title h1.line_2_minus_2").fitText(1.55);
	$(".item .title h1.line_2_plus_1").fitText(1.10);
	$(".item .title h1.line_2_plus_1").fitText(0.95);
	$(".item .title h2").fitText(1.8);
	$(".item .title .link").fitText(2);
	$(".item.survey .surveyBox h1").fitText(.35);
	$(".item.survey .surveyBox h2").fitText(.7);
	$(".item.survey .surveyBox .link").fitText(1);
}

function login() {
	var username = $('#username').val();
	var password = $('#login_password').val();
	
	$.ajax({
		type: 		'POST',
		dataType:	'json',
		url: 		'member/login/ajaxlogin',
		data: 		{ username: ''+username, password: ''+password }
	}).done(function(json) {
		
		if(json.error == true) {
			$('#signupOrLogin .validation').html(json.msg);
			$('#signupOrLogin .validation').show();
		} else if(redirectURL != null && checkSurveyID == null) {
			if(redirectTarget != '_self') {
				window.open(redirectURL, '_blank');
				window.location.reload();
			} else {
				window.location = redirectURL;
			}
		} else if(checkSurveyID != null) {
			checkSurvey();
		} else {
			window.location.reload();
		}
	});
	
	return false;
}

function checkAccount(fb_id) {
	$.ajax({
		type: 		'POST',
		dataType:	'json',
		url: 		'member/login/ajaxcheck',
		data: 		{ fb_id: ''+fb_id}
	}).done(function(json) {
		
		if(json.error == true) {
			$('#signupOrLogin .validation').html(json.msg);
			$('#signupOrLogin .validation').show();
		} else {
			if(json.complete) {
				if(redirectURL != null) {
					if(redirectTarget != '_self') {
						window.open(redirectURL, '_blank');
						window.location.reload();
					} else {
						window.location = redirectURL;
					}
				} else {
					window.location.reload();
				}
			} else {
				Overlay.show("#createProfile");
			}
		}
	});
	
	return false;
}

function resetPassword(fb_id) {
	var username = $('#forgot_username').val();
	
	$.ajax({
		type: 		'POST',
		dataType:	'json',
		url: 		'member/password/ajaxreset',
		data: 		{ username: ''+username}
	}).done(function(json) {
		
		if(json.error == true) {
			alert(json.msg);
		} else {
			Overlay.show("#passwordEmailed");
		}
	});
	
	return false;
}

function signup() {
	var fname = $('#fname').val();
	var lname = $('#lname').val();
	var email = $('#email').val();
	var confirm_email = $('#confirm_email').val();
	var password = $('#profile_password').val();
	var confirm_password = $('#confirm_password').val();
	var dob = $('#dob').val();
	var zip_code = $('#zip_code').val();
	var address_1 = $('#address_1').val();
	var address_2 = $('#address_2').val();
	var city = $('#city').val();
	var state = $('#state').val();
	var shirt_size = $('#shirtsize').val();
	var gender = $('#gender').val();
	var opt_in = ($('#opt_in').prop('checked') ? '1' : '0');
	
	$.ajax({
		type: 		'POST',
		dataType:	'json',
		url: 		'member/signup/ajaxsignup',
		data: 		{ 	fname: ''+fname, lname: ''+lname, email: ''+email, confirm_email: ''+confirm_email,
						password: ''+password, confirm_password: ''+confirm_password, dob: ''+dob, zip_code: ''+zip_code, 
						address_1: ''+address_1, address_2: ''+address_2, city: ''+city, state: ''+state, shirt_size: ''+shirt_size,
						gender: ''+gender, opt_in: ''+opt_in}
	}).done(function(json) {

		if(json.error != true) {
			ga('send', 'event', 'Account', 'Create', 'Success');
		}
		if(json.error == true) {
			$('#createProfile .validation').html(json.msg);
			$('#createProfile .validation').show();
		} else if(redirectURL != null && checkSurveyID == null) {
			if(redirectTarget != '_self') {
				window.open(redirectURL, '_blank');
				window.location.reload();
			} else {
				window.location = redirectURL;
			}
		} else if(checkSurveyID != null) {
			checkSurvey();
		} else {
            window.location.reload();
		}
	});
	
	return false;
}

function updateProfile() {
	var fname = $('#edit_fname').val();
	var lname = $('#edit_lname').val();
	var email = $('#edit_email').val();
	var confirm_email = $('#edit_confirm_email').val();
	var password = $('#edit_profile_password').val();
	var confirm_password = $('#edit_confirm_password').val();
	var dob = $('#edit_dob').val();
	var zip_code = $('#edit_zip_code').val();
	var address_1 = $('#edit_address_1').val();
	var address_2 = $('#edit_address_2').val();
	var city = $('#edit_city').val();
	var state = $('#edit_state').val();
	var shirt_size = $('#edit_shirtsize').val();
	var gender = $('#edit_gender').val();
	var opt_in = ($('#edit_opt_in').prop('checked') ? '1' : '0');
	
	$.ajax({
		type: 		'POST',
		dataType:	'json',
		url: 		'member/profile/ajaxupdate',
		data: 		{ 	fname: ''+fname, lname: ''+lname, email: ''+email, confirm_email: ''+confirm_email,
						password: ''+password, confirm_password: ''+confirm_password, dob: ''+dob, zip_code: ''+zip_code, 
						address_1: ''+address_1, address_2: ''+address_2, city: ''+city, state: ''+state, shirt_size: ''+shirt_size, 
						gender: ''+gender, opt_in: ''+opt_in }
	}).done(function(json) {
		
		if(json.error == true) {
			$('#editProfile .validation').html(json.msg);
			$('#editProfile .validation').show();
		} else {
			Overlay.show('#profileUpdated');
		}
	});
	
	return false;
}

function checkSurvey() {
	if(checkSurveyID != null) {
		var id = checkSurveyID.replace('survey_', '');
		var response = $('#survey_'+id).val();
		
		if(response == '' || response == 'Enter Answer') {
			alert('Please provide a response');
		} else {
			$.ajax({
				type: 		'POST',
				dataType:	'json',
				url: 		'content/index/ajaxsurvey',
				data: 		{ 	id: ''+id, response: ''+response }
			}).done(function(json) {
				
				if(json.error == true) {
					alert(json.msg);
				} else if(redirectURL != null) {
					if(redirectTarget != '_self') {
						window.open(redirectURL, '_blank');
						window.location.reload();
					} else {
						window.location = redirectURL;
					}
				} else {
					window.location = window.location.reload();
				}
			});
			
			checkSurveyID = null;
		}
	}
}

$(window).load(function(){
	if ($("body").hasClass("mustAuth")) {
		Overlay.on("close", function(){
			window.location.href="/index.php";
		});
	} else {
		TweenMax.to("#content", 0.5, {autoAlpha:1});
	}
	Griddle.init();
	sizeText();
});

var trackOutboundLink = function(url) {
   ga('send', 'event', 'outbound', 'click', url, {'hitCallback':
     function () {
     document.location = url;
     }
   });
}