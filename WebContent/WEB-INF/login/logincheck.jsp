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
				alert("���̵� ��Ȯ�� �Է����ּ���!");
				break;
			case 2:
				alert("����� �� ���� ���̵� �Դϴ�!");
				break;
			case 3:
				alert("ȸ������ ó���� �Ϸ�Ǿ����ϴ�! �α��� �� �ּ���!");
				location.href = "<%=request.getContextPath()%>/login.do";
				break;		
			}
		}
	}
</script>
</html>