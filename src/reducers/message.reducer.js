import {messageConstants} from '../constants';

const initialState = {
  message: null,
};

export function message(state = initialState, action) {
  if (action.type === messageConstants.SET_MESSAGE) {
    return {
      ...state,
      message: action.payload,
    }
  } else if (action.type === messageConstants.UNSET_MESSAGE) {
    return {
      ...state,
      message: null,
    }
  } else {
    return state;
  }
}
