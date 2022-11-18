import {TodoListFilter} from "../TodoListFilter";

export interface TodoListFooterProps {
    completedItems: number
    activeItems: number,
    selectedFilter: string,
    onFilterChange: (filter: TodoListFilter) => void, //Todo remove this
    onClear: () => void
}