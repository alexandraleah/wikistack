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
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

wikiRouter.get('/add', (req, res, next) => {
  res.send(viewsIndex.addPage());
});

wikiRouter.get('/:slug', async (req, res, next) => {
  //look up slug in database
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug },
    });
    res.send(viewsIndex.wikiPage(page));
  } catch (error) {
    next(error);
  }
});
