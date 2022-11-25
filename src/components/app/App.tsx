import React from 'react';
import './App.css';
import TodoPage from "../todos/todo-page/todo-page";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {TodoListFilter} from "../todos/TodoListFilter";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TodoPage filter={TodoListFilter.ALL}/>}/>
                <Route path="/all" element={<Navigate to="/"/>}/>
                <Route path="/completed" element={<TodoPage filter={TodoListFilter.COMPLETED}/>}/>
                <Route path="/active" element={<TodoPage filter={TodoListFilter.ACTIVE}/>}/>
            </Routes>
            <footer className="info">
                <p>Double-click to edit a todo</p>
                <p>Created by <a href="http://todomvc.com">Axel S.</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        </BrowserRouter>
    );
}

export default App;