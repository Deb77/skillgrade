const Router = require('express').Router();
const { addTask, getTasks } = require('../controllers/tasksController');

Router.get('/', getTasks)
  .post('/', addTask)
  .get('/web-dev', getTasks)
  .get('/ui-design', getTasks)
  .get('/sketching', getTasks)
  .get('/content-writing', getTasks);

module.exports = Router;
