import {getAsync, postAsync} from "../helpers/api-helper";
import Todo from "../components/todos/Todo";

const endpoint: string = process.env.REACT_APP_BACKEND + "/todos";

export async function getAll(): Promise<Array<Todo>> {
    return await getAsync(endpoint);
}

export async function create(title: string) {
    return postAsync(endpoint, {title})
}