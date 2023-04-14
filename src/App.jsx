import { useState, useEffect } from "react";
import "./styles.css";
import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    // napravi segashnite todota da vurnat segashnite plus novoto todo
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, compleated: false },
      ];
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      // filtrira masiva i vrushta nov masiv koito e ot vsichki todota bez tova koeto machva epxreshuna
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  function toggleTodo(id, compleated) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, compleated };
        }
        return todo;
      });
    });
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo list</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
