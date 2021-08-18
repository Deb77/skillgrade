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

const completeUserTask = (req, res) => {
  const { task_id, user_id, work_upload } = req.body;
  let query = `update "UserTasks" set status = 'COMPLETE', work_upload='${work_upload}' where user_id ='${user_id}' and task_id ='${task_id}'`;
  DB.sequelize
    .query(query, { type: QueryTypes.INSERT })
    .then(() => {
      query = `select max_points from "Tasks" where id='${task_id}'`;
      DB.sequelize
        .query(query, { type: QueryTypes.SELECT })
        .then(data => {
          const max_points = data[0].max_points;
          query = `update users set score = score + ${max_points} where id='${user_id}'`;
          DB.sequelize
            .query(query, { type: QueryTypes.UPDATE })
            .then(() => {
              res.status(200).json({ message: 'Task Completed Successfully' });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json('Internal server error');
            });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json('Internal server error');
        });
    })
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
      let complete;
      if (data[0].status === 'COMPLETE') {
        complete = true;
      } else {
        complete = false;
      }
      res.status(200).json({ complete });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

module.exports = { addUserTask, getOldestIncompleteTasks, completeUserTask, getTaskStatus };