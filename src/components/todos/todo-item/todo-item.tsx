import {KeyboardEvent} from "react";
import Todo from "../Todo";

export type TodoListItemProps = {
    isEdited: boolean
    onEdit: (todo: Todo) => void
    onEditMode: (id?: number) => void
    onRemove: (id: number) => void,
    onToggle: (id: number) => void,
    todo: Todo,
}

function TodoItem({todo, onEdit, isEdited, onEditMode, onRemove, onToggle}: TodoListItemProps) {

    const onBlur = () => {
        onEditMode();
    }

    function onKeyUp(e: KeyboardEvent<HTMLInputElement>) {

        if (e.key === "Escape") {
            onEditMode();
        }

        if (e.key === "Enter") {
            onEdit({...todo, title: e.currentTarget.value});
            onEditMode();
        }
    }

    return (
        <>
            <div className="view">
                <input type="checkbox" checked={todo.completed}
                       onChange={() => onToggle(todo.id)}
                       className="toggle" id={`todo-${todo.id}`}
                       data-testid="todo-toggle"
                />
                <label onDoubleClick={() => onEditMode(todo.id)}>
                    {todo.title}
                </label>
                <button className="destroy" name="destroy"
                        onClick={() => onRemove(todo.id)}></button>
            </div>
            {
                isEdited && (<input type="text"
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