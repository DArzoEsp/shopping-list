// const listItems = document.querySelectorAll('.items li'); cannot use querySelectorAll because it returns a static nodelist meaning it cannot be changed

const itemForm = document.getElementById('item-form');
const listItems = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const itemFilter = document.getElementById('filter');
const priorityInput = document.getElementById('priority-input');
const clearBtn = document.querySelector('.btn-clear');

// Event Listeners
itemInput.addEventListener('focus', onFocus);
itemInput.addEventListener('blur', onBlur);   // for styling purposes

itemInput.addEventListener('input', input);   // looks for when we type
itemForm.addEventListener('submit', onSubmit);  // looks at when we submit

listItems.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems)


// adds styling on search bar
function onFocus() {
  itemInput.style.outlineStyle = 'solid';
  itemInput.style.outlineWidth = '2px';   // styling the outline
  itemInput.style.outlineColor = 'green';
}

// removes styling on search bar
function onBlur() {
  itemInput.style.outlineStyle = 'none'; 
}

// checks for when the user types
function input(e) {
  const itemName = e.target.value;  // what helps look for what we type in real time
}

// clears items
function clearItems() {
  while(listItems.firstChild) {
    listItems.removeChild(listItems.firstChild);
  }
  checkUI();
} 

// removes any item when clicking the red "x"
function removeItem(e) {
  const icon = listItems.querySelector('i');
  const removeItem = listItems.querySelector('button');
  const removeButton = e.target;
  if(removeButton.className === icon.className) {
    removeItem.parentElement.remove();
  }
}

// adds an item when the user submits
function onSubmit(e) {
  e.preventDefault();
  const item = document.getElementById('item-input').value;
  const priority = document.getElementById('priority-input').value;

  if(item === '' || priority === '0') {
    alert('Please fill all fields');
    return;
  }

  createNewItemList(item) // calls the function to add to the new list
  checkUI();
  itemInput.value = '';
}

// creates an the appropriate button with the same attributes and whatever the user inputted when submitting 
function createNewItemList(item) {
  const newItem = document.createElement('li');
  const button = document.createElement('button'); // creating button element
  const icon = document.createElement('i');  //creating icon element

  button.className = 'remove-item btn-link text-red'; // setting classes to each element
  icon.className = 'fa-solid fa-xmark';

  newItem.innerHTML = `${item}`
  button.appendChild(icon);       // nests the icon into the button with all element and class
  newItem.appendChild(button);    // nests the button into a list with all element and all classes
  listItems.appendChild(newItem); // adds the newItem into the listItems with the same attributes          // creates the proper nested element with the right input data
  checkUI();
}

// checks to see if there are any items on list -- if not then removes 'filter' and 'clear all'
function checkUI() {
  const list = document.querySelectorAll('li');
  
  if(list.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

checkUI();