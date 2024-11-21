import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategoryList,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").get(getCategoryList);
router.route("/add").post(addCategory);
router.route("/delete/:id").delete(deleteCategory);

router.route("/update/:id").put(updateCategory);

export default router;
