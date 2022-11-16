import React from 'react';
import './App.css';
import TodoList from "../todos/TodoList";

function App() {
    return (
        <div className="todoapp">
            <main>
                <TodoList/>
            </main>
            <footer className="info">
                <p><a href="#"></a></p>
                <p><a href="#"></a></p>
            </footer>
        </div>
    );
}

export default App;