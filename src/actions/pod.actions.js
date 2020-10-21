import {podConstants} from '../constants';
import {podService} from "../services/pod.service";

export const fetchPod = (projectSymbol, deviceName) => {
  return dispatch => {
    dispatch(fetchMicroservicesRequest());

    podService.fetchPod(projectSymbol, deviceName)
      .then(
        data => {
          dispatch(fetchMicroservicesSuccess(data));
          dispatch(unsetDeleting());
          dispatch(unsetDeploying());
        },
        error => {
          dispatch(fetchMicroservicesFailure(error));
        }
      );
  }
};


const fetchMicroservicesRequest = () => ({
  type: podConstants.FETCH_POD_REQUEST,
});
const fetchMicroservicesSuccess = data => ({
  type: podConstants.FETCH_POD_SUCCESS,
  payload: data,
});
const fetchMicroservicesFailure = error => ({
  type: podConstants.FETCH_POD_FAILURE,
  error: error,
});

const unsetDeleting = () => ({
  type: podConstants.UNSET_DELETING,
});
const unsetDeploying = () => ({
  type: podConstants.UNSET_DEPLOYING,
});
