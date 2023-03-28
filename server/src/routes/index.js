const userRouter = require('./user.route');
const productRouter = require('./product.route');
const cartRouter = require('./cart.route');
const orderRouter = require('./order.route');

function route(app){
    app.use('/cart',cartRouter)
    app.use('/user',userRouter)
    app.use('/order',orderRouter)
    app.use('/product',productRouter)
    app.use('/',(req, res) => {
        res.send('Home page')
    })
}

module.exports = route