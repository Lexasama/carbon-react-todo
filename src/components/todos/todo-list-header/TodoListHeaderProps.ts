import {KeyboardEvent} from "react";

export default interface TodoListHeaderProps {

    onFocus: () => void;
    onAdd: (e: KeyboardEvent<HTMLInputElement>) => void
}