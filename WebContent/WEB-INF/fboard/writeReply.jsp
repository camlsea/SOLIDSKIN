<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
	
	
	bb : ${board.re_step}

	<form action="writeReply.do" method="post" onsubmit="return formCheck();">
	<input type="hidden" id="f_num" name="f_num" value="${board.f_num }" />
	<input type="hidden" id="ref" name="ref" value="${board.ref }" />
	<input type="hidden" id="re_level" name="re_level" value="${board.re_level}" />
	<input type="hidden" id="re_step" name="re_step" value="${board.re_step}" />
		title : <input type="text" id="f_title" name="f_title" /><br/>
		writer : <input type="text" id="f_writer" name="f_writer" /><br/>
		content : <textarea rows="10" cols="20" id="f_content" name="f_content"></textarea><br/>
		<input type="submit"/>
	</form> 

</body> 
	<script>
	function formCheck() { 
		var f_title = document.forms[0].f_title;       
		var f_writer = document.forms[0].f_writer;
		var f_date = document.forms[0].f_date;
		var f_content = document.forms[0].f_content;

		if (f_title.value == null || f_title.value == ""){                                   
			alert('insert title.');                                  
			document.forms[0].f_title.focus();                          
			return false;                                                     
		}
		
		if (f_writer.value == null ||  f_writer.value  == ""){           
			alert('insert writer');  
			document.forms[0].f_writer.focus();                       
			return false;                
		}else if(f_writer.value.match(/^(\w+)@(\w+)[.](\w+)$/ig) == null){
			alert('wrong fomat. please E-mail format');  
			document.forms[0].f_writer.focus();                       
			return false;  
		}
		
		if (f_content.value == null || f_content.value == ""){                                   
			alert('insert content.');                                  
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
	</script>
</html>   