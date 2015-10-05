<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"> -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta
	content="Your account is on its way. Filling a form takes a minute. Enjoying lasts for weeks."
	name="DESCRIPTION">
<meta content="Sign up, try for free - GPMS" name="KEYWORDS">
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
<title>Sign up, try for free - GPMS</title>

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
	var userProfileId = "560ed83daf6e040da04e60f2";
	var sessionCode = "jxr30wycjzvpqd0jv3vkybx4";
	var clientIPAddress = "::1";
	var gpmsCountryName = "RESERVED";
	var gpmsRedirectPath = "/";

	var logInURL = "login";
	var pageExtension = ".jsp";

	$(function() {
		$(".sfLocale").localize({
			moduleKey : gpmsSignUp
		});
	});
	//]]>
</script>

<script type="text/javascript" src="js/core/gpmscore.js"></script>

<script type="text/javascript"
	src="js/FormValidation/jquery.form-validation-and-hints.js"></script>
<script type="text/javascript"
	src="js/FormValidation/jquery.validate.js"></script>
<script type="text/javascript"
	src="js/FormValidation/jquery.ui.datepicker.validation.js"></script>

<script type="text/javascript"
	src="js/FormValidation/jquery.maskedinput.js"></script>

<script type="text/javascript"
	src="js/modules/Language/CoreJsLanguage.js"></script>

<script type="text/javascript" src="js/core/json2.js"></script>

<script type="text/javascript" src="js/jquery-browser.js"></script>
<script type="text/javascript" src="js/jquery.uniform.js"></script>

<script type="text/javascript" src="js/jquery.qtip-1.0.0-rc3.js"></script>

<script type="text/javascript" src="js/MessageBox/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/MessageBox/alertbox.js"></script>

<!-- <script type="text/javascript" src="js/core/Session.js"></script> -->
<script type="text/javascript" src="js/core/encoder.js"></script>

<script type="text/javascript" src="js/modules/SignUp.js"></script>
<script type="text/javascript" src="js/modules/Language/GPMSSignUp.js"></script>

<link media="screen" rel="stylesheet"
	href="css/Templates/application.css" type="text/css" />

</head>
<body class="account" data-page="signup">
	<div style="display: none;" id="UpdateProgress1">
		<div class="sfLoadingbg">&nbsp;</div>
		<div class="sfLoadingdiv">
			<img id="imgProgress" src="images/ajax-loader.gif"
				style="border-width: 0px;" alt="Loading..." title="Loading..." /> <br>
			<span id="lblPrgress">Please wait...</span>
		</div>
	</div>
	<noscript>
		<span>This page requires java-script to be enabled. Please
			adjust your browser-settings.</span>
	</noscript>
	<div class="account__header">
		<a href="#"><img alt="GPMS" title="GPMS" class="account__logo"
			src="images/logo.png"> </a>
		<nav class="account__nav"> Already have an account? <a class="a"
			href="Login.jsp">Log in</a> </nav>
	</div>
	<div class="account__title">
		<h1 class="account__headline h h--1">Your account is on its way.
		</h1>
		<div class="sh account-header__subheadline sh--1">Filling a form
			takes a minute. Enjoying GPMS lasts for weeks.</div>
	</div>
	<div class="row">
		<div
			class="row__col row__col--xl-6 row__col--l-7 row__col--m-8 row__col--xl-centered row__col--l-centered row__col--m-centered">
			<div class="account__box box">
				<form enctype="multipart/form-data" accept-charset="UTF-8"
					action="SignUp.jsp" class="account__form form" data-form="signup"
					method="post" name="form1" id="form1">
					<input class="form__input input is-hidden" data-form-plan=""
						name="user[subscription_plan_code]" value="starter">
					<div class="form__item">
						<label class="form__label label" for="firstname"> First
							name
							<div class="label__description" data-form-label-description="">
								So that we know how to say hello</div>
						</label> <input class="form__input input" data-form-input=""
							id="firstname" name="user[first_name]" required=""
							aria-required="true">
					</div>
					<div class="form__item">
						<label class="form__label label" for="lastname"> Last name
							<div class="label__description" data-form-label-description="">
								So that we know how to say hello</div>
						</label> <input class="form__input input" data-form-input="" id="lastname"
							name="user[last_name]" required="" aria-required="true">
					</div>
					<div class="form__item">
						<label class="form__label label" for="organization">
							Company
							<div class="label__description" data-form-label-description="">
								Every account belongs to a company</div>
						</label> <input class="form__input input" data-form-input=""
							id="organization" name="user[organization_name]" required=""
							aria-required="true">
					</div>
					<div class="form__item">
						<label class="form__label label" for="email"> Email
							<div class="label__description" data-form-label-description="">
								No spam, only relevant updates</div>
						</label> <input class="form__input input" data-form-input="" id="email"
							name="user[email]" required="" type="email" aria-required="true">
					</div>
					<div class="form__item">
						<label class="form__label label" for="password"> Password
							<div class="label__description" data-form-label-description="">
								At least 6 characters, please</div>
						</label> <input class="form__input input" data-form-input="" id="password"
							minlength="6" name="user[password]" required="" type="password"
							aria-required="true">
					</div>

					<div class="sfFormwrapper">
						<table cellspacing="0" cellpadding="0" border="0">
							<tbody>
								<tr class="rule dashed">
									<td colspan="4"><span id="lblLogin"
										class="cssClassLabelTitle">User Login Information</span></td>
								</tr>
								<tr>
									<td><span class="cssClassLabel" id="lblUserName">User
											Name:</span> <span class="cssClassRequired">*</span></td>
									<td class="cssClassTableRightCol"><input title="User Name"
										class="sfInputbox" id="txtUserName" name="username"
										placeholder="User Name" type="text"> <span
										style="display: none;" class="cssClassRight"> <img
											src="http://localhost:8181/GPMS//images/right.jpg"
											class="cssClassSuccessImg sfLocale" alt="Right" title="Right"
											height="13" width="18">
									</span> <span style="display: none;" class="cssClassError sfLocale">Username
											must be unique with no spaces</span></td>
								</tr>
								<tr>
									<td><span class="cssClassLabel" id="lblPassword">Password:</span>
										<span class="cssClassRequired">*</span></td>
									<td class="cssClassTableRightCol"><input title="Password"
										class="sfInputbox" id="txtPassword" name="password"
										placeholder="Password" type="password"></td>
								</tr>
								<tr>
									<td><span class="cssClassLabel" id="lblConfirmPassword">Confirm
											Password:</span> <span class="cssClassRequired">*</span></td>
									<td class="cssClassTableRightCol"><input
										title="Confirm Password" class="sfInputbox"
										id="txtConfirmPassword" name="confirm_password"
										placeholder="Password (Again)" type="password"></td>
								</tr>

								<tr class="rule dashed">
									<td colspan="4"><span id="lblName"
										class="cssClassLabelTitle">User Information</span></td>
								</tr>
								<tr>
									<td><span id="lblUserName" class="cssClassLabel">First
											Name:</span> <span class="cssClassRequired">*</span></td>
									<td class="cssClassTableRightCol"><input type="text"
										placeholder="First Name" name="firstName" id="txtFirstName"
										class="sfInputbox" title="First Name"></td>
									<td><span id="lblMiddleName" class="cssClassLabel">Middle
											Name:</span></td>
									<td class="cssClassTableRightCol"><input type="text"
										placeholder="Middle Name" name="middleName" id="txtMiddleName"
										class="sfInputbox" title="Middle Name"></td>
								</tr>
								<tr>
									<td><span class="cssClassLabel" id="lblLastName">Last
											Name:</span> <span class="cssClassRequired">*</span></td>
									<td colspan="3" class="cssClassTableRightCol"><input
										type="text" placeholder="Last Name" name="lastName"
										class="sfInputbox" id="txtLastName" title="Last Name"></td>
								</tr>
								<tr>
									<td><span class="cssClassLabel" id="lblDOB">Date of
											Birth:</span> <span class="cssClassRequired">*</span></td>
									<td class="cssClassTableRightCol"><input type="text"
										placeholder="Date of Birth" name="dob"
										class="sfInputbox hasDatepicker" id="txtDOB"
										title="Date of Birth"></td>
									<td><span class="cssClassLabel" id="lblGender">Gender:</span>
										<span class="cssClassRequired">*</span></td>
									<td class="cssClassTableRightCol"><select name="gender"
										id="ddlGender" title="Choose Gender">
											<option value="">Choose Gender</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
									</select></td>
								</tr>
								<tr class="rule dashed">
									<td colspan="4"><span class="cssClassLabelTitle"
										id="lblAddress">Current Address</span></td>
								</tr>

								<tr>
									<td><span id="lblStreet" class="cssClassLabel">Street:</span>
										<span class="cssClassRequired">*</span></td>
									<td class="cssClassTableRightCol"><input type="text"
										placeholder="Street" name="street" id="txtStreet"
										class="sfInputbox" title="Street"></td>
									<td><span id="lblApt" class="cssClassLabel">Apt.,
											Suit, Floor, etc:</span></td>
									<td class="cssClassTableRightCol"><input type="text"
										placeholder="Apt., Suite, Floor, etc. (optional)" name="apt"
										id="txtApt" class="sfInputbox"
										title="Apt., Suit, Floor, etc. (optional)"></td>
								</tr>
								<tr>
									<td><span id="lblCity" class="cssClassLabel">City:</span>
										<span class="cssClassRequired">*</span></td>
									<td class="cssClassTableRightCol"><input type="text"
										placeholder="City" name="city" id="txtCity" class="sfInputbox"
										title="City"></td>
									<td><span id="lblState" class="cssClassLabel">State:</span>
										<span class="cssClassRequired">*</span></td>
									<td class="cssClassTableRightCol"><select name="state"
										id="ddlState" title="Choose State"><option value="">Choose
												State</option>
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
									<td><span id="lblZip" class="cssClassLabel">Zip
											Code:</span> <span class="cssClassRequired">*</span></td>
									<td class="cssClassTableRightCol"><input type="text"
										placeholder="Zip" name="zip" id="txtZip" class="sfInputbox"
										title="Zip"></td>
									<td><span id="lblCountry" class="cssClassLabel">Country:</span>
										<span class="cssClassRequired">*</span></td>
									<td class="cssClassTableRightCol"><select name="country"
										id="ddlCountry" title="Choose Country"><option
												value="">Choose Country</option>
											<option value="1">United States</option>
									</select></td>
								</tr>
								<tr class="rule dashed">
									<td colspan="4"><span id="lblPhone"
										class="cssClassLabelTitle">Phone</span></td>
								</tr>
								<tr>
									<td><span id="lblOfficeNumber" class="cssClassLabel">Office
											Number:</span></td>
									<td class="cssClassTableRightCol"><input type="text"
										placeholder="Office Number" name="officeNumber"
										id="txtOfficeNumber" class="sfInputbox" title="Office Number"></td>
									<td><span id="lblMobileNumber" class="cssClassLabel">Mobile
											Number:</span> <span class="cssClassRequired">*</span></td>
									<td class="cssClassTableRightCol"><input type="text"
										placeholder="Mobile Number" name="mobileNumber"
										id="txtMobileNumber" class="sfInputbox" title="Mobile Number"></td>
								</tr>
								<tr>
									<td><span id="lblHomeNumber" class="cssClassLabel">Home
											Number:</span></td>
									<td class="cssClassTableRightCol"><input type="text"
										placeholder="Home Number" name="homeNumber" id="txtHomeNumber"
										class="sfInputbox" title="Home Number"></td>
									<td><span id="lblOtherNumber" class="cssClassLabel">Other:</span></td>
									<td class="cssClassTableRightCol"><input type="text"
										placeholder="Other Number" name="otherNumber"
										id="txtOtherNumber" class="sfInputbox" title="Other"></td>
								</tr>
								<tr class="rule dashed">
									<td colspan="4"><span id="lblEmail"
										class="cssClassLabelTitle">E-mail Address</span></td>
								</tr>
								<tr>
									<td><span id="lblWorkEmail" class="cssClassLabel">Work
											Email:</span> <span class="cssClassRequired">*</span></td>
									<td class="cssClassTableRightCol">
										<div class="input-group">
											<div class="input-group-addon">@</div>
											<input type="email" placeholder="Work Email" name="workEmail"
												style="width: 160px;" class="sfInputbox" id="txtWorkEmail"
												title="Work Email"> <span class="cssClassRight"
												style="display: none;"> <img width="18" height="13"
												title="Right" alt="Right"
												class="cssClassSuccessImg sfLocale"
												src="http://localhost:8181/GPMS//images/right.jpg">
											</span> <span class="cssClassError sfLocale" style="display: none;">Work
												email must be unique with no spaces</span>
										</div>
									</td>
									<td><span id="lblPersonalEmail" class="cssClassLabel">Personal
											Email:</span></td>
									<td class="cssClassTableRightCol">
										<div class="input-group">
											<div class="input-group-addon">@</div>
											<input type="email" placeholder="Personal Email"
												name="personalEmail" id="txtPersonalEmail"
												style="width: 160px;" class="sfInputbox"
												title="Personal Email"><span class="cssClassRight"
												style="display: none;"> <img width="18" height="13"
												title="Right" alt="Right"
												class="cssClassSuccessImg sfLocale"
												src="http://localhost:8181/GPMS/images/right.jpg">
											</span> <span class="cssClassError sfLocale" style="display: none;">Personal
												email must be unique with no spaces</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>

						<table width="100%" cellspacing="0" cellpadding="0" border="0"
							id="dataTable">
							<thead>
								<tr>
									<th><span class="cssClassLabel">College:</span> <span
										class="cssClassRequired">*</span></th>
									<th><span class="cssClassLabel">Department:</span> <span
										class="cssClassRequired">*</span></th>
									<th><span class="cssClassLabel">Position Type:</span> <span
										class="cssClassRequired">*</span></th>
									<th><span class="cssClassLabel">Position Title:</span> <span
										class="cssClassRequired">*</span></th>

									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><select name="ddlCollege" class="sfListmenu"
										title="Choose College Name">
									</select></td>
									<td><select name="ddlDepartment" class="sfListmenu"
										title="Choose Department Name">
									</select></td>
									<td><select name="ddlPositionType" class="sfListmenu"
										title="Choose Position Type">
									</select></td>
									<td><select name="ddlPositionTitle" class="sfListmenu"
										title="Choose Position Title">
									</select></td>
									<td><input type="Button"
										class="AddOption cssClassButtonSubmit sfLocale" name="AddMore"
										value="[+] Add"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<input class="btn btn--large btn--expanded btn--blue"
						data-form-submit="" type="submit" value="Sign up">
				</form>
				<!-- 				<div class="account__buttons"> -->
				<!-- 					<div class="account__divider uppercase"> -->
				<!-- 						<div class="account__divider-text">Or sign up with</div> -->
				<!-- 					</div> -->
				<!-- 					<div class="row row--lessgutter"> -->
				<!-- 						<div class="row__col row__col--m-6"> -->
				<!-- 							<a -->
				<!-- 								class="account__social btn btn--small btn--expanded btn--icon btn--github" -->
				<!-- 								data-track="Sent Valid Signup" data-track-category="Sign Up" -->
				<!-- 								data-track-label="Github" href="account/profile/auth/github">Github -->
				<!-- 							</a> -->
				<!-- 						</div> -->
				<!-- 						<div class="row__col row__col--m-6"> -->
				<!-- 							<a class="btn btn--small btn--expanded btn--icon btn--google" -->
				<!-- 								data-track="Sent Valid Signup" data-track-category="Sign Up" -->
				<!-- 								data-track-label="Google" -->
				<!-- 								href="account/profile/auth/google_oauth2">Google </a> -->
				<!-- 						</div> -->
				<!-- 					</div> -->
				<!-- 				</div> -->
			</div>
			<div class="account__meta">
				By signing up you agree to our <br> <a class="a"
					href="TermsAndService.jsp">Terms of Service</a> and <a class="a"
					href="PrivacyPolicy.jsp">Privacy Policy</a>
			</div>
		</div>
	</div>
</body>
</html>