import TodoItem from './TodoItem.jsx';
import './TodoList.css';

export default function TodoList({ todos, onToggle, onDestroy, onEdit, onPriorityChange }) {
  return (
    <ul className="todo-list">
      {todos.length === 0 ? (
        <li className="empty-state">Nincs megjeleníthető teendő</li>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDestroy={onDestroy}
            onEdit={onEdit}
            onPriorityChange={onPriorityChange}
          />
        ))
      )}
    </ul>
  );
}
