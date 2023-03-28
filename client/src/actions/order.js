import OrderService from "../services/order.service";
import { ORDER_FAIL, ORDER_SUCCESS, SET_MESSAGE } from "./types";
// export const findCartByUserId = (user_id) => (dispatch) => {
//   return CartService.findCartInfoByUserId(user_id).then((data) => {
//     if (data.status) {
//       dispatch({
//         type: FIND_CART_SUCCESS,
//         payload: { cart: data.user_cart },
//       });
//       return Promise.resolve();
//     } else {
//       const message = data.message;
//       dispatch({
//         type: FIND_CART_FAIL,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//     }
//   });
// };

export const createOrder = (data) => (dispatch) => {
return OrderService.createOrder(data).then((res) => {
  if (res.status) {
    dispatch({
      type: ORDER_SUCCESS,
      payload: { received_order: res.received_order },
    });
    Promise.resolve();
    return {status: res.status, received_order: res.received_order}
  } else {
    const message = res.message;
    dispatch({
      type: ORDER_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    Promise.reject();
    return {status: res.status}
  }
});
};