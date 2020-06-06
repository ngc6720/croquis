class Square {

  constructor(_x,_y) {
    this.pos = createVector(_x,_y);
    this.vel = createVector(0,0);
    this.size = {x:random(20,80), y:random(20,80)};
    this._color = {
      r : random(255),
      g : random(255),
      b : random(255),
      a : 95
    };
    this.color = {
      stroke : color(this._color.r,this._color.g,this._color.b,this._color.a),
      fill : color(this._color.r,this._color.g,this._color.b,this._color.a)
    };
    this.offset;
    this.hovered = false;
    this.locked = false;
    this.selected = false;
  }


  display() {
    rectMode(CENTER);
    strokeWeight(1);
    this.colorSelec();
    stroke(this.color.stroke);
    fill(this.color.fill);
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
  }

  hover() {
    if (
      !selecting &&
      mouseX > this.pos.x -this.size.x/2 &&
      mouseX < this.pos.x +this.size.x/2 &&
      mouseY > this.pos.y -this.size.y/2 &&
      mouseY < this.pos.y +this.size.y/2
    ) {

      this.hovered = true;
    } else {
      this.hovered = false;
    }
  }

  hovie(selection) {
    let left,right,top,bottom;
    if (selection.origin.x < selection.end.x) {
      left= selection.origin.x; right= selection.end.x;
      } else { left= selection.end.x; right= selection.origin.x}
    if (selection.origin.y < selection.end.y) {
      top = selection.origin.y; bottom= selection.end.y;
      } else { top= selection.end.y; bottom= selection.origin.y;
    }
    if (
      left > this.pos.x +this.size.x/2 ||
      right < this.pos.x -this.size.x/2 ||
      top > this.pos.y +this.size.y/2 ||
      bottom < this.pos.y -this.size.y/2
    ) {

      this.selected = false;
    } else {

      this.selected = true;
    }
  }

  lock() {
    if (this.hovered && !this.selected) {
      for (let a of sqs) {
        a.selected = false;
        a.locked = false;
      }
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
    if (this.selected) {
      this.color.stroke.setAlpha(100);
      this.color.fill.setAlpha(0);
    } else if (this.hovered) {
      this.color.stroke.setAlpha(100);
    } else {
      this.color.fill.setAlpha(this._color.a);
      this.color.stroke.setAlpha(0);
    }
  }
}
