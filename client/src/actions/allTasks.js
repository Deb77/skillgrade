import { GetAllTasks } from '../services';

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
