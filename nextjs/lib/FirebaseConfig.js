import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyChQQiUKzxdvITadpBhMM4rryaNL4hLNaY",
  authDomain: "buckmap-83956.firebaseapp.com",
  projectId: "buckmap-83956",
  storageBucket: "buckmap-83956.firebasestorage.app",
  messagingSenderId: "809697568507",
  appId: "1:809697568507:web:b2e70b0f7a04837063f25e",
  measurementId: "G-4JD9LL21HT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
