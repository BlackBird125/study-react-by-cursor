import React from "react";
import TodoList from "./features/todo/TodoList";
import NoteList from "./features/notes/NoteList";
import "./styles/variables.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <TodoList />
        <NoteList />
      </div>
    </div>
  );
}

export default App;
