export const openDB = () => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      console.warn('IndexedDB not supported');
      resolve({
        transaction: () => ({
          objectStore: () => ({
            get: () => ({ onsuccess: () => {} }),
            put: () => ({ onsuccess: () => {} }),
          }),
        }),
      });
      return;
    }
    const request = indexedDB.open('BabyBitesDB', 5);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('cart')) {
        db.createObjectStore('cart', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('aiData')) {
        db.createObjectStore('aiData', { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      console.warn('IndexedDB open failed');
      reject(request.error);
    };
  });
};
