import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Todo from "../../components/todos/Todo";
import {AppDispatch, RootState} from "../store";
import {GetAllAction} from "./todoActions";
import {filterList} from "../../components/todos/todo-hooks/todo-common";
import {TodoListFilter} from "../../components/todos/TodoListFilter";
import * as todoApi from "../../components/todos/todo-hooks/use-todo-http.hook";

export type TodoState = {
    todoList: Todo[]
}

const initialState: TodoState = {
    todoList: []
}

export const fetchAll = createAsyncThunk("todos/getAllAsync", async () => {
    return await todoApi.getAll();
});

export const createAsync = createAsyncThunk<Todo, string, { dispatch: AppDispatch, state: RootState }>("todos/createAsync", async (title: string, thunkApi) => {
    const response = await todoApi.create(title);
    if (response.ok) {
        thunkApi.dispatch(fetchAll());
    }
    return (await response.json()) as Todo;
});


export const updateCompletedAsync = createAsyncThunk<Todo, number, { dispatch: AppDispatch, state: RootState }>(
    "todos/updateCompleted", async (id: number, thunkApi) => {
        const todo = thunkApi.getState().todos.todoList.find((t) => t.id === id);
        const response = await todoApi.update(todo!.id,
            {completed: !todo!.completed, order: todo!.order, title: todo!.title}
        );
        if (response.ok) {
            thunkApi.dispatch(fetchAll());
        }
        return (await response.json()) as Todo;
    });
export const updateCompleteAllAsync = createAsyncThunk<void, void, { dispatch: AppDispatch, state: RootState }>("todos/updateCompleteAllAsync", async (_, thunkApi) => {
    const response = await todoApi.updateCompleteAll();
    if (response.ok) {
        thunkApi.dispatch(fetchAll());
    }
});

export const removeCompletedAsync = createAsyncThunk<void, void, { dispatch: AppDispatch, state: RootState }>('todos/removeCompletedAsync', async (_, thunkApi) => {
    const response = await todoApi.deleteCompleted();
    if (response.ok) {
        thunkApi.dispatch(fetchAll())
    }
});

export const removeOneAsync = createAsyncThunk<void, number, { dispatch: AppDispatch, state: RootState }>('todos/removeOneAsync', async (id: number, thunkApi) => {
    const response = await todoApi.deleteOne(id);
    if (response.ok) {
        thunkApi.dispatch(fetchAll())
    }
});

export const editAsync = createAsyncThunk<Todo, Todo, { dispatch: AppDispatch, state: RootState }>('todos/editAsync', async (todo: Todo, thunkApi) => {
    const response = await todoApi.update(todo.id, {
        title: todo.title,
        completed: todo.completed,
        order: todo.order
    });
    if (response.ok) {
        thunkApi.dispatch(fetchAll());
    }
    return (await response.json()) as Todo;
});

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAll.fulfilled, (state, action: GetAllAction) => {
            state.todoList = action.payload
        });
    }
});

export const selectTodos = (state: RootState) => state.todos.todoList;
export const selectCompletedItems = (state: RootState) => filterList(state.todos.todoList, TodoListFilter.COMPLETED).length;
export const selectActiveItems = (state: RootState) => filterList(state.todos.todoList, TodoListFilter.ACTIVE).length;
export default todoSlice.reducer;