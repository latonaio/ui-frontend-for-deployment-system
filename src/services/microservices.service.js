import {responseHandler} from "../helpers";

const apiURL = process.env.REACT_APP_APIURL;

export const microservicesService = {
  fetchMicroservices,
  fetchDevices,
  fetchNotDeployedMicroservices,
  addMicroservice,
  removeMicroservice,
};

function fetchMicroservices(projectID) {
  return fetch(`${apiURL}microservices/fetch/microservices/${projectID}`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function fetchDevices() {
  return fetch(`${apiURL}device/fetch/`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function fetchNotDeployedMicroservices(projectID) {
  return fetch(`${apiURL}microservices/fetch/not-deployed-microservices/${projectID}`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function addMicroservice(projectSymbol, microserviceName) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        projectSymbol,
        microserviceName,
      }
    )
  };

  return fetch(`${apiURL}microservices/add`, requestOptions)
    .then(responseHandler)
    .then(data => {
      return data;
    });
}

function removeMicroservice(projectSymbol, microserviceName) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        projectSymbol,
        microserviceName,
      }
    )
  };

  return fetch(`${apiURL}microservices/remove`, requestOptions)
    .then(responseHandler)
    .then(data => {
      return data;
    });
}