//selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterTodos = document.querySelector('.filter-todos');


//evernt listeners
todoBtn.addEventListener('click', addTolist);
todoList.addEventListener('click', checkDelete);
filterTodos.addEventListener('click', filterItem);

//functions
function addTolist(event){
    event.preventDefault();

    //create a div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //create a li
    const todoLi = document.createElement('li');
    todoLi.innerText = todoInput.value;
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

    //clear input value
    todoInput.value = '';
}

function checkDelete(event){
    console.log(event.target);
    let pressesItem = event.target;

    //check for delete press
    if(pressesItem.classList[0] === 'delete-btn'){
        let dItem = pressesItem.parentElement;

        //adding animation
        dItem.classList.add('fall');

        //waiting to finish the animaiton/transition then delete
        dItem.addEventListener('transitionend', ()=>{
            dItem.remove();
        });
        
    }
    //check for checked press
    if(pressesItem.classList[0] === 'check-btn'){
        let dItem = pressesItem.parentElement;
        dItem.classList.toggle('completed');
    }
}

function filterItem(event){
    const items = todoList.childNodes;
    console.log(items);

    // items.forEach(function(item){
    //     switch(event.target.value){
    //         case 'all':
    //             item.style.display = 'flex';
    //             break;
    //         case 'completed':
    //             if(item.classList.contains('compledted')){
    //                 item.style.display = 'flex';
    //             }else{
    //                 item.style.display = 'none';
    //             }
    //             break;
    //         case 'uncompleted': 
    //             if(item.classList.contains('compledted')){
    //                 item.style.display = 'none';
    //             }else{
    //                 item.style.display = 'flex';
    //             }
    //             break;
    //     }
    // });
}

//for navbar
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinkList = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click' ,() => {

        nav.classList.toggle('nav-active');

        //line animation
        burger.classList.toggle('toggle-burger');

        navLinkList.forEach((link, index) => {
            if(link.style.animation){
                link.style.animation = '';
            }else {
                link.style.animation = 'navLinkFade 0.5s ease forwards 0.2s';
            }
        });
    });
}

navSlide();