/**
 * Created by onepy on 2016/12/11.
 */
var xhreq = new XMLHttpRequest();
var examList;

function printExamList(){
	listobj=$('#exam-list');
	for (i=0; i<examList.length; i++){
		a=examList[i]['id'];
		listobj.append('<li role="presentation"><a role="menuitem" tabindex="-1" href="/account/'+a+'">'+examList[i]["name"]+'</a></li>')
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
});
