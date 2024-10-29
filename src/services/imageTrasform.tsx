import React, { useState } from 'react';
import { uploadImage } from './cloudinaryServices.tsx';

const ImageUploader: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImageFile(file);
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      console.error("No file selected.");
      return;
    }

    try {
      const imagePath = URL.createObjectURL(imageFile); // Temporarily creates a URL for the file
      await uploadImage(imagePath);
      URL.revokeObjectURL(imagePath); // Clean up after upload
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
        hello
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleImageUpload} disabled={!imageFile}>
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;
