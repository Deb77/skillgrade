const Router = require('express').Router();
const { login, getLeaderboard } = require('../controllers/userController');

Router.post('/login', login).get('/leaderboard', getLeaderboard);

module.exports = Router;
