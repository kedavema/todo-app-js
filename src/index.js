
import './styles.css';
import { Todo, TodoList } from './classes';
import { createHtmlTodo } from './js/components';


export const todoList = new TodoList();

todoList.todos.forEach( todo => createHtmlTodo(todo) );
