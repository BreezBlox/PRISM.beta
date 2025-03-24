/**
 * Service to handle Mistral API integration for issue analysis
 */

// API endpoint (would be environment variable in production)
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001';

/**
 * Analyzes an issue description and determines the responsible department using the backend API
 * @param {Object} issueData - The issue data including description, department found, etc.
 * @returns {Promise<string>} - The determined responsible department
 */
export const analyzeIssue = async (issueData) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/api/analyze`, {
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
    // Fallback to the department where it was discovered if API fails
    return issueData.department;
  }
};

/**
 * Fallback function when API is not available (for development or if API key not provided)
 * This uses a simple heuristic based on keywords to determine the department
 * @param {Object} issueData - The issue data
 * @returns {string} - A department name
 */
export const analyzeIssueLocal = (issueData) => {
  const { description = '' } = issueData;
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
  
  // If no keywords match, return a random department
  const departments = [
    'Supply Chain', 'Engineering', 'Metal Shop', 'Pre-Assembly',
    'Bodywork', 'Paint', 'Sign-Shop', 'Final Assembly'
  ];
  return departments[Math.floor(Math.random() * departments.length)];
};

/**
 * Choose the appropriate analysis method based on environment
 * @param {Object} issueData - The issue data 
 * @returns {Promise<string>} - The determined department
 */
export const determineRootDepartment = async (issueData) => {
  try {
    // Try using the API
    return await analyzeIssue(issueData);
  } catch (error) {
    console.error('API call failed, using local fallback:', error);
    // Fall back to local analysis if API call fails
    return analyzeIssueLocal(issueData);
  }
}; 