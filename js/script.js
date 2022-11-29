'use strict'
let name1InputElement = document.getElementById('name1Input');
let name2InputElement = document.getElementById('name2Input');


function init() {
    showStartScreen();
    shuffleNames();
    
}


function showStartScreen() {

}

function shuffleNames() {

    let randomNameID = Math.floor(Math.random() * (names.length));
    let randomNameNumber1 = Math.ceil(Math.random() * 2);
    let randomNameNumber2 = (randomNameNumber1 == 2) ? 1 : 2; 

    name1InputElement.value = names[randomNameID][`name${randomNameNumber1}`];
    name2InputElement.value = names[randomNameID][`name${randomNameNumber2}`];

    validateInput();
}

function validateInput() {
    let startButtonElement = document.getElementById('startButton');

    if(name1InputElement.value.length > 0 && name2InputElement.value.length > 0) {
        startButtonElement.classList.remove('d-none');
    } else {
        startButtonElement.classList.add('d-none');
    }

}