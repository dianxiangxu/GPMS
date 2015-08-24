<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script src="js/jQuery/jquery-1.9.1.js" type="text/javascript"></script>

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
	var gpmsRootPath = "/";
	var userProfileId = "1";
	var sessionCode = "jxr30wycjzvpqd0jv3vkybx4";
	var clientIPAddress = "::1";
	var gpmsCountryName = "RESERVED";
	var gpmsRedirectPath = "/";

	var logInURL = "login";
	var pageExtension = ".jsp";

	var maxFileSize = "1024";
	//]]>
</script>

<script type="text/javascript"
	src="js/jquery-ui-1.8.14.custom/js/jquery-ui-1.10.3.custom.min.js"></script>

<script type="text/javascript" src="js/core/gpmscore.js"></script>

<script type="text/javascript"
	src="js/FormValidation/jquery.form-validation-and-hints.js"></script>

<!-- <script type="text/javascript" src="js/SystemLocale/systemlocale.js"></script> -->
<script type="text/javascript"
	src="js/modules/Language/CoreJsLanguage.js"></script>

<script type="text/javascript" src="js/core/json2.js"></script>

<script type="text/javascript" src="js/jquery-browser.js"></script>
<script type="text/javascript" src="js/jquery.uniform.js"></script>

<script type="text/javascript" src="js/MessageBox/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/MessageBox/alertbox.js"></script>

<script type="text/javascript" src="js/AjaxFileUploader/ajaxupload.js"></script>


<!-- <script type="text/javascript" src="js/core/Session.js"></script> -->
<script type="text/javascript" src="js/core/encoder.js"></script>

<script type="text/javascript" src="js/modules/BrandManage.js"></script>
<script type="text/javascript" src="js/modules/Language/Brand.js"></script>

<link type="text/css" rel="stylesheet"
	href="js/jquery-ui-1.8.14.custom/css/redmond/jquery-ui-1.8.16.custom.css" />
<link type="text/css" rel="stylesheet" href="css/GridView/tablesort.css" />
<link type="text/css" rel="stylesheet" href="css/MessageBox/style.css" />

<link type="text/css" rel="stylesheet" href="css/Templates/grid.css" />
<link type="text/css" rel="stylesheet"
	href="css/Templates/topstickybar.css" />
<link type="text/css" rel="stylesheet" href="css/Templates/admin.css" />
</head>
<body>
	<form enctype="multipart/form-data" action="Manage-Attributes.aspx"
		method="post" name="form1">
		<table id="tblEditBrandManage" border="0"
			class="cssClassPadding tdpadding" width="100%">
			<tr id="image">
				<td><span>Upload Brand Image</span></td>
				<td class="cssClassTableRightCol"><input id="txtBrandImageUrl"
					class="cssClassBrowse" type="file" /></td>
			</tr>
			<tr>
				<td>
					<div id="divBrandImage"></div>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>