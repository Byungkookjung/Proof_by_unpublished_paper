// Retrieve data from localStorage
const formData = JSON.parse(localStorage.getItem('formData'));

// Populate table with user data
const resultTableBody = document.getElementById('resultTableBody');
if (formData) {
    const questions = [
        "1. How would you rate your sleep quality? (1 - Worst, 5 - Best)",
        "2. How would you rate your academic performance? (1 - Worst, 5 - Best)",
        "3. How would you rate your study load? (1 - Worst, 5 - Best)",
        "4. How would you rate your engagement in extracurricular activities? (1 - Worst, 5 - Best)"
    ];

    const answers = [
        formData.sleep_quality,
        formData.academic_performance,
        formData.study_load,
        formData.extracurricular_activities
    ];

    questions.forEach((question, index) => {
        const row = document.createElement('tr');
        const questionCell = document.createElement('td');
        questionCell.textContent = question;
        const answerCell = document.createElement('td');
        answerCell.textContent = answers[index] || 'No answer';
        row.appendChild(questionCell);
        row.appendChild(answerCell);
        resultTableBody.appendChild(row);
    });
} else {
    // Handle case where no data is available
    document.querySelector('.result-container').innerHTML = "<p>No data found. Please fill out the questionnaire first.</p>";
}





// progress bar
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

// Example usage: Animate progress to 70%
animateProgress(70);


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

// Example usage: Display stress level 4.44 with transition
displayStressLevel(4.44);



