// Function to handle form submission and store data (or send data to Firebase if needed)
function handleQuestionnaireForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
        sleep_quality: document.getElementById('sleep_quality').value,
        academic_performance: document.getElementById('academic_performance').value,
        study_load: document.getElementById('study_load').value,
        extracurricular_activities: document.getElementById('extracurricular_activities').value
    };

    console.log('Collected form data:', formData); // Debugging output

    // Example storage to localStorage (or you can send it to Firebase)
    try {
        localStorage.setItem('questionnaireFormData', JSON.stringify(formData));
        alert('Form submitted successfully! Data saved.');
        // Redirect or perform another action after saving
        window.location.href = 'result_questionnaire.html'; // Change this path as needed
    } catch (error) {
        console.error('Error saving form data:', error);
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
