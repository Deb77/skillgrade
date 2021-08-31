import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const loginService = params => axios.post(baseUrl + 'user/login', params);

export const GetIncompleteTasks = user_id =>
  axios.get(baseUrl + 'user-tasks/older-incomplete-tasks?user_id=' + user_id);


export const GetAllTasks = () => axios.get(baseUrl + 'tasks/all-tasks');

export const AddNewTask = params => axios.post(baseUrl + 'tasks/', params);

export const UpdateExistingTask = params => axios.put(baseUrl + 'tasks/', params);

export const DeleteExistingTask = params => axios.delete(baseUrl + 'tasks/', { data: params });

export const GetReviewTasks = () => axios.get(baseUrl + 'tasks/reviews');

export const MarkTask = params => axios.post(baseUrl + 'tasks/gradeTask', params);

export const AdminLogin = params => axios.post(baseUrl + 'admin/login', params);

export const GetCourseSpecificTasks = (course, user_id) =>
  axios.get(baseUrl + 'tasks/' + course + '?user_id=' + user_id);

export const AddUserTask = params => axios.post(baseUrl + 'user-tasks', params);

export const AddTaskFeed = params => axios.post(baseUrl + 'task-feed', params);
export const checkTaskStatus = (user_id, task_id) =>
  axios.get(baseUrl + 'user-tasks/check-task-status?user_id=' + user_id + '&task_id=' + task_id);

export const updateTaskCompleteStatus = params =>
  axios.put(baseUrl + 'user-tasks/complete-user-task', params);

export const upvoteTaskFeed = params => axios.post(baseUrl + 'task-feed/upvote', params);

export const getLeaderBoard = () => axios.get(baseUrl + 'user/leaderboard');

