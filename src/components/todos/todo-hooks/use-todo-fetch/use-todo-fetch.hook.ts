import {useEffect, useState} from "react";
import Todo from "../../Todo";
import useTodoHttpHook from "../use-todo-http.hook";
import {orderByOrder} from "../todo-common";

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
        getAll,
        create,
        update,
        updateCompleteAll,
    } = useTodoHttpHook();

    async function getList() {
        const list = await getAll();
        setTodoList(list);
    }

    const [todoList, setTodoList] = useState<Todo[]>([]);
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

    return {
        add,
        completeAll,
        completedItems,
        filteredList,
        clearCompleted,
        handleEdit,
        handleRemove,
        todoList,
        completeOne,
    };
}
export default useTodoFetchHook;