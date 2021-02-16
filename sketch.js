var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlock, invisibleBlock_Group;
var sound;

var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png"); 
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlock_Group = new Group();
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 4;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.5;
}

function draw(){
  background(0);
  
  if(gameState === "play"){
  if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY+0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
    climber.velocityY = 0;
  }
  
  
  if(invisibleBlock_Group.isTouching(ghost) || ghost.y > 600){
     ghost.destroy();
     gameState = "end";
  }
  
  sound.loop();
    
  spawnDoors();
    
  drawSprites();
  }
  
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAMEOVER",230,250);
  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
  var door = createSprite(200,-50);
  door.addImage(doorImg);
  
  var climber = createSprite(200,10);  
  climber.addImage(climberImg);
  
  var invisibleBlock = createSprite(200,15);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 1;  
    
  door.x = Math.round(random(120,400));
  door.velocityY = 1;
  
  climber.x = door.x
  climber.velocityY = 1;
    
  invisibleBlock.x = door.x;
  invisibleBlock.velocityY = 1;
  invisibleBlock.visible = false;
  
  //give lifetime to door and climber
  door.lifetime = 800;
  climber.lifetime = 800;
  invisibleBlock.lifetime = 800;
  
  //add each door to the group
  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlock_Group.add(invisibleBlock)
    
  //makes the depth equal
  ghost.depth = door.depth;
  //increase the depth by 1
  ghost.depth +=1;
  }
}