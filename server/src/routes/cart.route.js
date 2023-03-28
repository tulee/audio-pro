const exp = require("express");
const router = exp.Router();
const controller = require('../controllers/cart.controller')

const validateToken = require('../validateToken');

router.get('/:user_id', validateToken, controller.getCartDetailByUserId);
// router.post('/mycart', validateToken, controller.createUserCart);
router.post('/mycart', validateToken, controller.updateCart);
router.delete('/mycart', validateToken, controller.removeProductCartById);

module.exports = router;
