/**
 * AWS Deployment Configuration
 * 
 * This file contains the configuration for deploying PRISM to AWS Free Tier
 * using S3, Lambda, and API Gateway.
 */

// S3 Configuration
exports.s3Config = {
  bucketName: 'prism-beta.app', // Updated to match domain name
  region: 'us-east-1',
  indexDocument: 'index.html',
  errorDocument: 'index.html',
  // Set distribution to public access for website hosting
  publicAccess: true
};

// CloudFront Configuration
exports.cloudFrontConfig = {
  comment: 'PRISM Beta Distribution',
  defaultRootObject: 'index.html',
  enabled: true,
  priceClass: 'PriceClass_100', // Use only North America and Europe edge locations to minimize costs
  customDomain: {
    domainName: 'prism-beta.app',
    alternateNames: ['www.prism-beta.app']
  },
  // Configure error pages
  custom404: '/404.html',
  customError: {
    errorCachingMinTtl: 300,
    errorCode: 404,
    responseCode: 404,
    responsePage: '/404.html'
  }
};

// API Gateway Configuration
exports.apiGatewayConfig = {
  name: 'prism-api',
  description: 'API for PRISM application',
  stageName: 'beta',
  corsEnabled: true,
  // Configure CORS for your frontend domain
  corsConfiguration: {
    allowOrigins: ['https://prism-beta.app', 'https://www.prism-beta.app'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: [
      'Content-Type',
      'X-Amz-Date',
      'Authorization',
      'X-Api-Key',
      'X-Amz-Security-Token'
    ],
    allowCredentials: false,
    maxAge: 300 // 5 minutes
  }
};

// Lambda Function Configuration
exports.lambdaConfig = {
  analyzeFunction: {
    name: 'prism-analyze-issue',
    handler: 'analyze.handler',
    runtime: 'nodejs16.x',
    timeout: 10, // seconds
    memorySize: 128, // MB
    environment: {
      MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || '',
      NODE_ENV: 'production'
    }
  },
  exportFunction: {
    name: 'prism-export-data',
    handler: 'export.handler',
    runtime: 'nodejs16.x',
    timeout: 10, // seconds
    memorySize: 128, // MB
    environment: {
      NODE_ENV: 'production'
    }
  }
};

// CloudWatch Alarms for Cost Control
exports.cloudWatchConfig = {
  lambdaCostAlarm: {
    name: 'PRISM-Lambda-Cost-Alert',
    threshold: 5, // USD
    evaluationPeriods: 1,
    period: 86400, // 1 day in seconds
    statistic: 'Maximum',
    actionsEnabled: true
  },
  apiGatewayCostAlarm: {
    name: 'PRISM-API-Gateway-Cost-Alert',
    threshold: 5, // USD
    evaluationPeriods: 1,
    period: 86400, // 1 day in seconds
    statistic: 'Maximum',
    actionsEnabled: true
  }
};

// Helper function to generate full deployment setup instructions
exports.generateDeploymentInstructions = () => {
  return `
# PRISM AWS Deployment Guide

## Prerequisites
1. Install AWS CLI and configure it with your credentials
2. Install Node.js and npm

## Deployment Steps

### 1. Build the React application
\`\`\`
npm run build
\`\`\`

### 2. Create S3 bucket and configure for static website hosting
\`\`\`
aws s3api create-bucket --bucket ${exports.s3Config.bucketName} --region ${exports.s3Config.region}
aws s3 website s3://${exports.s3Config.bucketName} --index-document ${exports.s3Config.indexDocument} --error-document ${exports.s3Config.errorDocument}
aws s3api put-bucket-policy --bucket ${exports.s3Config.bucketName} --policy file://aws-deploy/bucket-policy.json
\`\`\`

### 3. Upload build files to S3
\`\`\`
aws s3 sync build/ s3://${exports.s3Config.bucketName} --acl public-read
\`\`\`

### 4. Create Lambda functions
- Create the Lambda functions via the AWS Console
- Upload the code from the aws-deploy/lambda directory
- Set environment variables as specified in the configuration

### 5. Create API Gateway
- Create the API Gateway via the AWS Console
- Configure CORS as specified in the configuration
- Set up routes to the Lambda functions
- Deploy the API

### 6. Update frontend configuration
- Update the API endpoint in the frontend code
- Rebuild and redeploy to S3

Your application should now be accessible at: http://${exports.s3Config.bucketName}.s3-website-${exports.s3Config.region}.amazonaws.com/
`;
};

// Generate S3 bucket policy for public website hosting
exports.generateBucketPolicy = () => {
  return {
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'PublicReadGetObject',
        Effect: 'Allow',
        Principal: '*',
        Action: 's3:GetObject',
        Resource: `arn:aws:s3:::${exports.s3Config.bucketName}/*`
      }
    ]
  };
}; 