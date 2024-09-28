const gameContainer = document.querySelector('.game-container');
const paddle = document.querySelector('.paddle');
const ball = document.querySelector('.ball');
const scoreDisplay = document.querySelector('.score');

let paddleWidth = paddle.offsetWidth;
let paddleHeight = paddle.offsetHeight;
let paddleX = (gameContainer.offsetWidth - paddleWidth) / 2;

let ballX = gameContainer.offsetWidth / 2;
let ballY = gameContainer.offsetHeight - paddleHeight - 20;
let ballSpeedX = 2;
let ballSpeedY = -2;

let score = 0;
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}

function movePaddle() {
    if (rightPressed && paddleX < gameContainer.offsetWidth - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    paddle.style.left = paddleX + 'px';
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX + ballSpeedX > gameContainer.offsetWidth - ball.offsetWidth || ballX + ballSpeedX < 0) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY + ballSpeedY < 0) {
        ballSpeedY = -ballSpeedY;
    } else if (ballY + ballSpeedY > gameContainer.offsetHeight - ball.offsetHeight) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballSpeedY = -ballSpeedY;
            score++;
            scoreDisplay.textContent = 'Score: ' + score;


            if (score % 5 === 0) {
                increaseSpeed();
            }
        } else {
            endGame();
        }
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

function increaseSpeed() {

    ballSpeedX *= 1.5;
    ballSpeedY *= 1.5;
}

function endGame() {
    alert('Гра закінчена. Ваш рахунок: ' + score);
    setTimeout(resetGame, 1000);
}

function resetGame() {
    ballX = gameContainer.offsetWidth / 2;
    ballY = gameContainer.offsetHeight - paddleHeight - 20;
    ballSpeedX = 2;
    ballSpeedY = -2;
    paddleX = (gameContainer.offsetWidth - paddleWidth) / 2;
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
}

function gameLoop() {
    movePaddle();
    moveBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();
