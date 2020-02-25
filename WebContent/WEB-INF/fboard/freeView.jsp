<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>본격! 게시판 - 게시글 조회</title>
<link href="<%=request.getContextPath()%>/common/css/common.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/common/css/contents.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/BPNR-HtmlDomObjects.js"></script>	
</head>
<script>
function freeCommentDelete(commentIdx, linkedArticleNum){
	if(confirm("선택하신 댓글을 삭제하시겠습니까?")){
		location.href("freeCommentDelete.do?fc_num=" + commentIdx + "&linkedArticleNum=" + linkedArticleNum);
	}		
}
function freeCommentModify(commentIdx, linkedArticleNum){
	if(confirm("선택하신 댓글을 수정하시겠습니까?")){
		location.href("freeCommentModify.do?fc_num=" + commentIdx + "&linkedArticleNum=" + linkedArticleNum);
	}		
}


</script>
<body>

<body>	
<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>자유게시판</span></strong></h1>
		</div>
					
	
			<!-- Input Area -->
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
			<td colspan="2" class="title">${board.f_title}</td>
			<td/>
		</tr>
		<tr/>
		<tr/>
		<tr>
		<td class="tl sub">${board.f_writer}</td>
			<td class="tr sub">${board.f_date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;조회수 : <font style="color:#FF5050;font-weight:bold;">${board.f_count}</font></td>
		</tr>
		<tr/>
		<tr/>
		<tr>
			<td colspan="2">${board.f_content}</td>
		</tr>
		
		
		<tr>
			<td colspan="2" class="tr">
		<c:choose>
			<c:when test="${board.f_writer == u_name}">
				<a class="btn" href="freeModify.do?f_num=${board.f_num}" title="수정"><strong><img src="../common/images/ico/ico_edit.gif">수정</strong></a>
				<a class="btn" href="freeDelete.do?f_num=${board.f_num}" title="삭제"><strong><img src="../common/images/ico/ico_delete.gif">삭제</strong></a>
				<a class="btn" href="freeList.do" title="목록"><strong><img src="../common/images/ico/ico_list.gif">목록</strong></a>
				<a class="btn" href="freeWriteReply.do?f_num=${board.f_num}" title="답글"><strong><img src="../common/images/ico/ico_list.gif">답글</strong></a>
			</c:when>
		<c:otherwise>
				<a class="btn" href="freeList.do" title="목록"><strong><img src="../common/images/ico/ico_list.gif">목록</strong></a>
				<a class="btn" href="freeWriteReply.do?f_num=${board.f_num}" title="답글"><strong><img src="../common/images/ico/ico_list.gif">답글</strong></a>
		</c:otherwise>
	</c:choose>	
	
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
			<td class="tl sub"><font style="font-size:12px;font-weight:bold;">
			<p>${comment.fc_writer} &nbsp;&nbsp;${comment.fc_date}</p></font>
			
			<c:if test="${comment.fc_writer == u_name}">
			
			<td class="tr sub"><a class="txt_s" href=# onclick="freeCommentModify(${comment.fc_num}, ${board.f_num})">수정</a>&nbsp;&nbsp;&nbsp;<a class="txt_s" href=# onclick="freeCommentDelete(${comment.fc_num}, ${board.f_num})">삭제</a></td>			
			</c:if>
			</td>
		</tr>
		<tr>
			<td colspan="2">${comment.fc_content}</td>
		</tr>
		
	
		</c:forEach>
		</table>
		
	
	<table>
			<div class="input_area">
				<div class="layout">
		<tr>
			<td class="writer"><strong>댓글 쓰기</strong></td>
			<td class="content">
				<form action="freeCommentWrite.do" method="post">
					<!-- <input type="hidden" id="writer" name="writer" value="${userName}" />-->
					<!-- <input type="hidden" id="f_writer" name="f_writer" value="${board.f_writer}" /> -->
					 <input type="hidden" id="fc_writer" name="fc_writer" value="${u_name}" />  
					<input type="hidden" id="linkedArticleNum" name="linkedArticleNum" value="${board.f_num}" />
					<textarea id="fc_content" name="fc_content" class="txt_s" cols="80" rows="3" maxlength="100" onblur="Limit(this)"></textarea>
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
		
</body>
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


