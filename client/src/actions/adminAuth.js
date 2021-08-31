import { AdminLogin } from '../services';

export const login = (params, history) => dispatch => {
  AdminLogin(params)
    .then(res => {
      if (params.remember) {
        localStorage.setItem('admin_user_id', res.data.user_id);
      }
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data.user_id
      });
      history.push('/admin/home');
    })
    .catch(err =>
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data
      })
    );
};

export const logout = history => dispatch => {
  localStorage.removeItem('admin_user_id');
  dispatch({
    type: 'LOGOUT'
  });
  history.push('/admin');
};
