import {KeyboardEvent} from "react";

export interface TodoListHeaderProps {

    onFocus: () => void;
    onAdd: (e: KeyboardEvent<HTMLInputElement>) => void
}