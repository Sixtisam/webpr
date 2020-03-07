const id = x => x;
const fst = x => y => x;
const snd = fst(id);

const F = snd;
const T = fst;
const and = p => q => p(q)(p);

const Pair = x => y => f => f(x)(y);

const Point = Pair;
const Vector = Pair;
const getX = fst;
const getY = snd;
const eq = x => y => (x === y ? T : F);
const valueEq = f => x => y => eq(x(f))(y(f));
const lt = x => y => (x < y ? T : F);

const equals = pair1 => pair2 =>
  and(valueEq(fst)(pair1)(pair2))(valueEq(snd)(pair1)(pair2))(true)(false);

console.log(equals(Point(1)(1))(Point(1)(1)));

const GameContext = Pair;
const getFood = fst;
const getSnake = snd;
const getSnakeHead = food => snake => snake[0];
const isHeadOnFood = food => snake => equals(food)(snake[0]);

const either = id;

const Left = value => f => g => f(value);
const Right = value => f => g => g(value);

/*******************************************************************
 *******************************************************************
 *******************************************************************/

const north = Vector(0)(-1);
const east = Vector(1)(0);
const south = Vector(0)(1);
const west = Vector(-1)(0);

let direction = north;

const clockwise = [north, east, south, west, north];
const countercw = [north, west, south, east, north];

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 800;
const BLOCK_SIZE = 20;
const BLOCK_WIDTH = Math.floor(CANVAS_WIDTH / BLOCK_SIZE);
const BLOCK_HEIGHT = Math.floor(CANVAS_HEIGHT / BLOCK_SIZE);

let gameLoop;

function changeDirection(orientation) {
  const idx = orientation.indexOf(direction);
  direction = orientation[idx + 1];
}

let drawFn;

function start() {
  const canvas = document.getElementById("canvas");
  const drawContext = canvas.getContext("2d");

  const rightArrow = 39;
  const leftArrow = 37;
  window.onkeydown = evt => {
    const orientation = evt.keyCode === rightArrow ? clockwise : countercw;
    changeDirection(orientation);
  };

  const food = Point(15)(15);
  const snake = [
    Point(10)(4),
    Point(10)(5),
    Point(10)(6),
    Point(10)(7),
    Point(10)(8),
    Point(10)(9),
    Point(10)(10)
  ];
  const initialGameContext = GameContext(food)(snake);

  drawFn = drawGame(drawContext);
  // start first gameTick
  gameTick(initialGameContext)();
}

function gameTick(prevGameContext){
    return () => {
        nextBoard(prevGameContext)
        (error => { // in case of game over
            alert(error);
        })
        (gContext => { // in case of success
            drawFn(gContext);
            setTimeout(gameTick(gContext), 1000 / 5);
        });
    }
}

function inBounds(x, max) {
  // return lt(x, 0)
  //             (max - 1)
  //             (lt(max, x)
  //                 (0)
  //                 (x))
  if (x < 0) {
    return max - 1;
  }
  if (x > max) {
    return 0;
  }
  return x;
}

function nextBoard(gameContext) {
  const oldHead = gameContext(getSnakeHead);

  const newHeadX = inBounds(oldHead(getX) + direction(getX), BLOCK_WIDTH);
  const newHeadY = inBounds(oldHead(getY) + direction(getY), BLOCK_HEIGHT);
  const head = Point(newHeadX)(newHeadY);
  const newSnake = gameContext(getSnake).slice();

  let food = gameContext(getFood);
  if (equals(head)(food)) {
    // have we found any food?
    food = Point(Math.floor(Math.random() * 20))(
      Math.floor(Math.random() * 20)
    );
  } else {
    /* fill here */ // no food found => no growth despite new head => remove last element
    newSnake.pop();
  }

  if (newSnake.findIndex(equals(head)) !== -1) {
    return Left("Game Over");
  }

  // put head at front of the list
  newSnake.unshift(head);

  return Right(GameContext(food)(newSnake));
}

const drawGame = drawContext => gameContext => {
  const fillFn = fillBox(drawContext);
  // clear
  drawContext.fillStyle = "black";
  drawContext.fillRect(0, 0, canvas.width, canvas.height);
  // draw all elements
  drawContext.fillStyle = "cyan";
  gameContext(getSnake).forEach(fillFn);
  // redraw head with green color
  drawContext.fillStyle = "green";
  fillFn(gameContext(getSnakeHead));
  // draw food
  drawContext.fillStyle = "red";
  fillFn(gameContext(getFood));
};

const fillBox = drawContext => element => {
  drawContext.fillRect(
    element(getX) * BLOCK_SIZE + 1,
    element(getY) * BLOCK_SIZE + 1,
    BLOCK_SIZE - 2,
    BLOCK_SIZE - 2
  );
};
