class Selection {

  constructor(_x,_y) {
    this.origin = createVector(_x,_y);
    this.end = createVector(_x,_y);
    this.allowed= false;
  }

  generate() {
    this.end.set(mouseX,mouseY);
  }

  allow() {
    this.allowed= true;
  }
  display() {
    if (this.allowed) {
      strokeWeight(1);
      rectMode(CORNER);
      stroke(180);
      fill(245,50);
      rect(this.origin.x,this.origin.y,this.end.x-this.origin.x,this.end.y-this.origin.y);
    }
  }
}
