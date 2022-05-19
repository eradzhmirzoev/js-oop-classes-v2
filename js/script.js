class TodoList {
    constructor(el) {
        this.todos = [];
        this.el = el;
        this.wrapper = document.querySelector('body');

        this.wrapper.addEventListener('click', this.additionalFeatures.bind(this));
    }
    additionalFeatures(e) {
        let elemInput = document.querySelector('.create-input');

        //change status
        if(e.target.className === 'set-status') {
            this.changeStatus(e.target.closest('li').dataset.id);
            this.render();
        }

        //delete task
        if(e.target.className === 'delete-task'){
            this.removeTodo(e.target.closest('li').dataset.id);
            this.render();
            console.log(this.todos)
        }

        //create task
        if (e.target.className === 'btn-create' && elemInput.value !== '') {
            this.addTodo(new Task(elemInput.value, false));
            this.render();
        }

        //find element
        if (e.target.className === 'btn-find' && elemInput.value !== '') {
            this.findTasks(elemInput.value.trim());
            // this.render();
        }

    }

    findTasks(elemInput) {
        let lis = '';
        
        this.todosWithFindElements = this.todos.filter(element => element.value.includes(elemInput));
        
        this.todosWithFindElements.forEach(element => {
            lis += `<li data-id="${element.id}" data-status="${element.status}">${element.value}
            <button class="set-status">Change status</button>
            <button class="delete-task">Delete</button></li>`;
        });

        this.el.innerHTML = lis + `<input type = 'text' class='create-input'></input><button class="btn-create">Create</button><button class="btn-find">Find</button>`;

    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(id) {
        this.todos = this.todos.filter((el) => {
            return el.id !== id;
        });
    }

    getTodos() {
        return this.todos;
    }

    changeStatus(id) {
        let index = this.todos.findIndex((el) => el.id === id);
        this.todos[index].status = !this.todos[index].status;
    }

    render() {
        let lis = '';
        for (let el of this.todos) {
            if (!el) {
                return;
            }
            lis += `<li data-id="${el.id}" data-status="${el.status}">${el.value}
            <button class="set-status">Change status</button>
            <button class="delete-task">Delete</button></li>`;
        }
        
        this.el.innerHTML = lis + `<input type = 'text' class='create-input'></input><button class="btn-create">Create</button><button class="btn-find">Find</button>`;

        this.arrLi = document.querySelectorAll('#list > li');
        this.arrLi = Array.from(this.arrLi);
        
        this.arrLi.forEach((element) => {
            if (element.dataset.status === 'true') {
                element.style.background = 'green';
            } else {
                element.style.background = 'yellow';
            }
        });

    }
}

class Task {
constructor(value, status) {
    this.value = value;
    this.status = status;
    this.id = Math.random().toString(36).substr(2, 9);
}
}

let list = document.getElementById('list');
let todo1 = new TodoList(list);
todo1.addTodo(new Task('9345', true));
todo1.addTodo(new Task('2945hv', false));
console.log(todo1.getTodos());
todo1.render();