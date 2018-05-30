var XHR = new XMLHttpRequest();
var XHR2 = new XMLHttpRequest();
var Logs;
var nameList;
var dict = new Array();

function getName(x){//取名字
	tableLength=nameList.length;
	for (i=0; i<tableLength; i++){
		if (x==nameList[i]["id"])  return nameList[i]["name"];
	}
}

/*function clearBefore(){
    x=document.getElementById('myTable');
    l=x.rows.length;
    for (i=1; i<=l; ){
        for (j=0; j<tableLength; j++){
            if(x.rows[i].cells[0]==nameList[j]["id"])
                break;
        }
        if(j==tableLength){
            x.rows[i].remove();
            l=x.rows.length;
        }
        else i++;
    }
    
}*/

$(document).ready(function(){
	re=/monitor\/(\d+)\//;
	window.location.pathname.match(re);
	u="/exam/"+RegExp.$1+"/members/";
	//console.log(u);
	XHR2.open('get',u, true);
	XHR2.onreadystatechange = function(){
		if (XHR2.readyState==4 && XHR2.status==200){
			nameList=JSON.parse(XHR2.responseText);
		}
	}
	XHR2.send(null);
	
	XHR.open('get',"/exam/log", true);
	XHR.onreadystatechange = function(){
		if (XHR.readyState==4 && XHR.status==200){
			Logs=XHR.responseText;
			words = Logs.split('\n');
			var dict = new Array();
			for (i=0;i<words.length ;i++ ) 
			{ 
				reg=/GET \/exam\/(.+)\/\d+\/ /;//匹配GET /exam/ID/试卷号 
				if (words[i].match(" 200 ")&&words[i].match(reg)) {
					ID=RegExp.$1;//捕获组引用ID
					if (!dict[ID]){
						dict[ID] = new Array();
						dict[ID][0] = 1;//此ID登陆的IP数
						dict[ID][1] = new Array();
						dict[ID][1]["IP"]=words[i].match(/\d+(\.\d+){3}/)[0];//记录IP
						dict[ID][1]["time"]=words[i].match(/\d\d(:\d\d){2} /)[0];//记录时间
						var x=document.getElementById('myTable').insertRow(1);//加一行
						x.insertCell(0).innerHTML=ID;
						x.insertCell(1).innerHTML=getName(ID);
						x.insertCell(2).innerHTML=dict[ID][1]["IP"];
						x.insertCell(3).innerHTML=dict[ID][1]["time"];//各种内容
						x.setAttribute("class",ID);//class方便修改CSS
						dict[ID][1]["row"]=x;//记录此行object
					}//if没记录过
					else{
						k=dict[ID][0]+1;
						for (j=1;j<k;j++){//是否换了IP
							if (dict[ID][j]["IP"]==words[i].match(/\d+(\.\d+){3}/)[0]){//没换IP则更新时间
								dict[ID][j]["time"]=words[i].match(/\d\d(:\d\d){2} /)[0];
								x.cells[3].innerHTML=dict[ID][j]["time"];
								break;
							}
						}
						if (j==k){//换了IP则记录并高亮显示
							tail=++dict[ID][0];
							dict[ID][tail] = new Array();
							dict[ID][tail]["IP"]=words[i].match(/\d+(\.\d+){3}/)[0];
							dict[ID][tail]["time"]=words[i].match(/\d\d(:\d\d){2} /)[0];
							var x=document.getElementById('myTable').insertRow(1);
							x.insertCell(0).innerHTML=ID;
							x.insertCell(1).innerHTML=getName(ID);
							x.insertCell(2).innerHTML=dict[ID][tail]["IP"];
							x.insertCell(3).innerHTML=dict[ID][tail]["time"];
							x.setAttribute("class",ID);
							$('.'+ID).css("color","red");
							$('.'+ID).css("background-color","yellow");
						}
					}//else
				}//if匹配到登陆
			}//for每一行日志
            //clearBefore();
		}//if状态
	}
	XHR.send(null);
	
});

