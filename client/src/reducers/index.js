import { combineReducers } from 'redux';
import authReducer from './authReducer';
import IncompleteTasksReducer from './IncompleteTasksReducer';
export default combineReducers({
  auth: authReducer,
  IncompleteTasks: IncompleteTasksReducer
});
