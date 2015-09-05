$(function () {
  	
  var $form = $("#onlineFormsModel"),    
    $saveForm = $("#onlineFormsModelSave"),
    $saveButton = $(".save-appln"),
    $replaceSave = $("#replaceSave");
  
  $saveButton.on("click", function (e) {
	  if( $("#onlineFormsModelSave").validate().form() ) {		  
		  transferFormFields();
		  var changetype = "/oaa/saveAndRetrieve/saveApplication";	
		  $form.attr('action', changetype);	
		  $("#savePrimaryReplacementFinal").val("")
		  fnSetAjaxSave($form);
		  return false;
      }
  });  
  
  $replaceSave.on("click", function (e) {	  		  
		  //transferFormFields();
	  	  e.preventDefault();
		  var changetype = "/oaa/saveAndRetrieve/saveApplication";	
		  $form.attr('action', changetype);	
		  $("#savePrimaryReplacementFinal").val("true");
		  fnSetAjaxSave($form);
		  return false;      
  });
  
  $("#actual_form_action_url").val($form.attr('action'));
  
  function transferFormFields(){
     
	  $("#savePrimaryFirstNameFinal").val($("#savePrimaryFirstName").val());
	  $("#savePrimaryLastNameFinal").val($("#savePrimaryLastName").val());
	  $("#savePrimaryDOBFinal").val($("#savePrimaryDOB").val());
	  $("#savePrimarySSNumsFinal").val($("#savePrimarySSNums").val());
	  $("#savePrimaryEmailFinal").val($("#savePrimaryEmail").val());
	  $("#savePrimaryUserIdFinal").val($("#savePrimaryUserId").val());
	  //$("#savePrimaryReplacementFinal").val($("#isReplacement").val());
	  
  }
// starts Form validation
	  $saveForm.validate({
	    ignore: "",
	    rules: {	          
	      "oaaSaveApplicationModelSave.emailAddress": {
	         required: true,
	         email: true
	      },
	      "oaaSaveApplicationModelSave.identificationNumber": {
	    	  required: true,
	    	  minlength: 4,
	          maxlength: 4
	      },
	      "oaaSaveApplicationModelSave.firstName" : {
	    	  required: true
	      },
	      "oaaSaveApplicationModelSave.lastName" : {
	    	  required: true
	      },
	      "oaaSaveApplicationModelSave.dateOfBirth" : {
	    	  required: true,	    	  
	          trioDate : true
	      }
	      /*daytimePhone : {
	        required: true,
	        phoneUS: true
	      }*/ 
	    },
	    messages: {	      
	      "oaaSaveApplicationModelSave.emailAddress" : "Please Enter Your Valid Email Address",
	      "oaaSaveApplicationModelSave.identificationNumber" : "Please Enter Your SSN",
	      "oaaSaveApplicationModelSave.firstName" : "Please Enter Your First Name" ,
	      "oaaSaveApplicationModelSave.lastName" : "Please Enter Your Last Name",
	      "oaaSaveApplicationModelSave.dateOfBirth" : "Please Enter Your DOB"
	      /*daytimePhone : "Please Enter Your Daytime Phone" */
	    },
	    errorElement: "p",
	    focusInvalid: false,
	    errorPlacement: function (error, element) { 
	      if (element.prop('name') === "accounttype") {
	        $(element).closest('.section').find('.application-title').after(error);
	      }
	      
	      else {
	        $(element).after(error);
	      }
	    },
	    highlight: function (element, errorClass, validClass) {
	      $(element).addClass('error');

	    },
	    unhighlight: function (element, errorClass, validClass) {
	      $(element).removeClass("error");
	    },
	    invalidHandler: function (form, validator) {
	      var firstError = validator.errorList[0].element,
	       offset = $(firstError).offset();
	       offset = offset.top; 
	      window.scrollTo(0, offset);
	    }
	  }); 
	  // end Form validation
	  
	  
	  
	  var pgflow = "",
	    $errors = $("#saveErrorBox");
		

	function fnSetAjaxSave($form,pgparams){
	      var sFormAction = $form.attr("action"), 
	          sUpdatedFormAction = "", setpgparams = "";
	      
	      // to remove extra paramters before posting including jsessionid and/or ADV, etc.
	      if ((sFormAction.indexOf("?")!=-1) || (sFormAction.indexOf(";")!=-1)){
	        sUpdatedFormAction = ( sFormAction.substr(0,sFormAction.indexOf("?")) ||  sFormAction.substr(0,sFormAction.indexOf(";")) )
	      } else {
	        sUpdatedFormAction = sFormAction;
	      }
	      
	      if (pgparams) {    
	        setpgparams = ".json" + pgparams;   // needed for sub calls
	      } else {   
	        setpgparams = ".json";    
	      }
	      
	      var newSerializeData = cryptSSN($form.serialize());

	      $.ajax({
	        type: "POST",
	        url: sUpdatedFormAction + setpgparams,
	        cache: false,
	        dataType: "json",
	        data: newSerializeData
	        }).done(function(sData){
	        	fnAjaxSuccessSave(sData);
	          }).fail(function(textStatus){
	            $errors.html('<div id="error-img" class="information-icon"></div><ul id="error-list"><li>While retrieving data an error has occurred, please try again.</li></ul>');
	        });
	}; // End fnSetAjax()
		
		
	function fnAjaxSuccessSave(sData,sStatusMsg) {
		
		var validationError,savemessage,sendEmailFlag;
			
		
		if(!sData.data || sData.data == null  || sData.data == undefined || sData.data=="") {			 	
			$errors.html('<div id="error-img" class="information-icon"></div><ul id="error-list"><li>While retrieving data an error has occurred, please try again.</li></ul>');
			$("#saveErrorBox").show();
			return false;
			
		}else{			
						
			if(sData.data.validationError){ // if it is not available
				validationError = sData.data.validationError;
			}else if(validationError == "false"){  // if it has value as false
				validationError = false;
			}else{
				validationError = false;
		    }
		
			if(sData.data.ERRORCODE){
				savemessage = sData.data.ERRORCODE;
			}else{
				savemessage = false;
		    }
		}
		
		
		
		if (validationError) {			
	        $errors.html('<div id="error-img" class="information-icon"></div><ul id="error-list"></ul>');
	        $.each(sData.data.validationError, function(row){
	          fieldValidated(row,this.toString());
	          if(this.toString()!=""){
	            $("#error-list").append('<li>'+ this.toString() +'</li>');
	          }
	        });
	        $("#saveSuccessMsg").hide();
	        $("#saveReplaceMsg").hide();
	        $("#saveTitle").show();
	        $("#saveErrorBox").show();
	        
		}else if(savemessage == "ERROR"){						
			$("#saveErrorMsg").show();
			$("#saveSuccessMsg").hide();			
			$("#saveReplaceMsg").hide();
			$("#saveTitle").show();
	    }else if(savemessage == "DIFF_APP_EXISTS"){			
			$("#saveInputs").hide();
			$("#saveViews").hide();
			$("#saveSuccessMsg").hide();
			$("#saveReplaceMsg").show();
			$("#saveTitle").show();
			$("#saveErrorMsg").hide();
		}else if(savemessage == "SUCCESS"){
			if(sData.data.onlineFormsModel.oaaSaveApplicationModel.appId && sData.data.onlineFormsModel.oaaSaveApplicationModel.emailAddress){
				$("#savePrimaryappIdFinal").val(sData.data.onlineFormsModel.oaaSaveApplicationModel.appId);
				$("#savePrimarySendEmailFinal").val(sData.data.onlineFormsModel.oaaSaveApplicationModel.emailAddress);
				var formIframe = '#onlineFormsModelSendEmail';
				if(sData.data.onlineFormsModel.oaaSaveApplicationModel.sendEmailFlag == "true") {
					$(formIframe).submit(); // To send mail via third party vendor Responsys 
				}
			}						
			$("#saveInputs").hide();
			$("#saveViews").hide();
			$("#saveSuccessMsg").show();
			$("#saveReplaceMsg").hide();
			$("#saveTitle").hide();
			$("#saveErrorMsg").hide();
			$('.fancybox-close').bind('click', function() {
				if(pageBailer != null) {
					runContinue();
				}
				GoToETURL('/home','etradeHost',''); 
			});
	    }
	} // closing fnAjaxSuccess(sData,sStatusMsg)
	
	
	$('.fancybox-close').live('click', function() {

        if(!($("#savePrimaryFirstName").attr('readonly') == 'readonly')) { 
          $("#savePrimaryFirstName").val('').removeClass("error").next("p").empty();
          $("#savePrimaryFirstNameFinal").val('');
        }
       
        if(!($("#savePrimaryDOB").attr('readonly') == 'readonly'))  { 
            $("#savePrimaryDOB").val('').removeClass("error").next("p").empty();
            $("#savePrimaryDOBFinal").val('');
          }
           
        if(!($("#savePrimarySSNums").attr('readonly') == 'readonly')) { 
              $("#savePrimarySSNums").val('').removeClass("error").next("p").empty();
              $("#savePrimarySSNumsFinal").val('');
            }
          
        if(!($("#savePrimaryEmail").attr('readonly') == 'readonly')) { 
              $("#savePrimaryEmail").val('').removeClass("error").next("p").empty();
              $("#savePrimaryEmailFinal").val('');
            }
 
        if(!($("#savePrimaryLastName").attr('readonly') == 'readonly')) { 
              $("#savePrimaryLastName").val('').removeClass("error").next("p").empty();
              $("#savePrimaryLastNameFinal").val('');
            }
        $('#saveErrorMsg').hide();

    });


});


