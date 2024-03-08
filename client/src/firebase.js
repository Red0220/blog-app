// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY ,
  authDomain: "blog-99c00.firebaseapp.com",
  projectId: "blog-99c00",
  storageBucket: "blog-99c00.appspot.com",
  messagingSenderId: "73434156761",
  appId: "1:73434156761:web:7ba83c988d4bd1a28338c8",
  measurementId: "G-D7S6PXVELC"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);