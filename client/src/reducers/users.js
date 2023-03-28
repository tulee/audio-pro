import { LOGIN_FAIL, LOGIN_SUCCESS, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS } from "../actions/types";

export default function (state = { isLoggedIn:JSON.parse(sessionStorage.getItem("isLoggedIn")), user: JSON.parse(sessionStorage.getItem("user")), myOrders: [] }, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        myOrders: payload.myOrders
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        myOrders: []
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        myOrders: []
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: payload.user      
      };
    case UPDATE_USER_FAIL:
      return {
        ...state    
      };
    case LOGOUT:
      return {
        ...state  ,
        isLoggedIn:false,
        user:{}  
      };
    default:
      return state;
  }
}
