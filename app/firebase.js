import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD_0FNCXFh6oT4KfuL5NTMgTHJQm0vEaIk",
  authDomain: "indiapost-33d9d.firebaseapp.com",
  databaseURL: "https://indiapost-33d9d-default-rtdb.firebaseio.com",
  projectId: "indiapost-33d9d",
  storageBucket: "indiapost-33d9d.firebasestorage.app",
  messagingSenderId: "854003854755",
  appId: "1:854003854755:web:8ff777fd77c4f37a16fe16",
  measurementId: "G-L13LPC5GK3"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);