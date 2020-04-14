document.addEventListener("contextmenu", function(e){
e.preventDefault();
}, false);
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let sq = []

function setup() {
  createCanvas(windowWidth, windowHeight);
//  for (let i = 0; i < 200; i++) {
//    sq.push(new Square(random(width/3, width - width/3), random(height/5, height - height/5)));
//  }
}

function draw() {
  background(0);
  for (let a of sq) {
    a.display();
  }
}

function mousePressed() {
  if (mouseButton == RIGHT) {
    sq.push(new Square(mouseX, mouseY));
  }
  if (mouseButton == RIGHT && keyIsDown(ALT)) {
    for (let i = sq.length-1; i >= 0; i--) {
      if (sq[i].hovered()) {
        sq.splice(i,1);
      }
    }
  }
  if (mouseButton == LEFT) {
    for (let a of sq) {
      a.lock();
    }
  }
}
function mouseDragged() {
  if (mouseButton == LEFT) {
    for (let a of sq) {
        a.drag();
    }
  }
    if (mouseButton == RIGHT && keyIsDown(CONTROL)) {
    sq.push(new Square(mouseX, mouseY));
  }
  if (mouseButton == RIGHT && keyIsDown(ALT)) {
    for (let i = sq.length-1; i >= 0; i--) {
      if (sq[i].hovered()) {
        sq.splice(i,1);
      }
    }
  }
}

function mouseReleased() {
  for (let i = sq.length-1; i >= 0; i--) {
        sq[i].unlock();
  }
}


class Square {

  constructor(_x, _y) {
    this.x= _x;
    this.y= _y;
    this.xSize = random(5, 100);
    this.ySize = random(5, 100);
    this.colFill = color(42, 143, 112, 56);
    this.colStroke = color(149, 230, 192, 90);
    this.locked =  Boolean(false);
    this.xOffset = 0.0;
    this.yOffset = 0.0;
  }

  display() {
    if (this.locked) {
      this.colStroke = color(255);
      this.colFill = color(255);
  } else if (this.hovered()) {
      this.colStroke = color(255);
      this.colFill = color(255,255,255,50);
    } else {
      this.colStroke = color(255,255,255,50);
      this.colFill = color(0);
    }
        rectMode(CENTER);
        stroke(this.colStroke);
        fill(this.colFill);
        rect(this.x, this.y, this.xSize, this.ySize);
    }
 hovered() {
    if (
      mouseX > this.x - this.xSize /2 &&
      mouseX < this.x + this.xSize /2 &&
      mouseY > this.y - this.ySize /2 &&
      mouseY < this.y + this.ySize /2) {
        return true;
      } else {
        this.locked = false;
        return false;
      }
  }
  lock() {
    if (this.hovered()) {
    this.locked = true;
    } else {
      this.locked = false;
    }
    this.xOffset = mouseX - this.x;
    this.yOffset = mouseY - this.y;
  }
  drag() {
    if (this.locked) {
    this.x = mouseX - this.xOffset;
    this.y = mouseY - this.yOffset;
    }
  }
  unlock() {
    this.locked = false;
  }
}
