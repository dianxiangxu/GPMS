//-==========================================================================-
// Conversen SDK
//-==========================================================================-

//async initialization
window.setTimeout(function () {
                if (window.fbAsyncInit && window.fbAsyncInit.hasRun && window.cnvAsyncInit && !window.cnvAsyncInit.hasRun) {
                                window.cnvAsyncInit.hasRun = true;
                                window.cnvAsyncInit();
                } else if (!window.fbAsyncInit && window.cnvAsyncInit && !window.cnvAsyncInit.hasRun) {
                                window.cnvAsyncInit.hasRun = true;
                                window.cnvAsyncInit();
                }
}, 0);

window.Cnv = window.Cnv || {};
!function ($, JSON) {
                if ($ === undefined) {
                                // modified http://code.jquery.com/jquery-1.10.2.js
                                var rbracket = /\[\]$/, r20 = /%20/g;
                                function buildParams(prefix, obj, add) {
                                                var name;

                                                if (Object.prototype.toString.call(obj) === "[object Array]") {
                                                                // Serialize array item.
                                                                for (var i = 0, il = obj.length; i < il; i++) {
                                                                                if (rbracket.test(prefix)) {
                                                                                                // Treat each array item as a scalar.
                                                                                                add(prefix, obj[i]);

                                                                                } else {
                                                                                                // Item is non-scalar (array or object), encode its numeric index.
                                                                                                buildParams(prefix + "[" + (typeof obj[i] === "object" ? i : "") + "]", obj[i], add);
                                                                                }
                                                                }
                                                } else if (typeof obj === "object") {
                                                                // Serialize object item.
                                                                for (name in obj) {
                                                                                buildParams(prefix + "[" + name + "]", obj[name], add);
                                                                }

                                                } else {
                                                                // Serialize scalar item.
                                                                add(prefix, obj);
                                                }
                                }

                                $ = {
                                                param: function (a) {
                                                                var prefix,
                                                                                s = [],
                                                                                add = function (key, value) {
                                                                                                value = value == null ? "" : value;
                                                                                                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
                                                                                };

                                                                // If an array was passed in, assume that it is an array of form elements.
                                                                if (Object.prototype.toString.call(a) === "[object Array]") {
                                                                                // Serialize the form elements
                                                                                for (var i = 0, il = a.length; i < il; i++) {
                                                                                                add(a[i].name, a[i].value);
                                                                                }
                                                                } else {
                                                                                for (prefix in a) {
                                                                                                buildParams(prefix, a[prefix], add);
                                                                                }
                                                                }

                                                                // Return the resulting serialization
                                                                return s.join("&").replace(r20, "+");
                                                }
                                };
                }
                if (!JSON) {
                                JSON = {};
                                !function () {
                                                function f(n) {
                                                                return n < 10 ? "0" + n : n;
                                                }
                                                var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, rep;
                                                function quote(string) {
                                                                escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                                                                                var c = meta[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                                                                }) + '"' : '"' + string + '"';
                                                } function str(key, holder) {
                                                                var i, k, v, length, mind = gap, partial, value = holder[key];
                                                                if (value && typeof value === "object" && Object.prototype.toString.apply(value) === '[object Date]') {
                                                                                value = this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z";
                                                                } if (typeof rep === "function") {
                                                                                value = rep.call(holder, key, value);
                                                                } switch (typeof value) {
                                                                                case "string": return quote(value); case "number": return isFinite(value) ? String(value) : "null"; case "boolean": case "null": return String(value); case "object": if (!value) {
                                                                                                return "null";
                                                                                } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === "[object Array]") {
                                                                                                length = value.length; for (i = 0; i < length; i += 1) {
                                                                                                                partial[i] = str(i, value) || "null";
                                                                                                } v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]"; gap = mind; return v;
                                                                                } if (rep && typeof rep === "object") {
                                                                                                length = rep.length; for (i = 0; i < length; i += 1) {
                                                                                                                k = rep[i]; if (typeof k === "string") {
                                                                                                                                v = str(k, value); if (v) {
                                                                                                                                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                                                                                                                                }
                                                                                                                }
                                                                                                }
                                                                                } else {
                                                                                                for (k in value) {
                                                                                                                if (Object.hasOwnProperty.call(value, k)) {
                                                                                                                                v = str(k, value); if (v) {
                                                                                                                                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                                                                                                                                }
                                                                                                                }
                                                                                                }
                                                                                } v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}"; gap = mind; return v;
                                                                }
                                                }
                                                JSON.stringify = function (value, replacer, space) {
                                                                var i; gap = ""; indent = ""; if (typeof space === "number") {
                                                                                for (i = 0; i < space; i += 1) {
                                                                                                indent += " ";
                                                                                }
                                                                } else {
                                                                                if (typeof space === "string") {
                                                                                                indent = space;
                                                                                }
                                                                } rep = replacer; if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                                                                                throw new Error("JSON.stringify");
                                                                } return str("", { "": value });
                                                };

                                                JSON.parse = function (text, reviver) {
                                                                var j; function walk(holder, key) {
                                                                                var k, v, value = holder[key]; if (value && typeof value === "object") {
                                                                                                for (k in value) {
                                                                                                                if (Object.hasOwnProperty.call(value, k)) {
                                                                                                                                v = walk(value, k); if (v !== undefined) {
                                                                                                                                                value[k] = v;
                                                                                                                                } else {
                                                                                                                                                delete value[k];
                                                                                                                                }
                                                                                                                }
                                                                                                }
                                                                                } return reviver.call(holder, key, value);
                                                                } cx.lastIndex = 0; if (cx.test(text)) {
                                                                                text = text.replace(cx, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4); });
                                                                } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                                                                                j = eval("(" + text + ")"); return typeof reviver === "function" ? walk({ "": j }, "") : j;
                                                                } throw new SyntaxError("JSON.parse");
                                                };
                                }();
                }

                //Minified postmessage.js. See scripts folder for source
                var pm = {
                                poll: 200,
                                send: function (options) {
                                                var o = { target: null, url: null, type: null, data: null, success: null, error: null, origin: '*', hash: false };
                                                for (k in options) o[k] = options[k];
                                                var target = o.target;
                                                // postmessage target window required
                                                if (!o.target) return;
                                                // postmessage type required
                                                if (!o.type) return;
                                                var msg = { data: o.data, type: o.type }; if (o.success) { msg.callback = pm._callback(o.success); }
                                                if (o.error) { msg.errback = pm._callback(o.error); }
                                                if (("postMessage" in target) && !o.hash) { pm._bind(); target.postMessage(JSON.stringify(msg), o.origin || '*'); }
                                                else { pm.hash._bind(); pm.hash.send(o, msg); }
                                },
                                bind: function (type, fn, origin, hash) { pm._replyBind(type, fn, origin, hash, true); },
                                _replyBind: function (type, fn, origin, hash, isCallback) {
                                                if (("postMessage" in window) && !hash) { pm._bind(); }
                                                else { pm.hash._bind(); }
                                                var l = pm.data("listeners.postmessage"); if (!l) { l = {}; pm.data("listeners.postmessage", l); }
                                                var fns = l[type]; if (!fns) { fns = []; l[type] = fns; }
                                                fns.push({ fn: fn, callback: isCallback, origin: origin || '*' });
                                },
                                unbind: function (type, fn) {
                                                var l = pm.data("listeners.postmessage"); if (l) {
                                                                if (type) {
                                                                                if (fn) {
                                                                                                var fns = l[type]; if (fns) {
                                                                                                                var m = []; for (var i = 0, len = fns.length; i < len; i++) { var o = fns[i]; if (o.fn !== fn) { m.push(o); } }
                                                                                                                l[type] = m;
                                                                                                }
                                                                                }
                                                                                else { delete l[type]; }
                                                                }
                                                                else { for (var i in l) { delete l[i]; } }
                                                }
                                },
                                data: function (k, v) {
                                                if (v === undefined) { return pm._data[k]; }
                                                pm._data[k] = v; return v;
                                },
                                _data: {}, _CHARS: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''), _random: function () { var r = []; for (var i = 0; i < 32; i++) { r[i] = pm._CHARS[0 | Math.random() * 32]; }; return r.join(""); }, _callback: function (fn) {
                                                var cbs = pm.data("callbacks.postmessage"); if (!cbs) { cbs = {}; pm.data("callbacks.postmessage", cbs); }
                                                var r = pm._random(); cbs[r] = fn; return r;
                                },
                                _bind: function () {
                                                if (!pm.data("listening.postmessage")) {
                                                                if (window.addEventListener) { window.addEventListener("message", pm._dispatch, false); }
                                                                else if (window.attachEvent) { window.attachEvent("onmessage", pm._dispatch); }
                                                                pm.data("listening.postmessage", 1);
                                                }
                                },
                                _dispatch: function (e) {
                                                try {
                                                                if (e.origin.indexOf("fbcdn.net") != -1)
                                                                { return; }
                                                                var msg = JSON.parse(e.data);
                                                }
                                                catch (ex) { }
                                                if (!msg.type) return;
                                                var cbs = pm.data("callbacks.postmessage") || {}, cb = cbs[msg.type]; if (cb) { cb(msg.data); }
                                                else {
                                                                var l = pm.data("listeners.postmessage") || {}; var fns = l[msg.type] || []; for (var i = 0, len = fns.length; i < len; i++) {
                                                                                var o = fns[i]; if (o.origin && o.origin !== '*' && e.origin !== o.origin) {
                                                                                                if (msg.errback) {
                                                                                                                var error = {
                                                                                                                                message: "postmessage origin mismatch", origin: [e.origin, o.origin]
                                                                                                                };
                                                                                                                pm.send({ target: e.source, data: error, type: msg.errback });
                                                                                                }
                                                                                                continue;
                                                                                }
                                                                                function sendReply(data) { if (msg.callback) { pm.send({ target: e.source, data: data, type: msg.callback }); } }
                                                                                try { if (o.callback) { o.fn(msg.data, sendReply, e); } else { sendReply(o.fn(msg.data, e)); } }
                                                                                catch (ex) { if (msg.errback) { pm.send({ target: e.source, data: ex, type: msg.errback }); } else { throw ex; } }
                                                                };
                                                }
                                },
                                hash: {
                                                send: function (options, msg) {
                                                                var target_window = options.target, target_url = options.url;
                                                                if (!target_url) return;
                                                                target_url = pm.hash._url(target_url);
                                                                var source_window, source_url = pm.hash._url(window.location.href);
                                                                if (window == target_window.parent) source_window = "parent";
                                                                else {
                                                                                try { for (var i = 0, len = parent.frames.length; i < len; i++) { var f = parent.frames[i]; if (f == window) { source_window = i; break; } }; }
                                                                                catch (ex) { source_window = window.name; }
                                                                }
                                                                // postmessage windows must be direct parent/child windows and the child must be available through the parent window.frames list
                                                                if (source_window == null) return;
                                                                var hashmessage = { "x-requested-with": "postmessage", source: { name: source_window, url: source_url }, postmessage: msg }; var hash_id = "#x-postmessage-id=" + pm._random(); target_window.location = target_url + hash_id + encodeURIComponent(JSON.stringify(hashmessage));
                                                }, _regex: /^\#x\-postmessage\-id\=(\w{32})/, _regex_len: "#x-postmessage-id=".length + 32, _bind: function () { if (!pm.data("polling.postmessage")) { setInterval(function () { var hash = "" + window.location.hash, m = pm.hash._regex.exec(hash); if (m) { var id = m[1]; if (pm.hash._last !== id) { pm.hash._last = id; pm.hash._dispatch(hash.substring(pm.hash._regex_len)); } } }, $.pm.poll || 200); pm.data("polling.postmessage", 1); } }, _dispatch: function (hash) {
                                                                if (!hash) { return; }
                                                                try { hash = JSON.parse(decodeURIComponent(hash)); if (!(hash['x-requested-with'] === 'postmessage' && hash.source && hash.source.name != null && hash.source.url && hash.postmessage)) { return; } }
                                                                catch (ex) { return; }
                                                                var msg = hash.postmessage, cbs = pm.data("callbacks.postmessage") || {}, cb = cbs[msg.type]; if (cb) { cb(msg.data); }
                                                                else {
                                                                                var source_window; if (hash.source.name === "parent") { source_window = window.parent; }
                                                                                else { source_window = window.frames[hash.source.name]; }
                                                                                var l = pm.data("listeners.postmessage") || {}; var fns = l[msg.type] || []; for (var i = 0, len = fns.length; i < len; i++) {
                                                                                                var o = fns[i]; if (o.origin) {
                                                                                                                var origin = /https?\:\/\/[^\/]*/.exec(hash.source.url)[0]; if (o.origin !== '*' && origin !== o.origin) {
                                                                                                                                if (msg.errback) { var error = { message: "postmessage origin mismatch", origin: [origin, o.origin] }; pm.send({ target: source_window, data: error, type: msg.errback, hash: true, url: hash.source.url }); }
                                                                                                                                continue;
                                                                                                                }
                                                                                                }
                                                                                                function sendReply(data) { if (msg.callback) { pm.send({ target: source_window, data: data, type: msg.callback, hash: true, url: hash.source.url }); } }
                                                                                                try { if (o.callback) { o.fn(msg.data, sendReply); } else { sendReply(o.fn(msg.data)); } }
                                                                                                catch (ex) { if (msg.errback) { pm.send({ target: source_window, data: ex, type: msg.errback, hash: true, url: hash.source.url }); } else { throw ex; } }
                                                                                };
                                                                }
                                                }, _url: function (url) { return ("" + url).replace(/#.*$/, ""); }
                                }
                };

                //============= Private Properties =============//
                //cookie object used for loading and saving cookies
                var restLink, debug;
                var eventPageLoaded = false;
                var reservedParams = ["cr", "cn", "ct", "mg", "et", "pk", "tp", "sn", "ap", "ak_guid"];
                var renderContentSuccessCallbacks = []; //used to manage callback functions for rendering content via cross domain
                var renderContentErrorCallbacks = []; //used to manage callback functions for rendering content via cross domain
                var preLoadEventQueue = [];
                var protocol = document.location.protocol;
                var cookie = {
                                data: {},

                                load: function (name) {
                                                var theCookie = document.cookie.split(";");
                                                var foundCookie = false;
                                                for (var i = 0; i < theCookie.length; i++) {
                                                                var cookieName = theCookie[i].substr(0, theCookie[i].indexOf("="));
                                                                var cookieValue = theCookie[i].substr(theCookie[i].indexOf("=") + 1);
                                                                cookieName = cookieName.replace(' ', '');
                                                                cookieValue = cookieValue.replace(' ', '');
                                                                if (cookieName === name)
                                                                {
                                                                                data = QueryStringToJSON(cookieValue);
                                                                                foundCookie = true;
                                                                }
                                                }
                                                return foundCookie ? data : false;
                                },

                                save: function (name, expires, path) {
                                                var defaultExpire = new Date();
                                                defaultExpire.setDate(defaultExpire.getDate() + 3650);
                                                var exp = (expires === undefined) ? defaultExpire : expires;
                                                var p = path || '/';
                                                var cookieData = decodeURIComponent($.param(this.data));
                                                var baseUrl = getSecondLevelDomain(window.location.host);
                                                document.cookie = name + '=' + cookieData + ';path=' + p + ';expires=' + exp.toGMTString() + ';domain=.' + baseUrl;
                                }
                };

                //============= Public Properties =============//


                //============= Public Methods =============//
                //submit null object if no params
                Cnv.PostWebEvent = function (params, webEventId, callback) {
                                var postdata = {};
                                postdata.pm = params;
                                postdata.rp = cookie.data;
                                postdata.rp.we = webEventId;
                                postToConversen(postdata, 'wts/WebEvent', callback);
                };

                Cnv.RenderContent = function (s) {
                                //defaults
                                s.data = s.data || null;
                                s.success = s.success || function () { };
                                s.error = s.error || function () { };

                                if (!eventPageLoaded) {
                                                preLoadEventQueue.push(s);
                                                return;
                                }

                                var requestGuid = guidGenerator(); //guid to identify request
                                s.data.GuidId = requestGuid;
                                s.data.CustId = cookie.data.cr;
                                //asynchronysouly sends content to event listener on conversen servers. Required for cross domain content rendering
                                pm.send({
                                                target: window.frames["cnvIframe"],
                                                type: "SdkEventListener", //target listener
                                                data: s.data,
                                                error: function (errorData) {
                                                                s.error("error communicating with cnv, please try again or contact support");
                                                },
                                                success: function (successData) {
                                                                renderContentSuccessCallbacks[requestGuid] = s.success; //set success callback with unique guid
                                                                renderContentErrorCallbacks[requestGuid] = s.error; //set error callback with unique guid
                                                }
                                });
                };
                Cnv.Log = function (response, module) {
                                if (debug === true) {
                                                var logDiv = document.getElementById('cnv-log');
                                                var str = logDiv.text();
                                                str = str + response.toString();
                                                logDiv.html(str);
                                }
                                var logObj = {};
                                logObj.Log = response;
                                url = (module === undefined) ? 'sts/Log' : (module + '/Log');
                                postToConversen(logObj, url, null);
                };
                Cnv.init = function (cust) {
                                try {
                                                restLink = protocol + "//" + cust.restLink + '/';
                                                conversenInit(restLink, cust);
                                                if (cust.success)
                                                                cust.success();
                                }
                                catch (err) {
                                                cust.error(err);
                                }
                }; //============= Private Methods =============//
                var previousCookie, cookieDomain = '';
                function conversenInit(restLink, cust) {
                                var date = new Date();
                                var expires = new Date(date.getTime() + 604800000); //number of ms in 7 days                                
                                var cookieName = 'xyz_cr_' + cust.custId + '_et_' + cust.entityId;
                                var apiKey = null;

                                if (typeof (window.FB) != "undefined")
                                                apiKey = window.FB._apiKey;

                                cookieDomain = cust.cookieDomain;

                                previousCookie = cookie.load(cookieName);
                                updateCnvCookie(previousCookie);
                                cookie.data.cr = (cust.custId === undefined) ? cookie.data.cr : cust.custId;
                                cookie.data.et = (cust.entityId === undefined) ? cookie.data.et : cust.entityId;
                                cookie.data.ap = apiKey;
                                cookie.save(cookieName, expires, '/');

                                debug = cust.debug;
                                var params = cust.params;

                                var enableSocialEvents = (cust.enableSocialEvents === undefined) ? true : cust.enableSocialEvents
                                if (enableSocialEvents) {
                                                var iframe = document.createElement('iframe')
                                                iframe.name = 'cnvIframe';
                                                iframe.id = 'cnvIframe';
                                                iframe.src = restLink + 'sts/SocialEvent/Event';
                                                iframe.style = 'display:none;';
                                                document.body.appendChild(iframe);

                                                //binding cross domain event listener for web content rendering
                                                pm.bind("CnvEventListener", function (response) {
                                                                if (response.errorData) {
                                                                                var errorCallback = renderContentErrorCallbacks[response.GuidId]; //callback   
                                                                                if (errorCallback)
                                                                                                errorCallback(response.errorData);
                                                                } else if (response.successData) {
                                                                                var successCallback = renderContentSuccessCallbacks[response.GuidId]; //callback                                                                                
                                                                                successCallback(response.successData);
                                                                }
                                                                renderContentSuccessCallbacks[response.GuidId] = null;
                                                                renderContentErrorCallbacks[response.GuidId] = null;
                                                });

                                                pm.bind("FinishedLoading", function (response) {
                                                                if (response) {
                                                                                eventPageLoaded = response;
                                                                                for (var i = 0, il = preLoadEventQueue; i < il; i++) {
                                                                                                var event = preLoadEventQueue[i];
                                                                                                Cnv.RenderContent(event);
                                                                                }
                                                                                preLoadEventQueue = null;
                                                                }
                                                });
                                }
                                if ((cust.enableFacebook)) {
                                                if (!isNaN(cookie.data.ap) && !isNaN(cookie.data.cr) && !isNaN(cookie.data.et)) {
                                                                window.FB.Event.subscribe('auth.login', conversenAuthLogin);
                                                                window.FB.Event.subscribe('auth.logout', conversenAuthLogout);
                                                                window.FB.Event.subscribe('edge.create', conversenEdgeCreate);
                                                                window.FB.Event.subscribe('comment.create', conversenCommentCreate);
                                                                window.FB.Event.subscribe('message.send', conversenMessageSend);
                                                                window.FB.Event.subscribe('fb.log', Cnv.Log);
                                                                //FB.Event.subscribe('comment.remove', conversenCommentRemove);
                                                                //FB.Event.subscribe('edge.remove', conversenEdgeRemove);
                                                                //FB.Event.subscribe('auth.sessionChange', conversenAuthSessionChange);
                                                                //FB.Event.subscribe('auth.statusChange', conversenAuthStatusChange);
                                                } else {
                                                                Cnv.Log("Failed to initialize Conversen.FB.init", "sts");
                                                }
                                }
                }

                function conversenAuthLogin(response) {
                                var postdata = {};
                                postdata.au = response;
                                postdata.rp = cookie.data;
                                postJsonToConversen(postdata, 'sts/AuthLogin', null);

                                window.FB.api('/me', function (responseOne) {
                                                window.FB.api('/me/likes', function (responseTwo) {
                                                                var profilePostData = {}, profile = {};
                                                                profile.me = responseOne;
                                                                profile.likes = responseTwo;
                                                                profilePostData.pf = profile;
                                                                profilePostData.rp = cookie.data;

                                                                var profileCookieName = 'sts-profile-' + profile.me.id;
                                                                if (cookie.load(profileCookieName) == false) {
                                                                                cookie.data = { postedProfile: 'true' };
                                                                                cookie.save(profileCookieName);
                                                                                postJsonToConversen(profilePostData, 'sts/Profile', null);
                                                                }
                                                                cookie.data = profilePostData.rp;
                                                });
                                });
                }

                function conversenMessageSend(response) {
                                var postdata = {};
                                postdata.rp = cookie.data;
                                postdata.href = response;
                                postJsonToConversen(postdata, 'sts/MessageSend', null);
                } //not used
                function conversenEdgeCreate(response) {
                                var postdata = {};
                                postdata.rp = cookie.data;
                                postdata.href = response;
                                postJsonToConversen(postdata, 'sts/EdgeCreate', null);
                } //not used

                //uses FQL instead of Graph API
                function conversenCommentCreate(response) {
                                var commentId = response.commentID;
                                var href = response.href;
                                var fbidQuery = window.FB.Data.query('SELECT comments_fbid FROM link_stat WHERE url=\"{0}\"', response.href);
                                fbidQuery.wait(function (fbidData) {
                                                var commentQuery = window.FB.Data.query('SELECT xid,object_id,post_id,fromid,time,text,id,username,reply_xid,post_fbid,likes,user_likes FROM comment WHERE object_id={0} AND post_fbid={1}', fbidData[0].comments_fbid, commentId);
                                                commentQuery.wait(function (commentData) {
                                                                var postdata = {};
                                                                postdata.cc = commentData[0];
                                                                postdata.cc.href = href;
                                                                postdata.rp = cookie.data;
                                                                postJsonToConversen(postdata, 'sts/CommentCreate', null);
                                                                var query = '/' + commentData[0].fromid;
                                                                window.FB.api(query, function (responseOne) {
                                                                                var profilePostData = {}, profile = {};
                                                                                profile.me = responseOne;
                                                                                profilePostData.pf = profile;
                                                                                profilePostData.rp = cookie.data;
                                                                                postJsonToConversen(profilePostData, 'sts/Profile', null);
                                                                });
                                                }, function (error) {
                                                                Cnv.Log(error);
                                                });
                                }, function (error) {
                                                Cnv.Log(error);
                                });
                }

                //function conversenAuthLogout(response) { } //not used
                //function conversenAuthSessionChange(response) { } //not used
                //function conversenAuthStatusChange(response) { } //not used
                //function conversenEdgeRemove(response) { } //not used
                //function conversenCommentRemove(response) { } //not used

                function postToConversen(data, action, callback) {
                                //print debug info
                                if (debug === true) {
                                                document.getElementById('cnv-log').innerHTML += '<br />' + qsData;
                                }

                                //flatten to querystring and shorten some common object words
                                var qsData = decodeURIComponent($.param(data));

                                //compose url string and generate message GUID
                                var uriHost = restLink + action + '/image.gif?';
                                var guid = guidGenerator();

                                //split if message longer than 1900 chars
                                if ((uriHost.length + qsData.length) >= 1900) {
                                                splitPostRequest(uriHost, action, qsData, guid);
                                } else {
                                                uriHost = uriHost + 'isSplit=false&guid=' + guid + '&segmentNumber=1&';
                                                imagePost(uriHost, qsData);
                                }
                }

                function postJsonToConversen(postdata, action, callback) {
                                postdata.mt = action; //add message type to post Json Object
                                pm.send({
                                                target: window.frames["cnvIframe"],
                                                type: "CnvEvent",
                                                data: postdata,
                                                error: function (data) {
                                                                // postJsonToConversen error! Attempting image post
                                                                postToConversen(postdata, action, callback);
                                                }
                                });
                }
                //adds img element to DOM from conversen domain that had a querystring of parameters to be sent
                function imagePost(host, data) {
                                var img = document.createElement('img');
                                img.style.display = 'none';
                                img.src = host + data;
                                document.body.appendChild(img);
                                document.body.removeChild(img);
                }

                //splits image post requests up into requests that are less than 2000 characters
                function splitPostRequest(host, action, largeData, guid) {
                                var hostLength = host.length;
                                var splitIndex, splitString;
                                var dataString = [];
                                var x = 1;

                                //loop to split message into segments
                                while ((hostLength + largeData.length) > 1900) {
                                                splitIndex = largeData.lastIndexOf('&', 1600);
                                                splitString = largeData.substring(0, splitIndex);
                                                largeData = largeData.substring(splitIndex + 1);
                                                dataString.push('isSplit=true&guid=' + guid + '&segmentNumber=' + x + '&' + splitString + '&');
                                                x++;
                                }
                                dataString.push('isSplit=true&guid=' + guid + '&segmentNumber=' + x + '&' + largeData + '&');

                                //header message to indicate a split
                                var header = 'guid=' + guid + '&numberOfSegments=' + x;
                                var headerHost = restLink + action + '/header.gif?';
                                imagePost(headerHost, header);

                                //post split messages
                                while (dataString.length > 0) {
                                                imagePost(host, dataString.pop());
                                }
                }

                //javascript to generate a valid GUID that C# can parse
                function guidGenerator() {
                                var S4 = function () {
                                                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                                };
                                return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
                }

                //parameters have been found, update cookie.
                function updateCnvCookie(previousCookie) {
                                var urlParams = fetchCnvParams();
                                if (urlParams !== false) {
                                                if (urlParams['tp'] === undefined) {
                                                                cookie.data = urlParams;
                                                }
                                                else {
                                                                cookie.data = {};
                                                                cookie.data['tp'] = urlParams['tp'];
                                                }
                                }
                                else {
                                                cookie.data = previousCookie; // == false ? previousCookie : {};
                                }
                }

                //parses conversen params from the querystring
                function fetchCnvParams() {
                                var tempParams = {};
                                var returnParams = {};
                                var foundParams = false;

                                var e,
                                a = /\+/g,  // Regex for replacing addition symbol with a space
                                r = /([^&=]+)=?([^&]*)/g,
                                d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
                                q = window.location.search.substring(1);

                                while (e = r.exec(q)) {
                                                tempParams[d(e[1])] = d(e[2]);
                                }

                                //discards any params not in the reserved list
                                for (var i = 0; i < reservedParams.length; i++) {
                                                var x = reservedParams[i];
                                                if (!(tempParams[x] === undefined)) {
                                                                returnParams[x] = tempParams[x];
                                                                foundParams = true;
                                                }
                                }
                                return foundParams ? returnParams : false;
                }

                function loadScript(url, callback) {
                                var head = document.getElementsByTagName("head")[0];
                                var script = document.createElement("script");
                                script.src = url;

                                // Attach handlers for all browsers
                                var done = false;
                                script.onload = script.onreadystatechange = function () {
                                                if (!done && (!this.readyState
                                                                                                                                                                || this.readyState === "loaded"
                                                                                                                                                                || this.readyState === "complete")) {
                                                                done = true;

                                                                // Continue your code
                                                                callback();

                                                                // Handle memory leak in IE
                                                                script.onload = script.onreadystatechange = null;
                                                                head.removeChild(script);
                                                }
                                };
                                head.appendChild(script);
                }

                function QueryStringToJSON(href) {
                                var qStr = href.replace(/(.*?\?)/, '');
                                var qArr = qStr.split('&');
                                stack = {};				
                                for (var i = 0, il = qArr.length; i < il; i++) {
                                                var a = qArr[i].split('=');
                                                var name = a[0],
                                                value = isNaN(a[1]) ? a[1] : parseFloat(a[1]);
						if (name.length < 1) continue;
                                                if (name.match(/(.*?)\[(.*?)]/)) {
                                                                name = RegExp.$1;
                                                                var name2 = RegExp.$2;
                                                    //alert(RegExp.$2)
                                                                if (!(name === "tp" && isNaN(value)))
                                                                {
                                                                    if (name2)
                                                                    {
                                                                        if (!(name in stack))
                                                                        {
                                                                            stack[name] = {};
                                                                        }
                                                                        stack[name][name2] = value;
                                                                    } else
                                                                    {
                                                                        if (!(name in stack))
                                                                        {
                                                                            stack[name] = [];
                                                                        }
                                                                        stack[name].push(value);
                                                                    }
                                                                }
                                                }
                                                else {
                                                                stack[name] = value;
                                                }
                                }
                                return stack;
                }

                function getSecondLevelDomain(host) {
                                if (cookieDomain) return cookieDomain;
                                var domainParts = host.split('.');
                                var dl = domainParts.length;
                                var coOffset = 0;
                                if (
                                                domainParts[dl - 1].length === 2 && (
                                                                domainParts[dl - 2] === 'co' ||
                                                                domainParts[dl - 2] === 'com'
                                                )
                                ) coOffset++;
                                return domainParts.slice(dl - coOffset - 2, dl).join('.');
                }
}(window.jQuery, window.JSON);
