let sketch4 = function(p) {
  let box = { x: 400, y: 300, w: 500, h: 350 };
  let objects = [];
  let handY = -200;
  let phase = 0; // 0=idle, 1=hand enters, 2=picks, 3=lifts
  let picked = false;
  let liftY = 0;
  let frameStart = 0;

  p.setup = function() {
    let canvas = p.createCanvas(800, 600);
    canvas.parent("graficoCanvas3");
    p.noStroke();
    p.rectMode(p.CENTER);
    p.ellipseMode(p.CENTER);
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont("Georgia");

    initObjects();
    frameStart = p.frameCount;
  };

  function initObjects() {
    objects = [];
    for (let i = 0; i < 9; i++) {
      let row = Math.floor(i / 3);
      let col = i % 3;
      objects.push({
        x: box.x - 150 + col * 150,
        y: box.y - 80 + row * 80,
        color: i === 2 || i === 7 ? p.color(240, 100, 100) : p.color(p.random(120, 255), p.random(150, 255), p.random(120, 255)),
        picked: false
      });
    }
    handY = -200;
    phase = 0;
    picked = false;
    liftY = 0;
  }

  p.draw = function() {
    p.background(240, 235, 225);
    drawBox();
    drawObjects();

    if (phase === 0 && p.frameCount - frameStart > 30) phase = 1;
    if (phase === 1) moveHandIn();
    if (phase === 2) pickObjects();
    if (phase === 3) liftObjects();

    //  Reset automatico dopo 500 frame
    if (p.frameCount - frameStart > 250) {
      initObjects();
      frameStart = p.frameCount;
    }
  };
// scatola
  function drawBox() {
    p.fill(160, 140, 110, 80);
    p.rect(box.x + 10, box.y + 10, box.w, box.h, 20);
    p.fill(200, 160, 100);
    p.rect(box.x, box.y, box.w, box.h, 20);
    p.fill(170, 130, 80);
    p.rect(box.x, box.y, box.w - 20, box.h - 20, 15);
    p.fill(235, 210, 160);
    p.rect(box.x, box.y, box.w - 40, box.h - 40, 10);
  }
//sferette nella scatola
  function drawObjects() {
    for (let obj of objects) {
      if (!obj.picked) {
        p.fill(obj.color);
        p.circle(obj.x, obj.y, 45);
        p.fill(255, 255, 255, 40);
        p.circle(obj.x - 8, obj.y - 8, 20);
      }
    }
  }

  function moveHandIn() {
  // passaggio immediato alla presa
  phase = 2;
}


  function pickObjects() {
    
    let targets = objects.filter(o => p.red(o.color) === 240 && p.green(o.color) === 100);
    if (!picked) {
      targets.forEach(t => (t.picked = true));
      picked = true;
    }
    phase = 3;
  }

  function liftObjects() {
    
    let targets = objects.filter(o => o.picked);
    liftY = p.lerp(liftY, -150, 0.05);

    for (let t of targets) {
      p.push();
      p.fill(240, 100, 100);
      p.circle(t.x, t.y + liftY, 45);
      p.fill(255, 255, 255, 40);
      p.circle(t.x - 8, t.y + liftY - 8, 20);
      p.pop();
    }

    if (p.frameCount - frameStart > 100) {
      p.fill(80);
      p.textSize(24);
      p.text("Moda trovata!", box.x, box.y + box.h / 2 + 60);
    }
  }



};

new p5(sketch4);
