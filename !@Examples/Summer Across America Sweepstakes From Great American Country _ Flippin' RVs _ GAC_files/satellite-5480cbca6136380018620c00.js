_satellite.pushAsyncScript(function(event, target, $variables){
  (function ($) {  
	var doPost = function(tests) {
    parent.postMessage("eVar66|" + tests,"*");
    if ( ( document.location.href.indexOf("5e5ee19f-7459-4233-92d6-2cdfb5759994") !== -1 || document.location.href.indexOf("a80b3133-de93-4166-b543-d6668791e1f1") !== -1 ) && typeof NGX === "object" && typeof NGX.App === "object" &&  typeof NGX.App.api === "object" && typeof NGX.App.api.setTestID === "function" ) {
    	// report value to EngageScience to pass to data mart
      NGX.App.api.setTestID(tests);
  	}
  };
	//attach listeners on document.ready			
	$(function(){
		if ( typeof window.optimizely != "undefined" ) {
		var allTests = window.optimizely.allExperiments,
			charCount = 0, // Used to make sure we stay in the 255 character limit
			variationMap = window.optimizely.variationMap,
            variationMapActive = []; // Leave behind only tests that are still active
         
        for (var testId in variationMap) {
                var mapImage = [],
                    mapImageString = "",
                    mapPair = "",
                    testDefined = false,
                    testEnabled = false;
                 
                testDefined = allTests.hasOwnProperty(testId);
                testEnabled = testDefined && allTests[testId].hasOwnProperty("enabled");
             
                if (testEnabled) {
                    if ("object" == typeof variationMap[testId]) {
                        mapImage = variationMap[testId];
                    } else {
                        mapImage.push(variationMap[testId]);
                    }
                 
                    mapImageString = mapImage.join("_");
                    mapPair = testId + ":" + mapImageString;
                 
                    if ((charCount + mapPair.length) <= 255) {
                        charCount += mapPair.length;
                        variationMapActive.push(mapPair);
                    }
                }
            }          
        doPost(variationMapActive.join());
		}
	});
})(jQuery);	
});
