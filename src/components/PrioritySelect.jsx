import { useEffect, useRef, useState } from 'react';
import { PRIORITY_LEVELS, getPriorityMeta } from '../constants/priority.js';
import './PrioritySelect.css';

export default function PrioritySelect({ value, onChange, compact = false }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const meta = getPriorityMeta(value);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    function handleEscape(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  function selectValue(v) {
    onChange(v);
    setOpen(false);
  }

  return (
    <div className={'priority-select' + (compact ? ' compact' : '')} ref={rootRef}>
      <button
        type="button"
        className="priority-select-trigger"
        onClick={() => setOpen(o => !o)}
      >
        <span className="priority-dot" style={{ backgroundColor: meta.color }} />
        {!compact && <span className="priority-select-label">{meta.label}</span>}
      </button>
      {open && (
        <ul className="priority-select-options">
          {PRIORITY_LEVELS.map(level => (
            <li key={level.value}>
              <button
                type="button"
                className={'priority-select-option' + (level.value === value ? ' selected' : '')}
                onClick={() => selectValue(level.value)}
              >
                <span className="priority-dot" style={{ backgroundColor: level.color }} />
                {level.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
