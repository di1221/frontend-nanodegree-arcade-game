var isGameOver;
var SPRITE_HEIGHT = 101;
var SPRITE_WIDTH = 171;

var WIDTH = 505; //width of the rectangular area
var HEIGHT = 606; //height of the rectangular area


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
  // sets y position of each enemy
  this.y = this.setY();
  // Speed in pixels per second
  this.enemySpeed = getRandomInt(50, 400);
  // The image/sprite for our enemies, this uses
  this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.setY = function() {
  var yArray = [67, 150, 150, 230, 67];
  //defines each enemies speed and starting location.
  for (var i=0; i < allEnemies.length; i++) {
    for (var yIndex in yArray) {
      this.y = yArray[yIndex];
      if (i = allEnemies[yIndex]) {
          i.y = this.y;
      }
    }
  }
};

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (i=0; i<=4; i++) {
  allEnemies[i] = new Enemy();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // multiply any movement by the dt parameter to ensure
  // the game runs at the same speed on all computers.
  if (this.x < WIDTH) {
    this.x += this.enemySpeed * dt;
  } else {
      this.x = getRandomInt(-150, -20);
  }
    //checks for collisions between any enemy and the player
    this.checkCollisions(this, player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101, 171);
};

Enemy.prototype.checkCollisions = function(enemy, player) {

  player.x = playerLocation.x;
  player.y = playerLocation.y;

  if (this.isColliding(this, player)) {
    player.gameOver();
  }
};

//bounding box algorithm
Enemy.prototype.isColliding = function(enemy, player) {
      return ((this.x + SPRITE_WIDTH/2.2) > (player.x) &&
          (this.x) < (player.x + SPRITE_WIDTH/2.2)  &&
          (this.y + SPRITE_HEIGHT/2) > (player.y)  &&
          (this.y) < (player.y + SPRITE_HEIGHT/2));
};

//starting position for player
var playerLocation = {
  x: 200,
  y: 400
};

// player class
var Player = function(x, y) {
  //user can select a different player sprite.
  this.sprite = selectedPlayer;
};

//prevent player from moving outside of canvas
//function checkPlayerBounds() {
Player.prototype.checkPlayerBounds = function() {
    // Check bounds
    if (playerLocation.x < 0) {
      playerLocation.x = 0;
    }
    else if (playerLocation.x > 400) {
        playerLocation.x = 400;
    }

    if (playerLocation.y < -10) {
        playerLocation.y = -10;
    }
    else if (playerLocation.y > 400) {
        playerLocation.y = 400;
    }

    if (playerLocation.y <= 20) {
       playerLocation.y <= 20;
       this.gameOver();
       this.gameEnd();
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
  this.checkPlayerBounds();
  ctx.drawImage(Resources.get(this.sprite), playerLocation.x, playerLocation.y, 101, 171);
};

Player.prototype.update = function(dt) {
     this.sprite = selectedPlayer;
     //event handler for player movement
     Player.handleInput = function(keyCode) {
        if (playerLocation.x <= WIDTH) {
            switch(keyCode) {
              case 'left':
                (playerLocation.x -= 100) * dt;
                break;
              case 'right':
                (playerLocation.x += 100) * dt;
                break;
              default:
                //do nothing
                break;
            }
        }
        if (playerLocation.y < HEIGHT) {
            switch(keyCode) {
              case 'up':
              (playerLocation.y -= 100) * dt;
                break;
              case 'down':
                (playerLocation.y += 100) * dt;
                break;
              default:
                //do nothing
                break;
            }
        }
    };
};

//used for player sprite selection option
Player.prototype.spriteSelection = function(src) {
  selectedPlayer = src;
  selectClose(selectedPlayer);
};

//game ends with a win
Player.prototype.gameEnd = function() {
  ctx.font="45px Arial";
  ctx.fillStyle = "#981201";
  ctx.fillText("YOU'RE A WINNER!", 50, 500);
};

// Game over
Player.prototype.gameOver = function() {
  document.getElementById('game-over').style.display = 'block';
  document.getElementById('game-over-overlay').style.display = 'block';
  isGameOver = true;
};

// Reset game to original state
Player.prototype.gameReset = function() {
  document.getElementById('game-over').style.display = 'none';
  document.getElementById('game-over-overlay').style.display = 'none';
  isGameOver = false;

  playerLocation.x = 200;
  playerLocation.y = 400;
};

// Now instantiate your objects.
// Place the player object in a variable called player
var player = new Player(200, 400);

//default player
var selectedPlayer = 'images/char-horn-girl.png';


function selectClose(selectedPlayer) {
  selectedPlayer = this.sprite;
  closeWindow();
}

//functions for player select modal window
function showWindow() {
  dialog.showModal();
}
function closeWindow() {
  launchbutton.classList.remove("pressed");
  dialog.close();
}

var launchbutton = document.getElementById("launch"),
dialog = document.getElementById('dialog');

cancel = document.getElementById("cancel");
launchbutton.onclick = function() {
  launchbutton.classList.add("pressed");
  setTimeout( function() { showWindow(); }, 800);
};

cancel.onclick = function(){ closeWindow(); };


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
   if (!isGameOver) {
      Player.handleInput(allowedKeys[e.keyCode]);
   }
});