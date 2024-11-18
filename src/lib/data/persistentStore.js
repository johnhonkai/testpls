import { writable } from 'svelte/store';

function persistentStore(key, initialValue) {
  // Check if running in the browser
  const isBrowser = typeof window !== 'undefined';

  // Initialize the store
  const store = writable(initialValue, () => {
    if (isBrowser) {
      const json = localStorage.getItem(key);
      if (json) {
        store.set(JSON.parse(json));
      }
    }

    // Subscribe to changes and save them to localStorage
    const unsubscribe = store.subscribe((value) => {
      if (isBrowser) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    });

    return unsubscribe;
  });

  return store;
}

export { persistentStore };
