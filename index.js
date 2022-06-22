$(document).on("pagecreate", function () {});

function removeItem() {}

function editItemOnLocalStorage(inputText,id) {
  let todos = getItemFromLocalStorage()
  todos[id] = inputText
  localStorage.removeItem("todos")
  localStorage.setItem("todos",toJson(todos))
  return;
}

$(document).on("ready", function () {
  showTodos();

  $("#saveTodo").on("click", function addItem() {
    let inputText = $("#inputText").val();
    let id = $("#inputText").attr("data-id")
    console.log(id)
    // addItemToLocalStorage(inputText);
    editItemOnLocalStorage(inputText,id);
    showTodos();
    $.mobile.navigate("#home");
    $("#inputText").val("");
    
  });

  $("#cancel").on("click", function () {
    $("#inputText").val("");
    $.mobile.navigate("#home");
  });

  // ale's code
  
  $(".edit").on("click", function () {
    let editItem = $(this).attr("data-value")
    let id = $(this).attr("data-id")
    $.mobile.navigate("#add");
    $("#inputText").val(editItem)
    oldId = $("#inputText").attr("data-id",id)
    oldId = id
    console.log(oldId)
    
     
    

  })

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
    $("#todos").append(
      `<div class="todoContainer">
      <p style='color:white'>${value}</p>
      <div class="buttonsContainer"> <a data-value="${value}" data-id="${index}" class="edit">Editar</a><a class="delete">Borrar</a></div>
      </div>`
    );
  });
}
