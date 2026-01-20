const express = require("express");
const {
  createProduct,
  getProducts,
  getProductByBarcode,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

// Admin + Cashier
router.get("/", protect, getProducts);
router.get("/barcode/:barcode", protect, getProductByBarcode);

module.exports = router;
