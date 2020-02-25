<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>본격! 게시판 - 게시글 조회</title>	
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
	<h1>comment List</h1>						
	
	
	<table>
		<tr>
			<th colspan="2">댓글</th>
		</tr>		
		<c:forEach var="comment" items="${commentList}">
		<tr>
			<td class="writer">				
			<%-- 	<p>${comment.writer}
				<c:if test="${comment.writerId == userId}"> 
					<br /><a onclick="commentDelete(${comment.idx}, ${board.idx})"><small>댓글 삭제</small></a>					
				</c:if>
				</p> --%>
				<a href=# onclick="commentDelete(${comment.nc_num}, ${board.n_num})"><small>댓글 삭제</small></a>
				<a href=# onclick="commentModify(${comment.nc_num}, ${board.n_num})"><small>댓글 수정</small></a>
			</td>
			<td class="content" align="left">
				<span class="date">${comment.nc_Date}</span>
				<p>${comment.nc_content}</p>
			</td>
		</tr>
		</c:forEach>
		<tr>
			<td class="writer"><strong>댓글 쓰기</strong></td>
			<td class="content">
				<form action="commentWrite.do" method="post">
					<!-- <input type="hidden" id="writer" name="writer" value="${userName}" />-->
					<input type="hidden" id="n_writer" name="n_writer" value="${board.n_writer}" /> 
					<input type="hidden" id="linkedArticleNum" name="linkedArticleNum" value="${board.n_num}" />
					<textarea id="nc_content" name="nc_content" class="commentForm"></textarea>
					<input type="submit" value="확인" class="commentBt" />
				</form>
			</td>
		</tr>
	</table>
	
</body>
</html>