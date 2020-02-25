<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="java.util.regex.Pattern"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="java.sql.*" %>
<%@ page import="com.ojt.artboard.model.ArtBoardBeans" %>
<html>
<head>
<style>
*{
	margin:0;
	padding:0;
	font-size:100%;
}

a{color:#666;text-decoration:none;}
#wrap{width:1000px;margin:0 auto;position:relative;}
#main-content li{
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
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="<%=request.getContextPath()%>/common/css/common.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/common/css/contents.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/BPNR-HtmlDomObjects.js"></script>
</head>
<body>
<form>
<input type="hidden" id="idx" name="idx" value="${a_idx}">
<!-- Layout -->
<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>서양화</span></strong></h1>
		</div>

		<!-- Input Area -->
		<div class="view_area">
			<div class="layout">
			
			 <table border=1 width="100%">
            		<colgroup>
						<col width="100px" />
						<col />
					</colgroup>
            <tr height="300">
         		
           		<td  width="50%">
					<div class="photos">
				    	<div id="photo_1"><img src="D:/tomcat6.0/webapps/CyberArtMuseum/files/${artview.a_imagename}" style="width:420px; height:360;" alt="" onload="javascript:resize(this)"/></div>
					</div>
            	</td>
            
            	
            	<td width="100%" rowspan="2">
            	<table border=1 width="100%">
            	      <colgroup>
						<col width="18%" />
						<col />
					</colgroup>
            	<td>
					<tr>
						<th class=""><label for="a_title">제목</label></th>
						<td>${artview.a_title}</td>
					</tr>
					<tr>
						<th class=""><label for="a_idx">작가</label></th>
						<td>${artview.a_name}</td>
					</tr>
					<tr>
						<th class=""><label for="a_year">제작년도</label></th>
						<td>${artview.a_year}</td>
					</tr>
					<tr>
						<th class=""><label for="a_own">소장</label></th>
						<td>${artview.a_own}</td>
					</tr>
					<tr>
						<th class=""><label for="a_content">소개</label></th>
						<td>${artview.a_content}</td>
					</tr>
					<tr>
						<td colspan="2" class="tr">
						<c:if test="${u_id_gubun =='0' }">
							<a class="btn" href="artModify.do?a_idx=${artview.a_idx}" title="수정"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_edit.gif">수정</strong></a>
							<a class="btn" href="artDelete.do?a_idx=${artview.a_idx}" title="삭제"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_delete.gif">삭제</strong></a>
						</c:if>
							<a class="btn" href="artList.do" title="목록"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_list.gif">목록</strong></a>
						</td>
					</tr>
            	</td>
            	</table>
            	</td>
            	
            </tr>
    	 </table>
			</div>
			</div>
		</div>
	</div>
</form>
</body>
<script type="text/javascript">
<script language="JavaScript">
function resize(obj){
 if(obj.width > 530)
  obj.width = 530;
}
</script>
</html>
