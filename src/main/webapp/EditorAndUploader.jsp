<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="gpms.utils.ConfigurationHelper"%>
<%@ taglib uri="http://ckeditor.com" prefix="ckeditor"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript"
	src="js/ckeditor_4.5.1_full/ckeditor/ckeditor.js"></script>
<script type="text/javascript"
	src="js/ckeditor_4.5.1_full/ckeditor/adapters/jquery.js"></script>
</head>
<body>
	<form action="sample_posteddata.jsp" method="get">
		<p>
			<label for="editor1">Editor 1:</label>
			<textarea cols="80" id="editor1" name="editor1" rows="10"></textarea>
		</p>
		<p>
			<input type="submit" value="Submit" />
		</p>
	</form>
	<!-- 	Tutorial here : http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Java/Integration -->
	<ckeditor:replace replace="editor1" basePath="/ckeditor/" />

	<%-- <ckeditor:replace replace="editor1" basePath="ckeditor/"
		config="<%=ConfigurationHelper.createConfig()%>"
		events="<%=ConfigurationHelper.createEventHandlers()%>" /> --%>
</body>
</html>