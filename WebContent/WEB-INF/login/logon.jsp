<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="java.util.regex.Pattern"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="java.sql.*" %>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="<%=request.getContextPath()%>/common/css/common.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/common/css/contents.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/BPNR-HtmlDomObjects.js"></script>
</head>
<body>
<form>
<!-- Layout -->
<div class="wrap">
	<div class="layout">
		<div class="view_area">
			<div class="layout">
					<table border="1"  style="float:right;">
					<tr>
						<th class=""><label for="u_id">아이디</label></th>
						<td>${loginstatus.u_id}</td>
					</tr>
					<tr>
						<th class=""><label for="a_lasttime">최종접속시간</label></th>
						<td>${lastTimeAccessF}</td>
					</tr>
				</table>
			</div>
			</div>
		</div>
	</div>
</form>
</body>
</html>
