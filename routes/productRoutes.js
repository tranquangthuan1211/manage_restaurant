const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts'); 
const productController = require('../controllers/productController');

router.use(expressLayouts);
router.get('/', productController.getProducts);

router.get('/:id', productController.getProduct);
router.post('/', productController.getProductsAjax);
router.post('/reviews/:id', (req, res) => {
  if (req.isAuthenticated() && req.user.role === "customer") {
    productController.postProductReview(req, res);
  } else{
    res.status(401).json({ message: 'Unauthorized' });
  }
});

router.post('/reviews/update/helpfulness/:id', (req, res) => {
  if (req.isAuthenticated() && req.user.role === "customer") {
    productController.updateProductReviewHelpfulness(req, res);
  } else{
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;