Creating a Backend Service for API Keys: A Beginner's Guide
Why You Need This
Right now, your app has the Mistral API key directly in the browser code (frontend), which is risky because:
1. Anyone can see it by viewing your website's source code
1. Anyone can use it and potentially run up charges on your account
1. It's hard to update if you need to change it
The Basic Concept
Think of it like this:
* Frontend (Browser): Where users interact with your app
* Backend (Server): A middleman that talks to external services like Mistral
Instead of your browser code talking directly to Mistral with an API key, it talks to your own server, which then talks to Mistral using the secret key.
Step-by-Step Implementation
1. Create a Simple Backend Server
Using Node.js and Express (the simplest approach):
javascript
Apply to .env.example
// server.js - This runs on your server, not in the browser
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // For loading environment variables
const app = express();
app.use(express.json());
app.use(cors({ origin: 'https://your-app-domain.com' })); // Only allow your site
// The secret API key stays on the server
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
// Create an endpoint your frontend will call
app.post('/api/analyze', async (req, res) => {
  try {
    // Get the data from your frontend
    const { description, department, jobNumber } = req.body;
    
    // Call Mistral API with your secret key
    const response = await axios.post('https://api.mistral.ai/v1/chat/completions', {
      model: 'mistral-small-latest',
      messages: [
        {
          role: 'system',
          content: 'You determine which department is responsible for production issues.'
        },
        {
          role: 'user',
          content: `Issue Details: ${description}. Found in: ${department}.`
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
    const rootDepartment = response.data.choices[0].message.content.trim();
    res.json({ rootDepartment });
    
  } catch (error) {
    console.error('Error calling Mistral API:', error);
    res.status(500).json({ 
      error: 'Failed to analyze issue', 
      message: error.message 
    });
  }
});
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
2. Update Your Frontend Code
Change your existing code to call your backend instead of Mistral directly:
javascript
Apply to .env.example
// In your mistralService.js
export const analyzeIssue = async (issueData) => {
  try {
    // Notice we're calling YOUR server now, not Mistral directly
    const response = await fetch('https://your-backend.com/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(issueData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return data.rootDepartment || issueData.department;
    
  } catch (error) {
    console.error('Error analyzing issue:', error);
    return issueData.department;
  }
};
3. Deploy Your Backend
You have several simple options:Option A: Netlify Functions (easiest if you're already using Netlify for frontend)
javascript
Apply to .env.example
// netlify/functions/analyze.js
const axios = require('axios');
exports.handler = async function(event) {
  // Same code as the Express example above, just formatted as a Netlify function
  const data = JSON.parse(event.body);
  
  try {
    // Call Mistral API
    // ...similar to above...
    
    return {
      statusCode: 200,
      body: JSON.stringify({ rootDepartment })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
Option B: AWS Lambda (similar to what you've already set up)
javascript
Apply to .env.example
// The code in your aws-deploy/lambda/analyze.js is already structured correctly!
// Just make sure your API keys are in environment variables, not hardcoded
4. Add Environment Variables
Never put the API key directly in your code. Instead:
* For local development: Create a .env file with:
* text
* Apply to .env.example
*   MISTRAL_API_KEY=your_actual_key_here
* For deployment:
* Netlify: Set in the Netlify dashboard under "Environment variables"
* AWS: Set in the Lambda configuration
* Vercel: Set in the Vercel dashboard
5. Securing Your API
Add these additional security measures:
1. Rate Limiting: Add the code I showed in the previous response
1. Input Validation: Validate all incoming data before sending to Mistral
1. CORS: Only allow requests from your frontend domain
Super Simple Option: Use a Backend-as-a-Service
If setting up your own backend feels overwhelming, consider:
1. Firebase Functions:
2. javascript
3. Apply to .env.example
4.    // Firebase function example
5.    const functions = require('firebase-functions');
6.    const axios = require('axios');
7.    
8.    exports.analyzeIssue = functions.https.onCall(async (data, context) => {
9.      // Your API call code here, similar to above
10.    });
1. Supabase Edge Functions
1. Cloudflare Workers
Each of these provides serverless functions with environment variables for your API keys.
The Most Important Points
1. Never put API keys in frontend code
1. Create a simple server that acts as a middleman
1. Only allow your app to talk to your server
1. Store API keys in environment variables
1. Validate all inputs before sending to external APIs