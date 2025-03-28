import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJmWNpfzzZNkxCWO-xDsCmH1Qjp5eprXs",
  authDomain: "coolala-crypto.firebaseapp.com",
  projectId: "coolala-crypto",
  storageBucket: "coolala-crypto.firebasestorage.app",
  messagingSenderId: "802532232153",
  appId: "1:802532232153:web:67b41d725b9d36c35d27c8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);