import {authConstants} from '../constants';
import {userService} from '../services/user.service';
import {push} from 'react-router-redux';

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginRequest({email}));

    userService.login(email, password)
      .then(
        data => {
          dispatch(loginSuccess(data));
          dispatch(push('/Projects'));
        },
        error => {
          dispatch(loginFailure(error));
        }
      );
  };

}

export const logoutAndRedirect = () => {
  return dispatch => {
    userService.logout();
    dispatch(logout());
    dispatch(push('/'));
  }
}

const logout = () => ({
  type: authConstants.LOGOUT
});


const loginRequest = data => ({
  type: authConstants.LOGIN_REQUEST,
});


const loginSuccess = data => ({
  type: authConstants.LOGIN_SUCCESS,
  payload: data
});
const loginFailure = error => ({
  type: authConstants.LOGIN_FAILURE,
  payload: error
});
