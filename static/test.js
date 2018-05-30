var a=0;
var XHR = new XMLHttpRequest();
var timeleft;

$(document).ready(function(){
	getTimeLeft();
	timeTick();
});

function timeTick(){
    console.log(timeleft)
	if (timeleft<=0) {
        a=0;
        document.getElementById("progresshint").innerHTML="剩余时间"+a+"分钟"; 
        return hidepaper();
    }
	timeleft-=1;
	a=parseInt(timeleft/60);
	if (a<0)  a=0;
	document.getElementById("progresshint").innerHTML="剩余时间"+a+"分钟"; 
	setTimeout("timeTick()",1000);
}

function hidepaper(){ 
	//$("#questions").hide();
}

function getTimeLeft(){
	
	XHR.open('get', 'leftseconds/', true);
	XHR.onreadystatechange = function(){
        //console.log(XHR.readyState);
        //console.log(XHR.status);
		if (XHR.readyState==4 && XHR.status==200){
			timeleft=XHR.responseText;
			//console.log(timeleft);
			//alert(timeleft);
		}
	}
	XHR.setRequestHeader("If-Modified-Since","0"); 
	XHR.send(null);
	setTimeout("getTimeLeft()",60000);
}
