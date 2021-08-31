const Router = require('express').Router();
const { addUser, login } = require('../controllers/adminController');

Router.post('/', addUser).post('/login', login);

module.exports = Router;
