window.onload = function(){ 

    let a = ''
    let b = ''
    let col = 0
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
                outputElement.innerHTML = a
            }
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка изменения знака
    document.getElementById("btn_op_sign").onclick = function() { 
        if (a != '' && b == ''){
            a = (+a) * (-1)
            outputElement.innerHTML = a
        }
        else if (b != ''){
            b = (+b) * (-1)
            outputElement.innerHTML = b
        }
    }
    document.getElementById("btn_op_percent").onclick = function() { 
        if (a != '' && b == ''){
            a = (+a) / (100)
            outputElement.innerHTML = a
        }
        else if (b != ''){
            b = (+b) / (100)
            outputElement.innerHTML = b
        }
    }
    document.getElementById("btn_op_sqr").onclick = function() { 
        if (a != '' && b == ''){
            a = (+a) * (+a)
            outputElement.innerHTML = a
        }
        else if (b != ''){
            b = (+b) * (+b)
            outputElement.innerHTML = b
        }
    }
    document.getElementById("btn_op_sqrt").onclick = function() { 
        if (a != '' && b == ''){
            if (a < 0){
                outputElement.innerHTML = 'error'
                a = ''
            }
            else{
                a = Math.sqrt(a)
                outputElement.innerHTML = a
            }
            
        }
        else if (b != ''){
            if (b < 0){
                outputElement.innerHTML = 'error'
                b = ''
            }
            else{
                b = Math.sqrt(b)
                outputElement.innerHTML = b
            }
        }
    }

    function factorial(x){
        if (x === 0 || x === 1){
            return 1
        }
        else{
            return x*factorial(x-1)
        }
    }
    document.getElementById("btn_op_fact").onclick = function() { 
        if (a != '' && b == ''){
            if (a % 1 != 0 || a < 0){
                a = ''
                outputElement.innerHTML = 'error'
            }
            else{
                a = factorial(a)
                outputElement.innerHTML = a
            }
            
        }
        else if (b != ''){
            if (b % 1 != 0 || b < 0){
                b = ''
                outputElement.innerHTML = 'error'
            }
            else{
                b = factorial(b)
                outputElement.innerHTML = b
            }
        }
    }
    document.getElementById("btn_op_backspace").onclick = function() { 
        a = a.toString()
        b = b.toString()
        if (a != '' && b == ''){
            if (a.length == 1 || (a.length == 2 && a[0] == '-')){
                a = ''
                outputElement.innerHTML = 0
            }
            else{
                a = a.substring(0, a.length - 1)
                outputElement.innerHTML = a
            }
        }
        else if (b != ''){
            if (b.length == 1 || (b.length == 2 && b[0] == '-')){
                b = ''
                outputElement.innerHTML = 0
            }
            else{
                b = b.substring(0, b.length - 1)
                outputElement.innerHTML = b
            }
        }
    }
    document.getElementById("btn_digit_000").onclick = function() {
        a = a.toString()
        b = b.toString()
    
        if (a !== '' && b === '') {
            if (a === '0') 
            {
                a = '0'
                outputElement.innerHTML = a
            } 
                else 
            {
                a = a + '000'
                outputElement.innerHTML = a
            }
        } 
            else if (b !== '') {
            
            if (b === '0') 
                {
                b = '0'
                outputElement.innerHTML = b
            } 
            else 
            {
                b = b + '000'
                outputElement.innerHTML = b
            }
        }
    };
    document.getElementById("btn_digit_0").onclick = function() {
        a = a.toString()
        b = b.toString()
    
        if (a !== '' && b === '') {
            if (a === '0') 
            {
                a = '0'
                outputElement.innerHTML = a
            } 
                else 
            {
                a = a + '0'
                outputElement.innerHTML = a
            }
        } 
            else if (b !== '') {
            
            if (b === '0') 
                {
                b = '0'
                outputElement.innerHTML = b
            } 
            else 
            {
                b = b + '0'
                outputElement.innerHTML = b
            }
        }
    };

    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }




    const btn = document.getElementById('switch')

    btn.addEventListener('click', function() {
        if (col == 0){
            const box = document.getElementById('container')
            box.style.backgroundColor = 'rgb(161, 161, 161)'
            const res = document.getElementById('result')
            res.style.backgroundColor = 'rgb(161, 161, 161)'
            col = 1
        }
        else{
            const box = document.getElementById('container')
            box.style.backgroundColor = 'rgb(255, 255, 255)'
            const res = document.getElementById('result')
            res.style.backgroundColor = 'rgb(255, 255, 255)'
            col = 0
        }
    })

    document.getElementById("btn_op_arcsin").onclick = function() { 
        if (a != '' && b == ''){
            a = Math.asin(a)
            outputElement.innerHTML = a
        }
        else if (b != ''){
            b = Math.asin(b)
            outputElement.innerHTML = b
        }
        const eql = document.getElementById('btn_op_equal')
        eql.style.filter = 'brightness(180%)'
    }
};