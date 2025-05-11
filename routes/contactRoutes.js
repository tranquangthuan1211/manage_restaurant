const express = require("express");
const expressLayouts = require('express-ejs-layouts');

const router = express.Router();

router.use(expressLayouts);

router.get("/", (req, res) => {
  res.render("pages/contact", {title : "Contact"});
});

module.exports = router;
