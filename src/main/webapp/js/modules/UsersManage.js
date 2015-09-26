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

	var validator = $("#form1")
			.validate(
					{
						rules : {
							firstName : {
								required : true,
								maxlength : 40
							},
							lastName : {
								required : true,
								maxlength : 40
							},
							dob : {
								required : true,
								dpDate : true
							},
							gender : {
								required : true
							},
							street : {
								required : true,
								minlength : 3
							},
							city : {
								required : true
							},
							state : {
								required : true
							},
							zip : {
								required : true
							},
							country : {
								required : true
							},
							officeNumber : {
								phoneUS : true
							},
							mobileNumber : {
								required : true,
								phoneUS : true
							},
							homeNumber : {
								phoneUS : true
							},
							otherNumber : {
								phoneUS : true
							},
							workEmail : {
								required : true,
								email : true
							},
							personalEmail : {
								email : true
							},
							// username : {
							// required : true,
							// minlength : 3
							// },
							password : {
								required : true,
								minlength : 6,
								maxlength : 15
							},
							confirm_password : {
								required : true,
								minlength : 6,
								maxlength : 15,
								equalTo : "#txtPassword"
							}
						},
						errorElement : "span",
						messages : {
							firstName : {
								required : "Please enter your firstname",
								maxlength : "Your firstname must be at most 40 characters long"
							},
							LastName : {
								required : "Please enter your lastname",
								maxlength : "Your lastname must be at most 40 characters long"
							},
							dob : {
								required : "Please enter your date of birth",
								dpDate : "Please enter valid date"
							},
							gender : {
								required : "Please select your gender"
							},
							street : {
								required : "Please enter your street address",
								minlength : "Please enter valid your street address"
							},
							city : {
								required : "Please enter your city"
							},
							state : {
								required : "Please select your city"
							},
							zip : {
								required : "Please enter your zip code"
							},
							country : {
								required : "Please select your country"
							},
							officeNumber : {
								phoneUS : "Please enter your valid office phone number"
							},
							mobileNumber : {
								required : "Please enter your mobile phone number",
								phoneUS : "Please enter your valid mobile phone number",
							},
							homeNumber : {
								phoneUS : "Please enter your valid home phone number",
							},
							otherNumber : {
								phoneUS : "Please enter your valid additional phone number",
							},
							workEmail : {
								required : "Please enter your work email",
								email : "Please enter valid email id"
							},
							personalEmail : {
								email : "Please enter valid email id"
							},
							// username : {
							// required : "Please enter a username",
							// minlength : "Your username must be at least 3
							// characters long"
							// },
							password : {
								required : "Please provide a password",
								minlength : "Your password must be between 6 and 15 characters",
								maxlength : "Your password must be between 6 and 15 characters"
							},
							confirm_password : {
								required : "Please confirm your password",
								minlength : "Your password must be between 6 and 15 characters",
								equalTo : "Please enter the same password as above",
								maxlength : "Your password must be between 6 and 15 characters"
							}
						},
						ignore : ":hidden"
					});

	var rowIndex = 0;
	var editFlag = 0;
	var isUniqueUserName = false;
	var isUniqueEmail = false;

	usersManage = {
		config : {
			isPostBack : false,
			async : false,
			cache : false,
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
			this.config.data = {
				userBindObj : userBindObj
			};
			var data = this.config.data;

			$("#gdvUsers").sagegrid({
				url : this.config.url,
				functionMethod : this.config.method,
				colModel : [ {
					display : 'User Profile ID',
					name : 'userProfile_id',
					cssclass : 'cssClassHeadCheckBox',
					coltype : 'checkbox',
					align : 'center',
					checkFor : '11', // this is count from 0 column index
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
					display : getLocale(gpmsUsersManagement, 'Last Audited'),
					name : 'last_audited',
					cssclass : 'cssClassHeadDate',
					controlclass : '',
					coltype : 'label',
					align : 'left',
					type : 'date',
					format : 'yyyy/MM/dd hh:mm:ss a',
					hide : true
				}, {
					display : 'Last Audited By',
					name : 'last_audited_by',
					cssclass : '',
					controlclass : '',
					coltype : 'label',
					align : 'left',
					hide : true
				}, {
					display : 'Last Audited Action',
					name : 'last_audited_action',
					cssclass : '',
					controlclass : '',
					coltype : 'label',
					align : 'left',
					hide : true
				}, {
					display : getLocale(gpmsUsersManagement, 'Is Active?'),
					name : 'is_active',
					cssclass : 'cssClassHeadBoolean',
					controlclass : '',
					coltype : 'label',
					align : 'left',
					type : 'boolean',
					format : 'Yes/No'
				}, {
					display : getLocale(gpmsUsersManagement, 'Is Deleted?'),
					name : 'is_deleted',
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
					arguments : '1,2,3,4,5,6,7,8,9,10,11'
				}, {
					display : getLocale(gpmsUsersManagement, "Delete"),
					name : 'delete',
					enable : true,
					_event : 'click',
					trigger : '2',
					callMethod : 'usersManage.DeleteUser',
					arguments : '11'
				}, {
					display : getLocale(gpmsUsersManagement, "Activate"),
					name : 'activate',
					enable : true,
					_event : 'click',
					trigger : '3',
					callMethod : 'usersManage.ActiveUser',
					arguments : '10'
				}, {
					display : getLocale(gpmsUsersManagement, "Deactivate"),
					name : 'deactivate',
					enable : true,
					_event : 'click',
					trigger : '4',
					callMethod : 'usersManage.DeactiveUser',
					arguments : '10'
				} ],
				rp : perpage,
				nomsg : getLocale(gpmsUsersManagement, 'No Records Found!'),
				param : data,
				current : current_,
				pnew : offset_,
				sortcol : {
					0 : {
						sorter : false
					},
					12 : {
						sorter : false
					}
				}
			});
		},

		EditUser : function(tblID, argus) {
			switch (tblID) {
			case "gdvUsers":
				usersManage.ClearForm();
				$('#lblFormHeading').html(
						getLocale(gpmsUsersManagement,
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

				usersManage.config.url = usersManage.config.baseURL
						+ "GetUserDetailsByProfileId";
				usersManage.config.data = JSON2.stringify({
					userId : argus[0]
				});
				usersManage.config.ajaxCallMode = 8;
				usersManage.ajaxCall(usersManage.config);

				usersManage.BindUserAuditLogGrid(argus[0], null, null, null,
						null);
				$('#auditLogTab').show();

				break;
			default:
				break;
			}
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

			usersManage.BindUserPostionDetails(response['details']);

			$.each(response['officeNumbers'], function(index, value) {
				// alert(index + " :: " + value);
				$('#txtOfficeNumber').val(response['officeNumbers']).mask(
						"(999) 999-9999");
			});

			$.each(response['mobileNumbers'], function(index, value) {
				// alert(index + " :: " + value);
				$('#txtMobileNumber').val(response['mobileNumbers']).mask(
						"(999) 999-9999");
			});

			$.each(response['homeNumbers'], function(index, value) {
				// alert(index + " :: " + value);
				$('#txtHomeNumber').val(response['homeNumbers']).mask(
						"(999) 999-9999");
			});

			$.each(response['otherNumbers'], function(index, value) {
				// alert(index + " :: " + value);
				$('#txtOtherNumber').val(response['otherNumbers']).mask(
						"(999) 999-9999");
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

		BindUserPostionDetails : function(postitionDetails) {
			// $("#dataTable tr:gt(1)").remove();
			$
					.each(
							postitionDetails,
							function(i, value) {
								// alert(index + " :: " +
								// value['positionTitle']);
								var btnOption = "[+] Add";
								var btnTitle = "Add More"
								var btnName = "AddMore";
								if (i > 0) {
									btnOption = "Delete ";
									btnTitle = "Delete";
									btnName = "DeleteOption";
								}
								var cloneRow = $('#dataTable tbody>tr:first')
										.clone(true);
								$(cloneRow).appendTo("#dataTable");

								rowIndex = i + 1;
								$('#dataTable tbody>tr:eq(' + rowIndex + ')')
										.find("select")
										.each(
												function(j) {
													if (this.name == "ddlCollege") {
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
																				usersManage
																						.BindDepartmentOnly($(
																								'select[name="ddlCollege"] option:selected')
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

																				usersManage
																						.BindPositionTypeOnly(
																								$(
																										'select[name="ddlCollege"] option:selected')
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

																				usersManage
																						.BindPositionTitleOnly(
																								$(
																										'select[name="ddlCollege"] option:selected')
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
													if ($(this)
															.is(".AddOption")) {
														$(this).prop("name",
																btnName);
														$(this).prop("value",
																btnOption);
														$(this).prop("title",
																btnTitle);
													}
												});
							});
			$('#dataTable>tbody tr:first').remove();
		},

		SearchUserAuditLogs : function() {
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

			usersManage.BindUserAuditLogGrid(userId, action, auditedBy,
					activityOnFrom, activityOnTo);
		},

		BindUserAuditLogGrid : function(userId, action, auditedBy,
				activityOnFrom, activityOnTo) {
			this.config.url = this.config.baseURL;
			this.config.method = "GetUserAuditLogList";
			var offset_ = 1;
			var current_ = 1;
			var perpage = ($("#gdvUsersAuditLog_pagesize").length > 0) ? $(
					"#gdvUsersAuditLog_pagesize :selected").text() : 10;

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

			$("#gdvUsersAuditLog").sagegrid({
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
				nomsg : getLocale(gpmsUsersManagement, 'No Records Found!'),
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

		DeleteUser : function(tblID, argus) {
			switch (tblID) {
			case "gdvUsers":
				if (argus[1].toLowerCase() != "yes") {
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
							"Are you sure you want to delete this user?")
					+ "</p>", properties);
		},

		ConfirmSingleDelete : function(user_id, event) {
			if (event) {
				usersManage.DeleteSingleUser(user_id);
			}
		},

		DeleteSingleUser : function(_userId) {
			this.config.url = this.config.baseURL + "DeleteUserByUserID";
			this.config.data = JSON2.stringify({
				userId : _userId,
				gpmsCommonObj : gpmsCommonObj()
			});
			this.config.ajaxCallMode = 12;
			this.ajaxCall(this.config);
			return false;
		},

		ConfirmDeleteMultiple : function(user_ids, event) {
			if (event) {
				usersManage.DeleteMultipleUsers(user_ids);
			}
		},

		DeleteMultipleUsers : function(_userIds) {
			// this.config.dataType = "html";
			this.config.url = this.config.baseURL
					+ "DeleteMultipleUsersByUserID";
			this.config.data = JSON2.stringify({
				userIds : _userIds,
				gpmsCommonObj : gpmsCommonObj()
			});
			this.config.ajaxCallMode = 13;
			this.ajaxCall(this.config);
			return false;
		},

		ActivateUser : function(_userId, _isActive) {
			this.config.url = this.config.baseURL
					+ "UpdateUserIsActiveByUserID";
			this.config.data = JSON2.stringify({
				userId : _userId,
				gpmsCommonObj : gpmsCommonObj(),
				isActive : _isActive
			});
			if (_isActive) {
				this.config.ajaxCallMode = 14;
			} else {
				this.config.ajaxCallMode = 15;
			}
			this.ajaxCall(this.config);
			return false;
		},

		ActiveUser : function(tblID, argus) {
			switch (tblID) {
			case "gdvUsers":
				if (argus[1].toLowerCase() != "yes") {
					usersManage.ActivateUser(argus[0], true);
				} else {
					csscody.alert('<h2>'
							+ getLocale(gpmsUsersManagement,
									"Information Alert")
							+ '</h2><p>'
							+ getLocale(gpmsUsersManagement,
									"Sorry! this user is already actived.")
							+ '</p>');
				}
				break;
			default:
				break;
			}
		},

		DeactiveUser : function(tblID, argus) {
			switch (tblID) {
			case "gdvUsers":
				if (argus[1].toLowerCase() != "no") {
					usersManage.ActivateUser(argus[0], false);
				} else {
					csscody.alert('<h2>'
							+ getLocale(gpmsUsersManagement,
									"Information Alert")
							+ '</h2><p>'
							+ getLocale(gpmsUsersManagement,
									"Sorry! this user is already deactived.")
							+ '</p>');
				}
				break;
			default:
				break;
			}
		},

		ClearForm : function() {
			validator.resetForm();
			$('.class-text').removeClass('error').next('span').removeClass(
					'error');
			var inputs = $("#container-7").find('INPUT, SELECT, TEXTAREA');
			$.each(inputs, function(i, item) {
				rmErrorClass(item);
				$(this).prop('checked', false);
				$(this).val($(this).find('option').first().val());
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

			$(".AddOption").val("[+] Add");

			rowIndex = 0;
			$("#dataTable tbody>tr:gt(0)").remove();
			$("#dataTable tbody>tr:first").find("select").find('option').each(
					function(i) {
						$(this).removeAttr("selected");
					});

			usersManage.BindDepartmentDropDown($('select[name="ddlCollege"]')
					.eq(0).val(), false);

			// var checked = $('input[name=chkActive]').is(":checked");
			$('input[name=chkActive]').prop('checked', 'checked');

			return false;
		},

		onInit : function() {
			usersManage.SetFirstTabActive();
			$('#btnReset').hide();
			$('.cssClassRight').hide();
			$('.cssClassError').hide();

			$("#gdvUsersAuditLog").empty();
			$("#gdvUsersAuditLog_Pagination").remove();
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

		SaveUser : function(_userId, _flag) {
			$('#iferror').hide();
			if (checkForm($("#form1"))) {
				var validateErrorMessage = '';

				var newUserName = $.trim($('#txtUserName').val());
				if (!newUserName) {
					validateErrorMessage += 'Please enter username.<br/>';
				} else if (!usersManage.IsUniqueUserName(_userId, newUserName)) {
					validateErrorMessage += "'"
							+ getLocale(gpmsUsersManagement,
									"Please enter unique username.") + " '"
							+ newUserName.trim() + "' "
							+ getLocale(gpmsUsersManagement, "already exists.")
							+ '<br/>';
				}

				if (validateErrorMessage != '') {
					$('#txtUserName').removeClass("error");
				} else {
					$('#txtUserName').addClass("error");
				}

				var _saveOptions = '';
				$("#dataTable")
						.find("tr select")
						.each(
								function(i) {
									var optionsText = $(this).val();
									if (!optionsText
											&& $(this).prop("name") != "ddlPositionTitle") {
										validateErrorMessage = getLocale(
												gpmsUsersManagement,
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
						UserID : _userId,
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
						OfficeNumber : $('#txtOfficeNumber').mask(),
						MobileNumber : $('#txtMobileNumber').mask(),
						HomeNumber : $('#txtHomeNumber').mask(),
						OtherNumber : $('#txtOtherNumber').mask(),
						WorkEmail : $('#txtWorkEmail').val(),
						PersonalEmail : $('#txtPersonalEmail').val(),
						IsActive : $('input[name=chkActive]').prop('checked'),
						UserName : $.trim($('#txtUserName').val()),
						Password : $.trim($('#txtPassword').val()),
						Flag : _flag, // false for Update true for New Add
						SaveOptions : _saveOptions
					};

					usersManage.AddUserInfo(userInfo);

					return false;
				}
			}
		},

		IsUniqueUserName : function(userId, newUserName) {
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
			this.config.ajaxCallMode = 16;
			this.ajaxCall(this.config);
			return isUniqueUserName;
		},

		// TODO:
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
			this.config.ajaxCallMode = 17;
			this.ajaxCall(this.config);
			return isUniqueEmail;
		},

		AddUserInfo : function(info) {
			this.config.url = this.config.baseURL + "SaveUpdateUser";
			this.config.data = JSON2.stringify({
				userInfo : info,
				gpmsCommonObj : gpmsCommonObj()
			});
			this.config.ajaxCallMode = 18;
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
			return false;
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
			return false;
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
			return false;
		},

		BindDepartmentOnly : function(collegeName) {
			this.config.url = this.config.baseURL + "GetDepartmentList";
			this.config.data = JSON2.stringify({
				college : collegeName
			});
			this.config.ajaxCallMode = 9;
			this.ajaxCall(this.config);
			return false;
		},

		BindPositionTypeOnly : function(collegeName, departmentName) {
			this.config.url = this.config.baseURL + "GetPositionTypeList";
			this.config.data = JSON2.stringify({
				college : collegeName,
				department : departmentName
			});
			this.config.ajaxCallMode = 10;
			this.ajaxCall(this.config);
			return false;
		},

		BindPositionTitleOnly : function(collegeName, departmentName,
				positionTypeName) {
			this.config.url = this.config.baseURL + "GetPositionTitleList";
			this.config.data = JSON2.stringify({
				college : collegeName,
				department : departmentName,
				positionType : positionTypeName
			});
			this.config.ajaxCallMode = 11;
			this.ajaxCall(this.config);
			return false;
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
						'select[name="ddlCollege"] option:selected').eq(
						rowIndex).val(), false);

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
						'select[name="ddlCollege"] option:selected').eq(
						rowIndex).val(), $(
						'select[name="ddlDepartment"] option:selected').eq(
						rowIndex).val(), false);
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
						'select[name="ddlCollege"] option:selected').eq(
						rowIndex).val(), $(
						'select[name="ddlDepartment"] option:selected').eq(
						rowIndex).val(), $(
						'select[name="ddlPositionType"] option:selected').eq(
						rowIndex).val(), false);
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

			case 8: // For User Edit Action
				usersManage.FillForm(msg);
				$('#divUserGrid').hide();
				$('#divUserForm').show();
				break;

			case 9: // For Binding Department Dropdown based on College
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
				break;

			case 10: // For Binding PositionType Dropdown based on
				// Department
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

				break;

			case 11: // For Binding PositionTitle Dropdown based on
				// PositionType
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

			case 12:
				usersManage.BindUserGrid(null, null, null, null, null, null);
				csscody
						.info("<h2>"
								+ getLocale(gpmsUsersManagement,
										'Successful Message')
								+ "</h2><p>"
								+ getLocale(gpmsUsersManagement,
										'User has been deleted successfully.')
								+ "</p>");

				$('#divUserForm').hide();
				$('#divUserGrid').show();
				break;

			case 13:
				SageData.Get("gdvUsers").Arr.length = 0;
				usersManage.BindUserGrid(null, null, null, null, null, null);
				csscody
						.info("<h2>"
								+ getLocale(gpmsUsersManagement,
										'Successful Message')
								+ "</h2><p>"
								+ getLocale(gpmsUsersManagement,
										'Selected user(s) has been deleted successfully.')
								+ "</p>");
				break;

			case 14:
				usersManage.BindUserGrid(null, null, null, null, null, null);
				csscody.info("<h2>"
						+ getLocale(gpmsUsersManagement, 'Successful Message')
						+ "</h2><p>"
						+ getLocale(gpmsUsersManagement,
								'User has been activated successfully.')
						+ "</p>");
				break;

			case 15:
				usersManage.BindUserGrid(null, null, null, null, null, null);
				csscody.info("<h2>"
						+ getLocale(gpmsUsersManagement, 'Successful Message')
						+ "</h2><p>"
						+ getLocale(gpmsUsersManagement,
								'User has been deactivated successfully.')
						+ "</p>");
				break;

			case 16:
				isUniqueUserName = stringToBoolean(msg);
				break;

			case 17:
				isUniqueEmail = stringToBoolean(msg);
				break;

			case 18:
				usersManage.BindUserGrid(null, null, null, null, null, null);
				$('#divUserGrid').show();
				if (editFlag > 0) {
					csscody.info("<h2>"
							+ getLocale(gpmsUsersManagement,
									'Successful Message')
							+ "</h2><p>"
							+ getLocale(gpmsUsersManagement,
									'User has been updated successfully.')
							+ "</p>");
				} else {
					csscody.info("<h2>"
							+ getLocale(gpmsUsersManagement,
									'Successful Message')
							+ "</h2><p>"
							+ getLocale(gpmsUsersManagement,
									'User has been saved successfully.')
							+ "</p>");
				}
				usersManage.ClearForm();
				$('#divUserForm').hide();
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

			case 8:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>' + "Failed to load user details." + '</p>');
				break;

			case 9:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement,
								"Failed to load departments list.") + '</p>');
				break;

			case 10:
				csscody
						.error('<h2>'
								+ getLocale(gpmsUsersManagement,
										"Error Message")
								+ '</h2><p>'
								+ getLocale(gpmsUsersManagement,
										"Failed to load position types list.")
								+ '</p>');
				break;

			case 11:
				csscody.error('<h2>'
						+ getLocale(gpmsUsersManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsUsersManagement,
								"Failed to load position titles list.")
						+ '</p>');
				break;

			case 12:
				csscody.error("<h2>"
						+ getLocale(gpmsUsersManagement, 'Error Message')
						+ "</h2><p>"
						+ getLocale(gpmsUsersManagement,
								'User cannot be deleted.') + "</p>");
				break;

			case 13:
				csscody
						.error("<h2>"
								+ getLocale(gpmsUsersManagement,
										'Error Message')
								+ "</h2><p>"
								+ getLocale(gpmsUsersManagement,
										'Selected user(s) cannot be deleted.')
								+ "</p>");
				break;

			case 14:
				csscody.error("<h2>"
						+ getLocale(gpmsUsersManagement, 'Error Message')
						+ "</h2><p>"
						+ getLocale(gpmsUsersManagement,
								'User cannot be activated.') + "</p>");
				break;

			case 15:
				csscody.error("<h2>"
						+ getLocale(gpmsUsersManagement, 'Error Message')
						+ "</h2><p>"
						+ getLocale(gpmsUsersManagement,
								'User cannot be deactivated.') + "</p>");
				break;

			case 16:
				csscody.error("<h2>"
						+ getLocale(gpmsUsersManagement, 'Error Message')
						+ "</h2><p>"
						+ getLocale(gpmsUsersManagement,
								'Cannot check for unique Username') + "</p>");
				break;

			case 17:
				csscody.error("<h2>"
						+ getLocale(gpmsUsersManagement, 'Error Message')
						+ "</h2><p>"
						+ getLocale(gpmsUsersManagement,
								'Cannot check for unique Email') + "</p>");
				break;

			case 18:
				if (editFlag > 0) {
					csscody.info("<h2>"
							+ getLocale(gpmsUsersManagement, 'Error Message')
							+ "</h2><p>"
							+ getLocale(gpmsUsersManagement,
									'Failed to update user!') + "</p>");
				} else {
					csscody.info("<h2>"
							+ getLocale(gpmsUsersManagement, 'Error Message')
							+ "</h2><p>"
							+ getLocale(gpmsUsersManagement,
									'Failed to save user!') + "</p>");
				}
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
			$('select[name="ddlCollege"]').on("change", function() {
				rowIndex = $(this).closest('tr').prevAll("tr").length;
				if ($(this).val() != "0") {
					usersManage.BindDepartmentDropDown($(this).val(), false);
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
					.on(
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
				usersManage.ClearForm();
				$('#auditLogTab').hide();
				$('#divUserGrid').hide();
				$('#divUserForm').show();
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
					usersManage.SaveUser("0", true);
				}
			});

			$('#txtUserName').blur(
					function() {
						var errors = '';
						var userName = $.trim($(this).val());
						var user_id = $('#btnSaveUser').prop("name");
						if (user_id == '') {
							user_id = "0";
						}
						if (!userName) {
							errors += getLocale(gpmsUsersManagement,
									"Please enter a username.");
						} else if (!usersManage.IsUniqueUserName(user_id,
								userName)) {
							errors += getLocale(gpmsUsersManagement,
									"Please enter unique username.")
									+ " '"
									+ userName.trim()
									+ "' "
									+ getLocale(gpmsUsersManagement,
											"already exists.");
						}

						if (errors) {
							$(this).addClass("error");
							$(this).next('.cssClassRight').hide();
							$(this).siblings('.cssClassError').html(errors);
							$(this).siblings('.cssClassError').show();
							return false;
						} else {
							$(this).removeClass("error");
							$(this).next('.cssClassRight').show();
							$(this).siblings('.cssClassError').hide();
							$(this).siblings('.cssClassError').html('');
						}
					});

			// $('#txtWorkEmail').blur(
			// function() {
			// var errors = '';
			// var email = $(this).val();
			// var user_id = $('#btnSaveUser').prop("name");
			// if (user_id == '') {
			// user_id = 0;
			// }
			//
			// if ($.trim(email) == "") {
			// errors += getLocale(gpmsUsersManagement,
			// "Please enter work email id.");
			// } else if (!usersManage.IsUniqueEmail(user_id, email)) {
			// errors += getLocale(gpmsUsersManagement,
			// "Please enter unique work email id.")
			// + " '"
			// + email.trim()
			// + "' "
			// + getLocale(gpmsUsersManagement,
			// "already exists.") + '<br/>';
			// }
			//
			// if (errors) {
			// $(this).next('.cssClassRight').hide();
			// $(this).siblings('.cssClassError').show();
			// $(this).siblings(".cssClassError").parent('div')
			// .addClass("diverror");
			// $(this).siblings('.cssClassError').prevAll(
			// "input:first").addClass("error");
			// $(this).siblings('.cssClassError').html(errors);
			// return false;
			// } else {
			// $(this).parent("td").find("span.error").hide();
			// $(this).next('.cssClassRight').show();
			// $(this).siblings('.cssClassError').hide();
			// $(this).siblings(".cssClassError").parent('div')
			// .removeClass("diverror");
			// $(this).siblings('.cssClassError').prevAll(
			// "input:first").removeClass("error");
			// }
			// });
			//
			// $('#txtPersonalEmail')
			// .blur(
			// function() {
			// var email = $(this).val();
			// if ($.trim(email) != "") {
			// var errors = '';
			// var user_id = $('#btnSaveUser')
			// .prop("name");
			// if (user_id == '') {
			// user_id = 0;
			// }
			//
			// if (!usersManage.IsUniqueEmail(user_id,
			// email)) {
			// errors += getLocale(
			// gpmsUsersManagement,
			// "Please enter unique personal email id.")
			// + " '"
			// + email.trim()
			// + "' "
			// + getLocale(
			// gpmsUsersManagement,
			// "already exists.")
			// + '<br/>';
			// }
			//
			// if (errors) {
			// $(this).next('.cssClassRight').hide();
			// $(this).siblings('.cssClassError')
			// .show();
			// $(this).siblings(".cssClassError")
			// .parent('div').addClass(
			// "diverror");
			// $(this).siblings('.cssClassError')
			// .prevAll("input:first")
			// .addClass("error");
			// $(this).siblings('.cssClassError')
			// .html(errors);
			// return false;
			// } else {
			// $(this).parent("td").find("span.error")
			// .hide();
			// $(this).next('.cssClassRight').show();
			// $(this).siblings('.cssClassError')
			// .hide();
			// $(this).siblings(".cssClassError")
			// .parent('div').removeClass(
			// "diverror");
			// $(this).siblings('.cssClassError')
			// .prevAll("input:first")
			// .removeClass("error");
			// }
			// }
			// });

			$(".delbutton").click(function() {
				// var user_id = $(this).prop("id").replace(/[^0-9]/gi, '');
				var user_id = $(this).prop("id");
				usersManage.DeleteUserById(user_id);
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
											"<div style='display: block'/>")
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
															"Delete ");
													$(this).prop("title",
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
									usersManage
											.BindDepartmentDropDown(
													$(
															'select[name="ddlCollege"] option:selected')
															.eq(rowIndex).val(),
													false);

									// $('#dataTable tr:last
									// td').fadeIn('slow');
								}
							});
			$("#btnSearchUser").bind("click", function() {
				usersManage.SearchUsers();
				return false;
			});

			$("#btnSearchUserAuditLog").bind("click", function() {
				usersManage.SearchUserAuditLogs();
				return false;
			});

			// propose username by combining first- and lastname
			$("#txtUserName").focus(function() {
				var firstname = $("#txtFirstName").val();
				var lastname = $("#txtLastName").val();
				if (firstname && lastname && !this.value) {
					this.value = firstname + "." + lastname;
				}
			});

			$("#txtOfficeNumber").mask("(999) 999-9999");
			$("#txtMobileNumber").mask("(999) 999-9999");
			$("#txtHomeNumber").mask("(999) 999-9999");
			$("#txtOtherNumber").mask("(999) 999-9999");
			$("#txtZip").mask("99999");

			$("#txtDOB").datepicker({
				dateFormat : 'yy-mm-dd',
				changeMonth : true,
				changeYear : true
			}).mask("9999-99-99", {
				placeholder : "yyyy-mm-dd"
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
					}).mask("9999-99-99", {
				placeholder : "yyyy-mm-dd"
			});
			$("#txtSearchActivityOnTo").datepicker({
				dateFormat : 'yy-mm-dd',
				changeMonth : true,
				changeYear : true
			}).mask("9999-99-99", {
				placeholder : "yyyy-mm-dd"
			});

			$(
					'#txtSearchUserName, #ddlSearchCollege, #ddlSearchDepartment, #ddlSearchPositionType, #ddlSearchPositionTitle, #ddlSearchIsActive')
					.keyup(function(event) {
						if (event.keyCode == 13) {
							$("#btnSearchUser").click();
						}
					});

			$(
					'#txtSearchAction, #txtSearchAuditedBy, #txtSearchActivityOnFrom, #txtSearchActivityOnTo')
					.keyup(function(event) {
						if (event.keyCode == 13) {
							$("#btnSearchUserAuditLog").click();
						}
					});

		}
	};
	usersManage.init();
});