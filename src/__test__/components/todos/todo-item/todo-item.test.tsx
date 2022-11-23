import {TodoListItemProps} from "../../../../components/todos/todo-item/TodoListItemProps";
import {fireEvent, render, screen} from "@testing-library/react";
import TodoItem from "../../../../components/todos/todo-item/todo-item";
import Todo from "../../../../components/todos/Todo";
import userEvent from "@testing-library/user-event";

const title = "title";
const todo: Todo = {
    completed: false,
    order: 0,
    url: "",
    id: 0,
    title: title
}
const onToggle = jest.fn();
const onRemove = jest.fn();
const onEdit = jest.fn();
const onEditMode = jest.fn();

const props: TodoListItemProps = {
    todo: todo,
    isEdited: false,
    onEdit: onEdit,
    onRemove: onRemove,
    onToggle: onToggle,
    onEditMode: onEditMode
}

describe("TodoItem should", () => {

    test('display the given todo title, delete button, toggle button and NOT display edit', () => {
        render(<TodoItem {...props} />);

        expect(screen.getByText(`${title}`)).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByTestId("todo-toggle")).toBeInTheDocument();
        expect(screen.queryByTestId("todo-edit")).not.toBeInTheDocument();
    });

    test('call toggle when toggle button is clicked', async () => {

        render(<TodoItem {...props}/>)

        const button = screen.getByTestId("todo-toggle");
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onToggle).toHaveBeenCalledWith(todo.id);
    });

    test('call remove is called with the right params when toggle button is clicked', async () => {

        render(<TodoItem {...props}/>)

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument()

        fireEvent.click(button);

        expect(onRemove).toHaveBeenCalledTimes(1);
        expect(onRemove).toHaveBeenCalledWith(todo.id);
    });

    test('display edit input when isEdited true', async () => {

        render(<TodoItem
            todo={todo}
            onToggle={onToggle}
            onRemove={onRemove}
            isEdited={true}
            onEdit={onEdit} onEditMode={onEditMode}/>)

        expect(screen.getByTestId("todo-edit")).toBeInTheDocument();
    });

    test("call onEdit when Enter key is pressed", async () => {
        render(<TodoItem
            todo={todo}
            onToggle={onToggle}
            onRemove={onRemove}
            isEdited={true}
            onEdit={onEdit}
            onEditMode={onEditMode}/>);

        const newTitle = "newTitle";
        const editInput = screen.getByTestId('todo-edit');
        userEvent.type(editInput, `${newTitle}{enter}`);

        expect(onEdit).toHaveBeenCalledTimes(1);

        expect(onEdit).toHaveBeenNthCalledWith(1, {
            completed: false,
            order: 0,
            url: "",
            id: 0,
            title: title + newTitle
        })
    });
});