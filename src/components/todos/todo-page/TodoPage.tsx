import TodoListHeader from "../todo-list-header/TodoListHeader";
import TodoListFooter from "../todo-list-footer/TodoListFooter";
import {TodoListFilter} from "../TodoListFilter";
import TodoList from "../todo-list/TodoList";
import useTodoHook from "./use-todo-hook";


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
        handleFilterChange,
        handleEdit,
        todoList,
        selectedFilter,
        clearCompleted
    } = useTodoHook(filter);

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