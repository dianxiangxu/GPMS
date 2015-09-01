// Trigger rule at DOM Ready
// Non-Sequential Javascript
// execute globally
var moduleTrack = function (obj,ModuleName,LinkTitle,LinkPosition,LocUrl,TargetURL,EventType) {
	var contextVars = ["ModuleName","LinkTitle","LinkPosition","LocUrl","TargetURL","EventType"];
	s.linkTrackVars = 'contextData.' + contextVars.join(",contextData.");
	s.linkTrackEvents = "";
	s.contextData['ModuleName'] = ModuleName;
	s.contextData['LinkTitle'] = LinkTitle;
	s.contextData['LinkPosition'] = LinkPosition;
	s.contextData['LocUrl'] = LocUrl;
	s.contextData['TargetURL'] = TargetURL;
	s.contextData['EventType'] = EventType;
	s.tl(obj,'o',ModuleName);
	while ( contextVars.length > 0 ) {
		s.contextData[contextVars.pop()] = "";
	}
}
