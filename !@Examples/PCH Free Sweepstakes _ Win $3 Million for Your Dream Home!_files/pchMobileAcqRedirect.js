//v1.03

function _pchMobileDecodePrismCookie(mCookie,mAttribute){if(document.cookie.length>0){isCookie=document.cookie.indexOf(mCookie+"=");if(isCookie!=-1){var readCookie=GetCookie(mCookie);var decoded=decode64(readCookie);var returnVal=getNameValPrism(decoded,mAttribute);return returnVal}}}function GetCookie(name){var arg=name+"=";var alen=arg.length;var clen=document.cookie.length;var i=0;while(i<clen){var j=i+alen;if(document.cookie.substring(i,j)==arg)return getCookieVal(j);i=document.cookie.indexOf(" ",i)+1;if(i==0)break}return null}function getCookieVal(offset){var endstr=document.cookie.indexOf(";",offset);if(endstr==-1)endstr=document.cookie.length;return unescape(document.cookie.substring(offset,endstr))}function getNameValPrism(cookieName,valName){var cookieString;var cookieArray;var nameValArray;var nameValStr;var nameValLength;var i;cookieString=cookieName;cookieString=cookieString.replace(/[\u0000-\u0001]+/g,"");if(cookieString==null){return false}cookieArray=getStringArrPrism(cookieString,";");if(cookieArray.length==0){return false}nameValStr=setArrayStrPrism(cookieArray,"=");nameValArray=getStringArrPrism(nameValStr,"=");if(nameValArray==0){return false}nameValLength=nameValArray.length;for(i=0;i<nameValLength;){if(nameValArray[i].toLowerCase()==valName.toLowerCase()){var value=nameValArray[i+1];return unescape(nameValArray[i+1])}i=i+1}}function setArrayStrPrism(strArray,sDelimiter){var arrLength;var sReturn="";var i;arrLength=strArray.length;if(arrLength==0){return false}else{for(i=0;i<arrLength;i++){sReturn=sReturn+strArray[i]+sDelimiter}}return sReturn}function getStringArrPrism(strCookieVals,sDelimiter){var sReturn;sReturn=(sDelimiter.length>0)?strCookieVals.split(sDelimiter):false;if(!sReturn){alert("Delimiter not specified");return false}else{return sReturn}}var keyStr="ABCDEFGHIJKLMNOP"+"QRSTUVWXYZabcdef"+"ghijklmnopqrstuv"+"wxyz0123456789+/"+"=";function encode64(input){var output="";var chr1,chr2,chr3="";var enc1,enc2,enc3,enc4="";var i=0;do{chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}output=output+keyStr.charAt(enc1)+keyStr.charAt(enc2)+keyStr.charAt(enc3)+keyStr.charAt(enc4);chr1=chr2=chr3="";enc1=enc2=enc3=enc4=""}while(i<input.length);return output}function decode64(input){var output="";var chr1,chr2,chr3="";var enc1,enc2,enc3,enc4="";var i=0;var base64test=/[^A-Za-z0-9\+\/\=]/g;if(base64test.exec(input)){alert("There were invalid base64 characters in the input text.\n"+"Valid base64 characters are A-Z, a-z, 0-9, ?+?, ?/?, and ?=?\n"+"Expect errors in decoding.")}input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}chr1=chr2=chr3="";enc1=enc2=enc3=enc4=""}while(i<input.length);return output}


var _pchMobileAcqMobilePath, _pchMobileAcqDefaultToken;

//query string functions
function _pchMobileAcqGetURLValue(v){
	q = document.location.search.substring(1);
	if (q=="") return q;
	pairs = q.split("&");
	for (i=0; i<pairs.length; i++){
		if (pairs[i].split("=")[0].toLowerCase() == v.toLowerCase()) return unescape(pairs[i].split("=")[1]);
	}
	return "";
};


function _pchMobileAcqRedirect(inStrMobilePath,inStrDefaultMobileToken){
	var mobileToken = inStrDefaultMobileToken; //set default

	if(_pchMobileAcqGetURLValue("tid")){ //get from querystring
		mobileToken = _pchMobileAcqGetURLValue("tid");	
	}else{ //get from cookie
		if(_pchMobileDecodePrismCookie("tid","tid")) mobileToken = _pchMobileDecodePrismCookie("tid","tid");	
	}
	
	window.location = inStrMobilePath + "?tid=" + mobileToken;
};