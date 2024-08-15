const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let playerY = (canvas.height - paddleHeight) / 2;
let computerY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let playerScore = 0;
let computerScore = 0;

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "75px Arial";
    context.fillText(text, x, y);
}

function render() {
    // Clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "black");

    // Draw the net
    drawRect(canvas.width / 2 - 1, 0, 2, canvas.height, "white");

    // Draw the paddles
    drawRect(0, playerY, paddleWidth, paddleHeight, "white");
    drawRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight, "white");

    // Draw the ball
    drawCircle(ballX, ballY, ballRadius, "white");

    // Draw the scores
    drawText(playerScore, canvas.width / 4, 100, "white");
    drawText(computerScore, 3 * canvas.width / 4, 100, "white");
}

function update() {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballRadius < paddleWidth) {
        if (ballY > playerY && ballY < playerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            computerScore++;
            resetBall();
        }
    }

    if (ballX + ballRadius > canvas.width - paddleWidth) {
        if (ballY > computerY && ballY < computerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            playerScore++;
            resetBall();
        }
    }

    // Move the computer paddle (simple AI)
    if (computerY + paddleHeight / 2 < ballY) {
        computerY += 6;
    } else {
        computerY -= 6;
    }

    // Prevent paddles from going out of bounds
    playerY = Math.max(Math.min(playerY, canvas.height - paddleHeight), 0);
    computerY = Math.max(Math.min(computerY, canvas.height - paddleHeight), 0);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 5;
}

// Control the player paddle
window.addEventListener("mousemove", (event) => {
    const relativeY = event.clientY - paddleHeight / 2;
    playerY = Math.max(Math.min(relativeY, canvas.height - paddleHeight), 0);
});

function gameLoop() {
    update();
    render();
}

setInterval(gameLoop, 1000 / 60);
