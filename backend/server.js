require('dotenv').config();
const app = require('express')();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
});
