'use strict';

angular.module( 'brandSite.utils' )

.factory( 'BrandSiteUtil', [ function() {

    var util = {};

    // check input is a javascript string or not
    util.isString = function( input ) {
        return typeof input === 'string' || input instanceof String;
    };
    
    util.getParams = function() {
    	var obj = {};
    	angular.forEach(window.location.search.replace('?', '').split('&'), function(pair){
    		var entry = pair.split('=');
    		if(entry && entry.length > 1) {
    			obj[entry[0]] = entry[1];
    		}
    	});
    	return obj;
    };

    return util;

}]);