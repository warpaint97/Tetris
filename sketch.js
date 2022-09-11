let unit; // pixels
let X = 15; // units
let Y = 30; // units
let ratio = X/Y;

let width;
let height;


// speeds
let default_speed = 5;
let boost_speed = 20;
let fall_speed = default_speed;

//game
let score = 0;
let highscore = 0;
let selected_shape = null;
let other_shapes = [];

//menu
let isStopped = false;
let stop_text = "Pause";


function setup() {
  width = (windowHeight)*ratio;
  height = windowHeight;
  unit = width/X;
  var cnv = createCanvas(width, height);
  cnv.style('display', 'block');
  // spawn a new shape
  spawn();
  
  button = createButton('Restart');
  button.position(windowWidth/2-width/2, 0.1*height);
  button.mousePressed(gameOver);
  button1 = createButton(stop_text);
  button1.position(windowWidth/2-width/2, 0.14*height);
  button1.mousePressed(toggleStop);
}

function draw() {
  frameRate(fall_speed+score*(1/50));
  background(220);
  
  //grid
  grid();
    
  if (hasLost()) {
      gameOver();
  }
  checkRows();
  
  if (!isStopped) {
    controls();
    selected_shape.move(new Point(0,1));
  } 
  selected_shape.draw();

  other_shapes.forEach((x) => {x.draw();});
  
  push();
  textSize(16);
  text("Score: "+score, 0.35*unit, 1.7*unit);
  text("Highscore: "+highscore, 0.35*unit,2.5*unit);
  textSize(10);
  fill("grey");
  text("Move: arrow keys; Rotate: A and D", 0.35*unit,0.8*unit);
  pop();
}

function keyPressed() {
  if (keyCode === 65 && !isStopped) {
    selected_shape.rotate(-0.5*PI);
  } else if (keyCode === 68 && !isStopped) {
    selected_shape.rotate(0.5*PI);
  }
}

function controls() {
  // boost
  if (keyIsDown(DOWN_ARROW)) {
    fall_speed = boost_speed;
  } else {
    fall_speed = default_speed;
  }
  
  // boost
  if (keyIsDown(LEFT_ARROW)) {
    selected_shape.move(new Point(-1,0));
  } else if (keyIsDown(RIGHT_ARROW)){
    selected_shape.move(new Point(1,0));
  }
}

function grid() {
  push();
  stroke("white");
  for (let x = 0; x < X; x++) {
    line(x*unit,0,x*unit,height);
  }
  for (let y = 0; y < Y; y++) {
    line(0,y*unit,width,y*unit);
  }
  pop();
}