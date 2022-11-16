import TodoItem from "./TodoItem";
import {fireEvent, render, screen} from "@testing-library/react";
import Todo from "../Todo";
import {TodoListItemProps} from "./TodoListItemProps";

const title = "test";
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
const onEnterEdit = jest.fn();

const props: TodoListItemProps = {
    todo: todo,
    isEdited: false,
    onEnterEdit: onEnterEdit,
    onEdit: onEdit,
    onRemove: onRemove,
    onToggle: onToggle
}

test('It should display todo', () => {

    render(<TodoItem {...props}/>)

    expect(screen.getByLabelText(`${title}`)).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument()


    const toggle = screen.getByTestId("todo-toggle");
    expect(toggle).toBeInTheDocument()
});

test('toggle is called when toggle button is clicked', () => {

    render(<TodoItem {...props}/>)

    const button = screen.getByTestId("todo-toggle");
    expect(button).toBeInTheDocument()

    fireEvent.click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(todo.id);
});

test('remove is called with the right params when toggle button is clicked', () => {

    render(<TodoItem {...props}/>)

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument()

    fireEvent.click(button);

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(todo.id);
});