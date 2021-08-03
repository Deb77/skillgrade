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
    .then(() => res.status(200).json({ message: 'Logged in successfully' }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

module.exports = { login };
