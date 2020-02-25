<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>회원가입</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="<%=request.getContextPath()%>/common/css/common.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/common/css/contents.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/BPNR-HtmlDomObjects.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/jquery-1.7.1.js"></script>
<c:if test="${errCode == null}">
	<c:set var="errCode" value="\"\""></c:set>
</c:if>
</head>
<script type="text/javascript">
window.onload = function(){
	document.body.className = "prtlBody urFontBaseFam urScrl body_bg";
}
var xhr = null;

function getXMLHttpRequest() {
    if (window.ActiveXObject) {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");//IE 상위 버젼
        } catch (e1) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");//IE 하위 버젼
            } catch (e2) {
                return null;
            }
        }
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();//IE 이외의 브라우저(FireFox 등)
    } else {
        return null;
    }
}// XMLHttpRequest 객체 얻기


function memcheckAjax(objId) {
	
	var onlyen = document.memForm.u_id.value;
	var onvalue = onlyen.value;
	var idnum = getObjectLength(objId.value);	
	if (idnum <= 3){
        document.getElementById("message").innerHTML = "아이디의 값은 최소4자 이상입니다.";//보여주기	
		return;
	}
	else if (idnum > 12){
		document.getElementById("message").innerHTML = "아이디의 값은 최대 12자 입니다.";//보여주기	
		return;
	}
	if ((onlyen.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/) != -1)) {
		document.getElementById("message").innerHTML = "한글은 입력 할 수 없습니다..";//보여주기
		return;
	}

    var params = "?u_id=" + objId.value;

    //param = f.name.value;
    //URL = "idcheck.do" + "?name=" + encodeURIComponent(param);//한글 처리
    URL = "idcheck.do" + params;
    xhr = getXMLHttpRequest();//XMLHttpRequest 객체 얻기
    xhr.onreadystatechange = responseCheckId;//콜백 함수  등록
    xhr.open("POST", URL, true);//연결
    xhr.send(null);//전송
}


function responseCheckId() {
	
    if (xhr.readyState == 4) {//완료
        if (xhr.status == 200) {//오류없이 OK
            var str = xhr.responseText;//서버에서 보낸 내용 받기
            var message = "";
            if (str == "1") {
            	message = "이미 가입된 아이디 입니다!";
            } else if (str == "2") {
            	message = "사용가능한 아이디 입니다";
            }
            document.getElementById("message").innerHTML = message;//보여주기	
        } else {
            alert("Fail : " + httpRequest.status);
        }
    }
}// 응답

</script>
<body>
<spring:hasBindErrors name="MemberModel" />
	<form:errors path="MemberModel" />
	<!-- form name="ckeckForm" method="post">
			<label for="u_id">&nbsp;아이디 : </label>
			<input type="text" id="u_id" name="u_id" class="loginInput"/>
			<input type="button" value="중복확인" name="u_id" onclick="memcheck();"/>
			<span class="error"><form:errors path="MemberModel.u_id" /></span><br />
			<input type="hidden" id="u_id" name="u_id" class="loginInput"/>
	</form-->
<form name="memForm" method="post" onsubmit="return pwCheck();">
<input type="hidden" id="u_id_gubun" name="u_id_gubun">
<!-- Layout -->
<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>회원가입</span></strong></h1>
		</div>
		<!-- Input Area -->
		<div class="input_area">
			<div class="layout">
				<table>
					<colgroup>
						<col width="120px"/>
						<col  />
					</colgrou>
					<tr>
						<th class=""><label for="u_id">아이디</label></th>
						<td>
							<input type="text" id="u_id" name="u_id" class="loginInput" value="${u_id }" onkeyup="javascript:memcheckAjax(this);"/>
								<div id="message"></div>
							<span class="error"><form:errors path="MemberModel.u_id" /></span><br />
						</td>
					</tr>
					<tr>
						<th class=""><label for="u_pw">비밀번호</label></th>
						<td>
							<input type="password" id="u_pw" name="u_pw"  class="loginInput"/>
							<span class="error"><form:errors path="MemberModel.u_pw" /></span><br />
						</td>
					</tr>
					<tr>
						<th class=""><label for="u_pw_check">비밀번호 확인</label></th>
						<td><input type="password" id="u_pw_check" name="u_pw_check" class="loginInput"/><br /></td>
					</tr>
					<tr>
						<th class=""><label for="u_name">이름</label></th>
						<td>
							<input type="text" id="u_name" name="u_name" class="loginInput"/>
							<span class="error"><form:errors path="MemberModel.u_name" /></span><br /><br />
						</td>
					</tr>
					<tr>
						<th class=""><label for="u_email">이메일</label></th>
						<td>
							<input type="text" id="u_email" name="u_email" class="loginInput"/>
							<span class="error"><form:errors path="MemberModel.u_email" /></span><br /><br />
						</td>
					</tr>
				</table>       
			</div>
		</div>

		<!-- Button -->
		
		<div class="btn_area tr">
			<input type="submit" value="확인">
			<input type="reset" value="재작성"/>
			<input type="button" value="취소" onclick="moveAction();" />
		</div>
		
		
	</div>
</div>
</form>
</body>
<script> 
window.onload = function(){
	document.body.className = "prtlBody urFontBaseFam urScrl body_bg";
}
function pwCheck(){
	var obj        = document.memForm;
	var pwnum 	   = getObjectLength(obj.u_pw.value);
	var u_id   	   = obj.u_id.value;
	var u_name     = obj.u_name.value;
	var u_email    = obj.u_email.value;
	
	if(check(trim(u_id))){
		alert("아이디를 입력해주세요");
		$("#u_id").focus(); //커서를 타이틀로 옮겨줌
		return false;
	}
	if (pwnum <= 5) {
		alert("비밀번호의 값은 최소 6자 이상입니다.");
		$("#u_pw").focus();
		return false;
	}
	else if (pwnum > 12){
		alert("비밀번호의 값은 최대 12자 입니다.");
		$("#u_pw").focus();
		return false;
	}
	else if($("#u_pw").val() != $("#u_pw_check").val()){
		alert("패스워드 입력이 일치하지 않습니다");
		$("#u_pw_check").focus();
		return false;
	}
	if(check(trim(u_name))){
		alert("이름을 입력해주세요");
		$("#u_name").focus(); //커서를 타이틀로 옮겨줌
		return false;
	}
	if(check(trim(u_email))){
		alert("이메일을 입력해주세요");
		$("#u_email").focus(); //커서를 타이틀로 옮겨줌
		return false;
	}else if(u_email.match(/^(\w+)@(\w+)[.](\w+)$/ig) == null){
		alert('이메일 형식으로 입력하세요');  
		$("#u_email").focus();                       
		return false;
	}else {

		return true;
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

function check(val){
	if (val == null || val == ""){ return true;} else {return false;}
}
	
function trim(str){
		 return String(str).replace(/^\s+|\s+$/g, "");
}

function moveAction(){
	
	location.href = "<%=request.getContextPath()%>/board/list.do";
	
}
</script>
</html>