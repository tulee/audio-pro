const mongoose = require('mongoose');
const BaseModel = require('./base.model');
const ProductSchema = require('./schemas/product.schema');
class ProductModel extends BaseModel {
    constructor(){
        super()
        this.init("products", ProductSchema);
    }

    findByProductName(product_name){
        const query = this.model.findOne({product_name: product_name});
        return query.exec();
    }

    findBySlug(slug){
        const query = this.model.findOne({slug: slug});
        return query.exec();
    }

    findBestSeller(){
        const query = this.model.find({is_best_seller:true})
        return query.exec()
    }

    findByCate(cate, power){
        let query = this.model.find({category:cate})
        if(power&&power[0]!=''&&power[0]){
            query = query.find({power: {$in:power}})
        }
        // if(length||length==''){
        //     query = query.find({length: {$in:length}})
        // }
        return query.exec()
    }

    // findByCateAndPower(cate,power){
    //     let query = this.model.find({category:cate})
    //     if(power){
    //         query = query.find({power:power})
    //     }
    //     return query.exec()
    // }
}

module.exports = new ProductModel();
