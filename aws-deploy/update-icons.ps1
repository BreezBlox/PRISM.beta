# PowerShell script to update icon files in the S3 bucket

# S3 bucket name from deploy-config.js
$S3_BUCKET = "prism-beta.app"

# Ensure AWS CLI is installed
try {
    aws --version
}
catch {
    Write-Error "AWS CLI is not installed. Please install it first: https://aws.amazon.com/cli/"
    exit 1
}

# Check if user is logged in to AWS
try {
    aws sts get-caller-identity | Out-Null
}
catch {
    Write-Error "You are not logged in to AWS. Please run 'aws configure' first."
    exit 1
}

# Upload SVG files with correct content type and public-read ACL
Write-Output "Uploading favicon.svg to S3..."
aws s3 cp public/favicon.svg s3://$S3_BUCKET/favicon.svg --content-type="image/svg+xml" --acl public-read

Write-Output "Uploading logo192.svg to S3..."
aws s3 cp public/logo192.svg s3://$S3_BUCKET/logo192.svg --content-type="image/svg+xml" --acl public-read

Write-Output "Uploading logo512.svg to S3..."
aws s3 cp public/logo512.svg s3://$S3_BUCKET/logo512.svg --content-type="image/svg+xml" --acl public-read

# Also invalidate CloudFront cache if you're using CloudFront (optional)
# aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/favicon.svg" "/logo192.svg" "/logo512.svg"

Write-Output "Upload complete! Your browser tab icon should now be updated."
Write-Output "Note: You may need to clear your browser cache to see the changes immediately." 