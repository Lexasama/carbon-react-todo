import {TodoListFilter} from "../TodoListFilter";

export interface TodoListFooterProps {
    itemLeft: number,
    selectedFilter: string,
    onFilterChange: (filter: TodoListFilter) => void,
    onClear: () => void
}