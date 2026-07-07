export const PRIORITY_LEVELS = [
  { value: 3, label: 'Magas', color: '#FF4D4F' },
  { value: 2, label: 'Közepes', color: '#FAAD14' },
  { value: 1, label: 'Alacsony', color: '#52C41A' },
  { value: 0, label: 'Nincs', color: '#D9D9D9' },
];

export function getPriorityMeta(value) {
  return PRIORITY_LEVELS.find(p => p.value === value) ?? PRIORITY_LEVELS[PRIORITY_LEVELS.length - 1];
}
