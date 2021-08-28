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

export const MarkTask = params => axios.post(baseUrl + 'tasks/gradeTask');
