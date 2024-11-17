// Import necessary Firebase functions
import { db } from './firebaseConfig.js'; // Import the initialized Firestore instance
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Function to handle form submission and store data in Firestore
async function handleQuestionnaireForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
        sleep_quality: document.getElementById('sleep_quality').value,
        academic_performance: document.getElementById('academic_performance').value,
        study_load: document.getElementById('study_load').value,
        extracurricular_activities: document.getElementById('extracurricular_activities').value
    };

    console.log('Collected form data:', formData); // Debugging output

    try {
        // Store formData in Firestore
        await addDoc(collection(db, "questionnaireResponses"), formData);

        // Save data to localStorage for retrieval on the results page
        localStorage.setItem('formData', JSON.stringify(formData));

        alert('Form submitted successfully! Data saved to Firebase and localStorage.');
        // Redirect or perform another action after saving
        window.location.href = 'result_questionnaire.html'; // Change this path as needed
    } catch (error) {
        console.error('Error saving form data to Firebase:', error);
        alert('Error during form submission. Please try again.');
    }
}

// Add event listener to the form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('questionnaireForm');
    if (form) {
        form.addEventListener('submit', handleQuestionnaireForm);
    } else {
        console.error('Questionnaire form not found.');
    }
});