/*
 * RSS v1.0
 * License - LGPL
 * Created - 2009.12.15
 * Copyright(c) 2009, 고승원(Seungwon, Go), (주)비피엔알.
 * http://www.bpnr.co.kr
 * email: jeremy@bpnr.co.kr
 */


function RSS(){};

RSS.read = function( url ){
	HttpReq = false;

	if (window.XMLHttpRequest) HttpReq = new XMLHttpRequest();
	else HttpReq = new ActiveXObject("Msxml2.XMLHTTP");  
		
	if(!HttpReq){
		alert("Error initializing XMLHttpRequest");
	}

	HttpReq.open("Get", url, false);
	HttpReq.send("");

	return HttpReq.responseXML;
};