const Sale = require("../models/Sale");
const Product = require("../models/Product");

// @desc Create new bill (Cashier)
exports.createSale = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in bill" });
    }

    let billItems = [];
    let totalAmount = 0;

    for (let item of items) {
      const product = await Product.findOne({ barcode: item.barcode });

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.barcode}` });
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${product.name}` });
      }

      // Deduct stock
      product.stock -= item.quantity;
      await product.save();

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      billItems.push({
        product: product._id,
        name: product.name,
        barcode: product.barcode,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal,
      });
    }

    const sale = await Sale.create({
      items: billItems,
      totalAmount,
      paymentMethod,
      soldBy: req.user._id,
    });

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all sales (Admin)
exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("soldBy", "name role")
      .sort({ createdAt: -1 });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get my sales (Cashier)
exports.getMySales = async (req, res) => {
  try {
    const sales = await Sale.find({ soldBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
