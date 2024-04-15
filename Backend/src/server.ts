import express, { Request, response, Response } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';
import dotenv from 'dotenv';
import cors from 'cors';

// Initialize Express app
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
// Load environment variables from .env file
dotenv.config();
// Define types for Cloudinary configuration
interface CloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
  }



// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/fileuptesting');
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Define MongoDB schema and model for file information
const fileSchema = new mongoose.Schema({
    filename: String,
    cloudinaryUrl: String,
    size: Number,
  });
  const File = mongoose.model('File', fileSchema);


// Cloudinary configuration object
const cloudinaryConfig: CloudinaryConfig = {
    cloud_name: 'da7v7tn8i',
    api_key: '869689868663424',
    api_secret: 'AnEfMfPYrYbR4VksK5n4BbhOJWU',
  };
  
  // Configure Cloudinary with the provided credentials
  cloudinary.v2.config(cloudinaryConfig);
  
  // Initialize Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



/// Route to handle file upload
app.post('/api/upload', upload.single('file'), async (req: Request, res: Response) => {
    try {
      // Check if req.file is defined
      if (!req.file) {
        throw new Error('No file uploaded');
      }
      console.log(req.file)
      
      // Upload file to Cloudinary

  
      // Save file information to MongoDB
      const newFile = new File({
        filename: req.file.originalname,
        cloudinaryUrl: 'uuuu',
        size: req.file.size,
      });
      await newFile.save();
  
      res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'An error occurred while uploading the file' });
    }
  });


  // Route to check if the server is running
app.get('/', async (req: Request, res: Response) => {
    res.json('Server is running!');
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });