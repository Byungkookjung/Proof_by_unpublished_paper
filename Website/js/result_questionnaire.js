document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the data from localStorage
    const apiResponse = localStorage.getItem('apiResponse');

    if (!apiResponse) {
        console.error('No API response found in localStorage.');
        document.getElementById('output').textContent = 'No data available. Please complete the questionnaire first.';
        return;
    }

    // Parse the response data
    const responseData = JSON.parse(apiResponse);

    // Display the data
    if (responseData.Predicted_Stress_Levels !== undefined) {
        const stressLevel = responseData.Predicted_Stress_Levels;
        displayStressLevel(stressLevel); // Assuming this function is defined to display stress level
    } else {
        document.getElementById('stressLevelText').textContent = 'No valid Predicted Stress Level data available.';
    }

    if (responseData.Predicted_Headaches_Per_Week_Probability !== undefined) {
        const headacheProbability = responseData.Predicted_Headaches_Per_Week_Probability;
        animateProgress(headacheProbability); // Assuming this function is defined to animate progress
    } else {
        document.getElementById('progressValue').textContent = 'No valid headache data available.';
    }
});

// Function to animate progress circle
function animateProgress(targetPercent) {
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    let currentPercent = 0;
    const progressValue = document.getElementById('progressValue');

    // Animation interval
    const interval = setInterval(() => {
        if (currentPercent >= targetPercent) {
            clearInterval(interval);
        } else {
            currentPercent++;
            // Calculate the offset
            const offset = circumference - (currentPercent / 100) * circumference;
            circle.style.strokeDashoffset = offset;
            // Update the text value
            progressValue.textContent = `${currentPercent}%`;
        }
    }, 50); // Adjust the interval timing to control animation speed
}

// Function to display stress level bar
function displayStressLevel(targetLevel) {
    const maxStressLevel = 5; // Maximum value for stress level
    const indicator = document.getElementById('stressLevelIndicator');
    const text = document.getElementById('stressLevelText');

    let currentLevel = 0;
    const step = 0.1; // Larger increment step for faster progression
    const interval = setInterval(() => {
        if (currentLevel + step >= targetLevel) {
            // Ensure precise stopping
            currentLevel = targetLevel;
            clearInterval(interval); // Stop the interval when reaching the target
        } else {
            currentLevel += step; // Increment by the step size
        }

        const percentage = (currentLevel / maxStressLevel) * 100;
        indicator.style.width = `${percentage}%`;
        text.textContent = `Stress Level: ${currentLevel.toFixed(2)}/${maxStressLevel}`; // Display up to two decimals
    }, 20); // Reduced interval time for faster transition
}
