class Square {

  constructor(_x,_y,_l,_h) {
    this.pos = createVector(_x,_y);
    this.size = {x:_l,y:_h};
    this._color = {
      r : 255,
      g : 255,
      b : 255,
      a : 255
    };
    this.color = {
      stroke : color(this._color.r,this._color.g,this._color.b,this._color.a),
      fill : color(this._color.r,this._color.g,this._color.b,this._color.a)
    };
    this.hovered = false;
    this.clicked = false;
  }

  display() {
    strokeWeight(0);
    stroke(this.color.stroke);
    fill(this.color.fill);
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
  }

  hover() {
    if (
      mouseX > this.pos.x &&
      mouseX < this.pos.x +this.size.x &&
      mouseY > this.pos.y &&
      mouseY < this.pos.y +this.size.y
    ) {
      this.hovered = true;
    } else {
      this.hovered = false;
    }
  }

  colorSelec() {
    if (this.clicked){
      this.color.stroke.setAlpha(0);
      this.color.fill.setAlpha(0);
    } else if (this.hovered) {

      this.color.fill.setAlpha(this._color.a);
    } else {
      this.color.fill.setAlpha(this._color.a);
      this.color.stroke.setAlpha(0);
    }
  }
  setColor(colore) {
    this._color = colore;
    this.color = {
      stroke : color(this._color.r,this._color.g,this._color.b,this._color.a),
      fill : color(this._color.r,this._color.g,this._color.b,this._color.a)
    };
  }
}
