import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = async (filePath) => {
  // Extract the file name and extension
  const fileExtension = path.extname(filePath.name); // e.g., '.jpeg'
  const baseName = path.basename(filePath.name, fileExtension); // e.g., 'download'
  if (![".jpeg", ".png", ".jpg"].includes(fileExtension)) {
    throw new Error("Only Images are allowed");
  }

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB

  // Check if the file size exceeds 2MB
  if (filePath.size > MAX_SIZE) {
    throw new Error("File size exceeds 2MB");
  }
  // Append timestamp to the file name to make it unique (before the extension)
  const uniqueFileName = `${baseName}-${Date.now()}${fileExtension}`;

  // Correctly generate the URL for accessing the file
  const imageUrl = `/uploads/${uniqueFileName}`;

  // Generate the full file path where the file will be saved
  const imagePath = path.join(__dirname, "../public/uploads/", uniqueFileName);

  // Ensure the 'uploads' directory exists
  // On Windows: C:\backend\uploads\image.jpg
  // On Linux/Mac: /backend/uploads/image.jpg
  if (!fs.existsSync(path.join(__dirname, "../public/uploads/"))) {
    fs.mkdirSync(path.join(__dirname, "../public/uploads/"), {
      recursive: true,
    });
  }

  // Move the file to the 'uploads' folder with the new unique name
  await filePath.mv(imagePath);

  // Return the correctly formatted URL
  return imageUrl;
};

// Function to delete a file
const deleteFile = async (filePath) => {
  try {
    // Full path to the file on the server
    const fullFilePath = path.join(__dirname, "../public", filePath);

    // Check if the file exists
    if (fs.existsSync(fullFilePath)) {
      // Delete the file
      fs.unlinkSync(fullFilePath);
      console.log(`File deleted: ${fullFilePath}`);
    } else {
      console.log("File not found");
    }
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

export { uploadFile, deleteFile };
