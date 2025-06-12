import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4e6J_7wzJXa9iZUchnMyuwjxK5-dM30o",
  authDomain: "blog-13c55.firebaseapp.com",
  projectId: "blog-13c55",
  storageBucket: "blog-13c55.firebasestorage.app",
  messagingSenderId: "620733026150",
  appId: "1:620733026150:web:2c6f2926f534d15d0542a7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestoreDb = getFirestore(app);
export const storage = getStorage(app);
