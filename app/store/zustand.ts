import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { v4 as uuidv4 } from "uuid";

export type FilterType = "active" | "completed" | "all";

export interface Todo {
  id: string;
  description: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  filteredTodos: Todo[];
  addTodo: (description: string) => void;
  removeTodo: (id: string) => void;
  toggleCompletedState: (id: string, filterType: FilterType) => void;
  clearCompletedTodos: () => void;
  filterTodos: (filterType: "active" | "completed") => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        filteredTodos: [],
        addTodo: (description: string) => {
          set((state) => ({
            todos: [
              ...state.todos,
              {
                id: uuidv4(),
                description,
                completed: false,
              },
            ],
            filteredTodos: [
              ...state.filteredTodos,
              {
                id: uuidv4(),
                description,
                completed: false,
              },
            ],
          }));
        },
        removeTodo: (id: string) => {
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
            filteredTodos: state.filteredTodos.filter((todo) => todo.id !== id),
          }));
        },
        toggleCompletedState: (id: string, filterType: FilterType) => {
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
            filteredTodos: state.filteredTodos
              .map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
              )
              .filter((todo) =>
                filterType === "active" ? !todo.completed : todo.completed
              ),
          }));
        },
        clearCompletedTodos: () => {
          set((state) => ({
            todos: state.todos.filter((todo) => !todo.completed),
            filteredTodos: state.filteredTodos.filter(
              (todo) => !todo.completed
            ),
          }));
        },
        filterTodos: (filterType: "active" | "completed") => {
          set((state) => ({
            filteredTodos: state.todos.filter((todo) => {
              if (filterType === "active") {
                return !todo.completed;
              } else if (filterType === "completed") {
                return todo.completed;
              }
            }),
          }));
        },
      }),
      { name: "todoList" }
    )
  )
);
