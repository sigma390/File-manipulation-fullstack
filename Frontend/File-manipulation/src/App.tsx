import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      if (!selectedFile || selectedFile.size === 0) {
        throw new Error('No file selected or file is empty');
      }
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFileUrl(response.data.url);
      setUploading(false);
    } catch (error: any) {
      setError(error.message);
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>Upload</button>
      {uploading && <p>Uploading...</p>}
      {fileUrl && <p>File uploaded successfully. URL: {fileUrl}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default App;