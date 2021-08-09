import { loginService } from '../services';

export const login = (params, history) => dispatch =>
  loginService(params)
    .then(res => {
      history.push('/dashboard');
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: params,
        history: history
      });
    })
    .catch(err =>
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data
      })
    );
