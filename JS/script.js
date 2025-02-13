const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const button = document.querySelector("button");

const player = {
  x: 175,
  y: 200,
  height: 50,
  width: 50,
  speed: -6,
};

const obstacle = {
  x: 500,
  y: 200,
  height: 200,
  width: 50,
};

button.addEventListener("click", () => {
  player.speed = -6;
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillRect(player.x, player.y, player.width, player.height);
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
    player.x + player.width > obstacle.x &&
    player.x < obstacle.x + obstacle.width &&
    player.y + player.height > obstacle.y &&
    player.y < obstacle.y + obstacle.height
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
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillRect(player.x, player.y, player.width, player.height);
  c.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  if (obstacle.x < -obstacle.width) {
    obstacle.x = 500;
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
