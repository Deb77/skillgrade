import { combineReducers } from 'redux';
import authReducer from './authReducer';
import IncompleteTasksReducer from './IncompleteTasksReducer';
import AllTasksReducer from './allTasksReducer';

export default combineReducers({
  auth: authReducer,
  IncompleteTasks: IncompleteTasksReducer,
  allTasks: AllTasksReducer
});
