/* 20141215RF */
/*

* Validation Rules

* citival = 0 - ALPHA NO SPACE

* citival = 6 - ADDRESS

* citival = 7 - SUITE

* citival = 8 - NUMERIC

* citival = 9 - NUMERIC WITH DECIMAL GROUPING

* citival = 20 - USER ID

* citival = 1 - ALPHA WITH SPACE

* citival = 99 - EMAIL VALIDATION

* citival = 100 - CONFIRM EMAIL VALIDATION

* citival = 32 - BB_MEMBER_ID VALIDATION

* citival = 55 - YEAR W/MIN and MAX

*

*/

(function($) {

	var lang = "en",

		form; /** LABELS FOR TEXT FIELDS - USES ID TO RELATE TO VALUE**/
		/*delivered on 5-15-2015*/
var flag=1;
	labels = {

		"REFERENCE_NBR": "Invitation Number",

		/** PERSONAL SECTION **/

		"THD_EMAIL-citiTextBlur": "Email Address",

		"BB_EMAIL-citiTextBlur": "Email Address",

		"BB_MEMBER_ID": "Rewards ID",

		"FIRST_NAME": "First Name",

		"MIDDLE_INITIAL": "Middle Intitial",

		"LAST_NAME": "Last Name",

		"SUFFIX": "Suffix",

		"ADDRESS_LINE1": "Street Address",

		"THD_APT_SUITE": "Apt./Suite",

		/* Ocean June Alteration: add citiTextBlur ID */

		"ZIP-citiTextBlur": "ZIP Code",

		/* End Ocean June Alteration */

		"CITY": "City",

		"STATE": "State",

		"HOME_PHONE_NBR_1": "Home Phone Number",

		"HOME_PHONE_NBR_2": "Home Phone Number",

		"HOME_PHONE_NBR_3": "Home Phone Number",

		"MOBILE_PHONE_NBR_1": "Mobile Phone Number",

		"MOBILE_PHONE_NBR_2": "Mobile Phone Number",

		"MOBILE_PHONE_NBR_3": "Mobile Phone Number",

		"BUSINESS_PHONE_1": "Business Phone Number",

		"BUSINESS_PHONE_2": "Business Phone Number",

		"BUSINESS_PHONE_3": "Business Phone Number",

		/*FINANCIAL SECTION*/

		"THD_GROSS_ANN_HOUSE_INCOME": "Annual Salary and Wages",

		"OTHER_ANNUAL_INCOME": "Other Annual Income",

		"MRTG_RENT_AMT": "Monthly Mortgage or Rent Payment",

		"RESIDENCE_TYPE": "Residence Status",

		/* Razorfish - Begin New */

		"TIME_AT_RESIDENCE_1": "Years at Residence",

		"TIME_AT_RESIDENCE_2": "Months at Residence",

		/* Razorfish - End New */

		/*SECURITY SECTION*/

		"THD_DOB_REQ_1-citiTextBlur": "Month of Birth",

		"THD_DOB_REQ_2-citiTextBlur": "Day of Birth",

		"THD_DOB_REQ_3-citiTextBlur": "Year of Birth",

		"PL_SSN_1-citiTextBlur": "Social Security Number",

		"PL_SSN_2-citiTextBlur": "Social Security Number",

		"PL_SSN_3-citiTextBlur": "Social Security Number",

		"PHOTO_ID_TYPE": "Photo ID Type",

		"NUMBER-citiTextBlur": "Driver's License or Photo ID Number",

		/* Razorfish - Begin New */

		"PHOTO_STATE": "State",

		"PHOTO_EXPIRATION_1": "Photo ID Expiration Date",

		"PHOTO_EXPIRATION_2": "Photo ID Expiration Date",

		"PHOTO_EXPIRATION_3": "Photo ID Expiration Date" /* Razorfish - End New */

	};

	/** Validation Rules **/

	var isAlpha = function(str) {

			var re = /[^a-zA-Z\s]/g;

			if (re.test(str)) return false;

			return true;

		};

	var isEmpty = function(str) {

			if ((str == "") || (str.length == 0)) {

				return false;

			} else {

				return true;

			}

		};

	var isEmail = function(str) {

			var val = $.trim(str);

			if (val.length <= 0) return true;

			var splitted = str.match(/^([a-zA-Z\d\.\_]+)@([a-zA-Z\d\S]+)$/);

			if (splitted == null) return false;

			if (splitted[1] != null) {

				var regexp_user = /^\"?[\w*-_\.]*\"?$/;

				if (splitted[1].match(regexp_user) == null) return false;

			}

			if (splitted[2] != null) {

				var regexp_domain = /^[\w-\.]+\.[A-Za-z]{2,4}$/;

				if (splitted[2].match(regexp_domain) == null) {

					var regexp_ip = /^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;

					if (splitted[2].match(regexp_ip) == null) return false;

				}

				return true;

			}

			return false;

		};

	var isNumeric = function(str) {

			var re = /^[\d]+$/g

			if (re.test(str) && str.length > 0) {

				return true;

			} else {

				return false;

			}

		}; /* Ocean June Alteration: Add RewardsId */

	var isRewardsId = function(str) {

			var re = /^[\d]+$/g

			return (re.test(str) && str.length > 0)

		}; /* End Ocean June Alteration */

	var isNumericWithDigitGrouping = function(str) {

			var re = /^[\d]+$/g
			
			str = str.replace(",","");
			
			if (re.test(str) && str.length > 0) {

				return true;

			} else {

				return false;

			}

		};

	var isNumericMinMax = function(str, max, min) {

			var re = /^[0-9]+$/;

			if (re.test(str) && str.length > 0) {

				if (parseInt(str, 10) <= max && parseInt(str, 10) >= min) {

					return true;

				} else {

					return false;

				}

			} else {

				return false;

			}

		};

	var isPastDate = function(date) {

			var currDate = new Date();

			if (currDate > date) {

				return false;

			} else {

				return true;

			}

		}; /* Razorfish - Begin New */

	var isExpired = function(date) {

			return (date < new Date());

		}; /* Razorfish - End New */

	var isValidDate = function(enteredDate, month) {
		//Implemented 18 years age validation as part of June 2015 mTPR - S1010212 - DOB Field Level Validation
		/*delivered on 5-15-2015*/
		/*change implemented in DOB validation for defect NO 13385*/
var entMonth = enteredDate.getMonth();
		if (entMonth != month) {

				return true;

			} else {

						if(flag==0){
			
		var enteredDate = enteredDate;
		var d2 = new Date();
		var diff = d2.getTime() - enteredDate.getTime();
		var ageValue = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
		if(ageValue >= 18 ){
		return false;
		}
		else{
		return true;
		}
	}
	else{
		return false;
	}

			}

		};

	var isAlphaSpace = function(str) {

			var re = /[^a-zA-Z-\s]/g;

			if (re.test(str)) return false;

			return true;

		};

	var isAlpha = function(str) {

			var re = /[^a-zA-Z]/g;

			if (re.test(str)) return false;

			return true;

		};

	var isAlphaNumeric = function(str) {

			var re = /[^a-zA-Z0-9\s]/g;

			if (re.test(str)) return false;

			return true;

		};

	var isAlphaNumericNoSpace = function(str) {

			var re = /[^a-zA-Z0-9]/g;

			if (re.test(str)) return false;

			return true;

		};

	var isAddress = function(str) {

			var re = /[^A-Za-z0-9\s\.\,#'\/]/g;

			if (re.test(str)) return false;

			return true;

		};

	var isSuite = function(str) {

			var re = /[^A-Za-z0-9.,#\s\-\/]/g;

			if (re.test(str)) return false;

			return true;

		};

	var isSuiteDr = function(str) {
		var re="";
		if(isMcyBlm()){
			 re = /[^A-Za-z0-9.\s\-]/g;
		}
		else{
			 re = /[^A-Za-z0-9.,\s\-\/]/g;
		}
			

			if (re.test(str)) return false;

			return true;

		};

	var isUser = function(str) {

			var re = /[^A-Za-z0-9@._]/;

			if (re.test(str)) return false;

			return true;

		};

	var isMcSrcCd = function(str) {

			var re = /[^a-zA-Z0-9]/g;

			if (re.test(str)) return false;

			return true;

		};

	var isValidPass = function(str) {

			var re = /[^A-Za-z0-9?$&%#\^!@._()]/;

			if (re.test(str)) return false;

			return true;

		};

	var CheckForAlphaNumeric = function(str) {

			var reAlpha = /[A-Za-z]/;

			var reNumeric = /[0-9]/;

			if (!reAlpha.test(str) || !reNumeric.test(str)) return false;

			return true;

		};

	var useridInPass = function(str) {

			var re = new RegExp($("#USER_ID").val());

			if (re.test(str)) return false;

			return true;

		};

	var isMatch = function(str1, str2) {

			if (str1 == str2) return true;

			return false;

		};

	var getMessageMinLength = function(elem, lang) {

			return elem.attr("citiminlengtherror");

		};

	var isExactLength = function(val, elem) {

			var isExact = String(val.length) == elem.attr("citiminlength");

			return isExact;

		};

	var bbCheck;

	var isBestBuy = function() {

			// only check for the 'bb' class once and save the result

			if (bbCheck === undefined) bbCheck = $("#main-content").hasClass('BB');

			return bbCheck;

		};
		
	var mcCheck;
		
	var isMcyBlm = function() {

		// only check for the 'bb' class once and save the result

		if (mcCheck === undefined) mcCheck = $("#main-content").hasClass('MC');

		return mcCheck;

	};

	var emulatePlaceholder = function (mode) {

		// Return if the browser supports placeholders natively

		if (typeof document.createElement('input').placeholder === 'string') {

			return false;

		}

		mode = mode.toLowerCase();

		if (mode !== 'set' && mode !== 'clear') {

			return false;

		}

		form.find('input[type="text"]').each(function () {

			var input = $(this);

			if (!!input.attr('placeholder')) {

				switch (mode) {

					case 'set':

						// if the input's vlaue is blank set it to the placeholder

						if (input.val() === '') {

							input.val(input.attr('placeholder'));

						}

						break;

					case 'clear':

						// if the input's vlaue is still equal to the placeholder value clear the value

						if (input.val() === input.attr('placeholder')) {

							input.val('');

						}

						break;

				}

			}

		});

		return true;

	};

	var checkField = function(elem, elemError, masked) {

			// If a field is blank, remove .valid

			if ((elem.is("input[type=text]") || elem.is("input[type=password]")) && elem.val().length == 0) {

				elem.removeClass('valid');
				if( isMcyBlm() && ((elem.attr("id")=="HOME_PHONE_NBR_1-citiTextBlur")||( elem.attr("id")=="HOME_PHONE_NBR_2-citiTextBlur")||( elem.attr("id")=="HOME_PHONE_NBR_3")||( elem.attr("id")=="MOBILE_PHONE_NBR_1-citiTextBlur")||( elem.attr("id")=="MOBILE_PHONE_NBR_2-citiTextBlur")||( elem.attr("id")=="MOBILE_PHONE_NBR_3")||( elem.attr("id")=="BUSINESS_PHONE_1-citiTextBlur")||( elem.attr("id")=="BUSINESS_PHONE_2-citiTextBlur")||( elem.attr("id")=="BUSINESS_PHONE_3"))){ 
						elem.removeClass('error-textbox');
						$("#phoneNumber_error_container").removeClass('show');
				 }

			} /** MIN LENGTH VALIDATION **/

			if (masked[1] != undefined && masked[1] == "citiTextBlur") { /* Razorfish - Modififed Next Line */

				// if (elem.attr("citiinvaliderror") != undefined ){

				if ((elem.attr('citireq') == 'true' && elem.attr("citiinvaliderror") != undefined) || (elem.attr("citiinvaliderror") != undefined)) { /* Added for TR#INC0016072438 */

					if (elem.val().length != 0 && elem.attr("citival") == "20" && !isUser($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length != 0 && elem.attr("citival") == "21" && !isMcSrcCd($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length && elem.attr("citival") == "55") {

						if (!isNumericMinMax(elem.val(), elem.attr("citiminval"), elem.attr("citimaxval"))) {

							failed(visibleID, elemError, "citiinvaliderror");

						}

					} else if (elem.val().length != 0 && elem.attr("citival") == "99" && !isEmail($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length != 0 && elem.attr("citival") == "100") {
						/* Confirm Email Validation */
						
						// get the value of the unmasked version of this element
						var thisValue = $.trim($("#" + masked[0]).val());

						// get the value of the element referenced in the `citimatch` attribute of this field
						var comparedValue = $("#" + $(elem).attr('citimatch')).val();

						// first check to ensure the structure is valid
						if (!isEmail(thisValue)) {
							failed(elem, elemError, "citiinvaliderror");
						// then compare with other field
						} else if (!isMatch(thisValue, comparedValue)) {
							failed(elem, elemError, "citimatcherror");
						} else {
						// for some reason, we have to explicitly pass this
							passed(elem, elemError);
						}

					} else if (elem.val().length != 0 && elem.attr("citival") == "1" && !isAlphaSpace($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length != 0 && elem.attr("citival") == "2" && !isAlphaSpace($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length != 0 && elem.attr("citival") == "3" && elem.attr("citimax") != undefined && elem.attr("citimin") != undefined) {

						var count = 0;

					var month = "";

						var day = "";

						var year = "";

						var visibleID = "";

						elem.parent().find("input[type='hidden']").each(function(event) {

							visibleID = $("#" + $(this).attr("id") + "-citiTextBlur");

							if (isNumeric($.trim($(this).val())) && $.trim($(this).val()).length >= visibleID.attr("citiminlength") && isNumericMinMax($(this).val(), visibleID.attr("citimax"), visibleID.attr("citimin"))) {

								//Removes error if field passed numeric and minlength

								passed(visibleID, elemError, false);

								count++;

								if (count == 1) {

									month = $(this).val();

								} else if (count == 2) {

									day = $(this).val();

								} else {

									year = $(this).val();

								}

								if (count == 3) {

									var enteredDate = new Date(year, month - 1, day);
									/*delivered on 5-15-2015*/
									flag=0;
									if (isValidDate(enteredDate, month - 1)) {

										elem.parent().find("input[type='text']").each(function(event) {

											failed($(this), elemError, "citimaxerror");

										});

									} else if (isPastDate(enteredDate)) {

										elem.parent().find("input[type='text']").each(function(event) {

											failed($(this), elemError, "citimaxerror");

										});

									} else {

										elem.parent().find("input[type='text']").each(function(event) {

											passed($(this), elemError, "citimaxerror");

										});

									}

								}

							} else if (!isNumericMinMax($(this).val(), $(this).attr("citimax"), $(this).attr("citimin")) && $(this).val().length != 0) {

								failed(visibleID, elemError, "citimaxerror");

							} else if ($.trim($(this).val()).length >= visibleID.attr("citiminlength")) {

								failed(visibleID, elemError, getMessageMinLength(elem, lang));

							} else if ($(this).val().length != 0) {

								failed(visibleID, elemError, "citiinvaliderror");

							}

						});

					} else if (elem.val().length != 0 && elem.attr("citival") == "3" && !isNumeric($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length != 0 && elem.attr("citival") == "12" && !isNumeric($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length != 0 && elem.attr("citival") == "13" && !isAlphaNumeric($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length != 0 && elem.attr("citival") == "4" && !isAlphaNumeric($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length != 0 && elem.attr("citival") == "0" && !isAlpha($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length != 0 && elem.attr("citival") == "6" && !isAddress($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length != 0 && elem.attr("citival") == "7" && elem.attr("id") == 'NUMBER-citiTextBlur' && !isSuiteDr($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length != 0 && elem.attr("citival") == "7" && !isSuite($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length != 0 && elem.attr("citival") == "8" && !isNumeric($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.val().length != 0 && elem.attr("citival") == "32" && !isRewardsId($.trim($("#" + masked[0]).val()))) {

						failed(masked, elemError, "citiinvaliderror");

					} else if (elem.attr("citiminlength") != undefined && elem.val().length != 0 && $.trim(elem.val()).length < elem.attr("citiminlength")) {

						failed(elem, elemError, getMessageMinLength(elem, lang));

					} else if ($.trim(elem.val().length) != 0) {

						passed(elem, elemError);

						if (elem.parent().children("input").length > 1) {

							$(this).parent().find(".check").remove();

							var passedFields = 0;

							elem.parent().find("input").each(function(index) {

								if ($.trim($(this).val().length) != 0 && !$(this).hasClass("error-textbox")) {

									passedFields++;

									if (passedFields == elem.parent().children("input").length) {

										if (elem.parent().find('.check').length === 0) {

											$(this).parent().append('<span class="float-left check"></span>');

										}

									} else {

										$(this).parent().find(".check").remove();

									}

								}

							});

						}

					} else if (elem.val().length == 0) {

						elem.parent().find(".check").remove();

					}

				}

			} //else if (elem.attr("citiinvaliderror") != undefined || elem.attr("citireqerror") != undefined || elem.attr("citispecialerror") != undefined){

			else if (elem.val() != elem.attr('placeholder') && (elem.attr("citiinvaliderror") != undefined || elem.attr("citireqerror") != undefined || elem.attr("citispecialerror") != undefined)) { /* Razorfish - Begin New */

				// grouped fields validation

				if ( !! elem.attr('citigroup')) {

					// determine if the group has a minimum or maximum required value

					var groupval = 0,

						groupmin = (!isNaN(parseInt(elem.attr('citigroupmin'), 10))) ? parseInt(elem.attr('citigroupmin'), 10) : 'none',

						groupmax = (!isNaN(parseInt(elem.attr('citigroupmax'), 10))) ? parseInt(elem.attr('citigroupmax'), 10) : 'none',

						groupInputs = $('input[citigroup="' + elem.attr('citigroup') + '"]');

					// validate group's value against min or max if necessary

					if (groupmin != 'none' || groupmax != 'none') {

						// determine the current value of the group

						// by looping through all the elements...

						groupInputs.each(function() {

							// ...checking if the element has a valid numeric value...

							if (!isNaN(parseInt($(this).val(), 10))) {

								//...and incrementing the group's current value

								groupval += parseInt($(this).val(), 10);

							}

						});

						// if the group's value isn't within range

						if (groupval < groupmin || groupval > groupmax) {

							// if an attempt to submit the form has been made

							if (elem.attr('citisubmitted') === 'true') {

								// display the error message and discontinue any further validation

								failed(elem, elemError, "citiinvaliderror");

								return;

							} else {

								//clear a checkmark if present but don't fail the field

								elem.parent().find(".check").remove();

							}

						}

						// if the group's value is within range and the element's not flagged for rechecking

						else if (!elem.attr('citigrouprecheck')) {

							// pass the element we're checking

							passed(elem, elemError);

							// loop through all elements in the group

							groupInputs.each(function() {

								// if the element is not the element we're currently rechecking

								if ($(this).attr('id') != elem.attr('id')) {

									// flag it for re-checking, clear any errors, and check the field again

									$(this)
										.removeClass('error-textbox')
										.addClass('textbox')
										.attr('citigrouprecheck', true);

									checkField($(this), elemError, masked);

								}

							});

						}

						// if the group's value is within range and the element's flagged for rechecking

						else if (elem.attr('citigrouprecheck')) {

							// remove the recheck flag

							elem.removeAttr('citigrouprecheck');

						}

					}

				} /* Razorfish - End New */

				if (elem.val().length != 0 && elem.attr("citival") == "55") {

					if (!isNumericMinMax(elem.val(), elem.attr("citimax"), elem.attr("citimin"))) {

						failed(elem, elemError, "citiinvaliderror");

					} else {

						passed(elem, elemError);

					}

				} else if (elem.val().length != 0 && elem.attr("citival") == "20" && !isUser($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "21" && !isMcSrcCd($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "99" && !isEmail($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "1" && !isAlphaSpace($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "2" && !isAlphaSpace($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "3" && elem.attr("citimax") != undefined && elem.attr("citimin") != undefined) {

					var count = 0;

					var month = "";

					var day = "";

					var year = "";

					var visibleID = "";

					elem.parent().find("input[type='text']").each(function(event) {

						if (isNumeric($.trim($(this).val())) && $.trim($(this).val()).length >= $(this).attr("citiminlength") && isNumericMinMax($(this).val(), $(this).attr("citimax"), $(this).attr("citimin"))) {

							//Removes error if field passed numeric and minlength

							passed($(this), elemError, false);

							count++;

							if (count == 1) {

								month = $(this).val();

							} else if (count == 2) {

								day = $(this).val();

							} else {

								year = $(this).val();

							}

							if (count == 3) {

								var enteredDate = new Date(year, month - 1, day);
								/*delivered on 5-15-2015*/
								flag=1;
							
								if (isValidDate(enteredDate, month - 1)) {

									elem.parent().find("input[type='text']").each(function(event) {

										failed($(this), elemError, "citimaxerror");

									});

								} /* Razorfish - Begin New */

/* else if(isPastDate(enteredDate)){



											  elem.parent().find("input[type='text']").each(function (event) {



													failed($(this),elemError,"citimaxerror");



											  });



											} */

								// if this is an expiration date (based on the field name)

								else if (elem.attr('name').search(/^.*expir(e|es|ed|ation)+.*$/i) > -1) {

									if (isExpired(enteredDate)) {

										elem.parent().find("input[type='text']").each(function(event) {

											failed($(this), elemError, "citiminerror");

										});

									} else {

										elem.parent().find("input[type='text']").each(function(event) {

											passed($(this), elemError, "citimaxerror");

										});

									}

								} /* Razorfish - End New */

								else {

									elem.parent().find("input[type='text']").each(function(event) {

										passed($(this), elemError, "citimaxerror");

									});

								}

							}

						} else if (!isNumericMinMax($(this).val(), $(this).attr("citimax"), $(this).attr("citimin")) && $(this).val().length != 0) {

							failed($(this), elemError, "citimaxerror");

						} else if ($.trim($(this).val()).length >= $(this).attr("citiminlength")) {

							failed($(this), elemError, getMessageMinLength(elem, lang));

						} else if ($(this).val().length != 0) {

							failed($(this), elemError, "citiinvaliderror");

						}

					});

				} else if (elem.val().length != 0 && elem.attr("citival") == "3" && !isNumeric($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "9" && !isNumericWithDigitGrouping($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "12" && !isNumeric($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "13" && !isAlphaNumeric($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "4" && !isAlphaNumeric($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "0" && !isAlpha($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "6" && !isAddress($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "7" && elem.attr("id") == 'NUMBER-citiTextBlur' && !isSuiteDr($.trim(elem.val()))) {

					failed(masked, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "7" && !isSuite($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "8" && !isNumeric($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "32" && !isRewardsId($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} else if (elem.attr("citiminlength") != undefined && elem.val().length != 0 && $.trim(elem.val()).length < elem.attr("citiminlength")) {

					failed(elem, elemError, getMessageMinLength(elem, lang));

				} else if (elem.val().length != 0 && elem.attr("citival") == "23" && !isExactLength($.trim(elem.val()), elem)) {

					failed(elem, elemError, "citispecialerror");

				} else if (elem.val().length != 0 && elem.attr("citival") == "23" && !isNumeric($.trim(elem.val()))) {

					failed(elem, elemError, "citiinvaliderror");

				} /* PASSWORD VALIDATION ONLY */

				else if (elem.is("input[type=password]")) {

					var topPassword;

					var bottomPassword;

					if ($("#" + elem.attr("rel")).hasClass("bottom")) {

						topPassword = elem;

						bottomPassword = $("#" + elem.attr("rel"));

					} else {

						bottomPassword = elem;

						topPassword = $("#" + elem.attr("rel"));

					}

					if (!isValidPass(elem.val())) {

						failed(elem, elemError, "citispecialerror");

						topPassword.parent().find(".check").remove();

						bottomPassword.parent().find(".check").remove();

					} else if (!CheckForAlphaNumeric(elem.val())) {

						failed(elem, elemError, getMessageMinLength(elem));

						topPassword.parent().find(".check").remove();

						bottomPassword.parent().find(".check").remove();

					} else if (!useridInPass(elem.val()) && $("#USER_ID").val().length != 0) {

						failed(elem, elemError, "citiusererror");

						topPassword.parent().find(".check").remove();

						bottomPassword.parent().find(".check").remove();

					} else {

						if (elem.val().length === 0) {

							passed(elem, elemError, "citispecialerror");

							elem.parent().find(".check").remove();

						} else {

							passed(elem, elemError, "citispecialerror");

						}

						if (elem.val().length != 0 && $("#" + elem.attr("rel")).val().length == 0 && !$("#" + elem.attr("rel")).hasClass("error-textbox")) {

							passed(elem, elemError);

							passed($("#" + elem.attr("rel")), $("#" + elem.attr("rel")).parent().children("label").children(".err-msg"), false);

							elem.parent().find(".check").remove();

							$("#" + elem.attr("rel")).parent().find(".check").remove();

						} else if (elem.val().length != 0 && $("#" + elem.attr("rel")).val().length == 0) {

							elem.parent().find(".check").remove();

						} else if (elem.val().length == 0 && $("#" + elem.attr("rel")).val().length != 0) {

							$("#" + elem.attr("rel")).parent().find(".check").remove();

						} else if (elem.val().length != 0 && $("#" + elem.attr("rel")).val().length != 0) {

							if (!isMatch($("#" + elem.attr("rel")).val(), elem.val())) {

								failed_password(bottomPassword, topPassword);

							} else {

								passed_password(bottomPassword, topPassword);

								if ($.trim(topPassword.val()).length == 0 || $.trim(bottomPassword.val()).length == 0) {

									topPassword.parent().find(".check").remove();

									bottomPassword.parent().find(".check").remove();

								}

							}

						}

					}

				} /* PASSWORD VALIDATION END */

				else if ($.trim(elem.val()).length != 0 && !elem.is("input[type=password]")) {

					passed(elem, elemError);

					if (elem.parent().children("input").length > 1) {

						$(this).parent().find(".check").remove();

						var passedFields = 0;

						elem.parent().find("input").each(function(index) {

							if ($.trim($(this).val().length) != 0 && !$(this).hasClass("error-textbox")) {

								passedFields++;

								if (passedFields == elem.parent().children("input").length) {

									if (elem.parent().find('.check').length === 0) {

										$(this).parent().append('<span class="float-left check"></span>');

									}

								} else {

									$(this).parent().find(".check").remove();

								}

							}

						});

					}

				} else if ($.trim(elem.val()).length == 0 && !elem.attr('citigroup')) {

					elem.parent().find(".check").remove();

				}

			}

		} /** Error Styling  DEFAULT **/

	var failed = function(elem, elemError, errMsg) {
			// Razorfish modification: here we're defining our accessibleErrorMessage variable. If it doesn't exist, it'll add nothing to the error states below. If it does, we'll get "Error: "
			var accessibleErrorMessage = "";

			try {
				accessibleErrorMessage = '<span class="visuallyhidden">' + window.citi.form_messages.accessible_error_warning + ' ' + "</span>";
			} catch(err) {}

			// Razorfish modification: Here we're going to check if the old error message and the new error message are different. If they are, then we'll continue with what's below. If they aren't, we'll break out of this function.

			if (isSameError(elem, elemError, errMsg)) {
				return;
			}

			//Added for FFIEC Compliance -  Checks to see if an array was returned instead of a string

			if (elem[1] != undefined) {

				elem = $("#" + elem[0] + "-" + elem[1]);

			}

			elem.removeClass('valid');
			elem.attr('aria-invalid', 'true');

			//Changes form to error mode

			elem.removeClass("textbox");

			elem.addClass("error-textbox");

			//Removes checkmark

			elem.parent().find(".check").remove();

			elem.parent().find(".select-check").remove();

			//Adds error message and shows the error

			elemError.removeClass("hide"); /* Razorfish - Modified Next Line */

			//if (errMsg == "citiinvaliderror" || errMsg == "citireqerror" || errMsg == "citimaxerror" || errMsg == "citispecialerror" || errMsg == "citiusererror"  ){

			if(isMcyBlm() && ((elem.attr("id")=="HOME_PHONE_NBR_1-citiTextBlur")||( elem.attr("id")=="HOME_PHONE_NBR_2-citiTextBlur")||( elem.attr("id")=="HOME_PHONE_NBR_3")||( elem.attr("id")=="MOBILE_PHONE_NBR_1-citiTextBlur")||( elem.attr("id")=="MOBILE_PHONE_NBR_2-citiTextBlur")||( elem.attr("id")=="MOBILE_PHONE_NBR_3")||( elem.attr("id")=="BUSINESS_PHONE_1-citiTextBlur")||( elem.attr("id")=="BUSINESS_PHONE_2-citiTextBlur")||( elem.attr("id")=="BUSINESS_PHONE_3"))){ 
					
				if (errMsg == "citiinvaliderror" || errMsg == "citireqerror" || errMsg == "citiminerror" || errMsg == "citimaxerror" || errMsg == "citispecialerror" || errMsg == "citiusererror" || errMsg == "citimatcherror") {

					if( (elem.attr("id")=="MOBILE_PHONE_NBR_1-citiTextBlur")||( elem.attr("id")=="MOBILE_PHONE_NBR_2-citiTextBlur")||( elem.attr("id")=="MOBILE_PHONE_NBR_3")||( elem.attr("id")=="BUSINESS_PHONE_1-citiTextBlur")||( elem.attr("id")=="BUSINESS_PHONE_2-citiTextBlur")||( elem.attr("id")=="BUSINESS_PHONE_3")){
						$('#phoneNumber_error_container').html('<img src="/cards/acq/acq/img/genericACQ/error-icon.png" alt=""/> <span>' + accessibleErrorMessage +$("#HOME_PHONE_NBR_1-citiTextBlur").attr(errMsg)+ '</span> ');

					}else{
						$('#phoneNumber_error_container').html('<img src="/cards/acq/acq/img/genericACQ/error-icon.png" alt=""/> <span>' + accessibleErrorMessage + ' ' + elem.attr(errMsg) + '</span> ');

					}
        
				} else {

					$('#phoneNumber_error_container').html('<img src="/cards/acq/acq/img/genericACQ/error-icon.png" alt=""/> <span>' + accessibleErrorMessage + ' ' + errMsg + '</span> ');

				}
				$('#phoneNumber_error_container').removeClass('hidden').addClass('show error err-msg'); 
			}else{
				if (errMsg == "citiinvaliderror" || errMsg == "citireqerror" || errMsg == "citiminerror" || errMsg == "citimaxerror" || errMsg == "citispecialerror" || errMsg == "citiusererror" || errMsg == "citimatcherror") {

					elemError.html('<img src="/cards/acq/acq/img/genericACQ/error-icon.png" alt=""/> <span>' + accessibleErrorMessage + ' ' + elem.attr(errMsg) + '</span> ');

				} else {

					elemError.html('<img src="/cards/acq/acq/img/genericACQ/error-icon.png" alt=""/> <span>' + accessibleErrorMessage + ' ' + errMsg + '</span> ');

				}

			}

			if (elem.width() < 30) {

				elemError.children("img").css("padding-bottom", "0");

			}

			elemError.addClass("show");

			//Add Height when Error is shown

			errorHeight = elemError.height();

			parentHeight = elem.parent().height();

			parentWidth = elem.parent().width();

			totalHeight = (parentHeight + errorHeight) - 30;

			totalWidth = parentWidth + 20;

			//Height for checkboxes that have long copy are calculated

			if (elem.is("input[type=checkbox]")) {

				totalHeight = 20;

				parentHeight = elem.parent().parent().height();

				elemError.css("top", parentHeight);

				elem.parent().parent().css("margin-bottom", totalHeight);

			} else {

				elem.parent().css("margin-bottom", totalHeight);

				elemError.css("width", totalWidth);

			}

			//Height for checkboxes that have long copy are calculated

			if (elem.is("input[type=checkbox]")) {

				totalHeight = 20;

				parentHeight = elem.parent().parent().height();

				elemError.css("top", parentHeight);

				elem.parent().parent().css("margin-bottom", totalHeight);

			} else {

				elem.parent().css("margin-bottom", totalHeight);

			}

		};

	var isSameError = function(elem, elemError, errMsg) {
		var currentError = "",
			currentErrorContainer = elemError,
			elem = elem,
			newError = "";

		if (errMsg == undefined) {
			return false;
		}

		// because the elem that is passed is sometimes trimmed from -citiTextBlur and is sometimes a jQuery object, we have to make it consistent.
		if (elem instanceof jQuery) {
			elem = "#" + elem[0].id;
		} else if (elem.length > 1) {
			elem = "#" + elem[0];
		}

		// now check if there's a citiTextBlurred version
		if ($(elem + "-citiTextBlur").length > 0) {
			elem = $(elem + "-citiTextBlur");
		} else {
			elem = $(elem);
		}

		// make sure the currentErrorContainer is a single object, and not an array of them, as it will be with the multiple inputs
		if (currentErrorContainer.length > 1) {
			currentErrorContainer = currentErrorContainer.first();
		}

		// determine if this is the first error message placed. If so, the errors aren't the same.
		if (currentErrorContainer.children('span').length == 0) {
			return false;
		} else {
			currentError = currentErrorContainer.children('span').text();
		}

		// if the errMsg returned is an attr, compare against the attr. Otherwise, compare against the string.
		if (errMsg == "citiinvaliderror" || errMsg == "citireqerror" || errMsg == "citimaxerror" || errMsg == "citispecialerror" || errMsg == "citiusererror" || errMsg == "citimatcherror") {
			newError = elem.attr(errMsg);
		} else {
			newError = errMsg;
		}

		if (currentError == newError) {
			return true;
		} else {
			return false;
		}
	};

	var passed = function(elem, elemError, showCheckmark) {

			elem.addClass('valid');
			elem.attr('aria-invalid', 'false');

			if (showCheckmark == false) {

				showCheckmark = false;

			} else {

				showCheckmark = true;

			}

			//Added for FFIEC Compliance -  Checks to see if an array was returned instead of a string

			if (elem[1] != undefined) {

				elem = elem[0] + "-" + elem[1];

			}

			elem.removeClass("error-textbox");

			if (!elem.is("select") && !elem.is("input[type=checkbox]")) {

				elem.addClass("textbox");

			}

			if (elem.parent().children(".error-textbox").length == 0 && !elem.is("input[type=checkbox]") && !elem.is("select")) {

				if (elem.parent().find(".error-textbox").length == 0) {

					elem.parent().removeAttr("style");

					elemError.removeClass("show");

					elemError.html("");

					//elemError.addClass("hide");
					if(isMcyBlm() && ((elem.attr("id")=="HOME_PHONE_NBR_1-citiTextBlur")||( elem.attr("id")=="HOME_PHONE_NBR_2-citiTextBlur")||( elem.attr("id")=="HOME_PHONE_NBR_3")||( elem.attr("id")=="MOBILE_PHONE_NBR_1-citiTextBlur")||( elem.attr("id")=="MOBILE_PHONE_NBR_2-citiTextBlur")||( elem.attr("id")=="MOBILE_PHONE_NBR_3")||( elem.attr("id")=="BUSINESS_PHONE_1-citiTextBlur")||( elem.attr("id")=="BUSINESS_PHONE_2-citiTextBlur")||( elem.attr("id")=="BUSINESS_PHONE_3"))){ 
						  $('#phoneNumber_error_container').removeClass('show').addClass('hide');
						  $("#HOME_PHONE_NBR_1-citiTextBlur,#HOME_PHONE_NBR_2-citiTextBlur,#HOME_PHONE_NBR_3,#MOBILE_PHONE_NBR_1-citiTextBlur,#MOBILE_PHONE_NBR_2-citiTextBlur,#MOBILE_PHONE_NBR_3,#BUSINESS_PHONE_1-citiTextBlur,#BUSINESS_PHONE_2-citiTextBlur,#BUSINESS_PHONE_3").removeClass('error-textbox');

					}else{
						   elemError.addClass("hide");
					}

					if (showCheckmark) {

						if (elem.parent().find('.check').length === 0) {

							elem.parent().append('<span class="float-left check"></span>');

						}

					}

				}

			}

			if (elem.parent().children(".error-textbox").length == 0 && elem.is("select")) {

				elem.parent().removeAttr("style");

				elemError.removeClass("show");

				elemError.html("");

				elemError.addClass("hide");

				if (showCheckmark) {

					if (elem.parent().find('.select-check').length === 0) {

						elem.parent().append('<span class="float-left select-check"></span>');

					}

				}

			}

			if (elem.is("input[type=checkbox]")) {

				elem.parent().removeAttr("style");

				elemError.removeClass("show");

				elemError.html("");

				elemError.addClass("hide");

			}

		}

		//** PASSWORDS ONLY **//

	var passed_password = function(bottomPassword, topPassword) {

			bottomPassword.removeClass("error-textbox");

			bottomPassword.addClass("textbox");

			if (bottomPassword.parent().find('.check').length === 0) {

				bottomPassword.parent().append('<span class="float-left check"></span>');

			}

			topPassword.removeClass("error-textbox");

			topPassword.addClass("textbox");

			if (topPassword.parent().find('.check').length === 0) {

				topPassword.parent().append('<span class="float-left check"></span>');

			}

			elemError = bottomPassword.parent().children("label").children(".err-msg");

			elemError.removeClass("show");

			elemError.html("");

			elemError.addClass("hide");

			bottomPassword.parent().css("margin-bottom", "12px");

		}

	var failed_password = function(bottomPassword, topPassword) {

			bottomPassword.removeClass("textbox");

			bottomPassword.addClass("error-textbox");

			topPassword.removeClass("textbox");

			topPassword.addClass("error-textbox");

			//Removes checkmark

			topPassword.parent().find('.check').remove();

			bottomPassword.parent().find('.check').remove();

			elemError = bottomPassword.parent().children("label").children(".err-msg");

			errMsg = bottomPassword.attr("citiinvaliderror");

			elemError.removeClass("hide");

			elemError.html('<img src="/cards/acq/acq/img/genericACQ/error-icon.png" alt=""/> <span>' + errMsg + '</span>');

			elemError.addClass("show");

			//Add Height when Error is shown

			errorHeight = elemError.height();

			parentHeight = bottomPassword.parent().height();

			totalHeight = (parentHeight + errorHeight) - 60;

			bottomPassword.parent().css("margin-bottom", totalHeight);

		}

	var methods = {

		init: function(options) {

			if (!this.data('initialized')) {

				this.data('initialized', true);

			} else {

				return;

			}

			var options = $.extend({

				"lang": "en"

			}, options);

			lang = options.lang;

			form = $(this);

			//** SELECT VALIDATION **//

			$(this).find("select").each(function(event) {

				var elem = $(this);

				var elemErrorID = "#err-msg-" + elem.attr("id");

				//FOCUS EVENT FOR COLOUR

				elem.focus(function() {

					elem.addClass("focusselect");

				});

				elem.bind('blur', function() {

					//removes focus border

					elem.removeClass("focusselect");

				});

				//Appends Error Message Dynamically Below

				if (elem.parent().children("label").children(".err-msg").length == 0) {

					elem.parent().children("label").prepend('<span id="err-msg-' + elem.attr("id") + '" class="err-msg err-select error hide"></span>');

				}

				var elemError = elem.parent().children("label").children(".err-msg");

				elem.change(function() { /* Razorfish - Modififed Next Line */

					//if (elem.attr("citireqerror") != undefined){

					if (elem.attr('citireq') == 'true' && elem.attr("citireqerror") != undefined) {

						// if (elem.attr("citireqerror") != undefined){

						elem.parent().children("label").children(".err-msg").html("This is a required field");

						if (elem.val() == 0) {

							failed(elem, elemError, "citireqerror");

						} /* Razorfish - Begin New */

						// special behaviors for Photo ID select element on Best Buy only

						else if (elem.val().length != 0 && elem.is('#PHOTO_ID_TYPE') && isBestBuy()) {

							setRequiredFieldsForID(true);

						} /* Razorfish - End New */

						else if (elem.val().length != 0) {

							passed(elem, elemError);

						}

					}

				});

				// determines what fields are required for the ID section

				// and marks/validates them accordingly



				function setRequiredFieldsForID(validate) {

					var stateAndDateRequired = true,

						validate = !! validate,

						state = {},

						expiration = {};

					state.parent = $('label[for="PHOTO_STATE"]').parent();

					state.reqLabel = state.parent.find('label span.required');

					state.input = state.parent.find('select');

					state.errMsg = state.parent.find('label span.err-msg');

					expiration.parent = $('label[for="PHOTO_EXPIRATION"]').parent();

					expiration.reqLabel = expiration.parent.find('label span.required');

					expiration.inputs = expiration.parent.find('input');

					expiration.errMsg = expiration.parent.find('label span.err-msg');

					switch (elem.val()) {

						// if the "other" ID option is selectd (letter O, not number 0)

					case 'O':

						stateAndDateRequired = false;

						break;

					}

					// show/hide required labels and set input required attributes accordingly

					if (stateAndDateRequired) {

						state.reqLabel.removeClass('hide');

						state.input.attr('citireq', true);

						expiration.reqLabel.removeClass('hide');

						expiration.inputs.attr('citireq', true);

					} else {

						state.reqLabel.addClass('hide');

						state.input.attr('citireq', false).removeClass('error-textbox');

						state.errMsg.addClass('hide');

						expiration.reqLabel.addClass('hide');

						expiration.inputs.attr('citireq', false).removeClass('error-textbox');

						expiration.errMsg.addClass('hide');

					}

					// validate the element if necessary

					if (validate) passed(elem, elemError, true);

				}

				// if initializing the photo ID type and a value is already present

				// such as occurs on the verification screen

				if (isBestBuy && elem.is('[name=PHOTO_ID_TYPE]') && elem.val() !== '') {

					// set the required fields for the photo ID section but

					// don't validate the photo ID type field

					setRequiredFieldsForID(false);

				}

			});

			//** SELECT END **/

			//** INPUT TYPE TEXT VALIDATION **/

			$(this).find("input[type=text], input[type=password]").each(function(event) {

				var elem = $(this);

				var masked = elem.attr("id").split("-");

				var elemErrorID = "#err-msg-" + elem.attr("id"); /** ERROR MESSAGE ADD + STYLING **/

				//Appends Error Message Dynamically Below

				if (elem.parent().children("label").children(".err-msg").length == 0) {

					elem.parent().children("label").prepend('<span id="err-msg-' + elem.attr("id") + '" class="err-msg error hide"></span>');

					var elemError = elem.parent().children("label").children(elemErrorID);

				} else {

					var elemError = elem.parent().children("label").children(".err-msg");

				}

				if (elem.parent().find("input").length > 1) {

					//Calculating what the width of error box should be

					//MULTIPLE BOXES

					var totalWidth = 0;

					elem.parent().find("input").each(function(index) {

						totalWidth += $(this).css("width");

					});

					elemError.css("width", totalWidth + 5);

				} else if (!elemError.parent().hasClass("show")) {

					var finalWidth = parseInt(elem.css("width").replace(/[^-\d\.]/g, ''), 10);

					//SINGLE BOX

					elemError.css("width", finalWidth + 20 + "px");

				} /** ERROR MESSAGE STYLING END **/

				elem.focus(function() {

					if (!elem.hasClass("error-textbox")) {

						elem.addClass("focus");

					} else {

						elem.addClass("focus-error");

					}

				});

				//*BLUR EVENT**//

				elem.bind('blur', function() {

					//removes focus border

					elem.removeClass("focus");

					elem.removeClass("focus-error");

					checkField($(this), elemError, masked);

					form.triggerHandler('checkForm');

				});

				//**END OF BLUR EVENT**/

			});

			// Special case: keyup events for citienableform fields
			$(this).find("input[type=text][citienableform=true], input[type=password][citienableform=true]").each(function(event) {
				var elem = $(this);
				elem.bind('keyup', function() {
					var val = elem.val(),
						isExact = String(val.length) == elem.attr("citiminlength");
					if (isExact) {
						elem.parents('form').find('input, select, textarea').removeAttr('disabled');
					}
				});
			});

			//Validation for checkbox

			$(this).find("input[type=checkbox][citireq]").each(function(event) {

				var elem = $(this);

				var elemErrorID = "#err-msg-" + elem.attr("id");

				//Appends Error Message Dynamically Below Checkbox

				if (elem.parent().parent().children("label").children(".err-msg-checkbox").length == 0) {

					elem.parent().parent().children("label").prepend('<span id="err-msg-' + elem.attr("id") + '" class="err-msg-checkbox error hide"></span>');

					var elemError = elem.parent().parent().children("label").children(".err-msg-checkbox");

				} else {

					var elemError = elem.parent().parent().children("label").children(".err-msg-checkbox");

				}

				var validate_checkbox = function() {

						if (elem.attr("citireqerror") != undefined) {

							if (!elem.attr('checked')) {

								failed(elem, elemError, "citireqerror");

							} else if (elem.val().length != 0) {

								passed(elem, elemError, false);

							}

							form.triggerHandler('checkForm');

						}

					};

				$(this).on('click', validate_checkbox);

			});

		},

		//FOR VALIDATING A SINGLE ELEMENT

		validateElem: function() {

			var elem = $(this);

			var masked = elem.attr("id").split("-");

			var elemError = elem.parent().children("label").children(".err-msg");

			//if (elem.attr("citireqerror") != undefined){

			if (elem.attr('citireq') == 'true' && elem.attr('cititreqerror') != undefined) {

				if (elem.val().length == 0) {

					elem.parent().children("label").children(".err-msg").html("This is a required field");

					failed(elem, elemError, "citireqerror");

				} else if (elem.val().length != 0) {

					passed(elem, elemError);

				}

			}

			checkField(elem, elemError, masked);

			form.triggerHandler('checkForm');

		},

		//SUBMIT VALIDATION

		validate: function() {

			// if the browser doesn't support placeholders

			if (typeof document.createElement('input').placeholder !== 'string') {

				// clear the placeholders

				emulatePlaceholder('clear');

			}


			$(this).find("input[type=text], input[type=password]").each(function(event) {

				var elem = $(this);
 var validateFlag = 0;

				var masked = elem.attr("id").split("-");

				var elemError = elem.parent().children("label").children(".err-msg");

				var clearValue = false;

				// don't validate hidden elements
				if (elem.is(':hidden')) {
					return;
				}

				if (elem.val().length === 0 && !! elem.attr('citigroup')) elem.attr('citisubmitted', true); /* Razorfish - Modififed Next Line */

				//if (elem.attr("citireqerror") != undefined){

				if (elem.attr('citireq') == 'true' && elem.attr('citireqerror') != undefined) { /* Razorfish - Modififed Next Line */

					//if (elem.val().length == 0){

					//if (elem.attr("citireqerror") != undefined){

					//if (elem.val().length == 0){

					if ((elem.val().length == 0 || elem.val() == elem.attr('placeholder')) && !elem.attr('citigroup')) {

						elem.parent().children("label").children(".err-msg").html("This is a required field");

						failed(elem, elemError, "citireqerror");

					} else if (elem.val().length != 0) {

						passed(elem, elemError);

						checkField($(this), elemError, masked);

					}

					// if the element is blank and it's part of a group

					else if (elem.val().length === 0 && !! elem.attr('citigroup')) {

						elem.attr('citisubmitted', true);

						passed(elem, elemError);

						checkField($(this), elemError, masked);

					}

				}else{
					 if( isMcyBlm() && ((elem.attr("id")=="HOME_PHONE_NBR_1-citiTextBlur")||( elem.attr("id")=="HOME_PHONE_NBR_2-citiTextBlur")||( elem.attr("id")=="HOME_PHONE_NBR_3")||( elem.attr("id")=="MOBILE_PHONE_NBR_1-citiTextBlur")||( elem.attr("id")=="MOBILE_PHONE_NBR_2-citiTextBlur")||( elem.attr("id")=="MOBILE_PHONE_NBR_3")||( elem.attr("id")=="BUSINESS_PHONE_1-citiTextBlur")||( elem.attr("id")=="BUSINESS_PHONE_2-citiTextBlur")||( elem.attr("id")=="BUSINESS_PHONE_3"))){ 
						 if(($("#HOME_PHONE_NBR_1").val()=="" && $("#HOME_PHONE_NBR_2").val()=="" && $("#HOME_PHONE_NBR_3").val()=="") && ($("#MOBILE_PHONE_NBR_1").val()=="" && $("#MOBILE_PHONE_NBR_2").val()=="" && $("#MOBILE_PHONE_NBR_3").val()=="") && ($("#MOBILE_PHONE_NBR_1").val()=="" && $("#MOBILE_PHONE_NBR_2").val()=="" && $("#MOBILE_PHONE_NBR_3").val()=="") && ($("#BUSINESS_PHONE_1").val()=="" && $("#BUSINESS_PHONE_2").val()=="" && $("#BUSINESS_PHONE_3").val()=="")){

                            if(validateFlag == 0){
                            	
		                         failed(elem, elemError, "citireqerror");
		                          validateFlag++;
                            }
                           
                            elem.addClass('error-textbox');
                          }
                          else if(elem.attr("id")=="BUSINESS_PHONE_3"){
						  var homePhoneNoOne=$("#HOME_PHONE_NBR_1-citiTextBlur").hasClass('valid');
						  var homePhoneNoTwo=$("#HOME_PHONE_NBR_2-citiTextBlur").hasClass('valid') ;
						  var homePhoneNoThree=$("#HOME_PHONE_NBR_3").hasClass('valid') ;
						  var mobPhoneNoOne=$("#MOBILE_PHONE_NBR_1-citiTextBlur").hasClass('valid') ;
						  var mobPhoneNoTwo=$("#MOBILE_PHONE_NBR_2-citiTextBlur").hasClass('valid') ;
						  var mobPhoneNoThree=$("#MOBILE_PHONE_NBR_3").hasClass('valid') ;
						  var busPhoneNoOne=$("#BUSINESS_PHONE_1-citiTextBlur").hasClass('valid') ;
						  var busPhoneNoOTwo=$("#BUSINESS_PHONE_2-citiTextBlur").hasClass('valid') ;
						  var busPhoneNoThree=$("#BUSINESS_PHONE_3").hasClass('valid') ;
						  
							if((homePhoneNoOne && homePhoneNoTwo && homePhoneNoThree)||(mobPhoneNoOne && mobPhoneNoTwo && mobPhoneNoThree)||(busPhoneNoOne && busPhoneNoOTwo && busPhoneNoThree)){
								 passed(elem, elemError, false);
                    	  checkField($(this), elemError, masked);
							}
							else{
								//failed(elem, elemError, "citireqerror");
								$("#HOME_PHONE_NBR_1-citiTextBlur ,#HOME_PHONE_NBR_2-citiTextBlur,#HOME_PHONE_NBR_3,#MOBILE_PHONE_NBR_1-citiTextBlur,#MOBILE_PHONE_NBR_2-citiTextBlur,#MOBILE_PHONE_NBR_3,#BUSINESS_PHONE_1-citiTextBlur,#BUSINESS_PHONE_2-citiTextBlur,#BUSINESS_PHONE_3").removeClass('valid').addClass('error-textbox');
								$('#phoneNumber_error_container').html('<img src="/cards/acq/acq/img/genericACQ/error-icon.png" alt=""/> <span>Please enter a valid 10-digit phone number.</span> ');

								$('#phoneNumber_error_container').removeClass('hidden').addClass('show error err-msg'); 
							}
							}
                          else{
							$('#phoneNumber_error_container').removeClass('err-msg error show').addClass("hidden");
		                         
                          	 passed(elem, elemError, false);
                    	  checkField($(this), elemError, masked);
                          }
                      }else{
                    	  passed(elem, elemError, false);
                    	  checkField($(this), elemError, masked);
                      }
					}

				//only do this validation on step 2 if in edit mode

				if (elem.attr('id') == 'THD_SSN_REQ_3-citiTextBlur') {

					if (jQuery('.section .editMode').is(':visible')) {

						var ss1 = jQuery('#THD_SSN_REQ_1').val();

						var ss2 = jQuery('#THD_SSN_REQ_2').val();

						var ss3 = jQuery('#THD_SSN_REQ_3').val();

						var ssn = ss1.concat(ss2);

						ssn = ssn.concat(ss3);

						if (ss1.length != 0 && ss2.length != 0 && ss3.length != 0) {

							if (/^(.)\1+$/.test(ssn)) {

								failed(elem, elemError, "Please enter a valid Social Security Number");

								failed(jQuery('#THD_SSN_REQ_1-citiTextBlur'), elemError, "Please enter a valid Social Security Number");

								failed(jQuery('#THD_SSN_REQ_2-citiTextBlur'), elemError, "Please enter a valid Social Security Number");

							}

						}

					}

				}

			});

			//Validation for Select

			$(this).find("select").each(function(event) {

				var elem = $(this);

				// don't validate hidden elements
				if (elem.is(':hidden')) {
					return;
				}

				var elemError = elem.parent().children("label").children(".err-msg"); /* Razorfish - Modififed Next Line */

				//if (elem.attr("citireqerror") != undefined){

				if (elem.attr('citireq') == 'true' && elem.attr('citireqerror') != undefined) {

					//if (elem.attr("citireqerror") != undefined){

					elem.parent().children("label").children(".err-msg").html("This is a required field");

					if (elem.val() == 0) {

						failed(elem, elemError, "citireqerror");

					} else if (elem.val().length != 0) {

						passed(elem, elemError);

					}

					form.triggerHandler('checkForm');

				}

			});

			//Validation for checkbox

			$(this).find("input[type=checkbox]").each(function(event) {

				var elem = $(this);

				// don't validate hidden elements
				if (elem.is(':hidden')) {
					return;
				}

				var elemErrorID = "#err-msg-" + elem.attr("id");

				//Appends Error Message Dynamically Below Checkbox

				if (elem.parent().parent().children("label").children(".err-msg-checkbox").length == 0) {

					elem.parent().parent().children("label").prepend('<span id="err-msg-' + elem.attr("id") + '" class="err-msg-checkbox error hide"></span>');

					var elemError = elem.parent().parent().children("label").children(".err-msg-checkbox");

				} else {

					var elemError = elem.parent().parent().children("label").children(".err-msg-checkbox");

				}

				var validate_checkbox = function() {

						if (elem.attr("citireqerror") != undefined) {

							if (!elem.attr('checked')) {

								failed(elem, elemError, "citireqerror");

							} else if (elem.val().length != 0) {

								passed(elem, elemError, false);

							}

							form.triggerHandler('checkForm');

						}

					};

				validate_checkbox(elem, elemError);

			});

			 // if the browser doesn't support placeholders

			if (typeof document.createElement('input').placeholder !== 'string') {

				// if there are errors

				if (form.find('.error-textbox').length > 0) {

					// set the placeholders again

					emulatePlaceholder('set');

				}

				else {

					//clear the placeholders

					emulatePlaceholder('clear');

				}

			}

			form.triggerHandler('checkForm');

		},

		isFormValid: function() {

			//look for .valid class on all required fields

			var requiredFields = $(this).find("input[type=text], input[type=password], select, input[type=checkbox]").filter('[citireq]'),

				reqFieldsLength = requiredFields.length,

				validFieldsLength = requiredFields.filter('.valid').length;

			return reqFieldsLength === validFieldsLength;

		}

	};

	$.fn.validator = function(method) {

		// Method calling logic

		if (methods[method]) {

			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

		} else if (typeof method === 'object' || !method) {

			return methods.init.apply(this, arguments);

		} else {

			$.error('Method ' + method + ' does not exist in this plugin');

			console.log($.error);

		}

		//** End of Plugin **//

	};

})(jQuery);