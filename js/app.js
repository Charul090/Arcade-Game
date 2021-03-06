"use strict";

// Enemies our player must avoid
const Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.height = 60;
  this.width = 60;
  this.end = 505;
  this.start = -99;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  //Bugs speed Logic
  if (this.x < this.end) {
    this.x += 15 * this.speed * dt;
  } else {
    this.x = this.start;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
  this.startx = x;
  this.starty = y;
  this.x = x;
  this.y = y;
  this.height = 60;
  this.width = 50;
  this.climb = 83;
  this.slide = 101;
  this.sprite = "images/char-boy.png";
};

Player.prototype.update = function() {
  //Collision Detection logic
  for (let enemy of allEnemies) {
    if (
      this.x < enemy.x + enemy.width &&
      this.x + this.width > enemy.x &&
      this.y < enemy.y + enemy.height &&
      this.y + this.height > enemy.y
    ) {
      this.reset();
    }
  }
  //Alert when you win the game
  if (this.y === this.starty - this.climb * 5) {
    alert("Game Won.Click Ok to Play Again");
    this.reset();
  }
};

//Player position reset logic
Player.prototype.reset = function() {
  this.x = this.startx;
  this.y = this.starty;
};

//Player movement logic
Player.prototype.handleInput = function(k) {
  switch (k) {
    case "left":
      if (this.x !== 200 - this.slide * 2) {
        this.x -= this.slide;
      }
      break;
    case "right":
      if (this.x !== 200 + this.slide * 2) {
        this.x += this.slide;
      }
      break;
    case "up":
      if (this.y !== 394 - 5 * this.climb) {
        this.y -= this.climb;
      }
      break;
    case "down":
      if (this.y !== 394) {
        this.y += this.climb;
      }
      break;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

//Enemies array
const allEnemies = [
  new Enemy(-159, 62, 30),
  new Enemy(-200, 145, 40),
  new Enemy(-99, 228, 20),
  new Enemy(-139, 62, 20)
];

// Place the player object in a variable called player
const player = new Player(200, 394);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
