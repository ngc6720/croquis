document.addEventListener("contextmenu", function(e){
e.preventDefault();
}, false);

let sqs = [];
let dimx = 6;
let dimy = 5;
var s = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];

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
        r : randomGaussian(106,15),
        g : randomGaussian(217,15),
        b : randomGaussian(33,15),
        a : 180
      })};
  for (let i = 12; i < 23; i++) {
    sqs[i].setColor(
      {
        r : randomGaussian(214,15),
        g : randomGaussian(104,15),
        b : randomGaussian(65,15),
        a : 180
      })};
  for (let i = 23; i < 27; i++) {
    sqs[i].setColor(
      {
        r : randomGaussian(85,15),
        g : randomGaussian(96,15),
        b : randomGaussian(217,15),
        a : 180
      })};

  s[0] = new Tone.Player("./media/samples/p1s01.wav").toMaster();
  s[1] = new Tone.Player("./media/samples/p1s02.wav").toMaster();
  s[2] = new Tone.Player("./media/samples/p1s03.wav").toMaster();
  s[3] = new Tone.Player("./media/samples/p1s04.wav").toMaster();
  s[4] = new Tone.Player("./media/samples/p1s05.wav").toMaster();
  s[5] = new Tone.Player("./media/samples/p1s06.wav").toMaster();
  s[6] = new Tone.Player("./media/samples/p1s07.wav").toMaster();
  s[7] = new Tone.Player("./media/samples/p1s08.wav").toMaster();
  s[8] = new Tone.Player("./media/samples/p1s09.wav").toMaster();
  s[9] = new Tone.Player("./media/samples/p1s10.wav").toMaster();
  s[10] = new Tone.Player("./media/samples/p1s11.wav").toMaster();
  s[11] = new Tone.Player("./media/samples/p1s12.wav").toMaster();
  s[12] = new Tone.Player("./media/samples/p2s01.wav").toMaster();
  s[13] = new Tone.Player("./media/samples/p2s02.wav").toMaster();
  s[14] = new Tone.Player("./media/samples/p2s03.wav").toMaster();
  s[15] = new Tone.Player("./media/samples/p2s04.wav").toMaster();
  s[16] = new Tone.Player("./media/samples/p2s05.wav").toMaster();
  s[17] = new Tone.Player("./media/samples/p2s06.wav").toMaster();
  s[18] = new Tone.Player("./media/samples/p2s07.wav").toMaster();
  s[19] = new Tone.Player("./media/samples/p2s08.wav").toMaster();
  s[20] = new Tone.Player("./media/samples/p2s09.wav").toMaster();
  s[21] = new Tone.Player("./media/samples/p2s10.wav").toMaster();
  s[22] = new Tone.Player("./media/samples/p2s11.wav").toMaster();
  s[23] = new Tone.Player("./media/samples/p3s01.wav").toMaster();
  s[24] = new Tone.Player("./media/samples/p3s02.wav").toMaster();
  s[25] = new Tone.Player("./media/samples/p3s03.wav").toMaster();
  s[26] = new Tone.Player("./media/samples/p3s04.wav").toMaster();
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
      sel(i);
    }
  }
}

function sel(i) {
  switch (i) {

    case 0:
      s[0].start();
      break;
    case 1:
      s[1].start();
      break;
    case 2:
      s[2].start();
      break;
    case 3:
      s[3].start();
      break;
    case 4:
      s[4].start();
      break;
    case 5:
      s[5].start();
      break;
    case 6:
      s[6].start();
      break;
    case 7:
      s[7].start();
      break;
    case 8:
      s[8].start();
      break;
    case 9:
      s[9].start();
      break;
    case 10:
      s[10].start();
      break;
    case 11:
      s[11].start();
      break;
    case 12:
      s[12].start();
      break;
    case 13:
      s[13].start();
      break;
    case 14:
      s[14].start();
      break;
    case 15:
      s[15].start();
      break;
    case 16:
      s[16].start();
      break;
    case 17:
      s[17].start();
      break;
    case 18:
      s[18].start();
      break;
    case 19:
      s[19].start();
      break;
    case 20:
      s[20].start();
      break;
    case 21:
      s[21].start();
      break;
    case 22:
      s[22].start();
      break;
    case 23:
      s[23].start();
      break;
    case 24:
      s[24].start();
      break;
    case 25:
      s[25].start();
      break;
    case 26:
      s[26].start();
      break;
  }

}

function stopNappe() {
  s[23].stop();
  s[24].stop();
  s[25].stop();
  s[26].stop();
}
