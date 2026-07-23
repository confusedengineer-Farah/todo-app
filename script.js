const allTodos = [];

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
