const exp = require("express");
const router = exp.Router();
const controller = require('../controllers/order.controller')

const validateToken = require('../validateToken');

router.get('/:user_id', validateToken, controller.getOrderByUserId);
router.get('/view_order/:order_id', validateToken, controller.getOrderByOrderId);
router.post('/myorder', validateToken, controller.createOrder);

module.exports = router;
