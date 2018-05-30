/**
 * Created by onepy on 2016/12/11.
 */
var xhreq = new XMLHttpRequest();
var examList;
var xhre = new XMLHttpRequest();
var examMessage;

function printExamList(){
	listobj=$('#exam-list');
	for (i=0; i<examList.length; i++){
		a=examList[i]['id'];
		listobj.append('<li role="presentation"><a role="menuitem" tabindex="-1" href="/account/'+a+'">'+examList[i]["name"]+'</a></li>')
	}
}

function Group(){
    listobj =$('#group-list');
    for (i=0; i<examMessage[0]["group_list"].length;i++) {
        a = examMessage[0]["group_list"][i]["group_id"];
        listobj.append('<li><a href="/admin/arrangement/group/'+a+'/change/">'+examMessage[0]["group_list"][i]["group_name"]+'</a></li>')
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
    re=/account\/exam\/(\d+)\//;
	window.location.pathname.match(re);
	examID=RegExp.$1;
    url="/account/exam/"+examID+"/";
	xhre.open('get',url, true);
	xhre.onreadystatechange = function(){
		if (xhre.readyState==4 && xhre.status==200){
			examMessage=JSON.parse(xhre.responseText);
			Group();
		}
	};
	xhre.send(null);
});


