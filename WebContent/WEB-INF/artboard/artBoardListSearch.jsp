<%@page import="java.util.regex.Pattern"%>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ page import="java.sql.*" %>	
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.ojt.artboard.model.ArtBoardBeans" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="<%=request.getContextPath()%>/common/css/common.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/common/css/contents.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/BPNR-HtmlDomObjects.js"></script>
<head>
</head>
<body>
<!-- Button -->
		<div class="btn_area tr">
		<a href="<%=request.getContextPath()%>/logout.do">로그아웃</a>
		<a href="<%=request.getContextPath()%>/loginstatus.do?u_id=${u_id}">회원정보</a>
		<a href="<%=request.getContextPath()%>/logon.do?u_id=${u_id}">상태</a>
		</div>
<div class="btn_area tr">
	<c:if test="${u_id_gubun =='0' }">
		<a class="btn" href="artWrite.do"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_report2.gif">등록</strong></a>
	</c:if>
</div>
<!-- Layout -->
<form action="artList.do" target="ifrm" method="post">
<input type="hidden" id="idx" name="idx" value="${board.a_idx }">
<input type="hidden" id="u_id" name="u_id" value="${u_id }">
<input type="hidden" id="a_idx" name="a_idx" value="${board.rnum }">
<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span> 서양예술</span></strong></h1>	
		</div>
<!-- Input Area -->
		<div class="input_area">
			<div class="layout">
				<table>
					<colgroup>
						<col width="92px" />
						<col width="200px" />
						<col />
					</colgroup>
					<tr>
					    <th class=""><label for="ser_project_startdate">검색조건</label></th>
						<td class="tl">
						</td>
						<td class="tl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							
							<select id="type" name="type">
								<option value="a_title">제목</option>
								<option value="a_name">작성자</option>
							</select>
						<input style="width:200px" type="text" id="keyword" name="keyword" value="<%if(request.getParameter("keyword") != null){ out.print(request.getParameter("keyword")); } else { out.print(""); }%>" />
						<input type="submit" value="검색" />	
					</tr>
				</table>
			</div>
		</div>
	</div>
</div>
<div class="list_area">
	<div class="layout">
	  	<table>
	  		<colgroup>
					<col width="70px"/>
					<col />
					<col width="120px"/>
					<col width="120px"/>
					<col width="80px"/>
					<col width="80px"/>
			</colgroup>									<!-- 표 형식의 데이터를 표현하는 태그입니다. -->
		<tr>									<!-- table태그 내에서 행을 정의할때 쓰는 태그입니다. -->
			<th>번호</th>						<!-- Table Header의 약자로 table태그 내에서 -->
			<th>제목</th>						<!-- 강조하고싶은 컬럼을 나타낼때 쓰는 태그입니다. -->
			<th>작성자</th>
		</tr>
				<c:forEach var="board" items="${artBoardList}">
			 		<tr>
						<td>${board.rnum }</td>
						<td>${board.a_name }</td>
						<td><a href="artView.do?idx=${board.a_idx}">${board.a_title }</a></td>
					</tr>
				</c:forEach>
				</table>
			</div>		
		</div>
</form>
</body>
<script type="text/javascript"> 
window.onload = function(){
	document.body.className = "prtlBody urFontBaseFam urScrl body_bg";
}
</script>
</html>