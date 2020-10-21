import {microservicesConstants} from '../constants';
import {microservicesService} from "../services/microservices.service";

export const fetchMicroservices = (projectID) => {
  return dispatch => {
    dispatch(fetchMicroservicesRequest(projectID));

    microservicesService.fetchMicroservices(projectID)
      .then(
        data => {
          dispatch(fetchMicroservicesSuccess(data));
        },
        error => {
          dispatch(fetchMicroservicesFailure(error));
        }
      );
  }
};


const fetchMicroservicesRequest = () => ({
  type: microservicesConstants.FETCH_MICROSERVICES_REQUEST,
});
const fetchMicroservicesSuccess = data => ({
  type: microservicesConstants.FETCH_MICROSERVICES_SUCCESS,
  payload: data,
});
const fetchMicroservicesFailure = error => ({
  type: microservicesConstants.FETCH_MICROSERVICES_FAILURE,
  error: error,
});

export const fetchDevices = () => {
  return dispatch => {
    dispatch(fetchDevicesRequest());

    microservicesService.fetchDevices()
      .then(
        data => {
          dispatch(fetchDevicesSuccess(data));
        },
        error => {
          dispatch(fetchDevicesFailure(error));
        }
      );
  }
};


const fetchDevicesRequest = data => ({
  type: microservicesConstants.FETCH_DEVICES_REQUEST,
  payload: data,
});
const fetchDevicesSuccess = data => ({
  type: microservicesConstants.FETCH_DEVICES_SUCCESS,
  payload: data,
});
const fetchDevicesFailure = error => ({
  type: microservicesConstants.FETCH_DEVICES_FAILURE,
  error: error,
});

export const addMicroservice = (projectSymbol, microserviceName) => {
  return dispatch => {
    dispatch(addMicroserviceRequest(projectSymbol, microserviceName));

    microservicesService.addMicroservice(projectSymbol, microserviceName)
      .then(
        data => {
          dispatch(addMicroserviceSuccess(data));
        },
        error => {
          dispatch(addMicroserviceFailure(error));
        }
      );
  }
};


const addMicroserviceRequest = data => ({
  type: microservicesConstants.ADD_MICROSERVICE_REQUEST,
  payload: data,
});
const addMicroserviceSuccess = data => ({
  type: microservicesConstants.ADD_MICROSERVICE_SUCCESS,
  payload: data,
});
const addMicroserviceFailure = error => ({
  type: microservicesConstants.ADD_MICROSERVICE_FAILURE,
  error: error,
});

export const removeMicroservice = (projectSymbol, microserviceName) => {
  return dispatch => {
    dispatch(removeMicroserviceRequest(projectSymbol, microserviceName));

    microservicesService.removeMicroservice(projectSymbol, microserviceName)
      .then(
        data => {
          dispatch(removeMicroserviceSuccess(data));
        },
        error => {
          dispatch(removeMicroserviceFailure(error));
        }
      );
  }
};


const removeMicroserviceRequest = data => ({
  type: microservicesConstants.REMOVE_MICROSERVICE_REQUEST,
  payload: data,
});
const removeMicroserviceSuccess = data => ({
  type: microservicesConstants.REMOVE_MICROSERVICE_SUCCESS,
  payload: data,
});
const removeMicroserviceFailure = error => ({
  type: microservicesConstants.REMOVE_MICROSERVICE_FAILURE,
  error: error,
});

export const fetchNotDeployedMicroservices = (projectID) => {
  return dispatch => {
    dispatch(fetchNotDeployedMicroservicesRequest(projectID));

    microservicesService.fetchNotDeployedMicroservices(projectID)
      .then(
        data => {
          dispatch(fetchNotDeployedMicroservicesSuccess(data));
        },
        error => {
          dispatch(fetchNotDeployedMicroservicesFailure(error));
        }
      );
  }
};


const fetchNotDeployedMicroservicesRequest = data => ({
  type: microservicesConstants.FETCH_NOT_DEPLOYED_MICROSERVICES_REQUEST,
  payload: data,
});
const fetchNotDeployedMicroservicesSuccess = data => ({
  type: microservicesConstants.FETCH_NOT_DEPLOYED_MICROSERVICES_SUCCESS,
  payload: data,
});
const fetchNotDeployedMicroservicesFailure = error => ({
  type: microservicesConstants.FETCH_NOT_DEPLOYED_MICROSERVICES_FAILURE,
  error: error,
});