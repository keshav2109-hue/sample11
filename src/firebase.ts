import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDJvQW6f9Kxih0Mj7cj-FiQ6W-8E2Iw9UQ",
  authDomain: "studyverse-books.firebaseapp.com",
  projectId: "studyverse-books",
  storageBucket: "studyverse-books.firebasestorage.app",
  messagingSenderId: "980995571010",
  appId: "1:980995571010:web:3af163f32bbd28c2aa9cdb",
  measurementId: "G-RY93D8TXEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export { analytics };