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
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/jquery-1.7.1.js"></script>
</head>
<body>
<spring:hasBindErrors name="MemberModel" />
	<form:errors path="MemberModel" />
<form name="loginForm" method="post" onsubmit="return pwCheck();">
<!-- Layout -->
<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>회원정보수정</span></strong></h1>
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
						<th class=""><label for="name">아이디</label></th>
						<td><input type="text" id="a_name" name="a_name" value="${loginstatus.u_id}" readonly></td>
					</tr>
					<tr>
						<th class=""><label for="title">이름</label></th>
						<td><input type="text" id="a_title" name="a_title" value="${loginstatus.u_name}" readonly></td>
					</tr>
						<tr>
						<th class=""><label for="u_pw">비밀번호</label></th>
						<td>
							<input type="password" id="u_pw" name="u_pw" class="loginInput" value="${loginstatus.u_pw}"/>
						</td>
					</tr>
					<tr>
						<th class=""><label for="u_pw_check">비밀번호 확인</label></th>
						<td><input type="password" id="u_pw_check" name="u_pw_check" class="loginInput"/><br /></td>
					</tr>
					<tr>
						<td colspan="2" class="tr">
							<input type="submit" value="확인">
							<a class="btn" href="artboard/artList.do" title="취소"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_list.gif">목록</strong></a>
						</td>
					</tr>
				</table>
			</div>
			</div>
		</div>
	</div>
</form>
</body>
<script>
function pwCheck(){
	var obj = document.loginForm;
	var pwnum = getObjectLength(document.loginForm.u_pw.value);
	if (pwnum <= 5) {
		alert("비밀번호의 값은 최소 6자 이상입니다.");
		document.forms[0].u_pw.focus();
		return false;
	}

	else if (pwnum > 12){
		alert("비밀번호의 값은 최대 12자 입니다.");
		document.forms[0].u_pw.focus();
		return false;
	}
	else if($("#u_pw").val() != $("#u_pw_check").val()){
		alert("패스워드 입력이 일치하지 않습니다");
		$("#u_pw_check").focus();
		return false;
	} else {

		return true;
		obj.action="loginmodify.do";
	}
}

function getObjectLength(obj) {
	var p = 0;
	var len = 0;
	for (p = 0; p < obj.length; p++) {
		(obj.charCodeAt(p) > 255) ? len += 2 : len++; // 한글체크
	}
	return len;
}

</script>
</html>
