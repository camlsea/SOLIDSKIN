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
<title>본격! 게시판 - 게시글 리스트</title>		<!-- 윈도우 상단에 뜨는 내용입니다. -->
<style type="text/css">
	table, td, th
{
	border:1px solid green;
}
	th
{
	background-color:green;
	color:white;
}
</style>
</head>
<body>											<!-- HTML문서의 주 내용이 들어가는 부분입니다. -->
	<h1>게시글 리스트</h1>
		<form action="list.do" method="get">		
			<select id="type" name="type">
				<option value="f_title">제목</option>
				<option value="f_content">내용</option>
				<option value="f_writer">작성자</option>
			</select>
			<input type="text" id="keyword" name="keyword" value="<%if(request.getParameter("keyword") != null){ out.print(request.getParameter("keyword")); } else { out.print(""); }%>" />
			<input type="submit" value="검색" />			
		</form>						
	<table>										<!-- 표 형식의 데이터를 표현하는 태그입니다. -->
		<tr>									<!-- table태그 내에서 행을 정의할때 쓰는 태그입니다. -->
			<th>번호</th>						<!-- Table Header의 약자로 table태그 내에서 -->
			<th>제목</th>						<!-- 강조하고싶은 컬럼을 나타낼때 쓰는 태그입니다. -->
			<th>작성자</th>
			<th>날짜</th>
			<th>조회수</th>
		</tr>
		
 	<%-- 	<c:iterator value="list" status="stat">
		<c:url id="list" action="list.do">
			<c:param name="no">
				<c:property value="no" />
			</c:param>
		</c:url>  --%>
		
 	<c:forEach items="${boardList}" var="article">
			<tr>
				<td>${article.f_num}</td>
				<td>
				<c:if test="${article.re_level != 0 }" >
				<c:forEach var = "i" begin = "2" end = "${article.re_level}">&nbsp;&nbsp;
				</c:forEach>
				
				<!-- <c:forEach var = "i" begin = "${article.re_level}" end = "2">&nbsp;&nbsp;
				</c:forEach> -->
				
				<img src="../image/tip_reple.gif" width="22" height="12" border="0" alt="">
				 </c:if>
				 
				<a href='view.do?f_num=${article.f_num}'>${article.f_title} </a></td>
				<td>${article.f_writer}</td>
				<td>${article.f_date}</td>
				<td>${article.f_count}</td> 
			</tr>
		</c:forEach> 
	</table>
 	
		<br />
	${pageHtml}
	<br /><br />

	
	<br/><a href="write.do">글쓰기</a>
	<a href="list.do">목록으로</a> 
</body>
</html>