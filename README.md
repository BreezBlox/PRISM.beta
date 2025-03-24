# PRISM.beta

**Production Root Issue Sorting Mechanism** - A tool for tracking and analyzing production issues.

![PRISM.beta](public/prism-screenshot.png)

## Overview

PRISM is a lightweight tool that helps teams track production issues and determine which department is responsible for them. It uses AI to automatically classify issues based on their descriptions, making it easier to identify patterns and address root causes.

## Features

- **Issue Submission Form**: Submit production issues with details like job number, department, description, and delay time.
- **AI-Powered Analysis**: Automatically classifies issues to their root department using Mistral AI.
- **Department Visualization**: View issues organized by responsible department with delay time analytics.
- **Interactive Charts**: Bar graph visualization of delay times by department.
- **Contest Mechanism**: Contest AI department assignments with feedback that improves the system over time.
- **Data Export**: Export issue data as CSV for further analysis.
- **Mobile Responsive**: Works on all devices with responsive design.
- **Offline Capable**: Basic functionality works without internet connection.

## Technology Stack

- **Frontend**: React.js
- **AI Integration**: Mistral AI API
- **Deployment**: AWS Free Tier (S3, Lambda, API Gateway)
- **State Management**: React Context API
- **Styling**: Custom CSS with responsive design

## Getting Started

### Prerequisites

- Node.js and npm
- Mistral API key (optional for enhanced AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/prism.beta.git
cd prism.beta
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your Mistral API key (optional):
```
REACT_APP_MISTRAL_API_KEY=your_mistral_api_key_here
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

This application is designed to be deployed on AWS Free Tier. See [aws-deploy/README.md](aws-deploy/README.md) for detailed deployment instructions.

## Usage

1. **Submit an Issue**: Fill out the issue form with details about the production problem.
2. **View Analysis**: The system will automatically categorize the issue to a responsible department.
3. **Contest Classifications**: If you disagree with the AI's assignment, use the contest button to provide feedback.
4. **Export Data**: Use the export button to download all issues as a CSV file.

## Project Structure

- `src/components/`: React components
- `src/services/`: API integration services
- `src/context/`: Application state management
- `src/styles/`: CSS styles
- `aws-deploy/`: AWS deployment configuration and instructions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built by BreezBlox
- Powered by Mistral AI

## Backend for API Key Security

This project now includes a backend service to securely handle API keys. This prevents exposing sensitive keys in the frontend code.

### Running the Application

To run the app locally with the backend:

1. Clone this repository
2. Create a `.env` file based on `.env.example` and add your Mistral API key
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server (frontend + backend):
   ```
   npm run dev
   ```

### Deployment Options

#### Option 1: AWS Lambda (existing setup)

The AWS Lambda function in `aws-deploy/lambda/analyze.js` will continue to work with the updated frontend. Make sure to set environment variables in the Lambda console.

#### Option 2: Netlify Functions

This project now includes Netlify Functions integration:

1. Deploy to Netlify
2. Set the `MISTRAL_API_KEY` environment variable in the Netlify dashboard
3. The serverless function at `netlify/functions/analyze.js` will handle API requests

#### Option 3: Express Server

For custom server deployments:

1. Deploy the frontend files (from the `build` directory)
2. Deploy the Express server (`server.js`)
3. Set environment variables on your server

### Environment Variables

- `MISTRAL_API_KEY`: Your Mistral API key (backend only)
- `FRONTEND_URL`: URL of your frontend (for CORS, backend only)
- `PORT`: Port for the Express server (backend only, default: 3001)
- `REACT_APP_API_ENDPOINT`: URL of your backend API (frontend only) 