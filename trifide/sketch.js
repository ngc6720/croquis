document.addEventListener("contextmenu", function(e){
e.preventDefault();
}, false);

let pts = [];
let crs = [];
let overbg = true;
let deleting = false;
let dragging;
let s = [];
let fx1 = [];
let fx2 = [];

function setup() {
  createCanvas(800,800);
  for (let i = 0; i < 6; i++) {
    let id = i + 1;
    fx1.push(new Tone.Chebyshev(20).toMaster());
    fx2.push(new Tone.Volume(20).connect(fx1[i]));
    s.push(new Tone.Player("./media/p3s"+id+".wav").connect(fx2[i]));
  }
  for (let a of s) {a.loop = true; a.fadeIn = 0.2; a.fadeOut = 0.2;}
  for (let i = 0; i < 6; i++) {
    pts.push(new Point(random(width/12, width - width/12), random(height/12, height - height/12)));
  }
}

function draw() {
  background(250);
  //mouse either over background or over some obj
  if (pts.some((elt) => elt.hovered === true) || crs.some((elt) => elt.hovered === true)) {
    overbg = false;
  } else {
      overbg = true;
  }

  for (let a of pts) {
    a.activee();
    a.readiness();
    a.distance();
    a.hover();
    a.display();
  }

  for (let b of crs) {
    b.hover();
    b.display();
  }
  fxAmount();
  volumee();
  playy();
}

function mousePressed() {
  if (mouseButton === RIGHT) {
    if (overbg) {
      crs.push(new Curse(mouseX, mouseY));
    } else {
      deleting = true;
      for (let i = crs.length-1; i >= 0; i--) {
        if (crs[i].hovered) {
          crs.splice(i,1);
        }
      }
    }
  }
  if (mouseButton == LEFT) {
    //console.log("curse: "+ crs.length);
    if (!overbg) {
      for (let a of pts) {
        a.lock();
      }
      for (let b of crs) {
        b.lock();
      }
    }
  }
}

function mouseDragged() {
  if (mouseButton === LEFT) {
    if (!overbg) {
      dragging = true;
      for (let a of pts) {
        a.drag();
      }
      for (let b of crs) {
        b.drag();
      }
    }
  }
  if (mouseButton === RIGHT) {
    //console.log(pts[1].active);
    if (deleting) {
      for (let i = crs.length-1; i >= 0; i--) {
        if (crs[i].hovered) {
          crs.splice(i,1);
        }
      }
    }
  }
}

function mouseReleased() {
  for (let a of pts) {
    a.locked = false;
  }
  for (let b of crs) {
    b.locked = false;
  }
  deleting = false;
  dragging = false;
}

function playy() {
  for (let i = pts.length-1; i >= 0; i--) {
    if (pts[i].active && pts[i].redy) {
      s[i].start();
      pts[i].redy = false;
    }
    if (s[i].state === "started" && !pts[i].active) {
      s[i].stop();
    }
  }
}

function volumee() {
  for (let i = pts.length-1; i >= 0; i--) {
    s[i].volume.value = pts[i].vol;
  }
}

function fxAmount() {
  for (let i = pts.length-1; i >= 0; i--) {
    fx1[i].wet.value = pts[i].curses / 80;
    fx2[i].volume.value = pts[i].curses / 2;
    //fx[i].wet.value = 1;
  }
}
