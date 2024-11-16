import { db } from './firebaseConfig.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Function to handle form submission and save data to Firestore
function handleQuestionnaireForm(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = {
        sleep_quality: document.getElementById('sleep_quality').value,
        academic_performance: document.getElementById('academic_performance').value,
        study_load: document.getElementById('study_load').value,
        extracurricular_activities: document.getElementById('extracurricular_activities').value
    };

    // Save form data to Firestore
    addDoc(collection(db, "questionnaireResponses"), formData)
        .then(() => {
            alert('Data submitted successfully!');
            window.location.href = '/Website/html/result_questionnaire.html'; // Redirect to result page
        })
        .catch((error) => {
            console.error('Error saving data:', error);
            alert('Error submitting data. Please try again.');
        });
}

// Add event listener to form on page load
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('questionnaireForm');
    if (form) {
        form.addEventListener('submit', handleQuestionnaireForm);
    }
});
