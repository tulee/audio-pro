import { UPDATE_CART_FAIL, UPDATE_CART_SUCCESS, FIND_CART_FAIL, FIND_CART_SUCCESS, DELETE_ITEM_CART_SUCCESS, DELETE_ITEM_CART_FAIL } from "../actions/types";

export default function (state = { cart: null }, action) {
  const { type, payload } = action;
  switch (type) {
    case FIND_CART_SUCCESS:
      return {
        ...state,
        cart: payload.cart
      };
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        cart: payload.cart
      };
    case DELETE_ITEM_CART_SUCCESS:
      return {
        ...state,
        cart: payload.cart
      };
    case FIND_CART_FAIL:
      return {
        ...state,
        cart: null,
      };
    case UPDATE_CART_FAIL:
      return {
        ...state      
      };
    case DELETE_ITEM_CART_FAIL:
      return {
        ...state      
      };
    default:
      return state;
  }
}
