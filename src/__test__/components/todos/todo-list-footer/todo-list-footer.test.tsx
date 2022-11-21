import TodoListFooter from "../../../../components/todos/todo-list-footer/TodoListFooter";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";

const onClear = jest.fn();
const onFilterChange = jest.fn();

describe("TodoListFooter should", () => {

    it.each`
    activeItems | expectedText
    ${0} | ${'items left'}
    ${1} | ${'item left'}
    ${10} | ${'items left'}`
    ("display '$activeItems $expectedText'", async ({activeItems, expectedText}) => {

        const count = Number(activeItems);

        render(
            <BrowserRouter>
                <TodoListFooter completedItems={0} activeItems={count} selectedFilter={"ALL"}
                                onFilterChange={onFilterChange} onClear={onClear}/>
            </BrowserRouter>);

        expect(screen.getByText(activeItems)).toBeInTheDocument();
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    it("display the filters", async () => {

        render(
            <BrowserRouter>
                <TodoListFooter completedItems={0} activeItems={0} selectedFilter={"ALL"}
                                onFilterChange={onFilterChange}
                                onClear={onClear}/>
            </BrowserRouter>);

        expect(screen.getByRole('link', {name: /all/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /active/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /completed/i})).toBeInTheDocument();
    });

    it("display 'Clear completed items' when there is at least 1 completed todo", async () => {

        render(
            <BrowserRouter>
                <TodoListFooter completedItems={1} activeItems={0} selectedFilter={"ALL"}
                                onFilterChange={onFilterChange}
                                onClear={onClear}/>
            </BrowserRouter>);

        const btn = screen.getByRole('button', {
            name: /clear completed/i
        })
        expect(btn).toBeInTheDocument();
    });

    it("NOT display 'Clear completed items' when there 0 completed todo", async () => {

        render(
            <BrowserRouter>
                <TodoListFooter completedItems={0} activeItems={0} selectedFilter={"ALL"}
                                onFilterChange={onFilterChange}
                                onClear={onClear}/>
            </BrowserRouter>);

        expect(screen.queryByRole('button', {
            name: /clear completed/i
        })).not.toBeInTheDocument();
    });

    it("call onClear when button is clicked", async () => {

        render(<BrowserRouter>
            <TodoListFooter completedItems={1} activeItems={0} selectedFilter={"ALL"} onFilterChange={onFilterChange}
                            onClear={onClear}/>
        </BrowserRouter>);

        const btn = screen.getByRole('button', {
            name: /clear completed/i
        })
        userEvent.click(btn);
        expect(onClear).toBeCalledTimes(1);
    });
});