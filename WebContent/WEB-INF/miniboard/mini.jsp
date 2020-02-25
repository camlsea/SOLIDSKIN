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
<title>미니게시판</title>		<!-- 윈도우 상단에 뜨는 내용입니다. -->
<link href="../common/css/common.css" rel="stylesheet" type="text/css" />
<link href="../common/css/contents.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../common/scripts/BPNR-HtmlDomObjects.js"></script>
</head>
<%-- 
<script type="text/javascript"> 
 function login(){
	 location.href("<%=request.getContextPath()%>/login.do");
	 
 }
 login();
</script> --%>

<body>


<form id="noticeForm" method="post">



<table border=1 width="100%">
            
            <tr height="300">
         
           		<td  width="50%">
          		
          		<!-- 공지사항 시작 -->
          		
          		<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>공지사항</span></strong></h1>
		</div>	
	<!-- Input Area -->
	<div class="input_area">
			<div class="layout">
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
		<tr>									
			<th>번호</th>						
			<th>제목</th>						
			<th>작성자</th>
			<th>작성일</th>
			<th>조회수</th>
		</tr>
		<c:forEach items="${boardList}" var="article">
			<tr>
				<td class="tc">${article.n_num}</td>
				<td class="tl"><a href='<%=request.getContextPath()%>/board/view.do?n_num=${article.n_num}'>${article.n_title} </a></td>
				<td class="tc">${article.n_writer}</td>
				<td class="tc">${article.n_date}</td>
				<td class="tc">${article.n_count}</td> 
			</tr>
		</c:forEach>
	</table> 
	</div>
	</div>
	</div>
	</div>
	<div class="btn_area tr">
		<a class="btn" href="<%=request.getContextPath()%>/board/list.do" title="목록"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_list.gif">목록</strong></a>
	</div>
          		<!-- 공지사항 끝-->
          		
                 
       
 			</td>



            	<td width="50%" rowspan="2">
            	<!-- 명화게시판 시작 -->
			
			<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span> 서양예술</span></strong></h1>
			
		</div>
	

	</div>
</div>
<table>
<div class="list_area">
	<div class="layout">
			<colgroup>
				<col width="70px"/>
				<col />
				<col width="120px"/>
				<col width="120px"/>
				<col width="80px"/>
				<col width="80px"/>
			</colgroup>
	<div id="wrap"> 
	  <div id="main-content"> 
	  		<div>
				<c:forEach var="board" items="${artBoardList}">
			 		<tr>
						<td>
						
			    			<div id="photo_1"><img src="<%=request.getContextPath()%>/files/${board.a_imagename}" style="width:150px; height:150;" alt="" /><a href="<%=request.getContextPath()%>/iboard/view.do?idx=${board.a_idx}">
			    			${board.rnum }<br>${board.a_name }</br><br>${board.a_title }</br></a></div>
						
						</td>
					</tr>
				</c:forEach>
			</div>		
		</div>
	</div>
	
	</div>
	</div>
	
	</table>
	
            	
            	<!-- 명화게시판 끝 -->
            	</td>
            	
            </tr>
            
            <tr height="300">
            	<td  width="50%">
            	
            	<!-- 자유게시판 시작-->
            	 
				<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>자유게시판</span></strong></h1>
		</div>
		<!-- Input Area -->
	<div class="input_area">
			<div class="layout">
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
 	<c:forEach items="${boardList2}" var="article">
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
				 
				<a href='<%=request.getContextPath()%>/fboard/freeView.do?f_num=${article.f_num}'>${article.f_title} </a></td>
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
	<div class="btn_area tr">
		<a class="btn" href="<%=request.getContextPath()%>/fboard/freeList.do" title="목록"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_list.gif">목록</strong></a>
	</div>
				
				
			<!-- 자유게시판 끝-->	

            	
            	</td>
            </tr>  
     </table>
</form>
</body>
</html>