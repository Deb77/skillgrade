import { GetIncompleteTasks } from '../services';

export const IncompleteTasks = user_id => dispatch =>
  GetIncompleteTasks(user_id).then(res => {
    console.log(res.data);
    dispatch({
      type: 'GET_INCOMPLETE_TASKS',
      payload: res.data
    });
  });
