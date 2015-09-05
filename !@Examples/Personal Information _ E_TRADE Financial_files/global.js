// to build environmental local url
var envLocalHost = window.location.protocol + '//' + window.location.host; 

/*getPageDomain = function() {
	var pgDomain = expressHost; //page.config.url.ETRADE;
	return pgDomain;
}*/
getPageDomain = function() {
	var pgurl = document.location.href;
	var currentpgurl = pgurl.toLowerCase();
	//currentpgurl = currentpgurl.toLowerCase();
	var domain = "";
	if (currentpgurl.indexOf("sit") > -1) {
		domain = "https://sit.etrade.com";
	}
	else if (currentpgurl.indexOf("uat") > -1) {
		domain = "https://uat.etrade.com";
	}
	else if((currentpgurl.indexOf("oaa") > -1) || (currentpgurl.indexOf("express") > -1)){
		domain = "https://us.etrade.com"; 
	}
	else {
		domain = "https://us.etrade.com"; // for dev change to sit
	}
	return domain;
}

function getCook(cookiename) {
    var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
    return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+/,"").replace("=","") : "");
}


function GoToETURL(url,server,win) {
	//if(server)
	mywin = win ? win : "";
	var host="";
	switch(server) {
		  case "activate": host = page.config.url.ACTIVATE; break;
                case "bankus": host = page.config.url.BANKUS; break;
                case "bond": host = page.config.url.BOND; break;
                case "borrow": host = page.config.url.BORROW; break;
                case "edocs": host = page.config.url.EDOCS; break;
                case "etca": host = page.config.url.ETCA; break;
                //case "etrade": host = page.config.url.ETRADE; break;
				case "etrade": host = etradeHost; break;
				case "etradeHost": host = getPageDomain(); break;
				case "ETRADE": host = etradeHost; break;
                case "express": host = expressHost; break;
				case "EXPRESS": host = expressHost; break;
                case "filesvr": host = page.config.url.FILESVR; break;
                case "olink": host = page.config.url.OLINK; break;
                case "search": host = page.config.url.SEARCH; break;
                case "community": host = page.config.url.COMMUNITY_BASE; break;
	}
	new_url = host+url;
	if(mywin != "") {
		window.open(new_url,"ETRADE","scrollbars=yes,resizable=yes,toolbar=yes,height=800,width=1000,left=50,top=10");
	}
	else {
		if(pageBailer != null) {
			runContinue(); // To prevent the chat window while page unloading
		}
		document.location.href=new_url;
	}	
}

function etWin(url,windowName,sWidth,sHeight,toolbarYS,locationYS,scrollbarYS,menubarYS,resizeYS,
              HorizPos,VertPos,server,bUseDefaults){
  var features;
  if(bUseDefaults==null){
    bUseDefaults=true;
  }

  if(!url){
    return;
  }


  //set window name, using window name _blank will execute window resize
  windowName = (bUseDefaults?(windowName?windowName:'ETpopUP'):(windowName?windowName:"_blank") );

  features =(bUseDefaults?"width="+(sWidth?sWidth:400)+",":(sWidth?"width="+sWidth+",":'')  )
           +(bUseDefaults?"height="+(sHeight?sHeight:400)+",":(sHeight?"height="+sHeight+",":'')  )
           +(bUseDefaults?"toolbar="+(toolbarYS?toolbarYS:1)+",":(toolbarYS?"toolbar="+toolbarYS+",":'')  )
           +(bUseDefaults?"location="+(locationYS?locationYS:1)+",":(locationYS?"location="+locationYS+",":'')  )
           +(bUseDefaults?"scrollbars="+(scrollbarYS?scrollbarYS:1)+",":(scrollbarYS?"scrollbars="+scrollbarYS+",":'')  )
           +(bUseDefaults?"menubar="+(menubarYS?menubarYS:1)+",":(menubarYS?"menubar="+menubarYS+",":'')  )
           +(bUseDefaults?"resizable="+(resizeYS?resizeYS:1)+",":(resizeYS?"resizable="+resizeYS+",":'')  )
           +(bUseDefaults?"top="+(VertPos?VertPos:5)+",":(VertPos?"top="+VertPos+",":'')  )
           +(bUseDefaults?"left="+(HorizPos?HorizPos:5)+",":(HorizPos?"left="+HorizPos+",":'')  );

  if(!server || url.substr(0,4) == "http"){
      server="";
  }

 // windowName=removeSpecialChar(windowName, "*");
  //windowName=removeSpecialChar(windowName, " ");

  var rtpc = /etrtpcounter_goto/.test( url ), 
      gxml = url.indexOf("gxml");

  if (rtpc != false &&  gxml != -1){
    var bgxml = url.substring(0, gxml),
        agxml = url.substring(gxml);
    url = bgxml + encode(agxml);
  }

  if(windowName=="_blank"){
    features = "toolbar=1,menubar=1,location=1,scrollbars=1,resizable=1";
  }


  ETpopUp=(features?window.open(server+url,windowName,features):window.open(server+url,windowName) );

  if(windowName=="_blank"){
    if (window.screen) {
      var aw = screen.availWidth, 
          ah = screen.availHeight;
      ETpopUp.moveTo(0, 0);
      ETpopUp.resizeTo(aw, ah);
    }
  }

  if(window.focus){
      ETpopUp.focus();
  }
}

function openHelp(a){ 	
	web_Server=getPageDomain();
	fresh_url=web_Server+a;
	leftPos=0;
	if(screen){leftPos=screen.width-280}
	SmallWin=window.open(fresh_url,"HelpWindow","scrollbars=yes,resizable=yes,toolbar=no,height=688,width=270,left="+leftPos+",top=0");
	if(window.focus) {
		SmallWin.focus()}if(SmallWin.opener==null){SmallWin.opener=window;SmallWin.opener.name="newPUMain"}
}

function goto_noHelp(dest){
		
		if(dest!=null){
			noHelp = true;
			if(pageBailer != null) {
				runContinue(); // To prevent the chat window while page unloading
			}
			location.href= dest;
		}
		
}

function footerLink(thelink){
	url = "";	
	switch(thelink) {
		case "privacy" : url = "/e/t/prospectestation/pricing?id=1209010000";GoToETURL(url,"etrade","cetrade"); break;
		case "about" :	url = etWin('https://about.etrade.com'); break;
		case "aboutAds": url = "/e/t/prospectestation/pricing?id=1209010000#aboutads";GoToETURL(url,"etrade","cetrade"); break;
		case "onlinesecurity" : url = "/e/t/estation/pricing?id=1220000000";GoToETURL(url,"etrade","cetrade"); break; 
	}
	
}


$(document).ready(function(){
	$(".protection-guarantee").click(function(event){
         GoToETURL("/e/t/home/securityguarantee","etrade","cetrade")
    });
	
	$(".sipc").click(function(event){
         GoToETURL("/e/t/estation/pricing?id=1600000003","etrade","cetrade")
    });
	
	$(".verisign").click(function(event){
         GoToETURL("https://sealinfo.websecurity.norton.com/splash?form_file=fdf/splash.fdf&dn=US.ETRADE.COM&lang=en","","vsign")
    });
	
	//placeholder for footer urls
});

var bailoutObj = function() {
  
   this.olaStatus = this.olaStatus ? this.olaStatus : "start" ;
   this.setOlaSession = function(newStatus) {
  
   	 // console.log(newStatus)
   	  if (newStatus !== "undefined") {	
	  	this.olaStatus = newStatus;
   		sessionStorage.setItem("ola_status", newStatus);   			
	   }
	   else {
	   	sessionStorage.setItem("ola_status", this.olaStatus);		
	   }
  
   }
   
   this.getOlaSession = function() {	  
	 	this.olaStatus = sessionStorage.getItem("ola_status");
		return this.olaStatus;		
   }
 
   this.clearOlaSession = function() {	   	
	 	 sessionStorage.removeItem("ola_status");				
   } 
   
 
}

if(typeof(Storage)!=="undefined") {		
	var pageBailer = new bailoutObj("start"), ola = true;
}
else {
	var pageBailer = null;
}	



(function runOnload() {	
 	pageBailer.setOlaSession('start');
	//console.log("onload" + pageBailer.olaStatus);
})();
 	
function runContinue() {
 	pageBailer.setOlaSession('cont');
	//console.log("run continue" + pageBailer.olaStatus);
}

function resetStart() {
	pageBailer.setOlaSession('start')
}

function runUnload() {	
	if (pageBailer.olaStatus == 'cont') {
		var cookieval = pageBailer.olaStatus;
	}
	else {
		 	
		var cookieval = pageBailer.olaStatus,
		url = "/oaa/bailer?ai=6344&di="+groupId+"&neo.skin=skinless";		
		pageBailer.clearOlaSession();	 	
	 	//window.open(url, "bailpop", "location=0,status=0,scrollbars=0, width=260,height=285");
		window.open(url,"ETRADE","location=0,scrollbars=0,resizable=yes,toolbar=0,height=285,width=260")
			 	 
	}
}

//window.onbeforeunload = runUnload;

window.onunload = runUnload;

$(document).ready(function() {
	$(window).unload(runUnload);
});

// disabled pageBailer on step-one Select a Different Account overlay and upgrade to OSR in rollover IRA
$('#change-account a.arrow-link, #OneStopRolloverIRA, #fundingpagesubmit, #fundingpagewidgetsubmit, #reviewButton').on('click',function(e){
    runContinue();
});

// disabled pageBailer on step-one select a different account type
if ($('input[id^="account"]').is(':checked')){
    runContinue();
};


