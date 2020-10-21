import {deploymentConstants} from '../constants';

const initialState = {
  device: null,
  microservice: null,
  deployment: null,
  container: null,
  isUploading: false,
  isDeploying: false,
  localDockerFileText: null,
  uploadedDockerFileName: null,
  diffText: "",
};

export function deployment(state = initialState, action) {
  if (action.type === deploymentConstants.GET_DEVICE_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === deploymentConstants.GET_DEVICE_SUCCESS) {
    return {
      ...state,
      device: action.payload,
    };
  } else if (action.type === deploymentConstants.GET_DEVICE_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === deploymentConstants.GET_MICROSERVICE_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === deploymentConstants.GET_MICROSERVICE_SUCCESS) {
    return {
      ...state,
      microservice: action.payload,
      localDockerFileText: action.payload.docker_file_text,
      diffText: action.payload.diff_text,
    };
  } else if (action.type === deploymentConstants.GET_MICROSERVICE_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === deploymentConstants.GET_LATEST_DEPLOYMENT_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === deploymentConstants.GET_LATEST_DEPLOYMENT_SUCCESS) {
    return {
      ...state,
      deployment: action.payload,
    };
  } else if (action.type === deploymentConstants.GET_LATEST_DEPLOYMENT_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === deploymentConstants.GET_CONTAINER_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === deploymentConstants.GET_CONTAINER_SUCCESS) {
    return {
      ...state,
      container: action.payload,
    };
  } else if (action.type === deploymentConstants.GET_CONTAINER_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === deploymentConstants.UPLOAD_DOCKERFILE_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === deploymentConstants.UPLOAD_DOCKERFILE_SUCCESS) {
    return {
      ...state,
      uploadedDockerFileName: action.payload.file_name,
      diffText: action.payload.diff_text,
    };
  } else if (action.type === deploymentConstants.UPLOAD_DOCKERFILE_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === deploymentConstants.DEPLOY_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === deploymentConstants.DEPLOY_SUCCESS) {
    return {
      ...state,
      uploadedDockerFileName: action.payload.docker_file_path,
      deployment: action.payload.deployment,
    };
  } else if (action.type === deploymentConstants.DEPLOY_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === deploymentConstants.DEPLOY_TO_KUBERNETES_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === deploymentConstants.DEPLOY_TO_KUBERNETES_SUCCESS) {
    return {
      ...state,
    };
  } else if (action.type === deploymentConstants.DEPLOY_TO_KUBERNETES_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === deploymentConstants.CLEAR) {
    return {
      ...initialState,
    }
  } else {
    return state;
  }
}
