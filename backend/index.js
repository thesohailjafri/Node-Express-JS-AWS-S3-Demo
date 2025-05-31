// high level import
import dotenv from 'dotenv'
dotenv.config()
// suppress maintenance mode message by AWS SDK
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1'
// other import
import express from 'express'
import multer from 'multer'
import AWS from 'aws-sdk'
import cors from 'cors'
import fs from 'fs'

const app = express()
const port = 3001

app.use(cors())

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' })

// AWS S3 configuration (replace with your credentials and bucket)
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})
const BUCKET_NAME = process.env.AWS_BUCKET_NAME

app.get('/', (req, res) => {
  res.send('Upload to AWS S3 From Node JS')
})
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  const fileContent = fs.readFileSync(req.file.path)
  const params = {
    Bucket: BUCKET_NAME,
    Key: req.file.originalname,
    Body: fileContent,
    ContentType: req.file.mimetype,
  }
  try {
    const data = await s3.upload(params).promise()
    fs.unlinkSync(req.file.path) // Remove file after upload
    res.json({ url: data.Location })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
