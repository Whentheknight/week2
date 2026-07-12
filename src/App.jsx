import { useMemo, useState } from 'react';
import { useTodos } from './hooks/useTodos.js';
import TodoInput from './components/TodoInput.jsx';
import TodoList from './components/TodoList.jsx';
import Footer from './components/Footer.jsx';
import PriorityToolbar from './components/PriorityToolbar.jsx';
import EditTodoModal from './components/EditTodoModal.jsx';
import Stats from './components/Stats.jsx';
import './App.css';

export default function App() {
  const { todos, addTodo, toggleTodo, updateTodo, setPriority, destroyTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState([]);
  const [sortByPriority, setSortByPriority] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const filteredTodos = useMemo(() => {
    let result = todos;
    if (filter === 'active') result = result.filter(t => !t.completed);
    else if (filter === 'completed') result = result.filter(t => t.completed);

    if (priorityFilter.length > 0) {
      result = result.filter(t => priorityFilter.includes(t.priority));
    }

    if (sortByPriority) {
      result = [...result].sort((a, b) => b.priority - a.priority);
    }

    return result;
  }, [todos, filter, priorityFilter, sortByPriority]);

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="container">
      <h1>todo</h1>
      <TodoInput onAdd={addTodo} />
      <Stats todos={todos} />
      {todos.length > 0 && (
        <PriorityToolbar
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          sortByPriority={sortByPriority}
          onSortByPriorityChange={setSortByPriority}
        />
      )}
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDestroy={destroyTodo}
        onEdit={setEditingTodo}
        onPriorityChange={setPriority}
      />
      {todos.length > 0 && (
        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />
      )}
      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          onSave={updateTodo}
          onClose={() => setEditingTodo(null)}
        />
      )}
    </div>
  );
}
