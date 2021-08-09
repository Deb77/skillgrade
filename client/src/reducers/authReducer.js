const initialState = {
  name: null,
  email: null,
  imageUrl: null,
  token: null
};
const authReducer = (state = initialState, actions) => {
  const { type, payload, history } = actions;
  switch (type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token);
      localStorage.setItem('name', payload.name);
      localStorage.setItem('imageUrl', payload.imageUrl);

      return {
        ...state,
        token: payload.token,
        name: payload.name,
        imageUrl: payload.imageUrl,
        email: payload.email
      };

    default:
      return state;
  }
};
export default authReducer;
