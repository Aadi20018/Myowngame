var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_animation;
var chicken, chicken_animation, chickensGroup;
var bomb, bombsGroup, bombImg;

var floor, floorImg

var score;


function preload(){

player_animation = loadAnimation("Runner-1.png", "Runner-2.png");

bombImg = loadImage("bomb.png")
chicken_animation = loadImage("ChickenAnimation.gif");
floorImg = loadImage("Floor.jpg");

dieSound = loadSound("die.mp3")
}
function setup() {
    
 createCanvas(650.4, 558);

   
    
    floor = createSprite(405.5, 279);
    floor.addImage(floorImg);
    floor.scale = 3;
    
    player = createSprite(60, 229, 20, 50);
    player.addAnimation("running", player_animation);
    player.scale = 0.1;
    player.rotation = 90;

    bombsGroup = new Group();
 
    chickensGroup = new Group();

    score = 0;
}
function draw() {
    background("grey");
 
    textSize(30);

    
    text("Score: "+ score, 60,100);

    if (gamestate = PLAY) {
        floor.velocityX = -6;
        if (floor.x < 242.9){
            floor.x = 405.5;
            floor.velocityX = -4;
          }
    
    
        if (keyDown("up")){
            player.y += -3;
        }
    
        if (keyDown("down")){
            player.y += 3;
        }
        
        if (keyDown("left")){
            player.y += -3;
        }
    
        if (keyDown("right")){
            player.y += 3;
        }
    
     spawn_chickens();
     
     spawn_bombs();
    
     if (chickensGroup.isTouching(player)){
        score = score + 3;
        chickensGroup.destroyEach();
     }

     if(bombsGroup.isTouching(player)){
        gamestate = END;
        dieSound.play();
        player.velocityY = 0;
        floor.velocityX = 0;
        chicken.velocityX = 0;
        bomb.velocityX = 0;

     }
    }
    else if(gamestate = END){
        
    }
    

    

 player.debug = true;


drawSprites();
}
function spawn_chickens() {
    if (frameCount % 180 == 0) {
        var chicken = createSprite(690, 200, 10, 10);
        chicken.y = Math.round(random(50, 500));
        chicken.addImage(chicken_animation);
        chicken.scale=0.25;
        chicken.velocityX = floor.velocityX;
        chicken.lifetime = 200;
        chickensGroup.add(chicken);
        }
}
function spawn_bombs() {
    if (frameCount % 200 == 0) {
        var bomb = createSprite(690, 200, 10, 10);
        bomb.y = Math.round(random(50, 500));
        bomb.addImage(bombImg);
        bomb.scale=0.15;
        bomb.velocityX = floor.velocityX;
        bomb.lifetime = 200;
        bombsGroup.add(bomb);
        }
}