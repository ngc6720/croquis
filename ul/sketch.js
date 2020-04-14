document.addEventListener("contextmenu", function(e){
e.preventDefault();
e.stopPropagation();
}, false);

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(149, 230, 192, 90);
}
function draw() {
}
function useData(msg) {
  let data = msg
  stroke(42, 143, 112, 56);
  fill(42, 143, 112, 56);
  line(data.x,data.y,data.px,data.py)
  ellipse(data.x, data.y,7,7);
}
function mousePressed() {
  let data = {x:pmouseX,y:pmouseY,px:pmouseX,py:pmouseY};
  useData(data);
}
function mouseDragged() {
  mouseInit = false
  let data = {x:mouseX,y:mouseY,px:pmouseX,py:pmouseY};
  useData(data);
}
