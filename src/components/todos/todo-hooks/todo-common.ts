import Todo from "../Todo";

export function orderByOrder(list: Array<Todo>): Array<Todo> {
    return list.sort((a, b) => a.order > b.order ? -1 : 1);
}

export function filterList(list: Array<Todo>, filter: string): Todo[] {

    return list.filter((todo) => {
        switch (filter) {
            case 'ACTIVE':
                return !todo.completed;
            case "COMPLETED":
                return todo.completed;
            default:
                return todo;
        }
    });
}