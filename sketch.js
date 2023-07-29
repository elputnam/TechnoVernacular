//a meditation on repair and averting gazes; shuffling grid with help from Daniel Shiffman - Image: https://editor.p5js.org/codingtrain/sketches/o_ljlLilZ

let base;
let source;
let repair1;
let repair2;
let repair3;
let postcard;
let EL;
let dad;
let lads1;
let lads2;
let colour = 300;
let alp1 = 0;
let alp2 = 100;

// Tiles configuration
let tiles = [];
let cols = 5;
let rows = 5;
let w, h;
let x1  = 0;
let y1 = 0;

// Order of tiles
let board = [];


function preload(){
  base = loadImage('assets/ELDad_TechnoVernacular_base.png');
  source = loadImage('assets/ELDad_TechnoVernacular_repair.png');
  repair1 = loadImage('assets/ELDad_TechnoVernacular_repair1.png');
  repair2 = loadImage('assets/ELDad_TechnoVernacular_repair2.png');
  repair3 = loadImage('assets/ELDad_TechnoVernacular_repair3.png');
  EL = loadImage('assets/ELDad_TechnoVernacular_EL.png');
  dad = loadImage('assets/ELDad_TechnoVernacular_dad.png');
  postcard = loadImage('assets/ELDad_TechnoVernacular_postcard.png')
}
function setup() {
  createCanvas(base.width/2, base.height/2);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(4);
  // pixel dimensions of each tiles
  w = width / cols;
  h = height / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let img = createImage(w, h);
      img.copy(source, x, y, w, h, 0, 0, w, h);
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, img);
      tiles.push(tile);
    }
  }
}

function draw() {
  background(0);
  
  //base
  push();
  //tint(255, random(70, 100));
  image(base, 0, 0, width, height);
  pop();


  for (let i = 0; i < (cols * rows); i++){
    strokeWeight(random(1,5));
    stroke(0);
    fill(colour-90, 100, 100);
    rect(random(width), random(height), w, h);
  }

  //repair layers
  // blend(repair1, 0, 0, repair1.width, repair1.height, 0, 0, width, height, DARKEST);
  // blend(repair2, 0, 0, repair2.width, repair2.height, 0, 0, width, height, LIGHTEST);
  // blend(repair3, 0, 0, repair3.width, repair3.height, 0, 0, width, height, DARKEST);
  blend(source, 0, 0, source.width, source.height, 0, 0, width, height, DARKEST)

  //repair shuffle
  push();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = int(random(16));
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      if (tileIndex > -1) {
        tint(colour-90, random(100), 100, alp1);
        let img = tiles[tileIndex].img;
        image(img, x, y, w, h);
      }
    }
  }
  pop();
  
  //grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      stroke(0, alp1);
      strokeWeight(random(1,3));
      noFill();
      rect(x, y, w, h);
      }
    }

  //EL
  push();
  tint(colour, random(50), alp2);
  EL.filter(GRAY);
  scale(random(0.9, 1.05));
  image(EL, random(-30,70), 0, width, height);
  pop();

  //dad
  push();
  tint(colour-180, random(100), alp2);
  dad.filter(GRAY);
  image(dad, random(-200, -100), random(-10), width, height);
  pop();

  //postcard
  push();
  tint(255, alp1);
  // postcard.filter(INVERT);
  image(postcard, random(100), 0, width, height);
  pop();

  if (frameCount%int(random(30))==0){
    colour = random(180, 360);
    dad.filter(INVERT);
    EL.filter(INVERT);
    if (alp1 <= 0){
      alp1 = 100;
      alp2 = 50;
  } else {
    alp1 = 0;
    alp2 = 100;
    }
  }
}

class Tile {
  constructor(i, img) {
    this.index = i;
    this.img = img;    
  }
}
