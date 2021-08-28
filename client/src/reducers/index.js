import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminAuthReducer from './adminAuthReducer';
import IncompleteTasksReducer from './IncompleteTasksReducer';
import AllTasksReducer from './allTasksReducer';

export default combineReducers({
  auth: authReducer,
  adminAuth: adminAuthReducer,
  IncompleteTasks: IncompleteTasksReducer,
  allTasks: AllTasksReducer
});
