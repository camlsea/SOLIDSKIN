<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>로그인</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Login</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="<%=request.getContextPath()%>/common/css/common.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/common/css/contents.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/BPNR-HtmlDomObjects.js"></script>
<c:if test="${errCode == null}">
	<c:set var="errCode" value="\"\""></c:set>
</c:if>
</head>
<body onload="checkErrCode()">
	<spring:hasBindErrors name="LoginModel" />
<form:errors path="LoginModel" />
<form id="loginGo" name="loginGo" action="login.do" method="post">
<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>로그인</span></strong></h1>
		</div>
			<!-- Input Area -->
		<div class="input_area">
			<div class="layout">
				<table>
					<colgroup>
						<col width="120px"/>
						<col/>
					</colgrou>
				<tr>
					<th class=""><label for="u_id">아이디</label></th>
						<td>
							<input type="text" id="u_id" name="u_id" class="loginInput" />
							<span class="error"><form:errors path="MemberModel.u_id" /></span><br />
						</td>
				</tr>
				<tr>
					<th class=""><label for="u_id">비밀번호</label></th>
						<td>
							<input type="password" id="u_pw" name="u_pw" class="loginInput"/>
							<span class="error"><form:errors path="LoginModel.u_pw" /></span><br /><br />
						</td>
				</tr>
			</table>
		</div>
		</div>
		</div>
		<div class="btn_area tr">
		<center>
			<input type="submit" value="로그인" class="submitBt"/>
			<input type="button" value="회원가입" onclick="moveAction();" />
			<input type="button" value="아이디찾기" onclick="moveAction2();" />
		</center>
		</div>
	</div>
	</form>
</body>
<script type="text/javascript">
	function checkErrCode(){
		var errCode = ${errCode};
		if(errCode != null || errCode != ""){
			switch (errCode) {
			case 1:
				alert("아이디를 정확히 입력해주세요!");
				break;
			case 2:
				alert("사용할 수 없는 아이디 입니다!");
				break;
			case 3:
				alert("회원가입 처리가 완료되었습니다! 로그인 해 주세요!");
				location.href = "<%=request.getContextPath()%>/login.do";
				break;		
			}
		}
	}
	
	function moveAction(){
		
		location.href = "member/join.do";
		
	}
	function moveAction2(){
		
		//location.href = "searchid.do";
		
		window.open('searchid.do','','toolbar=yes,location=no,status=yes,menubar=yes,scroll bars=yes,resizable=yes,width=400,height=300,top=100,left =100');
	}
	

</script>
</html>