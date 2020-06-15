class Curse {

  constructor(_x,_y) {
    this.pos = createVector(_x,_y);
    this.vel = createVector(0,0);
    this.r = 10;
    this.color = {
      stroke : color(255),
      fill : color(255)
    };
    this.offset;
    this.hovered = false;
    this.locked = false;
  }


  display() {
    strokeWeight(this.r*2);
    this.colorSelec();
    stroke(this.color.stroke);
    fill(this.color.fill);
    point(this.pos.x, this.pos.y);
  }

  hover() {
    let dx = mouseX - this.pos.x;
    let dy = mouseY - this.pos.y;
    if (
      dx*dx + dy*dy < this.r*this.r
    ) {
      this.hovered = true;
    } else {
      this.hovered = false;
    }
  }

  lock() {
    if (this.hovered) {
      let mouse = createVector(mouseX,mouseY);
      this.offset = p5.Vector.sub(mouse, this.pos);
      this.locked = true;
    } else if (this.selected) {
      let mouse = createVector(mouseX,mouseY);
      this.offset = p5.Vector.sub(mouse, this.pos);
      this.locked = true;
    } else {
      this.locked = false;
    }
  }

  drag() {
    if (this.locked){
      let mouse = createVector(mouseX,mouseY);
      this.pos.set(p5.Vector.sub(mouse, this.offset));
    }
  }

  colorSelec() {
    if (this.hovered) {
      this.color.stroke.setAlpha(100);
    } else {
      this.color.fill.setAlpha(200);
      this.color.stroke.setAlpha(255);
    }
  }
}
