objects = [];
status = "";


function setup() {
  canvas = createCanvas(450, 450);
  canvas.position(570,280);
  video = createCapture(VIDEO);
  video.size(450,450);
  video.hide();
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_name = document.getElementById("input").value;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 450, 450);
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

         
          if(objects[i].label == object_name)
          {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status1").innerHTML = object_name + " Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
          }
          else
          {
            document.getElementById("status1").innerHTML = object_name + " Not Found";
          }          
         }
      }
}