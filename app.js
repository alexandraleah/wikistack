const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const models = require('./models');
const wikiRoute = require('./routes/wiki');
const userRoute = require('./routes/user');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/wiki', wikiRoute);
app.use('/user', userRoute);

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

const init = async () => {
  await models.db
    .sync
    // { force: true }
    ();

  app.listen(1500, () => {
    console.log('App is listening on port 1500');
  });
};

init();
