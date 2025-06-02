import React from "react";
import "./MainLayout.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <header className="header">
        <h1>タスク管理アプリ</h1>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>&copy; 2024 タスク管理アプリ</p>
      </footer>
    </div>
  );
};

export default MainLayout;
