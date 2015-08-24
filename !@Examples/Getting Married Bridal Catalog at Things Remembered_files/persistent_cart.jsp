

var hPriceWord = '300';
var hPriceMax = '9999999';
var hPriceMin = '600';
var hExcludeLength = '0';
var hExcludeChars = '$,#,&';


var sPriceWord = '300';
var sPriceMax = '9999999';
var sPriceMin = '600';
var sExcludeLength = '0';
var sExcludeChars = '';

var monogramInitial = '607665,562593,607652,562580,634340,634353,640062,337036,337050'.split(",");
var minPersonalizationChargeCost = getFreeGiftBoxChargeCost();

// the var: uiIsClearForImageUpdate is used to prevent widget/img js issues
// when the onblur event of messageText is fired by the clicking to move to a different zone.
// this causes a call to update the image when the html of the image area does not exist
// function goToZone in persistent_cart.jsp sets this to false
// function updateImage in personalization_message.jsp checks this before updating an image
window.uiIsClearForImageUpdate = true;

var monthNames=new Array(12);
monthNames["January"] = "0";
monthNames["February"] = "1";
monthNames["March"] = "2";
monthNames["April"] = "3";
monthNames["May"] = "4";
monthNames["June"] = "5";
monthNames["July"] = "6";
monthNames["August"] = "7";
monthNames["September"] = "8";
monthNames["October"] = "9";
monthNames["November"] = "10";
monthNames["December"] = "11";


var persistentCartCommands = new Array(9);
var csrfTokens = new Array(9);
csrfTokens[0] = ''; // JSP
csrfTokens[1] = '';
csrfTokens[2] = 'hxt1t5tk+k3WhErkGus7yGJUV/8QgiCecds/M8KvCtk=ECjVDqdYAOg=';
csrfTokens[3] = 'G5pqqGjZulrrZ4jUlMBtKWYgc8KU3LkQf1wPkm2RVJE=HRsKztwDy7g=';
csrfTokens[4] = 'IupG09QuNZgkuC7ymyVXvBOB9fGYEitxOT7wlOUhuZM=SthOCKf7HEw=';
csrfTokens[5] = '0qA3K1ukSJdES4UviC8i5xZdek5QXmtAjeS9NSvkfoU=aQIOtv97Ips=';
csrfTokens[6] = 'xWPlTAlPSLeJ7+JRMbRNy2SpBLQDXPuRy4K3yPhr5W8=EoxLoLrNfrE=';
csrfTokens[7] = ''; // JSP
csrfTokens[8] = '';
csrfTokens[9] = '';

persistentCartCommands[0] = '/checkout/universal_cart.jsp';
persistentCartCommands[1] = '/checkout/add_item_pc.cmd';
persistentCartCommands[2] = '/checkout/add_items_pc.cmd';
persistentCartCommands[3] = '/checkout/delete_item_in_cart.cmd';
persistentCartCommands[4] = '/checkout/add_catalog_order_item_pc.cmd';
persistentCartCommands[5] = '/user/add_wishlist_item_to_basket_pc.cmd';
persistentCartCommands[6] = '/user/add_all_wishlist_items_to_basket_pc.cmd';
persistentCartCommands[7] = '/user/instore_pickup_zip_json_pc.jsp';
persistentCartCommands[8] = '/checkout/save_personalization_pc.cmd';
persistentCartCommands[9] = '/checkout/save_photo_pc.cmd';

var persistentCartContainerId = "#widget-ucart";
var persistentCartCloseButClass = ".widget-ucart-close-but";
var hideTimeOuts= new Array();
var zoneCodeArray = new Array();

var ucartLoadingHTML = 	'<div id="widget-ucart">' +
				 		'  <div id="glo-ucart-top" class="widget-ie6png"><!--  --></div>' +
				  		'  <div id="glo-ucart-body" class="widget-ie6png">' +
				  		'    <div id="glo-ucart-content">'+
				  		'	   <div class="widget-ima-loader"><img src="/assets/images/common/loading.gif" alt="Loading..." /></div>' +
				  		'    </div>' +
				  		'  </div>' +
				  		'  <div id="glo-ucart-bottom" class="widget-ie6png"><!--  --></div>' +
  				  		'</div>';

var ucartSimpleHTML = 	'<div id="widget-ucart"></div>';

var persistentCartIsShowing = false;
var submitAddToCartForm = true;
var saveZoneInfo = false;
var savePhotoInfo = false;
var numberOfPhotos = 0;
var isPhotoUploadRequired = 'false';
var tabIndex = 0;

/* Function(s) to Show the Basket Layer */
function showBasket(action,params,refreshPage,refreshDelayTime) {
	var csrfToken = '';
	if( (action == "show") || (action == "showFromQuickview") ) {
		showloading(ucartLoadingHTML); requestURL = persistentCartCommands[0];
	} else if(action == "addProduct") {
		showloading(ucartSimpleHTML);
		requestURL = persistentCartCommands[1];
		csrfToken = csrfTokens[1];
	} else if(action == "editProduct") {
		showloading(ucartSimpleHTML);
		requestURL = persistentCartCommands[1];
		csrfToken = csrfTokens[1];
	} else if(action == "addEnsemble") {
		showloading(ucartSimpleHTML);
		requestURL = persistentCartCommands[2];
		csrfToken = csrfTokens[2];
	} else if(action == "remove") {
		showloading(ucartLoadingHTML);
		requestURL = persistentCartCommands[3];
		csrfToken = csrfTokens[3];
	} else if(action == "addCatalogItems") {
		showloading(ucartSimpleHTML);
		requestURL = persistentCartCommands[4];
		csrfToken = csrfTokens[4];
	} else if(action == "addProductWishlist") {
		showloading(ucartSimpleHTML);
		requestURL = persistentCartCommands[5];
		csrfToken = csrfTokens[5];
	} else if(action == "addAllProductsWishlist") {
		showloading(ucartSimpleHTML);
		requestURL = persistentCartCommands[6];
		csrfToken = csrfTokens[6];
	} else {
		alert("missing action");
	}

	requestURL = requestURL;
	params = "ts=" + timestamp() + "&action=" + action + "&" + params;
	params = params + addCsrfToken(csrfToken);
	$.ajax({
		type: "POST",
		url: requestURL,
		data: params,
		dataType: "html",
		timeout: 15000,
		success: function(data) {
			hideloading();
			$(persistentCartContainerId).append(data);
			$(persistentCartContainerId).show();
			if (refreshPage != undefined && refreshPage) {
				setTimeout( function() { location.reload(true); }, (refreshDelayTime != undefined) ? refreshDelayTime : 0);
			}
			persistentCartIsShowing = true;
			submitAddToCartForm = true;
            $(".cart-info-container").addClass("active");

            if($(".glo-ucart-slider-item").length < 4) {
                var cartCount = $(".glo-ucart-slider-item").length;
                var viewportHeight = cartCount*100;
                $("#glo-ucart-slider-viewport").height(viewportHeight);
            }
			return true;
		},
		error: function() {
			hideloading();
			return false;
		}
	});
}

function addCsrfToken(csrfToken) {
	if (csrfToken != '') {
		return "&CSRF_TOKEN=" + encodeURIComponent(csrfToken);
	}
	return "";
}

function showNextStepsLayer(itemQuantity) {
	var success = validateForm(".zoneBody");
	if (success == false){
		return false;
	}else{
   	lib.layer.create("#whatToDoNextLayer", {
			defaultContent : "",
			url : '/catalog/includes/personalization_next_steps.jsp' + "?itemQuantity=" + itemQuantity,
			keepCentered : true
		});
		return false;
	}
}

function showFreeGiftOptionLayer(productId, action, itemTotal) {
	var success = validateForm(".zoneBody");
	if (success == false){
		return false;
	} else {

		// recheck again
		var zoneCode = $("#zoneCode").val();
		var freeGiftZoneCode = $("#freeGiftZoneCode").val();

		var freeGiftZoneCostDisplay = document.getElementById("zoneCost_" + freeGiftZoneCode);
		var freeGiftZoneCostInCents = getCostInCents(freeGiftZoneCostDisplay);
		var isFreeGiftZone = $("#isFreeGiftZone").val();
		var hasFreeGiftZone = $("#hasFreeGiftZone").val();

		var minPersonalizationChargeInCents = parseFloat(getMinPersonalizationChargeCost()) * 100;

		var messageType = $('#messageSku :selected').text();

		var designCost = '';
		var designCostValueInCents = 0;
 			try {
			if ($('#designCost')) {
				designCost = $('#designCost').text();
				if(designCost != 'undefined' && designCost.length > 0) {
					designCostValueInCents = parseInt(designCost.substring(1, designCost.indexOf("."))) * 100;
				}
			}
		} catch (err) {
		}

		if (hasFreeGiftZone == 'true' && ((freeGiftZoneCostInCents < minPersonalizationChargeInCents && designCostValueInCents < minPersonalizationChargeInCents) || (messageType == 'Do Not Personalize' && (designCost == ''  || designCost == '$0.00' || designCostValueInCents < minPersonalizationChargeInCents)))) {
			$("#free-gift-option-btn").show();
			$("#zoneAddToBag").hide();
	   		lib.layer.create("#freeGiftOptionLayer", {
				defaultContent : "",
				url : '/catalog/includes/free_gift_options.jsp' + "?productId=" + productId + "&minPersonalizationChargeCost=" + minPersonalizationChargeCost + "&_action=" + action + "&itemTotal=" + itemTotal,
				keepCentered : true
			});
			return false;
		}
		else {
			$("#free-gift-option-btn").hide();
			$("#zoneAddToBag").show();
			if (action != null && action != undefined) {
				if (action == 'showNextStepsLayer') {
					return showNextStepsLayer(itemTotal);
				} else {
					return savePersonalization('.zoneBody',action);
				}
			} else {
				return savePersonalization('.zoneBody','addToBag');
			}
			//return true;
		}

	}
}

function showItemInCartLayer() {
lib.layer.create("#itemInCartLayer", {
		defaultContent : "",
		keepCentered : true
	});
   // add modal to prevent clicking on other areas.
	$('#itemInCartLayer').jqm({ajax: '/catalog/includes/personalization_warning.jsp', modal:true});
	$('#itemInCartLayer').jqmShow();

	return true;
}

function showDesignWarningLayer(messageType) {
lib.layer.create("#designWarningLayer", {
		defaultContent : "",
		keepCentered : true
	});
   // add modal to prevent clicking on other areas.
	$('#designWarningLayer').jqm({ajax: '/catalog/includes/design_warning.jsp?messageType=' + messageType, modal:true});
	$('#designWarningLayer').jqmShow();

	return false;
}

function showPhotoUploadWarningLayer(goToUrl) {
lib.layer.create("#photoUploadWarningLayer", {
		defaultContent : "",
		keepCentered : true
	});
   // add modal to prevent clicking on other areas.
	$('#photoUploadWarningLayer').jqm({ajax: '/catalog/includes/photo_upload_warning.jsp?goToUrl=' + goToUrl, modal:true});
	$('#photoUploadWarningLayer').jqmShow();

	return false;
}
function hidePhotoUploadWarningLayer(){
//var myClose=function(hash) { hash.w.fadeOut('2000',function(){ hash.o.remove(); }); };
//$('#photoUploadProgressLayer').jqm({onHide:myClose});
$('#photoUploadWarningLayer').jqmHide();
lib.layer.remove("#photoUploadProgressLayer");
}

function showPhotoUploadProgress() {
	lib.layer.create("#photoUploadProgressLayer", {
		defaultContent : "",
		keepCentered : true
	});
   // add modal to prevent clicking on other areas.
	$('#photoUploadProgressLayer').jqm({ajax: '/catalog/includes/photo_upload_progress.jsp', modal:true});
	$('#photoUploadProgressLayer').jqmShow();

	return true;
}

function hidePhotoUploadProgress(){
var myClose=function(hash) { hash.w.fadeOut('2000',function(){ hash.o.remove(); }); };
$('#photoUploadProgressLayer').jqm({onHide:myClose});
$('#photoUploadProgressLayer').jqmHide();
//lib.layer.remove("#photoUploadProgressLayer");
}

function validateFreeGiftOption(action, itemTotal, callingPlace) {
	var freeGiftOption = $("input[@name=freeGiftOption]:checked").val();
   	if (!freeGiftOption) {
		errorAppend("#error-freeGiftOption","Please select an option below:<br />");
	}else {
		if ($("input[@name=freeGiftOptionSelection]") != undefined ) {
			$("input[@name=freeGiftOptionSelection]").val(freeGiftOption);
		}
		if (action == 'showNextStepsLayer') {
			hideFreeGiftOptionLayer();
			showNextStepsLayer(itemTotal);
		} else {
			var itemGUID = $("input[@name=itemGUID]", $('.zoneBody')).val();
			if( itemGUID != undefined && itemGUID != null && itemGUID != "" && (action == '' || action == undefined)) {
				action = "updateZone";
			}

		 	if (freeGiftOption == "personalizeFreeGift") {
		 		//Do nothing
			}

			if (callingPlace != 'null' && callingPlace != '' && callingPlace != '1stTab' && callingPlace != '2ndTab' && callingPlace != '3rdTab'){
				$("#nextZoneId").val(callingPlace);
			}

			if (freeGiftOption == "notToPersonalizeFreeGift") {
				savePersonalization('.zoneBody',action);
			}

			if (freeGiftOption == "declineFreeGift") {
				savePersonalization('.zoneBody',action);
			}
			hideFreeGiftOptionLayer();
			if (callingPlace == '1stTab') {
			  	updateInventoryStatus();
				$("#productTabs").tabs({ selected: 0,cache: false,ajaxOptions: { cache : false }});
			  	$('#image-block').show(); // show image container
			  	saveZoneInfo = false;
			  	submitAddToCartForm = true;
			  	savePhotoInfo = false;
			  	resetErrorFields();

			} else if (callingPlace == '2ndTab') {
			  	$('#image-block').show();
				removeCartOpenClass();
				savePhotoInfo = true;
				saveZoneInfo = false;
				$("#productTabs").tabs({ selected: 1,cache: false,ajaxOptions: { cache : false }});
			} else if (callingPlace == '3rdTab') {
				 $('#image-block').show(); // show image container
				 submitAddToCartForm = true;
				 saveZoneInfo = false;
				 savePhotoInfo = false;
				 $("#productTabs").tabs({ selected: tabIndex,cache: false,ajaxOptions: { cache : false }});
			}
		}
   }
}

function hideFreeGiftOptionLayer(){
	var myClose = function(hash) { hash.w.fadeOut('2000',function(){ hash.o.remove(); }); };
	$('#freeGiftOptionLayer').jqm({onHide:myClose});
	$('#freeGiftOptionLayer').jqmHide();
	lib.layer.remove("#freeGiftOptionLayer");
}

function validateNextSteps(action) {
    if (!$("input[@name=nextStep]:checked").val()){
		errorAppend("#error-nextStep","Please select an option below:<br />");
	 }else{
		//savePersonalization('.zoneBody',action, '', true,1000);
		savePersonalization('.zoneBody',action);
		lib.layer.remove("#whatToDoNextLayer");
    }
}

function savePersonalization(prefix, nextAction, changedElement, refreshPage, refreshDelayTime) {
	$('.links-search-container .cart-search-keyword-container').removeClass('bag-open');
	var scope = $(prefix);
	var isPhotoUploadAvaiable;
	var msgSKUarr = $("select[@name=messageSku]", scope).val().split("|");
	var msgSKU = msgSKUarr[0];
	params =  "productName=" + $("input[@name=productName]", scope).val() +
				 "&occasionCode=" + $("select[@name=occasionCode]", scope).val() +
			    "&productId=" + $("input[@name=productId]", scope).val() +
   	 		 "&zoneId=" + $("input[@name=zoneId]", scope).val() +
				 "&nextZoneId=" + $("input[@name=nextZoneId]", scope).val() +
				 "&backToZoneId=" + $("input[@name=fromZoneId]", scope).val() +
			    "&messageSku=" + msgSKU +
				 "&myOwnMessageCost=" + $("input[@name=myOwnMessageCost]", scope).val() +
				 "&isPersPriceExpanded=" + $("input[@name=isPersPriceExpanded]", scope).val();
   var messageTxt = "";
	$(".messageText").each(function() {
		params = params + "&" + $(this).attr("name") + "=" + encodeURIComponent($(this).val());
      messageTxt = messageTxt + " " + $(this).val();
	});
   if( $("input[@name=defaultTextareaMessage]", scope).val() != undefined )
      params = params + "&defaultTextareaMessage=" + encodeURIComponent($("input[@name=defaultTextareaMessage]", scope).val());

	if (prefix != undefined)
		params = params + "&prefix=" + prefix;
	if (changedElement != undefined)
		params = params + "&changedElement=" + changedElement;
	if (nextAction != undefined)
		params = params + "&nextAction=" + nextAction;
   if ($("input[@name=nextStep]:checked").val() != undefined)
		params = params +  "&nextStep=" + $("input[@name=nextStep]:checked").val();
	if ($("select[@name=font]", scope).val() != undefined)
		params = params + "&font=" + $("select[@name=font]", scope).val();
	if ($("input[@name=color]", scope).val() != undefined)
		params = params + "&color=" + $("input[@name=color]", scope).val();
	if ($("input[@name=fontOption]", scope).val() != undefined)
		params = params + "&fontOption=" + $("input[@name=fontOption]", scope).val();
   if ($("input[@name=fontValueGroup]", scope).val() != undefined)
		params = params + "&fontValueGroup=" + $("input[@name=fontValueGroup]", scope).val();
	if ($("input[@name=colorOption]", scope).val() != undefined)
		params = params + "&colorOption=" + $("input[@name=colorOption]", scope).val();
   if ($("input[@name=colorValueGroup]", scope).val() != undefined)
		params = params + "&colorValueGroup=" + $("input[@name=colorValueGroup]", scope).val();
	if( $("input[@name=itemGUID]", scope).val() != undefined )
      params = params + "&itemGUID=" + $("input[@name=itemGUID]", scope).val();
	if( $("input[@name=editMainItem]", scope).val() != undefined )
      params = params + "&editMainItem=" + $("input[@name=editMainItem]", scope).val();
   if( $("input[@name=popularMessageSku]", scope).val() != undefined )
      params = params + "&popularMessageSku=" + $("input[@name=popularMessageSku]", scope).val();
	if ($("input[@name=isPhotoUploadAvailable]", scope).val() != undefined ) {
	 isPhotoUploadAvaiable = $("input[@name=isPhotoUploadAvailable]", scope).val();
      params = params + "&isPhotoUploadAvailable=" + isPhotoUploadAvaiable;
	}
	if ($('input:checkbox[name=notDesignCheck]:checked', scope).val() != undefined ) {
      params = params + "&notDesignCheck=" + $("input:checkbox[@name=notDesignCheck]:checked", scope).val();
	}
	if ($("select[@name=designCat1]", scope).val() != undefined ) {
      params = params + "&designCat1=" + $("select[@name=designCat1]", scope).val();
	}
	if ($("select[@name=designCat2]", scope).val() != undefined ) {
      params = params + "&designCat2=" + $("select[@name=designCat2]", scope).val();
	}
	if ($("select[@name=designCat3]", scope).val() != undefined ) {
      params = params + "&designCat3=" + $("select[@name=designCat3]", scope).val();
	}
	if ($("input[@name=designSku]", scope).val() != undefined ) {
      params = params + "&designSku=" + $("input[@name=designSku]", scope).val();
	}
	if ($('input[name=designLocation]:checked', scope).val() != undefined ) {
      params = params + "&designLocation=" + $("input[@name=designLocation]:checked", scope).val();
	}

	if ($("input[@name=freeGiftOptionSelection]").val() != undefined ) {
      params = params + "&freeGiftOption=" + $("input[@name=freeGiftOptionSelection]").val();
	}

	if ($("input[@name=shipLocation]").val() != undefined ) {
      params = params + "&shipLocation=" + $("input[@name=shipLocation]").val();
	}

    if ($("input[@name=opusPickupTimeId]").val() != undefined ) {
      params = params + "&opusPickupTimeId=" + $("input[@name=opusPickupTimeId]").val();
    }

    if ($("input[@name=opusPickupTimeRule]").val() != undefined ) {
      params = params + "&opusPickupTimeRule=" + $("input[@name=opusPickupTimeRule]").val();
    }

    if ($("input[@name=opusPickupTimeDays]").val() != undefined ) {
      params = params + "&opusPickupTimeDays=" + $("input[@name=opusPickupTimeDays]").val();
    }

    if ($("input[@name=opusPickupTimeHour]").val() != undefined ) {
      params = params + "&opusPickupTimeHour=" + $("input[@name=opusPickupTimeHour]").val();
    }

    if ($("input[@name=opusPickupTimeMinutes]").val() != undefined ) {
      params = params + "&opusPickupTimeMinutes=" + $("input[@name=opusPickupTimeMinutes]").val();
    }

    if ($("input[@name=opusPickupTimeStr]").val() != undefined ) {
      params = params + "&opusPickupTimeStr=" + $("input[@name=opusPickupTimeStr]").val();
    }

	params = "ts=" + timestamp() + "&action=addProduct&" + params;
	params = params + addCsrfToken(csrfTokens[8]);
	// params = params + addCsrfToken($("input[@name=CSRF_TOKEN]", scope).val());

	//Validate the form only in case of the following
	if (nextAction == "addToBag" || nextAction == "goToNextZone" ||  nextAction == "goToNextItem"
			||  nextAction == "updateZone" || nextAction == "switchZone" || (nextAction == "saveInfo" && $("input[@name=itemGUID]", scope).val() != "")
			|| (nextAction == "saveInfoFreeGift" && $("input[@name=itemGUID]", scope).val() != "")){
		var success = validateForm(prefix);
		if (success == false){
			return false;
		}else{
         if ($("select[@name=messageSku]", scope).val() != ""){
				s.eVar17 = messageTxt;
         }

		}

	}



	var dataType = "html";
	if (nextAction == "updateCost" || nextAction == "updateImage" || nextAction == "updateCostAndImage" ||
					  nextAction == "selectDesignLoc" || nextAction == "selectDesignSku" || nextAction == "confirmDesignLoc"){
		dataType = "json";
	}
   showloading(ucartSimpleHTML);
	$.ajax({
		type: "POST",
		url: persistentCartCommands[8],
		data: params,
		dataType: dataType,
     	timeout: 15000,
		success: function(data) {
		  hideloading();

		  if (nextAction == "addToBag"){
				//line below was needed for entry of multi-step item with single ZONE
				// in order for mini-cart to show
				showloading(ucartSimpleHTML);
				addToBag(data, refreshPage, refreshDelayTime);
	         saveZoneInfo = false;
	         savePhotoInfo = false;
            setTimeout(function() {
               $("#productTabs").tabs('select', 0);
            }, 1000);
		  }else if (nextAction == "goToNextZone"){
					goToZone(data, isPhotoUploadAvaiable);
		  }else if (nextAction == "goToNextItem"){
				//lib.layer.remove("#whatToDoNextLayer");
            goToNextItem(data, isPhotoUploadAvaiable);
		  }else if (nextAction == "updateCost"){
				updateProductCost(data);
        }else if (nextAction == "updateImage"){
				updateProductImage(data);
        }else if (nextAction == "updateCostAndImage"){
				updateProductCost(data);
				updateProductImage(data);
				updateMessageArea(data.messageUrl);
        }else if (nextAction == "saveInfo"){
				//Do nothing. This would be the case of switching b/n product detail tab
				return true;
		  }else if (nextAction == "saveInfoFreeGift"){
				//Do nothing. This would be the case of switching b/n product detail tab
				return true;
		  }else if (nextAction == "switchZone"){
				//Do nothing. This would be the case of switching zones
				goToZone(data, isPhotoUploadAvaiable);
		  }else if (nextAction == "updateZone"){
				window.location = '/checkout/basket.jsp';
		  }else if (nextAction == "selectDesignSku"){
				updateSelectedDesignSku(data);
		  }else if (nextAction == "selectDesignLoc"){
				checkSelectedLocation(data);
		  }else if (nextAction == "confirmDesignLoc"){
				confirmDesignLoc(data);
		  }
		},
		error: function() {
			hideloading();
			return false;
		}
	});
}

function savePhotoUpload(prefix, nextAction, showProgress, changedElement, refreshPage, refreshDelayTime) {
 if(showProgress ){
	  showPhotoUploadProgress();
 }

	//$('.links-search-container .cart-search-keyword-container').removeClass('bag-open');
	var scope = $(prefix);
	params =  "productName=" + $("input[@name=productName]", scope).val() +
			    "&productId=" + $("input[@name=productId]", scope).val() +
				 "&uploadImageName=" + $("input[@name=uploadImageName]", scope).val() +
				 "&resolutionMessage=" + encodeURIComponent($("input[@name=resolutionMessage]", scope).val()) +
				 "&resolutionAcceptable=" + $("input[@name=resolutionAcceptable]", scope).val() +
             "&uniqueFileName=" + $("input[@name=uniqueFileName]", scope).val();
	if (prefix != undefined)
		params = params + "&prefix=" + prefix;
	if (changedElement != undefined)
		params = params + "&changedElement=" + changedElement;
	if (nextAction != undefined)
		params = params + "&nextAction=" + nextAction;
	if( $("input[@name=itemGUID]", scope).val() != undefined )
      params = params + "&itemGUID=" + $("input[@name=itemGUID]", scope).val();

	if (numberOfPhotos > 0) {
		for (i = 1; i <= numberOfPhotos; i++) {
			params = params + "&uploadImageNames=" + $("input[@id=uploadImageNames_" + i + "]", scope).val()
			    + "&uniqueFileNames=" + $("input[@id=uniqueFileNames_" + i + "]", scope).val()
			    + "&resolutionAcceptables=" + $("input[@id=resolutionAcceptables_" + i + "]", scope).val()
			    + "&resolutionMessages=" + encodeURIComponent($("input[@id=resolutionMessages_" + i + "]", scope).val())
			    + "&photoSequences=" + $("input[@id=photoSequences_" + i + "]", scope).val();
		}
	}

	params = "ts=" + timestamp() + "&action=addProduct&" + params;
	params = params + addCsrfToken(csrfTokens[9]);

	//Validate the form only in case of the following
	if (nextAction == "personalize" || (nextAction == "saveInfo" && $("input[@name=itemGUID]", scope).val() != "") ){
		var success = validatePhotoUploadForm(prefix);
		if (success == false){
         savePhotoInfo = true;
         saveZoneInfo = false;
			return false;
		}
	}
	var dataType = "html";

	$.ajax({
		type: "POST",
		url: persistentCartCommands[9],
		data: params,
		dataType: dataType,
     	timeout: 15000,
		success: function(data) {
		 // hideloading();

		if (nextAction == "personalize"){
			setTimeout(function() {
            if(showProgress){
					hidePhotoUploadProgress();
				}
				$("#productTabs").tabs({ selected: 2,cache: false,ajaxOptions: { cache : false }});
          }, 500);

		}else if (nextAction == "edit"){
				window.location = '/checkout/basket.jsp';
      }else if (nextAction == "saveInfo"){
				//Do nothing. This would be the case of switching b/n tabs
				return true;
		}else if (nextAction == "addToBag"){
            if(showProgress){
					hidePhotoUploadProgress();
				}
				showloading(ucartSimpleHTML);
				addToBag(data, refreshPage, refreshDelayTime);
            savePhotoInfo = false;
				setTimeout(function() {
               $("#productTabs").tabs('select', 0);
				}, 1000);
		}

		},
		error: function() {
         hidePhotoUploadProgress();
			return false;
		}
	});
}
function validatePhotoUploadForm(prefix){
   var scope = $(prefix);
	var success = true;
   $("#error-photoUpload").html("");
	if ($("input[@name=photoUploadMandatory]", scope).val() == "Y" && $("input[@name=uploadImageName]", scope).val() == ""){
		$("#error-photoUpload").html("Please upload photo before continuing <br/>");
		success = false;
	}
   return success;
}

function validateForm(prefix){
	$(".common-error").each(function() {
		$(".common-error").html("");
	});
   var scope = $(prefix);
	var success = true;
	if ($("select[@name=occasionCode]", scope).val() == ""){
		$("#error-occasionCode").html("Please select an occasion <br/>");
		success = false;
		document.location.hash = "#error-occasionCode";
		if(history.pushState) {
    		history.pushState(null, null, '#');
		}
	}else{
		if ($("input[@name=isDesignAvailable]", scope).val() == "Y"){
			var $radios = $('input:radio[name=designLocation]');
         if (($("input[@name=designSku]", scope).val() == "" || ($radios.is(':checked') === false)) && ($("select[@name=designCat1]").val() != "noDesign") && (!$("div.design-body").is(":empty"))){
				$("#error-generic").html("You have not completed your design selection. Please select a design and location or select 'No Thanks' in order to continue.<br/>");
				success = false;
				document.location.hash = "#error-generic";
				if(history.pushState) {
    				history.pushState(null, null, '#');
				}
			}
		}
	   if ($("select[@name=messageSku]", scope).val() != ""){
			var messageSku =  $("select[@name=messageSku]", scope).val();
			if ( messageSku == '194071' || messageSku == '219396'){
				if ($.trim($("textarea[@name=myOwnMessage]", scope).val()) == "" || $('#defaultTextareaMessage').val() == 'Enter your message here.'){
					//$("#error-myOwnMessage").html("Please enter a personal message <br/>");
					$("#error-generic").html("You have not entered a message. Please enter your message in the fields provided or choose the 'Do Not Personalize this Area' option from the Personal Message drop down menu. <br/>");
					document.location.hash = "#error-generic";
					if(history.pushState) {
    					history.pushState(null, null, '#');
					}
					success = false;
				}
			}else{
				var showGenericMessage = false;
            var noMessageEntered = true;
			   var noMessagePresent = true;
				$(".messageText").each(function() {
					var label = "#" + $(this).attr("name") + "_label";
					if ($.trim($(this).val()) != ""){
						noMessageEntered = false;
                  noMessagePresent = false;
						var value = $.trim($(this).val());
						if (validationTypes){
                     var validationType = validationTypes[$(this).attr("name")];
							if (validationType == 'DATE'){
								if (!isValidDate(value)){
									$("#error-" + $(this).attr("name")).html("Please enter a valid date. <br/>Valid formats - 10/11/03, 3/3/03, 10/11/2003, 3/3/2003, <br/>10-11-03, 3-3-03, 10-11-2003, 3-3-2003, 11 October 2003, <br/>3 October 2003, October 11, 2003, October 3, 2003, <br/>03/03/2003, 03/03/03, 03-03-2003, 03-03-03<br/>");
									success = false;
								}
							}else if (validationType == 'SHORTDATE'){
								if (!isValidShortDate(value)){
									$("#error-" + $(this).attr("name")).html("Please enter a valid short date. <br/>Valid formats - 10/11/03, 10-11-03 <br/>");
									success = false;
								}
							}else if (validationType == 'YEAR'){
								if (!isValidYear(value)){
									$("#error-" + $(this).attr("name")).html("Please enter a valid year <br/>");
									success = false;
								}
							}else if (validationType == 'NUMERIC'){
								if (!isValidNumeric(value)){
									$("#error-" + $(this).attr("name")).html("Please enter a valid number <br/>");
									success = false;
								}
							}else if (validationType == 'WORD'){
								if (!isValidWord(value)){
									$("#error-" + $(this).attr("name")).html("Please enter a valid word <br/>");
									success = false;
								}
							}
						}
					}else{
						if (requiredFields[$(this).attr("name")] == "Y"){
							showGenericMessage = true;
                     $("#error-" + $(this).attr("name")).html("Please enter " + $(label).text() + " <br/>");
							success = false;
						}
					}
				});
            if (showGenericMessage){
					$("#error-generic").html("Please review the errors below. If you do want to personalize this area, please choose the 'Do Not Personalize this Area' option from the Personal Message drop down menu. <br/>");
				}else if (noMessageEntered && !noMessagePresent){
					success = false;
					$("#error-generic").html("You have not entered a message. Please enter your message in the fields provided or choose the 'Do Not Personalize this Area' option from the Personal Message drop down menu. <br/>");
					document.location.hash = "#error-generic";
					if(history.pushState) {
    					history.pushState(null, null, '#');
					}
				}
			}
		}
	}
	return success;
}

function isValidShortDate(val){
	return isValidNumericDate(val, "SHORTDATE");
}

function isValidDate(val){
	var isValid = isValidNumericDate(val, "LONGDATE");
	if (!isValid){
		isValid = isValidNumericDate(val, "SHORTDATE");
		if (!isValid){
			isValid = isValidStringDate(val);
		}
   }
	return isValid;
}

function isValidStringDate(txtDate){
	//Valid values: 11 October 2003, October 11, 2003
	var objDate;
	var mSeconds;
   var day, month, year;
	if (txtDate.indexOf(",") > 0){
		//This format - October 11, 2003
		var dt = txtDate.split(" ");
		if (dt.length == 3){
         month   =  monthNames[dt[0]]  - 0;
         day = dt[1].substring(0, dt[1].length-1)  - 0;
         year  = dt[2] - 0;
			if (dt[2].length != 4) return false;
		}else{
			return false;
		}
	}else{
		//This format - 11 October 2003
		var dt = txtDate.split(" ");
		if (dt.length == 3){
         day   = dt[0]  - 0;
         month = monthNames[dt[1]]  - 0;
         year  = dt[2] - 0;
			if (dt[2].length != 4) return false;
		}else{
			return false;
		}
	}
   // convert txtDate to the milliseconds
   mSeconds = (new Date(year, month, day)).getTime();

   // initialize Date() object from calculated milliseconds
   objDate = new Date();
   objDate.setTime(mSeconds);

   // compare input parameter date and created Date() object, if difference exists then date isn't valid
  	if (objDate.getFullYear() != year)  return false;
   if (objDate.getMonth() != month) return false;
   if (objDate.getDate() != day)   return false;

   // otherwise return true
   return true;
}


function isValidNumericDate(txtDate, type){
   //Valid values: SHORTDATE - 10/11/03,10-11-03
	//Valid values: LONGDATE - 10/11/2003,10-11-2003

  var dt = txtDate.split("/");
  if (dt.length != 3){
		dt = txtDate.split("-");
      if (dt.length != 3){
			return false;
		}
  }

  if (dt[0].length > 2 || dt[1].length > 2) return false;

  var day   = dt[1] - 0;
  var month = dt[0] - 1;
  var year  = dt[2] - 0;

  // convert txtDate to the milliseconds
  mSeconds = (new Date(year, month, day)).getTime();

  // initialize Date() object from calculated milliseconds
  objDate = new Date();
  objDate.setTime(mSeconds);

  // compare input parameter date and created Date() object, if difference exists then date isn't valid
  if (type == "LONGDATE"){
		if (objDate.getFullYear() != year)  return false;
  }else{
		if (objDate.getYear() != year)  return false;
  }

  if (objDate.getMonth() != month) return false;
  if (objDate.getDate() != day)   return false;

  // otherwise return true
  return true;
}

function isValidYear(val){
	if(val.length != 4 || !isValidNumeric(val)) {
		return false;
	}
	return true;
}
function isValidNumeric(val){
	var ValidChars = "0123456789.";
	var IsNumber=true;
	var Char;

	for (i = 0; i < val.length && IsNumber == true; i++){
		Char = val.charAt(i);
	   if (ValidChars.indexOf(Char) == -1){
	      IsNumber = false;
	   }
	}
	return IsNumber;
}
function isValidWord(val){
	//No spaces should be allowed
	var whiteSpaceExp=/\s/g;

   if (whiteSpaceExp.test(val)) {
      return false;
   }
	return true;
}
function addToBag(data, refreshPage, refreshDelayTime){
	//Add to bag
   $('#zoneAddToBag').hide();
	$(persistentCartContainerId).append(data);
	$(persistentCartContainerId).show();
	if (refreshPage != undefined && refreshPage) {
        setTimeout( function() { location.reload(true); }, (refreshDelayTime != undefined) ? refreshDelayTime : 0);
   }
	persistentCartIsShowing = true;
	submitAddToCartForm = true;
    if($(".glo-ucart-slider-item").length < 4) {
        var cartCount = $(".glo-ucart-slider-item").length;
        var viewportHeight = cartCount*100;
        $("#glo-ucart-slider-viewport").height(viewportHeight);
    }
	return true;
}

function goToZone(data, isPhotoTabAvailable){
	//Go to next zone
	window.uiIsClearForImageUpdate = false;
	if (isPhotoTabAvailable == "Y")
		$("div#tabs-3").empty().html(data);
	else
		$("div#tabs-2").empty().html(data);

	persistentCartIsShowing = false;
	return true;
}

function goToNextItem(data, isPhotoTabAvailable){
	//Go to next item
   $('#zoneAddToBag').hide();
	//line below was needed for entry of multi-step item with single ZONE
	// in order for mini-cart to show
	showloading(ucartSimpleHTML);

	$(persistentCartContainerId).append(data);
	$(persistentCartContainerId).show();
   persistentCartIsShowing = true;
	submitAddToCartForm = true;
   setTimeout(function() {
		if (isPhotoTabAvailable == "Y")
         $("#productTabs").tabs({ selected: 2,cache: false,ajaxOptions: { cache : false }});
		else
			$("#productTabs").tabs({ selected: 1,cache: false,ajaxOptions: { cache : false }});
    }, 2000);

	return true;
}

function updateProductCost(data){
	var znCodes = data.znCode.split("|");
   var znCosts = data.znCost.split("|");
   var messageType = $('#messageSku :selected').text();
	for (i=0; i < znCodes.length; i++){
		var zoneCostId = "#zoneCost_"+ znCodes[i];
		if (i < znCodes.length - 1) {

    	  	$(zoneCostId).text(znCosts[i]);
      	} else {
      		if (messageType != "Do Not Personalize") {
      			$(zoneCostId).text(znCosts[i]);
      		} else {
      			$(zoneCostId).text("$0.00");
      		}
      	}
	}
	var zoneNameId = "#zoneName_"+ data.zoneCode;
	if (data.zoneName) {
   		$(zoneNameId).text(data.zoneName);
   }

	$("#fontSkuCost").text("");
	$("#colorSkuCost").text("");
	$("#messageSkuCost").text("");

	//Display the cost only if it is non zero
	if (data.fontCost != "$0.00"){
		$("#fontSkuCost").text(data.fontCost);
	}

	if (data.colorCost != "$0.00"){
		$("#colorSkuCost").text(data.colorCost);
	}

	if (data.messageCost != "$0.00"){
		if (messageType != "Do Not Personalize") {
			$("#messageSkuCost").text(data.messageCost);
      	}
	}

	displayFreeGiftOptionButton();
   $("#totalCost1").text(data.totalCost);
	$("#totalCost2").text(data.totalCost);
   $("#totalItemPrice").text(data.totalItemCost);
   return true;
}

function displayFreeGiftOptionButton() {
	var zoneCode = $("#zoneCode").val();
	var freeGiftZoneCode = $("#freeGiftZoneCode").val();

	var freeGiftZoneCostDisplay = document.getElementById("zoneCost_" + freeGiftZoneCode);
	var freeGiftZoneCostInCents = getCostInCents(freeGiftZoneCostDisplay);
	var isFreeGiftZone = $("#isFreeGiftZone").val();
	var hasFreeGiftZone = $("#hasFreeGiftZone").val();

	var minPersonalizationChargeInCents = parseFloat(getMinPersonalizationChargeCost()) * 100;

	if ((freeGiftZoneCostInCents < minPersonalizationChargeInCents) && hasFreeGiftZone == 'true') {
		$("#free-gift-option-btn").show();
		$("#zoneAddToBag").hide();
	}
	else {
		$("#free-gift-option-btn").hide();
		$("#zoneAddToBag").show();
	}
}

function getMinPersonalizationChargeCost() {
	var minPersonalizationCharge = '$6.00';

	if (minPersonalizationCharge == null || minPersonalizationCharge == '' || minPersonalizationCharge == undefined) {
		return 6;// Return default value
	}

	return minPersonalizationCharge.substring(1, minPersonalizationCharge.length-3);
}

function getFreeGiftBoxChargeCost() {
	var minPersonalizationCharge = '$10.00';

	if (minPersonalizationCharge == null || minPersonalizationCharge == '' || minPersonalizationCharge == undefined) {
		return 10;// Return default value
	}

	minPersonalizationChargeCost = minPersonalizationCharge.substring(1, minPersonalizationCharge.indexOf("."));

	return minPersonalizationChargeCost;
}

function confirmDesignLoc(data){
	updateSelectedDesignSku(data, "N");

	if (data.messageUrl != '' && data.messageUrl != undefined){
		 $(".contentForm1").children().show();
       $(".contentForm2").children().show();
     // if ($("#messageSku").val() != ""){
         $("#messageSku").val(data.messageSku);
			jq14("select#messageSku").msDropDown();
			updateMessageInfo();
			updateMessageArea(data.messageUrl);
		//}

	}else{
      $(".contentForm1").children().filter(":not(.contentForm2)").hide();
		$(".contentForm2").children().filter(":not(#persPreviewImgDiv)").hide();
		$(":input", ".contentForm1").each(function(){
	      $(this).val("");
		});
		$("#messageSkuCost").text("");
	}

   setTimeout(function() {
		//updateImage();
		savePersonalization('.zoneBody','updateImage');
	}, 500);
}

function updateSelectedDesignSku(data, updateMessage){
	var znCodes = data.znCode.split("|");
   var znCosts = data.znCost.split("|");
	for (i=0; i < znCodes.length; i++){
		var zoneCostId = "#zoneCost_"+ znCodes[i];
      $(zoneCostId).text(znCosts[i]);
	}
	if (data.designName != ''){
		$("#designName").text(data.designName);
		$("input[@name=designName]").val(data.designName);
	}
	if (data.designCost != ''){
		if (data.designCost == '$0.00'){
			$("#designPrice").text("Free");
		}else{
			$("#designPrice").text(data.designCost);
		}

	   $("input[@name=designPrice]").val(data.designCost);
	}
	if (data.designCost != null && data.designCost != '' && data.designCost != '$0.00'){
		$("#designCost").text(data.designCost);
	}else{
		$("#designCost").text("");
	}

	$("input[@name=topBottom]").val(data.topBottom);
	$("input[@name=leftRight]").val(data.leftRight);
	$("input[@name=center]").val(data.center);

	if (data.topBottom != '' && data.topBottom > 0){
		$("#designTop").removeAttr("disabled");
		$("#designTopLabel").removeClass("disabledRadio");
		$("#designBottom").removeAttr("disabled");
		$("#designBottomLabel").removeClass("disabledRadio");
	}else if (data.topBottom == 0){
		$("#designTop").attr("disabled","disabled");
		$("#designTopLabel").addClass("disabledRadio");
		$("#designBottom").attr("disabled","disabled");
		$("#designBottomLabel").addClass("disabledRadio");
	}
	if (data.leftRight != '' && data.leftRight > 0){
		$("#designLeft").removeAttr("disabled");
		$("#designLeftLabel").removeClass("disabledRadio");
		$("#designRight").removeAttr("disabled");
		$("#designRightLabel").removeClass("disabledRadio");
	}else if (data.leftRight == 0){
		$("#designLeft").attr("disabled","disabled");
		$("#designLeftLabel").addClass("disabledRadio");
		$("#designRight").attr("disabled","disabled");
		$("#designRightLabel").addClass("disabledRadio");
	}
	if (data.center != '' && data.center > 0){
		$("#designCenter").removeAttr("disabled");
		$("#designCenterLabel").removeClass("disabledRadio");
	}else if (data.center == 0){
		$("#designCenter").attr("disabled","disabled");
		$("#designCenterLabel").addClass("disabledRadio");
	}
	$("#totalCost1").text(data.totalCost);
	$("#totalCost2").text(data.totalCost);
	$("#totalItemPrice").text(data.totalItemCost);

	if (data.messageUrl != '' && data.messageUrl != undefined && updateMessage != "N"){
       $(".contentForm1").children().show();
       $(".contentForm2").children().show();
      $("#messageSku").val(data.messageSku);
		jq14("select#messageSku").msDropDown();
		updateMessageInfo();
      updateMessageArea(data.messageUrl);
      setTimeout(function() {
		//updateImage();
		savePersonalization('.zoneBody','updateImage');
	}, 500);
	}
   return true;
}


function updateProductImage(data){
	if (data.zoneImage != ''){
		var zoneImageId = "#zoneImage";
		$(".entity-zone-image img").attr("src", data.zoneImage);
		// $(".entity-zone-image img").attr("src", 'testbadimage.jpg');

		var notLoaded = false;
		$(".entity-zone-image img").error(function(){
		if (!notLoaded) {
			// if s7 img does not load img then display preview not available message
			$(".entity-zone-image img").attr("src", '/assets/images/text/english/preview-not-available.gif');
			}
			notLoaded = true;
		});

      if ($(zoneImageId).widgetState().zoomControl){
	       $(zoneImageId).widgetState().zoomControl.reset();
		}
		//if ($(zoneImageId).widgetState().zoomControl){
		//	$(zoneImageId).widgetState().zoomControl.zoomIn();
		//}
	}
   return true;
}


function checkSelectedLocation(data) {
	var showDlg = "";
	if (data.showDialog != null && data.showDialog != '')
		showDlg = data.showDialog;

	if (showDlg == "") {
		saveSelectedLocation();
	}else {
		showDesignWarningLayer(showDlg);
	}

}

function removeCartOpenClass() {
	//css class to highlight cart button area blue when active
	$('.links-search-container .cart-search-keyword-container').removeClass('bag-open');
}
function addCartOpenClass() {
	//css class to highlight cart button area blue when active
	$('.links-search-container .cart-search-keyword-container').addClass('bag-open');
}

function showloading(htmlToShow) {
	$(persistentCartContainerId).remove();

	//load, position, show new cart
	$("body").append(htmlToShow);
	positionpersistentCart();
	$(persistentCartContainerId).show();

	// add an event for close layer.
	//$(persistentCartCloseButClass).click(function() { hideBasket(); });
}

function hideloading() {
	$(persistentCartContainerId + " *").remove();
	$(persistentCartContainerId).html("");
}


//edit this function to position cart.
function positionpersistentCart() {
	newLeft = ($("body").width() / 2) + ( $(".common-template-standard").width() / 2 ) - $(persistentCartContainerId).width();
	var logoposleft = $(".common-template-standard").position().left;
   //newLeft = logoposleft + 409;
    var cartTop = $(".cart-info-container").offset().top + $(".cart-info-container").height();
   $(persistentCartContainerId).css("left", newLeft+"px");
	$(persistentCartContainerId).css("top", cartTop);
}

 //edit this function to update the setup
function setupPersistentCartButtons() {
	// draw focus near this
	window.location = "#";

	$(persistentCartCloseButClass).unbind("click").click(function() {
		hideBasket();
	});
	$(persistentCartCloseButClass).attr("href","javascript:void(0)");
	clearAllTimeouts();
}

//Edit this function if need to do something special on basket close.
function hideBasket() {
	$(persistentCartContainerId).hide();
	$(persistentCartContainerId).remove();
    $(".cart-info-container").removeClass("active");

	// this is added in universal_cart.jsp docready
	$('.links-search-container .cart-search-keyword-container').removeClass('bag-open');

	shoppingBagBut = $("#widget-header-active-link").eq(0);
	$(shoppingBagBut).attr("id","");
	$(shoppingBagBut).mouseout();

	persistentCartIsShowing = false;
}

function isShowingBasket() {
	return persistentCartIsShowing;
}

function updateHeader(amt) {
$("#widget-ucart-item-count").text("(" + amt + ")");
}


function addToCart(prefix, container, refreshPage, refreshDelayTime) {
 	var scope = $(prefix);
	if (container)
		scope = $(container).parents(prefix);

	var productVariantId = $("input[@name=productVariantId]", scope).val();
	if (productVariantId == null || productVariantId == undefined)
		productVariantId = $("input[@name=productVariantId2]", scope).val();

if (refreshPage != undefined && refreshPage) {
        setTimeout( function() { location.reload(true); }, (refreshDelayTime != undefined) ? refreshDelayTime : 0);
   }
	params ="productName=" + $("input[@name=productName]", scope).val() +
			"&productStyle=" + $("input[@name=productStyle]", scope).val() +
			"&productId=" + $("input[@name=productId]", scope).val() +
			"&categoryId=" + $("input[@name=categoryId]", scope).val() +
			"&parentCategoryId=" + $("input[@name=parentCategoryId]", scope).val() +
			"&subCategoryId=" + $("input[@name=subCategoryId]", scope).val() +
			"&quantity=" + $("input[@name=quantity]", scope).val() +
			"&productType=" + $("input[@name=productType]", scope).val() +
			"&bomKey=" + $("input[@name=bomKey]", scope).val() +
			"&occasionFromBrowse=" + $("input[@name=occasionFromBrowse]", scope).val() +
			"&goToReloadPage=" + $("input[@name=goToReloadPage]", scope).val() +
			"&goToPersonalize=" + $("input[@name=goToPersonalize]", scope).val() +
			"&goToPhotoUpload=" + $("input[@name=goToPhotoUpload]", scope).val() +
			"&editMainItem=" + $("input[@name=editMainItem]", scope).val() +
			"&photoUploadAvailable=" + $("input[@name=photoUploadAvailable]", scope).val() +
			"&photoUploadMandatory=" + $("input[@name=photoUploadMandatory]", scope).val() +
			"&includeBackorderCheck=" + $("input[@name=includeBackorderCheck]", scope).val() +
            "&includeSFSCheck=" + $("input[@name=includeSFSCheck]", scope).val() +
			"&productVariantId=" + productVariantId +
			"&shipLocation=" + $("input[@name=shipLocation]", scope).val() +
            "&opusPickupTimeId=" + $("input[@name=opusPickupTimeId]", scope).val() +
            "&opusPickupTimeRule=" + $("input[@name=opusPickupTimeRule]", scope).val() +
            "&opusPickupTimeDays=" + $("input[@name=opusPickupTimeDays]", scope).val() +
            "&opusPickupTimeHour=" + $("input[@name=opusPickupTimeHour]", scope).val() +
            "&opusPickupTimeMinutes=" + $("input[@name=opusPickupTimeMinutes]", scope).val() +
            "&opusPickupTimeStr=" + $("input[@name=opusPickupTimeStr]", scope).val();

	$(".bomSelection").each(function() {
		params = params + "&" + $(this).attr("name") + "=" + $(this).val();
	});

	var action = "addProduct";
	//see if this is an update.
  	if( $("input[@name=itemGUID]", scope).val() != "" ){
		params = params + "&itemGUID=" + $("input[@name=itemGUID]", scope).val() + "&isUpdate=1";
		action = "editProduct";
	}

   if( $("input[@name=onBasketPage]", scope).size() > 0 )
  		{ params = params + "&onBasketPage=" + $("input[@name=onBasketPage]", scope).val(); }

	if (prefix != undefined)
		params = params + "&prefix=" + prefix;

	  persistentCartIsShowing = false;
	  submitAddToCartForm = false;
	  showBasket(action,params);

}


function wishListAddToCart(params,refreshPage,refreshDelayTime) {
	showBasket('addProductWishlist',params,refreshPage,refreshDelayTime);
}

function wishListAddAllToCart(params,refreshPage,refreshDelayTime) {
	showBasket('addAllProductsWishlist',params,refreshPage,refreshDelayTime);
}

function addCatalogOrderItemsToCart() {
    params = "productId=" + $("input[@name=productId]").val() +
  		     "&itemNumber=" + $("input[@name=itemNumber]").val() +
  			 "&productName=" + $("input[@name=productName]").val() +
  			 "&productVariantId=" + $("input[@name=productVariantId]").val() +
  			 "&quantity=" + $("input[@name=quantity]").val();
    showBasket('addCatalogItems',params);
}

function addEnsembleToCart(type) {
	params =  "productName=" + $("input[@name=productName]").val() +
			  "&ensembleId=" + $("input[@name=ensembleId]").val() +
			  "&categoryId=" + $("input[@name=categoryId]").val() +
   	 		  "&parentCategoryId=" + $("input[@name=parentCategoryId]").val();

	// iterate through products in the ensemble for variant id
	$(".the-variant-ids").each(function() {
		params = params + "&" + $(this).attr("name") + "=" + $(this).val();
	});

	// iterate through products for qty
	$(".the-variant-qtys").each(function() {
		if( type == 'all' )
		{
		  $(this).val("1");
		  params = params + "&" + $(this).attr("name") + "=1";
		}
		else
		{ params = params + "&" + $(this).attr("name") + "=" + $(this).val(); }
	});

	// iterate through products variant count
	$(".the-variant-count").each(function() {
		params = params + "&" + $(this).attr("name") + "=" + $(this).val();
	});

	params = params + "&productCount=" + $(".the-variant-ids").length;

	persistentCartIsShowing = false;
	showBasket('addEnsemble',params);
}

function setUserZipCodePC(refresh)  {
    var params = "ts=" + timestamp() + "&action=updateUserZipCode" +
                 "&storesListZipCode=" +  $("input[@name=storesListZipCodePC]").val() +
                 "&storesListLatitude=" +  $("input[@name=storesListLatitudePC]").val() +
                 "&storesListLongitude=" +  $("input[@name=storesListLongitudePC]").val();
    var requestURL = persistentCartCommands[7];

    $.ajax({
		type: "GET",
		url: requestURL,
		data: params,
		dataType: "json",
      	timeout: 15000,
		success: function(data) {
			if(data.validZip){
    			if (refresh) {
					showBasket('show', '');
				}
				return true;
			}else{
				alert(data.result);
				return false;
			}
		},
		error: function() {
			alert('There was an error trying to save your zip code.');
			return false;
		}
	});

}

// Edit this per site to adjust location
function adjustDivLocation(divToAdjust) {
	var bWindowOffsets = getScrollXY();
	var bWindowViewport = getViewportSize();
	var qvTop = ((bWindowViewport[1] / 2) - ($(divToAdjust).height() / 2)) + bWindowOffsets[1];
	qvTop = (qvTop < 0) ? 100 : qvTop;
	$(divToAdjust).css("top",qvTop+"px");
	$(divToAdjust).css("left","50%");
	$(divToAdjust).css("margin-left",-($(divToAdjust).width()/2));
}

// Helper Function(s)
function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
}

function getViewportSize() {
  var vpW = 0, vpH = 0;
  if (typeof window.innerWidth != 'undefined')
  {
    vpW = window.innerWidth,
    vpH = window.innerHeight
  }
  else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
  {
    vpW = document.documentElement.clientWidth,
    vpH = document.documentElement.clientHeight
  }
  else
  {
    vpW = document.getElementsByTagName('body')[0].clientWidth,
    vpH = document.getElementsByTagName('body')[0].clientHeight
  }
  return [  vpW, vpH ];
}

function errorAppend(area,msg) {
	$(area).html(msg.replace(/&amp;/g, "&").replace(/&lt;/g,
        "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'"));
	$(area).show();
}

function resetErrorFields() {
	$(".glo-tex-error").hide();
	$(".glo-tex-error").html("");
}

function messageAppend(area,msg) {
	$(area).html(msg);
	$(area).show();
}

function resetMessageFields() {
	$(".glo-tex-info").hide();
}

function clearAllTimeouts() {
	for(x = 0; x < hideTimeOuts.length; x++)
	{ clearTimeout(hideTimeOuts[x]); }
}

function timestamp() {
	return new Date().getTime();
}

function loadQuickView(overlayURL)
{
	if (typeof OverlayWidget != "undefined")
 		OverlayWidget.show("#headerOverlay", null, { sourceURL : overlayURL });
}

function hideQuickView()
{
	if (typeof OverlayWidget != "undefined") { OverlayWidget.hideAll(); }
}

function loadOverlay(overlay, overlayURL)
{
	if (typeof OverlayWidget != "undefined")
 		OverlayWidget.show(overlay, null, { sourceURL : overlayURL });
}

function containsChar(arr, value){
	for (var i=0; i < arr.length; i++){
		if (arr[i]==value) return true;
	}
	 return false;
}

function calcPrice(strTemp){
	var messageCost = document.getElementById("myOwnMessageCost");
	var messageCostDisplay = document.getElementById("messageSkuCost");
	var zoneCostDisplay = document.getElementById("zoneCost_" + document.getElementById("zoneCode").value);
	var fontCostDisplay = document.getElementById("fontSkuCost");
	var colorCostDisplay = document.getElementById("colorSkuCost");
	var designCostDisplay = document.getElementById("designCost");
	var totalCostDisplay1 = document.getElementById("totalCost1");
	var totalCostDisplay2 = document.getElementById("totalCost2");

	var totalItemCost = getCostInCents(document.getElementById("totalItemPrice"));
	var photoCostElements = [];
	$("dd[id^='photoCost']").each(function() {
    	photoCostElements.push(this);
	});
	var photoCost = 0;
	if (photoCostElements && photoCostElements.length) {
		for (pIndex = 0; pIndex < photoCostElements.length; pIndex++) {
			photoCost = photoCost + getCostInCents(photoCostElements[pIndex]);
		}
	} else {
	    photoCost = getCostInCents(document.getElementById("photoCost"));
	}
	var fontCost = getCostInCents(fontCostDisplay);
	var colorCost = getCostInCents(colorCostDisplay);
	var designCost = getCostInCents(designCostDisplay);

   if (fontCost == ''){
		fontCost = 0;
	}
   if (colorCost == ''){
		colorCost = 0;
	}
   if (designCost == ''){
		designCost = 0;
	}
   if (strTemp != undefined && $('#defaultTextareaMessage').val() != 'Enter your message here.'){

		//Hardline prices
      var priceWord = hPriceWord;
		var priceMax = hPriceMax;
		var priceMin = hPriceMin;
		var excludeLength = hExcludeLength;
		var excludeChars = hExcludeChars;

		var sku = $("#messageSku").val();
		if (sku == '219396'){
         priceWord = sPriceWord;
			priceMax = sPriceMax;
			priceMin = sPriceMin;
			excludeLength = sExcludeLength;
			excludeChars = sExcludeChars;
		}

      var excludeCharsArr = excludeChars.split(",");
   	strTemp = trim(strTemp);
        //replace all new line character by ' '
        strTemp = strTemp.replace(new RegExp( "\\n", "g" ),' ');
        //replace all carriage return character by ' '
        strTemp = strTemp.replace(new RegExp( "\\n", "g" ),' ');
		var myPrc = strTemp.split(' ');
		var qCalc = 0;
		for (i=0; i < myPrc.length; i++){
            var tmpMess = myPrc[i];
            //remove whitespace character
            tmpMess = tmpMess.replace(new RegExp(' ', "g" ),'');
            if (tmpMess.length > excludeLength || (tmpMess.length == excludeLength && excludeLength > 0 && !containsChar(excludeCharsArr, tmpMess))){
					qCalc++;
				}
         }
	   // calculate # of usable words
	   var curPr = (priceWord)*qCalc;
		var mCost = 0;
	   if (curPr>priceMin){
			// display curPr as price.
			if (curPr < priceMax){
				mCost = curPr;
			}else{
				mCost = priceMax;
			}
		} else {
			// display priceMin as price
			mCost = priceMin;
		}
		messageCostDisplay.innerHTML = formatAmount(mCost/100);
		messageCost.value=mCost/100;


	}else if ($('#defaultTextareaMessage').val() == 'Enter your message here.'){
		messageCostDisplay.innerHTML = "";
		messageCost.value=0;
		mCost = 0;
	}
		//Update zone cost
		var zoneCost = fontCost + colorCost + designCost + parseFloat(mCost);
		zoneCostDisplay.innerHTML = formatAmount(zoneCost/100);

      var totalCost = totalItemCost + photoCost +  parseFloat(zoneCost);
      for (k=0; k< zoneCodeArray.length; k++){
			if (zoneCodeArray[k] != document.getElementById("zoneCode").value){
				totalCost = totalCost + getCostInCents(document.getElementById("zoneCost_" + zoneCodeArray[k]));
			}
		}
		totalCostDisplay1.innerHTML = formatAmount(totalCost/100);
		totalCostDisplay2.innerHTML = totalCostDisplay1.innerHTML;
}


function formatAmount(value){
	//if (value.toFixed)
	value = value.toFixed(2);

	value = new String(value);
	myArr2 = value.split(".");

	if (myArr2.length == 1){
		value = "$"+value + ".00";
	}else if(myArr2[1].length >1){
	   value = "$"+value;
	} else {
		value = "$"+value + "0";
	}

	return value;
}

function getCostInCents(costElement){
	var cost = 0;
	if (costElement != undefined){
		var cost = costElement.innerHTML.substring(1,costElement.innerHTML.length);
      if (cost != ""){
			cost = parseFloat(cost) * 100;
	  } else {
	  	cost = 0;
	  }
	}
	return cost;
}

   function showFreeGiftOptionLayer1stTab(productId, action, itemTotal) {
		var success = validateForm(".zoneBody");
		if (success == false){
			return false;
		} else {

			// recheck again
			var zoneCode = $("#zoneCode").val();
			var freeGiftZoneCode = $("#freeGiftZoneCode").val();

			var freeGiftZoneCostDisplay = document.getElementById("zoneCost_" + freeGiftZoneCode);
			var freeGiftZoneCostInCents = getCostInCents(freeGiftZoneCostDisplay);
			var isFreeGiftZone = $("#isFreeGiftZone").val();
			var hasFreeGiftZone = $("#hasFreeGiftZone").val();

			var minPersonalizationChargeInCents = parseFloat(getMinPersonalizationChargeCost()) * 100;

			var messageType = $('#messageSku :selected').text();

			var designCost = '';
			var designCostValueInCents = 0;
	 			try {
				if ($('#designCost')) {
					designCost = $('#designCost').text();
					if(designCost != 'undefined' && designCost.length > 0) {
						designCostValueInCents = parseInt(designCost.substring(1, designCost.indexOf("."))) * 100;
					}
				}
			} catch (err) {
			}

			if (hasFreeGiftZone == 'true' && ((freeGiftZoneCostInCents < minPersonalizationChargeInCents) || (messageType == 'Do Not Personalize' && (designCost == ''  || designCost == '$0.00' || designCostValueInCents < minPersonalizationChargeInCents)))) {
				$("#free-gift-option-btn").show();
				$("#zoneAddToBag").hide();
		   		lib.layer.create("#freeGiftOptionLayer", {
					defaultContent : "",
					url : '/catalog/includes/free_gift_options.jsp' + "?productId=" + productId + "&minPersonalizationChargeCost=" + minPersonalizationChargeCost + "&_action=" + action + "&itemTotal=" + itemTotal + "&_callingPlace=1stTab",
					keepCentered : true
				});
				return false;
			}
			else {
				$("#free-gift-option-btn").hide();
				$("#zoneAddToBag").show();

				savePersonalization('.zoneBody',action);

			  	updateInventoryStatus();
			  	$('#image-block').show(); // show image container
			  	saveZoneInfo = false;
			  	submitAddToCartForm = true;
			  	savePhotoInfo = false;
			  	resetErrorFields();
			  	$("#productTabs").tabs({ selected: 1,cache: false,ajaxOptions: { cache : false }});
				//return true;
			}

		}
	}

   function showFreeGiftOptionLayer2ndTab(productId, action, itemTotal) {
		var success = validateForm(".zoneBody");
		if (success == false){
			return false;
		} else {

			// recheck again
			var zoneCode = $("#zoneCode").val();
			var freeGiftZoneCode = $("#freeGiftZoneCode").val();

			var freeGiftZoneCostDisplay = document.getElementById("zoneCost_" + freeGiftZoneCode);
			var freeGiftZoneCostInCents = getCostInCents(freeGiftZoneCostDisplay);
			var isFreeGiftZone = $("#isFreeGiftZone").val();
			var hasFreeGiftZone = $("#hasFreeGiftZone").val();

			var minPersonalizationChargeInCents = parseFloat(getMinPersonalizationChargeCost()) * 100;

			var messageType = $('#messageSku :selected').text();

			var designCost = '';
			var designCostValueInCents = 0;
	 			try {
				if ($('#designCost')) {
					designCost = $('#designCost').text();
					if(designCost != 'undefined' && designCost.length > 0) {
						designCostValueInCents = parseInt(designCost.substring(1, designCost.indexOf("."))) * 100;
					}
				}
			} catch (err) {
			}

			if (hasFreeGiftZone == 'true' && ((freeGiftZoneCostInCents < minPersonalizationChargeInCents) || (messageType == 'Do Not Personalize' && (designCost == ''  || designCost == '$0.00' || designCostValueInCents < minPersonalizationChargeInCents)))) {
				$("#free-gift-option-btn").show();
				$("#zoneAddToBag").hide();
		   		lib.layer.create("#freeGiftOptionLayer", {
					defaultContent : "",
					url : '/catalog/includes/free_gift_options.jsp' + "?productId=" + productId + "&minPersonalizationChargeCost=" + minPersonalizationChargeCost + "&_action=" + action + "&itemTotal=" + itemTotal + "&_callingPlace=2ndTab",
					keepCentered : true
				});
				return false;
			}
			else {
				$("#free-gift-option-btn").hide();
				$("#zoneAddToBag").show();

				savePersonalization('.zoneBody',action);

			  	$('#image-block').show();
				removeCartOpenClass();
				savePhotoInfo = true;
				saveZoneInfo = false;
				$("#productTabs").tabs({ selected: 2,cache: false,ajaxOptions: { cache : false }});
				//return true;
			}

		}
	}

	   function showFreeGiftOptionLayerOtherTabs(productId, action, itemTotal, index) {
		var success = validateForm(".zoneBody");
		if (success == false){
			return false;
		} else {

			tabIndex = index;

			// recheck again
			var zoneCode = $("#zoneCode").val();
			var freeGiftZoneCode = $("#freeGiftZoneCode").val();

			var freeGiftZoneCostDisplay = document.getElementById("zoneCost_" + freeGiftZoneCode);
			var freeGiftZoneCostInCents = getCostInCents(freeGiftZoneCostDisplay);
			var isFreeGiftZone = $("#isFreeGiftZone").val();
			var hasFreeGiftZone = $("#hasFreeGiftZone").val();

			var minPersonalizationChargeInCents = parseFloat(getMinPersonalizationChargeCost()) * 100;

			var messageType = $('#messageSku :selected').text();

			var designCost = '';
			var designCostValueInCents = 0;
	 			try {
				if ($('#designCost')) {
					designCost = $('#designCost').text();
					if(designCost != 'undefined' && designCost.length > 0) {
						designCostValueInCents = parseInt(designCost.substring(1, designCost.indexOf("."))) * 100;
					}
				}
			} catch (err) {
			}

			if (hasFreeGiftZone == 'true' && ((freeGiftZoneCostInCents < minPersonalizationChargeInCents) || (messageType == 'Do Not Personalize' && (designCost == ''  || designCost == '$0.00' || designCostValueInCents < minPersonalizationChargeInCents)))) {
				$("#free-gift-option-btn").show();
				$("#zoneAddToBag").hide();
		   		lib.layer.create("#freeGiftOptionLayer", {
					defaultContent : "",
					url : '/catalog/includes/free_gift_options.jsp' + "?productId=" + productId + "&minPersonalizationChargeCost=" + minPersonalizationChargeCost + "&_action=" + action + "&itemTotal=" + itemTotal + "&_callingPlace=3rdTab",
					keepCentered : true
				});
				return false;
			}
			else {
				$("#free-gift-option-btn").hide();
				$("#zoneAddToBag").show();

				savePersonalization('.zoneBody',action);

				 $('#image-block').show(); // show image container
				 submitAddToCartForm = true;
				 saveZoneInfo = false;
				 savePhotoInfo = false;
				 $("#productTabs").tabs({ selected: index,cache: false,ajaxOptions: { cache : false }});
				//return true;
			}

		}
	}

function showFreeGiftOptionLayerZoneSelect(productId, action, itemTotal, nextZoneId) {
	var success = validateForm(".zoneBody");
	if (success == false){
		return false;
	} else {

		// recheck again
		var zoneCode = $("#zoneCode").val();
		var freeGiftZoneCode = $("#freeGiftZoneCode").val();

		var freeGiftZoneCostDisplay = document.getElementById("zoneCost_" + freeGiftZoneCode);
		var freeGiftZoneCostInCents = getCostInCents(freeGiftZoneCostDisplay);
		var isFreeGiftZone = $("#isFreeGiftZone").val();
		var hasFreeGiftZone = $("#hasFreeGiftZone").val();

		var minPersonalizationChargeInCents = parseFloat(getMinPersonalizationChargeCost()) * 100;

		var messageType = $('#messageSku :selected').text();

		var designCost = '';
		var designCostValueInCents = 0;
 			try {
			if ($('#designCost')) {
				designCost = $('#designCost').text();
				if(designCost != 'undefined' && designCost.length > 0) {
					designCostValueInCents = parseInt(designCost.substring(1, designCost.indexOf("."))) * 100;
				}
			}
		} catch (err) {
		}

		if (hasFreeGiftZone == 'true' && ((freeGiftZoneCostInCents < minPersonalizationChargeInCents) || (messageType == 'Do Not Personalize' && (designCost == ''  || designCost == '$0.00' || designCostValueInCents < minPersonalizationChargeInCents)))) {
			$("#free-gift-option-btn").show();
			$("#zoneAddToBag").hide();
	   		lib.layer.create("#freeGiftOptionLayer", {
				defaultContent : "",
				url : '/catalog/includes/free_gift_options.jsp' + "?productId=" + productId + "&minPersonalizationChargeCost=" + minPersonalizationChargeCost + "&_action=" + action + "&itemTotal=" + itemTotal + "&_callingPlace=" + nextZoneId,
				keepCentered : true
			});
			return false;
		}
		else {
			$("#free-gift-option-btn").hide();
			$("#zoneAddToBag").show();
			$("#nextZoneId").val(nextZoneId);
			savePersonalization('.zoneBody',action);
			//return true;
		}

	}
}

   function uploadImageEdit(photoSequence) {
   		$("#newURL").val("");
   		$("#photoSequence").val(photoSequence);
 		$("#resolutionAcceptable").val($("#resolutionAcceptables_" + photoSequence).val());
		$("#resolutionMessage").val($("#resolutionMessages_" + photoSequence).val());
		$("#selectedFileName").val($("#uploadImageNames_" + photoSequence).val());
		$("#uniqueFileName").val($("#uniqueFileNames_" + photoSequence).val());
		var cropPreset = $("#div_cropPreset_" + photoSequence).text();

        var imageSrc = '/get_image.cmd?UNIQUE_FILENAME=' + $("#uniqueFileNames_" + photoSequence).val();
        var params = '';
		$.ajax({
			type: "POST",
			url: "/ajax/aviary_credentials.jsp",
			data: params,
			dataType: "json",
			timeout: 15000,
			success: function(data) {
				launchEditor("real_size_uploaded_image_" + photoSequence, cropPreset, data.salt, data.timestamp, data.signature, imageSrc);
				return true;
			},
			error: function() {
				return false;
			}
		});
   }

	function showResponse(data, statusText)  {
		if (statusText == 'success') {
			$("#error-photoUpload").html("");
			$('#errors').html($(data).find("#errors").html());
			if ($('#errors').html() == null || !$('#errors').html().trim())	{
				var photoSequence = $(data).find(".photo-sequence").html();
				var file_name = $(data).find(".file-name").html();
				var unique_file_name = $(data).find(".unique-file-name").html();
 				//$('.file-name').html($(data).find(".file-name").html());
 				$('.file-name').text(file_name).html();
				$("input[@id=uploadImageNames_" + photoSequence + "]").val($(data).find(".full-file-name").html());
				$("input[@id=resolutionAcceptables_" + photoSequence + "]").val($(data).find(".resolution-acceptable").html());
				$("input[@id=uniqueFileNames_" + photoSequence + "]").val($(data).find(".unique-file-name").html());
				$('.resolution-icon').html($(data).find(".resolution-icon").html());
				$('.message-detail').html($(data).find(".message-detail").html());
				var resolutionMessage = $(data).find(".resolution-message").html();
				$("input[@id=resolutionMessages_" + photoSequence + "]").val(resolutionMessage);
				$("input[@id=photoSequences_" + photoSequence + "]").val(photoSequence);
				var imageSrc = '/get_image.cmd?UNIQUE_FILENAME=' + unique_file_name;
				$("#uploaded_image_" + photoSequence).attr("src", imageSrc);
                $("#real_size_uploaded_image_" + photoSequence).attr("src", imageSrc);

				//$("#upload_image_" + photoSequence).css("display", "none");
                $("#div_" + photoSequence).css("display", "none");
				$("#uploaded_image_" + photoSequence).css("display", "block");
				$("#upload_message_div_" + photoSequence).css("display", "none");
				$("#upload_control_div_" + photoSequence).css("display", "block");

				var resolutionAcceptable = $(data).find(".resolution-acceptable").html();
				var str = "Resolution: " + $(data).find(".resolution-icon").html();
				if ("Y" != resolutionAcceptable) {
					str += "<br/><font color='#FF0000'><b>Quality Alert</b></font>";
				}
				$("#resolution_td_" + photoSequence).html(str);

				$("#resolutionAcceptable").val(resolutionAcceptable);
				$("#resolutionMessage").val($(data).find(".resolution-message-str").html());
				$("#selectedFileName").val($(data).find(".full-file-name").html());
				$("#uniqueFileName").val($(data).find(".unique-file-name").html());

                $("input[@id=fileUploadItem_" + photoSequence+"]").val("");

                highlightResolutionText();

                $('.get-photo').hide();
                var isPhotoUpload = $(data).find(".is-photo-upload").html();
                var cropPresets = $(data).find(".crop-preset").html();
                if (isPhotoUpload == "Y") {
			        var params = '';
					$.ajax({
						type: "POST",
						url: "/ajax/aviary_credentials.jsp",
						data: params,
						dataType: "json",
						timeout: 15000,
						success: function(data) {
							launchEditor("real_size_uploaded_image_" + photoSequence, cropPresets, data.salt, data.timestamp, data.signature, imageSrc);
							return true;
						},
						error: function() {
							return false;
						}
					});
                }

                $("#div_crop").css("display", "block");
                if (numberOfPhotos > 0) {
                  var numberOfUploadedPhoto = 0;
                  $(".uploaded-img").each(function() {
                       if (this.src != '' && this.src != undefined && this.src.indexOf("/get_image.cmd?UNIQUE_FILENAME=") >= 0) {
                          numberOfUploadedPhoto++;
                       }
                  });
                  if (numberOfUploadedPhoto == numberOfPhotos) {
                      $("#div_last_uploaded").css("display", "block");
                      $('.photo-upload-detail').show();
                  } else {
                     if (isPhotoUploadRequired == 'false') {
                         $('.photo-upload-detail').show();
                     } else {
                          $('.photo-upload-detail').hide();
                     }
                  }
                }
                if (isPhotoUploadRequired == 'false') {
                    $('.photo-upload-detail').show();
                }

                var isValidImage = true;
                if(file_name != 'undefined' && file_name.lastIndexOf(".") > 0) {
                    var selectedFileNameExt = file_name.substring(file_name.lastIndexOf("."));
                    if(selectedFileNameExt.toLowerCase() == ".tif" || selectedFileNameExt.toLowerCase() == ".tiff") {
            			isValidImage = false;
                	}
                }

                if(jQuery.browser.version.substring(0, 2) == "8."
                    || ((navigator.userAgent.indexOf('Chrome') != -1 || navigator.userAgent.indexOf('Firefox') != -1) && !isValidImage)) {
                	$("#edit-photo-icon_" + photoSequence).css("display", "none");
                  $("#edit-photo-text_" + photoSequence).css("display", "none");
                } else {
                	$("#edit-photo-icon_" + photoSequence).css("display", "block");
                  $("#edit-photo-text_" + photoSequence).css("display", "block");
                }
			}
		}
	}

function stringEndsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function launchEditor(id, cropPreset, vSalt, vTimestamp, vSignature, highResUrl) {
  //alert("Salt : " + vSalt + " >>> Timestamp : " + vTimestamp + " >>> vSignature : " + vSignature);

    var isValidImage = true;
    var selectedFileName = $("#selectedFileName").val();
    if(selectedFileName != 'undefined' && selectedFileName.indexOf(".") > 0) {
        var selectedFileNameExt = selectedFileName.substring(selectedFileName.indexOf("."));
        if(selectedFileNameExt == ".tif" || selectedFileNameExt == ".tiff" || selectedFileNameExt == ".TIF" || selectedFileNameExt == ".TIFF") {
          if (navigator.userAgent.indexOf('Chrome') != -1 || navigator.userAgent.indexOf('Firefox') != -1) {
          isValidImage = false;
          }
      }
    }

    if(jQuery.browser.version.substring(0, 2) != "8." && isValidImage) {
		if (cropPreset != undefined && cropPreset != '') {
			featherEditor.launch({
				timestamp: vTimestamp,
				salt: vSalt,
				encryptionMethod: 'sha256',
				signature: vSignature,
				image: id,
				initTool: 'crop',
				cropPresets: [cropPreset],
                cropPresetDefault: cropPreset,
                cropPresetsStrict: true
			});
		} else {
			featherEditor.launch({
				timestamp: vTimestamp,
				salt: vSalt,
				encryptionMethod: 'sha256',
				signature: vSignature,
				image: id,
				initTool: '',
                cropPresetsStrict: true
			});
		}
	}
	return false;
}

    function validateFile(sequence) {
    if($('input[id=fileUploadItem_' + sequence + ']').val() != ''){
      $("#newURL").val("");
      $("#photoSequence").val(sequence);
      var options = {
          beforeSubmit:  showRequest,
          success:       showResponse,
          dataType:  'html'
        };
      $('#photoUploadForm').ajaxSubmit(options);
    }
    return false;
  }

  function showRequest(formData, jqForm, options) {
    return true;
  }

function checkForISPAndPhoto(select, id, orderIndex, itemIndex, oldValue) {
	 var selectedValue = select.options[select.selectedIndex].value;
	 if (selectedValue.indexOf('S') > -1 && oldValue != undefined && oldValue.indexOf('S') < 0) {
        lib.layer.create("#ispSelectWarningLayer", {
        defaultContent : "",
        url : '/catalog/includes/select_isp_warning.jsp?messageType=1&oldValue=' + oldValue + '&orderIndex=' + orderIndex + '&itemIndex=' + itemIndex + '&itemUUID=' + id,
        keepCentered : true
      });
    //lib.layer.create("#ispSelectWarningLayer", {
	//	defaultContent : "",
	//	keepCentered : true
	//});
   // add modal to prevent clicking on other areas.
	//$('#ispSelectWarningLayer').jqm({ajax: '/catalog/includes/select_isp_warning.jsp?messageType=1&oldValue=' + oldValue + '&orderIndex=' + orderIndex + '&itemIndex=' + itemIndex + '&itemUUID=' + id, modal:true});
	//$('#ispSelectWarningLayer').jqmShow();
  	   return false;

	 }
     checkForISP(select, id, orderIndex, itemIndex);
}

function checkForISPOther(id, orderIndex, itemIndex) {
    var select = document.getElementById(id + "_select");
    hideIspSelectWarningLayer();
    checkForISP(select, id, orderIndex, itemIndex);
}

function hideIspSelectWarningLayer(){
  var myClose = function(hash) { hash.w.fadeOut('2000',function(){ hash.o.remove(); }); };
  $('#ispSelectWarningLayer').jqm({onHide:myClose});
  $('#ispSelectWarningLayer').jqmHide();
  lib.layer.remove("#ispSelectWarningLayer");
}

function showIspSelectWarningDialogProductDetail(fromScreen, jsAction, isPersonalize) {
      lib.layer.create("#ispSelectWarningLayer", {
        defaultContent : "",
        //url : '/catalog/includes/select_isp_warning.jsp?messageType=1&oldValue=' + oldValue + '&orderIndex=' + orderIndex + '&itemIndex=' + itemIndex + '&itemUUID=' + id,
        url : '/catalog/includes/select_isp_warning.jsp?fromScreen=' + fromScreen + '&jsAction=1' + '&isPersonalize=' + isPersonalize,
        keepCentered : true
      });
      return false;
}

function showIspSelectWarningDialogOther() {
      lib.layer.create("#ispSelectWarningLayer", {
        defaultContent : "",
        url : '/catalog/includes/select_isp_warning.jsp?messageType=1&oldValue=1',
        keepCentered : true
      });
      return false;
}

function processPhotoUploadClickNotPersonalize(jsAction) {
      var selectedValue = $('input:radio[name=shipOrPickupRadio]:checked').val();
      if (selectedValue != '') {
        if (selectedValue == "TR") {
                $('#goToPhotoUpload').val('true');
                updateShipLocation();
                addToCart('.EntityBody');
                return true;
        }
      }
  var radioComp = $('input:radio[name=shipLocationRadio]:checked');
    if (radioComp != undefined) {
        selectedValue = radioComp.val();
        if (selectedValue != ''  && selectedValue != undefined) {
          if (selectedValue == "TR") {
                $('#goToPhotoUpload').val('true');
                updateShipLocation();
                addToCart('.EntityBody');
                return true;
          } else {
                var jsAction = "$('#photo-upload-layout').show();$('#goToPhotoUpload').val('true');updateShipLocation();addToCart('.EntityBody', this);"
                showIspSelectWarningDialogProductDetail('ProductDetail', jsAction, 'N');
                return false;
          }
        } else {
                $('#goToPhotoUpload').val('true');
                updateShipLocation();
                addToCart('.EntityBody');
                return true;
        }
    } else {
                $('#goToPhotoUpload').val('true');
                updateShipLocation();
                addToCart('.EntityBody');
                return true;
    }
}

function processPhotoUploadClickPersonalize(jsAction) {
var selectedValue = $('input:radio[name=shipOrPickupRadio]:checked').val();
      if (selectedValue != '') {
        if (selectedValue == "TR") {
                $('#goToPhotoUpload').val('true');
                updateShipLocation();
                addToCart('.EntityBody');
                return true;
        }
      }
  var radioComp = $('input:radio[name=shipLocationRadio]:checked');
    if (radioComp != undefined) {
        var selectedValue = radioComp.val();
        if (selectedValue != '' && selectedValue != undefined) {
          if (selectedValue == "TR") {
                $('#photo-upload-layout').show();
                $('#goToPhotoUpload').val('true');
                updateShipLocation();
                addToCart('.EntityBody');
                return true;
          } else {
                var jsAction = "$('#photo-upload-layout').show();$('#goToPhotoUpload').val('true');updateShipLocation();addToCart('.EntityBody', this);"
                showIspSelectWarningDialogProductDetail('ProductDetail', jsAction, 'Y');
                return false;
          }
        } else {
                $('#photo-upload-layout').show();
                $('#goToPhotoUpload').val('true');
                updateShipLocation();
                addToCart('.EntityBody');
                return true;
        }
    } else {
                $('#photo-upload-layout').show();
                $('#goToPhotoUpload').val('true');
                updateShipLocation();
                addToCart('.EntityBody');
                return true;
    }
}

function sendToMyselfCheckboxClicked() {
    if ($("input[@name=sendToMyself]").attr('checked') == true) {
      $("input[@name=sendersName]").attr('disabled', 'disabled').addClass('disabled').val('');
      $("input[@name=recipientEmail]").attr('disabled', 'disabled').addClass('disabled').val('');
      $("input[@name=recipientName]").attr('disabled', 'disabled').addClass('disabled').val('');
      $("#optionalMessage").attr('disabled', 'disabled').addClass('disabled').val('');
    } else {
      $("input[@name=sendersName]").removeAttr('disabled').removeClass('disabled');
      $("input[@name=recipientEmail]").removeAttr('disabled').removeClass('disabled');
      $("input[@name=recipientName]").removeAttr('disabled').removeClass('disabled');
      $("#optionalMessage").removeAttr('disabled').removeClass('disabled');
    }
  }

function btnSendClick() {
		$.ajax({
			type: "POST",
			url: '/custserv/store_locator_email.cmd',
			data: $("#emailForm").serialize(),
			success: function(data) {
				if (data == null || data.length == 0) {
                  closeEmailPopup();
                  var message = 'Email sent.';
                  setTimeout(function() {
              	  		lib.layer.create("#emailShowMessageLayer", {
	                        defaultContent : "",
	                        url : '/catalog/includes/show_message_layer.jsp?message=' + message,
	                        keepCentered : true
                      	});

                  		$(document).mouseup(function (e){
                    		if ($("#emailShowMessageLayer") != undefined && $("#emailShowMessageLayer").attr("id") != undefined) {
		                      	var myClose = function(hash) { hash.w.fadeOut('2000',function(){ hash.o.remove(); }); };
		                      	$('#emailShowMessageLayer').jqm({onHide:myClose});
		                      	$('#emailShowMessageLayer').jqmHide();
                    			lib.layer.remove("#emailShowMessageLayer");
                    		}
                  		});

                  		$(document).keyup(function (e){
                    		if ($("#emailShowMessageLayer") != undefined && $("#emailShowMessageLayer").attr("id") != undefined) {
                      			var myClose = function(hash) { hash.w.fadeOut('2000',function(){ hash.o.remove(); }); };
			                      $('#emailShowMessageLayer').jqm({onHide:myClose});
			                      $('#emailShowMessageLayer').jqmHide();
                   				lib.layer.remove("#emailShowMessageLayer");
                    		}
                  		});

                    	setTimeout(function() {
	                          var myClose = function(hash) { hash.w.fadeOut('2000',function(){ hash.o.remove(); }); };
	                          $('#emailShowMessageLayer').jqm({onHide:myClose});
	                          $('#emailShowMessageLayer').jqmHide();
	                          lib.layer.remove("#emailShowMessageLayer");
                    	}, 5000);
                  }, 500);

                } else {
					$("#email-popup-zip-container").html($(data).find("#email-popup-zip-container").html());
					$.ajax({
						type: "POST",
						url: '/ajax/recaptcha_display.jsp',
						data: { time: (new Date().getTime()) },
						dataType: "html",
						success: function(data) {
							if(data != null && data != "") {
								if(data != null && data != "") {
									$(".js-recaptcha").html(data);
								}
							}
						}
					});
                }
			}
		});
	}

function processCloseOrder(){
    var myClose = function(hash) { hash.w.fadeOut('2000',function(){ hash.o.remove(); }); };
    $('#emailShowMessageLayer').jqm({onHide:myClose});
    $('#emailShowMessageLayer').jqmHide();
    lib.layer.remove("#emailShowMessageLayer");
    closeStorePopup();
    printStoreOrder();
}
function submitStoreOrder() {
		$.ajax({
			type: "POST",
			url: '/custserv/store_special_order.cmd',
			data: $("#storeOrderForm").serialize(),
			success: function(data) {
				if (data == null || data.length == 0) {
                  //remove error message
                  $("#store-special-order-container .common-error").remove();
                  var message = 'Special Order Sent.';
                  var callBackFunc = 'processCloseOrder()';
                  setTimeout(function() {
              	  		lib.layer.create("#emailShowMessageLayer", {
	                        defaultContent : "",
	                        url : '/catalog/includes/show_message_layer.jsp?showCloseButton=true&message=' + message + '&callBackFunc=' + callBackFunc,
	                        keepCentered : true
                      	});
                  }, 500);

                } else {
					$("#store-special-order-container").html($(data).find("#store-special-order-container").html());
                    $('#bntSubmitOrder').click(function(evt) {
                        submitStoreOrder();
                    });
                    $('.shipToOption').click(function(evt) {
                        shipToClicked(this);
                    });
                }
			}
		});
	}

function btnMakeHomeStoreClick(storeId) {
    var oldStoreId = $(".myStoreLink").attr('store_id');
	$.ajax({
		type: "POST",
		url: '/custserv/save_user_store.cmd',
		data: $("#saveStoreForm").serialize(),
		success: function(data) {
               makeMyStoreComplete(storeId, oldStoreId);
           }
	});
}

function makeMyStoreComplete(storeId, oldStoreId) {
	var $myStoreLink = $(".myStoreLink");
    var location = true;
  	if ($myStoreLink != null && $myStoreLink != undefined) {
	    $myStoreLink.text("Make Home Store");
	    $myStoreLink.removeAttr("onclick");
	    $myStoreLink.unbind('click');
	    $myStoreLink.click(function(){ saveMyStore(oldStoreId); });
	    $myStoreLink.css({"text-decoration": "none", "white-space": "nowrap"});
	    $myStoreLink.removeAttr("class");
	    $myStoreLink.attr("class", "activeLink");

    	changeStoreBubble(storeId, oldStoreId);

   		$("#myStoreLinkId_" + storeId).text("Home Store").attr({"class": "myStoreLink", "href": "#"});
    	$(".myStoreLink").click = function() {
      		return false;
    	};
    	getHomeStore(location);
  	}
}

function changeStoreBubble(storeId, oldStoreId){
	var storeListIconNew = $('.store-icon-' + storeId).find('img'),//Store DOM new Home Store
    	bubbleImgNew = storeListIconNew.attr('src').replace('|FF0000|000000', '|5580A8|ffffff'),//Get img src and set to home store image.
    	mapMarkerNew = markers.items[storeId].getIcon().replace('|FF0000|000000', '|5580A8|ffffff');//Get Map Makrer for new home store.

    storeListIconNew.attr('src', bubbleImgNew);//Change IMG SRC to new image.
    markers.items[storeId].setIcon(mapMarkerNew);//Change map marker to new image.

    //Make sure we have a old store to change.
    if(typeof oldStoreId != "undefined" && oldStoreId != '' && oldStoreId != null){
	    var storeListIconOld = $('.store-icon-' + oldStoreId).find('img'),//Store DOM old Home Store
		    bubbleImgOld = storeListIconOld.attr('src').replace('|5580A8|ffffff', '|FF0000|000000'),//Get img src and set to non home store image.
		    mapMarkerOld = markers.items[oldStoreId].getIcon().replace('|5580A8|ffffff', '|FF0000|000000');//Get Map Makrer for old home store.

		storeListIconOld.attr('src', bubbleImgOld);//Change IMG SRC to new image.
	   	markers.items[oldStoreId].setIcon(mapMarkerOld);//Change map marker to new image.
	}



}

function btnSendTextClick() {
    $.ajax({
      type: "POST",
      url: '/custserv/store_locator_text.cmd',
      data: $("#textForm").serialize(),
      success: function(data) {

        if (data != null && data.length > 0) {
                  var msg = $(data).find(".common-error").html();

                  if (msg == null || msg.length == 0) {
                      closeTextPopup();
                      var message = 'Text Message Sent';
                      setTimeout(function() {
                      lib.layer.create("#emailShowMessageLayer", {
                            defaultContent : "",
                            url : '/catalog/includes/show_message_layer.jsp?message=' + message,
                            keepCentered : true
                          });

                      $(document).mouseup(function (e)
                      {
                        if ($("#emailShowMessageLayer") != undefined && $("#emailShowMessageLayer").attr("id") != undefined) {
                          var myClose = function(hash) { hash.w.fadeOut('2000',function(){ hash.o.remove(); }); };
                          $('#emailShowMessageLayer').jqm({onHide:myClose});
                          $('#emailShowMessageLayer').jqmHide();
                          lib.layer.remove("#emailShowMessageLayer");
                        }
                      });

                      $(document).keyup(function (e)
                      {
                        if ($("#emailShowMessageLayer") != undefined && $("#emailShowMessageLayer").attr("id") != undefined) {
                          var myClose = function(hash) { hash.w.fadeOut('2000',function(){ hash.o.remove(); }); };
                          $('#textShowMessageLayer').jqm({onHide:myClose});
                          $('#textShowMessageLayer').jqmHide();
                          lib.layer.remove("#emailShowMessageLayer");
                        }
                      });

                        setTimeout(function() {
                              var myClose = function(hash) { hash.w.fadeOut('2000',function(){ hash.o.remove(); }); };
                              $('#emailShowMessageLayer').jqm({onHide:myClose});
                              $('#emailShowMessageLayer').jqmHide();
                              lib.layer.remove("#emailShowMessageLayer");
                        }, 5000);
                      }, 500);
                  } else {
                    $("#text-popup-zip-container").html($(data).find("#text-popup-zip-container").html());
                    $.ajax({
                      type: "POST",
                      url: '/ajax/recaptcha_display.jsp',
                      data: { time: (new Date().getTime()) },
                      dataType: "html",
                      success: function(data) {
                        if(data != null && data != "") {
                          if(data != null && data != "") {
                            $(".js-recaptcha").html(data);
                          }
                        }
                      }
                    });
                  }
                } else {
                  $("#text-popup-zip-container").html($(data).find("#text-popup-zip-container").html());
                  $.ajax({
                    type: "POST",
                    url: '/ajax/recaptcha_display.jsp',
                    data: { time: (new Date().getTime()) },
                    dataType: "html",
                    success: function(data) {
                      if(data != null && data != "") {
                        if(data != null && data != "") {
                          $(".js-recaptcha").html(data);
                        }
                      }
                    }
                  });
                }
      }
    });
  }