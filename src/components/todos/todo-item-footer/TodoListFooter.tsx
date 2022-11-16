import classNames from "classnames";
import {TodoListFilter} from "../TodoListFilter";
import {TodoListFooterProps} from "./TodoListFooterProps";

function TodoListFooter(props: TodoListFooterProps) {

    const itemLestText = (itemLeft: number): string => {
        if (itemLeft > 0) {
            return `${itemLeft} items left`;
        }

        return `${itemLeft} item left`;
    };

    function normalize(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    return (<footer className="footer">
        <span className="todo-count">{itemLestText(props.itemLeft)}</span>
        <ul className="filters">
            {Object.values<string>(TodoListFilter).map((filter) => {
                return (
                    <li key={filter}>
                        <a href="src/components/todos/TodoListFooter/TodoListFooter#"
                           className={classNames({"selected": props.selectedFilter === filter})}
                           onClick={() => props.onFilterChange(filter as TodoListFilter)}
                        >{normalize(filter)}</a>
                    </li>

                );
            })}
        </ul>
        <button className="clear-completed" onClick={() => props.onClear()}>Clear completed</button>
    </footer>);
}


export default TodoListFooter;