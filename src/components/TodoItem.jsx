import PriorityBadge from './PriorityBadge.jsx';
import PrioritySelect from './PrioritySelect.jsx';

export default function TodoItem({ todo, onToggle, onDestroy, onEdit, onPriorityChange }) {
  return (
    <li className={'todo-item' + (todo.completed ? ' completed' : '')}>
      <div className="toggle" onClick={() => onToggle(todo.id)} />
      <PriorityBadge priority={todo.priority} />
      <span className="text">{todo.text}</span>
      <PrioritySelect
        compact
        value={todo.priority}
        onChange={value => onPriorityChange(todo.id, value)}
      />
      <button className="edit" onClick={() => onEdit(todo)}>&#9998;</button>
      <button className="destroy" onClick={() => onDestroy(todo.id)}>&times;</button>
    </li>
  );
}
