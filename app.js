const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const index = require('./views/index');
const pg = require('pg');
const { db } = require('./models');
db.authenticate().then(() => {
  console.log('connected to the database');
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(index.main());
});

app.listen(1500, () => {
  console.log('App is listening on port 1500');
});
