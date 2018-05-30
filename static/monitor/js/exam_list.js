var xhreq = new XMLHttpRequest();
var examList;

function printExamList(){
	listobj=$('#exam-list');
	for (i=0; i<examList.length; i++){
		a=examList[i]['id']+'/upload_status/';
		listobj.append('<li role="presentation"><a role="menuitem" tabindex="-1" href="/monitor/'+a+'">'+examList[i]["name"]+'</a></li>')
	}
	re=/monitor\/(\d+)\//;
	window.location.pathname.match(re);
	x=RegExp.$1;
    document.getElementById("logggg").setAttribute("href", "/exam/"+x+"/log/");
	for (i=0; i<examList.length; i++){
		if (examList[i]['id']==x){
			$("#titlecenter").text(examList[i]["name"]);
			url='/exam/'+x+'/download/';
            //console.log(url);
			$("#download").click(function(){
                //console.log(url);
				window.location.href=url;
			});
			break;
		}
	}
}
$(document).ready(function(){
	xhreq.open('get',"/monitor/exam_list/", true);
	xhreq.onreadystatechange = function(){//ȡID�����б�
		if (xhreq.readyState==4 && xhreq.status==200){
			examList=JSON.parse(xhreq.responseText);
			printExamList();
		}
	};
	xhreq.send(null);
	/*examList=[{"id": 1, "name": "\u6570\u5b66\u671f\u4e2d"}, {"id": 2, "name": "\u6570\u5b66\u671f\u4e2d2"}, {"id": 3, "name": "\u67e5\u8be2\u5c0f\u6d4b"}, {"id": 4, "name": "asdfdsa"}, {"id": 5, "name": "19\u65e5\u6d4b\u8bd5"}, {"id": 6, "name": "21\u65e5\u6d4b\u8bd5"}]
	printExamList();*/
});
