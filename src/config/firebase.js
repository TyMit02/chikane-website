import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB8GC6eCF4nkiSKnMZxbu7i7siM3E3WA9s",
    authDomain: "embrk-398e9.firebaseapp.com",
    projectId: "embrk-398e9",
    storageBucket: "embrk-398e9.firebasestorage.app",
    messagingSenderId: "1084339595637",
    appId: "1:1084339595637:web:a5f6c3b8d096edf47e0b3c",
    measurementId: "G-8SZW1DJZG6"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);