import './Footer.css';

const FILTERS = [
  { key: 'all', label: 'Összes' },
  { key: 'active', label: 'Aktív' },
  { key: 'completed', label: 'Kész' },
];

export default function Footer({ activeCount, completedCount, filter, onFilterChange, onClearCompleted }) {
  return (
    <div className="footer">
      <span className="todo-count">{activeCount} teendő hátra</span>
      <div className="filters">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={filter === f.key ? 'active' : ''}
            onClick={() => onFilterChange(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Kész törlése
        </button>
      )}
    </div>
  );
}
