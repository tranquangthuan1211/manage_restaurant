const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const adminProductRoutes = require("./adminProductRoutes");
const adminUserRoutes = require("./adminUserRoutes");
const adminAccountsRoutes = require("./adminAccountsRoutes");

const router = express.Router();
const analyticsController = require("../../controllers/analyticsController");
router.use(expressLayouts);

router.use("/products", adminProductRoutes);
router.use("/accounts", adminAccountsRoutes);

// This is just to macth customer /users/profile route. This is NOT where the admin manage user accounts 
router.use("/users", adminUserRoutes);

router.get("/", (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.redirect("/users/signin");
  }
  res.render("admin", {title : "Admin", layout : "./layouts/admin/admin_page_layout"});
});

router.get('/analytics', analyticsController.viewRevenueAnalytics);
router.get('/revenue-by-product', analyticsController.viewRevenueByProduct);

module.exports = router;