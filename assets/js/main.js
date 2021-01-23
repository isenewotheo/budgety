class Make {
    add(desc, amt, type) {
        let elem = document.createElement('LI');
        let description = document.createElement('div');
        let amount = document.createElement('div');
        let close = document.createElement('button');
        elem.appendChild(description);
        elem.appendChild(amount);
        elem.appendChild(close);
        elem.id = amt;
        close.textContent = 'X';
        description.textContent = desc;
        if (type === 'income') {
            amount.textContent = `+${amt}`;
            amount.style.color = 'rgb(46, 168, 46)';
        } else {
            amount.textContent = `-${amt}`;
            amount.style.color = 'rgb(252, 58, 58)';
        }
        return elem;
    }
}

let assets = document.querySelectorAll('.total-asset')[0];
let totalIncome = document.querySelector('#income');
let totalExpenses = document.querySelector('#expenses');
let selection = document.querySelector('#selection');
let input = document.querySelector('#input-desc');
let amount = document.querySelector('#input-value');
let incomeList = document.querySelector('.income-field ul');
let expenseList = document.querySelector('.expense-field ul');
let addButton = document.querySelector('#add');
let list = document.querySelectorAll('.list');

function updateAssets(income, expense){
    assets.innerHTML = income - expense;
}
function updateIncome(a){
    let bal = parseInt(totalIncome.innerHTML);
    let income = parseInt(a);
    let newBal = bal + income;
    totalIncome.innerHTML = newBal;
    let expense = parseInt(totalExpenses.innerHTML);
    updateAssets(newBal, expense);
}
function updateExpenses(a){
    let bal = parseInt(totalExpenses.innerHTML);
    let expense = parseInt(a);
    let newBal = bal + expense;
    totalExpenses.innerHTML = newBal;
    let income = parseInt(totalIncome.innerHTML);
    updateAssets(income, newBal);
}

expenseList.addEventListener('click', e => {
    console.log(e.target.id)
});

function init(){
    if (selection.value === 'income') {
        if (isNaN(amount.value) || amount.value === "" || input.value === '') {
            amount.value = '';
            alert('Please input a number here');
        } else {
            const make = new Make();
            const made = make.add(input.value, amount.value, 'income')
            incomeList.appendChild(made);
            input.value = '';
            amount.value = '';
            updateIncome(made.id);
        }
    } else {
        if (isNaN(amount.value) || amount.value === "" || input.value === '') {
            amount.value = '';
            alert('Please input a number here');
        } else {
            const make = new Make();
            const made = make.add(input.value, amount.value, 'expense')
            expenseList.appendChild(made);
            input.value = '';
            amount.value = '';
            updateExpenses(made.id);
        }
    }
}

addButton.addEventListener('click', init);

function removeIncome(e) {
    if (e.target.tagName = 'BUTTON') {
        // get income holder 
        let inc = parseInt(totalIncome.innerHTML);
        console.log(inc);
        // remove the current amount from income holder
        let at = parseInt(e.target.parentElement.id);
        console.log(at);
        totalIncome.innerHTML = inc - at;
        // call updateAssets func 
        let i = parseInt(totalIncome.innerHTML);
        let ex = parseInt(totalExpenses.innerHTML);
        updateAssets(i, ex);
        // then remove the <li>
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    } else {
        return
    }
}

list[0].addEventListener('click', removeIncome);

function removeExpense(e) {
    if (e.target.tagName = 'BUTTON') {
        // get expense holder 
        let exp = parseInt(totalExpenses.innerHTML);
        // remove the current amount from income holder
        let at = parseInt(e.target.parentElement.id);
        console.log(at);
        totalExpenses.innerHTML = exp - at;
        // call updateAssets func 
        let i = parseInt(totalIncome.innerHTML);
        let ex = parseInt(totalExpenses.innerHTML);
        updateAssets(i, ex);
        // then remove the <li>
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    } else {
        return
    }
}

list[1].addEventListener('click', removeExpense);
