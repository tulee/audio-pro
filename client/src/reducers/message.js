import { SET_MESSAGE } from "../actions/types";

export default function (state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE:
      return { message: payload };
    default:
      return state;
  }
}
