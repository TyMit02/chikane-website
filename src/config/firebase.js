import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB8GC6eCF4nkiSKnMZxbu7i7siM3E3WA9s",
  authDomain: "embrk-398e9.firebaseapp.com",
  projectId: "embrk-398e9",
  storageBucket: "embrk-398e9.firebasestorage.app",
  messagingSenderId: "1084339595637",
  appId: "1:1084339595637:web:a5f6c3b8d096edf47e0b3c",
  measurementId: "G-8SZW1DJZG6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;