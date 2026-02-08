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
      unique: true,
      required: true,
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
    items: [saleItemSchema],

    /* Amounts */
    subTotal: {
      type: Number,
      required: true,
    },

    gstAmount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
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
    timestamps: true, // ✅ required for analytics
  }
);

/* ================= INDEX ================= */

saleSchema.index({ createdAt: 1 });
saleSchema.index({ billNumber: 1 });

module.exports = mongoose.model("Sale", saleSchema);


// const mongoose = require("mongoose");

// const saleSchema = new mongoose.Schema(
//   {
//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         name: String,
//         barcode: String,
//         price: Number,
//         quantity: Number,
//         total: Number,
//       },
//     ],
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     paymentMethod: {
//       type: String,
//       enum: ["cash", "upi", "card"],
//       default: "cash",
//     },
//     soldBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Sale", saleSchema);
