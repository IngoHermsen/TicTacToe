'use strict'

let name1InputElement = document.getElementById('name1Input');
let name2InputElement = document.getElementById('name2Input');
let showGame = false;
let players = [{ "name": "", "letter": "O" },
{ "name": "", "letter": "X" }];

let currentPlayerIndex;
let winConstellations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function init() {
    shuffleNames();
};


function startGame() {
    setPlayerNames();
    setRandomFirstPlayer();
    toggleStartAndGameScreens();
    renderFirstDialogueHTML();
};


function shuffleNames() {

    let randomNameID = Math.floor(Math.random() * (names.length));

    name1InputElement.value = names[randomNameID][`name1`];
    name2InputElement.value = names[randomNameID][`name2`];

    validateInput();
};


function validateInput() {
    let startButtonElement = document.getElementById('startButton');

    if (name1InputElement.value.length > 0 && name2InputElement.value.length > 0) {
        startButtonElement.classList.remove('d-none');
    } else {
        startButtonElement.classList.add('d-none');
    }

};


function toggleStartAndGameScreens() {
    let startScreenElement = document.getElementById('startScreen');
    let gameElement = document.getElementById('game');

    showGame = !showGame;

    if (showGame) {
        startScreenElement.classList.add('d-none');
    } else {
        startScreenElement.classList.remove('d-none');
    }
};


// [START] "ToDos" after "START GAME"

function setPlayerNames() {
    players[0]["name"] = name1InputElement.value
    players[1]["name"] = name2InputElement.value

};


function setRandomFirstPlayer() {
    let randomNumber = Math.floor(Math.random() * 2);
    currentPlayerIndex = randomNumber;
};


function renderFirstDialogueHTML() {
    let currentPlayerTextElement = document.getElementById('currentPlayerText');

    currentPlayerTextElement.innerHTML = /*html*/ `

    <span class="playersName">${players[currentPlayerIndex]["name"]}</span>, you begin! <br>
    Make your <b class="fs-1 ps-3">${players[currentPlayerIndex]["letter"]}</b>

    `
};


// [END]  "ToDos" after "START GAME"

function setLetter(boxNumber) {
    let selectedBox = document.getElementById(`box${boxNumber}`);

    selectedBox.innerHTML = /*html*/ `
    ${players[currentPlayerIndex]["letter"]}

    `
    selectedBox.classList.add('unselectable');
    checkBoxContent();
};


function checkBoxContent() {
    let currentLetter = players[currentPlayerIndex]["letter"];
    let winnerFound = false;

    for (let i = 0; i < winConstellations.length; i++) {
        let firstBoxElement = document.getElementById(`box${winConstellations[i][0]}`);
        let secondBoxElement = document.getElementById(`box${winConstellations[i][1]}`);
        let thirdBoxElement = document.getElementById(`box${winConstellations[i][2]}`);

        if (firstBoxElement.innerHTML.trim() == currentLetter && secondBoxElement.innerHTML.trim() == currentLetter && thirdBoxElement.innerHTML.trim() == currentLetter) {
            winnerFound = true;
            firstBoxElement.classList.add('orangeColor');
            secondBoxElement.classList.add('orangeColor');
            thirdBoxElement.classList.add('orangeColor');
        };
    }
    checkGameStatus(winnerFound);
};


function checkGameStatus(winnerFound) {
    if (winnerFound) {
        makeAllBoxesUnselectable();
        showEndScreen();
    } else {
        changePlayer();
    }
};


function makeAllBoxesUnselectable() {
    for (let i = 1; i < 10; i++) {
        document.getElementById(`box${i}`).classList.add('unselectable');
    }
};


function changePlayer() {
    currentPlayerIndex = currentPlayerIndex == 0 ? 1 : 0;
    renderDialogueHTML();
};


function renderDialogueHTML() {
    let currentPlayerTextElement = document.getElementById('currentPlayerText');

    currentPlayerTextElement.innerHTML = /*html*/ `

    <span class="playersName">${players[currentPlayerIndex]["name"]}</span>,<br>
    make your <b class="fs-1 ps-3">${players[currentPlayerIndex]["letter"]}</b>

    `
};


function showEndScreen() {
    let textElement = document.getElementById('currentPlayerText');

    textElement.innerHTML = /*html*/ `
    <div class="endScreenText">
        <span class="playersName">${players[currentPlayerIndex]["name"]} </span><br>
        <span>wins!!</span>
    </div>
    `
};

function resetGame() {
    toggleStartAndGameScreens();
    name1InputElement.value = players[0]["name"];
    name2InputElement.value = players[1]["name"];

    
}





