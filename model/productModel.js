import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    }, // Reference to Category
    image: { type: String, default: null },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
