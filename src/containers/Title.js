import {connect} from 'react-redux';
import Title from '../components/Title';
import {getTitle} from '../actions/title.actions'

const mapStateToProps = (state, _) => ({
  ...state.title,
  error: state.projects.error
});

const mapDispatchToProps = dispatch => ({
  getTitle(projectSymbol, deviceName) {
    dispatch(getTitle(projectSymbol, deviceName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Title);
