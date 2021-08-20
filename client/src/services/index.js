import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const loginService = params => axios.post(baseUrl + 'user/login', params);

export const GetIncompleteTasks = user_id =>
  axios.get(baseUrl + 'user-tasks/older-incomplete-tasks?user_id=' + user_id);

export const GetAllTasks = () => axios.get(baseUrl + 'tasks');

export const AddNewTask = params => axios.post(baseUrl + 'tasks/', params);
