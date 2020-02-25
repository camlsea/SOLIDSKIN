/*
 * HtmlDomObjects v1.0
 * License - LGPL
 * Created - 2009.12.15
 * Copyright(c) 2009, 고승원(Seungwon, Go), (주)비피엔알.
 * http://www.bpnr.co.kr
 * email: jeremy@bpnr.co.kr
 * HTML DOM에서 제공하는 Object에 대한 각종 기능을 처리하는 스크립트
 */

/**
* D는 DOM Object에 약자로 정하고, 소스 코딩시 편의를 위해 필수 기능를 제공한다.
*/
function D(){};

D.get = function( id ){
	return document.getElementById(id);
};

D.set = function ( id, v ){
	D.get(id).value = v;
};

D.gets = function( name ) {
	return document.getElementsByName(name);
};

D.sets = function( name, v){
	var obj = D.gets(name);
	if(obj != undefined){
		var length = obj.length;
		if(length != undefined){
			for(var i=0; i<length ; i++){
				obj[i].value = v;
			}
		}else obj.value = v;
	}
};

D.getHTML = function( id ){
	return D.get(id).innerHTML;
};

D.setHTML = function( id, html ){
	D.get(id).innerHTML = html;
};

D.hide = function( id ){
	DomObject.hide(id);
};

D.show = function( id ){
	DomObject.show(id);
};

D.getStyle = function( id, styleName ){
	return eval("D.get('" + id + "')" + ".style." + styleName);
};

D.setStyle = function( id, styleName, styleValue ){
	eval("D.get('" + id + "').style." + styleName + "='" + styleValue + "'");
};

D.height = function( id ){
	return DomObject.getHeight(id);
};

D.width = function( id ){
	return DomObject.getWidth(id);
};

D.getAttr = function( id, attrName ){
	return D.get(id).getAttribute(attrName);
};

D.setAttr = function( id, attrName, attrValue ){
	D.get(id).setAttribute(attrName, attrValue);
};

D.click = function( id, func ){
	Event.attach(id,"onclick",func);	
};

D.change = function( id, func ){
	Event.attach(id,"onchange",func);	
};

D.getParent = function( node, tagName ){
	return DomObject.getParentObject(node,tagName);
};

D.disabled = function( id ){
	D.get(id).disabled = true;
};

D.enabled = function( id ){
	D.get(id).disabled = false;
};

/**
* 상위 노드 가져오기
*/
function DomObject(){};

/**
* 상위 노드 가져오기
* @param {String} node - 노드
* @param {String} tagName - 가져올 노드의 태그명 
* @return {Object}
*/
DomObject.getParentObject = function( node, tagName ){
	while( node.tagName != tagName){
		node = node.parentNode;
	}

	return node;
};

/**
* 하위 오브젝트 가져오기
* @param {String} id - 오브젝트 id
* @param {String} tagName - 가져올 노드의 태그명 
* @return {Object}
*/
DomObject.getChildObject = function( id, tagName ){
	var obj = D.get(id);
	if(obj.tagName == tagName) return obj;
	else return obj.getElementsByTagName(tagName)[0];
};

/**
* 하위 오브젝트 가져오기
* @param {String} id - 오브젝트 id
* @param {String} tagName - 가져올 노드의 태그명 
* @return {Object}
*/
DomObject.getObject = function( id, tagName ){
	var obj = D.get(id);
	if(obj.tagName == tagName) return obj;
	else return obj.getElementsByTagName(tagName)[0];
};

/**
* 오브젝트 width 가져오기
* @param {String} id - 가져올 오브젝트의 id
* @return {Number}
*/
DomObject.getWidth = function( id ){
	return D.get(id).offsetWidth;
};

/**
* 오브젝트 height 가져오기
* @param {String} id - 가져올 오브젝트의 id
* @return {Number}
*/
DomObject.getHeight = function( id ){
	return D.get(id).offsetHeight;
};

/**
* 오브젝트 left 가져오기
* @param {String} id - 가져올 오브젝트의 id
* @return {Number}
*/
DomObject.getLeft = function( id ){
	return D.get(id).offsetLeft;
};

/**
* 오브젝트 top 가져오기
* @param {String} id - 가져올 오브젝트의 id
* @return {Number}
*/
DomObject.getTop = function( id ){
	return D.get(id).offsetTop;
};

/**
* 오브젝트 안의 텍스트 가져오기 (TD,DIV,SPAN 등)
* @param {Object} obj - 가져올 오브젝트
* @return {String}
*/
DomObject.getInnerText = function( obj ){
	var lastNode = obj;
	while(lastNode.childNodes[0] != undefined){
		lastNode = lastNode.childNodes[0];
	}
	
	if(lastNode.tagName == "INPUT"){
		if(lastNode.checked != undefined) lastNode = lastNode.nextSibling;
	}

	if(lastNode.tagName == "LABEL"){
		lastNode = lastNode.childNodes[0];
	}

	return (lastNode.nodeValue==null)?"":lastNode.nodeValue;
};

DomObject.getInnerNumber = function( obj ){
	var v = DomObject.getInnerText(obj);
	
	var regExp=/\D/g;
	var prefix = "";
	var d = "";
	
	if(v.indexOf("-") > -1) {
		prefix = "-";
		v = v.substring(1);
	}

	if(v.indexOf(".") > -1) {
		d = v.substring(v.indexOf("."));
		d = "." + d.substring(1).replace(regExp,"");
		v = v.substring(0,v.indexOf("."));
	}
	var fv=v.replace(regExp,"");
	
	return prefix+fv+d;
};

/**
* 오브젝트 안의 input 객체의 값 가져오기 (TD,DIV,SPAN 등)
* @param {Object} obj - 가져올 오브젝트
* @return {String}
*/
DomObject.getInnerValue = function( obj ){
	return obj.getElementsByTagName("INPUT")[0].value;
};

/**
* TD tag 의 innerText 혹은 TD Tag안에 있는 input field의 value를 float 형식으로 반환하다.
* @param {Object} obj - 가져올 오브젝트
* @return {Float}
*/
DomObject.getFloatValue = function( obj ){
	var regExp=/\D/g;
	var v = 0;
	
	if(obj.getElementsByTagName("INPUT")[0] == undefined) v = DomObject.getInnerText(obj);
	else v = DomObject.getInnerValue(obj);

	if(v == "") return 0;

	var d = "";
	if(v.indexOf(".") > -1) {
		d = v.substring(v.indexOf("."));
		v = v.substring(0,v.indexOf("."));
	}
	var fv=v.replace(regExp,"");
	
	return parseFloat(fv+d);
};

/**
* float 형식의 숫자를 금액 표시의 포맷을 적용한 값을 가져온다.예, 136000.12 -> 136,000.12
* @param {Object} obj - 가져올 오브젝트
* @return {String}
*/
DomObject.getFloatFormatValue = function ( floatValue ){
	var v = String(floatValue);
	var d = "";
	if(v.indexOf(".") > -1) {
		d = v.substring(v.indexOf("."));
		v = v.substring(0,v.indexOf("."));
	}
	var regExp=/\D/g;
	v = v.replace(regExp,"");
	var r = /(\d+)(\d{3})/;
	while (r.test(v)) {
		v = v.replace(r, '$1' + ',' + '$2');
	}
	
	return v+d;
};

DomObject.accessKey = function( id, key ){
	D.get(id).accessKey = key;
};

DomObject.show = function( id ){
	D.get(id).style.display = "";
};

DomObject.hide = function( id ){
	D.get(id).style.display = "none";
};

DomObject.setStyle = function ( id, key, value ){
	eval("document.getElementById('" + id + "').style." + key + " = '" + value + "';");
};

DomObject.showTooltip = function( e ){
	var style = [{key:"position",v:"absolute"},{key:"zIndex",v:"100"},{key:"display",v:"none"},{key:"color",v:"black"},{key:"font",v:"bold 12px tahoma,dotum"},{key:"border",v:"1px solid #555555"},{key:"backgroundColor",v:"#ffffe1"},{key:"padding",v:"5px 5px 5px 5px"},{key:"maxWidth",v:"200px"}];
	Div.create("bpnr_tooltip_div", style);
	Iframe.createLayer("bpnr_tooltip_iframe","none");
	
	var tooltip = Event.getObject(e).getAttribute("tooltip")!=undefined?Event.getObject(e).getAttribute("tooltip"):DomObject.getInnerText(Event.getObject(e));
	if(tooltip==''){
		return;
	}
	D.get("bpnr_tooltip_div").innerHTML = tooltip;
	D.get("bpnr_tooltip_div").style.display = "";

	var x = Body.getWidth() - Event.X(e) - D.get("bpnr_tooltip_div").offsetWidth;
	//var y = Body.getHeight() - Event.Y(e) - D.get("bpnr_tooltip_div").offsetHeight;
	var left = Event.X(e);
	var top = Event.Y(e);
	
	if(x < 10) left = left + x - 25;
	//if(y < 10) top = top + y;

	D.get("bpnr_tooltip_div").style.top = top;
	D.get("bpnr_tooltip_div").style.left = left;

	Iframe.showLayer("bpnr_tooltip_iframe","bpnr_tooltip_div");
};

DomObject.hideTooltip = function(){
	D.get("bpnr_tooltip_div").style.display = "none";
	D.get("bpnr_tooltip_iframe").style.display = "none";
};

/** =================================================================================================== */
/** Table Object에 대한 각종 기능을 제공합니다.															*/
/** =================================================================================================== */

function Table(){};

/**
* 테이블에 마우스 오버 되었을때 TR 색상변경
* @param {String} 
* @return {None}
*/
Table.mouseoverTr = function( obj ){
	if(obj.getAttribute("isselect") == undefined || obj.getAttribute("isselect") == "false"){
		obj.setAttribute("oClassName", obj.className);
		obj.className='over';
	}
};

/**
* 테이블에 마우스 아웃 되었을때 TR 원래 색상으로 변경
* @param {String} 
* @return {None}
*/
Table.mouseoutTr = function( obj ){
	if(obj.getAttribute("isselect") == undefined || obj.getAttribute("isselect") == "false")obj.className = obj.getAttribute("oClassName");
};

/**
* 브라우저가 Firefox인 경우 스크롤 헤더의 넓이를 스크롤 width인 17만큼 빼줘야함
* 데이터 영역 테이블의 높이를 클라이언트 사이즈에 맞게 조절
* @param {String} tb_head - 헤더가 들어있는 table id
* @param {String} tb_body - 데이터가 들어있는 table id
* @param {String} fixedHeight - 테이터가 표시되는 테이블을 제외한 컨텐츠의 높이
* @return {}
*/
Table.setOneScroll = function( tb_head, tb_body, fixedHeight ){
	if(navigator.userAgent.indexOf("Firefox") > -1) D.get(tb_head).style.width = D.get(tb_head).offsetWidth-17;
	
	if(fixedHeight != undefined) {
		D.get(tb_body).style.height = Body.getHeight() - fixedHeight;
	}
};

Table.setFixedVScroll = function(tb_head, tb_body, h){
	var dataTable = D.get(tb_body);
	var div = dataTable.parentNode;
	
	div.style.height = h;
	
	if(dataTable.offsetHeight > h) {
		var scrollSize = 17;
		if(dataTable.getAttribute("resizeYN")=="Y") scrollSize = 0;

		D.get(tb_head).style.width = dataTable.offsetWidth-scrollSize;
		div.style.overflowY = "scroll";
	}else {
		div.style.height = "";
		D.get(tb_head).style.width = dataTable.offsetWidth;
	}

	dataTable.setAttribute("thead_id",tb_head);
	dataTable.setAttribute("tbody_id",tb_body);
	dataTable.setAttribute("fixed_height",h);
	dataTable.setAttribute("resizeYN","Y");
	dataTable.onresize = Table.resizeFixedVScroll;
};

Table.resizeFixedVScroll = function(e){
	var obj = Event.getObject(e);
	var tb = obj.getAttribute("tbody_id");
	var th = obj.getAttribute("thead_id");
	var fixedHeight = obj.getAttribute("fixed_height");

	Table.setFixedVScroll(th, tb, fixedHeight);
};

Table.setVScroll = function(tb_head, tb_body, fixedHeight){
	var dataTable = D.get(tb_body);
	var div = dataTable.parentNode;
	
	div.style.height = Body.getHeight() - fixedHeight;

	var regexp = /px/g;
	var divHeight = div.style.height;
	divHeight = divHeight.replace(regexp,"");

	if(dataTable.offsetHeight > divHeight) {
		var scrollSize = 17;
		if(dataTable.getAttribute("resizeYN")=="Y") scrollSize = 0;

		D.get(tb_head).style.width = dataTable.offsetWidth-scrollSize;
		div.style.overflowY = "scroll";
	}else {
		div.style.height = "";
		D.get(tb_head).style.width = dataTable.offsetWidth;
	}
	
	dataTable.setAttribute("thead_id",tb_head);
	dataTable.setAttribute("tbody_id",tb_body);
	dataTable.setAttribute("fixed_height",fixedHeight);
	dataTable.setAttribute("resizeYN","Y");
	dataTable.onresize = Table.resizeVScroll;
};

Table.resizeVScroll = function(e){
	var obj = Event.getObject(e);
	var tb = obj.getAttribute("tbody_id");
	var th = obj.getAttribute("thead_id");
	var fixedHeight = obj.getAttribute("fixed_height");

	Table.setVScroll(th, tb, fixedHeight);
};

Table.st_thead_div;
Table.st_tbody_div1;
Table.st_tbody_div2;

/**
* 상하, 좌우 스크롤이 필요한 테이블에서 스크롤 처리 및 테이블 사이즈 자동 지정
* @param {String} thead_div - 우측상단헤더의 div아이디 
* @param {String} tbody_div1 - 좌측하단데이터영역의 div아이디 
* @param {String} tbody_div2 - 우측하단데이터영역의 div아이디
* @param {String} tbody_tb1 - 좌측하단 데이터영역의 table아이디
* @param {String} tbody_tb2 - 우측하단 데이터영역의 table아이디
* @param {String} fixedHeight - 테이터가 표시되는 테이블을 제외한 컨텐츠의 높이
* @return {}
*/
Table.setTwoScroll = function( thead_div,tbody_div1,tbody_div2,tbody_tb1,tbody_tb2, fixedHeight, remainWidth ){
	var fixedWidth = D.get(tbody_tb1).offsetWidth + (remainWidth==undefined?60:remainWidth);
	var scrollSize = 17;
	var noScrollSize = 0;
	var lrScroll = false;
	var tbScroll = false;
	
	if(Body.getHeight() - (fixedHeight + D.get(tbody_tb2).offsetHeight) < 0) tbScroll = true;	
	if(Body.getWidth() - (fixedWidth + D.get(tbody_tb2).offsetWidth) < 0) lrScroll = true;
	
	if(Body.getWidth() - fixedWidth > 0){
		if(tbScroll){	
			D.get(thead_div).style.width = Body.getWidth() - fixedWidth - 16;
			D.get(tbody_div2).style.width = Body.getWidth() - fixedWidth;
		}else{
			D.get(thead_div).style.width = Body.getWidth() - fixedWidth;
			D.get(tbody_div2).style.width = Body.getWidth() - fixedWidth;
		}	
	}

	if(lrScroll){
		if(D.get(tbody_tb1).offsetHeight > (Body.getHeight() - fixedHeight - scrollSize)){
			D.get(tbody_div1).style.height = Body.getHeight() - fixedHeight - scrollSize;
			D.get(tbody_div2).style.height = Body.getHeight() - fixedHeight;
		}else {
			D.get(tbody_div1).style.height = D.get(tbody_tb1).offsetHeight;
			D.get(tbody_div2).style.height = D.get(tbody_tb2).offsetHeight + scrollSize;
		}
	}else{
		if(D.get(tbody_tb1).offsetHeight > (Body.getHeight() - fixedHeight - scrollSize)){
			D.get(tbody_div1).style.height = Body.getHeight()- fixedHeight;
			D.get(tbody_div2).style.height = Body.getHeight()- fixedHeight;
		}else {
			D.get(tbody_div1).style.height = D.get(tbody_tb1).offsetHeight;
			D.get(tbody_div2).style.height = D.get(tbody_tb2).offsetHeight;
		}
	}

	Table.st_thead_div = D.get(thead_div);
	Table.st_tbody_div1 = D.get(tbody_div1);
	Table.st_tbody_div2 = D.get(tbody_div2);
};

Table.setFixedTwoScroll = function( thead_div,tbody_div1,tbody_div2,tbody_tb1,tbody_tb2, h, remainWidth ){
	var fixedWidth = D.get(tbody_tb1).offsetWidth + (remainWidth==undefined?60:remainWidth);
	var scrollSize = 17;
	var noScrollSize = 0;
	var lrScroll = false;
	var tbScroll = false;
	
	if(h -  D.get(tbody_tb2).offsetHeight <= 0) tbScroll = true;	
	if(Body.getWidth() - (fixedWidth + D.get(tbody_tb2).offsetWidth) <= 0) lrScroll = true;
	
	if(Body.getWidth() - fixedWidth > 0){
		if(tbScroll){	
			D.get(thead_div).style.width = Body.getWidth() - fixedWidth - 16;
			D.get(tbody_div2).style.width = Body.getWidth() - fixedWidth;
		}else{
			D.get(thead_div).style.width = Body.getWidth() - fixedWidth;
			D.get(tbody_div2).style.width = Body.getWidth() - fixedWidth;
		}	
	}

	if(lrScroll){
		if(D.get(tbody_tb1).offsetHeight > h - scrollSize){
			D.get(tbody_div1).style.height = h - scrollSize;
			D.get(tbody_div2).style.height = h;
		}else {
			D.get(tbody_div1).style.height = D.get(tbody_tb1).offsetHeight;
			D.get(tbody_div2).style.height = D.get(tbody_tb2).offsetHeight + scrollSize;
		}
	}else{
		if(D.get(tbody_tb1).offsetHeight > Body.getWidth() - scrollSize){
			D.get(tbody_div1).style.height = h;
			D.get(tbody_div2).style.height = h;
		}else {
			D.get(tbody_div1).style.height = D.get(tbody_tb1).offsetHeight;
			D.get(tbody_div2).style.height = D.get(tbody_tb2).offsetHeight;
		}
	}

	Table.st_thead_div = D.get(thead_div);
	Table.st_tbody_div1 = D.get(tbody_div1);
	Table.st_tbody_div2 = D.get(tbody_div2);
};

/**
* 좌우 스크롤이 필요한 테이블에서 스크롤 처리 및 테이블 사이즈 자동 지정
* @param {String} thead_div - 우측상단헤더의 div아이디 
* @param {String} tbody_div1 - 좌측하단데이터영역의 div아이디 
* @param {String} tbody_div2 - 우측하단데이터영역의 div아이디
* @param {String} tbody_tb1 - 좌측하단 데이터영역의 table아이디
* @param {String} tbody_tb2 - 우측하단 데이터영역의 table아이디
* @param {String} fixedHeight - 테이터가 표시되는 테이블을 제외한 컨텐츠의 높이
* @return {}
*/
Table.setHScroll = function( thead_div,tbody_div1,tbody_div2,tbody_tb1,tbody_tb2, fixedHeight, remainWidth ){
	var fixedWidth = D.get(tbody_tb1).offsetWidth + (remainWidth==undefined?60:remainWidth);
	var scrollSize = 17;
	var noScrollSize = 0;
	var lrScroll = false;
	var tbScroll = false;
	if(Body.getHeight() - (fixedHeight + D.get(tbody_tb2).offsetHeight) <= 0) tbScroll = true;	
	if(Body.getWidth() - (fixedWidth + D.get(tbody_tb2).offsetWidth) <= 0) lrScroll = true;
	
	if(Body.getWidth() - fixedWidth > 0){
		D.get(thead_div).style.width = Body.getWidth() - fixedWidth;
		D.get(tbody_div2).style.width = Body.getWidth() - fixedWidth;
	}

	
	if(lrScroll){
		D.get(tbody_div2).style.height = D.get(tbody_tb2).offsetHeight + scrollSize;
	}

	Table.st_thead_div = D.get(thead_div);
	Table.st_tbody_div1 = D.get(tbody_div1);
	Table.st_tbody_div2 = D.get(tbody_div2);
	
};

/**
* 좌우 스크롤 시 스크롤 반영
* @return {None}
*/
Table.scrollX = function(div1, div2){
    if(div1 == undefined) Table.st_thead_div.scrollLeft = Table.st_tbody_div2.scrollLeft;
	else D.get(div1).scrollLeft = D.get(div2).scrollLeft
};

/**
* 상하 스크롤 시 스크롤 반영
* @return {None}
*/
Table.scrollY = function(div1, div2){
   if(div1 == undefined) Table.st_tbody_div1.scrollTop = Table.st_tbody_div2.scrollTop;
   else D.get(div1).scrollTop = D.get(div2).scrollTop
};

/**
* 테이블 헤더 클릭시 테이블 정렬
* @param {String} thead_tb1 - 좌측 헤더영역 table id 
* @param {String} tbody_tb1 - 좌측 데이터영역 table id 
* @param {String} colIndex1 - 좌측 sort이벤트를 설정한 컬럼 index (예- "0,2,3" => 첫번째, 세번째, 네번째 컬럼);
* @param {String} thead_tb2 - 우측 헤더영역 table id 
* @param {String} tbody_tb2 - 우측 데이터영역 table id 
* @param {String} colIndex2 - 우측 sort이벤트를 설정한 컬럼 index (예- "0,2,3" => 첫번째, 세번째, 네번째 컬럼);
* @return {None}
*/
Table.setSort = function( thead_tb1, tbody_tb1, colIndex1, thead_tb2, tbody_tb2, colIndex2 ){
	 if(thead_tb2 == undefined || thead_tb2 == ""){
		var ths = D.get(thead_tb1).rows.item(0).getElementsByTagName("TH");
		if(ths == undefined) ths = D.get(thead_tb1).rows.item(0).getElementsByTagName("TD");

		var cols = colIndex1.split(",");
		var length = cols.length;
		for(var i=0 ; i<length ; i++){
			var idx = parseInt(cols[i],10);
			ths[idx].onclick = Table.sort;
			ths[idx].setAttribute("sort_tbid",tbody_tb1);
			ths[idx].setAttribute("isAsc","false");
			ths[idx].style.cursor = "pointer";
			ths[idx].title = "Sort by " + DomObject.getInnerText(ths[idx]);
		}
	 }else{
		var ths = D.get(thead_tb1).rows.item(0).getElementsByTagName("TH");
		if(ths == undefined) ths = D.get(thead_tb1).rows.item(0).getElementsByTagName("TD");

		var cols = colIndex1.split(",");
		var length = cols.length;
		for(var i=0 ; i<length ; i++){
			var idx = parseInt(cols[i],10);
			ths[idx].onclick = Table.sort2;
			ths[idx].setAttribute("sort_tbid1",tbody_tb1);
			ths[idx].setAttribute("sort_tbid2",tbody_tb2);
			ths[idx].setAttribute("sortBy","1");
			ths[idx].setAttribute("isAsc","false");
			ths[idx].style.cursor = "pointer";
			ths[idx].title = "Sort by " + DomObject.getInnerText(ths[idx]);
		}

		var ths2 = D.get(thead_tb2).rows.item(0).getElementsByTagName("TH");
		if(ths2 == undefined) ths2 = D.get(thead_tb2).rows.item(0).getElementsByTagName("TD");

		var cols2 = colIndex2.split(",");
		var length2 = cols2.length;
		for(var i=0 ; i<length2 ; i++){
			var idx = parseInt(cols2[i],10);
			ths2[idx].onclick = Table.sort2;
			ths2[idx].setAttribute("sort_tbid1",tbody_tb1);
			ths2[idx].setAttribute("sort_tbid2",tbody_tb2);
			ths2[idx].setAttribute("sortBy","2");
			ths2[idx].setAttribute("isAsc","false");
			ths2[idx].style.cursor = "pointer";
			ths2[idx].title = "Sort by " + DomObject.getInnerText(ths2[idx]);
		}
	 }
};


/**
* 테이블 헤더 클릭시 테이블 정렬
* @param {Event} e  
* @return {None}
*/
Table.sort = function( e ){
	var iRowInsertRow, iRowWalkRow, current, insert;
	var obj = Event.getObject(e);
	var id = obj.getAttribute("sort_tbid");
	var selectColIndex = obj.cellIndex;

	var isReverse = false;
	if(obj.getAttribute("isAsc") == "false") {
		isReverse = true;
		obj.setAttribute("isAsc", "true");
	}else{
		isReverse = false;
		obj.setAttribute("isAsc", "false");
	}
	
	var tbody = DomObject.getObject(id,"TBODY");
	var iRowEnd =  tbody.rows.length-1;

	for ( iRowInsert = 0 + 1 ; iRowInsert <= iRowEnd ; iRowInsert++ ){
		
		if (tbody.rows.item(iRowInsert).cells.item(selectColIndex) != undefined){
			
			textRowInsert = Table.getText(tbody.rows.item(iRowInsert).cells.item(selectColIndex));
		}
		
		if (textRowInsert != undefined)
			insert = textRowInsert.toLowerCase();
		else
			insert = "";
		
		for ( iRowWalk = 0 ; iRowWalk <= iRowInsert ; iRowWalk++ ){
			if(tbody.rows.item(iRowWalk).cells.item(selectColIndex) != undefined)
				textRowCurrent = Table.getText(tbody.rows.item(iRowWalk).cells.item(selectColIndex));
			
			if (textRowCurrent != undefined)
				current = textRowCurrent.toLowerCase();
			else
				current = "";	

			if ( ( (!isReverse && insert < current) || ( isReverse && insert > current) ) && (iRowInsert != iRowWalk) ) {
				eRowInsert = tbody.rows.item(iRowInsert);
				eRowWalk = tbody.rows.item(iRowWalk);
				
				tbody.insertBefore(eRowInsert, eRowWalk);
				iRowWalk = iRowInsert; // done
			}
		}
	}
};

/**
* 테이블 헤더 클릭시 테이블 정렬
* @param {Event} e  
* @return {None}
*/
Table.sort2 = function( e ){
	var iRowInsertRow, iRowWalkRow, current, insert;
	var obj = Event.getObject(e);
	var id = obj.getAttribute("sort_tbid1");
	var id2 = obj.getAttribute("sort_tbid2");
	var selectColIndex = obj.cellIndex;
	var isReverse = false;
	var tbody;
	var tbody2;
	
	if(obj.getAttribute("isAsc") == "false") {
		isReverse = true;
		obj.setAttribute("isAsc", "true");
	}else{
		isReverse = false;
		obj.setAttribute("isAsc", "false");
	}

	if(obj.getAttribute("sortBy") == "1"){
		tbody = DomObject.getObject(id, "TBODY");
		tbody2 = DomObject.getObject(id2, "TBODY");
	}else{
		tbody = DomObject.getObject(id2, "TBODY");
		tbody2 = DomObject.getObject(id, "TBODY");
	}

	var iRowEnd =  tbody.rows.length-1;

	for ( iRowInsert = 0 + 1 ; iRowInsert <= iRowEnd ; iRowInsert++ ){
		
		if (tbody.rows.item(iRowInsert).cells.item(selectColIndex) != undefined){
			
			textRowInsert = Table.getText(tbody.rows.item(iRowInsert).cells.item(selectColIndex));
		}
		
		if (textRowInsert != undefined)
			insert = textRowInsert.toLowerCase();
		else
			insert = "";
		
		for ( iRowWalk = 0 ; iRowWalk <= iRowInsert ; iRowWalk++ ){
			if (selectColIndex) {
				if(tbody.rows.item(iRowWalk).cells.item(selectColIndex) != undefined)
					textRowCurrent = Table.getText(tbody.rows.item(iRowWalk).cells.item(selectColIndex));
			} else {
				if (tbody.rows.item(iRowWalk) != undefined)
					textRowCurrent = Table.getText(tbody.rows.item(iRowWalk));
			}

			if (textRowCurrent != undefined)
				current = textRowCurrent.toLowerCase();
			else
				current = "";	

			if ( ( (!isReverse && insert < current) || ( isReverse && insert > current) ) && (iRowInsert != iRowWalk) ) {
				eRowInsert = tbody.rows.item(iRowInsert);
				eRowWalk = tbody.rows.item(iRowWalk);
				eRowInsert2 = tbody2.rows.item(iRowInsert);
				eRowWalk2 = tbody2.rows.item(iRowWalk);
				
				tbody.insertBefore(eRowInsert, eRowWalk);
				tbody2.insertBefore(eRowInsert2, eRowWalk2);
				iRowWalk = iRowInsert; // done
			}
		}
	}
};

/**
* TD안의 내용 가져오기
* @param {String} tdobj - td 오브젝트
* @return {None}
*/
Table.getText = function( tdobj ){
	return DomObject.getInnerText(tdobj);
};

Table.merge = function(){

};


/**
* 테이블 Body에 행추가(해당 tbody의 맨 아래에 추가)
* @param {String} id - tbody id 
* @param {Array} rowData - TD를 만들 html 내용이 들어있는 배열
* @return {None}
*/
Table.insertRow = function( id, rowData ){
	var tbody = DomObject.getObject(id,"TBODY");
	var preRow;

	if(tbody.rows.length > 0){
		preRow = tbody.rows[tbody.rows.length-1];
	}

	var row = tbody.insertRow();
	var length = rowData.length;
	for(var i=0 ; i<length ; i++){
		var cell = row.insertCell();
		
		if(preRow.tagName != undefined && preRow.cells[i] != undefined){
			cell.className = preRow.cells[i].className;
		}

		cell.innerHTML = rowData[i];
	}
};

/**
* 테이블 Body에 행추가(선택된 행 아래/위부분에 추가)
* @param {String} id - tbody id 
* @param {Array} rowData - TD를 만들 html 내용이 들어있는 배열
* @param {String} pos- TD를 만들 행이 선택된 행의 위/아래(0:맨위,1:위,2:아래)
* @param {String} idx- 선택된 행의 row Index
* @return {None}
*/
Table.insertRow2 = function( id, rowData, pos, idx ){
	var tbody = DomObject.getObject(id,"TBODY");
	var row;
	if(pos == 0)
		row = tbody.insertRow(0);
	else if(pos == 1 && idx > 0 )
		row = tbody.insertRow(idx-1);
	else
		row = tbody.insertRow(idx);

	var length = rowData.length;
	for(var i=0 ; i<length ; i++){
		var cell = row.insertCell();
		cell.innerHTML = rowData[i];
	}
};

/**
* 테이블 Body에 선택된 행 삭제
* @param {String} id - tbody id 
* @param {Number} rowIndex - 삭제할 행 번호
* @return {None}
*/
Table.deleteRow = function( id, rowIndex ){
	var tbody = DomObject.getObject(id,"TBODY");
	if(rowIndex > 0)
		tbody.deleteRow(rowIndex-1);
};

/**
* 테이블 Body의 모든 행 삭제
* @param {String} id - tbody id 
* @return {None}
*/
Table.deleteAllRow = function( id ){
	var tbody = DomObject.getObject(id,"TBODY");

	var rowLength = tbody.rows.length;
	for(var i = 0; i < rowLength; i++) {
		tbody.deleteRow(0);
	}
};

/**
* 석택된 행의 row index 가져오기
* @param {None} 
* @return {Number}
*/
Table.getRowIndex = function( e ){
	var obj = Event.getObject(e);
	while(obj.tagName != "TR") obj = obj.parentNode;

	return obj.rowIndex;
};

/**
* 석택된 열의 cell index 가져오기
* @param {None} 
* @return {Number}
*/
Table.getColIndex = function( e ){
	var obj = Event.getObject(e);
	while(obj.tagName != "TD" || obj.tagName != "TH") obj = obj.parentNode;

	return obj.cellIndex;
};

/**
* 테이블 Body의 전체 행 사이즈 가져오기
* @param {String} id - tbody id 
* @return {Number}
*/
Table.getRowSize = function( id ){
	var tbody = DomObject.getObject(id,"TBODY");

	return tbody.rows.length;
};

/**
* 테이블 Body의 전체 열 사이즈 가져오기
* @param {String} id - tbody id 
* @return {Number}
*/
Table.getColSize = function( id ){
	var tbody = DomObject.getObject(id,"TBODY");

	return tbody.rows.item(0).cells.length;
};

/**
* 테이블의 row안의 td 안의 값을 더해서 반환
* @param {String} id - tbody id 
* @param {Number} rowIndex - 행 index
* @param {Number} startColIndex - 합계를 구할 시작 column index 
* @param {Number} endColIndex - 합계를 구할 마지막 column index 
* @return {String}
*/
Table.sumCols = function( id, rowIndex, startColIndex, endColIndex){
	var tbody = DomObject.getObject(id,"TBODY");

	var sum = 0;
	var row = tbody.rows.item(rowIndex);
	for(var i=startColIndex ; i<=endColIndex ; i++){
		var col = row.cells.item(i);
		var col_value = DomObject.getFloatValue(col);
		sum += col_value;
	}

	return DomObject.getFloatFormatValue(sum);
};

/**
* 테이블에서 특정 열에 대한 전체 더한 값 반환
* @param {String} id - tbody id 
* @param {Number} columnIndex - 합을 구할 Column index
* @return {String}
*/
Table.sumRows = function( id, columnIndex ){
	var tbody = DomObject.getObject(id,"TBODY");
	
	var sum = 0;
	var RowLength = tbody.rows.length;
	for(var i=0 ; i<RowLength ; i++){
		var col = tbody.rows.item(i).cells.item(columnIndex);
		var col_value = DomObject.getFloatValue(col);
		sum += col_value;
	}

	return DomObject.getFloatFormatValue(sum);
};

/**
* 테이블에서 TD안의 글자로 Filtering 기능을 할수있도록 설정한다.
* @param {String} tb1 - table id 
* @param {String} tb2 - table id 
* @return {}
*/
Table.setFilter = function( tb1, tb2 ){
	var div = document.createElement("DIV");
	div.id = "filter_div";
	div.onmouseover = Table.showFilter2;
	div.onmouseout = Table.hideFilter;
	div.className = "m_r_pop";
	div.style.display = "none";
	
	if(tb2 == undefined || tb2 == ""){
		var tbody = DomObject.getObject(tb1,"TBODY");
		tbody.oncontextmenu = Table.showFilter;
		tbody.setAttribute("tb_idx","1");
		div.setAttribute("filter_style","1");
		div.setAttribute("tb1_id",tb1);
	}else{
		var tbody = DomObject.getObject(tb1,"TBODY");
		tbody.oncontextmenu = Table.showFilter;
		tbody.setAttribute("tb_idx","1");

		var tbody2 = DomObject.getObject(tb2,"TBODY");
		tbody2.oncontextmenu = Table.showFilter;
		tbody2.setAttribute("tb_idx","2");

		div.setAttribute("filter_style","2");
		div.setAttribute("tb1_id",tb1);
		div.setAttribute("tb2_id",tb2);
	}

	document.body.appendChild(div);
};

/**
* TD안의 글자를 가져와서 filtering 할수 있는 div를 보여준다.
* @param {Event} e
* @return {}
*/
Table.showFilter = function( e ){
	if(window.event == undefined && e == undefined) return false;
	
	//if(window.event?event.button)

	var obj = Event.getObject(e);
	var td = DomObject.getParentObject(obj, "TD");
	var tb_idx = DomObject.getParentObject(obj, "TBODY").getAttribute("tb_idx");
	var cellIndex = td.cellIndex;
	var filter_text;
	
	if(td.getElementsByTagName("INPUT")[0] == undefined && td.getElementsByTagName("A")[0] == undefined) filter_text = DomObject.getInnerText(td);
	else return false;

	var filter_div = D.get("filter_div");
	var innerHtml = '<div class="items" style="cursor:pointer;" onclick="Table.execFilter(' + tb_idx + ',' + cellIndex +',\'' + filter_text +'\');" onmouseover="this.style.backgroundColor=\'#FFFACD\'" onmouseout="this.style.backgroundColor=\'\'">'
	innerHtml += filter_text; 
	innerHtml += '</div><div class="items" style="cursor:pointer;" onclick="Table.execFilter();" onmouseover="this.style.backgroundColor=\'#FFFACD\'" onmouseout="this.style.backgroundColor=\'\'">Show All</div>';

	filter_div.style.display = "";
	filter_div.innerHTML = innerHtml;
	filter_div.style.width = 2*filter_text.length + "px";
	filter_div.style.left = Event.X(e) - 10;
	filter_div.style.top = Event.Y(e) - 10;
	//alert(filter_div.style.left);
	return false;
};

/**
* Filter div를 보여준다.
* @param {} 
* @return {}
*/
Table.showFilter2 = function(){
	D.get("filter_div").style.display = "";
};

/**
* Filter div를 숨긴다.
* @param {} 
* @return {}
*/
Table.hideFilter = function(){
	D.get("filter_div").style.display = "none";
};

/**
* Filter div를 보여준다.
* @param {Number} tb_idx - 왼쪽 테이블 인지 오른쪽 테이블인지 ( 1-왼쪽, 2-오른쪽) 
* @param {Number} td_idx - filtering 기준이되는 cellIndex
* @param {String} td_idx - filtering 텍스트
* @return {}
*/
Table.execFilter = function( tb_idx, td_idx, filter_text ){
	Table.hideFilter();
	
	var div = D.get("filter_div");
	var filter_style = div.getAttribute("filter_style");
	
	if(tb_idx == undefined){
		if(filter_style == "1"){
			var tbody = DomObject.getObject(div.getAttribute("tb1_id"),"TBODY");
			var RowLength = tbody.rows.length;
			for(var i=0 ; i<RowLength ; i++) tbody.rows.item(i).style.display = "";
		}else if(filter_style == "2"){
			var tbody1 = DomObject.getObject(div.getAttribute("tb1_id"),"TBODY");
			var tbody2 = DomObject.getObject(div.getAttribute("tb2_id"),"TBODY");

			var RowLength = tbody1.rows.length;
			for(var i=0 ; i<RowLength ; i++) {
				tbody1.rows.item(i).style.display = "";
				tbody2.rows.item(i).style.display = "";
			}
		}
	}else{
		if(filter_style == "1"){
			var tbody1 = DomObject.getObject(div.getAttribute("tb1_id"),"TBODY");
			var RowLength = tbody1.rows.length;
			for(var i=0 ; i<RowLength ; i++){
				if(DomObject.getInnerText(tbody1.rows.item(i).cells.item(td_idx)) != filter_text) {
					tbody1.rows.item(i).style.display = "none";
				}
			}
		}else if(filter_style == "2"){
			var tbody1 = DomObject.getObject(div.getAttribute("tb1_id"),"TBODY");
			var tbody2 = DomObject.getObject(div.getAttribute("tb2_id"),"TBODY");
			
			if(tb_idx == 1){
				var RowLength = tbody1.rows.length;
				for(var i=0 ; i<RowLength ; i++){
					if(DomObject.getInnerText(tbody1.rows.item(i).cells.item(td_idx)) != filter_text) {
						tbody1.rows.item(i).style.display = "none";
						tbody2.rows.item(i).style.display = "none";
					}
				}
			}else if(tb_idx == 2){
				var RowLength = tbody2.rows.length;
				for(var i=0 ; i<RowLength ; i++){
					if(DomObject.getInnerText(tbody2.rows.item(i).cells.item(td_idx)) != filter_text) {
						tbody1.rows.item(i).style.display = "none";
						tbody2.rows.item(i).style.display = "none";
					}
				}
			}
		}
	}
	
};

Table.resource_web_path = "";		

Table.setWebPath = function( path ) {
	Table.resource_web_path  = path;
};

Table.plus_img = "ico_tree_plus.gif";
Table.minus_img = "ico_tree_minus.gif";

Table.treeAfterFunction = "";

Table.setTreeAfterFunction = function( functionName ){
	Table.treeAfterFunction = functionName;
};

Table.setTree = function(tb1, tb2, cellidx, startRow, endRow){
	var tbody1 = D.get(tb1).tBodies[0];
	var tbody2 = (tb2!="")?D.get(tb2).tBodies[0]:"";
	
	var prekey = "";
	var currentkey = "";

	if(startRow == undefined || startRow == "") startRow = 0;
	if(endRow == undefined || endRow == "") endRow = tbody1.rows.length;
	
	var basic_rowno = startRow;

	for(var i=startRow ; i<endRow ; i++){
		var cells = tbody1.rows[i].cells;
		if(cellidx == 0)currentkey = cells[cellidx].getAttribute("selfkey");
		else currentkey = cells[cellidx].getAttribute("parentkey") + cells[cellidx].getAttribute("selfkey");

		if(currentkey == prekey){
			tbody1.rows[i].style.display = "none";
			if(tbody2!="")tbody2.rows[i].style.display = "none";

			if(i == endRow-1 && i > basic_rowno+1){
				if(tbody1.rows[basic_rowno].cells[cellidx].getElementsByTagName("IMG").length == 0){
					tbody1.rows[basic_rowno].cells[cellidx].innerHTML = "<img src='" + Table.resource_web_path + "/images/ico/"+Table.plus_img+"' startRow='" + basic_rowno + "' endRow='" + (i+1) + "' onclick=\"Table.showSubTree(this,'" + tb1 + "','" + tb2 + "');\" style='cursor:pointer;' cellidx='" + cellidx + "'> " +  tbody1.rows[basic_rowno].cells[cellidx].innerHTML;
				}
			}
		}else{
			tbody1.rows[i].style.display = "";
			if(tbody2!="")tbody2.rows[i].style.display = "";
			
			if(i > (basic_rowno+1)) {
				if(tbody1.rows[basic_rowno].cells[cellidx].getElementsByTagName("IMG").length == 0){
					tbody1.rows[basic_rowno].cells[cellidx].innerHTML = "<img src='" + Table.resource_web_path + "/images/ico/"+Table.plus_img+"' startRow='" + basic_rowno + "' endRow='" + i + "' onclick=\"Table.showSubTree(this,'" + tb1 + "','" + tb2 + "');\" style='cursor:pointer;' cellidx='" + cellidx + "'> " +  tbody1.rows[basic_rowno].cells[cellidx].innerHTML;
				}
			} 
			
			basic_rowno = i;
		}
	
		prekey = currentkey;

		if(cellidx > 0 && i < (endRow)){
			tbody1.rows[i].cells[cellidx-1].innerHTML = "";
		}
	}
};

Table.showSubTree = function(obj, tb1, tb2){
	//var obj = (window.event)?event.srcElement:e.currentTarget;
	var cellidx = parseInt(obj.getAttribute("cellidx"))+1;
	var startRow = parseInt(obj.getAttribute("startRow"))+1;
	var endRow = parseInt(obj.getAttribute("endRow"));

	if(obj.src.indexOf("plus") > -1) {
		obj.src = Table.resource_web_path + "/images/ico/"+Table.minus_img;
		Table.setTree(tb1,tb2,cellidx,startRow,endRow);
	}else {
		obj.src = Table.resource_web_path + "/images/ico/"+Table.plus_img;
		Table.hideSubTree(tb1,tb2,startRow,endRow);
	}

	if(Table.treeAfterFunction != undefined && Table.treeAfterFunction != "")eval(Table.treeAfterFunction + "();");
};

Table.hideSubTree = function(tb1, tb2, startRow, endRow){
	var tbody1 = D.get(tb1).tBodies[0];
	var tbody2 = (tb2!="")?document.getElementById(tb2).tBodies[0]:"";

	for(var i=startRow ; i<endRow ; i++){
		tbody1.rows[i].style.display = "none";
		if(tbody2!="") tbody2.rows[i].style.display = "none";
		
		var imgOjbs = tbody1.rows[i].getElementsByTagName("IMG");
		var imgs;
		var length = 0;
		if(imgs!=undefined){
			imgs = imgOjbs[0];
			length = imgs.length;
		}
		for(var j=0 ; j<length ; j++){
			imgs[j].src = Table.resource_web_path + "/images/ico/"+Table.plus_img;
		}
	}
};


var table_export_component_name = "com.bpnr.portal.util.ExcelExport";	//컴포넌트명 바뀌면 변경필요
//var table_export_url = "/irj/servlet/prt/portal/prteventname/excel/prtroot/" + table_export_component_name;
// 임시
var table_export_url = "http://epd.doosaninfracore.com:50000/irj/servlet/prt/portal/prteventname/excel/prtroot/" + table_export_component_name;

/**
* Excel 데이터를 생성후 submit한다.
* @param {String} FileFullName - 
* @param {String} DataId -  InnerHTML을 가져오기 위한 오브젝트 Id 
*/
Table.exportExcel = function( FileName, DataId ){
	FormObj.create("table_export_form");	//create Form
	var table_export_form = D.get("table_export_form");
	
	if(table_export_form.table_data == undefined){
		var oInput = document.createElement("input");
		oInput.id = "table_data";
		oInput.name = "table_data";
		oInput.type = "hidden";
		oInput.value = D.get(DataId).innerHTML;
		table_export_form.appendChild(oInput);
	}else{
		table_export_form.table_data.value = D.get(DataId).innerHTML;
	}
	table_export_form.action = table_export_url + "?filename="+FileName;
	table_export_form.method = "post";
	table_export_form.submit();
};


/** =================================================================================================== */
/** input type="text" Object에 대한 각종 기능을 제공합니다.												*/
/** =================================================================================================== */

function InputText(){};

InputText.resource_web_path = "";		//텍스트 필드에 필드 스타일을 지정할때 사용되는 이미지에 대한 webPath

InputText.setWebPath = function( path ) {
	InputText.resource_web_path  = path;
};

/**
* input type="text" 의 필드 스타일을 지정한다. 동일한 이름을 가진 모든 오브젝트에 한번에 적용
* @param {String} name - 텍스트 필드 오브젝트 name 
* @param {String} fieldstyle - 셋팅할 스타일 
* @param {String} currency_type - fieldstyle의 currency일 경우 통화코드
* @return {None}
*/

InputText.setStyleByName = function( name, fieldstyle, currency_type ){
	var obj = document.getElementsByName(name);
	if(obj != undefined){
		var length = obj.length;
		if(length == undefined){
			InputText.setStyle(obj, fieldstyle, currency_type);
		}else {
			for(var i=0 ; i<length ; i++){
				InputText.setStyle(obj[i], fieldstyle, currency_type);
			}
		} 
	}
} ;

/**
* input type="text" 의 필드 스타일을 지정한다. 오브젝트 하나의 적용
* @param {String} id - 텍스트 필드 오브젝트 id 
* @param {String} fieldstyle - 셋팅할 스타일 
* @param {String} currency_type - fieldstyle의 currency일 경우 통화코드
* @return {None}
*/
InputText.setStyleById = function( id, fieldstyle, currency_type ){
	var obj = D.get(id);
	InputText.setStyle(obj, fieldstyle, currency_type);
};

/**
* input type="text" 의 필드 스타일을 지정한다. 오브젝트 하나의 적용
* @param {String} obj - 텍스트 필드 오브젝트 
* @param {String} fieldstyle - 셋팅할 스타일 
* @param {String} currency_type - fieldstyle의 currency일 경우 통화코드
* @return {None}
*/
InputText.setStyle = function( obj, fieldstyle, currency_type ){
	switch(fieldstyle)
	{
		case "uppercase" :
			obj.style.imeMode = "disabled";
			obj.style.textTransform = "uppercase";
			obj.onfocus = InputText.showFocusStyle;
			obj.onblur = InputText.hideFocusStyle;
			break;
		
		case "lowercase" :
			obj.style.imeMode = "disabled";
			obj.style.textTransform = "lowercase";
			obj.onfocus = InputText.showFocusStyle;
			obj.onblur = InputText.hideFocusStyle;
			break;

		case "capitalize" :
			obj.style.imeMode = "disabled";
			obj.style.textTransform = "capitalize";
			obj.onfocus = InputText.showFocusStyle;
			obj.onblur = InputText.hideFocusStyle;
			break;

		case "en" :
			obj.style.imeMode = "disabled";
			obj.onfocus = InputText.showLanguage;
			obj.onblur = InputText.hideFieldType;
			break;

		case "en_kr" :
			obj.style.imeMode = "inactive";
			obj.onfocus = InputText.showLanguage;
			obj.onblur = InputText.hideFieldType;
			obj.onkeyup = InputText.checkLanguage;
			break;

		case "kr_en" :
			obj.style.imeMode = "active";
			obj.onfocus = InputText.showLanguage;
			obj.onblur = InputText.hideFieldType;
			obj.onkeyup = InputText.checkLanguage;
			break;

		case "left" :
			obj.style.textAlign = "left";
			obj.onfocus = InputText.showFocusStyle;
			obj.onblur = InputText.hideFocusStyle;
			break;

		case "right" :
			obj.style.textAlign = "right";
			obj.onfocus = InputText.showFocusStyle;
			obj.onblur = InputText.hideFocusStyle;
			break;
			
		case "number" :
			obj.style.imeMode = "disabled";
			obj.onkeydown = InputText.checkNum;
			obj.onfocus = InputText.showNumber;
			obj.onblur = InputText.hideFieldType;
			break;
			
		case "number2" :
			obj.style.imeMode = "disabled";
			obj.onkeydown = InputText.checkNum;
			obj.onfocus = InputText.showFocusStyle;
			obj.onblur = InputText.hideFocusStyle;
			break;
			
		case "currency" :
			obj.style.imeMode = "disabled";
			obj.style.textAlign = "right";
			obj.setAttribute("curr_type", currency_type.toLowerCase());
			obj.onfocus = InputText.offFormat;
			obj.onblur = InputText.onCurrency;
			obj.onkeydown = InputText.checkNum;
			break;

		case "calendar" :
			obj.onclick = InputText.showCalendar;
			break;
			
		case "year_month" :
			obj.onclick = InputText.showYearMonth;
			break;

		case "time" :
			obj.onkeydown = InputText.setTime;
			obj.onblur = InputText.checkTime;
			obj.setAttribute("maxlength","8");
			break;

		case "phone" :
			obj.style.imeMode = "disabled";
			obj.onkeydown = InputText.checkPhone;
			obj.onfocus = InputText.showFocusStyle;
			obj.onblur = InputText.hideFocusStyle;
			break;
	}

	obj.setAttribute("fieldstyle", fieldstyle);
};

/**
* 입력되는 키 코드를 근거로 숫자만 입력되게끔 한다.
* @param {String} 
* @return {Boolean}
*/
InputText.checkNum = function( e ){
	var key=(window.event)?event.keyCode:e.which;
	//alert(key);
	if(InputText.isInNumbers(key,0,9) || key==9 || key==8 || key==46 || key==110 || key==190 || key==109 || key==189)return true;
	else return false;
};

InputText.checkPhone = function( e ){
	var key=(window.event)?event.keyCode:e.which;
	
	if(InputText.isInNumbers(key,0,9) || key==8 || key==46 || key==189 || key==16 || key==57 || key==48)return true;
	else return false;
};

InputText.setTime = function( e ){
	var obj = Event.getObject(e);
	var key=(window.event)?event.keyCode:e.which;
	var length = obj.value.length;
	
	if(length == 0){
		if(InputText.isInNumbers(key,0,2) || key==8 || key==46)return true;
		else return false;
	}else if(length == 1){
		if(obj.value == "0" || obj.value == "1"){
			if(InputText.isInNumbers(key,0,9) || key==8 || key==46)return true;
			else return false;
		}else if(obj.value == "2"){
			if(InputText.isInNumbers(key,0,4) || key==8 || key==46)return true;
			else return false;
		}else return false;
	}else if(length == 2 || length == 5){
		if(key==8 || key==46) return true;
		else if(InputText.isInNumbers(key,0,5)){
			obj.value+=":";
			return true;
		}else return false;
	}else if(length == 3 || length == 6){
		if(obj.value.indexOf(":")>-1){
			if(InputText.isInNumbers(key,0,5) || key==8 || key==46)return true;
			else return false;
		}
	}else if(length == 4 || length == 7){
		if(InputText.isInNumbers(key,0,9) || key==8 || key==46)return true;
		else return false;
	}else if(length >= 8 && key!=8 && key!=46) return false;
};

InputText.isInNumbers = function( keyCode, from, to ){
	if((keyCode >= (from+48) && keyCode <= (to+48)) || (keyCode >= (from+96) && keyCode <= (to+96))) return true;
	else return false;
};

InputText.checkTime = function( e ){
	var obj = Event.getObject(e);
	if(obj.value.length > 0 && obj.value.length < 8) {
		alert("Time format is hh:mm:ss");
		obj.select();
	}
};

/**
* 금액 타입인 3자리마다 콤마 가 지정된다. 백그라운드 이미지가 사라진다.
* @param {String} 
* @return {None}
*/
InputText.onCurrency = function( e ){
	var obj = Event.getObject(e);
	var v = String(obj.value);
	
	obj.value = Str.onCurrency(v);
	
	InputText.hideFieldType(e);
};

/**
* 금액 타입인 3자리마다 콤마가 없어지고, 백그라운드 이미지로 currency 아이콘이 설정된다.
* @param {String} 
* @return {None}
*/
InputText.offFormat = function( e ){
	var obj = Event.getObject(e);
	var v = String(obj.value);

	obj.value = Str.offCurrency(v);
	obj.select();
	
	InputText.showCurrency(e);
};

/**
* 백그라운드 이미지로 넘버 아이콘이 설정된다.
* @param {String} 
* @return {None}
*/
InputText.showNumber = function( e ){
	var obj = Event.getObject(e);
	obj.style.backgroundImage = "url(" + InputText.resource_web_path + "/images/ico/ico_1.gif)";
	obj.style.backgroundPosition = "center right";
	obj.style.backgroundRepeat = "no-repeat";

	InputText.showFocusStyle(e);
};

/**
* 백그라운드 이미지로 currency 아이콘이 설정된다.
* @param {String} 
* @return {None}
*/
InputText.showCurrency = function( e ){
	var obj = Event.getObject(e);
	var curr_type = obj.getAttribute("curr_type");
	obj.style.backgroundImage = "url(" + InputText.resource_web_path + "/images/ico/ico_" + curr_type + ".gif)";
	obj.style.backgroundPosition = "center left";
	obj.style.backgroundRepeat = "no-repeat";

	InputText.showFocusStyle(e);
};

/**
* 백그라운드 이미지로 언어 아이콘이 설정된다.
* @param {String} 
* @return {None}
*/
InputText.showLanguage = function( e ){
	var obj = Event.getObject(e);
	
	if(obj.style.imeMode == "active")
		obj.style.backgroundImage = "url(" + InputText.resource_web_path + "/images/ico/ico_ko.gif)";
	else 
		obj.style.backgroundImage = "url(" + InputText.resource_web_path + "/images/ico/ico_en.gif)";
		
	obj.style.backgroundPosition = "center right";
	obj.style.backgroundRepeat = "no-repeat";

	InputText.showFocusStyle(e);
};

/**
* 백그라운드 이미지로 ime-mode에 맞는 언어 아이콘이 설정된다.
* @param {String} 
* @return {None}
*/
InputText.checkLanguage = function( e ){
	var obj = Event.getObject(e);
	var imgurl = obj.style.backgroundImage;
	
	if(window.event.keyCode == 21) {
		if(obj.style.imeMode != "disabled"){
			if(imgurl.indexOf("_en") > -1) obj.style.backgroundImage = "url(" + InputText.resource_web_path + "/images/ico/ico_ko.gif)";
			else obj.style.backgroundImage = "url(" + InputText.resource_web_path + "/images/ico/ico_en.gif)";
		}
	}
};

/**
* 백그라운드 이미지를 삭제한다.
* @param {String} 
* @return {None}
*/
InputText.hideFieldType = function( e ){
	var obj = Event.getObject(e);
	obj.style.backgroundImage = "";
	obj.style.backgroundPosition = "";
	obj.style.backgroundRepeat = "";

	InputText.hideFocusStyle(e);
};

/**
* input type="text" 객체의 validation을 설정한다.
* @param {String} id - 텍스트필드의 id
* @param {Number} length - 입력되는 값의 length 
* @param {Boolean} isMandatory - true(필수입력필드), false(필수입력필드아님)
* @param {String} msg - validation 체크 시 보여줄 메세지
* @return {}
*/
InputText.setValidation = function( id,length,isMandatory,msg ){
	var obj = D.get(id);
	obj.onblur = InputText.checkValidation;
	obj.chk_length = length;
	obj.ismandatory = isMandatory;
	obj.msg = msg;
};

/**
* onblur 이벤트 발생시 입력된 값이 설정한 validation을 기준과 맞는지 체크한다.
* @return {}
*/
InputText.checkValidation = function( e ){
	var obj = Event.getObject(e);
	var chk_length = obj.chk_length;
	var isMandatory = obj.ismandatory;
	var msg = obj.msg;

	if(isMandatory){
		if(obj.value.length != chk_length) {
			alert(msg);
			obj.focus();
		}
	}else{
		if(obj.value.length != 0 && obj.value.length != chk_length){
			alert(msg);
			obj.focus();
		}
	} 
};

/**
* input type="text" 객체의 이메일 validation을 설정한다.
* @param {String} id - 텍스트필드의 id
* @param {Boolean} isMandatory - true(필수입력필드), false(필수입력필드아님)
* @param {String} msg - validation 체크 시 보여줄 메세지
* @return {}
*/
InputText.setEmailValidation = function( id,isMandatory,msg ){
	var obj = D.get(id);
	obj.onblur = InputText.checkEmailValidation;
	obj.ismandatory = isMandatory;
	obj.msg = msg;
};

/**
* onblur 이벤트 발생시 입력된 값이 email형태가 맞는지 체크한다.
* @return {}
*/
InputText.checkEmailValidation = function( e ){
	var obj = Event.getObject(e);
	var isMandatory = obj.ismandatory;
	var msg = obj.msg;

	if(isMandatory){
		if(obj.value == "" || (obj.value.match(/^(\w+)@(\w+)[.](\w+)$/ig) == null && obj.value.match(/^(\w+)@(\w+)[.](\w+)[.](\w+)$/ig) == null)){
			alert(msg);
			obj.focus();
		} 
	}else{
		if(obj.value != "" && (obj.value.match(/^(\w+)@(\w+)[.](\w+)$/ig) == null && obj.value.match(/^(\w+)@(\w+)[.](\w+)[.](\w+)$/ig) == null)){
			alert(msg);
			obj.focus();
		} 
	}
};


/**
* 해당 오브젝트를 가져와서 focus시 외곽 border에 대한 스타일을 주기 위한 이벤트를 설정한다.
* @param {String} id - 텍스트필드의 id
* @return {}
*/
InputText.setFocusStyle = function( id ){
	var obj = D.get(id);
	if(obj.tagName == "INPUT"){
		if(obj.getAttribute("fieldstyle") != undefined && obj.getAttribute("fieldstyle") != ""){
			obj.onfocus = InputText.showFocusStyle;
			obj.onblur = InputText.hideFocusStyle;
		}
	}else{
		var inputs = obj.getElementsByTagName("INPUT");
		if(inputs != undefined){
			var length = inputs.length;
			if(length != undefined){
				for(var i=0 ; i<length ; i++){
					if(inputs[i].getAttribute("fieldstyle") != undefined && inputs[i].getAttribute("fieldstyle") != ""){
						inputs[i].onfocus = InputText.showFocusStyle;
						inputs[i].onblur = InputText.hideFocusStyle;
					}
				}
			}else{
				if(inputs.getAttribute("fieldstyle") != undefined && inputs.getAttribute("fieldstyle") != ""){
					inputs.onfocus = InputText.showFocusStyle;
					inputs.onblur = InputText.hideFocusStyle;
				}
			}
		}
	}
};

/**
* focus 이벤트가 일어났을때 border에 대한 스타일을 준다.
* @param {String} id - 텍스트필드의 id
* @return {}
*/
InputText.showFocusStyle = function( e ){
	var obj = Event.getObject(e);
	obj.style.borderColor='red';
	obj.style.borderStyle='dashed';
	obj.style.borderWidth='0.6mm';
};

/**
* blur 이벤트가 일어났을때 border에 대한 스타일을 없앤다.
* @param {String} id - 텍스트필드의 id
* @return {}
*/
InputText.hideFocusStyle = function( e ){
	var obj = Event.getObject(e);
	obj.style.borderColor='';
	obj.style.borderStyle='';
	obj.style.borderWidth='';
};

/**
* 엔터 키가 눌려졌는지 체크하고 눌러졌을때 실행할 function 명을 설정한다.
* @param {String} id - 텍스트필드의 id
* @param {String} funcName - 엔터 카가 눌러진 후 실행할 function 명
* @return {}
*/
InputText.setEnter = function( id, funcName ){
 var obj = D.get(id);
 obj.setAttribute("execFunc", funcName);
 
 obj.onkeypress = InputText.enter;
 //var key=(window.event)?event.keyCode:e.which;
 
};

/**
* 엔터 키가 눌러졌는지 체크하고 엔터 키가 눌러졌으면 미리 설정해 놓은 function 을 호출한다.
* @return {Boolean}
*/
InputText.enter = function( e ){
 //인터넷익스플로어,firefox둘다 사용하기 위해서 아래와 같이 사용
 var evt= e ? e : window.event;
 var key = evt.keyCode;
 
 if(key == 13){
  var obj = Event.getObject(e);
  eval(obj.getAttribute("execFunc") + "();");
 }

 //return false; 
};

InputText.calendarObj;


/**
* 배열 순서 [주,일,월,화,수,목,금,토,년,월,오늘]
* cs-체코어, fr-프랑스어, en-영어, jp-일본어, ko-한국어, pt-포르트칼어, zh-중국어
*/

InputText.CalendarLanguage = "en";
InputText.CalendarWeek_default = ["Week","Su","Mo","Tu","We","Th","Fr","Sa","Y","M","Today"];
InputText.CalendarWeek_al = ["","Die","Hen","Mar","Mer","Enj","Pre","Sht","Viti","Muaji","Sot"];
InputText.CalendarWeek_ca = ["","Diu","Dil","Dmt","Dmc","Dij","Div","Dis","Any","Mes","Avui"];
InputText.CalendarWeek_cs = ["","Ne","Po","\u00da\u0074","St","\u010c\u0074","P\u00e1","So","rok","\u006d\u011b\u0073\u00ed\u0063","Dnes"];
InputText.CalendarWeek_da = ["","\u0053\u00f8\u006e","Man","Tir","Ons","Tor","Fre","\u004c\u00f8\u0072","\u00c9t \u00e5r","\u00c9n m\u00e5ned","I dag"];
InputText.CalendarWeek_de = ["","So","Mo","Di","Mi","Do","Fr","Sa","Jahr","Monat","Heute"];
InputText.CalendarWeek_el = ["","\u039a\u03c5","\u0394\u03b5","\u0054\u03c1","\u03a4\u03b5","\u03a0\u03b5","\u03a0\u03b1","\u03a3\u03b1","\u03ad\u03c4\u03bf\u03c2","\u03bc\u03ae\u03bd\u03b1\u03c2","\u03a3\u03ae\u03bc\u03b5\u03c1\u03b1"];
InputText.CalendarWeek_en = ["Week","Su","Mo","Tu","We","Th","Fr","Sa","Y","M","Today"];
InputText.CalendarWeek_fr = ["","Dim","Lun","Mar","Mar","Jeu","Ven","Sam","\u0041\u006e\u006e\u00e9\u0065","\u004d\u006f\u0069\u0073","\u0041\u0075\u006a\u006f\u0075\u0072\u0064\u0027\u0068\u0075\u0069"];
InputText.CalendarWeek_he = ["","\u05d0","\u05d1","\u05d2","\u05d3","\u05d4","\u05d5","\u05e9","\u05e9\u05e0\u05d4\u0020\u05e7\u05d5\u05d3\u05de\u05ea","\u05d7\u05d5\u05d3\u05e9\u0020\u05e7\u05d5\u05d3\u05dd","\u05d4\u05d9\u05d5\u05dd"];
InputText.CalendarWeek_hu = ["","v","h","k","sze","cs","p","szo","\ufffdv","h\ufffdnap","Ma"];
InputText.CalendarWeek_jp = ["","\u65e5","\u6708","\u706b","\u6c34","\u6728","\u91d1","\u571f","\u5e74","\u6708","\u4eca\u65e5"];
InputText.CalendarWeek_ko = ["\uc8fc","\uc77c","\uc6d4","\ud654","\uc218","\ubaa9","\uae08","\ud1a0","\ub144","\uc6d4","\uc624\ub298"];
InputText.CalendarWeek_pl = ["","N","Pn","Wt","\u015a\u0072","\u0043\u007a","Pt","So","rok","miesi\u0105c","Dzi\u015b"];
InputText.CalendarWeek_pt = ["","Dom","Seg","Ter","Qua","Qui","Sex","Sab","ano","mes","Hoje"];
InputText.CalendarWeek_sp = ["","Dom","Lun","Mar","Mie","Jue","Vie","Sab","A\ufffdo","Mes","Hoy"];
InputText.CalendarWeek_ua = ["","\u043d\u0434","\u043f\u043d","\u0432\u0442","\u0441\u0440","\u0447\u0442","\u043f\u0442","\u0441\u0431","\u0440\u0456\u043a","\u043c\u0456\u0441\u044f\u0446\u044c","\u0421\u044c\u043e\u0433\u043e\u0434\u043d\u0456"]
InputText.CalendarWeek_zh = ["","\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\uf9d1","\u5e74","\u6708","\u4eca\u5929"];

/**
* 달력에 표시될 언어를 설정한다.
* @param {String} lang - 국가별 언어코드
* @return {}
*/ 
InputText.setCalendarLanguage = function( lang ){
	InputText.CalendarLanguage = lang;
};

InputText.CalendarFormat = "MM/dd/yyyy";

/**
* 달력에 표시될 달력 년월일 포맷을 설정한다.
* @param {String} lang - 국가별 언어코드
* @return {}
*/ 
InputText.setCalendarFormat = function( format ){
	InputText.CalendarFormat = format;
};

/**
* From~To 형태의 달력일 경우 오브젝트에 이벤트를 설정한다.
* @param {String} id_from - Form 달력 오브젝트 id
* @param {String} id_to - To 달력 오브젝트 id
* @return {}
*/ 
InputText.setCalendarFromTo = function( id_from, id_to ){
	D.get(id_from).setAttribute("from_cal_id",id_from);
	D.get(id_from).setAttribute("to_cal_id",id_to);
	D.get(id_from).onclick = InputText.showCalendar;
	D.get(id_to).setAttribute("from_cal_id",id_from);
	D.get(id_to).setAttribute("to_cal_id",id_to);
	D.get(id_to).onclick = InputText.showCalendar;
};

/**
* 달력에 보여준다.
* @param {Event} 
* @return {}
*/ 
InputText.showCalendar = function( e ){
	if(D.get("cal_div") == undefined){
		Div.createLayer("cal_div","none","","");
		D.get("cal_div").className = "calendar";
		Iframe.createLayer("ifrm_cal_div", "none");
	}

	var obj = Event.getObject(e);
	InputText.calendarObj = obj;
	var select_day = obj.value;
	var currentdate = JSDate.getCurrentDate(InputText.CalendarFormat);
	if(select_day == "" || select_day.replace(/\D/g,"") == "00000000") {
		select_day = currentdate;
	}

	select_day = select_day.replace(/\D/g,"");
	var date_unformat = InputText.CalendarFormat.replace(/\W/g,"");
	var year = parseInt(select_day.substring(date_unformat.indexOf("y"),date_unformat.lastIndexOf("y")+1),10);
	var month = parseInt(select_day.substring(date_unformat.indexOf("M"),date_unformat.lastIndexOf("M")+1),10)-1;
	var day = parseInt(select_day.substring(date_unformat.indexOf("d"),date_unformat.lastIndexOf("d")+1),10);

	var thtml = "";
	thtml += '<div class="cal_top">';
	thtml += '	<table border="0" cellpadding="0" cellspacing="0" align="center" width="256">';
	thtml += '		<colgroup>';
	thtml += '			<col />';
	thtml += '			<col />';
	thtml += '			<col  width="30px" />';
	thtml += '		</colgroup>';
	thtml += '		<tr>';
	thtml += '			<th>';
	thtml += '				<img src="' + InputText.resource_web_path + '/images/calendar/arrow_left.gif" style="cursor:pointer;" onclick="InputText.changeCalendarYear(-1);">';
	thtml += '				<input type="text" class="year" id="bpnr_cal_year" value="' + year + '" maxlength="4" onfocus="this.className=\'year_o\'" onblur="this.className=\'year\';InputText.changeCalendar();"> ';
	thtml += '				' + (eval("InputText.CalendarWeek_" + InputText.CalendarLanguage)!=undefined?eval("InputText.CalendarWeek_" + InputText.CalendarLanguage + "[8]"):InputText.CalendarWeek_default[8]);
	thtml += '				<img src="' + InputText.resource_web_path + '/images/calendar/arrow_right.gif" style="cursor:pointer" onclick="InputText.changeCalendarYear(1);">';
	thtml += '			</th>';
	thtml += '			<th>';
	thtml += '				<img src="' + InputText.resource_web_path + '/images/calendar/arrow_left.gif" style="cursor:pointer" onclick="InputText.changeCalendarMonth(-1);">';
	thtml += '				<select class="month" id="bpnr_cal_month" onchange="InputText.changeCalendar();">';
	for(var i=1; i<=12 ; i++) {
							if(i==(month+1)) thtml += '<option value="' + i + '" selected>' + i + '</option>';
							else thtml += '<option value="' + i + '">' + i + '</option>';
	}
	thtml += '				</select>';
	thtml += '				<span onclick="InputText.setCalendarDateFromTo();" style="cursor:pointer;">' + (eval("InputText.CalendarWeek_" + InputText.CalendarLanguage)!=undefined?eval("InputText.CalendarWeek_" + InputText.CalendarLanguage + "[9]"):InputText.CalendarWeek_default[9]) + '</span>';
	thtml += '				<img src="' + InputText.resource_web_path + '/images/calendar/arrow_right.gif" style="cursor:pointer" onclick="InputText.changeCalendarMonth(1);">';
	thtml += '			</th>';
	thtml += '			<td align="right"><img src="' + InputText.resource_web_path + '111/images/calendar/btn_close.gif" style="cursor:pointer;margin-right:5px;" onclick="InputText.hideCalendar();"></td>';
	thtml += '		</tr>';
	thtml += '	</table>';
	thtml += '</div>';

	thtml += '<div class="cal_con" id="bpnr_cal_div">';
	thtml += InputText.makeCalendar(year, month, day);
	thtml += '</div>';

	thtml += '<div class="cal_btm">';
	thtml += '<p style="text-align:center;">' + (eval("InputText.CalendarWeek_" + InputText.CalendarLanguage)!=undefined?eval("InputText.CalendarWeek_" + InputText.CalendarLanguage + "[10]"):InputText.CalendarWeek_default[10]) + ' : <a href="javascript:InputText.setCalendarDate(\'' + JSDate.getCurrentDate("yyyyMMdd") + '\');">' + JSDate.getCurrentDateFormat(InputText.CalendarFormat) + '</a></p>';
	thtml += '</div>';

	
	Div.showLayer("cal_div", e, thtml);
	Iframe.showLayer("ifrm_cal_div", "cal_div");
};

/**
* 달력에 감춘다.
* @param {} 
* @return {}
*/
InputText.hideCalendar = function(){
	DomObject.hide("cal_div");
	DomObject.hide("ifrm_cal_div");
};

/**
* 달력 년도를 바꾸고 해당하는 달력을 보여준다.
* @param {Number} no - 달력의 년도를 바꾼다. 
* @return {}
*/
InputText.changeCalendarYear = function( no ){
	var year = D.get("bpnr_cal_year");
	if(no > 0) year.value = parseInt(year.value,10)+1;
	else year.value = parseInt(year.value,10)-1;

	InputText.changeCalendar();
};

/**
* 달력 월을 바꾸고 해당하는 달력을 보여준다.
* @param {Number} no - 달력의 월을 바꾼다. 
* @return {}
*/
InputText.changeCalendarMonth = function( no ){
	var select = D.get("bpnr_cal_month");
	var year = D.get("bpnr_cal_year");
	if(no > 0){
		if(select.selectedIndex == 11){
			select.options[0].selected = true;
			year.value = parseInt(year.value,10)+1;
		}else{
			select.options[select.selectedIndex+1].selected = true;
		}
	}else{
		if(select.selectedIndex == 0){
			select.options[11].selected = true;
			year.value = parseInt(year.value,10)-1;
		}else{
			select.options[select.selectedIndex-1].selected = true;
		}
	}
	
	InputText.changeCalendar();
};

/**
* 년도 혹은 월이 바뀌었을때 달력을 다시 보여준다.
* @param {} 
* @return {}
*/
InputText.changeCalendar = function(){
	var year = D.get("bpnr_cal_year").value;
	var month =  D.get("bpnr_cal_month").value;
	
	if(year.length != 4) {
		alert("Input 4 digit.");
		D.get("bpnr_cal_year").focus();
	}

	D.get("bpnr_cal_div").innerHTML = InputText.makeCalendar(parseInt(year), parseInt(month,10)-1, 1);
	Iframe.showLayer("ifrm_cal_div", "cal_div");
};

/**
* 해당 년, 월, 일을 기준으로 달력을 생성한다.
* @param {Number} year - 년도 
* @param {Number} month - 월 
* @param {Number} day - 일 
* @return {}
*/
InputText.makeCalendar = function(year, month, day){
	var day_name = eval("InputText.CalendarWeek_" + InputText.CalendarLanguage)!=undefined?eval("InputText.CalendarWeek_" + InputText.CalendarLanguage):InputText.CalendarWeek_default;
	var lastday_of_month = [31,28,31,30,31,30,31,31,30,31,30,31];
	var day_arr = new Array();
	if(year%4==0 && year%100!=0 || year%400==0) lastday_of_month[1] = 29;	//윤달

	var currentdate = JSDate.getCurrentDate("yyyyMMdd");
	var selectdate = InputText.calendarObj.value;
	var format = InputText.CalendarFormat;
	selectdate = selectdate.substring(format.indexOf("y"),format.lastIndexOf("y")+1) + selectdate.substring(format.indexOf("M"),format.lastIndexOf("M")+1) + selectdate.substring(format.indexOf("d"),format.lastIndexOf("d")+1);
	var first_day_of_month = new Date(year, month, 1);
	var currenty_day = new Date(year, month, day);
	var firstidx = first_day_of_month.getDay(); 
	
	var prevday_of_month = lastday_of_month[month-1<0?11:month-1];
	var daycnt = 1;
	var daycnt2 = 1;
	for(var i=0 ; i<35 ; i++){
		if(i<firstidx) {
			if(month==0) day_arr[i] = (year-1) + "" + 12 + "" + prevday_of_month-(firstidx-i)+1;
			else day_arr[i] = year + "" + (month<10?"0"+month:month) + "" + prevday_of_month-(firstidx-i)+1;
		}else if(i >= firstidx+lastday_of_month[month]) {
			if(month==11) day_arr[i] = (year+1) + "01" + "0" + daycnt2;
			else day_arr[i] = year + "" + ((month+2)<10?"0"+(month+2):(month+2)) + "0" + daycnt2;
			daycnt2++;
		}else {
			day_arr[i] = year + "" + ((month+1)<10?"0"+(month+1):(month+1)) + "" + (daycnt<10?"0"+daycnt:daycnt);
			daycnt++;
		}
	}
	
	if(lastday_of_month[month] != daycnt-1){
		for(var i=35 ; i<42 ; i++){
			if(i<firstidx) {
				if(month==0) day_arr[i] = (year-1) + "" + 12 + "" + prevday_of_month-(firstidx-i)+1;
				else day_arr[i] = year + "" + (month<10?"0"+month:month) + "" + prevday_of_month-(firstidx-i)+1;
			}else if(i >= firstidx+lastday_of_month[month]) {
				if(month==11) day_arr[i] = (year+1) + "01" + "0" + daycnt2;
				else day_arr[i] = year + "" + ((month+2)<10?"0"+(month+2):(month+2)) + "0" + daycnt2;
				daycnt2++;
				
			}else {
				day_arr[i] = year + "" + ((month+1)<10?"0"+(month+1):(month+1)) + "" + (daycnt<10?"0"+daycnt:daycnt);
				daycnt++;
			}
		}
	}

	var thtml = "";
	thtml += '	<table border="0" cellpadding="0" cellspacing="1">';
	thtml += '		<colgroup>	';
	thtml += '			<col width="*">';
	thtml += '			<col width="27px">';
	thtml += '			<col width="27px">';
	thtml += '			<col width="27px">';
	thtml += '			<col width="27px">';
	thtml += '			<col width="27px">';
	thtml += '			<col width="27px">';
	thtml += '			<col width="27px">';
	thtml += '		</colgroup>';
	thtml += '		<tr>';
	thtml += '			<th class="week">' + day_name[0] + '</th>';
	thtml += '			<th class="sun">' + day_name[1] + '</th>';
	thtml += '			<th>' + day_name[2] + '</th>';
	thtml += '			<th>' + day_name[3] + '</th>';
	thtml += '			<th>' + day_name[4] + '</th>';
	thtml += '			<th>' + day_name[5] + '</th>';
	thtml += '			<th>' + day_name[6] + '</th>';
	thtml += '			<th class="sat">' + day_name[7] + '</th>';
	thtml += '		</tr>';
	
	for(var i=0 ; i<day_arr.length ; i++){
		var day_arr_month = parseInt(String(day_arr[i]).substring(4,6),10);
		var isOutSelectMonth = (month+1>day_arr_month || month+1<day_arr_month)?true:false;
		var cal_day = parseInt(String(day_arr[i]).substring(6),10);
		
		if(i%7==0) thtml += '<tr id="week_0' + (parseInt(i/7,10)+1) + '"><td class="week" onclick="InputText.setCalendarDateFromTo(\'' + day_arr[i] + '\',\'' + day_arr[i+6] + '\');" onMouseOver="document.getElementById(\'week_0' + (parseInt(i/7,10)+1) + '\').className=\'week_o\'" onMouseOut="document.getElementById(\'week_0' + (parseInt(i/7,10)+1) + '\').className=\'\'">' + (parseInt(i/7,10)+1) + '</td>';
		
		if(String(day_arr[i]) == currentdate){
			thtml += '<td class="cal_today" onclick="InputText.setCalendarDate(\'' + day_arr[i] + '\');">' + cal_day + '</td>';
		}else if(String(day_arr[i]) == selectdate){
			thtml += '<td class="cal_select" onclick="InputText.setCalendarDate(\'' + day_arr[i] + '\');">' + cal_day + '</td>';
		}else{
			if(i%7==0) thtml += '<td class="sun' + (isOutSelectMonth?'_ln':'') + '" onclick="InputText.setCalendarDate(\'' + day_arr[i] + '\');" onMouseOver="this.className=\'sun' + (isOutSelectMonth?'_ln':'') + ' cal_over\'" onMouseOut="this.className=\'sun' + (isOutSelectMonth?'_ln':'') + '\'">' + cal_day + '</td>';
			else if(i%7==6) thtml += '<td class="sat' + (isOutSelectMonth?'_ln':'') + '"  onclick="InputText.setCalendarDate(\'' + day_arr[i] + '\');" onMouseOver="this.className=\'sat' + (isOutSelectMonth?'_ln':'') + ' cal_over\'" onMouseOut="this.className=\'sat' + (isOutSelectMonth?'_ln':'') + '\'">' + cal_day + '</td>';
			else thtml += '<td class="' + (isOutSelectMonth?'ln':'') + '"  onclick="InputText.setCalendarDate(\'' + day_arr[i] + '\');" onMouseOver="this.className=\'' + (isOutSelectMonth?'ln':'') + ' cal_over\'" onMouseOut="this.className=\'' + (isOutSelectMonth?'ln':'') + '\'">' + cal_day + '</td>';
		}
	}

	thtml += '	</table>';

	return thtml;
};

/**
* 선택된 일자를 텍스트 박스에 넣어준다.
* @param {String} select_date - 일자 
* @return {}
*/
InputText.setCalendarDate = function( select_date ){
	var currentdate_format = InputText.CalendarFormat;
	currentdate_format = currentdate_format.replace("yyyy",select_date.substring(0,4));
	currentdate_format = currentdate_format.replace("MM",select_date.substring(4,6));
	currentdate_format = currentdate_format.replace("dd",select_date.substring(6));

	InputText.calendarObj.value = currentdate_format;
	DomObject.hide("cal_div");
	DomObject.hide("ifrm_cal_div");
};

/**
* 선택된 일자를 텍스트 박스에 넣어준다.(From ~ To 형태)
* @param {String} from_date - from 일자 
* @param {String} to_date - to 일자 
* @return {}
*/
InputText.setCalendarDateFromTo = function( from_date, to_date ){
	var from_cal_id = InputText.calendarObj.getAttribute("from_cal_id");
	var to_cal_id = InputText.calendarObj.getAttribute("to_cal_id");
	
	if(from_date == undefined && from_cal_id != undefined){
		var year = parseInt(D.get("bpnr_cal_year").value);
		var month =  parseInt(D.get("bpnr_cal_month").value);
		var lastday_of_month = [31,28,31,30,31,30,31,31,30,31,30,31];
		if(year%4==0 && year%100!=0 || year%400==0) lastday_of_month[1] = 29;	//윤달
		
		var currentdate_format = InputText.CalendarFormat;
		currentdate_format = currentdate_format.replace("yyyy",year);
		currentdate_format = currentdate_format.replace("MM",(month<10?"0"+month:month));
		currentdate_format = currentdate_format.replace("dd","01");

		D.get(from_cal_id).value = currentdate_format;

		currentdate_format = InputText.CalendarFormat;
		currentdate_format = currentdate_format.replace("yyyy",year);
		currentdate_format = currentdate_format.replace("MM",(month<10?"0"+month:month));
		currentdate_format = currentdate_format.replace("dd",lastday_of_month[month-1]);
		
		D.get(to_cal_id).value = currentdate_format;
		
		DomObject.hide("cal_div");
		DomObject.hide("ifrm_cal_div");
	}else{
		if(from_cal_id != undefined){
			var currentdate_format = InputText.CalendarFormat;
			currentdate_format = currentdate_format.replace("yyyy",from_date.substring(0,4));
			currentdate_format = currentdate_format.replace("MM",from_date.substring(4,6));
			currentdate_format = currentdate_format.replace("dd",from_date.substring(6));

			D.get(from_cal_id).value = currentdate_format;
			
			currentdate_format = InputText.CalendarFormat;
			currentdate_format = currentdate_format.replace("yyyy",to_date.substring(0,4));
			currentdate_format = currentdate_format.replace("MM",to_date.substring(4,6));
			currentdate_format = currentdate_format.replace("dd",to_date.substring(6));

			D.get(to_cal_id).value = currentdate_format;
			
			DomObject.hide("cal_div");
			DomObject.hide("ifrm_cal_div");
		}
	}
};

InputText.yearmonthObj;
InputText.yearmonthFormat = "MM.yyyy";
InputText.monthDesc = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

InputText.setYearmonthFormat = function( format ){
	InputText.yearmonthFormat = format;
};


InputText.showYearMonth = function( e ){
	if(D.get("bpnr_yearmonth_div") == undefined){
		Div.createLayer("bpnr_yearmonth_div","none","","");
		D.get("bpnr_yearmonth_div").className = "calendar_month";
		Iframe.createLayer("ifrm_bpnr_yearmonth_div", "none");
	}

	var obj = Event.getObject(e);
	InputText.yearmonthObj = obj;
	var select_ym = obj.value;
	var current_ym = JSDate.getCurrentDate(InputText.yearmonthFormat);
	if(select_ym == "") {
		select_ym = current_ym;
	}

	select_ym = select_ym.replace(/\D/g,"");
	var ym_unformat = InputText.yearmonthFormat.replace(/\W/g,"");
	var year = parseInt(select_ym.substring(ym_unformat.indexOf("y"),ym_unformat.lastIndexOf("y")+1),10);
	var month = parseInt(select_ym.substring(ym_unformat.indexOf("M"),ym_unformat.lastIndexOf("M")+1),10);

	var thtml = "";
	thtml += '	<div class="warp_div" style="width:245px;">';
	thtml += '		<!-- /Month List -->';
	thtml += '		<table style="border:1px solid #97a8fd;">';
	thtml += '			<colgroup>';
	thtml += '				<col width="60px" />';
	thtml += '				<col width="60px" />';
	thtml += '			</colgroup>';
	thtml += '			<thead>';

	for(var i=1 ; i<=6 ; i++){
		thtml += '			<tr>';
		thtml += '				<th class="' + ((i==month)?'this_month':'') + '" id="bpnr_yearmonth_month' + i +'" onclick="InputText.selectYearMonth(' + i +',\'month\');" onmouseover="InputText.overYearMonth();" onmouseout="InputText.outYearMonth();">' + i +' ' + InputText.monthDesc[i-1] + '</th>';
		thtml += '				<th class="' + (((i+6)==month)?'this_month':'') + '" id="bpnr_yearmonth_month' + (i+6) +'" onclick="InputText.selectYearMonth(' + (i+6) +',\'month\');" onmouseover="InputText.overYearMonth();" onmouseout="InputText.outYearMonth();" style="' + ((i<4)?'padding-left:12px;':'') + '">' + (i+6) +' ' + InputText.monthDesc[i+5] + '</th>';
		thtml += '			</tr>';
	}
	thtml += '			</thead>';
	thtml += '		</table>';
	thtml += '		<!-- Year List -->';
	thtml += '		<div id="bpnr_yearmonth_yeararea">';

	thtml += InputText.makeYearMonth(year, year);

	thtml += '		</div>';
	thtml += '		<p class="btn_bottom tc" style="float:left;">';
	thtml += '			<button class="btn_s" onfocus="this.blur();" style="width:50px;" onclick="InputText.setYearMonth();" year_v="' + year + '" month_v="' + (month<10?"0"+month:month) + '" id="bpnr_yearmonth_ok_btn">Ok</button>';
	thtml += '			<button class="btn_s" onfocus="this.blur();" onclick="InputText.hideYearMonth();">Cancel</button>';
	thtml += '		</p>';
	thtml += '	</div>';

	
	Div.showLayer("bpnr_yearmonth_div", e, thtml);
	Iframe.showLayer("ifrm_bpnr_yearmonth_div", "bpnr_yearmonth_div");
};

InputText.makeYearMonth = function( basis_year, year ){
	
	var thtml = "";
	thtml += '		<table>';
	thtml += '			<colgroup>';
	thtml += '				<col width="50px" />';
	thtml += '				<col width="50px" />';
	thtml += '			</colgroup>';
	thtml += '			<tbody>';
	thtml += '			<tr>';
	thtml += '				<td colspan="2">';
	thtml += '					<img src="' + InputText.resource_web_path + '/images/calendar/btn_left.gif" onclick="InputText.changeYearMonth(' + (basis_year-10) + ',' + year + ')" onmouseover="src=\'' + InputText.resource_web_path + '/images/calendar/btn_left_o.gif\'"  onmouseout="src=\'' + InputText.resource_web_path + '/images/calendar/btn_left.gif\'" class="pointer">';
	thtml += '					<img src="' + InputText.resource_web_path + '/images/calendar/btn_right.gif" onclick="InputText.changeYearMonth(' + (basis_year+10) + ',' + year  + ')" onmouseover="src=\'' + InputText.resource_web_path + '/images/calendar/btn_right_o.gif\'"  onmouseout="src=\'' + InputText.resource_web_path + '/images/calendar/btn_right.gif\'" class="pointer" style="margin-left:20px;">';
	thtml += '				</td>';
	thtml += '			</tr>';

	for(var i=1 ; i<=5 ; i++){
		thtml += '			<tr>';
		thtml += '				<td class="' + ((year==(basis_year+1-i-5))?'this_year':'') + '" id="bpnr_yearmonth_year' + (i+5) + '" onclick="InputText.selectYearMonth(' + (i+5) + ',\'year\');" onmouseover="InputText.overYearMonth();" onmouseout="InputText.outYearMonth();">' + (basis_year+1-i-5) + '</td>';
		thtml += '				<td class="' + ((year==(basis_year+1-i))?'this_year':'') + '" id="bpnr_yearmonth_year' + i + '" onclick="InputText.selectYearMonth(' + i + ',\'year\');" onmouseover="InputText.overYearMonth();" onmouseout="InputText.outYearMonth();">' + (basis_year+1-i) + '</td>';
		thtml += '			</tr>';
	}

	thtml += '			</tbody>';
	thtml += '		</table>';

	return thtml;
};

InputText.changeYearMonth = function( basis_year, year ){
	D.get("bpnr_yearmonth_yeararea").innerHTML = InputText.makeYearMonth(basis_year, year);
};

InputText.hideYearMonth = function(){
	DomObject.hide("bpnr_yearmonth_div");
	DomObject.hide("ifrm_bpnr_yearmonth_div");
};

InputText.overYearMonth = function( e ){
	var obj = Event.getObject(e);
	if(obj.className != "this_month" && obj.className != "this_year") obj.className = "over";
};

InputText.outYearMonth = function( e ){
	var obj = Event.getObject(e);
	if(obj.className != "this_month" && obj.className != "this_year") obj.className = "";
};


InputText.selectYearMonth = function( v, type ){
	var length = 12;
	if(type == "year") length = 10;

	for(var i=1; i<=length ; i++){
		eval("document.getElementById('bpnr_yearmonth_" + type + i + "').className=''");
	}

	eval("document.getElementById('bpnr_yearmonth_" + type + v + "').className='this_" + type + "'");

	if(type == "year")D.get("bpnr_yearmonth_ok_btn").setAttribute("year_v", eval("DomObject.getInnerText(document.getElementById('bpnr_yearmonth_" + type + v + "'))"));
	else D.get("bpnr_yearmonth_ok_btn").setAttribute("month_v", (v<10)?("0"+v):v);
	
};

InputText.setYearMonth = function( e ){
	var obj = Event.getObject(e);

	var current_yearmonth_format = InputText.yearmonthFormat;
	current_yearmonth_format = current_yearmonth_format.replace("yyyy",obj.getAttribute("year_v"));
	current_yearmonth_format = current_yearmonth_format.replace("MM",obj.getAttribute("month_v"));
	
	InputText.yearmonthObj.value = current_yearmonth_format;
	InputText.hideYearMonth();
};

/** =================================================================================================== */
/** input type="checkbox" Object에 대한 각종 기능을 제공합니다.											*/
/** =================================================================================================== */


function InputCheckbox(){};

/**
* checkbox에 선택시 하위 모든 체크박스를 선택 혹은 해제할 수 있는 이벤트 설정한다.
* @param {String} id -  대표 checkbox id
* @param {String} name - 하위 checkbox name
* @return {}
*/
InputCheckbox.setCheckAll = function( id, name ){
	D.get(id).onclick = InputCheckbox.checkAll;
	D.get(id).setAttribute("checkitem", name);
};

/**
* checkbox에 선택시 하위 모든 체크박스를 선택 혹은 해제한다.
* @param {Event} e -  일어난 이벤트
* @return {}
*/
InputCheckbox.checkAll = function( e ){
	var obj = Event.getObject(e);
	var isChecked = obj.checked;
	var name = obj.getAttribute("checkitem");

	var chks = document.getElementsByName(name);
	if(chks != undefined){
		var length = chks.length;
		if(length != undefined){
			for(var i=0 ; i<length ; i++){
				chks[i].checked = isChecked;
			}
		}else chks.checked = isChecked;
	}
};

/**
* 호출시 지정한 checkbox에 클릭이벤트를 발생시킨다.
* @param {String} id -  checkbox id
* @return {}
*/
InputCheckbox.checkFor = function( id ){
	D.get(id).click();
};

InputCheckbox.isChecked = function( name ){
	var chks = D.gets(name);
	var result = false;
	if(chks != undefined){
		var length = chks.length;
		if(length != undefined){
			for(var i=0 ; i<length ; i++){
				if(chks[i].checked){
					result = true;
					break;
				}
			}
		}else{
			if(chks.checked) result = true;
		}
	}
	return result;
};


/** =================================================================================================== */
/** Event Object에 대한 각종 기능을 제공합니다.													        */
/** =================================================================================================== */


function Event(){};

/**
* 현재 이벤트가 일어난 오브젝트 가져오기
* @param {Even} e - 일어난 이벤트
* @return {Object}
*/
Event.getObject = function( e ){
	return (window.event)?event.srcElement:e.currentTarget;
};

/**
* 현재 이벤트가 일어난 오브젝트의 X좌표
* @param {Even} e - 일어난 이벤트
* @return {String}
*/
Event.X = function( e ){
	return (window.event)?event.clientX:e.clientX;
};

/**
* 현재 이벤트가 일어난 오브젝트의 Y좌표
* @param {Even} e - 일어난 이벤트
* @return {String}
*/
Event.Y = function( e ){	
	return (window.event)?event.clientY:e.clientY;
};

Event.attach = function( id, eventName, func ){
	D.get(id).attachEvent(eventName, func);
};

Event.detach = function( id, eventName, func ){
	D.get(id).attachEvent(eventName, func);
};


/** =================================================================================================== */
/** Select Object에 대한 각종 기능을 제공합니다.													    */
/** =================================================================================================== */

function Select(){};

/**
* Select 오브젝트를 생성한다.
* @param {String} id -  Select 오브젝트 id
* @param {String} className - class name
* @return {Object} Select 오브젝트
*/
Select.create = function( id, className ){
	var s = document.createElement("select");
	s.id = id;
	s.name = id;
	if(className != undefined) s.className = className;
	
	return s;
};

/**
* Select 에 <option>을 추가한다. 단일.
* @param {String} id -  Select 오브젝트 id
* @param {String} v - option 태그의 value
* @param {String} t - option 태그의 text
* @return {}
*/
Select.add = function( id, v, t){
	var o = document.createElement('option');
	o.value = v;
	o.text = t;
	
	var se = D.get(id);
	
	if(Navigator.isIE()) se.add(o);
	else se.add(o,null);
};

/**
* Select 에 <option>을 추가한다. 다중.
* @param {String} id -  Select 오브젝트 id
* @param {String} arr - <option>태그를 구성할 value와 text가 들어있는 배열
* @param {String} vkey - option 태그의 value에 해당하는 배열 키
* @param {String} tkey - option 태그의 text에 해당하는 배열 키
* @return {}
*/
Select.addAll = function( id, arr, vkey, tkey){
	Select.removeAll( id );
	var isIE = Navigtor.isIE(); 

	var se = D.get(id);

	if(arr != undefined){
		var length = arr.length;
		for(var i=0 ; i<length ; i++){
			var o = document.createElement('option');
			o.value = eval("arr[" + i + "]." + vkey);
			o.text = eval("arr[" + i + "]." + tkey);

			if(isIE) se.add(o);
			else se.add(o,null);
		}
	}
};

/**
* Select 에 index 번호에 해당하는 <option>을 제거한다. 
* @param {String} id -  Select 오브젝트 id
* @param {Number} idx - <option>태그를 index 번호
* @return {}
*/
Select.remove = function( id, idx ){
	var se = D.get(id);
	se.remove(idx);
};

/**
* Select 에 <option>을 모두 제거한다.
* @param {String} id -  Select 오브젝트 id
* @return {}
*/
Select.removeAll = function( id ){
	var se = D.get(id);
	
	var length = se.length;
	if(length != undefined && length > 0) {
		for(var i=0 ; i<length ; i++){
			se.remove(0);
		}
	}
};

Select.select = function( id, v ){
	D.get(id).value = v;
	window.focus();
};

/** =================================================================================================== */
/** Form Object에 대한 각종 기능을 제공합니다.													        */
/** =================================================================================================== */

function FormObj(){};

/**
* form 안의 내용을 submit시킨다.
* @param {String} formName -  form name
* @param {String} action -  action url
* @param {String} target -  target
* @return {}
*/
FormObj.submit = function( formName, action, target ){
	if(action != undefined || action != "") eval(formName + ".action='" + action + "';");
	if(target != undefined || target != "") eval(formName + ".target='" + target + "';");
	eval(formName + ".method = 'post';");
	eval(formName + ".submit();");
};

/**
* form 안의 내용을 reset시킨다.
* @param {String} formName -  form name
* @return {}
*/
FormObj.reset = function( formName ){
	eval(formName + ".reset();");
};

FormObj.create = function( id ){
	var formObj = document.createElement("FORM");
	formObj.id = id;
	formObj.name = id;
	formObj.method = "post";
	formObj.cellpadding = 0;
	formObj.cellspacing = 0;
	document.body.appendChild(formObj);
};


/** =================================================================================================== */
/** IFRAME Object에 대한 각종 기능을 제공합니다.													        */
/** =================================================================================================== */

function Iframe(){};

/**
* Div Layer를 띄울때 백그라운드에 iframe을 깔아주고, 위치 및 크기를 div에 맞춘다.
* @param {String} iframe_id -  iframe 오브젝트 id
* @param {String} div_id -  div 오브젝트 id
* @return {}
*/
Iframe.showLayer = function( iframe_id, div_id ){
	var div = D.get(div_id);
	var ifrm = D.get(iframe_id);
	ifrm.style.display = "";
	ifrm.style.left = div.style.left;
	ifrm.style.top = div.style.top;
	ifrm.style.width = div.offsetWidth;
	ifrm.style.height = div.offsetHeight;
	ifrm.style.zIndex = div.style.zIndex-1;
};

/**
* Div Layer를 띄울때 백그라운드에 iframe을 깔아주기 위한 iframe 오브젝트를 생성한다.
* @param {String} id -  iframe 오브젝트 id
* @param {String} display -  iframe 초기 style.display
* @return {}
*/
Iframe.createLayer = function( id, display ){
	//var iframe = document.createElement("IFRAME");
	//iframe.id = id;
	//iframe.style.position = "absolute";
	//iframe.style.display = display;
	//document.body.appendChild(iframe);

	var style = [{key:"position",v:"absolute"},{key:"display",v:display}];
	Iframe.create(id, style);
};

Iframe.create = function( id, style){
	if(D.get(id) == undefined){
		var iframe = document.createElement("IFRAME");
		iframe.id = id;
		iframe.name = id;
		iframe.frameborder = 0;
		for(var i=0 ; i<style.length ; i++){
			eval("iframe.style." + style[i].key + "='" + style[i].v + "';");
		}
		document.body.appendChild(iframe);
	}
};

/** =================================================================================================== */
/** DIV Object에 대한 각종 기능을 제공합니다.													        */
/** =================================================================================================== */

function Div(){};

/**
* Div Layer를 띄울때 위치 및 크기를 지정한다.
* @param {String} id -  div 오브젝트 id
* @param {Event} e
* @param {String} html - innerHTML
* @return {}
*/
Div.showLayer = function( id, e, html ){
	var div = D.get(id);
	if(html != undefined && html != "") div.innerHTML = html;
	div.style.display = "";
	
	var remainX = div.offsetWidth + Event.X(e) - document.body.clientWidth;
	if(remainX > -10) div.style.left = Event.X(e)-remainX-30;
	else div.style.left = Event.X(e);
	

	var remainY = div.offsetHeight + Event.Y(e) - document.body.clientHeight;
	if(remainY > -10) div.style.top = (Event.Y(e)+document.body.scrollTop)-remainY-30;
	else div.style.top = (Event.Y(e)+document.body.scrollTop);
};

/**
* Div Layer 오브젝트를 생성한다.
* @param {String} id -  iframe 오브젝트 id
* @param {String} display -  iframe 초기 style.display
* @param {String} width -  Div 오브젝트 width
* @param {String} height -  Div 오브젝트 height
* @return {}
*/
Div.createLayer = function( id, display, width, height ){
	var style = [{key:"position",v:"absolute"},{key:"zIndex",v:"100"},{key:"width",v:width},{key:"height",v:height},{key:"display",v:display}];
	Div.create(id, style);

	//var div = document.createElement("DIV");
	//div.id = id;
	//div.style.position = "absolute";
	//div.style.zIndex = "100";
	//div.style.width = width;
	//div.style.height = height;
	//div.style.display = display;
	//document.body.appendChild(div);
};

Div.create = function( id, style){
	if(D.get(id) == undefined){
		var div = document.createElement("DIV");
		div.id = id;
		for(var i=0 ; i<style.length ; i++){
			eval("div.style." + style[i].key + "='" + style[i].v + "';");
		}
		document.body.appendChild(div);
	}
};

Div.showBackground = function(){
	if(D.get("bpnr_div_background") == undefined){
		var style = [{key:"position",v:"absolute"},{key:"zIndex",v:"2"},{key:"width",v:"100%"},{key:"height",v:"100%"},{key:"left",v:"0"},{key:"top",v:"0"},{key:"display",v:"none"},{key:"backgroundColor",v:"black"},{key:"opacity",v:"0.4"},{key:"filter",v:"alpha(opacity=40)"},{key:"margin",v:"0 0 0 0"}];
		Div.create("bpnr_div_background", style);
		
		var style2 = [{key:"position",v:"absolute"},{key:"zIndex",v:"1"},{key:"width",v:"100%"},{key:"height",v:"100%"},{key:"left",v:"0"},{key:"top",v:"0"},{key:"display",v:"none"},{key:"backgroundColor",v:"black"},{key:"opacity",v:"0.4"},{key:"filter",v:"alpha(opacity=40)"},{key:"margin",v:"0 0 0 0"}];
		Iframe.create("bpnr_div_ifrm_background", style2);
	}
	
	D.get("bpnr_div_ifrm_background").style.display = "";
	D.get("bpnr_div_background").style.display = "";
	D.get("bpnr_div_background").onclick = Div.hideBackground;
};


Div.hideBackground = function(){
	D.get("bpnr_div_ifrm_background").style.display = "none";
	D.get("bpnr_div_background").style.display = "none";
};

Div.swapObject = function( div_id1, div_id2 ){
	var obj = D.get(div_id1).innerHTML;
	D.get(div_id1).innerHTML = D.get(div_id2).innerHTML;
	D.get(div_id2).innerHTML = obj;
};

/** =================================================================================================== */
/** BODY Object에 대한 각종 기능을 제공합니다.													        */
/** =================================================================================================== */

function Body(){};

Body.getWidth = function(){
	if(Navigator.isIE())return document.body.offsetWidth;
	else return document.body.clientWidth;
};

Body.getHeight = function(){
	if(Navigator.isIE())return document.body.offsetHeight;
	else return document.body.clientHeight;
};


/** =================================================================================================== */
/** FILE Object에 대한 각종 기능을 제공합니다.													        */
/** =================================================================================================== */
//var downloader_component_name = "com.sap.portal.util.serverfilebrowser.download";	//EP Standard
var downloader_component_name = "com.bpnr.portal.serverfile.Downloader";	//컴포넌트명 바뀌면 변경필요
var downloader_url = "/irj/servlet/prt/portal/prteventname/download/prtroot/" + downloader_component_name;
var downloader_zip_url = "/irj/servlet/prt/portal/prteventname/zip/prtroot/" + downloader_component_name;

function File(){};

/**
* EP서버에 저장되어 있는 File를 다운로드한다.
* @param {String} path -  file경로
* @return {}
*/
File.download = function( path, isZip ){
	if(D.get("filedownload_form") == undefined){
		FormObj.create("filedownload_form");
	}
	
	var down_form = D.get("filedownload_form");
	down_form.action = (isZip?downloader_zip_url:downloader_url) + "?filename=" + encodeURIComponent(path);
	down_form.method = "post";
	down_form.submit();

	down_form.action = "";
};

/** =================================================================================================== */
/** Navigator Browser Object에 대한 각종 기능을 제공합니다.													    */
/** =================================================================================================== */

function Navigator(){};

/**
* 브라우저가 Internet Explorer인지 체크한다.
* @return {Boolean}
*/
Navigator.isIE = function(){
	return navigator.userAgent.indexOf("MSIE")>-1?true:false; 
};

/**
* 브라우저가 Firefox인지 체크한다.
* @return {Boolean}
*/
Navigator.isFF = function(){
	return navigator.userAgent.indexOf("Firefox")>-1?true:false; 
};

/** =================================================================================================== */
/** Date JS Object에 대한 각종 기능을 제공합니다.													    */
/** =================================================================================================== */

function JSDate(){};

/**
* 제시된 포맷형태를 기준으로 포맷안된 오늘일자를 반환한다.
* @param {String} format - 날짜포맷
* @return {}
*/
JSDate.getCurrentDate = function( format ){
	var date_unformat = format.replace(/\W/g,"");
	var d = new Date();
	date_unformat = date_unformat.replace("yyyy",d.getFullYear());
	date_unformat = date_unformat.replace("MM",((d.getMonth()+1)<10?"0"+(d.getMonth()+1):(d.getMonth()+1)));
	date_unformat = date_unformat.replace("dd",(d.getDate()<10?"0"+d.getDate():d.getDate()));

	return date_unformat; 
};

/**
* 제시된 포맷형태로 오늘일자를 반환한다.
* @param {String} format - 날짜포맷
* @return {}
*/
JSDate.getCurrentDateFormat = function( format ){
	var date_unformat = format;
	var d = new Date();
	date_unformat = date_unformat.replace("yyyy",d.getFullYear());
	date_unformat = date_unformat.replace("MM",((d.getMonth()+1)<10?"0"+(d.getMonth()+1):(d.getMonth()+1)));
	date_unformat = date_unformat.replace("dd",(d.getDate()<10?"0"+d.getDate():d.getDate()));

	return date_unformat; 
};

JSDate.getCurrentYear = function(){
	return (new Date()).getFullYear();
};

JSDate.getCurrentMonth = function(){
	return (new Date()).getMonth()+1;
};

JSDate.getCurrentDay = function(){
	return (new Date()).getDate();
};


JSDate.getDateInterval = function( fromDate, toDate ){
	var interval = new Date(toDate.substring(0,4),toDate.substring(5,7),toDate.substring(8,10)) - new Date(fromDate.substring(0,4),fromDate.substring(5,7),fromDate.substring(8,10));
	interval = Math.floor(interval/(24*3600*1000));
	
	return interval;
};

JSDate.getTimeInterval = function( fromTime, toTime ){
	var fromHH = fromTime.substring(0,2);
	var fromMM = fromTime.substring(3,5);
	var fromSS = fromTime.substring(6);
	var toHH = toTime.substring(0,2);
	var toMM = toTime.substring(3,5);
	var toSS = toTime.substring(6);

	var fromValue = parseFloat(fromHH) + parseFloat(fromMM/6)/10;
	var toValue = parseFloat(toHH) + parseFloat(toMM/6)/10;

	return Math.round((toValue-fromValue)*10)/10;
};

function Str(){};

Str.onCurrency = function( v ){
	var prefix = "";
	var d = "";
	v = String(v);

	if(v.indexOf("-") > -1) {
		prefix = "-";
		v = v.substring(1);
	}

	if(v.indexOf(".") > -1) {
		d = v.substring(v.indexOf("."));
		v = v.substring(0,v.indexOf("."));
	}
	var regExp=/\D/g;
	v = v.replace(regExp,"");
	var r = /(\d+)(\d{3})/;
	while (r.test(v)) {
		v = v.replace(r, '$1' + ',' + '$2');
	}
	
	return prefix+v+d;
};

Str.offCurrency = function( v ){
	var regExp=/\D/g;
	var prefix = "";
	var d = "";
	
	if(v.indexOf("-") > -1) {
		prefix = "-";
		v = v.substring(1);
	}

	if(v.indexOf(".") > -1) {
		d = v.substring(v.indexOf("."));
		d = "." + d.substring(1).replace(regExp,"");
		v = v.substring(0,v.indexOf("."));
	}
	var fv=v.replace(regExp,"");
	
	return prefix+fv+d;
};

Str.trim = function( v ){
	return String(v).replace(/^\s+|\s+$/g, "");
};

/**
 * 파라미터가 string 값이면 바로복사하고 TD인경우는 TD안의 innerText를 복사하고 내용을 클립보드에 복사한다.
 * @param {?} obj
 * @return {Boolean} 
 */
Str.copyText = function ( obj ){
	var copytext = "";

	if(typeof(obj) == 'string') copytext = obj;
	else if(typeof(obj) == 'object' && obj.tagName != "INPUT") {
		if(obj.getElementsByTagName("INPUT")[0] == undefined) copytext = obj.childNodes[0].nodeValue;
		else copytext = obj.getElementsByTagName("INPUT")[0].value;
	}else if(typeof(obj) == 'object' && obj.tagName == "INPUT") copytext = obj.value;

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
