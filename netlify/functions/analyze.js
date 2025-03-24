const axios = require('axios');

// List of valid departments
const VALID_DEPARTMENTS = [
  "Supply Chain", "Engineering", "Metal Shop", "Pre-Assembly", 
  "Bodywork", "Paint", "Sign-Shop", "Final Assembly"
];

/**
 * Netlify serverless function to handle Mistral API calls
 */
exports.handler = async function(event, context) {
  // Set headers for CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  
  // Handle OPTIONS request (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight response' })
    };
  }
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }
  
  try {
    const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
    
    if (!MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY environment variable is not set');
    }
    
    // Parse the request body
    const data = JSON.parse(event.body);
    const { description, department, jobNumber, partNumber, isQcCheckpoint } = data;
    
    // Validate the request
    if (!description || !department || !jobNumber) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields', 
          message: 'Description, department, and jobNumber are required' 
        })
      };
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
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        rootDepartment,
        jobNumber,
        usedAI: true
      })
    };
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    // If we can, try to use the local fallback
    try {
      const data = JSON.parse(event.body);
      const rootDepartment = analyzeIssueLocal(data);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          rootDepartment,
          jobNumber: data.jobNumber,
          usedAI: false
        })
      };
    } catch (fallbackError) {
      // If even the fallback fails, return a 500 error
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Internal server error', 
          message: error.message 
        })
      };
    }
  }
};

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