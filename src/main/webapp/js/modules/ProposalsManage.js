var proposalsManage = '';
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
	var arrAttrValueId = "";
	proposalsManage = {
		config : {
			isPostBack : false,
			async : true,
			cache : true,
			type : 'POST',
			contentType : "application/json; charset=utf-8",
			data : '{}',
			dataType : 'json',
			baseURL : GPMS.utils.GetGPMSServicePath() + "proposals/",
			method : "",
			url : "",
			ajaxCallMode : 0
		},
		ajaxCall : function(config) {
			$
					.ajax({
						type : proposalsManage.config.type,
						beforeSend : function(request) {
							request.setRequestHeader('GPMS-TOKEN', _aspx_token);
							request.setRequestHeader("UName", GPMS.utils
									.GetUserName());
							request.setRequestHeader("PID", GPMS.utils
									.GetUserProfileID());
							request.setRequestHeader("PType", "v");
							request.setRequestHeader('Escape', '0');
						},
						contentType : proposalsManage.config.contentType,
						cache : proposalsManage.config.cache,
						async : proposalsManage.config.async,
						url : proposalsManage.config.url,
						data : proposalsManage.config.data,
						dataType : proposalsManage.config.dataType,
						success : proposalsManage.ajaxSuccess,
						error : proposalsManage.ajaxFailure
					});
		},
		LoadStaticImage : function() {
			$('.cssClassSuccessImg').prop('src',
					'' + GPMS.utils.GetGPMSRootPath() + '/images/right.jpg');
		},
		onInit : function() {
			proposalsManage.SetFirstTabActive();
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
				retString = getLocale(gpmsProposalsManagement, 'Alphabets Only');
				break;
			case "2":
				retString = getLocale(gpmsProposalsManagement, 'AlphaNumeric');
				break;
			case "3":
				retString = getLocale(gpmsProposalsManagement, 'Decimal Number');
				break;
			case "4":
				retString = getLocale(gpmsProposalsManagement, 'Email Address');
				break;
			case "5":
				retString = getLocale(gpmsProposalsManagement, 'Integer Number');
				break;
			case "6":
				retString = getLocale(gpmsProposalsManagement, 'Price error');
				break;
			case "7":
				retString = getLocale(gpmsProposalsManagement, 'Web URL');
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
			proposalsManage.onInit();
			$('#lblAttrFormHeading').html(
					getLocale(gpmsProposalsManagement, "New Proposal Details"));
			$(".delbutton").removeAttr("id");
			$("#btnSaveProposal").removeAttr("name");
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
			proposalsManage
					.ClearOptionTable($("input[type='button'].AddOption"));
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

		BindProposalGrid : function(userName, college, department,
				postitionType, postitionTitle, isActive) {
			this.config.url = this.config.baseURL;
			this.config.method = "GetUsersList";
			var offset_ = 1;
			var current_ = 1;
			var perpage = ($("#gdvProposals_pagesize").length > 0) ? $(
					"#gdvProposals_pagesize :selected").text() : 10;
			var userBindObj = {
				UserName : userName,
				College : college,
				Department : department,
				PostitionType : postitionType,
				PostitionTitle : postitionTitle,
				IsActive : isActive
			};
			$("#gdvProposals")
					.sagegrid(
							{
								url : this.config.url,
								functionMethod : this.config.method,
								colModel : [
										{
											display : 'Proposal ID',
											name : 'proposal_id',
											cssclass : 'cssClassHeadCheckBox',
											coltype : 'checkbox',
											align : 'center',
											checkFor : '8', // this is count
											// from 0 column
											// index
											elemClass : 'attrChkbox',
											elemDefault : false,
											controlclass : 'attribHeaderChkbox'
										},
										{
											display : 'Proposal No',
											name : 'proposal_no',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'Date Received',
											name : 'date_received',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'Proposal Status',
											name : 'proposal_status',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'Project Title',
											name : 'project_title',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'Project Type',
											name : 'project_type',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'Type of Request',
											name : 'type_of_request',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'Due Date',
											name : 'due_date',
											cssclass : 'cssClassHeadDate',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											type : 'date',
											format : 'yyyy/MM/dd hh:mm:ss a'
										},
										{
											display : 'Project Period From',
											name : 'project_period_from',
											cssclass : 'cssClassHeadDate',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											type : 'date',
											format : 'yyyy/MM/dd hh:mm:ss a'
										},
										{
											display : 'Project Period To',
											name : 'project_period_to',
											cssclass : 'cssClassHeadDate',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											type : 'date',
											format : 'yyyy/MM/dd hh:mm:ss a'
										},
										{
											display : 'Project Location',
											name : 'project_location',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'Granting Agencies',
											name : 'granting_agencies',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'Direct Costs',
											name : 'directCosts',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'FA Costs',
											name : 'FA_costs',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'Total Costs',
											name : 'total_costs',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'FA Rate',
											name : 'FA_rate',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : getLocale(
													gpmsProposalsManagement,
													'Last Updated'),
											name : 'last_updated',
											cssclass : 'cssClassHeadDate',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											type : 'date',
											format : 'yyyy/MM/dd hh:mm:ss a'
										},
										{
											display : getLocale(
													gpmsProposalsManagement,
													'Is Deleted?'),
											name : 'status',
											cssclass : 'cssClassHeadBoolean',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											type : 'boolean',
											format : 'Yes/No'
										},
										{
											display : getLocale(
													gpmsProposalsManagement,
													'Actions'),
											name : 'action',
											cssclass : 'cssClassAction',
											coltype : 'label',
											align : 'center'
										} ],

								buttons : [
										{
											display : getLocale(
													gpmsProposalsManagement,
													"Edit"),
											name : 'edit',
											enable : true,
											_event : 'click',
											trigger : '1',
											callMethod : 'proposalsManage.EditUser',
											arguments : '1,2,3,4,5,6,7,8'
										},
										{
											display : getLocale(
													gpmsProposalsManagement,
													"Delete"),
											name : 'delete',
											enable : true,
											_event : 'click',
											trigger : '2',
											callMethod : 'proposalsManage.DeleteUser',
											arguments : '8'
										},
										{
											display : getLocale(
													gpmsProposalsManagement,
													"Activate"),
											name : 'activate',
											enable : true,
											_event : 'click',
											trigger : '4',
											callMethod : 'proposalsManage.ActiveUser',
											arguments : '8'
										},
										{
											display : getLocale(
													gpmsProposalsManagement,
													"Deactivate"),
											name : 'deactivate',
											enable : true,
											_event : 'click',
											trigger : '5',
											callMethod : 'proposalsManage.DeactiveUser',
											arguments : '8'
										} ],
								rp : perpage,
								nomsg : getLocale(gpmsProposalsManagement,
										'No Records Found!'),
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
			$('#txtAttributeName').val(response['firstName']);
			// $('#ddlAttributeType').val(item.InputTypeID);
			$('#ddlAttributeType').prop('disabled', 'disabled');

			// proposalsManage.FillDefaultValue(item.DefaultValue);

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
			// proposalsManage.ValidationTypeEnableDisable(item.FillOptionValues,
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
			proposalsManage.ClearForm();
			switch (tblID) {
			case "gdvProposals":
				$('#lblAttrFormHeading').html(
						getLocale(gpmsProposalsManagement,
								'Edit Proposal Details: ')
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
				$("#btnSaveProposal").prop("name", argus[0]);
				proposalsManage.onInit();

				proposalsManage.config.url = proposalsManage.config.baseURL
						+ "GetUsersByProfileId";
				proposalsManage.config.data = JSON2.stringify({
					userId : argus[0],
					gpmsCommonObj : gpmsCommonObj()
				});
				proposalsManage.config.ajaxCallMode = 4;
				proposalsManage.ajaxCall(proposalsManage.config);
				var attValType = $("#ddlTypeValidation").val();
				$("#default_value_text")
						.prop(
								"class",
								"sfInputbox "
										+ proposalsManage
												.CreateValidationClass(attValType)
										+ "");
				$('#iferror').html(
						proposalsManage
								.GetValidationTypeErrorMessage(attValType));
				break;
			default:
				break;
			}
		},

		DeleteUser : function(tblID, argus) {
			switch (tblID) {
			case "gdvProposals":
				if (argus[3].toLowerCase() != "yes") {
					proposalsManage.DeleteUserById(argus[0]);
				} else {
					csscody.alert('<h2>'
							+ getLocale(gpmsProposalsManagement,
									"Information Alert")
							+ '</h2><p>'
							+ getLocale(gpmsProposalsManagement,
									"Sorry! this user is already deleted.")
							+ '</p>');
				}
				break;
			default:
				break;
			}
		},

		ConfirmDeleteMultiple : function(proposal_ids, event) {
			if (event) {
				proposalsManage.DeleteMultipleAttribute(proposal_ids);
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
					proposalsManage.ConfirmSingleDelete(_userId, e);
				}
			};
			csscody.confirm("<h2>"
					+ getLocale(gpmsProposalsManagement, "Delete Confirmation")
					+ "</h2><p>"
					+ getLocale(gpmsProposalsManagement,
							"Are you sure you want to delete this attribute?")
					+ "</p>", properties);
		},

		ConfirmSingleDelete : function(proposal_id, event) {
			if (event) {
				proposalsManage.DeleteSingleAttribute(proposal_id);
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
			case "gdvProposals":
				if (argus[3].toLowerCase() != "yes") {
					proposalsManage.ActivateAttribute(argus[0], false);
				} else {
					csscody
							.alert('<h2>'
									+ getLocale(gpmsProposalsManagement,
											"Information Alert")
									+ '</h2><p>'
									+ getLocale(gpmsProposalsManagement,
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
			case "gdvProposals":
				if (argus[3].toLowerCase() != "yes") {
					proposalsManage.ActivateAttribute(argus[0], true);
				} else {
					csscody
							.alert('<h2>'
									+ getLocale(gpmsProposalsManagement,
											"Information Alert")
									+ '</h2><p>'
									+ getLocale(gpmsProposalsManagement,
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

				var attributeName = $('#txtAttributeName').val();
				if (!attributeName) {
					validateErrorMessage += 'Please enter attribute name.<br/>';
				} else if (!proposalsManage.IsUnique(attributeName, _userId)) {
					validateErrorMessage += "'"
							+ getLocale(gpmsProposalsManagement,
									"Please enter unique attribute name")
							+ "'"
							+ attributeName.trim()
							+ "'"
							+ getLocale(gpmsProposalsManagement,
									"already exists.") + '<br/>';
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
						validateErrorMessage += getLocale(
								gpmsProposalsManagement,
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
														gpmsProposalsManagement,
														"Please enter all option values and display order for your attribute.")
														+ "<br/>";
												$(this).parent('td').find(
														'span').addClass(
														'error').show();
												proposalsManage
														.SetFirstTabActive();
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
																gpmsProposalsManagement,
																"Display order is numeric value.")
																+ '<br/>';
														$(this)
																.parent('td')
																.find('span')
																.addClass(
																		'error')
																.show();
														proposalsManage
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

					proposalsManage.AddAttributeInfo(_userId, _attributeName,
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
		BindProposalStatusDropDown : function() {
			this.config.url = this.config.baseURL + "GetCollegeList";
			this.config.data = "{}";
			this.config.ajaxCallMode = 1;
			this.ajaxCall(this.config);
		},
		SearchUsers : function() {
			var userName = $.trim($("#txtSearchProjectTitle").val());
			var college = $.trim($('#ddlCollege').val()) == "" ? null : $
					.trim($('#ddlCollege').val()) == "0" ? null : $.trim($(
					'#ddlCollege').val());
			var department = $.trim($('#ddlDepartment').val()) == "" ? null : $
					.trim($('#ddlDepartment').val()) == "0" ? null : $.trim($(
					'#ddlDepartment').val());
			var postitionType = $.trim($('#ddlPositionType').val()) == "" ? null
					: $.trim($('#ddlPositionType').val()) == "0" ? null : $
							.trim($('#ddlPositionType').val());
			var postitionTitle = $.trim($('#ddlPositionTitle').val()) == "" ? null
					: $.trim($('#ddlPositionTitle').val()) == "0" ? null : $
							.trim($('#ddlPositionTitle').val());
			var isActive = $.trim($("#ddlIsActive").val()) == "" ? null : $
					.trim($("#ddlIsActive").val()) == "True" ? true : false;
			if (userName.length < 1) {
				userName = null;
			}
			proposalsManage.BindProposalGrid(userName, college, department,
					postitionType, postitionTitle, isActive);
		},
		ajaxSuccess : function(msg) {
			switch (proposalsManage.config.ajaxCallMode) {
			case 0:
				break;
			case 1: // For College Dropdown Binding
				$('#ddlCollege').get(0).options.length = 1;
				$('#ddlDepartment').get(0).options.length = 1;
				$('#ddlPositionType').get(0).options.length = 1;
				$('#ddlPositionTitle').get(0).options.length = 1;
				$.each(msg,
						function(index, item) {
							$("#ddlCollege").get(0).options[$("#ddlCollege")
									.get(0).options.length] = new Option(item,
									item);
						});
				break
			case 2:// For Department Dropdown Binding
				$('#ddlDepartment').get(0).options.length = 1;
				$('#ddlPositionType').get(0).options.length = 1;
				$('#ddlPositionTitle').get(0).options.length = 1;
				$.each(msg, function(index, item) {
					$("#ddlDepartment").get(0).options[$("#ddlDepartment").get(
							0).options.length] = new Option(item, item);
				});
				break;

			case 3: // For College Position Type Binding
				$('#ddlPositionType').get(0).options.length = 1;
				$('#ddlPositionTitle').get(0).options.length = 1;
				$.each(msg, function(index, item) {
					$("#ddlPositionType").get(0).options[$("#ddlPositionType")
							.get(0).options.length] = new Option(item, item);
				});
				break;

			case 4: // For College Position Title Binding
				$('#ddlPositionTitle').get(0).options.length = 1;
				$
						.each(
								msg,
								function(index, item) {
									$("#ddlPositionTitle").get(0).options[$(
											"#ddlPositionTitle").get(0).options.length] = new Option(
											item, item);
								});
				break;
			case 5:
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
			case 6:
				proposalsManage.FillForm(msg);
				$('#divUserGrid').hide();
				$('#divUserForm').show();
				break;
			case 7:
				proposalsManage.BindProposalGrid(null, null, null, null, null,
						null, null, null);
				csscody.info("<h2>"
						+ getLocale(gpmsProposalsManagement,
								'Successful Message')
						+ "</h2><p>"
						+ getLocale(gpmsProposalsManagement,
								'Attribute has been deleted successfully.')
						+ "</p>");
				$('#divUserForm').hide();
				$('#divUserGrid').show();
				break;
			case 8:
				proposalsManage.BindProposalGrid(null, null, null, null, null,
						null);
				csscody
						.info("<h2>"
								+ getLocale(gpmsProposalsManagement,
										'Successful Message')
								+ "</h2><p>"
								+ getLocale(gpmsProposalsManagement,
										'Selected attribute(s) has been deleted successfully.')
								+ "</p>");
				break;
			case 9:
				proposalsManage.BindProposalGrid(null, null, null, null, null,
						null);
				break;
			case 10:
				isUnique = msg.d;
				break;
			case 11:
				proposalsManage.BindProposalGrid(null, null, null, null, null,
						null);
				$('#divUserGrid').show();
				if (editFlag > 0) {
					csscody.info("<h2>"
							+ getLocale(gpmsProposalsManagement,
									'Successful Message')
							+ "</h2><p>"
							+ getLocale(gpmsProposalsManagement,
									'Attribute has been updated successfully.')
							+ "</p>");
				} else {
					csscody.info("<h2>"
							+ getLocale(gpmsProposalsManagement,
									'Successful Message')
							+ "</h2><p>"
							+ getLocale(gpmsProposalsManagement,
									'Attribute has been saved successfully.')
							+ "</p>");
				}
				proposalsManage.ClearForm();
				$('#divUserForm').hide();
				break;
			}
		},
		ajaxFailure : function(msg) {
			switch (proposalsManage.config.ajaxCallMode) {
			case 0:
				break;
			case 1:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load colleges list.") + '</p>');
				break;
			case 2:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load departments list.") + '</p>');
				break;
			case 3:
				csscody
						.error('<h2>'
								+ getLocale(gpmsProposalsManagement,
										"Error Message")
								+ '</h2><p>'
								+ getLocale(gpmsProposalsManagement,
										"Failed to load position types list.")
								+ '</p>');
				break;
			case 4:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load position titles list.")
						+ '</p>');
				break;
			case 5:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to delete attribute.") + '</p>');
				break;
			case 6:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to delete attributes.") + '</p>');
				break;
			case 7:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to operate.") + '</p>');
				break;
			case 8:
				break;
			case 9:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to save attribute.") + '</p>');
				break;
			}
		},
		init : function(config) {
			proposalsManage.LoadStaticImage();
			proposalsManage.BindProposalGrid(null, null, null, null, null,
					null, null, null);
			$('#divUserForm').hide();
			$('#divUserGrid').show();
			proposalsManage.BindProposalStatusDropDown();
			proposalsManage.BindProposedByDropDown();

			$('#btnDeleteSelected')
					.click(
							function() {
								var proposal_ids = '';
								proposal_ids = SageData.Get("gdvProposals").Arr
										.join(',');
								if (proposal_ids.length > 0) {
									var properties = {
										onComplete : function(e) {
											proposalsManage
													.ConfirmDeleteMultiple(
															proposal_ids, e);
										}
									};
									csscody
											.confirm(
													"<h2>"
															+ getLocale(
																	gpmsProposalsManagement,
																	'Delete Confirmation')
															+ "</h2><p>"
															+ getLocale(
																	gpmsProposalsManagement,
																	'Are you sure you want to delete selected user(s)?')
															+ "</p>",
													properties);
								} else {
									csscody
											.alert('<h2>'
													+ getLocale(
															gpmsProposalsManagement,
															"Information Alert")
													+ '</h2><p>'
													+ getLocale(
															gpmsProposalsManagement,
															"Please select at least one user before deleting.")
													+ '</p>');
								}
							});

			$('#btnAddNew').bind("click", function() {
				$('#divUserGrid').hide();
				$('#divUserForm').show();
				proposalsManage.ClearForm();
			});

			$('#btnBack').bind("click", function() {
				$('#divUserForm').hide();
				$('#divUserGrid').show();
				proposalsManage.ClearForm();
			});

			$('#btnReset').bind("click", function() {
				proposalsManage.ClearForm();
			});

			$('#btnSaveProposal').click(function() {
				var proposal_id = $(this).prop("name");
				if (proposal_id != '') {
					editFlag = proposal_id;
					proposalsManage.SaveUser(proposal_id, false);
				} else {
					editFlag = 0;
					proposalsManage.SaveUser(0, true);
				}
			});

			$('#txtAttributeName')
					.blur(
							function() {
								var errors = '';
								var attributeName = $(this).val();
								var proposal_id = $('#btnSaveProposal').prop(
										"name");
								if (proposal_id == '') {
									proposal_id = 0;
								}
								if (!attributeName) {
									errors += getLocale(
											gpmsProposalsManagement,
											"Please enter user name");
								} else if (!proposalsManage.IsUnique(
										attributeName, proposal_id)) {
									errors += "'"
											+ getLocale(
													gpmsProposalsManagement,
													"Please enter Please enter unique user name")
											+ "'"
											+ attributeName.trim()
											+ "'"
											+ getLocale(
													gpmsProposalsManagement,
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
				var proposal_id = $(this).prop("id").replace(/[^0-9]/gi, '');
				proposalsManage.DeleteUserById(proposal_id);
			});

			$("#btnSearchProposal").bind("click", function() {
				proposalsManage.SearchUsers();
				return false;
			});

			$(
					'#txtSearchProjectTitle,#txtSearchTotalCostsFrom, #txtSearchTotalCostsTo,#ddlSearchProposalStatus,#ddlSearchProposedBy,#txtSearchReceivedOnFrom,#txtSearchReceivedOnTo,#ddlIsActive')
					.keyup(function(event) {
						if (event.keyCode == 13) {
							$("#btnSearchProposal").click();
						}
					});
		}
	};
	proposalsManage.init();
});