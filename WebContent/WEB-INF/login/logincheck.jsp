<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body onload="checkErrCode()">

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
</script>
</html>