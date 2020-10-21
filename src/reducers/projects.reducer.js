import {projectsConstants} from '../constants';

const initialState = {
  rows: [],
  error: null,
  project: {},
};

export function projects(state = initialState, action) {
  if (action.type === projectsConstants.FETCH_PROJECTS_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === projectsConstants.FETCH_PROJECTS_SUCCESS) {
    return {
      ...state,
      rows: action.payload,
    };
  } else if (action.type === projectsConstants.FETCH_PROJECTS_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === projectsConstants.REGISTER_PROJECT_REQUEST) {
    return {
      ...state,
      rows: [...state.rows].map(r => ({...r, isEditing: false})),
    };
  } else if (action.type === projectsConstants.REGISTER_PROJECT_SUCCESS) {
    return {
      ...state,
      rows: action.payload,
    };
  } else if (action.type === projectsConstants.REGISTER_PROJECT_FAILURE) {
    return {
      ...state,
      error: action.error,
      rows: [...state.rows].filter(r => r.projectSymbol !== undefined),
    };
  } else if (action.type === projectsConstants.GET_PROJECT_REQUEST) {
    return {
      ...state,
    }
  } else if (action.type === projectsConstants.GET_PROJECT_SUCCESS) {
    return {
      ...state,
      project: action.payload,
    }
  } else if (action.type === projectsConstants.GET_PROJECT_FAILURE) {
    return {
      ...state,
      error: action.error,
    }
  } else if (action.type === projectsConstants.PUSH_NEW_PROJECT_ROW) {
    const rows = [...state.rows]
      .filter(r => r.projectSymbol !== undefined)
      .map(r => ({...r, isEditing: false}));

    return {
      ...state,
      rows: [
        ...rows,
        {isEditing: true}
      ],
    }
  } else if (action.type === projectsConstants.SET_EDIT_MODE) {
    const rows = [...state.rows]
      .filter(r => r.projectSymbol !== undefined)
      .map(r => ({...r, isEditing: false}));

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].projectSymbol === action.projectSymbol) {
        rows[i].isEditing = true
      }
    }

    return {
      ...state,
      rows,
    }
  } else if (action.type === projectsConstants.UNSET_EDIT_MODE) {
    const rows = [...state.rows]
      .filter(r => r.projectSymbol !== undefined)
      .map(r => ({...r, isEditing: false}));

    return {
      ...state,
      rows,
    }
  } else {
    return state;
  }
}
