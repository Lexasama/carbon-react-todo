import {combineReducers} from "@reduxjs/toolkit";
import todosReducer from "./todos/todoSlice";


const rootReducer = combineReducers({
    todos: todosReducer
});

export default rootReducer;
