import {rest} from "msw";
import Todo from "../../../../components/todos/Todo";
import {setupServer} from "msw/node";
import {renderHook, waitFor} from "@testing-library/react";
import useTodoHttpHook from "../../../../components/todos/todo-hooks/use-todo-http.hook";

const STATUS_CODE_OK = 200;
const STATUS_CODE_NO_CONTENT = 204;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_CONFLICT = 409;

const defaultTodos: Todo[] = [
    {id: 1, title: "todo", completed: true, order: 1, url: "/todos/1"},
    {
        id: 2, title: "todo1",
        completed: true,
        order: 2,
        url: "/todos/2"
    }]
const TODOS_URL = `${process.env.REACT_APP_BACKEND}/todos`;
const title = "title";
const addedTodo: Todo = {id: 3, title: title, completed: true, order: 3, url: "/todos/3"}

function getAll() {
    return rest.get(TODOS_URL, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(defaultTodos)
        );
    })
}

function create() {
    return rest.post(TODOS_URL, (req, res, ctx) => {
        return res(
            ctx.status(201),
            ctx.json(addedTodo)
        )
    });
}

function update() {
    return rest.put(`${TODOS_URL}/:id`, (req, res, ctx) => {
        return res(ctx.status(STATUS_CODE_OK));
    });
}

const deleteOne = () => {
    return rest.delete(`${TODOS_URL}/:id`, (req, res, ctx) => {
        return res(ctx.status(STATUS_CODE_NO_CONTENT));
    })
}

function deleteCompleted() {
    return rest.delete(`${TODOS_URL}?completed=true`, (req, res, ctx) => {
        return res(ctx.status(STATUS_CODE_NO_CONTENT))
    });
}

const handlers = [getAll(), create(), update(), deleteOne(), deleteCompleted()];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("use-todo-http hook should", () => {

    test("get all todos", async () => {
        const {result} = renderHook(() => useTodoHttpHook());

        const responseTodos = await result.current.getAll();

        await waitFor(() => {
            expect(responseTodos).toStrictEqual(defaultTodos);
        });
    });

    test(`add todo with given ${title}`, async () => {
            const {result} = renderHook(() => useTodoHttpHook());

            const response = await result.current.create(title);

            await waitFor(() => {
                expect(response).toStrictEqual(addedTodo);
            });
        }
    );

    test('return 200Ok when todo is updated', async () => {
        const {result} = renderHook(() => useTodoHttpHook());

        const response = await result.current.update(1, {completed: true, order: 1, title: "title"})
        await waitFor(() => {
            expect(response.status).toBe(200);
        });
    });

    test('delete one return 204 No Content', async () => {
        const {result} = renderHook(() => useTodoHttpHook());

        const response = await result.current.deleteOne(1);
        await waitFor(() => {
            expect(response.status).toBe(STATUS_CODE_NO_CONTENT);
        });
    });

    test('delete completed return No Content', async () => {
        const {result} = renderHook(() => useTodoHttpHook());

        const response = await result.current.deleteCompleted();
        await waitFor(() => {
            expect(response.status).toBe(STATUS_CODE_NO_CONTENT);
        });
    });

    test('mark all as completed return Ok', async () => {
        const {result} = renderHook(() => useTodoHttpHook());

        const response = await result.current.updateCompleteAll();
        await waitFor(() => {
            expect(response.status).toBe(STATUS_CODE_OK);
        });
    })


});


describe("use-todo-http should fail", () => {


    it("with code 204 when delete non existing todo", async () => {

        const error_deleteOne = () => {
            return rest.delete(`${TODOS_URL}/:id`, (req, res, ctx) => {
                return res(ctx.status(STATUS_CODE_NOT_FOUND));
            })

        }

        server.resetHandlers(...[error_deleteOne()]);
        const {result} = renderHook(() => useTodoHttpHook());

        const response = await result.current.deleteOne(1);
        await waitFor(() => {
            expect(response.status).toBe(STATUS_CODE_NOT_FOUND);
        });
    });

    test('with code not found when updating a non existing todo', async () => {

        server.resetHandlers(rest.put(`${TODOS_URL}/:id`, (req, res, ctx) => {
            return res(ctx.status(STATUS_CODE_NOT_FOUND));
        }));
        const {result} = renderHook(() => useTodoHttpHook());

        const response = await result.current.update(1, {completed: true, order: 1, title: "title"})
        await waitFor(() => {
            expect(response.status).toBe(STATUS_CODE_NOT_FOUND);
        });
    });

    test('with code conflict when updating a todo with existing order', async () => {

        server.resetHandlers(rest.put(`${TODOS_URL}/:id`, (req, res, ctx) => {
            return res(ctx.status(STATUS_CODE_CONFLICT));
        }));
        const {result} = renderHook(() => useTodoHttpHook());

        const response = await result.current.update(1, {completed: true, order: 1, title: "title"})
        await waitFor(() => {
            expect(response.status).toBe(STATUS_CODE_CONFLICT);
        });
    });

});