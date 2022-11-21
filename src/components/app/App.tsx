import React from 'react';
import './App.css';
import TodoPage from "../todos/todo-page/TodoPage";
import TheFooter from "../general/the-footer";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<TodoPage filter={"ALL"}/>}/>
                <Route path="/completed" element={<TodoPage filter={"COMPLETED"}/>}/>
                <Route path="/active" element={<TodoPage filter={"ACTIVE"}/>}/>
            </Routes>
            <TheFooter/>
        </>
    );
}

export default App;
