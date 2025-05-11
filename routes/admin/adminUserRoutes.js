const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const userController = require("../../controllers/userController");
const router = express.Router();

router.use(expressLayouts);

router.get("/profile", (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.redirect("/users/signin");
  }
  res.render("admin/users/profile", {title : "Admin Profile", layout : "./layouts/admin/admin_page_layout", user : req.user});
});


router.post("/update/:id", (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.redirect("/users/signin");
  }
  userController.updateUserById(req, res);
});
router.post("/change-password", (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.redirect("/users/signin");
  }
  userController.updateUserById(req, res);
});

module.exports = router;