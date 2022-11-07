img="";
status="";
objects=[];
warning="";
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
video.size(380,380);
objectDetector=ml5.objectDetector("cocossd",modelLoaded);
}

function preload(){
    warning=loadSound("YRL6BSM-siren.mp3");
}

function modelLoaded(){
    console.log("model is loaded");
    status=true;
 
    document.getElementById("status").innerHTML="status : detecting";
}

function gotResults(error,results){
    if(error){
        console.error("error");
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
image(video,0,0,380,380);

if(status != ""){ 
    objectDetector.detect(video,gotResults);
for(i=0;i < objects.length;i++){
        r=random(255);
g=random(255);
b=random(255);
    document.getElementById("status").innerHTML=" Status : baby detetcted";

    fill(r,g,b);
    percent=floor(objects[i].confidence*100);
    text(objects[i].label + " " + percent + "%",objects[i].x+15,objects[i].y+15); 
    noFill();
    stroke(r,g,b);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    
    warning.stop();
    
}
}
else{
warning.play();
document.getElementById("status").innerHTML=" Status : baby not found";
}
}