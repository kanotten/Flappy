const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
//Drawuing a box
//         x   y   Width height

/* console.log(Math.random() > 0.5); // log false and true 50% of the time
  //Math.random gives a random number from 0 to 0.9999999 */

const player = {
  x: 0,
  y: 0,
  speed: 1,
};

const button = document.querySelector("button");
button.addEventListener("click", () => {
  player.x += 10;
  player.y += 10;
  c.clearRect(0, 0, 400, 400);
  c.fillRect(player.x, player.y, 50, 50);
});

const left = document.querySelector("#left");
const rigth = document.querySelector("#right");

left.addEventListener("click", () => {
  player.speed = -1;
});
rigth.addEventListener("click", () => {
  player.speed = 1;
});

setInterval(() => {
  render();
}, 20);

function render() {
  player.x += player.speed;
  c.clearRect(0, 0, 400, 400);
  c.fillRect(player.x, player.y, 50, 50);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    player.speed = -1; // Move left
  } else if (event.key === "ArrowRight") {
    player.speed = 1; // Move right
  } else if (event.key === "ArrowUp") {
    player.y -= 10; // Move up
  } else if (event.key === "ArrowDown") {
    player.y += 10; // Move down
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    player.speed = 0;
  }
});
