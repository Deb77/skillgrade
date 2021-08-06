const DB = require('../models');
const addTaskFeed = (req, res) => {
  const { work_upload, description, task_id, user_id } = req.body;
  DB.TaskFeed.create({
    work_upload,
    description,
    task_id,
    user_id
  })
    .then(() => res.status(200).json({ message: 'Added to feed successfully' }))
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

module.exports = { addTaskFeed };
