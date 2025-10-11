function setup() {
  let canvas=createCanvas(600, 600);
  canvas.parent("graficoCanvas2");
}

function draw() {
  background(255);
  
  //sfondo 1
  strokeWeight(0)
  fill(186, 215, 242)
  rect(0,0,600,450)

  fill(106, 153, 78)
  rect(0,225,600,225)
  //titolo
  textSize(20)
  fill(0)
  text("Media della colonna 0",5,20)
  //linea media
  strokeWeight(2)
  line(0,205-10,600,205-10)
  //montagne
  strokeWeight(0)
  fill(127, 79, 36)
  triangle(0+30,225,60+30,225,30+30,190-70)
  
  fill(166, 138, 100)
  triangle(60+30,225,120+30,225,90+30,210-30)
  
  fill(147, 102, 57)
  triangle(120+30,225,180+30,225,150+30,205-40)
  
  fill(88, 47, 14)
  triangle(180+30,225,240+30,225,210+30,170-110)

  fill(88, 47, 14)
  triangle(240+30,225,300+30,225,270+30,170-110)

  fill(24, 78, 119)
  triangle(300+30,225,360+30,225,330+30,285+120)

  fill(88, 47, 14)
  triangle(420+30,225,360+30,225,390+30,170-110)

  fill(24, 78, 119)
  triangle(420+30,225,480+30,225,450+30,285+120)

  fill(22, 138, 173)
  triangle(480+30,225,540+30,225,510+30,250+50)
  //metro lato
  fill(0)
  textSize(15)
  text("0",1,224)

  text("10",1,193)

  text("20",1,163)

  text("30",1,133)

  text("40",1,103)

  text("50",1,73)

  text("-10",1,254)
  
  text("-20",1,284)

  text("-30",1,314)

  text("-40",1,344)

  text("-50",1,374)

  text("-60",1,404)

}
