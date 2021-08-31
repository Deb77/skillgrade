const { QueryTypes } = require('sequelize');
const DB = require('../models');

const login = (req, res) => {
  const { name, email, imageUrl } = req.body;
  DB.user
    .findOrCreate({
      where: { email },
      defaults: {
        name,
        email,
        imageUrl
      }
    })
    .then(data => res.status(200).json({ user_id: data[0].dataValues.id }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const getLeaderboard = (req, res) => {
  const query = `select name, score from users u order by score desc`;
  DB.sequelize
    .query(query, { type: QueryTypes.SELECT })
    .then(data => res.status(200).json({ leaderboard: data }))
    .catch(err => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
};

module.exports = { login, getLeaderboard };
