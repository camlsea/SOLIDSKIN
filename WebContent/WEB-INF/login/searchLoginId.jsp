<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
<form name="loginForm" action="searchidpro.do" method="post" onsubmit="return pwCheck();">
<input type="hidden" id="idx" name="idx" value="${idx}">
<!-- Layout -->
<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>아이디찾기</span></strong></h1>
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
						<th class=""><label for="u_email">E-mail</label></th>
						<td><input type="text" id="u_email" name="u_email"></td>
					</tr>
					<tr>
						<th class=""><label for="u_name">이름</label></th>
						<td><input type="text" id="u_name" name="u_name"></td>
					</tr>
					<tr>
						<td colspan="2" class="tr">
							<input type="submit" value="확인" >
							<input type="button" value="닫기" onclick="moveAction();" />
						</td>
					</tr>
				</table>
			</div>
			</div>
		</div>
	</div>
</form>
</body>
<script type="text/javascript">
function pwCheck(){
	
	var u_email      = document.forms[0].u_email.value;
	var u_name    	 = document.forms[0].u_name.value;
	if(u_email==null||u_email=="" ){
		alert("이메일을 입력해주세요");
		document.forms[0].u_email.focus(); //커서를 타이틀로 옮겨줌
		return false;
	}
	if(u_name==null||u_name=="" ){
		alert("이름을 입력해주세요");
		document.forms[0].u_name.focus(); //커서를 타이틀로 옮겨줌
		return false;
	}else {

		return true;
	}
}
function moveAction(){
	window.open('about:blank', '_self').close();
}

</script>
</html>
