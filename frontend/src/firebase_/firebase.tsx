// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwJJQKGWJ6mEd7B3gAi4D_ywHGWnbU9b0",
  authDomain: "sagarmitra-7b68c.firebaseapp.com",
  projectId: "sagarmitra-7b68c",
  storageBucket: "sagarmitra-7b68c.firebasestorage.app",
  messagingSenderId: "903870520460",
  appId: "1:903870520460:web:52c4bf8c72a0e7205e2fa9",
  measurementId: "G-EJQMKECR8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);