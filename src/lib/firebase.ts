import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

let db: any = null;
let auth: any = null;

const initFirebase = async () => {
  try {
    // @ts-ignore
    const config = await import('../../firebase-applet-config.json');
    if (config.default) {
      const app = initializeApp(config.default);
      db = getFirestore(app, config.default.firestoreDatabaseId);
      auth = getAuth(app);
    }
  } catch (e) {
    console.warn('Firebase config unavailable');
  }
};

initFirebase();

export { db, auth };

// Helper services will go here
export const sendOrder = async (order: any) => {
  if (!db) {
    console.error('Firestore not initialized');
    return;
  }
  try {
    await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
  } catch (err) {
    console.error('Error sending order:', err);
  }
};
