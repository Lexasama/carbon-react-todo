import React from 'react';
import './App.css';
import TodoPage from "../todos/todo-page/todo-page";
import TheFooter from "../general/the-footer";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TodoPage filter={"ALL"}/>}/>
                <Route path="/all" element={<Navigate to="/"/>}/>
                <Route path="/completed" element={<TodoPage filter={"COMPLETED"}/>}/>
                <Route path="/active" element={<TodoPage filter={"ACTIVE"}/>}/>
            </Routes>
            <TheFooter/>
        </BrowserRouter>
    );
}

export default App;