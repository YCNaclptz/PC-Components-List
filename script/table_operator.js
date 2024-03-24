let table = document.querySelector('#edit-panel table');
let tbody = table.querySelector('tbody'); 
let rowTemplate = newRow();
function addTrClass(){
    let evenTr = document.querySelectorAll('#edit-panel table tbody tr:nth-child(even)');
    let oddTr = document.querySelectorAll('#edit-panel table tbody tr:nth-child(odd)');
    evenTr.forEach(ele=>ele.classList.add('table-primary'));
    oddTr.forEach(ele=>ele.classList.add('table-light'));
}
function addCellClass(){
    let itemCells = document.querySelectorAll('#edit-panel table tbody tr :nth-child(n+2)');
    itemCells.forEach(ele=>ele.classList.add('text-center'));
}
function addRow(){
    let tempRow = rowTemplate.cloneNode(true);
    tempRow.querySelectorAll('[numcheck=true]').forEach(txt=>{
        txt.addEventListener('input', checkNum);
    });
    tempRow.querySelectorAll('#amount,#price').forEach(txt=>{
        txt.addEventListener('blur', sumPrice);
    });
    tbody.appendChild(tempRow);
    addTrClass();
}

function newRow(){
    let tempRow = table.rows[1].cloneNode(true);
    let txts = tempRow.querySelectorAll('input');
    txts.forEach(txt => txt.value = '');
    tempRow.className = '';

    return tempRow;
}
function clearAllRows(){
    tbody.innerHTML = '';
}

function checkNum() {
    let txtValue = this.value;
    let regex = /\D+/g
    this.value = txtValue.replace(regex, '');
}
function sumPrice(){
    let row = this.closest('tr');
    let amount = row.querySelector('#amount');
    let price = row.querySelector('#price');
    let sum = row.querySelector('#sum');
    let sumProxy = sumProxyFactory(sum);
    if (price.value.trim() && amount.value.trim()){
        sumProxy.value = parseInt(amount.value) * parseInt(price.value);
    }
}

function sumProxyFactory(txtSum){
    let proxy = new Proxy(txtSum, {
        get(obj, prop){
            return obj[prop];
        },
        set(obj, prop, value){
            obj[prop] = value;
            calcTotal();
            return true;
        }
    });
    return proxy;
}
function calcTotal(){
    let sums = document.querySelectorAll('#sum');
    let total = document.querySelector('#total');
    let iTotal = 0;
    sums.forEach(s=>{
        if(s.value.trim()){
            iTotal += parseInt(s.value);
        }
    });
    total.value = iTotal;
}
export {addRow, addCellClass, clearAllRows, addTrClass};

