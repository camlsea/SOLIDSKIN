/*
 * Util v1.0
 * License - LGPL
 * Created - 2009.12.15
 * Copyright(c) 2009, 고승원(Seungwon, Go), (주)비피엔알.
 * http://www.bpnr.co.kr
 * email: jeremy@bpnr.co.kr
 */


function Util(){};

Util.FLOAT_RE = /^[+\-]?((\d+(\.\d*)?)|((\d*\.)?\d+))([eE][+\-]?\d+)?$/;
Util.NOTFLOAT_RE = /[^\d\.]/;
Util.NOTINT_RE = /[^0-9]+/;
Util.EMAIL_SHORT_RE = /^[^@\s]+$/;
Util.EMAIL_FULL_RE = /^[^@\s]+@[A-Za-z0-9\-]{2,}(\.[A-Za-z0-9\-]{2,})*$/;
Util.EMAIL_RE = /^([a-zA-Z0-9_\-])+((\.)?([a-zA-Z0-9_\-])+)*@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
Util.IP_ADDRESS_RE = /^\d{1,3}(\.\d{1,3}){3}(\.\d{1,3}\.\d{1,3})?$/;
Util.DOMAIN_NAME_SHORT_RE = /^[A-Za-z0-9\-]{2,}$/;
Util.DOMAIN_NAME_FULL_RE = /^[A-Za-z0-9\-]{2,}(\.[A-Za-z0-9\-]{2,}){1,}$/;
Util.HOST_NAME_RE = /^[A-Za-z0-9\-]{2,}(\.[A-Za-z0-9\-]{2,})*$/;
Util.HOST_NAME_WITH_PORT_RE = /^[A-Za-z0-9\-]{2,}(\.[A-Za-z0-9\-]{2,})*:([0-9])+$/;

/**
* 객체가 있는지 체크
* @param {String} s - 객체 혹은 변수 
* @return {Boolean}
*/
Util.isUndefined = function( s ){ 
	return (s === void 0); 
};

/**
* 객체가 null인지 체크
* @param {String} s - 객체 혹은 변수 
* @return {Boolean}
*/
Util.isNull = function( s ){ 
	return (s === null); 
};

/**
* 값이 비여있는지 체크
* @param {String} s - 변수 
* @return {Boolean}
*/
Util.isEmpty = function( s ){
	return !/\S/.test(s);
};

/**
* 객체의 타입의 Boolean인지 체크
* @param {String} s - 객체
* @return {Boolean}
*/
Util.isBoolean = function( s ){ 
	return (typeof(s) == 'boolean'); 
};

/**
* 객체의 타입의 String인지 체크
* @param {String} s - 객체 
* @return {Boolean}
*/
Util.isString = function( s ){ 
	return (typeof(s) == 'string'); 
};

/**
* 객체의 타입의 Number인지 체크
* @param {String} s - 객체 
* @return {Boolean}
*/
Util.isNumber = function( s ){ 
	return (typeof(s) == 'number');
};

/**
* 객체의 타입의 Object인지 체크
* @param {String} s - 객체 
* @return {Boolean}
*/
Util.isObject = function( s ){ 
	return ((typeof(s) == 'object') && (s !== null)); 
};

/**
* 객체의 타입의 Function인지 체크
* @param {String} s - 객체 
* @return {Boolean}
*/
Util.isFunction = function( s ){ 
	return (typeof(s) == 'function'); 
};

/**
* 값이 numeric 형태인지 체크
* @param {String} s - 변수 
* @return {Boolean}
*/
Util.isNumeric = function( s ){ 
	return (!isNaN(parseFloat(s)) && Util.FLOAT_RE.test(s) && !Util.NOTFLOAT_RE.test(s)); 
};

/**
* 값이 long 형태인지 체크
* @param {String} s - 변수 
* @return {Boolean}
*/
Util.isLong = function( s ){ 
	return (Util.isNumeric(s) && !Util.NOTINT_RE.test(s)); 
};

/**
* 값이 양수형태의 long 형태인지 체크
* @param {String} s - 변수 
* @return {Boolean}
*/
Util.isNonNegativeLong = function( s ){ 
	return (Util.isNumeric(s) && Util.isLong(s) && (parseFloat(s) >= 0)); 
};

/**
* 값이 email 형태인지 체크
* @param {String} s - 변수 
* @return {Boolean}
*/
Util.isEmailAddress = function( s, nameOnly ){
	return nameOnly ? Util.EMAIL_SHORT_RE.test(s) : Util.EMAIL_FULL_RE.test(s);
};

/**
* 값이 ip address 형태인지 체크
* @param {String} s - 변수 
* @return {Boolean}
*/
Util.isIpAddress = function(s){ 
	return Util.IP_ADDR_RE.test(s); 
};

/**
* 값이 domain 형태인지 체크
* @param {String} s - 변수 
* @return {Boolean}
*/
Util.isDomain = function(s){	
	return Util.DOMAIN_RE.test(s); 
};

/**
* 값이 host name 형태인지 체크
* @param {String} s - 변수 
* @return {Boolean}
*/
Util.isHostName = function(s){ 
	return Util.HOST_NAME_RE.test(s); 
};

/**
* 값이 domain name 형태인지 체크
* @param {String} s - 변수 
* @return {Boolean}
*/
Util.isDomainName = function(s, shortMatch){
	return shortMatch ? Util.DOMAIN_NAME_SHORT_RE.test(s) : Util.DOMAIN_NAME_FULL_RE.test(s);
};

/**
* 변수의 앞뒤 공백을 제거하는 trim 기능
* @param {String} value - trim 하려는 값
* @return {String} trim된 값
*/
Util.trim = function( value ){
	return String(value).replace(/^\s+|\s+$/g, "");
};

/**
* 종료 날짜에서 시작 날짜를 빼서 몇일 간격인지 반환
* @param {String} fromDate - 시작 날짜
* @param {String} toDate - 종료 날짜
* @return {Number} 날짜 간격
*/
Util.getDateInterval = function( fromDate, toDate ){
	var interval = new Date(toDate.substring(0,4),toDate.substring(5,7),toDate.substring(8,10)) - new Date(fromDate.substring(0,4),fromDate.substring(5,7),fromDate.substring(8,10));
	interval = Math.floor(interval/(24*3600*1000));
	
	return interval;
};

/**
 * 값이 undefined 이거나 공백이면 디폴트로 지정한 값을 리턴하고, 그렇지 않으면 원래값을 리턴한다.
 * @param {Mixed} 체크할 값
 * @param {String} 디폴트 값
 * @return {String}
 */
Util.defaultValue = function( value, defaultValue ){
	return value !== undefined && value !== '' ? value : defaultValue;
};

/**
 * 특자 문자인 (&, <, >, ') 과 같은 문자를 HTML Encode 문자로 변환한다.
 * @param {String} 인코드 할 문자열
 * @return {String} 인코드 된 문자열
 */
Util.htmlEncode = function( value ){
	return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
};

/**
 * HTML Decode.
 * @param {String} 디코드할 문자열
 * @return {String} 디코드된 문자열
 */
Util.htmlDecode = function( value ){
	return !value ? value : String(value).replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"');
};

Util.setCopyToClipboard = function( obj ){
	
};

/**
 * 파라미터가 string 값이면 바로복사하고 TD인경우는 TD안의 innerText를 복사하고 내용을 클립보드에 복사한다.
 * @param {?} obj
 * @return {Boolean} 
 */
Util.copyText = function ( obj ){
	var copytext = "";

	if(Util.isString(obj)) copytext = obj;
	else if(Util.isObject(obj) && obj.tagName != "INPUT") {
		if(obj.getElementsByTagName("INPUT")[0] == undefined) copytext = obj.childNodes[0].nodeValue;
		else copytext = obj.getElementsByTagName("INPUT")[0].value;
	}else if(Util.isObject(obj) && obj.tagName == "INPUT") copytext = obj.value;

	if (window.clipboardData){	//익스플로우인 경우
		window.clipboardData.setData("Text", copytext);
		alert("Copy '" + copytext + "' to Clipboard!!");
		return true;
	}else if (window.netscape){	//파이어폭스인 경우
		netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if (!clip) return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if (!trans) return;

		trans.addDataFlavor('text/unicode');

		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		str.data=copytext;

		trans.setTransferData("text/unicode",str,copytext.length*2);
		var clipid=Components.interfaces.nsIClipboard;
		if (!clip) return false;
		clip.setData(trans,null,clipid.kGlobalClipboard);
		alert("Copy '" + copytext + "' to Clipboard!!");
		return true;
	}

	return false;
};