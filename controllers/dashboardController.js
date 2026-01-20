const Sale = require("../models/Sale");

// Total sales & revenue
exports.getSummary = async (req, res) => {
  const sales = await Sale.find();

  const totalSales = sales.length;
  const totalRevenue = sales.reduce(
    (sum, sale) => sum + sale.totalAmount,
    0
  );

  res.json({ totalSales, totalRevenue });
};

// Daily sales
exports.dailySales = async (req, res) => {
  const data = await Sale.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        total: { $sum: "$totalAmount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(data);
};

// Best selling products
exports.bestProducts = async (req, res) => {
  const data = await Sale.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.name",
        quantity: { $sum: "$items.quantity" },
      },
    },
    { $sort: { quantity: -1 } },
    { $limit: 5 },
  ]);

  res.json(data);
};
