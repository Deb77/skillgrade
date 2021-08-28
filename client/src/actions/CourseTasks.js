import { GetCourseSpecificTasks } from '../services';
export const CourseTasks = (course_name, user_id) => dispatch =>
  GetCourseSpecificTasks(course_name, user_id).then(res => {
    console.log(res.data);
    dispatch({
      type: 'GET_COURSE_TASKS',
      payload: res.data.tasks
    });
  });
