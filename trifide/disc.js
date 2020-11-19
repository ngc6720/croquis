class Point {

  constructor(_x,_y,_color) {
    this.pos = createVector(_x,_y);
    this.vel = createVector(0,0);
    this.r = 15;
    this.scope = 250;
    this._color = _color;
    this.color = {
      stroke : color(this._color.r,this._color.g,this._color.b,this._color.a),
      fill : color(this._color.r,this._color.g,this._color.b,this._color.a)
    };
    this.offset;
    this.isLocked = false;
    this.vol = -60;
    this.isReady = true;
    //this.active = false;
    this.crsInScope = [];
    this.curses = 0;
    this.moy = 0;
    this.sum = 0;
    this.weightSum = 0;
  }

  isHovered() {
    let dx = mouseX - this.pos.x;
    let dy = mouseY - this.pos.y;
    if (dx*dx + dy*dy < this.r*this.r) {
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


  //is at least 1 curse in this.scope?
  isActive() {
    if (crs.some((elt) => p5.Vector.dist(this.pos, elt.pos) < this.scope)) {
      return true;
    } else {return false;};
  }
  

  //avoids spamming start() when already in scope
  prepare() {
    if (!this.isActive()) {
      this.isReady = true;
    }
  }

  //filters crs array to only elts in scope
  //calculates a weighted average distance
  //maps it into an amplitude
  distance() {
    var crsInScope = crs.filter((elt) => p5.Vector.dist(this.pos, elt.pos) < this.scope);
    this.curses = crsInScope.length;
    this.crsInScope = crsInScope;
    if (crsInScope.length > 0) {
      for (let i = 0; i < crsInScope.length; i++) {
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

  display() {
    if (this.isHovered() || this.isLocked) {
      this.color.stroke.setAlpha(100);
    } else {
      this.color.fill.setAlpha(this._color.a);
      this.color.stroke.setAlpha(this._color.a);
    }
    for (let i = 0; i < this.crsInScope.length; i++) {
      strokeWeight(1);
      stroke(255);
      line(this.pos.x,this.pos.y,this.crsInScope[i].pos.x,this.crsInScope[i].pos.y);
    }
    strokeWeight(this.r*2);
    stroke(this.color.stroke);
    fill(this.color.fill);
    point(this.pos.x, this.pos.y);
    strokeWeight(1);
    stroke(this._color.r,this._color.g,this._color.b,25);
    fill(this._color.r,this._color.g,this._color.b,25);
    ellipse(this.pos.x, this.pos.y, this.scope*2)
  }
}
