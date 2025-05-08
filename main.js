const gameArea = document.getElementById("gameArea");
const scoreBoard = document.getElementById("scoreBoard");

let score = 0;
let currentTarget = 0;
let totalTargets = 0;
let round = 1;

function addTarget() {
    const number = document.getElementById("input");
    const numValue = parseInt(number.value);
    if (isNaN(numValue) || numValue <= 0) return;

    totalTargets = numValue;
    currentTarget = 0;
    gameArea.innerHTML = "";
    scoreBoard.textContent = `Score: ${score}`;

    for (let i = 0; i < numValue; i++) {
        const target = document.createElement("div");
        target.classList.add("target");
        target.textContent = i + 1;
        target.dataset.number = i;

        target.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            if (parseInt(this.dataset.number) === currentTarget) {
                gameArea.removeChild(this);
                currentTarget++;

                if (currentTarget === totalTargets) {
                    score++;
                    scoreBoard.textContent = `Score: ${score}`;
                    setTimeout(() => {
                        round++;
                        addTarget();
                    });
                }
            }
        });
        gameArea.appendChild(target);
        moveTarget(target);
    }
}

function moveTarget(target) {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const maxX = gameAreaRect.width - target.offsetWidth;
    const maxY = gameAreaRect.height - target.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        score = 0;
        scoreBoard.textContent = `Score: ${score}`;
    }
});