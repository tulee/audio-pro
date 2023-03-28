const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({    
    product_name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required:true
    },
    discount_price: Number,
    is_discount:Boolean,
    short_des:String,
    sku: String,
    overview:String,
    highlights:Array,
    technical_details:Array,
    reviews:Array,
    images:Array,
    slug:String,
    category:String,
    is_best_seller:Boolean,
    power:Array
},{
    timestamps:true
})
module.exports = ProductSchema