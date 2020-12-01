var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var life;



function preload() {
  //loading images 
  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png  ", "monkey_7.png", "monkey_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(600, 600);

  //creating monkey Sprites
  monkey = createSprite(50, 440);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;

  //creating groud sprites
  ground = createSprite(300, 530, 600, 10);
  //creating groupes
  foodGroup = createGroup();
  obstacleGroup = createGroup();

  //score 
  score = 0;
  life = 0;


}







function draw() {
  background("lightblue");
  text("Score:" + score, 200, 40);
  text("SURVIVAL TIME:" + life, 400, 40)

  //condition if your gamestate is PLAY
  if (gameState === PLAY) {

    //make our monkey jump
    if (keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -13;
    }

    life = life + Math.round(getFrameRate() / 60);
    //increasing ground velocity
    ground.velocitX = -(4 + 3 * life / 100);



    //monkey gravite
    monkey.velocityY = monkey.velocityY + 1

    //scorlling ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //condition if banana is touching monkey
    if (foodGroup.isTouching(monkey)) {
      score = score + 1;
      foodGroup.destroyEach();
    }

    //condition if stone is touching monkey
    if (obstacleGroup.isTouching(monkey)) {

      gameState = END;
    }
  }

  //condition if your gamestate is END
  if (gameState === END) {

    monkey.y = 460;

    //setting velocity0
    obstacleGroup.setVelocityXEach(0);
    //destroing it  
    obstacleGroup.destroyEach();

    //setting velocity0
    foodGroup.setVelocityXEach(0);
    //destroing it  
    foodGroup.destroyEach();

    // setting lifetime
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);

    //destroying ground
    ground.destroy();

    //destroying monkey
    monkey.destroy();

    textSize(30);
    fill("black");
    text("GAME OVER!!", 200, 300);




  }
  spawnObstacles();
  spawnFood();
  drawSprites();

  monkey.collide(ground);

}

function spawnFood() {
  if (frameCount % 80 === 0) {
    //creating banana sprites
    banana = createSprite(600, 200, 20, 20);

    //adding image
    banana.addImage(bananaImage);

    //scaling 
    banana.scale = 0.1;

    //to make it come in random position 
    banana.y = random(150, 350);

    //velocityX
    banana.velocityX = -10;

    //setting lifetime
    banana.lifetime = 300;

    //adding group 
    foodGroup.add(banana);

  }
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    //creating obstacle sprites
    obstacle = createSprite(800, 470, 10, 40);

    //increasing velocity
    obstacle.velocityX = -(9 + life / 50);

    //adding image
    obstacle.addImage(obstacleImage);

    //scaling 
    obstacle.scale = 0.30;

    //setting lifetime
    obstacle.lifetime = 300;

    obstacle.setCollider("circle", 0, 0, 200);

    // obstacle.debug=true;
    //adding group 
    obstacleGroup.add(obstacle);

  }
}