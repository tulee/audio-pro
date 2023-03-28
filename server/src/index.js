const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const myLog = require('./logger')
app.use(myLog)

const validateToken = require('./validateToken')

const route = require('./routes/index')
route(app)

const databse = require('./config/db/index');
const db = new databse();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listenting on port ${port}`);
  db.connect().then((err, result) => {
    if (err) throw err;
    console.log("database is connected");
  });
});