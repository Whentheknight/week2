import { useMemo } from 'react';
import { PRIORITY_LEVELS } from '../constants/priority.js';
import './Stats.css';

export default function Stats({ todos }) {
  const stats = useMemo(() => {
    const total = todos.length;
    const active = todos.filter(t => !t.completed).length;
    const completed = total - active;
    const byPriority = PRIORITY_LEVELS.map(p => ({
      ...p,
      count: todos.filter(t => t.priority === p.value).length,
    }));
    return { total, active, completed, byPriority };
  }, [todos]);

  if (stats.total === 0) return null;

  return (
    <div className="stats">
      <div className="stats-row">
        <span className="stats-item">
          <span className="stats-number">{stats.total}</span> Összesen
        </span>
        <span className="stats-item">
          <span className="stats-number">{stats.active}</span> Aktív
        </span>
        <span className="stats-item">
          <span className="stats-number">{stats.completed}</span> Kész
        </span>
      </div>
      <div className="stats-row">
        {stats.byPriority.map(p => (
          <span className="stats-item" key={p.value}>
            <span className="stats-dot" style={{ backgroundColor: p.color }} />
            {p.label}: <span className="stats-number">{p.count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
