/*
 * Popup v1.0
 * License - LGPL
 * Created - 2009.12.15
 * Copyright(c) 2009, 고승원(Seungwon, Go), (주)비피엔알.
 * http://www.bpnr.co.kr
 * email: jeremy@bpnr.co.kr
 */


function Popup(){};

/**
* url에 해당하는 팝업을 오픈한다.
* @param {String} url - 팝업 url
* @param {String} width - 팝업 넓이
* @param {String} height - 팝업 높이
* @return {None}
*/
Popup.open = function( url, width, height, features ){
	var left;
	var top;

	if(window.event != undefined){
		var x = document.body.clientWidth - event.clientX - width;
		var y = document.body.clientHeight - event.clientY - height;
		left = event.clientX;
		top = event.clientY;
		if(x < 10) left = event.clientX + x;
		if(y < 10) top = event.clientY + y;
	}else{
		left = 100;
		top = 100;
	}
	
	var sFeatures = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, copyhistory=yes, resizable=no";

	if(features != undefined && features != "") sFeatures = features;
	
	window.open( url,'','left=' + left + ', top=' + top + ', width=' + width + ', height=' + height + ', ' + sFeatures);
};

/**
* url에 해당하는 팝업을 오픈한다. 해당 폼에 있는 파라미터를 post 방식으로 전달
* @param {String} formName - 전달할 파라미터가 들어있는 form name
* @param {String} url - 팝업 url
* @param {String} width - 팝업 넓이
* @param {String} height - 팝업 높이
* @return {None}
*/
Popup.openPost = function( formName, url, width, height ){
	var left;
	var top;
	
	if(window.event != undefined){
		var x = document.body.clientWidth - event.clientX - width;
		var y = document.body.clientHeight - event.clientY - height;
		left = event.clientX;
		top = event.clientY;
		if(x < 10) left = event.clientX + x;
		if(y < 10) top = event.clientY + y;
	}else{
		left = 100;
		top = 100;
	}
	
	var frm = eval("document." + formName);
	window.open('','popup_post','left=' + left + ', top=' + top + ', width=' + width + ', height=' + height + ', toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, copyhistory=yes, resizable=no');
	frm.target = "popup_post";
	frm.action = url;
	frm.submit();
};
