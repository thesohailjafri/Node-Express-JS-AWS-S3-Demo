### Setup AWS S3

1.  Signup for AWS account
2.  Go to S3
3.  Create bucket
4.  Go to properties
5.  Go to permissions
6.  Add policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

7. Also allow public access to the bucket
8. Go to users
9. Create user
10. Go to security credentials
11. Create access key
12. Go to environment variables
13. Add access key and secret access key to environment variables
14. Add bucket name and AWS region to environment variables

### After setting up AWS S3, can just install the dependencies and run the backend server
