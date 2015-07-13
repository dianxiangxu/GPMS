var BrandManage = "";
var BrandName = '';
var BrandID = 0;
var editor, html = '';

$(function() {
	var gpmsCommonObj = function() {
		var gpmsCommonInfo = {
			UserName : GPMS.utils.GetUserName(),
			UserProfileID : GPMS.utils.GetUserProfileID(),
			CultureName : GPMS.utils.GetCultureName()
		};
		return gpmsCommonInfo;
	};

	var brandIds = '';
	var isUnique = true;
	var prevBrandName = '';
	var isNewBrand = false;
	var BrandName = '';
	BrandManage = {
		config : {
			isPostBack : false,
			async : true,
			cache : true,
			type : 'POST',
			contentType : "application/json; charset=utf-8",
			data : '{}',
			dataType : 'json',
			baseURL : GPMS.utils.GetGPMSServicePath() + "AspxCoreHandler.ashx/",
			method : "",
			url : "",
			ajaxCallMode : "",
			error : ""
		},
		ajaxCall : function(config) {
			$
					.ajax({
						type : BrandManage.config.type,
						beforeSend : function(request) {
							request.setRequestHeader('GPMS-TOKEN', _aspx_token);
							request.setRequestHeader("UName", GPMS.utils
									.GetUserName());
							request.setRequestHeader("PID", GPMS.utils
									.GetUserProfileID());
							request.setRequestHeader("PType", "v");
							request.setRequestHeader('Escape', '0');
						},
						contentType : BrandManage.config.contentType,
						cache : BrandManage.config.cache,
						async : BrandManage.config.async,
						url : BrandManage.config.url,
						data : BrandManage.config.data,
						dataType : BrandManage.config.dataType,
						success : BrandManage.config.ajaxCallMode,
						error : BrandManage.error
					});
		},

		ImageUploader : function() {
			var upload = new AjaxUpload($('#txtBrandImageUrl'), {
				action : "OctetStreamReader",
				name : 'myfile[]',
				multiple : false,
				data : {},
				autoSubmit : true,
				responseType : 'json',
				debug : true,
				onChange : function(file, ext) {
				},
				onSubmit : function(file, ext) {
					if (ext != "exe") {
						if (ext
								&& /^(jpg|jpeg|jpe|gif|bmp|png|ico)$/i
										.test(ext)) {
							this.setData({
								'MaxFileSize' : maxFileSize
							});
						} else {
							csscody.alert('<h2>'
									+ getLocale(Brand, 'Alert Message')
									+ "</h2><p>"
									+ getLocale(Brand, 'Not a valid image!')
									+ '</p>');
							return false;
						}
					} else {
						csscody.alert('<h2>'
								+ getLocale(Brand, 'Alert Message')
								+ "</h2><p>"
								+ getLocale(Brand, 'Not a valid image!')
								+ '</p>');
						return false;
					}
				},
				onComplete : function(file, response) {
					debugger;
					var res = eval(response);
					if (res.Message != null && res.Status > 0) {
						BrandName = res.Message.split('/')[2];
						BrandManage.AddNewImages(res);
						return false;
					} else {
						csscody.error('<h2>'
								+ getLocale(Brand, "Error Message")
								+ "</h2><p>"
								+ getLocale(Brand, 'Can not upload the image!')
								+ '</p>');
						return false;
					}
				}
			});
		},
		AddNewImages : function(response) {
			$("#divBrandImage")
					.html(
							'<img src="'
									+ gpmsRootPath
									+ response.Message
									+ '" class="uploadImage" height="90px" width="100px"/>');
		}
	};
	BrandManage.ImageUploader();
});