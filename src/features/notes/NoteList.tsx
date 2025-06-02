import React, { useState, useEffect } from "react";
import { Note } from "./types";
import "./NoteList.styles.css";

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // ローカルストレージからメモを読み込む
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // メモが更新されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // 新しいメモを追加
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;

    const now = new Date().toISOString();

    if (editingId !== null) {
      // メモを更新
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? { ...note, title, content, updatedAt: now }
            : note
        )
      );
      setEditingId(null);
    } else {
      // 新しいメモを作成
      const newNote: Note = {
        id: Date.now(),
        title,
        content,
        createdAt: now,
        updatedAt: now,
      };
      setNotes([...notes, newNote]);
    }

    setTitle("");
    setContent("");
  };

  // メモを編集モードに設定
  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  // メモを削除
  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="notes-container">
      <h1>メモ帳</h1>

      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力..."
          className="note-input"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="メモの内容を入力..."
          className="note-textarea"
        />
        <button type="submit" className="add-button">
          {editingId !== null ? "更新" : "追加"}
        </button>
      </form>

      <div className="note-list">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="note-header">
              <h2>{note.title}</h2>
              <div className="note-actions">
                <button
                  onClick={() => startEditing(note)}
                  className="edit-button"
                >
                  編集
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="delete-button"
                >
                  削除
                </button>
              </div>
            </div>
            <p className="note-content">{note.content}</p>
            <div className="note-footer">
              <span>作成: {formatDate(note.createdAt)}</span>
              <span>更新: {formatDate(note.updatedAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
