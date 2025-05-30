//Pseudocode 
// when a button is clicked it should appear on the display
// as soon as an operand is pressed the operandPressed should become true
// when equals is pressed the entered text is sent to operate() function
// the operate() separates the two numbers in different variables
// the respective function is called by looking at the operand
// the returned value is displayed
// if after the 2nd number another operand is pressed, it should first evaluate the first 2 numbers then take up another number
// This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.
// the calculation will have 3 variables
// the operate function is the main function that will call the other functions
let display = document.querySelector(".display");
let output = document.createElement("h1");
output.setAttribute("class", "output");
let keypad = document.querySelector(".keypad");
let buttons = document.querySelectorAll(".button")

const operands = ["+", "-", "X", "/"];
let pointpressed = false;
let operandPressed = false; 
let justEvaluated = false;


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let btn = button.value;
        // when pressed equals
        if(btn === "=") {
            operate();
        }
        if(btn === "clear") {
            output.textContent = "";
            operandPressed = false;
            pointpressed = false;
            justEvaluated = false;
            return
        }
        if (btn === "backspace") {
            let current = output.textContent;
            if(current.length > 0) {
                let lastChar = current.slice(-1);
                if(operands.includes(lastChar)) {
                    operandPressed = false;
                }
                if(lastChar === ".") {
                    pointpressed = false;
                }
                output.textContent = current.slice(0, -1);
            }
            return;
        }
        // only 1 operand
      if (operands.includes(btn)) {
    // Check if an operator already exists and we have two numbers
    let str = output.textContent;
    let idx = -1;

    for (let i = 0; i < str.length; i++) {
        if (operands.includes(str[i])) {
            idx = i;
            break;
        }
    }

    if (operandPressed && idx !== -1 && idx < str.length - 1) {
        operate(); // evaluate current expression like 1+1
        str = output.textContent; // update str to the result
    }

    operandPressed = true;
    pointpressed = false;
    justEvaluated = false;
    output.textContent = output.textContent + btn;
    display.appendChild(output);
    return;
}

        // only 1 decimal point
        if(btn === "." && pointpressed == false) {
            pointpressed = true;
            output.textContent = output.textContent + btn;
            display.appendChild(output);
            return;
        }
        //all the numbers
        if(btn >= 0 && btn <= 9) {
            if (justEvaluated) {
                output.textContent = "";
                justEvaluated = false;
                operandPressed = false;
                pointpressed = false;
            }

            output.textContent = output.textContent + btn;
            display.appendChild(output);
            return;
        }

    });
})

function operate() {
    //finding the index of the operator and splitting the text
    let str = output.textContent;
    let idx;
    for(let i=0; i<str.length; i++) {
        if (operands.includes(str[i])) {
            idx = i;
        }
    }
    let firstNum = parseFloat(str.slice(0, idx));
    let secondNum = parseFloat(str.slice(idx+1));
    let op = str[idx];

    //checking the type of operand
    switch (op) {
        case '+': { 
            add(firstNum, secondNum);
            break;
        }
        case '-':
            subtract(firstNum, secondNum);
            break;
        case 'X':
            multiply(firstNum, secondNum);
            break;
        case '/':
            divide(firstNum, secondNum);
            break;
        default:
            break;
    }
    
}

function add(a, b) {
     result(a + b);
     return;
}

function subtract(a, b) {
    result(a-b);
    return;
}

function multiply(a, b) {
    result(a*b);
    return;
}

function divide(a, b) {
    result(a/b);
    return;
}

function result(ans) {
    output.textContent = ans;
    justEvaluated = true;
}
