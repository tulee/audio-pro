import { SET_STATUS } from "../actions/types";

export default function (state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_STATUS:
      return { status: payload };
    default:
      return state;
  }
}
