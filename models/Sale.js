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

/* ================= SALE SCHEMA ================= */

const saleSchema = new mongoose.Schema(
  {
    /* Bill Info */
    billNumber: {
      type: String,
      required: true,
      unique: true, // ✅ Only one index here
      trim: true,
    },

    /* Customer Info */
    customerName: {
      type: String,
      default: "Walk-in Customer",
    },

    customerPhone: {
      type: String,
      default: "",
    },

    customerEmail: {
      type: String,
      default: "",
    },

    /* Products */
    items: {
      type: [saleItemSchema],
      required: true,
    },

    /* Amounts */
    subTotal: {
      type: Number,
      required: true,
      min: 0,
    },

    gstAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    /* Payment */
    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "card", "online"],
      default: "cash",
    },

    /* Status */
    status: {
      type: String,
      enum: ["paid", "cancelled", "refunded"],
      default: "paid",
    },

    /* Cashier */
    soldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true, // ✅ createdAt & updatedAt
  }
);

/* ================= INDEXES ================= */

// For fast date filtering (reports)
saleSchema.index({ createdAt: 1 });

// For cashier reports
saleSchema.index({ soldBy: 1 });

// For searching bill
saleSchema.index({ billNumber: 1 });

module.exports = mongoose.model("Sale", saleSchema);
