import { GetAllTasks, AddNewTask, UpdateExistingTask, DeleteExistingTask } from '../services';

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
    const web_dev_tasks = tasks.filter(({ course_name }) => course_name === 'WEB_DEV');
    const sketching_tasks = tasks.filter(({ course_name }) => course_name === 'SKETCHING');
    const UI_design_tasks = tasks.filter(({ course_name }) => course_name === 'UI_DESIGN');
    const content_writing_tasks = tasks.filter(({ course_name }) => course_name === 'CONTENT_WRITING');
    dispatch({
      type: 'SET_ALL_TASKS',
      payload: { tasks, web_dev_tasks, sketching_tasks, UI_design_tasks, content_writing_tasks }
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
