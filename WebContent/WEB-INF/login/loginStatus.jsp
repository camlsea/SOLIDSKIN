<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="java.util.regex.Pattern"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="java.sql.*" %>
<%@ page import="com.ojt.artboard.model.ArtBoardBeans" %>
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
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>회원정보</span></strong></h1>
		</div>

		<!-- Input Area -->
		<div class="view_area">
			<div class="layout">
				<table style="float:left;">
					<colgroup>
						<col width="100%"/>
						<col  />
					</colgroup>
					</table>
					<table border="1"  style="float:right;">
					<colgroup>
						<col width="120px"/>
						<col  />
					</colgroup>
					<tr>
						<th class=""><label for="a_idx">아이디</label></th>
						<td>${loginstatus.u_id}</td>
					</tr>
					<tr>
						<th class=""><label for="a_idx">이름</label></th>
						<td>${loginstatus.u_name}</td>
					</tr>
					<tr>
						<th class=""><label for="a_tyep">이메일</label></th>
						<td>${loginstatus.u_email}</td>
					</tr>
					<tr>
						<td colspan="2" class="tr">
							<a class="btn" href="loginmodify.do?u_id=${loginstatus.u_id}" title="수정"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_edit.gif">수정</strong></a>
							<a class="btn" href="artboard/artList.do" title="목록"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_list.gif">목록</strong></a>
						</td>
					</tr>
				</table>
			</div>
			</div>
		</div>
	</div>
</form>
</body>
</html>
