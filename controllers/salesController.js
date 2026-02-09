const Sale = require("../models/Sale");
const Product = require("../models/Product");

/* ================= CREATE BILL ================= */

exports.createSale = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in bill" });
    }

    let billItems = [];
    let subTotal = 0;

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

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();

      const itemTotal = product.price * item.quantity;
      subTotal += itemTotal;

      billItems.push({
        product: product._id,
        name: product.name,
        barcode: product.barcode,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal,
      });
    }

    // Auto Bill Number
    const billNumber = "BILL-" + Date.now();

    const sale = await Sale.create({
      billNumber,
      items: billItems,
      subTotal,
      totalAmount: subTotal,
      paymentMethod,
      soldBy: req.user._id,
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET ALL SALES (ADMIN) ================= */

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

/* ================= GET MY SALES (CASHIER) ================= */

exports.getMySales = async (req, res) => {
  try {
    const sales = await Sale.find({
      soldBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






// const Sale = require("../models/Sale");
// const Product = require("../models/Product");

// /* ================= CREATE SALE ================= */
// exports.createSale = async (req, res) => {
//   try {
//     const { items, paymentMethod } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items in bill" });
//     }

//     let billItems = [];
//     let subTotal = 0;

//     for (let item of items) {
//       const product = await Product.findOne({ barcode: item.barcode });

//       if (!product) {
//         return res
//           .status(404)
//           .json({ message: `Product not found: ${item.barcode}` });
//       }

//       if (product.stock < item.quantity) {
//         return res
//           .status(400)
//           .json({ message: `Insufficient stock for ${product.name}` });
//       }

//       // Deduct stock
//       product.stock -= item.quantity;
//       await product.save();

//       const itemTotal = product.price * item.quantity;
//       subTotal += itemTotal;

//       billItems.push({
//         product: product._id,
//         name: product.name,
//         barcode: product.barcode,
//         price: product.price,
//         quantity: item.quantity,
//         total: itemTotal,
//       });
//     }

//     // GST (18%)
//     const gstAmount = +(subTotal * 0.18).toFixed(2);
//     const totalAmount = +(subTotal + gstAmount).toFixed(2);

//     // Generate bill number
//     const billNumber = `BILL-${Date.now()}`;

//     const sale = await Sale.create({
//       billNumber,
//       items: billItems,
//       subTotal,
//       gstAmount,
//       totalAmount,
//       paymentMethod,
//       soldBy: req.user._id,
//     });

//     res.status(201).json(sale);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };




// const Sale = require("../models/Sale");
// const Product = require("../models/Product");

// /* ================= CREATE SALE ================= */

// // @desc Create new bill (Cashier)
// exports.createSale = async (req, res) => {
//   try {
//     const { items, paymentMethod } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items in bill" });
//     }

//     let billItems = [];
//     let subTotal = 0;

//     // Generate unique bill number
//     const billNumber = "BILL-" + Date.now();

//     for (let item of items) {
//       const product = await Product.findOne({ barcode: item.barcode });

//       if (!product) {
//         return res
//           .status(404)
//           .json({ message: `Product not found: ${item.barcode}` });
//       }

//       if (product.stock < item.quantity) {
//         return res
//           .status(400)
//           .json({ message: `Insufficient stock for ${product.name}` });
//       }

//       // Deduct stock
//       product.stock -= item.quantity;
//       await product.save();

//       const itemTotal = product.price * item.quantity;
//       subTotal += itemTotal;

//       billItems.push({
//         product: product._id,
//         name: product.name,
//         barcode: product.barcode,
//         price: product.price,
//         quantity: item.quantity,
//         total: itemTotal,
//       });
//     }

//     /* ===== GST (18%) ===== */
//     const gstAmount = Number((subTotal * 0.18).toFixed(2));

//     /* ===== Final Amount ===== */
//     const totalAmount = subTotal + gstAmount;

//     /* ===== Save Sale ===== */
//     const sale = await Sale.create({
//       billNumber,
//       customerName: "Walk-in Customer",

//       items: billItems,

//       subTotal,
//       gstAmount,
//       totalAmount,

//       paymentMethod,
//       soldBy: req.user._id,
//       status: "paid",
//     });

//     res.status(201).json({
//       message: "Bill generated successfully",
//       sale,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };


// /* ================= GET ALL SALES (ADMIN) ================= */

// exports.getSales = async (req, res) => {
//   try {
//     const sales = await Sale.find()
//       .populate("soldBy", "name role")
//       .sort({ createdAt: -1 });

//     res.json(sales);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ================= GET MY SALES (CASHIER) ================= */

// exports.getMySales = async (req, res) => {
//   try {
//     const sales = await Sale.find({
//       soldBy: req.user._id,
//     }).sort({ createdAt: -1 });

//     res.json(sales);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };





// const Sale = require("../models/Sale");
// const Product = require("../models/Product");

// // @desc Create new bill (Cashier)
// exports.createSale = async (req, res) => {
//   try {
//     const { items, paymentMethod } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items in bill" });
//     }

//     let billItems = [];
//     let totalAmount = 0;

//     for (let item of items) {
//       const product = await Product.findOne({ barcode: item.barcode });

//       if (!product) {
//         return res
//           .status(404)
//           .json({ message: `Product not found: ${item.barcode}` });
//       }

//       if (product.stock < item.quantity) {
//         return res
//           .status(400)
//           .json({ message: `Insufficient stock for ${product.name}` });
//       }

//       // Deduct stock
//       product.stock -= item.quantity;
//       await product.save();

//       const itemTotal = product.price * item.quantity;
//       totalAmount += itemTotal;

//       billItems.push({
//         product: product._id,
//         name: product.name,
//         barcode: product.barcode,
//         price: product.price,
//         quantity: item.quantity,
//         total: itemTotal,
//       });
//     }

//     const sale = await Sale.create({
//       items: billItems,
//       totalAmount,
//       paymentMethod,
//       soldBy: req.user._id,
//     });

//     res.status(201).json(sale);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Get all sales (Admin)
// exports.getSales = async (req, res) => {
//   try {
//     const sales = await Sale.find()
//       .populate("soldBy", "name role")
//       .sort({ createdAt: -1 });

//     res.json(sales);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Get my sales (Cashier)
// exports.getMySales = async (req, res) => {
//   try {
//     const sales = await Sale.find({ soldBy: req.user._id }).sort({
//       createdAt: -1,
//     });
//     res.json(sales);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };