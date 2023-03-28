const exp = require("express");
const router = exp.Router();
const controller = require('../controllers/user.controller')

const validateToken = require('../validateToken');

router.get('/details', validateToken, controller.getUserInfo);
router.put('/details', validateToken, controller.updateUserInfo);

router.post('/address/billing', validateToken, controller.addBillingAddress);
router.post('/address/shipping', validateToken, controller.addShippingAddress);

router.post('/register', controller.registerUser);

router.post('/login', controller.login);

router.get('/', (req, res) => {
    res.send('get my account')
});

module.exports = router;
