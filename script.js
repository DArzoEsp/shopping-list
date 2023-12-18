// const listItems = document.querySelectorAll('.items li'); cannot use querySelectorAll because it returns a static nodelist meaning it cannot be changed
const itemForm = document.getElementById('item-form');
const listItems = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const itemFilter = document.getElementById('filter');
const clearBtn = document.querySelector('.btn-clear');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach(item  => createNewItemList(item));
  checkUI();
}

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
  
  
  // clears from local storage
  localStorage.removeItem('items');

  checkUI();
} 

function setItemToEdit(item) {
  isEditMode = true;

  listItems.querySelectorAll('li');

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"dit></i> Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

// what is clicked
function onClickItem(e) {
  if(e.target.parentElement.classList.contains('remove-item')) removeItem(e.target.parentElement.parentElement); // element to remove
  else setItemToEdit(e.target);
}

// removes any item when clicking the red "x"
function removeItem(item) {
  if(confirm('Are you sure?')) {
    // removes from DOM
    item.remove();

    //removes from storage
    removeItemFromStorage(item.textContent)

    checkUI();
  }
}

// Removes from storage
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter(i => i !== item);

  //Re-set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));

  checkUI();
}

// filters list
function filterItems(e) {
  const filter = e.target.value.toLowerCase();
  const list = listItems.querySelectorAll('li');

  list.forEach(item => {
    const itemName = item.innerText; // comparing this to every item on list

    if(itemName.indexOf(filter) != -1) { // if not equal to -1 then that means the input is a valid and can search thru the list
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// adds an item when the user submits
function onSubmitAddItem(e) {
  e.preventDefault();
  const item = itemInput.value;

  if(item === '') {
    return alert('Please fill all fields');
  }

  // Check for edit mode
  if(isEditMode) {
    const itemToEdit = listItems.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode')
    itemToEdit.remove();
    isEditMode = false;
  } else if(checkIfItemExists(item)) return alert('that item already exists!');

  // Create item DOM element
  createNewItemList(item);

  // Add item to local storage
  addItemToStorage(item);

  checkUI();
  itemInput.value = '';
}

// check if item exists
function checkIfItemExists(item) {
  return getItemsFromStorage().includes(item);
}

// adding item to local storage
function addItemToStorage(item) {
  const itemFromStorage = getItemsFromStorage();

  // add new item to array
  itemFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function getItemsFromStorage() {
  let itemFromStorage;
  
  if(localStorage.getItem('items') === null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  checkUI();

  return itemFromStorage;
}

// checks to see if there are any items on list -- if not then removes 'filter' and 'clear all'
function checkUI() {
  itemInput.value = '';

  const list = document.querySelectorAll('li');

  if(list.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  formBtn.innerHTML ='<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333'

  isEditMode = false;
}

// creates an the appropriate button with the same attributes and whatever the user inputted when submitting 
function createNewItemList(item) {
  const newItem = document.createElement('li');
  const button = document.createElement('button'); // creating button element
  const icon = document.createElement('i');  //creating icon element
  newItem.appendChild(document.createTextNode(item));

  button.className = 'remove-item btn-link text-red'; // setting classes to each element
  icon.className = 'fa-solid fa-xmark';

  // newItem.innerHTML = `${item}`
  button.appendChild(icon);       // nests the icon into the button with all element and class
  newItem.appendChild(button);    // nests the button into a list with all element and all classes
  listItems.appendChild(newItem); // adds the newItem into the listItems with the same attributes          // creates the proper nested element with the right input data
  checkUI();
}

// initialize app
function init() {
  // Event Listeners
  itemInput.addEventListener('focus', onFocus);
  itemInput.addEventListener('blur', onBlur);   // for styling purposes
  itemInput.addEventListener('input', input);   // looks for when we type

  itemForm.addEventListener('submit', onSubmitAddItem);  // looks at when we submit
  listItems.addEventListener('click', onClickItem);  // looks when we click red 'x'
  clearBtn.addEventListener('click', clearItems)  // clears list
  itemFilter.addEventListener('input', filterItems); // filters the list

  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();