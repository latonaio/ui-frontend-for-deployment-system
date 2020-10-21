import {responseHandler} from "../helpers";

const apiURL = process.env.REACT_APP_APIURL;

export const deploymentService = {
  getMicroservice,
  getLatestDeployment,
  getContainer,
  deploy,
  deployToKubernetes,
  deleteFromKubernetes,
};

function getMicroservice(microserviceID) {
  if (!microserviceID) {
    return null;
  }

  return fetch(`${apiURL}deployment/get/microservice/${microserviceID}`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function getLatestDeployment(microserviceID, deviceID) {
  return fetch(`${apiURL}deployment/get/deployment/${microserviceID}/${deviceID}`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function getContainer(microserviceID, deviceID) {
  return fetch(`${apiURL}deployment/get/container/${microserviceID}/${deviceID}`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function deploy(microserviceID, deviceID, dockerFile, projectID) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        microserviceID: microserviceID,
        deviceID: deviceID,
        dockerFile: dockerFile,
        projectID: projectID,
      }
    )
  };

  return fetch(`${apiURL}deployment/deploy`, requestOptions)
    .then(responseHandler)
    .then(data => {
      return data;
    });
}

function deployToKubernetes(deviceName, projectSymbol, microserviceName) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        deviceName,
        projectSymbol,
        microserviceName,
      }
    )
  };

  return fetch(`${apiURL}deployment/deployToKubernetes`, requestOptions)
    .then(responseHandler)
    .then(data => {
      return data;
    });
}

function deleteFromKubernetes(deviceName, projectSymbol, microserviceName) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        deviceName,
        projectSymbol,
        microserviceName,
      }
    )
  };

  return fetch(`${apiURL}deployment/deleteFromKubernetes`, requestOptions)
    .then(responseHandler)
    .then(data => {
      return data;
    });
}