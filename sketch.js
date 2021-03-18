
var gameState = 0;

var doraemon,doraemon_running,doraemon_fallen;
var back,backImg,invisibleGround;
var doraCake,doraCakeImg,car,carImg;
var cakeGroup,carGroup;
var gameOver,gameOverImg;
var restart,restartImg;
var jump,gameOver,coin;
var shooterImg,bulletImg,ufoImg,background2Img;
var bulletGroup,ufoGroup;
var shoot,up,right,left;
var b;
var count=0;
var note,noteImg;


var score;

function preload(){

doraemon_running = loadAnimation("Doraemon 1.png","Doraemon 2.png","Doraemon 3.png","Doraemon 4.png","Doraemon 5.png","Doraemon 6.png");
doraemon_fallen = loadAnimation("doraemon_fallen.png");

backImg = loadImage("background2.png");
  
doraCakeImg = loadImage("doracake.png");
carImg = loadImage("police_car.png"); 
  
  gameOverImg = loadImage("gameover3.png");
  restartImg = loadImage("restart.png");

  shooterImg=loadAnimation("shooter.png");
  ufoImg=loadImage("ufo.png");
  background2Img=loadImage("bg2.jpg");
  bulletImg=loadImage("bullet.png");
  noteImg=loadImage("Note.png");

  jump=loadSound("jump.wav");
  coin=loadSound("coin.wav");
  gameOver=loadSound("gameover.wav");

}
function setup() {
  createCanvas(1000,600);
  if(gameState===1){
    createCanvas(1200,600);
  }
  
  
  back=createSprite(500,300,1000,600);
  back.addImage(background2Img);
  back.addImage(backImg);
  back.scale=1.5;
  back.velocityX=-8;

  shoot=createButton("Shoot");
  shoot.position(735,510);
  shoot.mousePressed(()=>{
    bullets();
  });
  
  doraemon=createSprite(80,460,20,20);
  doraemon.addAnimation("running",doraemon_running);
  doraemon.addAnimation("fallen",doraemon_fallen);
  doraemon.addAnimation("shooter",shooterImg);

  up=createButton(" Up ");
  up.position(745,460);
  up.mousePressed(()=>{
    doraemon.y=doraemon.y-20;
  });




  right=createButton(" Right ");
  right.position(800,510);
  right.mousePressed(()=>{
    doraemon.x=doraemon.x+10;
  });


 left=createButton(" Left ");
 left.position(680,510);
 left.mousePressed(()=>{
  doraemon.x=doraemon.x-10;
});


 down=createButton(" Down ");
 down.position(735,560);
 down.mousePressed(()=>{
  doraemon.y=doraemon.y+20;
});

    up.hide();
    right.hide();
    left.hide();
    down.hide();
    shoot.hide();

  //doraemon.debug=true;
  doraemon.setCollider("rectangle",0,0,50,80)

  invisibleGround=createSprite(300,550,1200,10);
  invisibleGround.shapeColor="red";
  //invisibleGround.visible=false;

  b=createSprite(-100,300,10,600);

  note=createSprite(450,80);
  note.scale=0.5;
  note.addImage(noteImg);
  note.visible=false;


  cakeGroup=new Group();
  carGroup=new Group();
  bulletGroup= new Group();
  ufoGroup= new Group();

  restart=createSprite(520,450,30,10);
  restart.addImage(restartImg);

  gameOver=createSprite(520,250,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;

  score = 0;
}

function draw() {
  
 // console.log("X",mouseX);
 // console.log("Y",mouseY);

   background("blue");

   if(gameState===0){

    gameOver.visible=false;
    restart.visible=false;

    

    if(back.x<3){
      back.x=back.width/2;
    }

    if(keyDown("space")&&doraemon.y>450){
      doraemon.velocityY=-15
      jump.play();
    }

    doraemon.velocityY=doraemon.velocityY+0.5;

    
    if(cakeGroup.isTouching(doraemon)){
      score=score+2;
      cakeGroup.destroyEach();
      coin.play();
    }

    if(carGroup.isTouching(doraemon)){
      gameState=2;
      gameOver.play();
    }
    if(score===4){
      doraemon.velocityY=0;
      doraemon.y=480;
      invisibleGround.y=590;
      gameState=1;
    
    }
    //console.log(doraemon.y);

   doraemon.collide(invisibleGround);
  cake();
  cars();

   }

   if(gameState===1){

    up.show();
    down.show();
    shoot.show();
    if(back.x<200){
      back.x=back.width/2;
    }
    back.scale=1.2;

    
    //doraemon.y=490
    ufos();
     back.addImage(background2Img);
     doraemon.collide(invisibleGround)
     doraemon.changeAnimation("shooter",shooterImg);
     doraemon.scale=0.2;
     doraemon.visible=true;
     note.visible=true;

     

     for(var i=0;i<ufoGroup.length;i++){
     if(ufoGroup.get(i).isTouching(bulletGroup)){
       bulletGroup.destroyEach();
       ufoGroup.get(i).destroy();

          }

      }

      for(var i=0;i<ufoGroup.length;i++){
        if(ufoGroup.get(i).isTouching(b) || ufoGroup.get(i).isTouching(doraemon) ){
          count=count+1;
          ufoGroup.get(i).destroy();
   
             }
   
         }

         if(count===3){
           gameState=2;
           note.visible=false;
         }
   }

  
   if(gameState===2){
    gameOver.visible=true;
    restart.visible=true;

    back.velocityX=0;
    carGroup.setVelocityXEach(0);
    cakeGroup.setVelocityXEach(0);
    
    doraemon.changeAnimation("fallen",doraemon_fallen);
    doraemon.scale=0.3;
    doraemon.velocityY=0;
    doraemon.velocityX=0;

    if(mousePressedOver( restart )){
      reset();
    }

   }
  drawSprites();

  textSize(25);
  fill("black");
  textFont("algerian")
  text("UFOs Missed = "+count,800,100);
  
}
function cake(){
  if(frameCount%100===0){
    doraCake=createSprite(600,550,10,10);
    doraCake.y=Math.round(random(200,400));
    doraCake.addImage(doraCakeImg);
    doraCake.scale=0.06;
    doraCake.velocityX=-8
    doraCake.lifetime=100;
    cakeGroup.add(doraCake);
  }
}

function cars(){
  if(frameCount%80===0){
    car=createSprite(600,520,10,10);
    car.addImage(carImg);
    car.scale=0.6;
    car.velocityX=-8
    car.lifetime=100;
    carGroup.add(car);
  }
  }

function bullets(){
    var b=createSprite(doraemon.x,doraemon.y,10,10);
    b.addImage(bulletImg);
    b.scale=0.07;
    b.velocityX=5;
    b.lifetime=150;
    bulletGroup.add(b);
}

function ufos(){
  if(frameCount%80===0){
  var ufo=createSprite(1200,20,10,10);
  ufo.y=Math.round(random(80,400));
  ufo.addImage(ufoImg);
  ufo.scale=0.3;
  ufo.velocityX=-5;
  ufo.lifetime=250;
  ufoGroup.add(ufo);
  }
}

function reset(){
  gameOver.visible=false;
  restart.visible=false;
  gameState=0;
  carGroup.setVelocityEach(-8);
  cakeGroup.setVelocityEach(-8);
  doraemon.changeAnimation("running",doraemon_running);
  doraemon.scale=1;
  doraemon.x=80;
  back.x=600;
  back.velocityX=-8;
  
}
