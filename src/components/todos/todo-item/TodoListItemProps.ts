import Todo from "../Todo";

export interface TodoListItemProps {
    isEdited: boolean
    todo: Todo,
    onToggle: (id: number) => void,
    onRemove: (id: number) => void,
    onEdit: (todo: Todo) => void
    onEditMode: (id?: number) => void
}