<%--
 Copyright 2010 Blue Lotus Software, LLC.
 Copyright 2010 John Yeary.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 under the License.
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Apache Commons File Upload Example 5</title>
    </head>
    <body>
        <h1>Apache Commons File Upload Example 5</h1>
        <p>
            This example uploads a single file.
        </p>
        <form id="form1" enctype="multipart/form-data" method="post" action="FileUploadServlet">
            <input type="file" name="file1"/>
            <input type="submit" value="Submit"/>
        </form>
    </body>
</html>
