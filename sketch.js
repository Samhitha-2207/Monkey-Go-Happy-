var monkey,obstacle,banana;
var ground;
var monkey_running,backImage,obstacleImage,bananaImage;
var ObstacleGroup,BananaGroup;
var score,survivalTime;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  backImage = loadImage("jungle.jpg");
  obstacleImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
}

function setup() {
  createCanvas(400, 400);
  
  ground = createSprite(0,0,400,400);
  ground.addImage("jungle",backImage);
  ground.scale = 2;
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  monkey = createSprite(50,330,10,10);
  monkey.addAnimation("Monkey",monkey_running);
  monkey.scale = 0.15;
  
  invisibleGround = createSprite(50,380,800,10);
  invisibleGround.visible = false;
  
  ObstacleGroup = createGroup();
  BananaGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
  
}

function draw() {
  background("white");
  drawSprites();
  
  if(gameState === PLAY) {
    
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate());
    text("Survival time = "+survivalTime, 220,50);
    text("Score = "+score, 220,100);
    
    if(keyDown("space")){
      monkey.velocityY = -15 ;
    }
    
    if(ground.x<0) {
      ground.x = ground.width/2;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(BananaGroup.isTouching(monkey)) {
      score = score+1;
      BananaGroup.destroyEach();
      monkey.scale = 0.2;
    }
      
    if(ObstacleGroup.isTouching(monkey)){
      gameState = END;
    }  
    
  } else if(gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    ObstacleGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    
    ObstacleGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    
    monkey.scale = 0.15;
    
    stroke("black");
    textSize(20);
    text("GAMEOVER!",200,200);
  }
  
  spawnObstacle();
  spawnBanana();
  
  monkey.collide(invisibleGround);
  invisibleGround.visible = false;
}

function spawnObstacle() {
  if(frameCount%300 === 0) {
    obstacle = createSprite(150,350,10,10);
    obstacle.addImage("stone",obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -2;
    
    obstacle.lifetime = 300;
    
    ObstacleGroup.add(obstacle);
  }
}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(170,230,40,10);
    //banana.y = randomNumber(120,200);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -2;
    
    banana.lifetime = 134;
    
    BananaGroup.add(banana);
  }
}