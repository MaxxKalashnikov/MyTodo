let inputTaskField = document.querySelector(".form-control");
let taskList = document.querySelector(".list-group");
const BACKEND_ROOT_URL = "https://mytodo-back.onrender.com/";
import { Todos } from "./class/todos.js";
const todos = new Todos(BACKEND_ROOT_URL);

function renderTask (task){
    const li = document.createElement("li");
    li.setAttribute('class', 'list-group-item');
    li.setAttribute('data-key',task.getId().toString())
    renderSpan(li, task.getText());
    renderLink(li, task.getId());
    taskList.appendChild(li);
}

function renderSpan(li, text){
    const span = li.appendChild(document.createElement('span'))
    span.innerHTML = text;
}

function renderLink(li, id){
    const a = li.appendChild(document.createElement('a'));
    a.innerHTML = '<i class="bi bi-trash"></i>';
    a.setAttribute('style','float: right')
    a.addEventListener("mouseover", function() {
        a.style.cursor = "pointer";
    });
    a.addEventListener('click', event => {
        todos.removeTask(id).then(removed_id => {
            const li_to_remove = document.querySelector(`[data-key='${removed_id}']`);
            if(li_to_remove){
                taskList.removeChild(li_to_remove);
            }
        }).catch(error => {
            alert(error);
        })
    })
}

const getTasks = async () => {
    todos.getTasks().then((tasks) =>{
        tasks.forEach(task => {
            renderTask(task);
            inputTaskField.disabled = false;
        });
    }).catch((error) => {
        alert(error)
    })
}


inputTaskField.addEventListener("keypress", function (event){
    if(event.key == "Enter"){
        event.preventDefault();
        const task = inputTaskField.value.trim();
        if(task !== ""){
            todos.addTask(task).then(task =>{
                renderTask(task);
                inputTaskField.value = '';
                inputTaskField.focus();
            })
        }
    }
})

getTasks();