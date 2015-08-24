
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function () {
	log.history = log.history || [];   // store logs to an array for reference
	log.history.push(arguments);
	if (this.console) {
		arguments.callee = arguments.callee.caller;
		var newarr = [].slice.call(arguments);
		(typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
	}
};

// make it safe to use console.log always
(function (b) { function c() { } for (var d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","), a; a = d.pop(); ) { b[a] = b[a] || c } })((function () {
	try
{ console.log(); return window.console; } catch (err) { return window.console = {}; }
})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

/*
Title:		Async Content Loader PlugIn

Options

preloaderClassName :        Preloadeer class name
contentContainerObject :    DOM object that will contain and show ajax indicator and will dim the interface
callBackOnSuccess :		    Callback that will be invoked to update the interface on success
*/

(function ($) {

	$.fn.asyncContentLoader = function (options) {

		// Default plugin settings
		var defaults = {
			preloaderClassName: 'asyncContentPreloader',
			contentContainerObject: null,
		    selectedItemCssClass: 'selected',
			callBackOnSuccess: null
		};

		// Merge default global variables with custom variables, modifying 'defaults'
		if (options) $.extend(true, defaults, options);

		// Make sure container is defined
		if (defaults.contentContainerObject == null) return;

		// Make sure 'pushState' property is supported
		if (!('pushState' in history)) return;

		defaults.contentContainerObject.css({ 'position': 'relative' });
		var preloader = [];
		var isFirstPushState = true;

		this.each(function (i) {
		    var timestamp = new Date().getTime();
			var linkUrl = $(this).attr('href') + "?_=" + timestamp;

			$(this).click(function (e) {
				e.preventDefault();

				//If preloader exists, some ajax request is already in progress
				if (preloader.length > 0) return;

			    //If this is selected link
				if ($(this).hasClass(defaults.selectedItemCssClass)) return;

				processHrefAsync(linkUrl);
			});			
		});

		function processHrefAsync(asyncLink) {
		    $.ajax({
		        type: 'GET',
		        url: asyncLink,
		        cache: false,
		        beforeSend: togglePreloader(),
		        success: function (d) {
		            togglePreloader();
		            OnSuccess(d);

		            if (defaults.callBackOnSuccess != null) {
		                defaults.callBackOnSuccess(d);
		            }
		        },
		        error: function (msg) {
		            togglePreloader();
		            common.logJsException("Error in asyncContentLoader plugin." + msg);
		        }
		    });
		};

		function togglePreloader() {
		    if (preloader.length == 0) {
		        preloader = $('<div />').addClass(defaults.preloaderClassName).appendTo(defaults.contentContainerObject);
		    } else {
		        preloader.remove();
		        preloader = [];
		    }
		};

		function OnSuccess(jsonData) {		    
		    var oldTitle = window.document.title;
		    var oldUrl = window.location.pathname;

		    //Update page title
		    window.document.title = jsonData.PageTitle;

		    //Update page content
		    defaults.contentContainerObject.html(jsonData.Html);

		    //Update page url
		    var state = {
		        url: jsonData.Url
		    }

		    //Add one extra first push for smooth first browser back
		    if (isFirstPushState) {
		        window.history.replaceState($.extend({}, state, { url: oldUrl }), oldTitle)
		        isFirstPushState = false;
		    }
		    window.history.pushState(state, jsonData.PageTitle, jsonData.Url)
		}

		return this;
	};

    // Used to detect initial (useless) popstate.
    // If history.state exists, assume browser isn't going to fire initial popstate.
	var popped = ('state' in window.history), initialURL = location.href;

	$(window).bind('popstate', function (event) {
		// Ignore inital popstate that some browsers fire on page load			    		   
		var initialPop = !popped && location.href == initialURL
		popped = true
		if (initialPop) return

		var state = event.state;

		if (state) {
		    $("a[href='" + state.url + "']").click();
		}
	});

	// Add the state property to jQuery's event object so we can use it in
	// $(window).bind('popstate')
	if ($.inArray('state', $.event.props) < 0) {
	    $.event.props.push('state');
	}

})(jQuery);

/*
Remote email validation for existing user
*/
(function ($, undefined) {
	$.fn.igUniqueEmail = function (message) {
		$this = this;
		if (message === undefined){
			message = "Email already exists in the system.";
		}
		$this.rules('add',
				{
					required: true,
					email: true,
					remote: {
						type: 'GET',
						url: '/my-account/is-email-available',
						data: {
							email: function () { return $this.val(); },
							ticks: function() { return new Date().getTime(); }
						}
					},
					messages: {
						remote: message
					}
				}
			);
	}
})(jQuery);