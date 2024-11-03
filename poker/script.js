javascript
const deck = [
    '2♠️', '2♥️', '2♦️', '2♣️',
    '3♠️', '3♥️', '3♦️', '3♣️',
    '4♠️', '4♥️', '4♦️', '4♣️',
    '5♠️', '5♥️', '5♦️', '5♣️',
    '6♠️', '6♥️', '6♦️', '6♣️',
    '7♠️', '7♥️', '7♦️', '7♣️',
    '8♠️', '8♥️', '8♦️', '8♣️',
    '9♠️', '9♥️', '9♦️', '9♣️',
    '10♠️', '10♥️', '10♦️', '10♣️',
    'J♠️', 'J♥️', 'J♦️', 'J♣️',
    'Q♠️', 'Q♥️', 'Q♦️', 'Q♣️',
    'K♠️', 'K♥️', 'K♦️', 'K♣️',
    'A♠️', 'A♥️', 'A♦️', 'A♣️',
];

let player1Hand = [];
let player2Hand = [];
let communityCards = [];

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCards() {
    shuffleDeck();
    player1Hand = [deck.pop(), deck.pop()];
    player2Hand = [deck.pop(), deck.pop()];
    communityCards = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];
    
    displayHands();
    displayCommunityCards();
    document.getElementById('determine-winner-button').disabled = false;
}

function displayHands() {
    document.getElementById('hand1').innerText = player1Hand.join(', ');
    document.getElementById('hand2').innerText = player2Hand.join(', ');
}

function displayCommunityCards() {
    document.getElementById('community-cards').innerText = communityCards.join(', ');
}

function determineWinner() {
    const player1Score = calculateScore(player1Hand);
    const player2Score = calculateScore(player2Hand);
    
    const winnerText = player1Score > player2Score ? "Игрок 1 выигрывает!" : player1Score < player2Score ? "Игрок 2 выигрывает!" : "Ничья!";
    
    document.getElementById('winner').innerText = winnerText;
}

function calculateScore(hand) {
    // Для упрощения, будем считать, что наивысшая карта - это победа
    const values = hand.map(card => card.slice(0, -1));
    const score = values.reduce((acc, val) => acc + cardValue(val), 0);
    return score;
}

function cardValue(card) {
    const value = card.replace(/[♠️♥️♦️♣️]/, '');
    // Преобразуем карты в числовое значение
    if (value === 'A') return 14;
    if (value === 'K') return 13;
    if (value === 'Q') return 12;
    if (value === 'J') return 11;
    return parseInt(value);
}

document.getElementById('deal-button').addEventListener('click', dealCards);
document.getElementById('determine-winner-button').addEventListener('click', determineWinner);
