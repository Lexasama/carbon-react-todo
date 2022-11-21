import Todo from "../Todo";

interface TodoListProps {
    completeAll: () => void,
    filteredList: Todo[],
    handleEdit: (todo: Todo) => void,
    handleRemove: (id: number) => void,
    toggleCompleted: (id: number) => void,
}

export default TodoListProps;