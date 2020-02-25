<%@page import="java.util.regex.Pattern"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>공지사항</title>		<!-- 윈도우 상단에 뜨는 내용입니다. -->
<link href="<%=request.getContextPath()%>/common/css/common.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/common/css/contents.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/BPNR-HtmlDomObjects.js"></script>
</head>
<body>											<!-- HTML문서의 주 내용이 들어가는 부분입니다. -->
<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>공지사항</span></strong></h1>
		</div>
		
		<div class="list_area">
			<div class="layout">					
			<table>
	 			<colgroup>
					<col width="70px"/>
					<col width="100px"/>
					<col width="120px"/>
				</colgroup>	
		<tr>									
			<th>번호</th>						
			<th>제목</th>						
			<th>작성자</th>
		</tr>
		<c:forEach items="${boardList}" var="article">
			<tr>
				<td class="tc">${article.n_num}</td>
				<td class="tl" onmouseover="DomObject.showTooltip(event);" onmouseout="DomObject.hideTooltip();" tooltip="<c:out value="${article.n_title}"/>"><div style="width:100%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"><nobr><c:out value="${article.n_title}"/></nobr></div></td>
				<td class="tc">${article.n_writer}</td>
			</tr>
		</c:forEach>
	</table> 
	</div>
	</div>
	</div>
	</div>
	<br />
	<div class="btn_area tr">
		<a class="btn" href="<%=request.getContextPath()%>/board/list.do" title="목록"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_list.gif">목록</strong></a>
	</div>
</body>
</html>