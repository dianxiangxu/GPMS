var signUp = '';
$(function() {
	jQuery.fn.exists = function() {
		return this.length > 0;
	}

	var gpmsCommonObj = function() {
		var gpmsCommonInfo = {
			UserName : GPMS.utils.GetUserName(),
			UserProfileID : GPMS.utils.GetUserProfileID(),
			CultureName : GPMS.utils.GetCultureName()
		};
		return gpmsCommonInfo;
	};

	var validator = $("#form1")
			.validate(
					{
						rules : {
							username : {
								required : true,
								minlength : 3
							},
							password : {
								required : true,
								minlength : 6,
								maxlength : 15
							},
							confirm_password : {
								required : true,
								minlength : 6,
								maxlength : 15,
								equalTo : "#txtPassword"
							},
							workEmail : {
								required : true,
								email : true
							},
							firstName : {
								required : true,
								maxlength : 40
							},
							lastName : {
								required : true,
								maxlength : 40
							},
							dob : {
								required : true,
								dpDate : true
							},
							gender : {
								required : true
							},
							street : {
								required : true,
								minlength : 3
							},
							city : {
								required : true
							},
							state : {
								required : true
							},
							zip : {
								required : true
							},
							country : {
								required : true
							},
							mobileNumber : {
								required : true
							},
						},
						errorElement : "label",
						messages : {
							username : {
								required : "Please enter a username",
								minlength : "Your username must be at least 3 characters long"
							},
							password : {
								required : "Please provide a password",
								minlength : "Your password must be between 6 and 15 characters",
								maxlength : "Your password must be between 6 and 15 characters"
							},
							confirm_password : {
								required : "Please confirm your password",
								minlength : "Your password must be between 6 and 15 characters",
								equalTo : "Please enter the same password as above",
								maxlength : "Your password must be between 6 and 15 characters"
							},
							workEmail : {
								required : "Please enter your work email",
								email : "Please enter valid email id"
							},
							firstName : {
								required : "Please enter your firstname",
								maxlength : "Your firstname must be at most 40 characters long"
							},
							lastName : {
								required : "Please enter your lastname",
								maxlength : "Your lastname must be at most 40 characters long"
							},
							dob : {
								required : "Please enter your date of birth",
								dpDate : "Please enter valid date"
							},
							gender : {
								required : "Please select your gender"
							},
							street : {
								required : "Please enter your street address",
								minlength : "Please enter valid your street address"
							},
							city : {
								required : "Please enter your city"
							},
							state : {
								required : "Please select your city"
							},
							zip : {
								required : "Please enter your zip code"
							},
							country : {
								required : "Please select your country"
							},
							mobileNumber : {
								required : "Please enter your mobile phone number"
							}
						}
					});

	var userNameIsUnique = false;

	signUp = {
		config : {
			isPostBack : false,
			async : false,
			cache : false,
			type : 'POST',
			contentType : "application/json; charset=utf-8",
			data : '{}',
			dataType : 'json',
			baseURL : GPMS.utils.GetGPMSServicePath() + "users/",
			method : "",
			url : "",
			ajaxCallMode : 0
		},

		ajaxCall : function(config) {
			$
					.ajax({
						type : signUp.config.type,
						beforeSend : function(request) {
							request.setRequestHeader('GPMS-TOKEN', _aspx_token);
							request.setRequestHeader("UName", GPMS.utils
									.GetUserName());
							request.setRequestHeader("PID", GPMS.utils
									.GetUserProfileID());
							request.setRequestHeader("PType", "v");
							request.setRequestHeader('Escape', '0');
						},
						contentType : signUp.config.contentType,
						cache : signUp.config.cache,
						async : signUp.config.async,
						url : signUp.config.url,
						data : signUp.config.data,
						dataType : signUp.config.dataType,
						success : signUp.ajaxSuccess,
						error : signUp.ajaxFailure
					});
		},

		isUniqueUserName : function(userId, newUserName) {
			var userUniqueObj = {
				UserID : userId,
				NewUserName : newUserName
			};
			var gpmsCommonInfo = gpmsCommonObj();
			this.config.url = this.config.baseURL + "CheckUniqueUserName";
			this.config.data = JSON2.stringify({
				userUniqueObj : userUniqueObj,
				gpmsCommonObj : gpmsCommonInfo
			});
			this.config.ajaxCallMode = 1;
			this.ajaxCall(this.config);
			return userNameIsUnique;
		},

		signUpUser : function() {
			if (validator.form()) {
				var $username = $('#txtUserName');
				var userName = $.trim($username.val());
				var user_id = "0";
				var validateErrorMessage = signUp.checkUniqueUserName(user_id,
						userName, $username);
				alert(validateErrorMessage);
				if (!validateErrorMessage) {
					var userInfo = {
						UserID : user_id,
						UserName : $.trim($('#txtUserName').val()),
						Password : $.trim($('#txtPassword').val()),
						WorkEmail : $('#txtWorkEmail').val(),
						FirstName : $.trim($('#txtFirstName').val()),
						MiddleName : $.trim($('#txtMiddleName').val()),
						LastName : $.trim($('#txtLastName').val()),
						DOB : $('#txtDOB').val(),
						Gender : $('#ddlGender :selected').val(),
						Street : $.trim($('#txtStreet').val()),
						Apt : $.trim($('#txtApt').val()),
						City : $.trim($('#txtCity').val()),
						State : $('#ddlState :selected').text(),
						Zip : $.trim($('#txtZip').val()),
						Country : $('#ddlCountry :selected').text(),
						MobileNumber : $('#txtMobileNumber').mask()
					};
					signUp.AddUserInfo(userInfo);

					return false;
				}
			}
		},

		AddUserInfo : function(info) {
			this.config.url = this.config.baseURL + "SaveUpdateUser";
			this.config.data = JSON2.stringify({
				userInfo : info,
				gpmsCommonObj : gpmsCommonObj()
			});
			this.config.ajaxCallMode = 2;
			this.ajaxCall(this.config);
			return false;
		},

		checkUniqueUserName : function(user_id, userName, textBoxUserName) {
			var errors = '';
			if (userName.length >= 3) {
				if (!signUp.isUniqueUserName(user_id, userName)) {
					errors += getLocale(gpmsSignUp,
							"Please enter unique username.")
							+ " '"
							+ userName.trim()
							+ "' "
							+ getLocale(gpmsSignUp, "has already been taken.");
					textBoxUserName.addClass("error");
					textBoxUserName.siblings('.right').hide();
					if (textBoxUserName.siblings('.error').exists()) {
						textBoxUserName.siblings('.error').html(errors);
					} else {
						$(
								'<label id="txtUserName-error" class="error" for="txtUserName">'
										+ errors + '</label>').insertAfter(
								textBoxUserName);
					}

					textBoxUserName.siblings('.error').show();
					// textBoxUserName.focus();
				} else {
					textBoxUserName.removeClass("error");
					textBoxUserName.siblings('.right').show();
					textBoxUserName.siblings('.error').hide();
					textBoxUserName.siblings('.error').html('');
				}
			}
			return errors;
		},

		ajaxSuccess : function(msg) {
			switch (signUp.config.ajaxCallMode) {
			case 0:
				break;
			case 1:
				userNameIsUnique = stringToBoolean(msg);
				break;
			case 2:
				csscody.info("<h2>"
						+ getLocale(gpmsSignUp, 'Successful Message')
						+ "</h2><p>"
						+ getLocale(gpmsSignUp,
								'User has been saved successfully.') + "</p>");
				break;
			}
		},

		ajaxFailure : function(msg) {
			switch (signUp.config.ajaxCallMode) {
			case 0:
				break;
			case 1:
				csscody.error("<h2>"
						+ getLocale(gpmsSignUp, 'Error Message')
						+ "</h2><p>"
						+ getLocale(gpmsSignUp,
								'Cannot check for unique Username') + "</p>");
				break;
			case 2:
				csscody.info("<h2>" + getLocale(gpmsSignUp, 'Error Message')
						+ "</h2><p>"
						+ getLocale(gpmsSignUp, 'Failed to save user!')
						+ "</p>");
				break;
			}
		},

		init : function(config) {
			// signUp.LoadStaticImage();

			$("#txtMobileNumber").mask("(999) 999-9999");
			$("#txtZip").mask("99999");

			$("#txtDOB").datepicker({
				dateFormat : 'yy-mm-dd',
				changeMonth : true,
				changeYear : true,
				yearRange : "-100:+0",
				maxDate : 0
			}).mask("9999-99-99", {
				placeholder : "yyyy-mm-dd"
			});

			$("#btnSignUp").on("click", function() {
				signUp.signUpUser();
			});

			$('#txtUserName').on("focus", function() {
				$(this).siblings('.right').hide();
			}), $('#txtUserName').on("blur", function() {
				var userName = $.trim($(this).val());
				var user_id = "0";
				signUp.checkUniqueUserName(user_id, userName, $(this));
				return false;
			});

			var $form = $("#form1");
			$form.find("[data-form-input]").on(
					"focus",
					function() {
						$this = $(this), fieldName = $this.attr("id"), $(
								'[for="' + fieldName + '"]').find(
								"[data-form-label-description]").addClass(
								"is-visible")
					}), $form.find("[data-form-input]").on(
					"blur",
					function() {
						$("[data-form-label-description].is-visible")
								.removeClass("is-visible")
					});
		}
	};
	signUp.init();
});