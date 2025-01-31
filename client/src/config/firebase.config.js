import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "auth-64d14.firebaseapp.com",
  projectId: "auth-64d14",
  storageBucket: "auth-64d14.firebasestorage.app",
  messagingSenderId: "918317289050",
  appId: "1:918317289050:web:00a3d2644c4c6be770d263",
  measurementId: "G-52CR713K7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;