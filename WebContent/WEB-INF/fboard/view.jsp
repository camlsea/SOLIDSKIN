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
		location.href("commentDelete.do?fc_num=" + commentIdx + "&linkedArticleNum=" + linkedArticleNum);
	}		
}
function commentModify(commentIdx, linkedArticleNum){
	if(confirm("선택하신 댓글을 수정하시겠습니까?")){
		location.href("commentModify.do?fc_num=" + commentIdx + "&linkedArticleNum=" + linkedArticleNum);
	}		
}


</script>
<body>				
	<h1>게시글 조회</h1>						
	<table border="1">							<!-- border은 테두리를 표시하는 속성입니다. -->
		<tr>									
			<th>번호</th>						
			<td>${board.f_num}</td>
			<th>작성자</th>
			<td>${board.f_writer}</td>
			<th>날짜</th>
			<td>${board.f_date}</td>
			<th>조회수</th>
			<td>${board.f_count}</td>
		</tr>
		<tr>
			<th colspan="2">제목</th>			<!-- colspan은 행병합 속성입니다. -->
			<td colspan="8">${board.f_title}</td>
		</tr>
		<tr>
			<th colspan="2">내용</th>						
			<td colspan="8">${board.f_content}</td>
		</tr>
	</table>
	
	<table>
		<tr>
			<th colspan="2">댓글</th>
		</tr>		
		<c:forEach var="comment" items="${commentList}">
		<tr>
			<td class="writer">				
			<%-- 	<p>${comment.fc_writer}
				<c:if test="${comment.writerId == userId}"> 
					<br /><a onclick="commentDelete(${comment.fc_num}, ${board.f_num})"><small>댓글 삭제</small></a>					
				</c:if>
				</p> --%>
				<a href=# onclick="commentDelete(${comment.fc_num}, ${board.f_num})"><small>댓글 삭제</small></a>
				<a href=# onclick="commentModify(${comment.fc_num}, ${board.f_num})"><small>댓글 수정</small></a>
			</td>
			<td class="content" align="left">
				<span class="date">${comment.fc_date}</span>
				<p>${comment.fc_content}</p>
			</td>
		</tr>
		</c:forEach>
		<tr>
			<td class="writer"><strong>댓글 쓰기</strong></td>
			<td class="content">
				<form action="commentWrite.do" method="post">
					<!-- <input type="hidden" id="writer" name="writer" value="${userName}" />-->
					<!-- <input type="hidden" id="f_writer" name="f_writer" value="${board.f_writer}" /> -->
					 <input type="hidden" id="fc_writer" name="fc_writer" value="${comment.fc_writer}" />  
					<input type="hidden" id="linkedArticleNum" name="linkedArticleNum" value="${board.f_num}" />
					<textarea id="fc_content" name="fc_content" class="commentForm"></textarea>
					<input type="submit" value="확인" class="commentBt" />
				</form>
			</td>
		</tr>
	</table>
	
	
	<a href="delete.do?f_num=${board.f_num}">게시글삭제</a>
	<a href="modify.do?f_num=${board.f_num}">수정</a>
	<a href="writeReply.do?f_num=${board.f_num}">답글</a>
	<a href="list.do">목록으로</a> 
</body>
</html>