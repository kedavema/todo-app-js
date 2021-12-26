
import { Todo } from '../classes';
import { todoList } from '../index'

// References in the HTML
const divTodoList    = document.querySelector('.todo-list');
const txtInput       = document.querySelector('.new-todo');
const clearCompleted = document.querySelector('.clear-completed');
const ulFilters      = document.querySelector('.filters');
const anchorFilters  = document.querySelectorAll('.filtro');

// function to create a todo html
export const createHtmlTodo = ( todo ) => {

    const htmlTodo = 
    `<li class="${ ( todo.completed ) ? 'completed' : '' }" data-id="${ todo.id }">
    <div class="view">
      <input class="toggle" type="checkbox" ${ ( todo.completed ) ? 'checked' : '' }>
      <label>${ todo.task }</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
  </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;

}

// Events
txtInput.addEventListener('keyup', ( event  ) => {

    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {

        const inputTodo = new Todo( txtInput.value );
        todoList.newTodo( inputTodo );
        createHtmlTodo( inputTodo );
        txtInput.value = '';
        
    }

});

divTodoList.addEventListener('click', (event) => {

    const element     = event.target.localName; // Input, label, button...
    const todoElement = event.target.parentElement.parentElement; // todo <li>
    const todoId      = todoElement.getAttribute('data-id');
    // console.log(todoList);
    
    if ( element.includes('input') ) { // click on check
        todoList.toggleTodo( todoId );
        todoElement.classList.toggle('completed');
    } else if ( element.includes('button') ) {
        todoList.deleteTodo(todoId);
        divTodoList.removeChild(todoElement);
    };
});

clearCompleted.addEventListener('click', (event) => {
    
    todoList.deleteAllCompleted();

    for ( let i = divTodoList.children.length - 1; i >= 0; i-- ) {
        const element = divTodoList.children[i];
        console.log(element);
        if ( element.classList.contains('completed') ) {
            divTodoList.removeChild(element);
        }
    }

});

ulFilters.addEventListener('click', (event) => {

    const filters = event.target.text;

    if (!filters) {return};

    anchorFilters.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for (const element of divTodoList.children){

        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        switch(filters) {
            case 'Pendientes':
                if ( completed ) {
                    element.classList.add('hidden');
                }
            break;
            case 'Completados':
                if ( !completed ) {
                    element.classList.add('hidden');
                }
            break;

        }

    }


});