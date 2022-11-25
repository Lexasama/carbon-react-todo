import TodoListHeader from "../todo-list-header/todo-list-header";
import TodoListFooter from "../todo-list-footer/todo-list-footer";
import TodoList from "../todo-list/todo-list";
import useTodoHook from "../todo-hooks/use-todo.hook";
import {TodoListFilter} from "../TodoListFilter";

export type TodoPageProps = {
    filter: TodoListFilter
}

function TodoPage({filter}: TodoPageProps) {

    const {
        add,
        clearCompleted,
        completeAll,
        completedItems,
        completeOne,
        filteredList,
        handleEdit,
        handleRemove,
        todoList
    } = useTodoHook(filter);

    const activeItems = todoList.length - completedItems;
    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <TodoListHeader onAdd={(title: string) => add(title)}
                />
            </header>
            {
                todoList.length > 0 && (
                    <>
                        <section className="main" role="main">
                            <TodoList
                                completeAll={completeAll}
                                todoList={filteredList}
                                toggleCompleted={(id: number) => completeOne(id)}
                                handleEdit={(todo) => handleEdit(todo)}
                                handleRemove={(id) => handleRemove(id)}
                                activeItems={activeItems}
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