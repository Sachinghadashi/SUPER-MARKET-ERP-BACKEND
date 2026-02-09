const mongoose = require("mongoose");

/* ================= SALE ITEM ================= */

const saleItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  barcode: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },
});

/* ================= SALE ================= */

const saleSchema = new mongoose.Schema(
  {
    // Auto bill number
    billNumber: {
      type: String,
      required: true,
      unique: true,
    },

    items: {
      type: [saleItemSchema],
      required: true,
    },

    subTotal: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "card", "online"],
      default: "cash",
    },

    soldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
