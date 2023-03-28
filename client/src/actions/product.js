import ProductService from "../services/product.service";
import { FIND_PRODUCT_SUCCESS, FIND_PRODUCT_FAIL, SET_MESSAGE } from "./types";
export const findProductBySlug = (slug) => (dispatch) => {
  return ProductService.findProductBySlug(slug).then((data) => {
    if (data.existed) {

      dispatch({
        type: FIND_PRODUCT_SUCCESS,
        payload: { product: data.product },
      });
      return Promise.resolve();
    } else {
      const message = data.message;
      dispatch({
        type: FIND_PRODUCT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  });
};
