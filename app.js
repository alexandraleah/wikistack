const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.listen(1500, () => {
  console.log('App is listening on port 1500')
} );
