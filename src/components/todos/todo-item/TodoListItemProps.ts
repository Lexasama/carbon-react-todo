import Todo from "../Todo";

export interface TodoListItemProps {
    todo: Todo,
    onToggle: (id: number) => void,
    onRemove: (id: number) => void,
    onEnterEdit: (id?: number) => void,
    isEdited: boolean,
    onEdit: (todo: Todo) => void
}