import {responseHandler} from "../helpers";

const apiURL = process.env.REACT_APP_APIURL;

export const devicesService = {
  getDevice,
};

function getDevice(deviceName) {
  if (!deviceName) {
    return null;
  }

  return fetch(`${apiURL}device/get/${deviceName}`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}