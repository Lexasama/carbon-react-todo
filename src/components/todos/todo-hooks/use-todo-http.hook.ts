import {deleteAsync, getAsync, postAsync, putAsync, toJSON} from "../../../helpers/api-helper";
import Todo from "../Todo";
import {TodoUpdate} from "./use-todo-fetch/TodoUpdate";

const endpoint: string = process.env.REACT_APP_BACKEND + "/todos";

const useTodoHttpHook = () => {

    async function getAll(): Promise<Array<Todo>> {
        return toJSON(await getAsync(endpoint));
    }

    async function create(title: string): Promise<Todo> {
        return toJSON(await postAsync(endpoint, {title}));
    }

    async function update(id: number, todo: TodoUpdate) {
        return putAsync(`${endpoint}/${id}`, todo);
    }

    async function deleteOne(id: number) {
        return deleteAsync(`${endpoint}/${id}`);
    }

    async function deleteCompleted() {
        return deleteAsync(`${endpoint}?completed=${true}`);
    }

    async function updateCompleteAll() {
        return putAsync(`${endpoint}/complete-all`, {});
    }

    return {
        getAll,
        create,
        update,
        deleteCompleted,
        deleteOne,
        updateCompleteAll
    };
}

export default useTodoHttpHook;