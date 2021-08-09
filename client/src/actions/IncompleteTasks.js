import { GetIncompleteTasks } from '../services';

export const IncompleteTasks = () => dispatch =>
  GetIncompleteTasks('b180aefb-35d2-47db-8f4a-88b53a50da43').then(res => {
    dispatch({
      type: 'GET_INCOMPLETE_TASKS',
      payload: res.data
    });
  });
