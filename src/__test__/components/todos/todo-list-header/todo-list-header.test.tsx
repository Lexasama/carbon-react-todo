import TodoListHeader from "../../../../components/todos/todo-list-header/todo-list-header";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("TodoListHeader should", () => {


    it("display input with placeholder", async () => {

        render(<TodoListHeader onAdd={() => {
        }}/>);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument()
    });

    it('call add key is down', async function () {
        const add = jest.fn();
        const title = "title";
        render(<TodoListHeader onAdd={add}/>);
        const inputEl = screen.getByRole('textbox');
        userEvent.type(inputEl, `${title}{enter}`)

        expect(add).toBeCalledTimes(1);
        expect(add).toHaveBeenNthCalledWith(1, title);
    });

    it('have an empty input when escape key is pressed', async () => {
        const title = "title";
        render(<TodoListHeader onAdd={() => {
        }}/>);
        const inputEl = screen.getByRole('textbox') as HTMLInputElement;
        userEvent.type(inputEl, `${title}{escape}`)

        expect(inputEl.value).toBe("");
    });

    it('not call add when escape key is pressed', async () => {
        const title = "title";
        const add = jest.fn()
        render(<TodoListHeader onAdd={add}/>);
        const inputEl = screen.getByRole('textbox');
        userEvent.type(inputEl, `${title}{escape}`)

        expect(add).toBeCalledTimes(0);
    })

})