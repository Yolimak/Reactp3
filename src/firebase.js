
// firebase.js
import firebase from "firebase/app";
import "firebase/firestore"; // Importa Firestore para habilitar su uso

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAUmafB_Mdf9yYNQP0vqS4esphLZW5RU_g",
  authDomain: "crud2024-6bdd0.firebaseapp.com",
  projectId: "crud2024-6bdd0",
  storageBucket: "crud2024-6bdd0.firebasestorage.app",
  messagingSenderId: "517017772420",
  appId: "1:517017772420:web:60dff0b664e2693846fdd1"
};

// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);

// Inicializa Firestore
const db = app.firestore();

export { db };