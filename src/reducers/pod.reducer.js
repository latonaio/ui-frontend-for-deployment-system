import {podConstants} from '../constants';

const initialState = {
  pods: [],
  isInProgress: false,
  error: null,
};

export function pod(state = initialState, action) {
  if (action.type === podConstants.FETCH_POD_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === podConstants.FETCH_POD_SUCCESS) {
    return {
      ...state,
      pods: action.payload,
    };
  } else if (action.type === podConstants.FETCH_POD_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === podConstants.SET_DEPLOYING) {
    return {
      ...state,
      isInProgress: true,
    }
  } else if (action.type === podConstants.UNSET_DEPLOYING) {
    return {
      ...state,
      isInProgress: false,
    }
  } else if (action.type === podConstants.SET_DELETING) {
    return {
      ...state,
      isInProgress: true,
    }
  } else if (action.type === podConstants.UNSET_DELETING) {
    return {
      ...state,
      isInProgress: false,
    }
  } else if (action.type === podConstants.FETCH_POD_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else {
    return state;
  }
}
