var signUp = '';
$(function() {
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
		ajaxSuccess : function(msg) {
			switch (signUp.config.ajaxCallMode) {
			case 0:
				break;
			}
		},

		ajaxFailure : function(msg) {
			switch (signUp.config.ajaxCallMode) {
			case 0:
				break;
			}
		},

		init : function(config) {
			// signUp.LoadStaticImage();
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
					})
		}
	};
	signUp.init();
});