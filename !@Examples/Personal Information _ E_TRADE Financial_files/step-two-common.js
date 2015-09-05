/*NOTE: this code if for Demo only - not "ready for primetime"*/
var primaryEmployed = false;

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

jQuery.validator.addMethod("phoneUS", function (phone_number, element) {	
	var trim_phone_number = $.trim(phone_number);
	if(trim_phone_number != phone_number)  $(element).val(trim_phone_number);
	if (phone_number.length === 0) {
		return true;
	}else if(phone_number.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)){ 
		return true;
	}
	else if (phone_number.match(/^[0-9\-\. \(\)]+$/)) {
          phone_number = phone_number.replace(/\s|\-|\.|\(|\)/g,"");
          if (phone_number.length === 10) {
        	  phone_number = phone_number.splice(3, 0, "-");
	          phone_number = phone_number.splice(7, 0, "-");
            $(element).val(phone_number);
            return true;
          }
          else { return false; }
      }
      else { return false; }
}, "Please specify a valid phone number");  

jQuery.validator.addMethod("ssNum", function(num, element) {	
	var trim_num = $.trim(num);
	if(trim_num != num)  $(element).val(trim_num);
	 if(num.match(/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/)){ 
		return true;
	 }else if (num.match(/^[0-9\-]+$/)) {
          num = num.replace(/\s|\-/g,""); 
          
          if (num.length === 9 ) {
            num = num.splice(3, 0, "-");
            num = num.splice(6, 0, "-");
            $(element).val(num);
            return true;
          } 
          else { return false; }
      }
      else { return false; }
}, "Please enter a valid social security number.");

jQuery.validator.addMethod("taxId", function(num, element) {
	var trim_num = $.trim(num);
	if(trim_num != num)  $(element).val(trim_num); 
	 if(num.match(/^[0-9]{2}-[0-9]{7}$/)){ 
		return true;
	 }else if (num.match(/^[0-9\-]+$/)) {
        num = num.replace(/\s|\-/g,""); 
        if (num.length === 9 ) {
          num = num.splice(2, 0, "-");          
          $(element).val(num);
          return true;
        } 
        else { return false; }
    }
    else { return false; }
}, "Please enter a valid Tax Id number.");
 
$.validator.addMethod("trioDate", function(value, element) {	
	var trim_value = $.trim(value);
	if(trim_value != value)  $(element).val(trim_value);
	if(value.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)){ 
		return true;
	}else if (value.match(/^(0[1-9]|1[012])[/|-](0[1-9]|[12][0-9]|3[01])[/|-](19[0-9]{2}|2[0-9]{3})$/)) {
     value = value.replace(/\-/g,"/");  
     $(element).val(value);
     return true;
   }
   else if (value.match(/^[0-9\.\s\-\$]+$/)) { 
     value = value.replace(/\.\s\-\//g,"");   
     if (value.length !== 8 ) { return false; }
     else { 
       if (value.match(/^(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(19[0-9]{2}|2[0-9]{3})$/)) {
         value = value.splice(2, 0, "/");
         value = value.splice(5, 0, "/");
         $(element).val(value);
         return true;
       }
       else {
         return false;
       } 
     }
   }
     
   else { return false; }
}, "Please enter a date in the format mm/dd/yyyy");


$.validator.addMethod("money", function (value, element) {
  //return value.match(/^\$?\d+(\.(\d{2}))?$/);
  return value.match(/^[0-9\.\,\$]+$/);
}, "");

$.validator.addMethod("liquidNetWorthMax", function(value, element) {	
	var totNetWorthVal = $('#totalNet').val();    
    var mapVal = '';
    
    if(value==1 || value==2) {
    	mapVal=1;
    } else if(value==3) {
    	mapVal=2;
    } else if(value==4) {
    	mapVal=3;
    } else if(value==5 || value==6) {
    	mapVal=4;
    } else if(value==7) {
    	mapVal=5;
    } else if(value==8) {
    	mapVal=6;
    }
    
    if((mapVal != '' && mapVal <= totNetWorthVal) || (totNetWorthVal=='' && mapVal!='')) {
    	return true;
    }
    
	return false;
}, function(params, element) {
	if($(element).val() > 0) {
		return 'Liquid Net Worth cannot exceed Total Net Worth.';
	} else {
		return 'Please Enter Your Liquid Net Worth.';
	}	
});

String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
    var _token;
    var str = this + "";
    var i = -1;

    if ( typeof token === "string" ) {

        if ( ignoreCase ) {

            _token = token.toLowerCase();

            while( (
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
            ) {
                str = str.substring( 0, i ) +
                    newToken +
                    str.substring( i + token.length );
            }

        } else {
            return this.split( token ).join( newToken );
        }

    }
return str;
};
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
$(function () {
	
	
	  
	    //$('#mobileDeviceList').addClass('hide');
	    
	    var statements_checkbox = ['#brokerEmployed','#brokerEmployed-joint','#policymaker','#policymaker-joint','#shareholder','#shareholder-joint','#employee','#employee-joint','#relative','#relative-joint','#mobileAppPush','#primaryMailSent','#secondaryMailSent'];
	    var statements_subsection = ['#broker-employed-warning','#broker-employed-warning-joint','#policymaker-list','#policymaker-list-joint','#shareholder-list','#shareholder-list-joint','#employee-list','#employee-list-joint','#relative-list','#relative-list-joint','#mobileDeviceList','#PrimaryMailingAddress','#SecondaryMailingAddress'];
	    var statements_checkbox_join = statements_checkbox.join();
	    
		$(statements_checkbox_join).on("change", function (e) {			
		    	
		    	stmt_id  = $(this).attr("id");
				statement_id= "#"+stmt_id;		    
			    statement_index = statements_checkbox.indexOf(statement_id);
			    statement_subsection_join= statements_subsection[statement_index];
			    
		    	var option = $(this).attr('checked');
			    if (option == "checked") {		    	
			    	$(statement_subsection_join).removeClass('hide');
			    	$(statement_subsection_join).removeClass('show');
			    	$(statement_subsection_join).addClass('show');	
			    }
			    else {	      
			    	$(statement_subsection_join).removeClass('show');
			    	$(statement_subsection_join).removeClass('hide');
			    	$(statement_subsection_join).addClass('hide');
			    }	
			    
		});
	    
		var mobileAppCheck= $("#mobileAppPush").is(':checked');		
		if(mobileAppCheck) {
			var homePhoneBVal = $('#homePhoneB').val();
			var busPhoneVal = $('#busPhone').val();
			
			if(busPhoneVal != '' || homePhoneBVal != '') {
				if(busPhoneVal != '') {
					$('#busPhone').closest('.fldinput').show();
				} else if(homePhoneBVal != '') {
					$('#homePhoneA').closest('.fldinput').show();
					$('#homePhoneB').closest('.fldinput').show();				
				}
				$('#mobilefldinput').insertAfter('#mobileDeviceList');
				$('#mobilefldinput').show();
				if(busPhoneVal == '') {
					$('#PrimaryPhoneDropdwn').val('Home');
				} else {
					$('#PrimaryPhoneDropdwn').val('Business');
				}
			} else {
				$('#mobilefldinput').insertAfter('#pr_mobilephonedata');
				$('#mobilefldinput').show();
				$('#homePhoneA').closest('.fldinput').hide();
				$('#homePhoneB').closest('.fldinput').hide();
				$('#PrimaryPhoneDropdwn').val('Mobile');
			}
		}
		
		$('#PrimaryPhoneDropdwn').change(function() {
		  var selVal = $(this).val();
		  var currPhoneType = $(this).data('currPhoneType');		  
		  
		  var oldEnteredVal = '';
		  if(currPhoneType == undefined) {
			  oldEnteredVal = $('#homePhoneB').val();
			  $('#homePhoneB').val('');
		  } else {
			  oldEnteredVal = $('#' + currPhoneType).val();			  
			  $('#' + currPhoneType).val('');
		  }
		  
		  $('#homePhoneA').closest('.fldinput').hide();
		  $('#homePhoneB').closest('.fldinput').hide();
		  $('#busPhone').closest('.fldinput').hide();
		  $('#mobilePhone').closest('.fldinput').hide();
		  
		  if(selVal == 'Home') {
			  if( $('#primaryCountry').val() != 840 ) {
				  $('#homePhoneA').closest('.fldinput').show();
			  }				  
			  $('#homePhoneB').closest('.fldinput').show();
			  $('#homePhoneB').val(oldEnteredVal);
			  $(this).data('currPhoneType', 'homePhoneB');
		  } else if(selVal == 'Business') {
			  $('#busPhone').closest('.fldinput').show();
			  $('#busPhone').val(oldEnteredVal);
			  $(this).data('currPhoneType', 'busPhone');
		  } else if(selVal == 'Mobile') {
			  $('#mobilePhone').closest('.fldinput').show();
			  $('#mobilePhone').val(oldEnteredVal);
			  $(this).data('currPhoneType', 'mobilePhone');
		  }
		  
		  var mobileAppCheck= $("#mobileAppPush").is(':checked');
		  if(mobileAppCheck) {
			  if(selVal == 'Mobile') {
				  $('#mobilefldinput').insertAfter('#pr_mobilephonedata');
			  } else {
				  $('#mobilefldinput').insertAfter('#mobileDeviceList');
				  $('#mobilefldinput').show();
			  }
		  }
		  
	  });
	  
	  $('#SecondaryPhoneDropdwn').change(function() {
		  var selVal = $(this).val();
		  var currPhoneType = $(this).data('currPhoneType');		  
		  
		  var oldEnteredVal = '';
		  if(currPhoneType == undefined) {
			  oldEnteredVal = $('#secondaryDaytimePhoneB').val();
			  $('#secondaryDaytimePhoneB').val('');
		  } else {
			  oldEnteredVal = $('#' + currPhoneType).val();			  
			  $('#' + currPhoneType).val('');
		  }
		  
		  $('#secondaryDaytimePhone').closest('.fldinput').hide();
		  $('#secondaryDaytimePhoneB').closest('.fldinput').hide();
		  $('#secondaryBusPhone').closest('.fldinput').hide();
		  $('#secondaryMobilePhone').closest('.fldinput').hide();
		  
		  if(selVal == 'Home') {
			  if( $('#secondaryCountry').val() != 840 ) {
				  $('#secondaryDaytimePhone').closest('.fldinput').show();
			  }				  
			  $('#secondaryDaytimePhoneB').closest('.fldinput').show();
			  $('#secondaryDaytimePhoneB').val(oldEnteredVal);
			  $(this).data('currPhoneType', 'secondaryDaytimePhoneB');
		  } else if(selVal == 'Business') {
			  $('#secondaryBusPhone').closest('.fldinput').show();
			  $('#secondaryBusPhone').val(oldEnteredVal);
			  $(this).data('currPhoneType', 'secondaryBusPhone');
		  } else if(selVal == 'Mobile') {
			  $('#secondaryMobilePhone').closest('.fldinput').show();
			  $('#secondaryMobilePhone').val(oldEnteredVal);
			  $(this).data('currPhoneType', 'secondaryMobilePhone');
		  }
	  });
	  
	  $('#mobileAppPush').change(function() {
			   var mobileAppCheck= $("#mobileAppPush").is(':checked');
			   if(mobileAppCheck) {
				   $("#mobilePhone").attr('placeholder','Mobile Phone');   
				   $("label[for='mobilePhone']").html('Mobile Phone');	
				   
				   var mobileNumber = $("#mobilePhone").val();
				   mobileNumber = $.trim(mobileNumber);
				   if(mobileNumber == '') {
					   $('#mobilefldinput').insertAfter('#mobileDeviceList');
					   $('#mobilefldinput').show();
				   }
			   }else{
				   var PrimaryPhoneDropdwnVal = $('#PrimaryPhoneDropdwn').val();
				   $("#mobilePhone").attr('placeholder','Phone number');   
				   $("label[for='mobilePhone']").html('Phone number');
				   if(PrimaryPhoneDropdwnVal != 'Mobile') {
					   $('#mobilefldinput').hide();
				   }
			   }

	  });
	  
	  $('#primaryDOB,#secondaryDOB').on('keyup', function(e) {	  
		  if(e.keyCode == 8 || e.keyCode == 46) {
			  return;
		  }
		  var currVal = $(this).val();
		  if(currVal.length == 2 || currVal.length == 5) {
			  $(this).val(currVal + '/');
		  }
	  });
		
	  $("#amlQuestions3_yes1").on("click", function (e) {
		  $('#auth-copy').removeClass('hide');
		  $('#auth-copy').addClass('show');
		  var group = $(this).closest('.radio-group');	 
	      group.find('label').removeClass('selected');
		  group.find('input').removeAttr('checked');
	      $(this).closest('label').addClass('selected');
		  $(this).closest('input').attr('checked', 'checked');
	  });
			  
	  $("#amlQuestions3_no1").on("click", function (e) {
		  $('#auth-copy').removeClass('show');
		  $('#auth-copy').addClass('hide');
		  var group = $(this).closest('.radio-group');	 
	      group.find('label').removeClass('selected');
		  group.find('input').removeAttr('checked');
	      $(this).closest('label').addClass('selected');
		  $(this).closest('input').attr('checked', 'checked');
	  });	  
	  
	  $("#remove-joint").on("click", function (e) {
	    e.preventDefault();
	    if ($('.check-group label').hasClass('checked')) {
	      //$('.check-group label').removeClass('checked');
	      //$('#joint-account-area').addClass('hide');
	    }
	  });
	
	$('.emp-dd').bind('change', function() {
	    var option = $(this).find('option:selected').val(),
	      occupationDropDownGroup = $(this).closest('fieldset').find('.employment-container');
	    if (option === "Employed") {
	       
	      occupationDropDownGroup.removeClass('hide');
	    }
	    else {
	      occupationDropDownGroup.addClass('hide');
	    }
	  });

	  $('.occupation-select').bind('change', function() {
	    var option = $(this).find('option:selected').val(),
	    occupationOtherDropDownGroup = $(this).closest('fieldset').find('.occupation-other-container');
	    if (option === "OT") { 
	      occupationOtherDropDownGroup.removeClass('hide');
	    }
	    else {
	      occupationOtherDropDownGroup.addClass('hide');
	    }
	  });

	  $('.line-business-select').bind('change', function() {
	    var option = $(this).find('option:selected').val(),
	    occupationOtherDropDownGroup = $(this).closest('fieldset').find('.line-business-container');
	    if (option === "OT") { 
	      occupationOtherDropDownGroup.removeClass('hide');
	    }
	    else {
	      occupationOtherDropDownGroup.addClass('hide');
	    }
	  });

	  $('#purpose').bind('change', function() {
	    var option = $(this).find('option:selected').val(),
	    otherPurposeDropDownGroup = $(this).closest('fieldset').find('.other-purpose');
	    if (option == "5") { 
	      otherPurposeDropDownGroup.removeClass('hide');
	    }
	    else {
	      otherPurposeDropDownGroup.addClass('hide');
	    }
	  });

	  $('#taxID').bind('change', function() {
	    var option = $(this).attr('checked'),	    
	    otherPurposeDropDownGroup = $(this).closest('fieldset').find('#primarySSNum');
	    if (option == "checked") {	    	
	    	otherPurposeDropDownGroup.attr('placeholder','Tax ID Number*');
	    	otherPurposeDropDownGroup.attr('data-original-title','Tax ID number formatted as xx-xxxxxxx');
	    	$('#taxID-selection').html('Tax ID Number*');
	    	$('#taxidtype').val('T');
	    }
	    else {	      
	      otherPurposeDropDownGroup.attr('placeholder','Social Security Number*');
	      otherPurposeDropDownGroup.attr('data-original-title','Social Security Number formatted as XXX-XX-XXXX');
	      $('#taxID-selection').html('Social Security Number*');
	      $('#taxidtype').val('S');
	    }
	  }); 
	  
	  $('#sectaxID').bind('change', function() {
		    var option = $(this).attr('checked'),	    
		    otherPurposeDropDownGroup = $(this).closest('fieldset').find('#secondarySSNum');
		    if (option == "checked") {
		    	otherPurposeDropDownGroup.attr('placeholder','Tax ID Number*');
		    	otherPurposeDropDownGroup.attr('data-original-title','Tax ID number formatted as xx-xxxxxxx');
		    	$('#sec_taxID-selection').html('Tax ID Number*');
		    	$('#sec_taxidtype').val('T');
		    }
		    else {	      
		      otherPurposeDropDownGroup.attr('placeholder','Social Security Number*');
		      otherPurposeDropDownGroup.attr('data-original-title','Social Security Number formatted as XXX-XX-XXXX');
		      $('#sec_taxID-selection').html('Social Security Number*');
		      $('#sec_taxidtype').val('S');
		    }
		  }); 
	  
	  $('#primaryIrs').bind('change', function() {
		    var option = $(this).attr('checked');
		    if (option == "checked") {		    	
		    	$('#primaryIrsText').removeClass('hide');
		    	$('#primaryIrsText').removeClass('show');
		    	$('#primaryIrsText').addClass('show');	
		    }
		    else {	      
		    	$('#primaryIrsText').removeClass('show');
		    	$('#primaryIrsText').removeClass('hide');
		    	$('#primaryIrsText').addClass('hide');
		    }
		  }); 
	  
	  $('#secondaryIrs').bind('change', function() {
		    var option = $(this).attr('checked');
		    if (option == "checked") {		    	
		    	$('#secondaryIrsText').removeClass('hide');
		    	$('#secondaryIrsText').removeClass('show');
		    	$('#secondaryIrsText').addClass('show');	
		    }
		    else {	      
		    	$('#secondaryIrsText').removeClass('show');
		    	$('#secondaryIrsText').removeClass('hide');
		    	$('#secondaryIrsText').addClass('hide');
		    }
		  });
	  
	   
	  
	  $('.gen-phone').bind('blur', function() {
	     var phone_number = $(this).val();
	       if (phone_number.match(/^[0-9\-\. \(\)]+$/)) {
	        phone_number = phone_number.replace(/\s|\-|\.|\(|\)/g,"");
	        if (phone_number.length === 10) {
	          phone_number = phone_number.splice(3, 0, "-");
	          phone_number = phone_number.splice(7, 0, "-");
	          //phone_number = phone_number.splice(9, 0, "-");
	          $(this).val(phone_number);
	        }
	      }
	  });
	
	//START : if user selects occupation as unemployed or student or some other, have to hide remaining items
	   $('#primaryOccupation').change(function() {				
			var p_code = $(this).val();
			disableEmpStatus(0, p_code);
			
	   });

	   $('#secondaryOccupation').change(function() {
			var s_code = $(this).val();							
			disableEmpStatus(1, s_code);					

	   });
	   
	   function disableEmpStatus(ind, emp_code) {	
		   
		    var firstBox, secondBox, fldind, occupationDiv;
		    
		    if(ind == 1){ 
		    	firstBox = ".box2";
			    secondBox = ".box4";
			    fldind="2";
			    occupationDiv = "#secondaryOccupation";	
			    hideEmp=".hideSecEmp"
			}else {
				firstBox = ".box1";
			    secondBox = ".box3";
			    fldind="1";
			    occupationDiv = "#primaryOccupation";
			    hideEmp=".hidePrEmp"
			}	    
			
			if(emp_code == 'HM' || emp_code == 'RD' || emp_code == 'ST' || emp_code == 'NE') {
				
				   $(hideEmp).removeClass('show').addClass('hide');
				   var occupationVal = $(occupationDiv).val();
				   //$(firstBox).css({"opacity" : "0.7"}).fadeIn("slow");
				   $(firstBox).find("input[type=text],input[type=number]").each(function(ind, elem){ //To disable input boxes in firstbox					   
					
					   $(elem).val("");
					   $(elem).trigger('blur');
					   $(elem).attr('disabled', true);
				   	   $(elem).removeClass('error');
				   	   $(elem).next("p").hide();
				   	   
				   		
				   });
				   $(firstBox).find("select").each(function(ind, elem){	 //To disable select boxes in firstbox
					   $(elem).attr('disabled', true);
					   $(elem).val("");
					   $(elem).removeClass('error');					    
				   	   $(elem).closest("p").hide();
				   	   perrror_id = $(elem).attr('id');
				   	   $("p[for='"+perrror_id+"']").closest("p").hide();
				   		
				   });
				   		
				   /*
				   $(secondBox).css({"opacity" : "0.7"}).fadeIn("slow");
				   $(secondBox).find("input[type=checkbox]").each(function(ind, elem){ //To disable input check boxes in secondbox
					    $(elem).attr('disabled', 'disabled');
				   		$(elem).removeClass('active');
				   		$(elem).removeAttr('checked');			   		
				   		$(elem).closest("label").removeClass('checked');
				   		//$(elem).trigger('change');
				   });			   
				   
				   $(secondBox+' .stmt-list').removeClass('show').addClass('hide'); //To hide <p> tags and text areas in secondbox			   
				   */
				   if($('#futureAccountFlag').val()=="true"){
					   //for futures account purpose
				   }
				   
				   $(occupationDiv).removeAttr('disabled'); //To enable occupation drop-down because we already disabled all select boxes in above coding
				   $(occupationDiv).val(occupationVal); //To restore the selected value occupation drop-down because we already disabled all select boxes in above coding
				    
				     
				}
				else{  
					   $(hideEmp).removeClass('hide').removeClass('show');
					   $(firstBox+' input').removeAttr('disabled');
					   $(firstBox+' select').removeAttr('disabled');
					   /*
					   
					   $(secondBox+' input').removeAttr('disabled');
					   $(secondBox).css({"opacity" : ""});					   
					   $(secondBox+' p').removeClass('show').removeClass('hide'); //To show <p> tags in secondbox
					   $(secondBox+' textarea').removeClass('show').removeClass('hide'); //To show <p> tags in secondbox
					   
					   */
					 				   
				}
			
				if(emp_code == 'OT' ) {
				   $('.occupation'+fldind).show();
				} else {
				   $('.occupation'+fldind).hide();
				}
								
				if(emp_code == 'CN' || emp_code == 'SE') {
					    $('.lineOfBusiness'+fldind).show();
				}else {
					    $('.lineOfBusiness'+fldind).hide();
				}		
		}
	   
		//END : If user selects occupation as unemployed or student or some other, have to hide remaining items
		
		//START - To disbale state dropdown other than united states
		var countries = ['#primaryCountry','#primaryMailingCountry','#primaryEmployerCountry','#secondaryCountry','#secondaryMailingCountry','#secondaryEmployerCountry'];
	    var states = ['#primaryState','#primaryMailingState','#primaryEmployerState','#secondaryState','#secondaryMailingState','#secondaryEmployerState'];
	    var contacts = ['#pr_phonea','','','#sec_phonea','',''];
	    var countries_join = countries.join();
	    $(countries_join).change(function(){            
	             
		      country_id = "#"+$(this).attr("id");              
		      country_index = countries.indexOf(country_id);              
		      states_join = states[country_index];
		      contacts_join = contacts[country_index]; 
		      states_span = states_join+"SelectBoxIt";
		                              
		      if($(this).val() != '840') {		    	  
		    	 $(states_join).val("");
		         $(states_join).attr("disabled","disabled");		         
		       	 if(contacts_join!= '') { $(contacts_join).show(); }
		       }else{
		       	 $(states_join).removeAttr("disabled");
		       	 //$(states_join).val("");		       	 		       	 
		       	 if(contacts_join!= '') { $(contacts_join).hide(); }
		      }
		 });

	  //END - To disbale state dropdown other than united states
	    
	   $(".textBox").on('change', function() {
		   	$(this).removeClass("error");
       });
    
	   $('.mobileValidate').on('blur', function() {
		   if($('#primaryCountry').val() == 840) { 
			  if($("#busPhone").val() !="" || $("#mobilePhone").val() !="" || $("#homePhoneB").val() !="") {
			   	mobileValidate();
		   	  } 	
	      }  
	  });
	  
	  if($("#accountHolderModel\\.acctType").val() == 'JOINT')
		{
		  $('.mobileValidateSec').on('blur', function() {
			   if($('#secondaryCountry').val() == 840) { 
				   if($("#secondaryBusPhone").val() !="" || $("#secondaryMobilePhone").val() !="" || $("#secondaryDaytimePhoneB").val() !="") {
					   mobileValidatesec();
				   }
			   }
		  });
		}
	  
	  
	$('#primaryCountry').on('change', function() {
		
		countryPhoneChange('#primaryCountry','#pr_phonea','#pr_busphone','#pr_mobilephone','#mobileAppPushWrap','#mobileDeviceList');
		
	    var option = $(this).find('option:selected').val();
	    
	    if (option != "840") {
	    	
	     $("#pr_busphone,#pr_mobilephone").hide(); 
	     $("#busPhone,#mobilePhone,#homePhoneB,#daytimePhone").val("").next("p").empty();
	     $("#busPhone,#mobilePhone,#homePhoneB,#daytimePhone").trigger('blur');
	     $("#busPhone,#mobilePhone,#homePhoneB,#daytimePhone").removeClass("error");
	     $("p.error[for='daytimePhone']").remove();
	     $("p.error[for='homePhoneB']").remove();
	     $("#mobileAppPushWrap").hide();
	     $("p.mobileValidateWarning").hide();
	     $(".mobileValidate").removeClass("errorPhone");
	     $("p.mobileValidateWarning").removeClass("errorPhoneWarning");
	     $(".mobileValidate").attr("maxlength",18);
	     $('#PrimaryPhoneDropdwn').hide();
	     
	    }      
	    else {
	     $("#continue-button").show(); 
	     $("#pr_busphone").show();
	     $("#pr_mobilephone").show();
	     $("#busPhone,#mobilePhone,#homePhoneB,#daytimePhone").val("").next("p").empty();
	     $("#busPhone,#mobilePhone,#homePhoneB,#daytimePhone").trigger('blur');
	     $("#busPhone,#mobilePhone,#homePhoneB,#daytimePhone").removeClass("error");
	     $("p.error[for='daytimePhone']").remove();
	     $("p.error[for='homePhoneB']").remove();
	     $("#mobileAppPushWrap").show();
	     $("p.mobileValidateWarning").removeClass("errorPhoneWarning").show();
	     $(".mobileValidate").attr("maxlength",12);
	     $('#PrimaryPhoneDropdwn').show();
	    }
	  });
	$('#secondaryCountry').on('change', function() {
		
		countryPhoneChange('#secondaryCountry','#sec_phonea','#sec_busphone','#sec_mobilephone','#secmobileAppPushWrap','#secmobileDeviceList');
		
		var option = $(this).find('option:selected').val();
	    
	    if (option != "840") {
	    	
	     $("#secondaryBusPhone,#secondaryMobilePhone").hide(); 
	     $("#secondaryBusPhone,#secondaryMobilePhone,#secondaryDaytimePhoneB,#secondaryDaytimePhone").val("").next("p").empty();
	     $("#secondaryBusPhone,#secondaryMobilePhone,#secondaryDaytimePhoneB,#secondaryDaytimePhone").trigger('blur');
	     $("#secondaryBusPhone,#secondaryMobilePhone,#secondaryDaytimePhoneB,#secondaryDaytimePhone").removeClass("error");
	     $("p.error[for='secondaryDaytimePhone']").remove();	     
	     $("p.error[for='secondaryDaytimePhoneB']").remove();
	     $("p.mobileValidateWarningSec").hide();
	     $(".mobileValidateSec").removeClass("errorPhone");
	     $("p.mobileValidateWarningSec").removeClass("errorPhoneWarning");
	     $(".mobileValidateSec").attr("maxlength",18);
	     $('#SecondaryPhoneDropdwn').hide();
	    }      
	    else {
	     $("#continue-button").show(); 
	     $("#secondaryBusPhone,#secondaryMobilePhone").show();
	     $("#secondaryBusPhone,#secondaryMobilePhone,#secondaryDaytimePhoneB,#secondaryDaytimePhone").val("").next("p").empty();
	     $("#secondaryBusPhone,#secondaryMobilePhone,#secondaryDaytimePhoneB,#secondaryDaytimePhone").trigger('blur');
	     $("#secondaryBusPhone,#secondaryMobilePhone,#secondaryDaytimePhoneB,#secondaryDaytimePhone").removeClass("error");
	     $("p.error[for='secondaryDaytimePhone']").remove();
	     $("p.error[for='secondaryDaytimePhoneB']").remove();
	     $("p.mobileValidateWarningSec").removeClass("errorPhoneWarning").show();
	     $(".mobileValidateSec").attr("maxlength",12);
	     $('#SecondaryPhoneDropdwn').show();
	    }
	  });
	
});



function mobileValidate() {
	  
	  var mobileValidateError = 0;		
	  if($('#primaryCountry').val() == 840) {
		  $(".mobileValidate").each(function(ind, elem){ //To valiate mobile phones		   
			   mobileValidateValue =  $(elem).val();			   
			   if(mobileValidateValue == "") {			   
				   mobileValidateError++;
			   }  	   		   		
		   });
		  
		 var mobileAppCheck= $("#mobileAppPush").is(':checked');
		 
		  $(".mobileValidate").each(function(ind, elem){ 
			   if(mobileValidateError==3 && !mobileAppCheck) {
				  $(elem).addClass("errorPhone");
				  $(".mobileValidateWarning").addClass("errorPhoneWarning");
			   }else{
					  $(elem).removeClass("errorPhone");
					  $(".mobileValidateWarning").removeClass("errorPhoneWarning");
			   }
		  });  
	  }
	  if(mobileValidateError==3) {
		  return false;
	  }else{
		  return true;
	  }
}
  	  
function mobileValidatesec() {
	  
	  var mobileValidateError = 0;		  
	  if($('#secondaryCountry').val() == 840) { 
		  $(".mobileValidateSec").each(function(ind, elem){ //To valiate mobile phones		
			  
			   mobileValidateValue =  $(elem).val();			   
			   if(mobileValidateValue == "") {		   	   
				   mobileValidateError++;
			   }  	   		   		
		   });
		  $(".mobileValidateSec").each(function(ind, elem){ 
			   if(mobileValidateError==3 ) {
				  $(elem).addClass("errorPhone");
				  $(".mobileValidateWarningSec").addClass("errorPhoneWarning");
			   }else{
					  $(elem).removeClass("errorPhone");
					  $(".mobileValidateWarningSec").removeClass("errorPhoneWarning");
			   }
		  });  
	  }
	  if(mobileValidateError==3) {
		  return false;
	  }else{
		  return true;
	  }
}

function countryPhoneChange(countryType, phoneA,busPhone,mobilePhone,mobileWrap,mobileDevice) {
	   
	   if($(countryType).val() == 840) { 
		   
		   $(phoneA).removeClass('show');		   
		   $(phoneA).addClass('hide');
		   
		   $(busPhone).removeClass('hide');
		   $(busPhone).addClass('show');
		   
		   $(mobilePhone).removeClass('hide');		   
		   $(mobilePhone).addClass('show');
		   
		   $(mobileWrap).removeClass('hide');		   
		   $(mobileWrap).addClass('show');
		   
		   $(mobileDevice).removeClass('hide');		   
		   $(mobileDevice).addClass('hide');
		   
	   }else{
		   
		   $(phoneA).removeClass('hide');		   
		   $(phoneA).addClass('show');
		   
		   $(busPhone).removeClass('show');
		   $(busPhone).addClass('hide');
		   
		   $(mobilePhone).removeClass('show');		   
		   $(mobilePhone).addClass('hide');
		   
		   $(mobileWrap).removeClass('show');		   
		   $(mobileWrap).addClass('hide');
		   
		   $(mobileDevice).removeClass('show');		   
		   $(mobileDevice).addClass('hide');
	   }
	   
	   if( mobileWrap =="#mobileAppPushWrap") {
		   $("#mobileAppPush").removeAttr('checked');		   	   
		   $("label[for='mobileAppPush']").removeClass("checked");
		   $("#mobileDevice").val('');
	   }
	   
}

function agentUrl(url){
	var hostname = location.host;
	var redhost = "";
	if(hostname.indexOf("sit") > -1) {
		redhost = "sitgenie.etrade.com";
	}
	else if (hostname.indexOf("uat") > -1) {
		redhost = "uatgenie.etrade.com";
	}
	else {
		redhost = "genie.corp.etradegrp.com";
	}
	if(pageBailer != null) {
		runContinue(); //To stop chat popwindow while unloading page
	}
	document.location.href = "https://" +redhost+url;
}
