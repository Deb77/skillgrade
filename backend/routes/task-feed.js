const Router = require('express').Router();
const { addTaskFeed } = require('../controllers/taskFeedController');

Router.post('/', addTaskFeed);

module.exports = Router;
