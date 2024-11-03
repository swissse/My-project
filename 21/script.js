document.addEventListener('DOMContentLoaded', () => {
    const modeSelection = document.getElementById('mode-selection');
    const gameContainer = document.getElementById('game');
    const player1Cards = document.getElementById('player1-cards');
    const player1Score = document.getElementById('player1-score');
    const player2Cards = document.getElementById('player2-cards');
    const player2Score = document.getElementById('player2-score');
    const dealerCards = document.getElementById('dealer-cards');
    const dealerScore = document.getElementById('dealer-score');
    const drawCardButton = document.getElementById('draw-card');
    const passButton = document.getElementById('pass');
    const drawCardPlayer2Button = document.getElementById('draw-card-player2');
    const passPlayer2Button = document.getElementById('pass-player2');
    const restartButton = document.getElementById('restart');
    const returnToMenuButton = document.getElementById('return-to-menu');
    const result = document.getElementById('result');
    const timerDisplay = document.getElementById('time-left');
    const timerElement = document.getElementById('timer');

    let cards = [2, 3, 4, 6, 7, 8, 9,  10, 11];
    cards = cards.flatMap(card => Array(4).fill(card)); // Создаем массив с 4 дубликатами каждой карты
    let player1Hand = [];
    let player2Hand = [];
    let dealerHand = [];
    let player1ScoreValue = 0;
    let player2ScoreValue = 0;
    let dealerScoreValue = 0;
    let isPlayer1Turn = true;
    let isBotMode = false;
    let idleTimer;
    let idleTimeLeft = 10; // Изменено на 10 секунд

    function drawCard(hand) {
        if (cards.length === 0) {
            alert('Карты закончились!');
            return;
        }
        let cardIndex = Math.floor(Math.random() * cards.length);
        let card = cards[cardIndex];
        if (card === 11 && calculateScore(hand) + card > 21) {
            card = 1; // Превращаем туза в 1, если сумма с тузом превысит 21
        }
        hand.push(card);
        cards.splice(cardIndex, 1); // Удаляем использованную карту из массива
        return card;
    }

    function calculateScore(hand) {
        let score = hand.reduce((sum, card) => sum + card, 0);
        // Если сумма больше 21 и есть тузы, превращаем их в 1
        while (score > 21 && hand.includes(11)) {
            let aceIndex = hand.indexOf(11);
            hand[aceIndex] = 1;
            score -= 10;
        }
        return score;
    }

    function updateUI() {
        player1Cards.innerHTML = player1Hand.map(card => `<li>${card}</li>`).join('');
        player1Score.textContent = player1ScoreValue;
        if (isBotMode) {
            dealerCards.innerHTML = dealerHand.map(card => `<li>${card}</li>`).join('');
            dealerScore.textContent = dealerScoreValue;
        } else {
            player2Cards.innerHTML = player2Hand.map(card => `<li>${card}</li>`).join('');
            player2Score.textContent = player2ScoreValue;
        }
    }

    function checkResult() {
        if (isBotMode) {
            if (player1ScoreValue > 21) {
                result.textContent = 'Вы проиграли!';
                drawCardButton.disabled = true;
                passButton.disabled = true;
                clearInterval(idleTimer);
            } else if (player1ScoreValue === 21) {
                result.textContent = 'Поздравляем! Вы выиграли!';
                drawCardButton.disabled = true;
                passButton.disabled = true;
                clearInterval(idleTimer);
            }
        } else {
            if (player1ScoreValue > 21 || player2ScoreValue > 21) {
                result.textContent = 'Вы проиграли!';
                drawCardButton.disabled = true;
                passButton.disabled = true;
                drawCardPlayer2Button.disabled = true;
                passPlayer2Button.disabled = true;
                clearInterval(idleTimer);
            } else if (player1ScoreValue === 21 || player2ScoreValue === 21) {
                result.textContent = 'Поздравляем! Вы выиграли!';
                drawCardButton.disabled = true;
                passButton.disabled = true;
                drawCardPlayer2Button.disabled = true;
                passPlayer2Button.disabled = true;
                clearInterval(idleTimer);
            }
        }
    }

    function dealerTurn() {
        if (dealerScoreValue < 17 || (dealerScoreValue < player1ScoreValue && dealerScoreValue < 21)) {
            setTimeout(() => {
                drawCard(dealerHand);
                dealerScoreValue = calculateScore(dealerHand);
                updateUI();
                if (dealerScoreValue > 21) {
                    result.textContent = 'Поздравляем! Вы выиграли!';
                    drawCardButton.disabled = true;
                    passButton.disabled = true;
                    clearInterval(idleTimer);
                } else if (dealerScoreValue === 21) {
                    result.textContent = 'Вы проиграли!';
                    drawCardButton.disabled = true;
                    passButton.disabled = true;
                    clearInterval(idleTimer);
                } else {
                    checkResult();
                    isPlayer1Turn = true;
                    drawCardButton.disabled = false;
                    passButton.disabled = false;
                    startIdleTimer();
                }
            }, 2000); // Задержка дилера перед ходом в 2 секунды
        } else {
            isPlayer1Turn = true;
            drawCardButton.disabled = false;
            passButton.disabled = false;
            startIdleTimer();
        }
    }

    function startIdleTimer() {
        idleTimeLeft = 10; // Изменено на 10 секунд
        timerDisplay.textContent = idleTimeLeft;
        clearInterval(idleTimer);
        idleTimer = setInterval(() => {
            idleTimeLeft--;
            timerDisplay.textContent = idleTimeLeft;
            if (idleTimeLeft <= 0) {
                clearInterval(idleTimer);
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        if (isBotMode) {
            if (player1ScoreValue > 21) {
                result.textContent = 'Вы проиграли!';
            } else if (dealerScoreValue > 21 || player1ScoreValue > dealerScoreValue) {
                result.textContent = 'Поздравляем! Вы выиграли!';
            } else if (dealerScoreValue > player1ScoreValue) {
                result.textContent = 'Вы проиграли!';
            } else {
                result.textContent = 'Ничья!';
            }
        } else {
            if (player1ScoreValue > 21 || player2ScoreValue > 21) {
                result.textContent = 'Вы проиграли!';
            } else if (player1ScoreValue > player2ScoreValue) {
                result.textContent = 'Игрок 1 выиграл!';
            } else if (player2ScoreValue > player1ScoreValue) {
                result.textContent = 'Игрок 2 выиграл!';
            } else {
                result.textContent = 'Ничья!';
            }
        }
        drawCardButton.disabled = true;
        passButton.disabled = true;
        drawCardPlayer2Button.disabled = true;
        passPlayer2Button.disabled = true;
    }

    function restartGame() {
        player1Hand = [];
        player2Hand = [];
        dealerHand = [];
        player1ScoreValue = 0;
        player2ScoreValue = 0;
        dealerScoreValue = 0;
        result.textContent = '';
        drawCardButton.disabled = false;
        passButton.disabled = false;
        drawCardPlayer2Button.disabled = false;
        passPlayer2Button.disabled = false;
        isPlayer1Turn = true;
        cards = [2, 3, 4, 6, 7, 8, 9, 10, 11];
        cards = cards.flatMap(card => Array(4).fill(card)); // Восстанавливаем массив карт
        updateUI();
        startIdleTimer();
    }

    document.getElementById('play-with-bot').addEventListener('click', () => {
        isBotMode = true;
        modeSelection.style.display = 'none';
        gameContainer.style.display = 'block';
        document.getElementById('dealer-hand').style.display = 'block';
        document.getElementById('player2-hand').style.display = 'none';
        drawCardPlayer2Button.style.display = 'none';
        passPlayer2Button.style.display = 'none';
        restartGame();
    });

    document.getElementById('play-with-friend').addEventListener('click', () => {
        isBotMode = false;
        modeSelection.style.display = 'none';
        gameContainer.style.display = 'block';
        document.getElementById('dealer-hand').style.display = 'none';
        document.getElementById('player2-hand').style.display = 'block';
        drawCardPlayer2Button.style.display = 'inline-block';
        passPlayer2Button.style.display = 'inline-block';
        restartGame();
    });

    drawCardButton.addEventListener('click', () => {
        if (isPlayer1Turn) {
            let card = drawCard(player1Hand);
            player1ScoreValue = calculateScore(player1Hand);
            updateUI();
            checkResult();
            if (player1ScoreValue < 21) {
                if (isBotMode) {
                    isPlayer1Turn = false;
                    drawCardButton.disabled = true;
                    passButton.disabled = true;
                    dealerTurn();
                } else {
                    isPlayer1Turn = false;
                    drawCardButton.disabled = true;
                    passButton.disabled = true;
                    drawCardPlayer2Button.disabled = false;
                    passPlayer2Button.disabled = false;
                }
            }
            startIdleTimer(); // Перезапуск таймера после хода игрока
        }
    });

    passButton.addEventListener('click', () => {
        if (isPlayer1Turn) {
            if (isBotMode) {
                isPlayer1Turn = false;
                drawCardButton.disabled = true;
                passButton.disabled = true;
                dealerTurn();
            } else {
                isPlayer1Turn = false;
                drawCardButton.disabled = true;
                passButton.disabled = true;
                drawCardPlayer2Button.disabled = false;
                passPlayer2Button.disabled = false;
            }
            startIdleTimer(); // Перезапуск таймера после хода игрока
        }
    });

    drawCardPlayer2Button.addEventListener('click', () => {
        if (!isPlayer1Turn) {
            let card = drawCard(player2Hand);
            player2ScoreValue = calculateScore(player2Hand);
            updateUI();
            checkResult();
            if (player2ScoreValue < 21) {
                isPlayer1Turn = true;
                drawCardButton.disabled = false;
                passButton.disabled = false;
                drawCardPlayer2Button.disabled = true;
                passPlayer2Button.disabled = true;
            }
            startIdleTimer(); // Перезапуск таймера после хода игрока
        }
    });

    passPlayer2Button.addEventListener('click', () => {
        if (!isPlayer1Turn) {
            isPlayer1Turn = true;
            drawCardButton.disabled = false;
            passButton.disabled = false;
            drawCardPlayer2Button.disabled = true;
            passPlayer2Button.disabled = true;
            startIdleTimer(); // Перезапуск таймера после хода игрока
        }
    });

    restartButton.addEventListener('click', restartGame);

    returnToMenuButton.addEventListener('click', () => {
        modeSelection.style.display = 'block';
        gameContainer.style.display = 'none';
    });
});