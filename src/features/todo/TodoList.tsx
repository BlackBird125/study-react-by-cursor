import React, { useState, useEffect } from "react";
import { TodoItem } from "./types";
import "./TodoList.styles.css";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState("");

  // ローカルストレージからTodoを読み込む
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Todoが更新されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 新しいTodoを追加
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    const newTodo: TodoItem = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputText("");
  };

  // Todoの完了状態を切り替え
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Todoを削除
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Todoリスト</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="todo-input"
        />
        <button type="submit" className="add-button">
          追加
        </button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? "completed" : ""}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
