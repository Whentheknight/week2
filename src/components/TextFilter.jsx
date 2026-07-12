import './TextFilter.css';

export default function TextFilter({ value, onChange }) {
  return (
    <div className="text-filter">
      <input
        type="text"
        className="text-filter-input"
        placeholder="Szűrés szöveg alapján…"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="text-filter-clear"
          onClick={() => onChange('')}
          aria-label="Szűrés törlése"
        >
          ×
        </button>
      )}
    </div>
  );
}
