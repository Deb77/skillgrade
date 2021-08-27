const DB = require('../models');
const { QueryTypes, where } = require('sequelize');

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
    route: { path },
    query: { user_id }
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

  let where_clause = '';

  if (course_name) where_clause = `where t.course_name = '${course_name}' and u.id = '${user_id}'`;

  const query = `select t.*,
    case when ut.status = 'COMPLETE' then true else false end as status,
    case when count(q) = 0 then '[]'
      else json_agg(json_build_object('user',u.name, 'work_upload',q.work_upload, 'description',q.description, 'upvotes',q.upvotes))
      end as feed
    from "Tasks" t cross join users u 
  left join "TaskFeeds" q on q.task_id = t.id
  left join "UserTasks" ut on t.id = ut.task_id and ut.user_id = u.id
  ${where_clause}
  group by t.id,ut.status,u.id`;

  DB.sequelize
    .query(query, { type: QueryTypes.SELECT })
    .then(data => {
      res.status(200).json({ tasks: data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

const updateTask = (req, res) => {
  DB.Tasks.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(() => res.status(200).json({ message: 'Task updated successfully' }))
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

const deleteTasks = (req, res) => {
  let { delete_array } = req.body;
  console.log(delete_array);
  let str = '';
  for (let i = 0; i < delete_array.length; i++) {
    if (i != delete_array.length - 1) str += `'${delete_array[i]}', `;
    else str += `'${delete_array[i]}'`;
  }

  const query = `delete from "Tasks" where id IN (${str})`;

  DB.sequelize
    .query(query, { type: QueryTypes.DELETE })
    .then(() => res.status(200).json('Tasks deleted successfully'))
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

module.exports = { addTask, getTasks, updateTask, deleteTasks };
