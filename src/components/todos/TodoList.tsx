import {KeyboardEvent, useState} from "react";
import Todo from "./Todo";
import TodoItem from "./TodoItem/TodoItem";
import TodoListFooter from "./TodoListFooter/TodoListFooter";
import classNames from "classnames";
import {TodoListFilter} from "./TodoListFilter";
import TodoListHeader from "./TodoListHeader/TodoListHeader";

function TodoList() {

    const ESC_KEY = "Escape";
    const ENTER_KEY = 'Enter';

    const todos = [{
        title: "test",
        id: 0,
        url: "",
        completed: false,
        order: 1
    },
        {
            title: "test1",
            id: 1,
            url: "",
            completed: true,
            order: 2
        }];

    const [todoList, setTodoList] = useState<Array<Todo>>(todos);

    const [selectedFilter, setFilter] = useState(TodoListFilter.ALL);
    const [editedTodo, setEdited] = useState<{ editing: boolean, id: number }>({editing: false, id: 0})


    const handleEdit = (todo: Todo) => {
        const newList = todoList.map((t) => {
            if (t.id === todo.id) {
                return {
                    ...t,
                    title: todo.title
                }
            }
            return t;
        });
        setTodoList(newList);
        exitEditMode();
    }

    function handleAdd(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === ESC_KEY) {
            resetInput(event.currentTarget);
        }
        if (event.key === ENTER_KEY) {
            let newId = 0;
            if (todoList.length > 0) {
                newId = todoList.sort((a, b) => a.id > b.id ? -1 : 1)[0].id + 1;
            }
            setTodoList(todoList.concat({
                title: event.currentTarget.value,
                id: newId,
                url: "",
                completed: false,
                order: newId + 1
            }));
            resetInput(event.currentTarget);
        }
    }

    const resetInput = (e: HTMLInputElement) => {
        e.value = "";
    }


    function toggleIsCompleted(id: number) {
        const newList = todoList.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                };
            }
            return todo;
        });
        setTodoList(newList);
    }


    function handleRemove(id: number) {
        setTodoList(todoList.filter((todo) => todo.id !== id));
    }

    function handleClearCompleted() {

        setTodoList(todoList.filter((todo) => !todo.completed));
    }

    function handleFilterChange(filter: TodoListFilter) {
        setFilter(filter);
        exitEditMode()
    }

    function getFilteredList(): Array<Todo> {

        if (selectedFilter === TodoListFilter.ALL) {
            return orderByOrder(todoList);
        }
        return orderByOrder(todoList.filter((todo) => todo.completed === (selectedFilter === TodoListFilter.COMPLETED)));
    }

    function orderByOrder(list: Array<Todo>): Array<Todo> {
        return list.sort((a, b) => a.order > b.order ? -1 : 1);
    }

    function enterEditMode(id: number) {
        setEdited({editing: true, id: id});
    }

    const exitEditMode = () => {
        setEdited({editing: false, id: 0})
    }

    const toggleEditMode = (id?: number) => {
        if (id === undefined) {

            exitEditMode();
        }
        enterEditMode(id!);
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
                <input type="checkbox" className="toggle-all" id="toggle-all"/>
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">
                    {getFilteredList().map(todo => {
                        return (
                            <li className={classNames({
                                'completed': todo.completed,
                                'editing': (editedTodo.editing && editedTodo.id === todo.id)
                            })} key={todo.id}>
                                <TodoItem
                                    todo={todo}
                                    onToggle={() => toggleIsCompleted(todo.id)}
                                    onRemove={() => handleRemove(todo.id)}
                                    onEnterEdit={(id?) => toggleEditMode(id)}
                                    onEdit={(todo) => handleEdit(todo)}
                                    isEdited={editedTodo.editing && editedTodo.id === todo.id}
                                />
                            </li>
                        )
                    })}
                </ul>
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

export default TodoList;