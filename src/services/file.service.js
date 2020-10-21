import axios from 'axios';

const apiURL = process.env.REACT_APP_APIURL;

export const fileService = {
  uploadDockerFile,
};

function uploadDockerFile(file: File, current: string) {
  const formData = new FormData();
  formData.append("dockerfile", file);
  formData.append("current", current);
  return axios.post(
    `${apiURL}file/upload/dockerfile`,
    formData,
    {})
    .then(data => {
      return data.data;
    });
}