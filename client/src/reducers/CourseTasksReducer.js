const initialState = {
  taskdata: []
};
const CourseTasksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_COURSE_TASKS':
      return {
        ...state,
        taskdata: payload
      };

    default:
      return state;
  }
};

export default CourseTasksReducer;
