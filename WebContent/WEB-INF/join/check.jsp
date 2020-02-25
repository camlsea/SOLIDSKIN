<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<form id="checker" name="checker" action="join.do">
</form>
<script type="text/javascript">

window.onload = function(){
	
	alert("사용할 수 없는 아이디 입니다.");
	check();
}

function check(){
	var obj = document.checker;
	obj.action = "join.do";
	obj.submit();
}
</script>
</body>
</html>