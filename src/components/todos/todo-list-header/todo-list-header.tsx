import {KeyboardEvent, useState} from 'react'

type TodoListHeaderProps = {
    onAdd: (title: string) => void
}

function TodoListHeader(props: TodoListHeaderProps) {

    const ENTER_KEY = "Enter";
    const ESC_KEY = "Escape";

    const [title, setTitle] = useState("");
    const resetInput = () => {
        setTitle("");
    }

    const handleAdd = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key === ESC_KEY) {
            resetInput();
        }
        if (event.key === ENTER_KEY) {
            const input = title.trim();

            if (input.length === 0) {
                return;
            }
            props.onAdd(title);
            resetInput();
        }
    }

    return (
        <>
            <input type="text"
                   value={title}
                   className="new-todo" placeholder="What needs to be done?"
                   onKeyDown={handleAdd}
                   onChange={(e) => setTitle(e.target.value)}
                   autoFocus/>
        </>
    );
}

export default TodoListHeader;