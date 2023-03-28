import BaseService from "./base.service";
import axios from "axios";
class CartService extends BaseService {
  constructor() {
    super({ endpoint: "cart" });
  }
  async updateCart(data) {

    let token = sessionStorage.getItem("token");

    var result = await axios({
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `${this.api}/${this.endpoint}/mycart`,
        data: data,
      });
    return result.data;
  }

  async deleteItemCart(data) {

    let token = sessionStorage.getItem("token");

    var result = await axios({
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `${this.api}/${this.endpoint}/mycart`,
        data: data,
      });
    return result.data;
  }

  calCartValue(cart){
    let total = 0
    cart.map(e => {
      total = total + e.amount*(e.product_info.is_discount?e.product_info.discount_price:e.product_info.price)
    })
    return total
  }

  async findCartInfoByUserId(user_id) {
    let token = sessionStorage.getItem("token");
    let http = await axios.create({
      baseURL: `${this.api}`,
    });
    return http.get(`/${this.endpoint}/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((res) => {
      return res.data;
    });
  }

}

export default new CartService();
