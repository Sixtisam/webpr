
const north = {dx:  0, dy: -1};
const east  = {dx:  1, dy:  0};
const south = {dx:  0, dy:  1};
const west  = {dx: -1, dy:  0};

let direction = north;

const clockwise = [north, east, south, west, north];
const countercw = [north, west, south, east, north];

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 800;
const BLOCK_SIZE = 20;
const BLOCK_WIDTH = Math.floor(CANVAS_WIDTH / BLOCK_SIZE);
const BLOCK_HEIGHT = Math.floor(CANVAS_HEIGHT / BLOCK_SIZE);

let snake = [
    {x: 10, y: 4, color: 'red'},
    {x: 10, y: 5, color: 'green'},
    {x: 10, y: 6, color: 'blue'},
    {x: 10, y: 7, color: 'red'},
    {x: 10, y: 8, color: 'red'},
    {x: 10, y: 9, color: 'red'},
    {x: 10, y: 10, color: 'red'},
];
let food = {x: 15, y: 15};

let gameLoop;

const snakeEquals = (a,b) => a.x === b.x && a.y == b.y;

function changeDirection(orientation) {
    const idx = orientation.indexOf(direction);
    direction = orientation[idx + 1];
}

function start() {
    const canvas  = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const rightArrow = 39;
    const leftArrow  = 37;
    window.onkeydown = evt => {
        const orientation = (evt.keyCode === rightArrow) ? clockwise : countercw;
        changeDirection(orientation);
    };

    gameLoop = setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 5);
}

function nextBoard() {

    const oldHead = snake[0];

    function inBounds(x, max) {
        if (x < 0)   { return max - 1 }
        if (x > max) { return 0 }
        return x
    }

    const head = {
        x: inBounds(oldHead.x + direction.dx, BLOCK_WIDTH),
        y: inBounds(oldHead.y + direction.dy, BLOCK_HEIGHT),
        color: oldHead.color
    };

    if (snakeEquals(food, head)) {  // have we found any food?
        food.x = Math.floor(Math.random() * 20);   // place new food at random location
        food.y = Math.floor(Math.random() * 20);
        snake[snake.length-1].color = "#"+((1<<24)*Math.random()|0).toString(16);
    } else {
        /* fill here */ // no food found => no growth despite new head => remove last element
        snake.pop();
    }

    if(snake.findIndex(el => snakeEquals(el, head)) !== -1){
        clearInterval(gameLoop);
        alert('Game is over, you lost');
        throw "game over";
    }


    /* fill here */; // put head at front of the list
    snake.unshift(head);
}

function display(context) {
    // clear
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // draw all elements
    context.fillStyle = "cyan";
    snake.forEach(element =>
        fillBox(context, element)
    );
    context.fillStyle = "green";
    fillBox(context, snake[0]);
    // draw food
    context.fillStyle = "red";
    fillBox(context, food);
}

function fillBox(context, element) {
    context.fillStyle = element.color;
    context.fillRect(element.x * BLOCK_SIZE + 1, element.y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
}


