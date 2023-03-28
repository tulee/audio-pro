const jwt = require("jsonwebtoken");
const model = require('../models/cart.model');
const userModel = require('../models/user.model');
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

class CartController {
    constructor() {}

    getCartDetailByUserId = async (req, res) =>{
        let user_id = req.params.user_id
        if(!user_id){
            res.send({ status: false, message: "Lack of user info" })
        } else {
            let user_cart = await model.getCartDetailByUserId(user_id)
            if(user_cart.length > 0){
                res.send({ status: true, user_cart: user_cart[0], message: "Load cart successfully" })
            } else {
                res.send({ status: false, message: "Do not have cart of this user. Let create it!" })
            }
            
        }
    }

    removeProductCartById = async (req, res) =>{
        let { cart_id, user_id, item_id } = req.body
        if(!cart_id || !item_id){
            res.send({ status: false, message: "Lack of info" })
        } else {
            let user_cart = await model.get(cart_id)
            let findIndex = user_cart.cart.findIndex(e => e._id.toString() == item_id.toString())
            user_cart.cart.splice(findIndex,1)

            await model.update(user_cart._id,user_cart)
            let new_cart = await model.getCartDetailByUserId(user_id)

            res.send({ status: true, user_cart:new_cart[0], message: "Delete successful" }) 
        }
    }

    updateCart = async (req,res) => {
        let {user_id, product_id, selected_power, updated_amount} = req.body
        updated_amount = Number(updated_amount)
        if(!user_id||!product_id){
            res.send({ status: false, message: "Lack of info" })
        } else {
            let user_cart = await model.getCartByUserId(user_id)
            let findIndex = user_cart.cart.findIndex(e => e.product_id.toString() == product_id && e.selected_power == selected_power)
            if(findIndex >= 0){
                if( updated_amount < 0 && user_cart.cart[findIndex].amount == 0){
                    user_cart.cart[findIndex].amount = 0
                } else {
                    user_cart.cart[findIndex].amount += updated_amount
                }
            } else {
                let item = {
                    product_id: new mongoose.Types.ObjectId(product_id),
                    selected_power: selected_power,
                    amount:updated_amount
                }
                user_cart.cart.push(item)
            }

            await model.update(user_cart._id,user_cart)
            let new_cart = await model.getCartDetailByUserId(user_id)

            res.send({ status: true, user_cart:new_cart[0], message: "Update successful" })

            // let new_cart = user_cart.cart.map( e => {
            //     if(e.product_id == product_id){
            //         if(e.amount == 0 && updated_amount < 0){
            //             e.amount = 0
            //         } else {
            //             e.amount= e.amount + updated_amount
            //         }
            //     }
            // })
        }
    }
    // updateCart = async (req, res) =>{
    //     let {user_id, cart} = req.body
    //     let result = await model.findAndUpdate({user_id:user_id},{cart:cart})
    //     if(result){
    //         let user_cart = await model.findDetailCartByUserId(user_id)
    //         res.send({ status: true, user_cart: user_cart, message: "Update cart successfully" })
    //     } else {
    //         let findResult = await userModel.get(user_id)
    //         if(!findResult){
    //             res.send({ status: false, message: "User does not exist" })
    //         } else {
    //             let new_user_cart = {
    //                 user_id:user_id,
    //                 cart:cart
    //             }

    //             let user_cart = await model.create(new_user_cart)
    //             res.send({ status: true, user_cart: user_cart, message: "Update cart successfully" })
    //         }
    //     }
    // }

    // updateCartInfo = async (req,res) => {
    //     let {id, cartInfo} = req.body
    //     let result = await model.update(id, cartInfo)
    //       if(result.matchedCount>0){
    //         let user_cart = await model.get(id)
    //         res.send({ status:true , user_cart: user_cart, message:"Update user cart sucessfully"})
    //       }else{
    //         res.send({ status: false, message:"Can not find cart"})
    //       }
    // }

    // createUserCart = async (req,res) => {
    //     let user_cart = req.body
    //     let cart = await model.findCartByUserId(user_cart.user_id)
    //     if(cart.length > 0){
    //         res.send({ status:false ,  message:"This user already have cart. Let update it!"})
    //     } else{
    //         let result = await model.create(user_cart)
    //         if(result){
    //             res.send({ status:true, user_cart:result,  message:"Update user info sucessfully"})
    //         } else {
    //             res.send({ status:false ,  message:"Update fail"})
    //         }
    //     }
    // }
}

module.exports = new CartController();
