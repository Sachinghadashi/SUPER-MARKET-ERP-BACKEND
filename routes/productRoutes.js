const express = require("express");

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByBarcode, // ✅ ADD
} = require("../controllers/productController");

const router = express.Router();

/* Routes */

router.get("/", getProducts);

// ✅ BARCODE ROUTE (IMPORTANT)
router.get("/barcode/:barcode", getProductByBarcode);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;


// const express = require("express");

// const {
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../controllers/productController");

// const router = express.Router();

// /* Routes */

// router.get("/", getProducts);

// router.post("/", createProduct);

// router.put("/:id", updateProduct);

// router.delete("/:id", deleteProduct);

// module.exports = router;
