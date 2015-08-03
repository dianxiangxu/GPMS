/*
 * Dependency-free (mostly) Javascript library used for both full 
 * and inline registration use cases.  
 * 
 * Third party script dependencies:
 *     Phone Validation - requires googlibphonenumber.js
 *     ForMeter 1.2 (code at the bototm - modified) - requires JQuery
 *
 */

function isNewUser() {
    
    var crs = getCookieValue("crs");
    return (crs == "");
}

function isTechtargetUser() {
    
    var crs = getCookieValue("crs");
    return (crs != "");
}

function isUidLoggedIn() {
    
    var uuid = getCookieValue("uidLoggedIn");
    return (uuid != "");
}

function loadCookies(clientCallback) {
    var tc = "TTGTCHECKDONE";
    
    if (!getCookieValue(tc)) {
        
        if (isNewUser()) {
            
            logMessage("Unrecognized user; checking master domain for cookies");
            var src = [ "http://users.techtarget.com/registration/json/common/GetCookiesWithCallback.page?callback=loadCookiesCallback" ];
            var root = document.getElementsByTagName("head")[0];
            var callback = function() {};
            loadJs(root, src, clientCallback);
            
            createCookieDT(tc, "y", 5, "m", getTopLevelDomain());
            
        } else {
            
            deleteCookie(tc);
            
            logMessage("Recognized user; no need for master domain cookie check");
            clientCallback();
            
        }
        
    } else {
        logMessage("loadCookies called within the last 5 minutes. Do not call again.");
        clientCallback();
        
    }
}

var cookieNames = new Array();
cookieNames["tt_ut"] = true;
cookieNames["crs"] = true;

function loadCookiesCallback(cookies) {
    
    var length = cookies.results.length;
    
    logMessage(length + " cookies returned in callback");
    
    for (var x = 0; x < length; x++) {
        
        if (cookies.results[x].name in cookieNames) {
            
            createCookieDT(cookies.results[x].name, cookies.results[x].value, 5, "y", getTopLevelDomain());
            
        } else {
            
            logMessage("Cookie " + cookies.results[x].name + " not a userreg cookie; skipping");
        }
    }
}

function isCrossDomain() {
    
    var topLevel = getTopLevelDomain();
    var authDomain = "techtarget.com";
    
    return (topLevel != authDomain)

}

// {"crs":"@@crs_value","tt_ut":"tt_ut_value"}
function setOrRedirectCookies(cookies) {
    
    if (isCrossDomain()) {
        setLoginCookies(cookies, getTopLevelDomain())
        // TODO: redirect to set on topLevel
        logMessage("Cross domain cookie setting not implemented");
    } else {
        setLoginCookies(cookies, ".techtarget.com");
    }
    
}

function setLoginCookies(cookies, domain) {
    
    if (domain && domain.substr(0, 1) != ".") { domain = "." + domain; }
    for ( var key in cookies) {
        createCookieDT(key, cookies[key], 5, "y", domain);
    }
    
}

function getPromoCode() {
    
    var promo = getQueryStrings()["Offer"];
    if (!promo) {
        promo = getCookieValue("Offer");
    }
    return promo;
}

function getQueryStrings() {
    
    var assoc = {};
    var decode = function(s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
    var queryString = location.search.substring(1);
    var keyValues = queryString.split('&');
    
    for ( var i in keyValues) {
        var key = keyValues[i].split('=');
        if (key.length > 1) {
            assoc[decode(key[0])] = decode(key[1]);
        }
    }
    return assoc;
}

function createCookie(name, value, days) {
    createCookieDT(name, value, days, "d", getTopLevelDomain());
}

function createCookieD(name, value, days, domain) {
    createCookieDT(name, value, days, "d", domain);
}

function createCookieDT(name, value, expLength, expType, domain) {
    var date = new Date();
    
    switch (expType) {
    case "y": // ~365 days / year
        expType = "years";
        date.setTime(date.getTime() + (expLength * 365 * 24 * 60 * 60 * 1000));
        break;
    case "mo": // ~30 days / month
        expType = "months";
        date.setTime(date.getTime() + (expLength * 30 * 24 * 60 * 60 * 1000));
        break;
    case "d":
        expType = "days";
        date.setTime(date.getTime() + (expLength * 24 * 60 * 60 * 1000));
        break;
    case "h":
        expType = "hours";
        date.setTime(date.getTime() + (expLength * 60 * 60 * 1000));
        break;
    case "m":
        expType = "minutes";
        date.setTime(date.getTime() + (expLength * 60 * 1000));
        break;
    case "s":
        expType = "seconds";
        date.setTime(date.getTime() + (expLength * 1000));
        break;
    case "ms":
        expType = "milliseconds";
        date.setTime(date.getTime() + (expLength));
    }
    
    logMessage("Creating cookie " + name + " for " + expLength + " " + expType + " on domain " + domain + " with value: " + value);
    
    var expires = "";
    if (expLength) {
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
}

function deleteCookie(name) {
    if (getCookieValue(name)) {
        createCookie(name, "", -1);
    }
}

function getTopLevelDomain() {
    
    var hostname = window.location.hostname;
    var regexp = /(?:(?:dev\.eng|eng|qa)\.)?[^\.]+(?:\.|\.co\.|\.com\.)[^\.]+$/;
    
    return regexp.exec(hostname);
}

function getTopLevelDomainEnv(showEnv) {
    
    var domain = getTopLevelDomain()[0];
    if (!showEnv) {
        domain = domain.replace(/(dev\.eng|eng|qa)\./i, "")
    }
    return domain;
}

function onScriptLoadCallback(script, callback) {
    
    var script_loaded = false;
    script.onreadystatechange = script.onload = function() {
        if ((script.readyState && script.readyState != 'loaded' && script.readyState != 'complete') || script_loaded) return;
        script_loaded = true;
        callback();
    }

}

function loadJs(root, srcArray, callback) {
    
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = srcArray.pop();
    if (srcArray.length > 0) {
        onScriptLoadCallback(script, function() { loadJs(root, srcArray, callback); });
    } else {
        onScriptLoadCallback(script, callback);
    }
    logMessage("Loading script " + script.src);
    root.appendChild(script);
}

function loadCss(root, href, callback) {
    
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", href);
    onScriptLoadCallback(link, callback);
    root.appendChild(link);
}

function getCookieValue(name) {
    
    var cookie = document.cookie;
    var pos = cookie.indexOf(name + "=");
    if (pos != -1) {
        var start = pos + name.length + 1;
        var end = cookie.indexOf(";", start);
        if (end == -1) {
            end = cookie.length;
        }
        var value = cookie.substring(start, end);
        return value;
    } else {
        return "";
    }
}

function stringify(obj) {
    
    var objectType = typeof (obj);
    
    if (objectType != "object" || obj === null) {
        
        if (t == "string") {
            obj = '"' + obj + '"';
        }
        
        return String(obj);
        
    } else {
        
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        
        for (n in obj) {
            
            v = obj[n];
            t = typeof (v);
            
            if (t == "string") {
                
                v = '"' + v + '"';
                
            } else if (t == "object" && v !== null) {
                
                v = JSON.stringify(v);
            }
            
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
    }
    
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
}

var provListId = "";
var countryListId = "";
var consentDivId = "";
var consentId = "";

function inlineCallback(id, content) {
    
    var js = "";
    var html = "";
    var root = document.getElementById(id);
    var size = content.length;
    
    for (var x = 0; x < size; x++) {
        var row = content[x];
        logMessage(row);
        if (row.contentType == "BLOCK") {
            if (row.CONTENT != undefined) {
                html += generateBlock(row);
            }
            if (row.SCRIPT != undefined) {
                js += generateJavascript(row);
            }
        } else if (row.contentType == "QUESTION") {
            html += generateQuestion(row, id);
        } else {
            logMessage("TODO:  implement process for " + row.contentType);
        }
    }
    
    root.innerHTML = html;
    
    eval(js);
    
    var params = getPageParams(id);
    for ( var key in params) {
        var element = document.getElementById(id + "_" + key);
        if (element != undefined && element != null) {
            element.value = params[key];
        }
    }
    
    if (countryListId != "") {
        var country = document.getElementById(countryListId);
        country.onchange = function() {
            if (provListId != "") {
                getProvincesInline();
            }
            if (consentId != "") {
                getConsentCountriesInline();
            }
        };
        
        if (provListId != "") {
            getProvincesInline();
        }
    }
    if (consentId != "") {
        getConsentCountriesInline();
    }
}

function generateJavascript(row) {
    
    var result = "";
    if (row.SCRIPT != undefined) {
        result = row.SCRIPT;
    }
    return result;
}

function generateBlock(row) {
    
    var result = "";
    if (row.CONTENT != undefined) {
        result = row.CONTENT;
    }
    return result;
}

function generateQuestion(row, id) {
    
    var inputId = row.id;

    var value = (typeof row.value !== "undefined") ? row.value : "";
    var setVal = value || "";
    
    if (row.type == "hidden") {
        
        var result = "<input type=\"hidden\" name=\"" + row.code + "\" id=\"" + inputId + "\" ";
        
        if (setVal) {
            result += "value=\"" + setVal + "\"";
        }
        
        result += "/>";
        
        return result
        
    } else if (row.type == "label") {
        
        var result = "";
        
        result += getQuestionBeforeHTML(row);
        
        if (row.DISPLAY_VALUE != undefined && row.DISPLAY_VALUE != "") {
            result += row.DISPLAY_VALUE + "&nbsp;";
        }
        
        result += getQuestionAfterHTML(row);
        
        return result;   

    } else if (row.type == "display") {

        var result = "";
        
        result += getQuestionBeforeHTML(row);
        
        if (row.DISPLAY_VALUE != undefined && row.DISPLAY_VALUE != "") {
            result += "<label for=\"" + inputId + "\">" + row.DISPLAY_VALUE + "&nbsp;</label>";
        }
        
        result += setVal
        result += "<input type=\"hidden\" id=\"" + inputId + "\" name=\"" + row.code + "\" value=\""+setVal+"\" />";
        result += getQuestionAfterHTML(row);
        
        return result;   

    } else if (row.type == "text" || row.type == "password" || row.type == "textarea") {
        
        var result = "";
        
        result += getQuestionBeforeHTML(row);
        
        if (row.DISPLAY_VALUE != undefined && row.DISPLAY_VALUE != "") {
            result += "<label for=\"" + inputId + "\">" + row.DISPLAY_VALUE + "&nbsp;</label>";
        }
        
        if (row.DESCRIPTION != undefined && row.DESCRIPTION != "") {
            result += "<small>" + row.DESCRIPTION + "</small>";
        }
        
        var txtStyle = row.STYLES != undefined ? row.STYLES+" " : '';
        var txtEvents = row.EVENTS != undefined ? row.EVENTS+" " : '';
        
        if (row.type != "textarea") {
	        result += "<input id=\"" + inputId + "\" name=\"" + row.code + "\" "+txtStyle+txtEvents+" value=\""+setVal+"\" type=\"" + row.type + "\" maxlength=\"" + row.MAX_LENGTH + "\" size=\"25\" " + getQuestionRequired(row)+" />";

        } else {
        	var txtRows = row.TEXTAREA_ROWS != undefined ? row.TEXTAREA_ROWS : 5;      	
        	result += "<textarea id=\"" + inputId + "\" name=\"" + row.code + "\" "+txtStyle+txtEvents+getQuestionRequired(row)+" rows="+txtRows+" cols=40>"+setVal+"</textarea>";
        }
        
        result += getQuestionErrorMessages(inputId, id, row);
        
        result += getQuestionAfterHTML(row);
        
        return result;
        
    } else if (row.type == "submit") {
        
        var result = "";
        
        result += getQuestionBeforeHTML(row);
        
        result += "<input type=\"submit\" value=\"" + row.DISPLAY_VALUE + "\" ";
        if (row.STYLES != undefined) {
            result += row.STYLES + " ";
        }
        if (row.EVENTS != undefined) {
            result += row.EVENTS;
        }
        result += "/>";
        
        result += getQuestionAfterHTML(row);
        
        return result;
        
    } else if (row.type == "consent") {
        
        var result = "";
        
        result += getQuestionBeforeHTML(row);
        
        result += row.DISPLAY_VALUE;
        result += "<input type=\"hidden\" name=\"" + row.code + "\" value=\"" + row.answers[0].value + "\" id=\"" + inputId + "\"/>";
        
        result += getQuestionAfterHTML(row);
        
        consentDivId = id+"_declarationOfConsent";
        consentId = inputId;
        return result;
        
    } else if (row.type == "checkbox" || row.type == "radio" || row.type == "multiselect" || row.type == "intl_optin_checkbox") {
        
        var result = "";
        
        result += getQuestionBeforeHTML(row);
        
        if (row.DISPLAY_VALUE != undefined && row.DISPLAY_VALUE != "") {
            result += "<label for=\"" + inputId + "\">" + row.DISPLAY_VALUE + "&nbsp;</label>";
        }
        
        if (row.type != "radio") {
        	result += "<fieldset class='checkboxList'><ul><li>"
        } else {
        	result += "<fieldset class='radioButtonList inline'><ul><li>"
        }
        
        for (var j=0; j<row.answers.length; j++) {
        	
        	var uniqueInputId = getUniqueMultiAnswerId(inputId, j);
        	
	        if (row.type != "radio") {
	        	result += "<input type=\"checkbox\" name=\"" + row.code + "\" value=\"" + row.answers[j].value + "\" id=\"" + uniqueInputId + "\" "+ getQuestionRequired(row)+"/>";
	        } else {
	            result += "<input type=\"radio\" name=\"" + row.code + "\" value=\"" + row.answers[j].value + "\" id=\"" + uniqueInputId + "\" "+ getQuestionRequired(row)+"/>";
	        }      
	        if (row.answers[j].DISPLAY_VALUE != undefined && row.answers[j].DISPLAY_VALUE != "") {
	            result += "<label for=\"" + uniqueInputId + "\">" + row.answers[j].DISPLAY_VALUE + "</label>";
	        }
        }
        
        result += "</li></ul></fieldset>"

        result += getQuestionErrorMessages(inputId, id, row);
        
        result += getQuestionAfterHTML(row);
        
        return result;
        
    } else if (row.type == "select" || row.type == "country" || row.type == "province") {
        
        var result = "";
        
        result += getQuestionBeforeHTML(row);
        
        if (row.DISPLAY_VALUE != undefined && row.DISPLAY_VALUE != "") {
            result += "<label for=\"" + inputId + "\">" + row.DISPLAY_VALUE + "&nbsp;</label>";
        }
        
        if (row.DESCRIPTION != undefined && row.DESCRIPTION != "") {
            result += "<small>" + row.DESCRIPTION + "</small>";
        }
        result += "<select ";
        result += "id=\"" + inputId + "\" ";
        result += "name=\"" + row.code + "\" " + getQuestionRequired(row);
        
        if (row.STYLES != undefined && row.STYLES != "") {
            result += row.STYLES + " ";
        }
        if (row.EVENTS != undefined && row.EVENTS != "") {
            result += row.EVENTS + " ";
        }
        result += ">";
        
        var defaultValue = "";
        var valueSelected = false;
        switch (row.type) {
        case "province":
            var s = "window.provList = {"
            var size = row.answers.length;
            for (var x = 0, y = 0; x < size; x++) {
                var selected = 0;
                var answer = row.answers[x];
                if (answer.value == "COUNTRY_MARKER") {
                    if (x > 0) {
                        s += "],";
                    }
                    s += "'" + answer.DISPLAY_VALUE + "':[";
                    y = 0;
                } else {
                	var labelTxt = answer.DISPLAY_VALUE;
                    if (y > 0) {
                        s += ", ";
                    } else {
                    	if (row.PLACEHOLDER_LABEL != undefined) {
                    		labelTxt = row.PLACEHOLDER_LABEL;
                    	}
                    }
                    if (!valueSelected && setVal != "" && setVal == answer.value) {
                    	selected = 1;
                    	valueSelected = true;
                    }
                    y = 1;
                    s += " { V:\"" + answer.value + "\", T:\"" + labelTxt + "\", S: " + selected + " }";
                }
                
            }
            s += "] }"
            eval(s);
            provListId = inputId;
            break;
        case "country":
            countryListId = inputId;
            defaultValue = setVal || window.defaultInlineRegCountry || "";
        default:

            var size = row.answers.length;
            for (var x = 0; x < size; x++) {
                var answer = row.answers[x];
                result += "<option ";
                result += "value=\"" + answer.value + "\"";
                if (!valueSelected && ( defaultValue != "" && defaultValue == answer.value) ) {
                    result += " SELECTED";
                    valueSelected = true;
                }
                result += ">";

                if (x == 0 && row.PLACEHOLDER_LABEL != undefined) {
                	result += row.PLACEHOLDER_LABEL;
                } else {
                	result += answer.DISPLAY_VALUE;
                }
                
                result += "</option>";
            }
            
        }
        
        result += "</select>";
        
        result += getQuestionErrorMessages(inputId, id, row);
        
        result += getQuestionAfterHTML(row);
        
        return result;
        
    } else if (row.type == "script") {
        
        eval(row.DISPLAY_VALUE);
        return "";
        
    } else {
        
        logMessage("TODO:  implement question for " + row.type);
        
    }
}

function getUniqueMultiAnswerId(baseId, idx) {
	return baseId+getAnswerOptionIdDelimiter()+idx;
}

function getBaseInputElement(input) {
	var baseInputId = getBaseInputId(input);
	return document.getElementById(baseInputId);
}

function getBaseInputId(input) {
	// input.id of "my.question.x__answerid__0" becomes "my.question.x"
	return input.id.replace(/__answerid__(.*)/, '');
}

function getAnswerOptionIdDelimiter() {
	return "__answerid__";
}

function getQuestionBeforeHTML(row) {
    var result = "";
    if (row.LIST_CLASS != undefined) {
        result = "<li";
        if (row.LIST_CLASS != "") {
            result += " class=\"" + row.LIST_CLASS + "\"";
        }
        result += ">";
    }
    
    if (row.BEFORE_HTML != undefined) {
        result += row.BEFORE_HTML;
    }
    return result;
}

function getQuestionAfterHTML(row) {
    var result = "";
    if (row.AFTER_HTML != undefined) {
        result += row.AFTER_HTML;
    }
    
    if (row.LIST_CLASS != undefined) {
        result += "</li>"
    }
    return result;
}

function getQuestionRequired(row) {
    if (row.required != "") { return "data-required='" + row.required + "' "; }
}

window.overrideInlineRegErrorMessageClass = {};
window.overrideInlineRegErrorMessageContainer = {};

//
// to swap out the class or add a container to the error messages
// simply add a "Question.ScriptHolder" question, of type "script",
// to the page template (note: ${div} is used to ensure these affect
// only the appropriate form as identified by ${div}), ie: 
//
//    window.overrideInlineRegErrorMessageClass["${div}"] "sign-up-error-msg" };
//    window.overrideInlineRegErrorMessageContainer["${div}"] = {
//          open:"<div class='signupErrors'>",
//          close:"</div>"
//    }
//
function getQuestionErrorMessages(inputId, divId, row) {
    var result = "";
    var errorMessageClass = "errorMessageInput";
    
    if ((or = window.overrideInlineRegErrorMessageClass) && or[divId]) {
        errorMessageClass = or[divId];
    }
    
    if ((or = window.overrideInlineRegErrorMessageContainer) && (ord=or[divId]) && ord.open ) {
        result += ord.open;
    }
    
    if (row.VALIDATION_MESSAGE_QUESTION_BLANK != undefined && row.VALIDATION_MESSAGE_QUESTION_BLANK != "") {
        result += "<p id='" + inputId + ".blank' class='" + errorMessageClass + " hidden'>" + row.VALIDATION_MESSAGE_QUESTION_BLANK + "</p>";
    }
    
    if (row.VALIDATION_MESSAGE_QUESTION_INVALID != undefined && row.VALIDATION_MESSAGE_QUESTION_INVALID != "") {
        result += "<p id='" + inputId + ".invalid' class='" + errorMessageClass + " hidden'>" + row.VALIDATION_MESSAGE_QUESTION_INVALID + "</p>";
    }
    
    if (row.VALIDATION_MESSAGE_QUESTION_EXISTS != undefined && row.VALIDATION_MESSAGE_QUESTION_EXISTS != "") {
        result += "<p id='" + inputId + ".exists' class='" + errorMessageClass + " hidden'>" + row.VALIDATION_MESSAGE_QUESTION_EXISTS + "</p>";
    }
    
    if (row.MAX_LENGTH) {
        if ( row.VALIDATION_MESSAGE_QUESTION_MAXLENGTH != undefined ) {
            result += "<p id='" + inputId + ".maxlength' class='" + errorMessageClass + " hidden'>" + row.VALIDATION_MESSAGE_QUESTION_MAXLENGTH + "</p>";
        } else if (window[divId+"_VALIDATION_MAXLENGTH"]) {
            result += "<p id='" + inputId + ".maxlength' class='" + errorMessageClass + " hidden'>" + window[divId+"_VALIDATION_MAXLENGTH"] + "</p>";
        }
    }
    
    if (ord && ord.close) {
        result += ord.close;
    }   
    
    return result;
}

function getProvincesInline() {
	getProvincesCommon(provListId, countryListId, provList);
}

function getProvincesCommon(givenProvId, givenCountryId, provList) {
    var provSel = document.getElementById(givenProvId);
    var selectedIdx = 0;
    if (typeof provSel != "undefined" && provSel != null) {
        country = document.getElementById(givenCountryId);
        prov = provList[country.options[country.selectedIndex].value];
        provSel.innerHTML = "";
        if (typeof prov != "undefined") {
            for (x = 0; x < prov.length; x++) {
                option = document.createElement("option");
                option.setAttribute("value", prov[x].V);
                option.innerHTML = prov[x].T;
                provSel.appendChild(option);
                if (prov[x].S == 1) {
                	selectedIdx = x;
                }
            }
        }
    }
    if (provSel.options.length > selectedIdx) {
    	provSel.options[selectedIdx].selected = true;
    }
}

function getConsentCountriesInline() {
    if (consentId != "" && countryListId != "" && typeof consentLangList !== "undefined" && Object.keys(consentLangList).length > 0 ) {
        var countryCd = document.getElementById(countryListId).value;
        var consentLang = consentLangList[countryCd];
        if (consentLang != null && consentLang != "") {
            replaceLangCdInline(consentLang);
            
            document.getElementById(consentId).value = consentLang;
        } else {
            if(consentDivId != "") {
                document.getElementById(consentDivId).style.display = "none";
            }
            document.getElementById(consentId).value = 'en';
        }
    }    
    showConsentLink();
}

function showConsentLink() {
    if(consentId != "") {
        var consentValue = document.getElementById(consentId).value;
        if (consentValue != 'en') {
            if(consentDivId != "") {
                document.getElementById(consentDivId).style.display = "block";
            }
            replaceLangCdInline(consentValue);
        }        
    }
}

function replaceLangCdInline(consentLang) {
    $("a.consentWindow").attr('href', function(i, a) {
        return a.replace(/(languageCd=)[a-z]+/ig, '$1' + consentLang);
    });
}

function executeInline(site, div, action) {
    executeInlineByPage(site, div, action, "1");
}

function executeInlineByPage(site, div, action, pageNumber) {
	executeInlineByPageAndParams(site, div, action, pageNumber, null)
}

function executeInlineByPageAndParams(site, div, action, pageNumber, params) 
{
	var queryStr = "type=" + action + "&callback=inlineCallback&div=" + div + "&pageNumber=" + pageNumber;

	if (params && typeof params == 'object') {
		for(key in params) {
			queryStr += "&"+key+"="+params[key];
		}		
	}
    
    var src = [ "http://users.techtarget.com/registration/" + site + "/InlineRegister.page?" + queryStr ];
    var root = document.getElementsByTagName("head")[0];
    var callback = function() {};
    loadJs(root, src, callback);
}

function getQueryStringValue(key) {
    
    var qs = window.location.search.substring(1);
    var tokens = qs.split("&");
    
    for (var x = 0; x < tokens.length; x++) {
        
        var pair = tokens[x].split("=");
        if (pair[0] == key) { return pair[1]; }
    }
    return null;
}

function getPageParams(div) {
    
    return window[div + "_variables"];
}

function getTimezoneCode() {
    
    var timezone = getTimezone();
    return Math.floor(timezone + 436);
}

function getTimezone() {
    
    var now = new Date();
    
    var jan = new Date(now.getFullYear(), 0, 1);
    var jul = new Date(now.getFullYear(), 6, 1);
    var offset = Math.max(jan.getTimezoneOffset() / 60, jul.getTimezoneOffset() / 60);
    
    return (-offset);
}

function isUsEnglish() {
    
    var language = window.navigator.userLanguage || window.navigator.language;
    return language != null && language.match(/en-US/i) != null;
}

function isAssumedUs() {
    
    var timezone = getTimezoneCode();
    return isUsEnglish() && (timezone >= 426 && timezone <= 431);
}

function logMessage(message) {
    
    if (typeof console == 'undefined') {
        // do nothing
    } else {
        console.log(message);
    }
}

// validate required fields
function vRequired(oSubmit, fields, message) {
    var ret = true; // default return value is true to allow form submit
    
    message = (message == "") ? "Please complete all fields." : message;
    for (var i = 0; i < fields.length; i++) {
        var ev = oSubmit.form.elements[fields[i]].value;
        ev = ev.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // trim
        if (ev == "") {
            alert(message);
            ret = false;
            break;
        }
    }
    
    return ret;
}

// validate email fields
function vEmail(oSubmit, field, message) {
    var ret = true;
    var emailRegEx = /^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    
    message = (message == "") ? "Please enter a valid email address." : message;
    
    if (!emailRegEx.test(oSubmit.form.elements[field].value)) {
        alert(message);
        ret = false;
    }
    
    return ret;
}

var urValidation = {
    validationCfg : {},
    currentForm : {},
    validateFields : [],
    skipemailExists : false,
    skiphandleExists : false,
    validate : function(validation, oform) {
        var errs = false, emailErrs = false, handleErr = false;
        if(typeof validation["maxlength"]=="undefined") { validation["maxlength"] = {}; }
        this.validationCfg = validation;
        this.currentForm = oform;
        
        var input, field, fields, isError;
        this.validateFields = fields = this.getValidationFields(validation);
                    
        // This keeps track of evaluated checkbox/radio baseId in order to avoid  
        // checking against same name checkbox/radio button repeatedly 
        var evaluatedRadioCheckboxStatus = {}; 

        try {
            
            for (var i = 0; i < fields.length; i++) {
                field = fields[i];
                isError = false;
                input = oform.elements[field];
                if (!input || input.getAttribute("disabled")!=null || evaluatedRadioCheckboxStatus[input.name]) { continue; }
                
                this.setError(input, false, "");
                
                var value = this.trim(input.value);

                // remove leading and trailing spaces on text fields 
                if ((input.type=="text" || input.type=="textarea") && value != input.value) {
                    input.value = value;
                }

               
                if ((required = validation.required) && this.arrayContains(required.fields, field)) {
                    if (input.type == "text" || input.type == "password" || input.type =="textarea") {
                    	isError = (value == "");
                    	
                    } else if (input.type == "select-one") { 
                    	if (input.options.length < 1 || input.selectedIndex == -1 ) {
                    		// this condition to cover for unpopulated province select
                    		isError = true;
                    	} else {
                    		isError = (input.options[input.selectedIndex].value == "");
                    	}
                    	
                    } else if (input.type == "radio" || input.type == "checkbox") {
                    	isError = this.validateRadioCheckbox(isError, oform, evaluatedRadioCheckboxStatus, input);
                    }
                    
                    if (input.type != "radio" && input.type != "checkbox") {
                    	if (isError) { this.setError(input, isError, "required"); }
                    }
                }

                if ( !isError 
                     && (input.type == "text" || input.type == "password" || input.type =="textarea")
                     && (maxlength=input.getAttribute("maxlength")) 
                     && input.id.indexOf("vendor.bp.questions.response") == -1
                     && this.getUtf8Length(value) > maxlength ) {
                        isError = true;
                        this.setError(input, isError, "maxlength");
                }

                if (!isError && input.type == "text") {
                	
                    if (!isError && (emailFormat = validation.emailFormat) && this.arrayContains(emailFormat.fields, field)) {
                        isError = (!this.validateEmailFormat(value))
                        if (isError) { this.setError(input, isError, "emailFormat"); }
                    }
                    
                    if (!isError && (phoneFormat = validation.phoneFormat) && this.arrayContains(phoneFormat.fields, field) && phoneFormat.countryField) {
                        isError = (!this.validatePhoneFormat(input, value, phoneFormat, oform));
                        if (isError) { this.setError(input, isError, "phoneFormat"); }
                    }
                    
                    if (!isError && (handleFormat = validation.handleFormat) && handleFormat.field==field) {
                        isError = (!this.validateHandleFormat(value))
                        if (isError) { this.setError(input, isError, "handleFormat"); }
                    }
                                    	
                }
                
                if (!isError && input.type == "password") {
                    
                    if ((pw = validation.passwrdFormat) && (pw.passwrdField==field || pw.confirmField==field) ) {
                        var passwrd = oform.elements[pw.passwrdField];
                        var confirm = oform.elements[pw.confirmField];
                        if (passwrd && confirm) {
                            var passwrdVal = this.trim(passwrd.value);
                            var confirmVal = this.trim(confirm.value);
                            if (passwrdVal != "" && confirmVal != "") {
                                isError = (passwrdVal != confirmVal);
                            }
                        }
                        if (isError) { 
                            this.setError(input, isError, "passwrdFormat"); 
                        }
                    }                
                }
                
                if (isError) { errs = true; }
                if ((emailExists = validation.emailExists) && field == emailExists.field) { emailErrs = isError; }
                if ((handleExists = validation.handleExists) && field == handleExists.field) { handleErr = isError; }
            }
            
            var loe = validation.loginOnExists;
            if (!isError && loe && this.loginIsVisible(loe)) {
                var pwExistsVal = this.validateLogin(loe, oform);
                if (pwExistsVal == "sent") {
                    return false;
                } 
            }            
            
            if (!emailErrs) {
                // bypass emailExists when Login is present and password field is visible
                var bypass = this.loginIsVisible(loe);
                if (!bypass) {
                    var existVal = this.validateFieldExists(fields, validation, oform, "email");
                    if (existVal == "sent") {
                        return false;
                    } else if (existVal == "errs") {
                        errs = true;
                    }
                }
            }

            if (!handleErr) {
                var existVal = this.validateFieldExists(fields, validation, oform, "handle");	
                if (existVal=="sent") { 
                    return false; 
                } else if (existVal=="errs") {
                    errs = true;
                }
            }
            
        } catch (err) {
            logMessage("ERROR: " + err);
            errs = true;
        }
        
        this.setErrorHighlight(fields, validation, oform);
        this.setErrorMessage(fields, validation, oform);
        this.triggerJqueryEvent(validation, errs);
        
        logMessage("urValidation.validate - errs = " + errs + " - returns " + !errs)
        return !errs;
    },
    validateLogin : function(loe) {            
        if (this.loginIsVisible(loe) && window.jQuery) {
            var params = {
                email: this.trim(this.currentForm.elements[loe.fields.un].value),
                password: encodeURIComponent(this.trim(this.currentForm.elements[loe.fields.pw].value))
            };
            
            if ((pg = loe.processingGif)) {
                this.showProcessingGif(true, pg);
            }
            
            $.getJSON("http://users.techtarget.com/registration/rest/RegistrationService/Login?callback=?", params, function(d) {
                logMessage("LOGIN CALLBACK")
                urValidation.loginCallback(d);
            });
            return "sent";
        }
    },
    loginCallback : function(d) {
        if (d && (r=d.RegTx) && (r=r[0]) ) {
            var validation = this.validationCfg;
            var oform = this.currentForm;
            var fields = this.validateFields;
            
            var loe = validation.loginOnExists;
            var input = oform.elements[loe.fields.pw];
            
            if (r.status=="SUCCESS") {
               
                var d = new Date();
                d.setTime(d.getTime()+(5*365*24*60*60*1000)); // 5yrs
                var expireDate = d.toGMTString();
                for (var i = 0; i < r.cookies.cookie.length; i++) { 
                    var c = r.cookies.cookie[i];
                    document.cookie = c.name+"="+c.value+"; expires="+expireDate+"; path=/; domain="+getTopLevelDomainEnv(false);
                    if (c.name=="crs") { crs = c.value; }
                }
                
                var f = oform.elements;
                
                var params={};
                if (typeof crs !== "undefined") { params["crs"] = encodeURIComponent(crs); }
                if ((v=f["resId"]) && v.value != "") { params["resId"] = v.value; }
                if ((v=f["appCD"]) && v.value != "") { params["appCD"] = v.value; }
                if ((v=f["appName"]) && v.value != "") { params["appName"] = v.value; }
                if ((v=f["guideContentId"]) && v.value != "") { params["guideContentId"] = v.value; }
                if ((v=f["ad_id"]) && v.value != "") { params["ad_id"] = v.value; }
                params["fromURL"] = encodeURIComponent(window.location.href);
                params["isLogin"] = 1;
                params["t"] = (new Date().getTime());

                // Load step2 
                executeInlineByPageAndParams(loe.siteName, loe.targetDiv, "inlineregister", loe.nextPageNumber, params );

            } else {
                
                this.setError(input, true, "loginOnExists");
                this.setErrorHighlight(fields, validation, oform);
                this.setErrorMessage(fields, validation, oform);
                if ((pg = loe.processingGif)) { this.showProcessingGif(false, pg); }

            }
        } else {

            this.setError(input, true, "loginOnExists");
            this.setErrorHighlight(fields, validation, oform);
            this.setErrorMessage(fields, validation, oform);
            if ((pg = loe.processingGif)) { this.showProcessingGif(false, pg); }

        }

    },
    loginIsVisible : function(loe) {
        if (loe && loe.fields && (pw=this.currentForm.elements[loe.fields.pw])) {
            return (pw.getAttribute("disabled")==null);
        }
        return false;
    },    
    validateRadioCheckbox : function(isError, oform, evaluatedRadioCheckboxStatus, input) {
    	
    	var nodeList = oform.elements[input.name];  	
    	var foundChecked = input.checked;
    	
		if (!foundChecked) {
			for (var j = 0; j < nodeList.length; j++) {
				if (nodeList[j].checked) {
					foundChecked = true;
					break;
				}
			}
		}

		for (var j = 0; j < nodeList.length; j++) {
			if (!foundChecked) {
				isError = true;
				this.setError(nodeList[j], isError, "required");
			} else {
				// hide error message if any is shown
				this.setError(nodeList[j], false, "");
			}
		}

		// Keeps evaluated checkbox/radio input.name in check
		evaluatedRadioCheckboxStatus[input.name]=true;

		return isError;
    },
    validateEmailFormat : function(email) {
    	// regex from:
		// http://www.whatwg.org/specs/web-apps/current-work/multipage/forms.html#e-mail-state-%28type=email%29
        var emailRegEx = /^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
        return emailRegEx.test(email);
    },
    validateHandleFormat : function(handle) {
    	var handleRegEx = /^(?:[a-zA-Z0-9]{6,30})?$/;
        return handleRegEx.test(handle);
    },
    validatePhoneFormat : function(input, phoneNumber, phoneFormat, oform) {
        var regionCode = oform.elements[phoneFormat.countryField].value;
        if (regionCode == "") return false;
        
        try {
            var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
        } catch (e) {
            logMessage("ERROR IN PHONE VALIDATION - LETTING PHONE PASS VALIDATION :: " + e);
            return true; // allow validation to pass if phone lib is missing, or otherwise fails to initiate
        }
        
        try {

            var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
            var isNumberValid = phoneUtil.isValidNumber(number);
            if (!isNumberValid) {
                // try with + prepended
                var numberPlus = phoneUtil.parseAndKeepRawInput("+" + phoneNumber, regionCode);
                isNumberValid = phoneUtil.isValidNumber(numberPlus);
                if (!isNumberValid) { return false; }
                number = numberPlus;
            }
            var PNF = i18n.phonenumbers.PhoneNumberFormat;
            var phoneNumberRegion = phoneUtil.getRegionCodeForNumber(number);
            if ("US" == phoneNumberRegion || "CA" == phoneNumberRegion) {
                var formatted = phoneUtil.format(number, PNF.NATIONAL)
            } else {
                var formatted = phoneUtil.format(number, PNF.INTERNATIONAL)
            }
            input.value = formatted;
            
        } catch (e) {
            logMessage("PHONE VALIDATION ERROR :: " + e);
            return false;
        }
        return true;
    },
    validateFieldExists : function(fields, validation, oform, validationName) {
    	var fieldExists = validation[validationName+"Exists"];
    	var skip = this["skip"+validationName+"Exists"];
        if (fieldExists && (!skip || oform.elements[fieldExists.field].getAttribute("data-changed") == "true")) {
            var input = oform.elements[fieldExists.field];
            if (input && input.type == "text") {
                value = this.trim(input.value);
                var changed = input.getAttribute("data-changed") || "true";
                var lastValue = input.getAttribute("data-value") || "";
                if (value) {
                    if (changed == "true") {
                        this.setError(input, "false", "");
                        this.setErrorHighlight(fields, validation, oform);
                        this.setErrorMessage(fields, validation, oform);
                        var src = "http://users.techtarget.com/registration/json/common/GetFieldExistsWithCallback.page?callback=urValidation."+validationName+"ExistsCallback&"+validationName+"={"+validationName+"}&field={field}&formid={formid}";
                        var root = document.getElementsByTagName("head")[0];
                        src = [ src.replace("{"+validationName+"}", encodeURIComponent(value))
                                   .replace("{field}", encodeURIComponent(input.name))
                                   .replace("{formid}", encodeURIComponent(oform.id)) ];
                        if ((pg = fieldExists.processingGif)) {
                            this.showProcessingGif(true, pg);
                        }
                        loadJs(root, src, function() {});
                        return "sent";
                    } else if (changed == "false" && (result=fieldExists.onfailure)) {
                        
                        var fn = window[result];
                        if (typeof fn === "function") fn();
                        return "errs";
                        
                    } else if (changed == "false" && input.getAttribute("data-"+validationName+"Exists-error") == "true" && lastValue && value == lastValue) {
                   
                        this.setError(input, true, validationName+"Exists");
                        return "errs";
                    }
                }
            }
        }
        return;

    },
    getErrCount : function(oform) {
        for (var x = 0, y = 0; x < oform.elements.length; x++) {
            var ele = oform.elements[x];
            if ((e = ele.getAttribute("data-error")) && e == "true" && ele.getAttribute("disabled")==null) y++;
        }
        return y;
    },
    setError : function(input, isError, errorType) {
        input.setAttribute("data-error", isError);
        if (errorType == "" && (currentError = input.getAttribute("data-error-type"))) {
            input.setAttribute("data-last-error-type", currentError);
        }
        input.setAttribute("data-error-type", errorType);
    },
    removeAndHideError : function(input) {
        var isError = input.getAttribute("data-error") == "true";
        if (isError) {
            this.setError(input, false, "");
            this.setErrorHighlight(this.validateFields, this.validationCfg, input.form);
            this.setErrorMessage(this.validateFields, this.validationCfg, input.form);
        }        
    },
    findErrorHighlightNode: function(input) {
    	logMessage("finding highlight node for "+input.tagName);
    	if (input.type == "checkbox" || input.type == "radio" || input.type == "multiselect" || input.type == "intl_optin_checkbox") {
    		// find a parent node of "fieldset" tag, only check 10 parent node at most
    		var hlElm = input.parentNode;
    		for (var j=0; j<10; j++) {
    			if (hlElm.tagName == "FIELDSET") {
    				break;
    			}
    			hlElm = hlElm.parentNode;
    		}
    		logMessage("parentNode: "+hlElm.parentNode.tagName);
    		return hlElm.parentNode;
    	} else {
    		logMessage("parentNode: "+input.parentNode.tagName);
    		return (!input || !input.parentNode)? input:input.parentNode;
    	}
    },
    setErrorHighlight : function(fields, validation, oform) {
        fields = fields || this.validateFields;
        validation = validation || this.validationCfg;
        oform = oform || this.currentForm;
        for (var i = 0; i < fields.length; i++) {
            var input = oform.elements[fields[i]];
            if (!input) { continue; }
            
            logMessage("input: "+input+", length: "+input.length+", tagName: "+input.tagName+", id: "+input.id);
            
            var isError = input.getAttribute("data-error") == "true";
            var errorType = input.getAttribute("data-error-type");
            var highlightNode = ((validation.highlightNode || "self") == "parent") ? this.findErrorHighlightNode(input) : input; // "self"||"" or "parent"
            
            var currentClass = highlightNode.getAttribute("class");
            
            if (currentClass) {
            	currentClass = currentClass.replace("error-NoStyle", "")
                                           .replace(validation.highlightClass, "")
                                           .replace((validation.required) ? validation.required.highlightClass || "" : "", "")
                                           .replace((validation.emailFormat) ? validation.emailFormat.highlightClass || "" : "", "")
                                           .replace((validation.emailExists) ? validation.emailExists.highlightClass || "" : "", "");
            }
            
            if (isError) {
                var validator = validation[errorType];
                var hl = "error-NoStyle";
                if (validator.highlightClass !== undefined) {
                    hl = validator.highlightClass || hl;
                } else if (validation.highlightClass !== undefined) {
                    hl = validation.highlightClass;
                }
                highlightNode.setAttribute("class", ((!currentClass) ? "" : this.trim(currentClass) +" ") + hl);
            } else {
                highlightNode.setAttribute("class", this.trim(currentClass));
            }
        }
        
    },
    setErrorMessage : function(fields, validation, oform) {
        fields = fields || this.validationFields;
        oform = oform || this.currentForm;
        validation = validation || this.validationCfg;
        var errMsgClass = validation.errorMsgClass || "errorMessageInput";
        var errCount = this.getErrCount(oform);
        for (var i = 0; i < fields.length; i++) {
            var input = oform.elements[fields[i]], firstinput;
            if (!input) { continue; }
            var value = this.trim(input.value);
            var isError = input.getAttribute("data-error") == "true";
            var errorType = input.getAttribute("data-error-type");
            var lastErrorType = input.getAttribute("data-last-error-type");
            var errorP;
            
            var baseInputId = getBaseInputId(input);
            
            if (validation.msgInline && lastErrorType && lastErrorType != errorType) {
                if (lastErrorType == "required") { errorP = document.getElementById(baseInputId + ".blank"); }
                if (lastErrorType.match(/.+Format/)) { errorP = document.getElementById(baseInputId + ".invalid"); }
                if (lastErrorType.match(/.+Exists/)) { errorP = document.getElementById(baseInputId + ".exists"); }
                if (lastErrorType == "maxlength") { errorP = document.getElementById(baseInputId + ".maxlength"); }
                if (errorP) { errorP.setAttribute("class", errMsgClass+" hidden"); }
            }
            
            if (isError) {
                var validator = validation[errorType];
                var msgText = (validator && validator.msgText) ? validator.msgText : (validation.msgText) ? validation.msgText : "Please complete all required fields."

                if (validation.msgInline) {
                    if (errorType == "required") { errorP = document.getElementById(baseInputId + ".blank"); }
                    if (errorType.match(/.+Format/)) { errorP = document.getElementById(baseInputId + ".invalid"); }
                    if (errorType.match(/.+Exists/)) { errorP = document.getElementById(baseInputId + ".exists"); }
                    if (errorType == "maxlength") { errorP = document.getElementById(baseInputId + ".maxlength"); }
                    if (errorP) { errorP.setAttribute("class", errMsgClass); }
                }
                if (validation.msgType == "block") {
                    var block = document.getElementById(validation.msgBlockId);
                    block.innerHTML = validation.msgBlockFormat.replace("{msgText}", msgText.replace("{fieldValue}", value));
                    block.setAttribute("class", (validator.msgBlockClass) ? validator.msgBlockClass : validation.msgBlockClass);
                    block.style.display = "block";
                }
                if (validation.msgType == "alert") {
                    if (error) {
                        alert(msgText.replace("{fieldValue}", value));
                    }
                }
                
                if (!firstinput) { firstinput = input; }
                
            } else {
                if (validation.msgType == "block") {
                    var block = document.getElementById(validation.msgBlockId);
                    if (errCount == 0) {
                        block.innerHTML = "";
                        block.setAttribute("class", "");
                        block.style.display = "none";
                    }
                }
            }
            
        }
        
        if (firstinput && validation.inputFocus != false) { firstinput.focus(); }
        
    },
    emailExistsCallback : function(d) {
    	this.fieldExistsCallback(d,"emailExists");
    },
    handleExistsCallback : function(d) {
    	this.fieldExistsCallback(d,"handleExists");
    },
    fieldExistsCallback : function(d, v) {
        if (d) {
            var isError = ((e=d[v]) && (e==true || e=="true"));
            var oform = (d.formid) ? document.getElementById(d.formid) : this.currentForm;
            var input = oform.elements[d.field];
            
            this["skip"+v] = (!isError);
            var fieldExists = this.validationCfg[v];
            
            logMessage("validation script " + v + "Callback -- isError: " + isError);
            
            if ((pg = fieldExists.processingGif)) {
                this.showProcessingGif(false, pg);
            }
            
            input.setAttribute("data-changed", false);
            input.setAttribute("data-value", this.trim(input.value));
            input.setAttribute("data-" + v + "-error", isError);
            input.onchange = function() {
                var $thisValue = urValidation.trim(this.value);
                this.setAttribute("data-changed", ($thisValue != this.getAttribute("data-value")));
                this.setAttribute("data-value", $thisValue);
                var et=this.getAttribute("data-error-type");
                this.setAttribute("data-" + et + "-error", !($thisValue != this.getAttribute("data-value")))
            };
            
            this.setError(input, isError, (isError) ? v : "");
            
            if (typeof fieldExists.noHL === "undefined") { this.setErrorHighlight(this.validateFields, this.validationCfg, oform); }
            if (typeof fieldExists.noErrMsg === "undefined") { this.setErrorMessage(this.validateFields, this.validationCfg, oform); }
            
            logMessage("validation script final callback -- formHasError: " + isError + " skip"+v + " && do result");
            
            if (!isError && this.getErrCount(oform) == 0) {
                this.triggerJqueryEvent(this.validationCfg, isError);

            	var result = "";
                if (fieldExists.onsuccess) { result = fieldExists.onsuccess; }
                if (!result || result == "" || result == "submit") {
                    oform.submit();
                } else if (result == "donothing") {
                    // do nothing
                } else {
                    var fn = window[result];
                    if (typeof fn === "function") fn();
                }
            }
            
            if (isError) {
            	var result = "";
            	if (fieldExists.onfailure) { result = fieldExists.onfailure; }
            	if (!result || result == "") {
            		// do nothing
            	} else {
            		var fn = window[result];
            		if (typeof fn === "function") fn();
            	}
            }
        }
    },
    triggerJqueryEvent : function(validation, isError) {
        if (t=validation.triggerJqueryEvent) {
            if (window.jQuery) {
                if (isError) {
                    logMessage("trigger event: " + t.error);
                    $(this.currentForm).trigger(t.error);
                } else {
                    logMessage("trigger event: " + t.submit);
                    $(this.currentForm).trigger(t.submit);
                }
                
            } else {
                logMessage("Event Trigger Failed, no jquery");
            }
        }
    },
    showProcessingGif : function(showGif, processingGif) {
        if (showGif) {
            if (processingGif.hideSubmitId) {
                document.getElementById(processingGif.hideSubmitId).style.display = "none";
            }
            document.getElementById(processingGif.id).style.display = processingGif.displayStyle;
        } else {
            if (processingGif.hideSubmitId) {
                document.getElementById(processingGif.hideSubmitId).style.display = "block";
            }
            document.getElementById(processingGif.id).style.display = "none";
        }
        
    },
    getValidationFields : function(v) {
        var f = [], r = [], s = {};
        if (v) {
            if ((req = v.required) && req.fields) { f = f.concat(req.fields); }
            if ((ef = v.emailFormat) && ef.fields) { f = f.concat(ef.fields); }
            if ((ee = v.emailExists) && ee.field) { f = f.concat(ee.field); }
            if ((pf = v.phoneFormat) && pf.fields) { f = f.concat(pf.fields); }
            if ((hf = v.handleFormat) && hf.field) { f = f.concat(hf.field); }
            if ((he = v.handleExists) && he.field) { f = f.concat(he.field); }
            if ((pw = v.passwrdFormat) && pw.passwrdField && pw.confirmField) { 
                f = f.concat(pw.passwrdField); 
                f = f.concat(pw.confirmField);
            }
            if ((loe = v.loginOnExists) && loe.fields) { f = f.concat(loe.fields.pw); }
            if (f.length > 0) {
                for (var i = 0; i < f.length; i++) {
                    if (!s[f[i]]) {
                        s[f[i]] = true;
                        r.push(f[i]);
                    }
                }
            }
        }
        return r;
    },
    getUtf8Length : function(s) {
        var len = 0;
        for (var i = 0; i < s.length; i++) {
          var code = s.charCodeAt(i);
          if (code <= 0x7f) {
            len += 1;
          } else if (code <= 0x7ff) {
            len += 2;
          } else if (code >= 0xd800 && code <= 0xdfff) {
            // Surrogate pair: These take 4 bytes in UTF-8 and 2 chars in UCS-2
            // (Assume next char is the other [valid] half and just skip it)
            len += 4; i++;
          } else if (code < 0xffff) {
            len += 3;
          } else {
            len += 4;
          }
        }
        return len;
    },
    arrayContains : function(ary, value) {
        var r = false;
        if (ary && value) {
        	if (ary==value) {
        		return true;
        	}
            var i = ary.length;
            while (i--) {
                if (ary[i] === value) {
                    r = true;
                    break;
                }
            }
        }
        return r;
    },
    trim : function(value) {
        if (!value) { return ""; }
        return value.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
    }

};

if (window.jQuery) {
    
    /* !
     * ForMeter - Form completion progress bar
     * http://codecanyon.net/item/formeter-form-completion-progress-bar/2801131?ref=Andretti
     * 
     * Copyright (c) 2013, Andretti 
     * http://codecanyon.net/user/Andretti
     * http://www.wiredshack.com/
     * 
     * Released under CodeCanyon Regular License.
     * 
     * Version: 1.2 (Dec 11 2013)
     */
    (function($) {
        
        $.fn.formProgress = function(options) {
            var settings = {
                speed : 300,
                style : 'green',
                bubble : false,
                selector : '.required',
                minPercent : false,
                message : 'Please fill the required fields !'
            };
            if (options) {
                var settings = $.extend({}, settings, options);
            }
            var $this = $(this);
            var sel = settings.selector;
            
            var names = [];
            $(sel + ":radio").each(function() {
                var n = $(this).attr('name');
                if ($.inArray(n, names) < 0) {
                    names.push(n);
                }
            });
            var totalInputs = $(sel).not(":radio").length + names.length;
            var mainForm = $(sel).parents('form');
            
            $(mainForm).find(sel + ':checkbox, ' + sel + ':radio, select' + sel).on('change', function() {
                animateBar.call($this);
            });
            $(mainForm).find('input[type=text]' + sel + ', input[type=password]' + sel + ', textarea' + sel).on('keyup', function() {
                if ((ev = this.getAttribute("data-formeter-event")) && ev != "") {
                    if (ev == "blur") {
                        $(this).on(ev, function() {
                            if (this.getAttribute("data-error") != "true") {
                                animateBar.call($this);
                            }
                        });
                        this.setAttribute("data-formeter-event", "set");
                    }
                } else {
                    animateBar.call($this);
                }
            });
            
            return this.each(function() {
                animateBar.call($this);
            });
            
            function animateBar() {
                var vars = fProcess();
                
                $(this).stop().animate({
                    width : vars.toPercent * vars.ratio
                }, settings.speed);
                
                if (settings.bubble) {
                    if (vars.bubble.length === 0) {
                        $(this).parent().append('<div class="bubble"><div class="percent">' + vars.toPercent + '%</div><div class="arrow"></div><div class="arrowInner"></div></div>');
                        vars.bubble = $(this).next();
                    } else {
                        vars.bubble.find('.percent').text(vars.toPercent + '%');
                    }
                    vars.bubble.stop().animate({
                        left : (vars.toPercent * vars.ratio) - 5
                    }, settings.speed);
                } else {
                    $(this).text(vars.toPercent + '%');
                }
            }
            
            function fProcess() {
                // ORIGINAL - doesn't work in jquery > 1.8 // var filled = $(sel + "[value!='']").not(':checkbox, :radio').length + $(sel + ':checked').length;
                var filled = $(sel).filter(function() {
                                        if ($.support.placeholder != undefined && !$.support.placeholder && (ph=this.getAttribute("placeholder")) && ph == this.value) {
                                            return false; // the placeholder and value are the same, don't count towards total
                                        }
                                        if ((e=this.getAttribute("data-error")) && e=="true") {
                                            return false; // the filed has been identified as having an error, don't count towards total
                                        }
                                       return this.value!="";
                                    }).not(':checkbox, :radio').length + $(sel + ':checked').length;
                var newArr = {
                    filled : filled,
                    ratio : $this.parent().width() / 100,
                    toPercent : Math.round((filled * 100) / totalInputs),
                    bubble : $this.next()
                };
                $this.attr('class', settings.style);
                // preventSubmit(newArr.toPercent);
                return newArr;
            }
            
            function preventSubmit(percentage) {
                if (!settings.minPercent) { return false; }
                var targetInput = mainForm.find('input[type=submit]');
                targetInput.removeAttr('onclick');
                if (percentage < settings.minPercent) {
                    targetInput.attr('onclick', "alert('" + settings.message + "'); return false;");
                }
            }
            
        };
    })(jQuery);
    
}
