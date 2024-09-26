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
router.route("/:id").delete(deleteCategory).put(updateCategory);

export default router;
