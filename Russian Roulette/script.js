let currentPlayer = 1;
let bulletPosition = Math.floor(Math.random() * 6) + 1;
let shotCount = 0;

document.getElementById('shoot').addEventListener('click', () => {
    shotCount++;

    // Вращение барабана
    document.getElementById('barrel').style.transform = `rotate(${shotCount * 60}deg)`;

    setTimeout(() => {
        if (shotCount === bulletPosition) {
            document.getElementById('bullet').style.display = 'block';
            document.getElementById('result').innerText = `Player ${currentPlayer} lost!`;
            document.getElementById('shoot').disabled = true;
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            document.getElementById('player-turn').innerText = `Player ${currentPlayer}'s Turn`;
        }
    }, 500); // Задержка для анимации вращения
});