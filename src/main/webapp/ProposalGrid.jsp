<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"> -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta content="Manage Users" name="DESCRIPTION">
<meta content="Manage Users" name="KEYWORDS">
<meta content="@GPMS" name="COPYRIGHT">
<meta content="GENERATOR" name="GENERATOR">
<meta content="Author" name="AUTHOR">
<meta content="DOCUMENT" name="RESOURCE-TYPE">
<meta content="GLOBAL" name="DISTRIBUTION">
<meta content="INDEX, FOLLOW" name="ROBOTS">
<meta content="1 DAYS" name="REVISIT-AFTER">
<meta content="GENERAL" name="RATING">
<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE">
<!-- Mimic Internet Explorer 7 -->
<meta content="IE=EmulateIE7" http-equiv="X-UA-Compatible">
<meta content="RevealTrans(Duration=0,Transition=1)"
	http-equiv="PAGE-ENTER">
<link type="icon shortcut" media="icon" href="favicon.ico">
<!--[if IE 9]>
        <link rel="stylesheet" href="css/ie9.css" type="text/css" media="screen"/><![endif]-->
<!--[if lt IE 9]>
        <link rel="stylesheet" href="css/IE.css" type="text/css" media="screen"/><![endif]-->
<!--[if lt IE 7]>
        <script type="text/javascript" src="js/core/IE8.js"></script>
    <![endif]-->
<title>Proposal Management</title>

<script src="js/jQuery/jquery-1.11.3.min.js" type="text/javascript"></script>

<script type="text/javascript">
	var _aspx_token = "NWExODgyNDctMzA2OS00MWNhLWJjOWEtNGEyODI5N2FiZWJjOlNhZ2VGcmFtZS5BVVRIanhyMzB3eWNqenZwcWQwanYzdmt5Yng0WkFESlg5U0xPQzE6MjAxNTA2MzAxNTA2NTg5NDM5";
	$.ajaxSetup({
		'beforeSend' : function(xhr) {
			xhr.setRequestHeader("ASPX-TOKEN", _aspx_token);
		}
	});
</script>

<script type="text/javascript">
	//<![CDATA[
	var gpmsAppPath = "";
	var gpmsUserName = "superuser";
	var gpmsCurrentCulture = "en-US";
	var gpmsHostURL = "http://localhost:8181/GPMS/";
	var gpmsSecureToken = "GPMS.AUTHjxr30wycjzvpqd0jv3vkybx4ZADJX9SLOC1";

	var gpmsServicePath = "REST/";
	var gpmsRootPath = "http://localhost:8181/GPMS/";
	var userProfileId = "55de0dbcaf6e042068dfea74";
	var sessionCode = "jxr30wycjzvpqd0jv3vkybx4";
	var clientIPAddress = "::1";
	var gpmsCountryName = "RESERVED";
	var gpmsRedirectPath = "/";

	var logInURL = "login";
	var pageExtension = ".jsp";
	//]]>
</script>

<script type="text/javascript"
	src="js/jquery-ui-1.8.14.custom/js/jquery-ui-1.10.3.custom.min.js"></script>

<script type="text/javascript" src="js/core/gpmscore.js"></script>

<!-- For Side Bar Navigation -->
<script type="text/javascript" src="js/core/dashboard.js"></script>
<script type="text/javascript" src="js/sidebar_accordian.js"></script>
<script type="text/javascript" src="js/superfish.js"></script>

<script type="text/javascript"
	src="js/FormValidation/jquery.form-validation-and-hints.js"></script>

<!-- <script type="text/javascript" src="js/SystemLocale/systemlocale.js"></script> -->
<script type="text/javascript"
	src="js/modules/Language/CoreJsLanguage.js"></script>

<script type="text/javascript" src="js/core/json2.js"></script>

<script type="text/javascript" src="js/jquery-browser.js"></script>
<script type="text/javascript" src="js/jquery.uniform.js"></script>

<script type="text/javascript" src="js/jquery.qtip-1.0.0-rc3.js"></script>

<script type="text/javascript" src="js/GridView/jquery.tablesorter.js"></script>
<script type="text/javascript" src="js/GridView/jquery.grid.js"></script>
<script type="text/javascript" src="js/GridView/SagePaging.js"></script>
<script type="text/javascript" src="js/GridView/jquery.global.js"></script>
<script type="text/javascript" src="js/GridView/jquery-dateFormat.js"></script>

<script type="text/javascript" src="js/MessageBox/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/MessageBox/alertbox.js"></script>

<script type="text/javascript" src="js/AjaxFileUploader/ajaxupload.js"></script>

<script type="text/javascript"
	src="js/ckeditor_4.5.1_full/ckeditor/ckeditor.js"></script>
<script type="text/javascript"
	src="js/ckeditor_4.5.1_full/ckeditor/adapters/jquery.js"></script>


<!-- <script type="text/javascript" src="js/core/Session.js"></script> -->
<script type="text/javascript" src="js/core/encoder.js"></script>

<!-- <script type="text/javascript" src="js/Tabs/jquery.slidingtabs.js"></script> -->

<script type="text/javascript" src="js/modules/ProposalsManage.js"></script>
<script type="text/javascript"
	src="js/modules/Language/GPMSProposalsManagement.js"></script>
<!-- <script type="text/javascript" src="js/modules/Language/AspxRssFeedLocale.js"></script> -->

<link type="text/css" rel="stylesheet"
	href="js/jquery-ui-1.8.14.custom/css/redmond/jquery-ui-1.8.16.custom.css" />
<link type="text/css" rel="stylesheet" href="css/GridView/tablesort.css" />
<link type="text/css" rel="stylesheet" href="css/MessageBox/style.css" />

<link type="text/css" rel="stylesheet" href="css/Templates/grid.css" />
<link type="text/css" rel="stylesheet"
	href="css/Templates/topstickybar.css" />
<link type="text/css" rel="stylesheet" href="css/Templates/admin.css" />

<!-- <link type="text/css" rel="stylesheet" -->
<!-- 	href="css/Tabs/slidingtabs-vertical.css" /> -->
<style>
.ui-tabs-vertical .ui-tabs-nav {
	padding: .2em .1em .2em .2em;
	float: left;
	width: 17em;
}

.ui-tabs-vertical .ui-tabs-nav li {
	clear: left;
	width: 100%;
	border-bottom-width: 1px !important;
	border-right-width: 0 !important;
	margin: 0 -1px .2em 0;
}

.ui-tabs-vertical .ui-tabs-nav li a {
	display: block;
	float: none;
}

.ui-tabs-vertical .ui-tabs-nav li.ui-tabs-active {
	padding-bottom: 0;
	padding-right: .1em;
	border-right-width: 1px;
}

.ui-tabs-vertical .ui-tabs-panel {
	padding: 1em;
}

.ui-state-default a {
	border-bottom: 1px solid #ccc;
}

#fragment-13>div {
	float: left;
	padding: 1em;
}
</style>
</head>
<body>
	<form enctype="multipart/form-data" action="Manage-Proposals.jsp"
		method="post" name="form1">
		<div style="display: none;" id="UpdateProgress1">
			<div class="sfLoadingbg">&nbsp;</div>
			<div class="sfLoadingdiv">
				<img style="border-width: 0px;" alt="Loading..."
					src="images/ajax-loader.gif" title="Loading..." id="imgProgress">
				<br> <span id="lblPrgress">Please wait...</span>
			</div>
		</div>
		<noscript>
			<span>This page requires java-script to be enabled. Please
				adjust your browser-settings.</span>
		</noscript>
		<div id="sfOuterwrapper">
			<div class="sfSagewrapper">

				<!--Body Content-->
				<div class="sfContentwrapper clearfix">
					<div id="divCenterContent">
						<!-- Side Bar Starts-->
						<div class="sideBarLeft" id="divSideBar">
							<%@ include file="Sidebar.jsp"%>
						</div>
						<!-- Side Bar Ends -->
						<div class="sfMaincontent">
							<div style="display: block" class="sfCpanel sfInnerwrapper"
								id="divBottompanel">
								<div class="sfModulecontent clearfix">

									<script type="text/javascript">
										//<![CDATA[
										$(function() {
											$(".sfLocale")
													.localize(
															{
																moduleKey : gpmsProposalsManagement
															});

											$("#container-7")
													.tabs()
													.addClass(
															"ui-tabs-vertical ui-helper-clearfix");
											$("#container-7 li").removeClass(
													"ui-corner-top").addClass(
													"ui-corner-left");
										});
										//]]>
									</script>
									<!-- Grid -->
									<div id="divProposalGrid">
										<div class="cssClassCommonBox Curve">
											<div class="cssClassHeader">
												<h1>
													<span>Manage Proposals</span>
												</h1>
												<div class="cssClassHeaderRight">
													<div class="sfButtonwrapper">
														<p>
															<button type="button" id="btnAddNew" class="sfBtn">
																<span class="sfLocale icon-addnew">Add New
																	Proposal</span>
															</button>
														</p>
														<p>
															<button type="button" id="btnDeleteSelected"
																class="sfBtn">
																<span class="sfLocale icon-delete">Delete All
																	Selected</span>
															</button>
														</p>
														<p>
															<button type="button" id="btnExportToExcel" class="sfBtn">
																<span class="sfLocale icon-showall">Export to
																	Excel</span>
															</button>
														</p>
														<p>
															<button type="button" id="btnExportToCSV" class="sfBtn">
																<span class="sfLocale icon-showall">Export to CSV</span>
															</button>
														</p>

														<div class="cssClassClear"></div>
													</div>
													<div class="cssClassClear"></div>
												</div>
												<div class="cssClassClear"></div>
											</div>
											<div class="sfGridwrapper">
												<div class="sfGridWrapperContent">
													<div class="sfFormwrapper sfTableOption">
														<table width="100%" cellspacing="0" cellpadding="0"
															border="0">
															<tbody>
																<tr>
																	<td><label class="cssClassLabel sfLocale">Project
																			Title:</label> <input type="text" class="sfTextBoxSmall"
																		id="txtSearchProjectTitle" placeholder="Project Title"></td>
																	<td><label class="cssClassLabel sfLocale">
																			Proposed By:</label><input id="txtSearchProposedBy"
																		class="sfTextBoxSmall" type="text"
																		placeholder="Proposed By"></td>

																	<td><label class="cssClassLabel sfLocale">
																			Total Costs:</label> <br> <span class="label sfLocale">
																			From :</span> <input type="text"
																		id="txtSearchTotalCostsFrom" class="sfTextBoxSmall"
																		style="width: 80px !important;" placeholder="From">
																		<span class="label sfLocale"> To :</span> <input
																		type="text" id="txtSearchTotalCostsTo"
																		class="sfTextBoxSmall" style="width: 80px !important;"
																		placeholder="To"></td>
																	</td>

																	<!-- 																		<td><label class="cssClassLabel sfLocale"> -->
																	<!-- 																				Project Type:</label> <select id="ddlProjectType" -->
																	<!-- 																			class="sfListmenu" style="width: 100px;" title="Project Type"> -->
																	<!-- 																				<option value="0" class="sfLocale">--All--</option> -->
																	<!-- 																		</select></td> -->
																	<!-- 																		<td><label class="cssClassLabel sfLocale"> -->
																	<!-- 																				Type of Request:</label> <select id="ddlTypeOfRequest" -->
																	<!-- 																			class="sfListmenu" style="width: 100px;" title="Type of Request"> -->
																	<!-- 																				<option value="0" class="sfLocale">--All--</option> -->
																	<!-- 																		</select></td> -->
																	<!-- 																		<td><label class="cssClassLabel sfLocale"> -->
																	<!-- 																				Location of Project:</label> <select id="ddlLocationOfProject" -->
																	<!-- 																			class="sfListmenu" style="width: 100px;" title="Location of Project"> -->
																	<!-- 																				<option value="0" class="sfLocale">--All--</option> -->
																	<!-- 																		</select></td> -->


																	<td><label class="cssClassLabel sfLocale">
																			Received On:</label><br> <span class="label sfLocale">
																			From :</span> <input type="text"
																		id="txtSearchReceivedOnFrom" class="sfTextBoxSmall"
																		style="width: 80px !important;" placeholder="From">
																		<span class="label sfLocale"> To :</span> <input
																		type="text" id="txtSearchReceivedOnTo"
																		class="sfTextBoxSmall" style="width: 80px !important;"
																		placeholder="To"></td>

																	<td><label class="cssClassLabel sfLocale">
																			Proposal Status:</label> <select id="ddlSearchProposalStatus"
																		class="sfListmenu" style="width: 100px;"
																		title="Proposal Status">
																			<option value="0" class="sfLocale">--All--</option>
																	</select></td>
																	<td><br>
																		<button class="sfBtn" id="btnSearchProposal"
																			type="button">
																			<span class="sfLocale icon-search">Search</span>
																		</button></td>
																</tr>
															</tbody>
														</table>
													</div>
													<div class="loading">
														<img id="ajaxLoader" src="" class="sfLocale"
															alt="loading...." title="loading...." />
													</div>
													<div class="log"></div>
													<table id="gdvProposals" cellspacing="0" cellpadding="0"
														border="0" width="100%"></table>
												</div>
											</div>
										</div>
									</div>
									<!-- End of Grid -->
									<!-- form -->
									<div id="divProposalForm" style="display: none">
										<div class="cssClassCommonBox Curve">
											<div class="cssClassHeader">
												<h1>
													<span id="lblFormHeading">New Proposal Details</span>
												</h1>
											</div>
											<div class="cssClassTabPanelTable">
												<div id="container-7">
													<ul>
														<li><a href="#fragment-1"> <span
																id="lblTabTitle1">Investigator Information </span></a></li>
														<li><a href="#fragment-2"><span id="lblTabTitle2">
																	Project Information </span></a></li>
														<li><a href="#fragment-3"><span id="lblTabTitle3">
																	Sponsor And Budget Information </span></a></li>
														<li><a href="#fragment-4"><span id="lblTabTitle4">
																	Cost Share Information </span></a></li>
														<li><a href="#fragment-5"><span id="lblTabTitle5">
																	University Commitments </span></a></li>
														<li><a href="#fragment-6"><span id="lblTabTitle6">
																	Conflict of Interest And Commitment Information </span></a></li>
														<li><a href="#fragment-7"><span id="lblTabTitle7">
																	Compliance Information </span></a></li>
														<li><a href="#fragment-8"><span id="lblTabTitle8">
																	Additional Information </span></a></li>
														<li><a href="#fragment-9"><span id="lblTabTitle9">
																	Collaboration Information </span></a></li>
														<li><a href="#fragment-10"><span
																id="lblTabTitle10"> Proprietary/Confidential
																	Information </span></a></li>
														<li><a href="#fragment-11"><span
																id="lblTabTitle11"> Certification/Signatures </span></a></li>
														<li><a href="#fragment-12"><span
																id="lblTabTitle12"> OSP Section </span></a></li>
														<li id="auditLogTab"><a href="#fragment-13"><span
																id="lblTabTitle13"> Audit Logs </span></a></li>
													</ul>

													<div id="fragment-1">
														<div class="sfFormwrapper">
															<table cellspacing="0" cellpadding="0" border="0"
																id="dataTable">
																<thead>
																	<tr>
																		<th><span class="cssClassLabel">Role:</span> <span
																			class="cssClassRequired">*</span></th>
																		<th><span class="cssClassLabel">Name:</span> <span
																			class="cssClassRequired">*</span></th>
																		<th><span class="cssClassLabel">College:</span> <span
																			class="cssClassRequired">*</span></th>
																		<th><span class="cssClassLabel">Department:</span>
																			<span class="cssClassRequired">*</span></th>
																		<th><span class="cssClassLabel">Position
																				Type:</span> <span class="cssClassRequired">*</span></th>
																		<th><span class="cssClassLabel">Position
																				Title:</span> <span class="cssClassRequired">*</span></th>
																		<th><span class="cssClassLabel">Phone #:</span> <span
																			class="cssClassRequired">*</span></th>
																		<th></th>
																	</tr>
																</thead>
																<tbody>
																	<tr>
																		<td><select title="Role" class="sfListmenu"
																			name="ddlRole">
																				<option value="0">PI</option>
																				<option value="1">Co-PI</option>
																				<option value="2">Senior Personnel</option>
																		</select></td>
																		<td><select title="Name" class="sfListmenu"
																			name="ddlName">
																		</select></td>
																		<td><select title="College Name"
																			class="sfListmenu" name="ddlCollege">
																		</select></td>
																		<td><select title="Department Name"
																			class="sfListmenu" name="ddlDepartment">
																		</select></td>
																		<td><select title="Position Type"
																			class="sfListmenu" name="ddlPositionType">
																		</select></td>
																		<td><select title="Position Title"
																			class="sfListmenu" name="ddlPositionTitle">
																		</select></td>
																		<td><input type="text" class="sfInputbox"
																			name="txtPhoneNo" placeholder="Phone #"
																			disabled="disabled"></td>
																		<td><input type="Button" value="Add More"
																			name="AddMore"
																			class="AddOption cssClassButtonSubmit sfLocale" /></td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>

													<div id="fragment-2">
														<div class="sfFormwrapper">
															<table cellspacing="0" cellpadding="0" border="0">
																<tbody>
																	<tr>
																		<td><span class="cssClassLabelTitle"
																			id="lblProjectTitle">Project Title:</span></td>
																		<td class="cssClassTableRightCol required" colspan="3"><textarea
																				class="cssClassTextArea" cols="15" rows="2"
																				title="Default Value" name="projectTitle"
																				id="txtProjectTitle" placeholder="Project Title"></textarea><span
																			class="cssClassRight"> <img
																				class="cssClassSuccessImg sfLocale" height="13"
																				width="18" title="Right" src="" alt="Right" />
																		</span> <b class="cssClassError sfLocale">Ops! found
																				something error, must be unique with no spaces</b><span
																			class="cssClassRequired">*</span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabel"
																			id="lblProjectType">Project Type:</span></td>
																		<td class="cssClassTableRightCol required"><select
																			id="ddlProjectType" name="projectType"
																			title="Project Type">
																				<option value="0">Choose Project Type</option>
																				<option value="1">Research-Basic</option>
																				<option value="2">Research-Applied</option>
																				<option value="3">Research-Development</option>
																				<option value="4">Instruction</option>
																				<option value="5">Other Sponsored Activity</option>
																		</select> <span class="cssClassRequired">*</span></td>
																		<td><span class="cssClassLabel"
																			id="lblTypeOfRequest">Type of Request:</span></td>
																		<td class="cssClassTableRightCol"><select
																			id="ddlTypeOfRequest" name="typeOfRequest"
																			title="Type of Request">
																				<option value="0">Choose Type of Request</option>
																				<option value="1">Pre-Proposal</option>
																				<option value="2">New Proposal</option>
																				<option value="3">Continuation</option>
																				<option value="4">Supplement</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>
																	<tr>
																		<td><span id="lblDueDate" class="cssClassLabel">Due
																				Date:</span></td>
																		<td class="cssClassTableRightCol required"><input
																			type="text" id="txtDueDate" class="sfInputbox"
																			name="dueDate" placeholder="Due Date"> <span
																			class="cssClassRequired">*</span></td>

																		<td><span id="lblLocationOfProject"
																			class="cssClassLabel">Location of Project:</span></td>
																		<td class="cssClassTableRightCol required"><select
																			id="ddlLocationOfProject" name="locationOfProject"
																			title="Location of Project">
																				<option value="0">Choose Location of
																					Project</option>
																				<option value="1">Off-campus</option>
																				<option value="2">On-campus</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>
																	<tr>
																		<td><span id="lblProjectPeriod"
																			class="cssClassLabel">Project Period: From:</span></td>
																		<td class="cssClassTableRightCol required"><input
																			type="text" id="txtProjectPeriodFrom"
																			class="sfInputbox" name="projectPeriodFrom"
																			placeholder="From"> <span
																			class="cssClassRequired">*</span></td>

																		<td><span id="lblProjectPeriodTo"
																			class="cssClassLabel">To:</span></td>
																		<td class="cssClassTableRightCol required"><input
																			type="text" id="txtProjectPeriodTo"
																			class="sfInputbox" name="projectPeriodTo"
																			placeholder="To"> <span
																			class="cssClassRequired">*</span></td>
																	</tr>
																</tbody>
															</table>

															<table id="tblProposalGeneralInfo" cellspacing="0"
																cellpadding="0" border="0">
																<tbody>
																	<tr>
																		<td><span class="cssClassLabel">Proposal
																				No:</span></td>
																		<td class="cssClassTableRightCol"><span
																			id="lblProposalNo" class="cssClassLabel"></span></td>

																		<td><span class="cssClassLabel">Proposal
																				Date Received:</span></td>
																		<td class="cssClassTableRightCol"><span
																			id="lblProposalDateReceived" class="cssClassLabel"></span></td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel"
																			id="lblProposalStatus">Proposal Status:</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Proposal Status" name="proposalStatus"
																			id="ddlProposalStatus">
																				<option value="0">Choose Proposal Status</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>

													<div id="fragment-3">
														<div class="sfFormwrapper">
															<table cellspacing="0" cellpadding="0" border="0">
																<tbody>
																	<tr>
																		<td><span class="cssClassLabel"
																			id="lblNameOfGrantingAgency">Name of Granting
																				Agency:</span></td>
																		<td class="cssClassTableRightCol required" colspan="2"><input
																			type="text" class="sfInputbox"
																			id="txtNameOfGrantingAgency"
																			placeholder="Name of Granting
																					Agency">
																			<span class="cssClassRequired">*</span> <span
																			class="cssClassLabel">Enter comma separated
																				names.</span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabel"
																			id="lblDirectCosts">Direct Costs:</span></td>
																		<td class="cssClassTableRightCol required"><span>$</span><input
																			type="text" class="sfInputbox" id="txtDirectCosts"
																			placeholder="Direct Costs"> <span
																			class="cssClassRequired">*</span></td>

																		<td><span class="cssClassLabel" id="lblFACosts">F&A
																				Costs:</span></td>
																		<td class="cssClassTableRightCol required"><span>$</span>
																			<input type="text" class="sfInputbox" id="txtFACosts"
																			placeholder="F&A Costs"> <span
																			class="cssClassRequired">*</span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabel"
																			id="lblTotalCosts">Total Costs:</span></td>
																		<td class="cssClassTableRightCol required"><span>$</span>
																			<input type="text" class="sfInputbox"
																			id="txtTotalCosts" placeholder="Total Costs">
																			<span class="cssClassRequired">*</span></td>
																		<td><span class="cssClassLabel" id="lblPassword">F&A
																				Rate:</span></td>
																		<td class="cssClassTableRightCol required"><input
																			type="text" class="sfInputbox" id="txtFARate"
																			placeholder="F&A
																					Rate">
																			<span>%</span><span class="cssClassRequired">*</span></td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>

													<div id="fragment-4">
														<div class="sfFormwrapper">
															<table cellspacing="0" cellpadding="0" border="0">
																<tbody>
																	<tr>
																		<td><span class="cssClassLabel">Is
																				Institutional commited cost share included in the
																				proposal?</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Institutional Commitment Cost"
																			class="sfListmenu"
																			id="ddlInstitutionalCommitmentCost">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span> <span
																			class="cssClassLabel" id="lblConfirmCommitment">Complete
																				the OSP Cost Share Form</span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabel">Is Third
																				Party commited cost share included in the proposal?</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Third
																					Party commitment Cost"
																			class="sfListmenu" id="ddlThirdPartyCommitmentCost">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>

													<div id="fragment-5">
														<div class="sfFormwrapper">
															<table cellspacing="0" cellpadding="0" border="0">
																<tbody>
																	<tr>
																		<td><span class="cssClassLabel">Will new
																				or renovated space/facilities be required?</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="New Space Required" class="sfListmenu"
																			id="ddlNewSpaceRequired">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabel">Will
																				rental space be required?</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Rental Space Required" class="sfListmenu"
																			id="ddlRentalSpaceRequired">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabel">Does this
																				project require institutional commitments beyond the
																				end date of the project?</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Institutional Commitments Required"
																			class="sfListmenu"
																			id="ddlInstitutionalCommitmentsRequired">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span> <span
																			class="cssClassLabel" id="lblCommitmentsRequired">Please
																				refer to the OSP Proposal Data Sheet Instructions
																				for required documents.</span></td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>

													<div id="fragment-6">
														<div class="sfFormwrapper">
															<table cellspacing="0" cellpadding="0" border="0">
																<tbody>
																	<tr>
																		<td><span class="cssClassLabel">Is there a
																				finanacial conflict of interest <b>related to
																					this proposal</b>?
																		</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Finanacial Conflict of Interest"
																			class="sfListmenu" id="ddlFinancialCOI">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>
																	<tr id="disclosedFinancialCOI">
																		<td><span class="cssClassLabel">Has the
																				financial conflict been disclosed?</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Financial Conflict been Disclosed?"
																			class="sfListmenu" id="ddlDisclosedFinancialCOI">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span> <span
																			class="cssClassLabel" id="lblDisclosureRequired">Your
																				disclosure must be updated.</span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabel">Has there
																				been a material change to your annual disclosure
																				form? </span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Material changed to Annual Disclosure Form?"
																			class="sfListmenu" id="ddlMaterialChanged">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span> <span
																			class="cssClassLabel" id="lblMaterialChanged">Your
																				disclosure must be updated.</span></td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>

													<div id="fragment-7">
														<div class="sfFormwrapper">
															<table cellspacing="0" cellpadding="0" border="0">
																<tbody>
																	<tr>
																		<td><span class="cssClassLabel">Does this
																				project involve the use of Human Subjects? </span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Involves Use of Human Subjects?"
																			class="sfListmenu" id="ddlUseHumanSubjects">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span> <span
																			class="cssClassLabel" id="lblUseHumanSubjects">Provide
																				IRB # or indicate pending.</span></td>

																		<td id="tdHumanSubjectsOption"><span
																			class="cssClassLabel">Choose Option? </span></td>
																		<td class="cssClassTableRightCol required"
																			id="tdIRBOption"><select title="IRB Option"
																			class="sfListmenu" id="ddlIRBOptions">
																				<option value="0">Select Option</option>
																				<option value="1">IRB #</option>
																				<option value="2">Pending</option>
																		</select> <span class="cssClassRequired">*</span></td>

																		<td class="cssClassTableRightCol required"
																			id="tdIRBtxt"><input type="text"
																			class="sfInputbox" id="txtIRB" placeholder="IRB #">
																			</select> <span class="cssClassRequired">*</span></td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">Does this
																				project involve the use of Vertebrate Animals? </span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Involves Use of Vertebrate Animals?"
																			class="sfListmenu" id="ddlUseVertebrateAnimals">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span> <span
																			class="cssClassLabel" id="lblUseVertebrateAnimals">Provide
																				IACUC # or indicate pending.</span></td>

																		<td id="tdVertebrateAnimalsOption"><span
																			class="cssClassLabel">Choose Option? </span></td>
																		<td class="cssClassTableRightCol required"
																			id="tdIACUCOption"><select title="IACUC Option"
																			class="sfListmenu" id="ddlIACUCOptions">
																				<option value="0">Select Option</option>
																				<option value="1">IACUC #</option>
																				<option value="2">Pending</option>
																		</select> <span class="cssClassRequired">*</span></td>

																		<td class="cssClassTableRightCol required"
																			id="tdIACUCtxt"><input type="text"
																			class="sfInputbox" id="txtIACUC"
																			placeholder="IACUC #"> </select> <span
																			class="cssClassRequired">*</span></td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">Does this
																				project involve Biosafety concerns? </span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Involves Biosafety Concerns?"
																			class="sfListmenu" id="ddlInvovleBioSafety">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span> <span
																			class="cssClassLabel" id="lblHasBiosafetyConcerns">Provide
																				IBC # or indicate pending.</span></td>

																		<td id="tdBiosafetyOption"><span
																			class="cssClassLabel">Choose Option? </span></td>
																		<td class="cssClassTableRightCol required"
																			id="tdIBCOption"><select title="IBC Option"
																			class="sfListmenu" id="ddlIBCOptions">
																				<option value="0">Select Option</option>
																				<option value="1">IBC #</option>
																				<option value="2">Pending</option>
																		</select> <span class="cssClassRequired">*</span></td>

																		<td class="cssClassTableRightCol required"
																			id="tdIBCtxt"><input type="text"
																			class="sfInputbox" id="txtIBC" placeholder="IBC #">
																			</select> <span class="cssClassRequired">*</span></td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">Does this
																				project have Environmental Health & Safety concerns?
																		</span></td>
																		<td class="cssClassTableRightCol required" colspan="2"><select
																			title="Have Environmental Health & Safety Concerns?"
																			class="sfListmenu" id="ddlEnvironmentalConcerns">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>

													<div id="fragment-8">
														<div class="sfFormwrapper">
															<table cellspacing="0" cellpadding="0" border="0">
																<tbody>
																	<tr>
																		<td><span class="cssClassLabel">Do you
																				anticipate payment(s) to foreign nationals or on
																				behalf of foreign nationals? </span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Anticipate Payment to/on behalf Foreign Nationals?"
																			class="sfListmenu" id="ddlAnticipateForeignNationals">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabel">Do you
																				anticipate course release time?</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Anticipate Course Release Time?"
																			class="sfListmenu" id="ddlAnticipateReleaseTime">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabel">Are the
																				proposed activities related to Center for Advanced
																				Energy Studies? </span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Related to Center for Advanced
																					Energy Studies?"
																			class="sfListmenu" id="ddlRelatedToEnergyStudies">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>

													<div id="fragment-9">
														<div class="sfFormwrapper">
															<table cellspacing="0" cellpadding="0" border="0">
																<tbody>
																	<tr>
																		<td><span class="cssClassLabel">Does this
																				project involve non-funded collaborations? </span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Involves Non-funded Collaborations?"
																			class="sfListmenu" id="ddlInvolveNonFundedCollabs">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span> <span
																			class="cssClassLabel" id="lblInvolveNonFundedCollabs">Provide
																				list collaborating institutions/organizations below.</span></td>
																	</tr>
																	<tr id="trInvolveNonFundedCollabs">
																		<td><span class="cssClassLabel">Collaborators:</span></td>
																		<td class="cssClassTableRightCol required"><input
																			type="text" class="sfInputbox" id="txtCollaborators"
																			placeholder="Collaborators"> <span
																			class="cssClassRequired">*</span> <span
																			class="cssClassLabel">Enter comma separated
																				names.</span></td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>

													<div id="fragment-10">
														<div class="sfFormwrapper">
															<table cellspacing="0" cellpadding="0" border="0">
																<tbody>
																	<tr>
																		<td><span class="cssClassLabel">Does this
																				proposal contain any confidential information which
																				is Proprietary that should not be publicly released?
																		</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Contains Confidential Information Which
																					Is Proprietary?"
																			class="sfListmenu" id="ddlProprietaryInformation">
																				<option value="0">Select Option</option>
																				<option value="1">Yes, on pages</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span></td>
																		<td><input type="text" class="sfInputbox"
																			id="txtPagesWithProprietaryInfo"
																			placeholder="Pages With Proprietary/Confidential Information"></td>
																		<td></td>
																	</tr>
																	<tr id="trTypeOfProprietaryInfo">
																		<td class="cssClassTableRightCol"><input
																			type="checkbox" name="patentable" id="chkPatentable"
																			class="cssClassCheckBox" /></td>
																		<td><label class="cssClassLabel"
																			for="chkPatentable">Patentable</label></td>
																		<td class="cssClassTableRightCol"><input
																			type="checkbox" name="copyrightable"
																			id="chkCopyrightable" class="cssClassCheckBox" /></td>
																		<td><label class="cssClassLabel"
																			for="chkCopyrightable">Copyrightable</label></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabel">Will this
																				project involve intellectual property in which the
																				University may own or have an interest? </span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Own Intellectual Property?" class="sfListmenu"
																			id="ddlOwnIntellectualProperty">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span></td>
																		<td></td>
																		<td></td>
																	</tr>
																	<tr>
																		<td colspan="4"><span class="cssClassLabel"><b>Note:</b>
																				Contact the Office of Technology Transfer for
																				additional assistance on proprietary and patentable
																				information at 208-426-5765.</span></td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>

													<div id="fragment-11">
														<div class="sfFormwrapper">
															<table cellspacing="0" cellpadding="0" border="0">
																<tbody>
																	<tr>
																		<td><span class="cssClassLabel"><b>Investigators,
																					department chairs directors, deans</b> certify that 1)
																				the proposed activities are appropriate to the
																				research, instruction and public service mission of
																				the University; 2) if funded all necessary resources
																				as proposed will be provided for the project (i.e.,
																				cost share, personnel, facilities), and project
																				expenditures that exceed the sponsor's award and/or
																				payment upon completion of the project will be
																				charged to the department account that you will
																				identify at the time of award setup.</span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabel"><b>Principal
																					or Co-Principal Investigators</b>b> certify that 1) the
																				information submitted within the application is
																				true, complete and accurate to the best of the
																				Investigator's knowledge; 2) all necessary resources
																				to successfully complete the proposed project have
																				been identified in the proposal; 3) the application
																				is true, complete and accurate to the best of my
																				knowledge; 4) any false, fictitious or fraudulent
																				statements or claims may subject the PI to criminal,
																				civil or administrative penalties; 5) the PI agrees
																				to accept responsibility for the scientific and
																				programmatic conduct and financial oversight of the
																				project and to provide the required progress
																				reports; and 6) the PI shall use all reasonable and
																				best efforts to comply with the terms, conditions
																				and policies of both the sponsor and the University.
																				PIs should refer to <a
																				href="http://web1.boisestate.edu/research/osp/standard-compliance.shtml"
																				target="_blank">http://web1.boisestate.edu/research/osp/standard-compliance.shtml
																					for a list of responsibilities.</a></span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabel"><b>Department
																					chairs and deans</b> acknowledge that facilities &
																				Administrative costs for projects involving more
																				than one college will be distributed in accordance
																				with University policy 6100 unless otherwise
																				directed in writing with approval from all deans
																				involved.</span></td>
																	</tr>
																</tbody>
															</table>

															<table cellspacing="0" cellpadding="0" border="0">
																<tbody>
																	<tr id="signPI">
																		<td><span class="cssClassLabel">Principal/Co-Investigator(s)</span></td>
																		<td><span class="cssClassLabel">Date</span></td>
																	</tr>
																	<tr id="signChair">
																		<td><span class="cssClassLabel">Department
																				Chair(s) or Director(s)</span></td>
																		<td><span class="cssClassLabel">Date</span></td>
																	</tr>
																	<tr id="signDean">
																		<td><span class="cssClassLabel">Dean(s)</span></td>
																		<td><span class="cssClassLabel">Date</span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabel">Business
																				Manager (if applicable) has reviewed this proposal.
																				Initials:</span></td>
																		<td><input type="text" class="sfInputbox"
																			id="txtSignBusinessManager"
																			placeholder="-----------------------------------"></td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>

													<div id="fragment-12">
														<div class="sfFormwrapper">
															<table cellspacing="0" cellpadding="0" border="0">
																<thead>
																	<tr>
																		<th>Office of Sponsored Programs Administrative
																			Use Only</th>
																	</tr>
																</thead>
																<tbody>
																	<tr>
																		<td><span class="cssClassLabel">Flow-Through,
																				List Agency</span></td>
																		<td><input type="text" class="sfInputbox"
																			id="txtAgencyList"
																			placeholder="-------------------------------------------------------------------------------------------">
																			<span class="cssClassLabel">Enter comma
																				separated names.</span></td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">Funding
																				Source:</span></td>
																		<td class="cssClassTableRightCol"><div
																				class="cssClassCheckBox ">
																				<input type="checkbox" class="cssClassCheckBox"
																					id="chkFederal" name="federal" value="Federal"><label
																					class="cssClassLabel" for="chkFederal">Federal</label><input
																					type="checkbox" class="cssClassCheckBox"
																					id="chkFederalFlowThrough"
																					name="federalFlowThrough"
																					value="Federal Flow-Through"><label
																					class="cssClassLabel" for="chkFederalFlowThrough">Federal
																					Flow-Through</label><input type="checkbox"
																					class="cssClassCheckBox" id="chkStateOfIdahoEntity"
																					name="stateOfIdahoEntity"
																					value="State of Idaho Entity"><label
																					class="cssClassLabel" for="chkStateOfIdahoEntity">State
																					of Idaho Entity</label> <input type="checkbox"
																					class="cssClassCheckBox" id="chkPrivateForProfit"
																					name="privateForProfit" value="Private For Profit"><label
																					class="cssClassLabel" for="chkPrivateForProfit">Private
																					For Profit</label><input type="checkbox"
																					class="cssClassCheckBox"
																					id="chkNonProfitOrganization"
																					name="nonProfitOrganization"
																					value="Non-Profit Organization"><label
																					class="cssClassLabel"
																					for="chkNonProfitOrganization">Non-Profit
																					Organization</label><input type="checkbox"
																					class="cssClassCheckBox"
																					id="chkNonIdahoStateEntity"
																					name="nonIdahoStateEntity"
																					value="Non-Idaho State Entity"><label
																					class="cssClassLabel" for="chkNonIdahoStateEntity">Non-Idaho
																					State Entity</label> <input type="checkbox"
																					class="cssClassCheckBox" id="chkCollegeUniversity"
																					name="collegeUniversity" value="College/University"><label
																					class="cssClassLabel" for="chkCollegeUniversity">College/University</label><input
																					type="checkbox" class="cssClassCheckBox"
																					id="chkLocalEntity" name="localEntity"
																					value="Local Entity"><label
																					class="cssClassLabel" for="chkLocalEntity">Local
																					Entity</label><input type="checkbox"
																					class="cssClassCheckBox"
																					id="chkNonIdahoLocalEntity"
																					name="nonIdahoLocalEntity"
																					value="Non-Idaho Local Entity"><label
																					class="cssClassLabel" for="chkNonIdahoLocalEntity">Non-Idaho
																					Local Entity</label> <input type="checkbox"
																					class="cssClassCheckBox" id="chkTribalGovernment"
																					name="tribalGovernment" value="Tribal Government"><label
																					class="cssClassLabel" for="chkTribalGovernment">Tribal
																					Government</label><input type="checkbox"
																					class="cssClassCheckBox" id="chkForeign"
																					name="foreign" value="Foreign"><label
																					class="cssClassLabel" for="chkForeign">Foreign</label>
																				<span class="iferror"></span>
																			</div></td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">CFDA No.:</span></td>
																		<td><input type="text" class="sfInputbox"
																			id="txtCFDANo" placeholder="-------------------"></td>
																		<td><span class="cssClassLabel">Program
																				No.:</span></td>
																		<td><input type="text" class="sfInputbox"
																			id="txtProgramNo" placeholder="-------------------"></td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">Program/Solicitation
																				Title:</span></td>
																		<td><input type="text" class="sfInputbox"
																			id="txtProgramTitle"
																			placeholder="---------------------------------------"></td>
																	</tr>
																	<tr>
																		<td>-----------------------------------------------------------</td>
																		<td>-----------------------------------------------------------</td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">Recovery:</span></td>
																		<td class="cssClassTableRightCol"><div
																				class="cssClassCheckBox ">
																				<input type="checkbox" class="cssClassCheckBox"
																					id="chkFullRecovery" name="fullRecovery"
																					value="Full Recovery"><label
																					class="cssClassLabel" for="chkFullRecovery">Full
																					Recovery</label><input type="checkbox"
																					class="cssClassCheckBox" id="chkNoRecoveryNormal"
																					name="noRecoveryNormal"
																					value="No Recovery-Normal Sponsor Policy"><label
																					class="cssClassLabel" for="chkNoRecoveryNormal">No
																					Recovery-Normal Sponsor Policy</label><input
																					type="checkbox" class="cssClassCheckBox"
																					id="chkNoRecoveryInstitutional"
																					name="noRecoveryInstitutional"
																					value="No Recovery-Institutional Waiver"><label
																					class="cssClassLabel"
																					for="chkNoRecoveryInstitutional">No
																					Recovery-Institutional Waiver</label> <input
																					type="checkbox" class="cssClassCheckBox"
																					id="chkLimitedRecoveryNormal"
																					name="limitedRecoveryNormal"
																					value="Limited Recovery-Normal Sponsor Policy"><label
																					class="cssClassLabel"
																					for="chkLimitedRecoveryNormal">Limited
																					Recovery-Normal Sponsor Policy</label><input
																					type="checkbox" class="cssClassCheckBox"
																					id="chkLimitedRecoveryInstitutional"
																					name="limitedRecoveryInstitutional"
																					value="Limited Recovery-Institutional Waiver"><label
																					class="cssClassLabel"
																					for="chkLimitedRecoveryInstitutional">Limited
																					Recovery-Institutional Waiver</label> <span class="iferror"></span>
																			</div></td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">Base:</span></td>
																		<td class="cssClassTableRightCol"><div
																				class="cssClassCheckBox ">
																				<input type="checkbox" class="cssClassCheckBox"
																					id="chkMTDC" name="MTDC" value="MTDC"><label
																					class="cssClassLabel" for="chkMTDC">MTDC</label><input
																					type="checkbox" class="cssClassCheckBox"
																					id="chkTDC" name="TDC" value="TDC"><label
																					class="cssClassLabel" for="chkTDC">TDC</label><input
																					type="checkbox" class="cssClassCheckBox" id="chkTC"
																					name="TC" value="TC"><label
																					class="cssClassLabel" for="chkTC">TC</label> <input
																					type="checkbox" class="cssClassCheckBox"
																					id="chkOther" name="other" value="Other"><label
																					class="cssClassLabel" for="chkOther">Other</label><input
																					type="checkbox" class="cssClassCheckBox" id="chkNA"
																					name="nA" value="N/A"><label
																					class="cssClassLabel" for="chkNA">N/A</label> <span
																					class="iferror"></span>
																			</div></td>
																	</tr>
																	<tr>
																		<td>-----------------------------------------------------------</td>
																		<td>-----------------------------------------------------------</td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">Is PI
																				salary included in the proposal?</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Is PI salary included in the proposal?"
																			class="sfListmenu" id="ddlPISalaryIncluded">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span> <span
																			class="cssClassLabel" id="lblPISalaryIncluded">Provide
																				a Department ID for 1% minimun.</span></td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">PI Salary:</span></td>
																		<td class="cssClassTableRightCol required"><input
																			type="text" class="sfInputbox" id="txtPISalary"
																			placeholder="----------------------"> <span
																			class="cssClassRequired">*</span></td>

																		<td><span class="cssClassLabel">PI Fringe:</span></td>
																		<td class="cssClassTableRightCol required"><input
																			type="text" class="sfInputbox" id="txtPIFringe"
																			placeholder="----------------------"> <span
																			class="cssClassRequired">*</span></td>

																		<td><span class="cssClassLabel">Department
																				ID:</span></td>
																		<td class="cssClassTableRightCol required"><input
																			type="text" class="sfInputbox" id="txtDepartmentID"
																			placeholder="----------------------"> <span
																			class="cssClassRequired">*</span></td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">Institutional
																				Cost Share Documented:</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Is Institutional
																					Cost Share Documented?"
																			class="sfListmenu"
																			id="ddlInstitutionalCostDocumented">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																				<option value="3">N/A</option>
																		</select> <span class="cssClassRequired">*</span></td>

																		<td><span class="cssClassLabel">Third
																				Party Cost Share Documented:</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Is Third Party
																					Cost Share Documented?"
																			class="sfListmenu" id="ddlThirdPartyCostDocumented">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																				<option value="3">N/A</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>

																	<tr>
																		<td>-----------------------------------------------------------</td>
																		<td>-----------------------------------------------------------</td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">Are
																				subrecipients (subcontracts/subawards) anticipated?</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Are subrecipients (subcontracts/subawards) anticipated?"
																			class="sfListmenu" id="ddlSubrecipients">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>
																	<tr id="trSubrecipientsNames">
																		<td><span class="cssClassLabel">Names of
																				subrecipients:</span></td>
																		<td class="cssClassTableRightCol required"><input
																			type="text" class="sfInputbox"
																			id="txtNamesSubrecipients"
																			placeholder="-----------------------------------------------------">
																			<span class="cssClassRequired">*</span></td>
																	</tr>

																	<tr>
																		<td>-----------------------------------------------------------</td>
																		<td>-----------------------------------------------------------</td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">PI
																				Eligibility Waiver on File:</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="PI Eligibility Waiver on File"
																			class="sfListmenu" id="ddlPIEligibilityWaiver">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																				<option value="3">N/A</option>
																				<option value="4">This Proposal Only</option>
																				<option value="5">Blanket</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">Conflict
																				of Interest Forms on File:</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Conflict
																					of Interest Forms on File"
																			class="sfListmenu" id="ddlCOIForms">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																				<option value="3">N/A</option>
																		</select> <span class="cssClassRequired">*</span></td>

																		<td><span class="cssClassLabel">Excluded
																				party list has been checked:</span></td>
																		<td class="cssClassTableRightCol required"><select
																			title="Excluded
																					party list has been checked"
																			class="sfListmenu" id="ddlCheckedExcludedPartyList">
																				<option value="0">Select Option</option>
																				<option value="1">Yes</option>
																				<option value="2">No</option>
																				<option value="3">N/A</option>
																		</select> <span class="cssClassRequired">*</span></td>
																	</tr>

																	<tr>
																		<td><span class="cssClassLabel">Proposal
																				Notes:</span></td>
																		<td class="cssClassTableRightCol required" colspan="3"><textarea
																				class="cssClassTextArea" cols="15" rows="2"
																				title="Proposal Notes" name="proposalNotes"
																				id="txtProposalNotes" placeholder="Proposal Notes"></textarea>
																			<span class="cssClassRequired">*</span></td>

																		<td><span class="cssClassLabel">Research
																				Administrator:</span></td>
																		<td class="cssClassTableRightCol"><div
																				class="cssClassCheckBox ">
																				<input type="checkbox" class="cssClassCheckBox"
																					id="chkDF" name="DF" value="DF"><label
																					class="cssClassLabel" for="chkDF">DF</label><input
																					type="checkbox" class="cssClassCheckBox" id="chkLG"
																					name="LG" value="LG"><label
																					class="cssClassLabel" for="chkLG">LG</label><input
																					type="checkbox" class="cssClassCheckBox" id="chkLN"
																					name="LN" value="LN"><label
																					class="cssClassLabel" for="chkLN">LN</label> <span
																					class="iferror"></span>
																			</div></td>
																	</tr>
																</tbody>
															</table>

															<div class="cssClassFooter">
																<span>Send Original to Office of Sponsored
																	Programs, MS 1135 or osp@boisestate.edu. Please Send
																	email to osp@boisestate.edu to request a final copy of
																	the Porposal Data Sheet.</span>
															</div>
														</div>
													</div>

													<div id="fragment-13">
														<div id="divProposalAuditGrid">
															<div class="cssClassCommonBox Curve">
																<div class="sfGridwrapper">
																	<div class="sfGridWrapperContent">
																		<div class="sfFormwrapper sfTableOption">
																			<table width="100%" cellspacing="0" cellpadding="0"
																				border="0">
																				<tbody>
																					<tr>
																						<td><label class="cssClassLabel sfLocale">
																								Action:</label> <input type="text" class="sfInputbox"
																							id="txtSearchAction" placeholder="Action"></td>
																						<td><label class="cssClassLabel sfLocale">
																								Audited By:</label> <input type="text"
																							class="sfInputbox" id="txtSearchAuditedBy"
																							placeholder="Audited By"></td>
																						<td><label class="cssClassLabel sfLocale">
																								Activity On From:</label> <input type="text"
																							class="sfTextBoxSmall"
																							id="txtSearchActivityOnFrom"
																							placeholder="Activity On From"></td>
																						<td><label class="cssClassLabel sfLocale">
																								Activity On To:</label> <input type="text"
																							class="sfTextBoxSmall" id="txtSearchActivityOnTo"
																							placeholder="Activity On To"></td>

																						<td><br>
																							<button class="sfBtn"
																								id="btnSearchProposalAuditLog" type="button">
																								<span class="sfLocale icon-search">Search</span>
																							</button></td>
																					</tr>
																				</tbody>
																			</table>
																		</div>
																		<div class="loading">
																			<img id="ajaxLoader" src="" class="sfLocale"
																				alt="loading...." title="loading...." />
																		</div>
																		<div class="log"></div>
																		<table id="gdvProposalsAuditLog" cellspacing="0"
																			cellpadding="0" border="0" width="100%"></table>
																	</div>
																</div>
															</div>
															<table id="tblLastAuditedInfo" cellspacing="0"
																cellpadding="0" border="0">
																<tbody>
																	<tr>
																		<td><span class="cssClassLabelTitle">Last
																				Audited On:&nbsp;</span></td>
																		<td class="cssClassTableRightCol"><span
																			id="lblLastUpdatedOn" class="cssClassLabel"></span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabelTitle">Last
																				Audited By:&nbsp;</span></td>
																		<td class="cssClassTableRightCol"><span
																			id="lblLastUpdatedBy" class="cssClassLabel"></span></td>
																	</tr>
																	<tr>
																		<td><span class="cssClassLabelTitle">Last
																				Activity:&nbsp;</span></td>
																		<td class="cssClassTableRightCol"><span
																			id="lblActivity" class="cssClassLabel"></span></td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="sfButtonwrapper">
											<p>
												<button type="button" id="btnBack" class="sfBtn">
													<span class="sfLocale icon-arrow-slim-w">Back</span>
												</button>
											</p>
											<p>
												<button type="button" id="btnReset" class="sfBtn">
													<span class="sfLocale icon-refresh">Reset</span>
												</button>
											</p>
											<p>
												<button type="button" id="btnSaveProposal" class="sfBtn">
													<span class="sfLocale icon-save">Save</span>
												</button>
											</p>
										</div>
									</div>
									<!-- End form -->
								</div>
							</div>
						</div>
						<!-- END sfMaincontent -->
					</div>
				</div>
				<!-- END Body Content sfContentwrapper -->
			</div>
		</div>
	</form>
</body>
</html>