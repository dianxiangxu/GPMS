var usersManage = '';
function reinitialise() {
	if ($('body').find('#BoxOverlay').length == 0) {
		csscody.initialize();
	}
}

$(function() {
	var gpmsCommonObj = function() {
		var gpmsCommonInfo = {
			UserName : GPMS.utils.GetUserName(),
			UserAccountID : GPMS.utils.GetUserAccountID(),
			CultureName : GPMS.utils.GetCultureName()
		};
		return gpmsCommonInfo;
	};
	var isUnique = false;
	var editFlag = 0;
	var arrAttrValueId = "";
	usersManage = {
		config : {
			isPostBack : false,
			async : false,
			cache : false,
			type : 'POST',
			contentType : "application/json; charset=utf-8",
			data : '{}',
			dataType : 'json',
			baseURL : GPMS.utils.GetGPMSServicePath() + "jsonServices/",
			method : "",
			url : "",
			ajaxCallMode : 0
		},
		ajaxCall : function(config) {
			$
					.ajax({
						type : usersManage.config.type,
						beforeSend : function(request) {
							request.setRequestHeader('ASPX-TOKEN', _aspx_token);
							request.setRequestHeader("UMID", umi);
							request.setRequestHeader("UName", GPMS.utils
									.GetUserName());
							request.setRequestHeader("PID", GPMS.utils
									.GetUserAccountID());
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
		LoadAttributeStaticImage : function() {
			$('.cssClassSuccessImg').prop('src',
					'' + GPMS.utils.GetGPMSRootPath() + '/images/right.jpg');
		},
		ClearOptionTable : function(btnAddOption) {
			btnAddOption.closest("tr:eq(0)").find("input:not(:last)").each(
					function(i) {
						$(this).val('');
						$(this).removeAttr('checked');
					});
		},
		onInit : function() {
			usersManage.SetFirstTabActive();
			$("#ddlApplyTo").val('0');
			$('.itemTypes').hide();
			$('#btnReset').hide();
			$('.cssClassRight').hide();
			$('.cssClassError').hide();
			$("#lstItemType").each(function() {
				$("#lstItemType option").removeAttr("selected");
			});
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
			$('#lblAttrFormHeading').html(
					getLocale(gpmsUsersManagement, "New User Details"));
			$(".delbutton").removeAttr("id");
			$("#btnSaveAttribute").removeAttr("name");
			$('#lblLength').html(getLocale("Length:"));
			$(".delbutton").hide();
			$("#btnReset").show();
			$(".required:enabled").each(function() {

				if ($(this).parent("td").find("span.error").length == 1) {
					$(this).removeClass("error").addClass("required");
					$(this).parent("td").find("span.error").remove();
				}

			});
			$('#txtAttributeName').val('');
			$('#txtAttributeName').removeAttr('disabled');
			$('#ddlAttributeType').val('1');
			$('#ddlAttributeType').removeAttr('disabled');

			$("#default_value_text").prop("class", "sfInputbox");
			$("#default_value_text").val('');
			$("#default_value_textarea").val('');
			$("#default_value_date").val('');
			$("#trdefaultValue").show();
			$("#default_value_text").show();
			$("#fileDefaultTooltip").html('');
			$("#fileDefaultTooltip").hide();
			$("#default_value_textarea").hide();
			$("#div_default_value_date").hide();
			$("#default_value_yesno").hide();

			$('#default_value_text').val('');
			$("#dataTable tr:gt(1)").remove();
			usersManage.ClearOptionTable($("input[type='button'].AddOption"));
			$('#trOptionsAdd').hide();

			$('#ddlTypeValidation').val('8');
			$('#ddlTypeValidation').removeAttr('disabled');

			$('#txtLength').val('');
			$('#txtLength').removeAttr('disabled');
			$('#txtLength').next('span').next('span').show();
			$('#txtAliasName').val('');
			$('#txtAliasToolTip').val('');
			$('#txtAliasHelp').val('');
			$('#txtDisplayOrder').val('');
			$('#ddlApplyTo').val('0');
			$('.itemTypes').hide();

			$('input[name=chkUniqueValue]').removeAttr('checked');
			$('input[name=chkValuesRequired]').removeAttr('checked');
			$('input[name=chkActive]').prop('checked', 'checked');
			$('#activeTR').show();

			$('input[name=chkIsEnableEditor]').removeAttr('checked');
			$('input[name=chkIsEnableEditor]').prop('disabled', 'disabled');
			$('input[name=chkUseInAdvancedSearch]').removeAttr('disabled');
			$('input[name=chkUseInAdvancedSearch]').removeAttr('checked');
			$('input[name=chkComparable]').removeAttr('disabled');
			$('input[name=chkComparable]').removeAttr('checked');
			$('input[name=chkUseForPriceRule]').removeAttr('disabled');
			$('input[name=chkUseForPriceRule]').removeAttr('checked');
			$('input[name=chkIsUseInFilter]').removeAttr('disabled');
			$('input[name=chkShowInItemListing]').removeAttr('checked');
			$('input[name=chkShowInItemDetail]').removeAttr('checked');

			$('input[name=optionValueId]').val('0');
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
		ValidationTypeEnableDisable : function(fillOptionValues, isChanged) {
			var selectedVal = $("#ddlAttributeType :selected").val();
			switch (selectedVal) {
			case "1":
				$("#ddlTypeValidation").removeAttr('disabled');
				$('#' + lblDefaultValue).html(
						getLocale(gpmsUsersManagement, "Default Value:"));
				$('#lblLength').html(getLocale(gpmsUsersManagement, "Length:"));
				if (isChanged) {
					$('#txtLength').val('');
				}
				$("#txtLength").removeAttr('disabled');
				$('#txtLength').next('span').next('span').show();
				$("#trdefaultValue").show();
				$("#default_value_text").show();
				$("#fileDefaultTooltip").html('');
				$("#fileDefaultTooltip").hide();
				$("#default_value_textarea").hide();
				$("#div_default_value_date").hide();
				$("#default_value_yesno").hide();
				$('#trOptionsAdd').hide();
				$('input[name=chkIsEnableEditor]').prop('disabled', 'disabled');
				break;
			case "2":
				$('#ddlTypeValidation').val('8');
				$("#ddlTypeValidation").prop('disabled', 'disabled');
				$('#' + lblDefaultValue).html("Default Value:");
				$('#lblLength').html("Rows:");
				if (isChanged) {
					$('#txtLength').val(3);
				}
				$("#txtLength").removeAttr('disabled');
				$('#txtLength').next('span').next('span').show();
				$("#trdefaultValue").show();
				$("#default_value_text").hide();
				$("#fileDefaultTooltip").html('');
				$("#fileDefaultTooltip").hide();
				$("#default_value_textarea").show();
				$("#div_default_value_date").hide();
				$("#default_value_yesno").hide();
				$('#trOptionsAdd').hide();
				$('input[name=chkIsEnableEditor]').removeAttr('disabled');
				break;
			case "3":
				$('#ddlTypeValidation').val('8');
				$('#' + lblDefaultValue).html(
						getLocale(gpmsUsersManagement, "Default Value:"));
				$('#lblLength').html(getLocale(gpmsUsersManagement, "Length:"));
				if (isChanged) {
					$('#txtLength').val('');
				}
				$("#ddlTypeValidation").prop('disabled', 'disabled');
				$("#txtLength").prop('disabled', 'disabled');
				$('#txtLength').next('span').next('span').hide();
				$("#trdefaultValue").show();
				$("#default_value_text").hide();
				$("#fileDefaultTooltip").html('');
				$("#fileDefaultTooltip").hide();
				$("#default_value_textarea").hide();
				$("#div_default_value_date").show();
				$("#default_value_date").datepicker({
					dateFormat : 'yy/mm/dd'
				});
				$("#default_value_yesno").hide();
				$('#trOptionsAdd').hide();
				$('input[name=chkIsEnableEditor]').prop('disabled', 'disabled');
				break;
			case "4":
				$('#ddlTypeValidation').val('8');
				$('#' + lblDefaultValue).html(
						getLocale(gpmsUsersManagement, "Default Value:"));
				$('#lblLength').html(getLocale(gpmsUsersManagement, "Length:"));
				if (isChanged) {
					$('#txtLength').val('');
				}
				$("#ddlTypeValidation").prop('disabled', 'disabled');
				$("#txtLength").prop('disabled', 'disabled');
				$('#txtLength').next('span').next('span').hide();
				$("#trdefaultValue").show();
				$("#default_value_text").hide();
				$("#fileDefaultTooltip").html('');
				$("#fileDefaultTooltip").hide();
				$("#default_value_textarea").hide();
				$("#div_default_value_date").hide();
				$("#default_value_yesno").show();
				$('#trOptionsAdd').hide();
				$('input[name=chkIsEnableEditor]').prop('disabled', 'disabled');
				break;
			case "5":
				$('#ddlTypeValidation').val('8');
				$('#lblLength').html("Length:");
				$("#ddlTypeValidation").prop('disabled', 'disabled');
				$("#ddlTypeValidation").prop('disabled', 'disabled');
				$('#lblLength').html(getLocale(gpmsUsersManagement, "Size:"));
				$("#txtLength").removeAttr('disabled');
				$('#txtLength').next('span').next('span').show();
				if (isChanged) {
					$('#txtLength').val(3);
				}
				$("#trdefaultValue").hide();
				$('#trOptionsAdd').show();
				$(".tddefault")
						.html(
								'<input type=\"checkbox\" name=\"defaultChk\" class=\"class-isdefault\">');
				$(".AddOption").val("Add More");
				$(".AddOption").show();
				usersManage.BindAttributeOptionsValues(fillOptionValues);
				$('input[name=chkIsEnableEditor]').prop('disabled', 'disabled');
				break;
			case "6":
				$('#ddlTypeValidation').val('8');
				$('#lblLength').html(getLocale(gpmsUsersManagement, "Length:"));
				if (isChanged) {
					$('#txtLength').val('');
				}
				$("#ddlTypeValidation").prop('disabled', 'disabled');
				$("#txtLength").val('');
				$("#txtLength").prop('disabled', 'disabled');
				$('#txtLength').next('span').next('span').hide();
				$("#trdefaultValue").hide();
				$('#trOptionsAdd').show();
				$(".tddefault")
						.html(
								'<input type=\"radio\" name=\"defaultRdo\" class=\"class-isdefault\">');
				$(".AddOption").val("Add More");
				$(".AddOption").show();
				usersManage.BindAttributeOptionsValues(fillOptionValues);
				$('input[name=chkIsEnableEditor]').prop('disabled', 'disabled');
				break;
			case "7":
				$('#ddlTypeValidation').val('6');
				$('#' + lblDefaultValue).html(
						getLocale(gpmsUsersManagement, "Default Value:"));
				$('#lblLength').html(getLocale(gpmsUsersManagement, "Length:"));
				if (isChanged) {
					$('#txtLength').val('');
				}
				$("#ddlTypeValidation").prop('disabled', 'disabled');
				$("#txtLength").removeAttr('disabled');
				$('#txtLength').next('span').next('span').show();
				$("#trdefaultValue").show();
				$("#default_value_text").show();
				$("#fileDefaultTooltip").html('');
				$("#fileDefaultTooltip").hide();
				$("#default_value_textarea").hide();
				$("#div_default_value_date").hide();
				$("#default_value_yesno").hide();
				$('#trOptionsAdd').hide();
				$('input[name=chkIsEnableEditor]').prop('disabled', 'disabled');
				break;
			case "8":
				$('#ddlTypeValidation').val('8');
				$('#' + lblDefaultValue).html(
						getLocale(gpmsUsersManagement,
								"Allowed File Extension(s):"));
				$("#fileDefaultTooltip").html(
						getLocale(gpmsUsersManagement,
								"- Separate each file extensions with space"));
				$("#fileDefaultTooltip").show();
				$('#lblLength').html(
						getLocale(gpmsUsersManagement, "Size:(KB)"));
				if (isChanged) {
					$('#txtLength').val('');
				}
				$("#ddlTypeValidation").prop('disabled', 'disabled');
				$("#txtLength").removeAttr('disabled');
				$('#txtLength').next('span').next('span').show();
				$("#trdefaultValue").show();
				$("#default_value_text").show();
				$("#default_value_textarea").hide();
				$("#div_default_value_date").hide();
				$("#default_value_yesno").hide();
				$('#trOptionsAdd').hide();
				$('input[name=chkIsEnableEditor]').prop('disabled', 'disabled');
				break;
			case "9":
				$('#ddlTypeValidation').val('8');
				$('#lblLength').html(getLocale(gpmsUsersManagement, "Length:"));
				if (isChanged) {
					$('#txtLength').val('');
				}
				$("#ddlTypeValidation").prop('disabled', 'disabled');
				$("#txtLength").prop('disabled', 'disabled');
				$('#txtLength').next('span').next('span').hide();
				$("#trdefaultValue").hide();
				$('#trOptionsAdd').show();

				$(".tddefault")
						.html(
								'<input type=\"radio\" name=\"defaultRdo\" class=\"class-isdefault\">');
				$(".AddOption").hide();
				usersManage.BindAttributeOptionsValues(fillOptionValues);
				$('input[name=chkIsEnableEditor]').prop('disabled', 'disabled');
				break;
			case "10":
				$('#ddlTypeValidation').val('8');
				$('#lblLength').html(getLocale(gpmsUsersManagement, "Length:"));
				if (isChanged) {
					$('#txtLength').val('');
				}
				$("#ddlTypeValidation").prop('disabled', 'disabled');
				$("#txtLength").prop('disabled', 'disabled');
				$('#txtLength').next('span').next('span').hide();
				$("#trdefaultValue").hide();
				$('#trOptionsAdd').show();
				$(".tddefault")
						.html(
								'<input type=\"radio\" name=\"defaultRdo\" class=\"class-isdefault\">');
				$(".AddOption").val("Add More");
				$(".AddOption").show();
				usersManage.BindAttributeOptionsValues(fillOptionValues);
				$('input[name=chkIsEnableEditor]').prop('disabled', 'disabled');
				break;
			case "11":
				$('#ddlTypeValidation').val('8');
				$('#lblLength').html(getLocale(gpmsUsersManagement, "Length:"));
				if (isChanged) {
					$('#txtLength').val('');
				}
				$("#ddlTypeValidation").prop('disabled', 'disabled');
				$("#txtLength").prop('disabled', 'disabled');
				$('#txtLength').next('span').next('span').hide();
				$("#trdefaultValue").hide();
				$('#trOptionsAdd').show();
				$(".tddefault")
						.html(
								'<input type=\"checkbox\" name=\"defaultChk\" class=\"class-isdefault\">');
				$(".AddOption").hide();
				usersManage.BindAttributeOptionsValues(fillOptionValues);
				$('input[name=chkIsEnableEditor]').prop('disabled', 'disabled');
				break;
			case "12":
				$('#ddlTypeValidation').val('8');
				$('#lblLength').html(getLocale(gpmsUsersManagement, "Length:"));
				if (isChanged) {
					$('#txtLength').val('');
				}
				$("#ddlTypeValidation").prop('disabled', 'disabled');
				$("#txtLength").prop('disabled', 'disabled');
				$('#txtLength').next('span').next('span').hide();
				$("#trdefaultValue").hide();
				$('#trOptionsAdd').show();
				$(".tddefault")
						.html(
								'<input type=\"checkbox\" name=\"defaultChk\" class=\"class-isdefault\">');
				$(".AddOption").val(getLocale(gpmsUsersManagement, "Add More"));
				$(".AddOption").show();
				usersManage.BindAttributeOptionsValues(fillOptionValues);
				$('input[name=chkIsEnableEditor]').prop('disabled', 'disabled');
				break;
			case "13":
				$("#ddlTypeValidation").removeAttr('disabled');
				$('#' + lblDefaultValue).html(
						getLocale(gpmsUsersManagement, "Default Value:"));
				$('#lblLength').html(getLocale(gpmsUsersManagement, "Length:"));
				if (isChanged) {
					$('#txtLength').val('');
				}
				$("#txtLength").removeAttr('disabled');
				$('#txtLength').next('span').next('span').show();
				$("#trdefaultValue").show();
				$("#default_value_text").show();
				$("#fileDefaultTooltip").html('');
				$("#fileDefaultTooltip").hide();
				$("#default_value_textarea").hide();
				$("#div_default_value_date").hide();
				$("#default_value_yesno").hide();
				$('#trOptionsAdd').hide();
				$('input[name=chkIsEnableEditor]').prop('disabled', 'disabled');
				break;
			default:
				break;
			}
		},

		BindAttributeGrid : function(attributeNm, required, SearchComparable,
				isSystem) {
			this.config.url = this.config.baseURL;
			this.config.method = "GetUsersList";
			var offset_ = 1;
			var current_ = 1;
			var perpage = ($("#gdvAttributes_pagesize").length > 0) ? $(
					"#gdvAttributes_pagesize :selected").text() : 10;
			var attrbuteBindObj = {
				AttributeName : attributeNm,
				IsRequired : required,
				ShowInComparison : SearchComparable,
				IsSystemUsed : isSystem
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
					checkFor : '5',
					elemClass : 'attrChkbox',
					elemDefault : false,
					controlclass : 'attribHeaderChkbox'
				}, {
					display : 'First Name',
					name : 'first_name',
					cssclass : '',
					controlclass : '',
					coltype : 'label',
					align : 'left'
				}, {
					display : 'Middle Name',
					name : 'middle_Name',
					cssclass : '',
					controlclass : '',
					coltype : 'label',
					align : 'left'
				}, {
					display : 'Last Name',
					name : 'last_name',
					cssclass : '',
					controlclass : '',
					coltype : 'label',
					align : 'left'
				}, {
					display : 'User Name',
					name : 'user_name',
					cssclass : '',
					controlclass : '',
					coltype : 'label',
					align : 'left'
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
					display : getLocale(gpmsUsersManagement, 'Added On'),
					name : 'AddedOn',
					cssclass : 'cssClassHeadDate',
					controlclass : '',
					coltype : 'label',
					align : 'left'
				// ,
				// type : 'date',
				// format : 'yyyy/MM/dd'
				},

				{
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
					callMethod : 'usersManage.EditAttributes',
					arguments : '1,2,3,4,5,6,7'
				}, {
					display : getLocale(gpmsUsersManagement, "Delete"),
					name : 'delete',
					enable : true,
					_event : 'click',
					trigger : '2',
					callMethod : 'usersManage.DeleteAttributes',
					arguments : '5'
				}, {
					display : getLocale(gpmsUsersManagement, "Activate"),
					name : 'activate',
					enable : true,
					_event : 'click',
					trigger : '4',
					callMethod : 'usersManage.ActiveAttributes',
					arguments : '5'
				}, {
					display : getLocale(gpmsUsersManagement, "Deactivate"),
					name : 'deactivate',
					enable : true,
					_event : 'click',
					trigger : '5',
					callMethod : 'usersManage.DeactiveAttributes',
					arguments : '5'
				} ],
				rp : perpage,
				nomsg : getLocale(gpmsUsersManagement, 'No Records Found!'),
				param : {
					attrbuteBindObj : attrbuteBindObj,
					gpmsCommonObj : gpmsCommonObj()
				},
				current : current_,
				pnew : offset_,
				sortcol : {
					0 : {
						sorter : false
					},
					7 : {
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
			$.each(response.d, function(index, item) {

				$('#txtAttributeName').val(item.AttributeName);
				$('#ddlAttributeType').val(item.InputTypeID);
				$('#ddlAttributeType').prop('disabled', 'disabled');

				usersManage.FillDefaultValue(item.DefaultValue);

				$('#ddlTypeValidation').val(item.ValidationTypeID);
				$('#txtLength').val(item.Length);
				$('#txtAliasName').val(item.AliasName);
				$('#txtAliasToolTip').val(item.AliasToolTip);
				$('#txtAliasHelp').val(item.AliasHelp);
				$('#txtDisplayOrder').val(item.DisplayOrder);

				$('input[name=chkUniqueValue]').prop('checked', item.IsUnique);
				$('input[name=chkValuesRequired]').prop('checked',
						item.IsRequired);
				$('input[name=chkActive]').prop('checked', item.IsActive);

				$('input[name=chkIsEnableEditor]').prop('checked',
						item.IsEnableEditor);
				$('input[name=chkUseInAdvancedSearch]').prop('checked',
						item.ShowInAdvanceSearch);
				$('input[name=chkComparable]').prop('checked',
						item.ShowInComparison);
				$('input[name=chkUseForPriceRule]').prop('checked',
						item.IsIncludeInPriceRule);
				$('input[name=chkIsUseInFilter]').prop('checked',
						item.IsUseInFilter);
				$('input[name=chkShowInItemListing]').prop('checked',
						item.IsShowInItemListing);
				$('input[name=chkShowInItemDetail]').prop('checked',
						item.IsShowInItemDetail);
				usersManage.ValidationTypeEnableDisable(item.FillOptionValues,
						false);

				if (item.ItemTypes.length > 0) {
					$('#ddlApplyTo').val('1');
					$('.itemTypes').show();
					var itemsType = item.ItemTypes;
					var arr = itemsType.split(",");
					$.each(arr, function(i) {
						$("#lstItemType option[value=" + arr[i] + "]").prop(
								"selected", "selected");
					});
				} else {
					$('#ddlApplyTo').val('0');
				}
			});
		},
		EditAttributes : function(tblID, argus) {
			usersManage.ClearForm();
			switch (tblID) {
			case "gdvUsers":
				$('#languageSelect').find('li').each(
						function() {
							if ($(this).attr("value") == GPMS.utils
									.GetCultureName()) {
								$('#languageSelect').find('li').removeClass(
										"languageSelected");
								$(this).addClass("languageSelected");
								return;

							}
						});
				$('#lblAttrFormHeading').html(
						getLocale(gpmsUsersManagement, 'Edit User Details: ')
								+ argus[3]);
				$('#txtAttributeName').prop('disabled', 'disabled');
				if (argus[7].toLowerCase() != "yes") {
					$(".delbutton").prop("id", 'attributeid' + argus[0]);
					$(".delbutton").show();
					$('#activeTR').show();
					$("#ddlTypeValidation").removeAttr('disabled');
					$('input[name=chkUseInAdvancedSearch]').removeAttr(
							'disabled');
					$('input[name=chkComparable]').removeAttr('disabled');
					$('input[name=chkIsUseInFilter]').removeAttr('disabled');
					$('input[name=chkUseForPriceRule]').removeAttr('disabled');
					$('input[name=chkShowInItemListing]')
							.removeAttr('disabled');
					$('input[name=chkShowInItemDetail]').removeAttr('disabled');

					$("input[class=class-text]").removeAttr('disabled');
					$("input[class=class-isdefault]").removeAttr('disabled');
					$("input[name=AddMore]").removeAttr('disabled');
					$("input[name=DeleteOption]").removeAttr('disabled');
					$('#lstItemType').removeAttr('disabled');
					$('#txtDisplayOrder').removeAttr('disabled');
					$('#txtLength').removeAttr('disabled');
					$('#ddlApplyTo').removeAttr('disabled');
					$("input[name=default_value_text]").removeAttr('disabled');
					$('#txtLength').removeAttr('disabled');
					$("input[name=chkUniqueValue]").removeAttr('disabled');
					$("input[name=chkValuesRequired]").removeAttr('disabled');
				} else {
					$(".delbutton").hide();
					$('#activeTR').hide();
					$("#ddlTypeValidation").prop('disabled', 'disabled');
					$('input[name=chkUseInAdvancedSearch]').prop('disabled',
							'disabled');
					$('input[name=chkComparable]').prop('disabled', 'disabled');
					$('input[name=chkIsUseInFilter]').prop('disabled',
							'disabled');
					$('input[name=chkUseForPriceRule]').prop('disabled',
							'disabled');
					$('input[name=chkShowInItemListing]').prop('disabled',
							'disabled');
					$('input[name=chkShowInItemDetail]').prop('disabled',
							'disabled');

					$("input[class=class-text]").prop('disabled', 'disabled');
					$("input[class=class-isdefault]").prop('disabled',
							'disabled');
					$("input[name=AddMore]").attr("disabled", "disabled");
					$("input[name=DeleteOption]").attr("disabled", "disabled");
					$("input[name=Alias]").removeAttr('disabled');
					$('#lstItemType').attr("disabled", "disabled");
					$('#txtDisplayOrder').attr("disabled", "disabled");
					$('#txtLength').attr("disabled", "disabled");
					$('#ddlApplyTo').attr("disabled", "disabled");
					$("input[name=default_value_text]").prop('disabled',
							'disabled');
					$('#txtLength').attr("disabled", "disabled");
					$("input[name=chkUniqueValue]")
							.prop('disabled', 'disabled');
					$("input[name=chkValuesRequired]").prop('disabled',
							'disabled');
				}
				$("#btnSaveAttribute").prop("name", argus[0]);
				usersManage.onInit();

				usersManage.config.url = usersManage.config.baseURL
						+ "GetUsersByProfileId";
				usersManage.config.data = JSON2.stringify({
					attributeId : argus[0],
					gpmsCommonObj : gpmsCommonObj()
				});
				usersManage.config.ajaxCallMode = 4;
				usersManage.ajaxCall(usersManage.config);
				var attValType = $("#ddlTypeValidation").val();
				$("#default_value_text").prop(
						"class",
						"sfInputbox "
								+ usersManage.CreateValidationClass(attValType)
								+ "");
				$('#iferror').html(
						usersManage.GetValidationTypeErrorMessage(attValType));
				break;
			default:
				break;
			}
		},
		DateDeserialize : function(dateStr) {
			return eval('new' + dateStr.replace(/\//g, ' '));
		},

		RebindAttributesOnLanguageChange : function() {
			// Added for rebinding data in language select options
			var gpmsCommonInfo = gpmsCommonObj();
			if ($("#languageSelect").length > 0) {
				gpmsCommonInfo.CultureName = $(".languageSelected").attr(
						"value");
			}
			// usersManage.onInit();
			usersManage.config.url = usersManage.config.baseURL
					+ "GetAttributeDetailsByAttributeID";
			usersManage.config.data = JSON2.stringify({
				attributeId : $("#btnSaveAttribute").prop("name"),
				gpmsCommonObj : gpmsCommonInfo
			});
			usersManage.config.ajaxCallMode = 4;
			usersManage.ajaxCall(usersManage.config);
			var attValType = $("#ddlTypeValidation").val();
			$("#default_value_text").prop(
					"class",
					"sfInputbox "
							+ usersManage.CreateValidationClass(attValType)
							+ "");
			$('#iferror').html(
					usersManage.GetValidationTypeErrorMessage(attValType));
		},

		DeleteAttributes : function(tblID, argus) {
			switch (tblID) {
			case "gdvUsers":
				if (argus[3].toLowerCase() != "yes") {
					usersManage.DeleteAttribute(argus[0]);
				} else {
					csscody
							.alert('<h2>'
									+ getLocale(gpmsUsersManagement,
											"Information Alert")
									+ '</h2><p>'
									+ getLocale(gpmsUsersManagement,
											"Sorry! System attribute can not be deleted.")
									+ '</p>');
				}
				break;
			default:
				break;
			}
		},
		ConfirmDeleteMultiple : function(attribute_ids, event) {
			if (event) {
				usersManage.DeleteMultipleAttribute(attribute_ids);
			}
		},

		DeleteMultipleAttribute : function(_attributeIds) {
			this.config.url = this.config.baseURL
					+ "DeleteMultipleAttributesByAttributeID";
			this.config.data = JSON2.stringify({
				attributeIds : _attributeIds,
				gpmsCommonObj : gpmsCommonObj()
			});
			this.config.ajaxCallMode = 6;
			this.ajaxCall(this.config);
			return false;
		},

		DeleteAttribute : function(_attributeId) {
			var properties = {
				onComplete : function(e) {
					usersManage.ConfirmSingleDelete(_attributeId, e);
				}
			};
			csscody.confirm("<h2>"
					+ getLocale(gpmsUsersManagement, "Delete Confirmation")
					+ "</h2><p>"
					+ getLocale(gpmsUsersManagement,
							"Are you sure you want to delete this attribute?")
					+ "</p>", properties);
		},

		ConfirmSingleDelete : function(attribute_id, event) {
			if (event) {
				usersManage.DeleteSingleAttribute(attribute_id);
			}
			return false;
		},

		DeleteSingleAttribute : function(_attributeId) {
			this.config.url = this.config.baseURL
					+ "DeleteAttributeByAttributeID";
			this.config.data = JSON2.stringify({
				attributeId : parseInt(_attributeId),
				gpmsCommonObj : gpmsCommonObj()
			});
			this.config.ajaxCallMode = 5;
			this.ajaxCall(this.config);
		},

		ActivateAttribute : function(_attributeId, _isActive) {
			this.config.url = this.config.baseURL
					+ "UpdateAttributeIsActiveByAttributeID";
			this.config.data = JSON2.stringify({
				attributeId : parseInt(_attributeId),
				gpmsCommonObj : gpmsCommonObj(),
				isActive : _isActive
			});
			this.config.ajaxCallMode = 7;
			this.ajaxCall(this.config);
			return false;
		},
		DeactiveAttributes : function(tblID, argus) {
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
		ActiveAttributes : function(tblID, argus) {
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
		IsUnique : function(attributeName, attributeId) {
			var attrbuteUniqueObj = {
				AttributeID : attributeId,
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
		SaveAttribute : function(_attributeId, _flag) {
			$('#iferror').hide();
			if (checkForm($("#form1"))) {
				var selectedItemTypeID = '';
				var validateErrorMessage = '';
				var itemSelected = false;
				var isUsedInConfigItem = false;

				var attributeName = $('#txtAttributeName').val();
				if (!attributeName) {
					validateErrorMessage += 'Please enter attribute name.<br/>';
				} else if (!usersManage.IsUnique(attributeName, _attributeId)) {
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

					var _attributeName = $('#txtAttributeName').val();
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

					usersManage.AddAttributeInfo(_attributeId, _attributeName,
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

		AddAttributeInfo : function(_attributeId, _attributeName, _inputTypeID,
				_DefaultValue, _ValidationTypeID, _Length, _AliasName,
				_AliasToolTip, _AliasHelp, _DisplayOrder, _IsUnique,
				_IsRequired, _IsEnableEditor, _ShowInAdvanceSearch,
				_ShowInComparison, _IsUseInFilter, _IsIncludeInPriceRule,
				_IsShowInItemListing, _IsShowInItemDetail, _storeId, _portalId,
				_IsActive, _IsModified, _userName, _CultureName, _ItemTypes,
				_flag, _isUsedInConfigItem, _saveOptions, _attributeValueId) {

			var info = {
				AttributeID : parseInt(_attributeId),
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
		BindAttributesInputType : function() {
			this.config.url = this.config.baseURL
					+ "GetAttributesInputTypeList";
			this.config.data = "{}";
			this.config.ajaxCallMode = 1;
			this.ajaxCall(this.config);
		},
		BindAttributesValidationType : function() {
			this.config.url = this.config.baseURL
					+ "GetAttributesValidationTypeList";
			this.config.data = "{}";
			this.config.ajaxCallMode = 2;
			this.ajaxCall(this.config);
		},
		BindAttributesItemType : function() {
			this.config.url = this.config.baseURL + "GetAttributesItemTypeList";
			this.config.data = JSON2.stringify({
				gpmsCommonObj : gpmsCommonObj()
			});
			this.config.ajaxCallMode = 3;
			this.ajaxCall(this.config);
		},
		SearchAttributeName : function() {
			var attributeNm = $.trim($("#txtSearchAttributeName").val());
			var required = $.trim($('#ddlIsRequired').val()) == "" ? null : $
					.trim($('#ddlIsRequired').val()) == "True" ? true : false;
			var SearchComparable = $.trim($("#ddlComparable").val()) == "" ? null
					: $.trim($("#ddlComparable").val()) == "True" ? true
							: false;
			var isSystem = $.trim($("#ddlIsSystem").val()) == "" ? null : $
					.trim($("#ddlIsSystem").val()) == "True" ? true : false;
			if (attributeNm.length < 1) {
				attributeNm = null;
			}
			usersManage.BindAttributeGrid(attributeNm, required,
					SearchComparable, isSystem);
		},
		ajaxSuccess : function(msg) {
			switch (usersManage.config.ajaxCallMode) {
			case 0:
				break;
			case 1:
				$("#ddlAttributeType").get(0).options.length = 0;
				$
						.each(
								msg.d,
								function(index, item) {
									$("#ddlAttributeType").get(0).options[$(
											"#ddlAttributeType").get(0).options.length] = new Option(
											item.InputType, item.InputTypeID);
								});
				break
			case 2:
				$
						.each(
								msg.d,
								function(index, item) {
									$("#ddlTypeValidation").get(0).options[$(
											"#ddlTypeValidation").get(0).options.length] = new Option(
											item.ValidationType,
											item.ValidationTypeID);
								});
				break;
			case 3:
				$('#lstItemType').get(0).options.length = 0;
				$('#lstItemType').prop('multiple', 'multiple');
				$('#lstItemType').prop('size', '5');
				$.each(msg.d,
						function(index, item) {
							$("#lstItemType").get(0).options[$("#lstItemType")
									.get(0).options.length] = new Option(
									item.ItemTypeName, item.ItemTypeID);
						});
				break;
			case 4:
				usersManage.FillForm(msg);
				$('#divAttribGrid').hide();
				$('#divAttribForm').show();
				break;
			case 5:
				usersManage.BindAttributeGrid(null, null, null, null);
				csscody.info("<h2>"
						+ getLocale(gpmsUsersManagement, 'Successful Message')
						+ "</h2><p>"
						+ getLocale(gpmsUsersManagement,
								'Attribute has been deleted successfully.')
						+ "</p>");
				$('#divAttribForm').hide();
				$('#divAttribGrid').show();
				break;
			case 6:
				usersManage.BindAttributeGrid(null, null, null, null);
				csscody
						.info("<h2>"
								+ getLocale(gpmsUsersManagement,
										'Successful Message')
								+ "</h2><p>"
								+ getLocale(gpmsUsersManagement,
										'Selected attribute(s) has been deleted successfully.')
								+ "</p>");
				break;
			case 7:
				usersManage.BindAttributeGrid(null, null, null, null);
				break;
			case 8:
				isUnique = msg.d;
				break;
			case 9:
				usersManage.BindAttributeGrid(null, null, null, null);
				$('#divAttribGrid').show();
				if (editFlag > 0) {
					csscody.info("<h2>"
							+ getLocale(gpmsUsersManagement,
									'Successful Message')
							+ "</h2><p>"
							+ getLocale(gpmsUsersManagement,
									'Attribute has been updated successfully.')
							+ "</p>");
				} else {
					csscody.info("<h2>"
							+ getLocale(gpmsUsersManagement,
									'Successful Message')
							+ "</h2><p>"
							+ getLocale(gpmsUsersManagement,
									'Attribute has been saved successfully.')
							+ "</p>");
				}
				usersManage.ClearForm();
				$('#divAttribForm').hide();
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
								"Failed to load attributes input type.")
						+ '</p>');
				break;
			case 2:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement,
								"Failed to load validation type.") + '</p>');
				break;
			case 3:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement,
								"Failed to load attributes item type.")
						+ '</p>');
				break;
			case 4:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement,
								"Failed to update attributes.") + '</p>');
				break;
			case 5:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement,
								"Failed to delete attribute.") + '</p>');
				break;
			case 6:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement,
								"Failed to delete attributes.") + '</p>');
				break;
			case 7:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement, "Failed to operate.")
						+ '</p>');
				break;
			case 8:
				break;
			case 9:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement,
								"Failed to save attribute.") + '</p>');
				break;
			}
		},
		init : function(config) {
			usersManage.LoadAttributeStaticImage();
			usersManage.BindAttributeGrid(null, null, null, null);
			$('#divAttribForm').hide();
			$('#divAttribGrid').show();
			// usersManage.BindAttributesInputType();
			// usersManage.BindAttributesValidationType();
			// usersManage.BindAttributesItemType();
			$('.itemTypes').hide();

			$('#ddlApplyTo').change(function() {
				var selectedValue = $(this).val();
				if (selectedValue !== "0") {
					$('.itemTypes').show();
				} else {
					$('.itemTypes').hide();
				}
			});

			$('#btnDeleteSelected')
					.click(
							function() {
								var attribute_ids = '';
								attribute_ids = SageData.Get("gdvUsers").Arr
										.join(',');
								if (attribute_ids.length > 0) {
									var properties = {
										onComplete : function(e) {
											usersManage.ConfirmDeleteMultiple(
													attribute_ids, e);
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
																	'Are you sure you want to delete selected attribute(s)?')
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
															"Please select at least one attribute before delete.")
													+ '</p>');
								}
							});

			$('#btnAddNew').bind("click", function() {
				$('#divAttribGrid').hide();
				$('#divAttribForm').show();
				usersManage.ClearForm();
			});

			$('#btnBack').bind("click", function() {
				$('#divAttribForm').hide();
				$('#divAttribGrid').show();
				usersManage.ClearForm();
			});

			$('#btnReset').bind("click", function() {
				usersManage.ClearForm();
			});

			$('#btnSaveAttribute').click(function() {
				var attribute_id = $(this).prop("name");
				if (attribute_id != '') {
					editFlag = attribute_id;
					usersManage.SaveAttribute(attribute_id, false);
				} else {
					editFlag = 0;
					usersManage.SaveAttribute(0, true);
				}
			});

			$('#txtAttributeName')
					.blur(
							function() {
								var errors = '';
								var attributeName = $(this).val();
								var attribute_id = $('#btnSaveAttribute').prop(
										"name");
								if (attribute_id == '') {
									attribute_id = 0;
								}
								if (!attributeName) {

									errors += getLocale(gpmsUsersManagement,
											"Please enter attribute name");
								} else if (!usersManage.IsUnique(attributeName,
										attribute_id)) {
									errors += "'"
											+ getLocale(gpmsUsersManagement,
													"Please enter Please enter unique attribute name")
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
				var attribute_id = $(this).prop("id").replace(/[^0-9]/gi, '');
				usersManage.DeleteAttribute(attribute_id);
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

			$("#ddlAttributeType")
					.bind(
							"change",
							function() {
								$('.class-text').removeClass('error').next(
										'span').removeClass('error');
								$("#default_value_text").prop("class",
										"sfInputbox");
								$('#ddlTypeValidation').val('8');
								$('#iferror').html('');
								$('#iferror').hide();
								if ($(this).val() == 1 || $(this).val() == 2
										|| $(this).val() == 3
										|| $(this).val() == 7) {
									$("input[name=chkValuesRequired]").prop(
											'checked', false).prop("disabled",
											false);
								} else {
									$("input[name=chkValuesRequired]").prop(
											'checked', false).prop("disabled",
											true);
								}
								$("#dataTable tr:gt(1)").remove();
								$("#dataTable>tbody tr")
										.find("input:not(:last)")
										.each(
												function(i) {
													if (this.name == "optionValueId") {
														if ($(this).val() == '') {
															$(this).val('0');
														}
													} else if (this.name == "value") {
														$(this).val('');
													} else if (this.name == "position") {
														$(this).val('');
													} else if ($(this)
															.hasClass(
																	"class-isdefault")) {
														this.checked = false;
													}

												});

								usersManage.ValidationTypeEnableDisable("",
										true);
								if ($(this).val() == 10) {
									$("#dataTable .tddefault").find(
											'input[name=defaultRdo]').prop(
											'checked', true);
								}
								var attValType = $("#ddlTypeValidation").val();
								$("#default_value_text")
										.prop(
												"class",
												"sfInputbox "
														+ usersManage
																.CreateValidationClass(attValType)
														+ "");
								$('#iferror')
										.html(
												usersManage
														.GetValidationTypeErrorMessage(attValType));
							});

			$("#ddlTypeValidation")
					.bind(
							"change",
							function() {
								var attValType = $("#ddlTypeValidation").val();
								$("#default_value_text")
										.prop(
												"class",
												"sfInputbox "
														+ usersManage
																.CreateValidationClass(attValType)
														+ "").val('');
								$('#iferror').hide();
								$('#iferror')
										.html(
												usersManage
														.GetValidationTypeErrorMessage(attValType));
							});

			$("input[type=button].AddOption").click(
					function() {
						var checkedState = false;
						if ($(this).prop("name") == "DeleteOption") {
							var t = $(this).closest('tr');

							var attrId = t.find("td").find(
									'input[type="hidden"]').val();
							if (attrId != '0') {
								arrAttrValueId += attrId + ',';

							}
							t.find("td").wrapInner(
									"<div style='DISPLAY: block'/>").parent()
									.find("td div").slideUp(300, function() {
										t.remove();
									});

						} else if ($(this).prop("name") == "AddMore") {
							checkedState = $('#dataTable>tbody tr:first').find(
									'input[type="radio"]').prop("checked");
							var cloneRow = $(this).closest('tr').clone(true);
							$(cloneRow).find("input").each(
									function(i) {
										if (this.name == "optionValueId") {
											$(this).val('0');
										} else if (this.name == "value") {
											$(this).val('');
										} else if (this.name == "position") {
											$(this).val('');
										} else if (this.name == "Alias") {
											$(this).val('');
										} else if ($(this).hasClass(
												"class-isdefault")) {
											this.checked = false;
										} else if ($(this)
												.hasClass("AddOption")) {
											$(this)
													.prop("name",
															"DeleteOption");
											$(this).prop("value",
													"Delete Option");
										}
										$(this).parent('td').find('span')
												.removeClass('error');
										$(this).removeClass('error');
									});
							$(cloneRow).appendTo("#dataTable");
							$('#dataTable>tbody tr:first').find(
									'input[type="radio"]').prop("checked",
									checkedState);
							$('#dataTable tr:last').hide();
							$('#dataTable tr:last td').fadeIn('slow');
							$('#dataTable tr:last').show();
							$('#dataTable tr:last td').show();
						}
					});
			$("#btnSearchAttribute").bind("click", function() {
				usersManage.SearchAttributeName();
			});

			$(
					'#txtSearchAttributeName,#ddlIsRequired,#ddlComparable,#ddlIsSystem')
					.keyup(function(event) {
						if (event.keyCode == 13) {
							$("#btnSearchAttribute").click();
						}
					});
		}
	};
	usersManage.init();
});