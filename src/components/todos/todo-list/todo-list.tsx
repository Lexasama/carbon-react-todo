import classNames from "classnames";
import TodoItem from "../todo-item/todo-item";
import {useState} from "react";
import Todo from "../Todo";

type TodoListProps = {
    activeItems: number,
    completeAll: () => void,
    handleEdit: (todo: Todo) => void,
    handleRemove: (id: number) => void,
    toggleCompleted: (id: number) => void,
    todoList: Todo[],
}

function TodoList(props: TodoListProps) {

    const defaultEditedTodo = {editing: false, id: -1};
    const [editedTodo, setEdited] = useState<{ editing: boolean, id: number }>(defaultEditedTodo);

    function enterEditMode(id: number) {
        setEdited({editing: true, id: id});
    }

    function exitEditMode() {
        setEdited(defaultEditedTodo);
    }

    const toggleEditMode = (id?: number) => {

        if (id === undefined || id === -1) {
            exitEditMode();
        }
        enterEditMode(id!);
    };


    return (
        <>
            <input type="checkbox" className="toggle-all" id="toggle-all"
                   checked={props.activeItems === 0}
                   onChange={() => props.completeAll()}
                   aria-label="toggle all checkbox"/>
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
                {props.todoList.map(todo => {
                    return (
                        <li className={classNames({
                            'completed': todo.completed,
                            'editing': (editedTodo.editing && editedTodo.id === todo.id)
                        })} key={todo.id}>
                            <TodoItem
                                isEdited={todo.id === editedTodo.id}
                                todo={todo}
                                onToggle={() => props.toggleCompleted(todo.id)}
                                onRemove={() => props.handleRemove(todo.id)}
                                onEditMode={(id?) => toggleEditMode(id)}
                                onEdit={(todo) => props.handleEdit(todo)}
                            />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default TodoList;