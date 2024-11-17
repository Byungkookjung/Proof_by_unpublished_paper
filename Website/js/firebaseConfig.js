// Import the necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcuafGs8GQeW0yR72Xd_EGmCF8mNUXxtM",
    authDomain: "nathack2024.firebaseapp.com",
    projectId: "nathack2024",
    storageBucket: "nathack2024.firebasestorage.app",
    messagingSenderId: "832945385242",
    appId: "1:832945385242:web:97ce2f0c2625cf8b2186a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore
const auth = getAuth(app); // Authentication

export { db, auth };
