import {render, screen} from "@testing-library/react";
import TodoList from "../../../../components/todos/todo-list/todo-list";
import userEvent from "@testing-library/user-event";

describe("TodoList should", () => {
    it("display given todos", async () => {
        render(<TodoList
            completeAll={() => {
            }}
            todoList={[{id: 0, completed: false, title: 'title', url: "", order: 1}]}
            toggleCompleted={() => {
            }}
            handleRemove={() => {
            }}
            handleEdit={() => {
            }}
            activeItems={0}/>);

        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });

    it("display toggle all checkbox", async () => {
        const todos = [{id: 0, completed: false, title: 'title', url: "", order: 1}, {
            id: 1,
            completed: false,
            title: 'title1',
            url: "",
            order: 2
        }];
        render(<TodoList
            completeAll={() => {
            }}
            todoList={todos}
            toggleCompleted={() => {
            }}
            handleRemove={() => {
            }}
            handleEdit={() => {
            }}
            activeItems={0}
        />);

        expect(screen.getByText(/mark all as complete/i)).toBeInTheDocument();
    });

    it("call toggle all checkbox", async () => {

        const completeAll = jest.fn()
        render(<TodoList
            completeAll={completeAll}
            todoList={[]}
            toggleCompleted={() => {
            }}
            handleRemove={() => {
            }}
            handleEdit={() => {
            }}
            activeItems={0}
        />);

        expect(screen.getByText(/mark all as complete/i)).toBeInTheDocument();
        const completeAllBtn = screen.getByRole("checkbox")
        userEvent.click(completeAllBtn);

        expect(completeAll).toBeCalledTimes(1);
    });
});