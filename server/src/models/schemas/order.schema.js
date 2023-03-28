const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({    
    // _id:mongoose.Types.ObjectId,
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },    
    created_date: Date,
    total: Number,
    subtotal:Number,
    shippping_fee:Number,
    items:[
        {
            amount:Number,
            product_id:mongoose.Types.ObjectId,
            power:String,
            sku:String,
            image:String,
            product_name:String,
            slug:String,
            last_price:Number
        }
    ],
    shipping_address:{
        first_name:String,
        last_name:String,
        address:String,
        city:String,
        ward:String,
        zip:String,
        country:String,
        phone:String,
        notes:String
    },
    payment_method:String,
    order_status:String
})
module.exports = OrderSchema

