"use client";
import { useState } from "react";
import useStore from "./store/useStore";
import { FilterType, Todo, TodoState, useTodoStore } from "./store/zustand";

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");

  const {
    addTodo,
    removeTodo,
    toggleCompletedState,
    clearCompletedTodos,
    filterTodos,
  } = useTodoStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  };

  const todos = useStore<TodoState, Todo[]>({
    store: useTodoStore,
    callback: (state: TodoState) => state.todos,
  });
  const filteredTodos = useStore<TodoState, Todo[]>({
    store: useTodoStore,
    callback: (state: TodoState) => state.filteredTodos,
  });

  const key = filterType === "all" ? todos : filteredTodos;

  return (
    <main className="w-full h-screen bg-slate-800 text-white flex justify-center">
      <div className="pt-8">
        <h1 className="my-8 text-3xl font-semibold">Hassan Mohammadi</h1>
        <div className="flex gap-8 my-4">
          <button
            onClick={() => setFilterType("all")}
            className={filterType === "all" ? "bg-red-600 px-4 rounded-lg" : ""}
          >
            all
          </button>
          <button
            onClick={() => {
              filterTodos("completed");
              setFilterType("completed");
            }}
            className={
              filterType === "completed" ? "bg-red-600 px-4 rounded-lg" : ""
            }
          >
            Completed
          </button>
          <button
            onClick={() => {
              filterTodos("active");
              setFilterType("active");
            }}
            className={
              filterType === "active" ? "bg-red-600 px-4 rounded-lg" : ""
            }
          >
            Active
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            className="rounded-lg text-black px-2 py-0.5"
            placeholder="Write something ..."
            autoFocus
          />
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-4 py-1 font-medium"
            disabled={!newTodo}
          >
            Add Todo
          </button>
        </form>
        <ul className="rounded-lg  font-medium mt-5 ">
          {key?.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between bg-purple-600 px-4 py-2 rounded-lg items-center my-4"
            >
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompletedState(todo.id, filterType)}
                  className="cursor-pointer size-4"
                />
                <span>{todo.description}</span>
              </div>
              <button
                onClick={() => removeTodo(todo.id)}
                className="rounded-lg bg-red-700 px-2 py-1 font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {!!key?.length && (
          <button
            onClick={clearCompletedTodos}
            className="rounded-lg bg-red-600 px-4 py-1 font-medium mt-5"
          >
            Clear Completed
          </button>
        )}
      </div>
    </main>
  );
}
