import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHaOZi0_hfYLuOtTZTdtRQjyUsSdZIISQ",
  authDomain: "ebds-calcular-precio.firebaseapp.com",
  projectId: "ebds-calcular-precio",
  storageBucket: "ebds-calcular-precio.firebasestorage.app",
  messagingSenderId: "255298368723",
  appId: "1:255298368723:web:eb6c94a0764a3df4d3d026"
};

export const app = initializeApp(firebaseConfig);
export const dbFirestore = getFirestore();