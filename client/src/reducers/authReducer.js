const initialState = {
  name: localStorage.getItem('name'),
  loginErrors: {},
  imageUrl: null,
  token: null
};
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token);
      localStorage.setItem('name', payload.name);
      return {
        ...state,
        token: payload.token,
        name: payload.name,
        isAuthenticated: true,
        loginErrors: payload.errors,
        imageUrl: payload.imageUrl
      };
    default:
      return state;
  }
};
export default authReducer;
