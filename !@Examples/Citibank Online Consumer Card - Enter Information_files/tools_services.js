function toggleServiceIntro(elm) {
	toggleParentClassByClassName(elm, 'showFull', 'div', 'service_intro');
}

// For Balance Transfer "Show Offers" page - table sorting.
var currCell = 0;
function sortTable(cell, sortLink) {
	var sorttable = document.getElementById('select_offer_sort_table');
	currCell = cell;
	
	var dataTBodies = new Array();
	for (var i=0; i < sorttable.tBodies.length; i++) 
	{
		dataTBodies[dataTBodies.length] = sorttable.tBodies[i];
	}	

	if (cell == 0) {
		dataTBodies.sort(sortString);
	} else if (cell == 1) {
		dataTBodies.sort(sortDateCell);
	}

	if(sortLink)
	{
		if (sortLink.className == "down") {
			dataTBodies.reverse();
			sortLink.className = "up";
		} else {
			sortLink.className = "down";
		}
	}
	
	for (var i=0; i < dataTBodies.length; i++) {
		tmpVar = dataTBodies[i];
		dataTBodies[i].parentNode.removeChild(dataTBodies[i]);
		sorttable.appendChild(tmpVar);
	}

	var ths = sorttable.getElementsByTagName('th');
	for(var i=0;i<ths.length;i++)
	{ var theLink = ths[i].getElementsByTagName('a')[0];
		if(theLink)
		{
			if(theLink.id != sortLink.id)
			{
			theLink.className = "";
			}
		}
	}
}
function sortString(a, b) {
	var temp1 = a.rows[1].cells[currCell].innerHTML;
	var temp2 = b.rows[1].cells[currCell].innerHTML;	

	if (temp1.toLowerCase().indexOf('<table') != -1) temp1 = getTableContent(temp1);
	if (temp2.toLowerCase().indexOf('<table') != -1) temp2 = getTableContent(temp2);
	if (temp1 == temp2) return 0;
	return (temp1 < temp2) ? -1 : 1;
}
function getTableContent(temp) {
	var tdindex = temp.toLowerCase().indexOf('<td');
	var tdendindex = temp.indexOf('>', tdindex);
	var tdcloseindex = temp.toLowerCase().indexOf('</td>');

	if (tdendindex != -1 && tdcloseindex != -1) {
		temp = temp.substring(tdendindex+1, tdcloseindex);
	}
	
	return temp;
}
function sortNumber(a, b) {
	var temp1 = parseFloat(a.rows[1].cells[currCell].innerHTML);
	var temp2 = parseFloat(b.rows[1].cells[currCell].innerHTML);
	return temp1 - temp2;
}
function sortDateCell(a,b){
	var date1 = a.getAttribute('duraDate');
	var date2 = b.getAttribute('duraDate');

	date1 = reformatDate(date1);
	date2 = reformatDate(date2);
	
	var temp1 = parseFloat(date1);
	var temp2 = parseFloat(date2);
	return temp1 - temp2;
}
function reformatDate(date) {
	var index1 = date.indexOf('/');
	var index2 = date.indexOf('/', index1+1);
	var month = date.substring(0, index1);
	var day = "";
	var year = "";
	
	if (index2 == -1) index2 = date.length;
	else {
		year = date.substring(index2+1, date.length);
	}

	var day = date.substring(index1+1, index2);
	
	date = year+month+day;
	
	return date;
}


var btcounter = '';

function toggleBalconEdit(btAvailableURL, elm, paySwitch, btcount) {

	if(btcount.indexOf('btcount')!=-1)
	{
		var p = btcount.split("btcount", 2);
		btcount = p[1];
	}
	//alert("btcount"+btcount);
	var payBody = getParentByTagName(elm, 'tbody');
	if (paySwitch == 'fixed' || paySwitch == 'fixedcash') {
		//console.log('here');
		updateAvailBT2(btAvailableURL, payBody, btcount, paySwitch);
	} else if (paySwitch == 'edit') {
		payBody.className = "edit_state";
	}
	 btcounter = btcount;
}

function stripCurrency(strval) {
var result = strval.replace("$", "");
result = result.replace(",", "");
return result;
} 

function updateAvailBT2(btAvailableURL, element, btcount, fixSwitch) {

	var totalBT = "";
	
	fixSwitch = fixSwitch.length >0? fixSwitch.toLowerCase() : "fixed";
	
	if(fixSwitch == "fixed"){
		if (btcounter!='') {
			var amount;
			//var payBody = getParentByTagName(elm, 'tbody');
			var divs = element.getElementsByTagName("div");
			for (var i = 0; i < divs.length; i++){
				if (divs[i].className == "amount_input"){
					inputs = divs[i].getElementsByTagName("input");
					if (inputs) amount = encodeURIComponent(stripCurrency(inputs[0].value));
				
				} 
			}
			//var btelm = document.getElementById('Amount_'+btcounter);
			//alert("inside btelm "+btelm);
			//if (btelm) {
				//var btamount = btelm.value;
				if (totalBT != "") totalBT += "&";
				totalBT += "btvalue"+btcounter+"=";
				totalBT += amount;
			
			//}
		}
		if(btcount.indexOf('check')!=-1)
		{
			var btamount = document.getElementById('checkAmount').value;
			if (totalBT != "") totalBT += "&";
			totalBT += "checkvalue=";
			totalBT += btamount;
		}
		else
		{
			var done = false;
			var x = 0;
			for(var i = 1;i < 5&&!done; i++)
			{
				var elm = document.getElementById('count_'+i);
				if(elm != 'undefined' && elm != null)
				{
					x++;
					if(btcount==x)
					{
					
						var elm = document.getElementById('Amount_'+i);
						var btamount = elm.value;
						if (totalBT != "") totalBT += "&";
						totalBT += "btcount=";
						totalBT += btcount;	
						totalBT += "&btvalue=";
						totalBT += btamount;
						//alert("btamount"+btamount);
						//alert("totalBT"+totalBT);
						done = true;
					}
				}
			}
		}
	}else if(fixSwitch == "fixedcash"){
		var btamount = document.getElementById('amount1').value;
		totalBT = "cashAmount=" + btamount;
	}
	var myReq = new BTAjaxReq();
	totalBT = updateAjaxTokenIndicator(totalBT);
	if(fixSwitch == "fixed"){
		myReq.req(btAvailableURL, totalBT, writeAvailBT2, element);
	}else if(fixSwitch == "fixedcash"){
		myReq.req(btAvailableURL, totalBT, writeAvailCA, element);
	}
	myReq = null;
}

function writeAvailBT2(oXML, xml_elm) {
	var subtotal, total_fees, total_xfer;
		str = oXML.responseText;
		//alert(str);
	if (str.indexOf('<subtotal>') != -1) {
		if (str) {
		
			
			var s = str.split("<subtotal>", 2);
			s = s[1].split("</subtotal>",2);
			var subtotal = s[0];
			
			var s = str.split("<total_fees>", 2);
			s = s[1].split("</total_fees>",2);
			var total_fees = s[0];

			var s = str.split("<total_xfer>", 2);
			s = s[1].split("</total_xfer>",2);
			var total_xfer = s[0];

			var s = str.split("<avail_amt>", 2);
			s = s[1].split("</avail_amt>",2);
			var avail_amt = s[0];
			
			var s = str.split("<idx>", 2);
			s = s[1].split("</idx>",2);
			var idx = s[0];

			var s = str.split("<fee>", 2);
			s = s[1].split("</fee>",2);
			var fee = s[0];

			var sub_elm = document.getElementById('subtotal');
			var fees_elm = document.getElementById('total_fees');
			var xfer_elm2 = document.getElementById('total_xfer2');
			var xfer_elm1 = document.getElementById('total_xfer1');			
			var tot_remain = document.getElementById('total_remain1');
				
			if (sub_elm && subtotal) sub_elm.innerHTML = subtotal;
			if (fees_elm && total_fees) fees_elm.innerHTML = total_fees;
			if (xfer_elm2 && total_xfer) xfer_elm2.innerHTML = total_xfer;
			if (xfer_elm1 && total_xfer) xfer_elm1.innerHTML = total_xfer;
			if (tot_remain) tot_remain.innerHTML = avail_amt;
			updateFee(idx, fee);
						
			if(idx>0) 
			{
				var done = false;
				var x = 0;
				for(var i = 1;i < 5&&!done; i++)
				{
					var elm = document.getElementById('count_'+i);
					if(elm != 'undefined' && elm != null)
					{
						x++;
						if(idx==x)
						{
							var errelm = document.getElementById('error_'+i);
							errelm.innerHTML = '';
						}
					}
				}
			}
			else
			{
				var errelm = document.getElementById('error_check');
				errelm.innerHTML = '';
			}
			
		}
		
		if (xml_elm && xml_elm != "true") confirmBTSave(xml_elm);
	} else 
	{
		if (str.indexOf('<error>') != -1) {	
		
			var s = str.split("<idx>", 2);
			s = s[1].split("</idx>",2);
			var idx = s[0];

			var s = str.split("<msg>", 2);
			s = s[1].split("</msg>",2);
			var error = s[0];
			
			if(idx>0) 
			{
				var done = false;
				var x = 0;
				for(var i = 1;i < 5&&!done; i++)
				{
					var elm = document.getElementById('count_'+i);
					if(elm != 'undefined' && elm != null)
					{
						x++;
						if(idx==x)
						{
							var errelm = document.getElementById('error_'+i);
							errelm.innerHTML = error;
						}
					}
				}
			}
			else
			{
				var errelm = document.getElementById('error_check');
				errelm.innerHTML = error;
			}
		}
	}
}

function writeAvailCA(oXML, xml_elm)
{
	var str = oXML.responseText;
	
	if(str.indexOf("<CASH>") >= 0 )
	{
		var s = str.split("<AMT>", 2);
		s = s[1].split("</AMT>",2);
		var amt = s[0];
		var s = str.split("<FEE>", 2);
		s = s[1].split("</FEE>",2);
		var fees = s[0];
		var s = str.split("<TOT>", 2);
		s = s[1].split("</TOT>",2);
		var tot = s[0];
		var s = str.split("<CALIMIT>", 2);
		s = s[1].split("</CALIMIT>",2);
		var calimit = s[0];
		
		document.getElementById("errMsg").style.display="none";
		document.getElementById("subtotal").innerHTML = amt;
		document.getElementById("total_fees").innerHTML = fees;
		document.getElementById("total_xfer2").innerHTML = tot;
		document.getElementById("caLimit").innerHTML = calimit;			
		document.getElementById("errMsg").innerHTML = ' ';
		
		if (xml_elm && xml_elm != "true") confirmBTSave(xml_elm);
		
	}else{
		if(str.indexOf("<ERROR>") >= 0 )
		{
			var s = str.split("<ERROR>", 2);
			s = s[1].split("</ERROR>",2);
			var errorMessage = s[0];
		var s = str.split("<CALIMIT>", 2);
		s = s[1].split("</CALIMIT>",2);
		var calimit = s[0];
		document.getElementById("errMsg").style.display="";
		document.getElementById("errMsg").innerHTML = errorMessage;
		document.getElementById("subtotal").innerHTML = '$0.0';
		document.getElementById("total_fees").innerHTML = '$0.0';
		document.getElementById("total_xfer2").innerHTML = '$0.0';
		document.getElementById("caLimit").innerHTML = calimit;

		}
	}
} 

function confirmBTSave(elm) {
	if (elm) {
		var btelm = elm.getElementsByTagName('input');
		if (btelm.length > 0) {
			btval = parseFloat(btelm[0].value);
			
			var amt_elm = getElementsByClassName(elm, 'div', 'amount_val');
			if (amt_elm.length > 0) {
				amt_elm = amt_elm[0];
				if (!isNaN(btval)) amt_elm.innerHTML = formatDollar(btval.toString());
				else amt_elm.innerHTML = formatDollar("0");
			}
		}
		elm.className = "norm_state";
	}
}

function formatDollar(val) {
	if (val.indexOf('.') == -1) val += ".00";
	
	var newval = val.substring(val.indexOf('.'), val.length);
	var count = 0;
	
	for (var i=val.indexOf('.')-1; i >= 0; i--) {
		if (count > 0 && count % 3 == 0) {
			newval = "," + newval;
		}
		count++;
		newval = val.charAt(i) + newval;
	}
	
	newval = "$" + newval;
	
	return newval;
}

var onclickArray = new Array();

function onclickObj(elm, fn) {
	this.elm = elm;
	this.onclick = fn;
}

/** CM DS - Defect # 44498 - Begins **/
var initiateBalconLeavingOnce = false;

function initBalconLeaving() {

	if (!initiateBalconLeavingOnce) {
		if (typeof initiateBalconOnce !== "undefined" && initiateBalconOnce === true) {
			initiateBalconLeavingOnce = true;
		}
		/* Fix 14838. TPR P0003512 */
		$("#footer_brand li a").attr('onclick','return true;'); // required to allow the footer links to work	
		$("div.help_links li a.arrow").attr('onclick','return true;'); // required to allow Need Help section links to work	
		/* End Fix */

		var links = document.getElementsByTagName('a');
		for (var i=0; i < links.length; i++) {
			if (links[i].className.indexOf('popup-window') == -1 && links[i].className.indexOf('no-leaving-overlay') == -1 && links[i].className.indexOf('citi_link') == -1) {
				if (!links[i].onclick) {
					links[i].onclick = function(){showLeavingOverlay(this);return false;}
				} else {					
					onclickArray.push(new onclickObj(links[i], links[i].onclick));
					links[i].onclick = function(){showLeavingOverlay(this);return false;}
				}
			}
		}
	}
	
}
/** CM DS - Defect # 44498 - Ends **/

function initInfoChangeOverlay() {
	var links = document.getElementsByTagName('a');

	for (var i=0; i < links.length; i++) {
		if (links[i].className.indexOf('popup-window') == -1 && links[i].className.indexOf('no-leaving-overlay') == -1 && links[i].className.indexOf('citi_link') == -1) {
		/*if (links[i].className.indexOf('info-change-overlay') > -1) {*/
			if (!links[i].onclick) {
				links[i].onclick = function(){showInfoChangeOverlay(this);return false;}
			} else {
				onclickArray.push(new onclickObj(links[i], links[i].onclick));
				links[i].onclick = function(){showInfoChangeOverlay(this);return false;}
			}
		}
	}
	
}
var curr_BT_elm = "";
var curr_del_value = "";
var remove_btAvailableURL;
var remove_btnElm;
var remove_index;
var step2 = false;


function showErrorOverlay() {
	var overlay_elm = document.getElementById('overlay_error_message');
	var cloak_elm = document.getElementById('overlay_cloak');
	var h2elm = document.getElementById('h2_leaving_overlay');
    var main_elm = document.getElementById('main_container');
	var dimMain = getDim(main_elm);
	//leavingElm = elm;

	//dimBtn = getDim(elm);

	if (overlay_elm) overlay_elm.style.visibility = "visible";
	if (cloak_elm) {
		var height = document.body.offsetHeight;
		var width = document.body.offsetWidth;

		cloak_elm.style.height = screen.height+ dimMain.y + "px";
		cloak_elm.style.width = screen.width +dimMain.x+ "px";
		cloak_elm.style.visibility = "visible";


	}
    // elm.style.left = dimMain.x/2 +"px";
    cloak_elm.style.left = -(dimMain.x/2) + "px";
	var curScrollX = (typeof window.pageXOffset != 'undefined') ? window.pageXOffset : document.documentElement.scrollLeft;
	var innerW = (typeof self.innerWidth != 'undefined') ? self.innerWidth : document.documentElement.clientWidth;
	overlay_elm.style.left = ((innerW - overlay_elm.offsetWidth)/4)+curScrollX+"px";

	var curScrollY = (typeof window.pageYOffset != 'undefined') ? window.pageYOffset : document.documentElement.scrollTop;
	var innerH = (typeof self.innerHeight != 'undefined') ? self.innerHeight : document.documentElement.clientHeight;
	overlay_elm.style.top = ((innerH - overlay_elm.offsetHeight)/2)+curScrollY+"px";
/*
	var leavingLink = document.getElementById('confirm_leave');


	var onclickFn = "";

	for (var i=0; i < onclickArray.length; i++) {
		if (onclickArray[i].elm == elm) onclickFn = onclickArray[i].onclick;
	}

	if (leavingLink && onclickFn) {
		leavingLink.href = (elm.href) ? elm.href : "#";
		leavingLink.target = (elm.target) ? elm.target : "";
		leavingLink.onclick = onclickFn;
		Event.addEvent(leavingLink,'click',function(){hideLeavingOverlay();});
	} else if (leavingLink) {
		leavingLink.href = (elm.href) ? elm.href : "#";
		leavingLink.target = (elm.target) ? elm.target : "";
		leavingLink.onclick = function() {
			hideLeavingOverlay();
		}
	}
		*/
     //alert(h2elm);
	//h2elm.focus();
}

function hideErrorOverlay() {
	var elm = document.getElementById('overlay_error_message');
	if (elm) elm.style.visibility = "hidden";
	var cloak_elm = document.getElementById('overlay_cloak');
	if (cloak_elm) cloak_elm.style.visibility = "hidden";
	var addAccElm = document.getElementById('ABARouting');
	if(addAccElm) addAccElm.focus();
}


function showDeleteOverlayTS(btAvailableURL, btnElm, index) {
	var elm = document.getElementById('overlay_delete_confirm');
	var cloak_elm = document.getElementById('overlay_cloak');
	var h2elm = document.getElementById('h2_delete_overlay');
	var main_elm = document.getElementById('main_container');
	var dimMain = getDim(main_elm);
	curr_BT_elm = btnElm;

	var del_elm = document.getElementById('delete_index');
	if (del_elm) del_elm.value = index;
	curr_del_value = index;

	remove_btAvailableURL = btAvailableURL;
	remove_btnElm = btnElm;
	remove_index = index;


	dimBtn = getDim(btnElm);

	if (elm) elm.style.visibility = "visible";
	
	if (cloak_elm) {
	var height = document.body.offsetHeight;
	var width = document.body.offsetWidth;
	// Fix for IE-7
	if (navigator.appVersion.indexOf('7.0') >= 0 )
	{	
		cloak_elm.style.height = 2.4*height+ "px";
	}
	else if ( navigator.appName.indexOf('Netscape') >= 0  )
	{
		cloak_elm.style.height = 2.6*height+ "px";
	}
	else 
	{			
		cloak_elm.style.height = height+ "px";
	}
	
	cloak_elm.style.width = screen.width +dimMain.x+ "px";
	
	cloak_elm.style.visibility = "visible";
	} 
	
	elm.style.left = dimMain.x/2 +"px";
    cloak_elm.style.left = -(dimMain.x/2) + "px";
	var curScrollY = (typeof window.pageYOffset != 'undefined') ? window.pageYOffset : document.documentElement.scrollTop;
	var innerH = (typeof self.innerHeight != 'undefined') ? self.innerHeight : document.documentElement.clientHeight;
	elm.style.top = ((innerH - elm.offsetHeight)/2)+curScrollY+"px";
	
	h2elm.focus();
}


function hideDeleteOverlay() {
	var elm = document.getElementById('overlay_delete_confirm');
	if (elm) elm.style.visibility = "hidden";
	var cloak_elm = document.getElementById('overlay_cloak');
	if (cloak_elm) cloak_elm.style.visibility = "hidden";
}

var removeLock = '';

function showDeleteOverlayTmpTS() 
{
	if(removeLock == '')
	{
		removeLock = 'locked';
		if(step2 == false)
		{
			var totalBT = "remove=" + remove_index;
			var myReq = new BTAjaxReq();
			myReq.req(remove_btAvailableURL, totalBT, writeAvailBT, remove_btnElm);
			myReq = null;
		}
		else
		{
			deleteTransaction();
		}
	}
}

/* SPEED BUMP FUNCTION | CM LOYC5 16-12-10 */

function showSpeedBumpOverlay(btAvailableURL, btnElm, index) {
	var elm = document.getElementById('overlay_speed_bump');
	var cloak_elm = document.getElementById('overlay_cloak');
	var h2elm = document.getElementById('h2_delete_overlay');
	var main_elm = document.getElementById('main_container');
	var dimMain = getDim(main_elm);
	curr_BT_elm = btnElm;

	var del_elm = document.getElementById('delete_index');
	if (del_elm) del_elm.value = index;
	curr_del_value = index;

	remove_btAvailableURL = btAvailableURL;
	remove_btnElm = btnElm;
	remove_index = index;


	dimBtn = getDim(btnElm);

	if (elm) {
		elm.style.visibility = "visible";
		// ADA-compliance functionality
		if (typeof jQuery === "function") {
			jQuery(".inner_module",elm).attr("tabindex","0").focus();
			jQuery(".inner_module :not(a)",elm).attr("tabindex","-1");
			jQuery(".inner_module a",elm).attr("tabindex","0");
			jQuery(".inner_module h2 a",elm).attr("tabindex","-1");
			jQuery(cloak_elm).attr("tabindex","-1");
			
			if (typeof jQuery().trap === "function") {
				jQuery(elm).trap();
			}
			
			jQuery(document).keyup(function(e) {
			  if (e.keyCode == 27) {
					hideSpeedBumpOverlay();
				} // esc key pressed
			});
		} else {
			h2elm.focus();
		}
	}
	
	if (cloak_elm) {
		var height = document.body.offsetHeight;
		var width = document.body.offsetWidth;
		// Fix for IE-7
		if (navigator.appVersion.indexOf('7.0') >= 0 ) {	
			cloak_elm.style.height = 2.4*height+ "px";
		} else if ( navigator.appName.indexOf('Netscape') >= 0  ) {
			cloak_elm.style.height = 2.6*height+ "px";
		} else {			
			cloak_elm.style.height = height+ "px";
		}
	
		cloak_elm.style.width = screen.width +dimMain.x+ "px";
	
		cloak_elm.style.visibility = "visible";
	} 
	
	elm.style.left = dimMain.x/2 +"px";
  cloak_elm.style.left = -(dimMain.x/2) + "px";
	var curScrollY = (typeof window.pageYOffset != 'undefined') ? window.pageYOffset : document.documentElement.scrollTop;
	var innerH = (typeof self.innerHeight != 'undefined') ? self.innerHeight : document.documentElement.clientHeight;
	elm.style.top = ((innerH - elm.offsetHeight)/2)+curScrollY+"px";
}

function showSpeedBumpOverlayACQ() {
	var elm = document.getElementById('overlay_speed_bump');
	var cloak_elm = document.getElementById('overlay_cloak');
	var h2elm = document.getElementById('h2_delete_overlay');
	var main_elm = document.getElementById('container');
	var dimMain = getDim(main_elm);
	
	if (elm) elm.style.visibility = "visible";
	
	if (cloak_elm) {
	  var height = document.body.offsetHeight;
  	var width = document.body.offsetWidth;
  	// Fix for IE-7
  	if (navigator.appVersion.indexOf('7.0') >= 0 )
  	{	
  		cloak_elm.style.height = 2.4*height+ "px";
  	}
  	else if ( navigator.appName.indexOf('Netscape') >= 0  )
  	{
  		cloak_elm.style.height = 2.6*height+ "px";
  	}
  	else 
  	{			
  		cloak_elm.style.height = height+ "px";
  	}
	
  	cloak_elm.style.width = screen.width +dimMain.x+ "px";
	
  	cloak_elm.style.visibility = "visible";
	} 
	
	elm.style.left = "50%";
	elm.style.marginLeft = "-315px";
  
  cloak_elm.style.left = -(dimMain.x/2) + "px";
	var curScrollY = (typeof window.pageYOffset != 'undefined') ? window.pageYOffset : document.documentElement.scrollTop;
	var innerH = (typeof self.innerHeight != 'undefined') ? self.innerHeight : document.documentElement.clientHeight;
	elm.style.top = ((innerH - elm.offsetHeight)/2)+curScrollY+"px";
	
	h2elm.focus();
}


function hideSpeedBumpOverlay() {
	var elm = document.getElementById('overlay_speed_bump');
	if (elm) elm.style.visibility = "hidden";
	var cloak_elm = document.getElementById('overlay_cloak');
	if (cloak_elm) cloak_elm.style.visibility = "hidden";
}

var removeLock = '';

function showSpeedBumpTmp() 
{
	if(removeLock == '')
	{
		removeLock = 'locked';
		if(step2 == false)
		{
			var totalBT = "remove=" + remove_index;
			var myReq = new BTAjaxReq();
			myReq.req(remove_btAvailableURL, totalBT, removeAvailBT, remove_btnElm);
			myReq = null;
		}
		else
		{
			deleteTransaction();
		}
	}
}




function removeAvailBT(oXML, xml_elm) {
	removeLock = '';
	var subtotal, total_fees, total_xfer;
	
		str = oXML.responseText;
	if (str.indexOf('<subtotal>') != -1) {
		if (str) {
		
			
			var s = str.split("<subtotal>", 2);
			s = s[1].split("</subtotal>",2);
			var subtotal = s[0];
			
			var s = str.split("<total_fees>", 2);
			s = s[1].split("</total_fees>",2);
			var total_fees = s[0];

			var s = str.split("<total_xfer>", 2);
			s = s[1].split("</total_xfer>",2);
			var total_xfer = s[0];

			var s = str.split("<avail_amt>", 2);
			s = s[1].split("</avail_amt>",2);
			var avail_amt = s[0];

			var isRemove = false;

			if (str.indexOf("<remove>") != -1) {
				isRemove = true;
				s = str.split("<remove>", 2);
				s = s[1].split("</remove>",2);
				remove = s[0];
			}

			var sub_elm = document.getElementById('subtotal');
			var fees_elm = document.getElementById('total_fees');
			var xfer_elm2 = document.getElementById('total_xfer2');
			var xfer_elm1 = document.getElementById('total_xfer1');	
			var xfer_elm = document.getElementById('total_xfer');			
			var tot_remain = document.getElementById('total_remain1');	
			var amount_remaining = document.getElementById('amount_remaining');
			var remove_elm = (isRemove) ? document.getElementById(remove) : null;
				
			if (sub_elm && subtotal) sub_elm.innerHTML = subtotal;
			if (fees_elm && total_fees) fees_elm.innerHTML = total_fees;
			if (xfer_elm2 && total_xfer) xfer_elm2.innerHTML = total_xfer;
			if (xfer_elm1 && total_xfer) xfer_elm1.innerHTML = total_xfer;
			if (xfer_elm && total_xfer) xfer_elm.innerHTML = total_xfer;
			if (tot_remain) tot_remain.innerHTML = avail_amt;
			if (amount_remaining) amount_remaining.innerHTML = avail_amt;
			
			if (isRemove) {
				removeUpdate(remove);
			}	
			updateOrder();
		}
	} 
	hideDeleteOverlay();
}

function BTAjaxReq(params, callBackFunction) {

	this.createRequestObject = function() {
		var xmlhttp;
		try { 
			xmlhttp = new ActiveXObject('Msxml2.XMLHTTP'); 
		}
		catch (err) { 
			try { 
				xmlhttp = new ActiveXObject('Microsoft.XMLHTTP'); 
			}
			catch (err) { 
				try {
					xmlhttp = new XMLHttpRequest(); 
				}
				catch (err) { 
					xmlhttp = null; 
				}
			}
		}
		return xmlhttp;
	}
	
	this.handleReadyStateChange = function (xmlObj, callBackFunction, params, elm) {
	
		var timeOut;
		
		timeOut = window.setInterval( function() {
			if(xmlObj && xmlObj.readyState == 4){
				window.clearInterval(timeOut);
				callBackFunction(xmlObj, elm);
			}
		},50);
			
	
	}
	
	this.req = function(url, vars, fnDone, elm) {
		var xmlobj = this.createRequestObject();
		var uri = this.noCache(url);
		xmlobj.open('GET', uri+"&"+vars, true);
		this.handleReadyStateChange(xmlobj, fnDone, vars, elm);
		xmlobj.send(null);
	}
	
	this.noCache = function(uri)
	{
		return uri.concat( 
  // concat String prototype,
  // the fastest way to produce
  // a complete string using multiple values

  /\?/.test(uri) ?
  // if uri has a query string

   "&"
  // add last value using & separator char
   :

  // else
   "?",
  // add a query string to this url

  "noCache=",
  // this should be a "cool name" for generated key

  (new Date).getTime(),
  // the noCache value will be milliseconds
  // from 1970/01/01

  ".",
  // plus a dot ...

  Math.random()*1234567
  // ... and a random value using
  // a "big" integer as generator
 );

 // then this is a return example using uri: http://host.com/mypage.html
 // http://host.com/mypage.html?noCache=1166301156233.332083.6663326991

 // while this is an example using uri: http://host.com/mypage.html?v0=1&v2=a
 // http://host.com/mypage.html?v0=1&v2=a&noCache=1166301168420.631416.7190624559
};
	
	
}

function handleError(err, isXML) {
	var errUrl, errMsg, errElmId;

	if (isXML) {
		var errs = err.getElementsByTagName('error');

		var errorsElms = err.getElementsByTagName('errors');

		if (errorsElms.length > 0 && errorsElms[0].getAttribute('url')) {
			errUrl = errorsElms[0].getAttribute('url');
		}
	} else {
		var errs = new Array();
		var errStartTag = '<error>';
		var errEndTag = '</error>';

		var index = err.indexOf(errStartTag);

		while (index != -1) {
			errs[errs.length] = err.substring(index + errStartTag.length, err.indexOf(errEndTag, index));
			index = err.indexOf(errStartTag, index+1);
		}

		var errUrlStartTag = 'url="';
		var errUrlStart = err.indexOf(errUrlStartTag);
		if (errUrlStart != -1) errUrl = err.substring(errUrlStart + errUrlStartTag.length, err.indexOf('"', errUrlStart + errUrlStartTag.length));
	}
	
	if (errUrl) {
		location.href = errUrl;
		return;
	}
	
	for (var i=0; i < errs.length; i++) {
		if (isXML) {
			var errMsgElms = errs[i].getElementsByTagName('message');
			if (errMsgElms.length > 0 && errMsgElms[0].firstChild) {
				errMsg = errMsgElms[0].firstChild.nodeValue;
			}
	
			var errIdElms = errs[i].getElementsByTagName('id');
			if (errIdElms.length > 0 && errIdElms[0].firstChild) {
				errElmId = errIdElms[0].firstChild.nodeValue;
			}
		} else {
			var errMsgStartTag = '<message>';
			var errMsgStart = errs[i].indexOf(errMsgStartTag);
			errMsg = errs[i].substring(errMsgStart + errMsgStartTag.length, errs[i].indexOf('</message>'));
	
			var errIdStartTag = '<id>';
			var errIdStart = errs[i].indexOf(errIdStartTag);
			errElmId = errs[i].substring(errIdStart + errIdStartTag.length, errs[i].indexOf('</id>'));
		}
		
		if (errElmId && errMsg) {
			addServerErrorMessage(errElmId, errMsg);
		} else if (errMsg) { 
			alert(errMsg);
		}
	}	

}

function submitForm(elm) {
	if (typeof(elm) == "string") elm = document.getElementById(elm);
	
	if (elm) {
		elm.submit();
	}
}


function addServerErrorMessage(id, msg) {
	var elm = document.getElementById(id);
	
	if (elm) {
		var msgCell 		= elm.parentNode;
		var msgDiv 			= document.createElement("div");
		msgDiv.className 	= 'err-msg-full';
		msgCell.insertBefore(msgDiv, msgCell.childNodes[0]);
		msg = msg.replace(/&lt;/g, "<");
		msg = msg.replace(/&gt;/g, ">");
		msg = msg.replace(/&amp;/g, "&");		
		msg = msg.replace(/&#039;/g, "'");
		msg = msg.replace(/&#034;/g, "\"");
		msg = msg.replace(/&#243;/g, "�");
		msgDiv.innerHTML 	= msg;

		removeDuplicateServerErrorMessages();
	}
}

function removeServerErrorMessages(elm) {
	if (typeof(elm) == "string") {
		elm = document.getElementById(elm);
	}
	
	if (elm) {
		var allErrors = getElementsByClassName(elm, 'div', 'err-msg-full');
	
		for (var i=0; i<allErrors.length; i++) {
			allErrors[i].parentNode.removeChild(allErrors[i]);
		}
	}
}

function removeDuplicateServerErrorMessages() {
	var allErrors = getElementsByClassName(document, 'div', 'err-msg-full');

	for (var i=1; i<allErrors.length; i++) {
		if (allErrors[i].innerHTML==allErrors[i-1].innerHTML && allErrors[i].parentNode == allErrors[i-1].parentNode) {
			allErrors[i].parentNode.removeChild(allErrors[i-1]);
		}
	}
}

function getDim(el) {
	for (var lx=0,ly=0; el!=null; lx+=el.offsetLeft,ly+=el.offsetTop,el=el.offsetParent);
	return {x:lx,y:ly}
}

function hideLeavingOverlay() {
	var elm = document.getElementById('overlay_leaving_confirm');
	if (elm) elm.style.visibility = "hidden";
	var cloak_elm = document.getElementById('overlay_cloak');
	if (cloak_elm) cloak_elm.style.visibility = "hidden";
}

function getAndUpdateSyncToken(str){
	if(str.indexOf('<token>') != -1){
		var tempToken = str.substring(str.indexOf('<token>')+7, str.indexOf('</token>'));
		if(tempToken != null && tempToken != ''){
			token = tempToken;
			updateSyncToken();
		}
	}
}

function updateSyncToken(){
	//Update the hidden parameter
	var elm = document.getElementsByName('SYNC_TOKEN');
	for(var x= 0; x < elm.length; x++){
		elm[x].value = token;
	}
	//update the urls in the <a> tag
	var links = document.getElementsByTagName('a');
	for(var i = 0, len = links.length; i < len; ++i){
		if(links[i].href != undefined && links[i].href.indexOf('#') == -1 && links[i].href.indexOf('.do' >= 0) && links[i].href.indexOf('SYNC_TOKEN=') >= 0){
			links[i].href = replaceSyncToken(links[i].href, "SYNC_TOKEN=");
		}
	}
}

function replaceSyncToken(url, replace){
	var temp = url;
	if(temp.indexOf("?") >= 0){
		temp = temp.slice(temp.indexOf("?")+1);
		if (temp.indexOf(replace) >= 0) {
			var params = temp.split("&");
			for(var i = 0; i < params.length; i++){
				var param = params[i];
				if (param.indexOf(replace) >= 0) {
					url = url.replace(param, replace+token);
				}
			}
		}
	}
	return url;
} 

var leavingElm = "";

function showLeavingOverlay(elm) {
	var overlay_elm = document.getElementById('overlay_leaving_confirm');
	var cloak_elm = document.getElementById('overlay_cloak');
	var h2elm = document.getElementById('h2_leaving_overlay');
	var main_elm = document.getElementById('main_container');
	var dimMain = getDim(main_elm);
	leavingElm = elm;

	dimBtn = getDim(elm);

	if (overlay_elm) overlay_elm.style.visibility = "visible";
	if (cloak_elm) {
		var height = document.body.offsetHeight;
		var width = document.body.offsetWidth;

		cloak_elm.style.height = screen.height+ dimMain.y + "px";
		cloak_elm.style.width = screen.width +dimMain.x+ "px";
		cloak_elm.style.visibility = "visible";


	}
     elm.style.left = dimMain.x/2 +"px";
    cloak_elm.style.left = -(dimMain.x/2) + "px";
	var curScrollX = (typeof window.pageXOffset != 'undefined') ? window.pageXOffset : document.documentElement.scrollLeft;
	var innerW = (typeof self.innerWidth != 'undefined') ? self.innerWidth : document.documentElement.clientWidth;
	overlay_elm.style.left = ((innerW - overlay_elm.offsetWidth)/4)+curScrollX+"px";

	var curScrollY = (typeof window.pageYOffset != 'undefined') ? window.pageYOffset : document.documentElement.scrollTop;
	var innerH = (typeof self.innerHeight != 'undefined') ? self.innerHeight : document.documentElement.clientHeight;
	overlay_elm.style.top = ((innerH - overlay_elm.offsetHeight)/2)+curScrollY+"px";

	var leavingLink = document.getElementById('confirm_leave');


	var onclickFn = "";

	for (var i=0; i < onclickArray.length; i++) {
		if (onclickArray[i].elm == elm) onclickFn = onclickArray[i].onclick;
	}

	if (leavingLink && onclickFn) {
		leavingLink.href = (elm.href) ? elm.href : "#";
		leavingLink.target = (elm.target) ? elm.target : "";
		leavingLink.onclick = onclickFn;
		Event.addEvent(leavingLink,'click',function(){hideLeavingOverlay();});
	} else if (leavingLink) {
		leavingLink.href = (elm.href) ? elm.href : "#";
		leavingLink.target = (elm.target) ? elm.target : "";
		leavingLink.onclick = function() {
			hideLeavingOverlay();
		}
	}
	
	/** CM DS - Defect 44498 - Begins **/	
	try { 
		h2elm.focus();
	} catch (err) {}
	/** CM DS - Defect 44498 - Ends **/
}

/* CM WW - Ability to Pay Phase 4 - Hide the Info Overlay */
function hideInfoChangeOverlay() {
	var elm = document.getElementById('overlay_info_change');
	if (elm) elm.style.visibility = "hidden";
	var cloak_elm = document.getElementById('overlay_cloak');
	if (cloak_elm) cloak_elm.style.visibility = "hidden";
}

/* CM WW - Ability to Pay Phase 4 - Show the Info Overlay */
function showInfoChangeOverlay(elm) {
	var overlay_elm = document.getElementById('overlay_info_change');
	var cloak_elm = document.getElementById('overlay_cloak');
	var h2elm = document.getElementById('h2_leaving_overlay');
	var main_elm = document.getElementById('main_container');
	var dimMain = getDim(main_elm);
	leavingElm = elm;
	/* CM WW - Replaces the URLs for links having class "continueToURL" with the
			URL of the triggering link */ 
	ReplaceUrlHref("continueToURL",elm.href);
	/* CM WW - */
	document.getElementById('continueToURL').value=elm.href;

	dimBtn = getDim(elm);

	if (overlay_elm) overlay_elm.style.visibility = "visible";
	if (cloak_elm) {
		var height = document.body.offsetHeight;
		var width = document.body.offsetWidth;

		cloak_elm.style.height = screen.height+ dimMain.y + "px";
		cloak_elm.style.width = screen.width +dimMain.x+ "px";
		cloak_elm.style.visibility = "visible";


	}
     elm.style.left = dimMain.x/2 +"px";
     cloak_elm.style.left = -(dimMain.x/2) + "px";
	var curScrollX = (typeof window.pageXOffset != 'undefined') ? window.pageXOffset : document.documentElement.scrollLeft;
	var innerW = (typeof self.innerWidth != 'undefined') ? self.innerWidth : document.documentElement.clientWidth;
	overlay_elm.style.left = ((innerW - overlay_elm.offsetWidth)/4)+curScrollX+"px";

	var curScrollY = (typeof window.pageYOffset != 'undefined') ? window.pageYOffset : document.documentElement.scrollTop;
	var innerH = (typeof self.innerHeight != 'undefined') ? self.innerHeight : document.documentElement.clientHeight;
	overlay_elm.style.top = ((innerH - overlay_elm.offsetHeight)/2)+curScrollY+"px";

	var leavingLink = document.getElementById('confirm_leave');


	var onclickFn = "";

	for (var i=0; i < onclickArray.length; i++) {
		if (onclickArray[i].elm == elm) onclickFn = onclickArray[i].onclick;
	}

	if (leavingLink && onclickFn) {
		leavingLink.href = (elm.href) ? elm.href : "#";
		leavingLink.target = (elm.target) ? elm.target : "";
		leavingLink.onclick = onclickFn;
		Event.addEvent(leavingLink,'click',function(){hideInfoChangeOverlay();});
	} else if (leavingLink) {
		leavingLink.href = (elm.href) ? elm.href : "#";
		leavingLink.target = (elm.target) ? elm.target : "";
		leavingLink.onclick = function() {
			hideInfoChangeOverlay();
		}
	}
}

/* CM WW - Ability to Pay Phase 4 - Replaces URLs for anchors that has the parameter given class */
function ReplaceUrlHref(urlClass,newHref) {
var elems = document.getElementsByTagName('a');
	for (i=0;i<elems.length;i++){
	    if(elems[i].className.match(new RegExp('(\\s|^)'+urlClass+'(\\s|$)'))){
		elems[i].href = newHref;
	    }
	}
}

var BT = {
  offerPadding: 36, // Height of the tooltip (17) + height of the compare offer box (19)
  onReady: function() {
    if($('#offers-list').length && !$('#offers.vertical').length){
      if($('#offers-list').children('li.offer').length <= 2) {
        // 1 or 2 offers - the layout is vertical
        $('#offers').addClass('vertical');
      } else if ($('#offers-list').children('li.offer').length <= 3) {
        // 3 offers - the layout is horizontal
        $('#offers').addClass('horizontal');
        $('#offers-list li:first').addClass('active');
        BT.offerDetailsInit();
        BT.adjustHeights();
        BT.offersHover();
        BT.checkboxesEvtHandler();
        BT.compareBtnEvtHandler();
      } else {
        // more than 3 offers - carousel is included in the horizontal layout
        $('#offers').addClass('horizontal');    
        $('#offers-list li:first').addClass('active');
        BT.carouselInit();
        BT.offersHover();
        BT.checkboxesEvtHandler();
        BT.compareBtnEvtHandler();
      }
      $('#offers').css('visibility','visible');   //Hidden by default
    } 
    if($('#offer-compare-grid').length > 0) {
      // Compare grid
      BT.compareAdjustHeights();
      BT.compareOffersHover();
    }
  },
  adjustHeights: function(carousel, state) {
    var maxHeight, fixIndex, offerHeight;
    maxHeight = 0;
    fixIndex = 0;
    
    $('li.offer').each(function(index) {
      var offerSummary, offerSummaryHeight;
      offerSummary = $(this).children('div.offer-summary'); 
      offerSummaryHeight = offerSummary.height();
      
      if (maxHeight < offerSummaryHeight) {
        maxHeight = offerSummaryHeight;
        fixIndex = index;
        offerHeight = offerSummaryHeight + BT.offerPadding;
      } else {
        offerSummary.height(maxHeight);
        offerHeight = maxHeight + BT.offerPadding;
      }
      $(this).height(offerHeight);

    });
    
    $('li.offer').each(function(index) {
      // Reset the height of offers that still don't have the max height
      if (index >= fixIndex) {
        return false;
      }
      offerHeight = maxHeight + BT.offerPadding;
      $(this).children('div.offer-summary').height(maxHeight);
      $(this).height(offerHeight);
    });
    $('.jcarousel-skin-bt').css('visibility','visible');  // If there's no carousel, this will be ignored
    
  },
  checkboxesEvtHandler: function() {
    $(":checkbox").click(BT.offerCompareBoxTrigger);
  },
  compareBtnEvtHandler: function() {
    $('#offer-compare :image').click(function(event) {
      event.preventDefault();
      if(BT.validateForm()) {
        $('form').submit();  
      }
    });
  },
  compareOffersHover: function() {
    $('div.offer-summary').hover(
      function () {
        $(this).addClass('summary-active');
      },
      function() {
        $(this).removeClass('summary-active');
      });
  },
  compareAdjustHeights: function() {
    var maxHeight, fixIndex, offerHeight;
    maxHeight = 0;
    fixIndex = 0;
    
    $('th div.offer-summary').each(function(index) {
      var offerSummaryHeight;
      offerSummaryHeight = $(this).height();
      
      if (maxHeight < offerSummaryHeight) {
        maxHeight = offerSummaryHeight;
        fixIndex = index;
      } else {
        $(this).height(maxHeight);
      }
    });
    
    $('th div.offer-summary').each(function(index) {
      // Reset the height of offers that still don't have the max height
      if (index >= fixIndex) {
        return false;
      }
      $(this).height(maxHeight);
    });
  },
  carouselInit: function() {
    // If there are more than 4 offers, give the container the jcarousel class
    $('#offers-list').addClass('jcarousel-skin-bt');
    BT.offerDetailsInit();

    $('#offers-list').jcarousel({
      scroll: 1,
      visible: 3,
      animation: 500,
      initCallback : BT.adjustHeights,
      itemVisibleInCallback: {onBeforeAnimation:BT.carouselClearActive, onAfterAnimation:BT.carouselSetActive},
      itemFallbackDimension: 196
    });
  },
  carouselClearActive: function(carousel, li, idx, action) {
    if(action == 'prev' || action == 'next') {
      $('#static-details').children().remove();
      $('li.offer').removeClass("active");
    }
  },
  carouselSetActive: function(carousel, li, idx, action){
    var newActive = carousel.get(idx);
    var offerDetailsContent = newActive.children('div.offer-details').clone(); 
    
    // Re-focus whenever scroll arrows are clicked 
    if(action == 'prev' || action == 'next') {
      newActive.addClass('active');
      // Copy the content of the new active offer (new item in the visible range)
      $('#static-details').append(offerDetailsContent);
    }
  },
  offersHover: function() {
    $('div.offer-summary').mouseenter(
      function () {
        var offerDetailsContent = $(this).parent('li').children('div.offer-details').clone();
        $('li.offer').removeClass("active");
        $('#static-details').children().remove();
        $('#static-details').append(offerDetailsContent);
        $(this).parent('li').addClass("active");
      });
  },
  offerCompareBoxTrigger: function(){
    var n = $("#offers-list input:checked").length;
    if (n >= 2){
      $('#offer-compare').removeClass('error');
    }
		if (n == 3){
      $("#offers-list input:not(:checked)").attr("disabled","disabled");
    }else{
			$("#offers-list input").removeAttr("disabled");
		}
  },
  offerDetailsInit: function() {
    $('#offers-list li div.offer-details').addClass('invisible');
    $('<div class="tooltip-top"></div>').insertBefore('div.offer-details'); // DIVs needed for the top of the tooltip
    $('#offers form').after('<div id="static-details"></div>');             // DIV that will be used to output all the offer details
		$('#static-details').after('<div id="static-details-btm"></div>'); 
    $('#offers-list li.active div.offer-details').contents().clone().appendTo('#static-details');  // Initialize #static-details content
  },
  validateForm: function() {
    var n = $("#offers-list input:checked").length;
    if (n < 2 || n > 3){
      $('#offer-compare').addClass('error');
      return false;
    }
    return true;
  }
};
jQuery(document).ready(BT.onReady);

	//NRI DROP DOWN IMAGE SWAP
jQuery(window).load(function () {	
  jQuery("select#cardType").change(function() {
		//This assumes that images are named this way: path/name-<dropdown's value>.extension
		var src = jQuery("#selectedCard").attr("src");
		var selection = jQuery("select#cardType option:selected").val();
		var _length = src.length;
		
		var pos = src.lastIndexOf("-") + 1;
		var pos2 = src.lastIndexOf(".");
		
		var prefix = src.substr(0,pos);
		var suffix = src.substr(pos2,_length);
		
		var newSrc = prefix + selection + suffix;
		$("#selectedCard").attr("src", newSrc);  

		});
});