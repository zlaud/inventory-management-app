// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqu_EdR_XgVu9gjTSgmuVpu06fkaW4PPc",
  authDomain: "pantry-manager-e0ad7.firebaseapp.com",
  projectId: "pantry-manager-e0ad7",
  storageBucket: "pantry-manager-e0ad7.appspot.com",
  messagingSenderId: "1090405755963",
  appId: "1:1090405755963:web:64e96dc7499ff7a522401e",
  measurementId: "G-21Q1HVYWGE",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
const db = getFirestore(app);
export { auth, db, app };
