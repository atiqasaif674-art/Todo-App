//Ye component har individual task ko display karega.
import { useEffect, useState } from "react";
function TodoItem({todo,onToggle,onDelete,onEdit,onSaveEdit,isEditing}) {
  const [editText, setEditText] = useState(todo.text);
  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);
  function handleSave(event) {
    event.preventDefault();
    const trimmedText = editText.trim();
    if (!trimmedText) return;
    onSaveEdit(todo.id, trimmedText);
  }
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} 
      aria-label={`Mark ${todo.text} as ${
          todo.completed ? "active" : "completed"
        }`}/>
      {isEditing ? (
        <form className="edit-form" onSubmit={handleSave}>
          <input className="edit-input" value={editText} onChange={(event) => setEditText(event.target.value)} maxLength={200} autoFocus aria-label="Edit task"/>
          <button className="save-btn" type="submit">Save</button>
          <button className="cancel-btn" type="button" onClick={() => onEdit(null)}>Cancel</button>
        </form>
      ) : (
        <>
          <span className="todo-text">{todo.text}</span>
          <div className="todo-actions">
            <button type="button" className="edit-btn" onClick={() => onEdit(todo)} disabled={todo.completed} aria-label={`Edit ${todo.text}`}>✏️</button>
            <button type="button" className="delete-btn" onClick={() => onDelete(todo.id)} aria-label={`Delete ${todo.text}`}>🗑️</button>
          </div>
        </>
      )}
    </li>
  );
}
export default TodoItem;