var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

createEdgeSprites();
var computer = createSprite(10,200,15,100);
var player = createSprite(390,10,15,100);
var ball = createSprite(200,200,20,20);
var computerScore = 0;
var playerScore = 0;
function draw() {
  background("white");
  player.y = World.mouseY;
  textSize(20);
  text(computerScore,160,40);
  text(playerScore,220,40);
  for (var i = 0; i < 400; i+=20) {
     line(200,i,200,i+10);
  }
  text("Press Space to Serve",100,360);
  if(keyDown("space")){
  ball.velocityX = 8;
  ball.velocityY = 8;
  }
  if(ball.isTouching(player)){
    playSound("hit.mp3");
    ball.x = ball.x - 8;
    ball.velocityX = -ball.velocityX;
  }
  if(ball.isTouching(computer)){
    playSound("hit.mp3");
    ball.x = ball.x + 8;
    ball.velocityX = -ball.velocityX;
  }
  if(ball.isTouching(topEdge)){
    ball.bounceOff(topEdge);
  }
  if(ball.isTouching(bottomEdge)){
    ball.bounceOff(bottomEdge);
  }
  if(ball.isTouching(leftEdge)){
    ball.x = 200;
    ball.y = 200;
    ball.velocityX=0;
    ball.velocityY=0;
    playerScore++;
  }
  if(ball.isTouching(rightEdge)){
    ball.x = 200;
    ball.y = 200;
    ball.velocityX=0;
    ball.velocityY=0;
    computerScore++;
  }
  computer.y = ball.y;
  drawSprites();
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
