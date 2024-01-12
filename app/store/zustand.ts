import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  description: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (description: string) => void;
  removeTodo: (id: string) => void;
  toggleCompletedState: (id: string) => void;
  clearCompletedTodos: () => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
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
    }));
  },
  removeTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  toggleCompletedState: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },
  clearCompletedTodos: () => {
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    }));
  },
}));
