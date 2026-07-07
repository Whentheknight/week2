import { useState } from 'react';
import PrioritySelect from './PrioritySelect.jsx';
import './TodoInput.css';

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState(0);

  function submit() {
    onAdd(value, priority);
    setValue('');
    setPriority(0);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') submit();
  }

  return (
    <div className="todo-input-row">
      <input
        className="new-todo"
        placeholder="Mit kell elvégezni?"
        autoFocus
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <PrioritySelect value={priority} onChange={setPriority} />
    </div>
  );
}
