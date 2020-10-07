
var monkey , monkey_running;
var ground, groundI,invisible;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0, score1 = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moves", monkey_running);
  monkey.scale = 0.1;
 
 

  ground = createSprite(400,350,900,10);
 
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  invisible = createSprite(400,358,900,10);
  invisible.visible = false;
}


function draw() {
  
  background(220);
  fill("red");
    stroke("black");
  text("Survival Time : " + score, 290,30);
  text("Score : " + score1, 200,30);
  
  if(gameState === PLAY){
    Sbanana();
  SpawnObstacles();
     score = score + Math.round(getFrameRate()/60);
    if(keyDown("space") && monkey.y >= 314){
    monkey.velocityY = -17;
  }
  monkey.velocityY = monkey.velocityY + 0.8 ;
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score1 = score1 + 2; 
    }
  
  if(monkey.isTouching(obstacleGroup)){
      gameState = END;
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      monkey.destroy();
  }
    
  }
  
  else if(gameState === END){
    fill("orange");
    stroke("black");
    textSize(20);
    text("Game Over", 150,200);
    
    
  }

  
  

   monkey.collide(ground);
  
 
  
  
  
  
  drawSprites();
}

function Sbanana(){
  if(frameCount%80 === 0){
    banana = createSprite(400,200,30,20);
    banana.velocityX = -4;
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 150;
    FoodGroup.add(banana);
  }
 
}

function SpawnObstacles(){
  if(frameCount%100 === 0){
    obstacle = createSprite(400,350,30,20);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
    obstacle.collide(invisible);
  }
 
}


