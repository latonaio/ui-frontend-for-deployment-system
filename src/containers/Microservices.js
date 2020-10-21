import {connect} from 'react-redux';
import Microservices from '../views/Microservices';
import {
  addMicroservice,
  fetchDevices,
  fetchMicroservices,
  fetchNotDeployedMicroservices,
  removeMicroservice,
} from '../actions/microservices.actions'

const mapStateToProps = (state, _) => ({
  microservices: state.microservices.microservices,
  devices: state.microservices.devices,
  notDeployedMicroservices: state.microservices.notDeployedMicroservices,
  error: state.microservices.error
});

const mapDispatchToProps = dispatch => ({
  fetchMicroservices(projectID) {
    dispatch(fetchMicroservices(projectID));
  },
  fetchDevices() {
    dispatch(fetchDevices());
  },
  addMicroservice(projectSymbol, microserviceName) {
    dispatch(addMicroservice(projectSymbol, microserviceName))
  },
  removeMicroservice(projectSymbol, microserviceName) {
    dispatch(removeMicroservice(projectSymbol, microserviceName));
  },
  fetchNotDeployedMicroservices(projectID) {
    dispatch(fetchNotDeployedMicroservices(projectID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Microservices);
