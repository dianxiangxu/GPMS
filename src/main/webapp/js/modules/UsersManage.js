var usersManage = '';
$(function() {
	var gpmsCommonObj = function() {
		var gpmsCommonInfo = {
			UserName : GPMS.utils.GetUserName(),
			UserProfileID : GPMS.utils.GetUserProfileID(),
			CultureName : GPMS.utils.GetCultureName()
		};
		return gpmsCommonInfo;
	};
	var isUnique = false;
	var editFlag = 0;
	var rowIndex = 0;
	var arrAttrValueId = 0;
	usersManage = {
		config : {
			isPostBack : false,
			async : true,
			cache : true,
			type : 'POST',
			contentType : "application/json; charset=utf-8",
			data : '{}',
			dataType : 'json',
			baseURL : GPMS.utils.GetGPMSServicePath() + "users/",
			method : "",
			url : "",
			ajaxCallMode : 0
		},
		ajaxCall : function(config) {
			$
					.ajax({
						type : usersManage.config.type,
						beforeSend : function(request) {
							request.setRequestHeader('GPMS-TOKEN', _aspx_token);
							request.setRequestHeader("UName", GPMS.utils
									.GetUserName());
							request.setRequestHeader("PID", GPMS.utils
									.GetUserProfileID());
							request.setRequestHeader("PType", "v");
							request.setRequestHeader('Escape', '0');
						},
						contentType : usersManage.config.contentType,
						cache : usersManage.config.cache,
						async : usersManage.config.async,
						url : usersManage.config.url,
						data : usersManage.config.data,
						dataType : usersManage.config.dataType,
						success : usersManage.ajaxSuccess,
						error : usersManage.ajaxFailure
					});
		},
		LoadStaticImage : function() {
			$('.cssClassSuccessImg').prop('src',
					'' + GPMS.utils.GetGPMSRootPath() + '/images/right.jpg');
		},
		onInit : function() {
			usersManage.SetFirstTabActive();
			$('#btnReset').hide();
			$('.cssClassRight').hide();
			$('.cssClassError').hide();
		},
		SetFirstTabActive : function() {
			var $tabs = $('#container-7').tabs({
				fx : [ null, {
					height : 'show',
					opacity : 'show'
				} ]
			});
			$tabs.tabs('option', 'active', 0);
		},
		Boolean : function(str) {
			switch (str) {
			case "1":
				return true;
			case "0":
				return false;
			default:
			}
		},
		CreateValidationClass : function(attValType) {
			var validationClass = '';

			switch (attValType) {
			case "1":
				validationClass += 'verifyAlphabetsOnly';
				break;
			case "2":
				validationClass += 'verifyAlphaNumeric';
				break;
			case "3":
				validationClass += 'verifyDecimal';
				break;
			case "4":
				validationClass += 'verifyEmail';
				break;
			case "5":
				validationClass += 'verifyInteger';
				break;
			case "6":
				validationClass += 'verifyPrice';
				break;
			case "7":
				validationClass += 'verifyUrl';
				break;
			default:
				validationClass += '';
				break;
			}
			return validationClass;
		},
		GetValidationTypeErrorMessage : function(attValType) {
			var retString = ''
			switch (attValType) {
			case "1":
				retString = getLocale(gpmsUsersManagement, 'Alphabets Only');
				break;
			case "2":
				retString = getLocale(gpmsUsersManagement, 'AlphaNumeric');
				break;
			case "3":
				retString = getLocale(gpmsUsersManagement, 'Decimal Number');
				break;
			case "4":
				retString = getLocale(gpmsUsersManagement, 'Email Address');
				break;
			case "5":
				retString = getLocale(gpmsUsersManagement, 'Integer Number');
				break;
			case "6":
				retString = getLocale(gpmsUsersManagement, 'Price error');
				break;
			case "7":
				retString = getLocale(gpmsUsersManagement, 'Web URL');
				break;
			}
			return retString;
		},
		ClearForm : function() {
			$('.class-text').removeClass('error').next('span').removeClass(
					'error');
			var inputs = $("#container-7").find('INPUT, SELECT, TEXTAREA');
			$.each(inputs, function(i, item) {
				rmErrorClass(item);
				$(this).val('');
				$(this).prop('checked', false);
			});
			usersManage.onInit();
			$('#lblFormHeading').html(
					getLocale(gpmsUsersManagement, "New User Details"));
			$(".delbutton").removeAttr("id");
			$("#btnSaveUser").removeAttr("name");
			$(".delbutton").hide();
			$("#btnReset").show();
			$(".required:enabled").each(function() {
				if ($(this).parent("td").find("span.error").length == 1) {
					$(this).removeClass("error").addClass("required");
					$(this).parent("td").find("span.error").remove();
				}
			});
			$('#txtUserName').removeAttr('disabled');

			$(".AddOption").val("+ Add ");
			$("#dataTable tr:gt(1)").remove();

			$('input[name=chkActive]').prop('checked', 'checked');
			return false;
		},
		BindAttributeOptionsValues : function(_fillOptionValues) {
			var _fillOptions = _fillOptionValues;
			if (_fillOptions != undefined && _fillOptions != "") {
				var arr = _fillOptions.split("!#!");
				var htmlContent = '';
				$.each(arr, function(i) {
					var btnOption = "Add More";
					var btnName = "AddMore";
					if (i > 0) {
						btnOption = "Delete Option";
						var btnName = "DeleteOption";
					}
					var arr2 = arr[i].split("#!#");
					var cloneRow = $('#dataTable tbody>tr:last').clone(true);
					$(cloneRow).find("input").each(function(j) {
						if (this.name == "optionValueId") {
							$(this).val(arr2[0]);
						} else if (this.name == "value") {
							$(this).val(arr2[1]);
						} else if (this.name == "position") {
							$(this).val(arr2[2]);
						} else if (this.name == "Alias") {
							$(this).val(arr2[3]);
						} else if ($(this).hasClass("class-isdefault")) {
							this.checked = usersManage.Boolean(arr2[4]);
						} else if ($(this).hasClass("AddOption")) {
							$(this).prop("name", btnName);
							$(this).prop("value", btnOption);
						}
					});
					$(cloneRow).appendTo("#dataTable");
				});
				$('#dataTable>tbody tr:first').remove();
			}
		},

		BindUserGrid : function(userName, college, department, positionType,
				positionTitle, isActive) {
			this.config.url = this.config.baseURL;
			this.config.method = "GetUsersList";
			var offset_ = 1;
			var current_ = 1;
			var perpage = ($("#gdvUsers_pagesize").length > 0) ? $(
					"#gdvUsers_pagesize :selected").text() : 10;
			var userBindObj = {
				UserName : userName,
				College : college,
				Department : department,
				PositionType : positionType,
				PositionTitle : positionTitle,
				IsActive : isActive
			};
			$("#gdvUsers").sagegrid({
				url : this.config.url,
				functionMethod : this.config.method,
				colModel : [ {
					display : 'User Profile ID',
					name : 'userProfile_id',
					cssclass : 'cssClassHeadCheckBox',
					coltype : 'checkbox',
					align : 'center',
					checkFor : '8', // this is count from 0 column index
					elemClass : 'attrChkbox',
					elemDefault : false,
					controlclass : 'attribHeaderChkbox'
				}, {
					display : 'User Name',
					name : 'user_name',
					cssclass : '',
					controlclass : '',
					coltype : 'label',
					align : 'left'
				}, {
					display : 'Full Name',
					name : 'full_name',
					cssclass : '',
					controlclass : '',
					coltype : 'label',
					align : 'left'
				}, {
					display : 'PI Count',
					name : 'PI_proposal_count',
					cssclass : '',
					controlclass : '',
					coltype : 'label',
					align : 'left'
				}, {
					display : 'Co-PI Count',
					name : 'CoPI_proposal_count',
					cssclass : '',
					controlclass : '',
					coltype : 'label',
					align : 'left'
				}, {
					display : 'Senior Count',
					name : 'senior_proposal_count',
					cssclass : '',
					controlclass : '',
					coltype : 'label',
					align : 'left'
				}, {
					display : getLocale(gpmsUsersManagement, 'Added On'),
					name : 'added_on',
					cssclass : 'cssClassHeadDate',
					controlclass : '',
					coltype : 'label',
					align : 'left',
					type : 'date',
					format : 'yyyy/MM/dd hh:mm:ss a'
				// Want more format then
				// :https://github.com/phstc/jquery-dateFormat/blob/master/test/expected_inputs_spec.js
				}, {
					display : getLocale(gpmsUsersManagement, 'Last Updated'),
					name : 'last_updated',
					cssclass : 'cssClassHeadDate',
					controlclass : '',
					coltype : 'label',
					align : 'left',
					type : 'date',
					format : 'yyyy/MM/dd hh:mm:ss a'
				}, {
					display : getLocale(gpmsUsersManagement, 'Is Deleted?'),
					name : 'status',
					cssclass : 'cssClassHeadBoolean',
					controlclass : '',
					coltype : 'label',
					align : 'left',
					// To override it we need
					type : 'boolean',
					format : 'Yes/No'
				// default format (No Need to specify) is True/False
				// you can define 'Yes/No'
				// hide : true
				}, {
					display : getLocale(gpmsUsersManagement, 'Actions'),
					name : 'action',
					cssclass : 'cssClassAction',
					coltype : 'label',
					align : 'center'
				} ],

				buttons : [ {
					display : getLocale(gpmsUsersManagement, "Edit"),
					name : 'edit',
					enable : true,
					_event : 'click',
					trigger : '1',
					callMethod : 'usersManage.EditUser',
					arguments : '1,2,3,4,5,6,7,8'
				}, {
					display : getLocale(gpmsUsersManagement, "Delete"),
					name : 'delete',
					enable : true,
					_event : 'click',
					trigger : '2',
					callMethod : 'usersManage.DeleteUser',
					arguments : '1,8'
				}, {
					display : getLocale(gpmsUsersManagement, "Activate"),
					name : 'activate',
					enable : true,
					_event : 'click',
					trigger : '4',
					callMethod : 'usersManage.ActiveUser',
					arguments : '8'
				}, {
					display : getLocale(gpmsUsersManagement, "Deactivate"),
					name : 'deactivate',
					enable : true,
					_event : 'click',
					trigger : '5',
					callMethod : 'usersManage.DeactiveUser',
					arguments : '8'
				} ],
				rp : perpage,
				nomsg : getLocale(gpmsUsersManagement, 'No Records Found!'),
				param : {
					userBindObj : userBindObj
				},
				current : current_,
				pnew : offset_,
				sortcol : {
					0 : {
						sorter : false
					},
					9 : {
						sorter : false
					}
				}
			});
		},
		FillDefaultValue : function(defaultVal) {
			var selectedAttributeType = $("#ddlAttributeType :selected").val();
			switch (selectedAttributeType) {
			case "1":
				$('#default_value_text').val(defaultVal);
				break;
			case "2":
				$('textarea#default_value_textarea').val(defaultVal);
				break;
			case "3":
				$('#default_value_date').val(defaultVal);
				break;
			case "4":
				$('#default_value_yesno').val(defaultVal);
				break;
			case "8":
				$('#default_value_text').val(defaultVal);
				break;
			default:
				break;
			}
		},
		FillForm : function(response) {
			// See this how we can get response object based on fields
			$('#txtUserName').val(response['firstName']);
			// $('#ddlAttributeType').val(item.InputTypeID);
			$('#ddlAttributeType').prop('disabled', 'disabled');

			// usersManage.FillDefaultValue(item.DefaultValue);

			// $('#ddlTypeValidation').val(item.ValidationTypeID);
			// $('#txtLength').val(item.Length);
			// $('#txtAliasName').val(item.AliasName);
			// $('#txtAliasToolTip').val(item.AliasToolTip);
			// $('#txtAliasHelp').val(item.AliasHelp);
			// $('#txtDisplayOrder').val(item.DisplayOrder);
			//
			// $('input[name=chkUniqueValue]').prop('checked',
			// item.IsUnique);
			// $('input[name=chkValuesRequired]').prop('checked',
			// item.IsRequired);
			// $('input[name=chkActive]').prop('checked', item.IsActive);
			//
			// $('input[name=chkIsEnableEditor]').prop('checked',
			// item.IsEnableEditor);
			// $('input[name=chkUseInAdvancedSearch]').prop('checked',
			// item.ShowInAdvanceSearch);
			// $('input[name=chkComparable]').prop('checked',
			// item.ShowInComparison);
			// $('input[name=chkUseForPriceRule]').prop('checked',
			// item.IsIncludeInPriceRule);
			// $('input[name=chkIsUseInFilter]').prop('checked',
			// item.IsUseInFilter);
			// $('input[name=chkShowInItemListing]').prop('checked',
			// item.IsShowInItemListing);
			// $('input[name=chkShowInItemDetail]').prop('checked',
			// item.IsShowInItemDetail);
			// usersManage.ValidationTypeEnableDisable(item.FillOptionValues,
			// false);

			// if (item.ItemTypes.length > 0) {
			// $('#ddlApplyTo').val('1');
			// $('.itemTypes').show();
			// var itemsType = item.ItemTypes;
			// var arr = itemsType.split(",");
			// $.each(arr, function(i) {
			// $("#lstItemType option[value=" + arr[i] + "]").prop(
			// "selected", "selected");
			// });
			// } else {
			// $('#ddlApplyTo').val('0');
			// }
		},

		EditUser : function(tblID, argus) {
			usersManage.ClearForm();
			switch (tblID) {
			case "gdvUsers":
				$('#lblFormHeading').html(
						getLocale(gpmsUsersManagement, 'Edit User Details: ')
								+ argus[3]);
				$('#txtUserName').prop('disabled', 'disabled');
				if (argus[8].toLowerCase() != "no") {
					$(".delbutton").prop("id", 'userId' + argus[0]);
					$(".delbutton").show();
					$("input[name=AddMore]").removeAttr('disabled');
					$("input[name=DeleteOption]").removeAttr('disabled');
				} else {

				}
				$("#btnSaveUser").prop("name", argus[0]);
				usersManage.onInit();

				usersManage.config.url = usersManage.config.baseURL
						+ "GetUsersByProfileId";
				usersManage.config.data = JSON2.stringify({
					userId : argus[0],
					gpmsCommonObj : gpmsCommonObj()
				});
				usersManage.config.ajaxCallMode = 4;
				usersManage.ajaxCall(usersManage.config);
				break;
			default:
				break;
			}
		},

		DeleteUser : function(tblID, argus) {
			switch (tblID) {
			case "gdvUsers":
				if (argus[1].toLowerCase() != "no") {
					usersManage.DeleteUserById(argus[0]);
				} else {
					csscody.alert('<h2>'
							+ getLocale(gpmsUsersManagement,
									"Information Alert")
							+ '</h2><p>'
							+ getLocale(gpmsUsersManagement,
									"Sorry! this user is already deleted.")
							+ '</p>');
				}
				break;
			default:
				break;
			}
		},

		ConfirmDeleteMultiple : function(user_ids, event) {
			if (event) {
				usersManage.DeleteMultipleAttribute(user_ids);
			}
		},

		DeleteMultipleAttribute : function(_userIds) {
			this.config.url = this.config.baseURL
					+ "DeleteMultipleAttributesByAttributeID";
			this.config.data = JSON2.stringify({
				userIds : _userIds,
				gpmsCommonObj : gpmsCommonObj()
			});
			this.config.ajaxCallMode = 6;
			this.ajaxCall(this.config);
			return false;
		},

		DeleteUserById : function(_userId) {
			var properties = {
				onComplete : function(e) {
					usersManage.ConfirmSingleDelete(_userId, e);
				}
			};
			csscody.confirm("<h2>"
					+ getLocale(gpmsUsersManagement, "Delete Confirmation")
					+ "</h2><p>"
					+ getLocale(gpmsUsersManagement,
							"Are you sure you want to delete this attribute?")
					+ "</p>", properties);
		},

		ConfirmSingleDelete : function(user_id, event) {
			if (event) {
				usersManage.DeleteSingleAttribute(user_id);
			}
			return false;
		},

		DeleteSingleAttribute : function(_userId) {
			this.config.url = this.config.baseURL
					+ "DeleteAttributeByAttributeID";
			this.config.data = JSON2.stringify({
				userId : parseInt(_userId),
				gpmsCommonObj : gpmsCommonObj()
			});
			this.config.ajaxCallMode = 5;
			this.ajaxCall(this.config);
		},

		ActivateAttribute : function(_userId, _isActive) {
			this.config.url = this.config.baseURL
					+ "UpdateAttributeIsActiveByAttributeID";
			this.config.data = JSON2.stringify({
				userId : parseInt(_userId),
				gpmsCommonObj : gpmsCommonObj(),
				isActive : _isActive
			});
			this.config.ajaxCallMode = 7;
			this.ajaxCall(this.config);
			return false;
		},
		DeactiveUser : function(tblID, argus) {
			switch (tblID) {
			case "gdvUsers":
				if (argus[3].toLowerCase() != "yes") {
					usersManage.ActivateAttribute(argus[0], false);
				} else {
					csscody
							.alert('<h2>'
									+ getLocale(gpmsUsersManagement,
											"Information Alert")
									+ '</h2><p>'
									+ getLocale(gpmsUsersManagement,
											"Sorry! System attribute can not be deactivated.")
									+ '</p>');
				}
				break;
			default:
				break;
			}
		},
		ActiveUser : function(tblID, argus) {
			switch (tblID) {
			case "gdvUsers":
				if (argus[3].toLowerCase() != "yes") {
					usersManage.ActivateAttribute(argus[0], true);
				} else {
					csscody
							.alert('<h2>'
									+ getLocale(gpmsUsersManagement,
											"Information Alert")
									+ '</h2><p>'
									+ getLocale(gpmsUsersManagement,
											"Sorry! System attribute can not be activated.")
									+ '</p>');
				}
				break;
			default:
				break;
			}
		},
		IsUnique : function(attributeName, userId) {
			var attrbuteUniqueObj = {
				AttributeID : userId,
				AttributeName : attributeName
			};
			var gpmsCommonInfo = gpmsCommonObj();
			gpmsCommonInfo.CultureName = $(".languageSelected").attr("value");
			this.config.url = this.config.baseURL + "CheckUniqueAttributeName";
			this.config.data = JSON2.stringify({
				attrbuteUniqueObj : attrbuteUniqueObj,
				gpmsCommonObj : gpmsCommonInfo
			});
			this.config.ajaxCallMode = 8;
			this.ajaxCall(this.config);
			return isUnique;
		},
		SaveUser : function(_userId, _flag) {
			$('#iferror').hide();
			if (checkForm($("#form1"))) {
				var selectedItemTypeID = '';
				var validateErrorMessage = '';
				var itemSelected = false;
				var isUsedInConfigItem = false;

				var attributeName = $('#txtUserName').val();
				if (!attributeName) {
					validateErrorMessage += 'Please enter attribute name.<br/>';
				} else if (!usersManage.IsUnique(attributeName, _userId)) {
					validateErrorMessage += "'"
							+ getLocale(gpmsUsersManagement,
									"Please enter unique attribute name") + "'"
							+ attributeName.trim() + "'"
							+ getLocale(gpmsUsersManagement, "already exists.")
							+ '<br/>';
				}
				var selectedValue = $("#ddlApplyTo").val();
				if (selectedValue !== "0") {
					$("#lstItemType").each(function() {
						if ($("#lstItemType :selected").length != 0) {
							itemSelected = true;
							$("#lstItemType option:selected").each(function(i) {
								selectedItemTypeID += $(this).val() + ',';
								if ($(this).val() == '3') {
									isUsedInConfigItem = true;
								}
							});
						}
					});
					if (!itemSelected) {
						validateErrorMessage += getLocale(gpmsUsersManagement,
								"Please select at least one item type.")
								+ "<br/>";
					}
				} else {
					isUsedInConfigItem = true;
					$("#lstItemType option").each(function(i) {
						selectedItemTypeID += $(this).val() + ',';
					});
				}

				selectedItemTypeID = selectedItemTypeID.substring(0,
						selectedItemTypeID.length - 1);

				if ($('#toggleElement').is(':checked'))
					var _Length = '';
				if (!($('#txtLength').is(':disabled'))) {
					_Length = $('#txtLength').val();
				}
				var selectedVal = $("#ddlAttributeType :selected").val();
				var _saveOptions = '';
				if (selectedVal == 5 || selectedVal == 6 || selectedVal == 9
						|| selectedVal == 10 || selectedVal == 11
						|| selectedVal == 12) {
					$("#dataTable")
							.find("tr input")
							.each(
									function(i) {
										$(this).parent('td').find('span')
												.removeClass('error');
										$(this).removeClass('error');
										var optionsText = $(this).val();
										if ($(this).hasClass("class-text")) {
											if (!optionsText
													&& $(this).prop("name") != "Alias") {
												validateErrorMessage = getLocale(
														gpmsUsersManagement,
														"Please enter all option values and display order for your attribute.")
														+ "<br/>";
												$(this).parent('td').find(
														'span').addClass(
														'error').show();
												usersManage.SetFirstTabActive();
												$(this).addClass('error');
												$(this).focus();
											} else {
												if ($(this).prop("name") == "position") {
													var value = optionsText
															.replace(/^\s\s*/,
																	'')
															.replace(/\s\s*$/,
																	'');
													var intRegex = /^\d+$/;
													if (!intRegex.test(value)) {
														validateErrorMessage = getLocale(
																gpmsUsersManagement,
																"Display order is numeric value.")
																+ '<br/>';
														$(this)
																.parent('td')
																.find('span')
																.addClass(
																		'error')
																.show();
														usersManage
																.SetFirstTabActive();
														$(this).addClass(
																'error');
														$(this).focus();
													}
												}
												_saveOptions += optionsText
														+ "#!#";
											}
										} else if ($(this).hasClass(
												"class-isdefault")) {
											var _IsChecked = $(this).prop(
													'checked');
											_saveOptions += _IsChecked + "!#!";
										}
									});
				}
				_saveOptions = _saveOptions.substring(0,
						_saveOptions.length - 3);
				if (!validateErrorMessage) {
					var gpmsCommonInfo = gpmsCommonObj();
					var _StoreID = gpmsCommonInfo.StoreID;
					var _PortalID = gpmsCommonInfo.PortalID;
					var _CultureName = $(".languageSelected").attr("value");
					var _UserName = gpmsCommonInfo.UserName;

					var _attributeName = $('#txtUserName').val();
					var _inputTypeID = $('#ddlAttributeType').val();

					var selectedAttributeType = $("#ddlAttributeType :selected")
							.val();
					var _DefaultValue = "";
					switch (selectedAttributeType) {
					case "1":
						_DefaultValue = $("#default_value_text").val();
						break;
					case "2":
						_DefaultValue = $("textarea#default_value_textarea")
								.val();
						break;
					case "3":
						_DefaultValue = $("#default_value_date").val();
						break;
					case "4":
						_DefaultValue = $("#default_value_yesno").val();
						break;
					case "8":
						_DefaultValue = $("#default_value_text").val();
						break;
					default:
						_DefaultValue = '';
					}

					var _ValidationTypeID = $('#ddlTypeValidation').val();
					var _AliasName = $('#txtAliasName').val();
					var _AliasToolTip = $('#txtAliasToolTip').val();
					var _AliasHelp = $('#txtAliasHelp').val();
					var _DisplayOrder = $('#txtDisplayOrder').val();

					var _IsUnique = $('input[name=chkUniqueValue]').prop(
							'checked');
					var _IsRequired = $('input[name=chkValuesRequired]').prop(
							'checked');
					var _IsEnableEditor = $('input[name=chkIsEnableEditor]')
							.prop('checked');
					var _ShowInAdvanceSearch = $(
							'input[name=chkUseInAdvancedSearch]').prop(
							'checked');
					var _ShowInComparison = $('input[name=chkComparable]')
							.prop('checked');
					var _IsUseInFilter = $('input[name=chkIsUseInFilter]')
							.prop('checked');
					var _IsIncludeInPriceRule = $(
							'input[name=chkUseForPriceRule]').prop('checked');
					var _IsShowInItemListing = $(
							'input[name=chkShowInItemListing]').prop('checked');
					var _IsShowInItemDetail = $(
							'input[name=chkShowInItemDetail]').prop('checked');
					var _IsActive = $('input[name=chkActive]').prop('checked');
					var _IsModified = true;
					var _attributeValueId = arrAttrValueId;
					var _ItemTypes = selectedItemTypeID;
					var _Flag = _flag;
					var _IsUsedInConfigItem = isUsedInConfigItem;

					usersManage.AddAttributeInfo(_userId, _attributeName,
							_inputTypeID, _DefaultValue, _ValidationTypeID,
							_Length, _AliasName, _AliasToolTip, _AliasHelp,
							_DisplayOrder, _IsUnique, _IsRequired,
							_IsEnableEditor, _ShowInAdvanceSearch,
							_ShowInComparison, _IsUseInFilter,
							_IsIncludeInPriceRule, _IsShowInItemListing,
							_IsShowInItemDetail, _StoreID, _PortalID,
							_IsActive, _IsModified, _UserName, _CultureName,
							_ItemTypes, _Flag, _IsUsedInConfigItem,
							_saveOptions, _attributeValueId);

					return false;
				}
			}
		},

		AddAttributeInfo : function(_userId, _attributeName, _inputTypeID,
				_DefaultValue, _ValidationTypeID, _Length, _AliasName,
				_AliasToolTip, _AliasHelp, _DisplayOrder, _IsUnique,
				_IsRequired, _IsEnableEditor, _ShowInAdvanceSearch,
				_ShowInComparison, _IsUseInFilter, _IsIncludeInPriceRule,
				_IsShowInItemListing, _IsShowInItemDetail, _storeId, _portalId,
				_IsActive, _IsModified, _userName, _CultureName, _ItemTypes,
				_flag, _isUsedInConfigItem, _saveOptions, _attributeValueId) {

			var info = {
				AttributeID : parseInt(_userId),
				AttributeName : _attributeName,
				InputTypeID : _inputTypeID,
				DefaultValue : _DefaultValue,
				ValidationTypeID : _ValidationTypeID,
				Length : _Length >= 0 ? _Length : null,
				AliasName : _AliasName,
				AliasToolTip : _AliasToolTip,
				AliasHelp : _AliasHelp,
				DisplayOrder : _DisplayOrder,
				IsUnique : _IsUnique,
				IsRequired : _IsRequired,
				IsEnableEditor : _IsEnableEditor,
				ShowInAdvanceSearch : _ShowInAdvanceSearch,
				ShowInComparison : _ShowInComparison,
				IsIncludeInPriceRule : _IsIncludeInPriceRule,
				IsShowInItemListing : _IsShowInItemListing,
				IsShowInItemDetail : _IsShowInItemDetail,
				IsUseInFilter : _IsUseInFilter,
				StoreID : _storeId,
				PortalID : _portalId,
				IsActive : _IsActive,
				IsModified : _IsModified,
				UpdatedBy : _userName,
				AddedBy : _userName,
				CultureName : _CultureName,
				ItemTypes : _ItemTypes,
				Flag : _flag,
				IsUsedInConfigItem : _isUsedInConfigItem,
				SaveOptions : _saveOptions,
				AttributeValueID : _attributeValueId
			};

			this.config.url = this.config.baseURL + "SaveUpdateAttribute";
			this.config.data = JSON2.stringify({
				attributeInfo : info
			});
			this.config.ajaxCallMode = 9;
			this.ajaxCall(this.config);
			return false;
		},
		BindCollegeDropDown : function() {
			this.config.url = this.config.baseURL + "GetCollegeList";
			this.config.data = "{}";
			this.config.ajaxCallMode = 1;
			this.ajaxCall(this.config);
		},
		BindDepartmentDropDown : function(collegeName, flagSearch) {
			this.config.url = this.config.baseURL + "GetDepartmentList";
			this.config.data = JSON2.stringify({
				college : collegeName
			});
			if (flagSearch) {
				this.config.ajaxCallMode = 2;
			} else {
				this.config.ajaxCallMode = 3;
			}
			this.ajaxCall(this.config);
		},
		BindPositionTypeDropDown : function(collegeName, departmentName,
				flagSearch) {
			this.config.url = this.config.baseURL + "GetPositionTypeList";
			this.config.data = JSON2.stringify({
				college : collegeName,
				department : departmentName
			});
			if (flagSearch) {
				this.config.ajaxCallMode = 4;
			} else {
				this.config.ajaxCallMode = 5;
			}
			this.ajaxCall(this.config);
		},
		BindPositionTitleDropDown : function(collegeName, departmentName,
				positionTypeName, flagSearch) {
			this.config.url = this.config.baseURL + "GetPositionTitleList";
			this.config.data = JSON2.stringify({
				college : collegeName,
				department : departmentName,
				positionType : positionTypeName
			});
			if (flagSearch) {
				this.config.ajaxCallMode = 6;
			} else {
				this.config.ajaxCallMode = 7;
			}
			this.ajaxCall(this.config);
		},
		SearchUsers : function() {
			var userName = $.trim($("#txtSearchUserName").val());
			var college = $.trim($('#ddlSearchCollege').val()) == "" ? null : $
					.trim($('#ddlSearchCollege').val()) == "0" ? null : $
					.trim($('#ddlSearchCollege').val());
			var department = $.trim($('#ddlSearchDepartment').val()) == "" ? null
					: $.trim($('#ddlSearchDepartment').val()) == "0" ? null : $
							.trim($('#ddlSearchDepartment').val());
			var positionType = $.trim($('#ddlSearchPositionType').val()) == "" ? null
					: $.trim($('#ddlSearchPositionType').val()) == "0" ? null
							: $.trim($('#ddlSearchPositionType').val());
			var positionTitle = $.trim($('#ddlSearchPositionTitle').val()) == "" ? null
					: $.trim($('#ddlSearchPositionTitle').val()) == "0" ? null
							: $.trim($('#ddlSearchPositionTitle').val());
			var isActive = $.trim($("#ddlSearchIsActive").val()) == "" ? null
					: $.trim($("#ddlSearchIsActive").val()) == "True" ? true
							: false;
			if (userName.length < 1) {
				userName = null;
			}
			usersManage.BindUserGrid(userName, college, department,
					positionType, positionTitle, isActive);
		},
		ajaxSuccess : function(msg) {
			switch (usersManage.config.ajaxCallMode) {
			case 0:
				break;
			case 1: // For College Dropdown Binding for both form and search
				$('#ddlSearchCollege').get(rowIndex).options.length = 1;
				$('#ddlSearchDepartment').get(rowIndex).options.length = 1;
				$('#ddlSearchPositionType').get(rowIndex).options.length = 1;
				$('#ddlSearchPositionTitle').get(rowIndex).options.length = 1;

				$('select[name="ddlCollege"]').get(rowIndex).options.length = 0;
				$('select[name="ddlDepartment"]').get(rowIndex).options.length = 0;
				$('select[name="ddlPositionType"]').get(rowIndex).options.length = 0;
				$('select[name="ddlPositionTitle"]').get(rowIndex).options.length = 0;

				$
						.each(
								msg,
								function(index, item) {
									$("#ddlSearchCollege").get(rowIndex).options[$(
											"#ddlSearchCollege").get(rowIndex).options.length] = new Option(
											item, item);

									// For form Dropdown Binding
									$('select[name="ddlCollege"]')
											.get(rowIndex).options[$(
											'select[name="ddlCollege"]').get(
											rowIndex).options.length] = new Option(
											item, item);
								});
				usersManage.BindDepartmentDropDown($(
						'select[name="ddlCollege"]').eq(rowIndex).val(), false);
				break;

			case 2:// For Search Department Dropdown Binding
				$('#ddlSearchDepartment').get(rowIndex).options.length = 1;
				$('#ddlSearchPositionType').get(rowIndex).options.length = 1;
				$('#ddlSearchPositionTitle').get(rowIndex).options.length = 1;
				$
						.each(
								msg,
								function(index, item) {
									$("#ddlSearchDepartment").get(0).options[$(
											"#ddlSearchDepartment").get(0).options.length] = new Option(
											item, item);
								});
				break;

			case 3:// For Form Department Dropdown Binding
				$('select[name="ddlDepartment"]').get(rowIndex).options.length = 0;
				$('select[name="ddlPositionType"]').get(rowIndex).options.length = 0;
				$('select[name="ddlPositionTitle"]').get(rowIndex).options.length = 0;
				$
						.each(
								msg,
								function(index, item) {
									$('select[name="ddlDepartment"]').get(
											rowIndex).options[$(
											'select[name="ddlDepartment"]')
											.get(rowIndex).options.length] = new Option(
											item, item);
								});
				usersManage.BindPositionTypeDropDown($(
						'select[name="ddlCollege"]').eq(rowIndex).val(), $(
						'select[name="ddlDepartment"]').eq(rowIndex).val(),
						false);
				break;

			case 4: // For Search College Position Type Binding
				$('#ddlSearchPositionType').get(rowIndex).options.length = 1;
				$('#ddlSearchPositionTitle').get(rowIndex).options.length = 1;
				$
						.each(
								msg,
								function(index, item) {
									$("#ddlSearchPositionType").get(rowIndex).options[$(
											"#ddlSearchPositionType").get(0).options.length] = new Option(
											item, item);
								});
				break;

			case 5: // For Form College Position Type Binding
				$('select[name="ddlPositionType"]').get(rowIndex).options.length = 0;
				$('select[name="ddlPositionTitle"]').get(rowIndex).options.length = 0;
				$
						.each(
								msg,
								function(index, item) {
									$('select[name="ddlPositionType"]').get(
											rowIndex).options[$(
											'select[name="ddlPositionType"]')
											.get(rowIndex).options.length] = new Option(
											item, item);
								});
				usersManage.BindPositionTitleDropDown($(
						'select[name="ddlCollege"]').eq(rowIndex).val(), $(
						'select[name="ddlDepartment"]').eq(rowIndex).val(), $(
						'select[name="ddlPositionType"]').eq(rowIndex).val(),
						false);
				break;

			case 6: // For Search College Position Title Binding
				$('#ddlSearchPositionTitle').get(rowIndex).options.length = 1;
				$
						.each(
								msg,
								function(index, item) {
									$("#ddlSearchPositionTitle").get(rowIndex).options[$(
											"#ddlSearchPositionTitle").get(
											rowIndex).options.length] = new Option(
											item, item);
								});
				break;

			case 7: // For Form College Position Title Binding
				$('select[name="ddlPositionTitle"]').get(rowIndex).options.length = 0;
				$
						.each(
								msg,
								function(index, item) {
									$('select[name="ddlPositionTitle"]').get(
											rowIndex).options[$(
											'select[name="ddlPositionTitle"]')
											.get(rowIndex).options.length] = new Option(
											item, item);
								});
				break;
			}
		},
		ajaxFailure : function(msg) {
			switch (usersManage.config.ajaxCallMode) {
			case 0:
				break;
			case 1:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement,
								"Failed to load colleges list.") + '</p>');
				break;
			case 2:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement,
								"Failed to load departments list.") + '</p>');
				break;
			case 3:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement,
								"Failed to load departments list.") + '</p>');
				break;
			case 4:
				csscody
						.error('<h2>'
								+ getLocale(gpmsUsersManagement,
										"Error Message")
								+ '</h2><p>'
								+ getLocale(gpmsUsersManagement,
										"Failed to load position types list.")
								+ '</p>');
				break;
			case 5:
				csscody
						.error('<h2>'
								+ getLocale(gpmsUsersManagement,
										"Error Message")
								+ '</h2><p>'
								+ getLocale(gpmsUsersManagement,
										"Failed to load position types list.")
								+ '</p>');
				break;
			case 6:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement,
								"Failed to load position titles list.")
						+ '</p>');
				break;
			case 7:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement,
								"Failed to load position titles list.")
						+ '</p>');
				break;
			}
		},
		init : function(config) {
			usersManage.LoadStaticImage();
			usersManage.BindUserGrid(null, null, null, null, null, null);
			$('#divUserForm').hide();
			$('#divUserGrid').show();
			usersManage.BindCollegeDropDown();

			$("#ddlSearchCollege").bind("change", function() {
				if ($(this).val() != "0") {
					rowIndex = 0;
					usersManage.BindDepartmentDropDown($(this).val(), true);
				} else {
					$('#ddlSearchDepartment').find('option:gt(0)').remove();
				}

			});

			$("#ddlSearchDepartment").bind(
					"change",
					function() {
						if ($("#ddlSearchCollege").val() != "0"
								&& $(this).val() != "0") {
							rowIndex = 0;
							usersManage.BindPositionTypeDropDown($(
									"#ddlSearchCollege").val(), $(this).val(),
									true);
						} else {
							$('#ddlSearchPositionType').find('option:gt(0)')
									.remove();
						}

					});

			$("#ddlSearchPositionType").bind(
					"change",
					function() {
						if ($("#ddlSearchCollege").val() != "0"
								&& $("#ddlSearchDepartment").val() != "0"
								&& $(this).val() != "0") {
							rowIndex = 0;
							usersManage.BindPositionTitleDropDown($(
									"#ddlSearchCollege").val(), $(
									"#ddlSearchDepartment").val(), $(this)
									.val(), true);
						} else {
							$('#ddlSearchPositionTitle').find('option:gt(0)')
									.remove();
						}

					});

			// Form Position details Drop downs
			$('select[name="ddlCollege"]').bind("change", function() {
				rowIndex = $(this).closest('tr').prevAll("tr").length;
				if ($(this).val() != "0") {
					usersManage.BindDepartmentDropDown($(this).val(), false);
				} else {
					$(this).find('option:gt(0)').remove();
				}
			});

			$('select[name="ddlDepartment"]')
					.bind(
							"change",
							function() {
								rowIndex = $(this).closest('tr').prevAll("tr").length;
								if ($('select[name="ddlCollege"]').eq(rowIndex)
										.val() != "0"
										&& $(this).val() != "0") {
									usersManage.BindPositionTypeDropDown($(
											'select[name="ddlCollege"]').eq(
											rowIndex).val(), $(this).val(),
											false);
								} else {
									$('select[name="ddlPositionType"]').find(
											'option:gt(0)').remove();
								}
							});

			$('select[name="ddlPositionType"]')
					.bind(
							"change",
							function() {
								rowIndex = $(this).closest('tr').prevAll("tr").length;
								if ($('select[name="ddlCollege"]').eq(rowIndex)
										.val() != "0"
										&& $('select[name="ddlDepartment"]')
												.eq(rowIndex).val() != "0"
										&& $(this).val() != "0") {
									usersManage.BindPositionTitleDropDown($(
											'select[name="ddlCollege"]').eq(
											rowIndex).val(), $(
											'select[name="ddlDepartment"]').eq(
											rowIndex).val(), $(this).val(),
											false);
								} else {
									$('select[name="ddlPositionTitle"]').find(
											'option:gt(0)').remove();
								}

							});

			$('#btnDeleteSelected')
					.click(
							function() {
								var user_ids = '';
								user_ids = SageData.Get("gdvUsers").Arr
										.join(',');
								if (user_ids.length > 0) {
									var properties = {
										onComplete : function(e) {
											usersManage.ConfirmDeleteMultiple(
													user_ids, e);
										}
									};
									csscody
											.confirm(
													"<h2>"
															+ getLocale(
																	gpmsUsersManagement,
																	'Delete Confirmation')
															+ "</h2><p>"
															+ getLocale(
																	gpmsUsersManagement,
																	'Are you sure you want to delete selected user(s)?')
															+ "</p>",
													properties);
								} else {
									csscody
											.alert('<h2>'
													+ getLocale(
															gpmsUsersManagement,
															"Information Alert")
													+ '</h2><p>'
													+ getLocale(
															gpmsUsersManagement,
															"Please select at least one user before deleting.")
													+ '</p>');
								}
							});

			$('#btnAddNew').bind("click", function() {
				$('#divUserGrid').hide();
				$('#divUserForm').show();
				usersManage.ClearForm();
			});

			$('#btnBack').bind("click", function() {
				$('#divUserForm').hide();
				$('#divUserGrid').show();
				usersManage.ClearForm();
			});

			$('#btnReset').bind("click", function() {
				usersManage.ClearForm();
			});

			$('#btnSaveUser').click(function() {
				var user_id = $(this).prop("name");
				if (user_id != '') {
					editFlag = user_id;
					usersManage.SaveUser(user_id, false);
				} else {
					editFlag = 0;
					usersManage.SaveUser(0, true);
				}
			});

			$('#txtUserName')
					.blur(
							function() {
								var errors = '';
								var attributeName = $(this).val();
								var user_id = $('#btnSaveUser').prop("name");
								if (user_id == '') {
									user_id = 0;
								}
								if (!attributeName) {
									errors += getLocale(gpmsUsersManagement,
											"Please enter user name");
								} else if (!usersManage.IsUnique(attributeName,
										user_id)) {
									errors += "'"
											+ getLocale(gpmsUsersManagement,
													"Please enter Please enter unique user name")
											+ "'"
											+ attributeName.trim()
											+ "'"
											+ getLocale(gpmsUsersManagement,
													"already exists.")
											+ '<br/>';
								}

								if (errors) {
									$('.cssClassRight').hide();
									$('.cssClassError').show();
									$(".cssClassError").parent('div').addClass(
											"diverror");
									$('.cssClassError').prevAll("input:first")
											.addClass("error");
									$('.cssClassError').html(errors);
									return false;
								} else {
									$(this).parent("td").find("span.error")
											.hide();
									$('.cssClassRight').show();
									$('.cssClassError').hide();
									$(".cssClassError").parent('div')
											.removeClass("diverror");
									$('.cssClassError').prevAll("input:first")
											.removeClass("error");
								}
							});

			$(".delbutton").click(function() {
				var user_id = $(this).prop("id").replace(/[^0-9]/gi, '');
				usersManage.DeleteUserById(user_id);
			});

			$("td.required input, td select").focusout(function() {
				$tdParent = $(this).parent();
				if ($tdParent.find('.cssClassRequired')) {
					if ($(this).val() != '' && $(this).val() != '0') {
						$tdParent.find('.cssClassRequired').hide();
					} else {
						$tdParent.find('.cssClassRequired').show();
					}
				}
			});

			$("input[type=button].AddOption").click(
					function() {
						if ($(this).prop("name") == "DeleteOption") {
							var t = $(this).closest('tr');

							t.find("td").wrapInner(
									"<div style='DISPLAY: block'/>").parent()
									.find("td div").slideUp(300, function() {
										t.remove();
									});

						} else if ($(this).prop("name") == "AddMore") {
							var cloneRow = $(this).closest('tr').clone(true);
							$(cloneRow).find("input").each(
									function(i) {
										if ($(this).hasClass("AddOption")) {
											$(this)
													.prop("name",
															"DeleteOption");
											$(this).prop("value", "Delete");
										}
										$(this).parent('td').find('span')
												.removeClass('error');
										$(this).removeClass('error');
									});
							$(cloneRow).appendTo("#dataTable");
							rowIndex = $('#dataTable > tbody tr').size() - 1;
							usersManage.BindDepartmentDropDown($(
									'select[name="ddlCollege"]').eq(rowIndex)
									.val(), false);
							$('#dataTable tr:last td').fadeIn('slow');
						}
					});
			$("#btnSearchUser").bind("click", function() {
				usersManage.SearchUsers();
				return false;
			});

			$(
					'#txtSearchUserName,#ddlSearchCollege,#ddlSearchDepartment,#ddlSearchPositionType,#ddlSearchPositionTitle,#ddlSearchIsActive')
					.keyup(function(event) {
						if (event.keyCode == 13) {
							$("#btnSearchUser").click();
						}
					});
		}
	};
	usersManage.init();
});