const buttons = document.querySelectorAll('.btn');
const number = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');

const btnArr = Array.from(buttons);
const calcNums = Array.from(number);
const operator = Array.from(operators);
const calcEdit = btnArr.filter((num, i) => (i < 3 || i === 17));

const numArray = [];
const sumArray = [];
const opSelected = [];
const op = ['+', '-', '*', '/'];
const lastInput = [];

const MAX_DISPLAY_LENGTH = 10;
let num = 0;
let result = 0;
let counter = 1;

const display = document.querySelector('.calc-display');
const displayText = document.querySelector('.text');
displayText.textContent = '0';

for(let i = 0; i < calcNums.length; i++){
    calcNums[i].addEventListener('click', function() {
        if(counter <= 8){
            if(displayText.textContent === '0' 
            || (sumArray.length === 1 
            && op.some(r => lastInput[lastInput.length-1] === r))) displayText.textContent = '';
            if(lastInput[lastInput.length-1] === '='){
                reset();
                displayText.textContent = '';
            }
            numArray.push(+calcNums[i].textContent);
            num = +numArray.join('');
            displayText.textContent += numArray[numArray.length-1];
            lastInput.push(+calcNums[i].textContent);
            counter++;
        }
        expNotate();
    });
}

for(let i = 0; i <  calcEdit.length; i++){
    calcEdit[i].addEventListener('click', function() {
        if(i === 0) {
            displayText.textContent = '0';
            reset();
        }
        if(i === 1) {
            displayText.textContent = num * -1;
            num *= -1;
        }
        if(i === 2){
            num /= 100;
            displayText.textContent = num;
        }
        if(i === 3) {
            if(!displayText.textContent.includes('.')){
                num += '.';
                numArray.push('.');
                console.log(numArray);
                displayText.textContent = num;
                num = +num;
            }
        }
    });
}

for(let i = 0; i < operator.length; i++){
    operator[i].addEventListener('click', function() {
        if(lastInput[lastInput.length-1] === '='){
            num = sumArray[0];
            opSelected[opSelected.length-1] = i;
        }
        else if(sumArray.length === 1){
            sumArray[1] = num;
            result = sumArray.reduce((total, current) => operate(total, operator[opSelected[opSelected.length-1]].textContent, current));
            displayText.textContent = result;
            sumArray[0] = result;
            sumArray.splice(1, 1);
        }
        if(sumArray.length === 0){
            sumArray[0] = num;
        } 
        expNotate();
        percentNum = num;
        num = 0;
        numArray.splice(0, numArray.length);
        opSelected.push(i);
        lastInput.push(operator[i].textContent);
        counter = 1;
    });
}

const reset = function() {
    numArray.splice(0, numArray.length);
    sumArray.splice(0, sumArray.length);
    lastInput.splice(0, lastInput.length);
    num = 0;
    result = 0;
    counter = 1;
}

const expNotate = function(){
    if(displayText.textContent.length > MAX_DISPLAY_LENGTH){
        displayText.textContent = 
            displayText.textContent.slice(0, 
            -(displayText.textContent.length - MAX_DISPLAY_LENGTH + 1)) 
            + 'e' 
            + (displayText.textContent.length - MAX_DISPLAY_LENGTH + 1);
    }
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, operator, b) {
    if(operator === op[0]) return add(a, b);
    if(operator === op[1]) return subtract(a, b);
    if(operator === op[2]) return multiply(a, b);
    if(operator === op[3]) return divide(a, b);
}