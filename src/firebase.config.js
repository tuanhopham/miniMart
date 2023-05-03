// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyAECXBdf02orhO3JkNpRXW3mroHPgYxTv0",
  authDomain: "minimart-f4870.firebaseapp.com",
  projectId: "minimart-f4870",
  storageBucket: "minimart-f4870.appspot.com",
  messagingSenderId: "99245663166",
  appId: "1:99245663166:web:5afc99ad89ac82d4cd8fef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app