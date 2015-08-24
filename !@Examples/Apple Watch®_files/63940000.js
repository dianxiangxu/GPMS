
// JavaScript Document
lMappedFor_GENDER = 'mr~M,ms~F,mrs~F';
var tmgViewportWidth;
function fn_AttachOrientationWidthBody() {
    if (window.addEventListener) {
        window.addEventListener("orientationchange", function() {
            fn_AdjustOfferCompatibleForDevice();
        }, false);

        window.addEventListener("resize", function() {
            fn_AdjustOfferCompatibleForDevice();
        }, false);
    }
    else if (window.attachEvent) {
        window.attachEvent("onorientationchange", function() {
            fn_AdjustOfferCompatibleForDevice();
        }, false);

        window.attachEvent("onresize", function() {
            fn_AdjustOfferCompatibleForDevice();
        }, false);
    }
}
function fn_AdjustOfferCompatibleForDevice() {
    try {
        //Calculate device resolution
       var tmgViewportWidth = document.getElementById("TmgOffers").parentNode.offsetWidth;
       //var tmgViewportWidth = document.getElementById("TmgOffers").parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.offsetWidth;
        // Custome Setting
        tmgViewportWidth = tmgViewportWidth > 600 ? 600 : tmgViewportWidth;


        // Adjust offer inline style based on device resolution
        tmgViewportWidth -= 20;

        var i = 0;
        var lMainContiner = document.getElementById("TmgOffers");
        lMainContiner.style.setProperty("width", tmgViewportWidth + "px", "important");
        for (i = 0; i < lMainContiner.childNodes.length - 1; i++) {
            if (lMainContiner.childNodes[i].tagName == "DIV") {
                lMainContiner.childNodes[i].style.setProperty("width", tmgViewportWidth + "px", "important");
            }
        }
        var lOfferContainer = document.getElementById("tmgDisplayOfferContainer");
        for (i = 0; i < lOfferContainer.childNodes.length; i++) {
            if (lOfferContainer.childNodes[i].tagName == "DIV") {
                lOfferContainer.childNodes[i].style.setProperty("width", tmgViewportWidth + "px", "important");
            }
        }
        var lCampIds = lAllCampaigns.split(",");
        var lIsControlLabelFloatLeft = false;
        var lIsCreativeShowinFullLength = false;
        for (i = 0; i < lCampIds.length; i++) {
            var lInnerWidth = tmgViewportWidth;
            var lCreativeWidth = 0;
            //Creative Decition
            //if (tmgViewportWidth < 450) {
            //    lCreativeWidth = lInnerWidth;		
           // }
           // else {
		var varCreativeWidth;
		var divLogo = document.getElementById("TmgCampaignLogo$" + lCampIds[i]);
            	if (divLogo != null) {                
	                var img = divLogo.getElementsByTagName("img")[0];
        	        if (img.src.indexOf("_88x31") != -1) {
                	    varCreativeWidth = lInnerWidth - 150;
	                }
        	        if (img.src.indexOf("_120x60") != -1) {
                		varCreativeWidth = lInnerWidth - 190;	    
                	}
            	}
		else{
		     varCreativeWidth = lInnerWidth - 60;
		}
		lCreativeWidth = varCreativeWidth;		
            //}            
            
	
            try{                
   		var divTmgCampaignCotntrol0 = document.getElementById("TmgCampaignControl$" + lCampIds[i] + "$0");
		if(lInnerWidth<=280){		
		     divTmgCampaignCotntrol0.style.setProperty("float", "none", "important");
	    	}
		else{
		     divTmgCampaignCotntrol0.style.setProperty("float", "left", "important");
		}
	    }
	    catch(ex){}

            var lCreativeArea = document.getElementById("TmgCampaignCreative$" + lCampIds[i]);
            lCreativeArea.style.setProperty("width", lCreativeWidth + "px", "important");
            //lCreativeArea.style.setProperty("padding-top", "5px", "important");
            lCreativeArea.firstElementChild.style.setProperty("width", lCreativeWidth + "px", "important");

            document.getElementById("TmgSpacerTop$" + lCampIds[i]).style.setProperty("width", lInnerWidth + "px", "important");
            document.getElementById("TmgCampaignSepratorId$" + lCampIds[i]).style.setProperty("width", lInnerWidth + "px", "important");
            document.getElementById("TmgSpacerBottom$" + lCampIds[i]).style.setProperty("width", lInnerWidth + "px", "important");

            var lCreativeMoreInfoAbsoluteDiv = document.getElementById("CreativeMoreInfo_Absolute$" + lCampIds[i])
			            if (lCreativeMoreInfoAbsoluteDiv != null) {
			                lCreativeMoreInfoAbsoluteDiv.style["width"] = (lCreativeWidth - 50) + "px";
			                lCreativeMoreInfoAbsoluteDiv.style["marginLeft"] = "20px";
            }

            var lAdditionalFieldArea = document.getElementById("TmgAdditionalFields$" + lCampIds[i])
				if (lAdditionalFieldArea != null) {
					lAdditionalFieldArea.style.setProperty("width", lInnerWidth + "px", "important");
					lAdditionalFieldArea.style.setProperty("padding-left", "0px", "important");
					if (tmgViewportWidth > 480)
					{
						lAdditionalFieldArea.style.setProperty("padding-top", "10px", "important");
					}
					else
					{
						lAdditionalFieldArea.style.setProperty("padding-top", "10px", "important");
			}

            var lDisclaimerArea = document.getElementById("TmgCampaignDisclaimer$" + lCampIds[i])
            if (lDisclaimerArea != null) {
                lDisclaimerArea.style.setProperty("width", lInnerWidth + "px", "important");
                lDisclaimerArea.style.setProperty("padding-left", "0px", "important");
            }

                var j;
                var lControlWidth = lInnerWidth < 450 ? lInnerWidth : 390;
                lControlWidth -= 30;
                for (j = 0; j < lAdditionalFieldArea.childNodes.length; j++) {
                    if (lAdditionalFieldArea.childNodes[j].tagName == "DIV" && lAdditionalFieldArea.childNodes[j].id.indexOf("_TABLE") != -1) {
                        var lFieldArea = lAdditionalFieldArea.childNodes[j];
                        lFieldArea.style["width"] = "";
                        if (lIsControlLabelFloatLeft) {
                            lFieldArea.childNodes[0].style.setProperty("width", "150px", "important");
                            lFieldArea.childNodes[0].style.setProperty("float", "left", "important");
                        }
                        else {
                            lFieldArea.childNodes[0].style["float"] = "";
                            lFieldArea.childNodes[0].style["width"] = "";
                        }
			
			if (typeof (lFieldArea.childNodes[1]) !== 'undefined' && lFieldArea.childNodes[1] != null) {
                        	if (lFieldArea.childNodes[1].firstElementChild.type == "text") {
	                         	lFieldArea.childNodes[1].firstElementChild.style.setProperty("width", lControlWidth + "px", "important");
        		                lFieldArea.childNodes[1].firstElementChild.style["height"] = "";
	                        }
					
                        	if (lFieldArea.childNodes[1].firstElementChild.type == "select-one") {
                            		lFieldArea.childNodes[1].firstElementChild.style.setProperty("width", lControlWidth + 12 + "px", "important");
	                            	lFieldArea.childNodes[1].firstElementChild.style["height"] = "";
                        	}
			}			
                        if (lFieldArea.id.indexOf("DATE_OF_BIRTH") != -1) {
                            if (lFieldArea.childNodes[1].childNodes.length > 2) {
                                var k = 0;
                                //if (lIsControlLabelFloatLeft) {
                                if (lUSER_PLATFORM==0) {
                                    for (k = 0; k < lFieldArea.childNodes[1].childNodes.length - 1; k++) {
                                        if (k < 2) {
                                            lFieldArea.childNodes[1].childNodes[k].style.setProperty("padding-right", "5px", "important");
                                        }
                                        lFieldArea.childNodes[1].childNodes[k].style["width"] = "";
                                        lFieldArea.childNodes[1].childNodes[k].firstElementChild.style.setProperty("width", lControlWidth / 3 + "px", "important");
                                        lFieldArea.childNodes[1].childNodes[k].firstElementChild.style["height"] = "";
                                    }
                                }
                                else {
                                    for (k = 0; k < lFieldArea.childNodes[1].childNodes.length - 1; k++) {
                                        lFieldArea.childNodes[1].childNodes[k].style["padding-right"] = "";
                                        lFieldArea.childNodes[1].childNodes[k].style["width"] = "";
                                        lFieldArea.childNodes[1].childNodes[k].firstElementChild.style.setProperty("width", lControlWidth + 12 + "px", "important");
                                        lFieldArea.childNodes[1].childNodes[k].firstElementChild.style["height"] = "";
                                    }
                                }
                            }
                        }
                        if (lFieldArea.id.indexOf("PHONE") != -1) {
                            if (lFieldArea.childNodes[1].childNodes.length > 2) {
                                var k = 0;
                                for (k = 0; k < lFieldArea.childNodes[1].childNodes.length - 1; k++) {
                                    lFieldArea.childNodes[1].childNodes[k].style["padding"] = "";
                                    if (k < 2) {
                                        lFieldArea.childNodes[1].childNodes[k].style.setProperty("padding-right", "5px", "important");
                                    }
                                    lFieldArea.childNodes[1].childNodes[k].style["width"] = "";
                                    lFieldArea.childNodes[1].childNodes[k].firstElementChild.style.setProperty("width", (lControlWidth / 3) - 12 + "px", "important");
                                    lFieldArea.childNodes[1].childNodes[k].firstElementChild.style["height"] = "";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    catch (ex) {
	//alert(ex);
    }
}
function fn_DeviceAdditionalScript() {
    //Only Device permit
    /*if (lUSER_PLATFORM == 0) {
        return;
    }*/
    //Adding meta for device
    try {
        document.getElementsByTagName('head')[0].innerHTML += '<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">';
    }
    catch (ex) {

    }

    //Attach event
    fn_AttachOrientationWidthBody();

    fn_AdjustOfferCompatibleForDevice();
}

var local_Oldonload = window.onload;
if (typeof window.onload != 'function') {
    window.onload = function() {		
        fn_DeviceAdditionalScript();
        setTimeout(function() { fn_AdjustOfferCompatibleForDevice() },200)
    }
}
else {
    window.onload = function() {
        fn_DeviceAdditionalScript();
        setTimeout(function() { fn_AdjustOfferCompatibleForDevice() },200)
        local_Oldonload();
    }
}