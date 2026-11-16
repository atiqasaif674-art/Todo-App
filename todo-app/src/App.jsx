//Ye hamari main file hai. Ismein tasks ka data, editing, filtering aur Local
//  Storage handle hoga.
import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";
function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("my-todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    localStorage.setItem("my-todos", JSON.stringify(todos));
  }, [todos]);
  function addTodo(text) {
    const newTodo = {
      //Iska kaam har task ko ek unique ID dena hai
      id: crypto.randomUUID(),
      //  text: "Learn React"
      text,
      //Jab nayi task add hogi, to shuru mein uski value false hogi
      completed: false,
    };
    //previousTodos mein tasks ki purani list hoti hai, yani function ko state ki current value milti hai
    //Ye purani list ke elements ko nayi array mein copy karta hai 
    setTodos((previousTodos) => [...previousTodos, newTodo]);
  }
  function toggleTodo(id) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed }: todo
      )
    );
  }
  function deleteTodo(id) {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => todo.id !== id)
    );
    if (editingId === id) {
      setEditingId(null);
    }
  }
  function startEditing(todo) {
    setEditingId(todo.id);
  }
  function saveEdit(id, newText) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
    setEditingId(null);
  }
  function clearCompleted() {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => !todo.completed)
    );
  }
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });
  const remainingTodos = todos.filter(
    (todo) => !todo.completed).length;
  return (
    <main className="app-container">
      <section className="todo-card">
        <header className="app-header">
          <div className="app-icon">✓</div>
          <h1>My Todo List</h1>
          <p>Organize your day, one task at a time.</p>
        </header>
        <TodoForm onAddTodo={addTodo} />
        <div className="todo-stats">
          {/* Ye batati hai ke kitne tasks abhi complete karna baqi hain */}
          <span>{remainingTodos} task{remainingTodos !== 1 ? "s" : ""} left</span>
          {/* Ye tumhare Todo App mein total tasks ki tadaad dikhati hai */}
          <span>{todos.length} total</span>
        </div>
        <div className="filter-buttons">
          {["all", "active", "completed"].map((item) => (
            <button key={item} type="button" className={filter === item ? "filter-btn selected" : "filter-btn"} onClick={() => setFilter(item)}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={startEditing} onSaveEdit={saveEdit} editingId={editingId}/>
        {todos.some((todo) => todo.completed) && (
          <button type="button" className="clear-btn" onClick={clearCompleted}>Clear Completed Tasks</button>
        )}
        <footer className="app-footer">
          Made with React ❤️
        </footer>
      </section>
    </main>
  );
}
export default App;