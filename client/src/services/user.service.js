import BaseService from "./base.service";
import axios from "axios";
class UserService extends BaseService {
  constructor() {
    super({ endpoint: "user" });
  }
  async updateUserInfo(data) {

    let token = sessionStorage.getItem("token");

    var result = await axios({
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `${this.api}/${this.endpoint}/details`,
        data: data,
      });
    console.log("in update service");
    console.log(result.data);
    return result.data;
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

  async registerUser(data) {

    var res = await axios({
        method: "POST",
        url: `${this.api}/${this.endpoint}/register`,
        data: data,
      });

    console.log(res);

    if (res.data.status) {
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
    } else {
      sessionStorage.setItem("isLoggedIn", false);
    }

    return res.data;
  }

}

export default new UserService();
