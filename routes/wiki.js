const express = require('express');
const wikiRouter = express.Router();
const viewsIndex = require('../views/index');
const { Page } = require('../models');

module.exports = wikiRouter;

wikiRouter.get('/', async (req, res, next) => {
  try {
    let pages = await Page.findAll();
    res.send(viewsIndex.main(pages));
  } catch (error) {
    next(error);
  }
});

wikiRouter.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const name = req.body.name;
  const email = req.body.email;
  const page = new Page({
    title: title,
    content: content,
  });
  // const user = new User({
  //   name: name,
  //   email: email,
  // });
  try {
    await page.save();
    // await user.save();
    res.redirect(`${page.slug}`);
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
