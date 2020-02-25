/*
 * ProgressBar v1.1.sub
 * License - LGPL
 * Created - 2009.12.15
 * Copyright(c) 2009, 고승원(Seungwon, Go), (주)비피엔알.
 * http://www.bpnr.co.kr
 * email: jeremy@bpnr.co.kr
 * Edit : progress bar 의 bg 를 없앤다.
 */


function ProgressBar(){};

ProgressBar.startTime = 0;	//��ȸ���� �ð�
ProgressBar.endTime = 0;	//��ȸ���� �ð�

/**
* Progress Bar를 컨트롤한다.
* @param {String} id - Progress Bar에 해당하는 오브젝트의 id
* @param {Boolean} isShow - true(보이기), false(감추기)
* @param {Number} tCnt - 조회된 건수 
* @param {String} msg - Progress Bar에 표시할 메세지
* @return {}
*/

var progressbar_id = "bpnr_progressDiv";
var progressbar_class = "progress";

ProgressBar.resource_web_path = "/irj/portalapps/com.doosaninfracore.sd.resources";

ProgressBar.setWebPath = function( path ){
	ProgressBar.resource_web_path = path;
};

ProgressBar.show = function( isShow, tCnt, msg ){
	if(document.getElementById(progressbar_id) == undefined) {
		ProgressBar.create();
	}

	if( !isShow ){
		document.getElementById(progressbar_id).style.display="none";
		document.getElementById(progressbar_id+"_ifrm").style.display="none";
	}else {
		var div = document.getElementById(progressbar_id);
		
		div.innerHTML = "";
		div.innerHTML += msg;
		div.innerHTML += "<embed src='" + ProgressBar.resource_web_path + "/images/bg/bg_progress_ing.swf' width='281' height='33' />";
		div.style.display= "";

		var ifrm = document.getElementById(progressbar_id+"_ifrm");
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

ProgressBar.isShow = function ( ){
	var progress = document.getElementById(progressbar_id);
	if(progress == undefined || progress.style.display == "none") return false;
	
	return true;
};

ProgressBar.create = function ( ){
	var div = document.createElement("DIV");
	div.id = progressbar_id;
	div.className = progressbar_class;
	div.style.display = "none";
	div.style.width = "300px";
	div.style.height = "70px";
	div.style.marginTop = "-35px";
	div.style.marginLeft = "-150px";
	div.style.zIndex = 100;
	document.body.appendChild(div);

	var iframe = document.createElement("IFRAME");
	iframe.id = progressbar_id + "_ifrm";
	iframe.style.position = "absolute";
	iframe.style.display = "none";
	document.body.appendChild(iframe);
};





function ProgressBar2(){};

ProgressBar2.startTime = 0;	//��ȸ���� �ð�
ProgressBar2.endTime = 0;	//��ȸ���� �ð�

/**
* Progress Bar를 컨트롤한다.
* @param {String} id - Progress Bar에 해당하는 오브젝트의 id
* @param {Boolean} isShow - true(보이기), false(감추기)
* @param {Number} tCnt - 조회된 건수 
* @param {String} msg - Progress Bar에 표시할 메세지
* @return {}
*/

var progressbar_id = "bpnr_progressDiv";
var progressbar_class = "progress";

ProgressBar2.resource_web_path = "/irj/portalapps/com.doosaninfracore.sd.resources";

ProgressBar2.setWebPath = function( path ){
	ProgressBar2.resource_web_path = path;
};

ProgressBar2.show = function( isShow, tCnt, msg ){
	if(document.getElementById(progressbar_id) == undefined) {
		ProgressBar2.create();
	}

	if( !isShow ){
		document.getElementById(progressbar_id).style.display="none";
		document.getElementById(progressbar_id+"_ifrm").style.display="none";
	}else {
		var div = document.getElementById(progressbar_id);
		
		div.innerHTML = "";
		div.innerHTML += msg;
		div.innerHTML += "<embed src='" + ProgressBar2.resource_web_path + "/images/bg/bg_progress_ing.swf' width='281' height='33' />";
		div.style.display= "";

		var ifrm = document.getElementById(progressbar_id+"_ifrm");
		ifrm.style.display= "";
		ifrm.style.left = div.offsetLeft;
		ifrm.style.top = div.offsetTop;
		ifrm.style.width = div.offsetWidth;
		ifrm.style.height = div.offsetHeight;
		ifrm.style.zIndex = div.style.zIndex-1;
	}
  	
	if(isShow) ProgressBar2.startTime = (new Date()).getTime();
	else if(ProgressBar2.startTime != 0 && !isShow){
		ProgressBar2.endTime = (new Date()).getTime();
		var execTime = (ProgressBar2.endTime - ProgressBar2.startTime)/1000;
		//alert(tCnt + " records.(" +execTime + " sec.)");
		
		ProgressBar2.startTime = 0;
		ProgressBar2.endTime = 0;
	}
};

ProgressBar2.isShow = function ( ){
	var progress = document.getElementById(progressbar_id);
	if(progress == undefined || progress.style.display == "none") return false;
	
	return true;
};

ProgressBar2.create = function ( ){
	var div = document.createElement("DIV");
	div.id = progressbar_id;
	div.className = progressbar_class;
	div.style.display = "none";
	div.style.width = "300px";
	div.style.height = "70px";
	div.style.marginTop = "-35px";
	div.style.marginLeft = "-150px";
	div.style.zIndex = 100;
	document.body.appendChild(div);

	var iframe = document.createElement("IFRAME");
	iframe.id = progressbar_id + "_ifrm";
	iframe.style.position = "absolute";
	iframe.style.display = "none";
	document.body.appendChild(iframe);
};
