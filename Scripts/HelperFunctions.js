export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function randomEnemyInterval() {
  return Math.floor(Math.random() * 4000) + 3000;
}
