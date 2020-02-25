<%@page import="java.util.regex.Pattern"%>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="<%=request.getContextPath()%>/common/css/common.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/common/css/contents.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/BPNR-HtmlDomObjects.js"></script>
</head>
<body>
<form method="post">
<!-- Layout -->
<div class="wrap">
	<div class="layout">
		<table border="1"  style="float:center;">
		<colgroup>
			<col width="100%"/>
			<col/>
		</colgroup>
			<tr>
				<td>아이디는${searchIdList.u_id}입니다.</td>
			</tr>
			<tr>
				<td colspan="2" class="tr">
					<input type="button" value="비밀번호 찾기" onclick="moveAction2();" >
					<input type="button" value="닫기" onclick="moveAction();" />
				</td>
			</tr>
		</table>
	</div>
	</div>
</form>
</body>
<script type="text/javascript">
function moveAction(){
	window.open('about:blank', '_self').close();
}
function moveAction2(){
	location.href = "searchpw.do";
}

</script>
</html>