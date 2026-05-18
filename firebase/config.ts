import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC816iB8h05VVBYXJ980e-DysRLqwqUxQU",
  authDomain: "studdybuddy-42eaf.firebaseapp.com",
  projectId: "studdybuddy-42eaf",
  storageBucket: "studdybuddy-42eaf.firebasestorage.app",
  messagingSenderId: "52121866837",
  appId: "1:52121866837:web:b899e7fa1017f715303adc",
  measurementId: "G-2EPN29NBJ0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);