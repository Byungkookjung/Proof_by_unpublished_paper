// Import necessary Firebase functions
import { db } from './firebaseConfig.js'; // Import the initialized Firestore instance
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Function to create or update CSV content in localStorage
function updateCSV(formData) {
    const headers = [
        "Sleep_Quality",
        "Academic_Performance",
        "Study_Load",
        "Extracurricular_Activities",
        "Predicted_Stress",
        "Predicted_Headaches_Percentage"
    ];

    // Example predicted values (replace with actual logic)
    const predictedStress = 1.83238261; // Placeholder
    const predictedHeadachesPercentage = 26.4349292; // Placeholder

    const answers = [
        formData.sleep_quality,
        formData.academic_performance,
        formData.study_load,
        formData.extracurricular_activities,
        predictedStress,
        predictedHeadachesPercentage
    ];

    // Retrieve existing CSV from localStorage or initialize a new one
    let csvContent = localStorage.getItem('csvContent');
    if (!csvContent) {
        // Add headers if no existing CSV content
        csvContent = headers.join(",") + "\n";
    }
    // Append new data
    csvContent += answers.join(",") + "\n";

    // Save updated CSV content to localStorage
    localStorage.setItem('csvContent', csvContent);

    return csvContent;
}

// Function to download CSV file
function downloadCSV(csvContent, fileName) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

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

        // Update and retrieve the CSV content
        const csvContent = updateCSV(formData);

        // Save data to localStorage for retrieval on the results page
        localStorage.setItem('formData', JSON.stringify(formData));

        // Download the updated CSV
        downloadCSV(csvContent, 'user_questionnaire_data.csv');

        alert('Form submitted successfully! Data saved to Firebase, localStorage, and updated CSV file.');
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
