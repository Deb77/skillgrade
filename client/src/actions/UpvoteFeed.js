import { upvoteTaskFeed } from '../services';
export const UpvoteFeed = (task_id, feed_id, user_id, setUpvote) => (dispatch, getState) => {
  const data = {
    user_id,
    task_feed_id: feed_id
  };
  upvoteTaskFeed(data).then(res => {
    console.log(res.data);
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
    setUpvote(upvotes => upvotes + 1);
    dispatch({
      type: 'GET_COURSE_TASKS',
      payload: tasks
    });
  });
};
