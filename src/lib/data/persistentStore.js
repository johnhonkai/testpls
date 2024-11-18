import { writable } from 'svelte/store';

export function persistentStore(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  const data = storedValue ? JSON.parse(storedValue) : initialValue;

  const store = writable(data);

  store.subscribe((value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return store;
}