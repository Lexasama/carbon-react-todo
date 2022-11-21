import useTodoHook from "../../../../components/todos/todo-page/use-todo-hook";
import {act, renderHook, waitFor} from "@testing-library/react";
import {TodoListFilter} from "../../../../components/todos/TodoListFilter";

describe("useTodoHook should", () => {
    const title = "title";
    it(`add a todo when given ${title}`, async () => {
        const {result} = renderHook(() => useTodoHook());

        await act(() => result.current.add(title));

        await waitFor(() => {
            expect(result.current).toEqual(expect.objectContaining({
                todoList: [{id: 0, title: title, completed: false, order: 1, url: ""}],
            }))
        });
    });

    it('NOT add a todo when given title is empty', async () => {

        const {result} = renderHook(() => useTodoHook());

        await act(() => result.current.add(''));

        await waitFor(() => {
            expect(result.current).toEqual(expect.objectContaining({
                todoList: [],
            }))
        });
    });

    it('mark all todos as completed', async () => {

        const {result} = renderHook(() => useTodoHook());
        await act(() => result.current.add("todo"));
        await act(() => result.current.add("todo1"));
        await act(() => result.current.completeAll());

        await waitFor(() => {
            expect(result.current).toEqual(expect.objectContaining({
                todoList: [{
                    id: 0,
                    title: "todo",
                    completed: true,
                    order: 1,
                    url: "",
                }, {
                    id: 1,
                    title: "todo1",
                    completed: true,
                    order: 2,
                    url: "",
                }],
                completedItems: 2

            }));
        })

    });

    it('toggle a todo', async () => {
        const {result} = renderHook(() => useTodoHook());
        await act(() => result.current.add("todo"));
        await act(() => result.current.add("todo1"));

        await act(() => result.current.completeOne(1));

        await waitFor(() => {
            expect(result.current).toEqual(expect.objectContaining({
                todoList: [{
                    id: 0,
                    title: "todo",
                    completed: false,
                    order: 1,
                    url: ""
                }, {
                    id: 1,
                    title: "todo1",
                    completed: true,
                    order: 2,
                    url: ""
                }],
                completedItems: 1

            }));
        })
    });

    it('clear completed todos', async () => {
        const {result} = renderHook(() => useTodoHook());
        await act(() => result.current.add("todo"));
        await act(() => result.current.add("todo1"));
        await act(() => result.current.completeAll());
        await act(() => result.current.clearCompleted());

        await waitFor(() => {
            expect(result.current).toEqual(expect.objectContaining({
                todoList: [],
                completedItems: 0

            }));
        })
    });

    it.each`
        filter | nameTest
        ${TodoListFilter.ALL} | ${TodoListFilter.ALL}
        ${TodoListFilter.ACTIVE} | ${TodoListFilter.ACTIVE}
        ${TodoListFilter.COMPLETED} | ${TodoListFilter.COMPLETED}
    `('change selected filter to $nameTest', async (filter) => {

        const {result} = renderHook(() => useTodoHook());

        await act(() => {
            result.current.handleFilterChange(filter)
        })

        await waitFor(() => expect(result.current).toEqual(expect.objectContaining({selectedFilter: filter})))
    });

    it('remove todo from the list', async () => {

        const {result} = renderHook(() => useTodoHook());
        await act(() => result.current.add("todo"));
        await act(() => result.current.handleRemove(0));

        await waitFor(() => {
            expect(result.current).toEqual(expect.objectContaining({
                todoList: [],
                completedItems: 0
            }));
        })
    })
});