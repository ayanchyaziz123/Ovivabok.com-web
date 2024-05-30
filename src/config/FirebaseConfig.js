// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9cxtmS8TZkNI75055A128awNLQTEpysM",
  authDomain: "ovivabokweb.firebaseapp.com",
  projectId: "ovivabokweb",
  storageBucket: "ovivabokweb.appspot.com",
  messagingSenderId: "963499703372",
  appId: "1:963499703372:web:bb53651c705cc16856c8e9",
  measurementId: "G-J5QFM2FEFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { db }; // Export Firestore instance for use in other parts of your application