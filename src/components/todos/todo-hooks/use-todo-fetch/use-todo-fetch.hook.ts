import {useEffect, useState} from "react";
import Todo from "../../Todo";
import {TodoListFilter} from "../../TodoListFilter";
import useTodoHttpHook from "../use-todo-http.hook";

const useTodoFetchHook = (filter: string = "ALL") => {

    useEffect(() => {
        try {
            getList();
        } catch (e) {
            console.error(e);
        }
    }, []);

    const {
        deleteCompleted,
        deleteOne,
        getAll, create,
        update,
        updateCompleteAll,

    } = useTodoHttpHook();

    async function getList() {
        const list = await getAll();
        setTodoList(list);
    }

    const [todoList, setTodoList] = useState<Todo[]>([]);

    const [selectedFilter, setFilter] = useState(TodoListFilter.ALL);

    const completedItems = todoList.filter((t) => t.completed).length;

    async function completeAll() {
        try {
            await updateCompleteAll();
            await getList();
        } catch (e) {
            console.error(e);
        }
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
    }

    async function add(title: string) {
        title = title.trim();
        if (title.length > 0) {
            try {
                await create(title);
                await getList();
            } catch (e) {
                console.error(e)
            }
        }
    }

    async function completeOne(id: number) {
        const updatedTodo = todoList.find(t => t.id === id);

        if (updatedTodo) {
            try {
                await update(id, {
                    completed: !updatedTodo.completed,
                    title: updatedTodo.title,
                    order: updatedTodo.order
                });
                await getList();
            } catch (e) {
                console.error(e);
            }
        }
    }

    async function handleRemove(id: number) {
        try {
            await deleteOne(id);
            await getList();
        } catch (e) {
            console.error(e);
        }
    }

    async function clearCompleted() {
        try {
            await deleteCompleted();
            await getList();
        } catch (e) {
            console.error(e)
        }
    }

    function handleFilterChange(filter: TodoListFilter) {
        setFilter(filter);
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

    return {
        add,
        completeAll,
        completedItems,
        filteredList,
        clearCompleted,
        handleEdit,
        handleFilterChange,
        handleRemove,
        selectedFilter,
        todoList,
        completeOne,
    };
}
export default useTodoFetchHook;