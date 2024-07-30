// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app)