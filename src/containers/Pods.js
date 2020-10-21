import {connect} from 'react-redux';
import Pods from '../views/Pods';
import {deleteFromKubernetes, deployToKubernetes, getDevice} from '../actions/deployment.actions'
import {getProject} from '../actions/projects.actions';
import {fetchPod} from '../actions/pod.actions';

const mapStateToProps = (state, _) => ({
  ...state.deployment,
  ...state.pod,
  project: state.projects.project,
});

const mapDispatchToProps = dispatch => ({
  getProject(projectSymbol) {
    dispatch(getProject(projectSymbol));
  },
  getDevice(deviceName) {
    dispatch(getDevice(deviceName));
  },
  deployToKubernetes(deviceName, projectSymbol, microserviceName) {
    dispatch(deployToKubernetes(deviceName, projectSymbol, microserviceName))
  },
  deleteFromKubernetes(deviceName, projectSymbol, microserviceName) {
    dispatch(deleteFromKubernetes(deviceName, projectSymbol, microserviceName))
  },
  fetchPod(projectSymbol, deviceName) {
    dispatch(fetchPod(projectSymbol, deviceName))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pods);
