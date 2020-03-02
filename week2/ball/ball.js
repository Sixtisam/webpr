
const radius = 10;
const ball = {x:20, y:0, dx: 6, dy: 1};
let   old  = {x: ball.x, y: ball.y};

function start() {
    const canvas  = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.fillStyle = "black";

    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 30);
}

function nextBoard() {
    // keep old ball values for the sake of efficient clearing of the old display
    old = {
        x: ball.x,
        y: ball.y,
        dx: ball.dx,
        dy: ball.dy
    };


    ball.x = old.x + old.dx;
    if(ball.x > canvas.width){
        ball.x = canvas.width - (ball.x - canvas.width);
        ball.dx = -old.dx + 1;
    } else if(ball.x < 0){
        ball.x = -ball.x;
        ball.dx = -old.dx + 1;
    } else {
        ball.dx = old.dx;
    }
    ball.y = old.y + old.dy;
    if(ball.y > canvas.height){
        ball.y = canvas.height - (ball.y - canvas.height);
        ball.dy = -old.dy + 1;
    } else if(ball.y < 0){
        ball.y = -ball.y;
        ball.dy = -old.dy

    } else {
        ball.dy = old.dy;
    }

    console.log('Current Position: ', ball.x, ball.y)
    console.log('Current Velocity: ', ball.dx, ball.dy);

    // handle ball is hitting the bounds
    //   reverse direction
    //   lose some energy relative to the current inertia (only velocity varies)

    // calculate new position
    // calculate any changes in velocity due to gravitational pull or medium resistance

    if(ball.dy > 0){
        ball.dy = ball.dy + 0.5;
    } else {
        ball.dy = ball.dy + 0.5;
    }

    ball.dx = ball.dx * 0.999995;

}

function display(context) {
    context.clearRect(old.x - radius - 1 , old.y - radius -1 , 22, 22 );
    fillBox(context)
}

function fillBox(context) {
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, 6.3, false);
    context.fill();
}


