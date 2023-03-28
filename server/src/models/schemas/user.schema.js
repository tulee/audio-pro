const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({    
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: String,
    email: {
        type: String,
        required: true
    },
    role: String,
    billing_address: [{
        first_name:String,
        last_name:String,
        company:String,
        country:String,
        street:String,
        city:String,
        state:String,
        zip: String,
        phone:String,
        email:String
    }],
    shipping_address: [{
        first_name:String,
        last_name:String,
        company:String,
        country:String,
        street:String,
        city:String,
        state:String,
        zip: String
    }]
},{
    timestamps:true
})
module.exports = UserSchema