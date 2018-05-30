var XHR = new XMLHttpRequest();
var XHR2 = new XMLHttpRequest();
var nameList;
var Logs;
var uploadSortTable;
var loginSortTable;
var IDtime = new Array();
var examID;
	
function getName(x){//取名字
	tableLength=nameList.length;
	for (i=0; i<tableLength; i++){
		if (x==nameList[i]["id"])  return nameList[i]["name"];
	}
}

function usedTime(startTime,endTime){
	a=0,b=0;
	reg=/(\d\d):(\d\d):(\d\d)/;
	startTime.match(reg);
	a=a-Number(RegExp.$1);
	b=b-Number(RegExp.$2);
	endTime.match(reg);
	a=a+Number(RegExp.$1);
	b=b+Number(RegExp.$2);
	if (b<0) {
		b+=60;
		a-=1;
	}
	if (a>=0&&b>=0)
		return a+"小时"+b+"分钟";
	else
		return "0小时0分钟"
}

function printlist(){//打印列表
	tableLength=nameList.length;
	document.getElementById('number').innerText="总人数："+tableLength;
	// $("#number").innerText("总人数："+tableLength);
	for (i=0; i<tableLength; i++){//登陆名单
		var x=document.getElementById('loginTable').insertRow(1);//document.getElementById('uploadTable').rows.length
		ID=nameList[i]["id"];
		IDtime[ID]=new Array();
		IDtime[ID][0]=IDtime[ID][1]="";
		IDtime[ID]["ip"]=IDtime[ID]["submit"]=0;
		x.insertCell(0).innerHTML=ID;
		x.insertCell(1).innerHTML=nameList[i]["name"];
		x.insertCell(2).innerHTML="";
		x.insertCell(3).innerHTML="尚未登录";
		x.setAttribute("id",ID+"login");
		x.setAttribute("class","parent");
		$('#'+ID+"login").css("color","red");
		$('#'+ID+"login").css("background-color","yellow");
	}
	for (i=0; i<tableLength; i++){//提交名单
		var x=document.getElementById('uploadTable').insertRow(1);//document.getElementById('uploadTable').rows.length
		ID=nameList[i]["id"];
		x.insertCell(0).innerHTML=ID;
		x.insertCell(1).innerHTML=nameList[i]["name"];
		x.insertCell(2).innerHTML="";
		x.insertCell(3).innerHTML="尚未提交";
		x.insertCell(4).innerHTML="";
		x.setAttribute("id",ID+"upload");
		x.setAttribute("class","parent");
		$('#'+ID+"upload").css("color","red");
		$('#'+ID+"upload").css("background-color","yellow");
	}
	return ;
}

function printCorrectList(){
	for (i=tableLength-1; i>=0; i--){//批改名单
		var x=document.getElementById('correctTable').insertRow(1);//document.getElementById('uploadTable').rows.length
		ID=nameList[i]["id"];
		x.insertCell(0).innerHTML=ID;
		x.insertCell(1).innerHTML=nameList[i]["name"];
		a=document.createElement("a");
		node=document.createTextNode(nameList[i]["paper_id"]);
		a.appendChild(node);
		u='/paper/'+nameList[i]["paper_id"]+'/';
		a.href=u;
		x.insertCell(2).appendChild(a);
		x.insertCell(3).innerHTML="";
		x.insertCell(4).innerHTML=IDtime[ID]["ip"];
		x.insertCell(5).innerHTML=IDtime[ID]["submit"];
		x.insertCell(6).innerHTML=usedTime(IDtime[ID][0],IDtime[ID][1]);
		x.setAttribute("id",ID+"message");
		x.setAttribute("class","parent");
	}
	loginSortTable=new TableSorter("correctTable", 0 , 2);
}

$(document).ready(function(){
	re=/monitor\/(\d+)\//;
	window.location.pathname.match(re);
	examID=RegExp.$1;
	u="/exam/"+examID+"/members/";
	XHR.open('get',u, true);
	XHR.onreadystatechange = function(){//取ID名字列表
		if (XHR.readyState==4 && XHR.status==200){
			nameList=JSON.parse(XHR.responseText);
			printlist();
		}
	}
	XHR.send(null);

	u2="/exam/"+examID+"/log/";
	XHR2.open('get',u2, true);
	XHR2.onreadystatechange = function(){
		if (XHR2.readyState==4 && XHR2.status==200){
			Logs=XHR2.responseText;
			words=Logs.split('\n');
			var k=0;
			for (i=0; i<words.length ;i++ ) 
			{ //从前往后读每一条GET
				//console.log(examID);
				reg = new RegExp("GET \\/exam\\/(.+)\\/"+examID+"\\/ ");
				//reg=/GET \/exam\/(.+)\/\d+\/ /;
				if (words[i].match(" 200 ")&&words[i].match(reg)) {//提交成功的日志
					ID=RegExp.$1;
					x=document.getElementById(ID+"login");
                    if (!x) continue;
					if (x.cells[2].innerHTML){//添加条目
						if (x.cells[2].innerHTML!=words[i].match(/\d+(\.\d+){3}/)[0]){
							y=document.getElementById('loginTable').insertRow(1);
							y.insertCell(0).innerHTML=ID;
							y.insertCell(1).innerHTML=x.cells[1].innerHTML;
							y.insertCell(2).innerHTML=words[i].match(/\d+(\.\d+){3}/)[0];
							y.insertCell(3).innerHTML=words[i].match(/\d\d(:\d\d){2} /)[0];
							y.setAttribute("class",'child_'+ID+"login");
							y.setAttribute("id",ID+"login");
							y.setAttribute("style","display: none");
							$('#'+ID+"login").css("color","red");
							$('#'+ID+"login").css("background-color","yellow");
							$('#'+ID+"login"+'.'+"parent").css("color","red");
							$('#'+ID+"login"+'.'+"parent").css("background-color","yellow");
							IDtime[ID]["ip"]++;
						}
						else ;
					}
					else{//修改状态
						x.cells[2].innerHTML=words[i].match(/\d+(\.\d+){3}/)[0];//IP
						x.cells[3].innerHTML=words[i].match(/\d\d(:\d\d){2} /)[0];//时间
						IDtime[ID][0]=x.cells[3].innerHTML;
						IDtime[ID]["ip"]=1;
						$('#'+ID+"login").css("color","");
						$('#'+ID+"login").css("background-color","");
						k++;
					}
				}
			}
			document.getElementById('on_number').innerHTML="已登录人数："+k+"&nbsp;&nbsp;";
			var l=0;
			for (i=words.length-1;i>=0 ;i-- ) 
			{ //从后往前读每一条POST
				reg = new RegExp("POST \\/exam\\/(.+)\\/"+examID+"\\/ ");
				//reg=/POST \/exam\/(.+)\/\d+\/ /;
				if (words[i].match(" 200 ")&&words[i].match(reg)) {//提交成功的日志
					ID=RegExp.$1;
					x=document.getElementById(ID+"upload");
                    if (!x) continue;
					if (x.cells[2].innerHTML){//添加条目
						y=document.getElementById('uploadTable').insertRow(1);
						y.insertCell(0).innerHTML=ID;
						y.insertCell(1).innerHTML=x.cells[1].innerHTML;
						y.insertCell(2).innerHTML=words[i].match(/\d+(\.\d+){3}/)[0];
						y.insertCell(3).innerHTML=words[i].match(/\d\d(:\d\d){2} /)[0];
						y.insertCell(4).innerHTML="";
						y.setAttribute("class",'child_'+ID+"upload");
						y.setAttribute("id",ID+"upload");
						y.setAttribute("style","display: none");
						IDtime[ID]["submit"]++;
					}
					else{//修改状态
						x.cells[2].innerHTML=words[i].match(/\d+(\.\d+){3}/)[0];//IP
						x.cells[3].innerHTML=words[i].match(/\d\d(:\d\d){2} /)[0];//时间
						IDtime[ID][1]=x.cells[3].innerHTML;
						x.cells[4].innerHTML=usedTime(IDtime[ID][0],IDtime[ID][1]);
						IDtime[ID]["submit"]=1;
						$('#'+ID+"upload").css("color","");
						$('#'+ID+"upload").css("background-color","");
						l++;
					}
				}
			}
			document.getElementById('tijiaorenshu').innerText="已提交人数："+l;
			printCorrectList();
			for (i=words.length-1;i>=0 ;i-- )
			{ //从后往前读每一条POST
				reg = new RegExp("\\/exam\\/(.+)\\/"+examID+"\\/(\.+?)\\/ ");
				//reg=/POST \/exam\/(.+)\/\d+\/ /;
				if (words[i].match(reg)) {//提交成功的日志
					ID=RegExp.$1;
					SCORE=RegExp.$2;
					x=document.getElementById(ID+"message");
                    if (!x) continue;
					if (x.cells[3].innerHTML){//添加条目
						continue;
					}
					else{//修改状态
						x.cells[3].innerHTML=SCORE;
					}
				}
			}
			// for (i=words.length-1;i>=0;i--){
			// 	reg = new RegExp("GET \\/exam\\/(.+)\\/"+examID+"\\/(.+)/");
             //    if (words[i].match(reg)){
			// 		if(!x)continue;
			// 		if(x.cells[6].innerHTML)continue;
             //        ID=RegExp.$1;
			// 		SCORE=RegExp.$2;
             //        x=document.getElementById(ID+"message");
			// 		x.cells[6].innerHTML=SCORE;
			// 	}
			// }
			uploadSortTable=new TableSorter("uploadTable", 0 , 3);
			loginSortTable=new TableSorter("loginTable", 0 , 3);
			$(function(){//折叠
			 $('tr').dblclick(function(){   // 获取所谓的父行
				//console.log(123);
			   $(this)
				.siblings('.child_'+this.id).toggle();  // 隐藏/显示所谓的子行
				$(this).toggle();
				$('.parent').show();
				//.siblings(this.class).toggle();  // 隐藏/显示所谓的子行
			 });
			})
			$('.timeSort').click(function(){
				$('tr').hide();
				$('.parent').show();
			})
			$('#upload-list').hide();
			$('#login-list').show();
			$('#correct-list').hide();
			uploadSortTable.Sort(0);
			loginSortTable.Sort(0);
			$('#option1').click(function(){
				$('#upload-list').hide();
				$('#login-list').show();
				$('#correct-list').hide();
			})
			$('#option2').click(function(){
				$('#login-list').hide();
				$('#upload-list').show();
				$('#correct-list').hide();
			})
			$('#option3').click(function(){
				$('#login-list').hide();
				$('#upload-list').hide();
				$('#correct-list').show();
			})
		}
	}
	XHR2.send(null);
});


function TableSorter(table)
{//排序
    this.Table = this.$(table);
    if(this.Table.rows.length <= 1)
    {
        return;
    }
    var args = [];
    if(arguments.length > 1)
    {
        for(var x = 1; x < arguments.length; x++)
        {
            args.push(arguments[x]);
        }
    }
    this.Init(args);
}

TableSorter.prototype = {
    $ : function(element)//简写document.getElementById
    {
        return document.getElementById(element);
    },
    Init : function(args)//初始化表格的信息和操作
    {
        this.Rows = [];
        this.Header = [];
        this.ViewState = [];
        this.LastSorted = null;
        for(var x = 0; x < this.Table.rows.length; x++)
        {
            this.Rows.push(this.Table.rows[x]);
        }
        this.Header = this.Rows.shift().cells;
        for(var x = 0; x < (args.length ? args.length : this.Header.length); x++)
        {
            var rowIndex = args.length ? args[x] : x;
            if(rowIndex >= this.Header.length)
            {
                continue;
            }
            this.ViewState[rowIndex] = false;
            this.Header[rowIndex].style.cursor = "pointer";
            this.Header[rowIndex].onclick = this.GetFunction(this, "Sort", rowIndex);
        }
    },
    GetFunction : function(variable,method,param)//取得指定对象的指定方法.
    {
        return function()
        {
            variable[method](param);
        }
    },
    Sort : function(column)//执行排序.
    {
        if(this.LastSorted)
        {
            this.LastSorted.className = this.NormalCss;
        }
        var SortAsNumber = true;
        for(var x = 0; x < this.Rows.length && SortAsNumber; x++)
        {
            SortAsNumber = this.IsNumeric(this.Rows[x].cells[column].innerHTML);
        }
        this.Rows.sort(
        function(row1, row2)
        {
            var result;
            var value1,value2;
            value1 = row1.cells[column].innerHTML;
            value2 = row2.cells[column].innerHTML;
            if(value1 == value2)
            {
                return 0;
            }
            if(SortAsNumber)
            {
                result = parseFloat(value1) > parseFloat(value2);
            }
            else
            {
                result = value1 > value2;
            }
            result = result ? 1 : -1;
            return result;
        })
        if(this.ViewState[column])
        {
            this.Rows.reverse();
            this.ViewState[column] = false;
            this.Header[column].className = this.SortDescCss;
        }
        else
        {
            this.ViewState[column] = true;
            this.Header[column].className = this.SortAscCss;
        }
        this.LastSorted = this.Header[column];
        var frag = document.createDocumentFragment();
        for(var x = 0; x < this.Rows.length; x++)
        {
            frag.appendChild(this.Rows[x]);
        }
        this.Table.tBodies[0].appendChild(frag);
        this.OnSorted(this.Header[column], this.ViewState[column]);
    },
    IsNumeric : function(num)//验证是否是数字类型.
    {
        return /^\d+(\.\d+)?$/.test(num);
    },
    OnSorted : function(cell, IsAsc)//排序完后执行的方法.cell:执行排序列的表头单元格,IsAsc:是否为升序排序.
    {
        return;
    }
}