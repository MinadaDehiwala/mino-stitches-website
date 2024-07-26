// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfKC-Irt1gw1_MZEDxOYu56ROfQtVa6AA",
  authDomain: "mino-stitches.firebaseapp.com",
  projectId: "mino-stitches",
  storageBucket: "mino-stitches.appspot.com",
  messagingSenderId: "683835865797",
  appId: "1:683835865797:web:f4ce1f3359174b1bb50eac",
  measurementId: "G-WRY2YXSVV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
