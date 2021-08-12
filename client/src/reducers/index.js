import { combineReducers } from 'redux';
import authReducer from './authReducer';
import IncompleteTasksReducer from './IncompleteTasksReducer';
import CourseTasksReducer from './CourseTasksReducer';
export default combineReducers({
  auth: authReducer,
  IncompleteTasks: IncompleteTasksReducer,
  CourseTasks: CourseTasksReducer
});
