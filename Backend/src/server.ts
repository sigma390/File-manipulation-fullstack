import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import cors from 'cors';
//hi
const app = express();
const PORT = process.env.PORT || 5000;

const cloudinaryConfig = {
    cloud_name: 'da7v7tn8i',
    api_key: '869689868663424',
    api_secret: 'AnEfMfPYrYbR4VksK5n4BbhOJWU',
};
cloudinary.v2.config(cloudinaryConfig);

app.use(cors()); 

const storage = multer.diskStorage({
    destination: 'uploads/', 
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

interface UploadedFile extends Express.Multer.File {
    buffer: Buffer;
}

app.post('/api/upload', upload.single('file'), async (req: Request, res: Response) => {
    try {
        if (!req.file || req.file.size === 0) {
            throw new Error('No file uploaded or file is empty');
        }

        const result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'auto' });

        res.status(200).json({ url: result.secure_url });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'An error occurred while uploading the file' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
