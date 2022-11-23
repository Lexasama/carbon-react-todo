import {TodoListFooterProps} from "./TodoListFooterProps";
import {NavLink} from "react-router-dom";

function TodoListFooter(props: TodoListFooterProps) {

    const activeItemsCount = (number: number) => {
        if (number === 1) {
            return (<><strong>{number}</strong> item left </>);
        }
        return (<><strong>{number}</strong> items left </>);
    };

    return (
        <footer className="footer">
            <span className="todo-count">{activeItemsCount(props.activeItems)}</span>
            <ul className="filters">
                <li>
                    <NavLink
                        className={({isActive}) => isActive ? "selected" : ""}
                        to={"/all"}
                    >All</NavLink>
                </li>
                <li>
                    <NavLink
                        className={({isActive}) => isActive ? "selected" : ""}
                        to={"/active"}
                    >Active</NavLink>
                </li>
                <li>
                    <NavLink
                        className={({isActive}) => isActive ? "selected" : ""}
                        to={"/completed"}
                    >Completed</NavLink>
                </li>
            </ul>
            {
                props.completedItems !== 0 &&
                (
                    <button className="clear-completed" onClick={() => props.onClear()}>Clear completed</button>
                )
            }
        </footer>);
}


export default TodoListFooter;