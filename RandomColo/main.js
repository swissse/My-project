const buttton = document.getElementById("btn");
const color = document.querySelector(".color");

const hex = [
    '0', "1", '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
];

buttton.addEventListener("click", () => {
    let hexColor = generateHex();
    document.body.style.backgroundColor = hexColor;
    color.textContent = hexColor;
});

function generateHex() {
    let hexColor = '#';
    for (let i = 0; i < 6; i++) {
        hexColor += hex[getRandomNamber()];
    }

    return hexColor;
}

function getRandomNamber() {
    return Math.floor(Math.random() * hex.length);
}