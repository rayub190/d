import Category from "../model/categoryModel.js";
import { uploadFile, deleteFile } from "../utils/handleFileUpload.js";

export const addCategory = async (req, res) => {
  try {
    const imageUrl = await uploadFile(req.files.image);
    const category = await Category.create({ ...req.body, image: imageUrl });

    res.status(200).json(category);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await deleteFile(category.image);
    
    await Category.deleteOne({ _id: req.params.id });

    res.status(200).json(category);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const getCategoryList = async (req, res) => {
  try {
    const categories = await Category.find({ name: "shoes" });
    res.status(200).json(categories);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    let imageUrl = category.image;

    // Check if a new image is uploaded
    if (req.files && req.files.image) {
      // Delete the old image file
      await deleteFile(category.image);

      // Upload the new image and get the new URL
      imageUrl = await uploadFile(req.files.image);
    }

    // Update category with new data
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imageUrl },
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
