export interface TodoListFooterProps {
    completedItems: number
    activeItems: number,
    onClear: () => void
}