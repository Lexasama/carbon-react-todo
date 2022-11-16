import {KeyboardEvent} from "react";
import {TodoListItemProps} from "./TodoListItemProps";

function TodoItem(props: TodoListItemProps) {

    const todo = props.todo;

    const onBlur = () => {
        props.onEnterEdit();
    }

    function onKeyUp(e: KeyboardEvent<HTMLInputElement>) {

        if (e.key === "Escape") {
            props.onEnterEdit();
        }

        if (e.key === "Enter") {
            const newTodo = {...todo, title: e.currentTarget.value}
            props.onEdit(newTodo);
        }
    }

    return (
        <>
            <div className={"view"}>
                <input type="checkbox" checked={todo.completed}
                       onChange={() => props.onToggle(props.todo.id)}
                       className="toggle" id={`todo-${props.todo.id}`}
                       data-testid={"todo-toggle"}
                />
                <label onDoubleClick={() => props.onEnterEdit(todo.id)}>{props.todo.title}</label>
                <button className="destroy" onClick={() => props.onRemove(props.todo.id)}></button>
            </div>
            {
                props.isEdited && (<input type="text"
                                          className="edit"
                                          id={`edit-input-${todo.id}`}
                                          defaultValue={todo.title}
                                          onBlur={onBlur}
                                          onKeyUp={onKeyUp}
                                          autoFocus/>)
            }
        </>
    );
}

export default TodoItem;