var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE

    //creates the saw blades in the game
   function createSawBlade(x, y, damage){
    var hitZoneSize = 25;
    var damageFromObstacle = 10;
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
    sawBladeHitZone.x = x;
    sawBladeHitZone.y = y;
    game.addGameItem(sawBladeHitZone);
    var obstacleImage = draw.bitmap("img/sawblade.png");
    sawBladeHitZone.addChild(obstacleImage);
    obstacleImage.x = -25;
    obstacleImage.y = -25;
    
   }
    
//creates Enemy
    function createEnemy(x, y){
      var enemy = game.createGameItem("enemy", 25);
      var blueSquare = draw.bitmap('img/King_Bowser.webp');
      blueSquare.x = -100;
      blueSquare.y = -100;
      enemy.addChild(blueSquare);
      enemy.x = 700; 
      enemy.y = groundY - 50;
      game.addGameItem(enemy);
      enemy.velocityX = -3;
      
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10)
      };
      //score any enemy dying
        enemy.onProjectileCollision = function(){  
        enemy.flyTo(0, 0);
        };
      
        
        }
        createEnemy(200, groundY - 50);

    function createReward(x, y){
    var reward = game.createGameItem("reward", 25);
    var yellowSquare = draw.rect(50, 50, "yellow");
    yellowSquare.x = -25;
    yellowSquare.y = -25;
    reward.addChild(yellowSquare);
    reward.x = 400;
    reward.y = groundY - 50;
    game.addGameItem(reward);
    reward.velocityX = -3;

    reward.onPlayerCollision = function () {
      game.changeIntegrity(-10)
      game.increaseScore(50);
      reward.shrink()
    };
    //score any reward dying
      reward.onProjectileCollision = function(){  


      };

      
      }
      //creates my marker
      function createMarker(x, y){
        var marker = game.createGameItem("enemy", 25);
        var blueSquare = draw.rect(50,50,'blue');
        blueSquare.x = -25;
        blueSquare.y = -25;
        marker.addChild(blueSquare);
        marker.x = x; 
        marker.y = y;
        game.addGameItem(marker);
        marker.velocityX = -1;
        blueSquare.scaleX = 1;
        blueSquare.scaleY = 1;

        marker.onPlayerCollision = function () {
          game.changeIntegrity(25);
          startLevel();
        };             
      }
      
      
      //function calls   
      createMarker(950, groundY - 50);
      createReward(1000, groundY - 100);
  

    function startLevel() { 
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects = level.gameItems;
      for(var i = 0;i < levelObjects.length; i++){
        var element = levelObjects[i];
        if(element.type === 'sawblade'){
          createSawBlade(element.x, element.y);
        }
        if(element.type === 'reward'){
          createReward(element.x, element.y);
        }
        if(element.type === 'enemy'){
          createEnemy(elemnet.x, element.y);
        }
      }

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
