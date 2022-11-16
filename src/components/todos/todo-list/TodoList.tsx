import classNames from "classnames";
import TodoItem from "../todo-item/TodoItem";
import TodoListProps from "./TodoListProps";

function TodoList(props: TodoListProps) {

    return (
        <>
            <input type="checkbox" className="toggle-all" id="toggle-all"/>
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
                {props.filteredList().map(todo => {
                    return (
                        <li className={classNames({
                            'completed': todo.completed,
                            'editing': (props.editedTodo.editing && props.editedTodo.id === todo.id)
                        })} key={todo.id}>
                            <TodoItem
                                todo={todo}
                                onToggle={() => props.toggleCompleted(todo.id)}
                                onRemove={() => props.handleRemove(todo.id)}
                                onEnterEdit={(id?) => props.toggleEditMode(id)}
                                onEdit={(todo) => props.handleEdit(todo)}
                                isEdited={props.editedTodo.editing && props.editedTodo.id === todo.id}
                            />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default TodoList;