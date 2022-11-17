import TodoListHeader from "../todo-list-header/TodoListHeader";
import TodoListFooter from "../todo-item-footer/TodoListFooter";
import {TodoListFilter} from "../TodoListFilter";
import useTodoHook from "./use-todo-hook";
import TodoList from "../todo-list/TodoList";
import TodoListProps from "../todo-list/TodoListProps";

function TodoPage() {

    const {
        completedItems,
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
        <section className="todoApp">
            <header className="header">
                <h1>todos</h1>
                <TodoListHeader onAdd={(e) => handleAdd(e)}
                                onFocus={() => exitEditMode()}
                />
            </header>

            {
                todoList.length > 0 && (
                    <>
                        <section className="main" role="main">
                            <TodoList {...todoListProps}/>
                        </section>
                        <TodoListFooter
                            itemLeft={todoList.length}
                            onFilterChange={(filter: TodoListFilter) => handleFilterChange(filter)}
                            selectedFilter={selectedFilter}
                            onClear={() => handleClearCompleted()}
                            completedItems={completedItems}
                        />
                    </>
                )
            }
        </section>
    );
}

export default TodoPage;