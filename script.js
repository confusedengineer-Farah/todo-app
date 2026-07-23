const allTodos = [];

function deleteTodo(id){
    
    for(let i =0;i<allTodos.length;i++){
        if(allTodos[i].id == id){
            allTodos.splice(i,1);
            saveTodo();
            break;
        }

    }
    renderTodos();
}

function editTodo(id){
    for(let i = 0; i< allTodos.length;i++){
        if(allTodos[i].id == id){
            const newText = prompt(
                "Enter your new Todo",
                allTodos[i].text
            );
            if(newText === null) return;
            if(newText.trim() === "") return;
            allTodos[i].text = newText.trim();
            saveTodo()
            break;
        }
    }
    renderTodos();
}

function completeTodo(id){
    for(let i=0;i<allTodos.length;i++){
        if(allTodos[i].id === id){
            allTodos[i].completed = !allTodos[i].completed;
            saveTodo();
            break;
        }
    }
    renderTodos();
}

function saveTodo(){
    localStorage.setItem("todos",JSON.stringify(allTodos));
}

function loadTodos(){
    const savedTodos = localStorage.getItem("todos");

    if(savedTodos != null){
        allTodos.push(...JSON.parse(savedTodos));
    }
    renderTodos();
}

function renderTodos(){
    const todos = document.getElementById("todos")

    todos.innerHTML = "";

    for(let i =0;i<allTodos.length;i++){

        const card = document.createElement('div')

        const checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.checked = allTodos[i].completed;

        const text = document.createElement('p')
        text.innerHTML = allTodos[i].text;

        if(allTodos[i].completed){
            text.style.textDecoration = 'line-through';
            text.style.color = "gray";
        }

        const editButton = document.createElement('button')
        editButton.textContent = "Edit";

        const deleteButton = document.createElement('button')
        deleteButton.textContent = "Delete";

        checkbox.addEventListener("click", () => {
            completeTodo(allTodos[i].id)
        })
        
        
        deleteButton.addEventListener("click",() =>{
            deleteTodo(allTodos[i].id)
        })
        editButton.addEventListener("click", () => {
            editTodo(allTodos[i].id)
        })

        card.appendChild(checkbox)
        card.appendChild(text)
        card.appendChild(editButton)
        card.appendChild(deleteButton);
        todos.appendChild(card);
    }
}

function addTodo(){
    const newTodo = document.getElementById("newTodo");
    const value = newTodo.value.trim();
    if(newTodo.value === "") return;
    const todo = {
        id: Date.now(),
        text: value,
        completed: false

    };
    allTodos.push(todo);
    saveTodo();
    renderTodos();
    newTodo.value = "";
}

window.onload = function () {
    loadTodos();
}