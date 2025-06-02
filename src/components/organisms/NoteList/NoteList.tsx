import React, { useState, useEffect } from "react";
import Card from "../../molecules/Card/Card";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import { Note } from "../../../types/note";
import "./NoteList.styles.css";

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;

    const now = new Date().toISOString();

    if (editingId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? { ...note, title, content, updatedAt: now }
            : note
        )
      );
      setEditingId(null);
    } else {
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

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

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
    <Card title="メモ帳" className="notes-container">
      <form onSubmit={handleSubmit} className="note-form">
        <FormField
          label="タイトル"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力..."
          required
        />
        <div className="form-field">
          <label className="input-label">内容</label>
          <textarea
            className="note-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="メモの内容を入力..."
          />
        </div>
        <Button type="submit">{editingId !== null ? "更新" : "追加"}</Button>
      </form>

      <div className="note-list">
        {notes.map((note) => (
          <Card key={note.id} className="note-item">
            <div className="note-header">
              <h3>{note.title}</h3>
              <div className="note-actions">
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => startEditing(note)}
                >
                  編集
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => deleteNote(note.id)}
                >
                  削除
                </Button>
              </div>
            </div>
            <p className="note-content">{note.content}</p>
            <div className="note-footer">
              <span>作成: {formatDate(note.createdAt)}</span>
              <span>更新: {formatDate(note.updatedAt)}</span>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default NoteList;
