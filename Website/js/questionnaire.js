// Function to handle form submission and store data in localStorage
function storeFormData(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const formData = {
        gender: document.getElementById('gender').value,
        age: document.getElementById('age').value,
        degreeLevel: document.getElementById('degree_level').value,
        degreeMajor: document.getElementById('degree_major').value,
        academicYear: document.getElementById('academic_year').value,
        cgpa: document.getElementById('cgpa').value,
        residentialStatus: document.getElementById('residential_status').value,
        campusDiscrimination: document.getElementById('campus_discrimination').value,
        sportsEngagement: document.getElementById('sports_engagement').value,
        averageSleep: document.getElementById('average_sleep').value,
        studySatisfaction: document.getElementById('study_satisfaction').value,
        academicWorkload: document.getElementById('academic_workload').value,
        academicPressure: document.getElementById('academic_pressure').value,
    };

    // Store data in localStorage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Redirect to result page
    window.location.href = '/Website/html/result_questionnaire.html';
}

// Add event listener to form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', storeFormData);
    }
});
