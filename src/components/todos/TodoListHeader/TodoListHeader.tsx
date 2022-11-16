import {TodoListHeaderProps} from "./TodoListHeaderProps";

function TodoListHeader(props: TodoListHeaderProps) {

    return (
        <>
            <input type="text"
                   className="new-todo" placeholder="What needs be done?"
                   onKeyDown={(e) => props.onAdd(e)}
                   onFocus={() => props.onFocus()}
                   autoFocus/>
        </>
    );
}

export default TodoListHeader;