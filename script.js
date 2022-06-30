const numberBttns = Array.from(document.getElementsByClassName('number'));
const operationBttns = Array.from(document.getElementsByClassName('operation'));

const equalBttn = document.getElementById('equal');
const clearBttn = document.getElementById('clear');
const memory = document.getElementById('memory');
const input = document.getElementById('input');

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;

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
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);        
    }
}

numberBttns.forEach(bttn => bttn.addEventListener('click', () => appendNumber(bttn.textContent)));
operationBttns.forEach(bttn => bttn.addEventListener('click', () => storeOperation(bttn.textContent)));
clearBttn.addEventListener('click', () => clearDisplay());
equalBttn.addEventListener('click', () => {
    evaluate();
});


function appendNumber(num) {
    input.textContent += num;
}


function storeOperation(operation) {
    if (currentOperation != null) {
        evaluate();
    }
    firstOperand = input.textContent;
    currentOperation = operation;
    memory.textContent = `${input.textContent} ${operation}`;
    input.textContent = '';
}

function evaluate () {
    if(currentOperation == null) return
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