import { GetCourseSpecificTasks } from '../services';
export const UpvoteFeed = (task_id, feed_id, user_id) => (dispatch, getState) => {
  console.log(task_id, feed_id, user_id);
  let tasks = getState().CourseTasks.taskdata;

  const indexOfTask = tasks.findIndex(item => item.id === task_id);
  const reqtask = tasks[indexOfTask];
  const indexOfFeed = reqtask.feed.findIndex(item => item.id === feed_id);
  let Updatedfeed = reqtask.feed.filter(reqfeed => {
    return reqfeed.id === feed_id;
  });
  Updatedfeed[0].upvotes.push(user_id);
  console.log(Updatedfeed[0], user_id);
  reqtask.feed[indexOfFeed] = Updatedfeed[0];
  tasks[indexOfTask] = reqtask;
  dispatch({
    type: 'GET_COURSE_TASKS',
    payload: tasks
  });
};
