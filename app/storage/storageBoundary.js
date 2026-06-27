function resolveLocalStorage() {
  return globalThis?.window?.localStorage ?? globalThis?.localStorage ?? null;
}

export function createStorageBoundary(resolveStorage = resolveLocalStorage) {
  return {
    read(key) {
      const storage = resolveStorage();
      return storage?.getItem(key) ?? null;
    },
    write(key, value) {
      const storage = resolveStorage();
      if (!storage) return;
      storage.setItem(key, value);
    },
    remove(key) {
      const storage = resolveStorage();
      if (!storage) return;
      storage.removeItem(key);
    },
    exists(key) {
      const storage = resolveStorage();
      if (!storage) return false;
      return storage.getItem(key) !== null;
    },
    safeRead(key, fallback) {
      try {
        const storage = resolveStorage();
        const value = storage?.getItem(key);
        return value ?? fallback;
      } catch (error) {
        return fallback;
      }
    },
    safeWrite(key, value) {
      try {
        const storage = resolveStorage();
        if (!storage) return true;
        storage.setItem(key, value);
        return true;
      } catch (error) {
        return false;
      }
    }
  };
}

export const storageBoundary = createStorageBoundary();
