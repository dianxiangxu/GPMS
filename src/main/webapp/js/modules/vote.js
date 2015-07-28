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
		s4 : function() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16)
					.substring(1);
		},
		guid : function() {
			return Mellanox.s4() + Mellanox.s4() + Mellanox.s4()
					+ Mellanox.s4() + Mellanox.s4() + Mellanox.s4()
					+ Mellanox.s4() + Mellanox.s4();
		},
		init : function(config) {
			Mellanox.VoteHere();
		},
		GetEmail : function(data) {
			var lines = data.split("\r\n");

			// Mellanox
			var submission_entry_ids = [ 40391348, 40382399, 40077716, 40391156 ];

			// Camera
			// var submission_entry_ids = [ 45652761 ];

			// IBM
			// var submission_entry_ids = [ 43274855 ];

			// To find a duplicate emails
			// var map = {};
			// $.each(lines, function(n, email) {
			// var value = email;
			// if (map[value] == null) {
			// map[value] = true;
			// } else {
			// console.log(email);
			// }

			$.each(lines, function(n, email) {
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

			// var user_id = Math.floor(Math.random() * 899999999 + 100000000);

			// Mellanox
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

			// Camera
			// var param = JSON2
			// .stringify({
			// "social_participants" : [ {
			// "submission_entry_id" : submission_entry_id,
			// "captcha_response" : null,
			// "social_participant" : {
			// "email" : email
			// },
			// "status" : "connected",
			// "access_token" :
			// "CAAHVC4ZCfiFsBANqZBh6HOtyUZAlyaU2SaMmWDFCI6PF40F4GaijBU1QRleZAPzly9kL1VGwW77wkRoiDHO1iL8yZCicrSWhDLkx1IYTuUj8ahUwWdeu7DHud6zoDmLnuqLi4aZAfnw0hdpZBkuVeWkHfOFvdgZALwJPsdR3Q1prC838ZBXpOPZA3ZAO2ik2dlV7KsZD",
			// "expires_in" : 5416,
			// "signed_request" :
			// "bc2OHJlEXKMvGTfPdv5bes-4t0V0-bi-enZFeYE4SVc.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUE4SFNPSTlleVBhaHZPQW82STJJeE10Qm9Oekh3d2hLVEFXZmE3U0Fma2JJV25ra1VsTHlKblpkWlh1aFhrLWpXVDdZS0I3Q0dRc3RoRDIzZWtOM1RFWGZRWE1TNFVXZjBQOTlwSjR6dEluRVRBaGF2b3JOazVQMnZvaVNVcU83MEhrejhsb005dnd1Z0I3SXJlcl9JdGtla256Ukl2aHNhVnFDZEJjdlFsM3BVd2txcTN6OFRpalVWLVZLQUVfaVNRYi1UTE41R1gyUzlhU1RvU1Jpa0ozbzBhWXB6dm95a1NhQkpMU25XN3oyb25qV0QwTFVNcEh6TnZrQkdOalgxMVFPWGkyVDRINGpnNEVudnluaWxWZFNRVkh4SGRpZV9nM1hqS013ajZxcXN2MWZfaWZLM3F6elVyQnBXVTloNCIsImlzc3VlZF9hdCI6MTQzODEwMDk4MywidXNlcl9pZCI6IjYzODYzNjYwMiJ9",
			// "user_id" : user_id,
			// "interaction_token" : uuid,
			// "variation_id" : 932447
			// } ]
			// });

			// IBM
			// var param = JSON2.stringify({
			// "social_participants" : [ {
			// "submission_entry_id" : submission_entry_id,
			// "captcha_response" : null,
			// "social_participant" : {
			// "email" : email
			// },
			// "interaction_token" : uuid,
			// "variation_id" : 677897
			// } ]
			// });

			// Mellanox
			this.config.url = "https://www.wishpond.com/api/pages_v1/social_campaigns/736361/votes";

			// Camera
			// this.config.url =
			// "https://www.wishpond.com/api/pages_v1/social_campaigns/792986/votes";

			// IBM
			// this.config.url =
			// "https://www.wishpond.com/api/pages_v1/social_campaigns/555554/votes";

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
				console.log("Success!");
				break;
			}
		},
		ajaxFailure : function(msg) {
			switch (Mellanox.config.ajaxCallMode) {
			case 0:
				break;
			case 1:
				// alert("Failed!");
				console.log("Failed!");
				break;
			}
		},
	};
	Mellanox.init();
});