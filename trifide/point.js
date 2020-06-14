class Point {

  constructor(_x,_y) {
    this.pos = createVector(_x,_y);
    this.vel = createVector(0,0);
    this.r = 15;
    this.scope = 250;
    this._color = {
      r : random(255),
      g : random(255),
      b : random(255),
      a : 40
    };
    this.color = {
      stroke : color(this._color.r,this._color.g,this._color.b,this._color.a),
      fill : color(this._color.r,this._color.g,this._color.b,this._color.a)
    };
    this.offset;
    this.hovered = false;
    this.locked = false;
    this.inScope = false;
    this.vol = -60;
    this.redy = true;
    this.active = false;
    this.curses = 0;
    this.moy = 0;
    this.sum = 0;
    this.weightSum = 0;
  }


  display() {
    this.colorSelec();
    strokeWeight(this.r*2);
    stroke(this.color.stroke);
    fill(this.color.fill);
    point(this.pos.x, this.pos.y);
    strokeWeight(1);
    stroke(this._color.r,this._color.g,this._color.b,10);
    fill(this._color.r,this._color.g,this._color.b,10);
    ellipse(this.pos.x, this.pos.y, this.scope*2)
  }

  hover() {
    let dx = mouseX - this.pos.x;
    let dy = mouseY - this.pos.y;
    if (dx*dx + dy*dy < this.r*this.r) {
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
      if (!dragging || this.locked) {
        this.color.stroke.setAlpha(100);
      }
    } else {
      this.color.fill.setAlpha(this._color.a);
      this.color.stroke.setAlpha(255);
    }
  }

  //is at least 1 curse in this.scope?
  activee() {
    if (crs.some((elt) => p5.Vector.dist(this.pos, elt.pos) < this.scope)) {
      this.active = true;
    } else {this.active = false};
  }

  //avoids spamming start() when already in scope
  readiness() {
    if (!this.active){
      this.redy = true;
    }
  }

  distance() {
    let crsInScope = crs.filter((elt) => p5.Vector.dist(this.pos, elt.pos) < this.scope);
    this.curses = crsInScope.length;
    if (crsInScope.length > 0) {
      for (let i = 0; i < crsInScope.length; i++) {
        strokeWeight(1);
        stroke(0);
        line(this.pos.x,this.pos.y,crsInScope[i].pos.x,crsInScope[i].pos.y);
        let weight = map(p5.Vector.dist(this.pos, crsInScope[i].pos),0,this.scope,1,0);
        let quant = (p5.Vector.dist(this.pos, crsInScope[i].pos) * weight);
        this.sum += quant;
        this.weightSum += weight;
      }
      this.moy = this.sum / this.weightSum;
      this.sum = 0;
      this.weightSum = 0;
      this.vol = map(this.moy, 0,this.scope,0,-30);
      }
  }
}
