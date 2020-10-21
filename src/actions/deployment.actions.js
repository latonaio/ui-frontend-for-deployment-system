import {deploymentConstants, messageConstants, podConstants} from "../constants";
import {devicesService} from "../services/devices.service";
import {deploymentService} from "../services/deployment.service";
import {fileService} from "../services/file.service";

export const getDevice = (deviceName) => {
  return dispatch => {
    dispatch(getDeviceRequest());

    devicesService.getDevice(deviceName)
      .then(
        data => {
          dispatch(getDeviceSuccess(data));
        },
        error => {
          dispatch(getDeviceFailure(error));
        }
      );
  }
};

const getDeviceRequest = () => ({
  type: deploymentConstants.GET_DEVICE_REQUEST,
});
const getDeviceSuccess = data => ({
  type: deploymentConstants.GET_DEVICE_SUCCESS,
  payload: data,
});
const getDeviceFailure = error => ({
  type: deploymentConstants.GET_DEVICE_FAILURE,
  error: error,
});

export const getMicroservice = (microserviceID) => {
  return dispatch => {
    dispatch(getMicroserviceRequest());

    deploymentService.getMicroservice(microserviceID)
      .then(
        data => dispatch(getMicroserviceSuccess(data)),
        error => dispatch(getMicroserviceFailure(error))
      );
  }
};

const getMicroserviceRequest = () => ({
  type: deploymentConstants.GET_MICROSERVICE_REQUEST,
});
const getMicroserviceSuccess = data => ({
  type: deploymentConstants.GET_MICROSERVICE_SUCCESS,
  payload: data,
});
const getMicroserviceFailure = error => ({
  type: deploymentConstants.GET_MICROSERVICE_FAILURE,
  error: error,
});

export const getLatestDeployment = (microserviceID, deviceID) => {
  return dispatch => {
    dispatch(getLatestDeploymentRequest());

    deploymentService.getLatestDeployment(microserviceID, deviceID)
      .then(
        data => dispatch(getLatestDeploymentSuccess(data)),
        error => dispatch(getLatestDeploymentFailure(error))
      );
  }
};

const getLatestDeploymentRequest = () => ({
  type: deploymentConstants.GET_LATEST_DEPLOYMENT_REQUEST,
});
const getLatestDeploymentSuccess = data => ({
  type: deploymentConstants.GET_LATEST_DEPLOYMENT_SUCCESS,
  payload: data,
});
const getLatestDeploymentFailure = error => ({
  type: deploymentConstants.GET_LATEST_DEPLOYMENT_FAILURE,
  error: error,
});

export const getContainer = (microserviceID, deviceID) => {
  return dispatch => {
    dispatch(getContainerRequest());

    deploymentService.getContainer(microserviceID, deviceID)
      .then(
        data => dispatch(getContainerSuccess(data)),
        error => dispatch(getContainerFailure(error))
      );
  }
};

const getContainerRequest = () => ({
  type: deploymentConstants.GET_CONTAINER_REQUEST,
});
const getContainerSuccess = data => ({
  type: deploymentConstants.GET_CONTAINER_SUCCESS,
  payload: data,
});
const getContainerFailure = error => ({
  type: deploymentConstants.GET_CONTAINER_FAILURE,
  error: error,
});

export const uploadDockerFile = (file, current) => {
  return dispatch => {
    dispatch(uploadDockerFileRequest());

    fileService.uploadDockerFile(file, current)
      .then(
        data => dispatch(uploadDockerFileSuccess(data)),
        error => dispatch(uploadDockerFileFailure(error))
      );
  }
};

const uploadDockerFileRequest = () => ({
  type: deploymentConstants.UPLOAD_DOCKERFILE_REQUEST,
});
const uploadDockerFileSuccess = data => ({
  type: deploymentConstants.UPLOAD_DOCKERFILE_SUCCESS,
  payload: data,
});
const uploadDockerFileFailure = error => ({
  type: deploymentConstants.UPLOAD_DOCKERFILE_FAILURE,
  error: error,
});


export const deploy = (microserviceID, deviceID, dockerFile, projectID) => {
  return dispatch => {
    dispatch(deployRequest());

    deploymentService.deploy(microserviceID, deviceID, dockerFile, projectID)
      .then(
        data => dispatch(deploySuccess(data)),
        error => dispatch(deployFailure(error))
      );
  }
};

const deployRequest = () => ({
  type: deploymentConstants.DEPLOY_REQUEST,
});
const deploySuccess = data => ({
  type: deploymentConstants.DEPLOY_SUCCESS,
  payload: data,
});
const deployFailure = error => ({
  type: deploymentConstants.DEPLOY_FAILURE,
  error: error,
});

export const deployToKubernetes = (deviceName, projectSymbol, microserviceName) => {
  return dispatch => {
    dispatch(deployToKubernetesRequest());
    dispatch(setDeploying());

    deploymentService.deployToKubernetes(deviceName, projectSymbol, microserviceName)
      .then(
        // Podの定期取得時にunsetDeletingを呼ぶのでフラグは戻さない
        data => dispatch(deployToKubernetesSuccess(data)),
        error => {
          dispatch(deployToKubernetesFailure(error));
          dispatch(unsetDeploying());
          dispatch(setMessage('デプロイに失敗しました'));
        }
      )
  }
};

const deployToKubernetesRequest = () => ({
  type: deploymentConstants.DEPLOY_TO_KUBERNETES_REQUEST,
});
const deployToKubernetesSuccess = data => ({
  type: deploymentConstants.DEPLOY_TO_KUBERNETES_SUCCESS,
  payload: data,
});
const deployToKubernetesFailure = error => ({
  type: deploymentConstants.DEPLOY_TO_KUBERNETES_FAILURE,
  error: error,
});
const setDeploying = () => ({
  type: podConstants.SET_DEPLOYING,
});
const unsetDeploying = () => ({
  type: podConstants.UNSET_DEPLOYING,
});

export const deleteFromKubernetes = (deviceName, projectSymbol, microserviceName) => {
  return dispatch => {
    dispatch(deleteFromKubernetesRequest());
    dispatch(setDeleting());

    deploymentService.deleteFromKubernetes(deviceName, projectSymbol, microserviceName)
      .then(
        // Podの定期取得時にunsetDeletingを呼ぶのでフラグは戻さない
        data => dispatch(deleteFromKubernetesSuccess(data)),
        error => {
          dispatch(deleteFromKubernetesFailure(error));
          dispatch(unsetDeleting());
          dispatch(setMessage('削除に失敗しました'));
        }
      )
  }
};

const deleteFromKubernetesRequest = () => ({
  type: deploymentConstants.DELETE_FROM_KUBERNETES_REQUEST,
});
const deleteFromKubernetesSuccess = data => ({
  type: deploymentConstants.DELETE_FROM_KUBERNETES_SUCCESS,
  payload: data,
});
const deleteFromKubernetesFailure = error => ({
  type: deploymentConstants.DELETE_FROM_KUBERNETES_FAILURE,
  error: error,
});
const setDeleting = () => ({
  type: podConstants.SET_DELETING,
});
const unsetDeleting = () => ({
  type: podConstants.UNSET_DELETING,
});

const setMessage = message => ({
  type: messageConstants.SET_MESSAGE,
  payload: message,
});

