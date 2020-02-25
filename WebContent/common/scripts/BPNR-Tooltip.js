function Tooltip(){};

Tooltip.setById = function( id, content ){
	var obj = document.getElementById(id);
	obj.onmouseover = Tooltip.show;
	obj.onmouseout = Tooltip.hide;
	obj.setAttribute("tooltip_content",conent);
};

Tooltip.setByObject = function( ojb, content ){

};

Tooltip.setByTd = function( table_id, cellIndex ){
	var tbody = document.getElementById(table_id).tBodies[0];
	var rowLength = tbody.rows.length;
	for(var i=0 ; i<rowLength ; i++){
		tbody.rows[i].cells[cellIndex].onmouseover = Tooltip.show;
		tbody.rows[i].cells[cellIndex].setAttribute("tooltip_content", DomObject.getInnerText(tbody.rows[i].cells[cellIndex]));
	}
};

Tooltip.show = function( e ){
	var obj = (window.event)?event.srcElement:e.currentTarget;
	var content = obj.getAttribute("tooltip_content");
	
	alert(content);
};
