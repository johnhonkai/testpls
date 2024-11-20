// src/lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjVMLmcjaZOo4TFpks7TOP-ln6MKidfjg",
    authDomain: "hi3db-54294.firebaseapp.com",
    projectId: "hi3db-54294",
    storageBucket: "hi3db-54294.firebasestorage.app",
    messagingSenderId: "488855369270",
    appId: "1:488855369270:web:ec003171d91020f5068a97",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
