import { Task } from "./Task.js";
//main class with logic foe storing adding removing etc.
class Todos{
    #tasks = [];
    #backend_url = "";

    constructor(url){
        this.#backend_url = url;
    }


    getTasks = async () =>{
        return new Promise(async(resolve, reject) => {
            fetch(this.#backend_url)//fetching back
            .then((response) => response.json())
            .then((json) => {
                this.#readJson(json);//storing tasks from response as instances of task class inside tasks array
                resolve(this.#tasks)
            },(error) => {
                reject(error);
            })
        })
    }

    #readJson = (taskAsJson) => {
        taskAsJson.forEach(node => {
            const task = new Task(node.id, node.description);//creating instances of task class for every json node from back response
            this.#tasks.push(task);
        });
    }
    //same as previous method but vice versa
    #addToArray = (id, text) =>{
        const task = new Task(id, text);
        this.#tasks.push(task);
        return task;
    }

    addTask = async(text) =>{
        return new Promise(async(resolve, reject) => {
            const json = JSON.stringify({description: text});//converts js object (user's input) to json
            fetch(this.#backend_url + "/new", {
                //http request to back
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: json
            }).then((response) => response.json())
            .then(json => {
                resolve(this.#addToArray(json.id, text))//if success, adding to tasks array
            }, error => {
                reject(error);
            })
        })
    }

    removeTask = async(id) =>{
        return new Promise(async(resolve, reject) => {
            fetch(this.#backend_url + '/delete/' + id, {method: 'delete'})//http request
            .then(response => response.json())
            .then(json => {
                this.#removeTaskFromArray(id)//removing from tasks array, if success
                resolve(json.id)
            }, error => {
                reject(error)
            })
        })
    }

    #removeTaskFromArray = (id) =>{
        const filteredArray = this.#tasks.filter(task => task.id !== id);//filter method to remove a task from array
        this.#tasks = filteredArray;
    }
}

export { Todos }