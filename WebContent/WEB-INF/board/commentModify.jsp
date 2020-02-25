<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>공지사항-comment수정</title>	
<link href="<%=request.getContextPath()%>/common/css/common.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/common/css/contents.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/BPNR-HtmlDomObjects.js"></script>
</head>
<script>
function commentDelete(commentIdx, linkedArticleNum){
	if(confirm("선택하신 댓글을 삭제하시겠습니까?")){
		location.href("commentDelete.do?nc_num=" + commentIdx + "&linkedArticleNum=" + linkedArticleNum);
	}		
}
function commentModify(commentIdx, linkedArticleNum){
	if(confirm("선택하신 댓글을 수정하시겠습니까?")){
		location.href("commentModify.do?nc_num=" + commentIdx + "&linkedArticleNum=" + linkedArticleNum);
	}		
}


</script>
<body>	

<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>공지사항</span></strong></h1>
		</div>
		
					
			<div class="view_area">
			<div class="layout">
				<table>
					<colgroup>
						<col width="50%" />
						<col width="50%"/>
					</colgroup>
					<tr>
						<td colspan="2" height="10"></td>
					</tr>
								
	<tr>
			<td colspan="2" class="title">${board.n_title}</td>
			<td/>
		</tr>
		<tr/>
		<tr/>
		<tr>
			<td class="tl sub">${board.n_writer}</td>
			<td class="tr sub">${board.n_date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;조회수 : <font style="color:#FF5050;font-weight:bold;">${board.n_count}</font></td>
		</tr>
		<tr/>
		<tr/>
		<tr>
			<td colspan="2">${board.n_content}</td>
		</tr>
		
		<tr>
			<td colspan="2" class="tr">
				<a class="btn" href="modify.do?n_num=${board.n_num}" title="수정"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_edit.gif">수정</strong></a>
				<a class="btn" href="delete.do?n_num=${board.n_num}" title="삭제"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_delete.gif">삭제</strong></a>
				<a class="btn" href="list.do" title="목록"><strong><img src="<%=request.getContextPath()%>/common/images/ico/ico_list.gif">목록</strong></a>
			</td>
		</tr>
		<tr>
			<td colspan="2">
			</td>
		</tr>
		<tr>
			<td colspan="2" height="10"></td>
		</tr>		
	</table>
	
	
	<!-- Input Area -->
		<div class="comment_area">
			<div class="layout">
				<h2>댓글</h2>
		<table>
			<colgroup>
				<col width="50%" />
				<col width="50%"/>
			</colgroup>	
			
			<tr>
			<td colspan="2" class="space" height="5"></td>
		</tr>
		<c:forEach var="comment" items="${commentList}">			
		<tr>
			<td class="tl sub"><font style="font-size:12px;font-weight:bold;">${comment.nc_writer} &nbsp;&nbsp;</font>${comment.nc_date}</td>
		</tr>
		<tr>
			<td colspan="2">${comment.nc_content}</td>
		</tr>
		<td class="tr sub"><a class="txt_s" href=# onclick="commentModify(${comment.nc_num}, ${board.n_num})">수정</a>&nbsp;&nbsp;&nbsp;<a class="txt_s" href=# onclick="commentDelete(${comment.nc_num}, ${board.n_num})">삭제</a></td>			
	
		
		</c:forEach>
		</table>
		
		
			
		<table>
			<div class="input_area">
				<div class="layout">
		<tr>
			<td class="writer"><strong>댓글 쓰기</strong></td>
			<td class="content">
				<form action="commentModify.do" method="post">
					<!-- <input type="hidden" id="writer" name="writer" value="${userName}" />-->
					<input type="hidden" id="n_num" name="n_num" value="${board.n_num}" />
					<input type="hidden" id="nc_writer" name="nc_writer" value="${commentboard.nc_writer}" /> 
					<input type="hidden" id="linkedArticleNum" name="linkedArticleNum" value="${commentboard.nc_num}" />
					<textarea id="nc_content" name="nc_content" class="txt_s" cols="80" rows="3" maxlength="100" onblur="Limit(this)">${commentboard.nc_content}</textarea>
					<input type="submit" value="확인" class="commentBt" />
				</form>
		
			</td>
		
		</tr>
		
	</div>
	</div>
		
		
	</table>
	</div>
	</div>
	</div>
	</div>
	</div>
	</div>
	
<script> 
window.onload = function(){
	document.body.className = "prtlBody urFontBaseFam urScrl body_bg";
}

 function Limit(obj){
      var maxLength = parseInt(obj.getAttribute("maxlength"));
      if(obj.value.length > maxLength){
          alert("내용은 100자를 초과할 수 없습니다. 초과된 내용은 삭제됩니다.");
          obj.value = obj.value.substring(0,maxLength);
          return;
      }
  }

</script>
	
 
</body>
</html>