require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const port = process.env.PORT;
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/tasks');
const userTasksRoutes = require('./routes/user-tasks');
const taskFeedRoutes = require('./routes/task-feed');
const adminRoute = require('./routes/admin');

const app = express();

// middleware
app.use(bodyParser.json({ limit: '3mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.resolve(__dirname + '/controllers/uploads/')));

//routes
app.get('/static');
app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/user-tasks', userTasksRoutes);
app.use('/task-feed', taskFeedRoutes);
app.use('/admin', adminRoute);

app.listen(port, () => console.log(`Server listening on PORT ${port}`));
