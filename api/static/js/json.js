
/**
 * Created by onepy on 2016/12/11.
 */
var xhre = new XMLHttpRequest();
var examMessage;

function Group(){
    listobj =$('#group-list');
    for (i=0; i<examMessage[0]["group_list"].length;i++) {
        a = examMessage[0]["group_list"][i]["group_id"];
        listobj.append('<li><a href="/admin/arrangement/group/'+a+'/change/">'+examMessage[0]["group_list"][i]["group_name"]+'</a></li>')
    }
}


$(document).ready(function(){
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

