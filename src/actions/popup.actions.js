import {popupConstants} from "../constants";

export const getOKMessage = (message) => {
  return dispatch => {
    dispatch(doGetOKMessage(message));
  }
};

export const clear = () => {
  return dispatch => {
    dispatch(doClear());
  }
};

const doGetOKMessage = (data) => ({
  type: popupConstants.GET_OK_MESSAGES,
  payload: data
});
const doClear = data => ({
  type: popupConstants.CLEAR,
});