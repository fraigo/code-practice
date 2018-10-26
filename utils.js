function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    console.log(miliseconds);
    while (currentTime + miliseconds >= new Date().getTime()) {
        
    }
 }

function selectTextareaLine(tarea,lineNum) {
    lineNum--; // array starts at 0
    var lines = tarea.value.split("\n");

    // calculate start/end
    var startPos = 0, endPos = tarea.value.length;
    for(var x = 0; x < lines.length; x++) {
        if(x == lineNum) {
            break;
        }
        startPos += (lines[x].length+1);

    }

    var endPos = lines[lineNum].length+startPos;

    // do selection
    // Chrome / Firefox

    if(typeof(tarea.selectionStart) != "undefined") {
        tarea.focus();
        tarea.selectionStart = startPos;
        tarea.selectionEnd = endPos;
        return true;
    }

    // IE
    if (document.selection && document.selection.createRange) {
        tarea.focus();
        tarea.select();
        var range = document.selection.createRange();
        range.collapse(true);
        range.moveEnd("character", endPos);
        range.moveStart("character", startPos);
        range.select();
        return true;
    }

    return false;
}


function positionHint(obj,e){
    var x=e.layerX;
    var y=e.layerY;
    var xfactor=getCanvas().clientWidth/getCanvas().width;
    var yfactor=getCanvas().clientHeight/getCanvas().height;
    var px=Math.floor(x/xfactor);
    var py=Math.floor(y/yfactor);
    
    //console.log(x,y,xfactor,yfactor,px,py);
    getCanvas().setAttribute("title",px+" , "+py);
}

function positionClick(obj,ev){
    var x=ev.layerX;
    var y=ev.layerY;
    var xfactor=getCanvas().clientWidth/getCanvas().width;
    var yfactor=getCanvas().clientHeight/getCanvas().height;
    var px=Math.floor(x/xfactor);
    var py=Math.floor(y/yfactor);
    
    //console.log(x,y,xfactor,yfactor,px,py);
    var e=document.getElementById("positionclick");
    if (!e){
        e=document.createElement("div");
        e.id="positionclick";
        e.style.position="absolute";
        
        e.style.width="80px";
        e.style.textAlign="center";
        e.style.fontSize="12pt";
        e.style.backgroundColor="rgba(255,255,255,0.4)";
        e.style.border="1px solid gray";
        e.style.borderRadius="5px 5px";
        e.style.padding="5px 5px";
        e.style.color="#444";
        
        document.body.appendChild(e);
    }
    e.style.top=ev.clientY+"px";
    e.style.left=ev.clientX+"px";
    e.style.display="";
    e.innerHTML=(Math.round(px/5)*5)+" , "+(Math.round(py/5)*5);
    
    window.setTimeout(function(){
        e.style.display="none";
    },3000);
    

}


function addCSSRule(sheet, selector, rules,index) {
    if(sheet.insertRule) {
        sheet.insertRule(selector + "{" + rules + "}", index);
    }
    else {
        sheet.addRule(selector, rules, index);
    }
    //if -else is used because some browsers don't support insertRule 
    //and some don't support addRule
}

function httpRequest(method,url,successCallback,errorCallback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (successCallback) successCallback(xhttp.responseText,xhttp);
        }else{
            if (errorCallback) errorCallback(this.status, this.readyState, xhttp);
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}