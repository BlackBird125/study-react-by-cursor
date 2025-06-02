import React, { useState, useEffect } from "react";
import Card from "../../molecules/Card/Card";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import { TodoItem } from "../../../types/todo";
import "./TodoList.styles.css";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    const newTodo: TodoItem = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInputText("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      return b.id - a.id;
    }
    return a.completed ? 1 : -1;
  });

  return (
    <Card title="Todoリスト" className="todo-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <FormField
          label="新しいタスク"
          name="todo"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="新しいタスクを入力..."
          required
        />
        <Button type="submit" size="medium">
          追加
        </Button>
      </form>

      <ul className="todo-list">
        {sortedTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <label className="todo-label">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={todo.completed ? "completed" : ""}>
                {todo.text}
              </span>
            </label>
            <Button
              variant="danger"
              size="small"
              onClick={() => deleteTodo(todo.id)}
            >
              削除
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TodoList;
