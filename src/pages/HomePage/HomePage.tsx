import React from "react";
import MainLayout from "../../components/templates/MainLayout/MainLayout";
import TodoList from "../../components/organisms/TodoList/TodoList";
import NoteList from "../../components/organisms/NoteList/NoteList";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="home-container">
        <TodoList />
        <NoteList />
      </div>
    </MainLayout>
  );
};

export default HomePage;
