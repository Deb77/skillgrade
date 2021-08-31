import { loginService } from '../services';

export const login = (params, history) => dispatch =>
  loginService(params)
    .then(res => {
      history.push('/dashboard');
      params.user_id = res.data.user_id;

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: params
      });
    })
    .catch(err =>
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data
      })
    );
