// Load and process the CSV file
d3.csv('/project/Prediction_Output.csv').then(function (data) {
    console.log('Loaded data:', data);

    if (data.length === 0) {
        document.getElementById('output').textContent = 'No data found in the CSV file.';
        return;
    }

    // Extract values
    const stressValues = data.map(row => {
        return row.Predicted_Stress_Level !== undefined ? parseFloat(row.Predicted_Stress_Level) : null;
    }).filter(value => value !== null);

    const headacheProbabilities = data.map(row => {
        return row.Predicted_Headaches_Per_Week_Probability !== undefined ? parseFloat(row.Predicted_Headaches_Per_Week_Probability) : null;
    }).filter(value => value !== null);

    // Use the first value for demonstration purposes
    if (stressValues.length > 0) {
        const outputStressLevel = stressValues[0]; // Taking the first stress value
        displayStressLevel(outputStressLevel); // Pass this value to the display function
    } else {
        document.getElementById('stressLevelText').textContent = 'No valid Predicted Stress Level data available.';
    }

    if (headacheProbabilities.length > 0) {
        const outputHeadacheProbability = headacheProbabilities[0]; // Taking the first headache probability
        animateProgress(outputHeadacheProbability); // Pass this value to the animate function
    } else {
        document.getElementById('progressValue').textContent = 'No valid headache data available.';
    }
}).catch(function (error) {
    console.error('Error loading CSV:', error);
    document.getElementById('output').textContent = 'Failed to load data. Check the console for more details.';
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
