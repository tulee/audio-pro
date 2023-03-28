import { FIND_PRODUCT_FAIL, FIND_PRODUCT_SUCCESS } from "../actions/types";

export default function (state = { product: null }, action) {
  const { type, payload } = action;
  switch (type) {
    case FIND_PRODUCT_SUCCESS:
      return {
        ...state,
        product: payload.product
      };
    case FIND_PRODUCT_FAIL:
      return {
        ...state,
        product: null,
      };
    default:
      return state;
  }
}
