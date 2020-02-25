/*
 * InputText v1.0
 * License - LGPL
 * Created - 2009.12.15
 * Copyright(c) 2009, 고승원(Seungwon, Go), (주)비피엔알.
 * http://www.bpnr.co.kr
 * email: jeremy@bpnr.co.kr
 */


function AjaxUtil(){};

/**
* ajax를 이용하기 위한 XMLHttpRequest를 생성한다.
*/

AjaxUtil.HttpReq = false;
AjaxUtil.FuncName = null;

if (window.XMLHttpRequest) AjaxUtil.HttpReq = new XMLHttpRequest();
else AjaxUtil.HttpReq = new ActiveXObject("Msxml2.XMLHTTP");  
	
if(!AjaxUtil.HttpReq){
		alert("Error initializing XMLHttpRequest");
	}


/**
* ajax 방식으로 해당 url을 호출한다.
* @param {String} method - 파라미터를 넘길 방식 지정 (POST,GET)  
* @param {String} url - 호출할 url 
* @param {String} param - 넘길 파라미터
* @param {String} isAsync - true(비동기식), false(동기식)
* @param {String} functionName - url에 호출 후 결과를 받을 function 지정
* @return {None}
*/
AjaxUtil.callRequest = function( method, url, param, isAsync, functionName ){
	AjaxUtil.FuncName = functionName;
	
	if(method.toUpperCase() == "POST") {
		AjaxUtil.HttpReq.open(method.toUpperCase(), url, isAsync);
		AjaxUtil.HttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");
		AjaxUtil.HttpReq.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
		AjaxUtil.HttpReq.setRequestHeader("Pragma", "no-cache");
		AjaxUtil.HttpReq.setRequestHeader('Content-length', param.length);
		AjaxUtil.HttpReq.setRequestHeader("Connection", "close");
		AjaxUtil.HttpReq.send(param);
	}else {
		AjaxUtil.HttpReq.open(method, url + "?" + param, isAsync);
		AjaxUtil.HttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");
		AjaxUtil.HttpReq.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
		AjaxUtil.HttpReq.setRequestHeader("Pragma", "no-cache");
		AjaxUtil.HttpReq.send("");
	}
	
	AjaxUtil.HttpReq.onreadystatechange = AjaxUtil.callback;
};

/**
* ajax 방식으로 호출한 url로 부터 결과를 리턴받은 후 그 결과를 자바스크립트 function에 파라미터로 넘겨준다.
* @return {None}
*/
AjaxUtil.callback = function(){
	if(AjaxUtil.HttpReq.readyState == 4)                                 
	 {
		if(AjaxUtil.HttpReq.status == 200){                          
			var resultData = AjaxUtil.HttpReq.responseText;
			eval(AjaxUtil.FuncName + "(" + resultData + ")");
		} else if(AjaxUtil.HttpReq.status == 404)                    
			alert("Request URL does not exist");
		else
			alert("ERROR:status code is" + AjaxUtil.HttpReq.status);    
	}
};