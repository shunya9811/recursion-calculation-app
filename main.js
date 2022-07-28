function calculator(op1,op2,operator){
    op1 = parseInt(op1);
    op2 = parseInt(op2);
    
    if(operator === '+') return op1 + op2;
    if(operator === '-') return op1 - op2;
    if(operator === '*') return op1 * op2;
    if(operator === '/') return op1 / op2;

    return NaN;
}

let op1 = document.getElementById("input1");
let op2 = document.getElementById("input2");

let total = document.getElementById("total");

//足し算
document.getElementById("plusOperator").addEventListener("click", function(){total.value = calculator(op1.value,op2.value,"+")});

//引き算
document.getElementById("minusOperator").addEventListener("click", function(){total.value = calculator(op1.value,op2.value,"-")});

//掛け算
document.getElementById("timesOperator").addEventListener("click", function(){total.value = calculator(op1.value,op2.value,"*")});

//割り算
document.getElementById("divideOperator").addEventListener("click", function(){total.value = calculator(op1.value,op2.value,"/")});