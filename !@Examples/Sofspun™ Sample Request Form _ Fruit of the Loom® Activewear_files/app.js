'use strict';

angular.module(
	'BrandSite',
	[
		// modules
		
		'ngResource',
		'ui.bootstrap',
		
		// components

		'brandSite.factories',
		'brandSite.services',
		'brandSite.controllers',
		'brandSite.directives',
		'brandSite.utils'

	]
)

.constant(

	'params', {
		host : '',
		ws : '/BrandSiteWebService/ws/v1',
		sellerType : 'WHOLESALER',
		storeGuid : '7',
		maxMarkerNum : 40,
		distance : 50000,
		locateProductPath : '/product-locator.shtml?',
		zoomLevels : 5,
		initialZoomLevel : 2,
		minZoomLevel : 2,
		scalePerZoomLevel : 2,
		categoryProductJsonPath: '/resources/json/categoryProducts.json',
		mapSearchCountries : [ 'USA', 'Canada']
	}
)

.constant(
	
	// 'salesforceParams', {
	// 	url : 'https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8',
	// 	oid : '00DM0000001dcLC',
	// 	site : '00NC0000005Fh8d',
	// 	requestDate : '00NC0000005Gkk7',
	// 	numberOfCatalogs : '00NC0000005GkkC',
	// 	numberOfSwatchCards : '00NC0000005GkkH',
	// 	campaignId : '701M0000000GLRw',
	//	canadaOptIn : '00NM0000001Iegv'
	// }

	'salesforceParams', {
		url : 'https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8',
		oid : '00DC00000016kTb',
		site : '00NC0000005Fh8d',
		requestDate : '00NC0000005Gkk7',
		numberOfCatalogs : '00NC0000005GkkC',
		numberOfSwatchCards : '00NC0000005GkkH',
		campaignId : '701C0000000j3VL',
		canadaOptIn : '00NC0000005o6RV'		
	}
)

.constant(
		'FUSIONTABLESAPI', {
			url : 'http://www.google.com/fusiontables/gvizdata?tq=',
			queryStart : 'SELECT name_1 FROM 420419 WHERE iso = \'',
			queryEnd : '\' AND name_1 NOT EQUAL TO \'\' ORDER by name_1'
		}
)

.run([ '$rootScope', '$window', '$sce', 'BrandSiteUtil', 'salesforceParams', function( $rootScope, $window, $sce, BrandSiteUtil, salesforceParams ) {

    // go back to the previous page
    $rootScope.back = function() {
		$window.history.back();
    };
    
    $rootScope.productSearchTerm = BrandSiteUtil.getParams().searchTerm ? BrandSiteUtil.getParams().searchTerm: '';

    // setting the salesforce params 
    $rootScope.salesLeadParams = salesforceParams;

    // must mark url as trusted so that it can be used on the html page
    $rootScope.salesLeadParams.url = $sce.trustAsResourceUrl( $rootScope.salesLeadParams.url );

    // set current date

	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var year = d.getFullYear();
	$rootScope.currentDate = month + '/' + day + '/' + year;
    
}]);

angular.module( 'brandSite.controllers', [] );
angular.module( 'brandSite.factories', [] );
angular.module( 'brandSite.services', [] );
angular.module( 'brandSite.directives', [] );
angular.module( 'brandSite.utils', [] );