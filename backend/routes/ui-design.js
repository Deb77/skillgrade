const Router = require('express').Router();
const { addTask, getTasks } = require('../controllers/tasksController');

Router.get('/tasks', getTasks).post('/tasks', addTask);

module.exports = Router;
