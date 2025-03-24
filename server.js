// server.js - This runs on your server, not in the browser
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // For loading environment variables
const app = express();
app.use(express.json());

// Only allow your site - update this with your frontend domain in production
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

// The secret API key stays on the server
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

// List of valid departments
const VALID_DEPARTMENTS = [
  "Supply Chain", "Engineering", "Metal Shop", "Pre-Assembly", 
  "Bodywork", "Paint", "Sign-Shop", "Final Assembly"
];

// Create an endpoint your frontend will call
app.post('/api/analyze', async (req, res) => {
  try {
    // Get the data from your frontend
    const { description, department, jobNumber, partNumber, isQcCheckpoint } = req.body;
    
    // Validate the request
    if (!description || !department || !jobNumber) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        message: 'Description, department, and jobNumber are required' 
      });
    }

    // Create a prompt that helps the LLM understand the task
    const systemPrompt = `You are a production issue analysis system that determines which department is responsible for production issues. 
    Based on the issue description, determine which department is most likely the root cause of the issue.
    Only respond with one of these department names: "Supply Chain", "Engineering", "Metal Shop", "Pre-Assembly", "Bodywork", "Paint", "Sign-Shop", "Final Assembly".
    Do not include any explanations, just the department name.`;
    
    const userPrompt = `Issue Details:
    - Description: ${description}
    - Discovered in Department: ${department}
    - Job Number: ${jobNumber}
    ${partNumber ? `- Part Number: ${partNumber}` : ''}
    ${isQcCheckpoint ? '- Found during QC Checkpoint' : ''}
    
    Which department is responsible for this issue?`;
    
    // Call Mistral API with your secret key
    const response = await axios.post('https://api.mistral.ai/v1/chat/completions', {
      model: 'mistral-small-latest',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.2,
      max_tokens: 10
    }, {
      headers: {
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Extract the result and send it back to your frontend
    const departmentResponse = response.data.choices[0].message.content.trim();
    
    // Validate that the response is one of our allowed departments
    const rootDepartment = VALID_DEPARTMENTS.includes(departmentResponse) 
      ? departmentResponse 
      : department;
    
    res.json({ 
      rootDepartment,
      jobNumber,
      usedAI: true
    });
    
  } catch (error) {
    console.error('Error calling Mistral API:', error);
    
    // Fallback to local analysis if API fails
    const rootDepartment = analyzeIssueLocal(req.body);
    
    res.json({ 
      rootDepartment,
      jobNumber: req.body.jobNumber,
      usedAI: false
    });
  }
});

/**
 * Fallback function when API is not available
 * @param {Object} issueData - The issue data
 * @returns {string} - A department name
 */
function analyzeIssueLocal(issueData) {
  const { description = '', department } = issueData;
  const lowerDesc = description.toLowerCase();
  
  // Simple keyword matching - this is just a fallback
  if (lowerDesc.includes('drawing') || lowerDesc.includes('design') || lowerDesc.includes('spec')) {
    return 'Engineering';
  } else if (lowerDesc.includes('material') || lowerDesc.includes('delivery') || lowerDesc.includes('order')) {
    return 'Supply Chain';
  } else if (lowerDesc.includes('welding') || lowerDesc.includes('cut') || lowerDesc.includes('fab')) {
    return 'Metal Shop';
  } else if (lowerDesc.includes('paint') || lowerDesc.includes('finish') || lowerDesc.includes('color')) {
    return 'Paint';
  } else if (lowerDesc.includes('assembly') || lowerDesc.includes('install') || lowerDesc.includes('mount')) {
    return 'Final Assembly';
  } else if (lowerDesc.includes('body') || lowerDesc.includes('panel') || lowerDesc.includes('fitment')) {
    return 'Bodywork';
  } else if (lowerDesc.includes('graphics') || lowerDesc.includes('logo') || lowerDesc.includes('sign')) {
    return 'Sign-Shop';
  } else if (lowerDesc.includes('part') || lowerDesc.includes('component') || lowerDesc.includes('sub')) {
    return 'Pre-Assembly';
  }
  
  // If no keywords match, return the department where it was found
  return department;
}

// Add rate limiting middleware
app.use((req, res, next) => {
  // Simple in-memory rate limiting
  // In production, you'd use a more robust solution like 'express-rate-limit'
  const IP = req.ip;
  const now = Date.now();
  
  if (!global.requestCounts) {
    global.requestCounts = {};
  }
  
  if (!global.requestCounts[IP]) {
    global.requestCounts[IP] = [];
  }
  
  // Clean up old requests (older than 1 minute)
  global.requestCounts[IP] = global.requestCounts[IP].filter(time => now - time < 60000);
  
  // Check if this IP has made too many requests
  if (global.requestCounts[IP].length >= 100) {
    return res.status(429).json({ 
      error: 'Too many requests', 
      message: 'Please try again later' 
    });
  }
  
  // Add this request to the count
  global.requestCounts[IP].push(now);
  
  next();
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 