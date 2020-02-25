<%@page import="java.util.regex.Pattern"%>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ page import="java.sql.*" %>	
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="<%=request.getContextPath()%>/common/css/common.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/common/css/contents.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/common/scripts/BPNR-HtmlDomObjects.js"></script>
<script src="http://www.prototypejs.org/javascripts/prototype.js"></script>
</head>
<body>
<form id="checkFileForm2" name="checkFileForm2" action="artWrite.do" method="post" enctype="multipart/form-data" onsubmit="return formCheck();">
<!-- Layout -->
<div class="wrap">
	<div class="layout">
		<!-- Title -->
		<div class="page_title">
			<h1><strong><span>등록화면</span></strong></h1>
		</div>

		<!-- Input Area -->
		<div class="input_area">
			<div class="layout">
				<table>
					<colgroup>
						<col width="10%"/>
						<col width="50%"/>
						<col />
					</colgroup>
					<tr>
						<th class=""><label for="type">종류</label></th>
						<td><select id="a_gubunboard" name="a_gubunboard">
							<option value="1">서양화</option>
							<option value="2">동양화</option>
						</select></td>
					</tr>
					<tr>
						<th class=""><label for="name">작가</label></th>
						<td><input type="text" id="a_name" name="a_name" style="width:200px" maxlength="30"></td>
					</tr>
					<tr>
						<th class=""><label for="title">제목</label></th>
						<td><input type="text" id="a_title" name="a_title" style="width:200px" maxlength="30" ></td>
					</tr>
					<tr>
						<th class=""><label for="year">제작년도</label></th>
						<td><input type="text" id="a_year" name="a_year" style="width:200px" maxlength="30"></td>
					</tr>
					<tr>
						<th class=""><label for="own">소장</label></th>
						<td><input type="text" id="a_own" name="a_own" style="width:200px" maxlength="30"></td>
					</tr>
					<tr>
						<th class=""><label for="content">소개</label></th>
						<td colspan="2">
							<textarea rows="15" class="tran" id="a_content" name="a_content" style='width: 85%; height: 200px;'></textarea>
						</td>
					</tr>
					<tr>
						<th><label for="file">파일</label></th>
						<td>
						<div id="fileDiv">
						<input type="file" id="file" name="file" onchange="previewImage(this,'previewId');"/><br/>
						</div>
						<div id='previewId'
							style='display:block;width:200px;height:200px;border:1px dashed RGB(211, 211, 211);'>
						</div>
						<span class="date">&nbsp;&nbsp;*&nbsp;임의로 파일명이 변경될 수 있습니다.</span></td>			
					</tr>				
				</table>       
			</div>
		</div>

		<!-- Button -->
		
		<div class="btn_area tr">
			<input type="submit" value="확인">
			<input type="reset" value="재작성"/>
			<input type="button" value="취소" onclick="moveAction();" />
		</div>
	</div>
</div>
</form>
</body>
<script> 
function formCheck(){

var dbj = document.checkFileForm2;
var a_name    = dbj.a_name.value;
var a_title   = dbj.a_title.value;
var a_content = dbj.a_content.value;


if(check(trim(a_name))){
	alert("작가를 입력해 주세요");
	$("#a_name").focus(); //커서를 타이틀로 옮겨줌
	return false;
}

if(check(trim(a_title))){
	alert("제목을 입력해 주세요");
	$("#a_title").focus();
	return false;
}

if(check(trim(a_content))){
	alert("내용을 입력해 주세요");
	$("#a_content").focus();
	return false;
	
}
}

function fileCheckGo(){

var ob = document.checkFileForm2;
var fileObj = document.getElementById("file");
var strCheckValue = "";
strCheckValue = ((ob.file.value).substring((ob.file.value).lastIndexOf(".")+1)).toUpperCase();
if(!(strCheckValue == "GIF" || strCheckValue == "JPG" || strCheckValue == "JPEG" || strCheckValue == "BMP" || strCheckValue == "PNG")){
	alert("파일형식(gif,jpg,jpeg,bmp,png)을 확인해 주십시요!");
	return checkValueReset();
	}
}


function previewImage(targetObj, previewId) {

var preview = document.getElementById(previewId); //div id   
var ua = window.navigator.userAgent;
fileCheckGo();
if (ua.indexOf("MSIE") > -1) {//ie일때

    targetObj.select();

  try {
      var src = document.selection.createRange().text; // get file full path 
      var ie_preview_error = document
              .getElementById("ie_preview_error_" + previewId);

      if (ie_preview_error) {
          preview.removeChild(ie_preview_error); //error가 있으면 delete
      }

      var img = document.getElementById(previewId); //이미지가 뿌려질 곳 

      img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
              + src + "', sizingMethod='scale')"; //이미지 로딩, sizingMethod는 div에 맞춰서 사이즈를 자동조절 하는 역할
  } catch (e) {
      if (!document.getElementById("ie_preview_error_" + previewId)) {
          var info = document.createElement("<p>");
          info.id = "ie_preview_error_" + previewId;
          info.innerHTML = "a";
          preview.insertBefore(info, null);
      }
  }
} else { //ie가 아닐때
    var files = targetObj.files;
    for ( var i = 0; i < files.length; i++) {

        var file = files[i];

        var imageType = /image.*/; //이미지 파일일경우만.. 뿌려준다.
        if (!file.type.match(imageType))
            continue;

        var prevImg = document.getElementById("prev_" + previewId); //이전에 미리보기가 있다면 삭제
        if (prevImg) {
            preview.removeChild(prevImg);
        }

        var img = document.createElement("img"); //크롬은 div에 이미지가 뿌려지지 않는다. 그래서 자식Element를 만든다.
        img.id = "prev_" + previewId;
        img.classList.add("obj");
        img.file = file;
        img.style.width = '50px'; //기본설정된 div의 안에 뿌려지는 효과를 주기 위해서 div크기와 같은 크기를 지정해준다.
        img.style.height = '50px';
        
        preview.appendChild(img);

    if (window.FileReader) { // FireFox, Chrome, Opera 확인.
       var reader = new FileReader();
       reader.onloadend = (function(aImg) {
           return function(e) {
               aImg.src = e.target.result;
           };
     	})(img);
 		 reader.readAsDataURL(file);
		} else { // safari is not supported FileReader
 	 //alert('not supported FileReader');
	  if (!document.getElementById("sfr_preview_error_"
          + previewId)) {
          var info = document.createElement("p");
          info.id = "sfr_preview_error_" + previewId;
          info.innerHTML = "not supported FileReader";
          preview.insertBefore(info, null);
     }
 	}
  }
 }
}

//첨부파일부분 리셋!!
 function checkValueReset(){
	   var fileDiv = document.getElementById("fileDiv");
	   fileDiv.innerHTML = "<input name=\"file\" type=\"file\" size=\"20\" onchange=\"previewImage(this,'previewId');\">";
	 }
function moveAction(){
	
	location.href = "artList.do";
	
}
function check(val){
	if (val == null || val == ""){ return true;} else {return false;}
}
	
function trim(str){
		 return String(str).replace(/^\s+|\s+$/g, "");
}
</script>
</html>