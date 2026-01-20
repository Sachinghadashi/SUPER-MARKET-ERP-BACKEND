const Product = require("../models/Product");

// ================= CREATE PRODUCT =================
exports.createProduct = async (req, res) => {
  try {
    const { name, barcode, price, stock, category } = req.body;

    const exists = await Product.findOne({ barcode });
    if (exists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const product = await Product.create({
      name,
      barcode,
      price,
      stock,
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL PRODUCTS =================
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET BY BARCODE =================
exports.getProductByBarcode = async (req, res) => {
  try {
    const product = await Product.findOne({
      barcode: req.params.barcode,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE PRODUCT =================
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.barcode = req.body.barcode || product.barcode;
    product.price = req.body.price ?? product.price;
    product.stock = req.body.stock ?? product.stock;
    product.category = req.body.category || product.category;

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE PRODUCT =================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
