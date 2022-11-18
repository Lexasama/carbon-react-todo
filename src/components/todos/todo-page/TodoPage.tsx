import TodoListHeader from "../todo-list-header/TodoListHeader";
import TodoListFooter from "../todo-list-footer/TodoListFooter";
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
        toggleEditMode,
        handleEdit,
        todoList,
        clearCompleted,
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
        <section className="todoapp">
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