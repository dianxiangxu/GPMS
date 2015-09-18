<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
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
<script type="text/javascript" src="js/RegistrationValidation.js"></script>
<link type="icon shortcut" media="icon" href="favicon.ico">
<!--[if IE 9]>
        <link rel="stylesheet" href="css/ie9.css" type="text/css" media="screen"/><![endif]-->
<!--[if lt IE 9]>
        <link rel="stylesheet" href="css/IE.css" type="text/css" media="screen"/><![endif]-->
<!--[if lt IE 7]>
        <script type="text/javascript" src="js/core/IE8.js"></script>
    <![endif]-->
<title>User Registration</title>

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
	var userProfileId = "55db85812cd6851a70759858";
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

<script type="text/javascript" src="js/modules/UserRegistration.js"></script>
<script type="text/javascript"
	src="js/modules/Language/GPMSUserRegistration.js"></script>
<!-- <script type="text/javascript" src="js/modules/Language/AspxRssFeedLocale.js"></script> -->

<link type="text/css" rel="stylesheet"
	href="js/jquery-ui-1.8.14.custom/css/redmond/jquery-ui-1.8.16.custom.css" />
<link type="text/css" rel="stylesheet" href="css/GridView/tablesort.css" />
<link type="text/css" rel="stylesheet" href="css/MessageBox/style.css" />

<link type="text/css" rel="stylesheet" href="css/Templates/grid.css" />
<link type="text/css" rel="stylesheet"
	href="css/Templates/topstickybar.css" />
<link type="text/css" rel="stylesheet" href="css/Templates/admin.css" />
</head>
<body bgcolor="white">
	<form id="registrationForm" action="REST/Registration/NewUser"
		method="POST">
		<noscript>
			<span>This page requires java-script to be enabled. Please
				adjust your browser-settings.</span>
		</noscript>
		<div id="sfOuterwrapper">
			<div class="sfSagewrapper">
				<div class="sfMaincontent">
					<div style="display: block" class="sfCpanel sfInnerwrapper"
						id="divBottompanel">
						<div class="sfModulecontent clearfix">

							<script type="text/javascript">
								//<![CDATA[
								$(function() {
									$(".sfLocale").localize({
										moduleKey : gpmsUserRegistration
									});
								});
								//]]>
							</script>

							<!-- form -->
							<div id="registrationForm">
								<div class="cssClassCommonBox Curve">
									<div class="cssClassHeader">
										<h1>
											<span id="lblFormHeading">User Registration</span>
										</h1>
									</div>
									<table border="1">
										<thead>
											<h1>Here is the table header</h1>
										</thead>
										<tbody>
											<div id="fragment-1">
												<div class="sfFormwrapper">
													<table cellspacing="0" cellpadding="0" border="0">
														<tbody>
															<tr class="rule dashed">
																<td><span class="cssClassLabelTitle" id="lblName">Name</span></td>
																<td class="cssClassTableRightCol"></td>
															</tr>
															<tr>
																<td><span class="cssClassLabel" id="first_name"
																	name="firstname">First Name:</span> <span
																	class="cssClassRequired">*</span></td>
																<td class="cssClassTableRightCol"><input
																	type="text" class="sfInputbox" id="txtFirstName"
																	name="firstName" placeholder="First Name"></td>

																<td><span class="cssClassLabel" id="middle_name"
																	name="middlename">Middle Name:</span></td>
																<td class="cssClassTableRightCol"><input
																	type="text" class="sfInputbox" id="txtMiddleName"
																	name="middleName" placeholder="Middle Name"></td>
															</tr>
															<tr>
																<td><span class="cssClassLabel" id="last_name"
																	name="lastname">Last Name:</span> <span
																	class="cssClassRequired">*</span></td>
																<td class="cssClassTableRightCol"><input
																	type="text" id="txtLastName" class="sfInputbox"
																	name="lastName" placeholder="Last Name"></td>
																<td></td>
																<td></td>
															</tr>
															<tr>
																<td><span id="lblDOB" class="cssClassLabel">Date
																		of Birth:</span> <span class="cssClassRequired">*</span></td>
																<td class="cssClassTableRightCol"><input
																	type="text" id="txtDOB" class="sfInputbox" name="dob"
																	placeholder="Date of Birth"></td>
																<td><span id="lblGender" class="cssClassLabel">Gender:</span>
																	<span class="cssClassRequired">*</span></td>
																<td class="cssClassTableRightCol"><select
																	id="ddlGender" name="gender" title="Gender">
																		<option value="">Choose Gender</option>
																		<option value="Male">Male</option>
																		<option value="Female">Female</option>
																</select></td>
															</tr>
															<tr class="rule dashed">
																<td><span id="lblAddress"
																	class="cssClassLabelTitle">Current Address</span></td>
																<td class="cssClassTableRightCol"></td>
															</tr>

															<tr>
																<td><span class="cssClassLabel" id="lblStreet">Street:</span>
																	<span class="cssClassRequired">*</span></td>
																<td class="cssClassTableRightCol"><input
																	type="text" class="sfInputbox" id="txtStreet"
																	name="street" placeholder="Street"></td>
																<td><span class="cssClassLabel" id="lblApt">Apt.,
																		Suit, Floor, etc:</span></td>
																<td class="cssClassTableRightCol"><input
																	type="text" class="sfInputbox" id="txtApt" name="apt"
																	placeholder="Apt., Suite, Floor, etc. (optional)"></td>
															</tr>
															<tr>
																<td><span class="cssClassLabel" id="lblCity">City:</span>
																	<span class="cssClassRequired">*</span></td>
																<td class="cssClassTableRightCol"><input
																	type="text" class="sfInputbox" id="txtCity" name="city"
																	placeholder="City"></td>
																<td><span class="cssClassLabel" id="lblState">State:</span>
																	<span class="cssClassRequired">*</span></td>
																<td class="cssClassTableRightCol"><select
																	id="ddlState" name="state" title="State"><option
																			value="">Choose State</option>
																		<option value="1">Alabama</option>
																		<option value="2">Alaska</option>
																		<option value="4">Arizona</option>
																		<option value="5">Arkansas</option>
																		<option value="6">California</option>
																		<option value="7">Colorado</option>
																		<option value="8">Connecticut</option>
																		<option value="10">Delaware</option>
																		<option value="57">District of Columbia</option>
																		<option value="11">Florida</option>
																		<option value="12">Georgia</option>
																		<option value="14">Hawaii</option>
																		<option value="15">Idaho</option>
																		<option value="16">Illinois</option>
																		<option value="17">Indiana</option>
																		<option value="18">Iowa</option>
																		<option value="19">Kansas</option>
																		<option value="20">Kentucky</option>
																		<option value="21">Louisiana</option>
																		<option value="22">Maine</option>
																		<option value="23">Maryland</option>
																		<option value="24">Massachusetts</option>
																		<option value="25">Michigan</option>
																		<option value="26">Minnesota</option>
																		<option value="27">Mississippi</option>
																		<option value="28">Missouri</option>
																		<option value="29">Montana</option>
																		<option value="30">Nebraska</option>
																		<option value="31">Nevada</option>
																		<option value="32">New Hampshire</option>
																		<option value="33">New Jersey</option>
																		<option value="34">New Mexico</option>
																		<option value="35">New York</option>
																		<option value="36">North Carolina</option>
																		<option value="37">North Dakota</option>
																		<option value="39">Ohio</option>
																		<option value="40">Oklahoma</option>
																		<option value="41">Oregon</option>
																		<option value="42">Pennsylvania</option>
																		<option value="58">Puerto Rico</option>
																		<option value="44">Rhode Island</option>
																		<option value="45">South Carolina</option>
																		<option value="46">South Dakota</option>
																		<option value="47">Tennessee</option>
																		<option value="48">Texas</option>
																		<option value="59">U.S. Virgin Islands</option>
																		<option value="49">Utah</option>
																		<option value="50">Vermont</option>
																		<option value="51">Virginia</option>
																		<option value="53">Washington</option>
																		<option value="54">West Virginia</option>
																		<option value="55">Wisconsin</option>
																		<option value="56">Wyoming</option>
																</select></td>
															</tr>
															<tr>
																<td><span class="cssClassLabel" id="lblZip">Zip
																		Code:</span> <span class="cssClassRequired">*</span></td>
																<td class="cssClassTableRightCol"><input
																	type="text" class="sfInputbox" id="txtZip" name="zip"
																	placeholder="Zip"></td>
																<td><span class="cssClassLabel" id="lblCountry">Country:</span>
																	<span class="cssClassRequired">*</span></td>
																<td class="cssClassTableRightCol"><select
																	id="ddlCountry" name="country" title="Country"><option
																			value="">Choose Country</option>
																		<option value="1">United States</option>
																</select></td>
															</tr>
															<tr class="rule dashed">
																<td><span class="cssClassLabelTitle" id="lblPhone">Phone</span></td>
																<td class="cssClassTableRightCol"></td>
															</tr>
															<tr>
																<td><span class="cssClassLabel"
																	id="lblOfficeNumber">Office Number:</span></td>
																<td class="cssClassTableRightCol"><input
																	type="text" class="sfInputbox" id="txtOfficeNumber"
																	name="officeNumber" placeholder="Office Number"></td>
																<td><span class="cssClassLabel"
																	id="lblMobileNumber">Mobile Number:</span> <span
																	class="cssClassRequired">*</span></td>
																<td class="cssClassTableRightCol"><input
																	type="text" class="sfInputbox" id="txtMobileNumber"
																	name="mobileNumber" placeholder="Mobile Number"></td>
															</tr>
															<tr>
																<td><span class="cssClassLabel" id="lblHomeNumber">Home
																		Number:</span></td>
																<td class="cssClassTableRightCol"><input
																	type="text" class="sfInputbox" id="txtHomeNumber"
																	name="homeNumber" placeholder="Home Number"></td>
															</tr>
															<tr class="rule dashed">

																<td><span class="cssClassLabelTitle" id="lblEmail">E-mail
																		Address</span></td>
																<td class="cssClassTableRightCol"></td>
															</tr>
															<tr>
																<td><span class="cssClassLabel" id="lblWorkEmail">Work
																		Email:</span> <span class="cssClassRequired">*</span></td>
																<td class="cssClassTableRightCol">
																	<div class="input-group">
																		<div class="input-group-addon">@</div>
																		<input type="email" id="txtWorkEmail"
																			class="sfInputbox" name="workEmail"
																			placeholder="Work Email"> <span
																			class="cssClassRight"> <img
																			class="cssClassSuccessImg sfLocale" height="13"
																			width="18" title="Right" src="" alt="Right" />
																		</span> <span class="cssClassError sfLocale">Work
																			email must be unique with no spaces</span>
																	</div>
																</td>
																<td><span class="cssClassLabel"
																	id="lblPersonalEmail">Personal Email:</span></td>
																<td class="cssClassTableRightCol">
																	<div class="input-group">
																		<div class="input-group-addon">@</div>
																		<input type="email" class="sfInputbox"
																			id="txtPersonalEmail" name="personalEmail"
																			placeholder="Personal Email"><span
																			class="cssClassRight"> <img
																			class="cssClassSuccessImg sfLocale" height="13"
																			width="18" title="Right" src="" alt="Right" />
																		</span> <span class="cssClassError sfLocale">Personal
																			email must be unique with no spaces</span>
																	</div>
																</td>
															</tr>
															<tr>
																<td><span class="cssClassLabel" id="lblActive">Active:</span></td>
																<td class="cssClassTableRightCol"><input
																	type="checkbox" value="" name="chkActive"
																	class="cssClassCheckBox"></td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</tbody>
									</table>
								</div>
								<div class="sfButtonwrapper">
									<p>
										<button title="Go Back" type="button" id="btnBack"
											class="sfBtn">
											<span class="sfLocale icon-arrow-slim-w">Back</span>
										</button>
									</p>
									<p>
										<button title="Reset" type="button" id="btnReset"
											class="sfBtn">
											<span class="sfLocale icon-refresh">Reset</span>
										</button>
									</p>
									<p>
										<input type="submit" value="Save User"  id="btnSaveUser"
											class="sfBtn">
									</p>
								</div>
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
	</form>
</body>
</html>