const express = require('express');
const bodyParser = require('body-parser');
const reworksRouter = require('./reworks');
const path = require('path');
const axios = require('axios');

// List of valid departments
const VALID_DEPARTMENTS = [
  "Supply Chain", "Engineering", "Metal Shop", "Pre-Assembly", 
  "Bodywork", "Paint", "Sign-Shop", "Final Assembly"
];

// Get API key from environment variable
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Serve static files from project root (for reworks.html, etc.)
app.use(express.static(__dirname));

// Mount the reworks API
app.use('/api/reworks', reworksRouter);

// Example root route
app.get('/', (req, res) => {
  res.send('Prism API is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
