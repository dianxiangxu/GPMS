var testManage = "";
$(function() {
	var positionsDetails = "";
	testManage = {
		config : {
			isPostBack : false,
			async : true,
			cache : true,
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
						type : testManage.config.type,
						beforeSend : function(request) {
							request.setRequestHeader('GPMS-TOKEN', _aspx_token);
							request.setRequestHeader("UName", GPMS.utils
									.GetUserName());
							request.setRequestHeader("PID", GPMS.utils
									.GetUserProfileID());
							request.setRequestHeader("PType", "v");
							request.setRequestHeader('Escape', '0');
						},
						contentType : testManage.config.contentType,
						cache : testManage.config.cache,
						async : testManage.config.async,
						url : testManage.config.url,
						data : testManage.config.data,
						dataType : testManage.config.dataType,
						success : testManage.ajaxSuccess,
						error : testManage.ajaxFailure
					});
		},

		getObjectFromParentObject : function(parentObject, college, deparment,
				positionType, prop, valu) {
			debugger;
			for ( var key in parentObject) {
				if (parentObject.hasOwnProperty(key)) {
					if (parentObject[key][prop] == valu) {
						return parentObject[key];
					}
				}
			}
		},

		ajaxSuccess : function(msg) {
			switch (testManage.config.ajaxCallMode) {
			case 0:
				break;
			case 1:
				// College
				// Department
				// PositionType
				// PositiionTitle
				positionsDetails = msg;
				testManage.secondMethod();
				// console.log(testManage.getObjectFromParentObject(msg,
				// "Engineering", "Electrical Engineering"));
				// for ( var key1 in msg) {
				// if (msg.hasOwnProperty(key1)) {
				// alert(key1 + " -> " + msg[key1]);
				// for ( var key2 in msg[key1]) {
				// alert(key2 + " -> " + msg[key1][key2]);
				// for ( var key3 in msg[key2]) {
				// alert(key3 + " -> " + msg[key2][key3]);
				// for ( var key4 in msg[key3]) {
				// alert(key4 + " -> " + msg[key3][key4]);
				// }
				// }
				// }
				// }
				// }
				break;
			}
		},

		ajaxFailure : function(msg) {
			switch (testManage.config.ajaxCallMode) {
			case 0:
				break;
			case 1:
				alert('Error Message');
				break;
			}
		},

		isTestMethod : function() {
			// var userUniqueObj = {
			// UserID : userId,
			// NewEmail : newEmail
			// };
			// var gpmsCommonInfo = gpmsCommonObj();
			// GetPositionDetailsHash
			this.config.url = this.config.baseURL + "GetAllUserList";
			// this.config.data = JSON2.stringify({
			// userUniqueObj : userUniqueObj,
			// gpmsCommonObj : gpmsCommonInfo
			// });
			this.config.data = "{}";
			this.config.ajaxCallMode = 1;
			this.ajaxCall(this.config);
			return false;
		},

		secondMethod : function() {
			alert(positionsDetails);
			$.each(positionsDetails, function(item, value) {
				console.log(value.id);
				$.each(value.positions, function(keyCollege, valueCollege) {
					console.log(keyCollege, valueCollege);
				});
			});
		},

		init : function() {
			testManage.isTestMethod();

		}
	};
	testManage.init();
});