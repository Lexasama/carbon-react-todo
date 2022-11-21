import TodoListHeader from "../../../../components/todos/todo-list-header/TodoListHeader";
import TodoListHeaderProps from "../../../../components/todos/todo-list-header/TodoListHeaderProps";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";


const props: TodoListHeaderProps = {
    onAdd: jest.fn(),
}

describe("TodoListHeader should", () => {


    it("display input with placeholder", async () => {

        render(<TodoListHeader {...props}/>);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument()
    });

    it('call add key is down', async function () {

        const title = "title";
        render(<TodoListHeader  {...props}/>);
        const inputEl = screen.getByRole('textbox');
        userEvent.type(inputEl, `${title}{enter}`)

        expect(props.onAdd).toBeCalledTimes(1);
        expect(props.onAdd).toHaveBeenNthCalledWith(1, title);
    });

})