import { ORDER_FAIL, ORDER_SUCCESS } from "../actions/types";

export default function (state = { received_order: null }, action) {
  const { type, payload } = action;
  switch (type) {
    case ORDER_SUCCESS:
      return {
        ...state,
        received_order: payload.received_order
      };
    case ORDER_FAIL:
      return {
        ...state      
      };
    default:
      return state;
  }
}
