import TodoListHeader from "../todo-list-header/todo-list-header";
import TodoListFooter from "../todo-list-footer/todo-list-footer";
import TodoList from "../todo-list/todo-list";
import {TodoListFilter} from "../TodoListFilter";
import {
    add,
    completeAll,
    edit,
    removeCompleted,
    removeOne,
    selectActiveItems,
    selectCompletedItems,
    selectTodos,
    toggleCompleted
} from "../../../state/todos/todoSlice";
import {filterList} from "../todo-hooks/todo-common";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import Todo from "../Todo";

export type TodoPageProps = {
    filter: TodoListFilter
}

function TodoPage({filter}: TodoPageProps) {

    const dispatch = useAppDispatch();
    const todoList = useAppSelector(selectTodos);
    const activeItems = useAppSelector(selectActiveItems);
    const completedItems = useAppSelector(selectCompletedItems)
    const filteredList = filterList(todoList, filter);

    const completeOne = (id: number) => {
        dispatch(toggleCompleted(id));
    }

    const handleEdit = (todo: Todo) => {
        dispatch(edit(todo));
    }

    const handleRemove = (id: number) => {
        dispatch(removeOne(id));
    }

    const clearCompleted = () => {
        dispatch(removeCompleted());
    }
    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <TodoListHeader onAdd={(title: string) => dispatch(add(title))}
                />
            </header>
            {
                todoList.length > 0 && (
                    <>
                        <section className="main" role="main">
                            <TodoList
                                completeAll={() => dispatch(completeAll())}
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