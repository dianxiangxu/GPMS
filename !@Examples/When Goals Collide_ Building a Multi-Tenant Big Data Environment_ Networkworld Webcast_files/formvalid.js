function checkEmail() {
	if($("input.emailAddress").length>0) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test($("input.emailAddress").val())) {
			return true;
		} else {
			document.getElementById('divError').innerHTML = "<div class='divErrorArrow'></div><div class='divErrorBoxEmail'>Please enter a valid email address.</div><div class='divErrorArrowDown'></div>";
			document.forms[0].elements[0].focus();
			$('#reg_fields').addClass('message_area');
			$('#divError').addClass('errorTop');
			return false;
		}
	} else  
		return true; 
}


function validatePhone() {
	// input mask
	jQuery(function($){
	   $(".phone").mask("(999) 999-9999",{placeholder:" "});
	   $(".mobile").mask("(999) 999-9999",{placeholder:" "});
	});
}

function validateZip() {
	jQuery(function($){
		$(".postalCode").mask("99999?-9999",{placeholder:" "});
	});
}

function validatePostal() {
	jQuery(function($){
		$(".postalCode").mask("a9a 9a9",{placeholder:" "});
	});
}

function noValidPhoneZip() {
	$(".phone").unmask();
	$(".mobile").unmask();
	$(".postalCode").unmask();
}

function setDisplayByClass(name, isDisplay) {
	var className = $("." + name);
	if(isDisplay) {
		$(className).css({ 'display': 'block'});
	}
	else {
		$(className).css({ 'display': 'none'})
	}
}


// determine state value to set country option: state = USA, province = Canada, neither = any other country
$(document).ready(function() {
	var nonUsStates = ["","Non-U.S.","AB","BC","MB","NB","NF","NS","ON","PE","PQ","SK","YT"];
	var ohCanada = ["AB","BC","MB","NB","NF","NS","ON","PE","PQ","SK","YT"];
	
		
	$("#segment\\[\\'state\\'\\]").change(function () {
		
		if ( $.inArray($("#segment\\[\\'state\\'\\]").val(), nonUsStates) == -1 ) {
			// US state selected - set country to USA
			setDisplayByClass('canadaPolicy', false);
			$("#segment\\[\\'country\\'\\]").val("United States of America");
			validatePhone();
			validateZip();
		} else if ( $.inArray($("#segment\\[\\'state\\'\\]").val(), ohCanada) != -1 ) {
			// Canadian province selected
			setDisplayByClass('canadaPolicy', true);
			$("#segment\\[\\'country\\'\\]").val("Canada");
			validatePhone();
			validatePostal();
		} else {
			// Neither US nor Canada: Please select one
			setDisplayByClass('canadaPolicy', false);
			$("#segment\\[\\'country\\'\\]").val("-- Please select one --");
			noValidPhoneZip();
		}
		
	});


	var country = "";
	$("#segment\\[\\'country\\'\\]").change(function () {
		
		country = $("#segment\\[\\'country\\'\\]").val();
		
		if ( country == "United States of America" ) {
			setDisplayByClass('canadaPolicy', false);
			validatePhone();
			validateZip();
			
			// if no US state was selected, default to -- Please select one -- for error message
			if ( $.inArray($("#segment\\[\\'state\\'\\]").val(), nonUsStates) != -1 ) {
				$("#segment\\[\\'state\\'\\]").val("-- Please select one --");
			}
			
		} else if ( country == "Canada" ) {
			
			setDisplayByClass('canadaPolicy', true);
			validatePhone();
			validatePostal();
			
			//if no Canadian province was selected, default to -- Please select one -- for error message
			if ( $.inArray($("#segment\\[\\'state\\'\\]").val(), ohCanada) != 1 ) {
				$("#segment\\[\\'state\\'\\]").val("-- Please select one --");
			}
			
		} else {
			setDisplayByClass('canadaPolicy', false);
			if ( country != "United States of America" || country != "Canada" || country != "" ) {
				$("#segment\\[\\'state\\'\\]").val("Non-U.S.");
			}
			if ( country == "" ) {
				$("#segment\\[\\'state\\'\\]").val("-- Please select one --");
			}
			noValidPhoneZip();
		}
		
	});
	
	
	if ((window.location.pathname.indexOf("form/submit") != -1) && country == "United States of America") {
		validatePhone();
		validateZip();
	}
	if ((window.location.pathname.indexOf("form/submit") != -1) && country == "Canada") {
		validatePhone();
		validatePostal();
	}
	
});