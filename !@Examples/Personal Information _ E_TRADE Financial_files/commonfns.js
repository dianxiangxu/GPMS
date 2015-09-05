var pgflow = "", 
    aerrorFlds = new Array(),
    scrollPage = "",
    ajaxStatus = {url: '', status: false},
    $commonErrors = $("#etErrorBox");
	
function cryptSSN(serializeData) {	
    var serializeDataArr = serializeData.split("taxIdNumber=");
    var newSerializeData = '';      

    for(i=0; i< serializeDataArr.length; i++) {
  	  if(i > 0) {
  		  if(serializeDataArr[i].indexOf('&') != -1) {
  			  var tempArr = serializeDataArr[i].split('&');  			  
  			  var isGen = (tempArr[0] != '') ? ((tempArr[0]).substr(0,3)) : '';
  			  var encryptedStr = (isGen == 'GEN') ? tempArr[0] : encryptString(tempArr[0]);
  			  tempArr.shift();
  			  newSerializeData += 'taxIdNumber=' + encryptedStr + '&' + tempArr.join('&');
  		  } else {
  			  newSerializeData += serializeDataArr[i];
  		  }
  	  } else {
  		  newSerializeData += serializeDataArr[i];
  	  }
    }
    
    return newSerializeData;
}

function fnSetAjax($form,pgparams){ 
	
      var sFormAction = $form.attr("action"), 
          sUpdatedFormAction = sFormAction, setpgparams = "";
      
      // to remove extra paramters before posting including jsessionid and/or ADV, etc.

      if (sFormAction.indexOf(";")!=-1)
	{
		sUpdatedFormAction = sFormAction.substr(0,sFormAction.indexOf(";"))
	}	
      else if (sFormAction.indexOf("?")!=-1)
	{
		sUpdatedFormAction = sFormAction.substr(0,sFormAction.indexOf("?"));
	}	
      
      if (pgparams) {    
        setpgparams = ".json" + pgparams;   // needed for sub calls
      } else {   
        setpgparams = ".json";    
      }
      
      if(!ajaxStatus.status) {
    	  ajaxStatus.url = sUpdatedFormAction + setpgparams;
    	  ajaxStatus.status = true;
      } else {
    	  var posturl = sUpdatedFormAction + setpgparams;
    	  if(posturl == ajaxStatus.url) {
    		  return false;
    	  }
      }
      
      var newSerializeData = cryptSSN($form.serialize());

      $.ajax({
        type: "POST",
        url: sUpdatedFormAction + setpgparams,
        cache: false,
        dataType: "json",
        beforeSend : beforeAjax,        
        data: newSerializeData
        }).done(function(sData){
        	ajaxStatus.status = false;
            fnAjaxSuccess(sData); 
          }).fail(function(textStatus){
        	  ajaxStatus.status = false;        	
            $commonErrors.html('<div id="error-img" class="information-icon"></div><ul id="error-list"><li>While retrieving data an error has occurred, please try again.</li></ul>');
	   afterAjax();
            offset_ajax = $commonErrors.offset() - 150; 
            $(window).scrollTop(offset_ajax);
        });
}; // End fnSetAjax()
	
function beforeAjax(){
	 //alert("beforeAjax");
	 $("#continue-button").attr("disabled","disabled");
	 $.fancybox( $('#Loader-Window'), {
		             'closeBtn' : false,
		             modal: true,
		             beforeShow: function(){
		                         $(".fancybox-skin").css({
		                            "background":"none",
					    "box-shadow":"none",
					    "border-radius":"none"
		                         });
		             }            
     });
	 //$("#continue-button").attr("value","Please Wait...");
}
function afterAjax(){
	//alert("afterAjax");
	$("#continue-button").removeAttr("disabled");
	$.fancybox.close();
	//$("#continue-button").attr("value","CONTINUE");
}
	
function fnAjaxSuccess(sData,sStatusMsg) {
	
var errMsg = '<div id="error-img" class="information-icon"></div><ul id="error-list"><li>While retrieving data an error has occurred, please try again.</li></ul>';

  if(!sData.data || sData.data == null  || sData.data == undefined || sData.data=="") {		
	  
	$commonErrors.html(errMsg);	
	offset_ajax = $commonErrors.offset() - 150;
        afterAjax(); 
    	$(window).scrollTop(offset_ajax);	
	//console.log("sdata is not available");
	return false;
	
  }else {
	
	var validationError = false,
      fromssnpage = false,
      randomnumber=Math.floor(Math.random()*21),
      captchaimg = "/basicCaptchaImage?"+randomnumber;

	if(sData.data.validationError){ // if it is not available
		validationError = sData.data.validationError;
	}
	
	if (validationError) {
        $commonErrors.html('<div id="error-img" class="information-icon"></div><ul id="error-list"></ul>');
        var hasError = false;
        $.each(sData.data.validationError, function(row){
          fieldValidated(row,this.toString());
          if(this.toString()!=""){
            $("#error-list").append('<li>'+ this.toString() +'</li>');
            hasError = true;
          }
        });
        if(hasError) {
        	$commonErrors.show();
        }
	afterAjax();
        offset_ajax = $commonErrors.offset() - 150; 
        $(window).scrollTop(offset_ajax);
	   } else {
		   $commonErrors.html('');
	      // go to the next page 
		   if(sData.data.nextPage) {
			if(scrollPage == "move-primary" || scrollPage == "move-secondary" ) {
				if(pageBailer != null) {
					runContinue();
				}
				scrollPageURL= sData.data.nextPage;
				if(scrollPageURL.indexOf("?") > -1) {
					document.location.href = pgflow + sData.data.nextPage+"&scroll="+scrollPage;
                                }else {
					document.location.href = pgflow + sData.data.nextPage+"?scroll="+scrollPage;
                                }

			}
			else{
				if(pageBailer != null) {
					runContinue();
				}
				document.location.href = pgflow + sData.data.nextPage;
			}
		   }else{
				 $commonErrors.html(errMsg);
				 afterAjax();
				 //console.log("sdata nextpage is not available");
		   }
    }
  }
} // closing fnAjaxSuccess(sData,sStatusMsg)

function clearSession() {
	$.get('/oaa/step1start-brokerage/clean');
}

function fnSetBackAjax($form, pgparams){
    var setpgparams = "";
    if (pgparams) {   
      setpgparams = "/previousPage.json" + pgparams;   // needed for sub calls
    } else {  
      setpgparams = "/previousPage.json";   
    }

    var changetypeAction = trimPostUrl($form.attr("action"));
	
    var newSerializeData = cryptSSN($form.serialize());
       
    $.ajax({
      type: "POST",
      url: changetypeAction + setpgparams,
      cache: false,
      dataType: "json",
      beforeSend : beforeAjax,      
      data: newSerializeData
      }).done(function(sData){
          fnBackAjaxSuccess(sData);          
      }).fail(function(textStatus){
          $commonErrors.html('<div id="error-img" class="information-icon"></div><ul id="error-list"><li>While retrieving data an error has occurred, please try again.</li></ul>');
	  afterAjax();
	    offset_ajax = $commonErrors.offset() - 150; 
            $(window).scrollTop(offset_ajax);
      });
}; // End fnSetBackAjax()

function fnBackAjaxSuccess(sData,sStatusMsg) {   
    var prevpage = false;
    var $commonErrors = $("#etErrorBox");

    if(sData.data.previousPage){ // if it is not available
           prevpage = sData.data.previousPage;
    }
    
    if(prevpage) {
        $commonErrors.html('');
		if(pageBailer != null) {
			runContinue()
		}
        document.location.href = pgflow + prevpage;   
    }else{	
	var errMsg = '<div id="error-img" class="information-icon"></div><ul id="error-list"><li>While retrieving data an error has occurred, please try again.</li></ul>';	
	$commonErrors.html(errMsg);	
	offset_ajax = $commonErrors.offset() - 150;
        afterAjax(); 
    	$(window).scrollTop(offset_ajax);	
	return false;
    }
}

function fieldValidated(field, msg) { 
  var fieldnm = field.toString();
  //var fieldname = fieldnm.replace(/([ .[\]])/g,'\\\\$1'); 
  if(fieldnm.indexOf(".") > -1)
    var fieldname = fieldnm.replace(/[\[\].]/g, "\\$&");
  else 
    var fieldname = fieldnm;
   

    var isTextarea = $("[name='"+ fieldname + "']").is("textarea");
    var isSelectBox = $("[name='"+ fieldname + "']").is("select");

    if(isTextarea)
	fieldname = $("textarea[name='"+ fieldname + "']");
    else if(isSelectBox)
	fieldname = $("select[name='"+ fieldname + "']");
    else
 	fieldname = $("input[name='"+ fieldname + "']");
    

    aerrorFlds.push(fieldname);

    if(fieldname.attr("type") || isTextarea || isSelectBox) {
     // fieldname.after('<p generated="true" class="error" style="display: block;">' + msg + '</p>');
      if( fieldname.attr("type") == "checkbox" || fieldname.attr("type") == "radio" ) {
        fieldname.closest('div').find(".txt_black").first().addClass("red");
      } else if ( fieldname.attr("type")=="radio" ) {
        fieldname.closest('#radioBox').find('.txt_black').addClass("red");
      } else {
        if(fieldname){
          fieldname.addClass("error");
        } else {
          //alert("error occured fld name not found");
        }
      }
    } else {
    //alert( "fieldname is 2" + fieldname.attr("type") );
   }
  
}

var placeholderSupport = ("placeholder" in document.createElement("input"));
if(!placeholderSupport){  // if it is not supported
  $('.styled .wrap label').css('display','block'); 
  $('.styled .wrap label').inFieldLabels();
}

$('select').bind({ 
  'close': function() {
    $(this).trigger('blur');
   }
});

function trimPostUrl(changetype) {	
   	changetypeSplit = changetype.split("?");
   	changetype = changetypeSplit[0];
   	changetype = changetype.replace(/prefillPersonalInfo/g,'');
   	changetype = changetype.replace(/changeProductType/g,'');
   	changetype = changetype.replace(/saveAndRetrieve/g,'');
   	changetype = changetype.replace(/SaveApplication/g,'');
    return changetype;
}

if(!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
	  $("[rel=popover]").popover().click();
	  $(".focus-tip").tooltip();
} else {
	  $("[rel=popover]").hide();
}

// Prevent Linking of Tooltips
$(".icon-question").click(function(e) {
  e.preventDefault();
});

$(".overlay-link").fancybox({
    openEffect  : 'none',
    closeEffect : 'none',
    maxWidth: '900px',
    beforeShow: function() {
    	$('#savePrimaryDOB').trigger("blur"); // To format the DOB
    	if(this.href=='#save-application' && pageName.indexOf('step2personalinfo') != -1) {
    		//alert('test');
    		var oldSsnNumber = $('#savePrimarySSNums').val();
    		if(oldSsnNumber == '') {
    			if(!$('#primarySSNum').hasClass('error')) {
    				var ssnNumber = $('#primarySSNum').val();
    				if(ssnNumber != '' && ssnNumber.length == 11) {
    					$('#savePrimarySSNums').val(ssnNumber.substring(7));
    					$('#savePrimarySSNums').attr('readonly', 'true');
    				}
        		}
    		}
    		$('#savePrimarySSNums').trigger("blur");
    		var oldDob = $('#savePrimaryDOB').val();
    		if(oldDob == '') {
    			if(!$('#primaryDOB').hasClass('error')) {
    				var dob = $('#primaryDOB').val();
    				if(dob != '' && (dob.length == 8 || dob.length == 10)) {
    					$('#savePrimaryDOB').val(dob);
    					$('#savePrimaryDOB').attr('readonly', 'true');
    				}    				
    			}
    		}
    		$('#savePrimaryDOB').trigger("blur");
    	}
    }
});

$(".overlay-link-mip-new").fancybox({
    openEffect  : 'none',
    closeEffect : 'none',
    maxWidth: '900px'
});

$(".arrow-link").on("click", function(e){
  $.fancybox.close() ;
});

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
 
  var $form = $("#onlineFormsModel");
  var timeoutID, counter, refreshLink,
      timeSinceLoading = 1080000, // 1080000 miliseconds, 18 minutes (18 minutes + 2 minutes = 20 minutes in activity)
      count = 120, timeRemaining = 120; // 120 seconds to expire the session

  if( pageName.indexOf("step1") != -1 || pageName.indexOf("step2") != -1  || pageName.indexOf("step3") != -1  || pageName.indexOf("step4") != -1){
      timeoutID = window.setTimeout(warningMessage, timeSinceLoading); // display warning window onced reachs 18 minutes after load/click events for step1 to (including) step4
  }

  if( pageName.indexOf("step1") != -1 || pageName.indexOf("step2") != -1  || pageName.indexOf("step3") != -1  || pageName.indexOf("step4") != -1){
    $('body').on('keypress click',  function () {
      window.clearTimeout(timeoutID); // clearing next timeout
      timeoutID = window.setTimeout(warningMessage, timeSinceLoading); // display warning window onced reachs 18 minutes after load/click events for step1 to (including) step4
    })
  }


  function warningMessage(){ // gets called after 18 minutes
    $.fancybox( $('#Warning-Window'), {
      'closeBtn' : false,
      modal: true,
      afterLoad  : function() {
          callCountDown(timeRemaining); // 120 seconds will be counted 
        }
    });
  }

  function callCountDown(orignalCount){

    function timer(){
      count = count-1;
        if (count < 0) {
          clearInterval(counter);
          $.fancybox.close();
          $.fancybox( $('#CountDown-Window'), {
            'closeBtn' : false,
            modal: true,
            beforeShow: function(){
              $(".fancybox-skin").css({
                "background":"#FFC"
              });
              $.ajax({
                type: "POST",
                url: envLocalHost+"/oaa/"+pageName+"/refresh.json",
                cache: false,
                dataType: "json",
                data: $form.serialize()
              })
              .done(function(sData){
                // initialization global var refreshLink to be used in #start-button click handler function
                refreshLink = envLocalHost + sData.data.firstPage;
              })
              .fail(function(textStatus){
                    $("#etErrorBox").html('<div id="error-img" class="information-icon"></div><ul id="error-list"><li>While retrieving data an error has occurred, please try again.</li></ul>');  
              });
            }
          });
          window.clearTimeout(timeoutID); // clearing next timeout
        }
      $('#countdown').text(count);
    }

    counter=setInterval(timer, 1000); //1000 will run it every 1 second        
  }

  $('#resume-button').on("click", function(e){
    $.ajax({
      type: "POST",
      url: envLocalHost+"/oaa/"+pageName+"/pingsession.json",
      cache: false,
      dataType: "json",
      data: $form.serialize()
    });
    $.fancybox.close();
    window.clearInterval(counter);
    window.clearTimeout(timeoutID); // clearing orignal timeout
    count = timeRemaining; // re setting the timer to start in 18 minutes
    timeoutID = window.setTimeout(warningMessage, timeSinceLoading);
  });


  $('#start-button').on("click", function(e){
    $.fancybox.close();
      // consuming global var refreshLink
      if( typeof(refreshLink) == 'undefined' ) {
        window.location.href =  envLocalHost + "/oaa/" + pageName;
      } else {
        window.location.href = refreshLink;
      }
  });

  $('textarea[maxlength]').live('keyup blur', function() {
       // Store the maxlength and value of the field.
       var maxlength = $(this).attr('maxlength');
       var val = $(this).val();

       // Trim the field if it has content over the maxlength.
       if (val.length > maxlength) {
           $(this).val(val.slice(0, maxlength));
       }
  });

	String.prototype.splice = function( idx, rem, s ) {
	return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
	}

	$.validator.addMethod("trioDate", function(value, element) {  
	if (value.match(/^(0[1-9]|1[012])[/|-](0[1-9]|[12][0-9]|3[01])[/|-](19[0-9]{2}|2[0-9]{3})$/)) {
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
	
	
	
	function getCurrentYear(divs){
  	  var today = new Date() 
  	  var year = today.getYear()
  	  if(year<1000) year+=1900
  	  var todayStr =year;			  
  	  if (divs.indexOf(",") != -1) {
	    var aDivs = divs.split(",");
	    var len = aDivs.length;
	    for (var i=0;i<len;i++) {
	      //document.getElementById(aDivs[i]).innerHTML = todayStr;
	      $("#"+aDivs[i]).html(todayStr);
	     } 
	  } else {
	    //document.getElementById(divs).innerHTML = todayStr;
	    $("#"+divs).html(todayStr);
	  }
	}
			    	
function preFillSSN(ssnNumber, isSSNNumberMasked, ssnField, taxIdType) {
	if(ssnNumber != '') {
    	var ssnNumberDecrypt = decryptString(ssnNumber);
    	ssnNumberDecrypt = $.trim(ssnNumberDecrypt);
    	
    	if(taxIdType == 'T') {
    		ssnNumberDecrypt = ssnNumberDecrypt.substr(0, 10);	
    	} else {
    		ssnNumberDecrypt = ssnNumberDecrypt.substr(0, 11);
    	}
    	
    	if(isSSNNumberMasked) {
    		if(primaryTaxIdType == 'T') {
    			ssnNumberDecrypt = 'XXX-XXX-' + ssnNumberDecrypt.substring(5);
    		} else {
    			ssnNumberDecrypt = 'XXX-XX-' + ssnNumberDecrypt.substring(5);
    		}
    	}
    	
    	if( pageName.indexOf("step2") != -1) {
    		$('#' + ssnField).val(ssnNumberDecrypt);
    	} else if( pageName.indexOf("step4") != -1) {
    		if('primarySSNum' == ssnField || 'secondarySSNum' == ssnField) {
    			$('#' + ssnField).val(ssnNumberDecrypt);
    		} else {
    			$('#' + ssnField).text(ssnNumberDecrypt);
    		}    		
    	}
    }	
}
	  
$(function () {	
	var yrs_fut = ['#stockyears0','#bondyears0','#optionsyears0','#futuresyears0','#stockyears1','#bondyears1','#optionsyears1','#futuresyears1'];
    var trades_fut = ['#stockstrades0','#bondstrades0','#optionstrades0','#futurestrades0','#stockstrades1','#bondstrades1','#optionstrades1','#futurestrades1'];
    var avgs_fut = ['#stocksavg0','#bondsavg0','#optionsavg0','#futuresavg0','#stocksavg1','#bondsavg1','#optionsavg1','#futuresavg1'];
    var yrs_fut_join = yrs_fut.join();
    $(yrs_fut_join).change(function(){            
             
    	  yrs_fut_id = "#"+$(this).attr("id");              
          yrs_fut_index = yrs_fut.indexOf(yrs_fut_id);              
          trades_fut_join = trades_fut[yrs_fut_index];
          avgs_fut_join = avgs_fut[yrs_fut_index];
                                  
          if(parseInt($(this).val()) == '0') { 	        	
        	 $(trades_fut_join).val("1");
             $(avgs_fut_join).val("1");
          }
     });
    //$(yrs_fut_join).trigger('change');
    
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
    
    //De-crypt SSN    
    if( pageName.indexOf("step2") != -1) {    	
   		preFillSSN(primarySSNum, primarySSNumMask, 'primarySSNum', primaryTaxIdType);
		
		if(pageName.indexOf("joint") != -1 || pageName.indexOf("custodial") != -1) {
   			preFillSSN(secondarySSNum, secondarySSNumMask, 'secondarySSNum', secondaryTaxIdType);	
    	}
    } else if( pageName.indexOf("step4confirm") != -1) {
   		preFillSSN(primarySSNum, primarySSNumMask, 'step_four_prid', primaryTaxIdType);
   		preFillSSN(primarySSNum, primarySSNumMask, 'primarySSNum', primaryTaxIdType);
		
		if(pageName.indexOf("joint") != -1 || pageName.indexOf("custodial") != -1) {
   			preFillSSN(secondarySSNum, secondarySSNumMask, 'step_four_secid', secondaryTaxIdType);
   			preFillSSN(secondarySSNum, secondarySSNumMask, 'secondarySSNum', secondaryTaxIdType);
    	}
	}
		
	// disable mousewheel on a input number field when in focus
    // (to prevent Cromium browsers change the value when scrolling)
    $('form').on('focus', 'input[type=number]', function (e) {
    	$(this).on('mousewheel.disableScroll', function (e) {
    		e.preventDefault();
    	});

    	//Disable keyup and down for input number as it changes the value.
    	$(this).on('keydown', function(e){
    	    if (e.which == 38 || e.which == 40) {
    	    	e.preventDefault();
    	    }
    	});
	});
	
    $('form').on('blur', 'input[type=number]', function (e) {
    	$(this).off('mousewheel.disableScroll')
    	$(this).off('keydown');
	});   

});