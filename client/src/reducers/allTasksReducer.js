const initialState = {
  tasks: [],
  web_dev_tasks: [],
  sketching_tasks: [],
  UI_design_tasks: [],
  content_writing_tasks: [],
  review_tasks: []
};
const AllTasksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_ALL_TASKS':
    case 'DELETE_TASKS':
      return {
        ...state,
        tasks: payload.tasks,
        web_dev_tasks: payload.web_dev_tasks,
        sketching_tasks: payload.sketching_tasks,
        UI_design_tasks: payload.UI_design_tasks,
        content_writing_tasks: payload.content_writing_tasks
      };
    case 'ADD_NEW_TASK':
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: payload.tasks,
        [payload.course]: payload.course_tasks
      };
    case 'GET_REVIEW_TASKS':
      return {
        ...state,
        review_tasks: payload.tasks
      };
    default:
      return state;
  }
};

export default AllTasksReducer;
