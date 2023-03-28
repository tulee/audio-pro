import { combineReducers } from "redux";
import users from "./users";
import message from "./message";
import product from "./product";
import status from "./status";
import cart from "./cart";
import order from "./order";


export default combineReducers({
    users,
    message,
    product,
    status,
    cart,
    order
});
