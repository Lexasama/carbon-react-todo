import {TodoListFilter} from "../TodoListFilter";

export interface TodoListFooterProps {
    completedItems: number
    itemLeft: number,
    selectedFilter: string,
    onFilterChange: (filter: TodoListFilter) => void,
    onClear: () => void
}