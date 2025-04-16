const axios = require('axios');

// List of valid departments
const VALID_DEPARTMENTS = [
  "Supply Chain", "Engineering", "Metal Shop", "Pre-Assembly", 
  "Bodywork", "Paint", "Sign-Shop", "Final Assembly"
];

// Get API key from environment variable
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

exports.handler = async (event) => {
  // Set CORS headers for all responses
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };
  
  // Handle OPTIONS request (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight response' })
    };
  }
  
  try {
    // Parse the incoming request body
    const body = JSON.parse(event.body);
    const { description, department, jobNumber, partNumber, isQcCheckpoint } = body;
    
    // Validate required fields
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
    
    let rootDepartment;
    let usedAI = false;
    
    // Try to use Mistral API if key is available
    if (MISTRAL_API_KEY) {
      try {
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
        
        // Extract the result
        const departmentResponse = response.data.choices[0].message.content.trim();
        
        // Validate the response is one of the allowed departments
        rootDepartment = VALID_DEPARTMENTS.includes(departmentResponse) 
          ? departmentResponse 
          : department;
        
        usedAI = true;
      } catch (apiError) {
        console.error('Error calling Mistral API:', apiError);
        // Fallback to keyword analysis if API call fails
        rootDepartment = analyzeWithKeywords(description, department);
      }
    } else {
      // Fallback to keyword analysis if no API key
      rootDepartment = analyzeWithKeywords(description, department);
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        rootDepartment,
        jobNumber,
        usedAI
      })
    };
  } catch (error) {
    console.error('Error analyzing issue:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error analyzing issue',
        message: error.message
      })
    };
  }
};

// Keyword-based analysis function
function analyzeWithKeywords(description, department) {
  // Simple keyword-based analysis for determining department
  const keywords = {
    "Engineering": ["design", "drawing", "engineer", "specification", "tolerance", "blueprint"],
    "Supply Chain": ["vendor", "supplier", "delivery", "shipment", "order", "procurement", "material", "inventory"],
    "Metal Shop": ["metal", "cutting", "bend", "weld", "sheet", "fabrication", "steel", "aluminum"],
    "Pre-Assembly": ["pre-assembly", "component", "fitting", "preparation"],
    "Bodywork": ["body", "panel", "exterior", "finishing", "assembly"],
    "Paint": ["paint", "finish", "coat", "color", "spray"],
    "Sign-Shop": ["graphic", "sign", "logo", "decal", "lettering", "vinyl"],
    "Final Assembly": ["final", "assembly", "install", "mounting", "testing", "quality check"]
  };
  
  // Analyze description to determine department
  const lowerDesc = description.toLowerCase();
  let rootDepartment = department; // Default to submitted department
  let maxMatches = 0;
  
  for (const [dept, terms] of Object.entries(keywords)) {
    const matches = terms.filter(term => lowerDesc.includes(term.toLowerCase())).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      rootDepartment = dept;
    }
  }
  
  return rootDepartment;
}