import TodoListHeader from "../todo-list-header/TodoListHeader";
import TodoListFooter from "../todo-item-footer/TodoListFooter";
import {TodoListFilter} from "../TodoListFilter";
import useTodoHook from "./use-todo-hook";
import TodoList from "../todo-list/TodoList";
import TodoListProps from "../todo-list/TodoListProps";

function TodoPage() {

    const {
        handleAdd,
        exitEditMode,
        getFilteredList,
        editedTodo,
        toggleIsCompleted,
        handleRemove,
        handleFilterChange,
        toggleEditMode,
        handleEdit,
        todoList,
        selectedFilter,
        handleClearCompleted
    } = useTodoHook();

    const todoListProps: TodoListProps = {
        editedTodo,
        filteredList: getFilteredList,
        handleEdit,
        handleRemove,
        toggleCompleted: toggleIsCompleted,
        toggleEditMode
    }

    return (
        <div>
            <header className="header">
                <h1>todos</h1>
                <TodoListHeader onAdd={(e) => handleAdd(e)}
                                onFocus={() => exitEditMode()}
                />
            </header>
            <section className="main">
                <TodoList {...todoListProps}/>
            </section>
            <TodoListFooter
                itemLeft={todoList.length}
                onFilterChange={(filter) => handleFilterChange(filter as TodoListFilter)}
                selectedFilter={selectedFilter}
                onClear={() => handleClearCompleted()}
            />
        </div>
    );
}

export default TodoPage;