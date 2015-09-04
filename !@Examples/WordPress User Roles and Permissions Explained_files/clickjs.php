function PAPURLEncode(url) {
    var SAFECHARS = "0123456789" + // Numeric
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + // Alphabetic
                    "abcdefghijklmnopqrstuvwxyz" + "-_.!~*'()"; // RFC2396 Mark characters
    var HEX = "0123456789ABCDEF"; 

    var plaintext = url;
    
    if (plaintext.substr(0, 7) == "http://") {
        plaintext = "H_" + plaintext.substr(7); 
    } else if (plaintext.substr(0, 8) == "http://") {
        plaintext = "S_" + plaintext.substr(8);
    }
    
    var encoded = "";
    for (var i = 0; i < plaintext.length; i++ ) {
        var ch = plaintext.charAt(i);
        if (ch == " ") {
           encoded += "+"; // x-www-urlencoded, rather than %20
        } else if (SAFECHARS.indexOf(ch) != -1) {
            encoded += ch;
        } else {
            var charCode = ch.charCodeAt(0);
            if (charCode > 255) {
                encoded += "+";
            } else {
                encoded += "%";
                encoded += HEX.charAt((charCode >> 4) & 0xF);
                encoded += HEX.charAt(charCode & 0xF);
            }
        }
    } 
    return encoded;
}

function getTrackingParams() {
    if (document.location.search != '' && containsAffiliateIdParameter(document.location.search)) {
        return document.location.search;
    }
    if (document.location.hash != '') {
        return '?' + document.location.hash.substring(1);
    }
    return '';
}

function containsAffiliateIdParameter(text) {
    return (text.indexOf('a_aid=') >= 0);
}

var Tracker = function(lid) {
    this._lid = lid;
    this._running = true;
    
    var trackingUrl = new String(document.getElementById('pap_x2s6df8d').src);
    this._trackingUrl = trackingUrl.substr(0, Math.max(trackingUrl.lastIndexOf('\\'), trackingUrl.lastIndexOf('/'))+1);
    
    this._cookies = new Array();
};

Tracker.prototype._getFlashVersion = function() {
    var version = "", n=navigator, i;
    if (n.plugins && n.plugins.length) {
        for (i=0; i < n.plugins.length;i++) {
            if (n.plugins[i].name.indexOf('Shockwave Flash')!=-1) {
                version = n.plugins[i].description.split('Shockwave Flash ')[1];
                break;
            }
        }
     } else if (window.ActiveXObject) {
        for (i=10; i>=4; i--) {
        try {
            var result = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+i+"');");
            if (result) { 
                version = i + '.0'; 
                break; 
            }
        }
        catch(e) {}
        }
     }
     return version;
};


Tracker.prototype._isFlashActive = function() {
    var version = this._getFlashVersion();
    return !(version === "" || version < 5); 
};

Tracker.prototype._existsCookie = function(name) {
    var cookies = document.cookie.split("; ");
    for (var i=0; i < cookies.length; i++) {
        var pair = cookies[i].split("=");
        if (name == pair[0]) {
            return true;
        }
    }
    return false;       
};

Tracker.prototype._setCookie = function(name, value, expires, overwrite) {
    var cookie = new Object();
    cookie.name = name;
    cookie.value = value;
    cookie.expires = expires;
    cookie.overwrite = overwrite;
    this._cookies[this._cookies.length] = cookie;
};

Tracker.prototype._getFlashParams = function() {
    var params = "";
    for(var i=0; i < this._cookies.length; i++) {
        params += "&amp;n" + i + "=" + this._cookies[i].name;
        params += "&amp;v" + i + "=" + escape(this._cookies[i].value);
        params += "&amp;e" + i + "=" + this._cookies[i].expires;
        if(this._cookies[i].overwrite == "1") {
            params += "&amp;ne" + i + "=0";
        } else {
            params += "&amp;ne" + i + "=1";
        }
    }
    return "?a=w" + params;
};
    
Tracker.prototype._getExpiresString = function(expires) {
    var dateParts = expires.split('-');
    var date = new Date();
    date.setFullYear(dateParts[0], dateParts[1] - 1, dateParts[2]);
    return date.toGMTString();
};

Tracker.prototype._getNormalCookie = function(name) {
    var nameequals = name + "=";
    var beginpos = 0;
    var beginpos2 = 0;
    while (beginpos < document.cookie.length) {
        beginpos2 = beginpos + name.length + 1;
        if (document.cookie.substring(beginpos, beginpos2) == nameequals) {
            var endpos = document.cookie.indexOf (";", beginpos2);
            if (endpos == -1) 
                endpos = document.cookie.length;
            return unescape(document.cookie.substring(beginpos2, endpos));
        }
        beginpos = document.cookie.indexOf(" ", beginpos) + 1;
        if (beginpos == 0) break;
    }
            
    return null;
};
    
Tracker.prototype.track = function() {
    var trackingParams = getTrackingParams();
    if (this._aid != '') {
        trackingParams = trackingParams + (trackingParams == '' ? '?' : '&') +
            "AffiliateID=" + this._aid;
    }
    if (this._bid != '') {
        trackingParams = trackingParams + (trackingParams == '' ? '?' : '&') +
            "BannerID=" + this._bid;
    }
    if (this._cid != '') {
        trackingParams = trackingParams + (trackingParams == '' ? '?' : '&') +
            "CampaignID=" + this._cid ;
    }
    if (this._chan != '') {
        trackingParams = trackingParams + (trackingParams == '' ? '?' : '&') +
            "Channel=" + this._chan ;
    }
    if(document.referrer != '') {
        trackingParams = trackingParams + (trackingParams == '' ? '?' : '&') +
            "refe=" + PAPURLEncode(document.referrer);
    }
    if(trackingParams !== '') {
        document.write("<script type=\"text/javascript\" src=\"" + this._trackingUrl + "click.php" +
            trackingParams + "&lid=" + this._lid + "&ls=1&cjs=y" + "&pd1=" + this._data1 + "&pd2=" + this._data2 + "\"><\/script>");
    } else {
        this._running = false;
    }
};

Tracker.prototype.setCookie = function(name, value, expires, overwrite) {
    if(overwrite == 1 || !this._existsCookie(name)) {
        document.cookie = name+'='+escape(value)+';expires=' + this._getExpiresString(expires) + ';path=/';   
    }
    this._setCookie(name, value, expires, overwrite);
};

Tracker.prototype.setTimeCookie = function(name, value, expires, oldClickCount) {
    var timeCookieStr = this._getNormalCookie(name);
    if (timeCookieStr != null && timeCookieStr.length > 20) {
        var timeCookie = timeCookieStr.split("_");
        var valueSplit = value.split("_");
        if (timeCookie.length == 3) {
            var clickCount = parseInt(timeCookie[2]);
            if (clickCount != oldClickCount) clickCount++;
            timeCookieStr = timeCookie[0]+"_"+valueSplit[1]+"_"+(clickCount);
        } else {
            timeCookieStr = value;
        }
    } else {
        timeCookieStr = value;
    }
    
    document.cookie = name+'='+escape(timeCookieStr)+';expires=' + this._getExpiresString(expires) + ';path=/';   
    this._setCookie(name, value, expires, '0');
};

Tracker.prototype.isRunning = function() {
    return this._running;
}

Tracker.prototype.trackNext = function() {
    if(this._isFlashActive()) {
        document.write("<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" " +
        "codebase=\"" + ((this._trackingUrl.substr(0, 5) == "https") ? "https" : "http") + "://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0\" " +
        "width=\"1px\" height=\"1px\"> " +
        "<param name=\"allowScriptAccess\" value=\"always\" />" +
        "<param name=\"movie\" value=\"" + this._trackingUrl + "pap.swf"+ this._getFlashParams() +"\" /> " +
        "<embed src=\"" + this._trackingUrl + "pap.swf"+ this._getFlashParams() +"\" width=\"1px\" height=\"1px\" allowScriptAccess=\"always\"/> " +
        "</object>");
    }
    this._running = false;
};

var _tracker; 

function papTrack() {
    try {
        _tracker = new Tracker(_lid);
    } catch (err) {
        _tracker = new Tracker('');
    }
    try { _tracker._data1 = Data1;     } catch (err) { _tracker._data1 = ''; }
    try { _tracker._data2 = Data2;     } catch (err) { _tracker._data2 = ''; }
    try { _tracker._aid = AffiliateID; } catch (err) { _tracker._aid = ''; }
    try { _tracker._bid = BannerID;    } catch (err) { _tracker._bid = ''; }
    try { _tracker._cid = CampaignID;  } catch (err) { _tracker._cid = ''; }
    try { _tracker._chan = Channel;    } catch (err) { _tracker._chan = ''; }           
    _tracker.track();
}
