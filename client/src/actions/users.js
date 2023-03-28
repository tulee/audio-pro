import { LOGIN_SUCCESS, LOGIN_FAIL, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, SET_MESSAGE, SET_STATUS, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import AuthenticateService from "../services/authenticate.service";
import UserService from "../services/user.service";
export const login = (user) => (dispatch) => {
  return AuthenticateService.login(user).then((data) => {
    if (data.existed) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.user, myOrders: data.myOrders },
      });
      return Promise.resolve();
    } else {
      const message = data.message;
      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  });
};

export const registerUser = (user) => (dispatch) => {
  return UserService.registerUser(user).then((data) => {
    if (data.status) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { user: data.user },
      });
      return Promise.resolve();
    } else {
      const message = data.message;
      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  });
};

export const logout = () => (dispatch) =>{
  sessionStorage.removeItem("isLoggedIn")
  sessionStorage.removeItem("user")
  sessionStorage.removeItem("token")

  console.log("dang o ham logout");
  
  dispatch({
    type: LOGOUT,
  })

  return Promise.resolve();
}

export const updateUserInfo = (data) => (dispatch) => {
  return UserService.updateUserInfo(data).then((result)=>{
    if(result.status){
      console.log("user actions");
      console.log(result);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user:result.user },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: result.message,
      });

      dispatch({
        type: SET_STATUS,
        payload: result.status,
      });

      console.log("user actions");
      console.log(result);
      sessionStorage.setItem("user", JSON.stringify(result.user));  
      return Promise.resolve();

    } else {
      const message = result.message;

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      dispatch({
        type: SET_STATUS,
        payload: result.status,
      });

      return Promise.reject();
    }
  })
}
