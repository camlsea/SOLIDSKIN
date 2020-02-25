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
<!-- <style>
*{
	margin:0;
	padding:0;
	font-size:100%;
}

/* body{
	font:11px 돋움,dotum;
	letter-spacing:-1px;
	color:#666;
	margin-top:20px;
	background:#F6F5F0;
	text-align:center;
} */

a{color:#666;text-decoration:none;}
#wrap{width:500px;margin:0 auto;position:relative;}
/* #main-content li{
	width:200px;
	height:160px;
	border:solid #CCC;
	border-width:0 1px 1px 0;
	background:#FFF;
	padding:10px;
	text-align:center;
	position:relative;
	float:left;
	display:inline;
	margin:3px;
} */


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
</style> -->
</head>
<body>

<form action="list.do" method="post">
<input type="hidden" id="idx" name="idx" value="${board.a_idx }">
<input type="hidden" id="a_idx" name="a_idx" value="${board.rnum }">

<!-- Layout -->
<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span> 서양예술</span></strong></h1>
			
		</div>
	

	</div>
</div>

<div class="list_area">
	<div class="layout">
	<div id="wrap"> 
	  <div id="main-content"> 
	  	<table>
	  		<colgroup>
				<col width="70px" />
				<col />
			</colgroup>
			<c:forEach var="board" items="${artBoardList}">
			<tr>
		 		<td>
		    		<div id="photo_1"><img src="D:/tomcat6.0/webapps/CyberArtMuseum/files/${board.a_imagename}" style="width:480px; height:600px;" alt="" />
		    		</div>
				</td>
			</tr>
			</c:forEach>
		</table>	
		</div>
	</div>
	</div>
	</div>
	<div class="btn_area tr">
		<a class="btn" href="<%=request.getContextPath()%>/artboard/artList.do" title="목록"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_list.gif">목록</strong></a>
 	</div>
</form>
</body>
<!-- <script> 
window.onload = function(){
	document.body.className = "prtlBody urFontBaseFam urScrl body_bg";
}
</script> -->
</html>