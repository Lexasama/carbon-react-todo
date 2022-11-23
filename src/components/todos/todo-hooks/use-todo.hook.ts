import {useState} from "react";
import Todo from "../Todo";
import {TodoListFilter} from "../TodoListFilter";

const useTodoHook = (filter: string = "ALL") => {

    const [todoList, setTodoList] = useState<Array<Todo>>([]);
    const [selectedFilter, setFilter] = useState(TodoListFilter.ALL);
    const [editedTodo, setEdited] = useState<{ editing: boolean, id: number }>({editing: false, id: 0});

    const completedItems = todoList.filter((t) => t.completed).length;

    const completeAll = () => {
        const newList = todoList.map((t) => {
            if (!t.completed) {
                return {...t, completed: true}
            }
            return t;
        });
        setTodoList(newList);
    }

    const handleEdit = (todo: Todo) => {
        const newList = todoList.map((t) => {
            if (t.id === todo.id) {
                return {
                    ...t,
                    title: todo.title
                }
            }
            return t;
        });
        setTodoList(newList);
        exitEditMode();
    };

    function add(title: string) {

        if (title.trim().length > 0) {
            let newId = 0;
            if (todoList.length > 0) {
                newId = todoList.sort((a, b) => a.id > b.id ? -1 : 1)[0].id + 1;
            }
            setTodoList(todoList.concat({
                title: title,
                id: newId,
                url: "",
                completed: false,
                order: newId + 1
            }));
        }
    }

    function completeOne(id: number) {
        const newList = todoList.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                };
            }
            return todo;
        });
        setTodoList(newList);
    }

    function handleRemove(id: number) {
        setTodoList(todoList.filter((todo) => todo.id !== id));
    }

    function clearCompleted() {
        setTodoList(todoList.filter((todo) => !todo.completed));
    }

    function handleFilterChange(filter: TodoListFilter) {
        setFilter(filter);
        exitEditMode()
    }

    const filteredList = orderByOrder(todoList.filter((todo) => {
        switch (filter) {
            case 'ACTIVE':
                return !todo.completed;
            case "COMPLETED":
                return todo.completed;
            default:
                return todo;
        }
    }));

    function orderByOrder(list: Array<Todo>): Array<Todo> {
        return list.sort((a, b) => a.order > b.order ? -1 : 1);
    }

    function enterEditMode(id: number) {
        setEdited({editing: true, id: id});
    }

    const exitEditMode = () => {
        setEdited({editing: false, id: 0})
    };

    const toggleEditMode = (id?: number) => {
        if (id === undefined) {

            exitEditMode();
        }
        enterEditMode(id!);
    };

    return {
        add,
        completeAll,
        completedItems,
        editedTodo,
        exitEditMode,
        filteredList,
        clearCompleted,
        handleEdit,
        handleFilterChange,
        handleRemove,
        selectedFilter,
        todoList,
        toggleEditMode,
        completeOne,
    };

}
export default useTodoHook;