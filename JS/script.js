const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const button = document.querySelector("#button");

const playerImage = new Image();
playerImage.src = "Assets/flappy-bird-sprite.jpg";

playerImage.onload = () => {
  console.log("Flappy Bird image loaded successfully");
};

const player = {
  x: 175,
  y: 200,
  height: 50,
  width: 50,
  speed: -6,
};

const gap = 100; // Space between the top and bottom obstacle
const obstacle = {
  x: 500,
  y: canvas.height - 200, // Position the bottom obstacle lower
  height: 200,
  width: 50,
};

const obstacle2 = {
  x: 500,
  y: 0, // Position the top obstacle at the top
  height: canvas.height - (obstacle.height + gap),
  width: 50,
};

button.addEventListener("click", () => {
  player.speed = -6;
});

const left = document.querySelector("#left");
const right = document.querySelector("#right");

left.addEventListener("click", () => {
  player.speed = -1;
});

right.addEventListener("click", () => {
  player.speed = 1;
});

function checkBounds() {
  if (player.y > 350 || player.y < 0) {
    console.log("You died");
    player.y = 200;
    player.x = 175;
    player.speed = -6;
  }

  if (
    (player.x + player.width > obstacle.x &&
      player.x < obstacle.x + obstacle.width &&
      player.y + player.height > obstacle.y &&
      player.y < obstacle.y + obstacle.height) ||
    (player.x + player.width > obstacle2.x &&
      player.x < obstacle2.x + obstacle2.width &&
      player.y + player.height > obstacle2.y &&
      player.y < obstacle2.y + obstacle2.height)
  ) {
    console.log("You collided and died!");
  }
}

setInterval(() => {
  gameLoop();
}, 20);

function render() {
  player.speed += 0.3;
  player.y += player.speed;
  obstacle.x -= 2;
  obstacle2.x -= 2;

  c.clearRect(0, 0, canvas.width, canvas.height);

  if (playerImage.complete && playerImage.naturalWidth > 0) {
    c.drawImage(playerImage, player.x, player.y, player.width, player.height);
  } else {
    console.log("Image not loading properly");
  }

  c.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  c.fillRect(obstacle2.x, obstacle2.y, obstacle2.width, obstacle2.height);

  if (obstacle.x < -obstacle.width) {
    obstacle.x = 500;
  }
  if (obstacle2.x < -obstacle2.width) {
    obstacle2.x = 500;
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    player.speed = -6;
  }
});

function gameLoop() {
  render();
  checkBounds();
}
