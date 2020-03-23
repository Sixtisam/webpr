const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const Person = x => y => z => f => f(x)(y)(z);
const x = x => y => z => x;
const y = x => y => z => y;
const infected = x => y => z => z;

let persons = [Person(100)(100)(false)];

const createPerson = infected => () => {
  persons.push(Person(5)(5)(infected));
};

document.getElementById("person-add").onclick = createPerson(false);
document.getElementById("infected-person-add").onclick = createPerson(true);

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;
const RADIUS = 10;

function start() {
  setInterval(() => {
    calcNextBoard();
  }, 1000 / 50);

  requestAnimationFrame(drawBoard);
}

function calcNextBoard() {
  persons = persons.map(p => {
    const dx = Math.ceil(Math.random() * 10);
    const dy = Math.ceil(Math.random() * 10);
    return Person((p(x) + dx) % CANVAS_WIDTH)((p(y) + dy) % CANVAS_HEIGHT)(
      touching
    );
  });
}

/**
 * Redraws the complete board
 */
function drawBoard() {
  context.fillStyle = "gold";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  persons.forEach(drawPerson);
  requestAnimationFrame(drawBoard);
}

function drawPerson(person) {
  if (person(infected)) {
    context.fillStyle = "red";
  } else {
    context.fillStyle = "black";
  }
  context.beginPath();
  context.arc(person(x), person(y), RADIUS, 0, 6.3, false);
  context.fill();
}
