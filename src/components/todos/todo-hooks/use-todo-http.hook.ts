import {deleteAsync, getAsync, postAsync, putAsync, toJSON} from "../../../helpers/api-helper";
import Todo from "../Todo";


const endpoint: string = process.env.REACT_APP_BACKEND + "/todos";

type TodoUpdate = {
    title: string
    completed: boolean
    order: number
}

export async function getAll(): Promise<Array<Todo>> {
    return toJSON(await getAsync(endpoint));
}

export async function create(title: string): Promise<Todo> {
    return toJSON(await postAsync(endpoint, {title}));
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