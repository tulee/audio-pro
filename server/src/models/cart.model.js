const mongoose = require('mongoose');
const BaseModel = require('./base.model');
const CartSchema = require('./schemas/cart.schema');
class CartModel extends BaseModel {
    constructor(){
        super()
        this.init("carts", CartSchema);
    }

    async getCartByUserId(user_id){
        const agg = [
            {
              '$match': {
                'user_id': new mongoose.Types.ObjectId(user_id)
              }
            }]
        
        let result =  await this.model.aggregate(agg).exec();
        return result[0]
        
    }    

    async getCartDetailByUserId(user_id){
        const agg = [
            {
              '$match': {
                'user_id': new mongoose.Types.ObjectId(user_id)
              }
            }, {
              '$unwind': {
                'path': '$cart'
              }
            }, {
              '$lookup': {
                'from': 'products', 
                'localField': 'cart.product_id', 
                'foreignField': '_id', 
                'as': 'cart.product_info'
              }
            }, {
              '$unwind': {
                'path': '$cart.product_info'
              }
            }, {
              '$group': {
                '_id': '$_id', 
                'user_id': {
                  '$first': '$user_id'
                }, 
                'cart': {
                  '$push': '$cart'
                }
              }
            }
          ]

        let result =  await this.model.aggregate(agg).exec();
        return result
    }
}

module.exports = new CartModel();
