// 1234.5 -> "1,234.50" (Indian grouping)
export function formatMoney(num) {
  return Number(num).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// "2026-10-14T00:00:00.000Z" -> "2026-10"
export function monthKey(date) {
  return String(date).slice(0, 7);
}

// "2026-10-14T..." -> "14 Oct 2026"
export function prettyDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });
}
