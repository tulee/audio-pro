import BaseService from "./base.service";
import axios from "axios";
class AuthenticateService extends BaseService {
  constructor() {
    super({ endpoint: "user" });
  }
  login(user) {
    let http = axios.create({
      baseURL: `${this.api}`,
    });
    return http.post(`/${this.endpoint}/login`, user).then((res) => {
      if (res.data.token) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
      } else {
        sessionStorage.setItem("isLoggedIn", false);
        sessionStorage.setItem("user",JSON.stringify({}));
      }
      return res.data;
    });
  }
}

export default new AuthenticateService();
