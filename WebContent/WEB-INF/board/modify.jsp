<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<link href="<%=request.getContextPath()%>/common/css/common.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/common/css/contents.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/BPNR-HtmlDomObjects.js"></script>
</head>
<body>

<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>공지사항 등록</span></strong></h1>
		</div>
		
		
<div class="input_area">
			<div class="layout">
			

<form action="modify.do" method="post" onsubmit="return formCheck();">
	<table>
	<colgroup>
		<col width="120px"/>
		<col  />
	</colgroup>
		<input type="hidden" id="n_num" name="n_num" value="${board.n_num }">
		<tr>
			<th class=""><label for="project_info">관리자 </label></th>
			<td><input type="text" id="n_writer" name="n_writer" value="${board.n_writer}"></td>
		</tr>
		
		<tr>
		    <th class=""><label for="project_info">제목</label></th>
			<td><input type="text" id="n_title" name="n_title" value="${board.n_title}"></td>
		</tr>
		<tr>
			<th class=""><label for="project_info">내용</label></th>
			<td colspan="2">
				<textarea class="tran" style='width: 85%; height: 200px;' id="n_content" name="n_content">${board.n_content}</textarea>
			</td>
		</tr>
		
		</table>
		<div class="btn_area tr">
		<input type="reset" value="재작성" class="writeBt"/>
		<input type="button" value="취소" class="writeBt" onclick="moveAction(1)" />
		<input type="submit" value="등록" class="writeBt"/>
		</div>
		
		</form>

</div>
		</div>
		</div>
		</div>
</body> 

	
</body> 
	<script>
	function formCheck() { 
		var n_title = document.forms[0].n_title;       
		var n_writer = document.forms[0].n_writer;
		var n_date = document.forms[0].n_date;
		var n_content = document.forms[0].n_content;
		

		if (n_writer.value == null ||  n_writer.value  == ""){           
			alert('작성자를 입력해주세요.');  
			document.forms[0].n_writer.focus();                       
			return false;                
		}/* else if(n_writer.value.match(/^(\w+)@(\w+)[.](\w+)$/ig) == null){
			alert('wrong fomat. please E-mail format');  
			document.forms[0].n_writer.focus();                       
			return false;  
		} */

		if (n_title.value == null || n_title.value == ""){                                   
			alert('제목을 입력해주세요');                                  
			document.forms[0].n_title.focus();                          
			return false;                                                     
		}
		
		if (n_content.value == null || n_content.value == ""){                                   
			alert('내용을 입력해주세요');                                  
			document.forms[0].n_content.focus();                          
			return false;                                                     
		}
		return true;
		/*
		if (regdate.value == null || regdate.value == "" ){                             
			alert('insert date');    
			document.forms[0].regdate.focus();                       
			return false;             
		}else if(regdate.value.match(/^\d\d\d\d\d\d+$/ig)   == null){
			alert('wrong format. please insert Number(6)');  
			document.forms[0].regdate.focus();                       
			return false;  
		}
		*/
	}
	
	function moveAction(where){
		switch (where) {
		case 1:
			location.href = "list.do";			
			break;
		}
	}
	
	
	</script>
</html>   