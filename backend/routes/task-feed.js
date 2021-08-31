const Router = require('express').Router();
const { addTaskFeed, upvoteTaskFeed } = require('../controllers/taskFeedController');

Router.post('/', addTaskFeed).post('/upvote', upvoteTaskFeed);

module.exports = Router;
