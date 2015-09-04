window['BOX_SERVER_HOST'] = 'http://myphotos.hgtv.com';
window['BOX_SERVER_S_API'] = 'http://dje7rr2pnbe7f.cloudfront.net/public/s/';window.SNI = window.SNI || { };
window.SNI.BOX = window.SNI.BOX || { };

window.SNI.BOX.DEBUG = (function() {

    var writeSafely = function() {

        if(typeof console !== 'undefined') {
            if(/msie/i.exec(navigator.userAgent) !== null) {
                var output = "";
                var i;
                for(i = 0; i < arguments.length; i+= 1) {
                    if(output.length > 0) {
                        output += ", ";
                    }
                    if(typeof arguments[i] === 'function') {
                        output += "[function]";
                    } else if(typeof arguments[i] === 'object' && typeof JSON === 'object' && typeof JSON.stringify === 'function') {
                        output += JSON.stringify(arguments[i]);
                    } else {
                        output += arguments[i].toString();
                    }
                }
                console.log(output);
            } else {
                try {
                    console.log.apply(null, arguments);
                } catch(e) {
                    console.log(arguments);
                }
            }
        }
    };

    var isDebugEnabled = false;

    var isDebugEnabledFor = { };

    var tree = { };

    var debugObject = function() {

        var scope = typeof this === 'string' ? this : (this instanceof String ? this.toString() : null);

        if(debugObject.isEnabled(scope)) {

            var args = Array.prototype.slice.call(arguments, 0);
            if(scope) {
                args.unshift('[' + scope + ']');
            }
            writeSafely.apply(null, args);
        }
    };

    debugObject.enable = function(scope) {

        if(typeof scope === 'string') {
            isDebugEnabledFor[scope] = true;
        } else {
            isDebugEnabled = true;
        }
    };

    debugObject.disable = function(scope) {

        if(typeof scope === 'string') {
            isDebugEnabledFor[scope] = false;
        } else {
            isDebugEnabled = false;
        }
    };

    debugObject.isEnabled = function(scope) {

        if(typeof scope === 'string' && scope !== null) {

            var circularRefs = (arguments.length > 0 && Array.isArray(arguments[1])) ? arguments[1] : [ ];
            if(circularRefs.indexOf(scope) !== -1) {
                return false;
            }
            circularRefs.push(scope);
            var parentScope = tree[scope];
            return isDebugEnabledFor[scope] !== false && (isDebugEnabledFor[scope] === true || debugObject.isEnabled(parentScope, circularRefs));
        } else {
            return isDebugEnabled || window.location.hash.indexOf("_debugMrb") !== -1;
        }
    };

    debugObject.forScope = function(scope, parentScope) {

        if(parentScope && !tree[parentScope]) {
            tree[parentScope] = null; // root node
        }

        if(scope) {
            tree[scope] = parentScope || null;
        }

        return (function(scope) {

            return function() {
                debugObject.apply(scope, arguments);
            }
        })(scope);
    };

    return debugObject;
})();
/*! MediaClass.js v0.0.1 | MIT License | github.com/jonathantneal/MediaClass */

    var EXECUTION = SNI.BOX.DEBUG.forScope("EXECUTION");

(function (global, documentElement) {
  function resetMediaFeatures() {
    if(global.resetTimer) clearTimeout(global.resetTimer);
    global.resetTimer = setTimeout(getMediaFeatures, 100);
  }

	function getMediaFeatures() {
        var start = new Date();
		media.width = global.innerWidth || documentElement.clientWidth;
		media.height = global.innerHeight || documentElement.clientHeight;
		media.aspectRatio = media.width / media.height;
		media.orientation = media.width > media.height ? "landscape" : "portrait";

		media.deviceWidth = screen.width;
		media.deviceHeight = screen.height;
		media.deviceAspectRatio = media.deviceWidth / media.deviceHeight;
		media.deviceOrientation = media.deviceWidth > media.deviceHeight ? "landscape" : "portrait";
    mediaLoop();

        EXECUTION("getMediaFeatures took: " + ((new Date()) - start) + " ms");
	}

	function getElementMediaFeatures(element) {
		var coordinates = element.getBoundingClientRect();

		media.thisWidth = coordinates.width || coordinates.right - coordinates.left;
		media.thisHeight = coordinates.height || coordinates.bottom - coordinates.top;
		media.thisAspectRatio = media.thisWidth / media.thisHeight,
		media.thisOrientation = media.thisWidth > media.thisHeight ? "landscape" : "portrait";
	}

	function evalMediaQuery(query) {
		return Function("d", "return(" + query
		.replace(/\(|\)/g, "")
		.replace(/\s*,\s*/g, ") || (")
		.replace(/\s+and\s+/gi, " && ")
		.replace(/min-(.*?):/gi, "$1>=")
		.replace(/max-(.*?):/gi, "$1<=")
		.replace(/above-(.*?):/gi, "$1>")
		.replace(/below-(.*?):/gi, "$1<")
		.replace(/min-|max-/gi, "")
		.replace(/(all|screen|print)/, "d.$1")
		.replace(/:/g, "==")
		.replace(/([\w-]+)\s*([<>=]+)\s*(\w+)/g, function ($0, $1, $2, $3) {
			return "d." + toCamelCase($1) + $2 + parseCSSNumber($3);
		})
		.replace(/([<>=]+)([A-z][\w-]*)/g, '$1"$2"') + ")")(media);
	}

	function toCamelCase(value) {
		return value.toLowerCase().replace(/-[a-z]/g, function ($0) {
			return $0[1].toUpperCase();
		});
	}

	function parseCSSNumber(value) {
		return value.replace(/([\d\.]+)(%|em|in|pt|px)/, function ($0, $1, $2) {
			return ($2 == "em") ? $1 * 16 : ($2 == "in") ? $1 * 96 : ($2 == "pt") ? $1 * 96 / 72 : ($2 == "%") ? $1 / (scope.innerWidth || documentElement.clientWidth) : $1;
		});
	}

	var
	media = { all: true, screen: true, print: false },
	eventMethod = ("addEventListener" in global ? "addEventListener " : "attachEvent on").split(" "),
	eventType = "blur orientationchange click".split(" "),
	throttledEventType = "resize scroll".split(" "),
	eventIndex = 0;

	for (; eventType[eventIndex]; ++eventIndex) {
		global[eventMethod[0]](eventMethod[1] + eventType[eventIndex], getMediaFeatures);
	}
	
	for (eventIndex = 0; throttledEventType[eventIndex]; ++eventIndex) {
		global[eventMethod[0]](eventMethod[1] + throttledEventType[eventIndex], resetMediaFeatures);
	}

	var
	LastIndexOf = Array.prototype.lastIndexOf || function (value) { for (var length = this.length; --length > -1;) if (this[length] == value) break; return length; },
	addClass = function (element, className) {
		var classList = element.className ? element.className.split(/\s+/) : [], index = LastIndexOf.call(classList, className);
		if (index < 0) element.className = classList.concat(className).join(" ");
	},
	removeClass = function (element, className) {
		var classList = element.className ? element.className.split(/\s+/) : [], index = LastIndexOf.call(classList, className);
		if (index > -1 && classList.splice(index, 1)) element.className = classList.join(" ");
	},
	mediaList = [];

	function mediaLoop() {
		for (var i = 0, item, match, element; item = mediaList[i]; ++i) {
			match = item.media.match(/(.+?):media\((.+?)\)/);

			if (match) {
				if (documentElement.querySelectorAll) {
					all = documentElement.querySelectorAll(match[1]);

					for (var index = 0; element = all[index]; ++index) {
						/this/.test(match[2]) && getElementMediaFeatures(element);

						if(element.clientWidth > 0) {
							evalMediaQuery(match[2]) ? addClass(element, item.className) : removeClass(element, item.className);
						}

					}
				}
			} else {
				if(element.clientWidth > 0) {
					evalMediaQuery(item.media) ? addClass(documentElement, item.className) : removeClass(documentElement, item.className);
				}
			}
		}
	}

	function MediaQuery(className, mediaQuery) {
		var self = this, enabled = 1;

		self.className = className;
		self.media = mediaQuery;
		self.index = mediaList.push(self) - 1;
		self.enable = function () { if (!enabled) { self.index = mediaList.push(self) - 1; enabled = true; } };
		self.disable = function () { if (enabled) { mediaList.splice(self.index, 1); enabled = false; } };
		self.refresh = function() { mediaLoop(); };
	}

	global.MediaClass = function (className, mediaQuery) {
		var mq = new MediaQuery(className, mediaQuery);

    mediaLoop();

		return mq;
	};

	getMediaFeatures();
})(this, document.documentElement);

function EnvironmentContext(name, executeCallback, decoupled) {

    var context = this;

    if(typeof decoupled !== 'undefined' && typeof decoupled !== 'boolean') {
        throw new Error("IllegalArgumentException: \"decoupled\" must be a boolean!");
    } else {
        decoupled = true;
    }

    context.decoupled = decoupled;

    context.createTime = new Date();
    context.name = name;
    context.loaded = false;
    context.callbacks = [];
    if(typeof executeCallback === 'function') {
        context.executeCallback = executeCallback;
    } else {
        context.executeCallback = function(callback) {
            callback.call();
        }
    }
    context.timerRunning = decoupled;
    context.timer = setInterval(function() {

        if(context.loaded === true) {

            // TODO: extract dependency on debug.js
            SNI.BOX.DEBUG("Executing \"" + context.name + "\" callbacks");
            context.executeContextLoadedCallbacks();
        }

    }, 30);
    context.createHandler(context.name);
}

EnvironmentContext.prototype = {

    getName: function() {
        return this.name;
    },
    createHandler: function(name) {

        if(typeof name === 'undefined' || name.length === 0) {
            throw new Error("handler name cannot be blank");
        }

        if(typeof window[name] !== 'undefined') {
            throw new Error("window[" + name + "] is already defined");
        }

        var context = this;

        window[name] = function(callback) {
            if(typeof callback === 'function') {
                if(context.loaded === true && context.timerRunning === false) {
                    SNI.BOX.DEBUG("context.loaded was true, invoking \"" + context.name + "\" callback immediately");
                    context.executeCallback.call(null, callback);
                } else {
                    if(context.timerRunning === true) {
                        SNI.BOX.DEBUG("context.timerRunning was true, pushing \"" + context.name + "\" callback to queue");
                    } else {
                        SNI.BOX.DEBUG("context.loaded was false, pushing \"" + context.name + "\" callback to queue");
                    }

                    context.callbacks.push(callback);
                }
            }
        };
    },
    getHandler: function() {

        var context = this;

        return window[context.name];
    },
    setContextLoaded: function() {
        var context = this;
        context.loaded = true;
        if(context.decoupled === false) {
            context.executeContextLoadedCallbacks();
        }
    },
    executeContextLoadedCallbacks: function() {

        var i,
            context = this;

        clearInterval(context.timer);
        for(i=0; i< context.callbacks.length; i+=1) {

            SNI.BOX.DEBUG("Executing \"" + context.name + "\" callback from queue position " + i);
            context.executeCallback.call(null, context.callbacks[i]);
        }
        context.timerRunning = false;
        context.callbacks = [];
    }
};
(function(win, undef) {

    var attachLab = function() {
        /*! LAB.js (LABjs :: Loading And Blocking JavaScript)
         v2.0.3 (c) Kyle Simpson
         MIT License
         */
        (function(o){var K=o.$LAB,y="UseLocalXHR",z="AlwaysPreserveOrder",u="AllowDuplicates",A="CacheBust",B="BasePath",C=/^[^?#]*\//.exec(location.href)[0],D=/^\w+\:\/\/\/?[^\/]+/.exec(C)[0],i=document.head||document.getElementsByTagName("head"),L=(o.opera&&Object.prototype.toString.call(o.opera)=="[object Opera]")||("MozAppearance"in document.documentElement.style),q=document.createElement("script"),E=typeof q.preload=="boolean",r=E||(q.readyState&&q.readyState=="uninitialized"),F=!r&&q.async===true,M=!r&&!F&&!L;function G(a){return Object.prototype.toString.call(a)=="[object Function]"}function H(a){return Object.prototype.toString.call(a)=="[object Array]"}function N(a,c){var b=/^\w+\:\/\//;if(/^\/\/\/?/.test(a)){a=location.protocol+a}else if(!b.test(a)&&a.charAt(0)!="/"){a=(c||"")+a}return b.test(a)?a:((a.charAt(0)=="/"?D:C)+a)}function s(a,c){for(var b in a){if(a.hasOwnProperty(b)){c[b]=a[b]}}return c}function O(a){var c=false;for(var b=0;b<a.scripts.length;b++){if(a.scripts[b].ready&&a.scripts[b].exec_trigger){c=true;a.scripts[b].exec_trigger();a.scripts[b].exec_trigger=null}}return c}function t(a,c,b,d){a.onload=a.onreadystatechange=function(){if((a.readyState&&a.readyState!="complete"&&a.readyState!="loaded")||c[b])return;a.onload=a.onreadystatechange=null;d()}}function I(a){a.ready=a.finished=true;for(var c=0;c<a.finished_listeners.length;c++){a.finished_listeners[c]()}a.ready_listeners=[];a.finished_listeners=[]}function P(d,f,e,g,h){setTimeout(function(){var a,c=f.real_src,b;if("item"in i){if(!i[0]){setTimeout(arguments.callee,25);return}i=i[0]}a=document.createElement("script");if(f.type)a.type=f.type;if(f.charset)a.charset=f.charset;if(h){if(r){e.elem=a;if(E){a.preload=true;a.onpreload=g}else{a.onreadystatechange=function(){if(a.readyState=="loaded")g()}}a.src=c}else if(h&&c.indexOf(D)==0&&d[y]){b=new XMLHttpRequest();b.onreadystatechange=function(){if(b.readyState==4){b.onreadystatechange=function(){};e.text=b.responseText+"\n//@ sourceURL="+c;g()}};b.open("GET",c);b.send()}else{a.type="text/cache-script";t(a,e,"ready",function(){i.removeChild(a);g()});a.src=c;i.insertBefore(a,i.firstChild)}}else if(F){a.async=false;t(a,e,"finished",g);a.src=c;i.insertBefore(a,i.firstChild)}else{t(a,e,"finished",g);a.src=c;i.insertBefore(a,i.firstChild)}},0)}function J(){var l={},Q=r||M,n=[],p={},m;l[y]=true;l[z]=false;l[u]=false;l[A]=false;l[B]="";function R(a,c,b){var d;function f(){if(d!=null){d=null;I(b)}}if(p[c.src].finished)return;if(!a[u])p[c.src].finished=true;d=b.elem||document.createElement("script");if(c.type)d.type=c.type;if(c.charset)d.charset=c.charset;t(d,b,"finished",f);if(b.elem){b.elem=null}else if(b.text){d.onload=d.onreadystatechange=null;d.text=b.text}else{d.src=c.real_src}i.insertBefore(d,i.firstChild);if(b.text){f()}}function S(c,b,d,f){var e,g,h=function(){b.ready_cb(b,function(){R(c,b,e)})},j=function(){b.finished_cb(b,d)};b.src=N(b.src,c[B]);b.real_src=b.src+(c[A]?((/\?.*$/.test(b.src)?"&_":"?_")+~~(Math.random()*1E9)+"="):"");if(!p[b.src])p[b.src]={items:[],finished:false};g=p[b.src].items;if(c[u]||g.length==0){e=g[g.length]={ready:false,finished:false,ready_listeners:[h],finished_listeners:[j]};P(c,b,e,((f)?function(){e.ready=true;for(var a=0;a<e.ready_listeners.length;a++){e.ready_listeners[a]()}e.ready_listeners=[]}:function(){I(e)}),f)}else{e=g[0];if(e.finished){j()}else{e.finished_listeners.push(j)}}}function v(){var e,g=s(l,{}),h=[],j=0,w=false,k;function T(a,c){a.ready=true;a.exec_trigger=c;x()}function U(a,c){a.ready=a.finished=true;a.exec_trigger=null;for(var b=0;b<c.scripts.length;b++){if(!c.scripts[b].finished)return}c.finished=true;x()}function x(){while(j<h.length){if(G(h[j])){try{h[j++]()}catch(err){}continue}else if(!h[j].finished){if(O(h[j]))continue;break}j++}if(j==h.length){w=false;k=false}}function V(){if(!k||!k.scripts){h.push(k={scripts:[],finished:true})}}e={script:function(){for(var f=0;f<arguments.length;f++){(function(a,c){var b;if(!H(a)){c=[a]}for(var d=0;d<c.length;d++){V();a=c[d];if(G(a))a=a();if(!a)continue;if(H(a)){b=[].slice.call(a);b.unshift(d,1);[].splice.apply(c,b);d--;continue}if(typeof a=="string")a={src:a};a=s(a,{ready:false,ready_cb:T,finished:false,finished_cb:U});k.finished=false;k.scripts.push(a);S(g,a,k,(Q&&w));w=true;if(g[z])e.wait()}})(arguments[f],arguments[f])}return e},wait:function(){if(arguments.length>0){for(var a=0;a<arguments.length;a++){h.push(arguments[a])}k=h[h.length-1]}else k=false;x();return e}};return{script:e.script,wait:e.wait,setOptions:function(a){s(a,g);return e}}}m={setGlobalDefaults:function(a){s(a,l);return m},setOptions:function(){return v().setOptions.apply(null,arguments)},script:function(){return v().script.apply(null,arguments)},wait:function(){return v().wait.apply(null,arguments)},queueScript:function(){n[n.length]={type:"script",args:[].slice.call(arguments)};return m},queueWait:function(){n[n.length]={type:"wait",args:[].slice.call(arguments)};return m},runQueue:function(){var a=m,c=n.length,b=c,d;for(;--b>=0;){d=n.shift();a=a[d.type].apply(null,d.args)}return a},noConflict:function(){o.$LAB=K;return m},sandbox:function(){return J()}};return m}o.$LAB=J();(function(a,c,b){if(document.readyState==null&&document[a]){document.readyState="loading";document[a](c,b=function(){document.removeEventListener(c,b,false);document.readyState="complete"},false)}})("addEventListener","DOMContentLoaded")})(this);
    };

    win.SNI = win.SNI || { };

    win.SNI.BOX = win.SNI.BOX || { };

    if(win.SNI.BOX.$LAB === undef) {
        attachLab.call(win.SNI.BOX);
    }
})(window, undefined);
(function(win, undef) {

    if(win.SNI.BOX.$LAB !== undef && (win.SNI === undef || win.SNI.BOX === undef || win.SNI.BOX.LOADED === undef)) {

        (function($LAB) {

            win.SNI = win.SNI || { };

            win.SNI.BOX = win.SNI.BOX || { };

            win.SNI.BOX.LOADED = true;

            var CORE_SCOPE = "CORE",
                AUTH_SCOPE = "AUTH",
                RENDER_SCOPE = "RENDER",
                EXECUTION_TIMER_SCOPE = "EXECUTION";

            var CORE_DEBUG = SNI.BOX.DEBUG.forScope(CORE_SCOPE),
                AUTH_DEBUG = SNI.BOX.DEBUG.forScope(AUTH_SCOPE, CORE_SCOPE),
                RENDER_DEBUG = SNI.BOX.DEBUG.forScope(RENDER_SCOPE, CORE_SCOPE),
                EXECUTION_DEBUG = SNI.BOX.DEBUG.forScope(EXECUTION_TIMER_SCOPE, CORE_SCOPE);

            if (typeof String.prototype.startsWith !== 'function') {
                String.prototype.startsWith = function (prefix){
                    return this.lastIndexOf(prefix, prefix.length - 1) === 0
                };
            }

            if (typeof String.prototype.endsWith !== 'function') {
                String.prototype.endsWith = function(suffix) {
                    return this.indexOf(suffix, this.length - suffix.length) !== -1;
                };
            }

            // Regex for extracting protocol & domain components of a URL
            var hostPattern = /^((?:(https?):)?(?:\/\/)?([^\/:]+)(?::\d+)?)/;

            var domainSubPattern = /(?:[^.]+\.)*([^.]+\.[^.]+)$/;

            var getDomain = function(url) {

                var hostResult = hostPattern.exec(url);
                var host = (hostResult == null || hostResult.length < 4) ? null : hostResult[3];

                if(host === null) {
                    return null;
                }

                var domainResult = domainSubPattern.exec(host);
                return (domainResult == null || domainResult.length < 2) ? null : domainResult[1];
            };

            var getHost = function(url) {

                // captures
                // 1: scheme
                // 2: host + port
                // 3: host
                // 4: port
                var hostPattern = /^(?:(https?):)?(?:\/\/)?(([^\/:]+)(:\d+)?)/;

                var hostResult = hostPattern.exec(url);
                return (hostResult === null || hostResult.length < 3) ? null : hostResult[2];
            };

            /*
                Parameters:

                    "url" - a URL from which the prefix should be extracted

                Returns:

                    null if no prefix is contained with url, otherwise the protocol + domain portion of url
            */
            var getUrlPrefix = function(url) {

                var result = hostPattern.exec(url);
                return result === null ? null : result[1];
            };

            /*
                Purpose:

                    Determine if a specified URL is cross-domain relative to window.location

                Parameters:

                    "url" - the URL to be checked against window.location

                Returns:

                    true if either the protocol or domain portions of url differ from window.location
            */
            var isCrossDomain = function(url) {

                if(url === undef || url === null) {
                    throw new Error("url cannot be blank");
                }

                var result1 = hostPattern.exec(url);
                var result2 = hostPattern.exec(win.location);

                if(result1 === null || result2 === null) {
                    return false;
                }

                var protocol1 = result1[2];
                var domain1 = result1[3];

                var protocol2 = result2[2];
                var domain2 = result2[3];

                return protocol1 !== protocol2 || domain1 !== domain2;
            };

            var loadApp = function() {

                (function(jQuery) {

                    var $ = jQuery;

                    CORE_DEBUG("Using jQuery version: " + $.fn.jquery);

                    var defaultScriptDependencies = [
                        {
                            'url': '/js/mediaclass.js',
                            'shouldLoad': function() {
                                return typeof win.MediaClass !== 'function';
                            }
                        }
                    ];

                    /*
                        Purpose:

                            Loads JavaScript resources from a specified Array of dependencies.  The dependency list is a combination of
                            default dependencies with any provided at module definition or invocation code points.

                         Parameters:

                            "baseUrl" - a URL prefix of the form (http://mrb.foodnetwork.com) used to fully-qualify relative URLs
                            "scriptDependencies" - an Array of objects with the following properties:
                                "url" - the relative or absolute path of the JavaScript resource.  If relative, baseUrl will be used to fully-scope the request
                                "shouldLoad" (optional) - callback function to determine whether a dependency should be loaded.  An undefined value or
                                    a function that returns true will trigger the resource to load.
                    */

                    var loadingScripts = { };

                    var loadScriptDependencies = function(baseUrl, scriptDependencies) {

                        var i, url, urlPrefix, dfdList = [];

                        if(scriptDependencies instanceof Array) {

                            for(i = 0; i < scriptDependencies.length; i += 1) {

                                if(typeof scriptDependencies[i].url !== 'string') {
                                    throw new Error("\"url\" field of script dependency is required");
                                }

                                if((typeof scriptDependencies[i].shouldLoad !== 'function'
                                    || scriptDependencies[i].shouldLoad.call(null) === true)
                                    && loadingScripts[scriptDependencies[i].url] === undef) {

                                    urlPrefix = getUrlPrefix(scriptDependencies[i].url);

                                    if(urlPrefix === null) {

                                        if(scriptDependencies[i].url.indexOf('/') === 0 && baseUrl.endsWith('/')) {
                                            url = baseUrl + scriptDependencies[i].url.substr(1);
                                        } else {
                                            url = baseUrl + scriptDependencies[i].url;
                                        }

                                    } else {
                                        url = scriptDependencies[i].url;
                                    }

                                    CORE_DEBUG("Loading script dependency  [" + url + "]");


                                    (function() {
                                        var dfd = new $.Deferred();
                                        dfdList.push(dfd);

                                        loadingScripts[scriptDependencies[i].url] = dfd;

                                        $LAB.queueScript('' + url)
                                            .queueWait(function() {
                                                dfd.resolve();
                                            });
                                    }());
                                } else if(loadingScripts[scriptDependencies[i].url] !== undef) {

                                    CORE_DEBUG("Already Loading script dependency [" + url + "]");

                                    // return existing $.Deferred
                                    return loadingScripts[scriptDependencies[i].url];

                                } else {

                                    CORE_DEBUG("Skipping script dependency [" + scriptDependencies[i].url + "]");
                                }

                                if(dfdList.length > 0) {
                                    $LAB.runQueue();
                                }
                            }
                        }

                        return $.when.apply(null, dfdList).pipe(function() { CORE_DEBUG("All script dependencies loaded.") } );
                    };

                    /*
                        Purpose:

                            Loads stylesheets from a specified Array of dependencies.  The dependency list is a combination of
                            default dependencies with any provided at module definition or invocation code points.

                         Parameters:

                            "baseUrl" - a URL prefix of the form (http://mrb.foodnetwork.com) used to fully-qualify relative URLs
                            "styleDependencies" - an Array of objects with the following properties:
                                "url" - the relative or absolute path of the stylesheet.  If relative, baseUrl will be used to fully-scope the request
                                "shouldLoad" (optional) - callback function to determine whether a dependency should be loaded.  An undefined value or
                                    a function that returns true will trigger the stylesheet to load.
                    */

                    var loadingStyles = { };

                    var loadStyleDependencies = function(baseUrl, styleDependencies) {

                        var i, href, urlPrefix, isLess, $link;

                        if(styleDependencies instanceof Array) {

                            for(i = 0; i < styleDependencies.length; i += 1) {

                                if(typeof styleDependencies[i].url !== 'string') {
                                    throw new Error("\"url\" field of style dependency is required");
                                }

                                if((typeof styleDependencies[i].shouldLoad !== 'function'
                                    || styleDependencies[i].shoudlLoad.call(null) === true)
                                    && loadingStyles[styleDependencies[i].url] !== true) {

                                    loadingStyles[styleDependencies[i].url] = true;

                                    urlPrefix = getUrlPrefix(styleDependencies[i].url);

                                    if(urlPrefix === null) {

                                        if(styleDependencies[i].url.indexOf('/') === 0 && baseUrl.endsWith('/')) {
                                            href = baseUrl + styleDependencies[i].url.substr(1);
                                        } else {
                                            href = baseUrl + styleDependencies[i].url;
                                        }

                                    } else {
                                        href = styleDependencies[i].url;
                                    }

                                    if($('link[rel="stylesheet"][href="' + href + '"]').size() > 0) {
                                        continue;
                                    }

                                    isLess = /\.less$/.test(href);

                                    $link = $('<link />', {
                                        'rel': isLess ? 'stylesheet/less' : 'stylesheet',
                                        'type': isLess ? 'stylesheet/less': 'text/css',
                                        'href': href
                                    });

                                    CORE_DEBUG("Loading style dependency [" + href + "]");

                                    $('head').append($link);
                                } else {

                                    CORE_DEBUG("Skipping style dependency [" + href + "]");
                                }
                            }
                        }
                    };

    /*                var selectBySchema = function(json, type, prop) {

                        if(json === undef || json === null || typeof json !== 'object') {
                            return null;
                        }

                        var queue = [];

                        if(json instanceof Array) {
                            queue = queue.concat(json);
                        } else if(typeof json === 'object') {

                        }
                    };
    */

                    var getByPath = function(object, path) {

                        if(typeof path !== 'string' || !object) {
                            return null;
                        }

                        path = path.trim().trim();

                        if(path.length === 0) {
                            return null;
                        }

                        var segments = path.split('/');

                        var i;
                        var focus = object;
                        for(i = 0; i < segments.length; i += 1) {

                            var seg = segments[i],
                                index;

                            if(typeof focus !== 'object') {
                                return null;
                            }

                            if(focus.hasOwnProperty(seg) === false) {

                                if(/^\d+$/.test(seg)) {

                                    index = parseInt(seg, 10);

                                    if(Array.isArray(focus) && index >= 0 && index < focus.length) {
                                        focus = focus[index];
                                    }
                                } else {
                                    return null;
                                }
                            } else {
                                focus = focus[seg];
                            }
                        }

                        return focus;
                    };

                    var updateProp = function(prop, value) {

                        if(prop === undef || prop === null) {
                            return;
                        }

                        var $prop = $(prop),
                            datetime,
                            tagName = " " + $.trim($prop[0].tagName.toLowerCase()) + " ";

                        if(' meta '.indexOf(tagName) !== -1) {
                            $prop.attr('content', value);
                        } else if (' audio embed iframe img source track video '.indexOf(tagName) !== -1) {
                            $prop.attr('src', value);
                        } else if (' a area link '.indexOf(tagName) !== -1) {
                            $prop.attr('href', value);
                        } else if (' object '.indexOf(tagName) !== -1) {
                            $prop.attr('data', value);
                        } else if (' data meter '.indexOf(tagName) !== -1) {
                            if($prop.is('[datetime]')) {
                                $prop.attr('datetime', value);
                            } else {
                                $prop.text(value);
                            }
                        } else if (' input select textarea '.indexOf(tagName) !== -1) {
                            if(!value) {
                                $prop.val('');
                            } else {
                                $prop.val(value);
                            }
                            $prop.val(value);
                        } else {
                            if(!value) {
                                $prop.text('');
                            } else {
                                $prop.text(value);
                            }
                        }
                    };

                    var updateByPath = function(element, path, value) {

                        var $el = $(element);
                        if($el.size() === 0) {
                            return;
                        }

                        $el.each(function() {

                            var $this = $(this);

                            var schemaJson = schemaToJson($this, true);

                            if(path.indexOf("/") === 0) {
                                path = path.substring(1);
                            }

                            if(path.indexOf("0/") !== 0) {
                                path = "0/" + path;
                            }

                            var lastProperties = path.lastIndexOf("/properties");
                            if(lastProperties === -1) {
                                return;
                            }

                            var lastObjectSelector = path.substr(0, lastProperties);
                            var propSelector = path.substr(lastObjectSelector.length + "/properties".length + 1);

                            var lastObject = getByPath(schemaJson, lastObjectSelector);

                            if(typeof lastObject !== 'object') {
                                return;
                            }

                            var $prop = getByPath(lastObject, "_DOMrefs/" + propSelector);
                            updateProp($prop, value);

                            CORE_DEBUG("modifying [" + propSelector +"] on ", $prop, " setting to [" + value + "]");
                        });
                    };

                    /*
                        Purpose:

                            Iterates over a provided Array of renderer objects and applies each renderer's callback to an appropriate
                            DOM element.  The DOM element is selected relative to the specified module using the renderer's schema.org
                            scope parameters.

                        Parameters:

                            "module" - the parent object for all elements to be rendered
                            "data" - JSON representation of schema.org embedded data for the module. passed through to each renderer callback
                            "rendererList" - an Array of objects with the following properties:

                                "type" (optional) - specifies a schema.org [itemtype~="______"] selector
                                "prop" (optional) - specifies a schema.org [itemprop="______"] selector
                                "callback" - the function used to render the HTML element passed as "this" context

                            "plugin" - passed through to each renderer callback
                            "options" - passed through to each renderer callback
                    */
                    var applyRendererList = function(module, data, rendererList, plugin, options, renderCompleteDfd) {

                        var $root = $(this);

                        var i,
                            renderer,
                            $obj,
                            $prop,
                            $parentObj,
                            $module = $(module),
                            renderThis = function(index, el) {
                                var $el = $(el);
                                // TODO: implement sub-selection of full module JSON when data is populated (dataType: json request)
                                var elementJson = data === null ? schemaToJson($el) : data;
                                renderer.callback.apply($el, [elementJson, plugin, options, renderCompleteDfd]);
                            };

                        var methodExecutionTime = new Date();

                        for(i = 0; i < rendererList.length; i += 1) {

                            renderer = rendererList[i];

                            var start = new Date();

                            $obj = null;
                            $prop = null;
                            $parentObj = null;

                            if(renderer.type !== undef) {
                                $obj = $module.find('[itemtype~="' + renderer.type + '"]').add($module.filter('[itemtype~="' + renderer.type + '"]'));
                                if($obj.size() === 0) {

                                    $parentObj = $root.closest('[itemscope][itemtype~="' + renderer.type + '"]');
                                    if($parentObj.size() > 0 && renderer.prop !== undef) {
                                        $prop = $module.find('[itemprop="' + renderer.prop + '"]').add($module.filter('[itemprop="' + renderer.prop + '"]'));
                                    }
                                } else if(renderer.prop !== undef) {
                                    $prop = $obj.find('[itemprop="' + renderer.prop + '"]');
                                }
                            }

                            if(renderer.prop !== undef && $prop !== null && $prop !== null && $prop.size() > 0) {

                                RENDER_DEBUG("RENDER: [type/prop:" + renderer.type + "/" + renderer.prop + "]", $prop, renderer.callback);
                                $prop.each(renderThis);

                            } else if(renderer.prop === undef && renderer.type !== undef && $obj !== null && $obj.size() > 0) {

                                RENDER_DEBUG("RENDER: [type:" + renderer.type + "]", $obj, renderer.callback);
                                $obj.each(renderThis);

                            } else if(renderer.prop === undef && renderer.type !== undef && $parentObj !== null && $parentObj.size() > 0) {

                                RENDER_DEBUG("RENDER: [type:" + renderer.type + "]", $parentObj, renderer.callback);
                                $parentObj.each(renderThis);

                            } else if(renderer.prop === undef && renderer.type === undef ) {

                                RENDER_DEBUG("RENDER: [module]", $module, renderer.callback);
                                renderer.callback.apply($module, [data, plugin, options, renderCompleteDfd]);
                            }

                            var executionTime = (new Date()) - start;

                            if(executionTime > 10) {
                                EXECUTION_DEBUG("Applying renderer: ", renderer, " took: " + ((new Date()) - start) + " ms");
                            }
                        }

                        EXECUTION_DEBUG("Applying all renderers took: " + ((new Date()) - methodExecutionTime) + " ms");
                    };

                    /*
                        Purpose:
                            Extract schema.org microdata from the specified DOM element and return it as a JSON object.  This method can be called directly,
                            but is intended to be called from the "schemaToJson" function.

                        Parameters:
                            "item" - the DOM element to be extracted

                        Returns:
                            JSON representation of the embedded schema.org microdata
                    */
                    var extractMicrodata = function(item, includeDomReference) {

                        // do not include DOM references by default, for reverse compatibility
                        var includeRef = (typeof includeDomReference === 'boolean' ? includeDomReference : false);

                        var $item = $(item);
                        var types = $item.attr('itemtype');
                        var typeList = types.split(/\s+/);

                        var properties = { };

                        var domReferences = { };

                        var hasProperties = false;

                        var $props = $item.filter('[itemprop]').add($item.find('[itemprop]'));

                        var itemref = $item.attr('itemref');
                        if(itemref !== undef) {
                            $('#' + itemref.split(' ').join(',#')).each(function() {

                                var $ref = $(this);

                                var $prop = $ref.filter('[itemprop]');
                                if($prop.size() === 0) {
                                    $prop = $ref.find('[itemprop]');
                                }

                                $prop.data('itemRef', $ref);

                                $props.add($prop);
                            });
                        }

                        $props.each(function() {

                            var $prop = $(this),
                                itemprop,
                                propName,
                                propNameList,
                                i,
                                value,
                                datetime,
                                tagName = ' ' + $prop[0].tagName.toLowerCase() + ' ',
                                $closestItemScope = $prop.parent().closest('[itemscope]'),
                                $itemRef = $prop.data('itemRef'),
                                $closestItemRefItemScope = $itemRef ? $('[itemref~="' + $itemRef[0].id + '"]') : null;

                            // only process the property if 1) it is not the $item and 2) its closest [itemscope] is $item
                            if($prop.is($item) === false
                                && (
                                    ($closestItemScope.is($item) === true && !$closestItemRefItemScope)
                                    || ($closestItemRefItemScope && $closestItemRefItemScope.is($item) && !$.contains($itemRef[0], $closestItemRefItemScope[0])))) {

                                hasProperties = true;

                                if($prop.is('[itemscope]')) {
                                    value = extractMicrodata($prop, includeDomReference);
                                } else if(' meta '.indexOf(tagName) !== -1) {
                                    value = $.trim($prop.attr('content'));
                                } else if(' audio embed iframe img source track video '.indexOf(tagName) !== -1) {
                                    value = $.trim($prop.attr('src'));
                                } else if(' a area link '.indexOf(tagName) !== -1) {
                                    value = $.trim($prop.attr('href'));
                                } else if(' object '.indexOf(tagName) !== -1) {
                                    value = $.trim($prop.attr('data'));
                                } else if(' data meter '.indexOf(tagName) !== -1) {
                                    datetime = $.trim($prop.attr('datetime'));
                                    value = datetime === undef ? $.trim($prop.text()) : datetime;
                                } else if(' input select textarea '.indexOf(tagName) !== -1) {
                                    value = $prop.val();
                                } else {
                                    value = $.trim($prop.text());
                                }

                                itemprop = $prop.attr('itemprop');

                                if(itemprop !== undef && $.trim(itemprop).length > 0) {

                                    propNameList = itemprop.split(/\s+/);

                                    for(i = 0; i < propNameList.length; i += 1) {

                                        propName = $.trim(propNameList[i]);

                                        if(domReferences[propName] === undef) {
                                            domReferences[propName] = [];
                                        }

                                        domReferences[propName].push($prop[0]);

                                        if(value !== "") {

                                            if(properties[propName] === undef) {
                                                properties[propName] = [];
                                            }

                                            properties[propName].push(value);
                                        }
                                    }
                                }
                            }
                        });

                        var result = { };

                        var id = $item.attr('itemid');

                        if(hasProperties === true) {
                            result.properties = properties;
                        }

                        if(typeList.length > 0) {
                            result.types = typeList;
                        }

                        if(id !== undef) {
                            result.id = id;
                        }

                        if(includeRef === true) {
                            result['_DOMrefs'] = domReferences;
                        }

                        return result;
                    };

                    /*
                        Purpose:

                            Extract all schema.org microdata from the specified DOM element and return it as a JSON object.  In comparison to "extractMicrodata",
                            this method extracts all non-nested [itemscope] objects as sibling Array elements and returns the Array.

                        Parameters:

                            "html" - the DOM node to be extracted

                        Returns:

                            An array of JSON representations of the embedded schema.org microdata
                    */
                    var schemaToJson = function(html, includeDomReferences) {

                        var $html = $(html);
                        var json = [];

                        var $items = $html.filter('[itemscope]')
                            .add($html.find('[itemscope][itemprop]')
                                .not($html.find('[itemscope] [itemscope][itemprop]'))
                                .not($html.filter('[itemscope]').find('[itemscope][itemprop]')));
                        if($items.size() === 0) {
                            $items = $items.add($html.closest('[itemscope]'));
                        }
                        $items.each(function() {

                            var $item = $(this);
                            var $closestParent = $item.parent().closest('[itemscope]');
                            if($closestParent.size() === 0 || $.contains($html, $closestParent) === false) {

                                json.push(extractMicrodata($item, includeDomReferences));
                            }
                        });

                        return json;
                    };

                    /*
                        Purpose:

                            Determine whether the 'dataType' $.ajax parameter should be set to 'json', 'jsonp', or undefined.
                            The result is based on the requested dataType ('html' or 'json') and whether the request is cross-domain.

                        Parameters:

                            "dataType" - the requested dataType for the module data stream, either 'html' or 'json'
                            "crossDomain" - boolean indicating whether the request is cross-domain

                        Returns:

                            'json', 'jsonp', or null (indicates that the 'dataType' $.ajax parameter should not be set)

                    */
                    var toAjaxDataType = function(dataType, crossDomain) {

                        if(dataType === undef || dataType === null) {
                            throw new Error("dataType cannot be blank");
                        }

                        // for cross-domain requests, the ajax data type is always 'jsonp'
                        if(crossDomain === true) {
                            return 'jsonp';
                        }

                        // for same-domain requests, only 'json' should be explicitly specified; 'html' is the default return type
                        if(dataType === 'html') {
                            return null;
                        } else if(dataType === 'json') {
                            return 'json';
                        }

                        throw new Error("Unrecognized dataType: \"" + dataType + "\"");
                    };

                    /*
                        Purpose:

                            Determine whether the '_result' parameter should be set in an $.ajax url to indicate the type of result to be returned.
                            The result is based on the requested dataType ('html' or 'json') and whether the request is cross-domain.

                        Parameters:

                            "dataType" - the requested dataType for the module data stream, either 'html' or 'json'
                            "crossDomain" - boolean indicating whether the request is cross-domain

                        Returns:

                            'html' or null (indicates that the '_result' $.ajax url query parameter should not be set)
                    */
                    var toAjaxResultType = function(dataType, crossDomain) {

                        if(dataType === undef || dataType === null) {
                            throw new Error("dataType cannot be blank");
                        }

                        return crossDomain === true && dataType === 'html' ? 'html' : null;
                    };

                    /*
                        Purpose:

                            Build a query string fragment for $.ajax requests with parameters to indicate the output dataType ("_format") and
                            result format ("_result").

                        Parameters:

                            "ajaxDataType" - 'json', 'jsonp', or null
                            "ajaxResultType" - 'html' or null

                        Returns:

                            a query string fragment of the form [_format=_____][&_result=______]
                    */
                    var buildDataTypeQueryString = function(ajaxDataType, ajaxResultType) {

                        var queryString = '';

                        if(ajaxDataType !== undef && ajaxDataType !== null) {
                            queryString += '_format=' + ajaxDataType;
                        }

                        if(ajaxResultType !== undef && ajaxResultType !== null) {
                            if(queryString.length > 0) {
                                queryString += '&';
                            }
                            queryString += '_result=' + ajaxResultType;
                        }

                        return queryString;
                    };

                    /*
                        Purpose:

                            Construct module HTML from API data response.  Manipulation of data object depends on the ajaxDataType and resultType of the original request.

                        Parameters:

                            "data" - API data response object.  Can be raw HTML, JSON, or JSON-packaged HTML (for jsonp ajaxDataType)
                            "ajaxDataType" - 'json', 'jsonp', or null
                            "ajaxResultType" - 'html' or null
                            "rendererList" - Array of renderer objects to be passed to "applyRendererList"
                            "plugin" - passed through to "applyRendererList"
                            "options" - passed through to "applyRendererList"

                        Returns:

                            jQuery DOM element with rendererd HTML

                    */
                    var renderModule = function(data, rendererList, plugin, options, renderCompleteDfd) {


                        var start = new Date();
                        var $root = $(this);

                        var $html;

                        if(options['reRender'] === true) {
                            $html = $root;
                        } else {
                            $html = $('<div />');
                        }

                        var json;
                        var body;
                        var processResponseStart;

                        if(typeof data === 'string') {

                            processResponseStart = new Date();

                            body = data;
                            body = body.replace(/^(?:.|[\r\n])*?<body[^>]*>/ig, '');
                            body = body.replace(/<\/body>(?:.|[\r\n])*?$/ig, '');

                            $html.append(body);
                            json = null;

                            EXECUTION_DEBUG("processing frame response took: " + ((new Date()) - processResponseStart) + " ms");

                            processResponseStart = new Date();

                            if(rendererList.length > 0) {
                                $html.children().each(function() {
                                    applyRendererList.apply($root, [$(this), json, rendererList, plugin, options, renderCompleteDfd]);
                                });
                            }

                            EXECUTION_DEBUG("applying all renderers to all children took: " + ((new Date()) - processResponseStart) + " ms");

                        } else if(data.status !== undef && data.status === 'ok' && typeof data.result === 'string') {

                            processResponseStart = new Date();

                            body = data.result;
                            body = body.replace(/^(?:.|[\r\n])*?<body[^>]*>/ig, '');
                            body = body.replace(/<\/body>(?:.|[\r\n])*?$/ig, '');

                            $html.append(body);
                            json = null;

                            EXECUTION_DEBUG("processing frame response took: " + ((new Date()) - processResponseStart) + " ms");

                            processResponseStart = new Date();

                            if(rendererList.length > 0) {
                                $html.children().each(function() {
                                    applyRendererList.apply($root, [$(this), json, rendererList, plugin, options, renderCompleteDfd]);
                                });
                            }

                            EXECUTION_DEBUG("applying all renderers to all children took: " + ((new Date()) - processResponseStart) + " ms");

                        } else if(data.status !== undef && data.status === 'ok' && typeof data.result === 'object') {

                            json = data.result;
                            if(rendererList.length > 0) {
                                applyRendererList.apply($root, [$html, json, rendererList, plugin, options, renderCompleteDfd]);
                            }
                        } else if(typeof data === 'object') {

                            json = data;
                            if(rendererList.length > 0) {
                                applyRendererList.apply($root, [$html, json, rendererList, plugin, options, renderCompleteDfd]);
                            }
                        }

                        var startNestedModule = new Date();

                        // dynamically invoke nested modules
                        $html.find('[data-box-module-name]').each(function() {
                            var $module = $(this);
                            // find nested modules by checking for parent modules
                            if($module.parent().closest('[data-box-module-name]').size() > 0) {
                                var moduleName = $module.data('boxModuleName');
                                var moduleUrl = $module.data('boxModuleUrl');
                                if($.fn[moduleName] !== undef) {
                                    $.fn[moduleName].call($module, $.extend(true, { }, options, {
                                        'url': moduleUrl
                                    }));
                                }
                            }
                        });

                        EXECUTION_DEBUG("nested module processing took: " + ((new Date()) - startNestedModule) + " ms");

                        EXECUTION_DEBUG("renderModule took: " + ((new Date()) - start) + " ms");

                        return $html.children();
                    };

                    /*
                        Purpose:

                            Invoke the frame plugin on the specified $el, passing specified frameOptions.  ajaxDataType and ajaxResultType
                            are used to modify default frame functionality to include _format and _result query params, as well as $.ajax
                            dataType attribute.

                        Parameters:

                            "element" - the DOM element on which to invoke the frame plugin
                            "frameOptions" - pass through options object to the .frame(options) method
                            "ajaxDataType" - 'json', 'jsonp', or null
                            "ajaxResultType" - 'html' or null

                        Returns:

                            null
                    */
                    var modifyFrame = function(element, ajaxDataType, ajaxResultType, sourceDataFormat, authScheme) {

                        var $element = $(element);

                        var plugin = $element.data('boxPlugin');

                        $element.filter('.dari-frame').add($element.find('.dari-frame')).each(function() {

                            var $frame = $(this);

                            if(plugin && plugin.options().jsonp) {
                                $frame.attr('data-jsonp-callback-param', plugin.options().jsonp)

                                if(plugin.options().jsonpCallback) {
                                    $frame.attr('data-jsonp-callback', plugin.options().jsonpCallback);
                                }
                            }
                            $frame.attr('data-ajax-data-type', ajaxDataType);
                            $frame.attr('data-ajax-result-type', ajaxResultType);
                            $frame.attr('data-source-data-format', sourceDataFormat);
                            $frame.attr('data-auth-scheme', authScheme);
                        });

                        return null;
                    };

                    var frameOptions = {
                        'events': {
                            'beginLoad': function(event, plugin) {

                                var authScheme = SNI.BOX.AUTH.getSchemeByName(event.$frame.attr('data-auth-scheme'));

                                if(authScheme === null) {
                                    return;
                                }

                                var extraFormData = event.$frame.attr('data-extra-form-data');
                                var newFormData = extraFormData
                                    ? authScheme.signUrl(authScheme.unSignUrl('?' + extraFormData)).substring(1)
                                    : authScheme.signUrl('?').substring(2);
                                event.$frame.attr('data-extra-form-data', newFormData);
                            }
                        },
                        'setBody': function(data) {

                            var start = new Date();
                            var $frame = $(this);
                            var ajaxDataType = $frame.data('ajaxDataType');
                            var ajaxResultType = $frame.data('ajaxResultType');
                            var sourceDataFormat = $frame.data('sourceDataFormat');
                            var authSchemeName = $frame.data('authScheme');

                            var $module = $frame.is('.mrb-module') ? $frame : $frame.closest('.mrb-module');

                            CORE_DEBUG("frame.js / setBody, $frame: ", $frame, ", $module: ", $module);

                            var plugin = $module.data('boxPlugin');

                            var $source = $frame.data('source');

                            var renderCompleteDfd = new $.Deferred();

                            var $html = renderModule.apply($frame, [data, plugin.rendererList(), plugin, plugin.options(), renderCompleteDfd]);

                            modifyFrame($html, ajaxDataType, ajaxResultType, sourceDataFormat, authSchemeName);

                            var isAppend = $source !== undef && $source !== null && $source.hasClass('mrb-frame-append');

                            if(isAppend === false && plugin.options()['reRender'] === true) {

                                // do nothing, module was re-rendered

                            } else {

                                if(isAppend) {
                                    $source.remove();
                                    $frame.append($html);
                                } else {
                                    $frame.html($html);
                                }
                            }

                            EXECUTION_DEBUG("frame.setBody took: " + ((new Date()) - start) + " ms");

                            start = new Date();

                            renderCompleteDfd.resolve();

                            EXECUTION_DEBUG("resolving renderCompleteDfd took: " + ((new Date()) - start) + " ms");
                        }
                    };

                    var mediaClasses = { };

                    $.extend(true, win.SNI, {
                        'BOX': {
                            'Util': {
                                'isCrossDomain': isCrossDomain,
                                'schemaToJson': schemaToJson,
                                'getUrlPrefix': getUrlPrefix,
                                'getDomain': getDomain,
                                'getHost': getHost,
                                'loadStyles': loadStyleDependencies,
                                'loadScripts': loadScriptDependencies,
                                'getByPath': getByPath,
                                'updateByPath': updateByPath,
                                appendParam: function(url, key, value) {

                                    var appendedString = encodeURIComponent(key) + "=" + encodeURIComponent(value);

                                    if (url.indexOf('?') === -1) {
                                        appendedString = '?' + appendedString;
                                    }
                                    else {
                                        appendedString = '&' + appendedString;
                                    }

                                    return url + appendedString;
                                },
                                removeParam: function(url, parameter) {

                                    // http://stackoverflow.com/questions/1634748/how-can-i-delete-a-query-string-parameter-in-javascript

                                    //prefer to use l.search if you have a location/link object
                                    var urlparts= SNI.BOX.Util.removeHash(url).split('?');
                                    if (urlparts.length>=2) {

                                        // store off the hash, just in case
                                        var hash = SNI.BOX.Util.getHash(url);

                                        var prefix= encodeURIComponent(parameter)+'=';
                                        var pars= urlparts[1].split(/[&;]/g);

                                        //reverse iteration as may be destructive
                                        for (var i= pars.length; i-- > 0;) {
                                            //idiom for string.startsWith
                                            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                                                pars.splice(i, 1);
                                            }
                                        }

                                        url = urlparts[0]

                                        if(pars.length > 0) {
                                            url += '?'+pars.join('&');
                                        }

                                        // replace the stripped hash
                                        if(hash !== null) {
                                            url += '#' + hash;
                                        }
                                        return url;
                                    } else {
                                        return url;
                                    }
                                },
                                getHash: function(url) {

                                    var hashAt = url.indexOf('#' + 1);
                                    if(hashAt !== -1) {
                                        return url.substr(hashAt);
                                    }
                                    return null;
                                },
                                removeHash: function(url) {

                                    var hashAt = url.indexOf('#');

                                    if(hashAt !== -1) {
                                        return url.substr(0, hashAt);
                                    }

                                    return url;
                                },
                                getQueryParamByName: (function() {

                                    // inspired by second response of http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript

                                    var paramsByUrl = { },
                                        pl          = /\+/g,  // Regex for replacing addition symbol with a space
                                        search      = /([^&=]+)=?([^&]*)/g,
                                        decode      = function (s) { return decodeURIComponent(s.replace(pl, " ")); };

                                    return function(url, name) {

                                        if(paramsByUrl[url] === undef) {

                                            var match,
                                                queryAt = url.indexOf("?"),
                                                query = queryAt === -1 ? "" : url.substr(queryAt + 1),
                                                urlParams = {};

                                            while (match = search.exec(query)) {
                                                urlParams[decode(match[1])] = decode(match[2]);
                                            }

                                            paramsByUrl[url] = urlParams;
                                        }

                                        return paramsByUrl[url][name] !== undef ? paramsByUrl[url][name] : null;
                                    };

                                })()
                            },
                            RESPONSIVE_CLASS: "mrb-responsive",
                            addElementQuery: function(className, predicate) {

                                if(className === undef || className.length === 0 || predicate === undef || predicate.length === 0) {
                                    throw new Error("Usage: plugin.addElementQuery(className, predicate)");
                                }

                                if(mediaClasses[className] !== undef) {
                                    throw new Error("element query with name \"" + className + "\" already exists!  Use plugin.removeElementQuery(className) first!");
                                }

                                mediaClasses[className] = new MediaClass(className, '.' + win.SNI.BOX.RESPONSIVE_CLASS + ':' + predicate);
                            },
                            removeElementQuery: function(className) {

                                if(className === undef || className.length === 0) {
                                    throw new Error("Usage: plugin.removeElementQuery(className)");
                                }

                                if(mediaClasses[className] !== undef) {
                                    delete mediaClasses[className];
                                }
                            },
                            getElementQuery: function(className) {

                                if(className === undef || className.length === 0) {
                                    throw new Error("Usage: plugin.getElementQuery(className)");
                                }

                                return mediaClasses[className];
                            },
                            fontLoaded: function() {

                                var fontNames;
                                if(arguments[0] instanceof Array) {
                                    fontNames = arguments[0];
                                } else if(arguments.length > 0) {
                                    fontNames = Array.prototype.slice.call(arguments, 0);
                                } else {
                                    throw new Error("A font name or array of font names is required");
                                }

                                var dfdArray = [];

                                var i;
                                for(i = 0; i < fontNames.length; i += 1) {

                                    (function() {

                                        var dfd = new $.Deferred();
                                        var fontName = fontNames[i];
                                        dfdArray.push(dfd);

                                        $('body').fontChecker({
                                            'font': fontName,
                                            'load': function() {
                                                dfd.resolve();
                                            }
                                        })
                                    }());
                                }

                                return $.when.apply(null, dfdArray).pipe(function() { CORE_DEBUG("All fonts loaded"); });
                            },
                            'autoRun': function(moduleId, moduleName, moduleClass, params) {

                                if((typeof moduleId !== 'string' && typeof moduleId !== 'object') || typeof moduleName !== 'string' || typeof moduleClass !== 'string') {
                                    throw new Error("Invalid Syntax.  Usage: SNI.BOX.autoRun(moduleId, moduleName, moduleClass, params");
                                }

                                var $module = typeof moduleId === 'string' ? $('#' + moduleId) : $(moduleId);

                                if($module.size() === 0) {
                                    CORE_DEBUG("Could not find module with id: " + moduleId);
                                    return;
                                }

                                if($.fn[moduleName] !== undef) {

                                    CORE_DEBUG("$.fn.[" + moduleName + "] :: Auto-invoking plugin for id=" + moduleId + ", class=" + moduleClass);

                                    // invoke named module
                                    $.fn[moduleName].call($module, params);

                                    // store plugin in "boxPlugin" data
                                    $module.data('boxPlugin', $.fn[moduleName].call($module, 'plugin'));

                                } else {

                                    var anonEntry = { };
                                    anonEntry[moduleId] = SNI.BOX.plugin(params, function() {
                                        CORE_DEBUG("SNI.BOX.Anon :: Auto-invoking module based on class=" + moduleClass);
                                    });

                                    // build anonymous module
                                    $.extend(true, win.SNI.BOX, { Anon: anonEntry });

                                    CORE_DEBUG("SNI.BOX.Anon :: Register plugin for id=", moduleId, ", class=" + moduleClass);

                                    // invoke anonymous module
                                    SNI.BOX.Anon[moduleId].call($module, { });
                                }

                                // TODO: get rid of this BLB 2015-01-23
                                $("body").addClass(moduleName);
                            },
                            'authenticatedPlugin': function(defaults, unAuthInit, authInit) {

                                return $.plugin($.extend(true, { }, {

                                    'authSchemeName': null

                                }, defaults), function(plugin, options) {

                                    var $element = $(this);

                                    AUTH_DEBUG("entering authenticatedPlugin's init method");

                                    var $authRoot = null,
                                        $authModule = null,
                                        $unAuthRoot = null,
                                        $unAuthModule = null;

                                    var isAuthState = null;

                                    var authScheme = typeof options.authSchemeName === 'string'
                                        ? SNI.BOX.AUTH.getSchemeByName(options.authSchemeName)
                                        : SNI.BOX.AUTH.getFirstScheme();

                                    if(authScheme === null) {
                                        if(typeof options.authSchemeName === 'string') {
                                            throw new Error("No auth scheme named \"" + options.authSchemeName + "\" has been registered!");
                                        } else {
                                            throw new Error("No auth scheme has been registered!");
                                        }
                                    }

                                    plugin.getAuthScheme = function() {

                                        return authScheme;
                                    };

                                    authScheme.onReady(function() {

                                        plugin.authenticate = function(triggered, loginThenOptions) {

                                            var doAuthInit = $authModule === null;

                                            if(isAuthState !== true) {

                                                AUTH_DEBUG("calling plugin.authenticate");

                                                if(typeof triggered !== 'boolean') {
                                                    triggered = false;
                                                }

                                                if(authScheme.isAuthenticated() !== true) {
                                                    throw new Error("No authentication detected, cannot load authenticated state");
                                                }

                                                isAuthState = true;

                                                if(doAuthInit === true) {

                                                    // only assign to $authModule the first time
                                                    AUTH_DEBUG("initializing authModule");
                                                    $authModule = $authRoot;
                                                }

                                                AUTH_DEBUG("inserting $authModule", $authModule, "after $unAuthRoot", $unAuthRoot);
                                                $unAuthRoot.after($authModule);

                                                if(doAuthInit === true) {
                                                    // only run init the first time
                                                    authInit.apply($authModule, [plugin, options, triggered, loginThenOptions]);
                                                } else {
                                                    $authModule.trigger('box.authenticate', [plugin, options, triggered, loginThenOptions]);
                                                }

                                                $authModule.show();
                                                $unAuthRoot.detach();

                                                if(options.isPopup === true) {
                                                    AUTH_DEBUG("removing click handler to require login on ", $element);
                                                    $element.off('click', authScheme.requireLogin);
                                                }

                                                $(authScheme).one('logout', function(e, data, loginThenOptions) {
                                                    AUTH_DEBUG("heard logout event");
                                                    plugin.unAuthenticate();
                                                });

                                            } else {
                                                AUTH_DEBUG("plugin.authenticate was called on an already-authenticated state!");
                                            }
                                        };

                                        plugin.unAuthenticate = function() {

                                            var doUnAuthInit = $unAuthModule === null;

                                            if(isAuthState !== false) {

                                                isAuthState = false;

                                                AUTH_DEBUG("calling plugin.unAuthenticate");

                                                if(doUnAuthInit === true) {

                                                    // only assign to $unAuthModule the first time
                                                    AUTH_DEBUG("initializing unAuthModule");
                                                    $unAuthModule = $unAuthRoot;
                                                }

                                                AUTH_DEBUG("inserting $unAuthModule", $unAuthModule, "after $authRoot", $authRoot);
                                                $authRoot.after($unAuthModule);

                                                if(doUnAuthInit === true) {

                                                    // only run init the first time
                                                    unAuthInit.apply($unAuthModule, [plugin, options]);
                                                } else {
                                                    $unAuthModule.trigger('box.unauthenticate', [plugin, options]);
                                                }

                                                $unAuthModule.show();
                                                $authRoot.detach();

                                                if(options.isPopup === true) {
                                                    AUTH_DEBUG("instantiating click handler to require login on ", $element);
                                                    $element.on('click', authScheme.requireLogin);
                                                }

                                                $(authScheme).one('login', function(e, data, loginThenOptions) {
                                                    AUTH_DEBUG("heard login event");
                                                    plugin.authenticate(true, loginThenOptions);
                                                });

                                            } else {
                                                AUTH_DEBUG("plugin.unAuthenticate was called on an already-unauthenticated state!");
                                            }
                                        };

                                        if(authScheme.isAuthenticated() === true) {
                                            $authRoot = $element;
                                            $unAuthRoot = $element.clone().hide();
                                            $element.after($unAuthRoot);
                                            plugin.authenticate(false);
                                        } else {
                                            $unAuthRoot = $element;
                                            $authRoot = $element.clone().hide();
                                            $element.after($authRoot);
                                            plugin.unAuthenticate();

                                            if(options.isPopup === true && options.startOpen === true) {

                                                authScheme.requireLogin();
                                            }
                                        }
                                    });
                                });
                            },
                            'plugin': function(defaults, initFunction) {

                                var rendererList = [];

                                var newPlugin = $.plugin($.extend(true, { }, {
                                    'url': null,
                                    'errorClass': 'mrb-error',
                                    'loadedClass': 'box-loaded',
                                    'eventNamespace': 'mrb-events',
                                    'scriptDependencies': [ ],
                                    'styleDependencies': [ ],
                                    'requiredFonts': [ ],
                                    'dataType': 'html',
                                    'sourceDataFormat': 'html',
                                    'jsonp': '_callback',
                                    'syncDataLoad': null,
                                    'isPopup': false,
                                    'startOpen': false,
                                    'popupOptions': { },
                                    'cache': false,
                                    'initData': null,
                                    'authSchemeName': null
                                }, defaults),

                                function(plugin, options) {

                                    var $element = $(this);

                                    if(options.syncDataLoad !== null) {

                                    }

                                    var loadedDfd = new $.Deferred();

                                    var firstRender = true;

                                    plugin.firstRender = function() {
                                        return firstRender;
                                    };

                                    plugin.ready = plugin.dfd = function() {
                                        return loadedDfd;
                                    };

                                    plugin.ready().then(function() {
                                        $element.trigger('pluginReady', [plugin, options]);
                                    });

                                    plugin.rendererList = function() {
                                        return rendererList;
                                    };

                                    plugin.options = function() {
                                        return options;
                                    };


                                    plugin.element = function() {
                                        return $element;
                                    };

                                    plugin.moduleRoot = function() {
                                        var $moduleRoot = $element.filter('[data-box-module-name]');
                                        if($moduleRoot.size() === 0) {
                                            $moduleRoot = $element.find('[data-box-module-name]');
                                        }

                                        return $moduleRoot;
                                    };

                                    var init_ran = false;

                                    var requiredFontsLoaded = new $.Deferred();
                                    if(options.requiredFonts instanceof Array && options.requiredFonts.length > 0) {
                                        requiredFontsLoaded = SNI.BOX.fontLoaded(options.requiredFonts);
                                    } else {
                                        requiredFontsLoaded.resolve();
                                    }

                                    var scriptDependencies = defaultScriptDependencies.slice(0);
                                    if(options.scriptDependencies instanceof Array && options.scriptDependencies.length > 0) {
                                        scriptDependencies = scriptDependencies.concat(options.scriptDependencies);
                                    }

                                    var urlPrefix = options.url === null ? null : getUrlPrefix(options.url);
                                    if(urlPrefix === null) {

                                        if(win['BOX_SERVER_S_API']) {
                                            urlPrefix = getUrlPrefix(win['BOX_SERVER_S_API']);
                                        } else {
                                            urlPrefix = getUrlPrefix(win.location.href);
                                        }
                                    }

                                    var crossDomain = options.url === null ? false : isCrossDomain(options.url);

                                    var ajaxDataType = toAjaxDataType(options.dataType, crossDomain);
                                    var ajaxResultType = toAjaxResultType(options.dataType, crossDomain);

                                    var requestUrl = options.url;
                                    if(requestUrl !== null && options.sourceDataFormat === 'html') {

                                        var dataTypeQueryString = buildDataTypeQueryString(ajaxDataType, ajaxResultType);

                                        if(dataTypeQueryString.length > 0) {
                                            requestUrl += (options.url.indexOf('?') !== -1 ? '&' : '?');
                                            requestUrl += dataTypeQueryString;
                                        }
                                    }

                                    var loadPlugin = function($element, loadedDfd) {

                                        // marker class to make modules discoverable by embedded frames
                                        $element.addClass('mrb-module');
                                        $element.data('boxPlugin', plugin);
                                        $element.trigger('boxPluginBeginLoad', [plugin, options]);

                                        loadStyleDependencies(urlPrefix, options.styleDependencies);
                                        loadScriptDependencies(urlPrefix, scriptDependencies).then(function() {

                                            if((options.initData !== null && options.initData !== undefined) || options.url === undef || options.url === null) {

                                                if(typeof options.initData === 'object') {

                                                    requiredFontsLoaded.then(function() {

                                                        var renderCompleteDfd = new $.Deferred();

                                                        var $html = renderModule.apply($element, [options.initData, rendererList, plugin, options, renderCompleteDfd]);

                                                        if(plugin.options()['reRender'] === true) {

                                                            // do nothing, HTML was already rendered directly onto the $element

                                                        } else {
                                                            $element.html($html);
                                                        }

                                                        renderCompleteDfd.resolve();

                                                        firstRender = false;

                                                        if(init_ran === false) {
                                                            if(typeof initFunction === 'function') {
                                                                initFunction.apply($element, [plugin, options]);
                                                            }
                                                            init_ran = true;
                                                        }

                                                        $element.frame(frameOptions);

                                                        modifyFrame($element, ajaxDataType, ajaxResultType, options.sourceDataFormat, options.authSchemeName);


                                                        loadedDfd.resolve();

                                                    }).fail(function() {

                                                        CORE_DEBUG("Required fonts could not be loaded!");
                                                        loadedDfd.fail();
                                                    });
                                                }

                                            } else {

                                                if($element.hasClass(options.loadedClass) === false) {

                                                    var requestOptions = {
                                                        'cache': options.cache,
                                                        'jsonp': options.jsonp
                                                    };

                                                    if(options.jsonpCallback) {
                                                        requestOptions['jsonpCallback'] = options.jsonpCallback;
                                                    }

                                                    $.ajax($.extend(true, { }, requestOptions, {
                                                        'url': requestUrl,
                                                        'dataType': ajaxDataType,
                                                        'success': function(data) {

                                                            requiredFontsLoaded.then(function() {

                                                                var renderCompleteDfd = new $.Deferred();

                                                                var $html = renderModule.apply($element, [data, rendererList, plugin, options, renderCompleteDfd]);

                                                                if(plugin.options()['reRender'] === true) {

                                                                    // do nothing, HTML was already rendered directly onto the $element

                                                                } else {
                                                                    $element.html($html);
                                                                }

                                                                renderCompleteDfd.resolve();

                                                                firstRender = false;

                                                                if(init_ran === false) {
                                                                    if(typeof initFunction === 'function') {
                                                                        initFunction.apply($element, [plugin, options]);
                                                                    }
                                                                    init_ran = true;
                                                                }

                                                                $element.frame(frameOptions);

                                                                modifyFrame($element, ajaxDataType, ajaxResultType, options.sourceDataFormat, options.authSchemeName);


                                                                loadedDfd.resolve();

                                                            }).fail(function() {

                                                                CORE_DEBUG("Required fonts could not be loaded!");
                                                                loadedDfd.fail();
                                                            });

                                                        }, 'error': function() {

                                                            CORE_DEBUG("ERROR: ajax call to module data URL failed");

                                                            loadedDfd.fail();
                                                        }
                                                    }));
                                                } else {

                                                    requiredFontsLoaded.then(function() {

                                                        var renderCompleteDfd = new $.Deferred();

                                                        if(rendererList.length > 0) {

                                                            applyRendererList.apply($element, [$element, options.initData, rendererList, plugin, options, renderCompleteDfd]);
                                                        }

                                                        renderCompleteDfd.resolve();

                                                        firstRender = false;

                                                        if(init_ran === false) {
                                                            if(typeof initFunction === 'function') {
                                                                initFunction.apply($element, [plugin, options]);
                                                            }
                                                            init_ran = true;
                                                        }

                                                        $element.frame(frameOptions);

                                                        modifyFrame($element, ajaxDataType, ajaxResultType, options.sourceDataFormat, options.authSchemeName);

                                                        loadedDfd.resolve();
                                                    }).fail(function() {

                                                        CORE_DEBUG("Required fonts could not be loaded!");
                                                        loadedDfd.fail();
                                                    });
                                                }
                                            }
                                        }); // loadScriptDependencies.then
                                    }; // loadPlugin

                                    var loading = false,
                                        popupReady;

                                    // if the plugin is a popup, $element will get swapped out!
                                    if(options.isPopup === true) {

                                        CORE_DEBUG("adding popup functionality");

                                        var $popup = $('<div />');
                                        var $source = null;

                                        CORE_DEBUG("original $element before moving into popup: ", $element);
                                        if($element.hasClass(options.loadedClass) === false) {
                                            $source = $element;
                                            $element = $('<div />');
                                        }
                                        $popup.append($element);

                                        CORE_DEBUG("moving $element into popup: ", $element);

                                        $(document.body).append($popup);

                                        CORE_DEBUG("piping plugin.dfd()");

                                        popupReady = plugin.dfd().pipe(function() {

                                            CORE_DEBUG("inside the pipe with popupOptions: ", options.popupOptions);
                                            if(options.popupOptions.name !== undef) {
                                                $element.attr('name', options.popupOptions.name);
                                            }

                                            $element.popup(options.popupOptions);
                                            $element.popup('source', $source);
                                            $popup.remove();
                                            CORE_DEBUG("setting popup source to", $source);
                                        });

                                        plugin.open = function($source, event) {

                                            CORE_DEBUG("calling plugin.open");
                                            if(loading === false) {
                                                loading = true;
                                                loadPlugin($element, loadedDfd);
                                                popupReady.then(function() {
                                                    CORE_DEBUG("opening popup from plugin.open");
                                                    $element.trigger('open.popup');
                                                });
                                            } else {
                                                CORE_DEBUG("opening popup from plugin.open (direct)");
                                                $element.trigger('open.popup');
                                                if($source !== undef) {
                                                    $element.popup('source', $element, event);
                                                }
                                            }
                                        };

                                        plugin.close = function() {

                                            if(popupReady.isResolved()) {
                                                $element.trigger('close.popup');
                                            }
                                        };
                                        if($source !== null){
                                            $source.on('click', function(e) {
                                                e.preventDefault();
                                                plugin.open();
                                            });
                                        }
                                    }

                                    $element.on('click', '[data-action]', function(event) {
                                        var $el = $(this);
                                        var action = $el.attr('data-action');

                                        if(action !== undef && action.length > 0) {

                                            event.preventDefault();
                                            event.stopPropagation();

                                            var $target = $el.parent().closest('[itemscope]');
                                            var targetJson = { };

                                            if($element.is($target) || $.contains($element[0], $target[0])) {
                                                targetJson = schemaToJson($target);
                                            }

                                            var actionData = $el.data('actionData');

                                            CORE_DEBUG("Triggering action: " + action + " on ", $target);

                                            plugin.trigger(action, actionData, targetJson, $el);
                                            $target.trigger(action, [actionData, targetJson, $el]);
                                        }
                                    });

                                    if(options.isPopup === true) {

                                        if(options.startOpen === true) {

                                            CORE_DEBUG("found startOpen === true");
                                            loading = true;
                                            loadPlugin($element, loadedDfd);
                                            popupReady.then(function() {
                                                CORE_DEBUG("opening popup");
                                                $element.trigger('open.popup');
                                            });
                                        }

                                    } else {

                                        CORE_DEBUG("skipping popup functionality");
                                        loadPlugin($element, loadedDfd);
                                    }
                                }); // $.plugin

                                newPlugin.addRenderer = function() {

                                    RENDER_DEBUG("RENDER: adding renderer:", arguments);

                                    var renderer = { };
                                    if(typeof arguments[0] === 'function') {

                                        renderer.callback = arguments[0];

                                    } else if(typeof arguments[1] === 'function') {

                                        renderer.type = arguments[0];
                                        renderer.callback = arguments[1];

                                    } else if(typeof arguments[2] === 'function') {

                                        renderer.type = arguments[0];
                                        renderer.prop = arguments[1];
                                        renderer.callback = arguments[2];
                                    } else {
                                        throw new Error("Syntax error.  Usage: addRenderer([type,] [prop,] callback)");
                                    }

                                    rendererList.push(renderer);
                                };

                                // add responsive breakpoints for smart-phone and tablet to all modules
                                newPlugin.addRenderer(function(data, plugin, options) {

                                    var $module = $(this).filter('[data-box-module-name]').add($(this).find('[data-box-module-name]'));

                                    $module.each(function() {
                                        if($module.hasClass(win.SNI.BOX.RESPONSIVE_CLASS) === false) {
                                            $module.addClass(win.SNI.BOX.RESPONSIVE_CLASS);
                                        }
                                    });

                                    if(win.SNI.BOX.getElementQuery('mrb-smart-phone') === undef) {
                                        win.SNI.BOX.addElementQuery('mrb-smart-phone', 'media(this-max-width:768px)');
                                    }

                                    if(SNI.BOX.getElementQuery('mrb-tablet') === undef) {
                                        win.SNI.BOX.addElementQuery('mrb-tablet', 'media(this-min-width: 768px && this-max-width: 1024px)');
                                    }
                                });

                                // TODO: lives TBD ?
                                // this needs to run BEFORE the two subsequent event-generating renderers
                                // because popping the modal every time conflicts with the CloseModalEvent
                                newPlugin.addRenderer(function(data, plugin, options, renderCompleteDfd) {

                                    renderCompleteDfd.then(function() {

                                        plugin.dfd().then(function() {

                                            var start = new Date();
                                            if(options.isModal === true) {

                                                if($.fn['modal'] !== undef) {

                                                    var $modalWrapper = $('#box-modal-container');


                                                    if($modalWrapper.size() === 0) {
                                                        $modalWrapper = $('<div />', {
                                                            'id': 'box-modal-container',
                                                            'class': 'modal'
                                                        });
                                                        $('body').append($modalWrapper);
                                                    }

                                                    // if the $modalWrapper isn't a direct child of the body, it needs to be moved
                                                    if($modalWrapper.parent().is('body') === false) {
                                                        $('body').append($modalWrapper);
                                                    }

                                                    if(options.addModalContainer === false) {

                                                        // safely detach the plugin, its data, and its events before emptying the modal
                                                        if(!$.contains($modalWrapper[0], plugin.element()[0])) {
                                                            plugin.element().detach();
                                                            $modalWrapper.empty();
                                                            $modalWrapper.append(plugin.element());
                                                        }

                                                    } else {

                                                        var modalSizeClass = options.modalSize ? options.modalSize : 'modal-md';

                                                        var $modalContent = $modalWrapper.find('.modal-content');
                                                        if($modalContent.size() === 0) {
                                                            var $modalDialog = $('<div />', {
                                                                'class' : 'modal-dialog '+modalSizeClass
                                                            });

                                                            $modalContent = $('<div />', {
                                                                'class': 'modal-content'
                                                            });
                                                            $modalWrapper.append($modalDialog);
                                                            $modalDialog.append($modalContent);
                                                        } else {
                                                            $modalDialog = $modalContent.parent();
                                                            $modalDialog.removeClass();
                                                            //$modalDialog.removeClass('modal-sm');
                                                            //$modalDialog.removeClass('modal-lg');
                                                            $modalDialog.addClass('modal-dialog');
                                                            $modalDialog.addClass(modalSizeClass);
                                                        }

                                                        // might be some hangers-on that need to be removed
                                                        $modalWrapper.children().not($modalDialog).remove();

                                                        // safely detach the plugin, its data, and its events before emptying the modal
                                                        if(!$.contains($modalContent[0], plugin.element()[0])) {
                                                            plugin.element().detach();
                                                            $modalContent.empty();
                                                            $modalContent.append(plugin.element());
                                                        }

                                                        var $modalClose = $modalContent.find('.modal-close');
                                                        if($modalClose.size() === 0) {
                                                            $modalClose = $('<div />', {
                                                                'class': 'modal-close'
                                                            });
                                                        }

                                                        if($modalWrapper.nextAll('.modal').size() > 0) {
                                                            $('body').append($modalWrapper);
                                                        }
                                                    }

                                                    $modalWrapper.modal('show');
                                                    var bootstrapModalPlugin = $modalWrapper.data('bs.modal');
                                                    CORE_DEBUG("backdrop: ", bootstrapModalPlugin.$backdrop);
                                                    var $modalBackdrop = bootstrapModalPlugin.$backdrop;
                                                    $modalBackdrop.attr('id', 'box-modal-backdrop');
                                                    var $backdropPlaceholder = $('<div/>', {'id': 'backdrop-placeholder'});
                                                    $backdropPlaceholder.insertBefore($modalBackdrop);
                                                    $modalWrapper.one('hide.bs.modal', function() {
                                                        CORE_DEBUG("heard hide.bs.modal");
                                                        if($backdropPlaceholder.size() > 0) {
                                                            $modalBackdrop.insertAfter($backdropPlaceholder);
                                                            $backdropPlaceholder.remove();
                                                        }
                                                    });
                                                    $modalBackdrop.insertBefore($modalWrapper);

                                                    var $firstModalChild = $modalWrapper.children().first();
                                                    var modalHeight = $firstModalChild.height(),
                                                        browserHeight = win.innerHeight;
                                                    $firstModalChild.css({'margin-top' : modalHeight >= browserHeight || win.SNI.BOX.Util.isMobile() === true ? 0 : (browserHeight - modalHeight)/2});


                                                } else {
                                                    CORE_DEBUG("Could not find $.fn.modal!");
                                                }
                                            }

                                            EXECUTION_DEBUG("modal renderer took: " + ((new Date()) - start) + " ms");

                                        });
                                    });
                                });

                                newPlugin.addRenderer(function(data, plugin, options, renderCompleteDfd) {

                                    plugin.dfd().then(function() {

                                        renderCompleteDfd.then(function() {

                                            var start = new Date();

                                            if(data !== null && typeof data === 'object' && typeof data['events'] === 'object' && Array.isArray(data['events'])) {
                                                var i;

                                                for(i = 0; i < data['events'].length; i += 1) {

                                                    var event = data['events'][i];

                                                    var eventName = event['name'];
                                                    var eventData = event['data'];

                                                    CORE_DEBUG("Triggering event [" + eventName + "], on: ", plugin.element(), ", data: ", eventData);

                                                    try {
                                                        plugin.element().trigger(eventName, [eventData])
                                                    } catch (e) {
                                                        CORE_DEBUG("Caught exception while triggering event: ", e);
                                                    }
                                                }
                                            }

                                            EXECUTION_DEBUG("ajax event renderer took: " + ((new Date()) - start) + " ms");
                                        });
                                    });
                                });

                                newPlugin.addRenderer("com.scrippsnetworks.box.Event", function(data, plugin, options, renderCompleteDfd) {

                                    var $this = $(this);

                                    plugin.dfd().then(function() {

                                        renderCompleteDfd.then(function() {

                                            var start = new Date();

                                            if(data !== undef && Array.isArray(data)) {

                                                var i;

                                                for(i = 0; i < data.length; i += 1) {
                                                    var props = data[i]['properties'];

                                                    var eventName = props['name'][0];
                                                    var eventData;
                                                    if(props['data'] && typeof props['data'][0] === 'string') {

                                                        eventData = JSON.parse($('<div />').html(props['data'][0]).text());
                                                    }

                                                    var isError = false;
                                                    if(Array.isArray(props['errors'])) {
                                                        isError = props['errors'][0].length > 0;
                                                    }

                                                    // TODO: convert errors into modified event names to capture failures on the front end
                                                    //                                        eventName = eventName + "." + (isError ? "error" : "success");

                                                    CORE_DEBUG("Triggering event [" + eventName + "], on: ", $this, ", data: ", eventData);

                                                    try {
                                                        $this.trigger(eventName, [eventData])
                                                    } catch (e) {
                                                        CORE_DEBUG("Caught exception while triggering event: ", e);
                                                    }
                                                }
                                            }

                                            EXECUTION_DEBUG("schema event renderer took: " + ((new Date()) - start) + " ms");
                                        });
                                    });
                                });

                                // default module renderer, add style class to all modules
                                newPlugin.addRenderer(function(data, plugin, options) {

                                    var MRB_STYLE_CLASS = "mrb-style";
                                    var $module = $(this);
                                    if($module.parent().closest('.' + MRB_STYLE_CLASS).size() === 0) {
                                        $module.addClass(MRB_STYLE_CLASS);
                                    }
                                });

                                return newPlugin;
                            }
                        }
                    });

                    //TODO: Move this somewhere central to photo box
                    $(function() {
                        $('body')
                            .on('redirect', function (e, data){
                                CORE_DEBUG("entering handler for [redirect]");
                                win.location = data['url'];
                            })
                            .on('closeModal', function() {
                                var $modal = $('#box-modal-container');
                                CORE_DEBUG("module.js: closing modal");
                                $modal.modal('hide');
                            })
                            .on('alertMessage', function(e, data) {
                                win.SNI.BOX.Util.alert(data);
                            });
                    });

                })(win.SNI.BOX.jQuery);

            };

            var boxContext = new EnvironmentContext('boxContextLoaded', function(callback) {
                callback.call(null, SNI.BOX.jQuery);
            });

            // this method returns true if the required version of jQuery already exists on the page
            var jQuery_undefined = win.jQuery === undef;
            var jQuery_exists = !jQuery_undefined;

            if(jQuery_exists) {

                var jQuery_version = win.jQuery.fn.jquery;

                CORE_DEBUG("Found jQuery version " + jQuery_version);
                var version_parts = jQuery_version.split('.');
                var major = parseInt(version_parts[0], 10);
                var minor = parseInt(version_parts[1], 10);
                var fix = version_parts.length > 2 ? parseInt(version_parts[2], 10) : 0;

                // require jQuery 1.8 or higher
                jQuery_exists = major === 1 && minor === 8 && fix === 3;
            }

            if(jQuery_exists === false) {

                $LAB
                    .script('//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js')
                    .wait(function() {

                        jQuery.extend(true, win.SNI, {

                            'BOX': {
                                'jQuery': win.jQuery
                            }
                        });

                        if(jQuery_undefined === false) {
                            CORE_DEBUG("jQuery was defined, executing noConflict");
                            win.jQuery.noConflict(true);
                        } else {
                            CORE_DEBUG("jQuery was undefined");
                        }

                        CORE_DEBUG("Loaded jQuery version: " + win.SNI.BOX.jQuery.fn.jquery);
                        CORE_DEBUG("window.jQuery version is: " + win.jQuery.fn.jquery);

                        CORE_DEBUG("calling loadApp");
                        loadApp();
                        boxContext.setContextLoaded();
                    });

            } else {

                jQuery.extend(true, win.SNI, {
                    'BOX': {
                        'jQuery': win.jQuery
                    }
                });

                CORE_DEBUG("Used existing jQuery version: " + win.SNI.BOX.jQuery.fn.jquery);
                CORE_DEBUG("window.jQuery version is: " + win.jQuery.fn.jquery);

                loadApp();
                boxContext.setContextLoaded();
            }

        })(win.SNI.BOX.$LAB);

    } else {

        SNI.BOX.DEBUG("LAB.js script loader could not be found!");
    }
})(window, undefined);
(function(win, undef) {

    win.boxContextLoaded(function(jQuery) {
        var $ = jQuery;

        // depends on:
        //      env-context.js
        //      debug.js

        var AUTH_SCOPE = "AUTH";
        var AUTH_DEBUG = SNI.BOX.DEBUG.forScope(AUTH_SCOPE);

        var schemes = { };
        var orderedSchemes = [];

        var loginThenOptions = null;

        win.SNI = win.SNI || { };
        win.SNI.BOX = win.SNI.BOX || { };
        win.SNI.BOX.AUTH = win.SNI.BOX.AUTH || { };
        win.SNI.BOX.AUTH.EVENTS = {
            'LOGIN' : 'login',
            'LOGOUT' : 'logout'
        };

        win.SNI.BOX.AUTH.registerAuthenticationScheme = function(name, authScheme) {

            if(name === undefined) {
                throw new Error("Authentication Scheme registration requires a name!");
            }

            if(authScheme === undefined) {
                throw new Error("Authentication Scheme registration requires a scheme object!");
            }

            if(schemes[name] !== undefined) {
                throw new Error("Authentication Scheme \"" + name + "\" is already registered!");
            }

            if(typeof authScheme['isAuthenticated'] !== 'function') {
                throw new Error("Authentication Scheme object property \"isAuthenticated\" is required!");
            }

            if(typeof authScheme['requireLogin'] !== 'function') {
                throw new Error("Authentication Scheme object property \"requireLogin\" is required!");
            }

            if(typeof authScheme['onLogin'] !== 'function') {
                throw new Error("Authentication Scheme object property \"onLogin\" is required!");
            }

            if(typeof authScheme['isReady'] !== 'function') {
                throw new Error("Authentication Scheme object property \"isReady\" is required!");
            }

            if(typeof authScheme['signUrl'] === 'function' && typeof authScheme['unSignUrl'] !== 'function') {
                throw new Error("Authentication Scheme must contain unSignUrl support if signUrl support is provided!");
            }

            orderedSchemes.push(name);

            schemes[name] = { };

            schemes[name]['getName'] = function() {
                return name;
            };

            AUTH_DEBUG("mapping (required) isAuthenticated method for scheme: " + name);

            // bind the scheme object to "this"
            schemes[name]['isAuthenticated'] = authScheme['isAuthenticated'].bind(schemes[name]);

            AUTH_DEBUG("wrapping (required) requireLogin method for scheme: " + name);
            schemes[name]['requireLogin'] = function(thenOptions) {

                // requiring the login process again through this trigger causes the global "loginThenOptions" to be overwritten,
                // preventing accidental triggering of other instances from which required login process has been cancelled.
                loginThenOptions = thenOptions || null;

                AUTH_DEBUG("calling (required) requireLogin method for scheme: " + name);
                // pass the scheme object as "this"
                authScheme['requireLogin'].apply(schemes[name], arguments);

                return schemes[name];
            };

            AUTH_DEBUG("defining new EnvironmentContext for scheme: " + name);
            var authContext = new EnvironmentContext('authContextLoaded_' + name);

            AUTH_DEBUG("assigning win.authContextLoaded_" + name + " callback to onReady for scheme: " + name);
            schemes[name]['onReady'] = function(callback) {

                // bind the scheme object to "this"
                win['authContextLoaded_' + name](callback.bind(schemes[name]));
                return schemes[name];
            };

            var beforeLoginCallbacks = [];
            schemes[name]['beforeLogin'] = function(callback) {
                AUTH_DEBUG("registering beforeLogin handler");
                beforeLoginCallbacks.push(callback.bind(schemes[name]));
                return schemes[name];
            };

            var beforeLogoutCallbacks = [];
            schemes[name]['beforeLogout'] = function(callback) {
                AUTH_DEBUG("registering beforeLogout handler");
                beforeLogoutCallbacks.push(callback.bind(schemes[name]));
                return schemes[name];
            };

            var doLogin = function(data) {
                var i,
                    result,
                    resultList = [];

                AUTH_DEBUG("executing beforeLogin callbacks");
                for(i = 0; i < beforeLoginCallbacks.length; i++) {
                    result = beforeLoginCallbacks[i](data, loginThenOptions);
                    if(typeof result === 'object') {
                        resultList.push(result);
                    }
                }

                if(resultList.length > 0) {
                    AUTH_DEBUG("waiting for " + resultList.length + " beforeLogin callbacks to finish");
                }

                $.when.apply(null, resultList).then(function() {
                    AUTH_DEBUG("triggering login event with parameters:", [data, loginThenOptions]);
                    $(schemes[name]).trigger(SNI.BOX.AUTH.EVENTS.LOGIN, [data, loginThenOptions]);
                });
            };

            var doLogout = function(data) {

                var i,
                    result,
                    resultList = [];

                AUTH_DEBUG("executing beforeLogout callbacks");
                for (i = 0; i < beforeLogoutCallbacks.length; i++) {
                    result = beforeLogoutCallbacks[i](data, loginThenOptions);
                    if (typeof result === 'object') {
                        resultList.push(result);
                    }
                }

                if (resultList.length > 0) {
                    AUTH_DEBUG("waiting for " + resultList.length + " beforeLogout callbacks to finish");
                }

                $.when.apply(null, resultList).then(function () {
                    AUTH_DEBUG("triggering logout event with parameters:", data);
                    $(schemes[name]).trigger(SNI.BOX.AUTH.EVENTS.LOGOUT, [data]);
                });
            };

            schemes[name]['onReady'](function() {

                AUTH_DEBUG("registering (required) onLogin handler for scheme: " + name);
                authScheme['onLogin'](doLogin);

                AUTH_DEBUG("assigning logout event trigger to onLogout callback for scheme: " + name);

                if(typeof authScheme['onLogout'] === 'function') {
                    authScheme['onLogout'](doLogout);
                } else {
                    AUTH_DEBUG("logout event not supported by scheme: " + name);
                }
            });

            if(typeof authScheme['signUrl'] === 'function') {
                AUTH_DEBUG("mapping (optional) signUrl method for scheme: " + name);
                // bind the scheme object to "this"
                schemes[name]['signUrl'] = authScheme['signUrl'].bind(schemes[name]);
            } else {
                schemes[name]['signUrl'] = function(url) { return url; }
            }

            if(typeof authScheme['unSignUrl'] === 'function') {
                AUTH_DEBUG("mapping (optional) unSignUrl method for scheme: " + name);
                schemes[name]['unSignUrl'] = authScheme['unSignUrl'];
            } else {
                schemes[name]['unSignUrl'] = function(url) { return url; }
            }

            if(authScheme['isReady']() === true) {
                AUTH_DEBUG(name + " scheme is ready (before scheme init), setting context loaded without delay");
                authContext.setContextLoaded();
            } else {
                var start = new Date();
                var readyCheck = win.setInterval(function() {
                    if(authScheme['isReady']() === true) {
                        AUTH_DEBUG(name + " scheme is ready (after scheme init), setting context loaded after delay: " + ((+ new Date()) - start) + " ms");
                        authContext.setContextLoaded();
                        clearInterval(readyCheck);
                    }
                }, 30);
            }

            return schemes[name];
        };

        win.SNI.BOX.AUTH.getFirstScheme = function() {

            return orderedSchemes.length > 0 ? schemes[orderedSchemes[0]] : null;
        };

        win.SNI.BOX.AUTH.getSchemeByName = function(name) {

            if(!name) {
                return null;
            }

            return typeof schemes[name] === 'object' ? schemes[name] : null;
        };

        $(document).on('click','.box-login-hook',function(e) {

            var $hook = $(this);

            var schemeName = $hook.data('authScheme');

            var authScheme = null;

            if(schemeName) {
                authScheme = SNI.BOX.AUTH.getSchemeByName(schemeName);
            }

            if(authScheme === null) {
                authScheme = SNI.BOX.AUTH.getFirstScheme();
            }

            if(authScheme === null) {
                AUTH_DEBUG("No auth scheme found!  Aborting auth scheme handling!");
                return;
            }

            e.preventDefault();

            authScheme.requireLogin($hook.data('loginOptions'));
        });
    });

})(window, undefined);
(function() {

    var LOADING_CLASS = "box-loading";
    var LOADED_CLASS = "box-loaded";

    var idCount = 0;

    var moduleContextCount = 0;

    var requestCache = {};

    var DEBUG = SNI.BOX.DEBUG.forScope("INIT");
    
    window.SNI = window.SNI || { };

    window.SNI.BOX = window.SNI.BOX || { };

    window.SNI.BOX.init = function(context) {

        window.boxContextLoaded(function(jQuery) {

            DEBUG("SNI.BOX.init()!");

            var $ = jQuery;

            if(typeof window['BOX_SERVER_HOST'] === 'undefined') {
                DEBUG("Cannot initialize, no window.BOX_SERVER_HOST is defined");
                return;
            }

            if(typeof window['BOX_SERVER_S_API'] === 'undefined') {
                DEBUG("Cannot initialize, no window.BOX_SERVER_S_API is defined");
                return;
            }

            var $context = $('body');
            if(context && $(context).size() > 0) {
                $context = $(context);
            }

            /* $containers are "module containers", places we want to install a module we're loading */
            var $containers = $context.find('[data-box-id]').not("." + LOADING_CLASS).not("." + LOADED_CLASS)
                .add($context.filter('[data-box-id]').not("." + LOADING_CLASS).not("." + LOADED_CLASS));

            if($containers.size() === 0) {

                DEBUG("SNI.BOX.init(): No Containers!");
                return;
            }

            var uniqueContainerParamsByModuleId = { };
            var uniqueContainersByModuleId = {};
            var loadingQueue = [];
                        
            $containers.each(function() {

                var $container = $(this);

                var moduleId = $container.data('boxId');

                idCount++;

                $container.attr('id', moduleId + "_" + idCount);

                if(typeof moduleId === 'string') {

                    // add loading class to container
                    $container.addClass(LOADING_CLASS);

                    // add container to loading queue
                    loadingQueue.push($container);


                    if(typeof uniqueContainerParamsByModuleId[moduleId] === 'undefined') {
                        uniqueContainerParamsByModuleId[moduleId] = []; // initialize new parameter array
                        uniqueContainersByModuleId[moduleId] = []; // initialize new parameter array
                    }
                    
                    uniqueContainersByModuleId[moduleId].push($container[0]);
                    
                    var params = $(this).data('boxParams');

                    if(typeof params === 'object') {
                        uniqueContainerParamsByModuleId[moduleId].push(params);
                    } else {
                        uniqueContainerParamsByModuleId[moduleId].push({ });
                    }
                }
            });

            DEBUG("SNI.BOX.init(): uniqueContainers", uniqueContainerParamsByModuleId);

            var uniqueModuleIds = getUniqueModuleIds(uniqueContainerParamsByModuleId);
            if(uniqueModuleIds.length === 0) { return; }

            var newModuleIds = [];
            for (var i = 0; i < uniqueModuleIds.length; i++) {
            	var currentModuleId = uniqueModuleIds[i];
            	if (typeof requestCache[currentModuleId] === 'undefined') { // this is a new id
            		requestCache[currentModuleId] = {
            				'boxId': currentModuleId,
            				'deferred': new $.Deferred()
            		};
            		newModuleIds.push(currentModuleId); // Keep a list so we know which ones to make an ajax call for
            	}

                var initDataHandler = (function(boxId, $context, containers) {
                    // here we want to call the actual handler for data
                    return function() {
                        window.SNI.BOX.initDataHandler(boxId, $context, containers);
                    };
                })(currentModuleId, $context, uniqueContainersByModuleId[currentModuleId]);

            	requestCache[currentModuleId]['deferred'].done(initDataHandler);
            }
            
            if(newModuleIds.length === 0) { return; }
            
            var queryParams = newModuleIds.map(function(id) { return 'id=' + id; });
            queryParams.push('host=' + SNI.BOX.Util.getHost(window['BOX_SERVER_HOST']));
            var queryString = queryParams.join('&');

            (function(url) {
                $.ajax({
                    'url': url,
                    'dataType': 'jsonp',
                    'jsonp': '_callback',
                    'cache': true,
                    'jsonpCallback': 'window_SNI_BOX_initCallback',
                    'error': function(jqXHR, textStatus, errorThrown ) {
                        for (var i = 0; i < newModuleIds.length; i++) {
                    		requestCache[uniqueModuleIds[i]]['deferred'].reject();
                    		DEBUG("Failed to aquire syndication information for box-id [" + uniqueModuleIds[i] + "]");
                        }
                        DEBUG("Error [textStatus=" + textStatus + "] [errorThrown=" + errorThrown + "]");
                    }
                });

            })(window['BOX_SERVER_S_API'] + '?' + queryString);
        });
    };

    var getUniqueModuleIds = function(containers) {
    	var uniqueBoxIds = [];
        var i;
        for(i in containers) {
            if(containers.hasOwnProperty(i)) {
            	uniqueBoxIds.push(i);
            }
        }
        
        return uniqueBoxIds;
    };
    
    /*
     * Takes a SyndicationFilter response and stores the containerId (boxId) specific information, for each
     * such id's data returned, in the requestCache. 
     * 
     * Yes, those are underscores, because dots are not valid in the callback name
     * http://bugs.jquery.com/ticket/12707 (Not a bug, according to the devs)
     */
    window_SNI_BOX_initCallback = function(data, textStatus, jqXHR) {
    	DEBUG("window_SNI_BOX_initCallback: Got data:", JSON.stringify(data));

        window.boxContextLoaded(function(jQuery) {
            var $ = jQuery;

            var index,
                thisId;

            if(typeof data !== 'object') {
                // TODO: notify the deferred that it failed
                //       we don't have the list of box-ids that this callback was called for... so is there even a way to do that?
                throw new Error("invalid response data");
            }

            for(index=0; index < data['containerIds'].length; index++) {
                thisId = data['containerIds'][index];
                requestCache[thisId]['data'] = data[thisId];
                requestCache[thisId]['boxHost'] = data['boxHost'];
                requestCache[thisId]['boxApiUrlPrefix'] = data['boxApiUrlPrefix'];
                requestCache[thisId]['deferred'].resolve();
            }
            for(index=0; index < data['alsoLoadedModuleIds'].length; index++) {

                thisId = data['alsoLoadedModuleIds'][index];
                if (typeof requestCache[thisId] === 'undefined') {
                    requestCache[thisId] = {
                            'boxId': thisId,
                            'deferred': new $.Deferred()
                    };
                }
                requestCache[thisId]['data'] = data[thisId];
                requestCache[thisId]['boxHost'] = data['boxHost'];
                requestCache[thisId]['boxApiUrlPrefix'] = data['boxApiUrlPrefix'];
                requestCache[thisId]['deferred'].resolve();
            }

        });
    };

    /*
     * Handles applying the code necessary to enable the initialize syndicated modules into containers
     * Inputs:
     *     moduleId - The id of the module that we're installing
     *     $context - jQuery node of the page context (generally 'body' that the containers lived on when we found them
     *     containers - array of DOM nodes (module containers) that we want to initialize
     */
    window.SNI.BOX.initDataHandler = function(moduleId, $context, containers) {
    	DEBUG("Handling data for box-id [" + moduleId + "] -> ", requestCache[moduleId]['data']);

        window.boxContextLoaded(function(jQuery) {

            var $ = jQuery;
    	
            var data = requestCache[moduleId]['data'];
            var boxHost = requestCache[moduleId]['boxHost'];
            var boxApiUrlPrefix = requestCache[moduleId]['boxApiUrlPrefix'];
            var $containers = $(containers);

            var synchronizedContext = new EnvironmentContext("moduleContext_" + moduleId + "_" + moduleContextCount);
            var synchronizedDfdList = [];

            // created another module context, increment the counter
            moduleContextCount += 1;

            DEBUG("Containers (" + $containers.size() + ")");

            $containers.each(function() {
                var $container = $(this);

                DEBUG("Handling container: ", $container);

                if($container.hasClass(LOADED_CLASS)) {
                    DEBUG("Module container already loaded: ", $container);
                    return;
                }

                var boxParams = $container.data('boxParams');
                if(boxParams === undefined) {
                    boxParams = { };
                }

                var preLoad = $container.data('boxPreload');

                var id = $container.attr('id');

                for(var j = 0; j < data['modules'].length; j ++) {
                    var moduleData = data['modules'][j];
                    var moduleIdIndexed = id + '_' + j;
                    var $module = $('<div />', {
                        'id': moduleIdIndexed
                    });

                    var isPublic = moduleData['isPublic'] === true;

                    $container.append($module);

                    var requestUrl = moduleData['params']['url'];

                    for(var k in boxParams) {
                        if(boxParams.hasOwnProperty(k) && typeof boxParams[k] !== 'object') {
                            requestUrl = SNI.BOX.Util.appendParam(requestUrl, k, boxParams[k]);
                        }
                    }

                    if(isPublic === true) {
                        requestUrl = SNI.BOX.Util.appendParam(requestUrl, "host", SNI.BOX.Util.getHost(boxHost));
                    }

                    if(isPublic !== true && SNI.BOX.Util.isCrossDomain(requestUrl)) {

                        var authScheme = SNI.BOX.AUTH.getSchemeByName(boxParams['authSchemeName']);

                        if(authScheme !== null) {
                            requestUrl = authScheme.signUrl(requestUrl);
                        }
                    }

                    var moduleParams = $.extend(true, {
                            'boxHost': boxHost,
                            'boxApiUrlPrefix': boxApiUrlPrefix
                        },
                        moduleData['params'],
                        boxParams,
                        {
                            'url': requestUrl,
                            'synchronizedContext': synchronizedContext
                        }
                    );

                    var assetPrefix = SNI.BOX.Util.getUrlPrefix(window['BOX_SERVER_S_API']);

                    var $syncDfd = new $.Deferred();
                    synchronizedDfdList.push($syncDfd);

                    var goAutoRun = (function(moduleElement, moduleName, moduleClass, moduleParams, preLoad, $syncDfd) {

                        return function() {
                            DEBUG("SNI.BOX.autoRun params: ", moduleElement, moduleName, moduleClass, moduleParams, preLoad, $syncDfd);

                            if(!preLoad) {

                                $(moduleElement).parent().one('box.sync_' + moduleElement.id, function() {

                                    DEBUG("Heard box.sync, resolving $syncDfd for module", moduleElement);
                                    $syncDfd.resolve();
                                });


                                SNI.BOX.autoRun(moduleElement, moduleName, moduleClass, moduleParams);
                                $container.trigger('box.load', [moduleElement, moduleName, moduleClass, moduleParams, preLoad]);
                            }

                            $container.addClass(LOADED_CLASS).removeClass(LOADING_CLASS);
                        };

                    })($module[0], moduleData['moduleName'], moduleData['moduleClass'], moduleParams, preLoad, $syncDfd);

                    SNI.BOX.Util.loadStyles(assetPrefix, moduleData['params']['styleDependencies']);
                    SNI.BOX.Util.loadScripts(assetPrefix, moduleData['params']['scriptDependencies']).then(goAutoRun);
                }

            });

            $.when.apply(null, synchronizedDfdList).then(function() {

                DEBUG("all modules have been synchronized!");
                synchronizedContext.setContextLoaded();
            });


            /*
             * In order to enable this, we'll need to make sure that [registerModule] and [allModules]
             * are passed into this method, possibly via a struct that contains both to avoid multiple
             * added arguments ... or having registerModule be a function that can return it's data if no
             * arguments are supplied
             *
            var moduleName;

            for(moduleName in allModules) {
                if(allModules.hasOwnProperty(moduleName)) {

                    var dfdList = [];
                    for(i = 0; i < allModules[moduleName].length; i ++) {

                        var plugin = allModules[moduleName][i].data('boxPlugin');

                        if(plugin) {
                            dfdList.push(plugin.dfd());
                        }
                    }

                    (function($modules) {
                        $.when.apply(null, dfdList).pipe(function() {
                            DEBUG("all loaded");
                            $modules.trigger('box.allLoaded');
                        });
                    })($.fn.add.apply($(), allModules[moduleName]));
                }
            }

            $.when.apply(null, dfdList).pipe(function() { DEBUG("All script dependencies loaded.") } )
            */
        });
    };

    SNI.BOX.loadModule = function(boxId, boxParams, preLoad) {

        try {

            (function(boxId, boxParams) {

                window.boxContextLoaded(function(jQuery) {

                    var $ = jQuery;

                    var $module = $('<div />', {
                        'data-box-id': boxId,
                        'data-box-params': typeof boxParams === 'object' ? JSON.stringify(boxParams) : boxParams,
                        'data-box-preload': preLoad
                    });

                    $('body').append($module);
                });

            })(boxId, boxParams);

            SNI.BOX.init();

        } catch (e) {
            DEBUG("Caught error while in SNI.BOX.loadModule: ", e);
        }
    };
    
    // run init on document.ready
    window.boxContextLoaded(function(jQuery) {

        var $ = jQuery;

        $(document).on('click', '[data-box-target-id]', function(event) {

            event.preventDefault();
            var $trigger = $(this);

            DEBUG("Heard click event for [data-box-target-id]: " + $trigger.data('boxTargetId') + ", params: ", $trigger.attr('data-box-params'));

            SNI.BOX.loadModule($trigger.data('boxTargetId'), $trigger.attr('data-box-params'));

        });
    });
})();
window.boxContextLoaded(function(jQuery) {
    (function($) {

        var pluginIndex = 0;
        $.plugin = function(defaults, initFunction) {

            var pluginName = 'plugin' + pluginIndex;
            pluginIndex += 1;

            if (!initFunction) {
                initFunction = defaults;
            }

            return function(methodName) {
                var methodArgs = arguments;
                if (!methodName || typeof methodName === 'object') {
                    var $elements = $(this).filter(function() {
                        return !$(this).data(pluginName);
                    });

                    if ($elements.length > 0) {
                        var options = $.extend(true, { }, defaults, methodName);
                        $elements.each(function() {
                            var $element = $(this);
                            var bindFunction = function(type, handler) {
                                $.each(type.split(/\s+/), function(index, type) {
                                    $element.bind(pluginName + '_' + type, handler);
                                });
                            };
                            var dataFunction = function(attribute, value) {
                                var data = $element.data(pluginName + '_data');
                                if (!data) {
                                    data = { };
                                    $element.data(pluginName + '_data', data);
                                }
                                if (typeof value === 'undefined') {
                                    return data[attribute];
                                } else {
                                    data[attribute] = value;
                                }
                            };
                            var plugin = {
                                'data': dataFunction,
                                'bind': bindFunction,
                                'pluginName': pluginName,
                                'plugin': function() {
                                    return plugin;
                                },
                                'trigger': function(type, extra) {
                                    $element.trigger($.extend($.Event(pluginName + '_' + type), extra), [ plugin ]);
                                }
                            };
                            $element.data(pluginName, plugin);
                            if(options.events !== undefined) {
                                $.each(options.events, bindFunction);
                            }
                            plugin.isInitializing = true;
                            initFunction.apply(this, [ plugin, options ]);
                            plugin.trigger('initialized');
                            plugin.isInitializing = false;
                        });
                    }
                }

                var result;
                this.each(function() {
                    var plugin = $(this).data(pluginName);
                    if (plugin) {
                        var method = plugin[methodName];
                        if (method) {
                            if (typeof method === 'function') {
                                var newResult = method.apply(null, Array.prototype.slice.call(methodArgs, 1));
                                if (!result) {
                                    result = newResult;
                                }
                            } else if (!result) {
                                result = method;
                            }
                        }
                    }
                });

                return typeof result !== 'undefined' ? result : this;
            };
        };

    }(jQuery));
});
window.boxContextLoaded(function(jQuery) {
    (function($, win, undef) {

        var $win = $(win),
            doc = win.document;

        // Standard plugin structure.
        $.plugin2 = function(name, methods) {
            var CLASS_NAME= 'plugin-' + name,
                OPTIONS_DATA_KEY = name + '-options';

            methods._mergeOptions = function(options) {
                return $.extend(true, { }, this._defaultOptions, options);
            };

            methods.closestInit = function() {
                var $init = this.$caller.closest('.' + CLASS_NAME);
                return $init.length > 0 ? $init : $(doc);
            };

            methods.option = function(key, value) {
                var $init = this.closestInit(),
                    first;

                if (typeof key === 'undefined') {
                    first = $init[0];
                    return first ? $.data(first, OPTIONS_DATA_KEY) : null;

                } else if (typeof value === 'undefined') {
                    first = $init[0];
                    return first ? $.data(first, OPTIONS_DATA_KEY)[key] : null;

                } else {
                    $init.each(function() {
                        $.data(this, OPTIONS_DATA_KEY)[key] = value;
                    });
                    return this.$caller;
                }
            };

            methods.live = function(selector, options) {
                var plugin = this,
                    $caller = plugin.$caller;

                options = plugin._mergeOptions(options);

                if (plugin._init) {
                    plugin._init(selector, options);
                }

                $caller.onCreate(selector, function() {
                    var $element,
                        elementPlugin;

                    if (!$.data(this, OPTIONS_DATA_KEY)) {
                        $element = $(this);
                        elementPlugin = $.extend({ }, plugin, { '$caller': $element });

                        $.data(this, OPTIONS_DATA_KEY, options);
                        $element.addClass(CLASS_NAME);

                        if (elementPlugin._create) {
                            elementPlugin._create(this, options);
                        }
                    }
                });

                if (plugin._createAll) {
                    $caller.bind('create', function(event) {
                        plugin._createAll(event.target, selector, options);
                    });
                }

                return $caller;
            };

            methods.init = function(options) {
                return this.live(null, options);
            };

            $.fn[name] = function(method) {
                var plugin = $.extend({ }, methods, { '$caller': this });

                if (!method || typeof method === 'object') {
                    return plugin.init(method);
                }

                method = '' + method;

                if (method.substr(0, 1) !== '_' && plugin[method]) {
                    return plugin[method].apply(plugin, Array.prototype.slice.call(arguments, 1));

                } else {
                    return $.error('[' + method + '] method doesn\'t exist on [' + name + '] plugin!');
                }
            };
        };

// Runs the function and returns it instead of the result.
        $.run = function(runFunction) {
            runFunction();
            return runFunction;
        };

// Throttles the excution of a function to run at most every set interval.
        $.throttle = function(interval, throttledFunction) {
            var lastTrigger = 0,
                timeout,
                lastArguments;

            if (interval <= 0) {
                return throttledFunction;
            }

            return function() {
                var context,
                    now,
                    delay;

                lastArguments = arguments;

                if (timeout) {
                    return;
                }

                context = this;
                now = +new Date();
                delay = interval - now + lastTrigger;

                if (delay <= 0) {
                    lastTrigger = now;
                    throttledFunction.apply(context, lastArguments);

                } else {
                    timeout = setTimeout(function() {
                        lastTrigger = now;
                        timeout = null;
                        throttledFunction.apply(context, lastArguments);
                    }, delay);
                }
            };
        };

// Handles mouse dragging movements.
        (function() {
            var $dragCover,
                endDrag,
                $dragElement,
                startDrag,
                dragStartTimeout,
                startPageX,
                startPageY,
                lastPageX,
                lastPageY,
                dragMoveCallback,
                dragEndCallback;

            $dragCover = $('<div/>', {
                'css': {
                    'height': '100%',
                    'left': 0,
                    'position': 'fixed',
                    'top': 0,
                    'user-select': 'none',
                    'width': '100%',
                    'z-index': 1000000
                }
            });

            endDrag = function(event) {
                if (dragStartTimeout) {
                    clearTimeout(dragStartTimeout);
                    dragStartTimeout = null;
                }

                dragMoveCallback = null;

                $(doc.body).css('user-select', '');

                if ($dragElement) {
                    $dragElement.unbind('.drag');
                    $dragElement = null;
                }

                if (dragEndCallback) {
                    dragEndCallback(event);
                    dragEndCallback = null;
                }
            };

            $.drag = function(element, event, startCallback, moveCallback, endCallback) {
                var data;

                // Skip unless left click.
                if (event.which !== 1 ||
                    event.altKey ||
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey) {
                    return;
                }

                data = {
                    '$dragCover': $dragCover
                };

                // Reset in case we're in a bad state.
                endDrag(event);

                // Suppress native browser drag behaviors.
                $(doc.body).css('user-select', 'none');

                $dragElement = $(element);
                $dragElement.bind('dragstart.drag', function() {
                    return false;
                });

                startPageX = lastPageX = event.pageX;
                startPageY = lastPageY = event.pageY;

                startDrag = function() {
                    var drag = function() {
                        dragMoveCallback = function(event) {
                            return moveCallback.call(element, event, data);
                        };

                        dragEndCallback = function(event) {
                            return endCallback.call(element, event, data);
                        };

                        $(doc.body).append($dragCover);
                        startCallback.call(element, event, data);
                    };

                    if (event.dragImmediately) {
                        drag();

                    } else {
                        dragStartTimeout = setTimeout(function() {
                            var deltaX = lastPageX - startPageX,
                                deltaY = lastPageY - startPageY;

                            if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) < (event.dragDistance || 5)) {
                                startDrag();
                                return;
                            }

                            drag();
                        }, (event.dragDelay || 100));
                    }
                };

                startDrag();
            };

            $win.mousemove($.throttle(50, function(event) {
                if (dragStartTimeout) {
                    lastPageX = event.pageX;
                    lastPageY = event.pageY;
                }

                if (dragMoveCallback) {
                    dragMoveCallback(event);
                }
            }));

            $win.mouseup(function(event) {
                endDrag(event);
                $dragCover.remove();
            });
        }());

// Returns true if the element should be in fixed CSS position.
        $.fn.isFixedPosition = function() {
            var $parent = this,
                $newParent;

            while (true) {
                if ($parent.css('position') === 'fixed') {
                    return true;
                }

                $newParent = $parent.offsetParent();

                if ($parent.length === 0 || $parent[0] === $newParent[0]) {
                    break;

                } else {
                    $parent = $newParent;
                }
            }

            return false;
        };

// Returns an accurate CSS z-index, taking all the parents into account.
        $.fn.zIndex = function() {
            var zIndex;
            for (var $parent = this; $parent.length > 0; $parent = $parent.parent()) {
                try {
                    zIndex = parseInt($parent.css('z-index'), 10);
                } catch (error) {
                    break;
                }
                if (!isNaN(zIndex) && zIndex !== 0) {
                    break;
                }
            }
            return zIndex;
        };

// Patch $.fn.delegate to call $.fn.bind if called without a selector.
        (function() {
            var oldDelegate = $.fn.delegate;

            $.fn.delegate = function() {
                if (arguments[0]) {
                    return oldDelegate.apply(this, arguments);
                } else {
                    return $.fn.bind.apply(this, Array.prototype.slice.call(arguments, 1));
                }
            };
        }());

// Polyfill for HTML5 input event.
        (function() {
            var CHECK_INTERVAL_DATA = 'input-checkInterval';

            if (!('oninput' in doc.createElement('input'))) {
                $.event.special.input = {
                    'add': function(handleObject) {
                        var $root = $(this),
                            selector = handleObject.selector,
                            handler,
                            clearCheckInterval;

                        // Don't trigger the handler too often.
                        handler = $.throttle(50, function() {
                            $(this).trigger('input');
                        });

                        // The keyup event is pretty close to the input event...
                        $root.delegate(selector, 'keyup', function() {
                            setTimeout(handler, 0);
                        });

                        // Call the handler periodically for corners cases.
                        clearCheckInterval = function() {
                            var interval = $.data(this, CHECK_INTERVAL_DATA);

                            if (interval) {
                                clearInterval(interval);
                                $.removeData(this, CHECK_INTERVAL_DATA);
                            }
                        };

                        $root.delegate(selector, 'focus', function() {
                            clearCheckInterval.call(this);
                            $.data(this, CHECK_INTERVAL_DATA, setInterval(handler, 50));
                        });

                        $root.delegate(selector, 'blur', clearCheckInterval);
                    }
                };
            }
        }());

// Wrapper around document.elementFromPoint to make it easier to use.
        $.elementFromPoint = function(x, y) {
            var element = doc.elementFromPoint(x, y);

            if (element) {
                if (element.nodeType === 3) {
                    element = element.parentNode;
                }
                if (element) {
                    return $(element);
                }
            }

            return $();
        };

        $.fn.onCreate = function(selector, handler) {
            if (selector) {
                this.bind('create', function(event) {
                    $(event.target).find(selector).each(handler);
                });

            } else {
                this.each(handler);
            }
        };

        $.easing.easeOutBack = function (x, t, b, c, d, s) {
            if (s === undefined) {
                s = 1.70158;
            }
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        };

    }(jQuery, window));
});
window.boxContextLoaded(function(jQuery) {

    /** Inline popup. */
    (function($, win, undef) {

    var $win = $(win),
            doc = win.document;

    $.plugin2('popup', {
        '_defaultOptions': {
            'padding': {
                'left': 35,
                'right': 35,
                'top': 20
            }
        },

        '_create': function(element) {
            var $inner = $(element);
            var options = this.option();
            var $container = $('<div/>', { 'class': 'popup' });
            var $content = $('<div/>', { 'class': 'content' });
            var $closeButton = $('<div/>', { 'class': 'closeButton' });

            var name = $inner.attr('name');
            if (name) {
                $container.attr('name', name);
            }

            // Bind open and close events.
            $container.bind('open.popup', function() {
                var $original = $(this);
                var scrollLeft = $original.data('popup-scrollLeft');
                var scrollTop = $original.data('popup-scrollTop');
                if (typeof scrollLeft !== 'number' && typeof scrollTop !== 'number') {
                    $original.data('popup-scrollLeft', $win.scrollLeft());
                    $original.data('popup-scrollTop', $win.scrollTop());
                }
                $original.show();
            });

            $container.bind('restoreOriginalPosition.popup', function() {
                var $original = $(this);
                var scrollLeft = $original.data('popup-scrollLeft');
                var scrollTop = $original.data('popup-scrollTop');
                $original.removeData('popup-scrollLeft');
                $original.removeData('popup-scrollTop');
                if (typeof scrollLeft === 'number' && typeof scrollTop === 'number') {
                    $win.scrollLeft(scrollLeft);
                    $win.scrollTop(scrollTop);
                }
            });

            $container.bind('close.popup', function() {
                var $original = $(this);
                $original.hide();
                $('.popup').each(function() {
                    var $popup = $(this);
                    var $source = $popup.popup('source');
                    if ($source && $.contains($original[0], $source[0])) {
                        $popup.popup('close');
                    }
                });
            });

            $closeButton.bind('click.popup', function() {
                $(this).popup('close');
            });

            var $body = $(doc.body);
            $content.append($inner);
            $content.append($closeButton);
            $container.append($content);
            $body.append($container);
        },

        // Opens the popup.
        'open': function() {
            this.$caller.popup('container').trigger('open');
            return this.$caller;
        },

        'restoreOriginalPosition': function() {
            this.$caller.popup('container').trigger('restoreOriginalPosition');
            return this.$caller;
        },

        // Closes the popup.
        'close': function() {
            this.container().trigger('close');
            return this.$caller;
        },

        // Returns the enclosing element that contains the popup.
        'container': function() {
            return this.$caller.closest('.popup');
        },

        // Returns the popup content element.
        'content': function() {
            return this.$caller.popup('container').find('> .content');
        },

        // Returns the source element that triggered the popup to open.
        'source': function($newSource, event) {
            var options = this.option();

            if (event &&
                    ($newSource.height() < 30 ||
                    typeof event.pageX !== 'number' ||
                    typeof event.pageY !== 'number')) {
                event = undef;
            }

            var $container, $content, $marker;

            $container = this.$caller.popup('container');
            if($container) {
                // Create a arrow-like marker.
                $content = $container.popup('content');
                $marker = $content.find('> .marker');
                if ($marker.length === 0) {
                    $marker = $('<div/>', { 'class': 'marker' });
                    $content.append($marker);
                }
            }

            if (typeof $newSource === 'undefined' || $newSource === null) {

                return $container[0] ? $.data($container[0], 'popup-$source') : null;

            } else {

                $container.each(function() {
                    $.data(this, 'popup-$source', $newSource);
                });

                // Change position.
                var sourceOffset = $newSource.offset();
                var popupWidth = $container.outerWidth();

                // Make sure left is within bounds.
                var markerDelta = 0;
                var left = event ? event.pageX - popupWidth / 2 : sourceOffset.left + ($newSource.outerWidth() - popupWidth) / 2;
                if (left < options.padding.left) {
                    markerDelta = left - options.padding.left;
                    left = options.padding.left;
                } else {
                    var leftDelta = left + popupWidth - $(doc).width() + options.padding.right;
                    if (leftDelta > 0) {
                        markerDelta = leftDelta;
                        left -= leftDelta;
                    }
                }

                var markerLeft = (popupWidth  - $marker.outerWidth()) / 2 + markerDelta;
                $marker.css('left', markerLeft < 5 ? 5 : markerLeft);

                // Make sure top is within bounds.
                var top = event ? event.pageY : sourceOffset.top + $newSource.outerHeight();
                if (top < 30) {
                    top = 30;
                }

                // Adjust left/top if position is fixed.
                var isFixedPosition = $newSource.isFixedPosition();
                if (isFixedPosition) {
                    left -= $(window).scrollLeft();
                    top -= $(window).scrollTop();
                }

                var $newSourceParent = $newSource.closest('.popup');
                if ($newSourceParent.length === 0) {
                    $newSourceParent = $newSource.parent();
                }

                var newZindex = options.zIndex === null ? $newSource.parent().zIndex() + 1 : options.zIndex;

                $container.css({
                    'left': left,
                    'margin': 0,
                    'position': isFixedPosition ? 'fixed' : 'absolute',
                    'top': top,
                    'z-index': newZindex
                });

                return this.$caller;
            }
        }
    });

    // Clicking outside the popups should close them all.
    $win.click(function(event) {
        var target = event.target;
        if ($(target).popup('container').length === 0) {
            $('.popup').each(function() {
                var $container = $(this);

                // Suppress the close if the click was within what triggered the popup.
                var $source = $container.popup('source');
                if ($source && $source.length > 0) {
                    var source = $source[0];
                    if (!(source == target || $.contains(source, target))) {
                        $container.popup('close');
                    }
                }
            });
        }
    });

    // Hitting ESC should close all popups too.
    $win.keydown(function(event) {
        if (event.which === 27) {
            var $containers = $('.popup');
            if ($containers.length > 0) {
                $containers.popup('close');
                return false;
            } else {
                return true;
            }
        }
    });

    }(jQuery, window));
});
window.boxContextLoaded(function(jQuery) {

    var $ = jQuery;

    var EXECUTION = SNI.BOX.DEBUG.forScope("EXECUTION", "FRAME");

    // Inline frame replacement.

    $.fn.frame = $.plugin({
        refresh : {
            hrefAttribute: 'data-refresh-href',
            triggerAttribute: 'data-refresh-trigger',
            intervalAttribute: 'data-refresh-interval'
        },
        hrefAttribute: 'data-frame-href',
        preventConcurrentClass: 'dari-frame-prevent-concurrent',
        frameClass: 'dari-frame',
        beforeLoadEventAttribute: 'data-before-load-event',
        loadingClass: 'dari-frame-loading',
        loadedClass: 'dari-frame-loaded',
        errorClass: 'dari-frame-error',
        ignoreClass: 'dari-frame-ignore',
        preventConcurrent: false,
        debug: false,
        'setBody': function(body) {
            $(this).html(body);
        }
    }, function(plugin, options) {

        var $body = $(this);

        var formTargetIndex = 0;

        var DEBUG = function(msg) {
            var isDebug = window.location.hash.indexOf("_debugFrame") !== -1;
            if((isDebug || (options.debug === true)) && (typeof console !== 'undefined')) {
                console.log(msg);
            }
        };

        var triggerListeningFrames = function($frame, callers, triggered) {
            var callerName = $frame.attr('name');
            if(!callerName) {
                formTargetIndex += 1;
                callerName = 'frameTarget' + formTargetIndex + (+new Date());
            }

            if(triggered !== true) {
                $('.' + options.frameClass + '[' + options.refresh.triggerAttribute + '~="' + callerName + '"]').each(function() {

                    var $this = $(this);

                    var name = $this.attr('name');
                    DEBUG("frame \"" + callerName + "\"" + " calling loadPage for frame \"" + (typeof name === 'undefined' ? $this.attr(options.refresh.hrefAttribute) : $this.attr('name')) + "\"");

                    if(callers !== undefined) {
                        if (callers.indexOf($this.attr('name')) === -1) {
                            setTimeout(function() {
                                loadPage($this, $this.data('source'), 'get', $this.attr(options.refresh.hrefAttribute), null, null, callers + " " + callerName, true);
                            }, 0);
                        }
                    } else {
                        setTimeout(function() {
                            loadPage($this, $this.data('source'), 'get', $this.attr(options.refresh.hrefAttribute), null, null, callerName, true);
                        }, 0);
                    }
                });
            }
        };

        /*
            Purpose:

                Build a query string fragment for $.ajax requests with parameters to indicate the output dataType ("_format") and
                result format ("_result").

            Parameters:

                "ajaxDataType" - 'json', 'jsonp', or null
                "ajaxResultType" - 'html' or null

            Returns:

                a query string fragment of the form [_format=_____][&_result=______]
        */
        var buildDataTypeQueryString = function(ajaxDataType, ajaxResultType, sourceDataFormat) {

            var queryString = '';

            if(sourceDataFormat === 'html') {

                if(ajaxDataType !== undefined && ajaxDataType !== null) {
                    queryString += '_format=' + ajaxDataType;
                }

                if(ajaxResultType !== undefined && ajaxResultType !== null) {
                    if(queryString.length > 0) {
                        queryString += '&';
                    }
                    queryString += '_result=' + ajaxResultType;
                }
            }

            return queryString;
        };

       // Finds the target frame, creating one if necessary.
        var findOrCreateTargetFrame = function(element, target, callers, triggered) {

            var $element = $(element);
            var $frame = null;

            // Skip processing on special target names (except _parent)
            if (target !== '_top' && target !== '_self' && target !== '_blank' && target !== '_new') {

                if (target && target === '_parent') {

                    // if the popup plugin is available and this frame is a popup
                    if($.fn.popup !== undefined && $element.closest('.' + options.frameClass).popup('container').size() > 0) {

                        var $popupFrame = $element.closest('.' + options.frameClass);
                        // use the popup source as the original frame source to look for a _parent frame
                        var $rootSource = $popupFrame.data('rootSource');
                        if($rootSource !== undefined) {

                            // if snapping back to parent, have to remove the old "rootSource", or it will refer to an outdated element
                            $popupFrame.removeData('rootSource');

                            // if a frame can be found as the parent of the original source, then this is the requested frame.
                            $frame = $rootSource.closest('.' + options.frameClass);

                            if($frame.size() > 0) {
                                // close the popup TODO: maybe this should be another response option - to close or not to close the popup?
                                $frame.popup('close');
                                triggerListeningFrames($frame, callers, triggered);
                            } else {
                                // if the rootSource wasn't contained within a frame, then the popup was invoked directly
                                $popupFrame.popup('close');
                                triggerListeningFrames($popupFrame, callers, triggered);
                            }
                        }
                    } else {

                        // either popup not available or the frame is not a popup - standard _parent logic
                        $frame = $element.closest('.' + options.frameClass).parent().closest('.' + options.frameClass);
                    }
                } else if(target) {

                    // look for a frame with name=target
                    $frame = $('.' + options.frameClass + '[name="' + target + '"]');
                    if($frame.size() === 0) {
                        $frame = $('.' + options.frameClass + '[name="' + target + '"]');
                    }

                    // if there is still no frame, and the popup plugin is available, create a popup frame
                    if ($frame.size() === 0 && $.fn.popup !== undefined) {

                        $frame = $('<div class="' + options.frameClass + '" name="' + target + '"> </div>');
                        $body.append($frame);
                        $frame.popup('init');

                        // popup source is the original element that triggered the popup (distinct from frame source)
                        $frame.popup('source', $element);
                    }
                } else {
                    $frame = $element.closest('.' + options.frameClass);
                }
            }

            // else { Natural browser event. }
            return ($frame === null || $frame.size() === 0) ? null : $frame;
        };

        // Begins loading $frame using $source.
        var beginLoad = function($frame, $source, event, triggered) {

            var version = ($frame.data('loadVersion') || 0) + 1;
            $frame.data('loadVersion', version);
            $frame.data('startTime', new Date());

            // frame source is always the last element that caused the frame to load
            $frame.data('source', $source);
            if(!$frame.data('rootSource')) {
                $frame.data('rootSource', $source);
            }

            $frame.addClass(options.loadingClass);
            if(typeof $source !== 'undefined' && $source !== null) {
                $source.addClass(options.loadingClass);
            }

            if($.fn.popup !== undefined) {

                var $popup = $frame.popup('container');

                // if the popup plugin is available and this frame is a popup, manage it
                if($popup.size() > 0) {

                    $popup.addClass(options.loadingClass);

                    // Source change on popup?
                    var $oldSource = $frame.popup('source');
                    // RAA 1/13/14 - adding undefined check on $source to prevent NPE on triggerFrameLoad() where triggered frame was not loaded dynamically (.dari-frame-loaded)
                    //if ($popup[0] && typeof $source !== 'undefined' && !$.contains($popup[0], $source[0])) {
                    if ($popup[0] && (typeof $source !== 'undefined' && !$.contains($popup[0], $source[0]) && (!$oldSource || $oldSource[0] != $source[0]) )) {

                        $frame.popup('source', $source, event);
                        $frame.empty();
                    }

                    // TODO: may not want to open the popup all the time
                    if(triggered !== true){
                        $frame.popup('open');
                    }
                }
            }

            if((!!$frame.attr(options.beforeLoadEventAttribute)) === true) {
                $frame.trigger('frame.beforeLoad', $source);
            }


            DEBUG("--EVENT-- [beginLoad]");
            plugin.trigger('beginLoad', {
                'version': version,
                '$frame': $frame,
                '$source': $source
            });

            $frame.trigger('beginLoad', {
                'version': version,
                '$frame': $frame,
                '$source': $source
            });
            return version;
        };

        // Ends loading $frame by setting it using data.
        var endLoad = function($frame, version, data, dataType, sourceDataFormat, target, redirectUrl, callers, triggered) {

            var methodStart = new Date();

            if (version >= $frame.data('loadVersion')) {

                var $newTargetFrame;

                if(target) {

                    if(target === "_top" || target === "_self") {

                        if($.fn.popup !== undefined) {
                            $frame.popup('close');
                        }

                        // if redirectUrl is not specified, reload the current page
                        redirectUrl = redirectUrl || window.location.href;
                        setTimeout(function() {
                            window.location.href = redirectUrl;
                        }, 0);
                        return;
                    }

                    $newTargetFrame = findOrCreateTargetFrame($frame.data('source'), target, callers, triggered);

                    // if there is a new target frame that is distinct from the frame that began the load,
                    // finish off the old frame, then continue with $frame = $newTargetFrame
                    if($newTargetFrame !== null && !$newTargetFrame.is($frame)) {

                        // don't set the "rootSource" when rendering into a _parent frame
                        if(target !== "_parent") {
                            if(!($newTargetFrame.data('rootSource'))) {
                                if($frame.data('rootSource')) {
                                    $newTargetFrame.data('rootSource', $frame.data('rootSource'));
                                } else if($frame.data('source')) {
                                    $newTargetFrame.data('rootSource', $frame.data('source'));
                                }
                            }
                        }

                        if($frame.data('source')) {
                            $newTargetFrame.data('source', $frame.data('source'));
                        }

                        $frame.removeClass(options.loadingClass).addClass(options.loadedClass);
                        $frame.removeClass(options.errorClass);
                        if($.fn.popup !== undefined) {
                            // if the popup plugin is available, close the old popup and manage its status classes
                            $frame.popup('container').removeClass(options.loadingClass).addClass(options.loadedClass);
                            $frame.popup('close');
                        }
                        $frame = $newTargetFrame;
                    }
                }

                var $source = $frame.data('source');

                // do not execute the frame-loading code if the new target frame is specifically null - this means that _parent had no containing frame and a popup was simply closed
                if(typeof target === 'undefined' || $newTargetFrame !== null) {
                    $frame.removeClass(options.loadingClass).addClass(options.loadedClass);

                    if($.fn.popup !== undefined) {

                        var $popup = $frame.popup('container');

                        // if the popup plugin is available, manage its status classes
                        $popup.removeClass(options.loadingClass).addClass(options.loadedClass);
                        // RAA removed 1/13/14- redundant popup('open')??? $frame.popup('open');

                        // Source change on popup?
                        if(typeof $source !== 'undefined' && $source !== null) {
                            $source.removeClass(options.loadingClass);
                            $source.removeClass(options.errorClass);
                        }
                        var $oldSource = $frame.popup('source');
                        if ($popup[0] && (typeof $source !== 'undefined' && !$.contains($popup[0], $source[0]) && (!$oldSource || $oldSource[0] != $source[0]) )) {
                                $frame.popup('source', $source);
                                $frame.empty();
                        }

                        // TODO: may not want to open the popup all the time
                        if(triggered !== true){
                            $frame.popup('open');
                        }
                    }

                    if(typeof data === 'object' && dataType === 'jsonp' && sourceDataFormat === 'html') {
                        data = data.result;
                    }

                    // TODO: will this work for form-post requests?
                    if (typeof data === 'string') {
                        data = data.replace(/^(?:.|[\r\n])*?<body[^>]*>/ig, '');
                        data = data.replace(/<\/body>(?:.|[\r\n])*?$/ig, '');
                    }

                    options.setBody.call($frame[0], data);
                    $frame.change();
                    $(window).resize();
                }

                triggerListeningFrames($frame, callers, triggered);

                DEBUG("--EVENT-- [endLoad]");

                var start = new Date();
                plugin.trigger('endLoad', {
                    'version': version,
                    '$frame': $frame,
                    '$source': $source
                });

                EXECUTION("triggering endLoad (plugin) took: " + ((new Date()) - start) + " ms");

                start = new Date();
                $frame.trigger('endLoad', {
                    'version': version,
                    '$frame': $frame,
                    '$source': $source
                });
                EXECUTION("triggering endLoad ($frame) took: " + ((new Date()) - start) + " ms");
            }

            EXECUTION("endLoad took: " + ((new Date()) - methodStart) + " ms");
        };

        // Loads the page at url into the $frame.
        var loadPage = function($frame, $source, method, url, data, event, callers, triggered) {

            var version = beginLoad($frame, $source, event, triggered);
            var extraFormData = $frame.data('extraFormData');
            var ajaxDataType = $frame.data('ajaxDataType');
            var ajaxResultType = $frame.data('ajaxResultType');
            var sourceDataFormat = $frame.data('sourceDataFormat');
            var jsonpCallbackParam = $frame.data('jsonpCallbackParam');
            var jsonpCallback = $frame.data('jsonpCallback');

            var dataTypeQueryString = buildDataTypeQueryString(ajaxDataType, ajaxResultType, sourceDataFormat);

            if(dataTypeQueryString.length > 0) {

                if(typeof extraFormData === 'undefined') {
                    extraFormData = '';
                }

                if(extraFormData.length > 0) {
                    extraFormData += '&';
                }

                extraFormData += dataTypeQueryString;
            }

            if(typeof extraFormData !== 'undefined' && extraFormData.length > 0) {
                url += (url.indexOf('?') < 0 ? '?' : '&') + extraFormData;
            }

            var ajaxOptions = {
                'cache': false,
                'type': method,
                'url': url,
                'data': data,
                'success': function(data, status, response) {


                    var newTarget = response.getResponseHeader('X-Frame-Target');
                    var redirectUrl = response.getResponseHeader('X-Frame-Redirect');


                    var responseData = (ajaxDataType === 'json' || ajaxDataType === 'jsonp') ? data : response.responseText;
                    var executionTime = (+new Date()) - $frame.data('startTime');
                    if(typeof executionTime !== 'undefined') {

                        DEBUG("frame.js took " + executionTime + " ms loading url: " + url);
                    }

                    endLoad($frame, version, responseData, ajaxDataType, sourceDataFormat, newTarget, redirectUrl, callers, triggered);
                },
                'error': function() {
                    if(typeof $source !== 'undefined' && $source !== null) {
                        $source.addClass(options.errorClass);
                    }
                    $frame.addClass(options.errorClass);
                }
            };

            if(ajaxDataType === 'json' || ajaxDataType === 'jsonp') {
                ajaxOptions['dataType'] = ajaxDataType;
                ajaxOptions['jsonp'] = jsonpCallbackParam ? jsonpCallbackParam : '_callback';
                if(jsonpCallback) {
                    ajaxOptions['jsonpCallback'] = jsonpCallback;
                }
            }

            $.ajax(ajaxOptions);
            return version;
        };

        $body.bind('reloadFrame', function(data, $frame, $source) {

            var target = data.target;
            var $targetFrame = null;

            if(typeof $frame !== 'undefined' && $frame.is('.' + options.frameClass)) {

                $targetFrame = $frame;

            } else if(typeof target !== 'undefined' && $(target).is('.' + options.frameClass)) {

                $targetFrame = $(target);
            }

            if($targetFrame !== null) {
                var dataRefreshHref = $targetFrame.attr(options.refresh.hrefAttribute);
                if(typeof dataRefreshHref !== 'undefined') {
                    loadPage($targetFrame, $source, 'get', dataRefreshHref, null, null, null, true);
                }
            }
        });

        // Intercepts anchor clicks to see if it's targeted.
        $body.on('click', 'a[href]:not([href^="java"])', function(event) {

            /* BLB - replaced the "findTargetFrame($frame, callback)" method with
                $frame = findOrCreateTargetFrame($source, target)
                followed by inline code that was previously wrapped in the callback.
             */

            var $anchor = $(this);
            var dataRefreshHref = $anchor.attr(options.hrefAttribute);
            if(typeof(dataRefreshHref) === 'undefined') {
                dataRefreshHref = $anchor.attr('href');
            }

            if($anchor.is("." + options.ignoreClass) || typeof dataRefreshHref === 'undefined' || dataRefreshHref === '' || dataRefreshHref === '#' || $anchor.closest('.' + options.ignoreClass).size() > 0) {
                return true;
            }

            var $frame = findOrCreateTargetFrame($anchor, $anchor.attr('target'));

            if($frame == null || $frame.size() === 0) {
                return true;
            }

            // if concurrent loading is prevented, return false
            if($frame.is('.' + options.loadingClass) && (options.preventConcurrent === true || $anchor.closest('.' + options.preventConcurrentClass).size() > 0)) {
                return false;
            }

            if($frame !== null && $frame.size() > 0) {
                // loadPage($frame, $source, url) calls beginLoad, makes an ajax request, and calls endLoad on complete

                loadPage($frame, $anchor, 'get', dataRefreshHref, null, event);
                event.preventDefault();
                event.stopPropagation();
            } else {
                return true;
            }
        });

        // skip validation by default
        // intercept frame.validate and stopPropagation / stopImmediatePropagation to invalidate

        var skipValidation = function(event) {

            var $target = $(event.target);

            if($target.size() > 0) {
                $target.data('frameValidated', true);
            }
        };

        // Intercepts form submits to see if it's targeted.
        $body.on('submit', 'form', function(event, source) {

            var $form = $(this);

            var $storedTarget = $form.data('storedTarget');
            var $frame = $storedTarget || findOrCreateTargetFrame($form, $form.attr('target'));

            if($frame === null || $frame.size() === 0 || $form.is("." + options.ignoreClass)) {
                return true;
            }

            // if concurrent loading is prevented, return false
            if($frame.is('.' + options.loadingClass) && (options.preventConcurrent === true || $form.closest('.' + options.preventConcurrentClass).size() > 0)) {
                return false;
            }

            if($form.data('frameValidate') === true) {

                $form.removeData('frameValidated');
                $body.on('frame.validate', skipValidation);
                var isValidationError = false;
                try {
                    $form.trigger('frame.validate');
                } catch (e) {
                    DEBUG("[frame.js]: caught exception while performing validation: ");
                    DEBUG(e);
                    isValidationError = true;
                }

                $body.off('frame.validate', skipValidation);
                var isValidated = $form.data('frameValidated');

                if(isValidated !== true && isValidationError === false) {

                    return false;
                }
            }

            var $frameSource;
            if(typeof(source) === 'undefined') {
                $frameSource = $form.find('input[type=submit],input[type=image],button[type=submit]').filter(':visible').first();
            } else {
                $frameSource = $(source);
            }

            if($frameSource.size() === 0) {
                $frameSource = $form;
            }

            var action = $form.attr('action');

            /* if the frame's submit method is "get", use ajax content loading via
                loadPage($frame, $source, url) where url includes form data as query params. */
            if ($form.attr('enctype') !== 'multipart/form-data') {

                loadPage($frame, $frameSource, $form.attr('method'), action, $form.serialize(), event);
                return false;
            }

            var extraFormData = $frame.attr('data-extra-form-data');
            var ajaxDataType = $frame.data('ajaxDataType');
            var ajaxResultType = $frame.data('ajaxResultType');
            var sourceDataFormat = $frame.data('sourceDataFormat');

            if(sourceDataFormat === 'html' && (ajaxDataType === 'json' || (ajaxDataType === 'jsonp' && ajaxResultType !== 'html'))) {

                if(typeof extraFormData === 'undefined') {
                    extraFormData = '';
                }

                if(extraFormData.length > 0) {
                    extraFormData += '&';
                }

                extraFormData += '_format=json';
            }

            $form.attr('action', action + (action.indexOf('?') < 0 ? '?' : '&') + extraFormData);

            var $isFrame = $form.find(':hidden[name="_isFrame"]');
            if ($isFrame.length === 0) {
                $isFrame = $('<input name="_isFrame" type="hidden" value="true"/>');
                $form.prepend($isFrame);
            }

            if(!$storedTarget) {
                $form.data('storedTarget', $frame);
            }

            // Add a target for $submitFrame later in case one doesn't exist.
            var target = $form.attr('target');
            if(!target) {
                formTargetIndex += 1;
                target = 'frameTarget' + formTargetIndex + (+new Date());
                $form.attr('target', target);
            }

            var $submitFrame = $('iframe[name="' + target + '"]');
            if ($submitFrame.length !== 0) {

                DEBUG("found iframe with name=\"" + target + "\", removing \"name\" attribute.");

                $submitFrame.removeAttr('name');
            }
            $submitFrame = $('<iframe name="' + target + '"></iframe>');
            $submitFrame.hide();
            if($body.is('body')) {
                $body.append($submitFrame);
            } else {
                $body.after($submitFrame);
            }

            DEBUG("created iframe with name=\"" + target + "\"");

            var frameOnLoadCallback = function() {

                var $this = $('iframe[name="' + target + '"]');

                DEBUG("load handler for iframe with name=\"" + $this.attr('name') + "\"");

                var $frameBody = $this.contents().find('body');

                var newTarget = $frameBody.attr('data-x-frame-target');
                var redirectUrl = $frameBody.attr('data-x-frame-redirect');

                var executionTime = (+new Date()) - $frame.data('startTime');
                if(typeof executionTime !== 'undefined') {

                    DEBUG("frame.js took " + executionTime + " ms loading url: " + url);
                }
                endLoad($frame, version, $frameBody.text(), null, sourceDataFormat, newTarget, redirectUrl);
                $this.unbind('.' + options.frameClass);
                setTimeout(function() {
                    DEBUG("removing iframe with name=\"" + $this.attr('name') + "\"from DOM");
                    $this.remove();
                }, 0);
                DEBUG("exiting load handler for iframe with name=\"" + $this.attr('name') + "\"");
            };

            var version = beginLoad($frame, $frameSource, event, false);

            $submitFrame.bind('load.' + options.frameClass, frameOnLoadCallback);

            event.stopPropagation();

            // natural browser form submit will follow
            return true;
        });

        var autoRefreshFrame = function($frame) {
            var url = $frame.attr(options.refresh.hrefAttribute);
            if(typeof(url) !== 'undefined') {
                var version = loadPage($frame, null, 'get', url, null, null, null, true);
                $body.bind('endLoad', function(event) {
                    if(event.$frame.is($frame) && version === event.version) {
                        var interval = parseInt($frame.attr(options.refresh.intervalAttribute), 10);

                        DEBUG("--EVENT-- [refresh]: next in " + interval + "s");

                        if(interval > 0) {
                            setTimeout(function() {
                                autoRefreshFrame($frame);
                            }, interval * 1000);
                        }
                    }
                    $(this).unbind(event);
                });
            }
        };

        $(function() {
            $('.' + options.frameClass + '[' + options.refresh.intervalAttribute + ']').each(function() {

                var $frame = $(this);
                var interval = parseInt($frame.attr(options.refresh.intervalAttribute), 10);
                if(interval > 0) {
                    setTimeout(function() {
                        autoRefreshFrame($frame);
                    }, interval * 1000);
                }
            });
        });
    });
});
window.boxContextLoaded(function(jQuery) {

    // grabbed from http://stackoverflow.com/questions/12312323/how-to-know-if-a-font-font-face-has-already-been-loaded

    // https://github.com/patrickmarabeas/jQuery-FontSpy.js

    var $ = jQuery;

    $.fn.fontChecker = function(config) {
        var $this = $(this);
        var defaults = {
            font: $this.css("font-family"),
            fontAwesome: false,
            loadingClass: '',
            failClass: '',
            completeClass: '',
            load: function() { },
            fail: function() { },
            isIconographyFont: false,
            iconographyTestClass: 'icon-glass',
            testFont: 'Comic Sans MS',
            testString: 'QW@HhsXJ',
            delay: 30,
            timeOut: 5000
        };
        config = $.extend(defaults, config);

        var tester = document.createElement('span');
        tester.style.position = 'absolute';
        tester.style.top = '-9999px';
        tester.style.left = '-9999px';
        tester.style.visibility = 'hidden';
        tester.style.fontFamily = config.testFont;
        tester.style.fontSize = '250px';
        if (config.isIconographyFont === true) {
            tester.className = config.iconographyTestClass;
        } else {
            tester.innerHTML = config.testString;
        }

        document.body.appendChild(tester);
        var fallbackFontWidth = tester.offsetWidth;
        tester.style.fontFamily = config.font + ',' + config.testFont;
        var timer = null;

        function checkFont() {
            var loadedFontWidth = tester.offsetWidth;
            if (fallbackFontWidth === loadedFontWidth) {
                if (config.timeOut < 0) {
                    $this.removeClass(config.loadingClass);
                    $this.addClass(config.failClass);
                    config.fail.call($this[0], [config]);
                }
                else {
                    $this.addClass(config.loadingClass);
                    timer = setTimeout(checkFont, config.delay);
                    config.timeOut = config.timeOut - config.delay;
                }
            } else {
                $this.removeClass(config.loadingClass);
                $this.addClass(config.completeClass);
                config.load.call($this[0], [config]);
            }
        }

        checkFont();
    };

});
SNI.BOX.loadModule('00000147-82ed-dfc8-ad6f-bbede4210000', { }, true);