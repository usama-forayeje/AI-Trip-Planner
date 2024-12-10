// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPa9ld5fqqXPHZlyu1mpHm285jQmTRLXk",
  authDomain: "forayaje-ai-trip-ee3b7.firebaseapp.com",
  projectId: "forayaje-ai-trip-ee3b7",
  storageBucket: "forayaje-ai-trip-ee3b7.firebasestorage.app",
  messagingSenderId: "714065509981",
  appId: "1:714065509981:web:481344186b7e181c42d7b4",
  measurementId: "G-395E8GY0TK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);