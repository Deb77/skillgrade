const initialState = {
  user_id: localStorage.getItem('admin_user_id'),
  auth: localStorage.getItem('admin_user_id') ? true : false,
  errors: null
};
const authReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user_id: payload,
        auth: true,
        errors: null
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        errors: payload.message
      };
    case 'LOGOUT':
      return {
        user_id: null,
        auth: false,
        errors: null
      };
    default:
      return state;
  }
};
export default authReducer;
