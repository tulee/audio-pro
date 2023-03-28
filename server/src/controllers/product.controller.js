const jwt = require("jsonwebtoken");
const model = require('../models/product.model');
const bcrypt = require("bcrypt");

class ProductController {
  constructor() {}

  getProductBySlug = async (req, res) =>{
    let slug = req.params.slug
    if (!slug) {
        res.send({ existed: false, message: "Lack of product info to find" });
    } else {
        let product = await model.findBySlug(slug)
        if(product){
          res.send({ existed: true, product: product, message: "Found" })
        } else {
          res.send({ existed: false, message: "Can not find product" })
        }
    } 
  }

  get6BestSeller = async (req,res) => {
    let productList = (await model.findBestSeller()).slice(0,6)
    if(productList){
      res.send({status:true, productList:productList, message:"Found"})
    }else{
      res.send({status:false, productList:[], message:"None best seller"})
    }
  }

  getProductByCate = async (req,res) => {
    let power = req.query.power
    if(power&&power[0]!=''&&power[0]){
      power = req.query.power.split(',')
    }else{
      power = []
    }
    // let length = req.query.length
    // let {power, length} = req.body
    let cate = req.params.cate
    let productList = await model.findByCate(cate, power)
    // if(power){
    //   productList = await model.findByCateAndPower(cate,power)
    // }else{
    //   productList = await model.findByCate(cate)
    // }
    if(productList){
      res.send({status:true, productList:productList, message:"Found"})
    }else{
      res.send({status:false, productList:[], message:"Can not find product for this category"})
    }
  }
}

module.exports = new ProductController();
