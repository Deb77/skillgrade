const bcrypt = require('bcrypt');
const { QueryTypes } = require('sequelize');
const DB = require('../models');

const addUser = async (req, res) => {
  const { email, password } = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, enc) {
      DB.Admin.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: enc
        }
      })
        .then(() => res.status(200).json({ message: 'Admin User Created Successfully' }))
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: 'Internal server error' });
        });
    });
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const query = `select * from "Admins" where email='${email}'`;
  DB.sequelize
    .query(query, { type: QueryTypes.SELECT })
    .then(data => {
      bcrypt.compare(password, data[0].password, function (err, result) {
        if (result == true)
          res.status(200).json({ message: 'User logged in  successfully', user_id: data[0].id });
        else res.status(400).json({ message: 'Incorrect password' });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

module.exports = { addUser, login };
