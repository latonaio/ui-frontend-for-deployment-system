import {titleConstants} from '../constants';

const initialState = {
  project: null,
  device: null,
  error: null,
};

export function title(state = initialState, action) {
  if (action.type === titleConstants.GET_TITLE_REQUEST) {
    return {
      ...state,
      title: "",
    };
  } else if (action.type === titleConstants.GET_TITLE_SUCCESS) {
    const project = action.payload.project;
    const device = action.payload.device;

    return {
      ...state,
      project,
      device,
    };
  } else if (action.type === titleConstants.GET_TITLE_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else {
    return state;
  }
}
