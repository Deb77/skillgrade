const { QueryTypes } = require('sequelize');
const moment = require('moment');
const DB = require('../models');

const addUserTask = (req, res) => {
  const { task_id, user_id } = req.body;

  DB.UserTasks.findOrCreate({
    where: {
      task_id,
      user_id
    },
    defaults: {
      task_id,
      user_id
    }
  })
    .then(() => res.status(200).json({ message: 'User task added successfully' }))
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

const getOldestIncompleteTasks = (req, res) => {
  const {
    query: { user_id }
  } = req;

  const query = `select p.course_name, p.description, q."createdAt" 
        from "Tasks" p
        inner join "UserTasks" q
        on p.id = q.task_id
        where q.user_id = '${user_id}' and q.status = 'IN_PROGRESS'`;

  DB.sequelize
    .query(query, { type: QueryTypes.SELECT })
    .then(data => {
      altered_data = data.map(item => {
        return {
          course_name: item.course_name,
          description: item.description,
          days_left: moment(item.createdAt).add(item.time_complete, 'days').diff(moment(), 'days') + 1
        };
      });
      res.status(200).json(altered_data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

const completeUserTask = async (req, res) => {
  const { task_id, user_id } = req.body;
  const file = req.files.file;
  const link = req.protocol + '://' + req.get('host') + '/' + file.name;

  file.mv(`${__dirname}/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  let query = `update "UserTasks" set status = 'IN_REVIEW', work_upload='${link}' where user_id ='${user_id}' and task_id ='${task_id}'`;
  DB.sequelize
    .query(query, { type: QueryTypes.INSERT })
    .then(() => res.status(200).json('Task submitted for review'))
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

const getTaskStatus = (req, res) => {
  const {
    query: { user_id, task_id }
  } = req;
  const query = `select ut.status from "UserTasks" ut where user_id = '${user_id}' and task_id ='${task_id}'`;
  DB.sequelize
    .query(query, { type: QueryTypes.SELECT })
    .then(data => {
      console.log(data);
      let complete = data[0].status;
      res.status(200).json({ complete });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

module.exports = { addUserTask, getOldestIncompleteTasks, completeUserTask, getTaskStatus };