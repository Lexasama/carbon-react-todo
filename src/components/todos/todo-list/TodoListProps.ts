import Todo from "../Todo";

interface TodoListProps {
    completeAll: () => void,
    editedTodo: { editing: boolean, id: number },
    filteredList: () => Todo[],
    handleEdit: (todo: Todo) => void,
    handleRemove: (id: number) => void,
    toggleCompleted: (id: number) => void,
    toggleEditMode: (id?: number) => void,
}

export default TodoListProps;