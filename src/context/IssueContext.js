import React, { createContext, useState, useContext, useEffect } from 'react';
import { determineRootDepartment } from '../services/mistralService';

// API endpoint (would be environment variable in production)
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001';

// Create a context for issue data
const IssueContext = createContext();

// Custom hook to use the issue context
export const useIssues = () => {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
};

// Mock departments for the app
const departments = [
  'Supply Chain',
  'Engineering',
  'Metal Shop',
  'Pre-Assembly',
  'Bodywork',
  'Paint',
  'Sign-Shop',
  'Final Assembly'
];

// Provider component
export const IssueProvider = ({ children }) => {
  // Load issues from sessionStorage or use empty array
  const [issues, setIssues] = useState(() => {
    const savedIssues = sessionStorage.getItem('prism_issues');
    return savedIssues ? JSON.parse(savedIssues) : [];
  });
  
  // Loading state for AI analysis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Save issues to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem('prism_issues', JSON.stringify(issues));
  }, [issues]);

  // Add a new issue
  const addIssue = async (issueData) => {
    setIsAnalyzing(true);
    
    try {
      // Use the Mistral API or fallback to determine the root department
      const rootDepartment = await determineRootDepartment(issueData);
      
      // Ensure isQcCheckpoint is properly set as a boolean
      const isQcCheckpoint = !!issueData.isQcCheckpoint;
      
      const newIssue = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
        rootDepartment,
        ...issueData,
        isQcCheckpoint, // Ensure this is properly set as a boolean
      };
      
      setIssues(prevIssues => [...prevIssues, newIssue]);
      setIsAnalyzing(false);
      return newIssue;
    } catch (error) {
      console.error('Error adding issue:', error);
      // If analysis fails, use department where it was discovered
      const newIssue = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
        rootDepartment: issueData.department,
        ...issueData,
        isQcCheckpoint: !!issueData.isQcCheckpoint, // Ensure this is properly set as a boolean
      };
      
      setIssues(prevIssues => [...prevIssues, newIssue]);
      setIsAnalyzing(false);
      return newIssue;
    }
  };

  // Contest an issue's department assignment
  const contestIssue = (issueId, contestData) => {
    // Record the contest for potential future training of the model
    const contestDetails = {
      timestamp: new Date().toISOString(),
      jobNumber: contestData.jobNumber,
      reason: contestData.reason,
      originalDepartment: issues.find(issue => 
        issue.id === issueId || issue.jobNumber === issueId
      )?.rootDepartment,
      newDepartment: contestData.targetDepartment
    };
    
    // For a full implementation, we might store contested issues in a database
    // to later retrain the model on this feedback
    console.log('Contest data for model improvement:', contestDetails);
    
    // Update the issue with the contested department
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId || issue.jobNumber === issueId
          ? { 
              ...issue, 
              rootDepartment: contestData.targetDepartment,
              contested: true,
              contestReason: contestData.reason,
              previousDepartment: issue.rootDepartment
            }
          : issue
      )
    );
  };

  // Clear all issues
  const clearIssues = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setIssues([]);
      sessionStorage.removeItem('prism_issues');
    }
  };

  // Delete a single issue
  const deleteIssue = (issueId) => {
    if (window.confirm('Are you sure you want to delete this issue? This cannot be undone.')) {
      setIssues(prevIssues => prevIssues.filter(issue => 
        issue.id !== issueId && issue.jobNumber !== issueId
      ));
      
      if (window.showToast) {
        window.showToast('Issue deleted successfully', 'success');
      }
    }
  };

  // Export issues as CSV
  const exportIssues = async () => {
    // If API endpoint is not available, use client-side export
    if (!API_ENDPOINT || API_ENDPOINT === 'http://localhost:3001') {
      return clientSideExport();
    }
    
    setIsExporting(true);
    
    try {
      // Use the Lambda function for export
      const response = await fetch(`${API_ENDPOINT}/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ issues })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Export API Error: ${errorData.message || 'Unknown error'}`);
      }
      
      const data = await response.json();
      
      // If the API returns a download URL
      if (data.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
      } 
      // If the API returns CSV data directly
      else if (data.data) {
        downloadCSV(data.data);
      } else {
        throw new Error('Invalid response format from export API');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      // Fall back to client-side export
      clientSideExport();
      
      if (window.showToast) {
        window.showToast('Error with server export, using local export instead', 'warning');
      }
    } finally {
      setIsExporting(false);
    }
  };
  
  // Client-side export as fallback
  const clientSideExport = () => {
    // Update headers to match the UI display
    const headers = ['Date', 'Job #', 'Part #', 'Discovered In', 'Description', 'Delay (hrs)', 'Root Department', 'QC Checkpoint', 'Contested'];
    
    // Sort issues by Root Department and delay time (matching display order)
    const sortedIssues = [...issues].sort((a, b) => {
      // First sort by department
      if (a.rootDepartment !== b.rootDepartment) {
        return a.rootDepartment.localeCompare(b.rootDepartment);
      }
      // Then by delay time (descending)
      return (parseFloat(b.delayTime) || 0) - (parseFloat(a.delayTime) || 0);
    });
    
    const rows = sortedIssues.map(issue => [
      issue.date,
      issue.jobNumber,
      issue.partNumber || '-',
      issue.department,
      // Escape quotes in description text
      issue.description ? `"${issue.description.replace(/"/g, '""')}"` : '',
      issue.delayTime ? `${issue.delayTime} hrs` : '0 hrs',
      issue.rootDepartment,
      issue.isQcCheckpoint ? 'Yes' : 'No',
      issue.contested ? 'Yes' : 'No'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    downloadCSV(csvContent);
  };
  
  // Helper function to download CSV data
  const downloadCSV = (csvContent) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `prism_issues_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get issues grouped by department
  const getIssuesByDepartment = () => {
    const groupedIssues = {};
    
    // Initialize with empty arrays for all departments
    departments.forEach(dept => {
      groupedIssues[dept] = [];
    });
    
    // Group issues by root department
    issues.forEach(issue => {
      if (groupedIssues[issue.rootDepartment]) {
        groupedIssues[issue.rootDepartment].push(issue);
      } else {
        // Handle case where department doesn't match predefined list
        groupedIssues['Unassigned'] = groupedIssues['Unassigned'] || [];
        groupedIssues['Unassigned'].push(issue);
      }
    });
    
    return groupedIssues;
  };

  // Calculate delays by department
  const getDelaysByDepartment = () => {
    const delays = {};
    const issuesByDept = getIssuesByDepartment();
    
    Object.keys(issuesByDept).forEach(dept => {
      delays[dept] = issuesByDept[dept].reduce((total, issue) => {
        return total + (parseFloat(issue.delayTime) || 0);
      }, 0);
    });
    
    return delays;
  };

  return (
    <IssueContext.Provider 
      value={{ 
        issues,
        addIssue,
        contestIssue,
        deleteIssue,
        clearIssues,
        exportIssues,
        getIssuesByDepartment,
        getDelaysByDepartment,
        departments,
        isAnalyzing,
        isExporting
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};

export default IssueContext; 