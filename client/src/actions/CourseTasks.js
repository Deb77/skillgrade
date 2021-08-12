import { GetCourseSpecificTasks } from '../services';
export const CourseTasks = (course_name, user_id) => dispatch =>
  GetCourseSpecificTasks(course_name, 'b180aefb-35d2-47db-8f4a-88b53a50da43').then(res => {
    dispatch({
      type: 'GET_COURSE_TASKS',
      payload: res.data
    });
  });
