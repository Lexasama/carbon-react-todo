import Todo from "../Todo";

interface TodoListProps {
    filteredList: () => Todo[],
    editedTodo: { editing: boolean, id: number },
    toggleCompleted: (id: number) => void,
    handleRemove: (id: number) => void,
    toggleEditMode: (id?: number) => void,
    handleEdit: (todo: Todo) => void
}

export default TodoListProps;