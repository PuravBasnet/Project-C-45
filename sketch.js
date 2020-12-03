var START=0;
var PLAY=1;
var END=2;
var gameState=START;
 
var dog;
var score=0;
var gameOver,restart;

function preload(){
  dogStanding=loadAnimation("Images/dogimg1.png");
  dogRunning=loadAnimation("Images/dogimg1.png","Images/dogimgrun2.jpg","Images/dogimgrun3.jpg","Images/dogimg4.png","Images/dogimgrun5.png","Images/dogimgrun6.jpg","Images/dogimg7.png","Images/dogimg8.png","Images/dogimgrun9.png");
  startImg=loadImage("Images/start.png");
  groundimg=loadImage("Images/ground2.png");
  gameOverImg=loadImage("Images/gameOver.png");
  restartImg=loadImage("Images/restart.png");
  logImg=loadImage("Images/logimg.png");
  bushImg=loadImage("Images/bush.png");
  backgrImg=loadImage("Images/background.jpg");
  restartImg=loadImage("Images/restart.png");
  gameOverImg=loadImage("Images/gameOver.png");

  //jumpSound=loadSound("jump.mp3");
  //dieSound=loadSound("die.mp3");
  //checkPointSound=loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(displayWidth, displayHeight);

 // backGr=createSprite(20,0,displayWidth,displayHeight);
  //backGr.addImage(backgrImg);

   dog= createSprite (displayWidth/10-50,displayHeight-30);
   dog.scale=0.5;
   dog.addAnimation("standing",dogStanding);
   dog.addAnimation("running",dogRunning);

  start=createSprite(displayWidth/2,displayHeight/2);
  start.addImage(startImg);
  
  gameOver=createSprite(displayWidth/2,displayHeight/2);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;

  ground=createSprite(displayWidth/4,displayHeight-10,displayWidth,5);
  ground.addImage(groundimg);
  ground.x=ground.width/2;
  
  restart=createSprite(displayWidth/2,displayHeight/2+50);
  restart.addImage(restartImg);
  restart.scale=0.5;
  restart.visible=false;
  
  logsGroup = new Group();

  bushesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(backgrImg);

  if (gameState===0){
    initialScreen();
    if (keyDown("s")){
      gameState=1;
      start.visible=false;
    }
  }
  
   else if(gameState===1){
     dog.changeAnimation("running",dogRunning);
     ground.velocityX=-4;
     //resetting the ground.
     if (ground.x<500){
       ground.x=ground.width/2;
     }
     //Make the dog jump.
     if(keyDown("J") && dog.y>823) {
      dog.velocityY=-10;
     }
     dog.velocityY=dog.velocityY+0.5;
     //Calling the function
     spawnLogs();
     spawnBushes();
     //If the dog's touching the obstacle.
     if(logsGroup.isTouching(dog) || bushesGroup.isTouching(dog)) {
        gameState = 2;
     }
   }

   else if (gameState===2){
    dog.changeAnimation("standing",dogStanding);
    ground.velocityX=0;
    logsGroup.setVelocityXEach(0);
    logsGroup.setLifetimeEach(-1);
    bushesGroup.setVelocityXEach(0);
    bushesGroup.setLifetimeEach(-1);

    gameOver.visible=true;
    restart.visible=true;
    if(mousePressedOver(restart)) {
     reset();
    }
   }
   dog.collide(ground);
  /*text("Score: "+ score, 500,50);
  if (gameState===PLAY){    
  
  score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space") && trex.y>=159)  {
    trex.velocityY = -14;
    jumpSound.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
    if(score>0 && score%100===0){
     checkPointSound.play();
    }
    if (obstaclesGroup.isTouching(trex)){
     dieSound.play();
    gameState=END;
    trex.changeAnimation("collided",trex_collided);
    }
  }
  else if (gameState===END){
    gameOver.visible = true; 
    restart.visible = true;
    //set velcity of each game object to 0 
    ground.velocityX = 0;
    trex.velocityY = 0; 
    obstaclesGroup.setVelocityXEach(0); cloudsGroup.setVelocityXEach(0);
    //change the trex animation trex.changeAnimation("collided",trex_collided);
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1); cloudsGroup.setLifetimeEach(-1); 
    if(mousePressedOver(restart)) { reset(); }

  }*/
  drawSprites();
}

  function initialScreen(){
    stroke(50);
    fill("red");
    textSize(20);
    text("Instructions for the game:",displayWidth/2-100,displayHeight/2+80);
  
    stroke(5);
    fill("black");
    textSize(15);
    text("Press S to start the game.",displayWidth/2-100,displayHeight/2+100);
    text("Hitting the obstacle will end the game.",displayWidth/2-100,displayHeight/2+120);
    text("Press J to jump.",displayWidth/2-100,displayHeight/2+140);
  }

/*function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}*/

function spawnLogs() {
  if(frameCount % 300 === 0) {
    var log = createSprite(displayWidth,displayHeight-30,displayWidth,2);
    log.velocityX = -4;
    log.addImage(logImg);
    //assign scale and lifetime to the obstacle           
    log.scale = 0.15;
    log.lifetime = Math.round(displayWidth/4);
    //add each obstacle to the group
    logsGroup.add(log);
  }
}

function spawnBushes() {
  if(frameCount % 90 === 0) {
    var bush = createSprite(displayWidth,displayHeight-30,displayWidth,2);
    bush.velocityX = -4;
    bush.addImage(bushImg);
    //assign scale and lifetime to the obstacle           
    bush.scale = 0.15;
    bush.lifetime = Math.round(displayWidth/4);
    //add each obstacle to the group
    bushesGroup.add(bush);
  }
}

function reset(){ 
  gameState = PLAY;
  gameOver.visible = false; 
  restart.visible = false;
  logsGroup.destroyEach();
  bushesGroup.destroyEach();
  dog.changeAnimation("running",dogRunning); 
}