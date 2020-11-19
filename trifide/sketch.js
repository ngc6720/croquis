document.addEventListener("contextmenu", e => {
e.preventDefault();
}, false);

document.addEventListener("keydown", e => {
  if (e.keyCode === 67) {
    if (keyIsDown(SHIFT)) {
    initialize();
    }
  }
});

let dsc = [];
let crs = [];
let toLoad = 6;
let overbg = true;
let deleting = false;
let dragging;
let s = [];
let fx1 = [];
let fx2 = [];
let colors = [
  {r:248,g:26,b:12,a:255},
  {r:240,g:200,b:50,a:255},
  {r:210,g:165,b:255,a:255},
  {r:160,g:190,b:255,a:255},
  {r:250,g:200,b:240,a:255},
  {r:248,g:154,b:12,a:255}
];

function setup() {
  createCanvas(800,800);
  let n = toLoad
  for (let i = 0; i < n; i++) {
    let id = i;
    id += 1;
    dsc.push(new Point(
      random(width/12,width-width/12),
      random(height/12,height-height/12),
      colors[i]
    ));
    fx1.push(new Tone.Chebyshev(20).toMaster());
    fx2.push(new Tone.Volume(20).connect(fx1[i]));
    s.push(new Tone.Player("./media/p3s"+id+".wav",() => console.log(`Loading sounds... ${toLoad -= 1} left`)
      ).connect(fx2[i]));
  }
  for (let a of s) {a.loop = true; a.fadeIn = 0.2; a.fadeOut = 0.2;}
}

function draw() {
  background(0,17,35);
  for (let a of dsc) {  
    a.isHovered();
    a.display();
  }
  for (let b of crs) {
    b.isHovered();
    b.display();
  }
  //mouse either over background or over some obj
  overbg = (dsc.some((elt) => elt.isHovered()) || crs.some((elt) => elt.isHovered())) ? false : true;
}

function mousePressed() {
  if (toLoad === 0) {
    if (mouseButton === RIGHT) {
      if (overbg) {
        crs.push(new Curse(mouseX, mouseY));
      } else {
        deleting = true;
        for (let i = crs.length-1; i >= 0; i--) {
          if (crs[i].isHovered()) {
            crs.splice(i,1);
          }
        }
      }
      for (let a of dsc) {
        a.distance();
      }
    }
    if (mouseButton == LEFT) {
      //console.log("curse: "+ crs.length);
      if (!overbg) {
        for (let a of dsc) {
          a.lock();
        }
        for (let b of crs) {
          b.lock();
        }
      }
    }
  }
}

function mouseDragged() {
  if (mouseButton === LEFT) {
    if (!overbg) {
      dragging = true;
      for (let a of dsc) {
        a.drag();
      }
      for (let b of crs) {
        b.drag();
      }
    }
  }
  if (mouseButton === RIGHT) {
    if (deleting) {
      for (let i = crs.length-1; i >= 0; i--) {
        if (crs[i].isHovered()) {
          crs.splice(i,1);
        }
      }
    }
  }
  for (let a of dsc) {
    a.distance();
  }
  playPause();
      mapAmp()
      mapFx()
}

function mouseReleased() {
  for (let a of dsc) {
    a.isLocked = false;
  }
  for (let b of crs) {
    b.isLocked = false;
  }
  deleting = false;
  dragging = false;
  playPause();
  mapAmp()
  mapFx()
}

function playPause() {
  for (let i = dsc.length-1; i >= 0; i--) {
    dsc[i].prepare();
    if (dsc[i].isActive() && dsc[i].isReady) {
      s[i].start();
      dsc[i].isReady = false;
    }
    if (s[i].state === "started" && !dsc[i].isActive()) {
      s[i].stop();
    }
  }
}

function mapAmp() {
  for (let i = dsc.length-1; i >= 0; i--) {
    s[i].volume.value = dsc[i].vol;
  }
}

function mapFx() {
  for (let i = dsc.length-1; i >= 0; i--) {
    fx1[i].wet.value = dsc[i].curses / 80;
    fx2[i].volume.value = dsc[i].curses / 2;
    //fx[i].wet.value = 1;
  }
}

function initialize() {
  crs.splice(0,crs.length);
  let center = createVector(width/2,height/2);
  let vec = createVector(width/5,height/5);
  for (let i = 0; i < dsc.length; i++) {
    dsc[i].pos.set(p5.Vector.add(center, vec));
    vec.rotate(PI*2/dsc.length);
  }
  console.log("Initialized");
}
