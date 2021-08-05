const DB = require('../models');

const addTask = (req, res) => {
  const {
    name,
    course_name,
    description,
    max_points,
    time_complete,
    level,
    docs,
    videos,
    tools_and_sources
  } = req.body;

  DB.Tasks.create({
    name,
    course_name,
    description,
    max_points,
    time_complete,
    level,
    docs,
    videos,
    tools_and_sources
  })
    .then(() => res.status(200).json({ message: 'Task added successfully' }))
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

const getTasks = (req, res) => {
  let course_name;
  const {
    route: { path }
  } = req;
  switch (path) {
    case '/web-dev':
      course_name = 'WEB_DEV';
      break;
    case '/ui-design':
      course_name = 'UI_DESIGN';
      break;
    case '/sketching':
      course_name = 'SKETCHING';
      break;
    case '/content-writing':
      course_name = 'CONTENT_WRITING';
      break;
    default:
      course_name = null;
  }
  DB.Tasks.findAll({
    ...(course_name && { where: { course_name } })
  })
    .then(data => res.status(200).json({ tasks: data }))
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

module.exports = { addTask, getTasks };
