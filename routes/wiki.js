const express = require('express')
const wikiRouter = express.Router();

module.exports = wikiRouter;

wikiRouter.get('/', (req, res, next) => {
  res.send('retrieve all wiki pages')
});

wikiRouter.post('/', (req, res, next) => {
  res.send('submit new page')
});

wikiRouter.get('/add', (req, res, next) => {
  res.send('add page form')
})
