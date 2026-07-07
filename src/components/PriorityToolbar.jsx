import { useEffect, useRef, useState } from 'react';
import { PRIORITY_LEVELS } from '../constants/priority.js';
import './PriorityToolbar.css';

export default function PriorityToolbar({ priorityFilter, onPriorityFilterChange, sortByPriority, onSortByPriorityChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  function toggleLevel(value) {
    if (priorityFilter.includes(value)) {
      onPriorityFilterChange(priorityFilter.filter(v => v !== value));
    } else {
      onPriorityFilterChange([...priorityFilter, value]);
    }
  }

  return (
    <div className="priority-toolbar">
      <div className="priority-filter" ref={rootRef}>
        <button type="button" className="priority-filter-trigger" onClick={() => setOpen(o => !o)}>
          Szűrés prioritás szerint{priorityFilter.length > 0 ? ` (${priorityFilter.length})` : ''}
        </button>
        {open && (
          <ul className="priority-filter-options">
            {PRIORITY_LEVELS.map(level => (
              <li key={level.value}>
                <label>
                  <input
                    type="checkbox"
                    checked={priorityFilter.includes(level.value)}
                    onChange={() => toggleLevel(level.value)}
                  />
                  <span className="priority-dot" style={{ backgroundColor: level.color }} />
                  {level.label}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <label className="priority-sort">
        <input
          type="checkbox"
          checked={sortByPriority}
          onChange={e => onSortByPriorityChange(e.target.checked)}
        />
        Rendezés prioritás szerint
      </label>
    </div>
  );
}
