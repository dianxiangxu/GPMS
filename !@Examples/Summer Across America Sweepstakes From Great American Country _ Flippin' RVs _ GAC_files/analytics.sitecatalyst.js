
	        CQ_Analytics.registerAfterCallback(function(options) {
	            if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
	                return false;    // component not in framework, skip SC callback
	            CQ_Analytics.Sitecatalyst.saveEvars();
	            CQ_Analytics.Sitecatalyst.updateEvars(options);
	            CQ_Analytics.Sitecatalyst.updateLinkTrackVars();
	            return false;
	        }, 10);
	
	        CQ_Analytics.registerAfterCallback(function(options) {
	            if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
	                return false;    // component not in framework, skip SC callback
	            s = s_gi("scrippsgactv");
	            if (s.linkTrackVars == "None") {
	                s.linkTrackVars = "events";
	            } else {
	                s.linkTrackVars = s.linkTrackVars + ",events";
	            }
	            CQ_Analytics.Sitecatalyst.trackLink(options);
	            return false;
	        }, 100);
	
	
	        CQ_Analytics.registerAfterCallback(function(options) {
	            if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
	                return false;    // component not in framework, skip SC callback
	            CQ_Analytics.Sitecatalyst.restoreEvars();
	            return false;
	        }, 200);
	
	        CQ_Analytics.adhocLinkTracking = "false";
	        
	
	
	        var s_account = "scrippsgactv";
	        var s = s_gi(s_account);
	        s.fpCookieDomainPeriods = "2";
	        s.currencyCode= 'USD';
        s.trackInlineStats= true;
        s.charSet= 'UTF-8';
        s.linkTrackVars= '\"None\"';
        s.linkTrackEvents= '\"None\"';
        s.linkDownloadFileTypes= 'exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx';
        s.trackDownloadLinks= true;
        s.linkLeaveQueryString= false;
        s.linkExternalFilters= '';
        s.useForcedLinkTracking= false;
        s.trackExternalLinks= true;
        s.linkInternalFilters= 'javascript:,blogs.scrippsnetworks.com,greatamericancountry.com,gactv.com';
        s.trackDownLoadLinks= true;
        
        s.visitorNamespace = "ewscripps";
        s.trackingServer = "sa.greatamericancountry.com";
        s.trackingServerSecure = "sslsa.greatamericancountry.com";
        
        //GAC CQ s_code: updated 07/01/2015

//Capture Ad Impressions/IDs from previous page
try {
	s.list1=localStorage.getItem("analyticsdfpslots");
	s.eVar59=localStorage.getItem("analyticsdfppage");
	localStorage.removeItem("analyticsdfpslots");
	localStorage.removeItem("analyticsdfppage");
}
catch(e) {}

s.usePlugins=true;
function s_doPlugins(s) {
//Campaign
s.eVar3=s.getQueryParam('xp');
s.eVar11=s.getQueryParam('c1');
s.eVar12=s.getQueryParam('c2');
s.eVar13=s.getQueryParam('c3');
s.eVar14=s.getQueryParam('c4');
s.eVar2=s.getQueryParam('nl');
if (s.eVar2 == ""){s.eVar2=s.getQueryParam('sni_mid');}
s.eVar37=s.getQueryParam('oc');
s.eVar38=s.getQueryParam('vty');
s.eVar69=s.getQueryParam('ic1');

s.eVar63=s.getQueryParam('c32');
s.eVar64=s.getQueryParam('bid');

if (location.search.indexOf("c1=") != -1 && location.search.indexOf("ic1=") == -1) {s.campaign=s.getQueryParam("c1");}
else if (location.search.indexOf("soc=") !="-1") {s.campaign=s.getQueryParam('soc');}
else if (location.search.indexOf("syc=") !="-1") {s.campaign="syc: " + s.getQueryParam('syc');}
else if (location.search.indexOf("vpid=") !="-1") {s.campaign="vpid: " + s.getQueryParam('vpid');}
else if (location.search.indexOf("nl=") !="-1") {s.campaign="nl: " + s.getQueryParam('nl');}
else if (location.search.indexOf("sni_mid=") !="-1") {s.campaign="nl: " + s.getQueryParam('sni_mid');}
else if (location.search.indexOf("oc=") !="-1") {s.campaign="oc: " + s.getQueryParam('oc');}
else if (location.search.indexOf("vty=") !="-1") {s.campaign="vty: " + s.getQueryParam('vty');}


/* Get New and Repeat Visitor Information reset 2 years */
s.prop13=s.getNewRepeat(30);

s.server="D=User-Agent";
s.prop28="D=g";


//Capture overlay metadata when exists and page-equivalent data when no overlay *******
if(mdManager.getParameterString("Overlay_TagGroup1") != "") {s.products=mdManager.getParameterString("Overlay_TagGroup1");}
else {s.products=mdManager.getParameterString("TagGroup1");}
if(mdManager.getParameterString("Overlay_Show") != "") {s.prop44=mdManager.getParameterString("Overlay_Show");}
else {s.prop44=mdManager.getParameterString("Show_Abbr");}
if(mdManager.getParameterString("Overlay_Professional") != "") {s.prop63=mdManager.getParameterString("Overlay_Professional");}
else {s.prop63=mdManager.getParameterString("Professional");}
if(mdManager.getParameterString("Overlay_TalentName") != "") {s.prop12=mdManager.getParameterString("Overlay_TalentName");}
else {s.prop12=mdManager.getParameterString("TalentName");}
if(mdManager.getParameterString("Overlay_Editor") != "") {s.prop64=mdManager.getParameterString("Overlay_Editor");}
else {s.prop64=mdManager.getParameterString("Editor");}
if(mdManager.getParameterString("Overlay_Partner") != "") {s.prop66=mdManager.getParameterString("Overlay_Partner");}
else {s.prop66=mdManager.getParameterString("Partner");}
if(mdManager.getParameterString("Overlay_UniqueID") != "") {s.prop9=mdManager.getParameterString("Overlay_UniqueID");}
else {s.prop9=mdManager.getParameterString("UniqueID");}
//*******

if(s.products != "") {s.events=s.apl(s.events,"prodView",",",2);}

s.prop1=mdManager.getParameterString("SubSection");
s.prop2=mdManager.getParameterString("SubSectionL2");
s.prop67=mdManager.getParameterString("PublishedDate");
s.prop69=mdManager.getParameterString("ImgUrl");
s.prop71=mdManager.getParameterString("OverlayURL");

if (mdManager.getParameterString("SctnDspName") == "") {
	s.prop5=mdManager.getParameterString("CategoryDspName");
}

var sniHost=location.host.toLowerCase();
var sniPath=location.pathname.toLowerCase();

if (sniHost=="www.diynetwork.com" || sniHost=="author.hgtv-prod2.sni.hgtv.com") {
	if (sniPath == "/") {
		s.channel="home";
		s.prop5="home";
	}
}


if(mdManager.getParameterString("hubtype") == "expert") {s.events=s.apl(s.events,"event25",",",2);}
if(mdManager.getParameterString("type") == "showpage") {s.events=s.apl(s.events,"event20",",",2);}
if(mdManager.getParameterString("type") == "episodepage") {s.events=s.apl(s.events,"event17",",",2);}
if(mdManager.getParameterString("type") == "print") {s.events=s.apl(s.events,"event11",",",2);}

/* TimeParting Code into One Variable */
var omniHour=s.getTimeParting('h','-5');
var omniDay=s.getTimeParting('d','-5');
var lenOH=omniHour.length;
switch(lenOH)
{
case 6:
    if (omniHour.indexOf(":30") == -1) {
            var aHour=omniHour.substring(0,1) + omniHour.substring(4,5);
    }
    else {
            var aHour=omniHour.substring(0,1) + ".5" + omniHour.substring(4,5);
    }
    break;
case 7:
    if (omniHour.indexOf(":30") == -1) {
            var aHour=omniHour.substring(0,2) + omniHour.substring(5,6);
    }
    else {
            var aHour=omniHour.substring(0,2) + ".5" + omniHour.substring(5,6);
    }
    break;
default:
            var aHour=omniHour;
}
var aDay=omniDay.substring(0,3);
s.prop33=aDay + "-" + aHour;

/*getPercentPageViewed and Previous Page*/
s.prop35=s.getPreviousValue(s.prop10 + " | " + s.pageName,'gpv_pn');
if (s.prop35) {
s.prop34=s.getPercentPageViewed();
if (s.prop35.length > 100){s.prop35=s.prop35.substring(0,100);}
}


//************Begin Profile IDs
var cUserID="";
var sniUserID="";

//1 - UR3 userLoginCookie
cUserID=getCookie("userLoginCookie");
if(cUserID != undefined) {if(cUserID !=null || cUserID !=""){sniUserID=cUserID.substring(8, cUserID.indexOf("|"));}}
if(sniUserID.indexOf(":") == 0) {sniUserID=sniUserID.substring(1)}  //***temp fix for TC since they're cookie starts with " character (unlike other Scripps sites)

//2 - sni core userIdCookie
if(sniUserID == "") {
	cUserID=getCookie("userIdCookie");
	if(cUserID != undefined) {
		if(cUserID != "" || cUserID !=null) {
			//if(cUserID.indexOf("emailZZZZ") == -1) {sniUserID=cUserID.substring(cUserID.indexOf("emailZZ")+7, cUserID.indexOf("createDate")-2);}
			if(cUserID.indexOf("emailZZZZ") == -1) {sniUserID=cUserID.substring(8, cUserID.indexOf("emailZZ")-2);}
		}
	}
}
if(sniUserID != ""){s.prop75="Logged In";}
else {s.prop75="Logged Out";}

//3 - mdManager userid
if(sniUserID == "") {
	if (typeof mdManager != "undefined") {sniUserID=mdManager.getParameterString("UserID");}
}

sniUserID=sniUserID.toLowerCase();
s.eVar10=sniUserID;

s.list2=getCookie("aam_fw") || "";
if (s.list2.indexOf('aam=') !== -1) {
	s.list2=s.list2.split(";",12).join(",").replace(/aam=/gi,"");
}
else {
	s.list2 = "";
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
//************End Profile IDs

var origPN=s.pageName || location.href;
s.pageName = s.pageName ? s.pageName : location.pathname;


//drop querystring
if (s.pageName.indexOf("?") != -1) {
	pnEnd=s.pageName.indexOf("?");
	s.pageName=s.pageName.substring(0, pnEnd);
}
//drop protocol
if (s.pageName.indexOf("http://") != -1) {
	pnBegin=s.pageName.indexOf("http://")+7;
	s.pageName=s.pageName.substring(pnBegin);
}
//truncate characters over 100
if (s.pageName.length > 100){
	s.pageName=s.pageName.substring(0,100);
}

if(s.prop21){s.events=s.apl(s.events,"event14",",",2);}
s.eVar62 = mdManager.getParameterString("Contributor");

var sniRole=mdManager.getParameterString("Role").toLowerCase();
var sniSweeps=mdManager.getParameterString("Sweepstakes").toLowerCase();
if (s.prop45 != "" && s.prop7 != "") {s.prop47=s.prop45 + "-" + s.prop7;}
//if (s.prop39 == "article_photo_gallery" || s.prop39 == "photogallery" || s.prop39 == "article_builder_photogallery" || s.prop39 == "photo_gallery") {s.events=s.apl(s.events,"event19",",",2);}
if (mdManager.getParameterString("type").toLowerCase() == "photogallerypage" || mdManager.getParameterString("type").toLowerCase() == "photogalleryoverlay" || mdManager.getParameterString("type").toLowerCase() == "listphoto" || mdManager.getParameterString("type").toLowerCase() == "listphotooverlay") {s.events=s.apl(s.events,"event19",",",2);}
if (sniRole == "package") {s.events=s.apl(s.events,"event18",",",2);}
//if (s.prop10 == "topic") {s.events=s.apl(s.events,"event26",",",2);}

s.prop70=mdManager.getParameterString("EditorialTracking");

// Write Optimizely tests into eVar 66
s.sc_integrate_optly_tests(66);
// Try to set referrer for Facebook webview users 
if ( window.navigator.userAgent.indexOf("FBAN/FBIOS") > -1 && !s.referrer ) {
  s.referrer = "http://m.facebook.com/?app";
}

}

s.doPlugins=s_doPlugins;

s.sc_integrate_optly_tests = function s_sc_integrate_optly_tests(e) {
    if ("undefined" != typeof window["optimizely"]) {
        var allTests = window["optimizely"].allExperiments,
            charCount = 0, // Used to make sure we stay in the 255 character limit
            s = s_gi(s_account),
            variationMap = window["optimizely"].variationMap,
            variationMapActive = []; // Leave behind only tests that are still active
         
        for (var testId in variationMap) {
            if (variationMap.hasOwnProperty(testId)) {
                var mapImage = [],
                    mapImageString = "",
                    mapPair = "",
                    testDefined = false,
                    testEnabled = false;
                 
                testDefined = allTests.hasOwnProperty(testId);
                testEnabled = testDefined && allTests[testId].hasOwnProperty("enabled");
             
                if (testEnabled) {
                    if ("object" == typeof variationMap[testId]) {
                        mapImage = variationMap[testId];
                    } else {
                        mapImage.push(variationMap[testId]);
                    }
                 
                    mapImageString = mapImage.join("_");
                    mapPair = testId + ":" + mapImageString;
                 
                    if ((charCount + mapPair.length) <= 255) {
                        charCount += mapPair.length;
                        variationMapActive.push(mapPair);
                    }
                }
            }          
        }
        s["eVar" + e] = variationMapActive.join();
    }
}
// Make the function call, passing in the eVar number

window['optimizely'] = window['optimizely'] || [];
window['optimizely'].push("activateSiteCatalyst");


/*
 * Partner Plugin: Gigya v3 (BEGIN)
 */
var gigya_omniture_conf = {
    linkName: 'Gigya Action',
  eventMap : [
    {
      gigEvent:"login",
      omtrEvents:["event37"],
      mapVars:["eVar71=user.loginProvider", "eVar36=getAge()", "eVar36=getGender()", "eVar72=getiRank()", "eVar10"]
    },
    {
      gigEvent:"sendDone",
      omtrEvents:["event91"],
      mapVars:["eVar70=providers","products"]
    },
    {
      gigEvent:"commentSubmitted--DISABLED",
      omtrEvents:[""],
      mapVars:["eVar70=getCommentProviders()","products"]
    },
    {
      gigEvent:"reactionClicked--DISABLED",
      omtrEvents:[""],
      mapVars:["=reaction.ID","products"]
    }
  ],
	getCommentProviders:function(evt) {
		var g=evt['providerPostIDs']
		if(g&&typeof(g)=="object"){
			var b = "",f;
			for (f in g) b += (b ? "," : "") + f;
			return b;
		}
		return '';
	},
	getAge:function(evt) {
		var a=evt.user['age']
		if(typeof(a)=="number"&&a>0){
			return a;
		}
		return '?';
	},
	getGender:function(evt) {	
		var g=evt.user['gender']
		if(typeof(g)=="string"&&g.length>0){
			return g;
		}
		return '?';
	},
	getiRank:function(evt) {
		if(typeof(evt.user['iRank'])=="string"){
		  var r = parseFloat(evt.user['iRank']).toFixed(0);
		  if(r >= 0.0001) return r;
		}
		return '?';
	}
}
/*
 * Partner Plugin: Gigya v3 (END)
 */


s.prop62="GAC CQ 20150701";

//Activate Visitor ID
s.visitor = Visitor.getInstance("BC501253513148ED0A490D45@AdobeOrg");


//Audience Manager DIL code version 5.4
// I altered the default values for constructTrackVars don't paste a new version in here unless they've fixed it to include referrer. 
"function"!=typeof DIL&&(DIL=function(a,b){var d=[],c,e;a!==Object(a)&&(a={});var g,h,n,v,x,q,r,G,k,L,M,H;g=a.partner;h=a.containerNSID;n=a.iframeAttachmentDelay;v=!!a.disableDestinationPublishingIframe;x=a.iframeAkamaiHTTPS;q=a.mappings;r=a.uuidCookie;G=!0===a.enableErrorReporting;k=a.visitorService;L=a.declaredId;M=!0===a.removeFinishedScriptsAndCallbacks;H=!0===a.delayAllUntilWindowLoad;var N,O,P,I,E,Q,R;N=!0===a.disableScriptAttachment;O=!0===a.disableCORSFiring;P=!0===a.disableDefaultRequest;
I=a.afterResultForDefaultRequest;E=a.dpIframeSrc;Q=!0===a.testCORS;R=!0===a.useJSONPOnly;G&&DIL.errorModule.activate();var S=!0===window._dil_unit_tests;(c=b)&&d.push(c+"");if(!g||"string"!=typeof g)return c="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",message:c,filename:"dil.js"}),Error(c);c="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";if(h||"number"==typeof h)h=parseInt(h,10),!isNaN(h)&&0<=h&&(c="");c&&
(h=0,d.push(c),c="");e=DIL.getDil(g,h);if(e instanceof DIL&&e.api.getPartner()==g&&e.api.getContainerNSID()==h)return e;if(this instanceof DIL)DIL.registerDil(this,g,h);else return new DIL(a,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+g+" and containerNSID = "+h);var z={IS_HTTPS:"https:"==document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,COOKIE_MAX_EXPIRATION_DATE:"Tue, 19 Jan 2038 03:14:07 UTC"},J={stuffed:{}},l={},p={firingQueue:[],
fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_cors_responses:0,num_of_cors_errors:0,num_of_img_responses:0,num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,platformParams:{d_nsid:h+"",d_rtbd:"json",d_jsonv:DIL.jsonVersion+"",d_dst:"1"},nonModStatsParams:{d_rtbd:!0,
d_dst:!0,d_cts:!0,d_rs:!0},modStatsParams:null,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2E3,calledBack:!1,mid:null,noVisitorAPI:!1,instance:null,releaseType:"no VisitorAPI",admsProcessingStarted:!1,process:function(f){try{if(!this.admsProcessingStarted){var t=this,a,y,c,b,d;if("function"==typeof f&&"function"==typeof f.getInstance){if(k===Object(k)&&(a=k.namespace)&&"string"==typeof a)y=f.getInstance(a);else{this.releaseType="no namespace";this.releaseRequests();return}if(y===Object(y)&&"function"==
typeof y.isAllowed&&"function"==typeof y.getMarketingCloudVisitorID){if(!y.isAllowed()){this.releaseType="VisitorAPI not allowed";this.releaseRequests();return}this.instance=y;this.admsProcessingStarted=!0;c=function(f){"VisitorAPI"!=t.releaseType&&(t.mid=f,t.releaseType="VisitorAPI",t.releaseRequests())};S&&(b=k.server)&&"string"==typeof b&&(y.server=b);d=y.getMarketingCloudVisitorID(c);if("string"==typeof d&&d.length){c(d);return}setTimeout(function(){"VisitorAPI"!=t.releaseType&&(t.releaseType=
"timeout",t.releaseRequests())},this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);return}this.releaseType="invalid instance"}else this.noVisitorAPI=!0;this.releaseRequests()}}catch(g){this.releaseRequests()}},releaseRequests:function(){this.calledBack=!0;p.registerRequest()},getMarketingCloudVisitorID:function(){return this.instance?this.instance.getMarketingCloudVisitorID():null},getMIDQueryString:function(){var f=s.isPopulatedString,t=this.getMarketingCloudVisitorID();f(this.mid)&&this.mid==t||(this.mid=
t);return f(this.mid)?"d_mid="+this.mid+"&":""}},declaredId:{declaredId:{init:null,request:null},declaredIdCombos:{},setDeclaredId:function(f,t){var a=s.isPopulatedString,y=encodeURIComponent;if(f===Object(f)&&a(t)){var c=f.dpid,b=f.dpuuid,d=null;if(a(c)&&a(b)){d=y(c)+"$"+y(b);if(!0===this.declaredIdCombos[d])return"setDeclaredId: combo exists for type '"+t+"'";this.declaredIdCombos[d]=!0;this.declaredId[t]={dpid:c,dpuuid:b};return"setDeclaredId: succeeded for type '"+t+"'"}}return"setDeclaredId: failed for type '"+
t+"'"},getDeclaredIdQueryString:function(){var f=this.declaredId.request,t=this.declaredId.init,a="";null!==f?a="&d_dpid="+f.dpid+"&d_dpuuid="+f.dpuuid:null!==t&&(a="&d_dpid="+t.dpid+"&d_dpuuid="+t.dpuuid);return a}},registerRequest:function(f){var a=this.firingQueue;f===Object(f)&&a.push(f);this.firing||!a.length||H&&!DIL.windowLoaded||(this.adms.calledBack?(f=a.shift(),f.src=f.src.replace(/demdex.net\/event\?d_nsid=/,"demdex.net/event?"+this.adms.getMIDQueryString()+"d_nsid="),s.isPopulatedString(f.corsPostData)&&
(f.corsPostData=f.corsPostData.replace(/^d_nsid=/,this.adms.getMIDQueryString()+"d_nsid=")),C.fireRequest(f),this.firstRequestHasFired||"script"!==f.tag&&"cors"!==f.tag||(this.firstRequestHasFired=!0)):this.processVisitorAPI())},processVisitorAPI:function(){this.adms.process(window.Visitor)},requestRemoval:function(f){if(!M)return"removeFinishedScriptsAndCallbacks is not boolean true";var a=this.toRemove,c,b;f===Object(f)&&(c=f.script,b=f.callbackName,(c===Object(c)&&"SCRIPT"==c.nodeName||"no script created"==
c)&&"string"==typeof b&&b.length&&a.push(f));if(this.readyToRemove&&a.length){b=a.shift();c=b.script;b=b.callbackName;"no script created"!=c?(f=c.src,c.parentNode.removeChild(c)):f=c;window[b]=null;try{delete window[b]}catch(d){}this.removed.push({scriptSrc:f,callbackName:b});DIL.variables.scriptsRemoved.push(f);DIL.variables.callbacksRemoved.push(b);return this.requestRemoval()}return"requestRemoval() processed"}};e=function(){var f="http://fast.",a="?d_nsid="+h+"#"+encodeURIComponent(document.location.href);
if("string"===typeof E&&E.length)return E+a;z.IS_HTTPS&&(f=!0===x?"https://fast.":"https://");return f+g+".demdex.net/dest4.html"+a};var B={THROTTLE_START:3E4,throttleTimerSet:!1,id:"destination_publishing_iframe_"+g+"_"+h,url:e(),iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messageSendingInterval:z.POST_MESSAGE_ENABLED?15:100,jsonProcessed:[],attachIframe:function(){var f=this,a=document.createElement("iframe");a.id=this.id;a.style.cssText="display: none; width: 0; height: 0;";
a.src=this.url;m.addListener(a,"load",function(){f.iframeHasLoaded=!0;f.requestToProcess()});document.body.appendChild(a);this.iframe=a},requestToProcess:function(f,a){var c=this;f&&!s.isEmptyObject(f)&&this.process(f,a);this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages&&(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){c.messageSendingInterval=z.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},process:function(f,
a){var c=encodeURIComponent,b,d,g,e,h,k;a===Object(a)&&(k=m.encodeAndBuildRequest(["",a.dpid||"",a.dpuuid||""],","));if((b=f.dests)&&b instanceof Array&&(d=b.length))for(g=0;g<d;g++)e=b[g],e=[c("dests"),c(e.id||""),c(e.y||""),c(e.c||"")],this.addMessage(e.join("|"));if((b=f.ibs)&&b instanceof Array&&(d=b.length))for(g=0;g<d;g++)e=b[g],e=[c("ibs"),c(e.id||""),c(e.tag||""),m.encodeAndBuildRequest(e.url||[],","),c(e.ttl||""),"",k],this.addMessage(e.join("|"));if((b=f.dpcalls)&&b instanceof Array&&(d=
b.length))for(g=0;g<d;g++)e=b[g],h=e.callback||{},h=[h.obj||"",h.fn||"",h.key||"",h.tag||"",h.url||""],e=[c("dpm"),c(e.id||""),c(e.tag||""),m.encodeAndBuildRequest(e.url||[],","),c(e.ttl||""),m.encodeAndBuildRequest(h,","),k],this.addMessage(e.join("|"));this.jsonProcessed.push(f)},addMessage:function(f){var a=encodeURIComponent,a=G?a("---destpub-debug---"):a("---destpub---");this.messages.push(a+f)},sendMessages:function(){var f=this,a;this.messages.length?(a=this.messages.shift(),DIL.xd.postMessage(a,
this.url,this.iframe.contentWindow),this.messagesPosted.push(a),setTimeout(function(){f.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1}},K={traits:function(f){s.isValidPdata(f)&&(l.sids instanceof Array||(l.sids=[]),m.extendArray(l.sids,f));return this},pixels:function(f){s.isValidPdata(f)&&(l.pdata instanceof Array||(l.pdata=[]),m.extendArray(l.pdata,f));return this},logs:function(f){s.isValidLogdata(f)&&(l.logdata!==Object(l.logdata)&&(l.logdata={}),m.extendObject(l.logdata,
f));return this},customQueryParams:function(f){s.isEmptyObject(f)||m.extendObject(l,f,p.reservedKeys);return this},signals:function(f,a){var c,b=f;if(!s.isEmptyObject(b)){if(a&&"string"==typeof a)for(c in b={},f)f.hasOwnProperty(c)&&(b[a+c]=f[c]);m.extendObject(l,b,p.reservedKeys)}return this},declaredId:function(f){p.declaredId.setDeclaredId(f,"request");return this},result:function(f){"function"==typeof f&&(l.callback=f);return this},afterResult:function(f){"function"==typeof f&&(l.postCallbackFn=
f);return this},useImageRequest:function(){l.useImageRequest=!0;return this},clearData:function(){l={};return this},submit:function(){C.submitRequest(l);l={};return this},getPartner:function(){return g},getContainerNSID:function(){return h},getEventLog:function(){return d},getState:function(){var f={},a={};m.extendObject(f,p,{callbackPrefix:!0,useJSONP:!0,registerRequest:!0});m.extendObject(a,B,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{pendingRequest:l,otherRequestInfo:f,
destinationPublishingInfo:a}},idSync:function(f){if(f!==Object(f)||"string"!=typeof f.dpid||!f.dpid.length)return"Error: config or config.dpid is empty";if("string"!=typeof f.url||!f.url.length)return"Error: config.url is empty";var a=f.url,c=f.minutesToLive,b=encodeURIComponent,d,a=a.replace(/^https:/,"").replace(/^http:/,"");if("undefined"==typeof c)c=20160;else if(c=parseInt(c,10),isNaN(c)||0>=c)return"Error: config.minutesToLive needs to be a positive number";d=m.encodeAndBuildRequest(["",f.dpid,
f.dpuuid||""],",");f=["ibs",b(f.dpid),"img",b(a),c,"",d];B.addMessage(f.join("|"));p.firstRequestHasFired&&B.requestToProcess();return"Successfully queued"},aamIdSync:function(f){if(f!==Object(f)||"string"!=typeof f.dpuuid||!f.dpuuid.length)return"Error: config or config.dpuuid is empty";f.url="//dpm.demdex.net/ibs:dpid="+f.dpid+"&dpuuid="+f.dpuuid;return this.idSync(f)},passData:function(f){if(s.isEmptyObject(f))return"Error: json is empty or not an object";C.defaultCallback(f);return"json submitted for processing"},
getPlatformParams:function(){return p.platformParams},getEventCallConfigParams:function(){var f=p,a=f.modStatsParams,c=f.platformParams,b;if(!a){a={};for(b in c)c.hasOwnProperty(b)&&!f.nonModStatsParams[b]&&(a[b.replace(/^d_/,"")]=c[b]);f.modStatsParams=a}return a}},C={corsMetadata:function(){var f="none",a=!0;"undefined"!==typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?f="XMLHttpRequest":Function("/*@cc_on return /^10/.test(@_jscript_version) @*/")()?
f="XMLHttpRequest":"undefined"!==typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(a=!1),0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&(a=!1));return{corsType:f,corsCookiesEnabled:a}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new window[this.corsMetadata.corsType]},submitRequest:function(f){p.registerRequest(C.createQueuedRequest(f));return!0},createQueuedRequest:function(f){var a=p,c,b=f.callback,d="img",e;if(!s.isEmptyObject(q)){var k,
A,r;for(k in q)q.hasOwnProperty(k)&&(A=q[k],null!=A&&""!==A&&k in f&&!(A in f||A in p.reservedKeys)&&(r=f[k],null!=r&&""!==r&&(f[A]=r)))}s.isValidPdata(f.sids)||(f.sids=[]);s.isValidPdata(f.pdata)||(f.pdata=[]);s.isValidLogdata(f.logdata)||(f.logdata={});f.logdataArray=m.convertObjectToKeyValuePairs(f.logdata,"=",!0);f.logdataArray.push("_ts="+(new Date).getTime());"function"!=typeof b&&(b=this.defaultCallback);if(a.useJSONP=!0!==f.useImageRequest)d="script",c=a.callbackPrefix+"_"+g+"_"+h+"_"+(new Date).getTime();
a=this.makeRequestSrcData(f,c);!R&&(e=this.getCORSInstance())&&a.truncated&&(this.corsMetadata.corsCookiesEnabled||a.isDeclaredIdCall)&&(d="cors");return{tag:d,src:a.src,corsSrc:a.corsSrc,internalCallbackName:c,callbackFn:b,postCallbackFn:f.postCallbackFn,useImageRequest:!!f.useImageRequest,requestData:f,corsInstance:e,corsPostData:a.corsPostData,hasCORSError:!1}},defaultCallback:function(f,a){var c,b,d,e,g,h,k,q,w;if((c=f.stuff)&&c instanceof Array&&(b=c.length))for(d=0;d<b;d++)if((e=c[d])&&e===
Object(e)){g=e.cn;h=e.cv;k=e.ttl;if("undefined"==typeof k||""===k)k=Math.floor(m.getMaxCookieExpiresInMinutes()/60/24);q=e.dmn||"."+document.domain.replace(/^www\./,"");w=e.type;g&&(h||"number"==typeof h)&&("var"!=w&&(k=parseInt(k,10))&&!isNaN(k)&&m.setCookie(g,h,1440*k,"/",q,!1),J.stuffed[g]=h)}c=f.uuid;s.isPopulatedString(c)&&!s.isEmptyObject(r)&&(b=r.path,"string"==typeof b&&b.length||(b="/"),d=parseInt(r.days,10),isNaN(d)&&(d=100),m.setCookie(r.name||"aam_did",c,1440*d,b,r.domain||"."+document.domain.replace(/^www\./,
""),!0===r.secure));v||p.abortRequests||B.requestToProcess(f,a)},makeRequestSrcData:function(f,a){f.sids=s.removeEmptyArrayValues(f.sids||[]);f.pdata=s.removeEmptyArrayValues(f.pdata||[]);var c=p,b=c.platformParams,d=m.encodeAndBuildRequest(f.sids,","),e=m.encodeAndBuildRequest(f.pdata,","),k=(f.logdataArray||[]).join("&");delete f.logdataArray;var q=z.IS_HTTPS?"https://":"http://",r=c.declaredId.getDeclaredIdQueryString(),l;l=[];var w,n,F,x;for(w in f)if(!(w in c.reservedKeys)&&f.hasOwnProperty(w))if(n=
f[w],w=encodeURIComponent(w),n instanceof Array)for(F=0,x=n.length;F<x;F++)l.push(w+"="+encodeURIComponent(n[F]));else l.push(w+"="+encodeURIComponent(n));l=l.length?"&"+l.join("&"):"";w=!1;d="d_nsid="+b.d_nsid+r+(d.length?"&d_sid="+d:"")+(e.length?"&d_px="+e:"")+(k.length?"&d_ld="+encodeURIComponent(k):"");b="&d_rtbd="+b.d_rtbd+"&d_jsonv="+b.d_jsonv+"&d_dst="+b.d_dst;q=q+g+".demdex.net/event";e=c=q+"?"+d+(c.useJSONP?b+"&d_cb="+(a||""):"")+l;2048<c.length&&(c=c.substring(0,c.lastIndexOf("&")),w=!0);
return{corsSrc:q+"?"+(Q?"testcors=1&d_nsid="+h+"&":"")+"_ts="+(new Date).getTime(),src:c,originalSrc:e,truncated:w,corsPostData:d+b+l,isDeclaredIdCall:""!==r}},fireRequest:function(f){if("img"==f.tag)this.fireImage(f);else{var a=p.declaredId,a=a.declaredId.request||a.declaredId.init||{},a={dpid:a.dpid||"",dpuuid:a.dpuuid||""};"script"==f.tag?this.fireScript(f,a):"cors"==f.tag&&this.fireCORS(f,a)}},fireImage:function(a){var b=p,e,g;b.abortRequests||(b.firing=!0,e=new Image(0,0),b.sent.push(a),e.onload=
function(){b.firing=!1;b.fired.push(a);b.num_of_img_responses++;b.registerRequest()},g=function(e){c="imgAbortOrErrorHandler received the event of type "+e.type;d.push(c);b.abortRequests=!0;b.firing=!1;b.errored.push(a);b.num_of_img_errors++;b.registerRequest()},e.addEventListener?(e.addEventListener("error",g,!1),e.addEventListener("abort",g,!1)):e.attachEvent&&(e.attachEvent("onerror",g),e.attachEvent("onabort",g)),e.src=a.src)},fireScript:function(a,b){var e=this,h=p,k,q,r=a.src,l=a.postCallbackFn,
n="function"==typeof l,m=a.internalCallbackName;h.abortRequests||(h.firing=!0,window[m]=function(e){try{e!==Object(e)&&(e={});var k=a.callbackFn;h.firing=!1;h.fired.push(a);h.num_of_jsonp_responses++;k(e,b);n&&l(e,b)}catch(u){u.message="DIL jsonp callback caught error with message "+u.message;c=u.message;d.push(c);u.filename=u.filename||"dil.js";u.partner=g;DIL.errorModule.handleError(u);try{k({error:u.name+"|"+u.message},b),n&&l({error:u.name+"|"+u.message},b)}catch(r){}}finally{h.requestRemoval({script:q,
callbackName:m}),h.registerRequest()}},N?(h.firing=!1,h.requestRemoval({script:"no script created",callbackName:m})):(q=document.createElement("script"),q.addEventListener&&q.addEventListener("error",function(b){h.requestRemoval({script:q,callbackName:m});c="jsonp script tag error listener received the event of type "+b.type+" with src "+r;e.handleScriptError(c,a)},!1),q.type="text/javascript",q.src=r,k=DIL.variables.scriptNodeList[0],k.parentNode.insertBefore(q,k)),h.sent.push(a),h.declaredId.declaredId.request=
null)},fireCORS:function(a,b){function e(q){try{var u=JSON.parse(q);if(u!==Object(u)){h.handleCORSError(a,b,"Response is not JSON");return}}catch(l){h.handleCORSError(a,b,"Error parsing response as JSON");return}try{var r=a.callbackFn;k.firing=!1;k.fired.push(a);k.num_of_cors_responses++;r(u,b);x&&n(u,b)}catch(m){m.message="DIL handleCORSResponse caught error with message "+m.message;c=m.message;d.push(c);m.filename=m.filename||"dil.js";m.partner=g;DIL.errorModule.handleError(m);try{r({error:m.name+
"|"+m.message},b),x&&n({error:m.name+"|"+m.message},b)}catch(p){}}finally{k.registerRequest()}}var h=this,k=p,q=this.corsMetadata.corsType,r=a.corsSrc,l=a.corsInstance,m=a.corsPostData,n=a.postCallbackFn,x="function"===typeof n;if(!k.abortRequests){k.firing=!0;if(O)k.firing=!1;else try{l.open("post",r,!0),"XMLHttpRequest"===q?(l.withCredentials=!0,l.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),l.onreadystatechange=function(){4===this.readyState&&(200===this.status?e(this.responseText):
h.handleCORSError(a,b,"onreadystatechange"))}):"XDomainRequest"===q&&(l.onload=function(){e(this.responseText)}),l.onerror=function(c){h.handleCORSError(a,b,"onerror")},l.ontimeout=function(c){h.handleCORSError(a,b,"ontimeout")},l.send(m)}catch(s){this.handleCORSError(a,b,"try-catch")}k.sent.push(a);k.declaredId.declaredId.request=null}},handleCORSError:function(a,b,c){a.hasCORSError||(a.hasCORSError=!0,p.num_of_cors_errors++,a.tag="script",this.fireScript(a,b))},handleScriptError:function(a,b){p.num_of_jsonp_errors++;
this.handleRequestError(a,b)},handleRequestError:function(a,b){var c=p;d.push(a);c.abortRequests=!0;c.firing=!1;c.errored.push(b);c.registerRequest()}},s={isValidPdata:function(a){return a instanceof Array&&this.removeEmptyArrayValues(a).length?!0:!1},isValidLogdata:function(a){return!this.isEmptyObject(a)},isEmptyObject:function(a){if(a!==Object(a))return!0;for(var b in a)if(a.hasOwnProperty(b))return!1;return!0},removeEmptyArrayValues:function(a){for(var b=0,c=a.length,d,e=[],b=0;b<c;b++)d=a[b],
"undefined"!=typeof d&&null!=d&&e.push(d);return e},isPopulatedString:function(a){return"string"==typeof a&&a.length}},m={addListener:function(){if(document.addEventListener)return function(a,b,c){a.addEventListener(b,function(a){"function"==typeof c&&c(a)},!1)};if(document.attachEvent)return function(a,b,c){a.attachEvent("on"+b,function(a){"function"==typeof c&&c(a)})}}(),convertObjectToKeyValuePairs:function(a,b,c){var d=[];b=b||"=";var e,g;for(e in a)g=a[e],"undefined"!=typeof g&&null!=g&&d.push(e+
b+(c?encodeURIComponent(g):g));return d},encodeAndBuildRequest:function(a,b){return this.map(a,function(a){return encodeURIComponent(a)}).join(b)},map:function(a,b){if(Array.prototype.map)return a.map(b);if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var e=Array(d),g=0;g<d;g++)g in c&&(e[g]=b.call(b,c[g],g,c));return e},filter:function(a,b){if(!Array.prototype.filter){if(void 0===a||null===a)throw new TypeError;var c=Object(a),
d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var e=[],g=0;g<d;g++)if(g in c){var h=c[g];b.call(b,h,g,c)&&e.push(h)}return e}return a.filter(b)},getCookie:function(a){a+="=";var b=document.cookie.split(";"),c,d,e;c=0;for(d=b.length;c<d;c++){for(e=b[c];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(a))return decodeURIComponent(e.substring(a.length,e.length))}return null},setCookie:function(a,b,c,d,e,g){var h=new Date;c&&(c*=6E4);document.cookie=a+"="+encodeURIComponent(b)+
(c?";expires="+(new Date(h.getTime()+c)).toUTCString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(g?";secure":"")},extendArray:function(a,b){return a instanceof Array&&b instanceof Array?(Array.prototype.push.apply(a,b),!0):!1},extendObject:function(a,b,c){var d;if(a===Object(a)&&b===Object(b)){for(d in b)!b.hasOwnProperty(d)||!s.isEmptyObject(c)&&d in c||(a[d]=b[d]);return!0}return!1},getMaxCookieExpiresInMinutes:function(){return((new Date(z.COOKIE_MAX_EXPIRATION_DATE)).getTime()-(new Date).getTime())/
1E3/60}};"error"==g&&0==h&&m.addListener(window,"load",function(){DIL.windowLoaded=!0});var D=function(){p.registerRequest();U();v||p.abortRequests||B.attachIframe();p.readyToRemove=!0;p.requestRemoval()},U=function(){v||setTimeout(function(){P||p.firstRequestHasFired||p.adms.admsProcessingStarted||p.adms.calledBack||("function"==typeof I?K.afterResult(I).submit():K.submit())},DIL.constants.TIME_TO_DEFAULT_REQUEST)},T=document;"error"!=g&&(DIL.windowLoaded?D():"complete"!=T.readyState&&"loaded"!=
T.readyState?m.addListener(window,"load",D):DIL.isAddedPostWindowLoadWasCalled?m.addListener(window,"load",D):H||(n="number"==typeof n?parseInt(n,10):0,0>n&&(n=0),setTimeout(D,n||DIL.constants.TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT)));p.declaredId.setDeclaredId(L,"init");this.api=K;this.getStuffedVariable=function(a){var b=J.stuffed[a];b||"number"==typeof b||(b=m.getCookie(a))||"number"==typeof b||(b="");return b};this.validators=s;this.helpers=m;this.constants=z;this.log=d;S&&(this.pendingRequest=
l,this.requestController=p,this.setDestinationPublishingUrl=e,this.destinationPublishing=B,this.requestProcs=C,this.variables=J,this.callWindowLoadFunctions=D)},function(){var a=document,b;null==a.readyState&&a.addEventListener&&(a.readyState="loading",a.addEventListener("DOMContentLoaded",b=function(){a.removeEventListener("DOMContentLoaded",b,!1);a.readyState="complete"},!1))}(),DIL.extendStaticPropertiesAndMethods=function(a){var b;if(a===Object(a))for(b in a)a.hasOwnProperty(b)&&(this[b]=a[b])},
DIL.extendStaticPropertiesAndMethods({version:"5.4",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50,TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT:500},variables:{scriptNodeList:document.getElementsByTagName("script"),scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoadWasCalled:!1,isAddedPostWindowLoad:function(a){this.isAddedPostWindowLoadWasCalled=!0;this.windowLoaded="function"==typeof a?!!a():"boolean"==typeof a?a:!0},create:function(a){try{return new DIL(a)}catch(b){return(new Image(0,
0)).src="http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D"+(new Date).getTime(),Error("Error in attempt to create DIL instance with DIL.create()")}},registerDil:function(a,b,d){b=b+"$"+d;b in this.dils||(this.dils[b]=a)},getDil:function(a,b){var d;"string"!=typeof a&&(a="");b||(b=0);d=a+"$"+b;return d in this.dils?this.dils[d]:
Error("The DIL instance with partner = "+a+" and containerNSID = "+b+" was not found")},dexGetQSVars:function(a,b,d){b=this.getDil(b,d);return b instanceof this?b.getStuffedVariable(a):""},xd:{postMessage:function(a,b,d){var c=1;b&&(window.postMessage?d.postMessage(a,b.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):b&&(d.location=b.replace(/#.*$/,"")+"#"+ +new Date+c++ +"&"+a))}}}),DIL.errorModule=function(){var a=DIL.create({partner:"error",containerNSID:0,disableDestinationPublishingIframe:!0}),b={harvestererror:14138,
destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},d=!1;return{activate:function(){d=!0},handleError:function(c){if(!d)return"DIL error module has not been activated";c!==Object(c)&&(c={});var e=c.name?(new String(c.name)).toLowerCase():"",g=[];c={name:e,filename:c.filename?c.filename+"":"",partner:c.partner?c.partner+"":"no_partner",site:c.site?c.site+"":document.location.href,
message:c.message?c.message+"":""};g.push(e in b?b[e]:b.noerrortypedefined);a.api.pixels(g).logs(c).useImageRequest().submit();return"DIL error report sent"},pixelMap:b}}(),DIL.tools={},DIL.modules={helpers:{handleModuleError:function(a,b,d){var c="";b=b||"Error caught in DIL module/submodule: ";a===Object(a)?c=b+(a.message||"err has no message"):(c=b+"err is not a valid object",a={});a.message=c;d instanceof DIL&&(a.partner=d.api.getPartner());DIL.errorModule.handleError(a);return this.errorMessage=
c}}});
DIL.tools.getSearchReferrer=function(a,b){var d=DIL.getDil("error"),c=DIL.tools.decomposeURI(a||document.referrer),e="",g="",h={queryParam:"q"};return(e=d.helpers.filter([b===Object(b)?b:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(a){return!(!a.hasOwnProperty("hostPattern")||!c.hostname.match(a.hostPattern))}).shift())?{valid:!0,name:c.hostname,keywords:(d.helpers.extendObject(h,e),g=h.queryPattern?(e=
(""+c.search).match(h.queryPattern))?e[1]:"":c.uriParams[h.queryParam],decodeURIComponent(g||"").replace(/\+|%20/g," "))}:{valid:!1,name:"",keywords:""}};
DIL.tools.decomposeURI=function(a){var b=DIL.getDil("error"),d=document.createElement("a");d.href=a||document.referrer;return{hash:d.hash,host:d.host.split(":").shift(),hostname:d.hostname,href:d.href,pathname:d.pathname.replace(/^\//,""),protocol:d.protocol,search:d.search,uriParams:function(a,d){b.helpers.map(d.split("&"),function(b){b=b.split("=");a[b.shift()]=b.shift()});return a}({},d.search.replace(/^(\/|\?)?|\/$/g,""))}};
DIL.tools.getMetaTags=function(){var a={},b=document.getElementsByTagName("meta"),d,c,e,g,h;d=0;for(e=arguments.length;d<e;d++)if(g=arguments[d],null!==g)for(c=0;c<b.length;c++)if(h=b[c],h.name==g){a[g]=h.content;break}return a};
DIL.modules.siteCatalyst={dil:null,handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d,c){try{var e=this,g={name:"DIL Site Catalyst Module Error"},h=function(a){g.message=a;DIL.errorModule.handleError(g);return a};this.options=c===Object(c)?c:{};this.dil=null;if(b instanceof DIL)this.dil=b;else return h("dilInstance is not a valid instance of DIL");g.partner=b.api.getPartner();if(a!==Object(a))return h("siteCatalystReportingSuite is not an object");window.AppMeasurement_Module_DIL=a.m_DIL=
function(a){var b="function"===typeof a.m_i?a.m_i("DIL"):this;if(b!==Object(b))return h("m is not an object");b.trackVars=e.constructTrackVars(d);b.d=0;b.s=a;b._t=function(){var a,b,c=","+this.trackVars+",",d=this.s,g,n=[];g=[];var x={},v=!1;if(d!==Object(d))return h("Error in m._t function: s is not an object");if(this.d){if("function"==typeof d.foreachVar)d.foreachVar(function(a,b){"undefined"!==typeof b&&(x[a]=b,v=!0)},this.trackVars);else{if(!(d.va_t instanceof Array))return h("Error in m._t function: s.va_t is not an array");
if(d.lightProfileID)(a=d.lightTrackVars)&&(a=","+a+","+d.vl_mr+",");else if(d.pe||d.linkType)a=d.linkTrackVars,d.pe&&(b=d.pe.substring(0,1).toUpperCase()+d.pe.substring(1),d[b]&&(a=d[b].trackVars)),a&&(a=","+a+","+d.vl_l+","+d.vl_l2+",");if(a){b=0;for(n=a.split(",");b<n.length;b++)0<=c.indexOf(","+n[b]+",")&&g.push(n[b]);g.length&&(c=","+g.join(",")+",")}g=0;for(b=d.va_t.length;g<b;g++)a=d.va_t[g],0<=c.indexOf(","+a+",")&&"undefined"!==typeof d[a]&&null!==d[a]&&""!==d[a]&&(x[a]=d[a],v=!0)}e.includeContextData(d,
e,x).store_populated&&(v=!0);v&&this.d.api.signals(x,"c_").submit()}}};a.loadModule("DIL");a.DIL.d=b;return g.message?g.message:"DIL.modules.siteCatalyst.init() completed with no errors"}catch(n){return this.handle(n,"DIL.modules.siteCatalyst.init() caught error with message ",this.dil)}},constructTrackVars:function(a){var b=[],d,c,e,g,h;if(a===Object(a)){d=a.names;if(d instanceof Array&&(e=d.length))for(c=0;c<e;c++)g=d[c],"string"==typeof g&&g.length&&b.push(g);a=a.iteratedNames;if(a instanceof Array&&
(e=a.length))for(c=0;c<e;c++)if(d=a[c],d===Object(d)&&(g=d.name,h=parseInt(d.maxIndex,10),"string"==typeof g&&g.length&&!isNaN(h)&&0<=h))for(d=0;d<=h;d++)b.push(g+d);if(b.length)return b.join(",")}return this.constructTrackVars({names:["pageName","channel","campaign","products","events","pe","referrer","server","purchaseID","zip","state"],iteratedNames:[{name:"eVar",maxIndex:75},{name:"prop",maxIndex:75},{name:"pev",maxIndex:3},{name:"hier",maxIndex:4}]})},includeContextData:function(a,b,d){var c={},e=!1;if(a.contextData===Object(a.contextData)){a=a.contextData;b=b.options.replaceContextDataPeriodsWith;
var g,h;"string"===typeof b&&b.length||(b="_");for(g in a)a.hasOwnProperty(g)&&((h=a[g])||"number"===typeof h)&&(g=("contextData."+g).replace(/\./g,b),d[g]=h,e=!0)}c.store_populated=e;return c}};
DIL.modules.GA={dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,signals:{},hasSignals:!1,handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d){try{this.tv=this.arr=this.dil=null;this.errorMessage="";this.signals={};this.hasSignals=!1;var c={name:"DIL GA Module Error"},e="";b instanceof DIL?(this.dil=b,c.partner=this.dil.api.getPartner()):(e="dilInstance is not a valid instance of DIL",
c.message=e,DIL.errorModule.handleError(c));a instanceof Array&&a.length?this.arr=a:(e="gaArray is not an array or is empty",c.message=e,DIL.errorModule.handleError(c));this.tv=this.constructTrackVars(d);this.errorMessage=e}catch(g){this.handle(g,"DIL.modules.GA.init() caught error with message ",this.dil)}finally{return this}},constructTrackVars:function(a){var b=[],d,c,e,g;if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){e=this.defaultTrackVars;g={};d=0;for(c=e.length;d<c;d++)g[e[d]]=
!0;this.defaultTrackVarsObj=g}else g=this.defaultTrackVarsObj;if(a===Object(a)){a=a.names;if(a instanceof Array&&(c=a.length))for(d=0;d<c;d++)e=a[d],"string"==typeof e&&e.length&&e in g&&b.push(e);if(b.length)return b}return this.defaultTrackVars},constructGAObj:function(a){var b={};a=a instanceof Array?a:this.arr;var d,c,e,g;d=0;for(c=a.length;d<c;d++)e=a[d],e instanceof Array&&e.length&&(e=[],g=a[d],e instanceof Array&&g instanceof Array&&Array.prototype.push.apply(e,g),g=e.shift(),"string"==typeof g&&
g.length&&(b[g]instanceof Array||(b[g]=[]),b[g].push(e)));return b},addToSignals:function(a,b){if("string"!=typeof a||""===a||null==b||""===b)return!1;this.signals[a]instanceof Array||(this.signals[a]=[]);this.signals[a].push(b);return this.hasSignals=!0},constructSignals:function(){var a=this.constructGAObj(),b={_setAccount:function(a){this.addToSignals("c_accountId",a)},_setCustomVar:function(a,b,c,d){"string"==typeof b&&b.length&&this.addToSignals("c_"+b,c)},_addItem:function(a,b,c,d,e,g){this.addToSignals("c_itemOrderId",
a);this.addToSignals("c_itemSku",b);this.addToSignals("c_itemName",c);this.addToSignals("c_itemCategory",d);this.addToSignals("c_itemPrice",e);this.addToSignals("c_itemQuantity",g)},_addTrans:function(a,b,c,d,e,g,h,n){this.addToSignals("c_transOrderId",a);this.addToSignals("c_transAffiliation",b);this.addToSignals("c_transTotal",c);this.addToSignals("c_transTax",d);this.addToSignals("c_transShipping",e);this.addToSignals("c_transCity",g);this.addToSignals("c_transState",h);this.addToSignals("c_transCountry",
n)},_trackSocial:function(a,b,c,d){this.addToSignals("c_socialNetwork",a);this.addToSignals("c_socialAction",b);this.addToSignals("c_socialTarget",c);this.addToSignals("c_socialPagePath",d)}},d=this.tv,c,e,g,h,n,v;c=0;for(e=d.length;c<e;c++)if(g=d[c],a.hasOwnProperty(g)&&b.hasOwnProperty(g)&&(v=a[g],v instanceof Array))for(h=0,n=v.length;h<n;h++)b[g].apply(this,v[h])},submit:function(){try{if(""!==this.errorMessage)return this.errorMessage;this.constructSignals();return this.hasSignals?(this.dil.api.signals(this.signals).submit(),
"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,"=",!0)+this.dil.log):"No signals present"}catch(a){return this.handle(a,"DIL.modules.GA.submit() caught error with message ",this.dil)}},Stuffer:{LIMIT:5,dil:null,cookieName:null,delimiter:null,errorMessage:"",handle:DIL.modules.helpers.handleModuleError,callback:null,v:function(){return!1},init:function(a,b,d){try{this.callback=this.dil=null,this.errorMessage="",a instanceof DIL?(this.dil=a,this.v=this.dil.validators.isPopulatedString,
this.cookieName=this.v(b)?b:"aam_ga",this.delimiter=this.v(d)?d:"|"):this.handle({message:"dilInstance is not a valid instance of DIL"},"DIL.modules.GA.Stuffer.init() error: ")}catch(c){this.handle(c,"DIL.modules.GA.Stuffer.init() caught error with message ",this.dil)}finally{return this}},process:function(a){var b,d,c,e,g,h;h=!1;var n=1;if(a===Object(a)&&(b=a.stuff)&&b instanceof Array&&(d=b.length))for(a=0;a<d;a++)if((c=b[a])&&c===Object(c)&&(e=c.cn,g=c.cv,e==this.cookieName&&this.v(g))){h=!0;break}if(h){b=
g.split(this.delimiter);"undefined"==typeof window._gaq&&(window._gaq=[]);c=window._gaq;a=0;for(d=b.length;a<d&&!(h=b[a].split("="),g=h[0],h=h[1],this.v(g)&&this.v(h)&&c.push(["_setCustomVar",n++,g,h,1]),n>this.LIMIT);a++);this.errorMessage=1<n?"No errors - stuffing successful":"No valid values to stuff"}else this.errorMessage="Cookie name and value not found in json";if("function"==typeof this.callback)return this.callback()},submit:function(){try{var a=this;if(""!==this.errorMessage)return this.errorMessage;
this.dil.api.afterResult(function(b){a.process(b)}).submit();return"DIL.modules.GA.Stuffer.submit() successful"}catch(b){return this.handle(b,"DIL.modules.GA.Stuffer.submit() caught error with message ",this.dil)}}}};
DIL.modules.Peer39={aid:"",dil:null,optionals:null,errorMessage:"",calledBack:!1,script:null,scriptsSent:[],returnedData:[],handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d){try{this.dil=null;this.errorMessage="";this.calledBack=!1;this.optionals=d===Object(d)?d:{};d={name:"DIL Peer39 Module Error"};var c=[],e="";this.isSecurePageButNotEnabled(document.location.protocol)&&(e="Module has not been enabled for a secure page",c.push(e),d.message=e,DIL.errorModule.handleError(d));b instanceof
DIL?(this.dil=b,d.partner=this.dil.api.getPartner()):(e="dilInstance is not a valid instance of DIL",c.push(e),d.message=e,DIL.errorModule.handleError(d));"string"==typeof a&&a.length?this.aid=a:(e="aid is not a string or is empty",c.push(e),d.message=e,DIL.errorModule.handleError(d));this.errorMessage=c.join("\n")}catch(g){this.handle(g,"DIL.modules.Peer39.init() caught error with message ",this.dil)}finally{return this}},isSecurePageButNotEnabled:function(a){return"https:"==a&&!0!==this.optionals.enableHTTPS?
!0:!1},constructSignals:function(){var a=this,b=this.constructScript(),d=DIL.variables.scriptNodeList[0];window["afterFinished_"+this.aid]=function(){try{var b=a.processData(p39_KVP_Short("c_p","|").split("|"));b.hasSignals&&a.dil.api.signals(b.signals).submit()}catch(d){}finally{a.calledBack=!0,"function"==typeof a.optionals.afterResult&&a.optionals.afterResult()}};d.parentNode.insertBefore(b,d);this.scriptsSent.push(b);return"Request sent to Peer39"},processData:function(a){var b,d,c,e,g={},h=!1;
this.returnedData.push(a);if(a instanceof Array)for(b=0,d=a.length;b<d;b++)c=a[b].split("="),e=c[0],c=c[1],e&&isFinite(c)&&!isNaN(parseInt(c,10))&&(g[e]instanceof Array||(g[e]=[]),g[e].push(c),h=!0);return{hasSignals:h,signals:g}},constructScript:function(){var a=document.createElement("script"),b=this.optionals,d=b.scriptId,c=b.scriptSrc,b=b.scriptParams;a.id="string"==typeof d&&d.length?d:"peer39ScriptLoader";a.type="text/javascript";"string"==typeof c&&c.length?a.src=c:(a.src=(this.dil.constants.IS_HTTPS?
"https:":"http:")+"//stags.peer39.net/"+this.aid+"/trg_"+this.aid+".js","string"==typeof b&&b.length&&(a.src+="?"+b));return a},submit:function(){try{return""!==this.errorMessage?this.errorMessage:this.constructSignals()}catch(a){return this.handle(a,"DIL.modules.Peer39.submit() caught error with message ",this.dil)}}};
// Get the in Site Catalyst object instance

var _scObj = s_gi(s_account);
// Instantiate a DIL code

var scDil = DIL.create({
	partner: 'scripps',
	visitorService: {
		namespace: 'BC501253513148ED0A490D45@AdobeOrg'
	}
});


DIL.modules.siteCatalyst.init(_scObj, scDil);


if (s.prop32 != null && s.prop32 != "") {
	scDil.api.aamIdSync({
		dpid: '468',
		dpuuid: s.prop32,
		minutesToLive: 20160
	});
}

// set aam_did cookie
(function(w, d, args) {
    function setCookie(name, value, expires, path, domain, secure) {
        var today = new Date();
		if (expires) {
			expires = expires * 1000 * 60;
		}
		document.cookie = name + '=' + value + ((expires) ? ';expires=' + new Date(today.getTime() + expires).toUTCString() : '') + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '');
    }

    var cookie = {
        name : args.cookie_name || "aam_did",
        days : args.cookie_days || 100,
		domain : args.cookie_domain || "." + document.domain
    };
	var cb = args.callback_func || function(arg) {
		if (arg && arg.uuid) {
			setCookie(cookie.name, arg.uuid, cookie.days * 24 * 60, '/', cookie.domain, false);
		}
	};
    var callback = {
        name : args.callback_name || "_aam_cb",
        remove : function() {
            try {
                delete window[callback.name];
            }
            catch(e) {
                window[callback.name] = null;
            }
        },  
        func : function(arg) {
            cb(arg);
            callback.remove()
        }
    };
    var script = d.createElement('script');
    var first_script = document.getElementsByTagName('script')[0];
    var done = false;

    w[callback.name] = callback.func;
    script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState || script.readyState == "loaded" || script.readyState == "complete")) {
            done = true;
            script.onload = script.onreadystatechange = null;

            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        }
    };
    script.src = window.location.protocol + "//" + args.subdomain + ".demdex.net/event?d_rtbd=json&d_cb=" + callback.name;
    first_script.parentNode.insertBefore(script, first_script);
}(window, document, {
        subdomain : "scripps",
	cookie_name : "aam_did",
	cookie_days : 730,
	cookie_domain : document.domain,
	callback_name : "_aam_cb"
}));

//*******CNAME Work-around*************
var _aam_iframe = null;

if (document.location.protocol !== 'https:') {
    _aam_iframe = document.createElement('iframe');
    _aam_iframe.id = '_aam_iframe';
    _aam_iframe.style.cssText = 'display: none; width: 0; height: 0;';
    _aam_iframe.src = 'http://aam.adsremote.scrippsnetworks.com/dilfire.html';
    document.body.appendChild(_aam_iframe);
}

//******************************
//******************************
// MEDIA MODULE SUPPORT 
//******************************
//******************************

var omnitureCallFired = {};

s.loadModule("Media")
s.Media.autoTrack=false;
s.Media.trackWhilePlaying=true;
s.Media.segmentByMilestones=true;
s.Media.trackUsingContextData=true;
s.Media.completeByCloseOffset=true;
s.Media.completeCloseOffsetThreshold=1;
s.Media.adSegmentByMilestones=true;
s.Media.trackMilestones="50,90";
s.Media.trackVars="events,channel,pagename,server,prop1,prop2,prop3,prop4,prop5,prop6,prop7,prop8,prop9,prop10,prop11,prop12,prop13,prop19,prop20,prop21,prop22,prop23,prop24,prop25,prop26,prop27,prop28,prop29,prop30,prop31,prop32,prop33,prop34,prop35,prop36,prop37,prop38,prop39,prop40,prop41,prop42,prop43,prop44,prop45,prop46,prop47,prop48,prop49,prop50,prop51,prop52,prop53,prop54,prop55,prop56,prop57,prop58,prop59,prop60,prop61,prop62,prop63,prop64,prop65,prop66,prop67,prop68,prop69,prop70,prop71,prop72,prop73,prop74,prop75,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar7,eVar8,eVar9,eVar10,eVar11,eVar12,eVar13,eVar14,eVar15,eVar20,eVar21,eVar22,eVar23,eVar24,eVar25,eVar26,eVar27,eVar28,eVar29,eVar30,eVar31,eVar32,eVar33,eVar34,eVar35,eVar36,eVar37,eVar38,eVar39,eVar41,eVar42,eVar43,eVar44,eVar45,eVar46,eVar47,eVar48,eVar49,eVar50,eVar51,eVar52,eVar53,eVar54,eVar55,eVar56,eVar57,eVar58,eVar59,eVar60,eVar61,eVar62,eVar63,eVar64,eVar65,eVar66,eVar67,eVar68,eVar69,eVar70,eVar71,eVar72,eVar73,eVar74,eVar75,list1,contextData.VideoEvent";


s.Media.contextDataMapping={
	"a.media.name":"eVar22,prop37",
	"a.contentType":"eVar73",
	"a.media.timePlayed":"event87",
	"a.media.segment":"eVar74",
	"a.media.view":"event5",
	"a.media.complete":"event9",
	"a.media.segmentView":"event50",
	"a.media.ad.name":"eVar15,prop73",
	"a.media.ad.timePlayed":"event88",
	"a.media.ad.view":"event3",
	"a.media.ad.complete":"event4",
	"a.media.milestones":{
		50:"event7",
		90:"event8"
	}
};

s.Media.monitor=function (s,media) {
	if ((media.event == "OPEN") && (media.eventFirstTime)) {
		s.Media.trackEvents="event3,event4,event5,event6,event7,event8,event9,event50,event53,event80,event87,event88,event89";
		s.eVar21=mdManager.getParameterString("videoPlayerType");
		s.eVar23=mdManager.getParameterString("showTitle");
		s.eVar24=mdManager.getParameterString("videoPlayerName");
		s.eVar25=mdManager.getParameterString("videoChannelName");
		s.eVar27=mdManager.getParameterString("videoPublisherID");
		s.eVar28=mdManager.getParameterString("videoPlayType");
		s.eVar29=mdManager.getParameterString("videoNLVID");
		s.eVar30=mdManager.getParameterString("videoSCRID");
		s.eVar31=mdManager.getParameterString("videoCMSID");
		s.eVar33=mdManager.getParameterString("videoRunTime");
		s.eVar34=mdManager.getParameterString("videoScreenType");
		s.eVar35=mdManager.getParameterString("videoSponsor");
		
		videoEvents=mdManager.getParameterString("videoEvents");
		if (videoEvents.length > 0) {s.contextData["VideoEvent"] = videoEvents;}
		
		var videoPlaylistCount="";
		if(s.eVar73 != "videoAd") {
			videoPlaylistCount=mdManager.getParameterString("videoPlaylistCount");
			if(videoPlaylistCount != undefined && videoPlaylistCount !="" && videoPlaylistCount != "0") {
				//s.events=s.events + ",event89=" + videoPlaylistCount;
				s.events=s.apl(s.events,"event89=" + videoPlaylistCount,",",2);
				mdManager.setParameter("videoPlaylistCount", "");
			}
		}
		sendRequest();
		//clear videoEvent array and context variable
		if (videoEvents.length > 0) {
			mdManager.setParameter("videoEvents", "");
			s.contextData['VideoEvent'] = "";
		}
		
		//Nielsen Video Capture - on video content start
		var davImg = new Image();
		var ScImgSrc;
		var ScRandom = Math.ceil(Math.random()*1000000000);
        ScImgSrc = "http://secure-us.imrworldwide.com/cgi-bin/m?ci=us-200639";
		var enShowTitle = mdManager.getParameterString("showTitle");
		var enVideoTitle = mdManager.getParameterString("videoTitle");
		if (enShowTitle != "") {ScImgSrc += "&cg=" + enShowTitle;}
		else {ScImgSrc += "&cg=" + escape("No Show Title");}
		ScImgSrc += "&tl=dav0-" + enVideoTitle;
        //ScImgSrc += '&c3=st,a' + escape('StreamType');  //Use only if the video stream is an advertisement
        ScImgSrc += "&c6=vc,c16";  //VideoCensus ID - specified by Nielsen - varies per entity
        ScImgSrc += "&cc=1";  //Cookie Check (Always on)
        ScImgSrc += "&rnd=" + ScRandom;
        davImg = "";
        davImg = new Image();
        davImg.src = ScImgSrc;
		
		
		//comScore Video Capture - on video content start
		var csImg = new Image();
		var csImgSrc;
		csImgSrc = "http://b.scorecardresearch.com/p?c1=1&c2=6035648";
		csImgSrc += "&c3=" + s_account;
		if (enShowTitle != "") {csImgSrc += "&c4=" + enShowTitle;}
		else {csImgSrc += "&c4=" + mdManager.getParameterString("Title");}  //Added temporarily because hgtv video player not passing show title 02/03/2015
		//else {csImgSrc += "&c4=" + escape("No Show Title");}
		//determine ad or content
		if(mdManager.getParameterString("videoAdTitle") != "") { //ad
			csImgSrc += "&c5=01&c10=01-01";
		}
		else {
			var runTime=mdManager.getParameterString("videoRunTime");
			runTime = Math.floor(parseFloat(runTime));
			var videoType = (runTime > 480) ? "03" : "02";  //3 longform; 2 shortform
			csImgSrc += "&c5=" + videoType + "&c10=01-01";
		}
		//mdManager.setParameter("videoAdTitle", "");
        csImg = "";
		csImg = new Image();
		csImg.src = csImgSrc;
		}

	if (media.event == "MILESTONE") {
	s.Media.trackEvents="event3,event4,event5,event6,event7,event8,event9,event50,event53,event87,event88";
		s.eVar21=mdManager.getParameterString("videoPlayerType");
		s.eVar23=mdManager.getParameterString("showTitle");
		s.eVar24=mdManager.getParameterString("videoPlayerName");
		s.eVar25=mdManager.getParameterString("videoChannelName");
		s.eVar27=mdManager.getParameterString("videoPublisherID");
		s.eVar28=mdManager.getParameterString("videoPlayType");
		s.eVar29=mdManager.getParameterString("videoNLVID");
		s.eVar30=mdManager.getParameterString("videoSCRID");
		s.eVar31=mdManager.getParameterString("videoCMSID");
		s.eVar33=mdManager.getParameterString("videoRunTime");
		s.eVar34=mdManager.getParameterString("videoScreenType");
		s.eVar35=mdManager.getParameterString("videoSponsor");
		
		videoEvents=mdManager.getParameterString("videoEvents");
		if (videoEvents.length > 0) {s.contextData["VideoEvent"] = videoEvents;}
		sendRequest();
		//clear videoEvent array and context variable
		if (videoEvents.length > 0) {
			mdManager.setParameter("videoEvents", "");
			s.contextData['VideoEvent'] = "";
		}
	}

	if ((media.event=="CLOSE") && (media.eventFirstTime)) {
		s.Media.trackEvents="event3,event4,event5,event6,event7,event8,event9,event50,event53,event87,event88";
		s.eVar21=mdManager.getParameterString("videoPlayerType");
		s.eVar23=mdManager.getParameterString("showTitle");
		s.eVar24=mdManager.getParameterString("videoPlayerName");
		s.eVar25=mdManager.getParameterString("videoChannelName");
		s.eVar27=mdManager.getParameterString("videoPublisherID");
		s.eVar28=mdManager.getParameterString("videoPlayType");
		s.eVar29=mdManager.getParameterString("videoNLVID");
		s.eVar30=mdManager.getParameterString("videoSCRID");
		s.eVar31=mdManager.getParameterString("videoCMSID");
		s.eVar33=mdManager.getParameterString("videoRunTime");
		s.eVar34=mdManager.getParameterString("videoScreenType");
		s.eVar35=mdManager.getParameterString("videoSponsor");
	
		videoEvents=mdManager.getParameterString("videoEvents");
		if (videoEvents.length > 0) {s.contextData["VideoEvent"] = videoEvents;}
		sendRequest();
		//clear videoEvent array and context variable
		if (videoEvents.length > 0) {
			mdManager.setParameter("videoEvents", "");
			s.contextData['VideoEvent'] = "";
		}
		mdManager.setParameter("videoAdTitle", "");
		
		//Nielsen Video Capture - on video content complete
		var davImg = new Image();
		var ScImgSrc;
		var ScRandom = Math.ceil(Math.random()*1000000000);
        ScImgSrc = "http://secure-us.imrworldwide.com/cgi-bin/m?ci=us-200639";
		//var enShowTitle = escape(vpw._videoMeta.showTitle);
		//var enVideoTitle = escape(vpw._videoMeta.title);
		var enShowTitle = mdManager.getParameterString("showTitle");
		var enVideoTitle = mdManager.getParameterString("videoTitle");
		if (enShowTitle != "") {ScImgSrc += "&cg=" + enShowTitle;}
		else {ScImgSrc += "&cg=" + escape("No Show Title");}
		ScImgSrc += "&tl=dav2-" + enVideoTitle;
        //ScImgSrc += '&c3=st,a' + escape('StreamType');  //Use only if the video stream is an advertisement
        ScImgSrc += "&c6=vc,c16";   //VideoCensus ID - specified by Nielsen - varies per entity           
        ScImgSrc += "&cc=1";  //Cookie Check (Always on)
        ScImgSrc += "&rnd=" + ScRandom;
        davImg = "";
        davImg = new Image();
        davImg.src = ScImgSrc;
		//*****
	}
	
	if ((media.event == "OPENAD") && (media.eventFirstTime)) {
		s.Media.trackEvents="event3,event4,event5,event6,event7,event8,event9,event50,event53,event87,event88";
		s.eVar21=mdManager.getParameterString("videoPlayerType");
		s.eVar23=mdManager.getParameterString("showTitle");
		s.eVar24=mdManager.getParameterString("videoPlayerName");
		s.eVar25=mdManager.getParameterString("videoChannelName");
		s.eVar27=mdManager.getParameterString("videoPublisherID");
		s.eVar28=mdManager.getParameterString("videoPlayType");
		s.eVar29=mdManager.getParameterString("videoNLVID");
		s.eVar30=mdManager.getParameterString("videoSCRID");
		s.eVar31=mdManager.getParameterString("videoCMSID");
		s.eVar33=mdManager.getParameterString("videoRunTime");
		s.eVar34=mdManager.getParameterString("videoScreenType");
		s.eVar35=mdManager.getParameterString("videoSponsor");
		sendRequest();
		
		videoEvents=mdManager.getParameterString("videoEvents");
		if (videoEvents.length > 0) {s.contextData["VideoEvent"] = videoEvents;}
		//clear videoEvent array and context variable
		if (videoEvents.length > 0) {
			mdManager.setParameter("videoEvents", "");
			s.contextData['VideoEvent'] = "";
		}
	
	}
	
function sendRequest(){
if (!(omnitureCallFired && omnitureCallFired[mdManager.getParameterString("videoNLVID")])) {
	omnitureCallFired[mdManager.getParameterString("videoNLVID")] = true;
	s.events=s.apl(s.events,"event80",",",2);
}

s.Media.track(media.name);
s.events="";
}
}

s.m_Media_c="var m=s.m_i('Media');if(m.completeByCloseOffset==undefined)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==undefined)m.completeCloseOffsetThreshold=1;m.cn=function(n){var m="
+"this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',x;n=m.cn(n);if(!l)l=-1;if(n&&p){if(!m.l)m.l=new Object;"
+"if(m.l[n])m.close(n);if(b&&b.id)a=b.id;if(a)for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.o=0;i.x=0;i.p=m.cn(m.playerName?m.playerName:p);i.a=a;i.t=0;i.ts=0;i.s=Math.floor(tm"
+".getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;i.tc=0;i.fel=new Object;i.vt=0;i.sn=0;i.sx=\"\";i.sl=0;i.sg=0;i.sc=0;i.us=0;i.ad=0;i.adpn;i.adpp;i.adppp;i.clk;i.CPM;i.co=0;i.cot=0;i.lm=0;i.l"
+"om=0;m.l[n]=i}};m.openAd=function(n,l,p,pn,pp,ppp,CPM,b){var m=this,i=new Object;n=m.cn(n);m.open(n,l,p,b);i=m.l[n];if(i){i.ad=1;i.adpn=m.cn(pn);i.adpp=pp;i.adppp=ppp;i.CPM=CPM}};m._delete=function"
+"(n){var m=this,i;n=m.cn(n);i=m.l[n];m.l[n]=0;if(i&&i.m)clearTimeout(i.m.i)};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o,sn,sx,sl){var m=this,i;i=m.e(n,1,o,sn,sx,sl);if(i&&!i.m){i.m=new "
+"Object;i.m.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.m.i=setTimeout(i.m.m,1000)}}');i.m.m()}};m.click=function(n,o"
+"){this.e(n,7,o)};m.complete=function(n,o){this.e(n,5,o)};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){this.e(n,4,-1)};m.bcd=function(vo,i){var m=this,ns='a.media.',v=vo.linkTrackVars,e=v"
+"o.linkTrackEvents,pe='m_i',pev3,c=vo.contextData,x;if(i.ad){ns+='ad.';if(i.adpn){c['a.media.name']=i.adpn;c[ns+'pod']=i.adpp;c[ns+'podPosition']=i.adppp;}if(!i.vt)c[ns+'CPM']=i.CPM;}if (i.clk) {c[n"
+"s+'clicked']=true;i.clk=0}c['a.contentType']='video'+(i.ad?'Ad':'');c['a.media.channel']=m.channel;c[ns+'name']=i.n;c[ns+'playerName']=i.p;if(i.l>0)c[ns+'length']=i.l;if(Math.floor(i.ts)>0)c[ns+'ti"
+"mePlayed']=Math.floor(i.ts);if(!i.vt){c[ns+'view']=true;pe='m_s';i.vt=1}if(i.sx){c[ns+'segmentNum']=i.sn;c[ns+'segment']=i.sx;if(i.sl>0)c[ns+'segmentLength']=i.sl;if(i.sc&&i.ts>0)c[ns+'segmentView'"
+"]=true}if(!i.cot&&i.co){c[ns+\"complete\"]=true;i.cot=1}if(i.lm>0)c[ns+'milestone']=i.lm;if(i.lom>0)c[ns+'offsetMilestone']=i.lom;if(v)for(x in c)v+=',contextData.'+x;pev3=c['a.contentType'];vo.pe="
+"pe;vo.pev3=pev3;var d=m.contextDataMapping,y,a,l,n;if(d){vo.events2='';if(v)v+=',events';for(x in d){if(x.substring(0,ns.length)==ns)y=x.substring(ns.length);else y=\"\";a=d[x];if(typeof(a)=='strin"
+"g'){l=m.s.sp(a,',');for(n=0;n<l.length;n++){a=l[n];if(x==\"a.contentType\"){if(v)v+=','+a;vo[a]=c[x]}else if(y=='view'||y=='segmentView'||y=='clicked'||y=='complete'||y=='timePlayed'||y=='CPM'){if("
+"e)e+=','+a;if(y=='timePlayed'||y=='CPM'){if(c[x])vo.events2+=(vo.events2?',':'')+a+'='+c[x];}else if(c[x])vo.events2+=(vo.events2?',':'')+a}else if(y=='segment'&&c[x+'Num']){if(v)v+=','+a;vo[a]=c[x"
+"+'Num']+':'+c[x]}else{if(v)v+=','+a;vo[a]=c[x]}}}else if(y=='milestones'||y=='offsetMilestones'){x=x.substring(0,x.length-1);if(c[x]&&d[x+'s'][c[x]]){if(e)e+=','+d[x+'s'][c[x]];vo.events2+=(vo.even"
+"ts2?',':'')+d[x+'s'][c[x]]}}if(c[x])c[x]=undefined;if(y=='segment'&&c[x+'Num'])c[x+\"Num\"]=undefined}}vo.linkTrackVars=v;vo.linkTrackEvents=e};m.bpe=function(vo,i,x,o){var m=this,pe='m_o',pev3,d='"
+"--**--';pe='m_o';if(!i.vt){pe='m_s';i.vt=1}else if(x==4)pe='m_i';pev3=m.s.ape(i.n)+d+Math.floor(i.l>0?i.l:1)+d+m.s.ape(i.p)+d+Math.floor(i.t)+d+i.s+d+(i.to>=0?'L'+Math.floor(i.to):'')+i.e+(x!=0&&x!"
+"=2?'L'+Math.floor(o):'');vo.pe=pe;vo.pev3=pev3};m.e=function(n,x,o,sn,sx,sl,pd){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),c,l,v=m.trackVars,e=m.trackEvents,ti=m.trackSeconds,tp=m.tr"
+"ackMilestones,to=m.trackOffsetMilestones,sm=m.segmentByMilestones,so=m.segmentByOffsetMilestones,z=new Array,j,t=1,w=new Object,x,ek,tc,vo=new Object;if(!m.channel)m.channel=m.s.wd.location.hostnam"
+"e;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){if(i.ad){ti=m.adTrackSeconds;tp=m.adTrackMilestones;to=m.adTrackOffsetMilestones;sm=m.adSegmentByMilestones;so=m.adSegmentByOffsetMilestones}if(o<0){if(i"
+".lx==1&&i.lt>0)o=(ts-i.lt)+i.lo;else o=i.lo}if(i.l>0)o=o<i.l?o:i.l;if(o<0)o=0;i.o=o;if(i.l>0){i.x=(i.o/i.l)*100;i.x=i.x>100?100:i.x}if(i.lo<0)i.lo=o;tc=i.tc;w.name=n;w.ad=i.ad;w.length=i.l;w.openTi"
+"me=new Date;w.openTime.setTime(i.s*1000);w.offset=i.o;w.percent=i.x;w.playerName=i.p;if(i.to<0)w.mediaEvent=w.event='OPEN';else w.mediaEvent=w.event=(x==1?'PLAY':(x==2?'STOP':(x==3?'MONITOR':(x==4?"
+"'TRACK':(x==5?'COMPLETE':(x==7?'CLICK':('CLOSE')))))));if(!pd){if(i.pd)pd=i.pd}else i.pd=pd;w.player=pd;if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {if(!sx){sn=i.sn;sx=i.sx;sl=i.sl}if(x){if(x==1)i.lo=o;if("
+"(x<=3||x>=5)&&i.to>=0){t=0;v=e=\"None\";if(i.to!=o){l=i.to;if(l>o){l=i.lo;if(l>o)l=o}z=tp?m.s.sp(tp,','):0;if(i.l>0&&z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&(l/i.l)*100<c"
+"&&i.x>=c){t=1;j=z.length;w.mediaEvent=w.event='MILESTONE';i.lm=w.milestone=c}}z=to?m.s.sp(to,','):0;if(z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&l<c&&o>=c){t=1;j=z.length;w"
+".mediaEvent=w.event='OFFSET_MILESTONE';i.lom=w.offsetMilestone=c}}}}if(i.sg||!sx){if(sm&&tp&&i.l>0){z=m.s.sp(tp,',');if(z){z[z.length]='100';l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0"
+";if(c){if(i.x<c){sn=j+1;sx='M:'+l+'-'+c;j=z.length}l=c}}}}else if(so&&to){z=m.s.sp(to,',');if(z){z[z.length]=''+(i.l>0?i.l:'E');l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c||z[j]=="
+"'E'){if(o<c||z[j]=='E'){sn=j+1;sx='O:'+l+'-'+c;j=z.length}l=c}}}}if(sx)i.sg=1}if((sx||i.sx)&&sx!=i.sx){i.us=1;if(!i.sx){i.sn=sn;i.sx=sx}if(i.to>=0)t=1}if((x>=2||i.x>=100)&&i.lo<o){i.t+=o-i.lo;i.ts+"
+"=o-i.lo}if(x<=2||(x==3&&!i.lx)){i.e+=(x==1||x==3?'S':'E')+Math.floor(o);i.lx=(x==3?1:x)}if(!t&&i.to>=0&&x<=3){ti=ti?ti:0;if(ti&&i.ts>=ti){t=1;w.mediaEvent=w.event='SECONDS'}}i.lt=ts;i.lo=o}if(!x||("
+"x<=3&&i.x>=100)){if(i.lx!=2)i.e+='E'+Math.floor(o);x=0;v=e=\"None\";w.mediaEvent=w.event=\"CLOSE\"}if(x==7){w.clicked=i.clk=1;t=1}if(x==5||(m.completeByCloseOffset&&(!x||i.x>=100)&&i.l>0&&o>=i.l-m."
+"completeCloseOffsetThreshold)){w.complete=i.co=1;t=1}ek=w.mediaEvent;if(ek=='MILESTONE')ek+='_'+w.milestone;else if(ek=='OFFSET_MILESTONE')ek+='_'+w.offsetMilestone;if(!i.fel[ek]) {w.eventFirstTime"
+"=true;i.fel[ek]=1}else w.eventFirstTime=false;w.timePlayed=i.t;w.segmentNum=i.sn;w.segment=i.sx;w.segmentLength=i.sl;if(m.monitor&&x!=4)m.monitor(m.s,w);if(x==0)m._delete(n);if(t&&i.tc==tc){vo=new "
+"Object;vo.contextData=new Object;vo.linkTrackVars=v;vo.linkTrackEvents=e;if(!vo.linkTrackVars)vo.linkTrackVars='';if(!vo.linkTrackEvents)vo.linkTrackEvents='';if(m.trackUsingContextData)m.bcd(vo,i)"
+";else m.bpe(vo,i,x,o);m.s.t(vo);if(i.us){i.sn=sn;i.sx=sx;i.sc=1;i.us=0}else if(i.ts>0)i.sc=0;i.e=\"\";i.lm=i.lom=0;i.ts-=Math.floor(i.ts);i.to=o;i.tc++}}}return i};m.ae=function(n,l,p,x,o,sn,sx,sl,"
+"pd,b){var m=this,r=0;if(n&&(!m.autoTrackMediaLengthRequired||(length&&length>0)) &&p){if(!m.l||!m.l[n]){if(x==1||x==3){m.open(n,l,p,b);r=1}}else r=1;if(r)m.e(n,x,o,sn,sx,sl,pd)}};m.a=function(o,t){"
+"var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7"
+"='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new"
+" Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch("
+"e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p="
+"'Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8"
+")x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x."
+"type='text/javascript';x.htmlFor=i;x.event='PlayStateChange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p=="
+"2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTime"
+"Scale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,0,\"\",0,0,o);m.ae(mn,l,\"'+p+'\",x,x"
+"!=2?p:-1,0,\"\",0,0,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c"
+");o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetL"
+"ength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n==3&&(o.'+f7+'>=10|"
+"|!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new"
+" Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o.'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack"
+"&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName(m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd."
+"addEventListener)s.wd.addEventListener('load',m.as,false);if(m.onLoad)m.onLoad(s,m)";s.m_i("Media");



