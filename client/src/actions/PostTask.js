import { AddTaskFeed } from '../services';
export const PostTask = (uploadfeeddata, setTrigger, setLoader2, handleClose) => (dispatch, getState) => {
  let username = getState().auth.name;

  AddTaskFeed(uploadfeeddata).then(res => {
    let newdata = res.data;
    let tasks = getState().CourseTasks.taskdata;
    const indexOfTask = tasks.findIndex(item => item.id === uploadfeeddata.task_id);
    const reqtask = tasks[indexOfTask];
    let updatedData = {
      id: newdata.task_feed_id,
      work_upload: newdata.work_upload,
      description: uploadfeeddata.description,
      user: username,
      upvotes: []
    };
    reqtask.feed.push(updatedData);
    console.log(res.data.message);
    tasks[indexOfTask] = reqtask;
    setTrigger(true);
    handleClose();
    setLoader2(false);
    dispatch({
      type: 'GET_COURSE_TASKS',
      payload: tasks
    });
  });
};
