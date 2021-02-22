
var monkey , monkey_running,monkey_gameOver;
var banana ,bananaImage, obstacle, obstacleImage;

var score;



var ground;

var bananaGroup,bananaSound;








function preload(){
  monkey_gameOver=loadImage("sprite_0.png");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("obstacle.png");
   

}




function setup() {
  createCanvas(windowWidth, windowHeight);
banana=createSprite(width,height/2,10,10)


  monkey = createSprite(50,height-(height/3),20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addImage("gameOver",monkey_gameOver)
      monkey.setCollider("rectangle",0,0,450,560);
  ground = createSprite(0,height-20,width,10);
  ground.x = ground.width /2;

  


  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {

  background("lightblue");

monkey.scale=0.1;
  textSize(20);
  fill(255);

  drawSprites();
    text("Score: "+ score, width-100,40);


      ground.velocityX = -(6 + 3*score/100);
   //score = score + Math.round(getFrameRate()/60);
     if (monkey.isTouching(bananaGroup)){
    score=score+1;

       bananaGroup[0].destroy();
    
  }
    if(score >= 0){
      ground.velocityX = -6;
    }else{
      ground.velocityX = -(6 + 3*score/100);
    }

    if(touches.length>0||keyDown("space") && monkey.y >= ground.y-51) {
      monkey.velocityY = -12;
      touches=[];
    }

    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x <width/2){
      ground.x = (ground.width/2)-2;
    }
  
    monkey.collide(ground);
    
    spawnbanana();
    spawnObstacles();

  
   if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX=0;
    
    //set velcity of each game object to 0
    monkey.changeImage("gameOver",monkey_gameOver);
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
   


    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

     

    } 
  }

  




function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(width,120,40,10);
    banana.y = Math.round(random(height-(height/5),height-(height/4)));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = width/3;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
       
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
  obstacle=createSprite(width,ground.y-ground.height/2-19,10,10);   
    //generate random obstacles
 obstacle.addImage(obstacleImage)  
    obstacle.velocityX = -(6 + 3*score/100);
    
    //assign scale and lifetime to the obstacle           

    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacle.scale=0.1;
    obstacle.setCollider("circle",0,0,200);
        

    obstaclesGroup.add(obstacle);

  }
}



  





