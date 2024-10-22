import express from "express";

import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

// Get products
router.get("/", getProducts);

// Add a product
router.post("/", addProduct);

// Delete a product
router.delete("/:id", deleteProduct);

// Update a product
router.put("/:id", updateProduct);

export default router;
