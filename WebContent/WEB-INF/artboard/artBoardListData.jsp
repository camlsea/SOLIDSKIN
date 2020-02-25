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
<style>
*{
	margin:0;
	padding:0;
	font-size:100%;
}

body{
	font:11px 돋움,dotum;
	letter-spacing:-1px;
	color:#666;
	margin-top:20px;
	background:#F6F5F0;
	text-align:center;
}

a{color:#666;text-decoration:none;}
#wrap{width:1000px;margin:0 auto;position:relative;}
#main-content li{
	width:80px;
	height:50px;
	border:solid #CCC;
	border-width:0 1px 1px 0;
	background:#FFF;
	padding:10px;
	text-align:center;
	position:relative;
	float:left;
	display:inline;
	margin:3px;
}


#main-content  a span{position:absolute;left:-9999px;}
#main-content a:hover span{	
	top:-20px;
	left:10px;
	width:202px;
	font-weight:bold;
	background:#FFF;
	color:#999;
	padding:5px 0 5px 0;
	text-transform:uppercase;
	font-size:11px;
	border:1px solid #EEE;
	border-width:0 0 10px 0;
	filter: alpha(opacity=100);
} 

img{border:1px solid #EEE;}
</style>
</head>
<body>
<div class="btn_area tr">
<a class="btn" href="artListData2.do"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_report2.gif">리스트</strong></a>
</div>
<!-- Layout -->
<div class="r2_tc"><div class="r2_mr"><div class="r2_ml"><div class="r2_bc"><div class="r2_tl"><div class="r2_tr"><div class="r2_bl"><div class="r2_br">
<div class="wrap">
	<div class="layout">
<!-- Input Area --> 
	</div>
</div>
<div class="list_area">
	<div class="layout">
	<div id="wrap"> 
	  <div id="main-content"> 
	  	<table>
	  		<colgroup>
				<col width="10%"/>
				<col width="40%"/>
				<col width="40%"/>
				<col width="10%"/>
			</colgroup>									<!-- 표 형식의 데이터를 표현하는 태그입니다. -->
		<tr>									<!-- table태그 내에서 행을 정의할때 쓰는 태그입니다. -->
			<th>번호</th>						<!-- Table Header의 약자로 table태그 내에서 -->
			<th>제목</th>						<!-- 강조하고싶은 컬럼을 나타낼때 쓰는 태그입니다. -->
			<th>작성자</th>
			<th>이미지</th>
		</tr>
				<c:forEach var="board" items="${artBoardList}">
			 		<tr>
						<td>${board.rnum }</td>
						<td>${board.a_name }</td>
						<td><a href="artView.do?idx=${board.a_idx}">${board.a_title }</a></td>
						<td>
						<ul>
	    				<li><div id="photo_1"><img src="<%=request.getContextPath()%>/files/${board.a_imagename}" style="width:80px; height:80;" alt="" />
	    				</div></li>
						</ul>
						</td>
					</tr>
				</c:forEach>
				</table>
			</div>		
		</div>
	</div>
	</div>
		<div class="paginate">
			${pageHtml }
			<!-- 페이징 처리부 끝 -->
		</div></div></div></div></div></div></div></div></div>
</body>
<script> 
window.onload = function(){
	document.body.className = "prtlBody urFontBaseFam urScrl body_bg";
}
</script>
</html>