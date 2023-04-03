noseX = 0;
noseY = 0;
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY= 0;
difference = 0;
drawCircle = "";
drawRectangle = "";
drawCat = ""

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function preload(){
    cat = loadImage("gato.jpg")
}

function setup(){
    video = createCapture(VIDEO);
    video.size(250, 250);
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
    canvas = createCanvas(800, 500)
    background("pink");
}

function modelLoaded(){
    console.log("poseNet iniciou");
}

function gotPoses(results){
    console.log(results)
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristY = results[0].pose.rightWrist.y;
    difference = floor(leftWristX - rightWristX);
}

function draw(){
    document.getElementById("objectSide").innerHTML = "Largura e altura seral igual a: " + difference + "px.";
    document.getElementById("nosePos").innerHTML = "Posição X do nariz: " + noseX + ". Posição Y do nariz: " + noseY + ".";
    fill("purple");
    if(drawCircle == "set"){
        radius = 50;
        circle(noseX, noseY, difference);
        drawCircle = "";
    }
    if(drawRectangle == "set"){
        width = 75;
        height = 50
        rect(noseX, noseY, difference * 1.25, difference);
        drawRectangle = "";
    }
    if(drawCat == "set"){
        image(cat, noseX, noseY, difference * 1.25, difference * 1.25);
        drawCat = "";
    }
    rect(100, 100, button.width, button.height);
}

function drawWithNose(){
    fill("red");
    cirrcle(noseX, noseY, 10);
}

function drawWithLeftWrist(){
    fill("orange");
    circle(leftWristX, leftWristY, 10);
}

function drawWithRightWrist(){
    fill("blue");
    circle(rightWristX, rightWristY, 10);
}

function start(){
    document.getElementById("status").innerHTML =  "Sistema está te ouvindo";
    recognition.start();
}

recognition.onresult = function(event){
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById("status").innerHTML = "Você disse: " + content;
    if (content == "círculo") {
        noseX = Math.floor(Math.random()*800);
        noseY = Math.floor(Math.random()*500);
        document.getElementById("status").innerHTML = "Desenhando círculo";
        drawCircle = "set";
        console.log("circle");
    }
    if (content == "retângulo") {
        noseX = Math.floor(Math.random()*800);
        noseY = Math.floor(Math.random()*500);
        document.getElementById("status").innerHTML = "Desenhando retângulo";
        drawRectangle = "set";
        console.log("rectangle");
    }
    if (content == "gato") {
        noseX = Math.floor(Math.random()*800);
        noseY = Math.floor(Math.random()*500);
        document.getElementById("status").innerHTML = "Desenhando gato";
        drawCat = "set";
        console.log("gato");
    }
}