var usersRegistration = '';
$(function() {
	var gpmsCommonObj = function() {
		var gpmsCommonInfo = {
				UserName : GPMS.utils.GetUserName(),
				UserProfileID : GPMS.utils.GetUserProfileID(),
				CultureName : GPMS.utils.GetCultureName()
		};
		return gpmsCommonInfo;
	};

	usersRegistration = {
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
					type : usersManage.config.type,
					beforeSend : function(request) {
						request.setRequestHeader('GPMS-TOKEN', _aspx_token);
						request.setRequestHeader("UName", GPMS.utils
								.GetUserName());
						request.setRequestHeader("PID", GPMS.utils
								.GetUserProfileID());
						request.setRequestHeader("PType", "v");
						request.setRequestHeader('Escape', '0');
					},
					contentType : usersManage.config.contentType,
					cache : usersManage.config.cache,
					async : usersManage.config.async,
					url : usersManage.config.url,
					data : usersManage.config.data,
					dataType : usersManage.config.dataType,
					success : usersManage.ajaxSuccess,
					error : usersManage.ajaxFailure
				});
			},
			
			LoadStaticImage : function() {
				$('.cssClassSuccessImg').prop('src',
						'' + GPMS.utils.GetGPMSRootPath() + '/images/right.jpg');
			},
			
	}
});
