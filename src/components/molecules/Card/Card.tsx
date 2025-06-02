import React from "react";
import "./Card.css";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className = "" }) => {
  const cardClasses = ["card", className].filter(Boolean).join(" ");

  return (
    <div className={cardClasses}>
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
