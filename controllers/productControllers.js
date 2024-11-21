import Product from "../model/productModel.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"; // Import fs module

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addProduct = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image file uploaded." });
    }

    const profilePath = req.files.image; // Access the uploaded image
    const uploadDir = path.join(__dirname, "../public/uploads/"); // Set the upload directory

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const imagePath = path.join(uploadDir, profilePath.name); // Full path to save the image
    await profilePath.mv(imagePath); // Move the file to the uploads directory

    // Create the product with the image URL
    const product = await Product.create({
      ...req.body,
      image: `/uploads/${profilePath.name}`, // Adjust based on your server URL
    });

    if (!product) {
      throw new Error("Something went wrong while creating the product.");
    }

    res.status(201).json(product); // Send back the created product
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true, runValidators: true } // Options to return the updated product and validate input
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  const product = await Product.find().sort({ createdAt: -1 });

  if (!product) throw new Error("something went wrong");

  res.status(200).json(product);
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku } = req.query; // You can add more fields to search by
    let product;

    if (id) {
      // Delete by id
      product = await Product.findByIdAndDelete(id);
    } else if (name) {
      // Delete by name
      product = await Product.deleteOne({ name });
    } else if (sku) {
      // Delete by sku
      product = await Product.deleteOne({ sku });
    } else {
      return res
        .status(400)
        .json({ message: "No valid criteria provided for deletion" });
    }

    if (!product || product.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getProductDetail = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (!product) throw new Error("something went wrong");

  res.status(200).json(product);
};
