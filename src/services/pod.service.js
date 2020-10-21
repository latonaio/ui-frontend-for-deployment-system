import {responseHandler} from "../helpers";

const apiURL = process.env.REACT_APP_APIURL;

export const podService = {
  fetchPod,
};

function fetchPod(projectSymbol, deviceName) {
  const requestOptions = {
    method: 'GET',
    // TODO 新バージョンのUI backendではコメントアウトを外す
    // headers: authTokenHeader(),
  };
  return fetch(`${apiURL}pod/fetch/${projectSymbol}/${deviceName}`, requestOptions)
    .then(responseHandler)
    .catch(error => {
      throw error;
    });
}