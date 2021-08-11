const DB = require('../models');
const { QueryTypes } = require('sequelize');

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

  if (course_name)
    where_clause = `where p.course_name = '${course_name}' and (ut.user_id = '${user_id}' or ut.user_id is NULL)`;

  const query = `select p.*,ut.status ,
	  case when count(q) = 0 then '[]'
    else json_agg(json_build_object('work_upload',q.work_upload, 'description',q.description, 'upvotes',q.upvotes))
    end as feed
    from "Tasks" p
    left join "UserTasks" ut on p.id = ut.task_id 
    left join "TaskFeeds" q on p.id = q.task_id
    ${where_clause}
    group by p.id,ut.status `;

  DB.sequelize
    .query(query, { type: QueryTypes.SELECT })
    .then(data => {
      altered_data = data.map(item => {
        delete item.createdAt;
        delete item.updatedAt;
        if (item.status == 'COMPLETE') {
          item.status = true;
        } else {
          item.status = false;
        }

        return {
          ...item
        };
      });
      res.status(200).json({ tasks: altered_data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

module.exports = { addTask, getTasks };
