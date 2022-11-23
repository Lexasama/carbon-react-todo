import {deleteAsync, getAsync, postAsync, putAsync} from "../helpers/api-helper";
import Todo from "../components/todos/Todo";
import {TodoUpdate} from "./TodoUpdate";

const endpoint: string = process.env.REACT_APP_BACKEND + "/todos";

export async function getAll(): Promise<Array<Todo>> {
    return await getAsync(endpoint);
}

export async function create(title: string) {
    return postAsync(endpoint, {title});
}

export async function update(id: number, todo: TodoUpdate) {
    return putAsync(`${endpoint}/${id}`, todo);
}

export async function deleteOne(id: number) {
    return deleteAsync(`${endpoint}/${id}`);
}

export async function deleteCompleted() {
    return deleteAsync(`${endpoint}?completed=${true}`);
}

export async function updateCompleteAll() {
    return putAsync(`${endpoint}/complete-all`, {});
}