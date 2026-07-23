const allTodos = [];

function deleteTodo(id){
    
    for(let i =0;i<allTodos.length;i++){
        if(allTodos[i].id == id){
            allTodos.splice(i,1);
            break;
        }
        
    }
    renderTodos();
}

function renderTodos(){
    const todos = document.getElementById("todos")

    todos.innerHTML = "";

    for(let i =0;i<allTodos.length;i++){
        const card = document.createElement('div');
        const text = document.createElement('p')
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        text.innerHTML = allTodos[i].text;
        editButton.innerHTML = "Edit";
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click",() =>{
            deleteTodo(allTodos[i].id)
        })
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
    renderTodos();
    newTodo.value = "";
}
