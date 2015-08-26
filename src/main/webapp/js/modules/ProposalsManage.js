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
					"#gdvProposals_pagesize :selected").text() : 10;

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
											display : 'PI User',
											name : 'pi_user',
											cssclass : '',
											controlclass : '',
											coltype : 'label',
											align : 'left',
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
											arguments : '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22'
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

				break;
			default:
				break;
			}
		},

		FillForm : function(response) {
			// Investigator Information
			proposalsManage.BindInvestigatorInfo(response.investigatorInfo);

			// Peoject Information
			$("#lblProposalNo").text(response.proposalNo);
			$("#lblProposalDateReceived").text(response.dateReceived);
			$("#ddlProposalStatus").val(response.proposalStatus);

			$("#txtProjectTitle").val(response.projectInfo.projectTitle);

			if (response.projectInfo.projectType.isResearchBasic) {
				$("#ddlProjectType").val(1);
			} else if (response.projectInfo.projectType.isResearchApplied) {
				$("#ddlProjectType").val(2);
			} else if (response.projectInfo.projectType.isResearchDevelopment) {
				$("#ddlProjectType").val(3);
			} else if (response.projectInfo.projectType.isInstruction) {
				$("#ddlProjectType").val(4);
			} else if (response.projectInfo.projectType.isOtherSponsoredActivity) {
				$("#ddlProjectType").val(5);
			} else {
				$("#ddlProjectType").val(0);
			}

			if (response.projectInfo.typeOfRequest.isPreProposal) {
				$("#ddlTypeOfRequest").val(1);
			} else if (response.projectInfo.typeOfRequest.isNewProposal) {
				$("#ddlTypeOfRequest").val(2);
			} else if (response.projectInfo.typeOfRequest.isContinuation) {
				$("#ddlTypeOfRequest").val(3);
			} else if (response.projectInfo.typeOfRequest.isSupplement) {
				$("#ddlTypeOfRequest").val(4);
			} else {
				$("#ddlTypeOfRequest").val(0);
			}

			$("#txtDueDate").val(response.projectInfo.dueDate);

			if (response.projectInfo.projectLocation.offCampus) {
				$("#ddlLocationOfProject").val(1);
			} else if (response.projectInfo.projectLocation.onCampus) {
				$("#ddlLocationOfProject").val(2);
			} else {
				$("#ddlLocationOfProject").val(0);
			}

			$("#txtProjectPeriodFrom").val(
					response.projectInfo.projectPeriod.from);
			$("#txtProjectPeriodTo").val(response.projectInfo.projectPeriod.to);

			// Sponsor And Budget Information
			// for (var int = 0; int <
			// response.sponsorAndBudgetInfo.grantingAgency.length; int++) {
			// var array_element = array[int];
			//				
			// }
			$("#txtNameOfGrantingAgency").val(
					response.sponsorAndBudgetInfo.grantingAgency);
			$("#txtDirectCosts").val(response.sponsorAndBudgetInfo.directCosts);
			$("#txtFACosts").val(response.sponsorAndBudgetInfo.FACosts);
			$("#txtTotalCosts").val(response.sponsorAndBudgetInfo.totalCosts);
			$("#txtFARate").val(response.sponsorAndBudgetInfo.FARate);

			// Cost Share Information
			if (response.costShareInfo.institutionalCommitted) {
				$("#ddlInstitutionalCommitmentCost").val(1);
				$("#lblConfirmCommitment").show();
			} else if (!response.costShareInfo.institutionalCommitted) {
				$("#ddlInstitutionalCommitmentCost").val(2);
				$("#lblConfirmCommitment").hide();
			} else {
				$("#ddlInstitutionalCommitmentCost").val(0);
				$("#lblConfirmCommitment").hide();
			}

			if (response.costShareInfo.thirdPartyCommitted) {
				$("#ddlThirdPartyCommitmentCost").val(1);
			} else if (!response.costShareInfo.thirdPartyCommitted) {
				$("#ddlThirdPartyCommitmentCost").val(2);
			} else {
				$("#ddlThirdPartyCommitmentCost").val(0);
			}

			// University Commitments
			if (response.universityCommitments.newRenovatedFacilitiesRequired) {
				$("#ddlNewSpaceRequired").val(1);
			} else if (!response.costShareInfo.newRenovatedFacilitiesRequired) {
				$("#ddlNewSpaceRequired").val(2);
			} else {
				$("#ddlNewSpaceRequired").val(0);
			}

			if (response.universityCommitments.rentalSpaceRequired) {
				$("#ddlRentalSpaceRequired").val(1);
			} else if (!response.costShareInfo.rentalSpaceRequired) {
				$("#ddlRentalSpaceRequired").val(2);
			} else {
				$("#ddlRentalSpaceRequired").val(0);
			}

			if (response.universityCommitments.institutionalCommitmentRequired) {
				$("#ddlInstitutionalCommitmentsRequired").val(1);
				$("#lblCommitmentsRequired").show();
			} else if (!response.universityCommitments.institutionalCommitmentRequired) {
				$("#ddlInstitutionalCommitmentsRequired").val(2);
				$("#lblCommitmentsRequired").hide();
			} else {
				$("#ddlInstitutionalCommitmentsRequired").val(0);
				$("#lblCommitmentsRequired").hide();
			}

			// Conflict of Interest And Commitment Information
			if (response.conflicOfInterest.financialCOI) {
				$("#ddlFinancialCOI").val(1);
			} else if (!response.conflicOfInterest.financialCOI) {
				$("#ddlFinancialCOI").val(2);
			} else {
				$("#ddlFinancialCOI").val(0);
			}

			if (response.conflicOfInterest.conflictDisclosed) {
				$("#ddlDisclosedFinancialCOI").val(1);
				$("#lblDisclosureRequired").show();
			} else if (!response.conflicOfInterest.conflictDisclosed) {
				$("#ddlDisclosedFinancialCOI").val(2);
				$("#lblDisclosureRequired").hide();
			} else {
				$("#ddlDisclosedFinancialCOI").val(0);
				$("#lblDisclosureRequired").hide();
			}

			if (response.conflicOfInterest.disclosureFormChange) {
				$("#ddlMaterialChanged").val(1);
				$("#lblMaterialChanged").show();
			} else if (!response.conflicOfInterest.disclosureFormChange) {
				$("#ddlMaterialChanged").val(2);
				$("#lblMaterialChanged").hide();
			} else {
				$("#ddlMaterialChanged").val(0);
				$("#lblMaterialChanged").hide();
			}

			// Compliance Information
			if (response.complianceInfo.involveUseOfHumanSubjects) {
				$("#ddlUseHumanSubjects").val(1);
				$("#lblUseHumanSubjects").show();
				$("#tdHumanSubjectsOption").show();
				$("#tdIRBOption").show();
				if (response.complianceInfo.IRBPending) {
					$("#ddlIRBOptions").val(2);
					$("#tdIRBtxt").hide();
				} else if (!response.complianceInfo.IRBPending
						&& response.complianceInfo.IRB != "") {
					$("#ddlIRBOptions").val(1);
					$("#txtIRB").val(response.complianceInfo.IRB);
					$("#tdIRBtxt").show();
				}
			} else if (!response.complianceInfo.involveUseOfHumanSubjects) {
				$("#ddlUseHumanSubjects").val(2);
				$("#lblUseHumanSubjects").hide();
				$("#tdHumanSubjectsOption").hide();
				$("#tdIRBOption").hide();
				$("#tdIRBtxt").hide();
			} else {
				$("#ddlUseHumanSubjects").val(0);
				$("#lblUseHumanSubjects").hide();
				$("#tdHumanSubjectsOption").hide();
				$("#tdIRBOption").hide();
				$("#tdIRBtxt").hide();
			}

			if (response.complianceInfo.involveUseOfVertebrateAnimals) {
				$("#ddlUseVertebrateAnimals").val(1);
				$("#lblUseVertebrateAnimals").show();
				$("#tdVertebrateAnimalsOption").show();
				$("#tdIACUCOption").show();
				if (response.complianceInfo.IACUCPending) {
					$("#ddlIACUCOptions").val(2);
					$("#tdIACUCtxt").hide();
				} else if (!response.complianceInfo.IACUCPending
						&& response.complianceInfo.IACUC != "") {
					$("#ddlIACUCOptions").val(1);
					$("#txtIACUC").val(response.complianceInfo.IACUC);
					$("#tdIACUCtxt").show();
				}
			} else if (!response.complianceInfo.involveUseOfVertebrateAnimals) {
				$("#ddlUseVertebrateAnimals").val(2);
				$("#lblUseVertebrateAnimals").hide();
				$("#tdVertebrateAnimalsOption").hide();
				$("#tdIACUCOption").hide();
				$("#tdIACUCtxt").hide();
			} else {
				$("#ddlUseVertebrateAnimals").val(0);
				$("#lblUseVertebrateAnimals").hide();
				$("#tdVertebrateAnimalsOption").hide();
				$("#tdIACUCOption").hide();
				$("#tdIACUCtxt").hide();
			}

			if (response.complianceInfo.involveBiosafetyConcerns) {
				$("#ddlInvovleBioSafety").val(1);
				$("#lblHasBiosafetyConcerns").show();
				$("#tdBiosafetyOption").show();
				$("#tdIBCOption").show();
				if (response.complianceInfo.IBCPending) {
					$("#ddlIBCOptions").val(2);
					$("#tdIBCtxt").hide();
				} else if (!response.complianceInfo.IBCPending
						&& response.complianceInfo.IBC != "") {
					$("#ddlIBCOptions").val(1);
					$("#txtIBC").val(response.complianceInfo.IBC);
					$("#tdIBCtxt").show();
				}
			} else if (!response.complianceInfo.involveBiosafetyConcerns) {
				$("#ddlInvovleBioSafety").val(2);
				$("#lblHasBiosafetyConcerns").hide();
				$("#tdBiosafetyOption").hide();
				$("#tdIBCOption").hide();
				$("#tdIBCtxt").hide();
			} else {
				$("#ddlInvovleBioSafety").val(0);
				$("#lblHasBiosafetyConcerns").hide();
				$("#tdBiosafetyOption").hide();
				$("#tdIBCOption").hide();
				$("#tdIBCtxt").hide();
			}

			if (response.complianceInfo.involveEnvironmentalHealthAndSafetyConcerns) {
				$("#ddlEnvironmentalConcerns").val(1);
			} else if (!response.complianceInfo.involveEnvironmentalHealthAndSafetyConcerns) {
				$("#ddlEnvironmentalConcerns").val(2);
			} else {
				$("#ddlEnvironmentalConcerns").val(0);
			}

			// Additional Information
			if (response.additionalInfo.anticipatesForeignNationalsPayment) {
				$("#ddlAnticipateForeignNationals").val(1);
			} else if (!response.additionalInfo.anticipatesForeignNationalsPayment) {
				$("#ddlAnticipateForeignNationals").val(2);
			} else {
				$("#ddlAnticipateForeignNationals").val(0);
			}

			if (response.additionalInfo.anticipatesCourseReleaseTime) {
				$("#ddlAnticipateReleaseTime").val(1);
			} else if (!response.additionalInfo.anticipatesCourseReleaseTime) {
				$("#ddlAnticipateReleaseTime").val(2);
			} else {
				$("#ddlAnticipateReleaseTime").val(0);
			}

			if (response.additionalInfo.relatedToCenterForAdvancedEnergyStudies) {
				$("#ddlRelatedToEnergyStudies").val(1);
			} else if (!response.additionalInfo.relatedToCenterForAdvancedEnergyStudies) {
				$("#ddlRelatedToEnergyStudies").val(2);
			} else {
				$("#ddlRelatedToEnergyStudies").val(0);
			}

			// Collaboration Information
			if (response.collaborationInfo.involveNonFundedCollab) {
				$("#ddlInvolveNonFundedCollabs").val(1);
				$("#lblInvolveNonFundedCollabs").show();
				$("#trInvolveNonFundedCollabs").show();
				$("#txtCollaborators").val(
						response.collaborationInfo.involvedCollaborators);

			} else if (!response.collaborationInfo.involveNonFundedCollab) {
				$("#ddlInvolveNonFundedCollabs").val(2);
				$("#lblInvolveNonFundedCollabs").hide();
				$("#trInvolveNonFundedCollabs").hide();
				$("#txtCollaborators").val('');
			} else {
				$("#ddlInvolveNonFundedCollabs").val(0);
				$("#lblInvolveNonFundedCollabs").hide();
				$("#trInvolveNonFundedCollabs").hide();
				$("#txtCollaborators").val('');
			}

			// Collaboration Information
			if (response.confidentialInfo.containConfidentialInformation) {
				$("#ddlProprietaryInformation").val(1);
				$("#txtPagesWithProprietaryInfo").val(
						response.confidentialInfo.onPages);
				$("#txtPagesWithProprietaryInfo").show();
				$("#trTypeOfProprietaryInfo").show();
				$("#chkPatentable").prop("checked",
						response.confidentialInfo.patentable);
				$("#chkCopyrightable").prop("checked",
						response.confidentialInfo.copyrightable);
			} else if (!response.confidentialInfo.containConfidentialInformation) {
				$("#ddlProprietaryInformation").val(2);
				$("#txtPagesWithProprietaryInfo").hide();
				$("#trTypeOfProprietaryInfo").hide();
				$("#txtPagesWithProprietaryInfo").val('');
			} else {
				$("#ddlProprietaryInformation").val(0);
				$("#txtPagesWithProprietaryInfo").hide();
				$("#txtPagesWithProprietaryInfo").hide();
				$("#txtPagesWithProprietaryInfo").val('');
			}

			if (response.confidentialInfo.involveIntellectualProperty) {
				$("#ddlOwnIntellectualProperty").val(1);
			} else if (!response.confidentialInfo.involveIntellectualProperty) {
				$("#ddlOwnIntellectualProperty").val(2);
			} else {
				$("#ddlOwnIntellectualProperty").val(0);
			}

			// OSP Section
			$("#txtAgencyList").val(response.oSPSectionInfo.listAgency);

			$("#chkFederal").prop("checked",
					response.oSPSectionInfo.fundingSource.federal);
			$("#chkFederalFlowThrough").prop("checked",
					response.oSPSectionInfo.fundingSource.federalFlowThrough);
			$("#chkStateOfIdahoEntity").prop("checked",
					response.oSPSectionInfo.fundingSource.sateOfIdahoEntity);
			$("#chkPrivateForProfit").prop("checked",
					response.oSPSectionInfo.fundingSource.privateForProfit);
			$("#chkNonProfitOrganization")
					.prop(
							"checked",
							response.oSPSectionInfo.fundingSource.nonProfitOrganization);
			$("#chkNonIdahoStateEntity").prop("checked",
					response.oSPSectionInfo.fundingSource.nonIdahoStateEntity);
			$("#chkCollegeUniversity").prop("checked",
					response.oSPSectionInfo.fundingSource.collegeOrUniversity);
			$("#chkLocalEntity").prop("checked",
					response.oSPSectionInfo.fundingSource.localEntity);
			$("#chkNonIdahoLocalEntity").prop("checked",
					response.oSPSectionInfo.fundingSource.nonIdahoLocalEntity);
			$("#chkTribalGovernment").prop("checked",
					response.oSPSectionInfo.fundingSource.tirbalGovernment);
			$("#chkForeign").prop("checked",
					response.oSPSectionInfo.fundingSource.foreign);

			$("#txtCFDANo").val(response.oSPSectionInfo.CFDANo);
			$("#txtProgramNo").val(response.oSPSectionInfo.programNo);
			$("#txtProgramTitle").val(response.oSPSectionInfo.programTitle);

			$("#chkFullRecovery").prop("checked",
					response.oSPSectionInfo.recovery.fullRecovery);
			$("#chkNoRecoveryNormal")
					.prop(
							"checked",
							response.oSPSectionInfo.recovery.noRecoveryNormalSponsorPolicy);
			$("#chkNoRecoveryInstitutional")
					.prop(
							"checked",
							response.oSPSectionInfo.recovery.noRecoveryInstitutionalWaiver);
			$("#chkLimitedRecoveryNormal")
					.prop(
							"checked",
							response.oSPSectionInfo.recovery.limitedRecoveryNormalSponsorPolicy);
			$("#chkLimitedRecoveryInstitutional")
					.prop(
							"checked",
							response.oSPSectionInfo.recovery.limitedRecoveryInstitutionalWaiver);

			$("#chkMTDC").prop("checked", response.oSPSectionInfo.base.MTDC);
			$("#chkTDC").prop("checked", response.oSPSectionInfo.base.TDC);
			$("#chkTC").prop("checked", response.oSPSectionInfo.base.TC);
			$("#chkOther").prop("checked", response.oSPSectionInfo.base.other);
			$("#chkNA").prop("checked",
					response.oSPSectionInfo.base.notApplicable);

			if (response.oSPSectionInfo.isPISalaryIncluded) {
				$("#ddlPISalaryIncluded").val(1);
				$("#lblPISalaryIncluded").hide();
			} else if (!response.oSPSectionInfo.isPISalaryIncluded) {
				$("#ddlPISalaryIncluded").val(2);
				$("#lblPISalaryIncluded").show();
			} else {
				$("#ddlPISalaryIncluded").val(0);
				$("#lblPISalaryIncluded").hide();
			}

			$("#txtPISalary").val(response.oSPSectionInfo.PISalary);
			$("#txtPIFringe").val(response.oSPSectionInfo.PIFringe);
			$("#txtDepartmentID").val(response.oSPSectionInfo.departmentId);

			if (response.oSPSectionInfo.institutionalCostDocumented.yes) {
				$("#ddlInstitutionalCostDocumented").val(1);
			} else if (response.oSPSectionInfo.institutionalCostDocumented.no) {
				$("#ddlInstitutionalCostDocumented").val(2);
			} else if (response.oSPSectionInfo.institutionalCostDocumented.notApplicable) {
				$("#ddlInstitutionalCostDocumented").val(3);
			} else {
				$("#ddlInstitutionalCostDocumented").val(0);
			}

			if (response.oSPSectionInfo.thirdPartyCostDocumented.yes) {
				$("#ddlThirdPartyCostDocumented").val(1);
			} else if (response.oSPSectionInfo.thirdPartyCostDocumented.no) {
				$("#ddlThirdPartyCostDocumented").val(2);
			} else if (response.oSPSectionInfo.thirdPartyCostDocumented.notApplicable) {
				$("#ddlThirdPartyCostDocumented").val(3);
			} else {
				$("#ddlThirdPartyCostDocumented").val(0);
			}

			if (response.oSPSectionInfo.isAnticipatedSubRecipients) {
				$("#ddlSubrecipients").val(1);
				$("#txtNamesSubrecipients").val(
						response.oSPSectionInfo.anticipatedSubRecipientsNames);
				$("#trSubrecipientsNames").show();
			} else if (!response.oSPSectionInfo.isAnticipatedSubRecipients) {
				$("#ddlSubrecipients").val(2);
				$("#trSubrecipientsNames").hide();
				$("#txtNamesSubrecipients").val('');
			} else {
				$("#ddlSubrecipients").val(0);
				$("#trSubrecipientsNames").hide();
				$("#txtNamesSubrecipients").val('');
			}

			if (response.oSPSectionInfo.PIEligibilityWaiver.yes) {
				$("#ddlPIEligibilityWaiver").val(1);
			} else if (response.oSPSectionInfo.PIEligibilityWaiver.no) {
				$("#ddlPIEligibilityWaiver").val(2);
			} else if (response.oSPSectionInfo.PIEligibilityWaiver.notApplicable) {
				$("#ddlPIEligibilityWaiver").val(3);
			} else if (response.oSPSectionInfo.PIEligibilityWaiver.thisProposalOnly) {
				$("#ddlPIEligibilityWaiver").val(4);
			} else if (response.oSPSectionInfo.PIEligibilityWaiver.blanket) {
				$("#ddlPIEligibilityWaiver").val(5);
			} else {
				$("#ddlPIEligibilityWaiver").val(0);
			}

			if (response.oSPSectionInfo.conflictOfInterestForms.yes) {
				$("#ddlCOIForms").val(1);
			} else if (response.oSPSectionInfo.conflictOfInterestForms.no) {
				$("#ddlCOIForms").val(2);
			} else if (response.oSPSectionInfo.conflictOfInterestForms.notApplicable) {
				$("#ddlCOIForms").val(3);
			} else {
				$("#ddlCOIForms").val(0);
			}

			if (response.oSPSectionInfo.excludedPartyListChecked.yes) {
				$("#ddlCheckedExcludedPartyList").val(1);
			} else if (response.oSPSectionInfo.excludedPartyListChecked.no) {
				$("#ddlCheckedExcludedPartyList").val(2);
			} else if (response.oSPSectionInfo.excludedPartyListChecked.notApplicable) {
				$("#ddlCheckedExcludedPartyList").val(3);
			} else {
				$("#ddlCheckedExcludedPartyList").val(0);
			}

			$("#txtProposalNotes").val(response.oSPSectionInfo.proposalNotes);

			$("#chkDF").prop("checked",
					response.oSPSectionInfo.researchAdministrator.DF);
			$("#chkLG").prop("checked",
					response.oSPSectionInfo.researchAdministrator.LG);
			$("#chkLN").prop("checked",
					response.oSPSectionInfo.researchAdministrator.LN);

			// Certification/ Signatures Info
			// Delegation Info

		},

		BindInvestigatorInfo : function(investigatorInfo) {
			rowIndex = 0;
			proposalsManage
					.BindUserToPositionDetails(investigatorInfo.pi, "PI");

			$.each(investigatorInfo.co_pi, function(i, coPI) {
				proposalsManage.BindUserToPositionDetails(coPI, "Co-PI");
			});

			$.each(investigatorInfo.seniorPersonnel, function(j, senior) {
				proposalsManage.BindUserToPositionDetails(senior, "Senior");
			});

			$('#dataTable>tbody tr:first').remove();

		},

		BindUserToPositionDetails : function(userDetails, userType) {
			var cloneRow = $('#dataTable tbody>tr:first').clone(true);
			$(cloneRow).appendTo("#dataTable");

			rowIndex += 1;
			var btnOption = "[+] Add";
			var btnName = "AddMore";
			if (rowIndex > 1) {
				btnOption = "Delete";
				var btnName = "DeleteOption";
			}

			$('#dataTable tbody>tr:eq(' + rowIndex + ')').find("select").each(
					function(k) {
						if (this.name == "ddlRole") {
							if (userType == "PI") {
								$(this).val(0).prop('selected', 'selected');
								$(this).prop('disabled', 'disabled');
							} else if (userType == "Co-PI") {
								$(this).val(1).prop('selected', 'selected');
								$(this).removeAttr('disabled');
							} else if (userType == "Senior") {
								$(this).val(2).prop('selected', 'selected');
								$(this).removeAttr('disabled');
							}
						} else if (this.name == "ddlName") {
							$(this).val(userDetails.userProfileId).prop(
									'selected', 'selected');

							if (userType == "PI") {
								$(this).prop('disabled', 'disabled');
							} else if (userType == "Co-PI") {
								$(this).removeAttr('disabled');
							} else if (userType == "Senior") {
								$(this).removeAttr('disabled');
							}

							proposalsManage.BindUserMobileNo($(
									'select[name="ddlName"]').eq(rowIndex)
									.val());
							proposalsManage.BindCollegeDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val());
						} else if (this.name == "ddlCollege") {
							$(this).val(userDetails.college).prop('selected',
									'selected');
							proposalsManage.BindDepartmentDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val(), $('select[name="ddlCollege"]').eq(
									rowIndex).val());
						} else if (this.name == "ddlDepartment") {
							$(this).val(userDetails.department).prop(
									'selected', 'selected');
							proposalsManage.BindPositionTypeDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val(), $('select[name="ddlCollege"]').eq(
									rowIndex).val(), $(
									'select[name="ddlDepartment"]')
									.eq(rowIndex).val());
						} else if (this.name == "ddlPositionType") {
							$(this).val(userDetails.positionType).prop(
									'selected', 'selected');
							proposalsManage.BindPositionTitleDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val(), $('select[name="ddlCollege"]').eq(
									rowIndex).val(), $(
									'select[name="ddlDepartment"]')
									.eq(rowIndex).val(), $(
									'select[name="ddlPositionType"]').eq(
									rowIndex).val());
						} else if (this.name == "ddlPositionTitle") {
							$(this).val(userDetails.positionTitle).prop(
									'selected', 'selected');
						}
					});

			$('#dataTable tbody>tr:eq(' + rowIndex + ')').find("input").each(
					function(l) {
						if ($(this).hasClass("AddOption")) {
							$(this).prop("name", btnName);
							$(this).prop("value", btnOption);
						}
					});
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
					validateErrorMessage += 'Please enter Project Title.';
				} else if (!proposalsManage.isUniqueProjectTitle(_proposalId,
						newUserName)) {
					validateErrorMessage += "'"
							+ getLocale(gpmsProposalsManagement,
									"Please enter unique Project Title.")
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
				userId : userId
			});
			this.config.ajaxCallMode = 6000;
			this.ajaxCall(this.config);
			return false;
		},

		BindUserMobileNo : function(userId) {
			this.config.url = this.config.rootURL + "users/"
					+ "GetMobileNoForAUser";
			this.config.data = JSON2.stringify({
				userId : userId
			});
			this.config.ajaxCallMode = 6;
			this.ajaxCall(this.config);
			return false;
		},

		BindCollegeDropDown : function(userId) {
			this.config.url = this.config.rootURL + "users/"
					+ "GetCollegesForAUser";
			this.config.data = JSON2.stringify({
				userId : userId
			});
			this.config.ajaxCallMode = 7;
			this.ajaxCall(this.config);
			return false;
		},

		BindDepartmentDropDown : function(userId, collegeName) {
			this.config.url = this.config.rootURL + "users/"
					+ "GetDepartmentsForAUser";
			this.config.data = JSON2.stringify({
				userId : userId,
				college : collegeName
			});
			this.config.ajaxCallMode = 8;
			this.ajaxCall(this.config);
			return false;
		},

		BindPositionTypeDropDown : function(userId, collegeName, departmentName) {
			this.config.url = this.config.rootURL + "users/"
					+ "GetPositionTypeForAUser";
			this.config.data = JSON2.stringify({
				userId : userId,
				college : collegeName,
				department : departmentName
			});
			this.config.ajaxCallMode = 9;
			this.ajaxCall(this.config);
			return false;
		},

		BindPositionTitleDropDown : function(userId, collegeName,
				departmentName, positionTypeName) {
			this.config.url = this.config.rootURL + "users/"
					+ "GetPositionTitleForAUser";
			this.config.data = JSON2.stringify({
				userId : userId,
				college : collegeName,
				department : departmentName,
				positionType : positionTypeName
			});
			this.config.ajaxCallMode = 10;
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

		case 4:// For Proposal Edit Action
			proposalsManage.FillForm(msg);
			$('#divProposalGrid').hide();
			$('#divProposalForm').show();
			break;

		case 5: // Bind User List for Investigator Info
			$('select[name="ddlName"]').get(rowIndex).options.length = 0;
			$('select[name="ddlCollege"]').get(rowIndex).options.length = 0;
			$('select[name="ddlDepartment"]').get(rowIndex).options.length = 0;
			$('select[name="ddlPositionType"]').get(rowIndex).options.length = 0;
			$('select[name="ddlPositionTitle"]').get(rowIndex).options.length = 0;
			$('input[name="txtPhoneNo"]').eq(rowIndex).val('');
			$
					.each(
							msg,
							function(index, item) {
								$('select[name="ddlName"]').get(rowIndex).options[$(
										'select[name="ddlName"]').get(rowIndex).options.length] = new Option(
										item, index);
							});
			break;

		case 6: // Bind User Mobile No
			$('input[name="txtPhoneNo"]').eq(rowIndex).val('');
			$('input[name="txtPhoneNo"]').eq(rowIndex).val(msg);
			break;

		case 7:// Bind User Colleges
			$('select[name="ddlCollege"]').get(rowIndex).options.length = 0;
			$('select[name="ddlDepartment"]').get(rowIndex).options.length = 0;
			$('select[name="ddlPositionType"]').get(rowIndex).options.length = 0;
			$('select[name="ddlPositionTitle"]').get(rowIndex).options.length = 0;

			$
					.each(
							msg,
							function(index, item) {
								$('select[name="ddlCollege"]').get(rowIndex).options[$(
										'select[name="ddlCollege"]').get(
										rowIndex).options.length] = new Option(
										item, item);
							});
			break;

		case 8:// Bind User Departments
			$('select[name="ddlDepartment"]').get(rowIndex).options.length = 0;
			$('select[name="ddlPositionType"]').get(rowIndex).options.length = 0;
			$('select[name="ddlPositionTitle"]').get(rowIndex).options.length = 0;

			$
					.each(
							msg,
							function(index, item) {
								$('select[name="ddlDepartment"]').get(rowIndex).options[$(
										'select[name="ddlDepartment"]').get(
										rowIndex).options.length] = new Option(
										item, item);
							});
			break;

		case 9:// Bind User Postition Types
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

		case 10:// Bind User Postition Titles
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
								"Failed to load Proposal Status.") + '</p>');
				break;
			case 2:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to delete the proposal.") + '</p>');
				break;
			case 3:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to delete multiple proposals.")
						+ '</p>');
				break;
			case 4:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>' + "Failed to load proposal details."
						+ '</p>');
				break;
			case 5:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load user list.") + '</p>');
				break;
			case 6:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load user's Mobile No.") + '</p>');
				break;
			case 7:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load user's colleges list.")
						+ '</p>');
				break;

			case 8:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load user's departments list.")
						+ '</p>');
				break;

			case 9:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load user's position types list.")
						+ '</p>');
				break;

			case 10:
				csscody.error('<h2>'
						+ getLocale(gpmsProposalsManagement, "Error Message")
						+ '</h2><p>'
						+ getLocale(gpmsProposalsManagement,
								"Failed to load user's position titles list.")
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

			// For Filling Form
			$("#txtDueDate").datepicker({
				dateFormat : 'yy-mm-dd',
				changeMonth : true,
				changeYear : true
			});

			$("#txtProjectPeriodFrom").datepicker(
					{
						dateFormat : 'yy-mm-dd',
						changeMonth : true,
						changeYear : true,
						onSelect : function(selectedDate) {
							$("#txtProjectPeriodTo").datepicker("option",
									"minDate", selectedDate);
						}
					});
			$("#txtProjectPeriodTo").datepicker({
				dateFormat : 'yy-mm-dd',
				changeMonth : true,
				changeYear : true
			});

			proposalsManage.BindProposalStatus();

			proposalsManage.BindUserDropDown();

			// Form Position details Drop downs
			$('select[name="ddlName"]').on(
					"change",
					function() {
						rowIndex = $(this).closest('tr').prevAll("tr").length;
						if ($(this).val() != "0") {
							proposalsManage.BindUserMobileNo($(
									'select[name="ddlName"]').eq(rowIndex)
									.val());
							proposalsManage.BindCollegeDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val());

							proposalsManage.BindDepartmentDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val(), $('select[name="ddlCollege"]').eq(
									rowIndex).val());
							proposalsManage.BindPositionTypeDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val(), $('select[name="ddlCollege"]').eq(
									rowIndex).val(), $(
									'select[name="ddlDepartment"]')
									.eq(rowIndex).val());
							proposalsManage.BindPositionTitleDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val(), $('select[name="ddlCollege"]').eq(
									rowIndex).val(), $(
									'select[name="ddlDepartment"]')
									.eq(rowIndex).val(), $(
									'select[name="ddlPositionType"]').eq(
									rowIndex).val());
							// TODO:
							// 1. bind College by userID all positiondetails
							// 2. select the college based on user data
							// 3. bind Department
							// 4. select the college based on user data
							// 5. bind positiontype
							// 6. select the college based on user data
							// 7. bind positiontitle
							// 8. select the positiontitle based on user data

						} else {
							$(this).find('option:gt(0)').remove();
						}
					});

			$('select[name="ddlCollege"]').on(
					"change",
					function() {
						rowIndex = $(this).closest('tr').prevAll("tr").length;
						if ($(this).val() != "0") {
							proposalsManage.BindDepartmentDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val(), $(this).val());
							proposalsManage.BindPositionTypeDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val(), $(this).val(), $(
									'select[name="ddlDepartment"]')
									.eq(rowIndex).val());
							proposalsManage.BindPositionTitleDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val(), $(this).val(), $(
									'select[name="ddlDepartment"]')
									.eq(rowIndex).val(), $(
									'select[name="ddlPositionType"]').eq(
									rowIndex).val());
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
											'select[name="ddlName"]').eq(
											rowIndex).val(), $(
											'select[name="ddlCollege"]').eq(
											rowIndex).val(), $(this).val());
									proposalsManage.BindPositionTitleDropDown(
											$('select[name="ddlName"]').eq(
													rowIndex).val(),
											$('select[name="ddlCollege"]').eq(
													rowIndex).val(), $(this)
													.val(),
											$('select[name="ddlPositionType"]')
													.eq(rowIndex).val());
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
											$('select[name="ddlName"]').eq(
													rowIndex).val(),
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
				proposalsManage.ClearForm();
				$('#divProposalGrid').hide();
				$('#divProposalForm').show();
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

			$("input[type=button].AddOption").on(
					"click",
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
							$(cloneRow).find("select").each(function(j) {
								// Remove PI option after first row
								if (j == 0) {
									$(this).find('option:first').remove();
								}

								$(this).removeAttr("disabled");
								$(this).find("option").removeAttr("selected");
							});
							$(cloneRow).appendTo("#dataTable").hide().fadeIn(
									1200);

							rowIndex = $('#dataTable > tbody tr').size() - 1;

							proposalsManage.BindUserMobileNo($(
									'select[name="ddlName"]').eq(rowIndex)
									.val());
							proposalsManage.BindCollegeDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val());
							proposalsManage.BindDepartmentDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val(), $('select[name="ddlCollege"]').eq(
									rowIndex).val());
							proposalsManage.BindPositionTypeDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val(), $('select[name="ddlCollege"]').eq(
									rowIndex).val(), $(
									'select[name="ddlDepartment"]')
									.eq(rowIndex).val());
							proposalsManage.BindPositionTitleDropDown($(
									'select[name="ddlName"]').eq(rowIndex)
									.val(), $('select[name="ddlCollege"]').eq(
									rowIndex).val(), $(
									'select[name="ddlDepartment"]')
									.eq(rowIndex).val(), $(
									'select[name="ddlPositionType"]').eq(
									rowIndex).val());
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

			$("#ddlInstitutionalCommitmentCost").on("change", function() {
				if ($("#ddlInstitutionalCommitmentCost").val() == "1") {
					$("#lblConfirmCommitment").show();
				} else {
					$("#lblConfirmCommitment").hide();
				}
			});

			$("#ddlInstitutionalCommitmentsRequired").on("change", function() {
				if ($("#ddlInstitutionalCommitmentsRequired").val() == "1") {
					$("#lblCommitmentsRequired").show();
				} else {
					$("#lblCommitmentsRequired").hide();
				}
			});

			$("#ddlDisclosedFinancialCOI").on("change", function() {
				if ($("#ddlDisclosedFinancialCOI").val() == "1") {
					$("#lblDisclosureRequired").show();
				} else {
					$("#lblDisclosureRequired").hide();
				}
			});

			$("#ddlMaterialChanged").on("change", function() {
				if ($("#ddlMaterialChanged").val() == "1") {
					$("#lblMaterialChanged").show();
				} else {
					$("#lblMaterialChanged").hide();
				}
			});

			$("#ddlUseHumanSubjects").on("change", function() {
				if ($("#ddlUseHumanSubjects").val() == "1") {
					$("#lblUseHumanSubjects").show();
					// $("#ddlIRBOptions").val(0);
					$("#tdHumanSubjectsOption").show();
					$("#tdIRBOption").show();
					if ($("#ddlIRBOptions").val() == "1") {
						// $("#txtIRB").val('');
						$("#tdIRBtxt").show();
					} else {
						// $("#txtIRB").val('');
						$("#tdIRBtxt").hide();
					}
				} else {
					$("#lblUseHumanSubjects").hide();
					// $("#ddlIRBOptions").val(0);
					$("#tdHumanSubjectsOption").hide();
					$("#tdIRBOption").hide();
					$("#tdIRBtxt").hide();
				}
			});

			$("#ddlIRBOptions").on("change", function() {
				if ($("#ddlIRBOptions").val() == "1") {
					// $("#txtIRB").val('');
					$("#tdIRBtxt").show();
				} else {
					// $("#txtIRB").val('');
					$("#tdIRBtxt").hide();
				}
			});

			$("#ddlUseVertebrateAnimals").on("change", function() {
				if ($("#ddlUseVertebrateAnimals").val() == "1") {
					$("#lblUseVertebrateAnimals").show();
					// $("#ddlIACUCOptions").val(0);
					$("#tdVertebrateAnimalsOption").show();
					$("#tdIACUCOption").show();
					if ($("#ddlIACUCOptions").val() == "1") {
						// $("#txtIACUC").val('');
						$("#tdIACUCtxt").show();
					} else {
						// $("#txtIACUC").val('');
						$("#tdIACUCtxt").hide();
					}
				} else {
					$("#lblUseVertebrateAnimals").hide();
					// $("#ddlIACUCOptions").val(0);
					$("#tdVertebrateAnimalsOption").hide();
					$("#tdIACUCOption").hide();
					$("#tdIACUCtxt").hide();
				}
			});

			$("#ddlIACUCOptions").on("change", function() {
				if ($("#ddlIACUCOptions").val() == "1") {
					// $("#txtIACUC").val('');
					$("#tdIACUCtxt").show();
				} else {
					// $("#txtIACUC").val('');
					$("#tdIACUCtxt").hide();
				}
			});

			$("#ddlInvovleBioSafety").on("change", function() {
				if ($("#ddlInvovleBioSafety").val() == "1") {
					$("#lblHasBiosafetyConcerns").show();
					// $("#ddlIBCOptions").val(0);
					$("#tdBiosafetyOption").show();
					$("#tdIBCOption").show();
					if ($("#ddlIBCOptions").val() == "1") {
						// $("#txtIBC").val('');
						$("#tdIBCtxt").show();
					} else {
						// $("#txtIBC").val('');
						$("#tdIBCtxt").hide();
					}
				} else {
					$("#lblHasBiosafetyConcerns").hide();
					// $("#ddlIBCOptions").val(0);
					$("#tdBiosafetyOption").hide();
					$("#tdIBCOption").hide();
					$("#tdIBCtxt").hide();
				}
			});

			$("#ddlIBCOptions").on("change", function() {
				if ($("#ddlIBCOptions").val() == "1") {
					// $("#txtIBC").val('');
					$("#tdIBCtxt").show();
				} else {
					// $("#txtIBC").val('');
					$("#tdIBCtxt").hide();
				}
			});

			$("#ddlInvolveNonFundedCollabs").on("change", function() {
				if ($("#ddlInvolveNonFundedCollabs").val() == "1") {
					$("#lblInvolveNonFundedCollabs").show();
					$("#trInvolveNonFundedCollabs").show();
				} else {
					$("#lblInvolveNonFundedCollabs").hide();
					$("#trInvolveNonFundedCollabs").hide();
				}
			});

			$("#ddlProprietaryInformation").on("change", function() {
				if ($("#ddlProprietaryInformation").val() == "1") {
					$("#txtPagesWithProprietaryInfo").show();
					$("#trTypeOfProprietaryInfo").show();
				} else {
					$("#txtPagesWithProprietaryInfo").hide();
					$("#trTypeOfProprietaryInfo").hide();
				}
			});

			$("#ddlPISalaryIncluded").on("change", function() {
				if ($("#ddlPISalaryIncluded").val() == "2") {
					$("#lblPISalaryIncluded").show();
				} else {
					$("#lblPISalaryIncluded").hide();
				}
			});

			$("#ddlSubrecipients").on("change", function() {
				if ($("#ddlSubrecipients").val() == "1") {
					$("#trSubrecipientsNames").show();
				} else {
					$("#trSubrecipientsNames").hide();
				}
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