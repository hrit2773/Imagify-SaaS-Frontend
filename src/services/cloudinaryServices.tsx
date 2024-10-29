import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
});

// Function to upload an image
export async function uploadImage(imagePath: string) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      transformation: [
        { width: 500, height: 500, crop: "limit" },
        { effect: "auto_color" },
      ],
    });
    console.log("Image URL:", result.secure_url);
  } catch (error) {
    console.error("Upload Error:", error);
  }
}
