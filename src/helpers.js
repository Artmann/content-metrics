
export function formatEuro(value) {
  return `${formatNumber(value)} €`;
}

export function formatNumber(value) {
  const number = parseInt(value, 10);

  return new Intl.NumberFormat().format(number);
}

export function formatPercentage(value, max) {
  const percent =  Math.round(value / max * 100);
  return `${percent}%`;
}