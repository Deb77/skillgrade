const Router = require('express').Router();
const {
  addUserTask,
  getOldestIncompleteTasks,
  completeUserTask,
  getTaskStatus
} = require('../controllers/userTasksController');

Router.post('/', addUserTask)
  .get('/older-incomplete-tasks', getOldestIncompleteTasks)
  .put('/complete-user-task', completeUserTask)
  .get('/check-task-status', getTaskStatus);

module.exports = Router;
