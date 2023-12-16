// const listItems = document.querySelectorAll('.items li'); cannot use querySelectorAll because it returns a static nodelist meaning it cannot be changed

const itemForm = document.getElementById('item-form');
const listItems = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const priorityInput = document.getElementById('priority-input');
const list = document.querySelectorAll('ul');
const clearBtn = document.querySelector('.btn-clear')
const newItem = document.createElement('li');

itemInput.addEventListener('focus', onFocus);
itemInput.addEventListener('blur', onBlur);   // for styling purposes

itemInput.addEventListener('input', input);   // looks for when we type
itemForm.addEventListener('submit', onSubmit);  // looks at when we submit

clearBtn.onclick = () => list.forEach(item => item.remove()); 

function onFocus() {
  itemInput.style.outlineStyle = 'solid';
  itemInput.style.outlineWidth = '2px';   // styling the outline
  itemInput.style.outlineColor = 'green';
}

function onBlur() {
  itemInput.style.outlineStyle = 'none'; 
}

function input(e) {
  const itemName = e.target.value;  // what helps look for what we type in real time
}

function onSubmit(e) {
  // const item = formData.get('item');         get value with these different methods
  // const priority = formData.get('priority');
  // const formData =  new FormData(itemForm);
  // const entries = formData.entries();
  // for(let entry of entries) { 
  //   console.log(entry);
  // }

  e.preventDefault();
  const item = document.getElementById('item-input').value;
  const priority = document.getElementById('priority-input').value;

  if(item === '' || priority === '0') {
    alert('Please fill all fields');
    return;
  }

  createNewItemList(item);
}

function nestedListElement(item) {
  const button = document.createElement('button'); // creating button element
  const icon = document.createElement('i');  //creating icon element

  button.className = 'remove-item btn-link text-red'; // setting classes to each element
  icon.className = 'fa-solid fa-xmark';

  newItem.innerHTML = `${item}`
  button.appendChild(icon);
  newItem.appendChild(button);
  listItems.appendChild(newItem);
}

function createNewItemList(item) {
  nestedListElement(item);          // creates the proper nested element with the right input data
  console.log(newItem);
}