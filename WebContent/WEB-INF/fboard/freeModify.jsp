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
			<h1><strong><span>자유게시판 등록</span></strong></h1>
		</div>
		
	<div class="input_area">
			<div class="layout">	

	<form action="freeModify.do" method="post" onsubmit="return formCheck();">
		<table>
	<colgroup>
		<col width="120px"/>
		<col  />
	</colgroup>
	
	<input type="hidden" id="f_num" name="f_num" value="${board.f_num }">
		<tr>
			<th class=""><label for="project_info">작성자 </label></th>
			<td><input type="text" id="f_writer" name="f_writer" value="${board.f_writer}"></td>
		</tr>
		
		<tr>
		    <th class=""><label for="project_info">제목</label></th>
			<td><input type="text" id="f_title" name="f_title" value="${board.f_title}"></td>
		</tr>
		<tr>
			<th class=""><label for="project_info">내용</label></th>
			<td colspan="2">
				<textarea class="tran" style='width: 85%; height: 200px;' id="f_content" name="f_content">${board.f_content}</textarea>
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
	<script>
	function formCheck() { 
		var f_title = document.forms[0].f_title;       
		var f_writer = document.forms[0].f_writer;
		var f_date = document.forms[0].f_date;
		var f_content = document.forms[0].f_content;
		
		if (f_writer.value == null ||  f_writer.value  == ""){           
			alert('작성자를 입력해주세요.');  
			document.forms[0].f_writer.focus();                       
			return false;                
		}/* else if(f_writer.value.match(/^(\w+)@(\w+)[.](\w+)$/ig) == null){
			alert('wrong fomat. please E-mail format');  
			document.forms[0].f_writer.focus();                       
			return false;  
		} */
		
		if (f_title.value == null || f_title.value == ""){                                   
			alert('제목을 입력해주세요.');                                  
			document.forms[0].f_title.focus();                          
			return false;                                                     
		}
				
		if (f_content.value == null || f_content.value == ""){                                   
			alert('내용을 입력해주세요');                                  
			document.forms[0].f_content.focus();                          
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
			location.href = "freeList.do";			
			break;
		}
	}
	
	
	</script>
</html>   