const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const max = canvas.width;
context.fillStyle = "black";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;
const radius = 10;

let persons = [];

add = infected => evt =>
  persons.push({
    x: max / 2,
    y: max / 2,
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2,
    infected: infected
  });
const addPersonButton = document.getElementById("addPerson");
const addInfectedButton = document.getElementById("infected");
addPersonButton.onclick = add(false);
addInfectedButton.onclick = add(true);

function start() {
  setInterval(() => {
    nextBoard();
  }, 1000 / 50);
}

function display(ball) {
  context.fillStyle = "gold";
  drawPerson(ball, radius + 1);

  context.fillStyle = ball.infected ? "red" : "black";
  ball.x = (ball.x + max + ball.dx) % max;
  ball.y = (ball.y + max + ball.dy) % max;
  drawPerson(ball, radius);
}
const touching = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2 < radius ** 2;

function nextBoard() {
  const infected = [];
  const uninfected = [];
  persons.forEach(ball =>
    ball.infected ? infected.push(ball) : uninfected.push(ball)
  );
  infected.forEach(infectedPerson => {
    uninfected.forEach(uninfectedPerson => {
      if (touching(infectedPerson, uninfectedPerson)) {
        uninfectedPerson.infected = true;
      }
    });
  });

  persons.forEach(ball => display(ball));
}

// function calcNextBoard() {
//   persons = persons.map(p => {
//     const dx = Math.ceil(Math.random() * 10);
//     const dy = Math.ceil(Math.random() * 10);
//     return {
//       x: (p.y + dx) % CANVAS_WIDTH,
//       y: (p.y + dy) % CANVAS_HEIGHT,
//       dx,
//       dy,
//       infected: touching
//     };
//   });
// }

/**
 * Redraws the complete board
 */
function drawBoard() {
  context.fillStyle = "gold";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  persons.forEach(drawPerson);
  requestAnimationFrame(drawBoard);
}

function drawPerson(person, radius) {
  context.beginPath();
  context.arc(person.x, person.y, radius, 0, 6.3, false);
  context.fill();
}

start();
