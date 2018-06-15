const express = require('express');
const wikiRouter = express.Router();
const viewsIndex = require('../views/index');
const { Page } = require('../models');

module.exports = wikiRouter;

wikiRouter.get('/', (req, res, next) => {
  res.send('retrieve all wiki pages');
});

wikiRouter.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const page = new Page({
    title: title,
    content: content,
  });

  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

wikiRouter.get('/add', (req, res, next) => {
  res.send(viewsIndex.addPage());
});
