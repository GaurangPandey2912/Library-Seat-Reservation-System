import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0chc7MHt4iPVIaWdDAgH_VADXcz6TCrs",
  authDomain: "librarysystem-973b6.firebaseapp.com",
  projectId: "librarysystem-973b6",
  storageBucket: "librarysystem-973b6.appspot.com",

  messagingSenderId: "624410479779",
  appId: "1:624410479779:web:78cb0f727e20d87fdc4316"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, collection, addDoc, getDocs, getDoc, doc, setDoc, updateDoc, onSnapshot, app, auth };
