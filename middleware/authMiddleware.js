const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ================= PROTECT ================= */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next(); // ✅ VERY IMPORTANT
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  } else {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};

/* ================= ADMIN ONLY ================= */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // ✅ VERY IMPORTANT
  } else {
    return res.status(403).json({
      message: "Admin access only",
    });
  }
};

/* ================= EXPORT ================= */
module.exports = {
  protect,
  adminOnly,
};





// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// /* ================= PROTECT ================= */
// const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       if (!req.user) {
//         return res.status(401).json({ message: "User not found" });
//       }

//       next(); // ✅ VERY IMPORTANT
//     } catch (error) {
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     return res.status(401).json({ message: "No token provided" });
//   }
// };

// /* ================= ADMIN ONLY ================= */
// const adminOnly = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next(); // ✅ VERY IMPORTANT
//   } else {
//     return res.status(403).json({ message: "Admin access only" });
//   }
// };

// module.exports = {
//   protect,
//   adminOnly,
// };



// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized" });
//     }
//   } else {
//     res.status(401).json({ message: "No token provided" });
//   }
// };

// // Role-based access
// exports.adminOnly = (req, res, next) => {
//   if (req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({ message: "Admin access only" });
//   }
// };