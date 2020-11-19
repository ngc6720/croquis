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
    this.isLocked = false;
  }

  isHovered() {
    let dx = mouseX - this.pos.x;
    let dy = mouseY - this.pos.y;
    if (
      dx*dx + dy*dy < this.r*this.r
    ) {
      return true;
    } else {return false;}
  }

  lock() {
    if (this.isHovered()) {
      let mouse = createVector(mouseX,mouseY);
      this.offset = p5.Vector.sub(mouse, this.pos);
      this.isLocked = true;
    } else {
      this.isLocked = false;
    }
  }

  drag() {
    if (this.isLocked){
      let mouse = createVector(mouseX,mouseY);
      this.pos.set(p5.Vector.sub(mouse, this.offset));
    }
  }

  display() {
    if (this.isHovered() || this.isLocked) {
      this.color.stroke.setAlpha(100);
    } else {
      this.color.fill.setAlpha(255);
      this.color.stroke.setAlpha(255);
    }
    strokeWeight(this.r*2);
    stroke(this.color.stroke);
    fill(this.color.fill);
    point(this.pos.x, this.pos.y);
  }
}
