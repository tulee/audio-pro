import BaseService from "./base.service";
import axios from "axios";
class ProductService extends BaseService {
  constructor() {
    super({ endpoint: "product" });
  }
  async findProductBySlug(slug) {
    let http = await axios.create({
      baseURL: `${this.api}`,
    });
    return http.get(`/${this.endpoint}/${slug}`).then((res) => {
      return res.data;
    });
  }

  async find6BestSeller(slug) {
    let http = await axios.create({
      baseURL: `${this.api}`,
    });
    return http.get(`/${this.endpoint}/best-seller`).then((res) => {
      return res.data;
    });
  }

  async findByCate(cate,power) {
    let http = await axios.create({
      baseURL: `${this.api}`,
    });
    return http.get(`/${this.endpoint}/product-category/${cate}?power=${power?power.toString():''}`).then((res) => {
      return res.data;
    });
  }
}

export default new ProductService();
