require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT;
const userRoutes = require('./routes/user');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/user', userRoutes);

app.listen(port, () => console.log(`Server listening on PORT ${port}`));
