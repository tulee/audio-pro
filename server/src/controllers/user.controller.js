const jwt = require("jsonwebtoken");
const model = require('../models/user.model');
const cartModel = require('../models/cart.model');
const bcrypt = require("bcrypt");

const saltRounds = 10;

class UserController {
  constructor() {}

  getUserInfo = async (req,res) =>{
    let { username } = req.body
    if (!username) {
        res.send({ message: "Username are required" });
    } else {
        let user = await model.findByUsername(username)
        res.send(user)
    } 
  }

  updateUserInfo = async (req,res) =>{
    let { id,newInfo,passwordChange } = req.body
    
    if( !newInfo.first_name || !newInfo.last_name || !newInfo.username ){
      res.send({ status: false, message:"Must include First Name, Last Name and Display Name"})
    }else{
      if(passwordChange){
        let { currentPass, newPass, confirmPass } = passwordChange
        let resultCheckPass = await this.checkChangePassword(id, currentPass, newPass, confirmPass)
        if(resultCheckPass.status){
          newInfo.password = this.hashPassword(newPass)
          let result = await model.update(id, newInfo)
          if(result.matchedCount>0){
            let user = await model.get(id)
            res.send({ status:true , user: user, message:"Update user info sucessfully"})
          }else{
            res.send({ status: false, message:"Can not find user"})
          }
        } else {
          res.send({ status: false, message:resultCheckPass.message})
        }
      } else {
        let result = await model.update(id, newInfo)
          if(result.matchedCount>0){
            let user = await model.get(id)
            res.send({ status:true , user: user, message: "Update user info sucessfully"})
          }else{
            res.send({ status: false, message:"Can not find user"})
          }
      }
    }
  }

  // getUserAddress = async (req,res) =>{
  //   let { username } = req.body
  //   if (!username) {
  //       res.send({ message: "Username are required" });
  //   } else {
  //       let user = await model.findByUsername(username)
  //       res.send(user.address)
  //   } 
  // }
  
  // createUser = async (req,res) =>{
  //   let user = req.body
  //   user.password = this.hashPassword(user.password);
  //   let result = await model.create(user)
  //   res.send(result)
  // }

  registerUser =  async (req, res) => {
    let { username, password, confirmPass, first_name, last_name, email } = req.body

    if(!username || !password || !confirmPass || !first_name || !last_name || !email ){
      res.send({ status: false,token:"", message:"Lack of info"})
    } else {
      if(password == confirmPass){
        let new_user = {
          username: username,
          password:this.hashPassword(password),
          first_name:first_name,
          last_name:last_name,
          email:email
        }

        let result = await model.create(new_user)

        let token = jwt.sign(
          { username: username, email: email },
          "ahihi18071995"
        )

        //tao cart
        let new_cart = {
          user_id:result._id,
          cart:[]
        }

        await cartModel.create(new_cart)

        res.send({ status:true , user: result,token:token, message:"User resgister sucessfully"})
      } else {
        res.send({ status: false,token:"", message:"Confirm password wrong"})
      }
    }
  }

  checkChangePassword = async ( id, currentPass, newPass, confirmPass ) => {
    if (!id) {
      return { 
        status: false, 
        message: "Must include id user" 
      }
    } else {
      let user = await model.get(id)
      if (user && user != null){
        let checkPassword = await bcrypt.compareSync(currentPass, user.password);
        if (checkPassword){
          if(newPass == confirmPass) {
            return { 
              status: true, 
              message: "Check password successfully" 
            }
          } else {
            return { 
              status: false, 
              message: "Confirm password is wrong" 
            }
          }
        } else {
          return { 
            status: false, 
            message: "Password is wrong" 
          }
        }
      } else {
        return { 
          status: false, 
          message: "User does not exist" 
        }
      }
    }
  }

  addBillingAddress = async (req,res) =>{
    let { id, address} = req.body
    let user = await model.get(id)
    user.billing_address.push(address)
    let result = await model.update(id, { billing_address: user.billing_address})
    res.send(result)
  }

  addShippingAddress = async (req,res) =>{
    let { id, address} = req.body
    let user = await model.get(id)
    user.shipping_address.push(address)
    let result = await model.update(id, { shipping_address: user.billing_address})
    res.send(result)
  }

  login = async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
      res.send({ existed: false, token: "", message: "Username and Password are required" });
    } else {
      let user = await model.findByUsername(username);
      if (user && user != null) {
        let checkPassword = await bcrypt.compareSync(password, user.password);
        if (checkPassword) {
          //generate jwt token
          let token = jwt.sign(
            { username: username, email: user.email },
            "ahihi18071995"
          );
          res.send({ existed: true, token: token, user: user, message: "Found" });
        } else {
          res.send({ existed: false, token: "", message: "Password is wrong" });
        }
      } else {
        res.send({ existed: false, token: "", message: "User does not exist" });
      }
    }
  }

  hashPassword = (plainPass) => {
    let hash = bcrypt.hashSync(plainPass, saltRounds);
    return hash
  };
}

module.exports = new UserController();
