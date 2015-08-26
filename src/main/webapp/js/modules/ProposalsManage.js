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

	var rowIndex = 0;
	var editFlag = 0;
	var isUniqueProjectTitle = false;

	proposalsManage = {
		config : {
			isPostBack : false,
			async : false,
			cache : false,
			type : 'POST',
			contentType : "application/json; charset=utf-8",
			data : '{}',
			dataType : 'json',
			rootURL : GPMS.utils.GetGPMSServicePath(),
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

		SearchProposals : function() {
			var projectTitle = $.trim($("#txtSearchProjectTitle").val());
			var proposedBy = $.trim($("#txtSearchProposedBy").val());
			var totalCostsFrom = $.trim($("#txtSearchTotalCostsFrom").val());
			var totalCostsTo = $.trim($("#txtSearchTotalCostsTo").val());
			var receivedOnFrom = $.trim($("#txtSearchReceivedOnFrom").val());
			var receivedOnTo = $.trim($("#txtSearchReceivedOnTo").val());

			var proposalStatus = $.trim($('#ddlSearchProposalStatus').val()) == "" ? null
					: $.trim($('#ddlSearchProposalStatus').val()) == "0" ? null
							: $.trim($('#ddlSearchProposalStatus').val());
			if (projectTitle.length < 1) {
				projectTitle = null;
			}
			if (proposedBy.length < 1) {
				proposedBy = null;
			}
			if (totalCostsFrom.length < 1) {
				totalCostsFrom = null;
			}
			if (totalCostsTo.length < 1) {
				totalCostsTo = null;
			}
			if (receivedOnFrom.length < 1) {
				receivedOnFrom = null;
			}
			if (receivedOnTo.length < 1) {
				receivedOnTo = null;
			}

			proposalsManage.BindProposalGrid(projectTitle, proposedBy,
					totalCostsFrom, totalCostsTo, receivedOnFrom, receivedOnTo,
					proposalStatus);
		},

		BindProposalGrid : function(projectTitle, proposedBy, totalCostsFrom,
				totalCostsTo, receivedOnFrom, receivedOnTo, proposalStatus) {
			this.config.url = this.config.baseURL;
			this.config.method = "GetProposalsList";
			var offset_ = 1;
			var current_ = 1;
			var perpage = ($("#gdvProposals_pagesize").length > 0) ? $(
					"#gdvProposalsProposals_pagesize :selected").text() : 10;

			var proposalBindObj = {
				ProjectTitle : projectTitle,
				ProposedBy : proposedBy,
				TotalCostsFrom : totalCostsFrom,
				TotalCostsTo : totalCostsTo,
				ReceivedOnFrom : receivedOnFrom,
				ReceivedOnTo : receivedOnTo,
				ProposalStatus : proposalStatus
			};
			this.config.data = {
				proposalBindObj : proposalBindObj
			};
			var data = this.config.data;

			$("#gdvProposals")
					.sagegrid(
							{
								url : this.config.url,
								functionMethod : this.config.method,
								colModel : [
										{
											display : 'Proposal ID',
											cssclass : 'cssClassHeadCheckBox',
											coltype : 'checkbox',
											align : 'center',
											checkFor : '18',
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
											align : 'left',
											hide : true
										},
										{
											display : 'Date Received',
											name : 'date_received',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											type : 'date',
											format : 'yyyy/MM/dd hh:mm:ss a'
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
											display : 'Senior Personnel Users',
											name : 'senior_personnel_users',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											type : 'array',
											hide : true
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
											align : 'left',
											type : 'array',
											hide : true
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
											align : 'left',
											hide : true
										},
										{
											display : 'Granting Agencies',
											name : 'granting_agencies',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											type : 'array',
											hide : true
										},
										{
											display : 'Direct Costs($)',
											name : 'directCosts',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											hide : true
										},
										{
											display : 'Total Costs($)',
											name : 'total_costs',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : getLocale(
													gpmsProposalsManagement,
													'Last Audited'),
											name : 'last_audited',
											cssclass : 'cssClassHeadDate',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											type : 'date',
											format : 'yyyy/MM/dd hh:mm:ss a'
										},
										{
											display : 'Last Audited By',
											name : 'last_audited_by',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											hide : true
										},
										{
											display : 'Last Audited Action',
											name : 'last_audited_action',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											hide : true
										},
										{
											display : 'Is Deleted?',
											name : 'is_deleted',
											cssclass : 'cssClassHeadBoolean',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											type : 'boolean',
											format : 'Yes/No',
											hide : true
										},
										{
											display : 'PI User',
											name : 'pi_user',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											hide : true
										},
										{
											display : 'Co-PI Users',
											name : 'co_pi_users',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											type : 'array',
											hide : true
										},
										{
											display : 'FA Costs($)',
											name : 'FA_costs',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											hide : true
										},
										{
											display : 'FA Rate(%)',
											name : 'FA_rate',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											hide : true
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
											callMethod : 'proposalsManage.EditProposal',
											arguments : '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,19,20,21,22'
										},
										{
											display : getLocale(
													gpmsProposalsManagement,
													"Delete"),
											name : 'delete',
											enable : true,
											_event : 'click',
											trigger : '2',
											callMethod : 'proposalsManage.DeleteProposal',
											arguments : '20'
										} ],
								rp : perpage,
								nomsg : getLocale(gpmsProposalsManagement,
										'No Records Found!'),
								param : data,
								current : current_,
								pnew : offset_,
								sortcol : {
									0 : {
										sorter : false
									},
									23 : {
										sorter : false
									}
								}
							});
		},

		EditProposal : function(tblID, argus) {
			switch (tblID) {
			case "gdvProposals":
				proposalsManage.ClearForm();
				$('#lblFormHeading').html(
						getLocale(gpmsProposalsManagement,
								'Edit Proposal Details for: ')
								+ argus[5]);

				if (argus[15] != null && argus[15] != "") {
					$('#tblLastAuditedInfo').show();
					$('#lblLastUpdatedOn').html(argus[15]);
					$('#lblLastUpdatedBy').html(argus[16]);
					$('#lblActivity').html(argus[17]);
				} else {
					$('#tblLastAuditedInfo').hide();
				}
				// $('#txtProjectTitle').val(argus[1]);
				// $('#txtProjectTitle').prop('disabled', 'disabled');
				$("input[name=AddMore]").removeAttr('disabled');
				$("input[name=DeleteOption]").removeAttr('disabled');
				$("#btnSaveProposal").prop("name", argus[0]);

				$("#btnReset").hide();

				proposalsManage.config.url = proposalsManage.config.baseURL
						+ "GetProposalDetailsByProposalId";
				proposalsManage.config.data = JSON2.stringify({
					proposalId : argus[0]
				});
				proposalsManage.config.ajaxCallMode = 4;
				proposalsManage.ajaxCall(proposalsManage.config);

				proposalsManage.BindProposalAuditLogGrid(argus[0], null, null,
						null, null);
				$('#auditLogTab').show();

				// proposalsManage.BindUserDropDown();

				break;
			default:
				break;
			}
		},

		FillForm : function(response) {
			// See this how we can get response object based on fields
			// alert(response);
		},

		BindUserPostionDetails : function(postitionDetails) {
			// $("#dataTable tr:gt(1)").remove();
			$
					.each(
							postitionDetails,
							function(i, value) {
								// alert(index + " :: " +
								// value['positionTitle']);
								var btnOption = "[+] Add";
								var btnName = "AddMore";
								if (i > 0) {
									btnOption = "Delete";
									var btnName = "DeleteOption";
								}
								var cloneRow = $('#dataTable tbody>tr:first')
										.clone(true);
								$(cloneRow).appendTo("#dataTable");

								rowIndex = i + 1;
								$('#dataTable tbody>tr:eq(' + rowIndex + ')')
										.find("select")
										.each(
												function(j) {
													if (this.name == "ddlProposalStatus") {
														// $(this).val(value['college']);

														$(this)
																.find('option')
																.each(
																		function() {
																			var $this = $(this);
																			if ($this
																					.text() == value['college']) {
																				$this
																						.prop(
																								'selected',
																								'selected');
																				proposalsManage
																						.BindDepartmentOnly($(
																								'select[name="ddlProposalStatus"] option:selected')
																								.eq(
																										rowIndex)
																								.val());
																				return false;
																			}
																		});
													} else if (this.name == "ddlDepartment") {
														// $(this).val(value['department']);

														$(this)
																.find('option')
																.each(
																		function() {
																			var $this = $(this);
																			if ($this
																					.text() == value['department']) {
																				$this
																						.prop(
																								'selected',
																								'selected');

																				proposalsManage
																						.BindPositionTypeOnly(
																								$(
																										'select[name="ddlProposalStatus"] option:selected')
																										.eq(
																												rowIndex)
																										.val(),
																								$(
																										'select[name="ddlDepartment"] option:selected')
																										.eq(
																												rowIndex)
																										.val());
																				return false;
																			}
																		});
													} else if (this.name == "ddlPositionType") {
														// $(this).val(value['positionType']);

														$(this)
																.find('option')
																.each(
																		function() {
																			var $this = $(this);
																			if ($this
																					.text() == value['positionType']) {
																				$this
																						.prop(
																								'selected',
																								'selected');

																				proposalsManage
																						.BindPositionTitleOnly(
																								$(
																										'select[name="ddlProposalStatus"] option:selected')
																										.eq(
																												rowIndex)
																										.val(),
																								$(
																										'select[name="ddlDepartment"] option:selected')
																										.eq(
																												rowIndex)
																										.val(),
																								$(
																										'select[name="ddlPositionType"] option:selected')
																										.eq(
																												rowIndex)
																										.val());
																				return false;
																			}
																		});
													} else if (this.name == "ddlPositionTitle") {
														// $(this).val(value['positionTitle']);

														$(this)
																.find('option')
																.each(
																		function() {
																			var $this = $(this);
																			if ($this
																					.text() == value['positionTitle']) {
																				$this
																						.prop(
																								'selected',
																								'selected');
																				return false;
																			}
																		});
													}
												});

								$('#dataTable tbody>tr:eq(' + rowIndex + ')')
										.find("input").each(
												function(k) {
													if ($(this).hasClass(
															"AddOption")) {
														$(this).prop("name",
																btnName);
														$(this).prop("value",
																btnOption);
													}
												});
							});
			$('#dataTable>tbody tr:first').remove();
		},

		SearchProposalAuditLogs : function() {
			var action = $.trim($("#txtSearchAction").val());
			if (action.length < 1) {
				action = null;
			}

			var auditedBy = $.trim($("#txtSearchAuditedBy").val());
			if (auditedBy.length < 1) {
				auditedBy = null;
			}

			var activityOnFrom = $.trim($("#txtSearchActivityOnFrom").val());
			if (activityOnFrom.length < 1) {
				activityOnFrom = null;
			}

			var activityOnTo = $.trim($("#txtSearchActivityOnTo").val());
			if (activityOnTo.length < 1) {
				activityOnTo = null;
			}

			var proposalId = $('#btnSaveProposal').prop("name");
			if (proposalId == '') {
				proposalId = "0";
			}

			proposalsManage.BindProposalAuditLogGrid(proposalId, action,
					auditedBy, activityOnFrom, activityOnTo);
		},

		BindProposalAuditLogGrid : function(proposalId, action, auditedBy,
				activityOnFrom, activityOnTo) {
			this.config.url = this.config.baseURL;
			this.config.method = "GetProposalAuditLogList";
			var offset_ = 1;
			var current_ = 1;
			var perpage = ($("#gdvProposalsAuditLog_pagesize").length > 0) ? $(
					"#gdvProposalsAuditLog_pagesize :selected").text() : 10;

			var auditLogBindObj = {
				Action : action,
				AuditedBy : auditedBy,
				ActivityOnFrom : activityOnFrom,
				ActivityOnTo : activityOnTo,
			};
			this.config.data = {
				proposalId : proposalId,
				auditLogBindObj : auditLogBindObj
			};
			var data = this.config.data;

			$("#gdvProposalsAuditLog").sagegrid(
					{
						url : this.config.url,
						functionMethod : this.config.method,
						colModel : [ {
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
							display : 'Action',
							name : 'action',
							cssclass : '',
							controlclass : '',
							coltype : 'label',
							align : 'left'
						}, {
							display : 'Activity On',
							name : 'activity_on',
							cssclass : 'cssClassHeadDate',
							controlclass : '',
							coltype : 'label',
							align : 'left',
							type : 'date',
							format : 'yyyy/MM/dd hh:mm:ss a'
						} ],
						rp : perpage,
						nomsg : getLocale(gpmsProposalsManagement,
								'No Records Found!'),
						param : data,
						current : current_,
						pnew : offset_,
						sortcol : {
							4 : {
								sorter : false
							}
						}
					});
		},

		DeleteProposal : function(tblID, argus) {
			switch (tblID) {
			case "gdvProposals":
				if (argus[1].toLowerCase() != "yes") {
					proposalsManage.DeleteProposalById(argus[0]);
				} else {
					csscody.alert('<h2>'
							+ getLocale(gpmsProposalsManagement,
									"Information Alert")
							+ '</h2><p>'
							+ getLocale(gpmsProposalsManagement,
									"Sorry! this proposal is already deleted.")
							+ '</p>');
				}
				break;
			default:
				break;
			}
		},

		DeleteProposalById : function(_proposalId) {
			var properties = {
				onComplete : function(e) {
					proposalsManage.ConfirmSingleDelete(_proposalId, e);
				}
			};
			csscody.confirm("<h2>"
					+ getLocale(gpmsProposalsManagement, "Delete Confirmation")
					+ "</h2><p>"
					+ getLocale(gpmsProposalsManagement,
							"Are you sure you want to delete this proposal?")
					+ "</p>", properties);
		},

		ConfirmDeleteMultiple : function(proposal_ids, event) {
			if (event) {
				proposalsManage.DeleteMultipleProposals(proposal_ids);
			}
		},

		DeleteMultipleProposals : function(_proposalIds) {
			// this.config.dataType = "html";
			this.config.url = this.config.baseURL
					+ "DeleteMultipleProposalsByProposalID";
			this.config.data = JSON2.stringify({
				proposalIds : _proposalIds,
				gpmsCommonObj : gpmsCommonObj()
			});
			this.config.ajaxCallMode = 3;
			this.ajaxCall(this.config);
			return false;
		},

		ConfirmSingleDelete : function(proposal_id, event) {
			if (event) {
				proposalsManage.DeleteSingleUser(proposal_id);
			}
		},

		DeleteSingleUser : function(_proposalId) {
			this.config.url = this.config.baseURL
					+ "DeleteProposalByProposalID";
			this.config.data = JSON2.stringify({
				proposalId : _proposalId,
				gpmsCommonObj : gpmsCommonObj()
			});
			this.config.ajaxCallMode = 2;
			this.ajaxCall(this.config);
			return false;
		},

		ClearForm : function() {
			$('.class-text').removeClass('error').next('span').removeClass(
					'error');
			var container = $("#container-7 div:gt(1)");
			var inputs = container.find('INPUT, SELECT, TEXTAREA');
			$.each(inputs, function(i, item) {
				rmErrorClass(item);
				$(this).prop('checked', false);
				$(this).val('');
				$(this).val($(this).find('option').first().val());
			});

			// $('select[name=ddlName]').val(item.id);

			proposalsManage.onInit();
			$('#lblFormHeading').html(
					getLocale(gpmsProposalsManagement, "New Proposal Details"));
			$("#btnSaveProposal").removeAttr("name");
			$("#btnReset").show();
			$(".required:enabled").each(function() {
				if ($(this).parent("td").find("span.error").length == 1) {
					$(this).removeClass("error").addClass("required");
					$(this).parent("td").find("span.error").remove();
				}
			});
			$('#txtProjectTitle').removeAttr('disabled');

			$(".AddOption").val("[+] Add");

			rowIndex = 0;
			$("#dataTable tbody>tr:gt(0)").remove();
			$("#dataTable tbody>tr:first").find("select").find('option').each(
					function(i) {
						$(this).removeAttr("selected");
					});

			// For form Dropdown Binding
			$('select[name=ddlRole]').eq(0).val(0);
			$('select[name=ddlRole]').eq(0).prop('disabled', 'disabled');
			$('select[name=ddlName]').eq(0).val(GPMS.utils.GetUserProfileID());
			$('select[name=ddlName]').eq(0).prop('disabled', 'disabled');

			// $('select[name=ddlName] option').get(rowIndex).map(function() {
			// return ($(this).val() == GPMS.utils.GetUserProfileID());
			// }).prop('selected', true);

			// proposalsManage.BindDepartmentDropDown($(
			// 'select[name="ddlProposalStatus"]').eq(0).val(), false);
			return false;
		},

		onInit : function() {
			proposalsManage.SetFirstTabActive();
			$('#btnReset').hide();
			$('.cssClassRight').hide();
			$('.cssClassError').hide();
			$("#txtDOB").datepicker({
				dateFormat : 'yy-mm-dd',
				changeMonth : true,
				changeYear : true
			});

			$("#txtSearchActivityOnFrom").datepicker(
					{
						dateFormat : 'yy-mm-dd',
						changeMonth : true,
						changeYear : true,
						onSelect : function(selectedDate) {
							$("#txtSearchActivityOnTo").datepicker("option",
									"minDate", selectedDate);
						}
					});
			$("#txtSearchActivityOnTo").datepicker({
				dateFormat : 'yy-mm-dd',
				changeMonth : true,
				changeYear : true
			});

			$("#gdvProposalsAuditLog").empty();
			$("#gdvProposalsAuditLog_Pagination").remove();
		},

		SetFirstTabActive : function() {
			var $tabs = $("#container-7").tabs();
			$tabs.tabs('option', 'active', 0);

			$("#container-7").addClass("ui-tabs-vertical ui-helper-clearfix");
			$("#container-7 li").removeClass("ui-corner-top").addClass(
					"ui-corner-left");
		},

		SaveProposal : function(_proposalId, _flag) {
			$('#iferror').hide();
			if (checkForm($("#form1"))) {
				var validateErrorMessage = '';

				var newUserName = $('#txtProjectTitle').val();
				if (!newUserName) {
					validateErrorMessage += 'Please enter username.<br/>';
				} else if (!proposalsManage.isUniqueProjectTitle(_proposalId,
						newUserName)) {
					validateErrorMessage += "'"
							+ getLocale(gpmsProposalsManagement,
									"Please enter unique username.")
							+ " '"
							+ proposalsManage.trim()
							+ "' "
							+ getLocale(gpmsProposalsManagement,
									"already exists.") + '<br/>';
				}

				var _saveOptions = '';
				$("#dataTable")
						.find("tr select")
						.each(
								function(i) {
									var optionsText = $(this).val();
									// ddlProposalStatus ddlDepartment
									// ddlPositionType
									// ddlPositionTitle
									if (!optionsText
											&& $(this).prop("name") != "ddlPositionTitle") {
										validateErrorMessage = getLocale(
												AspxAttributesManagement,
												"Please select all position details for this user.")
												+ "<br/>";
										attributesManage.SetFirstTabActive();
										$(this).focus();
									} else if (optionsText
											&& $(this).prop("name") != "ddlPositionTitle") {
										_saveOptions += optionsText + "!#!";
									} else {
										_saveOptions += optionsText + "#!#";
									}
								});

				_saveOptions = _saveOptions.substring(0,
						_saveOptions.length - 3);

				if (!validateErrorMessage) {
					var userInfo = {
						ProposalID : _proposalId,
						FirstName : $.trim($('#txtFirstName').val()),
						MiddleName : $.trim($('#txtMiddleName').val()),
						LastName : $.trim($('#txtLastName').val()),
						DOB : $('#txtDOB').val(),
						Gender : $('#ddlGender :selected').val(),
						Street : $.trim($('#txtStreet').val()),
						Apt : $.trim($('#txtApt').val()),
						City : $.trim($('#txtCity').val()),
						State : $('#ddlState :selected').text(),
						Zip : $.trim($('#txtZip').val()),
						Country : $('#ddlCountry :selected').text(),
						OfficeNumber : $('#txtOfficeNumber').val(),
						MobileNumber : $('#txtMobileNumber').val(),
						HomeNumber : $('#txtHomeNumber').val(),
						OtherNumber : $('#txtOtherNumber').val(),
						WorkEmail : $('#txtWorkEmail').val(),
						PersonalEmail : $('#txtPersonalEmail').val(),
						IsActive : $('input[name=chkActive]').prop('checked'),
						UserName : $.trim($('#txtProjectTitle').val()),
						Password : $.trim($('#txtPassword').val()),
						Flag : _flag, // false for Update true for New Add
						SaveOptions : _saveOptions
					};

					proposalsManage.AddUserInfo(userInfo);

					return false;
				}
			}
		},

		isUniqueProjectTitle : function(proposalId, newUserName) {
			var userUniqueObj = {
				ProposalID : proposalId,
				NewUserName : newUserName
			};
			var gpmsCommonInfo = gpmsCommonObj();
			this.config.url = this.config.baseURL + "CheckUniqueUserName";
			this.config.data = JSON2.stringify({
				userUniqueObj : userUniqueObj,
				gpmsCommonObj : gpmsCommonInfo
			});
			this.config.ajaxCallMode = 15;
			this.ajaxCall(this.config);
			return isUniqueProjectTitle;
		},

		AddUserInfo : function(info) {
			this.config.url = this.config.baseURL + "SaveUpdateUser";
			this.config.data = JSON2.stringify({
				userInfo : info,
				gpmsCommonObj : gpmsCommonObj()
			});
			this.config.ajaxCallMode = 16;
			this.ajaxCall(this.config);
			return false;
		},

		BindProposalStatus : function() {
			this.config.url = this.config.baseURL + "GetProposalStatusList";
			this.config.data = "{}";
			this.config.ajaxCallMode = 1;
			this.ajaxCall(this.config);
			return false;
		},

		BindUserDropDown : function() {
			// Used User REST API instead Proposal
			this.config.url = this.config.rootURL + "users/"
					+ "GetAllUserDropdown";
			this.config.data = "{}";
			this.config.ajaxCallMode = 5;
			this.ajaxCall(this.config);
			return false;
		},

		BindPositionsForUserDropDown : function(userId) {
			// Used User REST API instead Proposal
			this.config.url = this.config.rootURL + "users/"
					+ "GetAllPositionDetailsForAUser";
			this.config.data = JSON2.stringify({
				UserId : userId
			});
			this.config.ajaxCallMode = 6;
			this.ajaxCall(this.config);
			return false;
		},

		BindDepartmentDropDown : function(userId, collegeName) {
			this.config.url = this.config.rootURL + "users/"
					+ "GetDepartmentsForAUser";
			this.config.data = JSON2.stringify({
				UserId : userId,
				college : collegeName
			});
			this.config.ajaxCallMode = 7;
			this.ajaxCall(this.config);
			return false;
		},

		BindPositionTypeDropDown : function(userId, collegeName, departmentName) {
			this.config.url = this.config.rootURL + "users/"
					+ "GetPositionTypeForAUser";
			this.config.data = JSON2.stringify({
				UserId : userId,
				college : collegeName,
				department : departmentName
			});
			this.config.ajaxCallMode = 8;
			this.ajaxCall(this.config);
			return false;
		},

		BindPositionTitleDropDown : function(userId, collegeName,
				departmentName, positionTypeName) {
			this.config.url = this.config.rootURL + "users/"
					+ "GetPositionTitleList";
			this.config.data = JSON2.stringify({
				UserId : userId,
				college : collegeName,
				department : departmentName,
				positionType : positionTypeName
			});
			this.config.ajaxCallMode = 9;
			this.ajaxCall(this.config);
			return false;
		},

		BindDepartmentOnly : function(collegeName) {
			this.config.url = this.config.rootURL + "users/"
					+ "GetDepartmentList";
			this.config.data = JSON2.stringify({
				college : collegeName
			});
			this.config.ajaxCallMode = 11;
			this.ajaxCall(this.config);
			return false;
		},

		BindPositionTypeOnly : function(collegeName, departmentName) {
			this.config.url = this.config.rootURL + "users/"
					+ "GetPositionTypeList";
			this.config.data = JSON2.stringify({
				college : collegeName,
				department : departmentName
			});
			this.config.ajaxCallMode = 11;
			this.ajaxCall(this.config);
			return false;
		},

		BindPositionTitleOnly : function(collegeName, departmentName,
				positionTypeName) {
			this.config.url = this.config.rootURL + "users/"
					+ "GetPositionTitleList";
			this.config.data = JSON2.stringify({
				college : collegeName,
				department : departmentName,
				positionType : positionTypeName
			});
			this.config.ajaxCallMode = 12;
			this.ajaxCall(this.config);
			return false;
		},

		ajaxSuccess : function(msg) {
			switch (proposalsManage.config.ajaxCallMode) {
			case 0:
				break;
			case 1: // For Proposal Status Dropdown Binding for both form and
				// search
				$('#ddlSearchProposalStatus option').length = 1;
				$('#ddlProposalStatus option').length = 1;

				$.each(msg, function(index, item) {
					$('#ddlSearchProposalStatus')
							.append(new Option(item, item));
					$('#ddlProposalStatus').append(new Option(item, item));
				});
				break;

			case 2: // Single Proposal Delete
				proposalsManage.BindProposalGrid(null, null, null, null, null,
						null, null);
				csscody.info("<h2>"
						+ getLocale(gpmsProposalsManagement,
								'Successful Message')
						+ "</h2><p>"
						+ getLocale(gpmsProposalsManagement,
								'Proposal has been deleted successfully.')
						+ "</p>");

				$('#divProposalForm').hide();
				$('#divProposalGrid').show();
				break;
			break;

		case 3: // Multiple Proposal Delete
			SageData.Get("gdvProposals").Arr.length = 0;
			proposalsManage.BindProposalGrid(null, null, null, null, null,
					null, null);
			csscody
					.info("<h2>"
							+ getLocale(gpmsProposalsManagement,
									'Successful Message')
							+ "</h2><p>"
							+ getLocale(gpmsProposalsManagement,
									'Selected proposal(s) has been deleted successfully.')
							+ "</p>");
			break;

		case 4:// For User Edit Action
			proposalsManage.FillForm(msg);
			$('#divProposalGrid').hide();
			$('#divProposalForm').show();
			break;

		case 5: // Bind User List for Investigator Info
			$('select[name="ddlName"]').get(rowIndex).options.length = 0;
			$
					.each(
							msg,
							function(index, item) {
								// For form Dropdown Binding
								$('select[name="ddlName"]').get(rowIndex).options[$(
										'select[name="ddlName"]').get(rowIndex).options.length] = new Option(
										item, index);
							});
			break;

		case 6:
			$('select[name="ddlCollege"]').get(rowIndex).options.length = 0;
			$('select[name="ddlDepartment"]').get(rowIndex).options.length = 0;
			$('select[name="ddlPositionType"]').get(rowIndex).options.length = 0;
			$('select[name="ddlPositionTitle"]').get(rowIndex).options.length = 0;
			// department positionTitle
			// positionType fullName id
			$
					.each(
							msg,
							function(index, item) {
								$('input[name="txtPhoneNo"]').val(
										item.mobileNumber);

								$
										.each(
												item.positions,
												function(index, position) {
													if ($(
															'select[name="ddlCollege"] option[value="'
																	+ position.college
																	+ '"]').eq(
															rowIndex).length <= 0) {

														$(
																'select[name="ddlCollege"]')
																.get(rowIndex).options[$(
																'select[name="ddlCollege"]')
																.get(rowIndex).options.length] = new Option(
																position.college,
																position.college);
													}

													if (position.college == $(
															'select[name="ddlCollege"]')
															.eq(rowIndex).val()) {
														if ($(
																'select[name="ddlDepartment"] option[value="'
																		+ position.department
																		+ '"]')
																.eq(rowIndex).length <= 0) {

															$(
																	'select[name="ddlDepartment"]')
																	.get(
																			rowIndex).options[$(
																	'select[name="ddlDepartment"]')
																	.get(
																			rowIndex).options.length] = new Option(
																	position.department,
																	position.department);
														}
													}

													if (position.college == $(
															'select[name="ddlCollege"]')
															.eq(rowIndex).val()
															&& position.department == $(
																	'select[name="ddlDepartment"]')
																	.eq(
																			rowIndex)
																	.val()) {
														if ($(
																'select[name="ddlPositionType"] option[value="'
																		+ position.positionType
																		+ '"]')
																.eq(rowIndex).length <= 0) {

															$(
																	'select[name="ddlPositionType"]')
																	.get(
																			rowIndex).options[$(
																	'select[name="ddlPositionType"]')
																	.get(
																			rowIndex).options.length] = new Option(
																	position.positionType,
																	position.positionType);
														}
													}

													if (position.college == $(
															'select[name="ddlCollege"]')
															.eq(rowIndex).val()
															&& position.department == $(
																	'select[name="ddlDepartment"]')
																	.eq(
																			rowIndex)
																	.val()
															&& position.positionType == $(
																	'select[name="ddlPositionType"]')
																	.eq(
																			rowIndex)
																	.val()) {
														if ($(
																'select[name="ddlPositionTitle"] option[value="'
																		+ position.positionTitle
																		+ '"]')
																.eq(rowIndex).length <= 0) {

															$(
																	'select[name="ddlPositionTitle"]')
																	.get(
																			rowIndex).options[$(
																	'select[name="ddlPositionTitle"]')
																	.get(
																			rowIndex).options.length] = new Option(
																	position.positionTitle,
																	position.positionTitle);
														}
													}

												});
							});
			break;

		case 7:
			// $('select[name="ddlCollege"]').get(rowIndex).options.length = 0;
			$('select[name="ddlDepartment"]').get(rowIndex).options.length = 0;
			$('select[name="ddlPositionType"]').get(rowIndex).options.length = 0;
			$('select[name="ddlPositionTitle"]').get(rowIndex).options.length = 0;

			$
					.each(
							msg,
							function(index, item) {
								// For form Dropdown Binding
								$('select[name="ddlDepartment"]').get(rowIndex).options[$(
										'select[name="ddlDepartment"]').get(
										rowIndex).options.length] = new Option(
										item, item);
							});
			break;

		case 8:
			// $('select[name="ddlDepartment"]').get(rowIndex).options.length =
			// 0;
			$('select[name="ddlPositionType"]').get(rowIndex).options.length = 0;
			$('select[name="ddlPositionTitle"]').get(rowIndex).options.length = 0;
			$
					.each(msg,
							function(index, item) {
								$('select[name="ddlPositionType"]').get(
										rowIndex).options[$(
										'select[name="ddlPositionType"]').get(
										rowIndex).options.length] = new Option(
										item, item);
							});
			break;

		case 9:
			$('select[name="ddlPositionType"]').get(rowIndex).options.length = 0;
			$('select[name="ddlPositionTitle"]').get(rowIndex).options.length = 0;
			$
					.each(msg,
							function(index, item) {
								$('select[name="ddlPositionType"]').get(
										rowIndex).options[$(
										'select[name="ddlPositionType"]').get(
										rowIndex).options.length] = new Option(
										item, item);
							});

			break;

		case 10:
			$('select[name="ddlPositionTitle"]').get(rowIndex).options.length = 0;
			$
					.each(msg,
							function(index, item) {
								$('select[name="ddlPositionTitle"]').get(
										rowIndex).options[$(
										'select[name="ddlPositionTitle"]').get(
										rowIndex).options.length] = new Option(
										item, item);
							});
			break;

		case 11:

			break;

		case 12:

			break;

		case 13:

			break;

		case 14: // Activated
			proposalsManage
					.BindProposalGrid(null, null, null, null, null, null);
			csscody.info("<h2>"
					+ getLocale(gpmsProposalsManagement, 'Successful Message')
					+ "</h2><p>"
					+ getLocale(gpmsProposalsManagement,
							'User has been activated successfully.') + "</p>");
			break;

		case 15: // Unique Project Title Check
			isUniqueProjectTitle = stringToBoolean(msg);
			break;

		case 16: // Save Update
			proposalsManage.BindProposalGrid(null, null, null, null, null,
					null, null);
			$('#divProposalGrid').show();
			if (editFlag > 0) {
				csscody
						.info("<h2>"
								+ getLocale(gpmsProposalsManagement,
										'Successful Message')
								+ "</h2><p>"
								+ getLocale(gpmsProposalsManagement,
										'User has been updated successfully.')
								+ "</p>");
			} else {
				csscody.info("<h2>"
						+ getLocale(gpmsProposalsManagement,
								'Successful Message')
						+ "</h2><p>"
						+ getLocale(gpmsProposalsManagement,
								'User has been saved successfully.') + "</p>");
			}
			proposalsManage.ClearForm();
			$('#divProposalForm').hide();
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
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load departments list.") + '</p>');
				break;
			case 4:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>' + "Failed to load proposal details."
						+ '</p>');
				break;
			case 5:
				csscody
						.error('<h2>'
								+ getLocale(gpmsProposalsManagement,
										"Error Message")
								+ '</h2><p>'
								+ getLocale(gpmsProposalsManagement,
										"Failed to load position types list.")
								+ '</p>');
				break;
			case 6:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load position titles list.")
						+ '</p>');
				break;
			case 7:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load position titles list.")
						+ '</p>');
				break;

			case 8:
				break;

			case 9:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load departments list.") + '</p>');
				break;

			case 10:
				csscody
						.error('<h2>'
								+ getLocale(gpmsProposalsManagement,
										"Error Message")
								+ '</h2><p>'
								+ getLocale(gpmsProposalsManagement,
										"Failed to load position types list.")
								+ '</p>');
				break;

			case 11:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load position titles list.")
						+ '</p>');
				break;

			case 12:
				csscody.error("<h2>"
						+ getLocale(gpmsProposalsManagement, 'Error Message')
						+ "</h2><p>"
						+ getLocale(gpmsProposalsManagement,
								'User cannot be deleted.') + "</p>");
				break;

			case 13:
				csscody
						.error("<h2>"
								+ getLocale(gpmsProposalsManagement,
										'Error Message')
								+ "</h2><p>"
								+ getLocale(gpmsProposalsManagement,
										'Selected user(s) cannot be deleted.')
								+ "</p>");
				break;

			case 14:
				csscody.error("<h2>"
						+ getLocale(gpmsProposalsManagement, 'Error Message')
						+ "</h2><p>"
						+ getLocale(gpmsProposalsManagement,
								'User cannot be activated.') + "</p>");
				break;

			case 15:
				csscody.error("<h2>"
						+ getLocale(gpmsProposalsManagement, 'Error Message')
						+ "</h2><p>"
						+ getLocale(gpmsProposalsManagement,
								'Cannot check for unique Username') + "</p>");
				break;

			case 16:
				csscody.error("<h2>"
						+ getLocale(gpmsProposalsManagement, 'Error Message')
						+ "</h2><p>"
						+ getLocale(gpmsProposalsManagement,
								'Failed to save user!') + "</p>");
				break;
			}
		},

		init : function(config) {
			proposalsManage.LoadStaticImage();
			$("#txtSearchReceivedOnFrom").datepicker(
					{
						dateFormat : 'yy-mm-dd',
						changeMonth : true,
						changeYear : true,
						onSelect : function(selectedDate) {
							$("#txtSearchReceivedOnTo").datepicker("option",
									"minDate", selectedDate);
						}
					});
			$("#txtSearchReceivedOnTo").datepicker({
				dateFormat : 'yy-mm-dd',
				changeMonth : true,
				changeYear : true
			});
			proposalsManage.BindProposalGrid(null, null, null, null, null,
					null, null);
			$('#divProposalForm').hide();
			$('#divProposalGrid').show();

			proposalsManage.BindProposalStatus();

			proposalsManage.BindUserDropDown();

			// $('select[name="ddlName"] option').eq(rowIndex).map(function() {
			// if ($(this).val() == GPMS.utils.GetUserProfileID())
			// return this;
			// }).attr('selected', 'selected');

			// TODO : Bind User Name based on logged-in UserProfileID
			// proposalsManage.BindCollegeDropDown();

			// TODO select the user's college
			proposalsManage.BindPositionsForUserDropDown(GPMS.utils
					.GetUserProfileID());

			// proposalsManage.BindDepartmentDropDown($(
			// 'select[name="ddlCollege"] option:selected').eq(rowIndex)
			// .val());
			// proposalsManage.BindPositionTypeDropDown($(
			// 'select[name="ddlCollege"] option:selected').eq(rowIndex)
			// .val(), $('select[name="ddlDepartment"] option:selected')
			// .eq(rowIndex).val());
			// proposalsManage.BindPositionTitleDropDown($(
			// 'select[name="ddlCollege"] option:selected').eq(rowIndex)
			// .val(), $('select[name="ddlDepartment"] option:selected')
			// .eq(rowIndex).val(), $(
			// 'select[name="ddlPositionType"] option:selected').eq(
			// rowIndex).val(), false);

			// Form Position details Drop downs
			// $('select[name="ddlName"]').on("change", function() {
			// rowIndex = $(this).closest('tr').prevAll("tr").length;
			// if ($(this).val() != "0") {
			// // proposalsManage.BindCollegeDropDown($(this).val());
			// // TODO:
			// // 1. bind College by userID all positiondetails
			// // 2. select the college based on user data
			// // 3. bind Department
			// // 4. select the college based on user data
			// // 5. bind positiontype
			// // 6. select the college based on user data
			// // 7. bind positiontitle
			// // 8. select the positiontitle based on user data
			//
			// } else {
			// $(this).find('option:gt(0)').remove();
			// }
			// });

			$('select[name="ddlCollege"]').on(
					"change",
					function() {
						rowIndex = $(this).closest('tr').prevAll("tr").length;
						if ($(this).val() != "0") {
							proposalsManage.BindDepartmentDropDown(GPMS.utils
									.GetUserProfileID(), $(this).val());
							proposalsManage.BindPositionTypeDropDown(GPMS.utils
									.GetUserProfileID(), $(this).val(), $(
									'select[name="ddlDepartment"]')
									.eq(rowIndex).val());
						} else {
							$(this).find('option:gt(0)').remove();
						}
					});

			$('select[name="ddlDepartment"]')
					.on(
							"change",
							function() {
								rowIndex = $(this).closest('tr').prevAll("tr").length;
								if ($('select[name="ddlCollege"]').eq(rowIndex)
										.val() != "0"
										&& $(this).val() != "0") {
									proposalsManage.BindPositionTypeDropDown($(
											'select[name="ddlCollege"]').eq(
											rowIndex).val(), $(this).val());
								} else {
									$('select[name="ddlPositionType"]').find(
											'option:gt(0)').remove();
								}
							});

			$('select[name="ddlPositionType"]')
					.on(
							"change",
							function() {
								rowIndex = $(this).closest('tr').prevAll("tr").length;
								if ($('select[name="ddlCollege"]').eq(rowIndex)
										.val() != "0"
										&& $('select[name="ddlDepartment"]')
												.eq(rowIndex).val() != "0"
										&& $(this).val() != "0") {
									proposalsManage.BindPositionTitleDropDown(
											$('select[name="ddlCollege"]').eq(
													rowIndex).val(),
											$('select[name="ddlDepartment"]')
													.eq(rowIndex).val(),
											$(this).val());
								} else {
									$('select[name="ddlPositionTitle"]').find(
											'option:gt(0)').remove();
								}

							});

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
																	'Are you sure you want to delete selected proposal(s)?')
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
															"Please select at least one proposal before deleting.")
													+ '</p>');
								}
							});

			$('#btnAddNew').bind("click", function() {
				$('#auditLogTab').hide();
				$('#divProposalGrid').hide();
				$('#divProposalForm').show();
				proposalsManage.ClearForm();
			});

			$('#btnBack').bind("click", function() {
				$('#divProposalForm').hide();
				$('#divProposalGrid').show();
				proposalsManage.ClearForm();
			});

			$('#btnReset').bind("click", function() {
				proposalsManage.ClearForm();
			});

			$('#btnSaveProposal').click(function() {
				var proposal_id = $(this).prop("name");
				if (proposal_id != '') {
					editFlag = proposal_id;
					proposalsManage.SaveProposal(proposal_id, false);
				} else {
					editFlag = 0;
					proposalsManage.SaveProposal("0", true);
				}
			});

			$("#saveForm").bind("click", function() {
				proposalsManage.SubmitForm('form_8');
			});

			$('#txtProjectTitle').blur(
					function() {
						var errors = '';
						var userName = $(this).val();
						var proposal_id = $('#btnSaveProposal').prop("name");
						if (proposal_id == '') {
							proposal_id = "0";
						}
						if (!userName) {
							errors += getLocale(gpmsProposalsManagement,
									"Please enter username.");
						} else if (!proposalsManage.isUniqueProjectTitle(
								proposal_id, userName)) {
							errors += getLocale(gpmsProposalsManagement,
									"Please enter unique username.")
									+ " '"
									+ userName.trim()
									+ "' "
									+ getLocale(gpmsProposalsManagement,
											"already exists.") + '<br/>';
						}

						if (errors) {
							$(this).next('.cssClassRight').hide();
							$(this).siblings('.cssClassError').show();
							$(this).siblings(".cssClassError").parent('div')
									.addClass("diverror");
							$(this).siblings('.cssClassError').prevAll(
									"input:first").addClass("error");
							$(this).siblings('.cssClassError').html(errors);
							return false;
						} else {
							$(this).parent("td").find("span.error").hide();
							$(this).next('.cssClassRight').show();
							$(this).siblings('.cssClassError').hide();
							$(this).siblings(".cssClassError").parent('div')
									.removeClass("diverror");
							$(this).siblings('.cssClassError').prevAll(
									"input:first").removeClass("error");
						}
					});

			// $("td.required input, td select").focusout(function() {
			// $tdParent = $(this).parent();
			// if ($tdParent.find('.cssClassRequired')) {
			// if ($(this).val() != '' && $(this).val() != '0') {
			// $tdParent.find('.cssClassRequired').hide();
			// } else {
			// $tdParent.find('.cssClassRequired').show();
			// }
			// }
			// });

			$("input[type=button].AddOption")
					.on(
							"click",
							function() {
								if ($(this).prop("name") == "DeleteOption") {
									var t = $(this).closest('tr');

									t.find("td").wrapInner(
											"<div style='DISPLAY: block'/>")
											.parent().find("td div").slideUp(
													300, function() {
														t.remove();
													});

								} else if ($(this).prop("name") == "AddMore") {
									var cloneRow = $(this).closest('tr').clone(
											true);
									$(cloneRow).find("input").each(
											function(i) {
												if ($(this).hasClass(
														"AddOption")) {
													$(this).prop("name",
															"DeleteOption");
													$(this).prop("value",
															"Delete");
												}
												$(this).parent('td').find(
														'span').removeClass(
														'error');
												$(this).removeClass('error');
											});
									$(cloneRow).find("select").find("option")
											.each(function(j) {
												$(this).removeAttr("selected");
											});
									$(cloneRow).appendTo("#dataTable").hide()
											.fadeIn(1200);

									rowIndex = $('#dataTable > tbody tr')
											.size() - 1;
									proposalsManage
											.BindDepartmentDropDown($(
													'select[name="ddlProposalStatus"] option:selected')
													.eq(rowIndex).val());

									// $('#dataTable tr:last
									// td').fadeIn('slow');
								}
							});
			$("#btnSearchProposal").bind("click", function() {
				proposalsManage.SearchProposals();
				return false;
			});

			$("#btnSearchProposalAuditLog").bind("click", function() {
				proposalsManage.SearchProposalAuditLogs();
				return false;
			});

			$(
					'#txtSearchProjectTitle,#txtSearchProposedBy,#txtSearchTotalCostsFrom,#txtSearchTotalCostsTo,#txtSearchReceivedOnFrom,#txtSearchReceivedOnTo,#ddlSearchProposalStatus')
					.keyup(function(event) {
						if (event.keyCode == 13) {
							$("#btnSearchProposal").click();
						}
					});
		}
	};
	proposalsManage.init();
});