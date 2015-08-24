"use strict";

angular.module( "brandSite.controllers" )


.controller( "CatalogRequestController", [ '$scope', 'FUSIONTABLESAPI', 
										function( $scope, fusionTablesAPI ) {

	/*
	 * Init
	 */

	$scope.initForm = function() {

		$scope.lead = {
				
			country : 'United States'

		};

		$scope.showValidationMessage = false;

		// get states for default country

		$scope.changeCountry();		

	}
	
	
	/*
	 * Functions
	 */
	
	$scope.changeCountry = function() {
		
		if( $scope.lead.country == "Canada" ) {
			 
			$scope.getStatesByCountryCode("CAN");

		}
		
		else{
			
			 $scope.getStatesByCountryCode("USA");
			
		}
		
		$scope.stateRequiredMessage = true;

	};

	$scope.changeState = function() {

	 	if( angular.isUndefined( $scope.lead.state ) || !$scope.lead.state.value ){

			$scope.stateRequiredMessage = true;
			
		}
		else{

			$scope.stateRequiredMessage = false;

		}
		
	};

	$scope.getStatesByCountryCode = function( countryCode ) {
		
		var queryText = fusionTablesAPI.queryStart + countryCode + fusionTablesAPI.queryEnd;
		var query = new google.visualization.Query( fusionTablesAPI.url + encodeURIComponent(queryText) );
		
		query.send(function( response ) {

			if ( !response || response.isError() ) {
				MessageService.showMessage('Failed to get states data. Error in query:' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
			}
			
			var numRows = response.getDataTable().getNumberOfRows();
			var numCols = response.getDataTable().getNumberOfColumns();
			var states = [];
			
			for(var i = 0; i < numRows; i++) {
				for(var j = 0; j < numCols; j++) {
					states.push({"name": response.getDataTable().getValue(i,j), 
						"value": response.getDataTable().getValue(i,j)});
				}
			}
			
			$scope.statesList = states;
			
			$scope.$apply();
			
		});		
		
	};

	$scope.onSubmit = function(form, event){

		if ( !form.$valid || $scope.stateRequiredMessage ){
			
			$scope.showValidationMessage = true;
			
			event.preventDefault();
			
		}

	};

	$scope.resetForm = function() {
		
		$scope.initForm();
		
		if( $scope.catalogRequest ) {
			$scope.catalogRequest.$setPristine();
		}
		else if ( $scope.sofspunSampleRequest ) {
			$scope.sofspunSampleRequest.$setPristine();
		}
		
		
	};


}]);