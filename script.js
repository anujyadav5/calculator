const numberBttns = Array.from(document.getElementsByClassName('number'));
const operationBttns = Array.from(document.getElementsByClassName('operation'));

const equalBttn = document.getElementById('equal');
const clearBttn = document.getElementById('clear');
const memory = document.getElementById('memory');
const input = document.getElementById('input');
const deleteBttn = document.getElementById('delete');

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let error = false;

function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function operate(a, b, operation) {
    switch(operation) {
        case '+':
            return roundToFive(add(a, b));
        case '-':
            return roundToFive(subtract(a, b));
        case 'x':
            return roundToFive(multiply(a, b));
        case '/':
            return roundToFive(divide(a, b));
    }
}

numberBttns.forEach(bttn => bttn.addEventListener('click', () => appendNumber(bttn.textContent)));
operationBttns.forEach(bttn => bttn.addEventListener('click', () => storeOperation(bttn.textContent)));
clearBttn.addEventListener('click', () => clearDisplay());
equalBttn.addEventListener('click', () => evaluate());
deleteBttn.addEventListener('click', () => deleteChar());

function appendNumber(num) {
    input.textContent += num;
}


function storeOperation(operation) {
    if (input.textContent == '') return;
    if (input.textContent == '0' && currentOperation == '/') {
        alert('can\'t divide by 0!');
        clearDisplay();
        return
    }
    if (currentOperation != null) evaluate();
    firstOperand = input.textContent;
    currentOperation = operation;
    memory.textContent = `${input.textContent} ${operation}`;
    input.textContent = '';
}

function evaluate () {
    if(currentOperation == null || input.textContent == '') return
    if (input.textContent == '0' && currentOperation == '/') {
        alert('can\'t divide by 0!');
        clearDisplay();
        return
    }
    secondOperand = input.textContent;
    input.textContent = operate(parseInt(firstOperand), parseInt(secondOperand), currentOperation);
    memory.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}


function clearDisplay() {
    input.textContent = '';
    memory.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function deleteChar() {
    input.textContent = input.textContent.split('').slice(0, -1).join('');
}

function roundToFive(num) {
    return Number(Math.round(num + 'e5') + 'e-5');
}