import {
  GetAllTasks,
  AddNewTask,
  UpdateExistingTask,
  DeleteExistingTask,
  GetReviewTasks,
  MarkTask
} from '../services';

const filterTask = tasks => {
  const web_dev_tasks = tasks.filter(({ course_name }) => course_name === 'WEB_DEV');
  const sketching_tasks = tasks.filter(({ course_name }) => course_name === 'SKETCHING');
  const UI_design_tasks = tasks.filter(({ course_name }) => course_name === 'UI_DESIGN');
  const content_writing_tasks = tasks.filter(({ course_name }) => course_name === 'CONTENT_WRITING');
  return { tasks, web_dev_tasks, sketching_tasks, UI_design_tasks, content_writing_tasks };
};

const course_keys = {
  WEB_DEV: 'web_dev_tasks',
  SKETCHING: 'sketching_tasks',
  UI_DESIGN: 'UI_design_tasks',
  CONTENT_WRITING: 'content_writing_tasks'
};

const objToJSON = items => items && items.map(item => JSON.stringify(item));

export const AllTasks = () => dispatch =>
  GetAllTasks().then(res => {
    const tasks = res.data.tasks;

    dispatch({
      type: 'SET_ALL_TASKS',
      payload: filterTask(tasks)
    });
  });

export const NewTask = newTask => (dispatch, getState) => {
  AddNewTask(newTask)
    .then(() => {
      const course = course_keys[newTask.course_name];
      let course_tasks = getState().allTasks[course];
      let tasks = getState().allTasks.tasks;
      course_tasks.push(newTask);
      tasks.push(newTask);
      dispatch({
        type: 'ADD_NEW_TASK',
        payload: { tasks, course_tasks, course }
      });
    })
    .catch(err => console.log(err));
};

export const UpdateTask = task => (dispatch, getState) => {
  UpdateExistingTask(task).then(() => {
    const course = course_keys[task.course_name];
    let tasks = getState().allTasks.tasks;
    let course_tasks = getState().allTasks[course];
    const index = tasks.findIndex(item => item.id === task.id);
    const course_task_index = course_tasks.findIndex(item => item.id === task.id);
    const modifiedTask = {
      ...task,
      docs: objToJSON(task.docs),
      videos: objToJSON(task.videos),
      tools_and_sources: objToJSON(task.tools_and_sources)
    };
    tasks[index] = modifiedTask;
    course_tasks[course_task_index] = modifiedTask;
    dispatch({
      type: 'UPDATE_TASK',
      payload: { tasks, course_tasks, course }
    });
  });
};

export const DeleteTask = delete_array => (dispatch, getState) => {
  let tasks = getState().allTasks.tasks;
  tasks = tasks.filter(item => !delete_array.includes(item.id));
  DeleteExistingTask({ delete_array }).then(res => {
    console.log(res);
    dispatch({
      type: 'DELETE_TASKS',
      payload: filterTask(tasks)
    });
  });
};

export const ReviewTasks = () => dispatch => {
  GetReviewTasks().then(res =>
    dispatch({
      type: 'GET_REVIEW_TASKS',
      payload: res.data
    })
  );
};

export const MarkTaskComplete = params => dispatch => {
  MarkTask(params).then(res => console.log(res));
};
