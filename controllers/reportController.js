const Sale = require("../models/Sale");

// ================= TOTAL REVENUE =================
exports.getTotalRevenue = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalBills: { $sum: 1 },
        },
      },
    ]);

    res.json(
      result[0] || { totalRevenue: 0, totalBills: 0 }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DATE WISE =================
exports.getDateWiseSales = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= MONTH WISE =================
exports.getMonthWiseSales = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= YEAR WISE =================
exports.getYearWiseSales = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: { year: { $year: "$createdAt" } },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1 } },
    ]);

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
