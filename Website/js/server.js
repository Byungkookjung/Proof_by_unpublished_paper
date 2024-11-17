const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000; // The port your Node.js server will listen on

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to handle client requests and forward them to the R API
app.post('/predict', async (req, res) => {
  try {
    // Forward the request to the R `plumber` API running on port 8000
    const response = await axios.post('http://127.0.0.1:8000/predict', req.body);
    // Return the R API response back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error communicating with the R API:', error);
    res.status(500).send('Error processing the request.');
  }
});

// Start the Node.js server
app.listen(PORT, () => {
  console.log(`Node.js server running at http://localhost:${PORT}`);
});
