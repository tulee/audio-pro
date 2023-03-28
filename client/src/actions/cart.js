import CartService from "../services/cart.service";
import { UPDATE_CART_FAIL, UPDATE_CART_SUCCESS, FIND_CART_FAIL, FIND_CART_SUCCESS, SET_MESSAGE, DELETE_ITEM_CART_FAIL, DELETE_ITEM_CART_SUCCESS } from "./types";
export const findCartByUserId = (user_id) => (dispatch) => {
  return CartService.findCartInfoByUserId(user_id).then((data) => {
    if (data.status) {
      dispatch({
        type: FIND_CART_SUCCESS,
        payload: { cart: data.user_cart },
      });
      return Promise.resolve();
    } else {
      const message = data.message;
      dispatch({
        type: FIND_CART_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  });
};

export const updateCart = (data) => (dispatch) => {
return CartService.updateCart(data).then((res) => {
  console.log(data);
  console.log(res.user_cart);
  if (res.status) {
    dispatch({
      type: UPDATE_CART_SUCCESS,
      payload: { cart: res.user_cart },
    });
    return Promise.resolve();
  } else {
    const message = res.message;
    dispatch({
      type: UPDATE_CART_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  }
});
};

export const deleteItemCart = (data) => (dispatch) => {
  return CartService.deleteItemCart(data).then((res) => {
    if (res.status) {
      dispatch({
        type: DELETE_ITEM_CART_SUCCESS,
        payload: { cart: res.user_cart },
      });
      return Promise.resolve();
    } else {
      const message = res.message;
      dispatch({
        type: DELETE_ITEM_CART_FAIL,
      });
  
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
  
      return Promise.reject();
    }
  });
  };