document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('questionnaireForm');

    if (!form) {
        console.error('Form element with id="questionnaireForm" not found!');
        return;
    }

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Collecting data from the form
        const sleepQuality = document.getElementById('sleep_quality').value;
        const academicPerformance = document.getElementById('academic_performance').value;
        const studyLoad = document.getElementById('study_load').value;
        const extracurricularActivities = document.getElementById('extracurricular_activities').value;

        // Convert form inputs to numbers to match expected API input
        const payload = {
            Sleep_Quality: parseFloat(sleepQuality),
            Academic_Performance: parseFloat(academicPerformance),
            Study_Load: parseFloat(studyLoad),
            Extracurricular_Activities: parseFloat(extracurricularActivities)
        };

        // Correct API endpoint URL
        const apiUrl = 'http://localhost:8000/predict'; 

        try {
            console.log('Sending payload:', payload);
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload) // Converting payload to a JSON string
            });

            console.log('Received response:', response);

            // Handling the response
            if (response.ok) {
                const result = await response.json(); // Assuming your API responds with JSON
                // Save result to localStorage
                localStorage.setItem('apiResponse', JSON.stringify(result));
                // Navigate to the result page
                window.location.href = 'result_questionnaire.html';
            } else {
                document.getElementById('results').innerText = `Error communicating with the API. Status: ${response.status}, Message: ${response.statusText}`;
            }
        } catch (error) {
            document.getElementById('results').innerText = `Error: ${error.message}`;
            console.error('Fetch error:', error);
        }
    });
});
