const exp = require("express");
const router = exp.Router();
const controller = require('../controllers/product.controller')

const validateToken = require('../validateToken');

router.get('/best-seller', controller.get6BestSeller);
router.get('/product-category/:cate', controller.getProductByCate);
router.get('/:slug', controller.getProductBySlug);

module.exports = router;
