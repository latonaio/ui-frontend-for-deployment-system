import { userConstants } from '../constants';
import { userService } from '../services/user.service';

export const getMe = () => {
    return dispatch => {
        dispatch(getMeRequest());

        userService.getMe()
            .then(
                data => dispatch(getMeSuccess(data)),
                error => dispatch(getMeFailure(error))
            );
    };
}

const getMeRequest = () => ({
  type: userConstants.GET_ME_REQUEST
});
const getMeSuccess = (data) => ({
  type: userConstants.GET_ME_SUCCESS,
  payload: data
});
const getMeFailure = (error) => ({
  type: userConstants.GET_ME_FAILURE,
  error
});

export const clearMe = () => ({
  type: userConstants.CLEAR_ME
});
