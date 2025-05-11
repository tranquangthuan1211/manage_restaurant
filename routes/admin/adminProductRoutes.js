const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const productController = require('../../controllers/productController');
const { route } = require("../productRoutes");

const router = express.Router();

router.use(expressLayouts);

router.get("/", (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.redirect("/users/signin");
  }
  productController.getProducts(req, res);
});

router.get('/get-signature', (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.redirect("/users/signin");
  }
  console.log("Getting cloudinary signature ...");
  productController.getSignature(req, res);
});

router.post('/upload-image', (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.redirect("/users/signin");
  }
  productController.uploadImage(req, res);
});

router.post('/create', (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.redirect("/users/signin");
  };
  productController.createProduct(req, res);
});

router.post('/update', (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.redirect("/users/signin");
  }
  productController.updateProduct(req, res);
});
router.post('/delete/:id', (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.redirect("/users/signin");
  }
  productController.deleteProduct(req, res);
});

router.get("/:id", (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.redirect("/users/signin");
  }
  productController.getProduct(req, res);
});

module.exports = router;