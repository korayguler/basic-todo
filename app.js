const todoForm = document.querySelector('#todo-form');
const itemInput = document.querySelector('#todo-input');
const list = document.querySelector('#list-group');

const removeButtons = document.querySelectorAll('[data-item-id]');
let currentLocalSet = [];
todoForm.addEventListener('submit', addItem);

document.addEventListener('DOMContentLoaded', (e) => {
  refreshItems();
});

function addItem(e) {
  let itemInputVal = itemInput.value;
  let currentLocalValue = localStorage.getItem('todo-items');

  currentLocalValue === null
    ? (currentLocalSet = [])
    : (currentLocalSet = JSON.parse(currentLocalValue));

  if (itemInputVal != '') {
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
  let html = ' ';
  getItems.forEach((e, i) => {
    items.push(`<a href="#" class="list-group-item list-group-item-action p-">
       ${e.content} 
      <button class="btn btn-outline-danger btn-sm float-right" data-item-id="${i}"> <i class="fas fa-times-circle"></i></button>
       </i>`);
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
  console.log(e);
  e.preventDefault();
  if (false) {
    e > -1 ? currentLocalSet.splice(e, 1) : showAlert('opps.!!', 'danger');
    localStorage.setItem = JSON.stringify(currentLocalSet);
    refreshItems();
  }
}
