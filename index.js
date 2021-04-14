var song = "";
var anotherSOng;
var leftWristX, rightWristX, leftWristY, rightWristY;
var leftWristScore = 0;
var rightWristScore = 0;




var song_Status1 = "";
var song_Status2 = "";
var song1, song2;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}


function setup() {
    ctx = createCanvas(300, 270)
    ctx.center();
    ctx.position(400, 250)
    video = createCapture(VIDEO);

    video.hide();
    const poseNet = ml5.poseNet(video, modelLoaded);

    poseNet.on("pose", function (results) {

        if (results.length > 0) {
            console.log(results);
            rightWristScore = results[0].pose.keypoints[10].score;
            leftWristScore = results[0].pose.keypoints[9].score;
            
            leftWristX = results[0].pose.leftWrist.x;
            leftWristY = results[0].pose.leftWrist.y;
            rightWristX = results[0].pose.rightWrist.x;
            rightWristY = results[0].pose.rightWrist.y;
        }




    });




}


function modelLoaded() {
    console.log("Model Loaded!");
}

function draw() {

    background(45);
    image(video, 0, 0, 300, 300);

    fill("#089B9D");
    stroke("#089B9D");
    
    song_Status1 = song1.isPlaying();
    song_Status2 = song2.isPlaying();


    if(leftWristScore > 0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song_Status2 == false){
            song2.play();

        }
        if(song_Status1 == false){
            song1.play();
        }
    }
}


function play() {
    song.play();
}