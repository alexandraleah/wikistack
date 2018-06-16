const express = require('express');
const wikiRouter = express.Router();
const viewsIndex = require('../views/index');
const { Page } = require('../models');
const { User } = require('../models');
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
  //find or create the user
  const [instance, wasCreated] = await User.findOrCreate({
    where: { name: name, email: email },
  });
  //get the id
  const id = instance.id;
  //in either case get the id and add it to the page
  const page = new Page({
    title: title,
    content: content,
    authorId: id,
  });
  try {
    await page.save();
    res.redirect(`${page.slug}`);
  } catch (error) {
    next(error);
  }
});

wikiRouter.get('/add', (req, res, next) => {
  res.send(viewsIndex.addPage());
});
wikiRouter.get('/:slug/edit', async (req, res, next) => {
  const page = await Page.findOne({ where: { slug: req.params.slug } });
  const author = await page.getAuthor();
  res.send(viewsIndex.editPage(page, author));
});

wikiRouter.get('/:slug/delete', async (req, res, next) => {
  try {
    Page.destroy({
      where: {
        slug: req.params.slug,
      },
    });
    res.redirect(`/wiki`);
  } catch (error) {
    next(error);
  }
});

wikiRouter.get('/:slug', async (req, res, next) => {
  //look up slug in database
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug },
    });
    if (!page) {
      res.writeHead(404, 'page not found');
      res.send('page not found');
    } else {
      const author = await page.getAuthor();
      res.send(viewsIndex.wikiPage(page, author));
    }
  } catch (error) {
    next(error);
  }
});

wikiRouter.post('/:slug', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const name = req.body.name;
  const email = req.body.email;

  try {
    const [numberOfAffectedRows, affectedRows] = await Page.update(
      {
        title: title,
        content: content,
      },
      {
        where: { slug: req.params.slug },
        returning: true, // needed for affectedRows to be populated
      }
    );

    res.redirect(`${req.params.slug}`);
  } catch (error) {
    next(error);
  }
});
