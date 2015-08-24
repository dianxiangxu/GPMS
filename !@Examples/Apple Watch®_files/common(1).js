var tmgArrSelectedCampaigns = new Array();
var tmgArrCurrentDisplayCamps = new Array();
var tmgArrPreviousDisplayCamps = new Array();
var tmgActiveCampaignId = 0;
var tmgArrEmptyFields = new Array();
var tmgArrNotEmptyFields = new Array();
var tmgCellPhoneRegExp = "^\\d{8,10}$";
var tmgStringRegExp = "^[a-zA-Z]{1}[a-zA-Z' ]{2,30}$";
var tmgAlphaNumericRegExp = "^[a-zA-Z]{1}[a-zA-Z0-9]{2,30}$";
var tmgZipRegExp = "^(^[0-9]{4}$)|(^[0-9]{5,6}$)|(^[0-9]{5}[- ][0-9]{4}$)|(^[a-zA-Z0-9]{6}$)|(^[a-zA-Z0-9]{3}[- ][a-zA-Z0-9]{3}$)";
var tmgEmailRegExp = "^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
var tmgMsgSuccess = "Success! You have completed all the necessary fields in order to sign up for this offer.";
var tmgMsgAtTimeOfLoad = "Once you have completed the required field(s) you will see a success message here.";
var tmgOfferDroped = false;
var tmgHostingTracked = false;
var tmgHadPostedLeads = false;
var tmgPlmtImpsnFlag = false;
var tmgOfferDisplayCall = 0;
var tmgOfferDisplayCallViaField = 0;
var tmgCallOnPageLoad = 0;
var tmgAddEvent = 0;
var tmgCheckForClickCallOnLoad = false;
var tmgShowOfferOneTime = false;
var tmgDisplayCampaignsRowIndex = 0;
var tmgArrCampaignsDisplayed = new Array();
var tmgArrCampaignsWhoesLeadPosted = new Array();
var tmgArrCampaignsHaveMoreInfo = new Array();
var tmgMoreInfoPosition = false;

// SOME STANDARD FUNCTION
Array.prototype.removeItem = function(pValue) {
    var i = 0;
    for (i = 0; i < this.length; i++) {
        if (escape(this[i]).match(escape(pValue))) {
            this.splice(i, 1);
            break;
        }
    }
    return this;
}
Array.prototype.addItem = function(pValue) {
    var isFound = false;
    var i = 0;
    for (i = 0; i < this.length; i++) {
        if (escape(this[i]).match(escape(pValue))) {
            isFound = true;
            break;
        }
    }
    if (!isFound) {
        this.push(pValue);
    }
    return this;
}
String.prototype.trim = function(pString) {
    pString = this != window ? this : pString;
    return pString.replace(/^\s+/g, "").replace(/\s+$/g, "");
}
String.prototype.padLeft = function(pTotal, pReplaceWith) {
    if (pTotal == this.length) {
        return this;
    }
    var rtnString = "";
    var i = 0;
    for (i = 0; i < pTotal; i++) {
        if (i < (pTotal - this.length)) {
            rtnString = rtnString + pReplaceWith;
        }
        else {
            rtnString = rtnString + this.charAt((pTotal - this.length) - i);
        }
    }
    return rtnString;
}
function RemoveItemFromString(pInputString, pRemoveValue, pSeprator) {
    var lArray = pInputString.split(pSeprator);
    var rtnString = "";
    for (var i = 0; i < lArray.length; i++) {
        if (lArray[i] == pRemoveValue) {
            lArray.removeItem(pRemoveValue);
            break;
        }
    }
    for (var i = 0; i < lArray.length; i++) {
        rtnString = rtnString + lArray[i] + pSeprator;
    }
    return rtnString.substring(0, rtnString.length - 1);
}
String.prototype.replaceAll = function(replaceKey, with_this) {
    return this.replace(new RegExp(replaceKey, 'g'), with_this);
}
function CustomeReplaceAll(pStr, replaceKey, replaceWith) {
    return pStr.replace(new RegExp(replaceKey, 'g'), replaceWith);
}
function FindIndexOfMatchedValue(pValue, ArrCollection, InnerSepratorKey, IndexToCheckWithInnerSeprator) {
    var index = 0;
    for (index = 0; index < ArrCollection.length; index++) {
        if (InnerSepratorKey != null) {
            if (pValue == ArrCollection[index].split(InnerSepratorKey)[IndexToCheckWithInnerSeprator]) {
                return index;
            }
        }
        else {
            if (pValue == ArrCollection[index]) {
                return index;
            }
        }
    }
    return "-1";
}
function addEvent(elm, evType, fn, useCapture) {
    if (elm !== null) {
        if (elm.addEventListener) {
            elm.addEventListener(evType, fn, useCapture);
            return true;
        }
        else if (elm.attachEvent) {
            var r = elm.attachEvent('on' + evType, fn);
            return r;
        }
        else {
            elm['on' + evType] = fn;
        }
    }
}
function GetClientQueryParameterByName(name) {
    name = name.toLowerCase()
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(decodeURIComponent(window.location.search.toLowerCase()));
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
function HasClassOnControl(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function AddClassOnControl(ele, cls) {
    if (!this.HasClassOnControl(ele, cls)) {
        ele.className += " " + cls;
    }
}
function RemoveClassFromComtrol(ele, cls) {
    if (HasClassOnControl(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}
// FUNCTION WHICH CALL INTERNALLY
//CODE :COMSCR001
function TmgShowHide(pArea, pFlag) {
    try {
        if (pArea !== null) {
            if (pFlag) {
                pArea.style["display"] = "block";
            }
            if (!pFlag) {
                pArea.style["display"] = "none";
            }
        }
    }
    catch (ex) { PostError("COMSCR001:" + ex); }
}
function TmgReturnValueString(pCampaignId) {
    var rtnString = "";
    var arrFieldID = eval("lCampaignFields_" + pCampaignId).split(",");
    var index = 0;

    //ADDITIONAL FIELDS FOR CAMPAIGN
    rtnString += "cpl=" + eval("lCPL_" + pCampaignId) + ",";
    rtnString += "cplfor=" + eval("lCPLEntryFor_" + pCampaignId) + ",";
    rtnString += "documentnumber=" + eval("lOptionDocumentNumber_" + pCampaignId) + ",";
    rtnString += "mainplacement=" + tmg_MainPlacement.toString() + ",";
    rtnString += "hituniquekey=" + tmgHitUniqueKey + ",";
    for (index = 0; index < arrFieldID.length; index++) {
        var lFieldvalue = "";
        try {
            lFieldvalue = TmgFetchControlValue(arrFieldID[index]);
        }
        catch (ex) { }
        lFieldvalue = lFieldvalue.split("&").join("").toString();
        lFieldvalue = lFieldvalue.split("#").join("").toString();
        lFieldvalue = lFieldvalue.split("'").join("%60").toString();
        if (arrFieldID[index].indexOf("PHONE") != -1) {
            lFieldvalue = lFieldvalue.split("-").join("").toString();
        }
        if (arrFieldID[index].indexOf("_IP_ADDRESS") != -1) {
            lFieldvalue = lUSER_IP_ADDRESS.toString();
        }
        if (arrFieldID[index].indexOf("_USER_PLATFORM") != -1) {
            lFieldvalue = lUSER_PLATFORM_SUB.toString();
        }
        if (arrFieldID[index].indexOf("_CITY") != -1 && lFieldvalue.indexOf("/") != -1) {
            try {
                lFieldvalue = lFieldvalue.split("/").slice(0).sort(function(a, b) { return b.localeCompare(a) })[0];
            }
            catch (ex) {
            }
        }
        rtnString += arrFieldID[index] + "=" + lFieldvalue + ",";
    }
    /*START: HLF Changes */
    var lHLFVariable = "";
    if (tmgPublisher == "213530") {
        try {
            lHLFVariable = document.getElementById("ContentPlaceHolder1_HID_PathID").value;
            lHLFVariable = lHLFVariable + "|" + document.getElementById("ContentPlaceHolder1_HID_UniqueID").value;
            lHLFVariable = lHLFVariable + "|" + document.getElementById("ContentPlaceHolder1_HID_PageID").value;
        }
        catch (ex) {
            lHLFVariable = "";
        }
        if (lHLFVariable != "") {
            rtnString += "hlfvar=" + lHLFVariable + ",";
        }
    }
    /*END: HLF Changes */
    rtnString += "tmgsitename=" + CustomeReplaceAll(tmgSiteName, ",", ";") + ",";
    rtnString += "useragent=" + CustomeReplaceAll(tmg_UserAgent, ",", ";") + ",";
    if (rtnString.length > 0) {
        rtnString = rtnString.substring(0, rtnString.length - 1);
    }
    return rtnString;
}
//CODE :COMSCR002
function TmgShowHideBaseOnFieldsContains(pAdditionalFiledArea) {
    try {
        tmgArrEmptyFields = new Array();
        tmgArrNotEmptyFields = new Array();
        TmgSeprateFieldsKeyForEmptyOrNot(tmgActiveCampaignId);
        var index = 0;
        for (index = 0; index < tmgArrEmptyFields.length; index++) {
            if (TmgShowHideCampaignsFiled(tmgArrEmptyFields[index], true)) continue;
        }
        for (index = 0; index < tmgArrNotEmptyFields.length; index++) {
            if (tmgArrNotEmptyFields[index].indexOf("DISCLAIMER") != -1 || tmgArrNotEmptyFields[index].indexOf("TERMS_AND_CONDITIONS") != -1) {
                continue;
            }
            if (TmgShowHideCampaignsFiled(tmgArrNotEmptyFields[index], false)) continue;
        }
        if (tmgArrEmptyFields.length == 0) {
            TmgShowHide(pAdditionalFiledArea, false);
            HideMe_ShowNext(tmgActiveCampaignId);
        }
    } catch (ex) { PostError("COMSCR002:" + ex); }
}
function TmgSeprateFieldsKeyForEmptyOrNot(pCampaignId) {
    var arrFieldID = eval("lCampaignFields_" + pCampaignId).split(",");
    var index = 0;
    for (index = 0; index < arrFieldID.length; index++) {
        try {
            if (lHiddenFieldIds.indexOf(arrFieldID[index]) != -1) continue;
            if (TmgCheckForEmpty(TmgFetchControlValue(arrFieldID[index]))) {
                tmgArrEmptyFields.push(arrFieldID[index]);
            }
            else {
                tmgArrNotEmptyFields.push(arrFieldID[index]);
            }
        } catch (ex) { }
    }
}
function TmgFetchControlValue(pControlId) {
    var rtnValue = "";
    var isFound = false;
    var arrFieldID;
    var index = 0;
    if (lFieldsContainChildField != "") {
        arrFieldID = lFieldsContainChildField.split(",");
        for (index = 0; index < (arrFieldID.length); index++) {
            //            if (pControlId.indexOf(arrFieldID[index].split("!")[0]) != -1) {
            if (pControlId == arrFieldID[index].split("!")[0]) {
                isFound = true;
                break;
            }
        }
    }
    if (isFound) {
        var arrSubFieldID = arrFieldID[index].split("!")[1].split("^");
        var i = 0;
        var lIsItAddonFieldnDateType = false;
        var lIsAnyChildOfDateTypeEmpty = false;
        for (i = 0; i < arrSubFieldID.length; i++) {
            if (pControlId.indexOf("DATE") == -1) {
                if (arrSubFieldID[i].indexOf("_MONTH") != -1 || arrSubFieldID[i].indexOf("_DAY") != -1 || arrSubFieldID[i].indexOf("_YEAR") != -1) {
                    lIsItAddonFieldnDateType = true;
                    break;
                }
            }
        }
        for (i = 0; i < arrSubFieldID.length; i++) {
            var seprateByCode = "";
            if (pControlId.indexOf("DATE") != -1) {
                seprateByCode = "/";
            }
            var lValue = TmgFetchControlValueBaseOnType(arrSubFieldID[i]);
            if (lIsItAddonFieldnDateType && lValue == "-1") {
                lIsAnyChildOfDateTypeEmpty = true;
            }
            rtnValue += lValue + seprateByCode;
        }
        if (pControlId.indexOf("DATE") != -1) {
            rtnValue = rtnValue.substring(0, rtnValue.length - 1);
        }
        if (lIsAnyChildOfDateTypeEmpty) {
            rtnValue = "";
        }
    }
    else {
        rtnValue = TmgFetchControlValueBaseOnType(pControlId);
    }
    return rtnValue;
}
function TmgFetchControlValueBaseOnType(pObjectId) {
    var rtnValue = "";
    var i = 0;
    // Check If Come Under Radio Button List
    if (FindIndexOfMatchedValue(pObjectId, lRadioButtonFieldIds.split(",")) != -1) {
        var lArrRadios = document.getElementsByName(pObjectId);
        for (i = 0; i < lArrRadios.length; i++) {
            if (lArrRadios[i].checked) {
                rtnValue = lArrRadios[i].value;
            }
        }
        return rtnValue;
    }
    //Check if come under check box List
    if (FindIndexOfMatchedValue(pObjectId, lCheckBoxFieldIds.split(",")) != -1) {
        var lArrCheckbox = document.getElementsByName(pObjectId);
        for (i = 0; i < lArrCheckbox.length; i++) {
            if (lArrCheckbox[i].checked) {
                if (rtnValue != "") {
                    rtnValue = rtnValue + "/" + lArrCheckbox[i].value;
                }
                else {
                    rtnValue = lArrCheckbox[i].value;
                }
            }
        }
        return rtnValue;
    }
    var fieldControl = document.getElementById(pObjectId);
    if (fieldControl !== null) {
        switch (fieldControl.type) {
            case "text":
                rtnValue = fieldControl.value;
                break;
            case "select-one":
                if (fieldControl.selectedIndex == -1) {
                    fieldControl.selectedIndex = 0;
                }
                if (fieldControl.selectedIndex >= 0) {
                    rtnValue = fieldControl.options[fieldControl.selectedIndex].value;
                }
                break;
            case "hidden":
                rtnValue = fieldControl.value;
                break;
            default:
                try {
                    rtnValue = fieldControl.value;
                } catch (ex) { PostError("TmgFetchControlValueBaseOnType:Id:" + pObjectId + ":" + fieldControl.type + ":" + ex); }
                break;
        }
    }
    return rtnValue;
}
function TmgCheckForEmpty(pValue) {
    var lControlValue = CustomeReplaceAll(pValue, "-1", "");
    if (lControlValue == "" || lControlValue == "//") {
        // string is empty // and ddl has selected "Select One"
        // for Date Of Birth as value would come -1/-1/-1
        return true;
    }
    if (!pValue.replace(/^\s+|\s+$/g, "")) {
        // string contains only whitespaces
        return true;
    }
    return false;
}
function TmgShowHideCampaignsFiled(pFieldID, pflag) {
    var fieldObject = document.getElementById(TmgGetFieldArea(pFieldID));
    if (fieldObject == null) {
        return true;
    }
    TmgShowHide(fieldObject, pflag);
    return false;
}
function TmgGetFieldArea(pFieldId) {
    var isFound = false;
    var arrFieldID;
    var index = 0;
    if (lFieldsContainChildField != "") {
        arrFieldID = lFieldsContainChildField.split(",");
        for (index = 0; index < (arrFieldID.length); index++) {
            //            if (pFieldId.indexOf(arrFieldID[index].split("!")[0]) != -1) {
            if (pFieldId == arrFieldID[index].split("!")[0]) {
                isFound = true;
                break;
            }
        }
    }
    if (isFound) {
        return arrFieldID[index].split("!")[0] + "_TABLE";
    }
    return pFieldId + "_TABLE";
}
//CODE :COMSCR003
function ValidateCampaignsFields() {
    var isValid = true;
    var lArrDropCampaigns = new Array();
    var lArrDropTopFields = new Array();
    try {
        var index = 0;
        var hasfocusApplied = false;
        for (index = 0; index < tmgArrSelectedCampaigns.length; index++) {
            var arrInvalidFieldID = new Array();
            tmgArrEmptyFields = new Array();
            tmgArrNotEmptyFields = new Array();
            TmgSeprateFieldsKeyForEmptyOrNot(tmgArrSelectedCampaigns[index]);
            TmgRemoveFieldIdWhichWillNotValidate();
            // Assigning Empty Fields..
            arrInvalidFieldID = tmgArrEmptyFields;
            // Validating Base on Regular Expressions
            var i = 0;
            for (i = 0; i < tmgArrNotEmptyFields.length; i++) {
                if (!IsValidValue(tmgArrNotEmptyFields[i])) {
                    arrInvalidFieldID.push(tmgArrNotEmptyFields[i]);
                }
                else {
                    SetValidColor(true, tmgArrNotEmptyFields[i]);
                }
            }
            for (i = 0; i < arrInvalidFieldID.length; i++) {
                SetValidColor(false, arrInvalidFieldID[i]);
                if (TmgShowHideCampaignsFiled(arrInvalidFieldID[i], true)) continue;
            }
            if (arrInvalidFieldID.length > 0) {
                isValid = false;
                document.getElementById("TmgFieldValidationMsg$" + tmgArrSelectedCampaigns[index]).style["color"] = "red";
                document.getElementById("TmgAdditionalFields$" + tmgArrSelectedCampaigns[index]).style["display"] = "block";
                document.getElementById("TmgSuccessMsg$" + tmgArrSelectedCampaigns[index]).innerHTML = tmgMsgAtTimeOfLoad;
                if (!hasfocusApplied) {
                    document.getElementById("tmgControl$" + tmgArrSelectedCampaigns[index] + "$0").focus();
                    hasfocusApplied = true;
                }
                lArrDropCampaigns.push(tmgArrSelectedCampaigns[index]);
                lArrDropTopFields.push(arrInvalidFieldID[0]);
            }
            else {
                document.getElementById("TmgFieldValidationMsg$" + tmgArrSelectedCampaigns[index]).style["color"] = "#000";
                document.getElementById("TmgSuccessMsg$" + tmgArrSelectedCampaigns[index]).innerHTML = tmgMsgSuccess;
            }
        }
    }
    catch (ex) {
        PostError("COMSCR003:" + ex);
        isValid = true;
    }
    var lTopestIndex = 9999;
    var lTopestCampaignsTopDropField = null;
    try {
        for (index = 0; index < lArrDropCampaigns.length; index++) {
            if (lTopestIndex > GetIndexOfCampaignInOfferRow(lArrDropCampaigns[index])) {
                lTopestIndex = GetIndexOfCampaignInOfferRow(lArrDropCampaigns[index]);
                lTopestCampaignsTopDropField = lArrDropTopFields[index]
            }
        }
        if (lTopestCampaignsTopDropField != null) {
            Enhencement_FocusOnDroppedField(lTopestCampaignsTopDropField);
        }
    }
    catch (ex) {
    }
    return isValid;
}
function Enhencement_FocusOnDroppedField(pFields) {
    try {
        /* Commented as live functionality for all browsers as well */
        /*
        if (lUSER_PLATFORM == 0) return;
        if (lUSER_PLATFORM_SUB != 1.1) return;
        */

        var isFound = false;
        var arrFieldIds;
        var index = 0;
        if (lFieldsContainChildField != "") {
            arrFieldIds = lFieldsContainChildField.split(",");
            for (index = 0; index < (arrFieldIds.length); index++) {
                if (pFields == arrFieldIds[index].split("!")[0]) {
                    isFound = true;
                    break;
                }
            }
        }
        if (isFound) {
            pFields = arrFieldIds[index].split("!")[1].split("^")[0];
        }
        document.getElementById(pFields).focus();
    }
    catch (ex)
    { }
}
function CheckForValidateAgain() {
    var index = 0;
    for (index = 0; index < tmgArrSelectedCampaigns.length; index++) {
        var arrInvalidFieldID = new Array();
        tmgArrEmptyFields = new Array();
        tmgArrNotEmptyFields = new Array();
        TmgSeprateFieldsKeyForEmptyOrNot(tmgArrSelectedCampaigns[index]);
        TmgRemoveFieldIdWhichWillNotValidate();
        // Assigning Empry Fields..
        arrInvalidFieldID = tmgArrEmptyFields;
        // Validating Base on Regular Expressions
        var i = 0;
        for (i = 0; i < tmgArrNotEmptyFields.length; i++) {
            if (!IsValidValue(tmgArrNotEmptyFields[i])) {
                arrInvalidFieldID.push(tmgArrNotEmptyFields[i]);
            }
        }
        for (i = 0; i < arrInvalidFieldID.length; i++) {
            if (TmgShowHideCampaignsFiled(arrInvalidFieldID[i], true)) continue;
        }
        if (arrInvalidFieldID.length > 0) {
            //document.getElementById("TmgFieldValidationMsg$"+tmgArrSelectedCampaigns[index]).style["color"]="red";
            document.getElementById("TmgAdditionalFields$" + tmgArrSelectedCampaigns[index]).style["display"] = "block";
            document.getElementById("TmgSuccessMsg$" + tmgArrSelectedCampaigns[index]).innerHTML = tmgMsgAtTimeOfLoad;
        }
        else {
            document.getElementById("TmgFieldValidationMsg$" + tmgArrSelectedCampaigns[index]).style["color"] = "#000";
            document.getElementById("TmgSuccessMsg$" + tmgArrSelectedCampaigns[index]).innerHTML = tmgMsgSuccess;
            if (tmg_hideCampOnClick) {
                if (FindIndexOfMatchedValue(tmgArrSelectedCampaigns[index], tmgArrCampaignsDisplayed) != -1) {
                    HideMe_ShowNext(tmgArrSelectedCampaigns[index]);
                }
            }
        }
    }
}
function TmgRemoveFieldIdWhichWillNotValidate() {
    var arrFieldID = lAvoidValidateForIds.split(",");
    var i = 0;
    for (i = 0; i < arrFieldID.length; i++) {
        if (arrFieldID[i] == "") continue;
        tmgArrEmptyFields.removeItem(arrFieldID[i]);
        tmgArrNotEmptyFields.removeItem(arrFieldID[i]);
    }
}
function IsValidValue(pFieldID) {
    var objectValue = TmgFetchControlValue(pFieldID);
    var regExpression = "";
    if (pFieldID.indexOf("NAME") != -1) {
        regExpression = tmgStringRegExp;
    }
    if (pFieldID.indexOf("EMAIL") != -1) {
        regExpression = tmgEmailRegExp;
    }
    if (pFieldID.indexOf("ZIP") != -1) {
        regExpression = tmgZipRegExp;
    }
    if (pFieldID.indexOf("PHONE") != -1) {
        regExpression = tmgCellPhoneRegExp;
    }
    if (pFieldID.indexOf("DATE") != -1) {
        return IsValidDate(objectValue);
    }
    if (pFieldID.indexOf("SECONDARY_DOB") != -1) {
        if (objectValue.indexOf("-") == -1) {
            objectValue = objectValue.substring(0, 2) + "/" + objectValue.substring(2, 4) + "/" + objectValue.substring(4, 8);
        }
        return IsValidDate(objectValue);
    }
    //Password Validate
    if (pFieldID.indexOf("F_10873_39482") != -1 || pFieldID.indexOf("F_10919_39854") != -1 || pFieldID.indexOf("F_10919_39855") != -1) {
        regExpression = "^(?=.*\\d)(?=.*[a-z]).{8,}$";
    }
    if (pFieldID.indexOf("F_10961_40323") != -1) {
        regExpression = "^[0-9a-zA-Z]{6,}$";
    }
    if (pFieldID.indexOf("F_11031_40910") != -1 || pFieldID.indexOf("F_11031_40911") != -1) {
        regExpression = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";
    }
    var exp = new RegExp(regExpression);
    return exp.test(objectValue);
}
function IsValidDate(pDate) {
    var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(pDate);
    if (matches == null) return false;
    var day = matches[2];
    var month = matches[1] - 1;
    var year = matches[3];
    var composedDate = new Date(year, month, day);
    return composedDate.getDate() == day &&
            composedDate.getMonth() == month &&
            composedDate.getFullYear() == year;
}

function SetValidColor(pIsFieldValid, pFieldId) {
    var arrFieldIdToRecord = new Array();
    var isFound = false;
    var arrFieldID;
    var index = 0;
    if (lFieldsContainChildField != "") {
        arrFieldID = lFieldsContainChildField.split(",");
        for (index = 0; index < arrFieldID.length; index++) {
            if (pFieldId == arrFieldID[index].split("!")[0]) {
                isFound = true;
                break;
            }
        }
    }
    if (isFound) {
        var arrChildFieldID = arrFieldID[index].split("!")[1].split("^");
        var i = 0;
        for (i = 0; i < arrChildFieldID.length; i++) {
            arrFieldIdToRecord.push(arrChildFieldID[i])
        }
    }
    else {
        arrFieldIdToRecord.push(pFieldId);
    }
    for (index = 0; index < arrFieldIdToRecord.length; index++) {
        var lShowoffControl = document.getElementById(arrFieldIdToRecord[index]);
        if (lShowoffControl == null) {
            if (pIsFieldValid) {
                try {
                    document.getElementById(pFieldId.split("$")[0] + "$heading").className = "tmgFieldCaptionTheme";
                }
                catch (ex) { }
            }
            else {
                try {
                    document.getElementById(pFieldId.split("$")[0] + "$heading").className = "tmgFieldCaptionThemeRequired";
                }
                catch (ex) { }
            }
            continue;
        }
        if (lShowoffControl.type == "hidden") continue;
        if (pIsFieldValid) {
            //Control
            RemoveClassFromComtrol(lShowoffControl, "tmgFieldControlThemeRequired");
            AddClassOnControl(lShowoffControl, "tmgFieldControlTheme");
            //Span
            document.getElementById(pFieldId + "$heading").className = "tmgFieldCaptionTheme";
        }
        else {
            RemoveClassFromComtrol(lShowoffControl, "tmgFieldControlTheme");
            AddClassOnControl(lShowoffControl, "tmgFieldControlThemeRequired");
            document.getElementById(pFieldId + "$heading").className = "tmgFieldCaptionThemeRequired";
        }
    }
}
function setFocusChangeToNext(pObjectFromID, pObjectToID) {
    var objectFrom = document.getElementById(pObjectFromID);
    var objectTo = document.getElementById(pObjectToID);
    if (objectFrom.value.length == "3") {
        objectTo.focus();
    }
}
function pause(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}
function PostLeadsViaAjax_v2(pURI) {
    if (eval("tmgShowingLiveViewOnly_" + tmgHitUniqueKey)) return;
    pURI = CustomeReplaceAll(pURI, "#", "");
    pURI = CustomeReplaceAll(pURI, "%23", "");
    document.getElementById("tmgPost").src = pURI;
}

function PostLeadsViaAjax(pURI) {
    if (eval("tmgShowingLiveViewOnly_" + tmgHitUniqueKey)) return;
    pURI = CustomeReplaceAll(pURI, "#", "");
    pURI = CustomeReplaceAll(pURI, "%23", "");
    var line = 0;
    var abc = FindBrowserDetails();
    try {
        if (BrowserDetect.browser == 'Firefox' && eval(BrowserDetect.version) < 11) {
            line = 1;
            document.getElementById("tmgPost").src = pURI;
        }
        else {
            line = 2;
            xmlHttp = FindXmlHttpObjectBasedOnUserAgent();
            line = 3;
            xmlHttp.open("POST", pURI, false);
            line = 4;
            xmlHttp.send();
        }
    }
    catch (ex) {
        if (line < 4) {
            document.getElementById("tmgPost").src = pURI;
        }
        if (abc.indexOf("Explorer;8") != -1) pause(700);
    }
}

function FindXmlHttpObjectBasedOnUserAgent() {
    var xmlHttp = null;
    try {
        xmlHttp = new XMLHttpRequest();
    }
    catch (ex) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (ex) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}
//CODE :COMSCR305
function FindBrowserDetails() {
    var rtnString = "";
    try {
        rtnString = BrowserDetect.browser;
        rtnString = rtnString + ";" + BrowserDetect.version;
        rtnString = rtnString + ";" + BrowserDetect.OS;
    }
    catch (ex) {
        PostError("COMSCR305:" + ex);
        rtnString = "NotFound;NotFound;NotFound";
    }
    return rtnString;
}
function TmgFetchMappedControlValue(pObjectSerachKey, pObjectSearchBy, pObjectType) {
    var rtnValue = "";
    var fieldControl;
    switch (pObjectSearchBy) {
        case "ID":
            fieldControl = document.getElementById(pObjectSerachKey);
            if (fieldControl == null) return rtnValue;
            switch (fieldControl.type) {
                case "text":
                    rtnValue = fieldControl.value;
                    break;
                case "select-one":
                    if (fieldControl.selectedIndex >= 0) {
                        rtnValue = fieldControl.options[fieldControl.selectedIndex].value;
                    }
                    break;
                case "hidden":
                    rtnValue = fieldControl.value;
                    break;
                default:
                    try {
                        rtnValue = fieldControl.value;
                    } catch (ex) { PostError("TmgFetchMappedControlValue:Id:" + pObjectSerachKey + ":" + fieldControl.type + ":" + ex); }
                    break;
            }
            break;
        case "NAME":
            fieldControl = document.getElementsByName(pObjectSerachKey);
            if (fieldControl[0] == null) return rtnValue;
            switch (fieldControl[0].type) {
                case "text":
                    rtnValue = fieldControl[0].value;
                    break;
                case "select-one":
                    if (fieldControl[0].selectedIndex >= 0) {
                        rtnValue = fieldControl[0].options[fieldControl[0].selectedIndex].value;
                    }
                    break;
                case "hidden":
                    rtnValue = fieldControl[0].value;
                    break;
                case "radio":
                    var i = 0;
                    for (i = 0; i < fieldControl.length; i++) {
                        if (fieldControl[i].checked) {
                            rtnValue = fieldControl[i].value;
                        }
                    }
                    break;
                default:
                    try {
                        rtnValue = fieldControl[0].value;
                    } catch (ex) { PostError("TmgFetchMappedControlValue:Name:" + pObjectSerachKey + ":" + fieldControl[0].type + ":" + ex); }
                    break;
            }
            break;
    }
    return rtnValue;
}

function PostError(pError) {
    PostLeadsViaAjax("http" + tmgSSLKey + "://" + tmgMyURI + "/Exceptions/ManageExceptions.aspx?" + "ErrorMsg=" + pError + " ->Check Error in : PlacementId=" + tmgPlacement + " and PublisherId=" + tmgPublisher);
}
function ReplaceMappedFieldValueIfAny(pBaseFieldCode, pFieldValue) {
    var rtnValue = pFieldValue;
    try {
        var index = FindIndexOfMatchedValue(rtnValue, eval("lMappedFor_" + pBaseFieldCode).split(","), "~", 0);
        if (index >= 0) {
            rtnValue = eval("lMappedFor_" + pBaseFieldCode).split(",")[index].split("~")[1];
        }
    } catch (ex) { }
    return rtnValue;
}
//CODE :COMSCR004
function FillMappedDataIntoControls() {
    var arrPublishersMappedFields = lMappedClientFields.split("--");
    if (arrPublishersMappedFields[0] == "") return false;
    var i = 0;
    var j = 0;
    for (i = 0; i < arrPublishersMappedFields.length; i++) {
        var arrMappedFieldsInfo = arrPublishersMappedFields[i].split(",");
        try {
            var fieldValue = TmgFetchMappedControlValue(arrMappedFieldsInfo[2], arrMappedFieldsInfo[3], arrMappedFieldsInfo[1]);
            var baseFiledKey = arrMappedFieldsInfo[0];
            if (baseFiledKey != "DATE_OF_BIRTH") {
                if (baseFiledKey != "PHONE") {
                    if (fieldValue == "" || fieldValue == "-1") continue;
                    fieldValue = ReplaceMappedFieldValueIfAny(baseFiledKey, fieldValue);
                }
            }
            if (baseFiledKey == "AffId") {
                if (arrMappedFieldsInfo[2] != "hFieldAffId") {
                    tmgAffId = fieldValue;
                }
            }
            if (baseFiledKey == "SubId") {
                if (arrMappedFieldsInfo[2] != "hFieldSubId") {
                    tmgSubId = fieldValue;
                }
            }
            var arrBaseFieldKey = new Array();
            var arrFieldValue = new Array();
            switch (baseFiledKey) {
                case "FULL_NAME":
                    arrBaseFieldKey.push("FIRST_NAME");
                    arrBaseFieldKey.push("LAST_NAME");
                    var arrFullName = fieldValue.split(' ');
                    if (arrFullName.length == 1) {
                        arrFieldValue.push(arrFullName[0]);
                        arrFieldValue.push(arrFullName[0]);
                    }
                    else {
                        arrFieldValue.push(arrFullName[0]);
                        arrFieldValue.push(fieldValue.replace(arrFullName[0] + " ", ""));
                    }
                    break;
                case "DATE_OF_BIRTH":
                    var ageValueAfterProcess = "";
                    ageValueAfterProcess = ReturnDateInAccurateFormate(arrMappedFieldsInfo[2], arrMappedFieldsInfo[3], arrMappedFieldsInfo[1]);
                    if (!IsThisValidDateOrPhone(ageValueAfterProcess)) continue;
                    arrBaseFieldKey.push(baseFiledKey);
                    arrFieldValue.push(ageValueAfterProcess);
                    break;
                case "PHONE":
                    var phoneValueAfterProcess = "";
                    if (arrMappedFieldsInfo[2].indexOf('^') != -1) {
                        var arrPhoneKey = arrMappedFieldsInfo[2].split('^');
                        var k = 0;
                        var lPhone = "";
                        for (k = 0; k < arrPhoneKey.length; k++) {
                            lPhone = lPhone + TmgFetchMappedControlValue(arrPhoneKey[k], arrMappedFieldsInfo[3], arrMappedFieldsInfo[1]);
                        }
                        phoneValueAfterProcess = lPhone;
                    }
                    else {
                        phoneValueAfterProcess = CustomeReplaceAll(fieldValue, "-", "");
                        phoneValueAfterProcess = CustomeReplaceAll(phoneValueAfterProcess, " ", "");
                        phoneValueAfterProcess = phoneValueAfterProcess.replace("(", "");
                        phoneValueAfterProcess = phoneValueAfterProcess.replace(")", "");
                    }
                    if (!IsThisValidDateOrPhone(phoneValueAfterProcess)) continue;
                    arrBaseFieldKey.push(baseFiledKey);
                    arrFieldValue.push(phoneValueAfterProcess);
                    break;
                case "STATE":
                case "GENDER":
                    arrBaseFieldKey.push(baseFiledKey);
                    arrFieldValue.push(fieldValue.toUpperCase());
                    break;
                default:
                    arrBaseFieldKey.push(baseFiledKey);
                    arrFieldValue.push(fieldValue);
                    break;
            }
            for (j = 0; j < arrBaseFieldKey.length; j++) {
                var arrCampaigns = lAllCampaigns.split(",");
                var index = 0;
                for (index = 0; index < arrCampaigns.length; index++) {
                    var fieldID = "F_" + arrCampaigns[index] + "_" + arrBaseFieldKey[j];
                    var objField = document.getElementById(fieldID);
                    if (objField != null) {
                        objField.value = arrFieldValue[j];
                    }
                    switch (arrBaseFieldKey[j]) {
                        case "DATE_OF_BIRTH":
                            if (objField == null) {
                                fieldID = "F_" + arrCampaigns[index] + "_" + arrBaseFieldKey[j] + "_MONTH";
                                objField = document.getElementById(fieldID);
                                if (objField == null) continue;
                                if (arrFieldValue[j].indexOf('/') == "-1") continue;
                                objField.value = arrFieldValue[j].split('/')[0].padLeft(2, '0');
                                fieldID = "F_" + arrCampaigns[index] + "_" + arrBaseFieldKey[j] + "_DAY";
                                objField = document.getElementById(fieldID);
                                objField.value = arrFieldValue[j].split('/')[1].padLeft(2, '0');
                                fieldID = "F_" + arrCampaigns[index] + "_" + arrBaseFieldKey[j] + "_YEAR";
                                objField = document.getElementById(fieldID);
                                objField.value = arrFieldValue[j].split('/')[2];
                            }
                            break;
                        case "PHONE":
                            if (objField == null) {
                                fieldID = "F_" + arrCampaigns[index] + "_" + arrBaseFieldKey[j] + "_PARTA";
                                objField = document.getElementById(fieldID);
                                if (objField == null) continue;
                                objField.value = arrFieldValue[j].substring(0, 3);
                                fieldID = "F_" + arrCampaigns[index] + "_" + arrBaseFieldKey[j] + "_PARTB";
                                objField = document.getElementById(fieldID);
                                objField.value = arrFieldValue[j].substring(3, 6);
                                fieldID = "F_" + arrCampaigns[index] + "_" + arrBaseFieldKey[j] + "_PARTC";
                                objField = document.getElementById(fieldID);
                                objField.value = arrFieldValue[j].substring(6);
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        catch (ex) {
            PostError("COMSCR004:" + ex);
        }
    }
}
function ReturnDateInAccurateFormate(pKey, pSearchBy, pType) {
    var returnDate = "NA/NA/NA";
    var isThisFromQuery = document.getElementById("hTMG_FetchingDataFromQuery").value;
    var iDateFormat = document.getElementById("hTMG_MappedDateFormat").value;
    try {
        if (eval(isThisFromQuery)) {
            var arrFieldsValue;
            switch (parseInt(iDateFormat)) {
                case 0:
                case 1: // MM/DD/YYYY
                    returnDate = TmgFetchMappedControlValue(pKey, pSearchBy, pType);
                    break;
                case 2: // MM/DD/YYYY TIME
                    returnDate = TmgFetchMappedControlValue(pKey, pSearchBy, pType).split(' ')[0];
                    break;
                case 3: //YYYY-MM-DD TIME
                    arrFieldsValue = TmgFetchMappedControlValue(pKey, pSearchBy, pType).split('-');
                    returnDate = arrFieldsValue[1] + "/" + arrFieldsValue[2].split(" ")[0] + "/" + arrFieldsValue[0];
                    break;
                case 4: // MM-DD-YYYY
                    arrFieldsValue = TmgFetchMappedControlValue(pKey, pSearchBy, pType).split('-');
                    returnDate = arrFieldsValue[0] + "/" + arrFieldsValue[1] + "/" + arrFieldsValue[2];
                    break;
                case 5: // YYYY-MM-DD
                    arrFieldsValue = TmgFetchMappedControlValue(pKey, pSearchBy, pType).split('-');
                    returnDate = arrFieldsValue[1] + "/" + arrFieldsValue[2] + "/" + arrFieldsValue[0];
                    break;
                case 6: // YYYY
                    arrFieldsValue = TmgFetchMappedControlValue(pKey, pSearchBy, pType);
                    returnDate = "01/01/" + arrFieldsValue;
                    break;
                case 7: // DD/MM/YYYY
                    arrFieldsValue = TmgFetchMappedControlValue(pKey, pSearchBy, pType).split('/');
                    returnDate = arrFieldsValue[1] + "/" + arrFieldsValue[0] + "/" + arrFieldsValue[2];
                    break;
                case 8: // MM DD YYYY
                    arrFieldsValue = TmgFetchMappedControlValue(pKey, pSearchBy, pType).split(' ');
                    returnDate = arrFieldsValue[0] + "/" + arrFieldsValue[1] + "/" + arrFieldsValue[2]; //.value.replace(/ /g, "/")
                    break;
                //ToDo: ADD CASE WHEN MORE DATE FORMAT COME                              
                default:
                    break;
            }
        }
        else {
            var arrFieldsKeys;
            var arrFieldsValue;
            var lMonth;
            var lDay;
            var lYear;
            switch (parseInt(iDateFormat)) {
                case 0:
                case 1: // MM/DD/YYYY
                    if (pKey.indexOf("^") != -1) {
                        arrFieldsKeys = pKey.split('^');
                        lMonth = TmgFetchMappedControlValue(arrFieldsKeys[0], pSearchBy, pType).padLeft(2, "0");
                        lDay = TmgFetchMappedControlValue(arrFieldsKeys[1], pSearchBy, pType).padLeft(2, "0");
                        lYear = TmgFetchMappedControlValue(arrFieldsKeys[2], pSearchBy, pType).padLeft(4, "0");
                        returnDate = lMonth + "/" + lDay + "/" + lYear;
                    }
                    else {
                        returnDate = TmgFetchMappedControlValue(pKey, pSearchBy, pType);
                    }
                    break;
                case 4: // MM-DD-YYYY
                    arrFieldsValue = TmgFetchMappedControlValue(pKey, pSearchBy, pType).split('-');
                    returnDate = arrFieldsValue[0] + "/" + arrFieldsValue[1] + "/" + arrFieldsValue[2];
                    break;
                case 5: // YYYY-MM-DD
                    arrFieldsValue = TmgFetchMappedControlValue(pKey, pSearchBy, pType).split('-');
                    returnDate = arrFieldsValue[1] + "/" + arrFieldsValue[2] + "/" + arrFieldsValue[0];
                    break;
                case 6: // YYYY
                    arrFieldsValue = TmgFetchMappedControlValue(pKey, pSearchBy, pType);
                    returnDate = "01/01/" + arrFieldsValue;
                    break;
                case 7: // DD/MM/YYYY
                    arrFieldsValue = TmgFetchMappedControlValue(pKey, pSearchBy, pType).split('/');
                    returnDate = arrFieldsValue[1] + "/" + arrFieldsValue[0] + "/" + arrFieldsValue[2];
                    break;
                case 8: // MM DD YYYY
                    arrFieldsValue = TmgFetchMappedControlValue(pKey, pSearchBy, pType).split(' ');
                    returnDate = arrFieldsValue[0] + "/" + arrFieldsValue[1] + "/" + arrFieldsValue[2]; //.value.replace(/ /g, "/")
                    break;
                //ToDo: ADD CASE WHEN MORE DATE FORMAT COME                              
                default:
                    break;
            }
        }
    }
    catch (ex) { }
    return returnDate;
}
function IsThisValidDateOrPhone(pValue) {
    var rtnFlag = true;
    if (pValue == "") {
        rtnFlag = false;
    }
    if (pValue.indexOf("-1") != -1) {
        rtnFlag = false;
    }
    if (pValue.indexOf(" ") != -1) {
        rtnFlag = false;
    }
    if (pValue.indexOf("undefined") != -1) {
        rtnFlag = false;
    }
    if (pValue == "//") {
        rtnFlag = false;
    }
    if (pValue == "NA/NA/NA") {
        rtnFlag = false;
    }
    return rtnFlag;
}

function OpenPopupWindow(pUrl, pCampId) {
    var myWidth = 0, myHeight = 0;
    var lWindowName = "TmgPopup" + pCampId;
    var mainwin;

    var myWidth = 0.70 * screen.width;
    var myHeight = 0.65 * screen.height;

    var lWindowFeatures = "toolbar=0,location=1,directories=0,status=1,menubar=0,scrollbars=1,resizable=0,top=0,left=0,width=" + myWidth + ",height=" + myHeight;
    mainwin = window.open(pUrl, lWindowName, lWindowFeatures);
    try {
        if (window.focus) {
            mainwin.focus()
        }
    } catch (ex) { }
    return false;
}
function ReportPlacementHosting() {
    try {
        var hostName = window.location.hostname.toLowerCase();
        var hostURLPage = window.location.href.toLowerCase().split('?')[0];
        var hostURL = encodeURI(window.location.href.toLowerCase());
        PostLeadsViaAjax("http" + tmgSSLKey + "://" + tmgMyURI + "/Report/TrackPlacementHosting.aspx?affid=&subid=&Placement=" + tmgPlacement + "&Publisher=" + tmgPublisher + "&domain=" + hostName + "&hosting=" + hostURLPage + "&fullhosting=" + hostURL);
    }
    catch (ex) { }
}

function TrackCommonImpression(pCallFrom, pListOfCampaign) {
    var lUri = "";
    var lEmailAddress = "";
    try {
        var lArrayMappedFields = lMappedClientFields.split("--");
        var lInfoCollection = lArrayMappedFields[FindIndexOfMatchedValue("EMAIL", lArrayMappedFields, ",", 0)].split(",");
        lEmailAddress = TmgFetchMappedControlValue(lInfoCollection[2], lInfoCollection[3], null)
    }
    catch (ex) {
    }
    //Track Placement Impresstion
    if (!tmgPlmtImpsnFlag) {
        if (pCallFrom == "LOAD" && lPlacementImpressionOn == "LOAD") {
            lUri = "http" + tmgSSLKey + "://" + tmgMyURI + "/ManageImpressions/ReportViaJsPlacement.aspx?hKey=" + tmgHitUniqueKey + "&affid=" + tmgAffId + "&subid=" + tmgSubId + "&Placement=" + tmgPlacement + "&Publisher=" + tmgPublisher + "&TrackOn=load&IP_ADDRESS=" + lUSER_IP_ADDRESS + "&UserEmail=" + lEmailAddress;
        }
        if (pCallFrom == "SUBMIT" && lPlacementImpressionOn == "SUBMIT") {
            lUri = "http" + tmgSSLKey + "://" + tmgMyURI + "/ManageImpressions/ReportViaJsPlacement.aspx?hKey=" + tmgHitUniqueKey + "&affid=" + tmgAffId + "&subid=" + tmgSubId + "&Placement=" + tmgPlacement + "&Publisher=" + tmgPublisher + "&TrackOn=submit&IP_ADDRESS=" + lUSER_IP_ADDRESS + "&UserEmail=" + lEmailAddress;
        }
        if (lUri != "") {
            if (FindBrowserDetails().indexOf("Explorer;9") != -1) {
                PostLeadsViaAjax_v2(lUri);
                pause(1000);
            }
            else {
                PostLeadsViaAjax(lUri);
            }
            tmgPlmtImpsnFlag = true;
        }
    }
    var i = 0;
    if (pListOfCampaign != "") {
        lUri = "";
        var arrCampsImprnComb = new Array();
        var arrCamps = new Array();
        if (pListOfCampaign.indexOf(",") != -1) {
            arrCamps = pListOfCampaign.split(",");
        }
        else {
            arrCamps.push(pListOfCampaign);
        }
        for (i = 0; i < arrCamps.length; i++) {
            arrCampsImprnComb.push(arrCamps[i] + "." + eval("lOptionDocumentNumber_" + arrCamps[i]));
        }
        if (pCallFrom == "LOAD" && lCampaignsImpressionOn == "LOAD") {
            lUri = "http" + tmgSSLKey + "://" + tmgMyURI + "/ManageImpressions/ReportViaJsCampaign.aspx?hKey=" + tmgHitUniqueKey + "&affid=" + tmgAffId + "&subid=" + tmgSubId + "&Placement=" + tmgPlacement + "&Publisher=" + tmgPublisher + "&CurrentCamps=" + arrCampsImprnComb + "&PreviousCamps=&TrackOn=load&IP_ADDRESS=" + lUSER_IP_ADDRESS + "&UserEmail=" + lEmailAddress;
        }
        if (pCallFrom == "SUBMIT" && lCampaignsImpressionOn == "SUBMIT") {
            lUri = "http" + tmgSSLKey + "://" + tmgMyURI + "/ManageImpressions/ReportViaJsCampaign.aspx?hKey=" + tmgHitUniqueKey + "&affid=" + tmgAffId + "&subid=" + tmgSubId + "&Placement=" + tmgPlacement + "&Publisher=" + tmgPublisher + "&CurrentCamps=" + arrCampsImprnComb + "&PreviousCamps=&TrackOn=submit&IP_ADDRESS=" + lUSER_IP_ADDRESS + "&UserEmail=" + lEmailAddress;
        }
        if (lUri != "") {
            if (FindBrowserDetails().indexOf("Explorer;9") != -1) {
                PostLeadsViaAjax_v2(lUri);
                pause(1000);
            }
            else {
                PostLeadsViaAjax(lUri);
            }
        }
        return;
    }
    lUri = "";
    var CurrentCombination = new Array();
    var PreviousCombination = new Array();
    for (i = 0; i < tmgArrCurrentDisplayCamps.length; i++) {
        CurrentCombination.push(tmgArrCurrentDisplayCamps[i] + "." + eval("lOptionDocumentNumber_" + tmgArrCurrentDisplayCamps[i]));
    }
    if (pCallFrom == "LOAD" && lCampaignsImpressionOn == "LOAD") {
        for (i = 0; i < tmgArrPreviousDisplayCamps.length; i++) {
            PreviousCombination.push(tmgArrPreviousDisplayCamps[i] + "." + eval("lOptionDocumentNumber_" + tmgArrPreviousDisplayCamps[i]));
        }
        lUri = "http" + tmgSSLKey + "://" + tmgMyURI + "/ManageImpressions/ReportViaJsCampaign.aspx?hKey=" + tmgHitUniqueKey + "&affid=" + tmgAffId + "&subid=" + tmgSubId + "&Placement=" + tmgPlacement + "&Publisher=" + tmgPublisher + "&CurrentCamps=" + CurrentCombination + "&PreviousCamps=" + PreviousCombination + "&TrackOn=load&IP_ADDRESS=" + lUSER_IP_ADDRESS + "&UserEmail=" + lEmailAddress;
    }
    if (pCallFrom == "SUBMIT" && lCampaignsImpressionOn == "SUBMIT") {
        lUri = "http" + tmgSSLKey + "://" + tmgMyURI + "/ManageImpressions/ReportViaJsCampaign.aspx?hKey=" + tmgHitUniqueKey + "&affid=" + tmgAffId + "&subid=" + tmgSubId + "&Placement=" + tmgPlacement + "&Publisher=" + tmgPublisher + "&CurrentCamps=" + CurrentCombination + "&PreviousCamps=&TrackOn=submit&IP_ADDRESS=" + lUSER_IP_ADDRESS + "&UserEmail=" + lEmailAddress;
    }
    if (lUri != "") {
        if (FindBrowserDetails().indexOf("Explorer;9") != -1) {
            PostLeadsViaAjax_v2(lUri);
            pause(1000);
        }
        else {
            PostLeadsViaAjax(lUri);
        }
    }
    tmgArrPreviousDisplayCamps = new Array();
    tmgArrPreviousDisplayCamps = tmgArrCurrentDisplayCamps;
}
function HideMe_ShowNext(pCampId) {
    if (tmg_hideCampOnClick) {
        var index = FindIndexOfMatchedValue(pCampId, tmgArrCurrentDisplayCamps);
        tmgArrCampaignsDisplayed.removeItem(pCampId);
        if (tmgDisplayCampaignsRowIndex < tmgArrCurrentDisplayCamps.length - 1) {
            tmgDisplayCampaignsRowIndex = tmgDisplayCampaignsRowIndex + 1;
            document.getElementById("TMGOfferTD" + (parseInt(index) + 1)).style["display"] = "none";
            document.getElementById("TMGOfferTD" + (parseInt(tmgDisplayCampaignsRowIndex) + 1)).style["display"] = "block";
            tmgArrCampaignsDisplayed.push(tmgArrCurrentDisplayCamps[tmgDisplayCampaignsRowIndex]);
            TrackCommonImpression("LOAD", tmgArrCurrentDisplayCamps[tmgDisplayCampaignsRowIndex]);
        }
    }
}
function GetDateStringInFormat(pDate, pFormat) {
    try {
        pFormat = pFormat.replace("DD", (pDate.getDate() < 10 ? '0' : '') + pDate.getDate());
        pFormat = pFormat.replace("MM", (pDate.getMonth() < 9 ? '0' : '') + (pDate.getMonth() + 1));
        pFormat = pFormat.replace("YYYY", pDate.getFullYear());
        pFormat = pFormat.replace("hh", (pDate.getHours() < 10 ? '0' : '') + pDate.getHours());
        pFormat = pFormat.replace("mm", (pDate.getMinutes() < 10 ? '0' : '') + pDate.getMinutes());
        pFormat = pFormat.replace("ss", (pDate.getSeconds() < 10 ? '0' : '') + pDate.getSeconds());
        pFormat = pFormat.replace("mmm", (pDate.getMilliseconds() < 10 ? '00' : pDate.getMilliseconds() < 100 ? '0' : '') + pDate.getMilliseconds());
    }
    catch (ex) {
        pFormat = "";
    }
    return pFormat;
}
function GetIndexOfCampaignInOfferRow(pCampaignId) {
    var Index = -1;
    var lAllCamps = lFinalOrderOfCampaignInDisplay.split(",");
    for (i = 0; i < lAllCamps.length; i++) {
        if (pCampaignId == lAllCamps[i].split("$")[1]) {
            Index = lAllCamps[i].split("$")[0];
        }
    }
    return Index;
}
function GetNextCampaignsInRow(pCampaignId) {
    var CampId = null;
    var isFound = false;
    var lAllCamps = lFinalOrderOfCampaignInDisplay.split(",");
    for (i = 0; i < lAllCamps.length; i++) {
        if (isFound) {
            CampId = lAllCamps[i].split("$")[1];
            break;
        }
        if (pCampaignId == lAllCamps[i].split("$")[1]) {
            isFound = true;
        }
    }
    return CampId;
}
function ManageAffIdSubIdValueEncode(pValue) {
    try {
        pValue = CustomeReplaceAll(pValue, ",", ":TMGCOMA:");
    }
    catch (ex) {
    }
    return pValue;
}
//CODE :COMSCR873
function ShowNextBunchOfCampaign() {
    var lrtnFlag = true;
    if (tmg_ShowCampInBunchFunctionality) {
        try {
            var i = 0;
            var ltempCurBunchCamps = new Array();
            // Get Next Bunch Camps
            for (i = 0; i < tmg_CampaignInABunch; i++) {
                var lCampId = GetNextCampaignsInRow(tmgArrCampaignsDisplayed[tmgArrCampaignsDisplayed.length - 1]);
                if (lCampId == null) { break; }
                ltempCurBunchCamps.push(lCampId);
                tmgArrCampaignsDisplayed.push(ltempCurBunchCamps[i]);
                lrtnFlag = false;
            }
            // Hide Prev Bunch :: Avoid if it last bunch
            if (!lrtnFlag) {
                document.getElementById("TMGOffer_Progress").style["display"] = "block";
                for (i = 0; i < tmgArrCampaignsDisplayed.length; i++) {
                    document.getElementById("TMGOfferTD" + GetIndexOfCampaignInOfferRow(tmgArrCampaignsDisplayed[i])).style["display"] = "none";
                }
            }
            // Show Next bunch
            setTimeout("document.getElementById('TMGOffer_Progress').style['display'] = 'none';", 100 * ltempCurBunchCamps.length);
            for (i = 0; i < ltempCurBunchCamps.length; i++) {
                setTimeout("document.getElementById('TMGOfferTD' + GetIndexOfCampaignInOfferRow(" + ltempCurBunchCamps[i] + ")).style['display'] = 'block';", 70 * (i + 1));
            }
            if (!lrtnFlag) {
                TrackCommonImpression("LOAD", ltempCurBunchCamps.toString());
            }
        }
        catch (ex) { PostError("COMSCR873:" + ex); }

        //Post Lead and mark campaign so that they can avoid at last call...
        try {
            var index = 0;
            var trustedFormId = "";
            var oCert = document.getElementById('xxTrustedFormCertUrl_0');
            if (oCert === null) {
                oCert = "";
                trustedFormId = tmg_TF_CertificateId;
            }
            else {
                trustedFormId = oCert.value;
            }
            for (index = 0; index < tmgArrSelectedCampaigns.length; index++) {
                if (FindIndexOfMatchedValue(tmgArrSelectedCampaigns[index], tmgArrCampaignsWhoesLeadPosted) != -1) continue;
                var finalString = "http" + tmgSSLKey + "://" + tmgMyURI + "/ProcessCampaignData/ProcessCampaignData.aspx?" + "ID=" + tmgArrSelectedCampaigns[index] + "&QS=tmg_affid=" + ManageAffIdSubIdValueEncode(tmgAffId) + ",tmg_subid=" + ManageAffIdSubIdValueEncode(tmgSubId) + ",cCampId=" + tmgArrSelectedCampaigns[index] + ",PublisherId=" + tmgPublisher + ",PlacementId=" + tmgPlacement + ",AttachedInfo=" + tmgAttachedInfo + ",TrustedFormId=" + trustedFormId + "," + TmgReturnValueString(tmgArrSelectedCampaigns[index]);
                var abc = FindBrowserDetails();
                if (abc.indexOf("Explorer;9") != -1) {
                    PostLeadsViaAjax_v2(finalString);
                    pause(1000);
                }
                else {
                    PostLeadsViaAjax(finalString);
                }
                tmgArrCampaignsWhoesLeadPosted.addItem(tmgArrSelectedCampaigns[index]);
            }
        }
        catch (ex) { PostError("COMSCR874:" + ex); }
    }
    return lrtnFlag;
}

/*START: trusted Form Related code lines */
var tmg_TF_CertificateId = "";
function trustedFormCertIdCallback(oval) {
    try {
        tmg_TF_CertificateId = 'https://cert.trustedform.com/' + oval;
    } catch (ex) { }
}
function GenerateTrustedFormScript() {
    var field = "xxTrustedFormCertUrl";
    var provideReferrer = false;
    var tfURI = "";
    var tf = document.createElement("script");
    tf.type = "text/javascript";
    tf.async = true;
    tfURI = "http" + ("https:" == document.location.protocol ? "s" : "")
    tfURI = tfURI + "://api.trustedform.com/trustedform.js?";
    tfURI = tfURI + "provide_referrer=" + escape(provideReferrer);
    tfURI = tfURI + "&field=" + escape(field);
    tfURI = tfURI + "&l=" + new Date().getTime() + Math.random();
    tf.src = tfURI;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(tf, s);
}
function CustomOperationForTrustedForm() {
    if (tmgTrustedFormFlag) {
        GenerateTrustedFormScript();
    }
}
/*END: trusted Form Related code lines */

//CODE :COMSCR005
function TMG_ShowMoreInfo(pObjectID, flag) {
    try {
        if (flag) {
            var arrAllCampaignsID = lAllCampaigns.split(",");
            for (i = 0; i < arrAllCampaignsID.length; i++) {
                var objMoreInfo = document.getElementById("MoreInfo$" + arrAllCampaignsID[i]);
                if (objMoreInfo != null) {
                    objMoreInfo.style.display = "none";
                }
            }
        }
        var objMoreInfo = document.getElementById(pObjectID);
        if (objMoreInfo.style.display == "none") {
            objMoreInfo.style.display = "block";
        }
        else {
            objMoreInfo.style.display = "none";
        }
    } catch (ex) { PostError("COMSCR005:" + tmgActiveCampaignId + ":" + ex); }
}
//CODE :COMSCR005-2
function TMG_ClickForCreativeMoreInfo(pObject) {
    try {
        var lCampId = pObject.id.split('$')[1];
        var lCreativeBlock = document.getElementById(pObject.id.replace("TMGMoreInfoAnchor", "CreativeMoreInfo"));
        var lMoreInfoClass = pObject.className;
        if (lMoreInfoClass.indexOf("Expand") != -1) {
            pObject.innerHTML = CustomeReplaceAll(tmgLessInfoContext, ":SQ:", "'");
            pObject.className = "TMG-Creative-MoreInfo-a-Collapse";
            lCreativeBlock.style["display"] = "inline";
        }
        if (lMoreInfoClass.indexOf("Collapse") != -1) {
            pObject.innerHTML = CustomeReplaceAll(tmgMoreInfoContext, ":SQ:", "'");
            pObject.className = "TMG-Creative-MoreInfo-a-Expand";
            lCreativeBlock.style["display"] = "none";
        }
    } catch (ex) {
        PostError("COMSCR005-2:" + lCampId + ":" + ex);
    }
}
//CODE :COMSCR005-3
function TMG_ClickForCreativeMoreInfoById(pCampId) {
    try {
        var lObject = document.getElementById("TMGMoreInfoAnchor$" + pCampId);
        var lCreativeBlock = document.getElementById("CreativeMoreInfo$" + pCampId);
        var lMoreInfoClass = lObject.className;
        if (lMoreInfoClass.indexOf("Expand") != -1) {
            lObject.innerHTML = CustomeReplaceAll(tmgLessInfoContext, ":SQ:", "'");
            lObject.className = "TMG-Creative-MoreInfo-a-Collapse";
            lCreativeBlock.style["display"] = "inline";
        }
        if (lMoreInfoClass.indexOf("Collapse") != -1) {
            lObject.innerHTML = CustomeReplaceAll(tmgMoreInfoContext, ":SQ:", "'");
            lObject.className = "TMG-Creative-MoreInfo-a-Expand";
            lCreativeBlock.style["display"] = "none";
        }
    } catch (ex) {
        PostError("COMSCR005-3:" + pCampId + ":" + ex);
    }
}
//CODE :COMSCR006
function TMG_CheckClick(pObject) {
    try {
        var controlName = pObject.name;
        tmgActiveCampaignId = controlName.split("$")[1];
        var arrControl = document.getElementsByName(pObject.name);
        var campaignsDropFieldArea = document.getElementById("TmgAdditionalFields$" + tmgActiveCampaignId);
        if (arrControl.length > 1) {
            if (pObject.id.split("$")[2] == "0") {
                if (!tmgIsFieldDropOnButtonClick) {
                    FillMappedDataIntoControls();
                    TmgShowHide(campaignsDropFieldArea, true);
                    var lDisclaimer = document.getElementById("TmgCampaignDisclaimer$" + tmgActiveCampaignId);
                    if (typeof (lDisclaimer) !== 'undefined' && lDisclaimer != null) {
                        TmgShowHide(lDisclaimer, true);
                    }
                    TmgShowHideBaseOnFieldsContains(campaignsDropFieldArea);
                }
                tmgArrSelectedCampaigns.addItem(tmgActiveCampaignId);
            }
            if (pObject.id.split("$")[2] == "1") {
                TmgShowHide(campaignsDropFieldArea, false);
                tmgArrSelectedCampaigns.removeItem(tmgActiveCampaignId);
                HideMe_ShowNext(tmgActiveCampaignId);
            }
        }
        else {
            if (pObject.checked) {
                if (!tmgIsFieldDropOnButtonClick) {
                    FillMappedDataIntoControls();
                    TmgShowHide(campaignsDropFieldArea, true);
                    var lDisclaimer = document.getElementById("TmgCampaignDisclaimer$" + tmgActiveCampaignId);
                    if (typeof (lDisclaimer) !== 'undefined' && lDisclaimer != null) {
                        TmgShowHide(lDisclaimer, true);
                    }
                    TmgShowHideBaseOnFieldsContains(campaignsDropFieldArea);
                }
                tmgArrSelectedCampaigns.addItem(tmgActiveCampaignId);
            }
            if (!pObject.checked) {
                TmgShowHide(campaignsDropFieldArea, false);
                tmgArrSelectedCampaigns.removeItem(tmgActiveCampaignId);
                HideMe_ShowNext(tmgActiveCampaignId);
            }
        }
    }
    catch (ex) {
        PostError("COMSCR006:" + tmgActiveCampaignId + ":" + ex);
    }
}
//CODE :COMSCR007
function TMG_CheckClickForSocialNetwork(pCamId, pFlag) {
    try {
        tmgActiveCampaignId = pCamId;
        var campaignsDropFieldArea = document.getElementById("TmgAdditionalFields$" + tmgActiveCampaignId);
        if (pFlag) {
            if (!tmgIsFieldDropOnButtonClick) {
                FillMappedDataIntoControls();
                TmgShowHide(campaignsDropFieldArea, true);
                var lDisclaimer = document.getElementById("TmgCampaignDisclaimer$" + tmgActiveCampaignId);
                if (typeof (lDisclaimer) !== 'undefined' && lDisclaimer != null) {
                    TmgShowHide(lDisclaimer, true);
                }
                TmgShowHideBaseOnFieldsContains(campaignsDropFieldArea);
            }
            tmgArrSelectedCampaigns.addItem(tmgActiveCampaignId);
        }
        if (!pFlag) {
            TmgShowHide(campaignsDropFieldArea, false);
            tmgArrSelectedCampaigns.removeItem(tmgActiveCampaignId);
        }
    }
    catch (ex) {
        PostError("COMSCR007:" + ex);
    }
}
//CODE :COMSCR008
function TMG_CheckClickForLinkOut(pObject, pLinkOutURI) {
    try {
        var flag = false;
        tmgActiveCampaignId = pObject.name.split("$")[1];
        if (pObject.type !== "") {
            if (document.getElementsByName(pObject.name)[0].checked) {
                /*FOR CHECKBOX & RADIO*/
                flag = true;
            }
        }
        else {
            /*FOR ANCHOR BUTTON*/
            flag = true;
        }
        if (flag) {
            if (parseInt(tmgActiveCampaignId) == 10692) {
                var queryKeyAndValue = "";
                var vrEmail = "";
                var vrZip = "";
                try {
                    FillMappedDataIntoControls();
                    vrEmail = document.getElementById('hFieldEMAIL').value;
                    vrZip = document.getElementById('hFieldZIP').value;
                } catch (ex) { }

                queryKeyAndValue = queryKeyAndValue + "s4=" + vrZip + "&";
                queryKeyAndValue = queryKeyAndValue + "s5=" + vrEmail;
                OpenPopupWindow(pLinkOutURI + "&" + queryKeyAndValue, tmgActiveCampaignId);
            }
            else {
                OpenPopupWindow(pLinkOutURI, tmgActiveCampaignId);
            }
            var lDisclaimer = document.getElementById("TmgCampaignDisclaimer$" + tmgActiveCampaignId);
            if (typeof (lDisclaimer) !== 'undefined' && lDisclaimer != null) {
                TmgShowHide(lDisclaimer, true);
            }
        }
        HideMe_ShowNext(tmgActiveCampaignId);
    }
    catch (ex) {
        PostError("COMSCR008:" + ex);
    }
}
//CODE :COMSCR009
function TMG_CheckClickForFullPage(pObject, pFullPageURI) {
    try {
        var flag = false;
        tmgActiveCampaignId = pObject.name.split("$")[1];
        if (pObject.type !== "") {
            if (document.getElementsByName(pObject.name)[0].checked) {
                /*FOR CHECKBOX & RADIO*/
                flag = true;
            }
        }
        else {
            /*FOR ANCHOR BUTTON*/
            flag = true;
        }
        if (flag) {
            FillMappedDataIntoControls();
            var queryKeyAndValue = "";
            var index = 0;
            var collection = eval("lFullPageKeyCollection_" + tmgActiveCampaignId).split(",");
            var oCert = document.getElementById('xxTrustedFormCertUrl_0');
            var trustedFormId = "";
            for (index = 0; index < collection.length; index++) {
                var lValue = document.getElementById(collection[index].split("!")[0]).value;
                var lKey = collection[index].split("!")[1];
                queryKeyAndValue = queryKeyAndValue + lKey + "=" + lValue + "&";
            }
            queryKeyAndValue = queryKeyAndValue + "placement=" + tmgPlacement + "&";
            queryKeyAndValue = queryKeyAndValue + "publisher=" + tmgPublisher + "&";
            queryKeyAndValue = queryKeyAndValue + "affid=" + tmgAffId + "&";
            queryKeyAndValue = queryKeyAndValue + "subid=" + tmgSubId + "&";
            queryKeyAndValue = queryKeyAndValue + "cpl=" + eval("lCPL_" + tmgActiveCampaignId) + "&";
            queryKeyAndValue = queryKeyAndValue + "cplfor=" + eval("lCPLEntryFor_" + tmgActiveCampaignId) + "&";
            queryKeyAndValue = queryKeyAndValue + "documentnumber=" + eval("lOptionDocumentNumber_" + tmgActiveCampaignId) + "&";
            queryKeyAndValue = queryKeyAndValue + "mainplacement=" + tmg_MainPlacement.toString() + "&";
            queryKeyAndValue = queryKeyAndValue + "hituniquekey=" + tmgHitUniqueKey + "&";
            queryKeyAndValue = queryKeyAndValue + "attachedinfo=" + tmgAttachedInfo + "&";
            queryKeyAndValue = queryKeyAndValue + "useragent=" + CustomeReplaceAll(tmg_UserAgent, ",", ";") + "&";
            if (oCert === null) {
                oCert = "";
                trustedFormId = tmg_TF_CertificateId;
            }
            else {
                trustedFormId = oCert.value;
            }
            queryKeyAndValue = queryKeyAndValue + "trustedformid=" + trustedFormId + "&";
            queryKeyAndValue = queryKeyAndValue + "redirect=http://ldsapi.tmginteractive.com/thankyou.aspx";
            OpenPopupWindow(pFullPageURI + "?" + queryKeyAndValue, tmgActiveCampaignId);
            var lDisclaimer = document.getElementById("TmgCampaignDisclaimer$" + tmgActiveCampaignId);
            if (typeof (lDisclaimer) !== 'undefined' && lDisclaimer != null) {
                TmgShowHide(lDisclaimer, true);
            }
        }
        HideMe_ShowNext(tmgActiveCampaignId);
    }
    catch (ex) {
        PostError("COMSCR009:" + ex);
    }
}
//CODE :COMSCR010
function TMG_CheckClickById(pCampId) {
    try {
        tmgActiveCampaignId = pCampId;
        var arrControl = document.getElementsByName("tmgControl$" + tmgActiveCampaignId);
        var campaignsDropFieldArea = document.getElementById("TmgAdditionalFields$" + tmgActiveCampaignId);
        if (arrControl.length > 1) {
            if (document.getElementById("tmgControl$" + tmgActiveCampaignId + "$0").checked) {
                if (!tmgIsFieldDropOnButtonClick) {
                    FillMappedDataIntoControls();
                    TmgShowHide(campaignsDropFieldArea, true);
                    var lDisclaimer = document.getElementById("TmgCampaignDisclaimer$" + tmgActiveCampaignId);
                    if (typeof (lDisclaimer) !== 'undefined' && lDisclaimer != null) {
                        TmgShowHide(lDisclaimer, true);
                    }
                    TmgShowHideBaseOnFieldsContains(campaignsDropFieldArea);
                }
                tmgArrSelectedCampaigns.addItem(tmgActiveCampaignId);
            }
            if (document.getElementById("tmgControl$" + pCampId + "$1").checked) {
                TmgShowHide(campaignsDropFieldArea, false);
                tmgArrSelectedCampaigns.removeItem(tmgActiveCampaignId);
                HideMe_ShowNext(tmgActiveCampaignId)
            }
        }
        else {
            if (document.getElementById("tmgControl$" + tmgActiveCampaignId + "$0").checked) {
                if (!tmgIsFieldDropOnButtonClick) {
                    FillMappedDataIntoControls();
                    TmgShowHide(campaignsDropFieldArea, true);
                    var lDisclaimer = document.getElementById("TmgCampaignDisclaimer$" + tmgActiveCampaignId);
                    if (typeof (lDisclaimer) !== 'undefined' && lDisclaimer != null) {
                        TmgShowHide(lDisclaimer, true);
                    }
                    TmgShowHideBaseOnFieldsContains(campaignsDropFieldArea);
                }
                tmgArrSelectedCampaigns.addItem(tmgActiveCampaignId);
            }
            else {
                TmgShowHide(campaignsDropFieldArea, false);
                tmgArrSelectedCampaigns.removeItem(tmgActiveCampaignId);
                HideMe_ShowNext(tmgActiveCampaignId)
            }
        }
    }
    catch (ex) {
        PostError("COMSCR010:" + tmgActiveCampaignId + ":" + ex);
    }
}
//CODE :COMSCR011
function TMG_CheckClickForLinkOutById(pCampId, pLinkOutURI) {
    try {
        var flag = false;
        tmgActiveCampaignId = pCampId;
        if (document.getElementById("tmgControl$" + tmgActiveCampaignId + "$0").type !== "") {
            if (document.getElementById("tmgControl$" + tmgActiveCampaignId + "$0").checked) {
                /*FOR CHECKBOX & RADIO*/
                flag = true;
            }
        }
        else {
            /*FOR ANCHOR BUTTON*/
            flag = true;
        }
        if (flag) {
            if (parseInt(tmgActiveCampaignId) == 10692) {
                var queryKeyAndValue = "";
                var vrEmail = "";
                var vrZip = "";
                try {
                    FillMappedDataIntoControls();
                    vrEmail = document.getElementById('hFieldEMAIL').value;
                    vrZip = document.getElementById('hFieldZIP').value;
                } catch (ex) { }

                queryKeyAndValue = queryKeyAndValue + "s4=" + vrZip + "&";
                queryKeyAndValue = queryKeyAndValue + "s5=" + vrEmail;
                OpenPopupWindow(pLinkOutURI + "&" + queryKeyAndValue, tmgActiveCampaignId);
            }
            else {
                OpenPopupWindow(pLinkOutURI, tmgActiveCampaignId);
            }
            var lDisclaimer = document.getElementById("TmgCampaignDisclaimer$" + tmgActiveCampaignId);
            if (typeof (lDisclaimer) !== 'undefined' && lDisclaimer != null) {
                TmgShowHide(lDisclaimer, true);
            }
        }
        HideMe_ShowNext(tmgActiveCampaignId);
    }
    catch (ex) {
        PostError("COMSCR011:" + ex);
    }
}
//CODE :COMSCR012
function TMG_CheckClickForFullPageById(pCampId, pFullPageURI) {
    try {
        var flag = false;
        tmgActiveCampaignId = pCampId;
        if (document.getElementById("tmgControl$" + tmgActiveCampaignId + "$0").type !== "") {
            if (document.getElementById("tmgControl$" + tmgActiveCampaignId + "$0").checked) {
                /*FOR CHECKBOX & RADIO*/
                flag = true;
            }
        }
        else {
            /*FOR ANCHOR BUTTON*/
            flag = true;
        }
        if (flag) {
            FillMappedDataIntoControls();
            var queryKeyAndValue = "";
            var index = 0;
            var collection = eval("lFullPageKeyCollection_" + tmgActiveCampaignId).split(",");
            var oCert = document.getElementById('xxTrustedFormCertUrl_0');
            var trustedFormId = "";
            for (index = 0; index < collection.length; index++) {
                var lValue = document.getElementById(collection[index].split("!")[0]).value;
                var lKey = collection[index].split("!")[1];
                queryKeyAndValue = queryKeyAndValue + lKey + "=" + lValue + "&";
            }
            queryKeyAndValue = queryKeyAndValue + "placement=" + tmgPlacement + "&";
            queryKeyAndValue = queryKeyAndValue + "publisher=" + tmgPublisher + "&";
            queryKeyAndValue = queryKeyAndValue + "affid=" + tmgAffId + "&";
            queryKeyAndValue = queryKeyAndValue + "subid=" + tmgSubId + "&";
            queryKeyAndValue = queryKeyAndValue + "cpl=" + eval("lCPL_" + tmgActiveCampaignId) + "&";
            queryKeyAndValue = queryKeyAndValue + "cplfor=" + eval("lCPLEntryFor_" + tmgActiveCampaignId) + "&";
            queryKeyAndValue = queryKeyAndValue + "documentnumber=" + eval("lOptionDocumentNumber_" + tmgActiveCampaignId) + "&";
            queryKeyAndValue = queryKeyAndValue + "mainplacement=" + tmg_MainPlacement.toString() + "&";
            queryKeyAndValue = queryKeyAndValue + "hituniquekey=" + tmgHitUniqueKey + "&";
            queryKeyAndValue = queryKeyAndValue + "attachedinfo=" + tmgAttachedInfo + "&";
            queryKeyAndValue = queryKeyAndValue + "useragent=" + CustomeReplaceAll(tmg_UserAgent, ",", ";") + "&";
            if (oCert === null) {
                oCert = "";
                trustedFormId = tmg_TF_CertificateId;
            }
            else {
                trustedFormId = oCert.value;
            }
            queryKeyAndValue = queryKeyAndValue + "trustedformid=" + trustedFormId + "&";
            queryKeyAndValue = queryKeyAndValue + "redirect=http://ldsapi.tmginteractive.com/thankyou.aspx";
            OpenPopupWindow(pFullPageURI + "?" + queryKeyAndValue, tmgActiveCampaignId);
            var lDisclaimer = document.getElementById("TmgCampaignDisclaimer$" + tmgActiveCampaignId);
            if (typeof (lDisclaimer) !== 'undefined' && lDisclaimer != null) {
                TmgShowHide(lDisclaimer, true);
            }
        }
        HideMe_ShowNext(tmgActiveCampaignId);
    }
    catch (ex) {
        PostError("COMSCR012:" + ex);
    }
}
//CODE :COMSCR013  :COMSCR014   :COMSCR015
function TMG_CheckForClick() {
    var errorLineNum = 0;
    try {
        if (tmgIsEmbeddedPlacement) {
            if (tmgOfferPreCheck) {
                var lAllCampIDShowed = lFinalOrderOfCampaignInDisplay.split(",");
                var i = 0;
                for (i = 0; i < lAllCampIDShowed.length; i++) {
                    if (i < tmgNumberOfOfferForPreCheck) {
                        var lCampId = lAllCampIDShowed[i].split("$")[1];
                        var lCampaignControl = document.getElementById("tmgControl$" + lCampId + "$0");
                        if (lCampaignControl.checked) {
                            lCampaignControl.onclick();
                        }
                    }
                }
            }
            if (tmgIsFieldDropOnButtonClick) {
                tmgIsFieldDropOnButtonClick = false;
                var i = 0;
                for (i = 0; i < tmgArrSelectedCampaigns.length; i++) {
                    var lCampaignControl = document.getElementById("tmgControl$" + tmgArrSelectedCampaigns[i] + "$0");
                    lCampaignControl.checked = true;
                    lCampaignControl.onclick();
                }
            }
        }
    } catch (ex) { PostError("COMSCR013:" + ex); }
    var isPageValid = true;
    try {
        errorLineNum = 1;
        if (!ValidateCampaignsFields()) return false;
        fn_FirexPixels();
        if (!ShowNextBunchOfCampaign()) return false;
        errorLineNum = 2;
        if (lAnswerMandatoryFlag) {
            errorLineNum = 3;
            var IsAnswerGiven = false;
            var counter;
            var isCheckBox = false;
            errorLineNum = 4;
            for (counter = 0; counter < tmgArrCurrentDisplayCamps.length; counter++) {
                var campaignControl = document.getElementsByName("tmgControl$" + tmgArrCurrentDisplayCamps[counter]);
                if (campaignControl === null) continue;
                if (campaignControl.length > 1) {
                    // Check if we have placed Image control instead Radio
                    if (campaignControl[0].type == "radio" && campaignControl[0].checked == false && campaignControl[1].checked == false) {
                        break;
                    }
                    if (campaignControl[0].type == "button" && campaignControl[0].className.indexOf("-hover") == -1 && campaignControl[1].className.indexOf("-hover") == -1) {
                        break;
                    }
                }
                else {
                    isCheckBox = true;
                    if (campaignControl[0].checked) {
                        IsAnswerGiven = true;
                        break;
                    }
                }
            }
            errorLineNum = 5;
            if (counter == tmgArrCurrentDisplayCamps.length && isCheckBox == false) {
                IsAnswerGiven = true;
            }
            errorLineNum = 6;
            if (!IsAnswerGiven) {
                try {
                    if (isCheckBox) {
                        alert("Kindly select one or more offers!");
                    }
                    else {
                        alert("Kindly select either Yes or No for all offers!");
                    }
                } catch (ex) { PostError("COMSCR014:" + ex); }
                return false;
            }
        }
        errorLineNum = 7;
        // CODE FOR MULTIPLE CALL AT A TIME
        if (tmgHadPostedLeads) { return true; }
        var finalString = "";
        var index = 0;
        var trustedFormId = "";
        errorLineNum = 8;

        //Manage Impressions
        TrackCommonImpression("SUBMIT", tmgArrCurrentDisplayCamps.toString());

        errorLineNum = 13;
        for (index = 0; index < tmgArrSelectedCampaigns.length; index++) {
            if (FindIndexOfMatchedValue(tmgArrSelectedCampaigns[index], tmgArrCampaignsWhoesLeadPosted) != -1) continue;
            var oCert = document.getElementById('xxTrustedFormCertUrl_0');
            errorLineNum = 14;
            if (oCert === null) {
                oCert = "";
                trustedFormId = tmg_TF_CertificateId;
            }
            else {
                trustedFormId = oCert.value;
            }
            errorLineNum = 15;
            finalString = "http" + tmgSSLKey + "://" + tmgMyURI + "/ProcessCampaignData/ProcessCampaignData.aspx?" + "ID=" + tmgArrSelectedCampaigns[index] + "&QS=tmg_affid=" + ManageAffIdSubIdValueEncode(tmgAffId) + ",tmg_subid=" + ManageAffIdSubIdValueEncode(tmgSubId) + ",cCampId=" + tmgArrSelectedCampaigns[index] + ",PublisherId=" + tmgPublisher + ",PlacementId=" + tmgPlacement + ",AttachedInfo=" + tmgAttachedInfo + ",TrustedFormId=" + trustedFormId + "," + TmgReturnValueString(tmgArrSelectedCampaigns[index]);
            errorLineNum = 16;
            var abc = FindBrowserDetails();
            if (abc.indexOf("Explorer;9") != -1) {
                PostLeadsViaAjax_v2(finalString);
                pause(1000);
            }
            else {
                PostLeadsViaAjax(finalString);
            }
            errorLineNum = 17;
        }
        tmgHadPostedLeads = true;
        errorLineNum = 19;
        if (tmgRedirectTo != "#") {
            window.location.href = decodeURIComponent(tmgRedirectTo);
        }
        errorLineNum = 20;
    }
    catch (ex) {
        PostError("COMSCR015:" + errorLineNum + ":" + ex);
        isPageValid = true;
    }
    return isPageValid;
}
function TMG_Skip() {
    if (tmgRedirectTo != "#") {
        window.location.href = decodeURIComponent(tmgRedirectTo);
    }
}
//CODE :COMSCR016
function TMG_NoThanks() {
    try {
        //Manage Impressions
        TrackCommonImpression("SUBMIT", tmgArrCurrentDisplayCamps.toString());
    } catch (ex) {
        PostError("COMSCR016:" + ex);
    }
    if (tmgRedirectTo != "#") {
        window.location.href = decodeURIComponent(tmgRedirectTo);
    }
    return true;
}
//CODE :COMSCR017
function TMG_CheckForAll() {
    try {
        var index = 0;
        for (index = 0; index < tmgArrCurrentDisplayCamps.length; index++) {
            var campaignControl = document.getElementById("tmgControl$" + tmgArrCurrentDisplayCamps[index] + "$0");
            campaignControl.checked = true;
            campaignControl.onclick();
        }
    }
    catch (ex) {
        PostError("COMSCR017:" + ex);
    }
}
//CODE :COMSCR018
function TMG_FillValueWithSameBaseField(pObject) {
    try {
        var fieldValue = TmgFetchControlValueBaseOnType(pObject.id);
        var baseFiledKey = pObject.id.replace("F_" + pObject.id.split("_")[1] + "_", "");
        var arrCampaigns = lAllCampaigns.split(",");
        var index = 0;
        for (index = 0; index < arrCampaigns.length; index++) {
            var fieldID = "F_" + arrCampaigns[index] + "_" + baseFiledKey;
            var objField = document.getElementById(fieldID);
            if (objField != null) {
                objField.value = fieldValue;
            }
        }
    }
    catch (ex) {
        PostError("COMSCR018:" + ex);
    }
}
//CODE :COMSCR019
function TMG_ValidateCampaignsFieldsOnChange(pObjectId) {
    try {
        var baseFiledKey = pObjectId.replace("F_" + pObjectId.split("_")[1] + "_", "");
        var index = 0;
        for (index = 0; index < tmgArrSelectedCampaigns.length; index++) {
            var fieldID = "F_" + tmgArrSelectedCampaigns[index] + "_" + baseFiledKey;
            if (eval("lCampaignFields_" + tmgArrSelectedCampaigns[index]).indexOf(fieldID) == -1) continue;
            if (IsValidValue(fieldID)) {
                SetValidColor(true, fieldID);
            }
            else {
                SetValidColor(false, fieldID);
            }
        }
        CheckForValidateAgain();
    }
    catch (ex) {
        PostError("COMSCR019:" + ex);
    }
}
//CODE :COMSCR020
function TMG_DropOfferThroughField() {
    try {
        //Check for offer dropped : True or false
        if (!tmgOfferDroped) {
            tmgOfferDroped = true;
            TMG_DisplayOffers();
        }
    }
    catch (ex) {
        PostError("COMSCR020:" + ex)
    }
}

//CODE :COMSCR027
//var lTrackPrePingKey = GetDateStringInFormat(new Date(), 'YYYYMMDDhhmmssmmm');
//function TMG_PrePingValidateEmail(pCampaignID) {
//    var lResponse = "";
//    try {
//        // Get Email Address
//        var lArrayMappedFields = lMappedClientFields.split("--");
//        var lInfoCollection = lArrayMappedFields[FindIndexOfMatchedValue("EMAIL", lArrayMappedFields, ",", 0)].split(",");
//        var lEmailAddress = TmgFetchMappedControlValue(lInfoCollection[2], lInfoCollection[3], null)
//        PostError("INFO:" + lTrackPrePingKey + ":" + tmgPlacement + ":" + lEmailAddress);
//        if (lEmailAddress == "") {
//            PostError("INFO:" + lTrackPrePingKey + ":" + tmgPlacement + ":Empty");
//            eval(" lValidateEmailFlag_" + pCampaignID + "=2");
//            return;
//        }
//        var lUri = "././PrePingServiceExecution.ashx?id=" + pCampaignID + "&key=" + lEmailAddress + "&rndkey=" + lTrackPrePingKey;
//        xmlHttp = FindXmlHttpObjectBasedOnUserAgent();
//        if (xmlHttp) {
//            xmlHttp.open("GET", lUri, false);
//            xmlHttp.onreadystatechange = function() {
//                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//                    lResponse = xmlHttp.responseText;
//                    eval(" lValidateEmailFlag_" + pCampaignID + "=" + lResponse + "");
//                }
//            };
//            xmlHttp.send();
//        }
//    }
//    catch (ex) {
//        PostError("COMSCR027:" + ex)
//        lResponse = ex;
//    }
//    PostError("INFO:" + lTrackPrePingKey + ":" + tmgPlacement + ":" + lResponse+"");
//}

//CODE :COMSCR021  :COMSCR022   :COMSCR023
function TMG_DisplayOffers() {
    //START: Adjust Control Width & align for IE 7,8
    try {
        // Check if our InternalFlag exist with page query.
        var lInternalFlag = GetClientQueryParameterByName("internalflag");
        if (lInternalFlag == "viewonly") {
            eval("tmgShowingLiveViewOnly_" + tmgHitUniqueKey + "=true;");
        }

        if (FindBrowserDetails().indexOf("Explorer") != -1) {
            var lDisplayOfferContainer = document.getElementById("tmgDisplayOfferContainer");
            if (lDisplayOfferContainer !== null && lDisplayOfferContainer !== "undefined") {
                var lcamps = lAllCampaigns.split(",");
                var i = 0;
                for (i = 0; i < lcamps.length; i++) {
                    var lDivControl = document.getElementById("TmgCampaignControl$" + lcamps[i] + "$0");
                    lDivControl.style["width"] = (lDivControl.style.pixelWidth + 5) + "px"
                    //lDivControl = document.getElementById("TmgCampaignControl$" + lcamps[i] + "$1");
                    //lDivControl.style["width"] = (lDivControl.style.pixelWidth + 5) + "px"
                }
            }
            //            else {
            //                var lcamps = lAllCampaigns.split(",");
            //                var i = 0;
            //                for (i = 0; i < lcamps.length; i++) {
            //                    var lInput = document.getElementById("tmgControl$" + lcamps[i] + "$0");
            //                    lInput.parentNode.style["width"] = (lInput.parentNode.style.pixelWidth + 5) + "px";
            //                }
            //            }
        }
    }
    catch (ex) {
    }
    //END: Adjust Control Width & align for IE 7,8

    tmgCheckForClickCallOnLoad = true;
    try {
        // Fetch base data from client Query String
        if (tmgIsClientQueryStringPass) {
            var lClientQueryCollection = lClientQueryString.split(",");
            if (lClientQueryCollection != "") {
                var i = 0;
                for (i = 0; i < lClientQueryCollection.length; i++) {
                    document.getElementById(lClientQueryCollection[i].split("$")[1]).value = GetClientQueryParameterByName(lClientQueryCollection[i].split("$")[0]);
                }
            }
        }
    }
    catch (ex) {
        PostError("COMSCR021:" + ex)
    }
    try {
        //Check for offer droped : True or false
        if (!tmgHostingTracked) {
            tmgHostingTracked = true;
            //ReportPlacementHosting()
        }
    }
    catch (ex) {
        PostError("COMSCR022:" + ex)
    }
    try {
        document.getElementById("TmgOffers").style.display = "block";
        var i = 0;
        // Move Back in Original Place
        var allCampID_ToShow = lFinalOrderOfCampaignInDisplay.split(",");
        if (tmgShowOfferOneTime) {
            try {
                for (i = 0; i < allCampID_ToShow.length; i++) {
                    if (allCampID_ToShow[i] == "") break;
                    var Index = allCampID_ToShow[i].split("$")[0];
                    var CampId = allCampID_ToShow[i].split("$")[1];
                    var DisplayArea = document.getElementById("TMGOfferTD" + Index);
                    var HiddenArea = document.getElementById("TMGOfferTR$" + CampId);
                    HiddenArea.innerHTML = DisplayArea.innerHTML;
                    DisplayArea.innerHTML = "&nbsp;";
                    // Uncheck campaign in case pre-check
                    var campControl = document.getElementsByName("tmgControl$" + CampId);
                    var campaignsDropFieldArea = document.getElementById("TmgAdditionalFields$" + CampId);

                    if (campControl.length > 1) {
                        // redio button
                        campControl[0].checked = false;
                        campControl[1].checked = false;
                    }
                    else {
                        campControl[0].checked = false;
                        // check box
                    }
                    if (campaignsDropFieldArea != null) {
                        TmgShowHide(campaignsDropFieldArea, false);
                    }
                    tmgArrSelectedCampaigns.removeItem(CampId);
                }
            } catch (ex) { }
        }
        // Regenerate Display Order
        var AllCampaignsWithOriginalOrder = lAllCampaigns.split(",");
        lFinalOrderOfCampaignInDisplay = "";
        CampaignsFindTargetedToDisplay = lTrueTargetedCampaigns.split(",");
        var NumberOfTargetedCamapigns = CampaignsFindTargetedToDisplay.length;
        var IndexForOriginalOrder = 0;
        for (i = 0; i < parseInt(lNumberOfCampaignsToDisplay) + parseInt(lNumberOfPrepingCampaign); i++) {
            if (i > (AllCampaignsWithOriginalOrder.length - 1)) continue;
            var Index = i + 1;
            //Get Targeted First
            if (i < NumberOfTargetedCamapigns) {
                if (CampaignsFindTargetedToDisplay[i] != "") {
                    // Add in order
                    lFinalOrderOfCampaignInDisplay = lFinalOrderOfCampaignInDisplay + Index + "$" + CampaignsFindTargetedToDisplay[i].split("$")[0] + ",";
                    continue;
                }
            }
            //NOW Follow Other camapigns too
            var tempCampaignId = AllCampaignsWithOriginalOrder[IndexForOriginalOrder];
            //Skip Until found campaignID which is not in hidden part and not in targeted.
            while (lFalseTargetedCampaigns.indexOf(tempCampaignId + "$") != "-1" || lFinalOrderOfCampaignInDisplay.indexOf("$" + tempCampaignId) != "-1") {
                IndexForOriginalOrder = IndexForOriginalOrder + 1;
                tempCampaignId = AllCampaignsWithOriginalOrder[IndexForOriginalOrder];
            }
            if (IndexForOriginalOrder < AllCampaignsWithOriginalOrder.length) {
                // Add in order
                lFinalOrderOfCampaignInDisplay = lFinalOrderOfCampaignInDisplay + Index + "$" + AllCampaignsWithOriginalOrder[IndexForOriginalOrder] + ",";
                IndexForOriginalOrder = IndexForOriginalOrder + 1;
            }
        }
        lFinalOrderOfCampaignInDisplay = lFinalOrderOfCampaignInDisplay.substring(0, lFinalOrderOfCampaignInDisplay.length - 1);
        // Validate campaigns with email via pre-ping process
        Index = 1;
        IndexForOriginalOrder = 0;
        i = 0;
        var arrCampaigns = lFinalOrderOfCampaignInDisplay.split(",");
        lFinalOrderOfCampaignInDisplay = "";
        while (Index <= lNumberOfCampaignsToDisplay) {
            if (IndexForOriginalOrder >= arrCampaigns.length) {
                break;
            }
            var tempCampaignId = arrCampaigns[IndexForOriginalOrder].split("$")[1];
            if (FindIndexOfMatchedValue(tempCampaignId, lPrePingCampaigns.split(",")) != -1) {
                // Commented due to js pre ping check
                //                if (eval("lValidateEmailFlag_" + tempCampaignId) == 0) {
                //                    // fire pre-ping
                //                    TMG_PrePingValidateEmail(parseInt(tempCampaignId));
                //                }
                // Added condition due Skip pre ping check while email blank
                if (eval("lValidateEmailFlag_" + tempCampaignId) != 0) {
                    // Check if pre-ping exist in cache memory
                    if (eval("lValidateEmailFlag_" + tempCampaignId) != 1) {
                        //                    PostError("INFO:" + lTrackPrePingKey + ":" + tmgPlacement + ":Not Servive");
                        IndexForOriginalOrder = IndexForOriginalOrder + 1;
                        continue;
                    }
                }
            }
            lFinalOrderOfCampaignInDisplay = lFinalOrderOfCampaignInDisplay + Index + "$" + tempCampaignId + ",";
            Index = Index + 1;
            IndexForOriginalOrder = IndexForOriginalOrder + 1;
        }
        if (lFinalOrderOfCampaignInDisplay != "") {
            lFinalOrderOfCampaignInDisplay = lFinalOrderOfCampaignInDisplay.substring(0, lFinalOrderOfCampaignInDisplay.length - 1);
            // Move Main Areas
            allCampID_ToShow = lFinalOrderOfCampaignInDisplay.split(",");
            tmgArrCurrentDisplayCamps = new Array();
            for (i = 0; i < allCampID_ToShow.length; i++) {
                var Index = allCampID_ToShow[i].split("$")[0];
                var CampId = allCampID_ToShow[i].split("$")[1];
                tmgArrCurrentDisplayCamps.addItem(CampId);
                var DisplayArea = document.getElementById("TMGOfferTD" + Index);
                var HiddenArea = document.getElementById("TMGOfferTR$" + CampId);
                DisplayArea.innerHTML = HiddenArea.innerHTML;
                HiddenArea.innerHTML = "&nbsp;";
                try {
                    if (tmgOfferPreCheck && i < tmgNumberOfOfferForPreCheck) {
                        var campaignControl = document.getElementById("tmgControl$" + CampId + "$0");
                        campaignControl.checked = true;
                        if (!tmgIsEmbeddedPlacement) {
                            campaignControl.onclick();
                        }
                        else {
                            tmgArrSelectedCampaigns.addItem(CampId);
                        }
                    }
                } catch (ex) { }
            }
            //Display campaign which would display intially if camps hide on click
            //Manage Impressions
            if (tmg_hideCampOnClick) {
                for (i = 0; i < tmg_NumOfCampShowIntially; i++) {
                    if (i >= tmgArrCurrentDisplayCamps.length) continue;
                    tmgArrCampaignsDisplayed.push(tmgArrCurrentDisplayCamps[i]);
                    tmgDisplayCampaignsRowIndex = i;
                }
                TrackCommonImpression("LOAD", tmgArrCampaignsDisplayed.toString());
            }
            else {
                //Show camapign in bunch functionality
                //Adding Displayed campaigns for impressions
                //Manage Impressions
                if (tmg_ShowCampInBunchFunctionality) {
                    for (i = 0; i < tmg_CampaignInABunch; i++) {
                        if (i >= tmgArrCurrentDisplayCamps.length) continue;
                        tmgArrCampaignsDisplayed.push(tmgArrCurrentDisplayCamps[i]);
                    }
                    TrackCommonImpression("LOAD", tmgArrCampaignsDisplayed.toString());
                }
                else {
                    TrackCommonImpression("LOAD", "");
                }
            }
        }
        var findButton = document.getElementById("TmgButton$" + tmgPlacement);
        if (findButton !== null) {
            findButton.style.display = "block";
        }
    }
    catch (ex) {
        PostError("COMSCR023:" + ex);
    }
    if (!tmgShowOfferOneTime) {
        CustomOperationForTrustedForm();
    }
    tmgShowOfferOneTime = true;
}

//CODE :COMSCR024
function TMG_FillNextControlCampaignField(pFromObject, pToObjectId, pCampaignId) {
    try {
        var thisStructureId = pFromObject.id;
        var nextStructureId = pToObjectId;
        var ddlNext = document.getElementById(pToObjectId);
        var selectedValue = pFromObject.options[pFromObject.selectedIndex].value;

        //Clear Existing Options
        while (ddlNext.hasChildNodes()) {
            ddlNext.removeChild(ddlNext.childNodes[0]);
        }
        var optn = document.createElement("OPTION");
        optn.value = "-1";
        optn.text = "Select One";
        optn.selected = "selected";
        ddlNext.options.add(optn);

        //Finding all Conditional Structure options
        var arrConditionStructureData = document.getElementById("hConditionalStructureData").value.split("~");

        // Get Parent Id based on selected value of condition structure field
        var lParentId = -1;
        for (i = 0; i < arrConditionStructureData.length; i++) {
            var lArrData = arrConditionStructureData[i].split(",");
            if (lArrData[0] == pCampaignId && lArrData[1] == thisStructureId && lArrData[5] == selectedValue) {
                lParentId = lArrData[2];
                break;
            }
        }

        // Finally adding all its options
        for (i = 0; i < arrConditionStructureData.length; i++) {
            var lArrData = arrConditionStructureData[i].split(",");
            if (lArrData[0] == pCampaignId && lArrData[1] == nextStructureId && lArrData[3] == lParentId) {
                var optn = document.createElement("OPTION");
                optn.text = lArrData[4];
                optn.value = lArrData[5];
                ddlNext.options.add(optn);
            }
        }
    }
    catch (ex) {
        PostError("COMSCR024:" + ex);
    }
}
//CODE :COMSCR025
function TMG_AttacheEventOnFieldForOfferDrop(pFieldKey, pFieldEvent, pFieldType) {
    try {
        var objectField;
        if (pFieldType == "ID") {
            objectField = document.getElementById(pFieldKey);
            addEvent(objectField, pFieldEvent, TMG_DropOfferThroughField, false);
        }
        if (pFieldType == "NAME") {
            objectField = document.getElementsByName(pFieldKey);
            var i;
            for (i = 0; i < objectField.length; i++) {
                addEvent(objectField[i], pFieldEvent, TMG_DropOfferThroughField, false);
            }
        }
        // TODO: In case pre-field control
        //        if (TmgFetchMappedControlValue(pFieldKey, pFieldType, null) != "") {
        //            TMG_DropOfferThroughField();
        //        }
    }
    catch (ex) {
        PostError("COMSCR025:" + ex)
    }
}

//CODE :COMSCR026
function TMG_ExecuteOnPageLoad() {
    try {
        // Show Script on page load for IE
        if (tmgCheckForClickCallOnLoad == false) {
            if (lExecuteLines.indexOf("TMG_AttacheEventOnFieldForOfferDrop") == -1) {
                TMG_DisplayOffers();
            }
        }
        eval(CustomeReplaceAll(lExecuteLines, "&&", "'"));
    }
    catch (ex) {
        PostError("COMSCR026:" + ex)
    }

    try {
        ExternalCodeLine_10606();
        ExternalCodeLine_10474();
        ExternalCodeLine_10713();
        ExternalCodeLine_10956();
        ExternalCodeLine_10957();
    }
    catch (ex) { }
}
addEvent(window, "load", TMG_ExecuteOnPageLoad, false);

/* START : Additional Code for Campaign 10957 */
// Require new code line
//   1 To add Dynamic Question drop on existing question ans selection,
//   2 To add Image above all text
function ExternalCodeLine_10957() {
    try {
        // Check 10957 exists
        if (FindIndexOfMatchedValue('10957', lAllCampaigns.split(',')) != -1) {
            // Replace Image..
            var lImg = document.getElementById("TmgAdditionalFields$10957").getElementsByTagName("img")[0];
            if (lImg != null && lImg != "undefined") {
                lImg.src = "http" + tmgSSLKey + "://pix.tmginteractive.com/ns/images/FieldDropImg_10957.jpg";
                lImg.removeAttribute('width');
                lImg.removeAttribute('height');
                lImg.style["width"] = "100%";
                lImg.style["height"] = "auto";
                lImg.style["maxWidth"] = "460px";
            }
            else {
                var lDiv = document.getElementById("TmgAdditionalFields$10957").getElementsByTagName("div")[2];
                lDiv.style["height"] = "auto";
                lDiv.innerHTML = "<img src='http" + tmgSSLKey + "://pix.tmginteractive.com/ns/images/FieldDropImg_10957.jpg' style='width:100%;height:auto;max-width:460px;'>";
            }
            // Addition Style for Questions.
            var lArrQuestion = ["F_10957_40275_TABLE", "F_10957_40307_TABLE"];
            for (i = 0; i < lArrQuestion.length; i++) {
                var lFieldHeading = document.getElementById(lArrQuestion[i]).getElementsByTagName("span")[0];
                lFieldHeading.style["display"] = "block";
                lFieldHeading.style["fontWeight"] = "bold";
                lFieldHeading.style["marginTop"] = "5px";
                lFieldHeading.style["marginBottom"] = "5px";
            }
            // Hide Question
            var lHideQuestion = ["F_10957_40302_TABLE", "F_10957_40303_TABLE", "F_10957_40304_TABLE", "F_10957_40305_TABLE", "F_10957_40306_TABLE", "F_10957_40307_TABLE"];
            for (i = 0; i < lHideQuestion.length; i++) {
                document.getElementById(lHideQuestion[i]).style["display"] = "none";
            }
            //Adding Dynaic Question Show Hide Code
            var lArrAnswers_40275 = document.getElementsByName("F_10957_40275");
            for (i = 0; i < lArrAnswers_40275.length; i++) {
                addEvent(lArrAnswers_40275[i], "click", ShowDynamicQuestion_10957_40275, false);
            }
        }
    }
    catch (ex) { }
}
function ShowDynamicQuestion_10957_40275() {
    var lHideQuestion = ["F_10957_40302_TABLE", "F_10957_40303_TABLE", "F_10957_40304_TABLE", "F_10957_40305_TABLE", "F_10957_40306_TABLE", "F_10957_40307_TABLE"];
    var lObj = document.getElementsByName("F_10957_40275");
    var i, j;
    for (i = 0; i < lObj.length; i++) {
        if (lObj[i].checked) break;
    }
    if (lObj[i].value == "38539") {
        for (j = 0; j < lHideQuestion.length; j++) {
            document.getElementById(lHideQuestion[j]).style["display"] = "block";
        }
    }
    if (lObj[i].value == "38540") {
        for (j = 0; j < lHideQuestion.length; j++) {
            document.getElementById(lHideQuestion[j]).style["display"] = "none";
        }
    }
    // Clear all Fiels
    var lArrAnswers = ["F_10957_40303", "F_10957_40304", "F_10957_40305", "F_10957_40306"]
    for (j = 0; j < lArrAnswers.length; j++) {
        document.getElementById(lArrAnswers[j]).selectedIndex = 0;
    }
    var lArrAnswers_40307 = document.getElementsByName("F_10957_40307");
    for (j = 0; j < lArrAnswers_40307.length; j++) {
        lArrAnswers_40307[j].checked = false;
    }
}
/* END : Additional Code for Campaign 10957 */


/* START : Additional Code for Campaign 10956 */
// Require new code line
//   1 To add Dynamic Question drop on existing question ans selection,
//   2 To add Image above all text
function ExternalCodeLine_10956() {
    try {
        // Check 10956 exists
        if (FindIndexOfMatchedValue('10956', lAllCampaigns.split(',')) != -1) {
            // Replace Image..
            var lImg = document.getElementById("TmgAdditionalFields$10956").getElementsByTagName("img")[0];
            if (lImg != null && lImg != "undefined") {
                lImg.src = "http" + tmgSSLKey + "://pix.tmginteractive.com/ns/images/FieldDropImg_10956.jpg";
                lImg.removeAttribute('width');
                lImg.removeAttribute('height');
                lImg.style["width"] = "100%";
                lImg.style["height"] = "auto";
                lImg.style["maxWidth"] = "460px";
            }
            else {
                var lDiv = document.getElementById("TmgAdditionalFields$10956").getElementsByTagName("div")[2];
                lDiv.style["height"] = "auto";
                lDiv.innerHTML = "<img src='http" + tmgSSLKey + "://pix.tmginteractive.com/ns/images/FieldDropImg_10956.jpg' style='width:100%;height:auto;max-width:460px;'>";
            }
            // Addition Style for Questions.
            var lArrQuestion = ["F_10956_40272_TABLE", "F_10956_40314_TABLE"];
            for (i = 0; i < lArrQuestion.length; i++) {
                var lFieldHeading = document.getElementById(lArrQuestion[i]).getElementsByTagName("span")[0];
                lFieldHeading.style["display"] = "block";
                lFieldHeading.style["fontWeight"] = "bold";
                lFieldHeading.style["marginTop"] = "5px";
                lFieldHeading.style["marginBottom"] = "5px";
            }
            // Hide Question
            var lHideQuestion = ["F_10956_40309_TABLE", "F_10956_40310_TABLE", "F_10956_40311_TABLE", "F_10956_40312_TABLE", "F_10956_40313_TABLE", "F_10956_40314_TABLE"]
            for (i = 0; i < lHideQuestion.length; i++) {
                document.getElementById(lHideQuestion[i]).style["display"] = "none";
            }
            //Adding Dynaic Question Show Hide Code
            var lArrAnswers_40272 = document.getElementsByName("F_10956_40272");
            for (i = 0; i < lArrAnswers_40272.length; i++) {
                addEvent(lArrAnswers_40272[i], "click", ShowDynamicQuestion_10956_40272, false);
            }
        }
    }
    catch (ex) { }
}
function ShowDynamicQuestion_10956_40272() {
    var lHideQuestion = ["F_10956_40309_TABLE", "F_10956_40310_TABLE", "F_10956_40311_TABLE", "F_10956_40312_TABLE", "F_10956_40313_TABLE", "F_10956_40314_TABLE"]
    var lObj = document.getElementsByName("F_10956_40272");
    var i, j;
    for (i = 0; i < lObj.length; i++) {
        if (lObj[i].checked) break;
    }
    if (lObj[i].value == "38539") {
        for (j = 0; j < lHideQuestion.length; j++) {
            document.getElementById(lHideQuestion[j]).style["display"] = "block";
        }
    }
    if (lObj[i].value == "38540") {
        for (j = 0; j < lHideQuestion.length; j++) {
            document.getElementById(lHideQuestion[j]).style["display"] = "none";
        }
    }
    // Clear all Fiels
    var lArrAnswers = ["F_10956_40310", "F_10956_40311", "F_10956_40312", "F_10956_40313"]
    for (j = 0; j < lArrAnswers.length; j++) {
        document.getElementById(lArrAnswers[j]).selectedIndex = 0;
    }
    var lArrAnswers_40314 = document.getElementsByName("F_10956_40314");
    for (j = 0; j < lArrAnswers_40314.length; j++) {
        lArrAnswers_40314[j].checked = false;
    }
}
/* END : Additional Code for Campaign 10956 */


/* START : Additional Code for Campaign 10606 */
// Require new code line
//   1 To add Dynamic Question drop on existing question ans selection,
//   2 To add Image above all text
function ExternalCodeLine_10606() {
    try {
        // Check 10606 exists
        if (FindIndexOfMatchedValue('10606', lAllCampaigns.split(',')) != -1) {
            // Replace Image..
            var lImg = document.getElementById("TmgAdditionalFields$10606").getElementsByTagName("img")[0];
            if (lImg != null && lImg != "undefined") {
                lImg.src = "http" + tmgSSLKey + "://pix.tmginteractive.com/ns/images/FieldDropImg_10606.jpg";
                lImg.removeAttribute('width');
                lImg.removeAttribute('height');
                lImg.style["width"] = "100%";
                lImg.style["height"] = "auto";
                lImg.style["maxWidth"] = "460px";
            }
            else {
                var lDiv = document.getElementById("TmgAdditionalFields$10606").getElementsByTagName("div")[2];
                lDiv.style["height"] = "auto";
                lDiv.innerHTML = "<img src='http" + tmgSSLKey + "://pix.tmginteractive.com/ns/images/FieldDropImg_10606.jpg' style='width:100%;height:auto;max-width:460px;'>";
            }
            // Addition Style for Questions.
            var lArrQuestion = ["F_10606_37800_TABLE", "F_10606_36707_TABLE"];
            for (i = 0; i < lArrQuestion.length; i++) {
                var lFieldHeading = document.getElementById(lArrQuestion[i]).getElementsByTagName("span")[0];
                lFieldHeading.style["display"] = "block";
                lFieldHeading.style["fontWeight"] = "bold";
                lFieldHeading.style["marginTop"] = "5px";
                lFieldHeading.style["marginBottom"] = "5px";
            }
            // Hide Question
            var lHideQuestion = ["F_10606_37801_TABLE", "F_10606_37802_TABLE", "F_10606_37803_TABLE", "F_10606_37804_TABLE", "F_10606_37805_TABLE", "F_10606_36707_TABLE"]
            for (i = 0; i < lHideQuestion.length; i++) {
                document.getElementById(lHideQuestion[i]).style["display"] = "none";
            }
            //Adding Dynaic Question Show Hide Code
            var lArrAnswers_37800 = document.getElementsByName("F_10606_37800");
            for (i = 0; i < lArrAnswers_37800.length; i++) {
                addEvent(lArrAnswers_37800[i], "click", ShowDynamicQuestion_10606_37800, false);
            }
        }
    }
    catch (ex) { }
}
function ShowDynamicQuestion_10606_37800() {
    var lHideQuestion = ["F_10606_37801_TABLE", "F_10606_37802_TABLE", "F_10606_37803_TABLE", "F_10606_37804_TABLE", "F_10606_37805_TABLE", "F_10606_36707_TABLE"]
    var lObj = document.getElementsByName("F_10606_37800");
    var i, j;
    for (i = 0; i < lObj.length; i++) {
        if (lObj[i].checked) break;
    }
    if (lObj[i].value == "38539") {
        for (j = 0; j < lHideQuestion.length; j++) {
            document.getElementById(lHideQuestion[j]).style["display"] = "block";
        }
    }
    if (lObj[i].value == "38540") {
        for (j = 0; j < lHideQuestion.length; j++) {
            document.getElementById(lHideQuestion[j]).style["display"] = "none";
        }
    }
    // Clear all Fiels
    var lArrAnswers = ["F_10606_37802", "F_10606_37803", "F_10606_37804", "F_10606_37805"]
    for (j = 0; j < lArrAnswers.length; j++) {
        document.getElementById(lArrAnswers[j]).selectedIndex = 0;
    }
    var lArrAnswers_36707 = document.getElementsByName("F_10606_36707");
    for (j = 0; j < lArrAnswers_36707.length; j++) {
        lArrAnswers_36707[j].checked = false;
    }
}
/* END : Additional Code for Campaign 10606 */

/* START : Additional Code for Campaign 10474 */
// Require new code line
//   1 To add Dynamic Question drop on existing question ans selection,
//   2 To add Image above all text
function ExternalCodeLine_10474() {
    try {
        // Check 10606 exists
        if (FindIndexOfMatchedValue('10474', lAllCampaigns.split(',')) != -1) {
            // Replace Image..
            var lImg = document.getElementById("TmgAdditionalFields$10474").getElementsByTagName("img")[0];
            if (lImg != null && lImg != "undefined") {
                lImg.src = "http" + tmgSSLKey + "://pix.tmginteractive.com/ns/images/FieldDropImg_10474.jpg";
                lImg.removeAttribute('width');
                lImg.removeAttribute('height');
                lImg.style["width"] = "100%";
                lImg.style["height"] = "auto";
                lImg.style["maxWidth"] = "400px";
            }
            else {
                var lDiv = document.getElementById("TmgAdditionalFields$10474").getElementsByTagName("div")[2];
                lDiv.style["height"] = "auto";
                lDiv.innerHTML = "<img src='http" + tmgSSLKey + "://pix.tmginteractive.com/ns/images/FieldDropImg_10474.jpg' style='width:100%;height:auto;max-width:400px;'>";
            }

            // Hide Question
            var lHideQuestion = ["F_10474_37753_TABLE", "F_10474_37754_TABLE", "F_10474_37755_TABLE", "F_10474_37756_TABLE", "F_10474_37757_TABLE", "F_10474_37758_TABLE"]
            for (i = 0; i < lHideQuestion.length; i++) {
                document.getElementById(lHideQuestion[i]).style["display"] = "none";
            }
            //Adding Dynaic Question Show Hide Code
            var lArrAnswers_37751 = document.getElementsByName("F_10474_37751");
            for (i = 0; i < lArrAnswers_37751.length; i++) {
                addEvent(lArrAnswers_37751[i], "click", ShowDynamicQuestion_10474_37751, false);
            }
        }
    }
    catch (ex) { }
}
function ShowDynamicQuestion_10474_37751() {
    var lHideQuestion = ["F_10474_37753_TABLE", "F_10474_37754_TABLE", "F_10474_37755_TABLE", "F_10474_37756_TABLE", "F_10474_37757_TABLE", "F_10474_37758_TABLE"]
    var lObj = document.getElementsByName("F_10474_37751");
    var i, j;
    for (i = 0; i < lObj.length; i++) {
        if (lObj[i].checked) break;
    }
    if (lObj[i].value == "38539") {
        for (j = 0; j < lHideQuestion.length; j++) {
            document.getElementById(lHideQuestion[j]).style["display"] = "block";
        }
    }
    if (lObj[i].value == "38540") {
        for (j = 0; j < lHideQuestion.length; j++) {
            document.getElementById(lHideQuestion[j]).style["display"] = "none";
        }
    }
    // Clear all Fiels
    var lArrAnswers = ["F_10474_37754", "F_10474_37755", "F_10474_37756", "F_10474_37757"]
    for (j = 0; j < lArrAnswers.length; j++) {
        document.getElementById(lArrAnswers[j]).selectedIndex = 0;
    }
    var lArrAnswers_37758 = document.getElementsByName("F_10474_37758");
    for (j = 0; j < lArrAnswers_37758.length; j++) {
        lArrAnswers_37758[j].checked = false;
    }
}
/* END : Additional Code for Campaign 10474 */

/* START : Additional Code for Campaign 10713 */
// Require new code line
//   1 To add Dynamic Question drop on existing question ans selection,
function ExternalCodeLine_10713() {
    try {
        // Check 10713 exists
        if (FindIndexOfMatchedValue('10713', lAllCampaigns.split(',')) != -1) {

            // Hide Question
            var lHideQuestion = document.getElementById("F_10713_37718_TABLE")
            lHideQuestion.style["display"] = "none";

            //Adding Dynaic Question Show Hide Code
            var lArrAnswers_37720 = document.getElementById("F_10713_37720");
            addEvent(lArrAnswers_37720, "change", function() {
                var lHideQuestion = document.getElementById("F_10713_37718_TABLE");
                var lObj = document.getElementById("F_10713_37720");
                var optionSelectedValue = lObj.options[lObj.selectedIndex].value;
                if (optionSelectedValue == "GEN") {
                    lHideQuestion.style["display"] = "block";
                }
                else {
                    lHideQuestion.style["display"] = "none";
                }
                // Clear all Fiels
                var lArrAnswers_37718 = document.getElementById("F_10713_37718");
                lArrAnswers_37718.selectedIndex = 0;
            }, false);
        }
    }
    catch (ex) { }
}
/* END : Additional Code for Campaign 10713 */


/* START: Over Ride Method While dynamicaly show/hide controls */
var tmgArrDynamicFieldsIds = ["F_10606_37801", "F_10606_37802", "F_10606_37803", "F_10606_37804", "F_10606_37805", "F_10606_36707", "F_10713_37718", "F_10474_37753", "F_10474_37754", "F_10474_37755", "F_10474_37756", "F_10474_37757", "F_10474_37758", "F_10956_40309", "F_10956_40310", "F_10956_40311", "F_10956_40312", "F_10956_40313", "F_10956_40314", "F_10957_40302", "F_10957_40303", "F_10957_40304", "F_10957_40305", "F_10957_40306", "F_10957_40307"];
function TmgShowHide(pArea, pFlag) {
    // Check if Offer are table based and open from Safari
    try {
        if (document.getElementById("TmgOffers").nodeName == "TABLE") {
            if (pArea.id.indexOf("TmgCampaignDisclaimer") !== -1 && BrowserDetect.browser == 'Safari') {
                TmgShowHide_TableCell(pArea, pFlag)
                return;
            }
        }
    }
    catch (ex) {
    }
    try {
        if (pArea != null) {
            if (pFlag) {
                // Avoid to hide in case come in Dynamic Questions...
                try {
                    if (FindIndexOfMatchedValue(pArea.id.replace('_TABLE', ''), tmgArrDynamicFieldsIds) == -1) {
                        pArea.style["display"] = "block";
                    }
                } catch (ex) { pArea.style["display"] = "block"; }
            }
            if (!pFlag) {
                pArea.style["display"] = "none";
            }
        }
    }
    catch (ex) { PostError("COMSCR001:v2:" + ex); }
}
// In Case Safari Issue where desclaimer was showing with min width except actual width
function TmgShowHide_TableCell(pArea, pFlag) {
    if (pArea != null) {
        if (pFlag) {
            pArea.style["display"] = "table-cell";
        }
        if (!pFlag) {
            pArea.style["display"] = "none";
        }
    }
}
/* END : Over Ride Method While dynamicaly show/hide controls  */

function fn_FirexPixels() {
    try {
        // JS IMPLEMENTATION OF PIXELS
        Tmg_eXelatePixel();
        Tmg_NeustarPixel();
        Tmg_LotamePixel();

        // SERVER IMPLEMENTATION OF PIXELS
        if (!tmgeXelatePixel && !tmgNeustarPixel && !tmgLotamePixel) return;
        var lPixelURI = "http" + tmgSSLKey + "://" + tmgMyURI + "/OfferParity.aspx?process=1&source=" + tmgPlacement;
        var lflag = "";
        if (tmgeXelatePixel) {
            lflag = lflag + "x0|";
        }
        if (tmgNeustarPixel) {
            lflag = lflag + "x1|";
        }
        if (tmgLotamePixel) {
            lflag = lflag + "x2|";
        }
        var lFieldCollect = ["EMAIL", "GENDER", "DATE_OF_BIRTH"];
        var lFieldValueCollect = ["", "", ""];
        var lQueryToPush = ["eml", "gen", "age"];
        //1. Check from mapped parameters(fetch if found not null/empty);
        //1.1 Checking if any campign selected by user
        //1.2 Calling mapped function if not campaign selected by user
        if (tmgArrSelectedCampaigns.length == 0) {
            FillMappedDataIntoControls()
        }
        //2. Check from All campaigns (fetch if found not null/empty)
        var i = 0
        for (i = 0; i < lFieldCollect.length; i++) {
            var j = 0;
            var lArrCamps = lAllCampaigns.split(",");
            for (j = 0; j < lArrCamps.length; j++) {
                var arrFieldID = eval("lCampaignFields_" + lArrCamps[j]).split(",");
                var index = FindIndexOfMatchedValue("F_" + lArrCamps[j] + "_" + lFieldCollect[i], arrFieldID);
                if (index != -1) {
                    var lValue = TmgFetchControlValue(arrFieldID[index]);
                    if (!TmgCheckForEmpty(lValue)) {
                        lFieldValueCollect[i] = lValue;
                        break;
                    }
                }
            }
        }
        var lQueryPart = "";
        for (i = 0; i < lFieldCollect.length; i++) {
            switch (lFieldCollect[i]) {
                case "DATE_OF_BIRTH":
                    if (!TmgCheckForEmpty(lFieldValueCollect[i])) {
                        lQueryPart += "&" + lQueryToPush[i] + "=" + lFieldValueCollect[i].split("/")[2];
                    }
                    else {
                        lQueryPart += "&" + lQueryToPush[i] + "=";
                    }
                    break;
                default:
                    lQueryPart += "&" + lQueryToPush[i] + "=" + lFieldValueCollect[i];
                    break;
            }
        }
        lPixelURI = lPixelURI + "&flag=" + lflag.substring(0, lflag.length - 1) + lQueryPart;
        var abc = FindBrowserDetails();
        if (abc.indexOf("Explorer;9") != -1) {
            PostLeadsViaAjax_v2(lPixelURI);
            pause(1000);
        }
        else {
            PostLeadsViaAjax(lPixelURI);
        }
    }
    catch (ex) {
    }
}

/* START : Neustar Pixel Code Lines */
function Tmg_NeustarPixel_Execute(pEmail) {
    var lURI = "http" + tmgSSLKey + "://adadvisor.net/adscores/s.pixel?sid=9112269178&em=" + CryptoJS.SHA1(pEmail.toLowerCase());
    document.getElementById("tmgCallPixelSrc").src = lURI;
    tmgNeustarPixel = false;
}
function Tmg_NeustarPixel() {
    try {
        var lEmail = "";
        var lCampIds = lAllCampaigns.split(",");
        for (index = 0; index < lCampIds.length; index++) {
            var lEmailObj = document.getElementById("F_" + lCampIds[index] + "_EMAIL");
            // Fetch Email if exist for campaign
            if (lEmailObj !== null && typeof lEmailObj != "undefined") {
                lEmail = TmgFetchControlValue(lEmailObj.id);
            }
            // Exist after fetch Email
            if (lEmail != "") {
                break;
            }
        }
        // If no offer select then fetch email pass by publisher:
        if (lEmail == "") {
            var lArrayMappedFields = lMappedClientFields.split("--");
            var lInfoCollection = lArrayMappedFields[FindIndexOfMatchedValue("EMAIL", lArrayMappedFields, ",", 0)].split(",");
            lEmail = TmgFetchMappedControlValue(lInfoCollection[2], lInfoCollection[3], null)
        }
        if (lEmail != "" && tmgNeustarPixel) {
            Tmg_NeustarPixel_Execute(lEmail)
        }
    }
    catch (ex) {
        PostError("COMSCR:Neustar:" + ex);
    }
}
/* END : Neustar Pixel Code Lines */

/* START : eXelate Pixel Code Lines */
function Tmg_eXelatePixel() {
    if (!tmgeXelatePixel) return;
    try {
        // Adding the script tag to the head as suggested before
        var lHead = document.getElementsByTagName('head')[0];
        var lScript = document.createElement('script');
        lScript.type = 'text/javascript';

        // Code to generate URI
        var lURI = "http" + tmgSSLKey + "://loadus.exelator.com/load/?p=588&g=001&source=" + tmgPlacement;
        var lFieldCollect = ["GENDER", "DATE_OF_BIRTH"];
        var lFieldValueCollect = ["", ""];
        var lQueryToPush = ["gd", "ag"];
        //1. Check from mapped parameters(fetch if found not null/empty);
        //1.1 Checking if any campign selected by user
        //1.2 Calling mapped function if not campaign selected by user
        if (tmgArrSelectedCampaigns.length == 0) {
            FillMappedDataIntoControls()
        }
        //2. Check from All campaigns (fetch if found not null/empty)
        var i = 0
        for (i = 0; i < lFieldCollect.length; i++) {
            var j = 0;
            var lArrCamps = lAllCampaigns.split(",");
            for (j = 0; j < lArrCamps.length; j++) {
                var arrFieldID = eval("lCampaignFields_" + lArrCamps[j]).split(",");
                var index = FindIndexOfMatchedValue("F_" + lArrCamps[j] + "_" + lFieldCollect[i], arrFieldID);
                if (index != -1) {
                    var lValue = TmgFetchControlValue(arrFieldID[index]);
                    if (!TmgCheckForEmpty(lValue)) {
                        lFieldValueCollect[i] = lValue;
                        break;
                    }
                }
            }
        }

        for (i = 0; i < lFieldCollect.length; i++) {
            switch (lFieldCollect[i]) {
                case "GENDER":
                    lURI += "&" + lQueryToPush[i] + "=" + lFieldValueCollect[i].replace("M", "male").replace("F", "female");
                    break;
                case "DATE_OF_BIRTH":
                    if (TmgCheckForEmpty(lFieldValueCollect[i])) {
                        lURI += "&" + lQueryToPush[i] + "=";
                    }
                    else {
                        lURI += "&" + lQueryToPush[i] + "=" + lFieldValueCollect[i].split("/")[2];
                    }
                    break;
                default:
                    lURI += "&" + lQueryToPush[i] + "=" + lFieldValueCollect[i];
                    break;
            }
        }
        lScript.src = lURI;
        // Fire the loading
        lHead.appendChild(lScript);
        tmgeXelatePixel = false;
    }
    catch (ex) {
        PostError("COMSCR:eXelate:" + ex);
    }
}
/* START : eXelate Pixel Code Lines */

/* START : Lotame Pixel Code Lines */
function Tmg_LotamePixel() {
    if (!tmgLotamePixel) return;
    try {
        // Adding the script tag to the head as suggested before
        var lHead = document.getElementsByTagName('head')[0];
        var lScript = document.createElement('script');
        lScript.type = 'text/javascript';

        var lFieldCollect = ["GENDER", "DATE_OF_BIRTH"];
        var lFieldValueCollect = ["", ""];
        var lQueryToPush = ["gen", "age"];
        //1. Check from mapped parameters(fetch if found not null/empty);
        //1.1 Checking if any campign selected by user
        //1.2 Calling mapped function if not campaign selected by user
        if (tmgArrSelectedCampaigns.length == 0) {
            FillMappedDataIntoControls()
        }
        //2. Check from All campaigns (fetch if found not null/empty)
        var i = 0
        for (i = 0; i < lFieldCollect.length; i++) {
            var j = 0;
            var lArrCamps = lAllCampaigns.split(",");
            for (j = 0; j < lArrCamps.length; j++) {
                var arrFieldID = eval("lCampaignFields_" + lArrCamps[j]).split(",");
                var index = FindIndexOfMatchedValue("F_" + lArrCamps[j] + "_" + lFieldCollect[i], arrFieldID);
                if (index != -1) {
                    var lValue = TmgFetchControlValue(arrFieldID[index]);
                    if (!TmgCheckForEmpty(lValue)) {
                        lFieldValueCollect[i] = lValue;
                        break;
                    }
                }
            }
        }
        // Code to generate URI
        var lURI = "http" + tmgSSLKey + "://bcp.crwdcntrl.net/5/c=5362/";
        for (i = 0; i < lFieldCollect.length; i++) {
            switch (lFieldCollect[i]) {
                case "GENDER":
                    lURI += lQueryToPush[i] + "=" + lFieldValueCollect[i] + "/";
                    break;
                case "DATE_OF_BIRTH":
                    if (TmgCheckForEmpty(lFieldValueCollect[i])) {
                        lURI += lQueryToPush[i] + "=" + "/";
                    }
                    else {
                        lURI += lQueryToPush[i] + "=" + Tmg_CalculateAge(lFieldValueCollect[i].split("/")[2]) + "/";
                    }
                    break;
                default:
                    break;
            }
        }
        lURI += "int=technology/act=submit/med=coreg";

        lScript.src = lURI;
        // Fire the loading
        lHead.appendChild(lScript);
        tmgLotamePixel = false;
    }
    catch (ex) {
        PostError("COMSCR:Lotame:" + ex);
    }
}

function Tmg_CalculateAge(pYear) {
    var lYear = new Date().getFullYear();
    var lAge = "";
    try {
        lAge = parseInt(lYear - pYear);
    }
    catch (ex) {
    }
    return lAge;
}
/* START : Lotame Pixel Code Lines */


/* START : More Info Area Position */
//COMSCR020303
function fn_MoreInfo_Absolute() {
    if (tmgMoreInfoPosition) return;
    var lArrCamps = lAllCampaigns.split(",");
    var lCreativeWidth = 0;
    try {
        for (i = 0; i < lArrCamps.length; i++) {
            var lControl = document.getElementsByName("tmgControl$" + lArrCamps[i]);
            var j = 0;
            for (j = 0; j < lControl.length; j++) {
                addEvent(lControl[j], "click", function() { fn_MoreInfo_Absolute_HideAll(); }, false);
                fn_AttachEventInline(lControl[j], "click", "fn_MoreInfo_Absolute_HideAll()");
            }
            var lMoreInfoSpan = document.getElementById("CreativeMoreInfo$" + lArrCamps[i]);
            if (lMoreInfoSpan != null) {
                lCreativeWidth = lMoreInfoSpan.parentNode.offsetWidth;
                tmgArrCampaignsHaveMoreInfo.push(lArrCamps[i]);
                var lDynamicDiv = document.createElement("DIV");
                lDynamicDiv.id = "CreativeMoreInfo_Absolute$" + lArrCamps[i];
                lDynamicDiv.style["position"] = "absolute";
                lDynamicDiv.style["backgroundColor"] = "#fdecd7";
                lDynamicDiv.style["width"] = (lCreativeWidth - 50) + "px";
                lDynamicDiv.style["border"] = "1px solid #f3dfc8";
                lDynamicDiv.style["lineHeight"] = "18px";
                lDynamicDiv.style["fontWeight"] = "normal";
                lDynamicDiv.style["marginLeft"] = "40px";
                lDynamicDiv.style["zIndex"] = "99";
                var lNewHTML = "<div style='text-align:right;padding:1px 5px 1px 0px !important;background-color:#f3dfc8 !important;'>";
                lNewHTML += "<a onclick='javascript:fn_MoreInfo_Absolute_HideAll();' style='cursor:pointer !important;'>";
                lNewHTML += "<i class='fa fa-times-circle' ";
                lNewHTML += "style='font-size:20px !important; color:#c4a176 !important;font-variant:normal !important;";
                lNewHTML += "font-stretch:inherit !important;font-style:normal !important;font-weight:normal !important;";
                lNewHTML += "background:none !important;border:none !important;text-decoration:none !important;text-transform:none !important;'></i>";
                lNewHTML += "</a>";
                lNewHTML += "</div>";
                lNewHTML += "<div style='padding:5px 5px 5px 4px'>";
                lNewHTML += lMoreInfoSpan.innerHTML;
                lNewHTML += "</div>";
                lDynamicDiv.innerHTML = lNewHTML;
                lMoreInfoSpan.innerHTML = "";
                lMoreInfoSpan.appendChild(lDynamicDiv);
                lMoreInfoSpan.style["width"] = "inherit";
                var lMoreInfoAnchor = document.getElementById("TMGMoreInfoAnchor$" + lArrCamps[i]);
                addEvent(lMoreInfoAnchor, "click", function() { fn_MoreInfo_Absolute_HideAllExceptThis(this.id); }, false);
                fn_AttachEventInline(lMoreInfoAnchor, "click", "fn_MoreInfo_Absolute_HideAllExceptThis(this.id)");
            }
        }
        tmgMoreInfoPosition = true;
    } catch (ex) {
        PostError("COMSCR020303:" + ex);
    }
}
function fn_MoreInfo_Absolute_HideAllExceptThis(pId) {
    if (typeof (pId) != 'undefined') {
        var lMoreInfoAnchor = document.getElementById(pId);
        var lMoreInfoSpan;
        var lCurrentCamp = pId.replace("TMGMoreInfoAnchor$", "");
        if (lMoreInfoAnchor.className.indexOf("Collapse") != -1) {
            var i = 0;
            for (i = 0; i < tmgArrCampaignsHaveMoreInfo.length; i++) {
                if (tmgArrCampaignsHaveMoreInfo[i] == lCurrentCamp) continue;
                lMoreInfoAnchor = document.getElementById("TMGMoreInfoAnchor$" + tmgArrCampaignsHaveMoreInfo[i]);
                lMoreInfoSpan = document.getElementById("CreativeMoreInfo$" + tmgArrCampaignsHaveMoreInfo[i]);

                lMoreInfoAnchor.innerHTML = CustomeReplaceAll(tmgMoreInfoContext, ":SQ:", "'");
                lMoreInfoAnchor.className = "TMG-Creative-MoreInfo-a-Expand";
                lMoreInfoSpan.style["display"] = "none";
            }
        }
    }
}
function fn_MoreInfo_Absolute_HideAll() {
    var lMoreInfoAnchor;
    var lMoreInfoSpan;
    var i = 0;
    for (i = 0; i < tmgArrCampaignsHaveMoreInfo.length; i++) {
        lMoreInfoAnchor = document.getElementById("TMGMoreInfoAnchor$" + tmgArrCampaignsHaveMoreInfo[i]);
        lMoreInfoSpan = document.getElementById("CreativeMoreInfo$" + tmgArrCampaignsHaveMoreInfo[i]);
        lMoreInfoAnchor.innerHTML = CustomeReplaceAll(tmgMoreInfoContext, ":SQ:", "'");
        lMoreInfoAnchor.className = "TMG-Creative-MoreInfo-a-Expand";
        lMoreInfoSpan.style["display"] = "none";
    }
}

/* END : More Info Area Position */

function fn_AttachEventInline(pObject, pEvent, pFunctionString) {
    try {
        if (pObject !== null && typeof (pObject) != 'undefined') {
            var lCurrentEventFunctionsString = pObject.getAttribute("on" + pEvent);
            if (lCurrentEventFunctionsString.indexOf(pFunctionString) == -1) {
                pObject.setAttribute("on" + pEvent, lCurrentEventFunctionsString + ";" + pFunctionString + ";");
            }
        }
    }
    catch (ex) {
    }
}

/* START : Disapear on Check //Update // New functionlity where lead post while hiding campaign on success validate return  */
function HideMe_ShowNext(pCampId) {
    if (tmg_hideCampOnClick) {
        var index = FindIndexOfMatchedValue(pCampId, tmgArrCurrentDisplayCamps);
        tmgArrCampaignsDisplayed.removeItem(pCampId);
        if (tmgDisplayCampaignsRowIndex < tmgArrCurrentDisplayCamps.length - 1) {
            fn_PostLeadOnEverySuccess(pCampId);
            tmgDisplayCampaignsRowIndex = tmgDisplayCampaignsRowIndex + 1;
            document.getElementById("TMGOfferTD" + (parseInt(index) + 1)).style["display"] = "none";
            document.getElementById("TMGOfferTD" + (parseInt(tmgDisplayCampaignsRowIndex) + 1)).style["display"] = "block";
            tmgArrCampaignsDisplayed.push(tmgArrCurrentDisplayCamps[tmgDisplayCampaignsRowIndex]);
            TrackCommonImpression("LOAD", tmgArrCurrentDisplayCamps[tmgDisplayCampaignsRowIndex]);
        }
    }
}
function fn_IsSupposedToPostLead(pCampaignId) {
    var lrtnFlag = false;
    var objControl = document.getElementById("tmgControl$" + pCampaignId + "$0");
    switch (objControl.type) {
        case "checkbox":
        case "radio":
            lrtnFlag = objControl.checked;
            break;
        case "button":
            try {
                var lClassOnButton = objControl.className;
                if (lClassOnButton != "") {
                    if (lClassOnButton.indexOf("Yes-hover") != -1) {
                        if (!tmgIsFieldDropOnButtonClick) {
                            var lInvalidFields = new Array();
                            try {
                                var lCampaignFieldIDs = eval("lCampaignFields_" + pCampaignId).split(",");
                                var index = 0;
                                for (index = 0; index < lCampaignFieldIDs.length; index++) {
                                    var lCampaignFieldID = lCampaignFieldIDs[index];
                                    if (lHiddenFieldIds.indexOf(lCampaignFieldID) != -1) continue;
                                    if (TmgCheckForEmpty(TmgFetchControlValue(lCampaignFieldID)) || !IsValidValue(lCampaignFieldID)) {
                                        lInvalidFields.push(lCampaignFieldID);
                                    }
                                }
                            }
                            catch (ex) {
                            }
                            if (lInvalidFields.length == 0) {
                                lrtnFlag = true;
                            }
                        }
                        else {
                            lrtnFlag = true;
                        }
                    }
                }
            }
            catch (ex) {
            }
            break;
    }
    return lrtnFlag;
}
//COMSCR90996000-1
function fn_PostLeadOnEverySuccess(pCampaignId) {
    if (!fn_IsSupposedToPostLead(pCampaignId)) return;
    //Post Lead and mark campaign so that they can avoid at last call...
    try {
        var index = 0;
        var trustedFormId = "";
        var oCert = document.getElementById('xxTrustedFormCertUrl_0');
        if (oCert === null) {
            oCert = "";
            trustedFormId = tmg_TF_CertificateId;
        }
        else {
            trustedFormId = oCert.value;
        }
        var finalString = "http" + tmgSSLKey + "://" + tmgMyURI + "/ProcessCampaignData/ProcessCampaignData.aspx?" + "ID=" + pCampaignId + "&QS=tmg_affid=" + ManageAffIdSubIdValueEncode(tmgAffId) + ",tmg_subid=" + ManageAffIdSubIdValueEncode(tmgSubId) + ",cCampId=" + pCampaignId + ",PublisherId=" + tmgPublisher + ",PlacementId=" + tmgPlacement + ",AttachedInfo=" + tmgAttachedInfo + ",TrustedFormId=" + trustedFormId + "," + TmgReturnValueString(pCampaignId);
        var abc = FindBrowserDetails();
        if (abc.indexOf("Explorer;9") != -1) {
            PostLeadsViaAjax_v2(finalString);
            pause(1000);
        }
        else {
            PostLeadsViaAjax(finalString);
        }
        tmgArrCampaignsWhoesLeadPosted.addItem(pCampaignId);
    }
    catch (ex) {
        PostError("COMSCR90996000-1:" + ex);
    }
}
/* END : Disapear on Check  */


/* START : Swap TCPA  // New functionlity
where campaign TCPA will swap on pre define structure values conbination of campaign and lead forward to other campaign */
//COMSCR023456
function TMG_SwapTCPA(pCampaignId) {
    try {
        var lDesclaimer = eval("lSwapTCPA_" + pCampaignId + "_Desclaimer");
        var lForwardCampID = eval("lSwapTCPA_" + pCampaignId + "_ForwardCampID");
        var lPassInStructure = eval("lSwapTCPA_" + pCampaignId + "_PassInStructure");
        var lSwapTCPA_Structure_AND = eval("lSwapTCPA_" + pCampaignId + "_Structure_AND");
        var lSwapTCPA_Structure_OR = eval("lSwapTCPA_" + pCampaignId + "_Structure_OR");
        var i = 0;
        var lConditionResult = false;
        var iTrue = 0;
        for (i = 0; i < lSwapTCPA_Structure_AND.length; i++) {
            var lStructure = lSwapTCPA_Structure_AND[i];
            var lStructureValue = eval("lSwapTCPA_" + lStructure);
            if (FindIndexOfMatchedValue(TmgFetchControlValue(lStructure), lStructureValue) != -1) {
                iTrue = iTrue + 1;
                continue;
            }
        }
        if (iTrue == i && lSwapTCPA_Structure_AND.length != 0) {
            lConditionResult = true;
        }
        for (i = 0; i < lSwapTCPA_Structure_OR.length; i++) {
            var lStructure = lSwapTCPA_Structure_OR[i];
            var lStructureValue = eval("lSwapTCPA_" + lStructure);
            if (FindIndexOfMatchedValue(TmgFetchControlValue(lStructure), lStructureValue) != -1) {
                lConditionResult = true;
                break;
            }
        }
        var lDisclaimerContainer = document.getElementById("TmgCampaignDisclaimer$" + pCampaignId);
        if (!lConditionResult) {
            document.getElementById(lPassInStructure).value = "";
            try {
                lDisclaimerContainer.firstElementChild.innerHTML = lDesclaimer[0];
            }
            catch (ex) {
                lDisclaimerContainer.getElementsByTagName("span")[0].innerHTML = lDesclaimer[0];
            }
        }
        else {
            document.getElementById(lPassInStructure).value = lForwardCampID;
            try {
                lDisclaimerContainer.firstElementChild.innerHTML = lDesclaimer[1];
            }
            catch (ex) {
                lDisclaimerContainer.getElementsByTagName("span")[0].innerHTML = lDesclaimer[1];
            }
        }
    }
    catch (ex) {
        PostError("COMSCR023456:" + ex);
    }
}
/* END : Swap TCPA  */