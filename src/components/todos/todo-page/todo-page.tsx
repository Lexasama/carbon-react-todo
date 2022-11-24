import TodoListHeader from "../todo-list-header/todo-list-header";
import TodoListFooter from "../todo-list-footer/todo-list-footer";
import TodoList from "../todo-list/todo-list";
import useTodoFetchHook from "../todo-hooks/use-todo-fetch/use-todo-fetch.hook";

export interface TodoPageProps {
    filter: string
}

function TodoPage({filter}: TodoPageProps) {

    const {
        completeAll,
        completedItems,
        add,
        filteredList,
        completeOne,
        handleRemove,
        handleEdit,
        todoList,
        clearCompleted
    } = useTodoFetchHook(filter);

    const activeItems = todoList.length - completedItems;
    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <TodoListHeader onAdd={(e) => add(e)}
                />
            </header>
            {
                todoList.length > 0 && (
                    <>
                        <section className="main" role="main">
                            <TodoList
                                completeAll={completeAll}
                                filteredList={filteredList}
                                toggleCompleted={(id: number) => completeOne(id)}
                                handleEdit={(todo) => handleEdit(todo)}
                                handleRemove={(id) => handleRemove(id)}
                            />
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