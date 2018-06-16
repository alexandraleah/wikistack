const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const models = require('./models');
const wikiRoute = require('./routes/wiki');
const userRoute = require('./routes/user');
const { Page } = require('./models');
const main = require('./views/main');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/wiki', wikiRoute);
app.use('/users', userRoute);

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

const init = async () => {
  await models.db.sync();
  // .sync({ force: true });

  app.listen(1500, () => {
    console.log('App is listening on port 1500');
  });
};

init();

// Send the HTML for index page, invoking the main page module with an array of found pages to the
// Edit the main page module to loop over the pages, displaying a link to each page
