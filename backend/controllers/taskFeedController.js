const { QueryTypes } = require('sequelize');
const cloudinary = require('../utils/cloudinary');
const DB = require('../models');

const addTaskFeed = async (req, res) => {
  const { work_upload, description, task_id, user_id } = req.body;
  const { url } = await await cloudinary.uploader.upload(work_upload, {
    upload_preset: process.env.CN_SKILL_SHARE_FEED
  });
  DB.TaskFeed.create({
    work_upload: url,
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

const upvoteTaskFeed = (req, res) => {
  const { user_id, task_feed_id } = req.body;
  const query = `update "TaskFeeds" 
        set upvotes = array_append(upvotes, '${user_id}')
        where id = '${task_feed_id}'`;
  DB.sequelize
    .query(query, { type: QueryTypes.UPDATE })
    .then(() => res.status(200).json({ message: 'Upvoted' }))
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

module.exports = { addTaskFeed, upvoteTaskFeed };
