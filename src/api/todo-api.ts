import {getAsync, postAsync, putAsync} from "../helpers/api-helper";
import Todo from "../components/todos/Todo";
import {TodoUpdate} from "./TodoUpdate";

const endpoint: string = process.env.REACT_APP_BACKEND + "/todos";

export async function getAll(): Promise<Array<Todo>> {
    return await getAsync(endpoint);
}

export async function create(title: string) {
    console.log(title)
    return postAsync(endpoint, {title});
}

export async function update(id: number, todo: TodoUpdate) {
    console.log(todo)
    return putAsync(`${endpoint}/${id}`, todo);
}