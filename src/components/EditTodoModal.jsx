import { useEffect, useState } from 'react';
import PrioritySelect from './PrioritySelect.jsx';
import './EditTodoModal.css';

export default function EditTodoModal({ todo, onSave, onClose }) {
  const [text, setText] = useState(todo.text);
  const [priority, setPriority] = useState(todo.priority);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  function handleSave() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSave(todo.id, { text: trimmed, priority });
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h2>Teendő szerkesztése</h2>
        <input
          className="modal-text-input"
          value={text}
          onChange={e => setText(e.target.value)}
          autoFocus
        />
        <div className="modal-priority-row">
          <span>Prioritás</span>
          <PrioritySelect value={priority} onChange={setPriority} />
        </div>
        <div className="modal-actions">
          <button type="button" className="modal-cancel" onClick={onClose}>Mégse</button>
          <button type="button" className="modal-save" onClick={handleSave}>Mentés</button>
        </div>
      </div>
    </div>
  );
}
