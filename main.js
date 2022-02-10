var IMAGE=null;
var frame=0;
var timeouts=[];
var images={};
var timeout = 200;
var fontSize = 16;

var square = {
    px : 0,
    py : 0,
    color : "#000",
    w : 40,
    h : 40,    
}

var line = {
    x0 : 0,
    y0 : 0,
    x1 : 0,
    y1 : 0,
    color : "#000"
}



var RED="#C00";
var BLUE="#00C";
var GREEN="#0C0";

var currentLine = 0;

window.onload=function(){
    getCode().value = localStorage.getItem("code");
    clear();
    zoomFont(0);
    httpRequest("GET","examples/examples.json",function(data){
        var examples=JSON.parse(data);
        for(var i=0;i<examples.length;i++){
            var opt = document.createElement('option');
            opt.value = examples[i].filename;
            opt.innerHTML = examples[i].description + " (" + examples[i].category + ")";
            getExamples().appendChild(opt);
        }
    })
}

window.onerror = function(message,source,line,col){
    console.log(message);
    selectTextareaLine(getCode(),line);
    getCode().setAttribute("title",message);
    return false;
}

function loadImage(src,callback){
    var img=document.createElement("img");
    img.onload=function(){
        callback();
    }
    images[src]=img; 
}

function loadScript(obj){
    console.log(obj);
    if (obj.value==""){
        return;
    }
    getCode().value="";
    httpRequest("GET","examples/"+obj.value,function(data){
        getCode().value=data;
    })
}

function getCanvas(){
    return document.getElementById("canvas");
}

function getCode(){
    return document.getElementById("code");
}

function getExamples(){
    return document.getElementById("examples");
}

function getContext(){
    var canvas= getCanvas();
    var context=canvas.getContext("2d");
    return context;
}

function appendFrame(func,vars){
    //console.log(vars);
    var copyVars=JSON.parse(JSON.stringify(vars));
    frame++;
    var proc=setTimeout(func,frame*timeout,copyVars,frame);   
    timeouts.push(proc);
}

function clear(){
    var c= getCanvas();
    var ctx=getContext();
    ctx.clearRect(0,0,c.width,c.height)
    line.color="#CCC";
    timeout=0;
    for(var x=0;x<c.width;x+=10){
        if (x%50==0){
            line.color="#AAA";
        }else{
            line.color="#CCC";
        }
        drawLine(x,0,x,c.height);
    }
    for(var y=0;y<c.height;y+=10){   
        if (y%50==0){
            line.color="#AAA";
        }else{
            line.color="#CCC";
        } 
        drawLine(0,y,c.width,y);
    }
    line.x0=0;
    line.y0=0;
    timeout=300;
    line.color="#000";
}

function putLine(){
    appendFrame(function(point,frame){
        var ctx=getContext();
        ctx.strokeStyle=point.color;
        ctx.beginPath();
        ctx.moveTo(point.x0,point.y0);
        ctx.lineTo(point.x1,point.y1);
        ctx.stroke();
    }, line);
}

function putImage(){
    appendFrame(function(obj,frame){
        clear();
        var ctx=getContext();
        ctx.fillStyle=obj.color;
        ctx.fillRect(obj.px,obj.py, obj.w, obj.h);
    },square);   
}

function runcode(){
    frame = 0;
    for(var i=0;i<timeouts.length;i++){
        clearTimeout(timeouts[i]);
    }
    timeouts=[];
    setTimeout(clear,0);
    frame++;
    var obj = getCode();
    obj.setAttribute("title","");
    eval(obj.value);
    //var lines = obj.value.split("\n");
    //runLine(lines,0);
    localStorage.setItem("code",obj.value);
}

function runLine(lines,pos){
    if (pos>=lines.length){
        return;
    }
    currentLine = pos;
    console.log(pos, lines[pos])
    eval(lines[pos]);
    setTimeout(function(){
        runLine(lines,pos+1);

    },500);
}

function moveTo(x,y){
    square.px = x;
    square.py = y;
    line.x0=x;
    line.y0=y;
    putImage(); 
}

function lineTo(x,y){
    line.x0=line.x1;
    line.y0=line.y1;
    line.x1=x;
    line.y1=y;
    putLine();
}

function lineFrom(x,y){
    line.x1=x;
    line.y1=y;
}

var start = lineFrom;
var moveTo = lineTo;

function lineColor(color){
    line.color=color;
}
var color = lineColor;

function drawLine(x0,y0,x1,y1){
    line.x0=x0;
    line.y0=y0;
    line.x1=x1;
    line.y1=y1;
    putLine();
}

function setColor(c){
    square.color = c;
    putImage();
}

function insert(text_to_insert){
    var textInput=getCode()
    // will get the value of the input box
    var text=textInput.value;
    var curPos=textInput.selectionStart;
   // setting the updated value in the text area
   textInput.value=(text.slice(0,curPos)+text_to_insert+text.slice(curPos));
   textInput.focus();
   textInput.selectionStart=curPos;
   textInput.selectionEnd=curPos+text_to_insert.length;
}

function zoomFont(diff){
    fontSize += diff*2;
    if (fontSize>20) fontSize=20;
    if (fontSize<8) fontSize=8;
    console.log(fontSize);
    document.body.style.fontSize = fontSize + "pt";
    addCSSRule(document.styleSheets[0], "*", "--size: "+fontSize + "pt",0);
}