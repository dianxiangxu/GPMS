Object.clone = function (parent, properties) {
    var key, obj;

    // Clone the object.
    function F() {}
    F.prototype = parent;
    obj = new F();

    // Add any instance properties.
    for (key in properties) {
        if (properties.hasOwnProperty(key)) {
            obj[key] = properties[key];
        }
    }

    // Call the init method if there is one.
    if (typeof obj.init === 'function') {
        obj.init.apply(obj);
    }

    return obj;
};

Object.makeEnum = function (/* fields */) {
    var e = {};
    for (var i = 0; i < arguments.length; i++) {
        var field = arguments[i];
        e[field] = field;
    }
    return e;
};

// -----------------------------------------------------------------------------

/**
 * @fileoverview Offerpop User Actions API
 *
 * This file provides Offerpop's User Actions API. It can be included in both
 * the old stack and the new stack. In the old stack it needs to be included
 * via a <code>script</code> tag, after the requirements -- jQuery and
 * Postal.js -- have been included. In the new stack, you can use RequireJS and
 * this module's requirements will be handled for you.
 *
 * <b>Client Usage</b>
 *
 * The client needs to provide a callback function that will be called whenever
 * a hook is triggered. This is done by setting the global <code>HOOKS</code>
 * variable, like this:
 *
 * @example
 * var HOOKS = {
 *     all: function (data) {
 *         // Process the data here...
 *     }
 * };
 */
(function (root, makeLib) {

    var hookLib,
        config = root.OP.Config;

    if (typeof define === "function" && define.amd) {
        define(['jquery', 'postal'], function ($, postal) {
            hookLib = makeLib(config, $, postal);
            return hookLib;
        });
    }
    else {
        hookLib = makeLib(config, root.jQuery, root.postal);
        root.OP.Hooks = hookLib;
    }

    if (typeof root.HOOKS === "object" && root.HOOKS.all) {
        hookLib.subscribe(root.HOOKS.all);
    }

})(this, function (config, $, postal) {

    // Hooks -------------------------------------------------------------------

    var hooksChannel = postal.channel('hooks');

    var commonParameters = {};
    setCommonParameters(config);

    function setCommonParameters(newCommonParameters) {
        commonParameters = {
            campaignID: newCommonParameters.couponID,
            pageID: newCommonParameters.pageID,
            campaignType: newCommonParameters.campaignType,
            isMobile: newCommonParameters.isMobile,
            sessionID: newCommonParameters.sessionID
        };
    }

    function publish(topicString, dataDict) {
        var mergedData = $.extend({},
            commonParameters,
            {event: topicString},
            dataDict
        );
        hooksChannel.publish(topicString, mergedData);
    }

    function subscribe(callback) {
        hooksChannel.subscribe('#', callback);
    }

    var hookFunctions = {
        action: {
            code: {
                get: function (codeType) {
                    publish('action.code.get', {type: codeType});
                }
            },
            comment: function (commentedOnURL) {
                publish('action.comment', {url: commentedOnURL});
            },
            like: function (likedURL) {
                publish('action.like', {url: likedURL});
            },
            optin: function (name) {
                publish('action.optin', {type: name});
            },
            share: {
                email: function (sharedURL) {
                    publish('action.share.email', {url: sharedURL});
                },
                facebook: function (sharedURL, type) {
                    publish(
                        'action.share.facebook',
                        {url: sharedURL, type: type}
                    );
                },
                twitter: function (sharedURL) {
                    publish('action.share.twitter', {url: sharedURL});
                }
            },
            submit: {
                incomplete: function () {
                    publish('action.submit.incomplete');
                },
                successful: function (formType, opt_booleans) {
                    var parameters = {type: formType};
                    if ($.isPlainObject(opt_booleans)) {
                        parameters = $.extend({}, opt_booleans, parameters);
                    }
                    publish('action.submit.successful', parameters);
                }
            },
            vote: function (entryURL) {
                publish('action.vote', {url: entryURL});
            }
        },
        conversion: {
            fan: function () {
                publish('conversion.fan');
            }
        },
        view: function (type) {
            publish('view', {type: type});
        }
    };

    // Injections --------------------------------------------------------------

    var Injections = {};

    function triggerInjection(injectionName /*, params... */) {
        if (typeof Injections[injectionName] === 'function') {
            var fn = Injections[injectionName],
                params = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, params);
        }
    }

    // Debugging ---------------------------------------------------------------

    var logError = function () {};

    if (config.isDebugOn) {
        logError = function (message, opt_data) {
            var req, data;
            data = $.extend({}, opt_data, {message: message});
            req = $.ajax({
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                type: 'POST',
                url: '/api/v1/useractions/error/'
            });
        };

        var logDebugEvent = function (eventData) {
            var req = $.ajax({
                contentType: 'application/json',
                data: JSON.stringify(eventData),
                dataType: 'json',
                type: 'POST',
                url: '/api/v1/useractions/event/'
            });
        };
        subscribe(logDebugEvent);
    }

    // Persistent Storage ------------------------------------------------------

    var CookiePersistentStorage = {

        // Override this when cloning if you want to use a custom prefix.
        keyPrefix: '',

        // Public API ----------------------------------------------------------

        setItem: function (keyString, value) {
            var valueString = JSON.stringify(value),
                scopedKey = this.getScopedKey(keyString);
            document.cookie = (
                scopedKey + '=' + valueString + this.defaultSettings
            );
        },

        getItem: function (keyString) {
            var scopedKey = this.getScopedKey(keyString),
                cookie = this.getCookie(scopedKey);
            if (!cookie.exists) {
                return null;
            }
            else {
                return JSON.parse(cookie.value);
            }
        },

        removeItem: function (keyString) {
            var scopedKey = this.getScopedKey(keyString);
            document.cookie = (
                scopedKey + '=0' + this.defaultSettings + ';max-age=0'
            );
        },

        // Private -------------------------------------------------------------

        Cookie: {
            exists: true,
            key:    '',
            value:  null
        },

        defaultSettings: ';domain=.offerpop.com;path=/',

        getScopedKey: function (keyString) {
            return this.keyPrefix + keyString;
        },

        getCookie: function (keyString) {
            var _       = window._,
                proto   = this.Cookie,
                cookies = null,
                result  = null;

            cookies = _.map(document.cookie.split('; '), function (pair) {
                var parts = pair.split('=');
                return Object.clone(proto, {
                    key:   parts[0],
                    value: parts[1]
                });
            });
            result = _.find(cookies, function (cookie) {
                return cookie.key === keyString;
            });
            return result ? result : Object.clone(proto, {exists: false});
        }

    };

    var PersistentStorage = {

        // Override this when cloning if you want to use a custom prefix.
        keyPrefix: '',

        setItem: function (keyString, value) {
            var valueString = JSON.stringify(value),
                scopedKey = this.getScopedKey(keyString);
            return this.withStorage(function (storage) {
                return storage.setItem(scopedKey, valueString);
            });
        },

        getItem: function (keyString) {
            var scopedKey = this.getScopedKey(keyString);
            return this.withStorage(function (storage) {
                var item = storage.getItem(scopedKey);
                if (item) {
                    item = JSON.parse(item);
                }
                return item;
            });
        },

        removeItem: function (keyString) {
            var scopedKey = this.getScopedKey(keyString);
            this.withStorage(function (storage) {
                storage.removeItem(scopedKey);
            });
        },

        getKeys: function () {
            var self = this;
            return this.withStorage(function (storage) {
                var key, keys = [];
                for (var i = 0; i < storage.length; i++) {
                    key = storage.key(i);
                    if (self.isScopedKey(key)) {
                        keys.push(self.getUnscopedKey(key));
                    }
                }
                return keys;
            });
        },

        getItems: function () {
            var keys = this.getKeys(),
                items = {};
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                items[key] = this.getItem(key);
            }
            return items;
        },

        // Private -------------------------------------------------------------

        withStorage: function (callback) {
            var retval, message;
            try {
                retval = callback(window.sessionStorage);
            }
            catch (ex) {
                if (ex && ex.message) {
                    message = ex.message;
                }
                logError(message);
            }
            return retval;
        },

        getScopedKey: function (keyString) {
            return this.keyPrefix + keyString;
        },

        getUnscopedKey: function (scopedKeyString) {
            return scopedKeyString.substr(this.keyPrefix.length);
        },

        isScopedKey: function (keyString) {
            return keyString.indexOf(this.keyPrefix) === 0;
        }
    };

    // FB Library Loading ------------------------------------------------------

    var fbDeferred = $.Deferred();

    var onFBReady = function () {
        fbDeferred.resolve(window.FB);
    };

    var getFBLib = function () {
        return fbDeferred.promise();
    };

    // AppHooksManager ---------------------------------------------------------

    var AppHooksManager = {
        hooks: hookFunctions,
        $: typeof window.jQuery !== 'undefined' ? window.jQuery : window.$,
        _: window._,
        config: config,

        storage: Object.clone(CookiePersistentStorage, {
            keyPrefix: 'UA-' + config.couponID + '-'
        }),

        // Main ----------------------------------------------------------------

        run: function () {
            var currentPage = this.getCurrentPage();

            this.setupForPage(currentPage);
            this.setupFacebookEventSubscriptions();

            this.triggerPageViewEvent(currentPage);
            this.checkForFanConversion(currentPage);
            this.triggerAppSpecificEvents(currentPage);
        },

        // Instance Responsibilities -------------------------------------------

        isNonFanPage: function (page) {
            throw Error('Instance responsibility');
        },

        // Setup ---------------------------------------------------------------

        getCurrentPage: function () {
            var self = this,
                mapping = null;
            if (this.config.isMobile) {
                this.checkForRequiredVariable('mobilePageMapping');
                mapping = self.mobilePageMapping;
            } else {
                this.checkForRequiredVariable('pageMapping');
                mapping = self.pageMapping;
            }
            return self._.find(mapping, function (page, selector) {
                return self.elementExists(selector);
            });
        },

        getPageName: function (page) {
            this.checkForRequiredVariable('pageNames');
            return this.pageNames[page];
        },

        setupForPage: function (currentPage) {
            this.checkForRequiredVariable('pageSetupActions');
            this.processActions(currentPage, this.pageSetupActions);
        },

        triggerAppSpecificEvents: function (currentPage) {
            this.checkForRequiredVariable('pageActions');
            this.processActions(currentPage, this.pageActions);
        },

        checkForRequiredVariable: function (variableName) {
            if (typeof(this[variableName]) === 'undefined') {
                throw Error('Instance must set ' + variableName);
            }
        },

        processActions: function (currentPage, pageActions) {
            var self = this;
            this._.chain(pageActions).
                filter(function (each) {
                    return each.page === currentPage;
                }).
                each(function (each) {
                    self._.each(each.actions, function (fn) {
                        self.$.proxy(fn, self)();
                    });
                });
        },

        // Setup Helpers -------------------------------------------------------

        setupForSignUpForm: function () {
            var self = this,
                $submitButton = $('#form_submit_button, #form-submit-button'),
                $emailField = $('#email');

            $submitButton.bind('click', function (event) {
                self.storage.setItem('submitted', true);
                self.storage.setItem('submittedEmail', $emailField.val());

                var checkedOptInIds = self.storage.getItem('checkedOptInIds') || [];
                self.getOptInCheckboxes().each(function () {
                    var checkbox = this;
                    if (checkbox.checked) {
                        checkedOptInIds.push(checkbox.id);
                    }
                    else {
                        checkedOptInIds = self._(checkedOptInIds).without(checkbox.id);
                    }
                });
                self.storage.setItem('checkedOptInIds', self._.uniq(checkedOptInIds));
            });
        },

        setupForSharing: function (shareUrl, shareLinkIdTemplate) {
            var self       = this,
                $          = self.$,
                hooks      = this.hooks.action.share,
                shareTypes = ['facebook', 'twitter', 'email'],
                template   = self._.template(shareLinkIdTemplate);

            self._.each(shareTypes, function (shareType) {
                var selector = template({shareType: shareType}),
                    hookFn   = hooks[shareType];
                $(selector).bind('click', function (event) {
                    $.proxy(hookFn, self)(shareUrl);
                });
            });
        },

        // Action Helpers ------------------------------------------------------

        checkForInvalidSubmission: function () {
            var invalidClasses = '.Invalid, .invalid',
                haveInvalidFields = this.elementExists(invalidClasses);
            if (this.hasSubmitted() && haveInvalidFields) {
                this.hooks.action.submit.incomplete();
                this.clearSubmissionAttempt();
            }
        },

        checkForValidSubmission: function () {
            if (this.hasSubmitted()) {
                var bools = $.extend(
                    {},
                    {hasEmail: this.hasSubmittedEmail()},
                    this.getAppSubmissionBooleans()
                );

                this.hooks.action.submit.successful('entry', bools);
                this.triggerOptIns();

                this.clearSubmissionAttempt();
                this.clearSubmittedEmail();
                this.performAppSubmissionCleanup();
            }
        },

        // This should be overridden by child instances if there are any
        // app-specific submission booleans.
        getAppSubmissionBooleans: function () { return {}; },

        // This should be overridden by child instances if there is any
        // app-specific submission cleanup (like deleting persistent storage
        // variables).
        performAppSubmissionCleanup: function () {},

        triggerOptIns: function () {
            var self = this,
                checkedOptInIds = self.storage.getItem('checkedOptInIds');
            try {
                self._.each(checkedOptInIds, function (id) {
                    self.hooks.action.optin(id);
                });
                self.storage.removeItem('checkedOptInIds');
            }
            catch (e) {
                // This exception is intentionally ignored.
            }
        },

        // Helpers -------------------------------------------------------------

        getSuperFn: function (fnName) {
            var parent = OP.Hooks.AppHooksManager,
                superFn = parent[fnName];
            return this.$.proxy(superFn, this);
        },

        isNonEmptyString: function (obj) {
            return typeof(obj) === 'string' && obj.length > 0;
        },

        addInjection: function (injectionName, fn) {
            Injections[injectionName] = fn;
        },

        elementExists: function (jQuerySelector) {
            return this.$(jQuerySelector).length > 0;
        },

        getOptInCheckboxes: function () {
            return this.$('input[type=checkbox]').filter(function () {
                return this.id.indexOf('optin') !== -1;
            });
        },

        hasSubmitted: function () {
            return this.storage.getItem('submitted') === true;
        },

        clearSubmissionAttempt: function () {
            this.storage.removeItem('submitted');
        },

        getSubmittedEmail: function () {
            return this.storage.getItem('submittedEmail');
        },

        hasSubmittedEmail: function () {
            return this.isNonEmptyString(this.getSubmittedEmail());
        },

        clearSubmittedEmail: function () {
            this.storage.removeItem('submittedEmail');
        },

        // Facebook Event Hooks Setup ------------------------------------------

        setupFacebookEventSubscriptions: function () {
            var self = this;
            getFBLib().
                then(function (FB) {
                    self.addFacebookEventSubscriptions(FB, [
                        {
                            name: 'comment.create',
                            callback: function (commentData) {
                                self.hooks.action.comment(commentData.href);
                            }
                        },
                        {
                            name: 'edge.create',
                            callback: function (likedURL) {
                                self.hooks.action.like(likedURL);
                            }
                        },
                        {
                            name: 'message.send',
                            callback: function (sharedURL) {
                                self.hooks.action.share.facebook(sharedURL, 'Send Message');
                            }
                        }
                    ]);
                });
        },

        addFacebookEventSubscriptions: function (FB, subscriptions) {
            this._.each(subscriptions, function (each) {
                FB.Event.subscribe(each.name, each.callback);
            });
        },

        // Actions -------------------------------------------------------------

        triggerPageViewEvent: function (page) {
            this.hooks.view(this.getPageName(page));
        },

        checkForFanConversion: function (currentPage) {
            if (this.config.isMobile) {
                this.checkForMobileFanConversion(currentPage);
            }
            else {
                this.checkForDesktopFanConversion(currentPage);
            }
        },

        checkForDesktopFanConversion: function (currentPage) {
            if (this.isNonFanPage(currentPage)) {
                this.storage.setItem('nonfanview', true);
            }
            else {
                if (this.storage.getItem('nonfanview') && !this.storage.getItem('fanview')) {
                    this.hooks.conversion.fan();
                }
                this.storage.setItem('fanview', true);
            }
        },

        setupNonFanInjection: function () {
            var self = this;
            self.addInjection('onNonFanView', function () {
                self.storage.setItem('nonfanview', true);
            });
        },

        checkForMobileFanConversion: function (currentPage) {
            // For mobile fan conversion, the 'nonfanview' storage object is
            // set via an injection. That has to be done because the non-fan
            // page is always shown, to check if they are a fan of the page.

            if (!this.isNonFanPage(currentPage)) {
                if (this.storage.getItem('nonfanview') && !this.storage.getItem('fanview')) {
                    this.hooks.conversion.fan();
                }
                this.storage.setItem('fanview', true);
            }
        }
    };

    // Public interface --------------------------------------------------------

    return {
        AppHooksManager: AppHooksManager,
        ActiveManager: null,  // Replaced with current app's manager

        Injections: Injections,
        triggerInjection: triggerInjection,
        subscribe: subscribe,
        onFBReady: onFBReady,

        // Need to be exposed for the test page.
        hooks: hookFunctions,
        setCommonParameters: setCommonParameters
    };

});
