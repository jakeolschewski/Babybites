import * as tf from '@tensorflow/tfjs';
import { openDB } from './indexedDB';
import { toast } from 'react-toastify';

export async function getRecommendation(userHistory, products) {
  try {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, inputShape: [products.length], activation: 'relu' }));
    model.add(tf.layers.dense({ units: products.length, activation: 'softmax' }));
    model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' });

    const db = await openDB().catch(() => ({
      transaction: () => ({
        objectStore: () => ({
          get: () => ({ onsuccess: () => {} }),
          put: () => ({ onsuccess: () => {} }),
        }),
      }),
    }));
    const tx = db.transaction(['aiData'], 'readonly');
    const store = tx.objectStore('aiData');
    const request = store.get('federatedModel');
    const weights = await new Promise((resolve) => {
      request.onsuccess = (e) => resolve(e.target.result?.weights || []);
    });

    if (weights.length) {
      model.setWeights(weights.map((w) => tf.tensor(w)));
    }

    const xs = tf.tensor2d([userHistory.map(() => Math.random())]);
    const ys = tf.tensor2d([products.map((_, i) => i === 0 ? 1 : 0)]);
    await model.fit(xs, ys, { epochs: 5, batchSize: 1 });
    const prediction = model.predict(tf.tensor2d([userHistory])).argMax(-1).dataSync()[0];

    const localWeights = model.getWeights();
    const globalWeights = localWeights.map((w) => tf.add(w, tf.randomNormal(w.shape)).div(2));
    const updateTx = db.transaction(['aiData'], 'readwrite');
    const updateStore = updateTx.objectStore('aiData');
    await updateStore.put({ id: 'federatedModel', weights: globalWeights.map((w) => w.dataSync()) });

    return products[prediction];
  } catch (e) {
    console.warn('Recommendation failed:', e);
    toast.warn('Failed to generate recommendation');
    return products[0];
  }
}

export async function updateFederatedChatModel(input, response) {
  try {
    const db = await openDB().catch(() => ({
      transaction: () => ({
        objectStore: () => ({
          put: () => ({ onsuccess: () => {} }),
        }),
      }),
    }));
    const tx = db.transaction(['aiData'], 'readwrite');
    const store = tx.objectStore('aiData');
    await store.put({ id: `chat_${Date.now()}`, input, response, timestamp: new Date().toISOString() });
  } catch (e) {
    console.warn('Chat model update failed:', e);
    toast.warn('Failed to update chat model');
  }
}
