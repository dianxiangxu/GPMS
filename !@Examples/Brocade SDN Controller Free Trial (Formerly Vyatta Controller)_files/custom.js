function profileFormSubmit() { 
	var option_selected = $('#b_country option:selected').text();
	$("input[id=country_name]").val(option_selected);
}

function downloadFile(path) { 	
	document.downloadForm.action="/forms/getFile?p="+path;
	document.downloadForm.submit(); 
	Munchkin.munchkinFunction('clickLink', {
		href: path}
	 );
}

function checkCookie() {
    var VyattaDwlnd=getCookie("download-tracker-cookie");
    if(VyattaDwlnd) {    	
    	window.location="download.jsp";
    }
}
 
function getCookie(cookie_name) {
	 var p_cookie = cookie_name + "=";
	 var full_cookie = document.cookie.split(';');
	 
	 for(var i=0; i<full_cookie.length; i++) {
	   var c = $.trim(full_cookie[i]);
	   if (c.indexOf(p_cookie)==0) return c.substring(p_cookie.length,c.length);
	 }	 
	 return "";
}