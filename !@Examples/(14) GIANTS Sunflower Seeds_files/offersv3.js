var isMobile = {
    Android: function() {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function() {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    Windows: function() {
        return /IEMobile/i.test(navigator.userAgent);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};

/* Facebook functions */
function _fb_send (params, shard) {
	var sendparams = {
		method: 'send',
		display: 'popup',
		next: 'http://woobox.com/util/closewindow'
	};
	return _fb_ui($.extend(true, sendparams, params),
	function (response) {
		if (response && response.post_id) {
			// Post was published
			$.ajax({
				type: "GET",
				url: "/offers/share/"+shard,
				data: "post_id=" + response.post_id
			});
		} else {
			// Post was not published;
		}
	});
}

function _fb_share (params, shard) {
	if (navigator.userAgent.match('CriOS')) {
		var shareparams = {
			method: 'feed'
		};
		return _fb_ui($.extend(true, shareparams, params),
			function (response) {
				if (response && response.post_id) {
					// Post was published
					$.ajax({
						type: "GET",
					url: "/offers/share/"+shard,
					data: "post_id=" + response.post_id
					});
				} else {
					// Post was not published;
				}
			}
		);
	} else if (false && isMobile.any()) {
		var shareparams = {
			method: 'share',
			href: params.link
		};
		return _fb_ui($.extend(true, shareparams, params),
			function (response) {
				if (response && response.error_code) {
					// canceled
				} else {
					// Post was published
					$.ajax({
						type: "GET",
					url: "/offers/share/"+shard,
					data: "post_id=" + response.post_id
					});
				}
			}
		);
	} else {
		var shareparams = {
			method: 'feed'
		};
		return _fb_ui($.extend(true, shareparams, params),
			function (response) {
				if (response && response.post_id) {
					// Post was published
					$.ajax({
						type: "GET",
					url: "/offers/share/"+shard,
					data: "post_id=" + response.post_id
					});
				} else {
					// Post was not published;
				}
			}
		);
	}
}
function _fb_invite (params, shard, aid) {
	var inviteparams = {
		method: 'apprequests'
	};
	return _fb_ui($.extend(true, inviteparams, params),
	function (response) {
		if (response && response.request) {
			if (aid)
				var postdata = "requestid=" + response.request + "&aid="+aid+"&requestcount=" + response.to.length;
			else
				var postdata = "requestid=" + response.request + "&requestcount=" + response.to.length;
			
			// Post was published
			$.ajax({
				type: "GET",
				url: "/offers/invite/"+shard,
				data: postdata
			});
		} else {
			// Post was not published;
		}
	});
}
function _fb_ui (params, callback) {
	if (!callback)
		callback = $.noop;
	try {
		FB.ui(params, callback);
	} catch (err) {
		var method;
		switch (params['method']) {
			case 'feed':
				method = 'share';
				break;
			case 'apprequests':
				method = 'invite';
			default:
				method = params['method'];
		}
		$.ajax({
			type: "POST",
			url: "/errorjs",
			data: "try=fb_"+method+"&name=" + err.name + "&msg=" + err.message
		});
	}	
}
/* Twitter functions */
function _twitter_tweet (message, url) {
	if (url != "") {
	    window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(message)+'&url='+encodeURIComponent(url), 'Tweet', 'location=100,status=0,width=600,height=350');
	}
	else {
	    window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(message), 'Tweet', 'location=100,status=0,width=600,height=350');
	}
		
	return false;
}	

/* Pinterest functions */
function _pinterest_pin (url, picture, message) {
	window.open('http://www.pinterest.com/pin/create/button/?url='+encodeURIComponent(url)+'&media='+encodeURIComponent(picture)+'&description='+encodeURIComponent(message));
	return false;
}

/* google+ functions */
function _post_google (url) {
	window.open('https://plus.google.com/share?url='+encodeURIComponent(url), 'Share on Google+', 'location=100,status=0,width=500,height=500');
	return false;
}

$(function () {
	$(document).on('click', '.fb-send-url', function (e) {
		e.preventDefault();
		if (typeof fb_send_url == 'function' && $(this).data('href'))
			fb_send_url($(this).data('href'));
	});
	
	/* set height for modals when embedded */
	if (typeof Woo != 'undefined' && typeof Woo.inFrame != 'undefined' && Woo.inFrame()) {
		$(document).on('shown', '.modal', function () {
			var height = $(this).outerHeight()*1.05;
			if ($(window).height() < height)
				Woo.setHeight(height);
		});

		$(document).on('hidden', '.modal', function () {
			Woo.setHeight();
		});
	}
});
