// Speed in pixels per second
var enemySpeed;

var isGameOver;
var spriteHeight = 101;
var spriteWidth = 171;

var WIDTH = 505; //width of the rectangular area
var HEIGHT = 606; //height of the rectangular area


//delta time variables for enemies and player updates
var lastFrameTimeStamp = new Date().getTime();
var dt = (new Date().getTime() - lastFrameTimeStamp) / 1000;

// Enemies the player must avoid
var Enemy = function () {
    // The image/sprite for enemies
  this.sprite = 'images/enemy-bug.png';
}

//default player
var selectedPlayer = 'images/char-horn-girl.png';

// player class
var Player = function(x, y) {
    //user can select a different player sprite.
    this.sprite = selectedPlayer;
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter to ensure 
    // the game runs at the same speed on all computers.
    if(this.x < WIDTH){
      this.x += this.enemySpeed * dt;
    } else {
        this.x = -30;
    }

    //checks for collisions between any enemy and the player
    this.checkCollisions(this, player);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101, 171);
}

Enemy.prototype.checkCollisions = function(enemy, player) {

     player.x = playerLocation.x;
     player.y = playerLocation.y;

    if (this.isColliding(this, player)) {
      gameOver();
    }
}

//bounding box algorithm
Enemy.prototype.isColliding = function(enemy, player) {
        return ((this.x + spriteWidth/2) > (player.x) &&
            (this.x) < (player.x + spriteWidth/2)  &&
             (this.y + spriteHeight/2) > (player.y)  &&
             (this.y) < (player.y + spriteHeight/2));
};

//starting position for player
var playerLocation = {
    x: 200,
    y: 400
}

//prevent player from moving outside of canvas
function checkPlayerBounds() {
    // Check bounds
    if(this.playerLocation.x < 0) {
        this.playerLocation.x = 0;
    }
    else if(playerLocation.x > 400) {
        playerLocation.x = 400;
    }

    if(playerLocation.y < -10) {
        playerLocation.y = -10;
    }
    else if(playerLocation.y > 404) {
        playerLocation.y = 404;
    }

    if(playerLocation.y <= 20){
       playerLocation.y <= 20;
       gameOver();
       gameEnd();
    }
}

// Draw the player on the screen
Player.prototype.render = function() {
    checkPlayerBounds();
    ctx.drawImage(Resources.get(this.sprite), playerLocation.x, playerLocation.y, 101, 171);
}

Player.prototype.update = function(dt) {
     this.sprite = selectedPlayer;
     //event handler for player movement
     Player.handleInput = function(keyCode) {
        if(playerLocation.x <= WIDTH){
            switch(keyCode) {
              case 'left':
                (playerLocation.x -= 45) * dt;
                break;
              case 'right':
                (playerLocation.x += 45) * dt;
                break;
              default:
                //do nothing
                break;
            }
        } else if (playerLocation.x < 0) {
            playerLocation.x = 505;
            //playerLocation.y = 0;
        } else {
            playerLocation.x = 0;
        }
        if(playerLocation.y < HEIGHT){
            switch(keyCode) {
              case 'up':
              (playerLocation.y -= 45) * dt;
                break;
              case 'down':
                (playerLocation.y += 45) * dt;
                break;
              default:
                //do nothing
                break;
            }
        } else {
            playerLocation.y = 0;
        }
    }
}

//game ends with a win
function gameEnd(){
  ctx.font="45px Arial";
  ctx.fillStyle = "#981201";
  ctx.fillText("YOU'RE A WINNER!", 50, 500);
}

// Game over
function gameOver() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    isGameOver = true;
}

// Reset game to original state
function gameReset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    isGameOver = false;

    playerLocation.x = 200;
    playerLocation.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 400);

var a = new Enemy("a");
var b = new Enemy("b");
var c = new Enemy("c");
var d = new Enemy("d");
var e = new Enemy("e");

var allEnemies = [a, b, c, d, e];

//defines each enemies speed and starting location.
for(var i=0; i <= allEnemies.length; i++){
    if(i = allEnemies[0]){
        i.enemySpeed = Math.floor((Math.random() * 200) + 75);
        i.y = 67;
    }

     if(i = allEnemies[1]){
        i.enemySpeed = Math.floor((Math.random() * 200) + 75);
        i.y = 67;
    }

     if(i = allEnemies[2]){
        i.enemySpeed = Math.floor((Math.random() * 200) + 75);
        i.y = 150;
    }

     if(i = allEnemies[3]){
        i.enemySpeed = Math.floor((Math.random() * 200) + 75);
        i.y = 150;
    }

     if(i = allEnemies[4]){
        i.enemySpeed = Math.floor((Math.random() * 200) + 75);
        i.y = 230;
    }
}

//functions for player select modal window
function showWindow(){
  dialog.showModal();
}
function closeWindow(){
  launchbutton.classList.remove("pressed");
  dialog.close();
}

  var launchbutton = document.getElementById("launch"),
  dialog = document.getElementById('dialog');

  cancel = document.getElementById("cancel");
  launchbutton.onclick = function() {
    launchbutton.classList.add("pressed");
    setTimeout( function() { showWindow() }, 800);
  }
  cancel.onclick = function(){ closeWindow(); }

  function selectClose(selectedPlayer){
    selectedPlayer = this.sprite;
    closeWindow();
  }

  //user can select a different player sprite from the 5 below
  //this change can be made at any point in the game
  pink = document.getElementById('pink');
  cat = document.getElementById("cat");
  princess = document.getElementById("princess");
  horn = document.getElementById("horn");
  boy = document.getElementById("boy");

  pink.onclick = function() {
    selectedPlayer = 'images/char-pink-girl.png';
    selectClose(selectedPlayer);
  };

  cat.onclick = function() {
    selectedPlayer = 'images/char-cat-girl.png';
    selectClose(selectedPlayer);
  };

  princess.onclick = function() {
    selectedPlayer = 'images/char-princess-girl.png';
    selectClose(selectedPlayer);
  };

  horn.onclick = function() {
    selectedPlayer = 'images/char-horn-girl.png';
    selectClose(selectedPlayer);
  };

  boy.onclick = function() {
    selectedPlayer = 'images/char-boy.png';
    selectClose(selectedPlayer);
  };


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    //handle keyup event only if game active
   if(!isGameOver) {
      Player.handleInput(allowedKeys[e.keyCode]);
   }
});