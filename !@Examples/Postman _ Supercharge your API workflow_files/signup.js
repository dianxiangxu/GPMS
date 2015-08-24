$(document).ready(function() {
	//for pages without the overlay
	if((typeof disableOverlaySignin !== "undefinded") && disableOverlaySignin) return;

	window.onkeyup=function(e) {
		if(e.keyCode===27) {
			$("#sign-in-top.cancel-sign-in").click();
		}
	}
	
    $("#sign-in-need-help").click(function() {
    	$(".sign-in-need-help-specific").toggle();
    });                                   

	$("#sign-in-top").click(function() {
		if($("#navigation-toggle-container").css('display')==='none') {
			//for full screen view
			if($(this).hasClass("cancel-sign-in")) {
				$("#signin-overlay").slideUp({
					complete: function() {
						$("body").removeClass("noscroll");
						$("#navigation ul li").css('opacity','1');
						if(!$("body").hasClass("homepage")) {
							$("#header #logo").show();
						}
						location.hash = "";
						if($("#signup-container").css('display')==="block") {
							ga('send', {
								'hitType': 'pageview',
								'page': '/custom-cancel-sign-up',
								'title': 'custom-cancel-sign-up'
							});
							ga('send', 'event', 'signin-overlay', 'cancel-sign-up');
						}
						else {
							ga('send', {
								'hitType': 'pageview',
								'page': '/custom-cancel-sign-in',
								'title': 'custom-cancel-sign-in'
							});
							ga('send', 'event', 'signin-overlay', 'cancel-sign-in');
						}
					}
				});
				$(this).html("Sign in");
				
			}
			else {
				$("#signin-overlay").slideDown({
					complete: function() {
						if($("#signup-container").css('display')==="block") {
							location.hash = "#signup";
							ga('send', {
								'hitType': 'pageview',
								'page': '/custom-sign-up',
								'title': 'custom-sign-up'
							});
							ga('send', 'event', 'signin-overlay', 'sign-up');
						}
						else {
							location.hash = "#signin";
							ga('send', {
								'hitType': 'pageview',
								'page': '/custom-sign-in',
								'title': 'custom-sign-in'
							});
							ga('send', 'event', 'signin-overlay', 'sign-in');
						}
						
						$("#sign-in-cancel").css('opacity','0').css('opacity','1');
					}
				});
				if(!$("body").hasClass("homepage")) {
						$("#header #logo").hide();
				}
				$("body").addClass("noscroll");
				$("#navigation ul li").css('opacity','0');
				$("#sign-in-cancel").css('opacity','1');
				$(this).html("Cancel");
			}
		}
		else {
			//minified menu
			if($(this).hasClass("cancel-sign-in")) {
				$("#signin-window").appendTo("#signin-overlay");
				// $("body").removeClass("noscroll");
				$(this).html("Sign in");
				//$("#navigation ul li").css('opacity','1');
				if(!$("body").hasClass("homepage")) {
					$("#header #logo").show();
				}
				if($("#signup-container").css('display')==="block") {
					ga('send', {
						'hitType': 'pageview',
						'page': '/custom-cancel-sign-up',
						'title': 'custom-cancel-sign-up'
					});
					ga('send', 'event', 'signin-overlay', 'cancel-sign-up');
				}
				else {
					ga('send', {
						'hitType': 'pageview',
						'page': '/custom-cancel-sign-in',
						'title': 'custom-cancel-sign-in'
					});
					ga('send', 'event', 'signin-overlay', 'cancel-sign-in');
				}
				location.hash = "";
			}
			else {
				$("#signin-window").appendTo("#navigation-link-sign-in");
				// $("body").addClass("noscroll");
				$(this).html("Cancel");
				//$("#navigation ul li").css('opacity','0');
				//$("#sign-in-cancel").css('opacity','1');
				if(!$("body").hasClass("homepage")) {
					$("#header #logo").hide();
				}
				location.hash = "#signin";
				ga('send', {
					'hitType': 'pageview',
					'page': '/custom-sign-in',
					'title': 'custom-sign-in'
				});
				ga('send', 'event', 'signin-overlay', 'sign-in');
			}
			
		}
		

		$(this).toggleClass("cancel-sign-in");
		return false;
	});

	$(".close-sign-in").click(function() {
		$("#signin-overlay").slideUp();
		$("body").removeClass("noscroll");
		$("#sign-in-top").html("Sign in").removeClass("cancel-sign-in");
		$("#navigation ul li").css('opacity','1');
	});



	$("#signin-window").click(function(e) {
		event.stopPropagation();
	});
	
	$("#sign-in-button").on("click", function() {

		$(".error-field").removeClass("error-field");
		$("#signin-field-error").html("").hide();

		$("#signin-error").css("display", "none");

		var username = $("#sign-in-username").val();
		var password = $("#sign-in-password").val();

		var appId = $("#appId").val();

		if (!username || username == "") {
			$("#sign-in-username").addClass("error-field");
			return false;
		}

		if (!password || password == "") {
			$("#sign-in-password").addClass("error-field");
			return false;
		}

		var body = {
			"username": username,
			"password": password,
			"app_id": appId
		};

		var bodyJson = JSON.stringify(body);

		var signinUrl = app_base + "/signin";

		$.ajax(signinUrl, {
			type: "POST",
			data: bodyJson,
			dataType: "json",
			error: function(jqXHR, textStatus, errorThrown) {
				if (source === "purchase") {
					trackEvent("test_runner", "collection_runner", "sign_in_failed");
				}

				alert("Something went wrong");
			},
			success: function(data, textStatus, jqXHR) {
				var result = data.result;

				if (result === "success") {
					if (source === "purchase") {
						trackEvent("test_runner", "collection_runner", "sign_in_success");
					}

					ga('send', {
						'hitType': 'pageview',
						'page': '/custom-sign-in-success',
						'title': 'custom-sign-in-success'
					});
					ga('send', 'event', 'signin-overlay', 'sign-in-success');

					var redirectUrl = app_base + "/signin-redirect?";
					redirectUrl += "user_id=" + data.user_id + "&";
					redirectUrl += "access_token=" + data.access_token + "&";
					redirectUrl += "refresh_token=" + data.refresh_token + "&";
					redirectUrl += "expires_in=" + data.expires_in + "&";
					redirectUrl += "name=" + data.name + "&";
					redirectUrl += "app_id=" + data.app_id + "&";
					redirectUrl += "source=" + source;

					window.location.href = redirectUrl;
				} else {
					if (source === "purchase") {
						trackEvent("test_runner", "collection_runner", "sign_in_failed");
					}

					$("#signin-error").css("display", "block");
					$("#signin-error .message").html(data.message);
				}

			}
		});

		return false;
	});

	$("#sign-up-button").on("click", function() {
		$("#signup-error").css("display", "none");

		var username = $("#sign-up-username").val();
		var email = $("#sign-up-email").val();
		var password = $("#sign-up-password").val();
		var realname = $("#sign-up-realname").val();

		var appId = $("#appId").val();

		if (username === "" || password === "" || email === "" || realname === "") {
			$("#signup-error").css("display", "block");
			$("#signup-error .message").html("Fill out all the fields");
			return false;
		}

		if(email && email.indexOf("@") === -1) {
			$("#signup-error").css("display", "block");
			$("#signup-error .message").html("Please enter a valid email ID");
			return false;
		}

		var body = {
			"username": username,
			"password": password,
			"realname": realname,
			"email": email,
			"app_id": appId
		};

		var bodyJson = JSON.stringify(body);
		var signupUrl = app_base + "/signup";

		$.ajax(signupUrl, {
			type: "POST",
			data: bodyJson,
			dataType: "json",
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Something went wrong");
				if (source === "purchase") {
					trackEvent("test_runner", "collection_runner", "sign_up_failed");
				}
			},
			success: function(data, textStatus, jqXHR) {
				var result = data.result;

				if (result === "success") {
					if (source === "purchase") {
						trackEvent("test_runner", "collection_runner", "sign_up_success");
					}

					ga('send', {
						'hitType': 'pageview',
						'page': '/custom-sign-up-success',
						'title': 'custom-sign-up-success'
					});
					ga('send', 'event', 'signin-overlay', 'sign-up-success');

					var redirectUrl = app_base + "/signin-redirect?";
					redirectUrl += "user_id=" + data.user_id + "&";
					redirectUrl += "access_token=" + data.access_token + "&";
					redirectUrl += "refresh_token=" + data.refresh_token + "&";
					redirectUrl += "expires_in=" + data.expires_in + "&";
					redirectUrl += "name=" + data.name + "&";
					redirectUrl += "app_id=" + data.app_id + "&";
					redirectUrl += "source=" + source;

					window.location.href = redirectUrl;
				} else {
					if (source === "purchase") {
						trackEvent("test_runner", "collection_runner", "sign_up_failed");
					}

					$("#signup-error").css("display", "block");
					$("#signup-error .message").html(data.message);
				}

			}
		});

		return false;
	});

	$("#toggle-signup-form").click(function() {
		var signUpVisible = ($("#signup-container").css('display') === "block");
		if (signUpVisible) {
			$("#signup-container").hide();
			$("#signin-container").show();
			$("#new-to-postman").html("New to Postman? ");
			$("#toggle-signup-form").html("Sign up");
			location.hash = "#signin";
			ga('send', {
				'hitType': 'pageview',
				'page': '/custom-sign-in',
				'title': 'custom-sign-in'
			});
			ga('send', 'event', 'signin-overlay', 'sign-in');
		} else {
			$("#signup-container").show();
			$("#signin-container").hide();
			$("#new-to-postman").html("Already have an account? ");
			$("#toggle-signup-form").html("Login");
			location.hash = "#signup";
			ga('send', {
				'hitType': 'pageview',
				'page': '/custom-sign-up',
				'title': 'custom-sign-up'
			});
			ga('send', 'event', 'signin-overlay', 'sign-up');

		}
		return false;
	});

	if(document.location.hash==="#signin") {
		$("#sign-in-top").click();
	}

	if(document.location.hash==="#signup") {
		$("#sign-in-top").click();
		$("#toggle-signup-form").click();
	}

});