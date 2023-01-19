class Calculator{
    static operatorList = ["+","-","*","/"];

    static expressionParser(expression){
        let nums = [];
        let ops = [];
    
        for (let i = 0; i < expression.length; i++) {
            if ( isNaN(expression[i]) ) {
                let currOP = expression[i];
                while (ops.length > 0 && this.getPriority(currOP) <= this.getPriority(ops[ops.length - 1])) {
                    this.process(nums, ops[ops.length - 1]);
                    ops.pop();
                }
                ops.push(currOP);
            }
            else {
                let number = '';
                while ( i < expression.length && !isNaN(expression[i]) ) {
                    number += expression[i];
                    i++;
                }
                i--;
                nums.push(number);
            }
        }
        while (ops.length > 0) {
            this.process(nums, ops[ops.length - 1]);
            ops.pop();
        }
        return nums[0];
    }

    // スタックから数字を取り出し、受け取った演算子で計算する関数
    static process(stack, op) {
        const right = parseInt(stack.pop());
        const left = parseInt(stack.pop());
    
        let value = 0;
    
        switch(op) {
            case '+': value = left + right; break;
            case '-': value = left - right; break;
            case '*': value = left * right; break;
            case '/': value = Math.floor(left / right); break;
        }
        stack.push(value);
    }
    
    // 演算子の優先順位を返す関数
    static getPriority(op) {
        if (op == '+' || op == '-') return 1;
        else if (op == '*' || op == '/') return 2;
    }
}


var vm = new Vue({
    el: "#app",
    data() {
        return {
            taxRate: 1.1,
            isTaxIncluded: false,
            expression: "",
            total: "0",
        }
    },
    methods: {
        signInversion: function(){
            if (this.total[0] == "-"){
                this.total = this.total.substring(1);
            } else {
                this.total = "-" + this.total;
            }
        },
        taxIncluded: function(){
            if (this.total.indexOf("-") != -1){
                alert("税金はかけることが不可能です");
            } else if (this.isTaxIncluded == false){
                this.isTaxIncluded = true;
                this.total *= this.taxRate;
                this.total = this.total.toString();
            } else {
                alert("すでに一度税金分が追加されています。")
            }
        },
        taxExcluded: function(){
            if (this.total.indexOf("-") != -1){
                alert("税金は除くことが不可能です");
            } else if (this.isTaxIncluded == true){
                this.isTaxIncluded = false;
                this.total /= this.taxRate;
                this.total = this.total.toString();
            } else {
                alert("最初から税金は含まれておりませんでした。");
            }
        },
        setTaxRate: function(){
            if (Number(this.expression) > 0 && Number(this.expression) <= 100){
                this.taxRate += this.expression / 100;
                this.expression = "";
                alert("税率が設定されました");
            } else {
                alert("現在のディスプレイの数値は、税率には設定できません");
            }
        },
        addOperator: function(operator){
            if (!this.isInputCorrect()){
                alert("計算式の入力が間違っています。\nもう一度入力し直してください");
            } else {
                this.expression = this.expression + operator;
            }
        },
        addOperand: function(operand){
            if (operand == "0"){
                if (this.isInputCorrect()) this.expression = this.expression + operand;
            } else if(operand == ".") {
                if (this.expression.indexOf(".") == -1) this.expression = this.expression + operand;
            } else {
                this.expression = this.expression + operand;
            }
        },
        clear: function(){
            this.expression = this.expression.substring(0, this.expression.length-1);
        },
        allClear: function(){
            this.total = "0";
            alert("計算がすべてリセットされました");
        },
        displayOutput: function(){
            if (!this.isInputCorrect()){
                alert("計算式の入力が間違っています。\nもう一度入力し直してください");
            } else {
                this.total = Calculator.expressionParser(this.expression).toString();
                this.expression = "";
            }
        },
        isInputCorrect: function(){
            if (this.expression.length < 1 || Calculator.operatorList.indexOf(this.expression[this.expression.length-1]) != -1){
                return false;    
            } else {
                return true;
            }

        }
    },
    //totalとexpressionに文字数の制限をつける(未完成)
    filters: {
        number_format: function(val){
            if (val.length > 13) return val.substring(0,13);
            return val;
        }
    }
});