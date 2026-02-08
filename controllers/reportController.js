const Sale = require("../models/Sale");

/* TOTAL */
exports.getTotalReport = async (req, res) => {
  try {
    const data = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalBills: { $sum: 1 },
        },
      },
    ]);

    res.json(data[0] || { totalRevenue: 0, totalBills: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DATE */
exports.getDateReport = async (req, res) => {
  try {
    const data = await Sale.aggregate([
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
      { $sort: { _id: -1 } },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* MONTH */
exports.getMonthReport = async (req, res) => {
  try {
    const data = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* YEAR */
exports.getYearReport = async (req, res) => {
  try {
    const data = await Sale.aggregate([
      {
        $group: {
          _id: { year: { $year: "$createdAt" } },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": -1 } },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
