const Router = require('express').Router();
const { addTask, getTasks, updateTask, deleteTasks } = require('../controllers/tasksController');

Router.get('/', getTasks)
  .post('/', addTask)
  .put('/', updateTask)
  .delete('/', deleteTasks)
  .get('/web-dev', getTasks)
  .get('/ui-design', getTasks)
  .get('/sketching', getTasks)
  .get('/content-writing', getTasks);

module.exports = Router;
