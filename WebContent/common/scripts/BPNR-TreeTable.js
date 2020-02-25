/** =================================================================================================== */
/** Tree Table 기능을 구현합니다.																		*/
/** 주의사항 : 1. 반드시 왼쪽 테이블과 오른쪽테이블이 존재해야 함.										*/
/**            2. 두 테이블 모두 반드시 Tr Id가 존재해야 함.											*/
/**            3. 왼쪽테이블의 Tr Id는 1 / 2 / 3,1,3 의 방식으로 레벨을 표현해야함.(오른쪽은 형식없음)  */
/** =================================================================================================== */

function TreeTable(){};

//초기화 해줌 : 1레벨만 보이고 나머지는 보이지 않도록 설정
var table_id1;
var table_id2;

var plus_img = "ico_tree_plus.gif";
var minus_img = "ico_tree_minus.gif";
var tr_height = "25px";

TreeTable.initTable = function(tableId1,tableId2){
	TreeTable.setFFInnerText;	// FF에서 innerText 사용
	table_id1 = tableId1;
	var table1 = document.getElementById(tableId1);
	var all_tr_list1 = table1.getElementsByTagName("TR");
	var table_len1 = table1.rows.length;

	table_id2 = tableId2;
	var table2 = document.getElementById(tableId2);
	var all_tr_list2 = table2.getElementsByTagName("TR");
	var last_len = 1;

//이전레벨이 현재레벨보다 높은 경우에는 이전레벨에 +이미지를 넣어준다.
	for(var i=0 ; i < table_len1 ; i++){
		var current_tr1 = all_tr_list1.item(i);
		var current_array1 = all_tr_list1.item(i).id.split(',');
		var current_len1 = current_array1.length;
		var current_tr2 = all_tr_list2.item(i);
		if(current_len1 == 1){
			current_tr1.style.display = "";
			current_tr2.style.display = "";
		}else
		{
			current_tr1.style.display = "none";
			current_tr2.style.display = "none";
		}
		if(last_len < current_len1){
			var last_tr = all_tr_list1.item(i-1);
			last_tr.cells[last_len-1].innerHTML = last_tr.cells[last_len-1].innerText+ "<img src='common/images/ico/"+plus_img+"'>";
			last_tr.style.Height = tr_height;
			last_tr.style.cursor = "pointer";
		}
		last_len = current_len1;
	}
}

TreeTable.clickTr = function clickTree(tr){
	var table1 = document.getElementById(table_id1);
	var all_tr_length1 = document.getElementById(table_id1).rows.length;

	var row_idx = tr.rowIndex;
	var current_array = tr.id.split(',');
	var current_len = current_array.length;
	var all_tr_list1 = table1.getElementsByTagName("TR");
	var next_tr1 = all_tr_list1.item(++row_idx);

	var table2 = document.getElementById(table_id2);
	var all_tr_list2 = table2.getElementsByTagName("TR");
	var next_tr2 = all_tr_list2.item(row_idx);
	// 다음레벨이 보이는 경우에는 감추고, 감춰있는 경우에는 보이게 한다. 
	while(next_tr1 != null && next_tr1 != undefined){
		var next_display1 = next_tr1.style.display;
		var next_array1 = next_tr1.id.split(',');
		var next_len1 = next_array1.length;
		if(next_len1 == current_len)	
			return false;
		if(next_display1 == "none"){
			if(next_len1 == current_len+1){
				next_tr1.style.display = "";
				next_tr2.style.display = "";
				if(tr.cells[current_len-1].innerHTML.indexOf("gif") > -1)
					tr.cells[current_len-1].innerHTML = tr.cells[current_len-1].innerText+ "<img src='common/images/ico/"+minus_img+"'>";
			}
		}else{
			if(next_len1 > current_len){
				next_tr1.style.display = "none";
				next_tr2.style.display = "none";
				tr.cells[current_len-1].innerHTML = tr.cells[current_len-1].innerText+ "<img src='common/images/ico/"+plus_img+"'>";
				if(next_tr1.cells[next_len1-1].innerHTML.indexOf("gif") > -1)
					next_tr1.cells[next_len1-1].innerHTML = next_tr1.cells[next_len1-1].innerText+ "<img src='common/images/ico/"+plus_img+"'>";


			}
		}
		row_idx++;
		next_tr1 = all_tr_list1.item(row_idx);
		next_tr2 = all_tr_list2.item(row_idx);
	}

	return false;
}

// FireFox에서 innerText를 사용하는 것 처럼 설정함.
TreeTable.setFFInnerText = function setInnerTextProperty() {
    if(typeof HTMLElement != "undefined" && typeof HTMLElement.prototype.__defineGetter__ != "undefined") {
        HTMLElement.prototype.__defineGetter__("innerText",function() {
            if(this.textContent) {
                return(this.textContent)
            } 
            else {
                var r = this.ownerDocument.createRange();
                r.selectNodeContents(this);
                return r.toString();
            }
        });
        
        HTMLElement.prototype.__defineSetter__("innerText",function(sText) {
            this.innerHTML = sText
        });
    }
}


/*
TreeTable.slide = function slide(Id, interval, to) {
    var obj = document.getElementById(Id);
	var obj2 = document.getElementById(Id);
	
	var H, step = 5;

    if (obj == null) return;
    if (to == undefined) { // user clicking
        if (obj._slideStart == true) return;
        if (obj._expand == true) {
            to = 0;
            obj.style.overflow = "hidden";
        } else {
            slide.addId(obj);
            for(var i=0; i < slide.objects.length; i++) {
                if (slide.objects[i].id != Id && slide.objects[i]._expand == true) {
                    slide(slide.objects[i].id);
                }
            }

            obj.style.height = "";
            obj.style.overflow = "";
            obj.style.display = "";
            to = obj.offsetHeight; // 이거이거
            obj.style.overflow = "hidden";
            obj.style.height = "0px"; // 1
        }
        obj._slideStart = true;
    }
    
    step             = ((to > 0) ? 1:-1) * step;
    interval         = ((interval==undefined)?1:interval);
	
	obj.style.height = (H=((H=(isNaN(H=parseInt(obj.style.height))?0:H))+step<0)?0:H+step)+"px";
    
    if (H <= 0) {
        obj.style.display = "none";
        obj.style.overflow = "hidden";
        obj._expand = false;
        obj._slideStart = false;
		return false;
    } else if (to > 0 && H >= to) {
        obj.style.display = "";
        obj.style.overflow = "visible";
        obj.style.height = H + "px";
        obj._expand = true;
        obj._slideStart = false;
		return false;
    } else {
		setTimeout("slide('"+Id+"' , "+interval+", "+to+");", interval);
    }
}
slide.objects = new Array();
slide.addId = function(obj)
{
    for (var i=0; i < slide.objects.length; i++) {
        if (slide.objects[i].id == obj.Id) return true;
    }
    slide.objects[slide.objects.length] = obj;
}
*/
