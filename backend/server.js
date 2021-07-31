require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT;
const db = require('./models');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get('/test', (req, res) => {
  db.Users.findAll().then((users) => res.json(users));
});

app.listen(port, () => console.log(`Server listening on PORT ${port}`));
