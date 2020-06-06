document.addEventListener("contextmenu", function(e){
e.preventDefault();
e.stopPropagation();
}, false);

function setup() {
  createCanvas(windowWidth, windowHeight);
  //background(149, 230, 192, 90);
  background(255);
}
function draw() {
}
function useData(msg) {
  let data = msg
  strokeWeight(1);
  //stroke(42, 143, 112, 56);
  //fill(42, 143, 112, 56);
  stroke(0,56);
  fill(0,56);
  line(data.x,data.y,data.px,data.py)
  ellipse(data.x, data.y,7,7);
}
function mousePressed() {
  if (mouseButton === LEFT) {
    let data = {x:pmouseX,y:pmouseY,px:pmouseX,py:pmouseY};
    useData(data);
  }
  if (mouseButton === RIGHT)  {
    erase();
  }
}
function mouseDragged() {
  if (mouseButton === LEFT) {
    mouseInit = false
    let data = {x:mouseX,y:mouseY,px:pmouseX,py:pmouseY};
    useData(data);
  }
  if (mouseButton === RIGHT)  {
    erase();
  }
}

function erase() {
  strokeWeight(30);
  stroke(255)
  noFill();
  line(pmouseX,pmouseY,mouseX,mouseY);
  //ellipse(mouseX,mouseY,0);
}
