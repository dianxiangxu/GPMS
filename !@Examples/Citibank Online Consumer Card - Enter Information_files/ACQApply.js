/* 20141223RF */
/**
 * ACQApply.js
 * to be used for ACQ Apply Redesign Pages
 */
var globalCookieCheckValue;
$(document).ready(function() {
	/*S-0974586 Correcting Site Catalyst Acquisition Form Field Tracking - Mar 2015 mTPR - Changes Starts*/
	  document.cookie = "fieldNamecookie="+$('#apply_form').attr('name')+":(No Data Entered)";
	  $('a:not(#continue-btn,#continue-btn-esp,#show-addtional-phone)').click(function(){
	    setProp42();
	    });
	  //on blur functionality of form
	  globalCookieCheckValue=true;
	    $('#apply_form').find('input[type="text"]').focusout(function () { 
	    var value=$(this).parent().find('label').find('span.fieldText').html();
	    document.cookie = "fieldNamecookie="+$('#apply_form').attr('name')+":"+ value;
	  });
	    $('#apply_form').find('input[type="checkbox"]').on('change', function() {
	        
	        var id=$(this).attr('id');
	      var value;
	      if(id=="Paperless_Solutions_Checkbox"){
	        value="T&C Check Box1";
	      }
	      else if(id=="DISCLOSURE_SOFTWARE"){
	        value="T&C Check Box2";
	      }
	      else if(id=="DISCLOSURE_READ"){
	        value="T&C Check Box3";
	      }
	      else if(id=="DISC_TERMS_CHECK" || id=="disclousure_marketing"){ 
	        value="T&C Check Box4";
	      }
	      document.cookie = "fieldNamecookie="+$('#apply_form').attr('name')+":"+ value;
	    });
	    $( "select" ).change(function () {
	        var value=$(this).parent().find('label').find('span.fieldText').html();
	        document.cookie = "fieldNamecookie="+$('#apply_form').attr('name')+":"+ value;
	      });
	      /*S-0974586 Correcting Site Catalyst Acquisition Form Field Tracking - Mar 2015 mTPR - Changes Ends*/



			var switchAriaHidden = function(currentSection, toHide) {
				// Find main sections and other modals and change the aria-hidden property to true or false. `toHide` should be a boolean.
				$('#header, #footer, #side-nav, #main-content, .jump_to_main').attr("aria-hidden", toHide);
				$('.overlay').not(currentSection).attr("aria-hidden", toHide);
				$(currentSection).attr("aria-hidden", !toHide);
			};

			var generateTabFence = function(modalBeingOpened) {
				var tabFence = '<div class="tabfence" tabindex="0"></div>',
					modal = $(modalBeingOpened);

				// if tabfences are already done, don't do anything else here.
				if (modal.next(".tabfence").length > 0 && modal.prev(".tabfence").length > 0) {
					return;
				}

				// clean up. remove event handlers and destroy all current tabfences
				$(".tabfence").off('focus').remove();

				// add tabfences on both sides of the modal
				modal.before(tabFence).after(tabFence);

				// apply event listeners to the tabfences
				modal.prev('.tabfence').on('focus', function() {
					redirectFocus(modal, "last");
				});
				modal.next('.tabfence').on('focus', function() {
					redirectFocus(modal, "first");
				});
			};

			var redirectFocus = function(container, firstOrLast) {
				var focusableItems = container.find("a[href], input, textarea, select, button, *[tabindex]").filter(":visible");

				if (firstOrLast == "first") {
					focusableItems.first().focus();
				} else if (firstOrLast == "last") {
					focusableItems.last().focus();
				}
			};

			// Set everything except paperless-overlay to aria-hidden="false". Must be performed before screen reader initializes.
			switchAriaHidden('#paperless-overlay', false);

			// create an offscreenTextReader to house the error message presented in the paperless modal. Has to be done before screen reader initializes.
			$("<span/>", {
				"aria-live": "assertive",
				"class": "visuallyhidden",
				"id": "offscreenTextReader"
			}).appendTo("body");



			$("#main-content").css("min-height", $("#side-nav-content").height() + 200 );
			//*Left Rail Control
				$(window).scroll(function() {
				var elem = "#side-nav";
				var pageHeight = $("body").height() - $("#side-nav-content").height() - 300;

				if($(this).scrollTop() > 160 && $(window).width() > 1015 &&  $(window).height() > 600){
					
						
						if($(this).scrollTop() > pageHeight ){
							$(elem).removeClass("fixed");
							$(elem).css("top", pageHeight);
						} else {
							$(elem).addClass("fixed");
							$(elem).css("top","1px");
						}
					   
				} else if($(this).scrollTop() < 160 ){
						$(elem).removeClass("fixed");

						var mainOffset = $("#main-content").offset();
						
						$(elem).css("top", mainOffset.top);	  
								
				} else if($(this).scrollTop() > 160 && $(window).width() < 1015 || $(window).height() < 600){
						$(elem).removeClass("fixed");

						var currentPosition = $(this).scrollTop();
						
						if($(this).scrollTop() > pageHeight ){
							$(elem).css("top", pageHeight);
						} else {
							$(elem).css("top", currentPosition);	
						}

						 
				}

			});
			

			//initialize tooltips first then error titles (alignment of each)	
			$("#apply_form").tooltip();
			$("body").tooltip("flyout");
			$("#apply_form").validator({"lang" : "en"});

      
			//Click Event Submit/Validate
			$("#submit").click(function(){
				$(".number-with-digit-grouping").val(function (index, value) {
					return value.replace(",", "");
				});
				$("form").validator('validate');
				if ($("form").find(".error-textbox").length > 0){
					$("form").find(".error-textbox").first().focus();
					$(".err-global").show();
					return false;
				}
				else if($("form").find('#phoneNumber_error_container').hasClass('show')){
			          return false;
			    }

				/*S-0974586 Correcting Site Catalyst Acquisition Form Field Tracking - Changes Starts*/
		        else{
		          globalCookieCheckValue=false;
		         }

			});

			//Overlay
			$("#paperless-overlay").overlay({
			   
				mask: {
				color: 'black',
				loadSpeed: 200,
				opacity: 0.6
				},
				fixed: false,
				closeOnClick: false,
				closeOnEsc: true,
				
				onBeforeLoad: function(evt) {
					$('#paperless1, #paperless2').prop('checked', false);
					$('#err-paperless').hide();
					$("#offscreenTextReader").html('');
					$("#Paperless_Solutions_Checkbox").attr("checked",false);
					generateTabFence("#paperless-overlay");
					switchAriaHidden("#paperless-overlay", true);
				},
				onLoad: function(evt) {
					redirectFocus($("#paperless-overlay"), "first");
				},
				onBeforeClose: function(evt) {
					switchAriaHidden("#paperless-overlay", false);
				},
				onClose: function(evt) {
					$("#Paperless_Solutions_Checkbox").focus();
					$("#offscreenTextReader").html('');
					$("#err-paperless").hide();
				}
			});



			//Buttons with custom events

			/* OVERLAY in English and Spanish */
			$("#continue-btn, #continue-btn-esp").click(function(evt){
				// jQuery event fix to help IE
				evt = $.event.fix(evt);
				evt.preventDefault();
			
				 if ($("input:radio[name='paperless-choice']:checked").val() == "agree"){
					$("#Paperless_Solutions_Checkbox").attr("checked",true);
					$("#paperless-overlay").overlay().close();

				 } else if ($("input:radio[name='paperless-choice']:checked").val() == "disagree"){

					$("#Paperless_Solutions_Checkbox").attr("checked",false);
					$("#paperless-overlay").overlay().close();

				 } else {
					$("#err-paperless").show();
					$("#offscreenTextReader").html($("#err-paperless").html());
					$("#paperless1").focus();
					return false;
				 }
				
			});

			$("#Paperless_Solutions_Checkbox").click(function(){
				if($("#Paperless_Solutions_Checkbox").attr("checked")){
					$("#paperless-overlay").overlay().load();
				} else {
					$("input:radio[name='paperless-choice']").prop("checked", false);

				}
			});

			$("#paperless-overlay .close").click(function(evt){
				// jQuery event fix to help IE
				evt = $.event.fix(evt);
				evt.preventDefault();
				$("#Paperless_Solutions_Checkbox").attr("checked",false);
				$("#paperless-overlay").overlay().close();
			});
			/* OVERLAY END*/

			$(".hidden").addClass("none");

      var commafy = function (number) {
        // Format number
        return number
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
      
      if (typeof window.siteId !== "undefined" && window.siteId === "SEARS") {
        $("#THD_GROSS_ANN_HOUSE_INCOME").addClass("number-with-digit-grouping").attr("citival", "9").attr("maxlength", "7");
      }

      $(".number-with-digit-grouping").on("keyup keydown", function (event) {
        // Skip arrow keys
        if (!(event.which >= 37 && event.which <= 40)) {
          $(this).val(function (index, value) {
            return commafy(value);
          });
        }
      });

			$("#THD_DOB_REQ_3-citiTextBlur").attr("citimax",  (new Date).getFullYear() );
			
			$("#PHOTO_EXPIRATION_3").attr("citimin",  (new Date).getFullYear() );
			
			$("#PHOTO_EXPIRATION_3").attr("citimax",  "3000" );
			
			$("#YEARS_IN_BUSINESS").attr("citimax",  (new Date).getFullYear() );
			
			$("#YEARS_IN_BUSINESS").attr("citimin", "1890");

			/* open popup-window */
			$('a.popup-window').click(function(event){
				event.preventDefault();
				var direct = $(this).attr('href');
				window.open(direct);
			});
			
			// Show/Hide benefit details
			$("#show-addtional-phone").click(function (evt) {
		 
				$("#addtional-phone-numbers").addClass("visible").removeClass("hidden none");
				$("#show-addtional-phone").hide();
				redirectFocus($("#addtional-phone-numbers .inputContainer"), "first");
				evt.preventDefault();
			});
			
			$("#show-additional-phone-business").click(function (evt) {
				 
				$("#additional-phone-numbers-business").addClass("visible").removeClass("hidden none");
				$("#show-additional-phone-business").hide();
				redirectFocus($("#additional-phone-numbers-business .inputContainer"), "first");
				evt.preventDefault();
			});		
			$("#show-additional-phone-auth").click(function (evt) {
		 
				$("#additional-phone-numbers-auth").addClass("visible").removeClass("hidden none");
				$("#show-additional-phone-auth").hide();
				redirectFocus($("#additional-phone-numbers-auth .inputContainer"), "first");
				evt.preventDefault();
			});

			 
		});
// SEARS
$('#pending-return-btn1').click(function(e){ 
    e.preventDefault(); 
    $('#shopnow_speedbump_modal').css("display","block"); 
    $('.accessible_modal_overlay').css("display","block"); 
});         
$('#apply_form_Sears').submit(function(e){ 
    e.preventDefault(); 
    $('#shopnow_speedbump_modal').css("display","none"); 
    $('.accessible_modal_overlay').css("display","none"); 
    window.open('http://www.sears.com'); 
            
});         
$('#no-thanks-btn').click(function(e){ 
    e.preventDefault(); 
    $('#shopnow_speedbump_modal').css("display","none"); 
    $('.accessible_modal_overlay').css("display","none"); 

            
});

$('#pending-return-btn-ESP1').click(function(e){ 
    e.preventDefault(); 
    $('#shopnow_speedbump_modal').css("display","block"); 
    $('.accessible_modal_overlay').css("display","block"); 
});         
$('#apply_form_Sears').submit(function(e){ 
    e.preventDefault(); 
    $('#shopnow_speedbump_modal').css("display","none"); 
    $('.accessible_modal_overlay').css("display","none"); 
    window.open('http://www.sears.com'); 
            
});         
$('#no-thanks-btn').click(function(e){ 
    e.preventDefault(); 
    $('#shopnow_speedbump_modal').css("display","none"); 
    $('.accessible_modal_overlay').css("display","none"); 

            
});

  /* autoTab handling function */
  function autoTab(field1, len, field2, e) {
	// if (e.which && e.which != "9" && e.which != "16") {
	// 	if (document.getElementById(field1).value.length == len) {
	// 		document.getElementById(field2).focus();
	// 	}
	// } else if (e.keyCode && e.keyCode != "9" && e.keyCode != "16") {   
	// 	if (document.getElementById(field1).value.length == len) {
	// 		document.getElementById(field2).focus();
	// 	}
	// }

	// disabling autotabbing
	return;
}
  
  function toggleCitiReqAttr($el) {
		if ($el.attr('citireqerror')) {
			$el.attr({
				"citireqerror_not": $el.attr("citireqerror")
			})
			$el.removeAttr("citireqerror");
		} 
		else if ($el.attr('citireqerror_not')) {
			$el.attr({
				"citireqerror": $el.attr("citireqerror_not")
			})
			$el.removeAttr("citireqerror_not");
		}
	}