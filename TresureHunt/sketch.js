var PLAY = 1;
var END = 0;
var gameState = 1;

var path,boy,cash,diamonds,jwellery,sword;

var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;

var treasureCollection = 0;

var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
  
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 8;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
    
  
  
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

  if (cashG.isTouching(boy)){
     treasureCollection= treasureCollection+50;
  }
  
  if (diamondsG.isTouching(boy)) {
    treasureCollection= treasureCollection+150;
  }
  
  if(jwelleryG.isTouching(boy)) {
    treasureCollection= treasureCollection+100;
  }
  
  if(swordGroup.isTouching(boy)){
    gameState=END;
    boy.addAnimation("SahilRunning",endImg);
        boy.scale=0.5;
    }
  }
  
  if (gameState === END) {
    
    boy.addAnimation("SahilRunning",endImg);
     boy.X=200;
    boy.Y=200;
    
    cashG.destroyEach();
    cashG.velocityY=0;
    
    jwelleryG.destroyEach();
    jwelleryG.velocityY=0;
    
    diamondsG.destroyEach();
    diamondsG.velocityY=0;
    
    swordGroup.destroyEach();
    swordGroup.velocityY=0;
  
    path.velocityY=0;
  }
  
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
    }
      
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 8;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 8;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 8;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 8;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}