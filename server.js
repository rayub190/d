import express from "express";
const app = express();

import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

dotenv.config();

import ProductRouter from "./routes/productRoutes.js";
import categoryRouters from "./routes/categoryRoutes.js";


app.use(cors());
app.use(express.static("./public"));
app.use(fileUpload());
app.use(express.json());

app.use("/products", ProductRouter);
app.use("/category", categoryRouters);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(5000, () => console.log("listening on port 5000"));
  } catch (e) {
    console.error(e.message);
  }
};

start();
