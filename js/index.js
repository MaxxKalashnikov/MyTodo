let inputTaskField = document.querySelector(".form-control"); //selecting our input feild for new tasks
let taskList = document.querySelector(".list-group"); //select ul element for future adding list elements to it
const BACKEND_ROOT_URL = "https://mytodo-back.onrender.com"; //back url from render
import { Todos } from "./class/todos.js"; //importing class for todos
const todos = new Todos(BACKEND_ROOT_URL);

//func for rendering task for ui 
function renderTask (task){
    const li = document.createElement("li");
    li.setAttribute('class', 'list-group-item');
    li.setAttribute('data-key',task.getId().toString()) //addind data-key for identifying each task
    renderSpan(li, task.getText()); //method getText for task(Task class instance) which returns the text contians of task
    renderLink(li, task.getId());
    taskList.appendChild(li);
}

//creating span element inside the li which is a child of ul
function renderSpan(li, text){
    const span = li.appendChild(document.createElement('span'))
    span.innerHTML = text;
}

//func for rendering a button for deleting task from the list
function renderLink(li, id){
    const a = li.appendChild(document.createElement('a'));
    a.innerHTML = '<i class="bi bi-trash"></i>';//just bootstrap styling
    a.setAttribute('style','float: right')
    //this one was not included to the task - just changed coursor's icon on hover
    a.addEventListener("mouseover", function() {
        a.style.cursor = "pointer";
    });
    //event listener for the link
    a.addEventListener('click', event => {
        //calling a method of todos class to remove the task (returns id of deleted task as a promise)
        todos.removeTask(id).then(removed_id => {
            const li_to_remove = document.querySelector(`[data-key='${removed_id}']`);//removing a task from ui
            if(li_to_remove){
                taskList.removeChild(li_to_remove);
            }
        }).catch(error => {//error handling
            alert(error);
        })
    })
}

//initial func for getting a list of tasks
const getTasks = async () => {
    //method from todos class which returns an array of task objects
    todos.getTasks().then((tasks) =>{
        tasks.forEach(task => {
            renderTask(task);//handling of ui elements
            inputTaskField.disabled = false;
        });
    }).catch((error) => {//error handling
        alert(error)
    })
}

//event listener for adding a task by pressing enter
inputTaskField.addEventListener("keypress", function (event){
    if(event.key == "Enter"){
        event.preventDefault();
        const task = inputTaskField.value.trim();
        if(task !== ""){
            //method of todos
            todos.addTask(task).then(task =>{
                renderTask(task);//
                inputTaskField.value = '';
                inputTaskField.focus();
            })
        }
    }
})

getTasks();//calling for initial funcs