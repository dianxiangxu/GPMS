/****************************************************************
 * Offerpop Insights API Lib V1.0
 *
 * Required Libs:
 * - jQuery
 * - FB JavaScript SDK
 *
 * Example Usage:
 * 
 * // Initialize the lib. Note, FB and jQuery must be defined.
 * OP.Insights.init({
 *     app_id: FACEBOOK_APP_ID,
 *     page_id: FACEBOOK_PAGE_ID,
 *     campaign_id: OFFERPOP_CAMPAIGN_ID,
 * });
 * 
 * OP.Insights.updateProfile();
 *
 * Note: To call API functions (except OP.Insights.init()) during
 *       the page loading time, put them into the callback of
 *       FB.getLoginStatus();
 ***************************************************************/

if (typeof OP === "undefined") {
    var OP = {};
}
OP.Insights = {};

OP.Insights = (function(){

    var API_BASE_URL = "https://offerpop.com/api/v1",
        initialized = false,
        m_options = {
            app_id: null,
            page_id: null,
            user_id: null,
            campaign_id: null
        },
        requiredFacebookPermissions = [
            'user_birthday',
            'user_location',
            'email'
        ];

    /*************** private functions *************/
    function apiPostData(endpoint_url, post_data) {
        /* endpoint_url: url where the data will be posted to
           post_data: json-encoded data to be posted to the url */

        jQuery.ajax({
            url: endpoint_url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(post_data),
            dataType: "json",
            success: function (response) {
            },
            error: function (response) {
            }
        });
    }

    function getFacebookUserId() {
        /* Return user's Facebook id if connected, null otherwise. */

        if (initialized) {
            if (m_options.user_id) {
                return m_options.user_id;
            } else {
                authResponse = FB.getAuthResponse();
                m_options.user_id = authResponse ? authResponse.userID : null;
                return m_options.user_id;
            }
        } else {
            return null;
        }
    }

    /*************** public functions **************/
    function init(options) {
        /* Initialize the lib. Fields of options:

             app_id: facebook app id
             page_id: facebook Page id
             campaign_id: Offerpop campaign id */

        if (typeof FB === 'undefined') {
            throw "Facebook JavaScript SDK is not loaded";
        } else if (typeof jQuery === 'undefined') {
            throw "jQuery library is not loaded";
        } else {
            jQuery.extend(true, m_options, options);
            if (m_options.app_id && m_options.page_id && m_options.campaign_id) {
                if (options.opt_fb_perms) {
                    jQuery.merge(requiredFacebookPermissions, options.opt_fb_perms);
                }
                initialized = true;
            } else {
                throw "Not enough arguments";
            }
        }
    }

    function hasEnoughPermission(success_cb, failure_cb) {
        /* Execute the callback function if permission requirement is met */
        if (initialized) {
            FB.api('/me?fields=id,name,link,picture,first_name,last_name,gender,birthday,email,location,permissions', function (me_response) {
                var grantedPermissions = me_response.permissions.data;
                var permissions = [];
                for (permission in grantedPermissions) {
                    if (grantedPermissions[permission].status == 'granted') {
                        permissions.push(grantedPermissions[permission].permission); 
                    }
                }

                if (requiredFacebookPermissions.every(function(element) {return jQuery.inArray(element, permissions) > 0;})) {
                    if (success_cb) success_cb(me_response);
                } else {
                    if (failure_cb) failure_cb(me_response);
                }
            });
        } else {
            if (failure_cb) failure_cb();
        }
    }

    function saveUserProfile(force) {
        /* Save current user's profile into Fan DB. 
           force: true -> skip permission requirement checking, useful when
                          you're sure it is aleady met. Default: false. */

        if (initialized) {
            
            // facebook user must be connected to our app and has granted enough permissions
            authResponse = FB.getAuthResponse();
            if (authResponse) {
                var permission_data = {
                        "access_token": authResponse.accessToken,
                        "signed_request": authResponse.signedRequest,
                        "facebook_user_id": authResponse.userID,
                        "facebook_app_id": m_options.app_id,
                        "facebook_page_id": m_options.page_id,
                        "campaign_id": m_options.campaign_id
                    };
                var endpoint_url = API_BASE_URL + "/profilecollection/";
                if (force === true) {
                    apiPostData(endpoint_url, permission_data);
                } else {
                    hasEnoughPermission(function () {
                        apiPostData(endpoint_url, permission_data);
                    });
                }
            }
        }
    }

    return {
        'init': init,
        'requiredFacebookPermissions': requiredFacebookPermissions,
        'hasEnoughPermission': hasEnoughPermission,
        'saveUserProfile': saveUserProfile
    };

}());
