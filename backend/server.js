require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT;
const userRoutes = require('./routes/user');
const contentWritingRoutes = require('./routes/content-writing');
const sketchingRoutes = require('./routes/sketching');
const uiDesignRoutes = require('./routes/ui-design');
const webDevRoutes = require('./routes/web-dev');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/user', userRoutes);
app.use('/content-writing', contentWritingRoutes);
app.use('/sketching', sketchingRoutes);
app.use('/ui-design', uiDesignRoutes);
app.use('/web-dev', webDevRoutes);

app.listen(port, () => console.log(`Server listening on PORT ${port}`));
