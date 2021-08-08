import { loginService } from '../services';

export const login = params => dispatch =>
  loginService(params)
    .then(res =>
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: params
      })
    )
    .catch(err =>
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data
      })
    );
