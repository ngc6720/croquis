document.addEventListener("contextmenu", function(e){
e.preventDefault();
}, false);

let sqs = [];
let sel = [];
let ready = false
let overbg = true;
let selecting = false;
let deleting = false;

function setup() {
  createCanvas(800,800);

  for (let i = 0; i < 80; i++) {
    sqs.push(new Square(random(width/4, width - width/4), random(height/5, height - height/5)));
  }
}

function draw() {
  background(250);
  for (let a of sqs) {
    if (selecting) {
      a.hovie(sel[0]);
    } else {
      a.hover();
    }
    a.display();
  }

  for (let b of sel) {
    b.display();
  }

  //mouse either over background or over some square
  if (sqs.some((elt) => elt.hovered === true)) {
    overbg = false;
  } else {
      overbg = true;
  }
}

function mousePressed() {
  if (mouseButton === RIGHT) {
    if (overbg) {
      sqs.push(new Square(mouseX, mouseY));
    } else {
      for (let i = sqs.length-1; i >= 0; i--) {
        if (sqs[i].hovered) {
          sqs.splice(i,1);
        }
      }
      deleting = true;
    }
  }
  if (mouseButton == LEFT) {
    if (overbg) {
      sel[0] = new Selection(mouseX,mouseY);
      sel[0].allow();
      selecting = true;
    } else {
      for (let a of sqs) {
        a.lock();
      }
    }
  }
}

function mouseDragged() {
  if (mouseButton === LEFT) {
    if (overbg) {
      sel[0].generate();

    } else {
      for (let a of sqs) {
        a.drag();
      }
    }
  }
  if (mouseButton === RIGHT) {
    if (deleting) {
      for (let i = sqs.length-1; i >= 0; i--) {
        if (sqs[i].hovered) {
          sqs.splice(i,1);
        }
      }
    }
  }
}

function mouseReleased() {
  sel.splice(0,1);
  selecting = false;
  deleting = false;
}
