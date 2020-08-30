const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll')
const taskList = document.querySelector('#task-list');
let items;

loadItems();
eventListeners();


function eventListeners() {
    form.addEventListener('submit', addNewTask);

    btnDeleteAll.addEventListener('click', deleteAllItems)

    taskList.addEventListener('click', deleteItem);
}

function loadItems() {

    items = getItemsFromLS();
    items.forEach(function(item){
        createItem(item);
    });
}

function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text) {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));
    const a = document.createElement('a');
    a.className = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);

    taskList.appendChild(li);

}

function addNewTask(e) {
    if (input.value === '') {
        alert('add task again');
    }

    createItem(input.value);

    setItemToLS(input.value);

    input.value = '';

    e.preventDefault();
}

function deleteAllItems(e) {
    if (confirm('siliyimmi')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }
    localStorage.clear();
    e.preventDefault();
}

function deleteItem(e) {

    if (e.target.className === 'fas fa-times') {
        if (confirm('siliyimmi')) {
            e.target.parentElement.parentElement.remove();

        }
    }

    deleteItemFromLS(e.target.parentElement.parentElement.textContent);

    e.preventDefault();
}