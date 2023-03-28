const mongoose = require('mongoose')
const CartSchema = new mongoose.Schema({    
    // _id:mongoose.Types.ObjectId,
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },    
    cart:[
        {
            product_id: mongoose.Types.ObjectId,
            amount: Number,
            selected_power:String
        }
    ]
})
module.exports = CartSchema