$(function() {
	Mellanox = {
		config : {
			isPostBack : false,
			async : false,
			cache : false,
			type : 'POST',
			contentType : "application/json; charset=utf-8",
			data : '{}',
			dataType : 'json',
			url : "",
			// context : document.body,
			ajaxCallMode : 0,
			crossDomain : true,
			headers : {
				'Access-Control-Allow-Origin' : '*'
			},
			success : function(data, status, xhr) {
				alert(xhr.getResponseHeader('Location'));
			},
			error : function(jqXHR, textStatus, ex) {
				alert(textStatus + "," + ex + "," + jqXHR.responseText);
			}
		},
		ajaxCall : function(config) {
			// $.enableCors();
			jQuery.support.cors = true;
			$.ajax({
				type : Mellanox.config.type,
				contentType : Mellanox.config.contentType,
				cache : Mellanox.config.cache,
				async : Mellanox.config.async,
				url : Mellanox.config.url,
				data : Mellanox.config.data,
				dataType : Mellanox.config.dataType,
				success : Mellanox.ajaxSuccess,
				error : Mellanox.ajaxFailure,
				crossDomain : true,
			});
		},
		guid : function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16)
						.substring(1);
			}
			return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
		},
		init : function(config) {
			Mellanox.VoteHere();
		},
		GetEmail : function(data) {
			var lines = data.split("\r\n");

			var submission_entry_ids = [ 40391348, 40382399, 40077716, 40391156 ];

			$.each(lines, function(n, email) {
				// $('#myContainer').append('<div>' + elem + '</div>');
				// return email;

				$.each(submission_entry_ids, function(i, val) {
					// alert(submission_entry_ids[i]);
					Mellanox.VoteNow(email, submission_entry_ids[i]);
				});

			});
		},
		VoteHere : function() {
			// TO GET all Email IDs and randomize GUI
			// {"brandName":"test","aspxCommonObj":{"StoreID":"1","PortalID":"1","UserName":"superuser","CultureName":"en-US"}}

			$.get('EmailsList.txt', function(data) {
				Mellanox.GetEmail(data);
			}, 'text');
		},
		VoteNow : function(email, submission_entry_id) {
			var uuid = Mellanox.guid();
			var param = JSON2.stringify({
				"social_participants" : [ {
					"submission_entry_id" : submission_entry_id,
					"captcha_response" : null,
					"social_participant" : {
						"email" : email
					},
					"interaction_token" : uuid,
					"variation_id" : 872132
				} ]
			});

			this.config.url = "https://www.wishpond.com/api/pages_v1/social_campaigns/736361/votes";
			this.config.data = param;
			this.config.ajaxCallMode = 1;
			this.ajaxCall(this.config);

			return false;
		},
		ajaxSuccess : function(msg) {
			switch (Mellanox.config.ajaxCallMode) {
			case 0:
				break;
			case 1:
				// alert("Success!");
				break;
			}
		},
		ajaxFailure : function(msg) {
			switch (Mellanox.config.ajaxCallMode) {
			case 0:
				break;
			case 1:
				alert("Failed!");
				break;
			}
		},
	};
	Mellanox.init();
});