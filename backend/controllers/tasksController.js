const DB = require('../models');

const addTask = (req, res) => {
  const { name, description, max_points, time_complete, level, docs, videos, tools_and_sources } = req.body;
  const { baseUrl } = req;
  let model;
  switch (baseUrl) {
    case '/content-writing':
      model = 'ContentWritingTasks';
    case '/sketching':
      model = 'SketchingTasks';
    case '/ui-design':
      model = 'UIDesginTasks';
    case '/web-dev':
      model = 'WebDevTasks';
  }
  DB[model]
    .create({ name, description, max_points, time_complete, level, docs, videos, tools_and_sources })
    .then(() => res.status(200).json({ message: 'Task added successfully' }))
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

const getTasks = (req, res) => {
  let model;
  const { baseUrl } = req;
  switch (baseUrl) {
    case '/content-writing':
      model = 'ContentWritingTasks';
    case '/sketching':
      model = 'SketchingTasks';
    case '/ui-design':
      model = 'UIDesginTasks';
    case '/web-dev':
      model = 'WebDevTasks';
  }
  DB[model]
    .findAll()
    .then(data => res.status(200).json({ tasks: data }))
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

module.exports = { addTask, getTasks };
