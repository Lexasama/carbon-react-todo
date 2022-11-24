import {KeyboardEvent} from "react";
import {TodoListItemProps} from "./TodoListItemProps";

function TodoItem(props: TodoListItemProps) {

    const todo = props.todo;

    const onBlur = () => {
        props.onEditMode();
    }

    function onKeyUp(e: KeyboardEvent<HTMLInputElement>) {

        if (e.key === "Escape") {
            props.onEditMode();
        }

        if (e.key === "Enter") {
            props.onEdit({...todo, title: e.currentTarget.value});
            props.onEditMode();
        }
    }

    return (
        <>
            <div className="view">
                <input type="checkbox" checked={todo.completed}
                       onChange={() => props.onToggle(todo.id)}
                       className="toggle" id={`todo-${todo.id}`}
                       data-testid="todo-toggle"
                />
                <label onDoubleClick={() => props.onEditMode(todo.id)}>
                    {todo.title}
                </label>
                <button className="destroy" onClick={() => props.onRemove(todo.id)}></button>
            </div>
            {
                props.isEdited && (<input type="text"
                                          className="edit"
                                          id={`edit-input-${todo.id}`}
                                          defaultValue={todo.title}
                                          onBlur={onBlur}
                                          onKeyUp={onKeyUp}
                                          data-testid="todo-edit"
                                          autoFocus/>)
            }
        </>
    );
}

export default TodoItem;