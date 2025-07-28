// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa0uGkSI7VcMXa88eaSrv8zx8qLU4fYxk",
  authDomain: "maydiv-497f1.firebaseapp.com",
  projectId: "maydiv-497f1",
  storageBucket: "maydiv-497f1.firebasestorage.app",
  messagingSenderId: "1065051187048",
  appId: "1:1065051187048:web:b232af88a166a2d0e818dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app; 