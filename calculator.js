

let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        //not a number
        handleSymbol(value);
    } else {
        //number
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol (symbol) {
    
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if ( previousOperator === null ) {
                //need two number to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':           
        case '−':
        case '×':   
        case '÷':
            handleMath(symbol);
            break;
    }
    
}

function handleMath (symbol) {
    
    if (buffer === '0'){
        //do nothing
       return;
    }
    
    const intBuffer = +buffer; //+buffer === parseInt(buffer)     turn a string into a number
    
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        
        flushOperation (intBuffer);
    }
    
    previousOperator = symbol;
    
    buffer = '0';
}

function flushOperation (intBuffer) {
    
    
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
    
}

function handleNumber (numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function(e) {
            buttonClick(e.target.innerText);
        });

}

init();

