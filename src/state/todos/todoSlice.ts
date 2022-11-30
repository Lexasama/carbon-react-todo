import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Todo from "../../components/todos/Todo";
import {AppDispatch, RootState} from "../store";
import {AddAction, DeleteOneAction, EditTodoAction, GetAllAction, ToggleCompletedAction} from "./todoActions";
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
    reducers: {
        create: (state, action: AddAction) => {
            const title = action.payload;
            if (title.trim().length > 0) {
                let newId = 0;
                if (state.todoList.length > 0) {
                    newId = state.todoList.sort((a, b) => a.id > b.id ? -1 : 1)[0].id + 1;
                }
                state.todoList = state.todoList.concat({
                    title: title,
                    id: newId,
                    url: `todos/${newId}`,
                    completed: false,
                    order: newId + 1
                })
            }
        },
        toggleCompleted: (state, action: ToggleCompletedAction) => {
            const newList = state.todoList.map((todo) => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                }
                return todo;
            });
            return {...state, todoList: newList};

        },
        completeAll: (state) => {
            const newList = state.todoList.map((t) => {
                if (!t.completed) {
                    return {...t, completed: true}
                }
                return t;
            });
            return {...state, todoList: newList};
        },
        removeOne: (state, action: DeleteOneAction) => {
            return {...state, todoList: state.todoList.filter((t) => t.id !== action.payload)}
        },
        edit: (state, action: EditTodoAction) => {
            const newList = state.todoList.map((t) => {
                if (t.id === action.payload.id) {
                    return {
                        ...t,
                        title: action.payload.title
                    }
                }
                return t;
            });
            return {...state, todoList: newList}
        },
        removeCompleted: (state) => {
            return {...state, todoList: filterList(state.todoList, TodoListFilter.ACTIVE)}
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAll.fulfilled, (state, action: GetAllAction) => {
            state.todoList = action.payload
        });
    }
});

export const {create, edit, completeAll, removeCompleted, removeOne, toggleCompleted} = todoSlice.actions;

export const selectTodos = (state:
                                RootState) => state.todos.todoList;

export const selectCompletedItems = (state: RootState) => filterList(state.todos.todoList, TodoListFilter.COMPLETED).length;

export const selectActiveItems = (state: RootState) => filterList(state.todos.todoList, TodoListFilter.ACTIVE).length;

export default todoSlice.reducer;