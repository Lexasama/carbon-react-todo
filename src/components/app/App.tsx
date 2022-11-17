import React from 'react';
import './App.css';
import TodoPage from "../todos/todo-page/TodoPage";

function App() {
    return (
        <>
            <TodoPage/>
            <footer className="info">
                <p>Double-click to edit a todo</p>
                <p>Created by <a href="http://todomvc.com">Axel S.</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        </>
    );
}

export default App;
