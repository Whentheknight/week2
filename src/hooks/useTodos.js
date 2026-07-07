import { useEffect, useState } from 'react';

const STORAGE_KEY = 'opencode_todos';

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return todos.map(t => ({ priority: 0, ...t }));
}

export function useTodos() {
  const [todos, setTodos] = useState(loadTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(text, priority = 0) {
    text = text.trim();
    if (!text) return;
    setTodos(prev => [{ id: Date.now(), text, completed: false, priority }, ...prev]);
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function updateTodo(id, updates) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  }

  function setPriority(id, priority) {
    updateTodo(id, { priority });
  }

  function destroyTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed));
  }

  return { todos, addTodo, toggleTodo, updateTodo, setPriority, destroyTodo, clearCompleted };
}
