let inputOrderId = document.querySelector('#order-id');
let price = document.querySelector('#price');
let dish = document.querySelector('#dish');
let table = document.querySelector('#table');
let addBtn = document.querySelector('button[type="submit"]');
let orderList = document.querySelector('.order-list');
let table1 = document.querySelector('.table1');
let table2 = document.querySelector('.table2');
let table3 = document.querySelector('.table3');

// Event Handlers
window.addEventListener('DOMContentLoaded', getOrders);
addBtn.addEventListener('click', addOrder);
orderList.addEventListener('click', updateOrder);
orderList.addEventListener('click', deleteOrder);

let isUpdating = false;

let generateHtml = (id, price, dish, table) => {
    let output = `<li id="${id}">
                    <span>${price} - ${dish} - ${table}</span>
                    <span>
                        <button id="${id}" class="edit">Edit</button>
                        <button id="${id}" class="delete">Delete</button>
                    </span>
                </li>`;
    output = `<li class="list-group-item d-flex justify-content-between align-items-center" id="${id}">
                <div>${price} - ${dish} - ${table}</div>
                <div>
                    <button type="button" id="${id}" class="btn btn-outline-success btn-sm edit">Success</button>
                    <button type="button" id="${id}" class="btn btn-outline-danger btn-sm delete">Danger</button>
                </div>
            </li>`
    return output;
    orderList.innerHTML += output;
}

function setInputValues(i = '', p = '', d = '', t = '') {
    inputOrderId.value = i;
    price.value = p;
    dish.value = d;
    table.value = t;
}

async function getOrders() {
    try {
        let response = await axios.get('http://localhost:3000/orders');
        response.data.forEach(order => {
            if (order.table == 'Table 1') {
                let output = generateHtml(order.id, order.price, order.dish);
                table1.innerHTML += output;
            } else if (order.table == 'table2') {
                let output = generateHtml(order.id, order.price, order.dish);
                table2.innerHTML += output;
            } else {
                let output = generateHtml(order.id, order.price, order.dish);
                table3.innerHTML += output;
            }
        })
    } catch (err) {
        console.log(err);
    }
}

async function addOrder(e) {
    e.preventDefault();
    if (price && dish && table) {
        let orderObj = {
            "price": price.value,
            "dish": dish.value,
            "table": table.value
        }
        if (isUpdating) {
            try {
                let response = await axios.put(`http://localhost:3000/orders/${inputOrderId.value}`, orderObj);
                setInputValues();
                window.location.reload();
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                let response = await axios.post('http://localhost:3000/orders', orderObj);
                generateHtml(response.data.id, response.data.price, response.data.dish, response.data.table);
                setInputValues();
            } catch (err) {
                console.log(err);
            }
        }
    }
}

async function updateOrder(e) {
    if (e.target.classList.contains('edit')) {
        const id = e.target.getAttribute('id');
        try {
            let response = await axios.get(`http://localhost:3000/orders/${id}`);
            setInputValues(response.data.id, response.data.price, response.data.dish, response.data.table);
            isUpdating = true;
        } catch (err) {
            console.log(err);
        }
    }
}

async function deleteOrder(e) {
    if (e.target.classList.contains('delete')) {
        const id = e.target.getAttribute('id');
        try {
            let response = await axios.delete(`http://localhost:3000/orders/${id}`);
            e.target.parentElement.parentElement.remove();
        } catch (err) {
            console.log(err);
        }
    }
}