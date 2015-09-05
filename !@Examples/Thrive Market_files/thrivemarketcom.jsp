

usi_alert = function(msg) {}

var usi_error_submits = 0;
function stopError(usi_msg, usi_url, usi_linenumber) {
	if (usi_url.indexOf("upsellit.com") != -1 && usi_url.indexOf("err.jsp") == -1 && usi_error_submits < 5) {
		usi_error_submits++;
		var USI_headID = document.getElementsByTagName("head")[0];
		var USI_errorScript = document.createElement('script');
		USI_errorScript.type = 'text/javascript';
		USI_errorScript.src = 'http://www.upsellit.com/err.jsp?oops='+escape(usi_msg)+'-'+escape(usi_url)+'-'+escape(usi_linenumber);
		USI_headID.appendChild(USI_errorScript);
	}
	return true;
}
if (location.href.indexOf("usishowerrors") == -1) {
	window.onerror = stopError;
}

var usi_error_submits = 0;
function usi_stopError(usi_msg, usi_url, usi_linenumber) {
	if (usi_url.indexOf("upsellit.com") != -1 && usi_url.indexOf("err.jsp") == -1 && usi_error_submits < 5) {
		usi_error_submits++;
		var USI_headID = document.getElementsByTagName("head")[0];
		var USI_errorScript = document.createElement('script');
		USI_errorScript.type = 'text/javascript';
		USI_errorScript.src = '//www.upsellit.com/err.jsp?oops='+escape(usi_msg)+'-'+escape(usi_url)+'-'+escape(usi_linenumber);
		USI_headID.appendChild(USI_errorScript);
	}
	return true;
}
if (location.href.indexOf("usishowerrors") == -1) {
	window.onerror = usi_stopError;
}
USI_setSessionValue = function(name, value) {
	try {
		var usi_win = window.top || window;
		var usi_found = 0;
		var usi_allValues = usi_win.name.split(";");
		var usi_newValues = "";
		for (var i=0; i<usi_allValues.length;i++) {
			var usi_theValue = usi_allValues[i].split("=");
			if (usi_theValue.length == 2) {
				if (usi_theValue[0] == name) {
					usi_theValue[1] = value;
					usi_found = 1;
				}
				if (usi_theValue[1] != null) {
					usi_newValues += usi_theValue[0] + "=" + usi_theValue[1] + ";";
				}
			} else if (usi_allValues[i] != "") {
				usi_newValues += usi_allValues[i] + ";";
			}
		}
		if (usi_found == 0) {
			usi_newValues += name + "=" + value + ";";
		}
		usi_win.name = usi_newValues;
	} catch (e) {}
}
USI_getWindowNameValue = function(name) {
	try {
	var usi_win = window.top || window;
	var usi_allValues = usi_win.name.split(";");
	for (var i=0; i<usi_allValues.length;i++) {
		var usi_theValue = usi_allValues[i].split("=");
		if (usi_theValue.length == 2) {
			if (usi_theValue[0] == name) {
				return usi_theValue[1];
			}
		}
	}
	} catch (e) {}
	return null;
}
USI_createCookie = function(name,value,seconds) {
	var date = new Date();
	date.setTime(date.getTime()+(seconds*1000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = name+"="+value+expires+"; path=/;domain="+document.domain+";";
}
USI_readCookie = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
var USI_local_cache = {};
USI_getASession = function(name) {
	if (typeof(name) == "undefined") {
		name = "USI_Session";
	}
	if (typeof(USI_local_cache[name]) != "undefined") {
		return USI_local_cache[name];
	}
	var usi_win = window.top || window;
	var USI_Session = USI_readCookie(name);
	if (USI_Session == null || USI_Session == 'null' || USI_Session == '') {
		//Link followed cookie?
		USI_Session = USI_readCookie("USIDataHound");
		if (USI_Session != null) {
			USI_createCookie("USI_Session", USI_Session, 7*24*60*60);
		}
	}
	if (USI_Session == null || USI_Session == 'null' || USI_Session == '') {
		//fix for pre-variable stuff
		try {
			if (usi_win.name.indexOf("dh_") == 0) {
				usi_win.name = "USI_Session="+usi_win.name+";";
			}
			USI_Session = USI_getWindowNameValue(name);
		} catch (e) {}
	}
	if (USI_Session == null || USI_Session == 'null' || USI_Session == '') {
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = 4;
		var randomstring = '';
		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}
		if (name == "USI_Session") {
			USI_Session = "dh_" + randomstring + "" + (new Date()).getTime();
			USI_createCookie("USI_Session", USI_Session, 7*24*60*60);
			USI_setSessionValue("USI_Session", USI_Session);
		} else {
			USI_Session = name + "_" + randomstring + "" + (new Date()).getTime();
			USI_createCookie(name, USI_Session, 7*24*60*60);
			USI_setSessionValue(name, USI_Session);
		}
	}
	USI_local_cache[name] = USI_Session;
	return USI_Session;
}
USI_deleteVariable = function(name) {
	USI_updateASession(name, null, -100);
}
USI_getSessionValue = function(name) {
	if (typeof(USI_local_cache[name]) != "undefined" && USI_local_cache[name] != null) {
		return USI_local_cache[name];
	}
	var usi_value = USI_readCookie(name);
	if (usi_value == null) {
		usi_value = USI_getWindowNameValue(name);
	}
	if (usi_value != null) {
		USI_updateASession(name, usi_value, 7*24*60*60);
		USI_local_cache[name] = usi_value;
	}
	return usi_value;
}
USI_updateASession = function(name, value, exp_seconds) {
    try {
        value = value.replace(/(\r\n|\n|\r)/gm,"");
    } catch(e) {}
    USI_createCookie(name, value, exp_seconds);
    USI_setSessionValue(name, value);
    USI_local_cache[name] = value;
}

var usi_doublePlaced = 0;
try{
	if (!(typeof USIqs === "undefined"))
			usi_doublePlaced = 1;
} catch(e) {}
if (usi_doublePlaced == 0) {
	var USI_key = "";
	var USIqs = "";
	var USIsiteID = "";
	var usi_url = location.href.toLowerCase();
	var usi_subtotal = "";
	if ( USI_getSessionValue("usi_delay_apply") != null && USI_getSessionValue("usi_delay_apply") != "") {
		var usi_coupon = USI_getSessionValue("usi_delay_apply");
		USI_updateASession("usi_delay_apply", "", 24*60*60);
		window.location = "https://thrivemarket.com/checkout/cart/couponPost/?remove=0&coupon_code="+usi_coupon+"&null=&block[]=options&block[]=alerts&no_cache=1";
	}
	function usi_getElementsByClassName(usi_node, usi_classname) {
		var usi_a = [];
		var usi_re = new RegExp('(^| )' + usi_classname + '( |$)');
		var usi_els = usi_node.getElementsByTagName("*");
		for (var usi_i = 0, usi_j = usi_els.length; usi_i < usi_j; usi_i++)
			if (usi_re.test(usi_els[usi_i].className)) usi_a.push(usi_els[usi_i]);
		return usi_a;
	}
	if (usi_url.indexOf("utm_medium=pla") != -1 || usi_url.indexOf("utm_medium=sem") != -1) {
		USI_updateASession("usi_medium", "search", 24*60*60);
	}

	var usi_rec_products = "";
	if (location.href.indexOf("thrivemarket.com/blog") != -1) {
		var usi_article_products = usi_getElementsByClassName(document.body, "article-products");
		if (usi_article_products.length > 0) {
			usi_article_products[0].setAttribute("id", "usi_anchor_area");
			var usi_article_products_html = usi_article_products[0].innerHTML.split("product-small always-full");
			thiswholeloop: for (var i=1;i<usi_article_products_html.length;i++) {
				var usi_productpic = usi_article_products_html[i];
				usi_productpic = usi_productpic.substring(usi_productpic.toLowerCase().indexOf("data-src=")+10, usi_productpic.length);
				usi_productpic = usi_productpic.substring(0, usi_productpic.indexOf("\""));
				var usi_productname = usi_article_products_html[i];
				usi_productname = usi_productname.substring(usi_productname.toLowerCase().indexOf("data-truncate-lines="), usi_productname.length);
				usi_productname = usi_productname.substring(usi_productname.indexOf(">")+1, usi_productname.length);
				usi_productname = usi_productname.substring(0, usi_productname.indexOf("<"));
				var usi_price = usi_article_products_html[i];
				usi_price = usi_price.substring(usi_price.lastIndexOf("$"), usi_price.length);
				usi_price = usi_price.substring(0, usi_price.indexOf("<"));
				var usi_top = 76*(i-0)+38;
				usi_rec_products += '<div style="position:absolute;top:'+usi_top+'px;left:50px;Z-INDEX:9007;width:58px;height:58px;"><img src="' + unescape(usi_productpic) + '" width="58" height="58" alt=""/></div><div style="font-size:10pt;position:absolute;top:'+usi_top+'px;left:105px;width:150px;max-width:150px;max-height:45px;height:45px;Z-INDEX:9007;text-align:right;color:#5f5e5e;overflow:hidden;">' + unescape(usi_productname) + '</div><div style="font-size:10pt;position:absolute;top:'+(usi_top+40)+'px;left:105px;width:150px;max-width:150px;max-height:45px;height:45px;Z-INDEX:9007;text-align:right;color:#a6a6a6;"><strike>' + unescape(usi_price) + '</strike></div>';
				if (i>=3) break thiswholeloop;
			}
		} else {
			var usi_favorites_products = usi_getElementsByClassName(document.body, "favorites-product");
			if (usi_favorites_products.length > 0) {
				usi_favorites_products[0].setAttribute("id", "usi_anchor_area");
				var usi_article_products_html = usi_favorites_products[0].innerHTML.split("product-small always-full");
				thiswholeloop: for (var i=1;i<usi_article_products_html.length;i++) {
					var usi_productpic = usi_article_products_html[i];
					usi_productpic = usi_productpic.substring(usi_productpic.toLowerCase().indexOf("data-src=")+10, usi_productpic.length);
					usi_productpic = usi_productpic.substring(0, usi_productpic.indexOf("\""));
					var usi_productname = usi_article_products_html[i];
					usi_productname = usi_productname.substring(usi_productname.toLowerCase().indexOf("data-truncate-lines="), usi_productname.length);
					usi_productname = usi_productname.substring(usi_productname.indexOf(">")+1, usi_productname.length);
					usi_productname = usi_productname.substring(0, usi_productname.indexOf("<"));
					var usi_price = usi_article_products_html[i];
					usi_price = usi_price.substring(usi_price.lastIndexOf("$"), usi_price.length);
					usi_price = usi_price.substring(0, usi_price.indexOf("<"));
					var usi_top = 76*(i-0)+38;
					usi_rec_products += '<div style="position:absolute;top:'+usi_top+'px;left:50px;Z-INDEX:9007;width:58px;height:58px;"><img src="' + unescape(usi_productpic) + '" width="58" height="58" alt=""/></div><div style="font-size:10pt;position:absolute;top:'+usi_top+'px;left:105px;width:150px;max-width:150px;max-height:45px;height:45px;Z-INDEX:9007;text-align:right;color:#5f5e5e;overflow:hidden;">' + unescape(usi_productname) + '</div><div style="font-size:10pt;position:absolute;top:'+(usi_top+40)+'px;left:105px;width:150px;max-width:150px;max-height:45px;height:45px;Z-INDEX:9007;text-align:right;color:#a6a6a6;"><strike>' + unescape(usi_price) + '</strike></div>';
					if (i>=3) break thiswholeloop;
				}
			}
		}
		if (usi_rec_products != "") {
			var USI_headID = document.getElementsByTagName("head")[0];
			if (top.location != location) {
				USI_headID = parent.document.getElementsByTagName("head")[0];
			}
			var USI_dynScript = document.createElement("script");
			USI_dynScript.setAttribute("type","text/javascript");
			USI_dynScript.setAttribute("src","//www.upsellit.com/launch.jsp?qs=238238270262267306326292296340336275343325327313337313326338309&siteID=12073");
			USI_headID.appendChild(USI_dynScript);
		}
	}

	var usi_isMobile = (/iphone|ipod|ipad|android|blackberry|iemobile/i).test(navigator.userAgent.toLowerCase());
	if (Thrive.userLoggedIn == 0 && USI_getSessionValue("usi_medium") == "search" && document.getElementById("image-main") != null && document.getElementById("product_addtocart_form") != null) {
	
		var usi_split_siteID = "12038";
		if (usi_isMobile) {
			usi_split_siteID = "12060";
		}
		var usi_split_test_cookie_length = 30; //days
		
		usi_getSplitVar = function() {
    if (USI_readCookie('usi_visitor_id') == null) {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 4;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        usi_visitor_id = "v_" + randomstring + "" + (new Date()).getTime();
        USI_createCookie('usi_visitor_id', usi_visitor_id, 30*24*60*60);
        return usi_visitor_id;
    }
    return USI_readCookie('usi_visitor_id');
}
usi_SetSplitTest = function(whichSiteID, whichTest) {
    var USI_headID = document.getElementsByTagName("head")[0];
    var USI_dynScript = document.createElement("script");
    USI_dynScript.setAttribute("type", "text/javascript");
    USI_dynScript.setAttribute("src", "//www.upsellit.com/launch/split_test.jsp?siteID=" + whichSiteID + "&group=" + whichTest + "&usi_visitor_id=" + usi_getSplitVar());
    USI_headID.appendChild(USI_dynScript);
    if (typeof(usi_SetVerification) !== "undefined") setTimeout("usi_SetVerification("+whichTest+");", 2000);
}
var usi_diceRoll = "0";
if (location.href.indexOf("forceupsellitgroup") != -1) {
    usi_diceRoll = "1";
    if (typeof(usi_SetSplitTest) != "undefined") { usi_SetSplitTest(usi_split_siteID, usi_diceRoll); }
    USI_createCookie('usi_diceRoll', usi_diceRoll, usi_split_test_cookie_length*24*60*60);
} else if (USI_readCookie('usi_diceRoll') == null) {
    
    usi_diceRoll = "0";
    usi_SetSplitTest(usi_split_siteID, usi_diceRoll);
    USI_createCookie('usi_diceRoll', usi_diceRoll, usi_split_test_cookie_length*24*60*60);
} else {
    usi_diceRoll = USI_readCookie('usi_diceRoll');
}

		if (location.href.indexOf("showchat") != -1) usi_diceRoll = "1";
		if (usi_diceRoll == "1") {
			//Single product read
			var usi_productpic = document.getElementById("image-main").src;
			var usi_productname = document.getElementById("image-main").alt;

			var usi_prices = usi_getElementsByClassName(document.body, "price");
			var usi_retail_price = "";
			if (usi_prices.length > 0) {
				usi_retail_price = usi_prices[0].innerHTML;
			}
			var usi_prices = usi_getElementsByClassName(document.body, "color-alert");
			var usi_price = "";
			if (usi_prices.length > 0) {
				usi_price_1 = usi_prices[0].innerHTML;
				if (usi_price_1.indexOf("Thrive:") != -1 && usi_price_1.indexOf("$") != -1) {
					usi_price = usi_price_1.substring(usi_price_1.indexOf("$")+1, usi_price_1.length);
					usi_price = usi_price.substring(0, usi_price.indexOf("<"));
				}
			}
			if (usi_price != "") {
				usi_discount = (Number(usi_price)*.25).toFixed(2);
				usi_newprice = (Number(usi_price) - Number(usi_discount)).toFixed(2);
			}
			var usi_dest = document.getElementById("product_addtocart_form").action;
			if (typeof(is_purchased_user) == "undefined" || is_purchased_user == false) {
				var USI_headID = document.getElementsByTagName("head")[0];
				if (top.location != location) {
					USI_headID = parent.document.getElementsByTagName("head")[0];
				}
				var USI_dynScript = document.createElement("script");
				USI_dynScript.setAttribute("type","text/javascript");
				if (usi_isMobile) {
					
					USI_dynScript.setAttribute("src","//www.upsellit.com/launch.jsp?qs=227237223227219308302275332272331333294305337343303289343338346&siteID=12060");
					
				} else {
					USI_dynScript.setAttribute("src","//www.upsellit.com/launch.jsp?qs=261251253200244330321339338325325281290308303327305339298314330&siteID=12038");
				}
				USI_headID.appendChild(USI_dynScript);
			}
		}
	
	} else {
		if (usi_url.indexOf("thrivemarket.com/checkout/cart") != -1 || usi_url.indexOf("thrivemarket.com/onestepcheckout") != -1) {
			USI_updateASession("usi_cartvisit", "1", 24*60*60);
		}
		if (usi_url.indexOf("onestepcheckout") != -1) {
			try{
				var divs = document.getElementsByTagName('div');
				for (var i=0; i<divs.length; i++ ) {
					if (divs[i].className != null && divs[i].className.indexOf("row") != -1) {
						if (divs[i].innerHTML.toLowerCase().indexOf("$") != -1 && divs[i].innerHTML.toLowerCase().indexOf("subtotal") != -1) {
							usi_subtotal = divs[i].innerHTML;
							usi_subtotal = usi_subtotal.substring(usi_subtotal.toLowerCase().lastIndexOf("$")+1, usi_subtotal.length);
							usi_subtotal = usi_subtotal.substring(0, usi_subtotal.indexOf("<"));
						}
					}
				}
			}catch(e) {}
		} else {
			try {
				var divs = document.getElementsByTagName('div');
				usi_thiswholeloop: for (var i=0; i<divs.length; i++ ) {
					if (divs[i].className != null && divs[i].className.indexOf("minicart-total") != -1) {
						if (divs[i].innerHTML.toLowerCase().indexOf("$") != -1) {
							usi_subtotal = divs[i].innerHTML;
							usi_subtotal = usi_subtotal.substring(usi_subtotal.toLowerCase().indexOf("$")+1, usi_subtotal.length);
							usi_subtotal = usi_subtotal.substring(0, usi_subtotal.indexOf("<"));
							break usi_thiswholeloop;
						}
					}
				}
			}catch(e) {}
		}
		var usi_retailtotal = 0, usi_thrivetotal = 0, usi_percentage_diff = 0.00, usi_dollar_diff = 0.00, usi_highest_total_so_far = 0.00, usi_products_count = 0;
		var usi_cart_prods = "", usi_best_productpic = "", usi_best_productpic = "";
		var usi_prod1 = 0, usi_prod2 = 0, usi_prod3 = 0;
		var usi_cart_prods1 = "", usi_cart_prods2 = "", usi_cart_prods3 = "";
		try {
			if (document.getElementById("cart-sidebar") != null) {
				var usi_minicart_html = document.getElementById("cart-sidebar").innerHTML.toLowerCase();
				var usi_item_info = usi_minicart_html.split("class=\"item-image\"");
				for (var i = 1; i < usi_item_info.length; i++) {
					var usi_struck = usi_item_info[i].substring(usi_item_info[i].indexOf("$")+1, usi_item_info[i].length);
					usi_struck = usi_struck.substring(0, usi_struck.indexOf("<"));
					usi_retailtotal = usi_retailtotal + Number(usi_struck);
					var usi_actual = usi_item_info[i].substring(usi_item_info[i].lastIndexOf("$")+1, usi_item_info[i].length);
					usi_actual = usi_actual.substring(0, usi_actual.indexOf("<"));
					usi_thrivetotal = usi_thrivetotal + Number(usi_actual);
					if (usi_actual > usi_highest_total_so_far) {
						usi_highest_total_so_far = usi_thrivetotal;
						var usi_best_productpic = usi_item_info[i];
						usi_best_productpic = usi_best_productpic.substring(usi_best_productpic.toLowerCase().indexOf("src=")+5, usi_best_productpic.length);
						usi_best_productpic = usi_best_productpic.substring(0, usi_best_productpic.indexOf("\""));
						var usi_best_productname = usi_item_info[i];
						usi_best_productname = usi_best_productname.substring(usi_best_productname.toLowerCase().indexOf("alt=")+5, usi_best_productname.length);
						usi_best_productname = usi_best_productname.substring(0, usi_best_productname.indexOf("\""));
					}
					var usi_productpic = usi_item_info[i];
					usi_productpic = usi_productpic.substring(usi_productpic.toLowerCase().indexOf("src=")+5, usi_productpic.length);
					usi_productpic = usi_productpic.substring(0, usi_productpic.indexOf("\""));
					var usi_productname = usi_item_info[i];
					usi_productname = usi_productname.substring(usi_productname.toLowerCase().indexOf("alt=")+5, usi_productname.length);
					usi_productname = usi_productname.substring(0, usi_productname.indexOf("\""));
                    if (usi_item_info[i].indexOf("Free gift") == -1) {
                        usi_products_count++;
                    }
					if (Number(usi_actual) - Number(usi_prod1) > 0) {
						usi_prod3 = usi_prod2;
						usi_prod2 = usi_prod1;
						usi_prod1 = usi_struck;
						usi_cart_prods3 = usi_cart_prods2;
						usi_cart_prods2 = usi_cart_prods1;
						usi_cart_prods1 = '<div style="position:absolute;top:0px;left:0px;Z-INDEX:9007;width:80px;height:80px;"><img src="' + unescape(usi_productpic) + '" width="80" height="80" alt=""></div><div style="font-size:10pt;position:absolute;top:0px;left:75px;width:130px;max-width:150px;max-height:75px;height:75px;Z-INDEX:9007;text-align:right;color:#5f5e5e;overflow:hidden;">' + unescape(usi_productname) + '</div><div style="font-size:10pt;position:absolute;top:70px;left:150px;width:50px;max-width:50px;max-height:25px;height:25px;Z-INDEX:9007;text-align:right;color:#a6a6a6;"><strike>$' + unescape(usi_struck) + '</strike></div>';
					} else if (Number(usi_struck) - Number(usi_prod2) > 0) {
						usi_prod3 = usi_prod2;
						usi_prod2 = usi_struck;
						usi_cart_prods3 = usi_cart_prods2;
						usi_cart_prods2 = '<div style="position:absolute;top:0px;left:0px;Z-INDEX:9007;width:80px;height:80px;"><img src="' + unescape(usi_productpic) + '" width="80" height="80" alt=""></div><div style="font-size:10pt;position:absolute;top:0px;left:75px;width:130px;max-width:150px;max-height:75px;height:75px;Z-INDEX:9007;text-align:right;color:#5f5e5e;overflow:hidden;">' + unescape(usi_productname) + '</div><div style="font-size:10pt;position:absolute;top:70px;left:150px;width:50px;max-width:50px;max-height:25px;height:25px;Z-INDEX:9007;text-align:right;color:#a6a6a6;"><strike>$' + unescape(usi_struck) + '</strike></div>';
					} else if (Number(usi_struck) - Number(usi_prod3) > 0) {
						usi_prod3 = usi_struck;
						usi_cart_prods3 = '<div style="position:absolute;top:0px;left:0px;Z-INDEX:9007;width:80px;height:80px;"><img src="' + unescape(usi_productpic) + '" width="80" height="80" alt=""></div><div style="font-size:10pt;position:absolute;top:0px;left:75px;width:130px;max-width:150px;max-height:75px;height:75px;Z-INDEX:9007;text-align:right;color:#5f5e5e;overflow:hidden;">' + unescape(usi_productname) + '</div><div style="font-size:10pt;position:absolute;top:70px;left:150px;width:50px;max-width:50px;max-height:25px;height:25px;Z-INDEX:9007;text-align:right;color:#a6a6a6;"><strike>$' + unescape(usi_struck) + '</strike></div>';
					}
				}
				usi_percentage_diff = (100*(usi_retailtotal - usi_thrivetotal)/usi_retailtotal).toFixed(2);
				usi_dollar_diff = (usi_retailtotal - usi_thrivetotal).toFixed(2);
				usi_cart_prods += '<div style="position:absolute;top:114px;left:50px;Z-INDEX:9007;width:200px;height:100px;">'+usi_cart_prods1+'<div style="position:absolute;top:70px;left:0px;Z-INDEX:9007;width:190px;height:2px;"><hr/></div></div>';
				if (usi_cart_prods2 != "") usi_cart_prods += '<div style="position:absolute;top:225px;left:50px;Z-INDEX:9007;width:200px;height:100px;">'+usi_cart_prods2+'<div style="position:absolute;top:70px;left:0px;Z-INDEX:9007;width:190px;height:2px;"><hr/></div></div>';
				//if (usi_cart_prods3 != "") usi_cart_prods += '<div style="position:absolute;top:256px;left:50px;Z-INDEX:9007;width:200px;height:65px;">'+usi_cart_prods3+'<div style="position:absolute;top:70px;left:0px;Z-INDEX:9007;width:190px;height:2px;"><hr/></div></div>';
			}
		} catch (e) {}
		var USIkeys = "";
		if (usi_cart_prods != "" && usi_percentage_diff > 0) {
			var USIkeys = "";
			var usi_random = Math.random();
			if (usi_random > .333) {
				if (usi_products_count > 1 ) {
					if (usi_random > .666) {
						USIkeys = "&keys=dollar_multi";
					} else {
						USIkeys = "&keys=percent_multi";
					}
				} else {
					//if (usi_random > .666) {
					//	USIkeys = "&keys=dollar_single";
					//} else {
						USIkeys = "&keys=percent_single";
					//}
				}
			}
		}
		if (Number(usi_subtotal) > 1) {
			if (USI_getSessionValue("usi_cartvisit") != null) {
				// TargetedOffer - Cart Group B
				USIqs = "264230263212203276291303337322330344302280303330304289306338303";
				USIsiteID = "11873";
			} else if (USI_getSessionValue("usi_cartvisit") == null) {
				// TargetedOffer - Active Cart Group B2
				USIqs = "256266227276240294297276331306336325306344314339310299279337290";
				USIsiteID = "11872";
			}
		}
		if (USI_readCookie('u-upsellitc3296') == null || location.href.indexOf("showchat") != -1) {
			if (USIqs != "" && USI_getSessionValue("usi_couponcode") == null && usi_url.indexOf("success") == -1) {
				if (typeof(is_purchased_user) == "undefined" || is_purchased_user == false) {
					var USI_headID = document.getElementsByTagName("head")[0];
					if (top.location != location) {
						USI_headID = parent.document.getElementsByTagName("head")[0];
					}
					var USI_dynScript = document.createElement("script");
					USI_dynScript.setAttribute("type","text/javascript");
					USI_dynScript.setAttribute("src","//www.upsellit.com/upsellitJS4.jsp?qs="+USIqs+"&siteID="+USIsiteID+USIkeys);
					USI_headID.appendChild(USI_dynScript);
				}
			}
		}
	}
}
