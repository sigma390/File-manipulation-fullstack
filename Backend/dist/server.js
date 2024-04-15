"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Initialize Express app
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 5000;
// Load environment variables from .env file
dotenv_1.default.config();
// Connect to MongoDB database
mongoose_1.default.connect('mongodb://localhost:27017/fileuptesting');
const db = mongoose_1.default.connection;
db.once('open', () => {
    console.log('Connected to MongoDB database');
});
// Define MongoDB schema and model for file information
const fileSchema = new mongoose_1.default.Schema({
    filename: String,
    cloudinaryUrl: String,
    size: Number,
});
const File = mongoose_1.default.model('File', fileSchema);
// Cloudinary configuration object
const cloudinaryConfig = {
    cloud_name: 'da7v7tn8i',
    api_key: '869689868663424',
    api_secret: 'AnEfMfPYrYbR4VksK5n4BbhOJWU',
};
// Configure Cloudinary with the provided credentials
cloudinary_1.default.v2.config(cloudinaryConfig);
// Initialize Multer for file uploads
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
/// Route to handle file upload
app.post('/api/upload', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if req.file is defined
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        console.log(req.file);
        // Upload file to Cloudinary
        // Save file information to MongoDB
        const newFile = new File({
            filename: req.file.originalname,
            cloudinaryUrl: 'uuuu',
            size: req.file.size,
        });
        yield newFile.save();
        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    }
    catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'An error occurred while uploading the file' });
    }
}));
// Route to check if the server is running
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Server is running!');
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
