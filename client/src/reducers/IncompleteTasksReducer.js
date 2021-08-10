const initialState = {
  carddata: []
};
const IncompleteTasksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_INCOMPLETE_TASKS':
      return {
        ...state,
        carddata: payload
      };

    default:
      return state;
  }
};

export default IncompleteTasksReducer;
