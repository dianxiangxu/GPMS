//v 1.47.9J
var arrSpecialRules = ["2015341AUHDLP","2015346AUHDLP","2015710AUNDLP","2015220AUHDBP","2015221AUHDBP","2015671AUNDBP","2015918AUHDLP","2015190AUHDBP","2015191AUHDBP","2015679AUHDBP","2015680AUHDBP","2015659AUNDBP","2015893AUNDBP","2015894AUNDBP","2015916AUHDLP","2015159AUHDBP","2015645AUNDBP","2015152AUHDLP","2015153AUHDLP","2015137AUHDLP","2015138AUHDLP","2015099AUHDLP","2015628AUNDLP","2015106AUHDLP","2015632AUNDLP","2015110AUHDBP","2015633AUNDBP","2015908AUHDLP","2015079AUHDBP","2015079AUHDBPT1","2015907AUHDLP","2015622AUNDBP","2015622AUNDBPT1","2015052AUHDLP","2015053AUHDLP","2015903AUHDLP","2015039AUHDBP","2015601AUHDBP","2015608AUNDBP","2015020AUHDLP","2015902AUHDLP","2015604AUNDLP","2015JanTVPostcardP","2015JanTVPostcardPT1","2014529AUHDBP","2014529AUHDBPT1","2014763AUNDBP","2014756AUNDLP","2014499AUHDLPT1","2014754AUNDLPT1","2014480AUHDBP","2014481AUHDBP","2014749AUNDBP","2014450AUHDLP","2014738AUNDLP","2014472AUHDLP","2014473AUHDLP","2014587AUHDLP","2014745AUNDLP","2014452aAUHDLPT1","2014453aAUHDLPT1","2014436AUHDLP","2014430AUHDLP","2014430AUHDBP","2014698AUHDBP","2014698AUHDBPT1","2014439AUHDLP","2014732AUNDLP","2014733AUNDBP","2014734AUNDLP","2014OctTVPostcardP","2014417AUHDLP","2014418AUHDLP","2014419AUHDLP","2014097AUHDLP","2014727AUNDLP","2014894AUNDLP","2014402AUHDLP","2014403AUHDLP","2014390aAUHDLP","2014390AUHDLPT1","2014399AUHDLP","2014720AUNDLP","2014389AUHDBP","2014718AUNDBP","2014705AUNDLPT1","2014339AUHDBP","2014339AUHDBPT1","2014699AUNDBP","2014699AUNDBPT1","2014347AUHDLP","2014348AUHDLP","2014689AUHDLP","2014341AUHDLP","2014346AUHDLP","2014351AUHDLP","2014356aAUHDLP","2014356AUHDLPT1","2014354AUHDLP","2014355AUHDLP","2014705aAUNDLP","2014300AUHDLP","2014302AUHDLP","2014303AUHDLP","2014566AUHDLP","2014690AUNDLP","2014310AUHDLP","2014311AUHDLP","2014319AUHDBP","2014314AUHDLP","2014315AUHDLP","2014693AUNDLP","2014694AUNDBP","2014324AUHDLP","2014325AUHDLP","2014567AUHDLP","2014568AUHDLP","2014329AUHDLP","2014698AUNDLP","2014292AUHDLP","2014293AUHDLP","2014689AUNDLP","2014878AUNDLP","2014272AUHDLP","2014273AUHDLP","2014270AUHDLP","2014279AUHDBP","2014271AUHDBP","2014680AUNDBP","2014289AUHDLP","2014683AUNDLP","2014JulyTVPostcardP","2014706AUHD","2014707AUHD","2014246AUHDLP","2014247AUHDLP","2014248AUHDLP","2014256AUHDLP","2014254AUHDLP","2014255AUHDLP","2014674AUNDLP","2014874AUNDLP","2014232AUHDLP","2014233AUHDLP","2014704AUHD","2014705AUHD","2014MayTVPostcardPCtrl","2014MayTVPostcardPT1","2014873AUNDLP","2014171AUHDLP","2014179AUHDLP","2014179AUHDLPT1","2014649AUNDLP","2014649AUNDLPT1","2014180AUHDBP","2014181AUHDBP","2014182AUHDLP","2014183AUHDLP","2014556AUHDLP","2014652AUNDLP","2014654AUNDLP","2014192AUHDLP","2014193AUHDLP","2014190AUHDLPT1","2014657AUNDLPT1","2014219AUHDBP","2014219AUHDBPT1","2014214AUHDLP","2014215AUHDLP","2014662AUNDLP","2014662AUNDLPT1","2014662AUNDBP","2014662AUNDBPT1","2014664AUNDLP","2014635AUNDLPT1","2014635AUNDLPT2","2014644AUNDLP","2014555AUHDLP","2014647AUNDLP","2014119AUHDBPR1","2014147AUHDBPR1","2014136AUHDLP","2014137AUHDLP","2014138AUHDLP","2014149AUHDBP","2014642AUNDBP","2014150AUHDLP","2014151AUHDLP","2014553AUHDLP","2014162AUHDLP","2014163AUHDLP","2014553AUHDLP","2014554AUHDLP","2014160AUHDLP","2014079AUHDBP","2014621AUNDBP","2014119AUHDBP","2014632AUNDBP","2014089aAUHDLP","2014081aAUHDLP","2014090AUHDLP","2014096AUHDLP","2014099AUHDLP","2014129AUHDLPT1","2014129AUHDLPT2","2014120AUHDLP","2014121AUHDLP","2014054AUHDLP","2014055AUHDLP","2014052AUHDLP","2014053AUHDLP","2014061AUHDLP","2014066AUHDLP","2014JanTVPostcardProspect","2014NB713T1Postcard","2013534AUHDLP","2013535AUHDLP","2014022AUHDLP","2014023AUHDLP","2014541AUHDLP","2014029AUHDLPT2","2014030AUHDLP","2014036AUHDLP","2014036AUHDLPT1","2013469AUHDLPT1","2013469AUHDLPT2","2013469AUHDLPT3","2013471AUHDLP","2013476AUHDLP","2013480AUHDLP","2013481AUHDLP","2013489AUHDLP","2013484AUHDLP","2013485AUHDLP","2013492AUHDLP","2013493AUHDLP","2013071AUHDLP","2013511AUHDLP","2013516AUHDLP","2013422AUHDLP","2013423AUHDLP","2013424AUHDLP","2013425AUHDLP","2013593AUHDLP","2013594AUHDLP","2013595AUHDLP","2013596AUHDLP","2013430AUHDLPT1","2013440AUHDLP","2013446AUHDLPT1","2013390AUHDLP","2013392aAUHDLP","2013392AUHDLPT1","2013393aAUHDLP","2013393AUHDLPT1","2013401AUHDLP","2013406AUHDLP","2013419AUHDLP","2013412AUHDLP","2013413AUHDLP","2013369AUHDLP","2013360AUHDLPT1","2013362AUHDLP","2013363AUHDLP","2013722AUNDLP","2013723AUNDLPT1","2013725AUNDLP","2013386AUHDLP","2013729AUNDBP","2013356AUHDLPT1","2013352AUHDLP","2013353AUHDLP","2013719AUNDLPT1","2013707AUNDLP","2013316AUHDLP","2013708AUNDLP","2013585AUHDLP","2013319aAUHDLP","2013706AUNDLP","2013310AUHDLPT1","2013310aAUHDLP"]

/* Changes:
v1.47.9J - Week 34 (2015) mobile rules additions. ("2015341AUHDLP","2015346AUHDLP","2015710AUNDLP")
v1.47.9I - Week 22 mobile rules additions...
v1.47.9H - PCH PRIZE TOTAL TO DATE, updated to 248 (5/6/15) - Line 292
v1.47.9G - Week 15/16 mobile rules additions...
v1.47.9F - Week 13 mobile rules additions...
v1.47.9E - Week 9/10/11 mobile rules additions...
v1.47.9 - It seems that the IDs for the desktop Uni-Nav rules & facts links have changes. I've edited fAutoRules(line 172)
v1.47.8 - Week 45 mobile rules additions...
v1.47.7 - Week 43 mobile rules additions...
v1.47.6 - Week 41 mobile rules additions & 2014 Oct Postcard...
v1.47.6 - Week 40 mobile rules additions...
v1.47.5 - Week 39 mobile rules additions...
v1.47.4 - Week 38 mobile rules additions...
v1.47.3 - Weeks 26 to 36 have been added to the mobile rules list...
v1.47.2 - Weeks 24 & 25 has been added to the mobile rules list...
v1.47.1 - Week 23 has been added to the mobile rules list...
v1.47 - make "title" selector more specific to be select.title.
v1.46 - update fAutoRules to append "d" to desktop links.  
v1.45 - UniNav mobile rules support has been added. Lines(191-196). Also Weeks 8 to 12 mobile rules have been added. 
v1.44 - Updated ensureMerchOrderLimit() function to make a call to Spectrum API for order limits
v1.43.05 - PCH PRIZE TOTAL TO DATE, updated to 248 (12/05/13) - Line 292
v1.43 - Hotix 13.6.3b - Clicking on CONTINUE button before products page is completely loaded causes error
v1.42 - add the address bar hider for mobile
v1.41 - mobile rules
- Recursive add-on function(isDeviceInLightbox) added - Line 1363 
- PCH Prize Total updated - Line 195
*/

/*****************************************************************************************************/
//Spectrum Hooks
/*****************************************************************************************************/

$(document).ready(function(){
	if(window.SpectrumEvents) window.SpectrumEvents.OnInit();
});

/*****************************************************************************************************/
//HOTFIX AREA
/*****************************************************************************************************/

// Hotfix 13.6.3b - 9/18/2013 (Ash and Don M.)
// Clicking on CONTINUE button before products page is completely loaded causes error
$(document).ready(function () {
    // Hotfix is applicable only for product page, and only on mobile
    if (!window._multipageSettings || !window._multipageSettings.IsMobileApplicable) return;
    
    // Save the onclick attribute for continue button
    var continueButton = $("#mpNavNext a");
    var previousClickHandler = continueButton.attr("onclick");
    
    // If multipage has been loaded already, do nothing
    if (window.MpLoadCompleteNotificationCalled) return;

    // Attach to multipage load complete event
    if (!window.Notifications) return;
    Notifications.Subscribe("onafter-mpload", function () {
        // Enable continue button
        continueButton.unbind("click");
        if (previousClickHandler) continueButton.attr("onclick", previousClickHandler);
    });
    
    // If multipage has not been loaded yet, disable continue button
    if (!window.MpLoadCompleteNotificationCalled) {
        // Disable continue button
        continueButton.removeAttr("onclick");
        continueButton.click(function(e) {
            if (e && e.preventDefault) e.preventDefault();
        });
    }
});

/*****************************************************************************************************/
//validation regular expressions
/*****************************************************************************************************/

var strRegEx_Email = /^[A-Za-z0-9&\+\'_-]+(\.[A-Za-z0-9&\+\'_-]+)*@([A-Za-z0-9_-]+\.)+[A-Za-z]{2,6}$/i
var strRegEx_Password = /^[^\t\n\r]{4,65}$/i
var strRegEx_Title = /mr|mrs|ms/i
var strRegEx_FName = /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z\.]*)*$/i
var strRegEx_LName = /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z\.]*)*$/i
var strRegEx_Address1 = /^[a-zA-Z0-9 \.\-#\\\/]{5,50}$/i
var strRegEx_Address2 = /^[a-zA-Z0-9 \.\-#\\\/]{1,50}$/i
var strRegEx_City = /^[a-zA-Z0-9 \.\-]{2,50}$/i
var strRegEx_State = /AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|GU|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MH|MI|MN|MO|MP|MS|MT|NC|ND|NE|NH|NJ|NM|NV|NY|OH|OK|OR|PA|PR|PW|RI|SC|SD|TN|TX|UT|VA|VI|VT|WA|WI|WV|WY/i
var strRegEx_Zip = /[0-9]{5}(-[0-9]{4})?/i
var strRegEx_ShopperAcctSourceId = /^[0-9]+$/i
var strRegEx_OptinTypeId = /^[0-9]+$/i
var strRegEx_PhoneNumber = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$ /i
var strRegEx_IPAddress = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/i
var strRegEx_URL = /^(http|https|ftp|HTTP|HTTPS|FTP)\:\/\/([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.[a-zA-Z]{2,6})(\:[0-9]+)*(\/)?(\/[^\/][a-zA-Z0-9\.\,\?\'\\\/\+&%\$#\=~_\-]*)*$/i

/*****************************************************************************************************/
//Full spelling of STATES array
/*****************************************************************************************************/

var arrStates = new Array();
arrStates['AL'] = 'Alabama';
arrStates['AK'] = 'Alaska';
arrStates['AS'] = 'American Samoa';
arrStates['AZ'] = 'Arizona';
arrStates['AR'] = 'Arkansas';
arrStates['CA'] = 'California';
arrStates['CO'] = 'Colorado';
arrStates['CT'] = 'Connecticut';
arrStates['DE'] = 'Delaware';
arrStates['DC'] = 'District Of Columbia';
arrStates['FM'] = 'Federated States Of Micronesia';
arrStates['FL'] = 'Florida';
arrStates['GA'] = 'Georgia';
arrStates['GU'] = 'Guam';
arrStates['HI'] = 'Hawaii';
arrStates['ID'] = 'Idaho';
arrStates['IL'] = 'Illinois';
arrStates['IN'] = 'Indiana';
arrStates['IA'] = 'Iowa';
arrStates['KS'] = 'Kansas';
arrStates['KY'] = 'Kentucky';
arrStates['LA'] = 'Louisiana';
arrStates['ME'] = 'Maine';
arrStates['MH'] = 'Marshall Islands';
arrStates['MD'] = 'Maryland';
arrStates['MA'] = 'Massachusetts';
arrStates['MI'] = 'Michigan';
arrStates['MN'] = 'Minnesota';
arrStates['MS'] = 'Mississippi';
arrStates['MO'] = 'Missouri';
arrStates['MT'] = 'Montana';
arrStates['NE'] = 'Nebraska';
arrStates['NV'] = 'Nevada';
arrStates['NH'] = 'New Hampshire';
arrStates['NJ'] = 'New Jersey';
arrStates['NM'] = 'New Mexico';
arrStates['NY'] = 'New York';
arrStates['NC'] = 'North Carolina';
arrStates['ND'] = 'North Dakota';
arrStates['MP'] = 'Northern Mariana Islands';
arrStates['OH'] = 'Ohio';
arrStates['OK'] = 'Oklahoma';
arrStates['OR'] = 'Oregon';
arrStates['PW'] = 'Palau';
arrStates['PA'] = 'Pennsylvania';
arrStates['PR'] = 'Puerto Rico';
arrStates['RI'] = 'Rhode Island';
arrStates['SC'] = 'South Carolina';
arrStates['SD'] = 'South Dakota';
arrStates['TN'] = 'Tennessee';
arrStates['TX'] = 'Texas';
arrStates['UT'] = 'Utah';
arrStates['VT'] = 'Vermont';
arrStates['VI'] = 'Virgin Islands';
arrStates['VA'] = 'Virginia';
arrStates['WA'] = 'Washington';
arrStates['WV'] = 'West Virginia';
arrStates['WI'] = 'Wisconsin';
arrStates['WY'] = 'Wyoming';	

/*****************************************************************************************************/
// GLOBAL FUNCTIONS
/*****************************************************************************************************/

//dynamic rules
var timeout_SpectrumDTO;
var timeout_SpectrumDTO_count=0;

function fAutoRules(){
	//ex http://rules.pch.com/viewrulesfacts?mailid=2011199AUHDLP#facts

	if (typeof timeout_SpectrumDTO!="undefined") clearTimeout(timeout_SpectrumDTO);

	var strRulesUrl = new String(document.location.pathname);
	strRulesUrl = strRulesUrl.replace("/Path/","");
	strRulesUrl = strRulesUrl.substr(0,strRulesUrl.indexOf("/"));

	var bFoundSpecialRules = false;
	var dtoReady = false;
		
	for(var iR=0;iR<arrSpecialRules.length;iR++){
		if(arrSpecialRules[iR].toUpperCase() == strRulesUrl.toUpperCase()){
			bFoundSpecialRules=true;
			break;
		}
	}

	if(!bFoundSpecialRules){
		dtoReady = true; // dont need it here.
	}else{
		if (typeof spectrumDeviceType!="undefined") dtoReady = true;
	}
	
	if(dtoReady){
		if(bFoundSpecialRules){
			if(spectrumDeviceType == "MOBILE"){
				strRulesUrl ="m" + strRulesUrl;
			}else{
				strRulesUrl ="d" + strRulesUrl;
			}
		}
		
		strRulesUrl = "http://rules.pch.com/viewrulesfacts?mailid="+strRulesUrl;
		

		if(bFoundSpecialRules){
			$("#uniNav1_RulesLinkDtp, #uniNav1_RulesLink, #offRules").attr("href",strRulesUrl);
			$("#uniNav1_FactsLinkDtp, #uniNav1_FactsLink, #ssFacts").attr("href",strRulesUrl + "#facts");		
		}


		//always do this		
		$("#rules a:eq(1), .contestCopy a").attr("href",strRulesUrl);
		$("#rules a:eq(2)").attr("href",strRulesUrl + "#facts");				
		

	}else{
		timeout_SpectrumDTO_count++;
		if(timeout_SpectrumDTO_count < 250) timeout_SpectrumDTO = window.setTimeout(fAutoRules, 333);	
	}
}

var gAutoRulesLink=true; //on by default
$(document).ready(function(){
	if(gAutoRulesLink) fAutoRules();
});
//end: dynamic rules


function fUpdatePersonalization(){
//user info use the FORM as they can change it!
	if($("select.Title").val()=="0"){
			$(".replay_title").html('');
		}else{
			$(".replay_title").html($("select.Title").val());
		};
	$(".replay_fname").html($(".FName").val());
	$(".replay_lname").html($(".LName").val());
	$(".replay_address1").html($(".Address1").val());
	$(".replay_address2").html($(".Address2").val());	
	$(".replay_city").html($(".City").val());
	$(".replay_state").html($(".State").val());		
	$(".replay_zip").html($(".Zip").val());
	$(".replay_email").html($(".Email").val());	
	
	if($(".FName").val() && $(".LName").val()) $(".replay_inits").html($(".FName").val().toString().charAt(0)+$(".LName").val().toString().charAt(0));	
	
	if($(".FName").val()) $(".replay_init_fname").html($(".FName").val().toString().charAt(0));	
	if($(".LName").val()) $(".replay_init_lname").html($(".LName").val().toString().charAt(0));		
	if($(".State").val())$(".replay_stateLong").html(arrStates[$(".State").val()]);
	
//DMA stuff... USE COOKIE	
//decodePrismCookie(strUserInfoCookie,'');	
	if(typeof(strUserInfoCookie) == "undefined"){ strUserInfoCookie="missing"}
	
	//florist
	$(".replay_Florist,.replay_florist").html(fGetExtraPersonalization("lf","Unknown"))
	$(".replay_FloristAddress,.replay_floristAddress").html(fGetExtraPersonalization("lfa","Unknown"))
	
	//hotel
	$(".replay_Hotel,.replay_hotel").html(fGetExtraPersonalization("lh","Unknown"));	
	$(".replay_HotelAddress,.replay_hotelAddress").html(fGetExtraPersonalization("lha","Unknown"));

	//dma affilates (nbc,abc,cbs)
	$(".replay_dmaMedia1").html(fGetExtraPersonalization("dmam1","Unknown"));	
	$(".replay_dmaMedia2").html(fGetExtraPersonalization("dmam2","Unknown"));	
	$(".replay_dmaMedia3").html(fGetExtraPersonalization("dmam3","Unknown"));	
	
	//dma name ("tri-state")
	$(".replay_dmaName").html(fGetExtraPersonalization("dmamn","Unknown"));	
	
	//dma code (603)
	$(".replay_dmaCode").html(fGetExtraPersonalization("dmamc","Unknown"));

	//package specific... redefine function in packags-js
	fSpecialUpdatePersonalization();
	
	//CONTEST VARIABLES
	if(window.spectrumContest){
		var strClassFiner;
		for(var cCa=0; cCa<spectrumContest.length;cCa++){		
			for(var cCb=0; cCb<spectrumContest[cCa].length;cCb++){
				strClassFiner=cCa+1 //DEFAULT, MOST PAKCAGES
				if(spectrumContest[cCa].length > 1)	strClassFiner="_"+(cCa+1)+"_"+(cCb+1); //contest choice
				
				if(spectrumContest[cCa][cCb].deadline) contest_replayDateVariants("deadlineDate"+strClassFiner, spectrumContest[cCa][cCb].deadline);		
				if(spectrumContest[cCa][cCb].gwy) $(".replay_giveawayNumber"+strClassFiner).html(spectrumContest[cCa][cCb].gwy);
				if(spectrumContest[cCa][cCb].awardDate) contest_replayDateVariants("awardDate"+strClassFiner, spectrumContest[cCa][cCb].awardDate);
				if(spectrumContest[cCa][cCb].deployDate) contest_replayDateVariants("deployDate"+strClassFiner, spectrumContest[cCa][cCb].deployDate);
				if(spectrumContest[cCa][cCb].week) $(".replay_week"+strClassFiner).html(spectrumContest[cCa][cCb].week);				
			}
		}
	}	
	
	//PCH PRIZE TOTAL TO DATE, update as needed
	$(".replay_pchPrizeTotal").html("258");
}

function fSpecialUpdatePersonalization(){
	//this function is to be left blank and can be overWritten at package level JS after this declararion.
	return;
}

function fGetExtraPersonalization(inStrVar,inStrDefault){
	if(arguments.length<2) inStrDefault="Unknown";
	
	var strReturn="";	
	
	if(window.SpectrumCookieManager && window.SpectrumCookieManager.GetExtraQueryParams) {
		var queryParams = window.SpectrumCookieManager.GetExtraQueryParams();
		
		switch(inStrVar){
			case "lf":
				strReturn = queryParams.lf;
				break;			
			case "lfa":
				strReturn = queryParams.lfa;
				break;
			case "lfcity":
				strReturn = queryParams.lfcity;
				break;	
			case "lfst":
				strReturn = queryParams.lfst;
				break;								
			case "lfzip":
				strReturn = queryParams.lfzip;
				break;																			
			case "lh":
				strReturn = queryParams.lh;
				break;			
			case "lha":
				strReturn = queryParams.lha;			
				break;			
			case "dmam1":
				strReturn = queryParams.dmam1;
				break;			
			case "dmam2":
				strReturn = queryParams.dmam2;
				break;			
			case "dmam3":
				strReturn = queryParams.dmam3;
				break;			
			case "dmamn":
				strReturn = queryParams.dmamn;		
				break;			
			case "dmamc":
				strReturn = queryParams.dmamc;	
				break;
			case "fod":
				strReturn = queryParams.fod;
				break;				
		}
		
		if(strReturn=="") strReturn=inStrDefault;

		
	}else {
		//first check the querystring, then check the cookie
		
		if(getURLValue(inStrVar)){
			strReturn=getURLValue(inStrVar)
		}else{
			if(getNameVal(strUserInfoCookie,inStrVar, '~', '^')==""){
				strReturn=inStrDefault;
			}else{
				strReturn=getNameVal(strUserInfoCookie,inStrVar, '~', '^')
			}
		}
	}

	return strReturn;
}

function fEditOnChange(){
	$("#registrationWrap input, #registrationWrap select").bind("change",fUpdatePersonalization);
}

/*** registration foundation ****/
function bindLegacyForm(){
	$("#legacyRegistration input,#legacyRegistration select").click(function(){flbReg_Show();});
	$("#legacyRegistration input,#legacyRegistration select").change(function(){flbReg_Show();});	
}

/*** registration foundation ****/
function updateLegacyForm(){
	//inputs
	$("#legacyFName").val($(".FName").val());
	$("#legacyLName").val($(".LName").val());
	$("#legacyAddress1").val($(".Address1").val());
	$("#legacyAddress2").val($(".Address2").val());
	$("#legacyCity").val($(".City").val());
	$("#legacyZip").val($(".Zip").val());
	$("#legacyEmail").val($(".Email").val());
	
	//selects
	$("#legacyTitle").val($(".Title option:selected").text());
	$("#legacyState").val($(".State option:selected").text());
	return false;
}


//query string functions
function getURLValue(v){
	q = document.location.search.substring(1);
	if (q=="") return q;
	pairs = q.split("&");
	for (i=0; i<pairs.length; i++){
		if (pairs[i].split("=")[0].toLowerCase() == v.toLowerCase()) return unescape(pairs[i].split("=")[1]);
	}
	return "";
}

//popup with scroll
function openit2(sURL,w,h){
	newwindow=window.open(sURL,"nextwin","scrollbars=yes,toolbar=no,directories=no,menubar=no,resizable=yes,status=no,width="+w+",height="+h+"");
	newwindow.window.focus();
}

function fRulesPop(inThis){
	openit2(inThis.href,"600px","400px");
	return false
}
	
//validation
function newCheck(){
	//OLD FUCNTION depricating...
	alert("calling newcheck - pelase correct");
	return validateSubmit();
}

function validateSubmit(){
	if(!validateUserInfo()) return false;
	_globalSubmit = true;
	return true;
}

function validateUserInfo(){
//get values and trim....
//selects....
	var tmpTitle = $(".Title").val();
	var tmpState = $(".State").val();
//texts...
	var tmpFName = Trim($(".FName").val());
	var tmpLName = Trim($(".LName").val());
	var tmpAddress1 = Trim($(".Address1").val());
	var tmpAddress2 = Trim($(".Address2").val());
	var tmpCity = Trim($(".City").val());
	var tmpZip = Trim($(".Zip").val());
	var tmpEmail = Trim($(".Email").val());	

//set the form fields values to the trimmed val
	$(".FName").val(tmpFName);
	$(".LName").val(tmpLName);
	$(".Address1").val(tmpAddress1);
	$(".Address2").val(tmpAddress2);
	$(".City").val(tmpCity);
	$(".Zip").val(tmpZip);
	$(".Email").val(tmpEmail);	

	var strError="";
	var strBump="\n   "
	var firstFocus=false;
	
//validate the fields
	if(tmpTitle==0){
		strError +=strBump + "Please enter a valid Title"
		if(!firstFocus) firstFocus=$(".Title")
	}
	
	if(tmpFName=="" || !strRegEx_FName.test(tmpFName))
	{
		strError +=strBump + "Please enter a valid First Name"
		if(!firstFocus) firstFocus=$(".FName")
	}
	
	if(tmpLName=="" || (!strRegEx_LName.test(tmpLName)))
	{
		strError +=strBump + "Please enter a valid Last Name"
		if(!firstFocus) firstFocus=$(".LName")
	}
	
	if(tmpAddress1==""|| (!strRegEx_Address1.test(tmpAddress1)))
	{
		strError +=strBump + "Please enter a valid Address 1"
		if(!firstFocus) firstFocus=$(".Address1")
	}
	
	if(tmpAddress2 !="" && (!strRegEx_Address2.test(tmpAddress2)))
	{
		strError +=strBump + "Please enter a valid Address 2"
		if(!firstFocus) firstFocus=$(".Address2")
	}

	if(tmpCity==""|| (!strRegEx_City.test(tmpCity)))
	{
		strError +=strBump + "Please enter a valid City"
		if(!firstFocus) firstFocus=$(".City")
	}
	
	if(tmpState==0)
	{
		strError +=strBump + "Please enter a valid State"
		if(!firstFocus) firstFocus=$(".State")
	}
	
	if(tmpZip==""|| (!strRegEx_Zip.test(tmpZip)))
	{
		strError +=strBump + "Please enter a valid Zip"
		if(!firstFocus) firstFocus=$(".Zip")
	}
	
	if(tmpEmail=="" || (!strRegEx_Email.test(tmpEmail)))
	{
		strError +=strBump + "Please enter a valid Email"
		if(!firstFocus) firstFocus=$(".Email")
	}

	if(!firstFocus){
		return true;
	}else{
		alert("Please address the following User Information Issues:\n" + strError);
		if($("#regLightbox_overlay").length) flbReg_Show(firstFocus);
		else firstFocus.focus();
		return false;
	}
}
/*** string manipulation ********************************************/
// remove multiple, leading or trailing spaces
function Trim(s) {
	  s = s.replace(/(^\s*)|(\s*$)/gi,"");
	  s = s.replace(/[ ]{2,}/gi," ");
	  s = s.replace(/\n /,"\n");
	  return s;
}

/***** COOKIE *************/
// This function is used to retrieve a value from a name value pair
// stored in a cookie.  There are several assumptions being made
// each one is tested for and a false value is returned if the assumptions/requirements
// are not met.
//
//  1. The cookie name value pairs are delimited by a semicolon what we tell it. Degfault to ";"
//  2. Each name value pair is delimited by an equal sign "name=value"
//  3. IF No expiration date is supplied when creating the cookie, making the cookie SESSION-ONLY

function setNameVal(cookieName, keyName, keyValue, inStrDelimiter){
	
	if(arguments.length<4) inStrDelimiter=";" //default to ";" for backwards compatablity

    var cookieString;
    var cookieArray;
    var cookieOutStr = "";
    var cookieKeyFound = false;
    //var expdate = new Date(); //now
	//expdate.setFullYear(expdate.getFullYear() + 30);

    cookieString = GetCookie(cookieName);

    if (cookieString != null){
        cookieArray = cookieString.split(inStrDelimiter);

        for (var j = 0;  j < cookieArray.length; j++){
             var nameVal = cookieArray[j].split("=");
             if(nameVal.length > 0 && nameVal[0] == keyName){
                 cookieOutStr += keyName + "=" + keyValue + inStrDelimiter ;
                 cookieKeyFound = true;
             }else{
				if(cookieArray[j] != "") cookieOutStr += cookieArray[j] + inStrDelimiter;
             }
        }
     }

    if(!cookieKeyFound) cookieOutStr += keyName + "=" + keyValue + inStrDelimiter ;
    
   	//alert("setting cookie " + cookieName + "\nto " + cookieOutStr + "\nexpiring on " + expdate)
	//function SetCookie (name,value,expires,path,domain,secure)
	//SetCookie(cookieName,cookieOutStr,expdate,"/")
	
	SetCookie(cookieName,cookieOutStr)
}

function getNameVal(cookieName,valName, inStrDelimiter, valDelimiter, decode){
	
	if(arguments.length<3) inStrDelimiter=";" //default to ";" for backwards compatablity	
    if(arguments.length<4) valDelimiter="="; //default to "=" for backwards compatablity
	if(arguments.length<5) decode=false; //default to false for backwards compatablity

    var cookieString;
    var cookieArray;
    var nameValArray;
    var nameValStr;
    var nameValLength;
    var i;
    
    cookieString = GetCookie(cookieName, decode);
    if (cookieString == null) return false;

    cookieArray = getStringArr(cookieString,inStrDelimiter);
    
    if (cookieArray.length == 0) return false;

    nameValStr = setArrayStr(cookieArray,valDelimiter);
    nameValArray = getStringArr(nameValStr,valDelimiter);
    
    if (nameValArray == 0) return false;

    nameValLength = nameValArray.length;

    for (i = 0; i < nameValLength;)
    {
        //alert(nameValArray[i]);		
        if (nameValArray[i].toLowerCase() == valName.toLowerCase()) return unescape(nameValArray[i+1]);
        i=i+1; //increment every other array member to just get the key values
    }
 	
	//alert("no entry found in the " + cookieName + " for " + valName);
	return false
}


//Purpose of this function is to create a "symbol" delimited
//string out of an array of values
function setArrayStr(strArray,inStrDelimiter)
{
    if (strArray.length == 0) return false;	
	if(arguments.length<2) inStrDelimiter=";" //default to ";" for backwards compatablity	
	
	var sReturn = ""; 
	for (var i=0;i<strArray.length;i++){
		sReturn += strArray[i] + inStrDelimiter; 
	}
    return sReturn
}   
    
    
//getStringArr()
//Purpose of this function is to create a string array
//out of a "symbol" delimited string
function getStringArr(strCookieVals,inStrDelimiter){
	if(arguments.length<2) inStrDelimiter=";" //default to ";" for backwards compatablity	
/*	
	var sReturn = (inStrDelimiter.length > 0)? strCookieVals.split(inStrDelimiter) : false;
	if (!sReturn){
		alert("PCH ERROR: Delimiter not specified")
		return false;
	}
*/	

	return strCookieVals.split(inStrDelimiter);
}

function getCookieVal (offset,inStrDelimiter){
	if(arguments.length<2) inStrDelimiter=";" //default to ";" for backwards compatablity		
	var endstr = document.cookie.indexOf (inStrDelimiter, offset);
	if (endstr == -1) endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

//GetCookie()
//  Function to return the value of the cookie specified by "name".
//    name - String object containing the cookie name.
//    returns - String object containing the cookie value, or null if
//      the cookie does not exist.
//
function GetCookie (name, decode) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) 
		{
			var cookieVal = getCookieVal (j);
			
			return (decode) ? decode64(cookieVal).replace(/[\u0000-\u0001]+/g, "") : cookieVal;
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break; 
	}
	return null;
}


//SetCookie()
//  The first two parameters are required.  The others, if supplied, must
//  be passed in the order listed above.  To omit an unused optional field,
//  use null as a place holder.  For example, to call SetCookie using name,
//  value and path, you would code:
//
//      SetCookie ("myCookieName", "myCookieValue", null, "/");

function SetCookie (name,value,expires,path,domain,secure) {
    document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}

//DeleteCookie()
//  Function to delete a cookie. (Sets expiration date to start of epoch)
//    name -   String object containing the cookie name
//    path -   String object containing the path of the cookie to delete.  This MUST
//             be the same as the path used to create the cookie, or null/omitted if
//             no path was specified when creating the cookie.
//    domain - String object containing the domain of the cookie to delete.  This MUST
//             be the same as the domain used to create the cookie, or null/omitted if
//             no domain was specified when creating the cookie.
//
function DeleteCookie (name,path,domain) {
	if (GetCookie(name)) {
		document.cookie = name + "=" +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

/*****************************************************************************************************/
//SPECIALCHARS
/*****************************************************************************************************/
function fCartReplace(inReplaceText){
	//CONVERT ALL Predefined Character Entities to UNICODE 
	for(var iC=0;iC<arrCharEnt.length;iC++) inReplaceText = inReplaceText.replace(arrCharEnt[iC][0],arrCharEnt[iC][1]);

	//replace all UNICODE **character references**
	inReplaceText = inReplaceText.charRefToUnicode();	

	var re= /<\S[^>]*>/g; 
	inReplaceText = inReplaceText.replace(re,""); 

	return inReplaceText;
}

String.prototype.charRefToUnicode = function()
{
	return this.replace(/&#(([0-9]{1,7})|(x[0-9a-f]{1,6}));?/gi,
		function(match, p1, p2, p3, offset, s){
			return String.fromCharCode(p2 || ("0" + p3));
		}
	);
}

//HTML Predefined Character Entities & their UNICODE alternate
var arrCharEnt=[];
arrCharEnt.push([/&quot;/g,"&#x0022;"]);
arrCharEnt.push([/&amp;/g,"&#x0026;"]);
arrCharEnt.push([/&apos;/g,"&#x0027;"]);
arrCharEnt.push([/&lt;/g,"&#x003C;"]);
arrCharEnt.push([/&gt;/g,"&#x003E;"]);
arrCharEnt.push([/&nbsp;/g,"&#x00A0;"]);
arrCharEnt.push([/&iexcl;/g,"&#x00A1;"]);
arrCharEnt.push([/&cent;/g,"&#x00A2;"]);
arrCharEnt.push([/&pound;/g,"&#x00A3;"]);
arrCharEnt.push([/&curren;/g,"&#x00A4;"]);
arrCharEnt.push([/&yen;/g,"&#x00A5;"]);
arrCharEnt.push([/&brvbar;/g,"&#x00A6;"]);
arrCharEnt.push([/&sect;/g,"&#x00A7;"]);
arrCharEnt.push([/&uml;/g,"&#x00A8;"]);
arrCharEnt.push([/&copy;/g,"&#x00A9;"]);
arrCharEnt.push([/&ordf;/g,"&#x00AA;"]);
arrCharEnt.push([/&laquo;/g,"&#x00AB;"]);
arrCharEnt.push([/&not;/g,"&#x00AC;"]);
arrCharEnt.push([/&shy;/g,"&#x00AD;"]);
arrCharEnt.push([/&reg;/g,"&#x00AE;"]);
arrCharEnt.push([/&macr;/g,"&#x00AF;"]);
arrCharEnt.push([/&deg;/g,"&#x00B0;"]);
arrCharEnt.push([/&plusmn;/g,"&#x00B1;"]);
arrCharEnt.push([/&sup2;/g,"&#x00B2;"]);
arrCharEnt.push([/&sup3;/g,"&#x00B3;"]);
arrCharEnt.push([/&acute;/g,"&#x00B4;"]);
arrCharEnt.push([/&micro;/g,"&#x00B5;"]);
arrCharEnt.push([/&para;/g,"&#x00B6;"]);
arrCharEnt.push([/&middot;/g,"&#x00B7;"]);
arrCharEnt.push([/&cedil;/g,"&#x00B8;"]);
arrCharEnt.push([/&>sup1;/g,"&#x00B9;"]);
arrCharEnt.push([/&ordm;/g,"&#x00BA;"]);
arrCharEnt.push([/&raquo;/g,"&#x00BB;"]);
arrCharEnt.push([/&frac14;/g,"&#x00BC;"]);
arrCharEnt.push([/&frac12;/g,"&#x00BD;"]);
arrCharEnt.push([/&frac34;/g,"&#x00BE;"]);
arrCharEnt.push([/&iquest;/g,"&#x00BF;"]);
arrCharEnt.push([/&Agrave;/g,"&#x00C0;"]);
arrCharEnt.push([/&Aacute;/g,"&#x00C1;"]);
arrCharEnt.push([/&Acirc;/g,"&#x00C2;"]);
arrCharEnt.push([/&Atilde;/g,"&#x00C3;"]);
arrCharEnt.push([/&Auml;/g,"&#x00C4;"]);
arrCharEnt.push([/&Aring;/g,"&#x00C5;"]);
arrCharEnt.push([/&AElig;/g,"&#x00C6;"]);
arrCharEnt.push([/&Ccedil;/g,"&#x00C7;"]);
arrCharEnt.push([/&Egrave;/g,"&#x00C8;"]);
arrCharEnt.push([/&Eacute;/g,"&#x00C9;"]);
arrCharEnt.push([/&Ecirc;/g,"&#x00CA;"]);
arrCharEnt.push([/&Euml;/g,"&#x00CB;"]);
arrCharEnt.push([/&Igrave;/g,"&#x00CC;"]);
arrCharEnt.push([/&Iacute;/g,"&#x00CD;"]);
arrCharEnt.push([/&Icirc;/g,"&#x00CE;"]);
arrCharEnt.push([/&Iuml;/g,"&#x00CF;"]);
arrCharEnt.push([/&ETH;/g,"&#x00D0;"]);
arrCharEnt.push([/&Ntilde;/g,"&#x00D1;"]);
arrCharEnt.push([/&Ograve;/g,"&#x00D2;"]);
arrCharEnt.push([/&Oacute;/g,"&#x00D3;"]);
arrCharEnt.push([/&Ocirc;/g,"&#x00D4;"]);
arrCharEnt.push([/&Otilde;/g,"&#x00D5;"]);
arrCharEnt.push([/&Ouml;/g,"&#x00D6;"]);
arrCharEnt.push([/&times;/g,"&#x00D7;"]);
arrCharEnt.push([/&Oslash;/g,"&#x00D8;"]);
arrCharEnt.push([/&Ugrave;/g,"&#x00D9;"]);
arrCharEnt.push([/&Uacute;/g,"&#x00DA;"]);
arrCharEnt.push([/&Ucirc;/g,"&#x00DB;"]);
arrCharEnt.push([/&Uuml;/g,"&#x00DC;"]);
arrCharEnt.push([/&Yacute;/g,"&#x00DD;"]);
arrCharEnt.push([/&THORN;/g,"&#x00DE;"]);
arrCharEnt.push([/&szlig;/g,"&#x00DF;"]);
arrCharEnt.push([/&agrave;/g,"&#x00E0;"]);
arrCharEnt.push([/&aacute;/g,"&#x00E1;"]);
arrCharEnt.push([/&acirc;/g,"&#x00E2;"]);
arrCharEnt.push([/&atilde;/g,"&#x00E3;"]);
arrCharEnt.push([/&auml;/g,"&#x00E4;"]);
arrCharEnt.push([/&aring;/g,"&#x00E5;"]);
arrCharEnt.push([/&aelig;/g,"&#x00E6;"]);
arrCharEnt.push([/&ccedil;/g,"&#x00E7;"]);
arrCharEnt.push([/&egrave;/g,"&#x00E8;"]);
arrCharEnt.push([/&eacute;/g,"&#x00E9;"]);
arrCharEnt.push([/&ecirc;/g,"&#x00EA;"]);
arrCharEnt.push([/&euml;/g,"&#x00EB;"]);
arrCharEnt.push([/&igrave;/g,"&#x00EC;"]);
arrCharEnt.push([/&iacute;/g,"&#x00ED;"]);
arrCharEnt.push([/&icirc;/g,"&#x00EE;"]);
arrCharEnt.push([/&iuml;/g,"&#x00EF;"]);
arrCharEnt.push([/&eth;/g,"&#x00F0;"]);
arrCharEnt.push([/&ntilde;/g,"&#x00F1;"]);
arrCharEnt.push([/&ograve;/g,"&#x00F2;"]);
arrCharEnt.push([/&oacute;/g,"&#x00F3;"]);
arrCharEnt.push([/&ocirc;/g,"&#x00F4;"]);
arrCharEnt.push([/&otilde;/g,"&#x00F5;"]);
arrCharEnt.push([/&ouml;/g,"&#x00F6;"]);
arrCharEnt.push([/&divide;/g,"&#x00F7;"]);
arrCharEnt.push([/&oslash;/g,"&#x00F8;"]);
arrCharEnt.push([/&ugrave;/g,"&#x00F9;"]);
arrCharEnt.push([/&uacute;/g,"&#x00FA;"]);
arrCharEnt.push([/&ucirc;/g,"&#x00FB;"]);
arrCharEnt.push([/&uuml;/g,"&#x00FC;"]);
arrCharEnt.push([/&yacute;/g,"&#x00FD;"]);
arrCharEnt.push([/&thorn;/g,"&#x00FE;"]);
arrCharEnt.push([/&yuml;/g,"&#x00FF;"]);
arrCharEnt.push([/&OElig;/g,"&#x0152;"]);
arrCharEnt.push([/&oelig;/g,"&#x0153;"]);
arrCharEnt.push([/&Scaron;/g,"&#x0160;"]);
arrCharEnt.push([/&scaron;/g,"&#x0161;"]);
arrCharEnt.push([/&Yuml;/g,"&#x0178;"]);
arrCharEnt.push([/&fnof;/g,"&#x0192;"]);
arrCharEnt.push([/&circ;/g,"&#x02C6;"]);
arrCharEnt.push([/&tilde;/g,"&#x02DC;"]);
arrCharEnt.push([/&Alpha;/g,"&#x0391;"]);
arrCharEnt.push([/&Beta;/g,"&#x0392;"]);
arrCharEnt.push([/&Gamma;/g,"&#x0393;"]);
arrCharEnt.push([/&Delta;/g,"&#x0394;"]);
arrCharEnt.push([/&Epsilon;/g,"&#x0395;"]);
arrCharEnt.push([/&Zeta;/g,"&#x0396;"]);
arrCharEnt.push([/&Eta;/g,"&#x0397;"]);
arrCharEnt.push([/&Theta;/g,"&#x0398;"]);
arrCharEnt.push([/&Iota;/g,"&#x0399;"]);
arrCharEnt.push([/&Kappa;/g,"&#x039A;"]);
arrCharEnt.push([/&Lambda;/g,"&#x039B;"]);
arrCharEnt.push([/&Mu;/g,"&#x039C;"]);
arrCharEnt.push([/&Nu;/g,"&#x039D;"]);
arrCharEnt.push([/&Xi;/g,"&#x039E;"]);
arrCharEnt.push([/&Omicron;/g,"&#x039F;"]);
arrCharEnt.push([/&Pi;/g,"&#x03A0;"]);
arrCharEnt.push([/&Rho;/g,"&#x03A1;"]);
arrCharEnt.push([/&Sigma;/g,"&#x03A3;"]);
arrCharEnt.push([/&Tau;/g,"&#x03A4;"]);
arrCharEnt.push([/&Upsilon;/g,"&#x03A5;"]);
arrCharEnt.push([/&Phi;/g,"&#x03A6;"]);
arrCharEnt.push([/&Chi;/g,"&#x03A7;"]);
arrCharEnt.push([/&Psi;/g,"&#x03A8;"]);
arrCharEnt.push([/&Omega;/g,"&#x03A9;"]);
arrCharEnt.push([/&alpha;/g,"&#x03B1;"]);
arrCharEnt.push([/&beta;/g,"&#x03B2;"]);
arrCharEnt.push([/&gamma;/g,"&#x03B3;"]);
arrCharEnt.push([/&delta;/g,"&#x03B4;"]);
arrCharEnt.push([/&epsilon;/g,"&#x03B5;"]);
arrCharEnt.push([/&zeta;/g,"&#x03B6;"]);
arrCharEnt.push([/&eta;/g,"&#x03B7;"]);
arrCharEnt.push([/&theta;/g,"&#x03B8;"]);
arrCharEnt.push([/&iota;/g,"&#x03B9;"]);
arrCharEnt.push([/&kappa;/g,"&#x03BA;"]);
arrCharEnt.push([/&lambda;/g,"&#x03BB;"]);
arrCharEnt.push([/&mu;/g,"&#x03BC;"]);
arrCharEnt.push([/&nu;/g,"&#x03BD;"]);
arrCharEnt.push([/&xi;/g,"&#x03BE;"]);
arrCharEnt.push([/&omicron;/g,"&#x03BF;"]);
arrCharEnt.push([/&pi;/g,"&#x03C0;"]);
arrCharEnt.push([/&rho;/g,"&#x03C1;"]);
arrCharEnt.push([/&sigmaf;/g,"&#x03C2;"]);
arrCharEnt.push([/&sigma;/g,"&#x03C3;"]);
arrCharEnt.push([/&tau;/g,"&#x03C4;"]);
arrCharEnt.push([/&upsilon;/g,"&#x03C5;"]);
arrCharEnt.push([/&phi;/g,"&#x03C6;"]);
arrCharEnt.push([/&chi;/g,"&#x03C7;"]);
arrCharEnt.push([/&psi;/g,"&#x03C8;"]);
arrCharEnt.push([/&omega;/g,"&#x03C9;"]);
arrCharEnt.push([/&thetasym;/g,"&#x03D1;"]);
arrCharEnt.push([/&upsih;/g,"&#x03D2;"]);
arrCharEnt.push([/&piv;/g,"&#x03D6;"]);
arrCharEnt.push([/&ensp;/g,"&#x2002;"]);
arrCharEnt.push([/&emsp;/g,"&#x2003;"]);
arrCharEnt.push([/&thinsp;/g,"&#x2009;"]);
arrCharEnt.push([/&zwnj;/g,"&#x200C;"]);
arrCharEnt.push([/&zwj;/g,"&#x200D;"]);
arrCharEnt.push([/&lrm;/g,"&#x200E;"]);
arrCharEnt.push([/&rlm;/g,"&#x200F;"]);
arrCharEnt.push([/&ndash;/g,"&#x2013;"]);
arrCharEnt.push([/&mdash;/g,"&#x2014;"]);
arrCharEnt.push([/&lsquo;/g,"&#x2018;"]);
arrCharEnt.push([/&rsquo;/g,"&#x2019;"]);
arrCharEnt.push([/&sbquo;/g,"&#x201A;"]);
arrCharEnt.push([/&ldquo;/g,"&#x201C;"]);
arrCharEnt.push([/&rdquo;/g,"&#x201D;"]);
arrCharEnt.push([/&bdquo;/g,"&#x201E;"]);
arrCharEnt.push([/&dagger;/g,"&#x2020;"]);
arrCharEnt.push([/&Dagger;/g,"&#x2021;"]);
arrCharEnt.push([/&bull;/g,"&#x2022;"]);
arrCharEnt.push([/&hellip;/g,"&#x2026;"]);
arrCharEnt.push([/&permil;/g,"&#x2030;"]);
arrCharEnt.push([/&prime;/g,"&#x2032;"]);
arrCharEnt.push([/&Prime;/g,"&#x2033;"]);
arrCharEnt.push([/&lsaquo;/g,"&#x2039;"]);
arrCharEnt.push([/&rsaquo;/g,"&#x203A;"]);
arrCharEnt.push([/&oline;/g,"&#x203E;"]);
arrCharEnt.push([/&frasl;/g,"&#x2044;"]);
arrCharEnt.push([/&euro;/g,"&#x20AC;"]);
arrCharEnt.push([/&image;/g,"&#x2111;"]);
arrCharEnt.push([/&weierp;/g,"&#x2118;"]);
arrCharEnt.push([/&real;/g,"&#x211C;"]);
arrCharEnt.push([/&trade;/g,"&#x2122;"]);
arrCharEnt.push([/&alefsym;/g,"&#x2135;"]);
arrCharEnt.push([/&larr;/g,"&#x2190;"]);
arrCharEnt.push([/&uarr;/g,"&#x2191;"]);
arrCharEnt.push([/&rarr;/g,"&#x2192;"]);
arrCharEnt.push([/&darr;/g,"&#x2193;"]);
arrCharEnt.push([/&harr;/g,"&#x2194;"]);
arrCharEnt.push([/&crarr;/g,"&#x21B5;"]);
arrCharEnt.push([/&lArr;/g,"&#x21D0;"]);
arrCharEnt.push([/&uArr;/g,"&#x21D1;"]);
arrCharEnt.push([/&rArr;/g,"&#x21D2;"]);
arrCharEnt.push([/&dArr;/g,"&#x21D3;"]);
arrCharEnt.push([/&hArr;/g,"&#x21D4;"]);
arrCharEnt.push([/&forall;/g,"&#x2200;"]);
arrCharEnt.push([/&part;/g,"&#x2202;"]);
arrCharEnt.push([/&exist;/g,"&#x2203;"]);
arrCharEnt.push([/&empty;/g,"&#x2205;"]);
arrCharEnt.push([/&nabla;/g,"&#x2207;"]);
arrCharEnt.push([/&isin;/g,"&#x2208;"]);
arrCharEnt.push([/&notin;/g,"&#x2209;"]);
arrCharEnt.push([/&ni;/g,"&#x220B;"]);
arrCharEnt.push([/&prod;/g,"&#x220F;"]);
arrCharEnt.push([/&sum;/g,"&#x2211;"]);
arrCharEnt.push([/&minus;/g,"&#x2212;"]);
arrCharEnt.push([/&lowast;/g,"&#x2217;"]);
arrCharEnt.push([/&radic;/g,"&#x221A;"]);
arrCharEnt.push([/&prop;/g,"&#x221D;"]);
arrCharEnt.push([/&infin;/g,"&#x221E;"]);
arrCharEnt.push([/&ang;/g,"&#x2220;"]);
arrCharEnt.push([/&and;/g,"&#x2227;"]);
arrCharEnt.push([/&or;/g,"&#x2228;"]);
arrCharEnt.push([/&cap;/g,"&#x2229;"]);
arrCharEnt.push([/&cup;/g,"&#x222A;"]);
arrCharEnt.push([/&int;/g,"&#x222B;"]);
arrCharEnt.push([/&there4;/g,"&#x2234;"]);
arrCharEnt.push([/&sim;/g,"&#x223C;"]);
arrCharEnt.push([/&cong;/g,"&#x2245;"]);
arrCharEnt.push([/&asymp;/g,"&#x2248;"]);
arrCharEnt.push([/&ne;/g,"&#x2260;"]);
arrCharEnt.push([/&equiv;/g,"&#x2261;"]);
arrCharEnt.push([/&le;/g,"&#x2264;"]);
arrCharEnt.push([/&ge;/g,"&#x2265;"]);
arrCharEnt.push([/&sub;/g,"&#x2282;"]);
arrCharEnt.push([/&sup;/g,"&#x2283;"]);
arrCharEnt.push([/&nsub;/g,"&#x2284;"]);
arrCharEnt.push([/&sube;/g,"&#x2286;"]);
arrCharEnt.push([/&supe;/g,"&#x2287;"]);
arrCharEnt.push([/&oplus;/g,"&#x2295;"]);
arrCharEnt.push([/&otimes;/g,"&#x2297;"]);
arrCharEnt.push([/&perp;/g,"&#x22A5;"]);
arrCharEnt.push([/&sdot;/g,"&#x22C5;"]);
arrCharEnt.push([/&lceil;/g,"&#x2308;"]);
arrCharEnt.push([/&rceil;/g,"&#x2309;"]);
arrCharEnt.push([/&lfloor;/g,"&#x230A;"]);
arrCharEnt.push([/&rfloor;/g,"&#x230B;"]);
arrCharEnt.push([/&lang;/g,"&#x2329;"]);
arrCharEnt.push([/&rang;/g,"&#x232A;"]);
arrCharEnt.push([/&loz;/g,"&#x25CA;"]);
arrCharEnt.push([/&spades;/g,"&#x2660;"]);
arrCharEnt.push([/&clubs;/g,"&#x2663;"]);
arrCharEnt.push([/&hearts;/g,"&#x2665;"]);
arrCharEnt.push([/&diams;/g,"&#x2666;"]);

/*****************************************************************************************************/
//PRISM COOKIE DECODER
/*****************************************************************************************************/
 /*
    This set of functions are used to parse out a value from a base64 decoded cookie.
    decodeReadCookie - decodes and gets the cookie from base64.js and cookielib.js
    getNameValPrism/setArrayStrPrism/getArrayStr1 - parses out the value of our attribute called from the document.ready
    */
	
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function decodePrismCookie( mCookie, mAttribute) {
	if (document.cookie.length > 0){
		isCookie = document.cookie.indexOf( mCookie+"=");
		if (isCookie != -1){
			var cookieValues = GetCookie(mCookie, true);
			var returnVal = getNameValPrism(cookieValues, mAttribute);
			if(typeof returnVal == "undefined" || returnVal == null || returnVal.length <= 0){
				returnVal = getURLValue(mAttribute);
			};
			return returnVal;
		}
	}
}   
        
function getNameValPrism(cookieName,valName) {
	var cookieString;
	var cookieArray;
	var nameValArray;
	var nameValStr;
	var nameValLength;
	var i;
	  
	cookieString = cookieName;
	cookieString = cookieString.replace(/[\u0000-\u0001]+/g, "");
	if (cookieString == null)
	{
		//alert("Debugg -- Cookie " + cookieName + " does not exist");
		return false;
	}
	
	cookieArray = getStringArrPrism(cookieString,";");
	
	if (cookieArray.length == 0) 
	{
	   // alert("Debugg -- Cookie does not contain values");
		return false;
	}
		
	nameValStr = setArrayStrPrism(cookieArray,"=");
	nameValArray = getStringArrPrism(nameValStr,"=");
	
	if (nameValArray == 0)
	{
		//alert("Debugg -- nameValArray == 0");
		return false;
	}
   
	nameValLength = nameValArray.length;
	
	for (i = 0; i < nameValLength;)
	{
		//alert(nameValArray[i].toLowerCase());
		if (nameValArray[i].toLowerCase() == valName.toLowerCase())
		{
			//alert(nameValArray[i+1]);
			//return stringReplace(nameValArray[i+1], "+", " ");
			var value = nameValArray[i+1];
			return unescape(nameValArray[i+1]);
			
		
		}
	  // alert(nameValArray[i].toLowerCase());
		i=i+1; //increment every other array member to just get the key values
	}
	//alert("no entry found in the " + cookieName + " for " + valName);
	
}


//Purpose of this function is to create a "symbol" delimited
//string out of an array of values
function setArrayStrPrism(strArray,sDelimiter)
{
	var sReturn = ""; 
	if (strArray.length == 0) return false;
	for (var i=0;i<strArray.length;i++) sReturn = sReturn + strArray[i] + sDelimiter; 
	return sReturn
}   
	

//Purpose of this function is to create a string array
//out of a "symbol" delimited string
function getStringArrPrism(strCookieVals,sDelimiter)
{
	var sReturn
	sReturn = (sDelimiter.length > 0)? strCookieVals.split(sDelimiter) : false;
	if (! sReturn)
	{
		alert("Delimiter not specified")
		return false
	}
	else
	{   
		return sReturn
	}
}		

function encode64(input) {
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;

  do {
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
		keyStr.charAt(enc1) +
		keyStr.charAt(enc2) +
		keyStr.charAt(enc3) +
		keyStr.charAt(enc4);
	 chr1 = chr2 = chr3 = "";
	 enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);

  return output;
}

function decode64(input) {
	
	if(typeof noBase64Decode != "undefined" && noBase64Decode == true){
		return input
	}
	
	  var output = "";
	  var chr1, chr2, chr3 = "";
	  var enc1, enc2, enc3, enc4 = "";
	  var i = 0;
	
	  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	  var base64test = /[^A-Za-z0-9\+\/\=]/g;
	  if (base64test.exec(input)) {
		 if(console){
			 console.log("There were invalid base64 characters in the input text.\n" +
			   "Valid base64 characters are A-Z, a-z, 0-9, ?+?, ?/?, and ?=?\n" +
			   "Expect errors in decoding.");
		 }
	  }
	  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	
	  do {
		 enc1 = keyStr.indexOf(input.charAt(i++));
		 enc2 = keyStr.indexOf(input.charAt(i++));
		 enc3 = keyStr.indexOf(input.charAt(i++));
		 enc4 = keyStr.indexOf(input.charAt(i++));
	
		 chr1 = (enc1 << 2) | (enc2 >> 4);
		 chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		 chr3 = ((enc3 & 3) << 6) | enc4;
	
		 output = output + String.fromCharCode(chr1);
	
		 if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		 }
		 if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		 }
	
		 chr1 = chr2 = chr3 = "";
		 enc1 = enc2 = enc3 = enc4 = "";
	
	  } while (i < input.length);
	
	  return output;
}

function ensureMerchOrderLimit() {
    if (window.SpectrumPackageFacade && window.SpectrumPackageFacade.GetOrderLimits) {
        var orderLimits = window.SpectrumPackageFacade.GetOrderLimits();
        return orderLimits.TotalOrderLimit;
    }

	if (GetCookie(strUserInfoCookie)){
		return getNameVal(strUserInfoCookie, "mol", "^", "~", true); // User Info Cookie Merch Order Limit 
	}
	else{
		return "0";
	}
}


//DISABLE CODE FOR FORM SUBMIT
$("form").submit(function() {
	$('#submitButton').attr("disabled", true);
});
//END DISABLE CODE

//CONTEST VARIABLE SUPPORT
function contest_replayDateVariants(inStrName,inStrDate){
	var locDate = new Date(inStrDate);
	//contestVarMonthStringLong = November (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarMonthStringLong").html(contest_getMonthString(locDate.getMonth()));
	
	//contestVarMonthStringShort = Nov (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarMonthStringShort").html(contest_getMonthString(locDate.getMonth()).toString().substr(0,3));
	
	//contestVarMonthNumeric = 11 (for 11/2/2011 for Nov, NOT ordinal)
	$(".replay_"+inStrName+".contestVarMonthNumeric").html(locDate.getMonth()+1);
	
	//contestVarMonthOrdinal = 11th (for 11/2/2011 for Nov, NOT ordinal)
	$(".replay_"+inStrName+".contestVarMonthOrdinal").html(contest_getGetOrdinal(locDate.getMonth()+1));
	
	//contestVarDateStringLong = Monday (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarDateStringLong").html(contest_getDayString(locDate.getDay()));
	
	//contestVarDateStringShort = Mon (for 11/2/2011, Monday)
	$(".replay_"+inStrName+".contestVarDateStringShort").html(contest_getDayString(locDate.getDay()).toString().substr(0,3));
	
	//contestVarDateNumeric = 2 (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarDateNumeric").html(locDate.getDate());
	
	//contestVarDateOrdinal = 2nd (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarDateOrdinal").html(contest_getGetOrdinal(locDate.getDate()));
	
	//contestVarYearNumeric = 2011 (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarYearNumeric").html(locDate.getFullYear());
	
	//contestVarYearString = Two Thousand Eleven (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarYearString").html(contest_getNumberToWords(locDate.getFullYear()));
	
	//contestVarFullStandard = 11/2/2011  (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarFullStandard").html((locDate.getMonth()+1) + "/" + locDate.getDate() + "/" + locDate.getFullYear());
	
	//contestVarFullSansSlash = 11022011 (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarFullSansSlash").html(contest_getPaddedNumber((locDate.getMonth()+1)) + "" + locDate.getDate() + "" + locDate.getFullYear());
	
	//contestVarFullDash = 11-2-2011 (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarFullDash").html((locDate.getMonth()+1)  + "-" + locDate.getDate() + "-" + locDate.getFullYear());
	
	//contestVarFullString = November 11, 2011 (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarFullString").html(contest_getMonthString(locDate.getMonth()) + " " + locDate.getDate() + ", " + locDate.getFullYear());
	
	//contestVarFullStringShortMonth = Nov 11, 2011 (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarFullStringShortMonth").html(contest_getMonthString(locDate.getMonth()).toString().substr(0,3) + " " + locDate.getDate() + ", " + locDate.getFullYear());
	
	//contestVarShortStandard = 11/2 (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarShortStandard").html((locDate.getMonth()+1) + "/" + locDate.getDate());
	
	//contestVarShortString  = November 11 (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarShortString").html(contest_getMonthString(locDate.getMonth()) + " " + locDate.getDate());
	
	//contestVarShortStringOrdinal  = November 11th (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarShortStringOrdinal").html(contest_getMonthString(locDate.getMonth()) + " " + contest_getGetOrdinal(locDate.getDate()));
	
	//contestVarFullDashShortYear = 11-2-11  (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarFullDashShortYear ").html((locDate.getMonth()+1) + "-" + locDate.getDate() + "-" + (locDate.getFullYear()).toString().substr(2,2));

	//contestVarFullStandardShortYear = 11/2/11  (for 11/2/2011)
	$(".replay_"+inStrName+".contestVarFullStandardShortYear ").html((locDate.getMonth()+1) + "/" + locDate.getDate() + "/" + (locDate.getFullYear()).toString().substr(2,2));

	//contestVarShortYearNumeric = 11  (for 11/2/2011, year)
	$(".replay_"+inStrName+".contestVarShortYearNumeric ").html(locDate.getFullYear().toString().substr(2,2));
}


function contest_getPaddedNumber(inNum){
	if(inNum<10) inNum="0"+inNum;
	return inNum
}

function contest_getMonthString(inMonth){
	//contestVarMonthStringLong
	var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	return monthNames[inMonth];
}

function contest_getGetOrdinal(n) {
   var s=["th","st","nd","rd"], v=n%100;
   return n+(s[(v-20)%10]||s[v]||s[0]);
}

function contest_getDayString(inDay){
	var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	return dayNames[inDay];
}

function contest_getNumberToWords(s){
	var th = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
	var dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
	var tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
	var tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
	
    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'hundred ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    if (x != s.length) {
        var y = s.length;
        str += 'point ';
        for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
    }

    return str.replace(/\s+/g, ' ');
}
//END: CONTEST VARIABLE SUPPORT

/*** SLP HOTFIX *****/ 
$(document).ready(function() { 
	if (window.Notifications) {     	
		// Fix for SLP removal from cart and hiddens to correct order capture 
        Notifications.Subscribe("on-cart-item-removed", function(sender, cartItem) { hotfix_RemoveSlpOrder( cartItem.Id ); }); 
        Notifications.Subscribe("on-eoform-cart-item-removed", function(sender, offerCode) { hotfix_RemoveSlpOrder( offerCode ); }); 
    } 
}); 

function hotfix_RemoveSlpOrder(offerCode){
	var selector = 'input[name=OrderItem_' + offerCode + ']'; 
    if ($(selector).length) { 
		$(selector).remove(); 
    } 
}

//START: Recursive Add-On Function (When the user goes to the EO and clicks the add-on stamp to go back to the device)
var addOnLbCounter = 0, timeOutCtr;
                
function isDeviceInLightbox(lbSelector){
	//if (typeof timeOutCtr != "undefined") clearTimeout(timeOutCtr);          
	if(addOnLbCounter <= 40){
			if ($(".spectrumLightbox_content2 "+lbSelector).length){
				$(".spectrumLightbox_content2 #pkg_closeButton, .spectrumLightbox_content2 .pkg_closeButton").css({"display": "block"});               
			}
			else{
				addOnLbCounter++;
				timeOutCtr = setTimeout(function(){isDeviceInLightbox(lbSelector)}, 500);
				return false;
			}                                              
	}
}
//END: Recursive Add-On Function

// hide the address bar
( function( sec ) {
	var g = window;
	
	function hide() {
		g.scrollTo( 0, 1 );
		g.clearTimeout( timer );
	}
	
	var delay = ( sec !== undefined ) ? sec : 100,
		timer = g.setTimeout( hide, delay );
		
} )();