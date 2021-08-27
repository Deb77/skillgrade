const Router = require('express').Router();
const {
  addTask,
  getTasks,
  getAllTasks,
  updateTask,
  deleteTasks,
  getReviewTasks,
  gradeTask
} = require('../controllers/tasksController');

Router.get('/', getTasks)
  .get('/all-tasks', getAllTasks)
  .post('/', addTask)
  .put('/', updateTask)
  .delete('/', deleteTasks)
  .get('/web-dev', getTasks)
  .get('/ui-design', getTasks)
  .get('/sketching', getTasks)
  .get('/content-writing', getTasks)
  .get('/reviews', getReviewTasks)
  .post('/gradeTask', gradeTask);

module.exports = Router;
