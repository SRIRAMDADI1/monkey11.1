var score = 0

function setup() {
  createCanvas(800,400);
  bg = createSprite(400,200,0,0)
  bg.addImage(bgImg)
  bg.velocityX = -3;
  bg.scale = 3

  monkey = createSprite(150,400,50,50)
  monkey.addAnimation("monkey", monkeyanimation)
  monkey.scale = 0.16

  bananaImage = loadImage("banana-removebg-preview.png")

  obstacle_img = loadImage("stone-removebg-preview.png")

  invisground = createSprite(400,400,800,10)
  invisground.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
}

function preload(){
  bgImg = loadImage("jung.jpg")
  monkeyanimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
}


function draw() {
  background(255,255,255);  
  if(bg.x<150){
    bg.x = 400
  }

  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score + 2;
  }

  monkey.collide(invisground)

  camera.position.y = monkey.y

  if(keyDown("space")){
    monkey.velocityY = -10
  }
  monkey.velocityY = monkey.velocityY +0.8

  spawnFood()
  spawnObstacles()

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 550,200);
}





function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(200,350);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    banana.scale = 0.2
    FoodGroup.add(banana);
  }
}


function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,390,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);  
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}