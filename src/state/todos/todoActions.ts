import Todo from "../../components/todos/Todo";

export type AddAction = {
    type: string,
    payload: string
}

export type  DeleteOneAction = {
    type: string,
    payload: number
}

export type ToggleCompletedAction = {
    type: string,
    payload: number
}
export type EditTodoAction = {
    type: string,
    payload: Todo
}

export type GetAllAction = {
    type: string,
    payload: Todo[]
}