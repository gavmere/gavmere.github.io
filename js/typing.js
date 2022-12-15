var blank = "&#9646"
var j = 0;


function intro() {
    setTimeout(function(){write("ls", "intro")}, 1000);
    setTimeout(fileAppear, 1500, "files");
    setTimeout(function(){write("./portfolio", "runEXE")}, 2000);
    setTimeout(fileDisappear, 1525, "blinker");
    setTimeout(fileAppear, 1500, "bottomBlinker");
}


function write(text, element){
    var i = 0;
    var txt = text;
    type(element);
    function type(element){
        if (i < txt.length) {
            document.getElementById(element).innerHTML += txt.charAt(i);
            i++;
            setTimeout(type, 100, element);
        }
    }
}

function fileAppear(element){
    document.getElementById(element).style.visibility="visible";
}

function fileDisappear(element){
    document.getElementById(element).style.visibility="hidden";
}