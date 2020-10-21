import {titleConstants} from '../constants';
import {projectsService} from "../services/projects.service";
import {devicesService} from "../services/devices.service";

export const getTitle = (projectSymbol, deviceName) => {
  return dispatch => {
    dispatch(getTitleRequest());
    Promise.all(
      [
        projectsService.getProject(projectSymbol),
        devicesService.getDevice(deviceName),
      ]
    ).then(
      data => {
        dispatch(getTitleSuccess({
          project: data[0],
          device: data[1],
        }));
      }
    ).catch(
      error => {
        dispatch(getTitleFailure(error));
      }
    );
  }
};


const getTitleRequest = () => ({
  type: titleConstants.GET_TITLE_REQUEST,
});
const getTitleSuccess = data => ({
  type: titleConstants.GET_TITLE_SUCCESS,
  payload: data,
});
const getTitleFailure = error => ({
  type: titleConstants.GET_TITLE_FAILURE,
  error: error,
});