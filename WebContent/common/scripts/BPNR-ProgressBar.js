/*
 * ProgressBar v1.0
 * License - LGPL
 * Created - 2009.12.15
 * Copyright(c) 2009, 고승원(Seungwon, Go), (주)비피엔알.
 * http://www.bpnr.co.kr
 * email: jeremy@bpnr.co.kr
 */


function ProgressBar(){};

ProgressBar.startTime = 0;	//조회시작 시간
ProgressBar.endTime = 0;	//조회종료 시간

/**
* Progress Bar를 컨트롤한다.
* @param {String} id - Progress Bar에 해당하는 오브젝트의 id
* @param {Boolean} isShow - true(보이기), false(감추기)
* @param {Number} tCnt - 조회된 건수 
* @param {String} msg - Progress Bar에 표시할 메세지
* @return {}
*/
ProgressBar.show = function( id, isShow, tCnt, msg ){
	if(document.getElementById(id) == undefined) return;

	if( !isShow ){
		document.getElementById(id).style.display="none";
		document.getElementById(id+"_ifrm").style.display="none";
	}else {
		var div = document.getElementById(id);
		div.innerHTML = msg;
		div.style.display= "";

		var ifrm = document.getElementById(id+"_ifrm");
		ifrm.style.display= "";
		ifrm.style.left = div.offsetLeft;
		ifrm.style.top = div.offsetTop;
		ifrm.style.width = div.offsetWidth;
		ifrm.style.height = div.offsetHeight;
		ifrm.style.zIndex = div.style.zIndex-1;
	}
  	
	if(isShow) ProgressBar.startTime = (new Date()).getTime();
	else if(ProgressBar.startTime != 0 && !isShow){
		ProgressBar.endTime = (new Date()).getTime();
		var execTime = (ProgressBar.endTime - ProgressBar.startTime)/1000;
		//alert(tCnt + " records.(" +execTime + " sec.)");
		
		ProgressBar.startTime = 0;
		ProgressBar.endTime = 0;
	}
};

ProgressBar.create = function ( id, className ){
	var div = document.createElement("DIV");
	div.id = id;
	div.className = className;
	div.style.display = "none";
	div.style.width = "300px";
	div.style.height = "70px";
	div.style.marginTop = "-35px";
	div.style.marginLeft = "-150px";
	document.body.appendChild(div);

	var iframe = document.createElement("IFRAME");
	iframe.id = id + "_ifrm";
	iframe.style.position = "absolute";
	iframe.style.display = "none";
	document.body.appendChild(iframe);
};
