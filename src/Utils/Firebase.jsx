// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2_DIjdyFgBQ49sTeI63khKYK9KVlFers",
  authDomain: "netflixgpt-690c0.firebaseapp.com",
  projectId: "netflixgpt-690c0",
  storageBucket: "netflixgpt-690c0.firebasestorage.app",
  messagingSenderId: "977955977840",
  appId: "1:977955977840:web:71137c392b9299ec29d2b5",
  measurementId: "G-K0MYSNJPMG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
