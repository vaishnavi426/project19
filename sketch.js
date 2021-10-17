var space, spaceImg;
var star, starImg, starGrp;
var user, userImg, userGrp;
var ufo, ufoImg, ufoGrp;
var gamestate = "play";
var score,stars;

function preload(){
   starImg = loadImage("star.png");
   userImg = loadImage("rocket1.png");
   spaceImg = loadImage("space.png");
   ufoImg = loadImage("ufo.png");
}

function setup() {
    createCanvas(800,600);
    
    space = createSprite(400,300);
    space.addImage("space",spaceImg);
    space.velocityY = 2;
    space.scale = 2;
    
    starGrp = new Group();
    ufoGrp = new Group();

    user = createSprite(400,500,20,20);
    user.addImage("rocket",userImg);
    user.scale = 0.3;
    user.setCollider("circle",0,0,40);
    user.debug = true;

    score = 0;
    stars = 0;
}

function draw() {
    background("black");

    if(gamestate == "play") {
        score = score + Math.round(getFrameRate()/60);
        user.y = World.mouseY;
        user.x = World.mouseX;
        
        if(starGrp.isTouching(user)) {
            star.destroy(user);
            stars = stars+1;
        }
    
        if(space.y>400) {
            space.y = 300;
        }
        
        if(ufoGrp.isTouching(user) || user.y>=585) {
            gamestate = "end";
        }

        makeUFO();
        makeStars();
        drawSprites();
    }
    else if(gamestate == "end") {
        textSize(40);
        fill("white");
        text("Game Over",250,240);
        
        text("Score: "+ score, 260,300);
        text("Star: "+stars, 280,360);
    }
}

function makeStars() {
    if(frameCount%300==0) {
        star = createSprite(200,-5,20,20);
        star.addImage("star",starImg);
        star.scale = 0.1;
        star.velocityY = random(3,5);
        star.x = random(100,700);

        starGrp.add(star);
    }
}

function makeUFO() {
    if(frameCount%200==0) {
        ufo = createSprite(200,-5)
        ufo.addImage("ufo",ufoImg);
        ufo.scale = 0.2;
        ufo.x = random(100,700);
        ufo.velocityY = 3;

        ufoGrp.add(ufo);
    }
}