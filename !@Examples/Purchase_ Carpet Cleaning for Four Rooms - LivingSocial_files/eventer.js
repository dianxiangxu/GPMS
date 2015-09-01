(function() {

    function evntrFlash() {
        try {
            try {
                var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
                try { axo.AllowScriptAccess = 'always'; }
                catch(e) { return '6,0,0'; }
            } catch(e) {}
            return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
        } catch(e) {
            try {
                if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
                    return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
                }
            } catch(e) {}
        }
        return '0,0,0';
    };

    function evntrJava() {
        var n = window.navigator;
        if (n && typeof(n.javaEnabled) === "function" && n.javaEnabled())
            return "1";
        else
            return "0";
    };

    function evntrLang() {
        var n = window.navigator;
        return ((n.language || n.browserLanguage) || "").toLowerCase();
    };

    function evntrVPSize() {
        var d = document,
            de = document.documentElement,
            b = document.body;
        if (b && b.clientWidth && b.clientHeight && !(d.compatMode === "CSS1Compat")) {
            return [b.clientWidth, b.clientHeight].join("x");
        } else if (de.clientWidth && de.clientHeight) {
            return [de.clientWidth,de.clientHeight].join("x");
        }
        return "";
    };

    function evntrEncode(s, e) {
        e = encodeURIComponent;
        if (typeof(e) === 'function') return e(s);
        return s;
    };

    function evntrHash(s) {
        var hash = 0, i, chr, len;
        if (s.length == 0) return hash;
        for (i = 0, len = s.length; i < len; i++) {
            chr   = s.charCodeAt(i);
            hash  = ((hash << 5) - hash) ^ chr;
            hash |= 0;
        }
        return hash & 2147483647;
    };

    function evntrRandomToken(length, n, l, r, h, w) {
        var chrs = "0123456789abcdefghijklmnopqrstuvwxyz";
        // Get all the entropy we can get
        w = window;
        n = w.navigator;
        n = n.appName + n.version + n.platform + n.userAgent + (w.document.cookie ? w.document.cookie : "") + (w.document.referrer ? w.document.referrer : "");
        l = n.length;
        r = '';
        for (var i = length, h = w.history.length; i > 0; --i) {
            n += (h-- ^ l++);
            r += chrs[Math.round(Math.random() * 2147483647 ^ evntrHash(n)) % chrs.length];
        }
        return r;
    };

    function evntrGenCid() {
        return ["v1", evntrRandomToken(12), Math.floor((1*new Date())/1000)].join(".");
    };

    function evntrGetCookie(name, c) {
        cookies = window.document.cookie.split(";");
        name_re = RegExp("^\\s*" + name + "=\\s*(.*?)\\s*$");
        for (var i = 0; i < cookies.length; i++) {
            if (c = cookies[i].match(name_re)) {
                return c[1];
            }
        }
    };

    function evntrSetCookie() {
        var t = evntrGenCid();
        var c = "_evntr" + "=" + t + "; path=/; ";
        c += "expires=" + (new Date((new Date).getTime() + 63072000000)).toGMTString() + "; ";
        c += "domain=." + window.location.host;
        document.cookie = c;
        return c;
    };

    function evntrCheckCookie() {
        var c = evntrGetCookie("_evntr");
        if (!c) c = evntrSetCookie();
        return c;
    };

    function evntrGetCid() {
        return evntrCheckCookie().split(".").slice(1).join(".");
    };

    var baseUrl = "//e.livingsocial.com/pixel";

    window['eventer'].q = window['eventer'].q || [];

    window['eventer'].q.push = function () {
        window.setTimeout(evntrProcessQueue, 100);
        return Array.prototype.push.apply(this,arguments);
    };

    function evntrProcessQueue() {

        var q = window['eventer'].q;
        var d = document;
        var w = window;
        var c = 0;

        while (q.length) {
            var args = Array.prototype.slice.call(q.shift(), 0);
            var url = baseUrl + "?v=1";

            url += "&d="+args.toString();
            url += "&cid="+evntrGetCid();
            url += "&z="+Math.round(Math.random()*2147483647);
            url += "&de="+(d.characterSet || d.charset);
            url += "&sr="+w.screen.width+"x"+w.screen.height;
            url += "&vp="+evntrVPSize();
            url += "&ul="+evntrLang();
            url += "&sd="+(w.screen && w.screen.colorDepth || "") + "-bit";
            url += "&fl="+evntrFlash();
            url += "&je="+evntrJava();
            url += "&dl="+evntrEncode(document.location);

            var img = document.createElement("img");
            img.width = 1;
            img.height = 1;
            img.src = url;   // This causes HTTP request

            c++;
        }
        if (c) {
            // console.log("sent some stuff...");
        } else {
            // console.log("nothing to send...");
        }
    };

    // process queue once
    evntrProcessQueue();

})()
