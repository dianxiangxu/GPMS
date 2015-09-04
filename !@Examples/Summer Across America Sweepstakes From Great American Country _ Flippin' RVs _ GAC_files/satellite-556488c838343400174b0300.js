// Requirements: jQuery, EngageSciences NGX Object, SNI mdManager
// Full NGX script: https://display.engagesciences.com/ui/ngx.embed.js
// For the best tracking SweepsID should be set in the main document.
// Example...
// <script>
//    mdManager.setParameter("SweepsID","#####");
// </script>
// This data will be set automatically as well but may not
// be available during the initial pageload unless set manually.

SNI.EngageSweepsManager = SNI.EngageSweepsManager || {};

SNI.EngageSweepsManager.init = function(config) {
	config = config || {};
	// Check if already initialized
	if ( SNI.EngageSweepsManager.initialized ) {
		return;
	}
	// Set initialized flag
	SNI.EngageSweepsManager.initialized = true;
	var $ = jQuery,
	// In the case of an array the type should be "array" 
	// otherwise it should match the expected return value of a typeof operator. 
	applyConfig = function(full_series, this_step, key, type, defaultval){
		var value;
		if ( type === "array" ) {
			value = Array.isArray(this_step[key]) && this_step[key].length > 0 ? this_step[key] : Array.isArray(full_series[key]) && full_series[key].length > 0 ? full_series[key] : defaultval;
		} else {
			value = typeof this_step[key] === type && this_step[key] ? this_step[key] : typeof full_series[key] === type && full_series[key] ? full_series[key] : defaultval;
		}
		return value;
	},
	series = typeof config === "object" && Array.isArray(config.series) ? config.series : [config],
	series_index = 0,
	step_config = series[0],
	conf_campaign_id = applyConfig(config,step_config,"campaign_id","string",""),
	campaign_id = conf_campaign_id,
	campaign_id_index = {},
	step_friendly = step_config.friendlyname || (series.length > 1 ? series_index : ""),
	page_state = "",
	$container = $(applyConfig(config,step_config,"container","string",'article')),
	confirm_states = applyConfig(config,step_config,"confirm_states","array",['confirmation']),
	is_confirmation = false, //this is to track whether the current state is thanks
	user_details = '',
	userID = '',
	detail_attempt = 0,
	first_entry = false,
	confirmSent = false,
	origTitle = mdManager.getParameter('title'),
	sniSite = mdManager.getParameter('Site').toLowerCase(),
	thanksUrl = step_config.thanksUrl || "",
	ratelimitUrl = step_config.ratelimitUrl || "",
	optlyTests = "",
	voting = applyConfig(config,step_config,"voting","boolean",false),
	voting_item = 1,
	prev_click = false,
	track_abandonment = applyConfig(config,step_config,"track_abandonment","boolean",true),
	ad_slots = applyConfig(config,step_config,"ad_slots","array",['dfp_smartphone_banner','dfp_bigbox','dfp_leaderboard']),
	// nextInSeries: apply updated basd on step_config 
	nextInSeries = function(c_id){
		series_index++;
		if ( typeof campaign_id_index[c_id] === "number" ) {
			series_index = campaign_id_index[c_id];
		}
		if ( series[series_index] ) {
			step_config = series[series_index];
			conf_campaign_id = applyConfig(config,step_config,"campaign_id","string","");
			campaign_id = conf_campaign_id;
			if ( conf_campaign_id ) {
				campaign_id_index[conf_campaign_id] = series_index;
			}
			step_friendly = step_config.friendlyname || "";
			$container = $(applyConfig(config,step_config,"container","string",'article'));
			confirm_states = applyConfig(config,step_config,"confirm_states","array",['confirmation']);
			thanksUrl = step_config.thanksUrl || "";
			ratelimitUrl = step_config.ratelimitUrl || "";
			voting = applyConfig(config,step_config,"voting","boolean",false);
			voting_item = 1;
			track_abandonment = applyConfig(config,step_config,"track_abandonment","boolean",true);
			ad_slots = applyConfig(config,step_config,"ad_slots","array",['dfp_smartphone_banner','dfp_bigbox','dfp_leaderboard']);
			if ( step_config.statelisteners ) {
				attachStateListeners(step_config.statelisteners,step_friendly);
			}
		}
	},
	// handleSubmissionValues: NOT IN USE 
	handleSubmissionValues = function(eventName, payload) {
		//  var submissionValues = payload.submissionValues;
	},
	// handleUserDetails: User Demographics passed up from iframe
	handleUserDetails = function(eventName, payload) {
		if ( confirmSent ) {
			return;
		}
		if ( typeof payload.userDetails === "object" ) {
			user_details = payload.userDetails.dateOfBirth.year + "|";
			if ( payload.userDetails.gender.toLowerCase() === "male" || payload.userDetails.gender.toLowerCase() === "m" ) {
				user_details += "m";
			} else if (	payload.userDetails.gender.toLowerCase() === "female" || payload.userDetails.gender.toLowerCase() === "f" ) {
				user_details += "f";
			} else {
				user_details += "u";
			}
			user_details += "|" + payload.userDetails.cableProvider;
		}
		if (page_state !== "" && thanksUrl && typeof s === "object") {
			if ( typeof SNI.Analytics === "object" && typeof SNI.Analytics.trackViaLS === "function" && typeof s.track_ls_analytics === "function" ) {
				SNI.Analytics.trackViaLS({ eVar36: user_details, eVar75: mdManager.getParameterString("SweepsID"), events: first_entry ? "event134,event34" : "event34" });
			} else {
				s.linkTrackVars = 'eVar36,eVar10,prop32,eVar75,prop7';
				s.events = s.apl(s.events, "event34", ",", 2);
				if (first_entry){
					s.events = s.apl(s.events, "event134", ",", 2);
				}
				s.eVar36 = user_details;
				s.eVar10 = s.prop32 = userID;
				s.linkTrackEvents = "event134,event34";
				s.eVar75 = mdManager.getParameterString("SweepsID");
				s.tl(this, 'o', 'logEvent');
				delay(300); //give the analytics call time to go out
				confirmSent = true;
				// reset eVars and props
				s.linkTrackVars = '';
			}
		}
	},
	// handleUid: User ID passed up from iframe
	handleUid = function(eventName, payload) {
		userID = payload.uid.replace('id:', '');
	},
	// handleSweepsId: Set mdManage Sweeps ID passed up from iframe
	handleSweepsId = function(eventName, payload) {
		if (typeof payload.campaignId !== 'undefined') {
			mdManager.setParameter("SweepsID", payload.campaignId);
			campaign_id = payload.campaignId;
			if ( typeof campaign_id_index[campaign_id] === "number" && series_index !== campaign_id_index[campaign_id] ) {
				_satellite.notify("calling nextInSeries:" + campaign_id +", "+ campaign_id_index[campaign_id] + ", " + series_index, 1);
				nextInSeries(campaign_id);
			} else {
				_satellite.notify("Not calling nextInSeries:" + campaign_id +", "+ campaign_id_index[campaign_id] + ", " + series_index, 1);
			}		
		}
	},
	// stateUpdate: update state related variables, log pageview, refresh ads, trigger special handling on confirmation
	stateUpdate = function(eventName, payload) {
		var state = typeof payload === "object" && payload.name ? payload.name : eventName.split(":").pop(),
			uId = mdManager.getUniqueId().split("|");
		_satellite.notify("stateUpdate Event:" + eventName + " " +  state, 1);
		if (state === "state") {
			return;
		}
		if ( voting && eventName === "flow:prev" ) {
			prev_click = true;
			voting_item--;
			return;
		}

		if (confirm_states.indexOf(state) > -1) {
			allow_abandon_track = false;
			// if we don't have user details yet try again in a little while
			if (!user_details && detail_attempt < 2) {
				// only try twice 
				detail_attempt++;
				setTimeout(function() {
					stateUpdate(eventName, payload);
				}, 200);
				return;
			}
			if (thanksUrl) {
				//block the form abandonment tracking
				allow_abandon_track = false;
				document.location.href = thanksUrl;
				return;
			} else {	
				confirmationView(true);
			}
		} else {
			confirmationView(false);
		}
		if (uId.length > 1) {
			uId.pop();
		}
		uId.push(step_friendly ? step_friendly + "_"+ state : state);
		if (!page_state) {
			page_state = state;
			$container.addClass(state);
		}
		if ( state === "after" && voting ) {
			if ( prev_click ) {
				prev_click = false;
				voting_item--;
			}
			state += "-" + voting_item;
			voting_item++;
		}
		
		if (state !== page_state) {
			if ( state === "entry" && page_state === "confirmation" ) {
				nextInSeries();
			}
			$container.addClass(state);
			$container.removeClass(page_state);
			// If something needs to happen based on a particular state
			// $(document).on('sweepsStateChange', function(data) { 
			//									var state = data.state; 
			//									// do something based on the state });
			if ( step_friendly ) {
				$(document).trigger({type:"sweepsStateChange",
								state:step_friendly + "_" + state
								});
			}
			$(document).trigger({type:"sweepsStateChange",
								state: state
								});
			page_state = state;
			mdManager.setParameter("uniqueID", uId.join("|"));
			mdManager.setParameter("title", origTitle + " - " + ( step_friendly ? step_friendly + "_"+ page_state : page_state ));
			if (typeof CQ_Analytics === "object"  && CQ_Analytics.Sitecatalyst) {
				CQ_Analytics.Sitecatalyst.collect();
				CQ_Analytics.Sitecatalyst.events = [];
				CQ_Analytics.Sitecatalyst.updateEvars();
				}
			if (typeof s === "object") {
				// if this is the confirmation page add the demo data and entry event
				s.linkTrackVars = 'eVar75,prop7';
				s.eVar75 = mdManager.getParameterString("SweepsID");
				if ( !voting && !confirmSent && confirm_states.indexOf(state) > -1 && s.events.indexOf("event34") === -1) {
					s.events = s.apl(s.events, "event34", ",", 2);
					if (first_entry){
						s.events = s.apl(s.events, "event134", ",", 2);
					}
					s.linkTrackVars = 'eVar36,eVar10,prop32,eVar75,prop7';
					s.eVar36 = user_details;
					s.eVar10 = s.prop32 = userID;
					s.linkTrackEvents = s.events;
					confirmSent = true;
				}
				s.t();
			}
			if (typeof CQ_Analytics === "object" && CQ_Analytics.Sitecatalyst) {
				CQ_Analytics.Sitecatalyst.events = [];
			} else {
				s.events = "";
			}
			// make sure the bigbox is in the viewport
			if ( $container.length > 0 && $(window).scrollTop() > $container.offset().top + 10 ) {
				$(window).scrollTop($container.offset().top);
			}
			refreshAds();
		}
	},
	// Sends a custom link event with module click tracking data - this does not increment a pageview
	logEvent = function(eventName, payload) {
		var module = "sweeps_social",
			eName = eventName.split(":").pop();
		switch (eventName) {
			case "action:invite":
				module = "invite";
				break;
			case "state:rules":
				module = "sweeps_nav";
				break;
		}
			if (typeof s === "object") {
				s.linkTrackVars = 'eVar16,eVar17,eVar18,eVar19,prop18,eVar75,prop7';
				s.linkTrackEvents = "";
				s.eVar16 = sniSite + ":" + module;
				s.eVar17 = sniSite + ":" + module + ":" + page_state;
				s.prop18 = sniSite + ":" + module + ":" + s.pageName;
				s.eVar18 = sniSite + ":" + module + ":" + eName;
				s.eVar19 = sniSite + ":" + module + ":#";
				s.eVar75 = mdManager.getParameterString("SweepsID");
				s.tl(this, 'o', 'logEvent ' + eName);
				// reset eVars and props
				s.linkTrackVars = '';
				s.eVar19 = "";
				s.eVar18 = "";
				s.eVar18 = "";
				s.eVar17 = "";
				s.eVar16 = "";
			}
	},	
	// Update the Ads on pageview
	refreshAds = function() {
		var slotName, i;
		if (typeof SniAds === "object" && SniAds.refreshSlot) {
			if ( ad_slots.length > 0 ) {
				i = ad_slots.length;
				while ( i-- ) {
					SniAds.refreshSlot(ad_slots[i]);
				}
			} 
		}
	},
	// trigger view for Confirmation page
	confirmationView = function(isThanks) {
		is_confirmation = is_confirmation ? false : isThanks; // if current state is confirmation it will go back to false, otherwise it will 
		$('#confirmation-content').toggle(isThanks);
	},
	// * Accepts a target state, function  
	// * Executes the function action when the target state is active
	stateListener = function(tgt_state,action) {
		$(document).on('sweepsStateChange', function(data) {
			if ( data.state === tgt_state ) {
				action();
			}
		}); 
	},
	statusReport = function() {
			var stat = "\n==============================================\n";
			stat += "**** START: Engage Sciences iFrame Status ****\n";
			stat += "==============================================\n";
			stat += "Campaigns in Series:     " + series.length+ "\n";
			stat += "Current Campaign:        " + series_index + "\n";
			stat += "Current Campaign Name:   " + step_friendly + "\n";
			stat += "Current Campaign ID:     " + campaign_id + "\n";
			stat += "Current Campaign Conf:   " + conf_campaign_id + "\n";
			stat += "Current Page State:      " + page_state + "\n";
			stat += "Parent Page Container:   " + $container + "\n";
			stat += "Parent Page Ad Slots:    " + ad_slots + "\n";
			stat += "Confirmation States:     " + confirm_states + "\n";
			stat += "Is Confirmation State:   " + is_confirmation + "\n";
			stat += "User Details:            " + ( user_details || "Not Available" ) + "\n";
			stat += "Confirmation Sent:       " + confirmSent+ "\n";
			stat += "Thanks Page URL:         " + ( thanksUrl || "N/A" ) + "\n";
			stat += "Rate Limit URL:         " + ( ratelimitUrl || "N/A" ) + "\n";
			stat += "Optimizely Experiments:  " + ( optlyTests || "N/A" ) + "\n";
			stat += "Voting Workflow Active:  " + voting + "\n";
			stat += "Current Voting Item:     " + voting_item + "\n";
			stat += "Track Form Abandonment:  " + track_abandonment + "\n";
			stat += "==============================================\n";
			stat += "***** END: Engage Sciences iFrame stat *****\n";
			stat += "==============================================\n";
			return stat;
	},
	// attaches listeners for specific states based on config 
	attachStateListeners = function(statelisteners,step_name) {
		var stateKeys,i;
		if ( statelisteners ) {
			stateKeys = Object.keys(statelisteners).sort();
			i = stateKeys.length || 0;
			while (i--){
				if ( step_name ) {
					stateKeys = step_name + "_" + stateKeys;
				}
				stateListener(stateKeys,statelisteners[stateKeys]);
			}
		}
	},
	// Vars and functions for DTM Form Abandonment support
	allow_abandon_track = false,
	// Set default value for last form element touched
	lastElement = mdManager.getParameter('SweepsID') + "|none",
	// Blocking function to allow abandonment tracking to go out
	delay = function(ms) {
		var start = +new Date();
		while ((+new Date() - start) < ms) {}
	},
	// IE Friendly eventListener wrapper
	addIEFriendlyEventListener = function(evnt, elem, func) {
		if (elem.addEventListener) { // W3C DOM
			elem.addEventListener(evnt, func, false);
		} else if (elem.attachEvent) { // IE DOM
			elem.attachEvent("on" + evnt, func);
		} else { // No much to do
			elem[evnt] = func;
		}
	};
	// default container to body if article did work
	if ($container.length === 0) {
		$container = $('body');
	}
	if ( campaign_id ) {
		campaign_id_index[campaign_id] = series_index;
		mdManager.setParameter("SweepsID", campaign_id);
	}
	
	if ( step_config.statelisteners ) {
		attachStateListeners(step_config.statelisteners,step_friendly);
	}
	//-------------------------------------------------
	// Public methods 
	//-------------------------------------------------
	// SNI.EngageSweepsManager.setContainer:
	// * Accepts a valid jQuery selector
	// * Sets the container used for scrolling to top of page. 
	// * A selector that will place the Big Box ad within the 
	//   viewport vertically should be used. 
	SNI.EngageSweepsManager.setContainer = function(selector) {
		$container = $(selector);
	};
	// SNI.EngageSweepsManager.setConfirmStates:
	// * Accepts an array of strings
	// * Sets the locol confirmStates array
	// * Any values in this array that match a state message from the
	//   iframe will trigger confirmation page behavior
	SNI.EngageSweepsManager.setConfirmStates = function(stateArray) {
		confirm_states = stateArray.slice();
	};
	// SNI.EngageSweepsManager.setThanksURL:
	// * Accepts a URL string
	// * Set thanksUrl to the value passed in
	// * If thanksUrl is set the page will redirect after receiving the confirmation state update
	SNI.EngageSweepsManager.setThanksURL = function(url) {
		thanksUrl = url;
	};
  // SNI.EngageSweepsManager.setRateLimitURL:
	// * Accepts a URL string
	// * Set setRateLimitURL to the value passed in
	// * If setRateLimitURL is set the page will redirect after receiving the alreadyentered event
	SNI.EngageSweepsManager.setRateLimitURL = function(url) {
		ratelimitUrl = url;
	};
	// SNI.EngageSweepsManager.setVoting:
	// * Accepts a boolean value
	// * Set voting to the value passed in
	// * Should be set if this is a voting appliction like Blog Cabin
	SNI.EngageSweepsManager.setVoting = function(setvote) {
		voting = setvote;
	};
	
	// SNI.EngageSweepsManager.status:
	// * Exposes the stateListener function
	// * Accepts a target state, function  
	// * Executes the function action when the target state is active
	SNI.EngageSweepsManager.stateListener = stateListener;

	// SNI.EngageSweepsManager.statusReport:
	// * Exposes the status function
	// * Accepts no arguments
	// * Returns status information about the current campaign and iframe state
	SNI.EngageSweepsManager.statusReport = statusReport;
	
	//-------------------------------------------------
	// End Public methods 
	//-------------------------------------------------
	
	// Attach Engage Sciences event handlers
	// "state" passed details via the payload. 
	// Other events that need to be tracked required need their own registrations
	NGX.Embed.registerEventHandler('state', stateUpdate);
	NGX.Embed.registerEventHandler('flow:after', stateUpdate);
	NGX.Embed.registerEventHandler('flow:prev', stateUpdate); 
	NGX.Embed.registerEventHandler('user:details', handleUserDetails);
	NGX.Embed.registerEventHandler('page:loaded:confirmation', handleUid);
	NGX.Embed.registerEventHandler('action:share:campaign:pinterest', logEvent);
	NGX.Embed.registerEventHandler('action:share:campaign:facebook', logEvent);
	NGX.Embed.registerEventHandler('action:share:campaign:twitter', logEvent);
	NGX.Embed.registerEventHandler('action:invite', logEvent);
	NGX.Embed.registerEventHandler('form:returninguser:unknownuser', function(eventName, payload){ 
										first_entry = true;
										stateUpdate(eventName, payload);
									}); // first_entry set flag for unknownuser and update state
  NGX.Embed.registerEventHandler('form:entry:alreadyentered', function(eventName, payload){ 
    							if (ratelimitUrl) {
    								document.location.href = ratelimitUrl;
    							}
    							}); // redirect for rate limitted-user  
	NGX.Embed.registerEventHandler('form:returninguser:remembered', function(){ first_entry = false; }); // first_entry flag cleared for remembered
	NGX.Embed.registerEventHandler('form:secondary:show', stateUpdate); // returning entry form state - usually just opt-ins
	NGX.Embed.registerEventHandler('campaign:id', handleSweepsId); // to get the SweepsID, they send payload.campaignId through this state

	// Listner for the DTM form abandonment tracking
	addIEFriendlyEventListener("message", window, function(event) {
		var evArray;
		if (typeof event.data === "string") {
			//record the last element
			if (event.data.match(/last_element/)) {
				evArray = event.data.split(":", 2);
				allow_abandon_track = true;
				lastElement = mdManager.getParameter('SweepsID') + "|" + evArray[1];
			}
			if ( event.data.match(/eVar66/) ) {
				// capture optimizely tests in var optlyTests 
				evArray = event.data.split("|",2);
				optlyTests = evArray[1];
			}
			//received a message to block the form abandonment event (triggered by a submit)
			if (event.data.match(/block_abandon/)) {
				allow_abandon_track = false;
				setTimeout(function() {
					// reset this flag (scenario: failed validation)
					if (page_state === "entry" || page_state === "after") {
						allow_abandon_track = true;
					}
				}, 2500);
			}
		}
	}, false);

	// Bind to beforeunload to track form abandonment
	if ( track_abandonment ) {
		$(window).bind('beforeunload', function(event) {
		// allow_abandon_track should be false if there was a submit
		if (track_abandonment && allow_abandon_track && !voting) {
			allow_abandon_track = false;
			s.linkTrackVars = "eVar50,eVar75,prop7,events";
			s.eVar75 = mdManager.getParameterString("SweepsID");
			s.linkTrackEvents = "event85";
			s.eVar50 = lastElement;
			s.events = "event85";
			s.tl(event, 'o', 'abandonned sweeps entry');
			delay(200); //give the analytics call time to go out
		}
		});
	}
	
	// extend s.sc_integrate_optly_test
	$(function(){
		var s = typeof s_gi === "function" && s_gi(s_account),
		super_integrate_optly;
		if ( typeof s === "object" ) {
			super_integrate_optly = s.sc_integrate_optly_tests;
			s.sc_integrate_optly_tests = function(e){
				super_integrate_optly(e);
				if ( optlyTests ) {
					if ( s["eVar" + e] ) {
						s["eVar" + e] += "," + optlyTests;
					} else {
						s["eVar" + e] += optlyTests;
					}
				}
			};
		}
	});

};

if ( typeof SNI.EngageSweepsManager.initConfig === "object" ) {
	SNI.EngageSweepsManager.init(SNI.EngageSweepsManager.initConfig);
}
