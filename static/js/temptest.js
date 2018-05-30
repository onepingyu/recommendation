/**
 * Created by onepy on 2017/3/21.
 */

var xhreq = new XMLHttpRequest();
var userList;

function Show(){
    obj =$('#student');
    for (i=0; i<userList.length;i++) {
        a = userList[i]["user_name"];
        b = userList[i]["user_id"];
        obj.append('<label class="checkbox-inline"><input name="show_student"  value="'+b+'" type="checkbox"/>'+a+'</label>'+'&nbsp;&nbsp;');
    }
}

$(document).ready(function(){
    re=/account\/temptest\/(\d+)\//;
	window.location.pathname.match(re);
	a=RegExp.$1;
    // a=$("#select1").val();
	xhreq.open('get',"/account/group/"+a, true);
	xhreq.onreadystatechange = function(){
		if (xhreq.readyState==4 && xhreq.status==200){
			userList=JSON.parse(xhreq.responseText);
            Show();
		}
	};
	xhreq.send(null);
});
