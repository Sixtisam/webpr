function startTodo() {}

function addTodo() {
  document
    .getElementById("todoContainer")
    .append(document.getElementById("new-todo-row").content.cloneNode(true));
}
