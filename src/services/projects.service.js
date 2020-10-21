import {responseHandler} from "../helpers";

const apiURL = process.env.REACT_APP_APIURL;

export const projectsService = {
  fetchProjects,
  getProject,
  registerProject,
};

function fetchProjects() {
  const requestOptions = {
    method: 'GET',
    // TODO 新バージョンのUI backendではコメントアウトを外す
    // headers: authTokenHeader(),
  };
  return fetch(`${apiURL}project/fetch`, requestOptions)
    .then(data => {
      console.log(data);
      return data;
    })
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function getProject(projectSymbol) {
  if (!projectSymbol) {
    return null;
  }

  return fetch(`${apiURL}project/get/${projectSymbol}`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function registerProject(projectName, projectSymbol, targetProjectSymbol) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // TODO 新バージョンのUI backendではコメントアウトを外す
      // ...authTokenHeader()
    },
    body: JSON.stringify(
      {
        name: projectName,
        symbol: projectSymbol,
        target: targetProjectSymbol,
      }
    )
  };

  return fetch(`${apiURL}project/create`, requestOptions)
    .then(responseHandler)
    .then(data => {
      return data;
    });
}