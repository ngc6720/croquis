document.addEventListener("contextmenu", function(e){
e.preventDefault();
}, false);

let sqs = [];
let dimx = 6;
let dimy = 5;
var s = [];

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (let y = 0; y < dimy; y++) {
    for (let x = 0; x < dimx; x++) {
      let i = (x + y*dimx);
      sqs[i].pos.x = width/dimx*x;
      sqs[i].pos.y = height/dimy*y;
      sqs[i].size.x = width/dimx;
      sqs[i].size.y = height/dimy;
    }
  }
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  for (let y = 0; y < dimy; y++) {
    for (let x = 0; x < dimx; x++) {
      sqs.push(new Square(width/dimx*x,height/dimy*y,width/dimx,height/dimy));
    }
  }
  for (let i = 0; i < 12; i++) {
    sqs[i].setColor(
      {
        r : randomGaussian(220,15),
        g : randomGaussian(250,15),
        b : randomGaussian(240,15),
        a : 255
      })};
  for (let i = 12; i < 24; i++) {
    sqs[i].setColor(
      {
        r : randomGaussian(255,15),
        g : randomGaussian(40,15),
        b : randomGaussian(40,15),
        a : 200
      })};
  for (let i = 24; i < 30; i++) {
    sqs[i].setColor(
      {
        r : randomGaussian(105,15),
        g : randomGaussian(120,15),
        b : randomGaussian(170,15),
        a : 200
      })};
  for (let i = 0; i < 12; i++) {
    let index = i + 1;
      s.push(new Tone.Player("./media/p1s"+index+".wav").toMaster());
  }
  for (let i = 0; i < 12; i++) {
    let index = i + 1;
      s.push(new Tone.Player("./media/p2s"+index+".wav").toMaster());
  }
  for (let i = 0; i < 6; i++) {
    let index = i + 1;
      s.push(new Tone.Player("./media/p3s"+index+".wav").toMaster());
  }
}

function draw() {
  background(255);
  for (let a of sqs) {
    a.colorSelec();
    a.display();
    a.hover();
  }
}

function mousePressed() {
  for (let i = 0; i < sqs.length; i++) {
    sqs[i].hover();
    if (sqs[i].hovered) {
      sqs[i].clicked = true;
      setTimeout(()=>{sqs[i].clicked = false;}, 80);
      stopNappe();
      s[i].start();
    }
  }
}

function stopNappe() {
  s[24].stop();
  s[25].stop();
  s[26].stop();
  s[27].stop();
  s[28].stop();
  s[29].stop();
}
