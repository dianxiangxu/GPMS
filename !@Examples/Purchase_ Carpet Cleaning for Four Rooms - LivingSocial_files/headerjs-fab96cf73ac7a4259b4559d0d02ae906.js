var JSON;if(!JSON){JSON={};window.JSON=JSON}
(function(){function b(h){return h<10?"0"+h:h}function d(h){f.lastIndex=0;return f.test(h)?'"'+h.replace(f,function(i){var l=o[i];return typeof l==="string"?l:"\\u"+("0000"+i.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+h+'"'}function a(h,i){var l,m,p=e,j,k=i[h];if(k&&typeof k==="object"&&typeof k.toJSON==="function")k=k.toJSON(h);if(typeof n==="function")k=n.call(i,h,k);switch(typeof k){case "string":return d(k);case "number":return isFinite(k)?String(k):"null";case "boolean":case "null":return String(k);
case "object":if(!k)return"null";e+=g;j=[];if(Object.prototype.toString.apply(k)==="[object Array]"){m=k.length;for(h=0;h<m;h+=1)j[h]=a(h,k)||"null";i=j.length===0?"[]":e?"[\n"+e+j.join(",\n"+e)+"\n"+p+"]":"["+j.join(",")+"]";e=p;return i}if(n&&typeof n==="object"){m=n.length;for(h=0;h<m;h+=1)if(typeof n[h]==="string"){l=n[h];if(i=a(l,k))j.push(d(l)+(e?": ":":")+i)}}else for(l in k)if(Object.prototype.hasOwnProperty.call(k,l))if(i=a(l,k))j.push(d(l)+(e?": ":":")+i);i=j.length===0?"{}":e?"{\n"+e+j.join(",\n"+
e)+"\n"+p+"}":"{"+j.join(",")+"}";e=p;return i}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+b(this.getUTCMonth()+1)+"-"+b(this.getUTCDate())+"T"+b(this.getUTCHours())+":"+b(this.getUTCMinutes())+":"+b(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var c=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
f=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,g,o={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},n;if(typeof JSON.stringify!=="function")JSON.stringify=function(h,i,l){var m;g=e="";if(typeof l==="number")for(m=0;m<l;m+=1)g+=" ";else if(typeof l==="string")g=l;if((n=i)&&typeof i!=="function"&&(typeof i!=="object"||typeof i.length!=="number"))throw new Error("JSON.stringify");return a("",
{"":h})};if(typeof JSON.parse!=="function")JSON.parse=function(h,i){function l(m,p){var j,k,q=m[p];if(q&&typeof q==="object")for(j in q)if(Object.prototype.hasOwnProperty.call(q,j)){k=l(q,j);if(k!==undefined)q[j]=k;else delete q[j]}return i.call(m,p,q)}h=String(h);c.lastIndex=0;if(c.test(h))h=h.replace(c,function(m){return"\\u"+("0000"+m.charCodeAt(0).toString(16)).slice(-4)});if(/^[\],:{}\s]*$/.test(h.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){h=eval("("+h+")");return typeof i==="function"?l({"":h},""):h}throw new SyntaxError("JSON.parse");}})();

(function(){
  var _events = [],
      _cachedData = false,
      _fetching = false;
      
  MeInfo = {
    bind: function(callback){
      _events.push(callback);
      if(_cachedData!=false) {
        callback(_cachedData);
      } else if(_fetching==false) {
        _fetching=true;
        _fetchURL();
      }
    },
    run: function() {
      _fetchURL();
    }
  }

  function _fetchURL(){
    if(document.cookie.match(/authd=1/)) {
      var url = '/me/info.json?ttl=' + (new Date().getTime());
      var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          _cachedData = {body: JSON.parse(xhr.responseText), status: xhr.status};
          _trigger();
        }
      }
      xhr.open('GET', url);
      xhr.send();
    }
  }

  function _trigger(){
    if (_events.length==0) { return; }
    for (var i = 0, len = _events.length; i < len; ++i) {
      _events[i](_cachedData);
    }
  }

  window.MeInfo = MeInfo;
}());;dls.getStrCookie = function(name) {
  var cookie = document.cookie;
  var setPos = cookie.indexOf(name + '='), stopPos = cookie.indexOf(';', setPos);

  // Dataset does not exist, attempt to register default
  return !~setPos ? null : cookie.substring(
  setPos, ~stopPos ? stopPos : undefined).split('=')[1];
}
dls.getIntCookie = function(name) {
  var id = parseInt(dls.getStrCookie(name));
  return isNaN(id) ? '' : id;
}
;(function() {
  Me = {
    fbKey: FBAppKey,
    id: function() {
      return function() {
        if (dls.viewer) {
          if (dls.viewer.id) {
            return dls.viewer.id;
          }
        } else {
          console.log("called me id before me_info loaded");
        }
        return null;
      }
    },
    array_contains: function (a, obj) {
      var i = a.length;
      while (i--) {
	if (a[i] === obj) {
          return true;
	}
      }
      return false;
    },
    display_name: function() {
      return function() {
        if (this.me) {
          if (this.me.full_name) {
            return this.me.full_name;
          }
          else if (this.me.email) {
            return this.me.email.replace(/@.*/,'');
          }
        }
        return "...";
      }
    },
    loggedIn: function() {
      return function() {
        var cookie = new String(document.cookie);
        return !!cookie.match(/authd=\d+/);
      }
    },
    purchases_for: function(deal_id) {
      if (this.deals) {
        return this.deals[deal_id];
      }
      return null;
    },
    credits_for: function(currency_code) {
      return function() {
        if(this.me && this.me.credits) {
          var credits_value = this.me.credits[currency_code];
          if(credits_value >= 0) {
            return(credits_value);
          } else {
            return(0);
          }
        }
        return 0;
      }
    }
  }

  FbMe = {
    appearsLoggedIn: (Me.loggedIn().call(Me)),
    isfb: function() {
      return function() {
        var fbc = new RegExp("fbsr_" + Me.fbKey + "=");
        return !!document.cookie.match(fbc);
      }
    },
    isfbVisible: function() {
      return function() {
        var fbc = new RegExp("fbsr_" + Me.fbKey + "=");
        return !!document.cookie.match(fbc)
      }
    },
    updateControlBar: function() {
      if (!FbMe.isfbVisible().call(this)) { return; }
      var fbls = new RegExp("fbls_" + Me.fbKey + "=");

      if (FbMe.isfb().call(this)) {
        FB.api('/me', function(response) {
          if (response.error && FbMe.appearsLoggedIn) {
            console.log('fb me error');
            //old idea was logout then reload been commented out for awhile, removing the JS logout code
            return;
          }
          FbMe.uid = response.id;
          (function setDisplayName() {
            if ($('ul.logged-out').length > 0) {
              processAccountNav({body: {}});
	    }
            if ($("#facebook_display_name").length == 0) {
              setTimeout(setDisplayName, 100);
            }
            else {
              //9 chars + the &nbsp; which is included in the html() response
              if($('#my-account-handle .name') && ($('#my-account-handle .name').html().match(/\.\.\./) || $('#my-account-handle .name').html().length <= 9)) {
                $("#facebook_display_name").html(response.name);
              }
            }
          })();
        });
      }
    }
  }
  window.Me = Me;
  window.FbMe = FbMe;
  MeInfo.bind(function(ctx) {
    dls.mePresent = true;
    var local_me = ctx.body;
    dls.viewer = {
      loggedIn      : true,
      email         : local_me.email,
      isFBConnected : !!document.cookie.match(new RegExp("fbsr_" + Me.fbKey + "=")),
      preferredCity : local_me.city_id,
      subscriptions : local_me.subs
    };
    if(local_me.id instanceof Object) {
      dls.viewer.id = local_me.id()();
    } else {
      dls.viewer.id = local_me.id;
    }
  });

})();
;(function(){

  var defaultConfig = {bucketId: 'default',
                       entityId: 'default',
                       variationId: 'default',
                       userId: '',
                       eventId: ''};

  window.Journal = {
    newTrackerFunction: newTrackerFunction,

    // DEPRECATED
    configure: configure,
    trackEvent: function(){ /* noop */ }
  }

  /*
   * Create a custom configured tracking function. This function returns a
   * function that can track events to the jounal. Pass in the `mock=true`
   * option to create a fake tracking function that logs to the console instead
   * of making network requests.
   *
   * Arguments:
   *
   *    @config Object
   *
   * Configuration options:
   *
   *    @bucketId String
   *    @entitiyId String
   *    @variationId String
   *    @userId String: Note this must be a string or the service will 422
   *    @mock Boolean: set to true to use a fake journal that logs to the console
   *
   * Usage:
   *
   *    var config = {bucketId: 'myBucket', variationId: 'myVariation'};
   *    var trackMyEvent = Journal.newTrackerFunction(config);
   *
   *    trackMyEvent('someEvent', {userId: "12345-abcd"});
   *
   *    => POST {"bucketId":"myBucket","entityId":"default",
   *             "variationId":"myVariation","userId":"1","eventId":"someEvent"}
   *
   * `trackEvent` Arguments:
   *
   *    @event String: event name to post to journal
   *    @config Object: (optional) extra data or configuration overrides
   *
   *
   */
  function newTrackerFunction(config, context){
    context || (context = window);
    config || (config = {mock: true});

    if(config['mock'])
      return newFakeTrackerFunction(config, context);
    else
      return newRealTrackerFunction(config, context);
  }



  /*
   * Internal Functions
   */

  function newRealTrackerFunction(config, context){
    var host = context.location.host;
    var protocol = context.location.protocol;
    var serviceUrl = protocol + '//' + host + '/services/journal/v1/store';
    var localDefaults = merge({}, defaultConfig, config);

    return function(eventId, config){
      var data = merge({}, localDefaults, config, {eventId: eventId});
      var jsonData = JSON.stringify([data]);
      var request = new context.XMLHttpRequest;
      request.open('post', serviceUrl);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(jsonData);
    };
  }

  function newFakeTrackerFunction(config, context){
    context || (context = window);
    var baseConfig = merge({}, defaultConfig, config);

    return function(eventId, config){
      var data = merge({}, baseConfig, config, {eventId: eventId});
      context.console.log('[JOURNAL: ' + eventId + ']', data);
    };
  }


  function configure(config, context){
    var newConfig = merge({}, defaultConfig, config);
    Journal.trackEvent = newTrackerFunction(newConfig, context);
  }

  function merge(obj){
    var i, l, k, temp, args = arguments;
    for(i = 1, l = args.length; i < l; i++){
      temp = args[i];
      if(typeof temp === 'object')
        for(k in temp)
          obj[k] = temp[k];
    }
    return obj;
  }


// JSON shim for IE7
var JSON;JSON||(JSON={});
(function(){function k(a){return a<10?"0"+a:a}function o(a){p.lastIndex=0;return p.test(a)?'"'+a.replace(p,function(a){var c=r[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function l(a,j){var c,d,h,m,g=e,f,b=j[a];b&&typeof b==="object"&&typeof b.toJSON==="function"&&(b=b.toJSON(a));typeof i==="function"&&(b=i.call(j,a,b));switch(typeof b){case "string":return o(b);case "number":return isFinite(b)?String(b):"null";case "boolean":case "null":return String(b);case "object":if(!b)return"null";
e+=n;f=[];if(Object.prototype.toString.apply(b)==="[object Array]"){m=b.length;for(c=0;c<m;c+=1)f[c]=l(c,b)||"null";h=f.length===0?"[]":e?"[\n"+e+f.join(",\n"+e)+"\n"+g+"]":"["+f.join(",")+"]";e=g;return h}if(i&&typeof i==="object"){m=i.length;for(c=0;c<m;c+=1)typeof i[c]==="string"&&(d=i[c],(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h))}else for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h);h=f.length===0?"{}":e?"{\n"+e+f.join(",\n"+e)+"\n"+g+"}":"{"+f.join(",")+
"}";e=g;return h}}if(typeof Date.prototype.toJSON!=="function")Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+k(this.getUTCMonth()+1)+"-"+k(this.getUTCDate())+"T"+k(this.getUTCHours())+":"+k(this.getUTCMinutes())+":"+k(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()};var q=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
p=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,n,r={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},i;if(typeof JSON.stringify!=="function")JSON.stringify=function(a,j,c){var d;n=e="";if(typeof c==="number")for(d=0;d<c;d+=1)n+=" ";else typeof c==="string"&&(n=c);if((i=j)&&typeof j!=="function"&&(typeof j!=="object"||typeof j.length!=="number"))throw Error("JSON.stringify");return l("",
{"":a})};if(typeof JSON.parse!=="function")JSON.parse=function(a,e){function c(a,d){var g,f,b=a[d];if(b&&typeof b==="object")for(g in b)Object.prototype.hasOwnProperty.call(b,g)&&(f=c(b,g),f!==void 0?b[g]=f:delete b[g]);return e.call(a,d,b)}var d,a=String(a);q.lastIndex=0;q.test(a)&&(a=a.replace(q,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return d=eval("("+a+")"),typeof e==="function"?c({"":d},""):d;throw new SyntaxError("JSON.parse");}})();

}());
;