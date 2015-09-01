var attempts = 0;
var fbconnected = false;
var sessiondata = options.sessiondata;
var requiresPermissions = false;

window.submitarr = new Array();
window.submitcounter = 0;

$(document).bind('nextdialog', function (e) {
	window.submitcounter++;
	$(document).trigger('rundialog');
});

$(document).bind('rundialog', function (e, exclude) {
	if (window.submitcounter >= window.submitarr.length) submit_form();
	else run_dialog(exclude);
});

function run_dialog(exclude) {
	var filter  = false;
	if (typeof exclude == 'array') filter = true; 
	if (typeof window.submitarr[window.submitcounter] === 'function') {
		if (!filter || !$.inArray(window.submitarr[window.submitcounter], exclude)) {	
			window.submitarr[window.submitcounter]();
		}
	}
}

function submit_form_tweetbonus () {
	if ($('#tweet').val() != '') {
		submit_form_twitter();
	} else {
		$(document).trigger('nextdialog');
	}
}
function submit_form_twitter() {
	if (document.cookie.indexOf('twittersession') == -1) {
        var that = this;
        that._oauthWindow = window.open('/offers/twitterlogin', 'ConnectToTwitter', 'location=0,status=0,width=800,height=400');
        that._oauthInterval = window.setInterval(function(){
            if (that._oauthWindow.closed) {
                window.clearInterval(that._oauthInterval);
				if (document.cookie.indexOf('twittersession') != -1) {
					$(document).trigger('nextdialog');
				}
            }
        }, 1000);
		return false;
	} else {
		$(document).trigger('nextdialog');
	}
}

function submit_form_pinterest () {
	if (document.cookie.indexOf('pinterest_username') == -1) {
		var pinwin = window.open('/offers/username/'+options.shard+'/pinterest?redirect='+encodeURIComponent('/util/closewindow'), 'PinterestUsernameRequest', 'location=0,status=0,width=660,height=300');
		var success = false;
		pinInterval = window.setInterval(function(){
			if (typeof pinwin !== 'undefined' && pinwin.closed) {
				window.clearInterval(pinInterval);
				if ($('input[name="pinterest_username"]').val() != '') {
					$(document).trigger('nextdialog');
				}
			} else if (typeof pinwin === 'undefined') {
				window.clearInterval(pinInterval);
			}
		}, 1000);
	} else {
		$(document).trigger('nextdialog');
	}
}




	function twitter_tweet_data(event) {
		if (event) {
			$.ajax({
				type: 'post',
				url: "/offers/twittershare",
				data: "shard="+options.shard,
				success: function(data){
					return true;
				}
			});
		}
	}

function twitter_tweet() {
	return _twitter_tweet(options.twitter_tweet, options.twitter_url);
}	

function pinterest_pin () {
	return _pinterest_pin(options.offer_url, options.offer_shareimage, "");
}

function post_google () {
	return _post_google(options.offer_url);
}


function submit_form() {
	try {
		$.ajax({type: "POST", async: false, url: "/conversion",data: "offer="+options.shard+"&action=submitattempts&"+sessiondata});
		$('#actionbutton').prop('disabled', true);
		$('#input').unbind('submit');
		$('#input').submit();
	} catch(err) {
		$.ajax({type: "POST", async: false, url: "/conversion",data: "offer="+options.shard+"&action=submiterrors&"+sessiondata});
	}
}

	function submit_skip_share() {
		//clear out all in form.
		$('input[type=text]').val('');

		if ($('input[name="skip_sharing"]').length)
			$('input[name="skip_sharing"]').val(1);

		$('form').append('<input type="hidden" name="email" value="'+options.from_email+'" />');
		$('input[name="send_to_coupon"]').val('');
		submit_form();
	}

	function submit_email_coupon() {
		var shard = $('input[name="send_to_coupon"]').val();
		if (shard) {			
			if (!email_valid($('input[name="to_email"]').val())){
				alert(options.text_error_email_invalid);
				return false;
			}

			if ($('input[name="from_email"]').length)
				$('input[name="from_email"]').val(options.from_email);

			$('form').append('<input type="hidden" name="email" value="'+$('input[name="to_email"]').val()+'" />');
			data_window = window.open("about:blank", "",'location=0,status=0,width=660,height=300');
			$.ajax({type: "POST",
					url: "/"+shard,
					data: $('form').serializeArray()
			})
			.done(function (data) {
				data_window.document.open();
				data_window.document.write(data);
				data_window.document.close();
				$('input[name="my_source"]').val(0);
				$('input[name="email"]').val(options.from_email);
				//set the sharing from facebook.
				if ($('input[name="shared_from_email"]').length)
					$('input[name="shared_from_email"]').val(1);
		   	//send the submit form.
				submit_form();
      });
		}else
			$(document).trigger('nextdialog');
	}

	function submit_fb_share() {
		return _fb_share_coupon({
			name: options.share.name,
			caption: options.share.caption,
			link: options.share.coupon_link,
			picture: options.share.picture,
			ref: options.share.feed_ref,
			description: options.share.description		
		}, options.shard);
	}

	function _fb_share_coupon(params, shard) {
	  var shareparams = {
			method: 'feed',
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
				//clear out all in form.
				$('input[type=text]').val('');
				$('input[name="send_to_coupon"]').val('');

				$('form').append('<input type="hidden" name="email" value="'+options.from_email+'" />');

				//set the sharing from facebook.
				if ($('input[name="shared_from_fb"]').length)
					$('input[name="shared_from_fb"]').val(1);

				if ($('input[name="my_source"]').length)
					$('input[name="my_source"]').val(options.referral_id);

		   	//send the submit form.
		   	submit_form();
      } else {
	      // Post was not published;
      }
	  });
	}

	function email_valid(email) {
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}
		
	function fb_share () {
		return _fb_share({
			name: options.share.name,
			caption: options.share.caption,
			link: options.share.feed_link,
			picture: options.share.picture,
			ref: options.share.feed_ref,
			description: options.share.description
		}, options.shard);
	}

	function fb_send () {
		return _fb_send({
			name: options.share.name,
			link: options.share.send_link,
			picture: options.share.picture,
			ref: options.share.send_ref,
			description: options.share.description
		}, options.shard);
	}
	
	

function authfacebook() {
	FB.getLoginStatus(function(response) {
			if (response.status == 'connected') {
				window.top.location.replace(taburl);
			} else {
				FB.ui(
				   {
					 method: 'oauth'
				   },
				   function(response) {
						if (response.session) {
							window.location.reload();
						}
				   }
				 );
			}
	});
}

	function fb_tab_connect() {
		try{
			FB.ui(
			{
				method: 'oauth'
			},
			function(response) {
				if (response.session) {
					$(document).trigger('nextdialog');
				} else {
					// show why auth is needed
				}
			});
		} catch(err) {
			// error
		}
	}

	function fb_connect() {
		if(navigator.userAgent.match('CriOS')) {
			$(document).trigger('nextdialog');
			return true;
		}
		$.ajax({type: "POST", async: false, url: "/conversion",data: "offer="+options.shard+"&action=attempts&"+sessiondata});
		try {		
			FACEBOOK.login(options.facebook_oauth_scope).then(
				function () {
					$(document).trigger('nextdialog');
				},
				function () {
					// show why auth is needed
					$.ajax({type: "GET", async: false, url: "/conversion",data: "offer="+options.shard+"&action=authdenies&"+sessiondata});
				}
			);
			$.ajax({type: "GET", async: false, url: "/conversion",data: "offer="+options.shard+"&action=authdialogs&"+sessiondata});
		} catch(err) {
			$.ajax({type: "GET", async: false, url: "/conversion",data: "offer="+options.shard+"&action=authdialogerrors&"+sessiondata});
			$(document).trigger('nextdialog');
			return false;
		}
		return false;
	}
	
	var fangatelikeclicked = false;
	function onFacebookLoad() {
		$('#sharebutton').click(function(event) { event.preventDefault(); fb_share();});
		$('#sendbutton').click(function(event) { event.preventDefault(); fb_send(); });			
		FB.Event.subscribe('edge.create', function(href, widget) {
		
			if (href == options.facebook_fanpage_url)
				fangatelikeclicked = true;
			$.ajax({
				type: "POST",
				data: "href="+href,
				url: "/offers/liked/"+options.shard
			});
		});
		FB.Event.subscribe('auth.login', function(response) {
//			window.location.reload( true );
		});
		FB.getLoginStatus(function(response) {
			if (response.authResponse) {
				FACEBOOK.checkPermissions(options.facebook_oauth_scope).then(
					function () {},
					function () {
						if ((options.tab && options.requires_facebook_canvas) || (!options.tab && options.requires_facebook))
							window.submitarr.push(fb_connect);
						$.ajax({type: "POST", async: false, url: "/conversion",data: "offer="+options.shard+"&action=needlikepermission&"+sessiondata});
					}
				);
			} else {
				FB.Event.unsubscribe('auth.login', function() {});
				if ((options.tab && options.requires_facebook_canvas) || (!options.tab && options.requires_facebook))
					window.submitarr.push(fb_connect);
			}
		});
		// login event to check to see if page needs to be refreshed
	}

	




function formlessSubmit () {
	if ($('#input').hasClass('nobutton')) {
		$(document).trigger('rundialog');
	}
	return true;
}




// OPTIONS

if (options.uses_pinterest) {  
	$(document).ready(function () {
		if (!$(':input[name="pinterest_username"]').length)
		$('#input').append("<input type='hidden' name='pinterest_username' value='' />");
	});
	window.submitarr.push(submit_form_pinterest);
}

if (options.has_twitterfollowbutton || options.has_tweetbutton) {
	window.twttr = (function (d,s,id) {
	  var t, js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
	  js.src="https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
	  return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
	}(document, "script", "twitter-wjs"));
}

if (options.has_tweetbutton) {
	twttr.ready(function (twttr) {
		twttr.events.bind('tweet', twitter_tweet_data);
	});
}

if (options.requires_twitter) {
	window.submitarr.push(submit_form_twitter);
} else if (options.has_tweetbonus) {
	window.submitarr.push(submit_form_tweetbonus);
}

if (options.uses_coupons) {
	window.submitarr.push(submit_email_coupon);
}

if (options.offer_type == 'poll') {
	$(document).ready(function() {
		if (!$(':input[name="vote"]').length) {
			$('form').append("<input type='hidden' name='vote' value='0' />");
		}
		$('.vote').click(function() {
			$('input[name="vote"]').val($(this).attr('choice'));
			$('#voted').attr('checked','checked');
			for (var i = 1; i <= 50; i++) {
				if (i != $(this).attr('choice')) {
					$('#choice_'+i).removeClass('chosen').addClass('not-chosen');
				} else {
					$('#choice_'+i).addClass('chosen').removeClass('not-chosen');
				}
			}
			$('input[name="vote"]').val($(this).attr('choice'));
			formlessSubmit();
		});
	});
}

	// Change id of first form to input if we don't have an input id
    if (!$("#input").length)
		$("form").first().attr("id", "input");
	// Add hidden form fields
	$('#input').append('<input type="hidden" name="appid" value="'+ options.facebook_appid +'" />');
	$('#input').append('<input type="hidden" name="actions" value="generate" />');
	$('#input').append('<input type="hidden" name="submitted" value="1" />');
	$('<input>').attr({ type: 'hidden', name: options.session_name,	value: options.session_data}).appendTo('#input');

	if ($('canvas').length) {
		$('#input').append('<input type="hidden" name="canvas" value="" />');
	}

	if (options.tab) {
		$('#input').append('<input type="hidden" name="tab" value="1" />');
	}
	
	if (options.embed) {
		$('#input').append('<input type="hidden" name="embed" value="'+ options.embed +'" />');
	}
	
	if (options.plugin) { 
		$('#input').append('<input type="hidden" name="plugin" value="'+ options.plugin_raw +'" />');
	}
	
	// Set form action
	$("#input").attr("action", options.submit_url);
	$("#input").attr("ACTION", options.submit_url);
	//set form method
	if (!$('#input').attr("method")) {
		$('#input').attr("method", "post");
	}
	//set multipart if has file field
	if (!$('#input').attr("enctype") && $('#input').children('input:file').length) {
		$('#input').attr("enctype", "multipart/form-data");
	}
	// Rename element names submit (avoid jquery submit issue on certain browsers)
	$('input[name="submit"]').attr("name", "actionbutton");

	// override submit for dialogs
	$('#input').submit(function (event) {
		event.preventDefault();

		// get canvas data if any 
		if ($('canvas').length) {
			var data = document.getElementsByTagName('canvas')[0].toDataURL();
			$('input[name="canvas"]').val(data);
		}

		$(document).trigger('rundialog');
	});

	/* Workaround for bug in FB IOS app with file uploads */
	if (navigator.userAgent.match(/FBIOS/)) {
		$('input[type="file"]').each(function() {
			$(this).attr('multiple',true);
			$(this).change(function(){
				if ($(this)[0].files.length > 1) {
					$(this)[0].value = '';
					$(this).siblings('span').text(options.text_error_single_file).show();
				}
			});
		});
	}

	$(document).ready(function () {
		// Add counter to tweet field
		$("#tweet").simplyCountable({maxCount: 140});
	
		// Auto populate the form fields with saved values
		if (typeof inputs !== 'undefined') {		
			// reset form values from json object
			$.each(inputs, function(name, val){
				var $el = $('[name="'+name+'"]'),
					type = $el.attr('type');

				switch(type){
					case 'checkbox':
						if (val)
							$el.attr('checked', 'checked');
						else
							$el.removeAttr('checked');
						break;
					case 'radio':
						$el.filter('[value="'+val+'"]').attr('checked', 'checked');
						break;
					default:
						$el.val(val);
				}
			});
		}
	});
