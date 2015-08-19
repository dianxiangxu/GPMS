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

	var isUniqueProjectTitle = false;
	var isUniqueEmail = false;

	var editFlag = 0;

	proposalsManage = {
		config : {
			isPostBack : false,
			async : false,
			cache : false,
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

		EnableAccordion : function() {
			$('div#st_vertical').slideTabs({
				tabsScroll : false,
				contentAnim : 'slideH',
				contentAnimTime : 600,
				contentEasing : 'easeInOutExpo',
				orientation : 'vertical',
				tabsAnimTime : 300
			});

		},

		ClearForm : function() {
			$('.class-text').removeClass('error').next('span').removeClass(
					'error');
			var inputs = $("#container-7").find('INPUT, SELECT, TEXTAREA');
			$.each(inputs, function(i, item) {
				rmErrorClass(item);
				$(this).prop('checked', false);
				$(this).val($(this).find('option').first().val());
			});

			proposalsManage.onInit();
			$('#lblFormHeading').html(
					getLocale(gpmsProposalsManagement, "New User Details"));
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

			$(".AddOption").val("[+] Add");

			rowIndex = 0;
			$("#dataTable tbody>tr:gt(0)").remove();
			$("#dataTable tbody>tr:first").find("select").find('option').each(
					function(i) {
						$(this).removeAttr("selected");
					});

			// $('select[name="ddlCollege"]').eq(0).val(
			// $('select[name="ddlCollege"] option:first').val());

			proposalsManage.BindDepartmentDropDown($(
					'select[name="ddlProposalStatus"]').eq(0).val(), false);

			$('input[name=chkActive]').prop('checked', 'checked');
			return false;
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
											align : 'left'
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
											type : 'array'
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
											type : 'array'
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
											align : 'left',
											type : 'array'
										},
										{
											display : 'Direct Costs($)',
											name : 'directCosts',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
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
											align : 'left'
										},
										{
											display : 'Last Audited Action',
											name : 'last_audited_action',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'Is Deleted?',
											name : 'is_deleted',
											cssclass : 'cssClassHeadBoolean',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											type : 'boolean',
											format : 'Yes/No'
										},
										{
											display : 'PI User',
											name : 'pi_user',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'Co-PI Users',
											name : 'co_pi_users',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left',
											type : 'array'
										},
										{
											display : 'FA Costs($)',
											name : 'FA_costs',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
										},
										{
											display : 'FA Rate(%)',
											name : 'FA_rate',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left'
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
											arguments : '1,2,3,4,5,6,7,8,9,10,11'
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
											arguments : '18'
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
									9 : {
										sorter : false
									}
								}
							});
		},

		BindUserAuditLogGrid : function(userId, action, auditedBy,
				activityOnFrom, activityOnTo) {
			this.config.url = this.config.baseURL;
			this.config.method = "GetUsersAuditLogList";
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
				userId : userId,
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
		FillForm : function(response) {
			// See this how we can get response object based on fields
			$('#txtFirstName').val(response['firstName']);
			$('#txtMiddleName').val(response['middleName']);
			$('#txtLastName').val(response['lastName']);
			$('#txtDOB').val(response['dateOfBirth']);

			// $('#ddlGender').val(response['gender']);

			$('#ddlGender option').map(function() {
				if ($(this).text() == response['gender'])
					return this;
			}).prop('selected', 'selected');

			proposalsManage.BindUserPostionDetails(response['details']);

			$.each(response['officeNumbers'], function(index, value) {
				// alert(index + " :: " + value);
				$('#txtOfficeNumber').val(response['officeNumbers']);
			});

			$.each(response['mobileNumbers'], function(index, value) {
				// alert(index + " :: " + value);
				$('#txtMobileNumber').val(response['mobileNumbers']);
			});

			$.each(response['homeNumbers'], function(index, value) {
				// alert(index + " :: " + value);
				$('#txtHomeNumber').val(response['homeNumbers']);
			});

			$.each(response['otherNumbers'], function(index, value) {
				// alert(index + " :: " + value);
				$('#txtOtherNumber').val(response['otherNumbers']);
			});

			$.each(response['addresses'], function(index, value) {
				$('#txtStreet').val(value['street']);
				$('#txtApt').val(value['apt']);
				$('#txtCity').val(value['city']);

				$('#ddlState option').map(function() {
					if ($(this).text() == value['state'])
						return this;
				}).prop('selected', 'selected');

				$('#txtZip').val(value['zipcode']);

				$('#ddlCountry option').map(function() {
					if ($(this).text() == value['country'])
						return this;
				}).prop('selected', 'selected');
			});

			$.each(response['workEmails'], function(index, value) {
				// alert(index + " :: " + value);
				$('#txtWorkEmail').val(response['workEmails']);
			});

			$.each(response['personalEmails'], function(index, value) {
				// alert(index + " :: " + value);
				$('#txtPersonalEmail').val(response['personalEmails']);
			});

			$('input[name=chkActive]').prop('checked',
					response['userAccount']['isActive']);

			$.each(response['userAccount'], function(index, value) {
				$('#txtUserName').val(response['userAccount']['userName']);
				$('#txtUserName').prop('disabled', 'disabled');

				$('#txtPassword').val(response['userAccount']['password']);
			});

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
			switch (tblID) {
			case "gdvProposals":
				proposalsManage.ClearForm();
				$('#lblFormHeading').html(
						getLocale(gpmsProposalsManagement,
								'Edit User Details for: ')
								+ argus[2]);

				if (argus[7] != null && argus[7] != "") {
					$('#tblLastAuditedInfo').show();
					$('#lblLastUpdatedOn').html(argus[7]);
					$('#lblLastUpdatedBy').html(argus[8]);
					$('#lblActivity').html(argus[9]);
				} else {
					$('#tblLastAuditedInfo').hide();
				}
				// $('#txtUserName').val(argus[1]);
				// $('#txtUserName').prop('disabled', 'disabled');
				if (argus[11].toLowerCase() != "yes") {
					$(".delbutton").prop("id", argus[0]);
					$(".delbutton").show();
				} else {
					$(".delbutton").removeAttr("id");
					$(".delbutton").hide();
				}
				$("input[name=AddMore]").removeAttr('disabled');
				$("input[name=DeleteOption]").removeAttr('disabled');
				$("#btnSaveUser").prop("name", argus[0]);

				$("#btnReset").hide();

				proposalsManage.config.url = proposalsManage.config.baseURL
						+ "GetUsersByProfileId";
				proposalsManage.config.data = JSON2.stringify({
					userId : argus[0],
					gpmsCommonObj : gpmsCommonObj()
				});
				proposalsManage.config.ajaxCallMode = 8;
				proposalsManage.ajaxCall(proposalsManage.config);

				proposalsManage.BindUserAuditLogGrid(argus[0], null, null,
						null, null);
				$('#auditLogTab').show();

				break;
			default:
				break;
			}
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

		isUniqueProjectTitle : function(userId, newUserName) {
			var userUniqueObj = {
				UserID : userId,
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
		IsUniqueEmail : function(userId, newEmail) {
			var userUniqueObj = {
				UserID : userId,
				NewEmail : newEmail
			};
			var gpmsCommonInfo = gpmsCommonObj();
			this.config.url = this.config.baseURL + "CheckUniqueEmail";
			this.config.data = JSON2.stringify({
				userUniqueObj : userUniqueObj,
				gpmsCommonObj : gpmsCommonInfo
			});
			this.config.ajaxCallMode = 16;
			this.ajaxCall(this.config);
			return isUniqueEmail;
		},

		SaveProposal : function(_userId, _flag) {
			$('#iferror').hide();
			if (checkForm($("#form1"))) {
				var validateErrorMessage = '';

				var newUserName = $('#txtUserName').val();
				if (!newUserName) {
					validateErrorMessage += 'Please enter username.<br/>';
				} else if (!proposalsManage.isUniqueProjectTitle(_userId,
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
						UserId : _userId,
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
						UserName : $.trim($('#txtUserName').val()),
						Password : $.trim($('#txtPassword').val()),
						Flag : _flag, // false for Update true for New Add
						SaveOptions : _saveOptions
					};

					proposalsManage.AddUserInfo(userInfo);

					return false;
				}
			}
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

		BindCollegeDropDown : function() {
			this.config.url = this.config.baseURL + "GetCollegeList";
			this.config.data = "{}";
			this.config.ajaxCallMode = 1;
			this.ajaxCall(this.config);
			return false;
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

			var userId = $('#btnSaveUser').prop("name");
			if (userId == '') {
				userId = "0";
			}

			proposalsManage.BindUserAuditLogGrid(userId, action, auditedBy,
					activityOnFrom, activityOnTo);
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

		case 4:

			break;

		case 5:

			break;

		case 6:

			break;

		case 7:

			break;

		case 8: // For User Edit Action
			proposalsManage.FillForm(msg);
			$('#divProposalGrid').hide();
			$('#divProposalForm').show();
			break;

		case 9:

			break;

		case 10:

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
				csscody
						.error('<h2>'
								+ getLocale(gpmsProposalsManagement,
										"Error Message")
								+ '</h2><p>'
								+ getLocale(gpmsProposalsManagement,
										"Failed to load position types list.")
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
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>' + "Failed to load user details." + '</p>');
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
			// proposalsManage.BindCollegeDropDown();

			// // Form Position details Drop downs
			// $('select[name="ddlProposalStatus"]').on(
			// "change",
			// function() {
			// rowIndex = $(this).closest('tr').prevAll("tr").length;
			// if ($(this).val() != "0") {
			// proposalsManage.BindDepartmentDropDown($(this)
			// .val(), false);
			// } else {
			// $(this).find('option:gt(0)').remove();
			// }
			// });

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

			$('#btnSaveUser').click(function() {
				var user_id = $(this).prop("name");
				if (user_id != '') {
					editFlag = user_id;
					proposalsManage.SaveProposal(user_id, false);
				} else {
					editFlag = 0;
					proposalsManage.SaveProposal("0", true);
				}
			});

			$("#saveForm").bind("click", function() {
				proposalsManage.SubmitForm('form_8');
			});

			$('#txtUserName').blur(
					function() {
						var errors = '';
						var userName = $(this).val();
						var user_id = $('#btnSaveUser').prop("name");
						if (user_id == '') {
							user_id = "0";
						}
						if (!userName) {
							errors += getLocale(gpmsProposalsManagement,
									"Please enter username.");
						} else if (!proposalsManage.isUniqueProjectTitle(
								user_id, userName)) {
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

			$(".delbutton").click(function() {
				// var user_id = $(this).prop("id").replace(/[^0-9]/gi, '');
				var proposal_id = $(this).prop("id");
				proposalsManage.DeleteProposalById(proposal_id);
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
											.BindDepartmentDropDown(
													$(
															'select[name="ddlProposalStatus"] option:selected')
															.eq(rowIndex).val(),
													false);

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