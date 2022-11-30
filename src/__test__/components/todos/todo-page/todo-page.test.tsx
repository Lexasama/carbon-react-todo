import TodoPage from "../../../../components/todos/todo-page/todo-page";
import {TodoListFilter} from "../../../../components/todos/TodoListFilter";
import {setupServer} from "msw/node";
import {rest} from "msw";
import {renderWithProviders} from "../../test-utils";
import {screen, waitFor} from '@testing-library/react'
import {BrowserRouter} from "react-router-dom";
import reducer from "../../../../state/reducer";

const URL: string = process.env.REACT_APP_BACKEND + "/todos";

const handlers = [
    rest.get(URL, (req, res, ctx) => {
        return res(ctx.json([]))
    })
];
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe("TodoPage should", () => {

    it("return the inititial state", async () => {
        expect(reducer(undefined, {type: undefined})).toEqual({todos: {todoList: []}});
    });

    it("fetch & receives todo list", async () => {
        server.resetHandlers(...[rest.get(URL, (req, res, ctx) => {
            return res(ctx.json([{id: 1, title: "todo", completed: false, order: 1, url: ""}]))
        })]);
        renderWithProviders(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        await waitFor(() => {
            expect(screen.getByText(/todo/i)).toBeInTheDocument();
        });
    });

    it("NOT display main and footer when no todos", async () => {

        renderWithProviders(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        expect(screen.queryByRole('main')).not.toBeInTheDocument();
        expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    });

    it("display input for todo creation", async () => {

        renderWithProviders(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        expect(screen.getByRole('textbox')).toBeInTheDocument()
    });

    it("display footer and main when there is a least one todo", async () => {

        const initialState = {todos: {todoList: [{id: 1, title: "todo", completed: false, order: 1, url: ""}]}};
        renderWithProviders(
            <BrowserRouter>
                <TodoPage filter={TodoListFilter.ALL}/>
            </BrowserRouter>,
            {
                preloadedState: initialState
            });

        expect(screen.getByRole('main')).toBeInTheDocument();
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });


    it("have mark all as completed button checked when todos are completed", async () => {

        renderWithProviders(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>, {
            preloadedState: {
                todos: {
                    todoList: [{
                        id: 1,
                        title: "todo",
                        completed: true,
                        order: 1,
                        url: ""
                    }]
                }
            }
        });

        expect(screen.getByLabelText("toggle all checkbox")).toBeChecked();
    });

    it("NOT have mark all as completed button checked when todos are completed", async () => {

        renderWithProviders(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>, {
            preloadedState: {
                todos: {
                    todoList: [{
                        id: 1,
                        title: "todo",
                        completed: false,
                        order: 1,
                        url: ""
                    }]
                }
            }
        });

        const btn = await screen.findByLabelText(/mark all as complete/i);

        await waitFor(() => {
            expect(btn).not.toBeChecked()
        });
    });

    it("NOT have checked todo when todo is active", async () => {

        renderWithProviders(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>, {
            preloadedState: {
                todos: {
                    todoList: [{
                        id: 1,
                        title: "todo",
                        completed: false,
                        order: 1,
                        url: ""
                    }]
                }
            }
        });

        await waitFor(() => {
            expect(screen.getByTestId("todo-toggle")).not.toBeChecked();
        });
    });

    it("have todo checked when todo is completed", async () => {
        renderWithProviders(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>, {
            preloadedState: {
                todos: {
                    todoList: [{
                        id: 1,
                        title: "todo",
                        completed: true,
                        order: 1,
                        url: ""
                    }]
                }
            }
        });
        await waitFor(() => {
            expect(screen.getByTestId("todo-toggle")).toBeChecked();
        });
    });
});