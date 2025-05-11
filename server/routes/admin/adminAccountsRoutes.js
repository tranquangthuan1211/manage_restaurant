const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const userController = require("../../controllers/userController");
const router = express.Router();

router.use(expressLayouts);

router.get("/", (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.redirect("/users/signin");
  }
  userController.getUserAccounts(req, res);
});

router.put("/update/:userId/status", (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.redirect("/users/signin");
  }
  console.log("update account status"); 
  userController.updateAccountStatus(req, res);
});

module.exports = router;