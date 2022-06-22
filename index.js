$(document).on("pagecreate", function () {});

function removeItem() {}

function editItem() {}

$(document).on("ready", function () {
  showTodos();

  $("#saveTodo").on("click", function addItem() {
    let inputText = $("#inputText").val();
    addItemToLocalStorage(inputText);
    showTodos();
    $.mobile.navigate("#home");
    $("#inputText").val("");
  });

  $("#cancel").on("click", function () {
    $("#inputText").val("");
    $.mobile.navigate("#home");
  });
});

function addItemToLocalStorage(inputText) {
  let todos = getItemFromLocalStorage();
  if (!todos) {
    let items = [];
    items.push(inputText);
    localStorage.setItem("todos", toJson(items));
    return;
  }
  todos.push(inputText);
  localStorage.setItem("todos", toJson(todos));
}

function toJson(arr) {
  return JSON.stringify(arr);
}

function getItemFromLocalStorage() {
  let todos = window.localStorage.getItem("todos");
  if (!todos) return;
  return JSON.parse(todos);
}

function showTodos() {
  let todos = getItemFromLocalStorage();
  console.log(todos);
  if (!todos) {
    return $("#todos").append(
      "<div><p style='color:white'>No hay ningun todo!</p></div>"
    );
  }
  $("#todos").empty();
  $.each(todos, function (index, value) {
    $("#todos").append(`<div><p style='color:white'>${value}</p></div>`);
  });
}
