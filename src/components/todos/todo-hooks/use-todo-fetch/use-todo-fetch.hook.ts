import {useEffect, useState} from "react";
import Todo from "../../Todo";
import useTodoHttpHook from "../use-todo-http.hook";
import {filterList, orderByOrder} from "../todo-common";
import {TodoListFilter} from "../../TodoListFilter";

const useTodoFetchHook = (filter: TodoListFilter = TodoListFilter.ALL) => {

    useEffect(() => {
        try {
            getList();
        } catch (e) {
            console.error(e);
        }
    }, []);

    const {
        create,
        deleteCompleted,
        deleteOne,
        getAll,
        update,
        updateCompleteAll,
    } = useTodoHttpHook();

    async function getList() {
        const list = await getAll();
        setTodoList(list);
    }

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const completedList = filterList(todoList, TodoListFilter.COMPLETED);
    const completedItems = completedList.length;

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
            console.error(e);
        }
    }

    const filteredList = orderByOrder(filterList(todoList, filter));

    return {
        add,
        clearCompleted,
        completeAll,
        completedItems,
        completeOne,
        filteredList,
        handleEdit,
        handleRemove,
        todoList
    };
}
export default useTodoFetchHook;