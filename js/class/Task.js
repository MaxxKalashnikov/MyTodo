//class for task
class Task{
    #id;
    #text;
    
    constructor(id, text){ //each task is handled as an object
        this.#id = id;
        this.#text = text;
    }
    //getters
    getId(){
        return this.#id;
    }

    getText(){
        return this.#text;
    }
}

export { Task };