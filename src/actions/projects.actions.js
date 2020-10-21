import {projectsConstants} from '../constants';
import {projectsService} from "../services/projects.service";

export const registerProject = (name, symbol, target) => {
  return dispatch => {
    dispatch(registerProjectRequest(name, symbol, target));

    projectsService.registerProject(name, symbol, target)
      .then(
        data => {
          dispatch(registerProjectSuccess(data));
        },
        error => {
          dispatch(registerProjectFailure(error));
        }
      );
  }
};


const registerProjectRequest = (name, symbol) => ({
  type: projectsConstants.REGISTER_PROJECT_REQUEST,
  name: name,
  symbol: symbol,
});
const registerProjectSuccess = data => ({
  type: projectsConstants.REGISTER_PROJECT_SUCCESS,
  payload: data,
});
const registerProjectFailure = error => ({
  type: projectsConstants.REGISTER_PROJECT_FAILURE,
  error: error,
});

export const fetchProjects = () => {
  return dispatch => {
    dispatch(getProjectsRequest());

    projectsService.fetchProjects()
      .then(
        data => {
          dispatch(getProjectsSuccess(data));
        },
        error => {
          dispatch(getProjectsFailure(error));
        }
      );
  }
};


const getProjectsRequest = () => ({
  type: projectsConstants.FETCH_PROJECTS_REQUEST,
});
const getProjectsSuccess = data => ({
  type: projectsConstants.FETCH_PROJECTS_SUCCESS,
  payload: data,
});
const getProjectsFailure = error => ({
  type: projectsConstants.FETCH_PROJECTS_FAILURE,
  error: error,
});

export const getProject = (projectSymbol) => {
  return dispatch => {
    dispatch(getProjectRequest());

    projectsService.getProject(projectSymbol)
      .then(
        data => {
          dispatch(getProjectSuccess(data));
        },
        error => {
          dispatch(getProjectFailure(error));
        }
      );
  }
};


const getProjectRequest = () => ({
  type: projectsConstants.GET_PROJECT_REQUEST,
});
const getProjectSuccess = data => ({
  type: projectsConstants.GET_PROJECT_SUCCESS,
  payload: data,
});
const getProjectFailure = error => ({
  type: projectsConstants.GET_PROJECT_FAILURE,
  error: error,
});