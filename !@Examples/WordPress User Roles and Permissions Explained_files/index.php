//===============================
// Kayako LiveResponse
// Copyright (c) 2001-2015

// http://www.kayako.com
// License: http://www.kayako.com/license.txt
//===============================

var sessionid_dj2gdo2p = "oh848mjosf76gmle7xvazmmye0m4hmoj";
var geoip_dj2gdo2p = new Array();

var hasnotes_dj2gdo2p = "0";
var isnewsession_dj2gdo2p = "1";
var repeatvisit_dj2gdo2p = "1";
var lastvisittimeline_dj2gdo2p = "0";
var lastchattimeline_dj2gdo2p = "0";
var isfirsttime_dj2gdo2p = 1;
var timer_dj2gdo2p = 0;
var imagefetch_dj2gdo2p = 0;
var updateurl_dj2gdo2p = "";
var screenHeight_dj2gdo2p = window.screen.availHeight;
var screenWidth_dj2gdo2p = window.screen.availWidth;
var colorDepth_dj2gdo2p = window.screen.colorDepth;
var timeNow = new Date();
var referrer = escape(document.referrer);
var windows_dj2gdo2p, mac_dj2gdo2p, linux_dj2gdo2p;
var ie_dj2gdo2p, op_dj2gdo2p, moz_dj2gdo2p, misc_dj2gdo2p, browsercode_dj2gdo2p, browsername_dj2gdo2p, browserversion_dj2gdo2p, operatingsys_dj2gdo2p;
var dom_dj2gdo2p, ienew, ie4_dj2gdo2p, ie5_dj2gdo2p, ie6_dj2gdo2p, ie7_dj2gdo2p, ie8_dj2gdo2p, moz_rv_dj2gdo2p, moz_rv_sub_dj2gdo2p, ie5mac, ie5xwin, opnu_dj2gdo2p, op4, op5_dj2gdo2p, op6_dj2gdo2p, op7_dj2gdo2p, op8_dj2gdo2p, op9_dj2gdo2p, op10_dj2gdo2p, saf_dj2gdo2p, konq_dj2gdo2p, chrome_dj2gdo2p, ch1_dj2gdo2p, ch2_dj2gdo2p, ch3_dj2gdo2p;
var appName_dj2gdo2p, appVersion_dj2gdo2p, userAgent_dj2gdo2p;
var appName_dj2gdo2p = navigator.appName;
var appVersion_dj2gdo2p = navigator.appVersion;
var userAgent_dj2gdo2p = navigator.userAgent;
var dombrowser = "default";
var isChatRunning_dj2gdo2p = 0;
var title = document.title;
var proactiveImageUse_dj2gdo2p = new Image();
windows_dj2gdo2p = (appVersion_dj2gdo2p.indexOf('Win') != -1);
mac_dj2gdo2p = (appVersion_dj2gdo2p.indexOf('Mac') != -1);
linux_dj2gdo2p = (appVersion_dj2gdo2p.indexOf('Linux') != -1);
if (!document.layers) {
	dom_dj2gdo2p = (document.getElementById ) ? document.getElementById : false;
} else {
	dom_dj2gdo2p = false;
}
var myWidth = 0, myHeight = 0;
if( typeof( window.innerWidth ) == 'number' ) {
	//Non-IE
	myWidth = window.innerWidth;
	myHeight = window.innerHeight;
} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	//IE 6+ in 'standards compliant mode'
	myWidth = document.documentElement.clientWidth;
	myHeight = document.documentElement.clientHeight;
} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	//IE 4 compatible
	myWidth = document.body.clientWidth;
	myHeight = document.body.clientHeight;
}
winH = myHeight;
winW = myWidth;
misc_dj2gdo2p = (appVersion_dj2gdo2p.substring(0,1) < 4);
op_dj2gdo2p = (userAgent_dj2gdo2p.indexOf('Opera') != -1);
moz_dj2gdo2p = (userAgent_dj2gdo2p.indexOf('Gecko') != -1);
chrome_dj2gdo2p=(userAgent_dj2gdo2p.indexOf('Chrome') != -1);
if (document.all) {
	ie_dj2gdo2p = (document.all && !op_dj2gdo2p);
}
saf_dj2gdo2p=(userAgent_dj2gdo2p.indexOf('Safari') != -1);
konq_dj2gdo2p=(userAgent_dj2gdo2p.indexOf('Konqueror') != -1);

if (op_dj2gdo2p) {
	op_pos = userAgent_dj2gdo2p.indexOf('Opera');
	opnu_dj2gdo2p = userAgent_dj2gdo2p.substr((op_pos+6),4);
	op5_dj2gdo2p = (opnu_dj2gdo2p.substring(0,1) == 5);
	op6_dj2gdo2p = (opnu_dj2gdo2p.substring(0,1) == 6);
	op7_dj2gdo2p = (opnu_dj2gdo2p.substring(0,1) == 7);
	op8_dj2gdo2p = (opnu_dj2gdo2p.substring(0,1) == 8);
	op9_dj2gdo2p = (opnu_dj2gdo2p.substring(0,1) == 9);
	op10_dj2gdo2p = (opnu_dj2gdo2p.substring(0,2) == 10);
} else if (chrome_dj2gdo2p) {
	chrome_pos = userAgent_dj2gdo2p.indexOf('Chrome');
	chnu = userAgent_dj2gdo2p.substr((chrome_pos+7),4);
	ch1_dj2gdo2p = (chnu.substring(0,1) == 1);
	ch2_dj2gdo2p = (chnu.substring(0,1) == 2);
	ch3_dj2gdo2p = (chnu.substring(0,1) == 3);
} else if (moz_dj2gdo2p){
	rv_pos = userAgent_dj2gdo2p.indexOf('rv');
	moz_rv_dj2gdo2p = userAgent_dj2gdo2p.substr((rv_pos+3),3);
	moz_rv_sub_dj2gdo2p = userAgent_dj2gdo2p.substr((rv_pos+7),1);
	if (moz_rv_sub_dj2gdo2p == ' ' || isNaN(moz_rv_sub_dj2gdo2p)) {
		moz_rv_sub_dj2gdo2p='';
	}
	moz_rv_dj2gdo2p = moz_rv_dj2gdo2p + moz_rv_sub_dj2gdo2p;
} else if (ie_dj2gdo2p){
	ie_pos = userAgent_dj2gdo2p.indexOf('MSIE');
	ienu = userAgent_dj2gdo2p.substr((ie_pos+5),3);
	ie4_dj2gdo2p = (!dom_dj2gdo2p);
	ie5_dj2gdo2p = (ienu.substring(0,1) == 5);
	ie6_dj2gdo2p = (ienu.substring(0,1) == 6);
	ie7_dj2gdo2p = (ienu.substring(0,1) == 7);
	ie8_dj2gdo2p = (ienu.substring(0,1) == 8);
}

if (konq_dj2gdo2p) {
	browsercode_dj2gdo2p = "KO";
	browserversion_dj2gdo2p = appVersion_dj2gdo2p;
	browsername_dj2gdo2p = "Konqueror";
} else if (chrome_dj2gdo2p) {
	browsercode_dj2gdo2p = "CH";
	if (ch1_dj2gdo2p) {
		browserversion_dj2gdo2p = "1";
	} else if (ch2_dj2gdo2p) {
		browserversion_dj2gdo2p = "2";
	} else if (ch3_dj2gdo2p) {
		browserversion_dj2gdo2p = "3";
	}

	browsername_dj2gdo2p = "Google Chrome";
} else if (saf_dj2gdo2p) {
	browsercode_dj2gdo2p = "SF";
	browserversion_dj2gdo2p = appVersion_dj2gdo2p;
	browsername_dj2gdo2p = "Safari";
} else if (op_dj2gdo2p) {
	browsercode_dj2gdo2p = "OP";
	if (op5_dj2gdo2p) {
		browserversion_dj2gdo2p = "5";
	} else if (op6_dj2gdo2p) {
		browserversion_dj2gdo2p = "6";
	} else if (op7_dj2gdo2p) {
		browserversion_dj2gdo2p = "7";
	} else if (op8_dj2gdo2p) {
		browserversion_dj2gdo2p = "8";
	} else if (op9_dj2gdo2p) {
		browserversion_dj2gdo2p = "9";
	} else if (op10_dj2gdo2p) {
		browserversion_dj2gdo2p = "10";
	} else {
		browserversion_dj2gdo2p = appVersion_dj2gdo2p;
	}
	browsername_dj2gdo2p = "Opera";
} else if (moz_dj2gdo2p) {
	browsercode_dj2gdo2p = "MO";
	browserversion_dj2gdo2p = appVersion_dj2gdo2p;
	browsername_dj2gdo2p = "Firefox";
} else if (ie_dj2gdo2p) {
	browsercode_dj2gdo2p = "IE";
	if (ie4_dj2gdo2p) {
		browserversion_dj2gdo2p = "4";
	} else if (ie5_dj2gdo2p) {
		browserversion_dj2gdo2p = "5";
	} else if (ie6_dj2gdo2p) {
		browserversion_dj2gdo2p = "6";
	} else if (ie7_dj2gdo2p) {
		browserversion_dj2gdo2p = "7";
	} else if (ie8_dj2gdo2p) {
		browserversion_dj2gdo2p = "8";
	} else {
		browserversion_dj2gdo2p = appVersion_dj2gdo2p;
	}
	browsername_dj2gdo2p = "Internet Explorer";
}

if (windows_dj2gdo2p) {
	operatingsys_dj2gdo2p = "Windows";
} else if (linux_dj2gdo2p) {
	operatingsys_dj2gdo2p = "Linux";
} else if (mac_dj2gdo2p) {
	operatingsys_dj2gdo2p = "Mac";
} else {
	operatingsys_dj2gdo2p = "Unkown";
}

if (document.getElementById)
{
	dombrowser = "default";
} else if (document.layers) {
	dombrowser = "NS4";
} else if (document.all) {
	dombrowser = "IE4";
}

var proactiveX = 20;
var proactiveXStep = 1;
var proactiveDelayTime = 100;

var proactiveY = 0;
var proactiveOffsetHeight=0;
var proactiveYStep = 0;
var proactiveAnimate = false;

function browserObject_dj2gdo2p(objid)
{
	if (dombrowser == "default")
	{
		return document.getElementById(objid);
	} else if (dombrowser == "NS4") {
		return document.layers[objid];
	} else if (dombrowser == "IE4") {
		return document.all[objid];
	}
}

function doRand_dj2gdo2p()
{
	var num;
	now=new Date();
	num=(now.getSeconds());
	num=num+1;
	return num;
}

function getCookie_dj2gdo2p(name) {
	var crumb = document.cookie;
	var index = crumb.indexOf(name + "=");
	if (index == -1) return null;
	index = crumb.indexOf("=", index) + 1;
	var endstr = crumb.indexOf(";", index);
	if (endstr == -1) endstr = crumb.length;
	return unescape(crumb.substring(index, endstr));
}

function deleteCookie_dj2gdo2p(name) {
	var expiry = new Date();
	document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT" +  "; path=/";
}

function elapsedTime_dj2gdo2p()
{
	if (typeof _elapsedTimeStatusIndicator == 'undefined') {
		_elapsedTimeStatusIndicator = 'dj2gdo2p';
	} else if (typeof _elapsedTimeStatusIndicator == 'string' && _elapsedTimeStatusIndicator != 'dj2gdo2p') {

		return;
	}


	if (timer_dj2gdo2p < 3600)
	{
		timer_dj2gdo2p++;
		imagefetch_dj2gdo2p++;

		if (imagefetch_dj2gdo2p > 0) {
			imagefetch_dj2gdo2p = 0;
			doStatusLoop_dj2gdo2p();
		}

					setTimeout("elapsedTime_dj2gdo2p();", 1000);
		
	}
}


var Base64_dj2gdo2p = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64_dj2gdo2p._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	}
}

function doStatusLoop_dj2gdo2p() {
	date1 = new Date();
	var _finalPageTitle=Base64_dj2gdo2p.encode(title);

	var _finalWindowLocation = encodeURIComponent(decodeURIComponent(window.location));
	var _referrerURL = encodeURIComponent(decodeURIComponent(document.referrer));
	updateurl_dj2gdo2p = "https://support.magneticone.com/visitor/index.php?/LiveChat/VisitorUpdate/UpdateFootprint/_time="+date1.getTime()+"/_randomNumber="+doRand_dj2gdo2p()+"/_url="+_finalWindowLocation+"/_isFirstTime="+encodeURIComponent(isfirsttime_dj2gdo2p)+"/_sessionID="+encodeURIComponent(sessionid_dj2gdo2p)+"/_referrer="+_referrerURL+"/_resolution="+encodeURIComponent(screenWidth_dj2gdo2p+"x"+screenHeight_dj2gdo2p)+"/_colorDepth="+encodeURIComponent(colorDepth_dj2gdo2p)+"/_platform="+encodeURIComponent(navigator.platform)+"/_appVersion="+encodeURIComponent(navigator.appVersion)+"/_appName="+encodeURIComponent(navigator.appName)+"/_browserCode="+encodeURIComponent(browsercode_dj2gdo2p)+"/_browserVersion="+encodeURIComponent(browserversion_dj2gdo2p)+"/_browserName="+encodeURIComponent(browsername_dj2gdo2p)+"/_operatingSys="+encodeURIComponent(operatingsys_dj2gdo2p)+"/_pageTitle="+encodeURIComponent(_finalPageTitle)+"/_hasNotes="+encodeURIComponent(hasnotes_dj2gdo2p)+"/_repeatVisit="+encodeURIComponent(repeatvisit_dj2gdo2p)+"/_lastVisitTimeline="+encodeURIComponent(lastvisittimeline_dj2gdo2p)+"/_lastChatTimeline="+encodeURIComponent(lastchattimeline_dj2gdo2p)+"/_isNewSession="+encodeURIComponent(isnewsession_dj2gdo2p);

	proactiveImageUse_dj2gdo2p = new Image();
	proactiveImageUse_dj2gdo2p.onload = imageLoaded_dj2gdo2p;
	proactiveImageUse_dj2gdo2p.src = updateurl_dj2gdo2p;

	isfirsttime_dj2gdo2p = 0;
}

function startChat_dj2gdo2p(proactive)
{
	isChatRunning_dj2gdo2p = 1;

	docWidth = (winW-599)/2;
	docHeight = (winH-679)/2;

		_chatWindowURL = 'https://support.magneticone.com/visitor/index.php?/LiveChat/Chat/Request/_sessionID=' + sessionid_dj2gdo2p + '/_proactive=' + proactive + '/_filterDepartmentID=55/_randomNumber=' + doRand_dj2gdo2p() + '/_fullName=/_email=/_promptType=chat';
	


	chatwindow = window.open(_chatWindowURL,"customerchat"+doRand_dj2gdo2p(), "toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=yes,resizable=1,width=599,height=679,left="+docWidth+",top="+docHeight);

	hideProactiveChatData_dj2gdo2p();
}

function imageLoaded_dj2gdo2p() {
	if (!proactiveImageUse_dj2gdo2p)
	{
		return;
	}
	proactiveAction = proactiveImageUse_dj2gdo2p.width;

	if (proactiveAction == 3)
	{
		doProactiveInline_dj2gdo2p();
	} else if (proactiveAction == 4) {
		displayProactiveChatData_dj2gdo2p();
	}
}

function writeInlineRequestData_dj2gdo2p()
{
	docWidth = (winW-600)/2;
	docHeight = (winH-680)/2;

	var divData = '';
	divData += "<div style=\"float: left; width: 600px; background: #ffffff; border: solid 1px #bcb5a6;\"><iframe width=\"600\" height=\"680\" scrolling=\"auto\" frameborder=\"0\" src=\"\" name=\"inlinechatframe\" id=\"inlinechatframe\">error: no iframe support detected</iframe></div><div style=\"float: left; margin-left: -8px; margin-top: -8px;\"><a href=\"javascript: closeInlineProactiveRequest_dj2gdo2p();\"><img src=\"https://support.magneticone.com/__swift/themes/client/images/icon_close.png\" border=\"0\" align=\"absmiddle\" /></a></div>";


	var inlineChatElement = document.createElement("div");
	inlineChatElement.style.position = 'absolute';
	inlineChatElement.style.display = 'none';
	inlineChatElement.style.float = 'left';
	inlineChatElement.style.top = docHeight+'px';
	inlineChatElement.style.left = docWidth+'px';
	inlineChatElement.style.zIndex = 500;

	if (inlineChatElement.style.overflow) {
		inlineChatElement.style.overflow = 'none';
	}

	inlineChatElement.id = 'inlinechatdiv';
	inlineChatElement.innerHTML = divData;

	var proactiveChatContainer = document.getElementById('proactivechatcontainer' + swiftuniqueid);
	proactiveChatContainer.appendChild(inlineChatElement);
}

function writeProactiveRequestData_dj2gdo2p()
{
	docWidth = (winW-450)/2;
	docHeight = (winH-400)/2;

	var divData = '';
	divData += "<div id=\"proactivechatdiv\" style=\"display: block; left: 0px; bottom: 0px; z-index: 1100; position: fixed;\"><script>_gaq.push([\'_trackEvent\', \'proactive_window\', \'showed\',\'1\']);</script><div style=\"background: none repeat scroll 0 0 #f5f5f5;border: 3px solid #FFFFFF;border-radius: 6px 6px 6px 6px;box-shadow: 0 0 8px rgba(0, 0, 0, 0.19);float: left;min-width: 145px;padding: 10px 15px 10px 0;height: 194px;\">	<div style=\"BACKGROUND: url(\'https://support.magneticone.com/__swift/themes/client/images/photo-cs.png\') no-repeat scroll -21px 5px rgba(0, 0, 0, 0)\">				<div style=\"overflow:hidden;height: 173px;padding-top: 30px;padding-left: 190px;  text-align: center;\">			<div style=\"color: #0092be;font: 22px Arial;overflow: hidden;  text-align: left;margin-bottom:15px;\">Can I help you?</div>		<div style=\"TEXT-ALIGN: center;float:none;\">				<div style=\"display:inline-block;background: none no-repeat scroll 0 0 #FF7300;border-radius: 4px 4px 4px 4px;color: #FFFFFF;cursor: pointer;font-family: arial;font-size: 16px;font-weight: bold;height: 43px;line-height: 44px;margin: 8px 0 0;text-align: center;text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.28);vertical-align: middle;width: 140px;border:1px solid #c95302;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.26);\" onmouseover=\"this.style.background=\'#F15015\';\" onmouseout=\"this.style.background=\'#FF7300\';\" onclick=\"javascript:doProactiveRequest_dj2gdo2p();_gaq.push([\'_trackEvent\', \'proactive_window\', \'opened\',\'1\']);\">Chat Now</div>		</div>		<div style=\"color: #FFFFFF;float: none;font-family: arial;font-size: 12px;margin-top: 22px;\"><a style=\"color:#98DEFF;text-decoration:none;border-bottom: 1px solid #98DEFF;\" onmouseover=\"this.style.opacity=\'0.65\';\" onmouseout=\"this.style.opacity=\'1.0\'\" href=\"javascript:closeProactiveRequest_dj2gdo2p(); _gaq.push([\'_trackEvent\', \'proactive_window\', \'closed\',\'1\']);\">No, thanks</a></div>		<div style=\"clear:both;\"></div>		<!--<div style=\"color: white;font: 14px arial;margin-top: 21px;padding-top: 0;text-align: center;vertical-align: top;width: 360px;\">		Our team is ready to assist you. Click &quot;Chat Now&quot; to be connected to one instantly.		</div>-->		</div>	</div></div><div style=\"float: left;margin-left: -16px;margin-top: -11px;\"><a href=\"javascript:closeProactiveRequest_dj2gdo2p();\"><img src=\"https://support.magneticone.com/__swift/themes/client/images/icon_close.png\" border=\"0\" align=\"absmiddle\" /></a></div></div>";


	var proactiveElement = document.createElement("div");
	proactiveElement.style.position = 'absolute';
	proactiveElement.style.display = 'none';
	//proactiveElement.style.float = 'left';
	//proactiveElement.style.top = docHeight+'px';
	//proactiveElement.style.left = docWidth+'px';
	//proactiveElement.style.zIndex = 500;

	proactiveElement.style.left = '0';
	proactiveElement.style.bottom = '0';
	proactiveElement.style.zIndex = 1100;

	if (proactiveElement.style.overflow) {
		proactiveElement.style.overflow = 'none';
	}

	proactiveElement.id = 'proactivechatdiv';
	proactiveElement.innerHTML = divData;

	var proactiveChatContainer = document.getElementById('proactivechatcontainer' + swiftuniqueid);
	proactiveChatContainer.appendChild(proactiveElement);
}

function displayProactiveChatData_dj2gdo2p()
{
	if (proactiveAnimate == true) {
		return false;
	}

	writeObj = browserObject_dj2gdo2p("proactivechatdiv");
	if (writeObj)
	{
		docWidth = (winW-450)/2;
		docHeight = (winH-400)/2;
		proactiveY = docHeight;
		writeObj.top = docWidth;
		writeObj.left = docHeight;
		proactiveAnimate = true;
	}

	showDisplay_dj2gdo2p("proactivechatdiv");

	
}

function displayInlineChatData_dj2gdo2p()
{
	writeObj = browserObject_dj2gdo2p("inlinechatdiv");
	if (writeObj)
	{
		docWidth = (winW-600)/2;
		docHeight = (winH-680)/2;
		proactiveY = docHeight;
		writeObj.top = docHeight;
		writeObj.left = docWidth;

		acceptProactive = new Image();
		acceptProactive.src = "https://support.magneticone.com/visitor/index.php?/LiveChat/VisitorUpdate/AcceptProactive/_randomNumber="+doRand_dj2gdo2p()+"/_sessionID="+sessionid_dj2gdo2p;

		inlineChatFrameObj = browserObject_dj2gdo2p("inlinechatframe");
		_iframeURL = 'https://support.magneticone.com/visitor/index.php?/LiveChat/Chat/StartInline/_sessionID=oh848mjosf76gmle7xvazmmye0m4hmoj/_proactive=1/_filterDepartmentID=55/_fullName=/_email=/_inline=1/';
		if (inlineChatFrameObj && inlineChatFrameObj.src != _iframeURL && writeObj.style.display == 'none') {
			inlineChatFrameObj.src = _iframeURL;
		}
	}

	showDisplay_dj2gdo2p("inlinechatdiv");
}

function hideProactiveChatData_dj2gdo2p()
{
	hideDisplay_dj2gdo2p("proactivechatdiv");
	hideDisplay_dj2gdo2p("inlinechatdiv");
}

function doProactiveInline_dj2gdo2p()
{
	displayInlineChatData_dj2gdo2p();
}

function doProactiveRequest_dj2gdo2p()
{
	acceptProactive = new Image();
	acceptProactive.src = "https://support.magneticone.com/visitor/index.php?/LiveChat/VisitorUpdate/AcceptProactive/_randomNumber="+doRand_dj2gdo2p()+"/_sessionID="+sessionid_dj2gdo2p;

	startChat_dj2gdo2p("4");
}

function closeProactiveRequest_dj2gdo2p()
{
	rejectProactive = new Image();
	date1 = new Date();
	proactiveAnimate = false;
	rejectProactive.src = "https://support.magneticone.com/visitor/index.php?/LiveChat/VisitorUpdate/ResetProactive/_time="+date1.getTime()+"/_randomNumber="+doRand_dj2gdo2p()+"/_sessionID="+sessionid_dj2gdo2p;

	hideProactiveChatData_dj2gdo2p();
}

function closeInlineProactiveRequest_dj2gdo2p()
{
	rejectProactive = new Image();
	date1 = new Date();
	rejectProactive.src = "https://support.magneticone.com/visitor/index.php?/LiveChat/VisitorUpdate/ResetProactive/_time="+date1.getTime()+"/_randomNumber="+doRand_dj2gdo2p()+"/_sessionID="+sessionid_dj2gdo2p;
	var bodyElement = document.getElementsByTagName('body');

	document.getElementById('inlinechatframe').contentWindow.CloseProactiveChat();
//	window.frames.inlinechatframe.CloseProactiveChat();

	if (bodyElement[0])
	{
		var inlineDivElement = browserObject_dj2gdo2p('inlinechatdiv');
		if (inlineDivElement) {
			var _parentNode = inlineDivElement.parentNode;
			_parentNode.removeChild(inlineDivElement);
		}
	}
}

function switchDisplay_dj2gdo2p(objid)
{
	result = browserObject_dj2gdo2p(objid);
	if (!result)
	{
		return;
	}

	if (result.style.display == "none")
	{
		result.style.display = "block";
	} else {
		result.style.display = "none";
	}
}

function hideDisplay_dj2gdo2p(objid)
{
	result = browserObject_dj2gdo2p(objid);
	if (!result)
	{
		return;
	}

	result.style.display = "none";
}

function showDisplay_dj2gdo2p(objid)
{
	result = browserObject_dj2gdo2p(objid);
	if (!result)
	{
		return;
	}

	result.style.display = "block";
}

function updateProactivePosition_dj2gdo2p()
{
	writeObj = browserObject_dj2gdo2p("proactivechatdiv");
	writeObjInline = browserObject_dj2gdo2p("inlinechatdiv");

	docHeight = (winH-412)/2;
	docHeightInline = (winH-680)/2;

	finalTopValue = docHeight + document.body.scrollTop;
	if (finalTopValue < 0) {
		finalTopValue = 10;
	}

	finalTopValueInline = docHeightInline + document.body.scrollTop;
	if (finalTopValueInline < 0) {
		finalTopValueInline = 10;
	}

	if (writeObj) {
		writeObj.style.top = finalTopValue + "px";
	}

	if (writeObjInline) {
		writeObjInline.style.top = finalTopValueInline + "px";
	}
}

function animateProactiveDiv_dj2gdo2p()
{
	writeObj = browserObject_dj2gdo2p("proactivechatdiv");

	if (!writeObj) {
		return false;
	}

	if(proactiveYStep == 0){proactiveY = proactiveY-proactiveXStep;} else {proactiveY = proactiveY+proactiveXStep;}

	proactiveOffsetHeight = writeObj.offsetHeight;
	if(proactiveY < 0){proactiveYStep = 1; proactiveY=0; }
	if(proactiveY >= (myHeight - proactiveOffsetHeight)){proactiveYStep=0; proactiveY=(myHeight-proactiveOffsetHeight);}

	finalTopValue = proactiveY+document.body.scrollTop;
	if (finalTopValue < 0) {
		finalTopValue = 10;
	}

	writeObj.style.top = finalTopValue+"px";

	if (proactiveAnimate) {
		setTimeout('animateProactiveDiv_dj2gdo2p()', proactiveDelayTime);
	}
}

	writeProactiveRequestData_dj2gdo2p(); writeInlineRequestData_dj2gdo2p();


elapsedTime_dj2gdo2p();

var oldEvtScroll = window.onscroll; window.onscroll = function() { if (oldEvtScroll) { updateProactivePosition_dj2gdo2p(); } }

var swifttagdiv=document.createElement("div");swifttagdiv.innerHTML = "<a href=\"javascript:startChat_dj2gdo2p(\'0\');\" onMouseOver=\"window.status=\'Live Chat is offline. Click here to leave a message.\'; return true;\" onMouseOut=\"window.status=\'\'; return true;\"><img src=\"https://support.magneticone.com/__swift/files/file_e0pv9osw874ogou.png\" border=\"0\" alt=\"Live Chat is offline. Click here to leave a message.\" title=\"Live Chat is offline. Click here to leave a message.\"></a>";document.getElementById("swifttagdatacontainer91inxrt9gi").appendChild(swifttagdiv);