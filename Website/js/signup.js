
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);

async function signupUser() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user information in Firestore
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            createdAt: new Date().toISOString()
        });

        alert("Sign-up successful!");
        window.location.href = "login.html"; // Redirect to login or main page
    } catch (error) {
        console.error("Error during sign-up:", error.message);
        alert("Sign-up failed: " + error.message);
    }
}

export { signupUser };
