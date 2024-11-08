// src/config/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

// Use environment variables for sensitive data
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB8GC6eCF4nkiSKnMZxbu7i7siM3E3WA9s",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "embrk-398e9.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "embrk-398e9",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "embrk-398e9.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1084339595637",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1084339595637:web:a5f6c3b8d096edf47e0b3c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-8SZW1DJZG6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;