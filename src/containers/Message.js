import {connect} from 'react-redux';
import ModalMessage from '../views/ModalMessage.js';
import {messageConstants} from "../constants";

const mapStateToProps = (state, _) => ({
  ...state.message,
});

const mapDispatchToProps = dispatch => ({
  unsetMessage() {
    dispatch({type: messageConstants.UNSET_MESSAGE});
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalMessage);
