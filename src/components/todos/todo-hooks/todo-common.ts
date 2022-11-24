import Todo from "../Todo";
import {TodoListFilter} from "../TodoListFilter";

export function orderByOrder(list: Array<Todo>): Array<Todo> {
    return list.sort((a, b) => a.order > b.order ? -1 : 1);
}

export function filterList(list: Array<Todo>, filter: TodoListFilter): Todo[] {

    return list.filter((todo) => {
        switch (filter) {
            case TodoListFilter.ACTIVE:
                return !todo.completed;
            case TodoListFilter.COMPLETED:
                return todo.completed;
            default:
                return todo;
        }
    });
}

