import useTodoHook from "../../../../components/todos/todo-page/use-todo-hook";
import {act, renderHook, waitFor} from "@testing-library/react";

const title = "title";

describe("useTodoHook should", () => {

    it('add a todo', async () => {
        const {result} = renderHook(() => useTodoHook());

        await act(() => result.current.handleAdd(title));

        await waitFor(() => {
            expect(result.current).toEqual(expect.objectContaining({
                todoList: [{id: 0, title: title, completed: false, order: 1, url: ""}],
            }))
        });
    });
});