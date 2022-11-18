import React from 'react';
import './App.css';
import TodoPage from "../todos/todo-page/TodoPage";
import TheFooter from "../general/the-footer";

function App() {
    return (
        <>
            <TodoPage/>
            <TheFooter/>
        </>
    );
}

export default App;
