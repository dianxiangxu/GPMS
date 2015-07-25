var FACEBOOK = (function () {
	var settings = {appId : '', locale: 'en_US', channelUrl: '', version: 'v1.0'};
	var user = {};
	var loaded = false;
	var declinedPermissions = [];
	
	function init() { 
		FB.init({
		  appId  : settings.appId,
		  status : true,
		  cookie : true,
		  xfbml  : true,
		  channelUrl: settings.channelUrl,
		  version: settings.version
		});
		loaded = true;
		clearTimeout(loadTimer);
		$(document).trigger('facebook.loaded');
		tabInit();
		refreshUser();
	};
	
	function load(config) {
		settings = $.extend(settings,config);
		loadTimer = setTimeout('loadTimeout()', 2000);
		window.fbAsyncInit = function() { init(); };
		(function() {
			var e = document.createElement('script');
			e.src = document.location.protocol + '//connect.facebook.net/' + settings.locale + '/sdk.js';
			e.async = true;
			document.getElementById('fb-root').appendChild(e);
		}());
	};
		
	function loadTimeout() {
		$('body.tab').css("overflow", "auto" );	
	};
	
	function tabInit() {
		$('body.tab').css("overflow", "hidden" )
		var curHeight = $('html').height();
		FB.Canvas.setSize({height: curHeight});
		setTimeout(function(){
			FB.Canvas.setAutoGrow();
		},500);
		FB.Canvas.scrollTo(0,0);
	};

	function isLoaded() {
		return loaded;
	}

	function refreshUser() {
		FB.getLoginStatus(function(response) {
			user.authResponse = response.authResponse;
			user.status = response.status;
			if (response.authResponse) {
				loadedMe = new $.Deferred();
				loadedPermissions = new $.Deferred();
				FB.api('/me', function (response) {
					user.me = response;
					loadedMe.resolve();
				});
				FB.api('/me/permissions', function (response) {
					user.permission = response.data[0];
					loadedPermissions.resolve();
				});
				$.when(loadedMe, loadedPermissions).done(function () {
					$(document).trigger('FACEBOOK.loadedUser');
				});				
			}
		});
	};
	
	function login_v1 (scope) {
		var deferred = new $.Deferred(),
			missingPermissions = [],
			permissions = [];
		
		scope = scope || '';
		if (scope)
			permissions = scope.split(',');
		FB.login(function (response) {
			user.authResponse = response.authResponse;
			user.status = response.status;
			if (response.authResponse) {
				if (response.authResponse.grantedScopes) {
					for (var i = 0; i < permissions.length; i++) {
						if (response.authResponse.grantedScopes.indexOf(permissions[i]) < 0)
							missingPermissions.push(permissions[i]);
					}
					
					if (missingPermissions.length)
						deferred.reject(response, missingPermissions);
					else
						deferred.resolve(response, permissions);
				} else {
					checkPermissions_v1(permissions).then(
						function () {
							deferred.resolve(response, permissions);
						},
						function (missingPermissions) {
							deferred.reject(response, missingPermissions);
						}
					);
				}
			} else
				deferred.reject(response, permissions);
				
		}, {scope: scope, return_scopes: true});
		
		return deferred.promise();
	}
	
	function login_v2 (scope, rerequested) {
		var deferredRerequest = new $.Deferred(),
			deferred = new $.Deferred(),
			missingPermissions = [],
			permissions = [],
			originallyGivenPermissions = [],
			loginOptions = {
				return_scopes: true
			};
		
		scope = scope || '';
		if (scope)
			permissions = scope.split(',');
		
		loginOptions['scope'] = scope;
		
		if (rerequested)
			loginOptions['auth_type'] = 'rerequest';
		
		FB.login(function (response) {
			user.authResponse = response.authResponse;
			user.status = response.status;				
			if (response.authResponse) {
				if (!rerequested) {
					checkPermissions_v2(permissions).then(
						function () {
							deferred.resolve(response);
						},
						function (missingPermissions, givenPermissions) {
							
							if (declinedPermissions.length) { // Delay deferred resolve pending the user wanting to auth again. Then trigger the re-request
								if (window.confirm("You have declined some permissions. Without them you will be unable to proceed. Are you sure? (Press OK to try again)")) {
									originallyGivenPermissions = givenPermissions;
									deferredRerequest.resolve();
									return;
								}
							}
							
							deferredRerequest.reject();
							
							if (missingPermissions.length)
								deferred.reject(response, missingPermissions);
							else
								deferred.resolve(response, givenPermissions);
						}
					);
				} else { //if already re-requested then the specific status doesn't matter, only the scope string is necessary
					for (var i = 0; i < permissions.length; i++) {
						if (response.authResponse.grantedScopes.indexOf(permissions[i]) < 0)
							missingPermissions.push(permissions[i]);
					}
					
					if (missingPermissions.length)
						deferred.reject(response, missingPermissions);
					else
						deferred.resolve(response, originallyGivenPermissions);
				}
			} else
				deferred.reject(response, permissions);
				
		}, loginOptions);
		
		// this is triggered when re-request is chosen. The login function is run again and the return is atrributed to the original promise
		deferredRerequest.then(function () {
			login_v2(scope, true).then(
				function (response, givenPermissions) {
					deferred.resolve(response, givenPermissions);
				},
				function (response, missingPermissions) {
					deferred.reject(response, missingPermissions);
				}
			);
		});
		
		return deferred.promise();
	}
	
	function login (scope) {
		switch (settings.version) {
			case 'v1.0':
				return login_v1(scope);
				break;
			default:
				return login_v2(scope, declinedPermissions.length);
				break;
		}
	}
	
	function checkPermissions_v1 (permissions) {
		var deferred = new $.Deferred(),
			givenPermissions = {},
			missingPermissions = [];
		
		if (permissions.length) {
			FB.api('/me/permissions', function (response) {
				givenPermissions = response.data[0];
				for (var index in permissions) {
					if (permissions[index] == 'publish_actions')
						continue;
					if (!givenPermissions.hasOwnProperty(permissions[index])) 
						missingPermissions.push(permissions[index]);
				}
				
				if (missingPermissions.length)
					deferred.reject(missingPermissions, givenPermissions);
				else
					deferred.resolve(givenPermissions);
			});
			return deferred.promise();
		}
		return $.when(true);
	}
	
	function checkPermissions_v2 (permissions) {
		var deferred = new $.Deferred(),
			givenPermissions = [],
			missingPermissions = [];
		
		declinedPermissions = [];
		
		if (permissions.length) {
			FB.api('/me/permissions', function (response) {
				givenPermissions = response.data;
				permissionCheckLoop: for (var i = 0; i < permissions.length; i++) {
					if (permissions[i] == 'publish_actions')
						continue;
					for (var j = 0; j < givenPermissions.length; j++) {
						if (givenPermissions[j].permission == permissions[i]) {
							switch (givenPermissions[j].status) {
								case 'granted':
									continue permissionCheckLoop;
								default:
									declinedPermissions.push(permissions[i]);
								
							}
						}
					}
					
					missingPermissions.push(permissions[i]);
				}
				
				if (missingPermissions.length)
					deferred.reject(missingPermissions, givenPermissions);
				else
					deferred.resolve(givenPermissions);
			});
			
			return deferred.promise();
		}
		return $.when(true);
	}
	
	function checkPermissions (permissions) {
		if (permissions) {
			if (typeof permissions == 'string')
				permissions = permissions.split(',');
			switch (settings.version) {
				case 'v1.0':
					return checkPermissions_v1(permissions);
					break;
				default:
					return checkPermissions_v2(permissions);
					break;
			}
		}
		return $.when(true);
	}
		
	function signedRequest() {
		if (typeof user.authResponse !== 'undefined')
			return user.authResponse.signedRequest;
		else
			return false;
	}
	
	return {
		user: user,
		isLoaded: isLoaded,
		load: load,
		login: login,
		refreshUser: refreshUser,
		signedRequest: signedRequest,
		checkPermissions: checkPermissions
	};

}());
