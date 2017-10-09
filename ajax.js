document.documentElement.style.fontSize=document.documentElement.clientWidth/376*50+"px";
var conter = document.getElementById("conter");

if(window.XMLHttpRequest){
    var xhr = new XMLHttpRequest();
}else{
    var xhr = new ActiveXObject("Microsoft.XMLHTTP")
}
xhr.open("get","http://localhost:8080/file3.html?data",true);
xhr.send();
xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
        var obj=JSON.parse(JSON.parse(xhr.responseText).data);
        for(var i=0;i<obj.length;i++){
            //obj[i].img  obj[i].contes  obj[i].phone
                conter.innerHTML+='<div class="file3_name"><span class="head_portrait"><img src="images/'+obj[i].img+'"></span><p><span>'+obj[i].contes+'</span><span>'+obj[i].phone+'</span></p> </div>'
            }
    }
};