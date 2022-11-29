import TodoPage from "../../../../components/todos/todo-page/todo-page";
import {TodoListFilter} from "../../../../components/todos/TodoListFilter";
import {render, screen, waitFor} from "@testing-library/react";
import useTodoHook from "../../../../components/todos/todo-hooks/use-todo.hook";
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock("../../../../components/todos/todo-hooks/use-todo.hook");

const mockUseTodo = useTodoHook as jest.MockedFunction<typeof useTodoHook>;
describe("TodoPage should", () => {

    it("NOT display main and footer when no todos", async () => {

        mockUseTodo.mockReturnValue({
            todoList: [],
            completedItems: 0,
            completeAll: () => {
            },
            clearCompleted: () => {
            },
            add: async () => {
            },
            filteredList: [],
            completeOne: () => {
            },
            handleRemove: () => {
            },
            handleEdit: () => {
            }
        });
        render(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        expect(screen.queryByRole('main')).not.toBeInTheDocument();
        expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    });

    it("display input for todo creation", async () => {
        mockUseTodo.mockReturnValue({
            todoList: [],
            completedItems: 0,
            completeAll: () => {
            },
            clearCompleted: () => {
            },
            add: async () => {
            },
            filteredList: [],
            completeOne: () => {
            },
            handleRemove: () => {
            },
            handleEdit: () => {
            }
        })
        render(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        expect(screen.getByRole('textbox')).toBeInTheDocument()
    });

    it("display footer and main when there is a least one todo", async () => {
        mockUseTodo.mockReturnValue(
            {
                todoList: [{id: 1, url: "", order: 1, title: "todo", completed: false}],
                completedItems: 0,
                completeAll: () => {
                },
                clearCompleted: () => {
                },
                add: async () => {
                },
                filteredList: [],
                completeOne: () => {
                },
                handleRemove: () => {
                },
                handleEdit: () => {
                }
            })
        render(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        expect(screen.getByRole('main')).toBeInTheDocument();
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it("should call add", async () => {
        const mockAdd = jest.fn();
        mockUseTodo.mockReturnValue({
            todoList: [],
            completedItems: 0,
            completeAll: () => {
            },
            clearCompleted: () => {
            },
            add: mockAdd,
            filteredList: [],
            completeOne: () => {
            },
            handleRemove: () => {
            },
            handleEdit: () => {
            }
        });

        render(
            <BrowserRouter>
                <TodoPage filter={TodoListFilter.ALL}/>
            </BrowserRouter>);

        userEvent.type(screen.getByRole('textbox'), 'todo{enter}');

        await waitFor(() => {
            expect(mockAdd).toHaveBeenNthCalledWith(1, "todo");

        })
    });

    it("call handle remove", async () => {
        const mockHandleRemove = jest.fn();
        mockUseTodo.mockReturnValue({
            todoList: [{id: 1, title: "todo1", completed: false, order: 1, url: ""}],
            completedItems: 0,
            completeAll: () => {
            },
            clearCompleted: () => {
            },
            add: async () => {
            },
            filteredList: [{id: 1, title: "todo1", completed: false, order: 1, url: ""}],
            completeOne: () => {
            },
            handleRemove: mockHandleRemove,
            handleEdit: () => {
            }
        });

        render(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        userEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(mockHandleRemove).toHaveBeenNthCalledWith(1, 1);
        });
    });
    it("call clearCompleted", async () => {
        const mockClearCompleted = jest.fn();
        mockUseTodo.mockReturnValue({
            todoList: [{id: 1, title: "todo1", completed: true, order: 1, url: ""}],
            completedItems: 1,
            completeAll: () => {
            },
            clearCompleted: mockClearCompleted,
            add: async () => {
            },
            filteredList: [{id: 1, title: "todo1", completed: true, order: 1, url: ""}],
            completeOne: () => {
            },
            handleRemove: () => {
            },
            handleEdit: () => {
            }
        });

        render(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        userEvent.click(screen.getByRole('button', {name: /clear completed/i}));

        await waitFor(() => {
            expect(mockClearCompleted).toHaveBeenCalledTimes(1);
        });
    });

    it("have mark all as completed button checked when todos are completed", async () => {
        mockUseTodo.mockReturnValue({
            todoList: [{id: 1, title: "todo1", completed: true, order: 1, url: ""}],
            completedItems: 1,
            completeAll: () => {
            },
            clearCompleted: () => {
            },
            add: async () => {
            },
            filteredList: [{id: 1, title: "todo1", completed: true, order: 1, url: ""}],
            completeOne: () => {
            },
            handleRemove: () => {
            },
            handleEdit: () => {
            }
        });

        render(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        expect(screen.getByLabelText("toggle all checkbox")).toBeChecked();
    });
    it("NOT have mark all as completed button checked when todos are completed", async () => {
        mockUseTodo.mockReturnValue({
            todoList: [{id: 1, title: "todo1", completed: false, order: 1, url: ""}],
            completedItems: 0,
            completeAll: () => {
            },
            clearCompleted: () => {
            },
            add: async () => {
            },
            filteredList: [{id: 1, title: "todo1", completed: false, order: 1, url: ""}],
            completeOne: () => {
            },
            handleRemove: () => {
            },
            handleEdit: () => {
            }
        });

        render(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        const btn = await screen.findByLabelText(/mark all as complete/i);

        await waitFor(() => {

            expect(btn).not.toBeChecked()
        });
    });

    it("call completeAll", async () => {
        const mockCompletedAll = jest.fn();
        mockUseTodo.mockReturnValue({
            todoList: [{id: 1, title: "todo1", completed: true, order: 1, url: ""}],
            completedItems: 1,
            completeAll: mockCompletedAll,
            clearCompleted: () => {
            },
            add: async () => {
            },
            filteredList: [{id: 1, title: "todo1", completed: true, order: 1, url: ""}],
            completeOne: () => {
            },
            handleRemove: () => {
            },
            handleEdit: () => {
            }
        });

        render(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        userEvent.click(screen.getByText(/mark all as complete/i));

        await waitFor(() => {
            expect(mockCompletedAll).toHaveBeenCalledTimes(1);
        });

    });

    it("call completeOne", async () => {
        const mockCompleteOne = jest.fn();
        mockUseTodo.mockReturnValue({
            todoList: [{id: 1, title: "todo1", completed: true, order: 1, url: ""}],
            completedItems: 1,
            completeAll: () => {
            },
            clearCompleted: () => {
            },
            add: async () => {
            },
            filteredList: [{id: 1, title: "todo1", completed: true, order: 1, url: ""}],
            completeOne: mockCompleteOne,
            handleRemove: () => {
            },
            handleEdit: () => {
            }
        });

        render(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        userEvent.click(screen.getByTestId("todo-toggle"));

        await waitFor(() => {
            expect(mockCompleteOne).toHaveBeenNthCalledWith(1, 1);
        });
    });
    it("NOT have checked todo when todo is active", async () => {
        mockUseTodo.mockReturnValue({
            todoList: [{id: 1, title: "todo1", completed: false, order: 1, url: ""}],
            completedItems: 1,
            completeAll: () => {
            },
            clearCompleted: () => {
            },
            add: async () => {
            },
            filteredList: [{id: 1, title: "todo1", completed: false, order: 1, url: ""}],
            completeOne: () => {
            },
            handleRemove: () => {
            },
            handleEdit: () => {
            }
        });

        render(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        await waitFor(() => {
            expect(screen.getByTestId("todo-toggle")).not.toBeChecked();
        });
    });

    it("have todo checked when todo is completed", async () => {
        mockUseTodo.mockReturnValue({
            todoList: [{id: 1, title: "todo1", completed: true, order: 1, url: ""}],
            completedItems: 1,
            completeAll: () => {
            },
            clearCompleted: () => {
            },
            add: async () => {
            },
            filteredList: [{id: 1, title: "todo1", completed: true, order: 1, url: ""}],
            completeOne: () => {
            },
            handleRemove: () => {
            },
            handleEdit: () => {
            }
        });

        render(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);


        await waitFor(() => {
            expect(screen.getByTestId("todo-toggle")).toBeChecked();
        });
    });

    it("call handleEdit", async () => {
        const mockHandleEdit = jest.fn();
        mockUseTodo.mockReturnValue({
            todoList: [{id: 1, title: "todo1", completed: true, order: 1, url: ""}],
            completedItems: 1,
            completeAll: () => {
            },
            clearCompleted: () => {
            },
            add: async () => {
            },
            filteredList: [{id: 1, title: "todo1", completed: true, order: 1, url: ""}],
            completeOne: () => {
            },
            handleRemove: () => {
            },
            handleEdit: mockHandleEdit
        });

        render(<BrowserRouter>
            <TodoPage filter={TodoListFilter.ALL}/>
        </BrowserRouter>);

        userEvent.dblClick(screen.getByText("todo1"));
        const newTitle = "newTitle";
        const editInput = screen.getByTestId('todo-edit');
        userEvent.type(editInput, `${newTitle}{enter}`);

        await waitFor(() => {
            expect(mockHandleEdit).toHaveBeenNthCalledWith(1, {
                id: 1, title: "todo1" + newTitle, completed: true, order: 1, url: ""
            });
        });
    });

});