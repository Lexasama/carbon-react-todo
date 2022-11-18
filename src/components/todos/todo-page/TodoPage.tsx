import TodoListHeader from "../todo-list-header/TodoListHeader";
import TodoListFooter from "../todo-list-footer/TodoListFooter";
import {TodoListFilter} from "../TodoListFilter";
import useTodoHook from "./use-todo-hook";
import TodoList from "../todo-list/TodoList";
import TodoListProps from "../todo-list/TodoListProps";

function TodoPage() {

    const {
        completeAll,
        completedItems,
        add,
        exitEditMode,
        getFilteredList,
        editedTodo,
        completed,
        handleRemove,
        handleFilterChange,
        toggleEditMode,
        handleEdit,
        todoList,
        selectedFilter,
        clearCompleted
    } = useTodoHook();

    const todoListProps: TodoListProps = {
        completeAll,
        editedTodo,
        filteredList: getFilteredList,
        handleEdit,
        handleRemove,
        toggleCompleted: completed,
        toggleEditMode
    }

    const activeItems = todoList.length - completedItems;
    return (
        <section className="todoApp">
            <header className="header">
                <h1>todos</h1>
                <TodoListHeader onAdd={(e) => add(e)}
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
                            activeItems={activeItems}
                            onFilterChange={(filter: TodoListFilter) => handleFilterChange(filter)}
                            selectedFilter={selectedFilter}
                            onClear={() => clearCompleted()}
                            completedItems={completedItems}
                        />
                    </>
                )
            }
        </section>
    );
}

export default TodoPage;