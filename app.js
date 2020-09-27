const todoForm = document.querySelector('#todo-form');
const itemInput = document.querySelector('#todo-input');
const list = document.querySelector('#list-group');
const container = document.querySelector('.container-cls');
const removeButtons = document.querySelectorAll('[data-item-id]');
const clear = document.querySelector('#clear');
let currentLocalSet = [];

document.addEventListener('DOMContentLoaded', (e) => {
  list.addEventListener('click', removeItem);
  todoForm.addEventListener('submit', addItem);
  clear.addEventListener('click', clearAll);
  refreshItems();
});

function addItem(e) {
  let itemInputVal = itemInput.value;
  let currentLocalValue = localStorage.getItem('todo-items');

  currentLocalValue === null
    ? (currentLocalSet = [])
    : (currentLocalSet = JSON.parse(currentLocalValue));

  if (itemInputVal != '') {
    itemInput.value = '';
    currentLocalSet.push({ content: itemInputVal, check: false });
    localStorage.setItem('todo-items', JSON.stringify(currentLocalSet));
  } else {
    showAlert('Boş geçilemez', 'warning');
  }
  e.preventDefault();
  refreshItems();
}

function refreshItems() {
  let getItems = JSON.parse(localStorage.getItem('todo-items'));
  const items = [];
  let html = '';
  getItems.forEach((e, i) => {
    items.push(`<li href="#" class="list-group-item">
       ${e.content} 

    <span id="removeItem" class=" btn btn-danger btn-sm float-right"  data-index="${i}">
    <i  class="fas fa-times-circle" style="pointer-events:none"></i>
   
    </span> </li>`);
  });
  items.reverse();
  items.map((e) => {
    html += e;
  });

  list.innerHTML = html;
}

function showAlert(alertMessage, alertType) {
  let alertNode = document.createElement('div');
  alertNode.className = `alert alert-${alertType}`;
  alertNode.innerText = alertMessage;

  container.insertBefore(alertNode, container.firstChild);
  setInterval(() => {
    alertNode.remove();
  }, 2000);
}

function removeItem(e) {
  if (e.target.id === 'removeItem') {
    console.log(e.target.dataset.index);
    let getItems = JSON.parse(localStorage.getItem('todo-items'));
    getItems.splice(e.target.dataset.index, 1);
    localStorage.setItem('todo-items', JSON.stringify(getItems));
    refreshItems();
  }
}

function clearAll() {
  localStorage.removeItem('todo-items');
  location.reload();

  refreshItems();
}
