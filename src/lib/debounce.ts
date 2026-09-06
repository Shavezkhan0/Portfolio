export function debounce<A extends unknown[]>(fn: (...args: A) => void, wait: number) {
  let id: ReturnType<typeof setTimeout> | undefined;
  return (...args: A) => {
    if (id !== undefined) clearTimeout(id);
    id = setTimeout(() => fn(...args), wait);
  };
}