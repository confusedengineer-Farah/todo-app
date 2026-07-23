const STORAGE_KEY = "todos";
const allTodos = [];

const newTodoInput = document.getElementById("newTodo");
const searchInput = document.getElementById("searchTodo");
const todosContainer = document.getElementById("todos");
const addTodoButton = document.getElementById("addTodoButton");

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allTodos));
}

function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    allTodos.push(...savedTodos);
    renderTodos();
}

function deleteTodo(id) {
    const todoIndex = allTodos.findIndex((todo) => todo.id === id);

    if (todoIndex !== -1) {
        allTodos.splice(todoIndex, 1);
        saveTodos();
    }

    renderTodos();
}

function editTodo(id) {
    const todo = allTodos.find((item) => item.id === id);

    if (!todo) return;

    const newText = prompt("Enter your new Todo", todo.text);

    if (newText === null) return;

    const trimmedText = newText.trim();
    if (trimmedText === "") return;

    todo.text = trimmedText;
    saveTodos();
    renderTodos();
}

function completeTodo(id) {
    const todo = allTodos.find((item) => item.id === id);

    if (!todo) return;

    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
}

function createTodoCard(todo) {
    const card = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    const text = document.createElement("p");
    text.textContent = todo.text;

    if (todo.completed) {
        text.style.textDecoration = "line-through";
        text.style.color = "gray";
    }

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    checkbox.addEventListener("change", () => completeTodo(todo.id));
    editButton.addEventListener("click", () => editTodo(todo.id));
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    card.append(checkbox, text, editButton, deleteButton);
    return card;
}

function renderTodos() {
    todosContainer.innerHTML = "";

    const searchTerm = searchInput.value.trim().toLowerCase();

    allTodos.forEach((todo) => {
        if (!todo.text.toLowerCase().includes(searchTerm)) return;

        const card = createTodoCard(todo);
        todosContainer.appendChild(card);
    });
}

function addTodo() {
    const value = newTodoInput.value.trim();

    if (value === "") return;

    allTodos.push({
        id: Date.now(),
        text: value,
        completed: false,
    });

    saveTodos();
    renderTodos();
    newTodoInput.value = "";
}

addTodoButton.addEventListener("click", addTodo);
newTodoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});
searchInput.addEventListener("input", renderTodos);

loadTodos();