const form = document.getElementById("form");
const listParent = document.getElementById("list");
const inputForm = document.getElementById("inputForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
});

//*agregar las tareas
const addTask = () => {
    if (inputForm.value === "") {
        console.log("este campo no puede estar vacío!"); //esto de tarea: que sea un elemento que se vea
        return false;
    }

    localStorage.setItem(
        //este setItem necesita el stringify
        "todos", //cuando termina de agregar, lo va a volver a hacer string para que quede en el storage
        JSON.stringify([
            //al estar en un objeto, podemos trabajar con el ..., por eso parse
            //getItem necesita el parse
            ...JSON.parse(localStorage.getItem("todos") || "[]"), //estos 3 puntos nos van a explotar el array y meter los elementos nuevos al mismo nivel. Nos abre el array de nombre "todos" (la key), si no hay nada, traeme el array, yo lo lleno []. Sería: si tenés algo, lo metemos todo lo nuevo adentro. Sino, traemos array vacío y empezamos a meter
            {
                todos: inputForm.value,
                completed: false,
            },
        ])
    );

    const list = document.createElement("li");
    list.innerHTML = `
        <input type="checkbox" onclick="todoComplete(this)" class="check">
        <input type="text" value="${inputForm.value}" onfocus="getCurrentTodo(this)" onblur="editTodo(this)">
        <i class="fa fa-trash" onclick="removeTodo(this)"></i>
    `;
    listParent.insertBefore(list, listParent.children[0]);
    inputForm.value = ""; //limpio el form
};

//*traer las tareas
const loadTasks = () => {
    if (localStorage.getItem("todos") == null) return; //si no hay nada, no hay nada que cargar

    //caso contrario:
    //creá un objeto desde un objeto que sea "tipo array"
    let todos = Array.from(JSON.parse(localStorage.getItem("todos"))); //traemos lo que estaba en el storage

    //ahora que nos trajimos todo, y en un objeto, lo podemos recorrer para trabajarlo
    todos.forEach((todo) => {
        const list = document.createElement("li");
        list.innerHTML = `
            <input type="checkbox" onclick="todoComplete(this)" class="check ${
              todo.completed ? "checked" : ""
            }">
            <input type="text" value="${
              todo.todos
            }" onfocus="getCurrentTodo(this)" onblur="editTodo(this)">
            <i class="fa fa-trash" onclick="removeTodo(this)"></i>
        `;
        listParent.insertBefore(list, listParent.children[0]);
    });
};

const todoComplete = (e) => {
    let todos = Array.from(JSON.parse(localStorage.getItem("todos")));

    todos.forEach((todo) => {
        //*https://developer.mozilla.org/es/docs/Web/API/Node/nextSibling
        if (todo.todos === e.nextElementSibling.value) {
            //busca al hermano y ve si el value matchea con lo que hay en el localStorage
            todo.completed = !todo.completed; //si está completado, que pase a no completado.
        }

        localStorage.setItem("todos", JSON.stringify(todos)); //grabamos el cambio que hayamos hecho
        e.nextElementSibling.classList.toggle("completed"); //cambio la class para ponerle algún estilo cuando terminé la tarea
    });
};

const removeTodo = (e) => {
    let todos = Array.from(JSON.parse(localStorage.getItem("todos")));

    todos.forEach((todo) => {
        if (todo.todos === e.parentNode.children[1].value) {
            //busca al padre, baja al segundo hijo, ve si el value matchea con el localStorage
            todos.splice(todos.indexOf(todo), 1); //buscá en el array el primero que matchee con ese todo, si lo encontrás, sacalo
        }
        localStorage.setItem("todos", JSON.stringify(todos));
        e.parentNode.remove(); //no quiero eliminar el input, quiero matar todo el li directamente!
    });
};

const editTodo = (e) => {
    let todos = Array.from(JSON.parse(localStorage.getItem("todos")));

    if (e.value === "") {
        alert("Este campo no puede estar vacío"); //tarea: que esto sea algún elemento de html que aparezca y desaparezca a los 2 segundos
        e.value = currentValue; //si no hay valor, ponele el que ya estaba
        return;
    } //si quieren comprobar otras cosas, háganlo!

    //si está todo bien:
    todos.forEach((todo) => {
        if (todo.todos === currentValue) {
            //
            todo.todos = e.value; //le cambio el valor a lo que tenga el input
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos)); //grabo el valor
};
//lo inicio vacío, pero no puede ser un const! vamos a estar metiéndole valor. Y además, necesitamos que esté afuera porque lo vamos a acceder varias veces.

//*https://developer.mozilla.org/es/docs/Glossary/Hoisting
let currentValue = null; //acá guardamos temporalmente el valor que tenga el input

const getCurrentTodo = (e) => {
    currentValue = e.value;
};

//*en lugar de probar cada funcion llamándola, le digo que el load lo haga apenas tenga la ventana lista
// loadTasks()
//*https://developer.mozilla.org/es/docs/Web/API/GlobalEventHandlers/onload
window.onload = loadTasks;