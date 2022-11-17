import {KeyboardEvent} from 'react'

import TodoListHeaderProps from "./TodoListHeaderProps";

function TodoListHeader(props: TodoListHeaderProps) {

    const ENTER_KEY = "Enter";
    const ESC_KEY = "Escape";

    const resetInput = (e: HTMLInputElement) => {
        e.value = "";
    }

    const handleAdd = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key === ESC_KEY) {
            resetInput(event.currentTarget);
        }
        if (event.key === ENTER_KEY) {
            const title = (event.currentTarget.value).trim();

            if (title.length === 0) {
                return;
            }
            props.onAdd(title);
            resetInput(event.currentTarget);
        }
    }

    return (
        <>
            <input type="text"
                   className="new-todo" placeholder="What needs to be done?"
                   onKeyDown={handleAdd}
                   onFocus={() => props.onFocus()}
                   autoFocus/>
        </>
    );
}


export default TodoListHeader;