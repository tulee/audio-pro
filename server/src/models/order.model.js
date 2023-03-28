const mongoose = require('mongoose');
const BaseModel = require('./base.model');
const OrderSchema = require('./schemas/order.schema');
class OrderModel extends BaseModel {
    constructor(){
        super()
        this.init("orders", OrderSchema);
    }

    async getOrderByUserId(user_id){
        const agg = [
            {
              '$match': {
                'user_id': new mongoose.Types.ObjectId(user_id)
              }
            }]
        
        let result =  await this.model.aggregate(agg).exec();
        return result
        
    }    
}

module.exports = new OrderModel();
