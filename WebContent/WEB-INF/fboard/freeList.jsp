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
<title>자유게시판</title>		<!-- 윈도우 상단에 뜨는 내용입니다. -->
<link href="<%=request.getContextPath()%>/common/css/common.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/common/css/contents.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/BPNR-HtmlDomObjects.js"></script>
</head>
<body>											
<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>자유게시판</span></strong></h1>
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
							
							
		
		<form action="freeList.do" method="get">	
			<select id="type" name="type">
				<option value="f_title">제목</option>
				<option value="f_content">내용</option>
				<option value="f_writer">작성자</option>
			</select>
			<input type="text" id="keyword" name="keyword" value="<%if(request.getParameter("keyword") != null){ out.print(request.getParameter("keyword")); } else { out.print(""); }%>" />
			<input type="submit" value="검색" />			
		</form>			
		
		</tr>
				</table>
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
					</colgroup>		
					
								
									<!-- 표 형식의 데이터를 표현하는 태그입니다. -->
		<tr>									<!-- table태그 내에서 행을 정의할때 쓰는 태그입니다. -->
			<th>번호</th>						<!-- Table Header의 약자로 table태그 내에서 -->
			<th>제목</th>						<!-- 강조하고싶은 컬럼을 나타낼때 쓰는 태그입니다. -->
			<th>작성자</th>
			<th>작성일</th>
			<th>조회수</th>
		</tr>
		
 			
 	<c:forEach items="${boardList}" var="article">
			<tr>
				<td class="tc">${article.f_num}</td>
				<td class="tl">
				<c:if test="${article.re_level != 0 }" >
				<c:forEach var = "i" begin = "2" end = "${article.re_level}">&nbsp;&nbsp;
				</c:forEach>
				
				<!-- <c:forEach var = "i" begin = "${article.re_level}" end = "2">&nbsp;&nbsp;
				</c:forEach> -->
				
				<img src="../image/tip_reple.gif" width="22" height="12" border="0" alt="">
				 </c:if>
				 
				<a href='freeView.do?f_num=${article.f_num}'>${article.f_title} </a></td>
				<td class="tc">${article.f_writer}</td>
				<td class="tc">${article.f_date}</td>
				<td class="tc">${article.f_count}</td> 
			</tr>
		</c:forEach> 
	</table>
 	</div>
	</div>
	
	</div>
	</div>
	
	<br />
	<center>${pageHtml}</center>
	<br /><br />

	<div class="btn_area tr">
	<c:if test="${u_id_gubun =='0' || u_id_gubun =='1'}">
		<a class="btn" href="freeWrite.do" title="글쓰기"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_report2.gif">글쓰기</strong></a>
	</c:if>
		<a class="btn" href="freeList.do" title="목록"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_list.gif">목록</strong></a>
	</div>
</body>
</html>