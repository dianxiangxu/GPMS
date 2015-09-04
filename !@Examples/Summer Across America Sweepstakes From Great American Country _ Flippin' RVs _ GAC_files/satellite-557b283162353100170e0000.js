window.SNI = window.SNI || {};
SNI.Analytics = SNI.Analytics || {};
SNI.Analytics.moduleTrackLS = function (obj,options) {
	var contextVars,i;
	if ( !options.TargetUrl ) {
		options.TargetUrl = "on page interaction";
	}
	if ( !options.LocUrl ) {
		options.LocUrl = document.location.href;
	}
	if ( options.TargetUrl !== "on page interaction" && options.TargetUrl !== options.LocUrl  && options.TargetUrl.indexOf(document.location.hostname) !== -1 ){
		try {
			localStorage.setItem("TRACKMOD",JSON.stringify(options));
		} 
		catch(e) {
			//console.log("couldn't write localStorage");
		}	
  } else {
		contextVars = Object.keys(options).sort();
		s.linkTrackVars = "";
		s.linkTrackEvents = "event24";
        if ( options.Events && options.Events.length > 0 ) {
			s.linkTrackEvents += "," + options.Events.join(",");
		}
		i = contextVars.length || 0;
		while (i--) {
			s.linkTrackVars += 'contextData.' + contextVars[i] + ',';
			s.contextData[contextVars[i]] = options[contextVars[i]].toString().replace("|","").replace(/https?:\/\/(.*).food.com/,"$1...");
		}
		s.linkTrackVars = s.linkTrackVars.substring(0, s.linkTrackVars.length - 1);
		s.events=s.apl(s.events,"event24",",",2);
		s.tl(obj,'o',options.ModuleName);
		// clear everything out
		while ( contextVars.length > 0 ) {
			s.contextData[contextVars.pop()] = "";
		}
		s.linkTrackVars = "";
		s.linkTrackEvents = "";
		s.events = "";
	}
};

SNI.Analytics.optlyEvent = function (events,opts) {
  // events: comma-seperated list of events to include
  // opts.trackvars: comma-seperated list of props and evars to include
  // opts.linktitle: value for custom links report
  if ( !events || typeof events !== "string" ) {
		return false;
  }
  opts = opts || {
      trackvars: "prop5,prop6,prop7,prop8,prop9,prop10,prop11,prop12,prop13",	
      linktitle: "optimizely test link"
    };
  if ( typeof opts === "object" ) {
		opts.trackvars = typeof opts.trackvars === "string" && opts.trackvars ? opts.trackvars + ",events" : "prop5,prop6,prop7,prop8,prop9,prop10,prop11,prop12,prop13,events";  
		opts.linktitle = typeof opts.linktitle === "string" && opts.linktitle ? opts.linktitle : "optimizely test link";  
  } 
  s.linkTrackEvents = events;
	s.linkTrackVars = opts.trackvars;
	s.events = events;
	s.tl(this, 'o', opts.linktitle);  
  return true;
};

// write an arbitrary set of analytics data to a 
// localStorage record call TRACKLSANALYTICS
if ( typeof localStorage === "object" ) {
	SNI.Analytics.trackViaLS = function(opts) {
		var lsval = JSON.stringify(opts),
  			retval;
  		try {
				localStorage.setItem("TRACKLSANALYTICS",lsval);
      	retval = true;
			} 
			catch(e) {
				//console.log("couldn't write localStorage");
      	retval = false;
			}	
		return retval;  
	};
} 
