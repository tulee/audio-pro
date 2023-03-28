const jwt = require("jsonwebtoken");
const model = require('../models/order.model');
const userModel = require('../models/user.model');
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

class OrderController {
    constructor() {}

    getOrderByUserId = async (req, res) =>{
        let user_id = req.params.user_id
        if(!user_id){
            res.send({ status: false, message: "Lack of user info" })
        } else {
            let myOrders = await model.getOrderByUserId(user_id)
            res.send({ status: true, myOrders: myOrders, message: "Load order successfully" })        
        }
    }

    getOrderByOrderId = async (req, res) =>{
        let order_id = req.params.order_id
        console.log(order_id);
        if(!order_id){
            res.send({ status: false, message: "Lack of order id" })
        } else {
            let order = await model.get(order_id)
            res.send({ status: true, order: order, message: "Load order successfully" })        
        }
    }

    createOrder = async (req,res) =>{
        let order = req.body
        if(!order.user_id){
            res.send({ status: false, message: "Lack of user info" })
        } else {
            let received_order = await model.create(order)
            // let myOrders = await model.getOrderByUserId(order.user_id)
            // let orders_info = {
            //     received_order:received_order,
            //     myOrders:myOrders
            // }
            // res.send({ status: true, orders_info: orders_info, message: "Load order successfully" })  
            res.send({ status: true, received_order: received_order, message: "Load order successfully" })  
        }
    }
}

module.exports = new OrderController();
