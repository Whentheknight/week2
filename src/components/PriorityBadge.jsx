import { getPriorityMeta } from '../constants/priority.js';
import './PriorityBadge.css';

export default function PriorityBadge({ priority }) {
  const meta = getPriorityMeta(priority);
  return (
    <span className="priority-badge" style={{ backgroundColor: meta.color }}>
      {meta.label}
    </span>
  );
}
