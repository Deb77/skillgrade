import { GetIncompleteTasks } from '../services';

export const IncompleteTasks = user_id => dispatch =>
  GetIncompleteTasks(user_id).then(res => {
    dispatch({
      type: 'GET_INCOMPLETE_TASKS',
      payload: res.data
    });
  });
