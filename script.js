//selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterTodos = document.querySelector('.filter-todos');


//evernt listeners
document.addEventListener('DOMContentLoaded', retrieveFromLocal);
todoBtn.addEventListener('click', addTolist);
todoList.addEventListener('click', checkDelete);
filterTodos.addEventListener('change', filterItem);

//functions
function addTolist(event){
    event.preventDefault();

    //the input is empty, then dont need to add anything
    if(todoInput.value === '') return;

    //create a div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //create a li
    const todoLi = document.createElement('li');
    todoLi.innerText = todoInput.value;
    todoLi.classList.add("todo-item");

    //adding the element to local storage
    saveTodosToLocal(todoInput.value);

    //create check button
    const checkButton = document.createElement('button');
    checkButton.classList.add("check-btn");
    checkButton.innerHTML = '<i class="fas fa-check "></i>';

    //create delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<i class="fas fa-trash "></i>';

    //adding everyting to the div
    todoDiv.appendChild(todoLi);
    todoDiv.appendChild(checkButton);
    todoDiv.appendChild(deleteButton);

    //adding the new div to the main todoList
    todoList.appendChild(todoDiv);

    //clear input value
    todoInput.value = '';
}

function checkDelete(event){
    let pressesItem = event.target;

    //check for delete press
    if(pressesItem.classList[0] === 'delete-btn'){
        let dItem = pressesItem.parentElement;

        //adding animation
        dItem.classList.add('fall');

        //deleting from the local storage
        deleteFromLocal(dItem);

        //waiting to finish the animaiton/transition then delete
        dItem.addEventListener('transitionend', ()=>{
            dItem.remove();
        });
        
    }
    //check for checked press
    if(pressesItem.classList[0] === 'check-btn'){
        let dItem = pressesItem.parentElement;
        dItem.classList.toggle('completed');

        updateCompletedTodo(dItem.childNodes[0].innerText);
    }
}

function filterItem(event){
    const items = todoList.childNodes;

    //for some reason the first index is always undefined.. No idea why !!!!
    //thats why skipping it
    for(var i=1; i<items.length;i++){
              switch(event.target.value){
            case "all":
                items[i].style.display = "flex";
                break;
            case "completed":
                if(items[i].classList.contains("completed")){
                    items[i].style.display = "flex";
                }else{
                    items[i].style.display = 'none';
                }
                break;
            case 'uncompleted': 
                if(items[i].classList.contains('completed')){
                    items[i].style.display = 'none';
                }else{
                    items[i].style.display = "flex";
                }
                break;
        }
    }
}

function scanLocalForTodo(){

    let todos;
    //if local storage has already saved some todos, retrieve that.
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

/**
 * 
 */

function scanLocalForCompleted(){
    let comp;

    if(localStorage.getItem("comp") === null){
        comp = [];
    }else{
        comp = JSON.parse(localStorage.getItem("comp"));
    }
    return comp;
}

function updateCompletedTodo(todo){
    let todos = scanLocalForTodo();
    let comp = scanLocalForCompleted();

    let index = todos.indexOf(todo);
    if(comp[index] == "0"){
        comp[index] = "1";
    }else {
        comp[index] = "0";
    }
    
    localStorage.setItem("comp",JSON.stringify(comp));
}

function saveTodosToLocal(todo){

    let todos = scanLocalForTodo();

    //merge parameter and local storage
    todos.push(todo);
    //saving to local storage
    localStorage.setItem("todos", JSON.stringify(todos));

    //for complete check mark. since this todo created just now, so, this hasn't been completed
    let comp = scanLocalForCompleted();
    comp.push("0");
    localStorage.setItem("comp", JSON.stringify(comp));
    
}

function retrieveFromLocal(){

    let todos = scanLocalForTodo();
    let comp = scanLocalForCompleted();
    var i = 0;
    todos.forEach(function(todo){

        //create a div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        if(comp[i] == "1") todoDiv.classList.add("completed");

        //create a li
        const todoLi = document.createElement('li');
        todoLi.innerText = todo;
        todoLi.classList.add("todo-item");
    
        //create check button
        const checkButton = document.createElement('button');
        checkButton.classList.add("check-btn");
        checkButton.innerHTML = '<i class="fas fa-check "></i>';

        //create delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add("delete-btn");
        deleteButton.innerHTML = '<i class="fas fa-trash "></i>';

        //adding everyting to the div
        todoDiv.appendChild(todoLi);
        todoDiv.appendChild(checkButton);
        todoDiv.appendChild(deleteButton);

        //adding the new div to the main todoList
        todoList.appendChild(todoDiv);
        i++;
    })
}

function deleteFromLocal(todo){

    let todos = scanLocalForTodo();
    let comp = scanLocalForCompleted();
    
    //getting the inner text value from the parameter
    //cause we only store that value in the local storage
    let text = todo.childNodes[0].innerText;

    //getting the index of that value to remove
    let index = todos.indexOf(text);
    
    //removing the value
    todos.splice(index, 1);
    comp.splice(index,1);

    //updating the local storage
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("comp",JSON.stringify(comp));
}


//for navbar ---------------------------------------------------------------------------------------------
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinkList = document.querySelectorAll('.nav-links li');

    const selectDiv = document.querySelector(".select");
    const todoList = document.querySelector(".todo-list");

    burger.addEventListener('click' ,() => {

        nav.classList.toggle('nav-active');

        //line animation
        burger.classList.toggle('toggle-burger');
        

        navLinkList.forEach((link, index) => {
            if(link.style.animation){
                link.style.animation = '';
            }else {
                link.style.animation = `navLinkFade 0.2s ease forwards ${index/5 + 0.1}s`;
            }
        });
        selectDiv.classList.toggle('push-it-down');
        todoList.classList.toggle('push-it-down');
    });
}

navSlide();

/**
 * page animation
 */
const page = document.querySelector('.main');
const nav = document.querySelector('nav');
const tl = new TimelineMax();

tl.fromTo(page, 1, {x: "-100%"}, {x: "0%", ease: Power2.easeInOut})
.fromTo(nav, 0.3, {y:"-300%"}, {y:"0%", ease: Power2.easeInOut});

