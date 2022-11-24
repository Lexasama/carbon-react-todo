import {useState} from "react";
import Todo from "../Todo";
import {filterList, orderByOrder} from "./todo-common";

const useTodoHook = (filter: string = "ALL") => {

    const [todoList, setTodoList] = useState<Array<Todo>>([]);

    const completedItems = todoList.filter((t) => t.completed).length;

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

    const completeAll = () => {
        const newList = todoList.map((t) => {
            if (!t.completed) {
                return {...t, completed: true}
            }
            return t;
        });
        setTodoList(newList);
    }

    function clearCompleted() {
        setTodoList(todoList.filter((todo) => !todo.completed));
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
    };

    function handleRemove(id: number) {
        setTodoList(todoList.filter((todo) => todo.id !== id));
    }

    const filteredList = orderByOrder(filterList(todoList, filter));


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
export default useTodoHook;