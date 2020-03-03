'use strict'

// Select elements
const clear = document.getElementById('clear');
const date = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

// Variables
let LIST, id;

// get itemfrom localStorage

let data = localStorage.getItem("TODO");

// check if data is not empty

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list
  loadList(LIST); // load the list to the user interface
} else {
  //if data isn't empty
  LIST = [];
  id = 0;
}

// load items to the user's interface
function loadList(arr) {
  arr.forEach(function(item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the local storage
clear.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
})

// Showw today's date
const today = new Date();
const options = {weekday: "long", month: "short", day: "numeric"}

date.innerHTML = today.toLocaleDateString("en-US", options);

//add todo function 

function addToDo(toDo, id, done, trash) {
  
  if (trash) return;

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  
  const item = `<li class="item">
                <i class="fa ${DONE} complete" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o delete" job="delete" id="${id}"></i>
                </li>
               `;

  const position = 'beforeend';
  list.insertAdjacentHTML(position, item);
}


// add an item list user the enter key

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    // if the input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });

      //add item to localstorage (this code must be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});

// complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
  
}

// remove to do 
function removetoDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;  
}

// target the items created dynamicly

list.addEventListener("click", function(event) {
  const element = event.target; //return the clicked element inside list
  const elementJob = element.attributes.job.value; // complete or delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removetoDo(element);
  }
  
  //add item to localstorage (this code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));

});