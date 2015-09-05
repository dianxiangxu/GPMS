var userAgent = navigator.userAgent.toLowerCase();
var isMobile = (userAgent.indexOf('iphone') != -1
		|| userAgent.indexOf('ipad') != -1 || userAgent.indexOf('android') != -1) ? true
		: false;
var clickLabel = isMobile ? 'Tap' : 'Click';

IDG = window.IDG || {};
IDG.regForm = {
	recognizedUser:"true",
	canSubmit : 0,
	messages : [
			"Welcome back! " + clickLabel + " the button to download now.",
			"Please complete the form below. All fields are required unless labeled optional.",
			"Sorry we do not recognize your email address. Please complete the form to access this resource.",
			"Thank you for your interest in this resource. Please take a moment to confirm that your profile is up to date.",
			"We need to update your registration with some additional information. Please complete the form before downloading.",
			"Please enter a valid email address.",
			clickLabel + " the button to download now.",
			"Please click Submit to access this resource." ],
	start : function() {
		// Hide all form elements and right sidebar help text to start
		$(".row, #divError").hide();
		emailAddress = "";
		if (IDG.regForm.getParamValue("email")) {
			emailAddress = IDG.regForm.getParamValue("email");
			IDG.regForm.pressContinue();
		} else if (document.cookie.indexOf("_reg_auth_token") > -1) {
			var cookies = document.cookie.split(';');
			for ( var i = 0; i < cookies.length; i++) {
				var thisCookie = cookies[i];
				while (thisCookie.charAt(0) == ' ')
					thisCookie = thisCookie.substring(1, thisCookie.length);
				if (thisCookie.indexOf("_reg_auth_token=") == 0)
					emailAddress = thisCookie.substring(
							"_reg_auth_token=".length, thisCookie.length);
			}
			IDG.regForm.pressContinue();
		} else
			IDG.regForm.showEmail();
		// Prevent submit until later
		$('form[name=basic_registration]').submit(function() {
			if (this.canSubmit == 0) {
				return false;
			}
		});
	},
	pressContinue : function() {
		if ($("input.emailAddress").val()
				&& $("input.emailAddress").val().length > 0)
			emailAddress = $("#segment\\[\\'emailAddress\\'\\]").val();
		// Check email. Don't proceed with lookup if email is invalid
		if (!IDG.regForm.checkEmail(emailAddress)) {
			IDG.regForm.showMessage(5);
			IDG.regForm.showEmail();
			return false;
		}
		$.ajax({
					// Set timeout for 3 seconds
					timeout : 3000,
					url : "/reg/services/reg-data/" + emailAddress + "/"
							+ regFormID,
					dataType : "json",
					beforeSend : function(xhr) {
						if (xhr.overrideMimeType)
							xhr.overrideMimeType('application/json');
					},
					success : function(data, textStatus) {
						// If we have no data, but a success has been reported
						// (in Safari, Chrome), stop processing
						if (data == null) {
							IDG.regForm.lookupFailure();
							return false;
						}
						if (textStatus == "success") {
							$("#continue_button").hide();
							// Profile information found
							$("#email_helpText, #email_continue").hide();
							// Prefill the form with values from the JSON data
							IDG.regForm.preFill(data);
							// If expired is undefined (new user) or true then
							// show the entire form
							if (data["expired"] == undefined) {
								$('#reg_fields').addClass('message_area');
								IDG.regForm.recognizedUser="false";
								IDG.regForm.showAllRows();
								omnitureStep2();
							} else if (data["spamBlockEnabled"] == true || data['isBlockedFormContentType'] == true) {
								$('#reg_fields').addClass('message_area');
								IDG.regForm.showAllRows(7);
								omnitureStep2();
							}else if (data["expired"] == true) {
								$('#reg_fields').addClass('message_area');
								IDG.regForm.showAllRows(3);
								omnitureStep2();
							}
							else {
								// Iterate through all required and custom rows.
								// Show if they haven't been pre-filled
								var needAdditional = 0;
								$(
										".required_row:not(.preFilled),.custom_row:not(.preFilled)")
										.each(
												function(i) {
													if ($(this)
															.children(
																	'input[type=hidden]').length == 0) {
														$(this).show();
														needAdditional = 1;
													}
												});
								if (needAdditional == 1) {
									$("#segment\\[\\'emailAddress\\'\\]")
											.parents(".row:eq(0)").hide();
									IDG.regForm.showMessage(4);
									IDG.regForm.showSubmit();
									$('#reg_fields').addClass('message_area');
									omnitureStep2();
								} else {
									this.canSubmit = 1;
									if (IDG.zipCode && IDG.zipCode.checkEmail()) {
										$('form[name="basic_registration"]')
												.submit();
									}
									else if (checkEmail()) {
										$('form[name="basic_registration"]')
												.submit();
									}
								}
							}
							if (IDG.zipCode) {
								IDG.zipCode.init(data);
							}
						}
					},
					// If we can't get the JSON document or the profile isn't
					// found, show the whole form
					error : function(textStatus, errorThrown) {
						IDG.regForm.lookupFailure();
					}
				});
		$.ajax({
			type : "POST",
			// Set timeout for 3 seconds
			timeout : 3000,
			url : "/reg/services/user-audit/" + emailAddress + "/" + regFormID,
			// dataType: "json",
			data : {
				brand : IDG.brand,
				referrer : document.referrer,
				elqguid : IDG.elqguid
			},
		// beforeSend: function( xhr ) {
		// if(xhr.overrideMimeType) xhr.overrideMimeType( 'application/json' );
		// }
		});
	},
	showAllRows : function(message) {
		// If there is only one visible form field (email address), show the
		// "click the submit button" message, becase there's no additional
		// fields to fill out
		$(".row").show();
		if ($(".row input:not(.input_submit):visible, .row select:visible").length == 1) {
			this.showMessage(6);
		} else {
			if (!message) {
				var message = 2;
			}
			this.showMessage(message);
		}
		this.canSubmit = 1;
	},
	showEmail : function() {
		$("#segment\\[\\'emailAddress\\'\\]").parents(".row:eq(0)").show();
		if ($("div#continue_button").length < 1)
			$("#segment\\[\\'emailAddress\\'\\]")
					.parents(".row:eq(0)")
					.append(
							'<div id="continue_button" class="submit_btn"><img src="/resources/images/sr_continue_btn.gif" alt="continue"/></div>');
	},
	showSubmit : function() {
		$(".input_submit").parents(".row:eq(0)").show();
		this.canSubmit = 1;
	},
	showMessage : function(message) {
		$("#divError").html(
				"<div class='divErrorArrow'></div><div class='divErrorBoxEmail'>"
						+ this.messages[message]
						+ "</div><div class='divErrorArrowDown'></div>");
		$("#divError").show();
	},
	getParamValue : function(paramName) {
		var queryString = location.search.substring(1);
		var params = queryString.split("&");
		for ( var i = 0; i < params.length; i++) {
			var param = params[i].split("=");
			if (param[0] == paramName)
				return param[1];
		}
		return false;
	},
	checkEmail : function(email) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(email)) {
			return true;
		} else {
			$('#reg_fields').addClass('message_area_short');
			/* $('#divError').addClass('errorTop'); */
			return false;
		}
	},
	preFill : function(data) {
		for ( var key in data) {
			// if value is blank string and field is required, do not mark as
			// prefilled

			if (IDG.regForm.isPreFilled(data, key)) {						
				$("#segment\\[\\'" + key + "\\'\\]").val(data[key]);
				$("#segment\\[\\'" + key + "\\'\\]").parents(".row:eq(0)")
						.addClass('preFilled');
			}
		}
		
		if(IDG.regForm.isNotPreFilled(data, "personalJobTitle") 
			|| IDG.regForm.isNotPreFilled(data, "jobPosition")
			|| IDG.regForm.isNotPreFilled(data, "jobFunction")) {
									
			$("#segment\\[\\'personalJobTitle\\'\\]").parents(".row:eq(0)")
						.removeClass('preFilled');
			$("#segment\\[\\'jobPosition\\'\\]").parents(".row:eq(0)")
						.removeClass('preFilled');
			$("#segment\\[\\'jobFunction\\'\\]").parents(".row:eq(0)")
						.removeClass('preFilled');
		}

	},
	
	isPreFilled : function (data, key) {
	
			if (data[key] != null
					&& data[key].toString().toLowerCase() != 'null'
					&& !(data[key].toString() == '' 
					&& $("#segment\\[\\'" + key + "\\'\\]").parents(".required_row:eq(0)").length > 0) 
					&&  $("#segment\\[\\'" + key + "\\'\\]").attr('type') != 'hidden') {
						
				return true;		
			}
			return false;
	},
	isNotPreFilled : function (data, key) {		
		return !IDG.regForm.isPreFilled(data, key);
	},
	lookupFailure : function() {
		$("#continue_button").hide();
		$('#reg_fields').addClass('message_area_2');
		$("#divError").show();
		this.showAllRows();
	}

};

$(document).ready(function() {
	// Initiate Stepped Registration if we aren't on the form/submit page
	if (window.location.pathname.indexOf("form/submit") == -1) {
		IDG.regForm.start();
	} else {
		return false;
	}
	$("#continue_button").click(function() {
		IDG.regForm.pressContinue()
	});
	$("input.emailAddress").bind('keypress', function(e) {
		if (e.keyCode == 13 || e.which == 13) {
			e.preventDefault();
			IDG.regForm.pressContinue()
		}
	});
});
