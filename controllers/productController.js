const Product = require("../models/Product");

/* GET ALL */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* CREATE */
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* UPDATE */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* DELETE */
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product removed" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};





// const Product = require("../models/Product");

// // ================= CREATE PRODUCT =================
// exports.createProduct = async (req, res) => {
//   try {
//     const { name, barcode, price, stock, category } = req.body;

//     const exists = await Product.findOne({ barcode });
//     if (exists) {
//       return res.status(400).json({ message: "Product already exists" });
//     }

//     const product = await Product.create({
//       name,
//       barcode,
//       price,
//       stock,
//       category,
//     });

//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= GET ALL PRODUCTS =================
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ name: 1 });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= GET BY BARCODE =================
// exports.getProductByBarcode = async (req, res) => {
//   try {
//     const product = await Product.findOne({
//       barcode: req.params.barcode,
//     });

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= UPDATE PRODUCT =================
// exports.updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     product.name = req.body.name || product.name;
//     product.barcode = req.body.barcode || product.barcode;
//     product.price = req.body.price ?? product.price;
//     product.stock = req.body.stock ?? product.stock;
//     product.category = req.body.category || product.category;

//     const updated = await product.save();
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= DELETE PRODUCT =================
// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     await product.deleteOne();
//     res.json({ message: "Product deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };