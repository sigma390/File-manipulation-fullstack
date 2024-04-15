import mongoose from "mongoose";



// Define MongoDB schema and model for file information
const fileSchema = new mongoose.Schema({
    filename: String,
    cloudinaryUrl: String,
    size: Number,
  });
  const File = mongoose.model('File', fileSchema);

  export default {File}