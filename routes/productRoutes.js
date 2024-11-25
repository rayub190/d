import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductDetail,
  getProductList,
  updateProduct,
} from "../controllers/productControllers.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleWare.js";

const router = express.Router();

router.route("/").get(authMiddleware, getProduct);
router.route("/list").get( getProductList);
router.route("/add").post(addProduct);
router.route("/update").put(updateProduct);
router.route("/:id").delete(deleteProduct).get(getProductDetail);

export default router;
