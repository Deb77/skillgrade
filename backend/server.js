require('dotenv').config();
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

const port = process.env.PORT;
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/tasks');
const userTasksRoutes = require('./routes/user-tasks');
const taskFeedRoutes = require('./routes/task-feed');

const app = express();

// middleware
app.use(bodyParser.json({ limit: '3mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

//routes
app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/user-tasks', userTasksRoutes);
app.use('/task-feed', taskFeedRoutes);

app.listen(port, () => console.log(`Server listening on PORT ${port}`));
