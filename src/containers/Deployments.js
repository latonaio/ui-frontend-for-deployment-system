import {connect} from 'react-redux';
import Deployments from '../views/Deployments';
import {deploymentConstants} from "../constants";
import {
  deploy,
  getContainer,
  getDevice,
  getLatestDeployment,
  getMicroservice,
  uploadDockerFile,
} from "../actions/deployment.actions";

const mapStateToProps = (state, _) => ({
  device: state.deployment.device,
  microservice: state.deployment.microservice,
  deployment: state.deployment.deployment,
  container: state.deployment.container,
  localDockerFileText: state.deployment.localDockerFileText,
  uploadedDockerFileName: state.deployment.uploadedDockerFileName,
  diffText: state.deployment.diffText,
});

const mapDispatchToProps = dispatch => ({
  getDevice(deviceID) {
    dispatch(getDevice(deviceID));
  },
  getMicroservice(microserviceID) {
    dispatch(getMicroservice(microserviceID));
  },
  getLatestDeployment(microserviceID, deviceID) {
    dispatch(getLatestDeployment(microserviceID, deviceID))
  },
  getContainer(microserviceID, deviceID) {
    dispatch(getContainer(microserviceID, deviceID))
  },
  uploadDockerFile(file, current) {
    dispatch(uploadDockerFile(file, current));
  },
  deploy(microserviceID, deviceID, dockerFile, projectID) {
    dispatch(deploy(microserviceID, deviceID, dockerFile, projectID));
  },
  clearState() {
    dispatch({type: deploymentConstants.CLEAR})
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Deployments);
