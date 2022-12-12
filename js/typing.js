
var i = 0;
var txt = 'Hello, my name is Gavin Meregillano :)';
var blank = "&#9646"
var j = 0;


function intro() {

    blink();
    write();



}

function blink(){
    if(j % 2 == 0){
        document.getElementById("blink").innerHTML += blank;
    }else{
        document.getElementById("blink").innerHTML = "";
    }
    j++;
    setTimeout(blink, 300);
}

function write(){
    if (i < txt.length) {
        document.getElementById("intro").innerHTML += txt.charAt(i);
        i++;
        setTimeout(write, 100);
    }
}

