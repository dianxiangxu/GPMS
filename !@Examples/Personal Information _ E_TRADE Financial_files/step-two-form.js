$(function () {
  
  var need_validation = 1;	
  var $form = $("#onlineFormsModel"),
    $checkBoxGroups = $('.check-group'),
    $radioGroups = $('.radio-group'),
    $continueButton = $("#continue-button"),
    $selectButtonPrimary = $(".select-btn-primary"),
    $selectButtonSecondary = $(".select-btn-secondary"),
    $resetContactInfo = $("#reset-primary,#reset-secondary"),
    $backButton = $("#back-button"),
    $removeButton = $("#remove-joint"),  
	$saveForm = $("#onlineFormsModel"),
    $saveButton = $("#save-appln");
  var alreadyScrolled = false;
  var alreadyScrolled_offset = 1000000000;
 
  $continueButton.on("click", function (e) {
	  need_validation = 1;
	  e.preventDefault();	  
	  $form.submit();
    });
  
  $backButton.on("click", function (e) {
      fnSetBackAjax($form);     
  });
  
  if( /iPad/i.test(navigator.userAgent) ) {
	  $('input[id$="Zip"]').each(function() {
		  var zipElem = $(this).get(0);
		  zipElem.setAttribute('type', 'text');
		  zipElem.setAttribute('pattern', '[0-9]*');
	  });
  }
  
  $('#totalNet').on('blur', function() {
	 $('#liquidNet').trigger('blur'); 
  });
  
  if(/step2(.*)-brokerage-joint/i.test(pageName)) { 
	  $('#primaryState,#primaryMaritalStatus').on('change', function() {
		  var primaryStateVal = $('#primaryState').val();
		  var primaryMaritalStatusVal = $('#primaryMaritalStatus').val();
		  var invalidStates = ['AZ', 'CA', 'ID', 'LA', 'NM', 'NV', 'PR', 'TX', 'WA', 'WI'];		  
		  var isStateValid = $.inArray(primaryStateVal, invalidStates);
		  
		  if(isStateValid == -1 || primaryMaritalStatusVal != '2') {
			  $('#jointCommunityWrapper').hide();
			  $('#jointCommunity').removeAttr('checked');
		  } else {
			  $('#jointCommunityWrapper').show();
		  }
	  });
	  $('#primaryState').trigger('change');
  }
  
  $resetContactInfo.on("click", function (e) {
	 
	  need_validation = 0; // To remove the client-side validation while submitting 
	  e.preventDefault();
	  var contactId = $(this).attr('id');	 
	  var changetype = $("#actual_form_action_url").val();
	  changetype = trimPostUrl(changetype);	  
	  changetype = changetype + "/prefillPersonalInfo";	
	  $form.attr('action', changetype);	  
	  $("#accountHolderModel\\.primaryUniqueId").val('');
	  $("#accountHolderModel\\.secondaryUniqueId").val('');
	  if(contactId =="reset-primary") {
		  $("#accountHolderModel\\.clearPrefill").val('primary');
		  scrollPage = "move-primary";
	  }else{
		  $("#accountHolderModel\\.clearPrefill").val('secondary'); 
                  scrollPage = "move-secondary"; 
	  }
	  fnSetAjax($form);
	 
	    
    });
  

  
  $removeButton.on("click", function (e) {
	  need_validation = 0; // To remove the client-side validation while submitting 
	  e.preventDefault();
	  var changetype = $("#actual_form_action_url").val();
	  changetype = trimPostUrl(changetype);
	  changetype = changetype + "/changeProductType";
	  $form.attr('action', changetype);	  
	  $("#accountHolderModel\\.acctType").val('INDIVIDUAL');	  
	  fnSetAjax($form);  
    });
  
  $selectButtonPrimary.on("click", function (e) {
	  need_validation = 0; // To remove the client-side validation while submitting 
	  e.preventDefault();
	  var changetype = $("#actual_form_action_url").val();	  
	  changetype = trimPostUrl(changetype);	  
	  changetype = changetype + "/prefillPersonalInfo";	  
	  $form.attr('action', changetype);	  
	  var primaryId = $(this).attr('id');	
	  primaryId = primaryId.split("-");
	  primaryIdValue = primaryId[1];
	  $("#accountHolderModel\\.primaryUniqueId").val(primaryIdValue);
	  $("#accountHolderModel\\.secondaryUniqueId").val('');
	  scrollPage = "move-primary";
	  fnSetAjax($form);  
    });
  
  $selectButtonSecondary.on("click", function (e) {
	  need_validation = 0; // To remove the client-side validation while submitting 
	  e.preventDefault();
	  var changetype = $("#actual_form_action_url").val();	  
	  changetype = trimPostUrl(changetype);	  
	  changetype = changetype + "/prefillPersonalInfo";
	  $form.attr('action', changetype);	  
	  var secondaryId = $(this).attr('id');
	  secondaryId = secondaryId.split("-");
	  secondaryIdValue = secondaryId[1];
	  $("#accountHolderModel\\.secondaryUniqueId").val(secondaryIdValue);
	  $("#accountHolderModel\\.primaryUniqueId").val('');
          scrollPage = "move-secondary";
	  fnSetAjax($form);  
    });
  
  $("#actual_form_action_url").val($form.attr('action'));
  
  
  
  $form.submit(function() {

	  if(need_validation = 1 ) {
		  var mobileValidates = mobileValidate();	 
		  
		  alreadyScrolled_offset = 1000000000; //Dont remove it. Its used to find the whether already page scrolled or not.
		  
		  $(".prefill-msg").remove(); // To remove the prefill messages when click the continue button
		  
		  if($("#accountHolderModel\\.acctType").val() == 'JOINT') 	{
			  
			  var mobileValidate_sec = mobileValidatesec();
			  if( $form.validate().form() && mobileValidates && mobileValidate_sec) 
			  {
				  var changetype = $("#actual_form_action_url").val();
				  $form.attr('action', changetype);	
				  mobile_push_submit();
				  fnSetAjax($form);    	  
		    	  return false;
		      }else{
		    	  
		    	  if(!mobileValidates){
		    		  if($(".mobileValidateWarning").is(':visible')) {
			    		  var  offset = $(".mobileValidateWarning").offset();            
			    	      offset = offset.top - 150;
			    	      $(window).scrollTop(offset);
			    	      alreadyScrolled= true;
			    	      alreadyScrolled_offset = offset;
		    		  }
		    	  }else if(!mobileValidate_sec){
		    		  var  offset = $(".mobileValidateWarningSec").offset();            
		    	      offset = offset.top - 150;
		    	      $(window).scrollTop(offset);
		    	      alreadyScrolled= true;
		    	      alreadyScrolled_offset = offset;
		    		  
		    	  }
		    	  return false;
		      }
		  	}
		  else{
			   if( $form.validate().form() && mobileValidates) {
				  var changetype = $("#actual_form_action_url").val();
				  $form.attr('action', changetype);	
				  mobile_push_submit();
				  fnSetAjax($form);    	  
		    	  return false;
		       } else{
		    	   	if(!mobileValidates){
		    	   		if($(".mobileValidateWarning").is(':visible')) {
			    		  var  offset = $(".mobileValidateWarning").offset();			    		  
			    	      offset = offset.top - 150;
			    	      $(window).scrollTop(offset);
			    	      alreadyScrolled= true;
			    	      alreadyScrolled_offset = offset;
		    	   		}
			    	}
			    	return false;
			    }
		  
		  }
	  }else {
		  fnSetAjax($form);    	  
    	  return false;		  
	  }

    });
    
  var isPrefillValidation = $("#isPrefillValidation").val();
  if(isPrefillValidation == "yes") {
	 // $("#onlineFormsModel").validate().form();
  }
  
//  $('.styled .wrap label').inFieldLabels();
  if(!jQuery.support.leadingWhitespace){ // call only for ie 6 to 8
	    $('.styled .wrap label').inFieldLabels();
  }

  
  //$('select').selectBoxIt(); 
  $('select').bind({ 
    'close': function() {
      $(this).trigger('blur');
     }
  });
  //$(".overlay-link").colorbox({inline:true, width:"50%"});
  
  $(".overlay-link").fancybox({
	    openEffect  : 'none',
	    closeEffect : 'none',
	    maxWidth: '900px'

	});

  if(!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
	  $("[rel=popover]").popover().click();
	  $(".focus-tip").tooltip();
  } else {
	  $("[rel=popover]").hide();
  }

	  /* Prevent Linking of Tooltips */
	  $(".icon-question").click(function(e) {
	    e.preventDefault();
	  });

	  $(".remove-joint-account a").click(function() {
	      //$('#joint-account-area').remove();
	  });

	  $(".copy-address a").click(function(e) {
			e.preventDefault();
		    
		    var targetElem = ['secondaryAddress', 'secondaryAddress2', 'secondaryCity', 'secondaryState', 'secondaryZip', 'secondaryCountry'];
		    var srcElem = ['primaryAddress', 'primaryAddress2', 'primaryCity', 'primaryState', 'primaryZip', 'primaryCountry'];
		    
		    for(var index=0; index < 6; index++) {
		    	var pval = $('#' + srcElem[index]).val();
		    	$('#' + targetElem[index]).val('' + pval);
		    	if(index == 5) {
		    		$('#' + targetElem[index]).trigger('change');
		    	} else {	    		
		    		$('#' + targetElem[index]).trigger('blur');
		    	}
		    }
	  });
	  

	  for (var i = 0; i < $checkBoxGroups.length; i++) {
	    $($checkBoxGroups[i]).find('input').bind('click', function () {
	      var $label = $(this).closest('label');
	      if ($(this).attr('checked') === 'checked') {
	        $label.addClass('checked');
	      }
	      else {
	        $label.removeClass('checked');
	      }
	    });
	  }

	  for (var i = 0; i < $radioGroups.length; i++) {   
	    $($radioGroups[i]).find('input').bind('change', function() {
	      var group = $(this).closest('.radio-group');
	      group.find('label').removeClass('selected');
	      $(this).closest('label').addClass('selected');
	    });
	  }

  //$("#primarySsn1, #primarySsn2, #primarySsn3").autotab_magic().autotab_filter("numeric");
  //$("#jointSsn1, #jointSsn2, #jointSsn3").autotab_magic().autotab_filter("numeric");
	  
	var primaryCountryIdCheck = "#primaryCountry";  
	var PrimaryMailingAddressIdCheck = "#PrimaryMailingAddress";
	var primaryMailingCountryIdCheck = "#primaryMailingCountry";
	var taxIDIdCheck = "#taxID";
	var primaryMaritalStatusIdCheck = "#primaryMaritalStatus";
	var primaryEmployerCountryIdCheck = "#primaryEmployerCountry";
	var primaryEmployerCheck = "#primaryOccupation";
	
	var secondaryCountryIdCheck = "#secondaryCountry";  
	var SecondaryMailingAddressIdCheck = "#SecondaryMailingAddress";
	var SecondaryMailingCountryIdCheck = "#secondaryMailingCountry";
	var sectaxIDCheck = "#sectaxID";	
	var secondaryEmployerCountryIdCheck = "#secondaryEmployerCountry";
	var secondaryEmployerCheck = "#secondaryOccupation";
	
  if($("#isCustodialAcc").val() == 'yes' ) {  //if its custodial
		
		var primaryCountryIdCheck = "#secondaryCountry";  
		var PrimaryMailingAddressIdCheck = "#SecondaryMailingAddress";
		var primaryMailingCountryIdCheck = "#secondaryEmployerCountry";
		var taxIDIdCheck = "#sectaxID";			
		var primaryEmployerCountryIdCheck = "#secondaryEmployerCountry";
		var primaryEmployerCheck = "#secondaryOccupation";
		
		
		var secondaryCountryIdCheck = "#primaryCountry";  
		var SecondaryMailingAddressIdCheck = "#PrimaryMailingAddress";
		var SecondaryMailingCountryIdCheck = "#primaryMailingCountry";
		var sectaxIDCheck = "#taxID";		
		var secondaryEmployerCountryIdCheck = "#primaryEmployerCountry";
		var secondaryEmployerCheck = "#primaryOccupation";
	  
  }

  $form.validate({
    ignore: "",
    rules: {   
	  "accountHolderContactInfoModel.contactInfoDetails[0].firstName": {
		required: true
		},
		"accountHolderContactInfoModel.contactInfoDetails[0].lastName" : {
			required: true
		},
		"accountHolderContactInfoModel.email1" : {
			required: true,
			email: true
		},
      "accountHolderContactInfoModel.contactInfoDetails[0].physicalAddress.firstAddressLine": {
        required: true
      },
      "accountHolderContactInfoModel.contactInfoDetails[0].physicalAddress.city": {
        required: true
      },
      "accountHolderContactInfoModel.contactInfoDetails[0].physicalAddress.state": {
        required: {
        	depends: function (el) {
        		if($(primaryCountryIdCheck).val() == "840") { return true; }
        		else { return false; }
        	}
        }
      },
      "accountHolderContactInfoModel.contactInfoDetails[0].physicalAddress.zip": {
        required: true,
        number: {
        	depends: function (el) {
        		if($(primaryCountryIdCheck).val() == "840") { return true; }
        		else { return false; }
        	}
        }
      },
      "accountHolderContactInfoModel.contactInfoDetails[0].physicalAddress.country": {
        required: true
      },
      "accountHolderContactInfoModel.contactInfoDetails[0].mailingAddress.firstAddressLine": {
        required: {
            depends: function (el) {
                return $(PrimaryMailingAddressIdCheck).is(':visible');
              }
            }
      },
      "accountHolderContactInfoModel.contactInfoDetails[0].mailingAddress.city": {
        required: {
            depends: function (el) {
                return $(PrimaryMailingAddressIdCheck).is(':visible');
              }
            }
      },
      "accountHolderContactInfoModel.contactInfoDetails[0].mailingAddress.state": {
        required: {
            depends: function (el) {
                return $(PrimaryMailingAddressIdCheck).is(':visible');
              }
            }
      },
      "accountHolderContactInfoModel.contactInfoDetails[0].mailingAddress.zip": {
        required: {
            depends: function (el) {
                return $(PrimaryMailingAddressIdCheck).is(':visible');
              }
            },
        number: {
        	depends: function (el) {
        		if($(primaryMailingCountryIdCheck).val() == "840") { return true; }
        		else { return false; }
        	}
        }
      },
      "accountHolderContactInfoModel.contactInfoDetails[0].mailingAddress.country": {
        required: {
            depends: function (el) {
                return $(PrimaryMailingAddressIdCheck).is(':visible');
              }
            }
      },      
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[0].taxIdNumber" : {
    	  required: true,
          ssNum : {
          	depends: function (el) {
      		if(!$(taxIDIdCheck).is(":checked")) { return true; }
      		else { return false; }
      		}
      	 },
          taxId : {
          	depends: function (el) {
      		if($(taxIDIdCheck).is(":checked")) { return true; }
      		else { return false; }
      	    }
           }
        },
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[0].legalResidence" : {
          required: true
        },
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[0].maritalStatus" : {
          required: true
        },
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[0].numberOfDependants" : {
    	  required: true
          },
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[0].dateOfBirth" : {
          required: true,
          trioDate : true
          //date: true
        },
        "accountHolderContactInfoModel.lylNumber" : {
        	required: {
                depends: function (el) {
              	  return $("#loyaltyNumber").is(':visible');
                  }
                }
          },
        "taxCitizenshipInfoModel.employeeId" : {
        	required: {
                depends: function (el) {
              	  return $("#employeeId").is(':visible');
                  }
                }
          },
       "investorProfileOptionInfoModel.annualIncomeCode" : {
            //money: true,
            required: true
          },
       "investorProfileOptionInfoModel.liquidNetWorthCode" : {
            //money: true,
    	    liquidNetWorthMax: true
          },
        "investorProfileOptionInfoModel.totalNetWorthCode" : {
            //money: true,
            required: true
          },
        "investorProfileOptionInfoModel.purposeAndExpectedUse" : {
            required: true
          },
        "investorProfileOptionInfoModel.others" : {
        	required: {
	        	depends: function (el) {
	        		if($("#purpose").val() == "5") { return true; }
	        		else { return false; }
	        	}
            }
        },
        "investorProfileOptionInfoModel.investmentObjectivesCode" : {
            required: true
          },
        "investorProfileOptionInfoModel.investmentExperienceCode" : {
            required: true
          },
        "investorProfileOptionInfoModel.tradingFrequencyCode" : {
            required: true
          },
        "employmentInfoModel.employmentDetailsInfoModelList[0].occupationCode": {
              required: true
          },
        "employmentInfoModel.employmentDetailsInfoModelList[0].occupation": {
        	 required: {
 	        	depends: function (el) {
 	        		if($(primaryEmployerCheck).val() == "OT") { return true; }
 	        		else { return false; }
 	        	}
             }
          },
        "employmentInfoModel.employmentDetailsInfoModelList[0].lineOfBusiness": {
        	 required: {
 	        	depends: function (el) {
 	        		if($(primaryEmployerCheck).val() == "CN" || $(primaryEmployerCheck).val() == "SE") { return true; }
 	        		else { return false; }
 	        	}
             }
          },
        "employmentInfoModel.employmentDetailsInfoModelList[0].employerName": {
              required: true
          },              
        "employmentInfoModel.employmentDetailsInfoModelList[0].employerAddress.firstAddressLine": {
        	required: true
          },
        "employmentInfoModel.employmentDetailsInfoModelList[0].employerAddress.city": {
        	required: true
          },
         "employmentInfoModel.employmentDetailsInfoModelList[0].employerAddress.zip": {
        	 required: {        	 
	             depends: function (el) {
	            	 if($(primaryEmployerCountryIdCheck).val() == "840") { return true; }
	            	 else { return false; }
	             }          
        	 }
          },
          "employmentInfoModel.employmentDetailsInfoModelList[0].employerAddress.state" : {
        	  required: true
          },
          "employmentInfoModel.employmentDetailsInfoModelList[0].employerAddress.country" : {
        	  required: true
          },
          "accountTypeModel.subAcctType" : {
        	  required: {
                  depends: function (el) {
                	  return $(".joint-account").is(':visible');
                    }
                  }
          },          
          "accountHolderContactInfoModel.contactInfoDetails[1].firstName": {
              required: {
                  depends: function (el) {
                	  return $("#joint").is(':visible');
                    }
                  }
           },
          "accountHolderContactInfoModel.contactInfoDetails[1].lastName": {
                required: {
                    depends: function (el) {
                  	  return $("#joint").is(':visible');
                      }
                    }
           },
          "accountHolderContactInfoModel.contactInfoDetails[1].physicalAddress.firstAddressLine": {
              required: {
                  depends: function (el) {
                	  return $("#joint").is(':visible');
                    }
                  }
            },
            "accountHolderContactInfoModel.contactInfoDetails[1].physicalAddress.city": {
              required: {
                  depends: function (el) {
                	  return $("#joint").is(':visible');
                    }
                  }
            },
            "accountHolderContactInfoModel.contactInfoDetails[1].physicalAddress.state": {
              required: {
                  depends: function (el) {
                	  return $("#joint").is(':visible');
                    }
                  }
            },
            "accountHolderContactInfoModel.contactInfoDetails[1].physicalAddress.zip": {
              required: {
                  depends: function (el) {
                	  return $("#joint").is(':visible');
                    }
                  },
              number: {
             	depends: function (el) {
            		if($(secondaryCountryIdCheck).val() == "840") { return true; }
            		else { return false; }
            	}
              }
            },
            "accountHolderContactInfoModel.contactInfoDetails[1].physicalAddress.country": {
              required: {
                  depends: function (el) {
                      return $("#joint").is(':visible');
                    }
                  }
            },
            "accountHolderContactInfoModel.contactInfoDetails[1].mailingAddress.firstAddressLine": {
              required: {
                  depends: function (el) {
                      return $(SecondaryMailingAddressIdCheck).is(':visible');
                    }
                  }
            },
            "accountHolderContactInfoModel.contactInfoDetails[1].mailingAddress.city": {
              required: {
                  depends: function (el) {
                      return $(SecondaryMailingAddressIdCheck).is(':visible');
                    }
                  }
            },
            "accountHolderContactInfoModel.contactInfoDetails[1].mailingAddress.state": {
              required: {
                  depends: function (el) {
                      return $(SecondaryMailingAddressIdCheck).is(':visible');
                    }
                  }
            },
            "accountHolderContactInfoModel.contactInfoDetails[1].mailingAddress.zip": {
              required: {
                  depends: function (el) {
                      return $(SecondaryMailingAddressIdCheck).is(':visible');
                    }
                  },
              number: {
             	depends: function (el) {
            		if($(SecondaryMailingCountryIdCheck).val() == "840") { return true; }
            		else { return false; }
            	}
              }
            },
            "accountHolderContactInfoModel.contactInfoDetails[1].mailingAddress.country": {
              required: {
                  depends: function (el) {
                      return $(SecondaryMailingAddressIdCheck).is(':visible');
                    }
                  }
            },
            "taxCitizenshipInfoModel.taxIdCitizenshipDetails[1].taxIdNumber" : {
            	required: {
                depends: function (el) {
                    return $("#joint").is(':visible');
                  }
                },
	            ssNum : {
	              	depends: function (el) {
	          		if(!$(sectaxIDCheck).is(":checked")) { return true; }
	          		else { return false; }
	          		}
	          	 },
	            taxId : {
	              	depends: function (el) {
	          		if($(sectaxIDCheck).is(":checked")) { return true; }
	          		else { return false; }
	          	    }
	            }
              },
            "taxCitizenshipInfoModel.taxIdCitizenshipDetails[1].legalResidence" : {
                required: {
                    depends: function (el) {
                        return $("#joint").is(':visible');
                      }
                    }
              },
            "taxCitizenshipInfoModel.taxIdCitizenshipDetails[1].maritalStatus" : {
                required: {
                    depends: function (el) {
                        return $("#joint").is(':visible');
                      }
                    }
              },
            "taxCitizenshipInfoModel.taxIdCitizenshipDetails[1].numberOfDependants" : {
            	required: true
                },
            "taxCitizenshipInfoModel.taxIdCitizenshipDetails[1].dateOfBirth" : {
                required: {
                    depends: function (el) {
                        return $("#joint").is(':visible');
                      }
                    },
                trioDate : true
                //date: true
              },
              "employmentInfoModel.employmentDetailsInfoModelList[1].occupationCode": {
                    required: {
                        depends: function (el) {
                            return $("#joint").is(':visible');
                          }
                        }
                },
               "employmentInfoModel.employmentDetailsInfoModelList[1].occupation": {
               	 required: {
        	        	depends: function (el) {
        	        		if($(secondaryEmployerCheck).val() == "OT") { return true; }
        	        		else { return false; }
        	        	}
                    }
                 },
               "employmentInfoModel.employmentDetailsInfoModelList[1].lineOfBusiness": {
               	 required: {
        	        	depends: function (el) {
        	        		if($(secondaryEmployerCheck).val() == "CN" || $(secondaryEmployerCheck).val() == "SE") { return true; }
        	        		else { return false; }
        	        	}
                    }
                 },
              "employmentInfoModel.employmentDetailsInfoModelList[1].employerName": {
                    required: {
                        depends: function (el) {
                            return $("#joint").is(':visible');
                          }
                        }
                },              
              "employmentInfoModel.employmentDetailsInfoModelList[1].employerAddress.firstAddressLine": {
              	required: {
                    depends: function (el) {
                        return $("#joint").is(':visible');
                      }
                    }
                },
              "employmentInfoModel.employmentDetailsInfoModelList[1].employerAddress.city": {
              	required: {
                    depends: function (el) {
                        return $("#joint").is(':visible');
                      }
                    }
                },
               "employmentInfoModel.employmentDetailsInfoModelList[1].employerAddress.state": {
              	 required: {
                     depends: function (el) {
                         return $("#joint").is(':visible');
                       }
                     }
                },
               "employmentInfoModel.employmentDetailsInfoModelList[1].employerAddress.zip": {
              	 required: {
                     depends: function (el) {
                         return $("#joint").is(':visible');
                       }
                 },
                 number: {
                	depends: function (el) {
               		if($(secondaryEmployerCountryIdCheck).val() == "840") { return true; }
               		else { return false; }
                	}
                 }
                },                
                "employmentInfoModel.employmentDetailsInfoModelList[1].employerAddress.country" : {
              	  required: {
                      depends: function (el) {
                          return $("#joint").is(':visible');
                        }
                      }
                },
                "financialProfileModel.financialProfileQuestionsAndAnswers[0].answerSelected" : {
                	required: true
                },
                "financialProfileModel.financialProfileQuestionsAndAnswers[1].answerSelected" : {
                    required: true
                },
                "financialProfileModel.financialProfileQuestionsAndAnswers[2].answerSelected" : {
                	required: true
                },
                "financialProfileModel.financialProfileQuestionsAndAnswers[3].answerSelected" : {
                	required: true
                },
                "financialProfileModel.financialProfileQuestionsAndAnswers[4].answerSelected" : {
                	required: true
                },
                "financialProfileModel.financialProfileQuestionsAndAnswers[5].answerSelected" : {
                	required: true
                },
                "financialProfileModel.financialProfileQuestionsAndAnswers[6].answerSelected" : {
                	required: true
                },
                "riskProfileModel.riskProfileQuestionsAndAnswers[0].answerSelected" : {
                	required: true
                },
                "riskProfileModel.riskProfileQuestionsAndAnswers[1].answerSelected" : {
                    required: true
                },
                "riskProfileModel.riskProfileQuestionsAndAnswers[2].answerSelected" : {
                	required: true
                },
                "riskProfileModel.riskProfileQuestionsAndAnswers[3].answerSelected" : {
                	required: true
                },
                "riskProfileModel.riskProfileQuestionsAndAnswers[4].answerSelected" : {
                	required: true
                },
                "riskProfileModel.riskProfileQuestionsAndAnswers[5].answerSelected" : {
                	required: true
                },
                "riskProfileModel.riskProfileQuestionsAndAnswers[6].answerSelected" : {
                	required: true
                },
                "riskProfileModel.riskProfileQuestionsAndAnswers[7].answerSelected" : {
                	required: true
                },
                "primaryAllTimePhone" : {
                	required: {
                    	depends: function (el) {                	                       	        
                    	   if($("#isCustodialAcc").val() == 'yes' ) {
                    		   return true; 
                    	   }else{
                    		   if ($(primaryCountryIdCheck).val() != 840) 
		                        { return true; }
		                       else
		                        { return false;	}
                    	   }
                      	}
                    },
                    phoneUS : {
                    	depends: function (el) {                	                       	        
 	                       if ($(primaryCountryIdCheck).val() == 840) 
 	                        { return true; }
 	                       else
 	                        { return false;	}
                       	}
                    }
                },
                "accountHolderContactInfoModel.contactInfoDetails[0].homePhoneA" : {
               	 required: {
                   	depends: function (el) {                	                       	        
	                       if ($(primaryCountryIdCheck).val() != 840) 
	                        { return true; }
	                       else
	                        { return false;	}
                     	}
                    }
               },
                "accountHolderContactInfoModel.contactInfoDetails[0].homePhoneB" : {
                	 required: {
                    	depends: function (el) {                	                       	        
                    	   if($("#isCustodialAcc").val() == 'yes' ) {
                    		   return true; 
                    	   }else{
                    		   if ($(primaryCountryIdCheck).val() != 840) 
		                        { return true; }
		                       else
		                        { return false;	}
                    	   }
                      	}
                     },
                    phoneUS : {
                    	depends: function (el) {                	                       	        
 	                       if ($(primaryCountryIdCheck).val() == 840) 
 	                        { return true; }
 	                       else
 	                        { return false;	}
                       	}
                      }
                },
                "accountHolderContactInfoModel.contactInfoDetails[0].businessPhone" : {
                	phoneUS : true
                },                
                "accountHolderContactInfoModel.contactInfoDetails[0].mobilePhone": {
                    required: {
                        depends: function (el) {                	                       	        
                            if ($("#mobileAppPush").is(':checked')) {
                         	     return true;
                           }else{
                         	  	  return false;
                           }
                          }
                        },
                     phoneUS : true
                  },
                  "accountHolderContactInfoModel.contactInfoDetails[1].homePhoneA" : {
                    	 required: {
                        	depends: function (el) {                	                       	        
     	                       if ($(secondaryCountryIdCheck).val() != 840) 
     	                        { return true; }
     	                       else
     	                        { return false;	}
                          	}
                         }
                    },
                  "accountHolderContactInfoModel.contactInfoDetails[1].homePhoneB" : {
                	  required: {
                      depends: function (el) {
	                    	  if( $(secondaryCountryIdCheck).val() != 840 ){
	                	  		  return true;
	                	  	  }                	  	  
	                	  	  else{
	                       	  	  return false;
	                          }                    	  
                        }
                      },
                      phoneUS : {
                      	depends: function (el) {                	                       	        
 	                       if ($(secondaryCountryIdCheck).val() == 840) 
 	                        { return true; }
 	                       else
 	                        { return false;	}
                       	}
                      }
                  },
                  "accountHolderContactInfoModel.contactInfoDetails[0].mobileType" : {
                      required: {
                          depends: function (el) {                	                       	        
                              if ($("#mobileAppPush").is(':checked')) {
                           	     return true;
                             }else{
                           	  	  return false;
                             }
                            }
                          }                       
                  },
                  "accountHolderContactInfoModel.contactInfoDetails[1].businessPhone" : {
                  	phoneUS : true
                  },                
                  "accountHolderContactInfoModel.contactInfoDetails[1].mobilePhone": {
                      
                       phoneUS : true
                    },
                  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].numberOfyearsInStocks" : {
              	  	required: {
                        depends: function (el) {
                          return $("#futuresPrimary").is(':visible');
                        }
                      }
              	  },
              	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].tradesPerYearStocksCode" : {
              	  	required: {
                        depends: function (el) {
                          return $("#futuresPrimary").is(':visible');
                        }
                      }
              	  },
              	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].averageTradesStocksCode" : {
              	  	required: {
                        depends: function (el) {
                          return $("#futuresPrimary").is(':visible');
                        }
                      }
              	  },
              	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].numberOfyearsInBonds" : {
              	  	required: {
                        depends: function (el) {
                          return $("#futuresPrimary").is(':visible');
                        }
                      }
              	  },
              	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].tradesPerYearBondsCode" : {
              	  	required: {
                        depends: function (el) {
                          return $("#futuresPrimary").is(':visible');
                        }
                      }
              	  },
              	 "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].averageTradesBondsCode" : {
              	  	required: {
                        depends: function (el) {
                          return $("#futuresPrimary").is(':visible');
                        }
                      }
              	  },
              	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].numberOfyearsInOptions" : {
              	  	required: {
                        depends: function (el) {
                          return $("#futuresPrimary").is(':visible');
                        }
                      }
              	  },
              	   "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].tradesPerYearOptionsCode" : {
              	  	required: {
                        depends: function (el) {
                          return $("#futuresPrimary").is(':visible');
                        }
                      }
              	  },
              	   "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].averageTradesOptionsCode" : {
              	  	required: {
                        depends: function (el) {
                          return $("#futuresPrimary").is(':visible');
                        }
                      }
              	  },
              	 "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].numberOfyearsInFutures" : {
              	  	required: {
                        depends: function (el) {
                          return $("#futuresPrimary").is(':visible');
                        }
                      }
              	  },
              	   "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].tradesPerYearFuturesCode" : {
              	  	required: {
                        depends: function (el) {
                          return $("#futuresPrimary").is(':visible');
                        }
                      }
              	  },
              	   "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].averageTradesFuturesCode" : {
              	  	required: {
                        depends: function (el) {
                          return $("#futuresPrimary").is(':visible');
                        }
                      }
              	  },
              	"investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].numberOfyearsInStocks" : {
              	  	required: {
                  depends: function (el) {
                    return $("#futuresSecondary").is(':visible');
                  }
                }
        	  },
        	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].tradesPerYearStocksCode" : {
        	  	required: {
                  depends: function (el) {
                    return $("#futuresSecondary").is(':visible');
                  }
                }
        	  },
        	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].averageTradesStocksCode" : {
        	  	required: {
                  depends: function (el) {
                    return $("#futuresSecondary").is(':visible');
                  }
                }
        	  },
        	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].numberOfyearsInBonds" : {
        	  	required: {
                  depends: function (el) {
                    return $("#futuresSecondary").is(':visible');
                  }
                }
        	  },
        	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].tradesPerYearBondsCode" : {
        	  	required: {
                  depends: function (el) {
                    return $("#futuresSecondary").is(':visible');
                  }
                }
        	  },
        	 "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].averageTradesBondsCode" : {
        	  	required: {
                  depends: function (el) {
                    return $("#futuresSecondary").is(':visible');
                  }
                }
        	  },
        	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].numberOfyearsInOptions" : {
        	  	required: {
                  depends: function (el) {
                    return $("#futuresSecondary").is(':visible');
                  }
                }
        	  },
        	   "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].tradesPerYearOptionsCode" : {
        	  	required: {
                  depends: function (el) {
                    return $("#futuresSecondary").is(':visible');
                  }
                }
        	  },
        	   "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].averageTradesOptionsCode" : {
        	  	required: {
                  depends: function (el) {
                    return $("#futuresSecondary").is(':visible');
                  }
                }
        	  },
        	 "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].numberOfyearsInFutures" : {
        	  	required: {
                  depends: function (el) {
                    return $("#futuresSecondary").is(':visible');
                  }
                }
        	  },
        	   "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].tradesPerYearFuturesCode" : {
        	  	required: {
                  depends: function (el) {
                    return $("#futuresSecondary").is(':visible');
                  }
                }
        	  },
        	   "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].averageTradesFuturesCode" : {
        	  	required: {
                  depends: function (el) {
                    return $("#futuresSecondary").is(':visible');
                  }
                }
        	  },
        	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].futureTradingUnderstandRiskFlag" : {
        		  required: true    		  
        	  },
        	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].futureTradingBasicsFlag" : {
        		  required: true    		  
        	  },
        	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].futureTradeSuitableFlag" : {
        		  required: true    		  
        	  }
              	
      /*daytimePhone : {
        required: true,
        phoneUS: true
      }*/ 
    },
    messages: {            
      "accountHolderContactInfoModel.contactInfoDetails[0].firstName" : "Please Enter Your First Name.",
      "accountHolderContactInfoModel.contactInfoDetails[0].lastName" : "Please Enter Your Last Name.",
      "accountHolderContactInfoModel.email1" : "Please Enter Your Valid Email Address.",
      "accountHolderContactInfoModel.contactInfoDetails[0].physicalAddress.firstAddressLine" : "Please Enter Your Permanent Street Address.",
      "accountHolderContactInfoModel.contactInfoDetails[0].physicalAddress.city": "Please Enter Your City.",
      "accountHolderContactInfoModel.contactInfoDetails[0].physicalAddress.state": "Please Select Your State.",
      "accountHolderContactInfoModel.contactInfoDetails[0].physicalAddress.zip": "Please Enter Your Valid Zip.",
      "accountHolderContactInfoModel.contactInfoDetails[0].physicalAddress.country": "Please Select Your Country.",
      "accountHolderContactInfoModel.contactInfoDetails[0].mailingAddress.firstAddressLine": "Please Enter Your Mailing Street Address.",
      "accountHolderContactInfoModel.contactInfoDetails[0].mailingAddress.city": "Please Enter Your Mailing City.",
      "accountHolderContactInfoModel.contactInfoDetails[0].mailingAddress.state": "Please Select Your Mailing State.",
      "accountHolderContactInfoModel.contactInfoDetails[0].mailingAddress.zip": "Please Enter Your Valid Mailing Zip.",
      "accountHolderContactInfoModel.contactInfoDetails[0].mailingAddress.country": "Please Select Your Mailing Country.",
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[0].taxIdNumber" : "Please Enter Your Valid <br/>Social Security Number/Tax ID Number.",
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[0].legalResidence": "Please Select Your Country of Legal Residence.",
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[0].maritalStatus": "Please Select Your Marital Status.",
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[0].numberOfDependants": "Please Select Your Number of Dependents.",
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[0].dateOfBirth": "Please Enter Your Valid Date of Birth.",
      "taxCitizenshipInfoModel.employeeId": "Please Enter Your Employee Id.",
      "accountHolderContactInfoModel.lylNumber": "Please Enter Your Loyalty Number.",
      "investorProfileOptionInfoModel.annualIncomeCode": "Plese Enter Your Combined Annual Income.",
      "investorProfileOptionInfoModel.totalNetWorthCode" : "Please Enter Your Total Net Worth.",
      "investorProfileOptionInfoModel.purposeAndExpectedUse": "Please Enter Your Purpose or Expected Use.",
      "investorProfileOptionInfoModel.others": "Please explain how you primarily plan to use this account.",
      "investorProfileOptionInfoModel.investmentObjectivesCode": "Please Enter Your Investment Objectives.",
      "investorProfileOptionInfoModel.investmentExperienceCode": "Please Enter Your Investment Experience.",
      "investorProfileOptionInfoModel.tradingFrequencyCode": "Please Enter Your Investment Frequency.",      
      "employmentInfoModel.employmentDetailsInfoModelList[0].occupationCode": "Please Select Your Occupation.",
      "employmentInfoModel.employmentDetailsInfoModelList[0].occupation": "Please Specify Your Occupation.",
      "employmentInfoModel.employmentDetailsInfoModelList[0].lineOfBusiness": "Please Enter Your Line of Business.",
      "employmentInfoModel.employmentDetailsInfoModelList[0].employerName": "Please Enter Your Employer Name.",
      "employmentInfoModel.employmentDetailsInfoModelList[0].employerAddress.firstAddressLine": "Please Enter Your Employer's Street Address.",
      "employmentInfoModel.employmentDetailsInfoModelList[0].employerAddress.city": "Please Enter Your Employer's City.",
      "employmentInfoModel.employmentDetailsInfoModelList[0].employerAddress.state": "Please Select Your Employer's State.",
      "employmentInfoModel.employmentDetailsInfoModelList[0].employerAddress.zip": "Please Enter Your Valid Employer's Zip.",
      "employmentInfoModel.employmentDetailsInfoModelList[0].employerAddress.country": "Please Select Your Employer's Country.",
      "accountTypeModel.subAcctType": "Please Select the Type of Joint Account.",
      "accountHolderContactInfoModel.contactInfoDetails[1].firstName": "Please Enter Your First Name." ,
      "accountHolderContactInfoModel.contactInfoDetails[1].lastName": "Please Enter Your Last Name.",
      "accountHolderContactInfoModel.contactInfoDetails[1].physicalAddress.firstAddressLine" : "Please Enter Your Permanent Street Address.",
      "accountHolderContactInfoModel.contactInfoDetails[1].physicalAddress.city": "Please Enter Your City.",
      "accountHolderContactInfoModel.contactInfoDetails[1].physicalAddress.state": "Please Select Your State.",
      "accountHolderContactInfoModel.contactInfoDetails[1].physicalAddress.zip": "Please Enter Your Valid Zip.",
      "accountHolderContactInfoModel.contactInfoDetails[1].physicalAddress.country": "Please Select Your Country.",
      "accountHolderContactInfoModel.contactInfoDetails[1].mailingAddress.firstAddressLine": "Please Enter Your Mailing Street Address.",
      "accountHolderContactInfoModel.contactInfoDetails[1].mailingAddress.city": "Please Enter Your Mailing City.",
      "accountHolderContactInfoModel.contactInfoDetails[1].mailingAddress.state": "Please Select Your Mailing State.",
      "accountHolderContactInfoModel.contactInfoDetails[1].mailingAddress.zip": "Please Enter Your Valid Mailing Zip.",
      "accountHolderContactInfoModel.contactInfoDetails[1].mailingAddress.country": "Please Select Your Mailing Country.",
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[1].taxIdNumber" : "Please Enter Your Valid <br/>Social Security Number/Tax ID Number.",
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[1].legalResidence": "Please Select Your Country of Legal Residence.",
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[1].maritalStatus": "Please Select Your Marital Status.",
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[1].numberOfDependants": "Please Select Your Number of Dependents.",
      "taxCitizenshipInfoModel.taxIdCitizenshipDetails[1].dateOfBirth": "Please Enter Your Valid Date of Birth.",                  
      "employmentInfoModel.employmentDetailsInfoModelList[1].occupationCode": "Please Select Your Occupation.",
      "employmentInfoModel.employmentDetailsInfoModelList[1].occupation": "Please Specify Your Occupation.",
      "employmentInfoModel.employmentDetailsInfoModelList[1].lineOfBusiness": "Please Enter Your Line of Business.",
      "employmentInfoModel.employmentDetailsInfoModelList[1].employerName": "Please Enter Your Employer Name.",
      "employmentInfoModel.employmentDetailsInfoModelList[1].employerAddress.firstAddressLine": "Please Enter Your Employer's Street Address.",
      "employmentInfoModel.employmentDetailsInfoModelList[1].employerAddress.city": "Please Enter Your Employer's City.",
      "employmentInfoModel.employmentDetailsInfoModelList[1].employerAddress.state": "Please Select Your Employer's State.",
      "employmentInfoModel.employmentDetailsInfoModelList[1].employerAddress.zip": "Please Enter Your Valid Employer's Zip.",
      "employmentInfoModel.employmentDetailsInfoModelList[1].employerAddress.country": "Please Select Your Employer's Country.",
      "financialProfileModel.financialProfileQuestionsAndAnswers[0].answerSelected": "Please Answer the Question.",
      "financialProfileModel.financialProfileQuestionsAndAnswers[1].answerSelected": "Please Answer the Question.",
      "financialProfileModel.financialProfileQuestionsAndAnswers[2].answerSelected": "Please Answer the Question.",
      "financialProfileModel.financialProfileQuestionsAndAnswers[3].answerSelected": "Please Answer the Question.",
      "financialProfileModel.financialProfileQuestionsAndAnswers[4].answerSelected": "<br/>Please Answer the Question.",
      "financialProfileModel.financialProfileQuestionsAndAnswers[5].answerSelected": "<br/>Please Answer the Question.",
      "financialProfileModel.financialProfileQuestionsAndAnswers[6].answerSelected": "Please Answer the Question.",
      "riskProfileModel.riskProfileQuestionsAndAnswers[0].answerSelected": "Please Answer the Question.",
      "riskProfileModel.riskProfileQuestionsAndAnswers[1].answerSelected": "Please Answer the Question.",
      "riskProfileModel.riskProfileQuestionsAndAnswers[2].answerSelected": "Please AnswerAnswer the Question.",
      "riskProfileModel.riskProfileQuestionsAndAnswers[3].answerSelected": "Please Answer the Question.",
      "riskProfileModel.riskProfileQuestionsAndAnswers[4].answerSelected": "<br/>Please Answer the Question.",
      "riskProfileModel.riskProfileQuestionsAndAnswers[5].answerSelected": "<br/>Please Answer the Question.",
      "riskProfileModel.riskProfileQuestionsAndAnswers[6].answerSelected": "<br/>Please Answer the question.",
      "riskProfileModel.riskProfileQuestionsAndAnswers[7].answerSelected": "Please Answer the Question.",
      "accountHolderContactInfoModel.contactInfoDetails[0].homePhoneA": "Please Enter Your Country Code for Home Phone Number.",
      "accountHolderContactInfoModel.contactInfoDetails[0].homePhoneB": "Please Enter Your Valid  Home Phone Number.",
      "accountHolderContactInfoModel.contactInfoDetails[0].businessPhone": "Please Enter Your Valid Business Phone Number.",
      "accountHolderContactInfoModel.contactInfoDetails[0].mobilePhone": "Please Enter Your Valid Mobile Phone Number.",
      "accountHolderContactInfoModel.contactInfoDetails[1].homePhoneA": "Please Enter Your Country Code for Home Phone Number.",
      "accountHolderContactInfoModel.contactInfoDetails[1].homePhoneB": "Please Enter Your Valid  Home Phone Number.",
      "accountHolderContactInfoModel.contactInfoDetails[1].businessPhone": "Please Enter Your Valid Business Phone Number.",
      "accountHolderContactInfoModel.contactInfoDetails[1].mobilePhone": "Please Enter Your Valid Mobile Phone Number.",
      "accountHolderContactInfoModel.contactInfoDetails[0].mobileType": "Please Select Your Device.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].numberOfyearsInStocks" : "Trading Experience for Stocks<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].tradesPerYearStocksCode" : "Number of Stocks Transactions<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].averageTradesStocksCode" : "Average Trading Size of Stocks<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].numberOfyearsInBonds" : "Trading Experience for Bonds<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].tradesPerYearBondsCode" : "Number of Bonds Transactions<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].averageTradesBondsCode" : "Average Trading Size of Bonds<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].numberOfyearsInOptions" : "Trading Experience for Options<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].tradesPerYearOptionsCode" : "Number of Options Transactions<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].averageTradesOptionsCode" : "Average Trading Size of Options<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].numberOfyearsInFutures" : "Trading Experience for Futures<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].tradesPerYearFuturesCode" : "Number of Futures Transactions<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].averageTradesFuturesCode" : "Average Trading Size of Futures<br/> is Missing.",	  
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].numberOfyearsInStocks" : "Trading Experience for Stocks<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].tradesPerYearStocksCode" : "Number of Stocks Transactions<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].averageTradesStocksCode" : "Average Trading Size of Stocks<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].numberOfyearsInBonds" : "Trading Experience for Bonds<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].tradesPerYearBondsCode" : "Number of Bonds Transactions<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].averageTradesBondsCode" : "Average Trading Size of Bonds<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].numberOfyearsInOptions" : "Trading Experience for Options<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].tradesPerYearOptionsCode" : "Number of Options Transactions<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].averageTradesOptionsCode" : "Average Trading Size of Options<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].numberOfyearsInFutures" : "Trading Experience for Futures<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].tradesPerYearFuturesCode" : "Number of Futures Transactions<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[1].averageTradesFuturesCode" : "Average Trading Size of Futures<br/> is Missing.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].futureTradingUnderstandRiskFlag" : "Please select Yes or No.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].futureTradingBasicsFlag" : "Please select Yes or No.",
	  "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].futureTradeSuitableFlag" : "Please select Yes or No."
	  /*daytimePhone : "Please Enter Your Daytime Phone" */
    },
    errorElement: "p",
    focusInvalid: false,
    errorPlacement: function (error, element) { 
    	if (element.prop('name') === "accounttype") {
         $(element).closest('.section').find('.application-title').after(error);
       }else if(element.prop('name') === "accountTypeModel.subAcctType") {    	 
    	 $(element).closest('div').after(error);   	     
 	   }else if(element.prop('id') === "daytimePhone") {    	 
    	 $("#countryCodeError").append(error);   	     
 	   }else if(element.prop('id') === "secondaryDaytimePhone") {   	 
 		 $("#secCountryCodeError").append(error);
 	   }else if(element.prop('name') === "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].futureTradingUnderstandRiskFlag" || 
			    element.prop('name') === "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].futureTradingBasicsFlag" ||
			    element.prop('name') === "investorProfileOptionInfoModel.investorProfileFutureSuitablityDetailsInfoModelList[0].futureTradeSuitableFlag") {    	 
		   $(element).closest('.radio-group').after(error);
		   $(element).closest('.radio-group').next().css('clear', 'both'); 		 
 	   }else if($(element).hasClass('profile_select')) { //FOR OSR QUESTIONS 		  
 		  $(element).after(error);
  	   }else if($(element).hasClass('profile_radio')) { //FOR OSR QUESTIONS 		  
  		  $(element).closest('div').before(error);  		 
   	   }else if($(element).is("select") ){
	    	if( $(element).next("a").is("a") ){
	    		$(element).next("a").after(error);
	    	} else {
	    		$(element).after(error);
	    	}
	   }else if($(element).hasClass('investment_select')) {
  	     	$(element).next("a").after(error);
  	   }else if($(element).is('select[class!="investment_select"]')) {
    	    $(element).after(error);
       }else {
        $(element).after(error);
      }
    },
    highlight: function (element, errorClass, validClass) {
    	//alert("main highlight");
      $(element).addClass('error');

    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass("error");
    },
    invalidHandler: function (form, validator) {
      
      var firstError = validator.errorList[0].element;      
      var  offset = $(firstError).offset();            
      offset = offset.top - 150;
      if(alreadyScrolled_offset > offset)   $(window).scrollTop(offset);
    }
  });


  /*$(".dropdown-menu").find("a").on("click", function (e) {
    var $this = $(this),
      $containerDiv = $this.closest("div"),
      $input = $containerDiv.find("input"),
      id = $input.attr("id");

    $this.closest("fieldset").find('p[for="' + id + '"]').hide();
  });*/

  
  //$('#joint-account-area').addClass('hide');
  
    $('select').bind('change', function() {

    var option = $(this).find('option:selected').val();
    var nextSpan = $(this).next('span');
    var spanBtn = $(nextSpan.find('.btn'));
    
    if (option != "") {
      spanBtn.css('color', '#000');
    }
    else {
      spanBtn.css('color', '#999999');
    }
  });

   
    function formatDOB(value,element){
	 	   if(value != undefined && value !="") {
	 		   if (value.match(/^(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(19[0-9]{2}|2[0-9]{3})$/)) {   
	 			   value = value.splice(2, 0, "/");
	 			   value = value.splice(5, 0, "/");
	 			   $(element).val(value);
	 		   }
	 	   }
	} 
   
   formatDOB($("#primaryDOB").val(),"#primaryDOB"); //To format the DOB in MM/DD?YY while page onload
   formatDOB($("#secondaryDOB").val(),"#secondaryDOB"); //To format the DOB in MM/DD?YY while page onload
   
   if($("#showInvestmentProfile").val() == "false"){
	   $('#continue-button').attr("disabled", true);
   }
   
   
	   
   
   function mobile_push_submit(){
	     
	   if($('#mobileAppPush').is(':checked')) {
		   //mobile_push(); 
		   return false;
	   }
   }  
  

  function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }
  var prefillMove = getParameterByName("scroll"); 
  if(prefillMove == "move-primary" || prefillMove == "move-secondary" ){
        prefillMove = "#"+prefillMove;
	var  offsetPrefill = $(prefillMove).offset();            
	     offsetPrefill = offsetPrefill.top - 150;
	$(window).scrollTop(offsetPrefill);

  }
	
});
