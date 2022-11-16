import React from 'react';
import './App.css';
import TodoPage from "../todos/todo-page/TodoPage";

function App() {
    return (
        <div className="todoapp">
            <main>
                <TodoPage/>
            </main>
            <footer className="info">
                <p><a href="#"></a></p>
                <p><a href="#"></a></p>
            </footer>
        </div>
    );
}

export default App;
